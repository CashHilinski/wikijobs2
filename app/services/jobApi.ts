import { JobApiResponse, JobMatch, FormData } from '../find-jobs/types';

const ADZUNA_BASE_URL = 'https://api.adzuna.com/v1/api/jobs';

interface SearchJobsParams {
  role: string;
  location?: string;
  country?: string;
  resultsPerPage?: number;
  userProfile?: FormData; // Add user profile for matching
}

export class JobApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'JobApiError';
  }
}

// Scoring weights for different matching criteria
const MATCH_WEIGHTS = {
  roleMatch: 0.35,
  locationMatch: 0.15,
  skillsMatch: 0.25,
  returnToWorkBenefits: 0.25
};

// Helper function to calculate text similarity using Levenshtein distance
const calculateSimilarity = (str1: string, str2: string): number => {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  
  if (s1 === s2) return 1;
  if (s1.includes(s2) || s2.includes(s1)) return 0.8;
  
  const words1 = new Set(s1.split(/\W+/));
  const words2 = new Set(s2.split(/\W+/));
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  return intersection.size / union.size;
};

// Calculate role match score
const calculateRoleMatchScore = (jobTitle: string, desiredRole: string): number => {
  const similarity = calculateSimilarity(jobTitle, desiredRole);
  return similarity;
};

// Calculate location match score
const calculateLocationMatchScore = (jobLocation: string, preferredLocation: string): number => {
  if (!preferredLocation) return 1; // If no preference, consider it a match
  return calculateSimilarity(jobLocation, preferredLocation);
};

// Calculate skills match score
const calculateSkillsMatchScore = (
  jobDescription: string,
  userSkills: string,
  jobCategory: string
): number => {
  const userSkillsArray = userSkills.toLowerCase().split(',').map(s => s.trim());
  const jobDescWords = new Set(jobDescription.toLowerCase().split(/\W+/));
  const categoryWords = new Set(jobCategory.toLowerCase().split(/\W+/));
  
  let matchedSkills = 0;
  for (const skill of userSkillsArray) {
    if (jobDescWords.has(skill) || categoryWords.has(skill)) {
      matchedSkills++;
    }
  }
  
  return userSkillsArray.length > 0 ? matchedSkills / userSkillsArray.length : 0;
};

// Calculate return-to-work benefits score
const calculateReturnBenefitsScore = (
  returnFriendly: { mentorship: boolean; flexibleHours: boolean; returnProgram: boolean }
): number => {
  const benefitsCount = Object.values(returnFriendly).filter(Boolean).length;
  return benefitsCount / 3; // Normalize to 0-1 range
};

// Enhanced match score calculation
const calculateMatchScore = (
  job: JobApiResponse['results'][0],
  userProfile?: FormData
): number => {
  if (!userProfile) {
    return Math.floor(Math.random() * 30) + 70; // Fallback to random if no profile
  }

  const roleMatchScore = calculateRoleMatchScore(
    job.title,
    userProfile.preferences.desiredRole
  );

  const locationMatchScore = calculateLocationMatchScore(
    job.location.display_name,
    userProfile.preferences.location
  );

  const skillsMatchScore = calculateSkillsMatchScore(
    job.description,
    userProfile.experience.keySkills,
    job.category.label
  );

  const returnBenefitsScore = calculateReturnBenefitsScore({
    mentorship: job.contract_time === "full_time",
    flexibleHours: job.contract_type === "permanent",
    returnProgram: true
  });

  // Calculate weighted average
  const totalScore = (
    roleMatchScore * MATCH_WEIGHTS.roleMatch +
    locationMatchScore * MATCH_WEIGHTS.locationMatch +
    skillsMatchScore * MATCH_WEIGHTS.skillsMatch +
    returnBenefitsScore * MATCH_WEIGHTS.returnToWorkBenefits
  );

  // Convert to percentage and ensure it's between 0-100
  return Math.min(Math.max(Math.round(totalScore * 100), 0), 100);
};

export const searchJobs = async ({
  role,
  location = '',
  country = 'gb',
  resultsPerPage = 10,
  userProfile
}: SearchJobsParams): Promise<JobMatch[]> => {
  if (!process.env.NEXT_PUBLIC_ADZUNA_APP_ID || !process.env.NEXT_PUBLIC_ADZUNA_APP_KEY) {
    throw new JobApiError('API credentials not configured');
  }

  try {
    const response = await fetch(
      `${ADZUNA_BASE_URL}/${country}/search/1?` + 
      `app_id=${process.env.NEXT_PUBLIC_ADZUNA_APP_ID}` +
      `&app_key=${process.env.NEXT_PUBLIC_ADZUNA_APP_KEY}` +
      `&what=${encodeURIComponent(role)}` +
      `&where=${encodeURIComponent(location)}` +
      `&results_per_page=${resultsPerPage}` +
      `&content-type=application/json`,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new JobApiError('Failed to fetch jobs', response.status);
    }

    const data: JobApiResponse = await response.json();
    
    const jobs = data.results.map(item => ({
      title: item.title,
      company: item.company.display_name,
      location: item.location.display_name,
      salary: item.salary_min 
        ? `£${Math.round(item.salary_min).toLocaleString()} - £${Math.round(item.salary_max || 0).toLocaleString()}`
        : item.salary_is_predicted 
          ? `Estimated: £${Math.round(item.salary_min || 0).toLocaleString()}`
          : 'Salary not specified',
      matchScore: calculateMatchScore(item, userProfile),
      returnFriendly: {
        mentorship: item.contract_time === "full_time",
        flexibleHours: item.contract_type === "permanent",
        returnProgram: true
      },
      requirements: [item.category.label],
      description: item.description,
      applyUrl: item.redirect_url,
      postedDate: new Date(item.created).toLocaleDateString(),
      jobType: item.contract_time || 'Not specified',
      category: item.category.label
    }));

    // Sort jobs by match score in descending order
    return jobs.sort((a, b) => b.matchScore - a.matchScore);
  } catch (error) {
    if (error instanceof JobApiError) {
      throw error;
    }
    throw new JobApiError(error instanceof Error ? error.message : 'Failed to fetch jobs');
  }
}; 