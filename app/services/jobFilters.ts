import { JobMatch, JobFilters, SortConfig } from '../find-jobs/types';

// Helper function to extract numeric salary value
const extractSalaryValue = (salaryStr: string): number => {
  const matches = salaryStr.match(/\d+/g);
  if (!matches) return 0;
  return parseInt(matches[0].replace(/,/g, ''));
};

// Helper function to calculate distance (simplified version)
const calculateDistance = (loc1: string, loc2: string): number => {
  // This is a simple string similarity for now
  // TODO: Implement proper geocoding and distance calculation
  return loc1.toLowerCase() === loc2.toLowerCase() ? 0 : 1;
};

export const filterJobs = (
  jobs: JobMatch[],
  filters: JobFilters,
  userLocation: string
): JobMatch[] => {
  return jobs.filter(job => {
    // Return to work program filter
    if (filters.returnToWork && !job.returnFriendly.returnProgram) {
      return false;
    }

    // Flexible hours filter
    if (filters.flexibleHours && !job.returnFriendly.flexibleHours) {
      return false;
    }

    // Mentorship filter
    if (filters.mentorship && !job.returnFriendly.mentorship) {
      return false;
    }

    // Salary range filter
    if (filters.salaryRange.min !== null || filters.salaryRange.max !== null) {
      const jobSalary = extractSalaryValue(job.salary);
      if (filters.salaryRange.min !== null && jobSalary < filters.salaryRange.min) {
        return false;
      }
      if (filters.salaryRange.max !== null && jobSalary > filters.salaryRange.max) {
        return false;
      }
    }

    // Work type filter
    if (filters.workTypes.length > 0) {
      const jobWorkType = job.jobType.toLowerCase();
      if (!filters.workTypes.some(type => jobWorkType.includes(type))) {
        return false;
      }
    }

    // Category filter
    if (filters.categories.length > 0) {
      if (!filters.categories.includes(job.category)) {
        return false;
      }
    }

    return true;
  });
};

export const sortJobs = (
  jobs: JobMatch[],
  sortConfig: SortConfig,
  userLocation: string
): JobMatch[] => {
  return [...jobs].sort((a, b) => {
    let comparison = 0;

    switch (sortConfig.field) {
      case 'matchScore':
        comparison = a.matchScore - b.matchScore;
        break;

      case 'postedDate':
        comparison = new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime();
        break;

      case 'locationProximity':
        const distanceA = calculateDistance(a.location, userLocation);
        const distanceB = calculateDistance(b.location, userLocation);
        comparison = distanceA - distanceB;
        break;

      case 'salary':
        const salaryA = extractSalaryValue(a.salary);
        const salaryB = extractSalaryValue(b.salary);
        comparison = salaryA - salaryB;
        break;

      default:
        comparison = 0;
    }

    return sortConfig.direction === 'asc' ? comparison : -comparison;
  });
};

export const getUniqueCategories = (jobs: JobMatch[]): string[] => {
  return Array.from(new Set(jobs.map(job => job.category)));
};

export const getSalaryRange = (jobs: JobMatch[]): { min: number; max: number } => {
  const salaries = jobs.map(job => extractSalaryValue(job.salary)).filter(salary => salary > 0);
  return {
    min: Math.min(...salaries),
    max: Math.max(...salaries)
  };
}; 