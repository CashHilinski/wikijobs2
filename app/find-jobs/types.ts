export interface FormData {
  personal: {
    name: string;
    email: string;
    phone: string;
    location: string;
    yearsOutOfWork: string;
  };
  experience: {
    lastRole: string;
    industry: string;
    keySkills: string;
    reasonForBreak: string;
  };
  preferences: {
    desiredRole: string;
    workType: 'remote' | 'hybrid' | 'onsite';
    salary: string;
    location: string;
    country: string;
  };
}

export interface JobMatch {
  title: string;
  company: string;
  location: string;
  salary: string;
  matchScore: number;
  returnFriendly: {
    mentorship: boolean;
    flexibleHours: boolean;
    returnProgram: boolean;
  };
  requirements: string[];
  description: string;
  applyUrl: string;
  postedDate: string;
  jobType: string;
  category: string;
}

export interface SkillGapPlan {
  currentSkills: string[];
  requiredSkills: string[];
  gapAnalysis: string;
  actionPlan: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  estimatedTimeframe: string;
  resources: {
    courses: string[];
    workshops: string[];
    mentorship: string[];
  };
}

export interface JobApiResponse {
  results: Array<{
    title: string;
    company: { display_name: string };
    location: { display_name: string };
    salary_min?: number;
    salary_max?: number;
    salary_is_predicted?: boolean;
    contract_time?: string;
    contract_type?: string;
    category: { label: string };
    description: string;
    redirect_url: string;
    created: string;
  }>;
}

export interface JobFilters {
  returnToWork: boolean;
  flexibleHours: boolean;
  mentorship: boolean;
  salaryRange: {
    min: number | null;
    max: number | null;
  };
  workTypes: ('remote' | 'hybrid' | 'onsite')[];
  categories: string[];
}

export interface FilterPreset {
  id: string;
  name: string;
  description: string;
  filters: JobFilters;
}

export type SortOption = 
  | 'matchScore' 
  | 'postedDate' 
  | 'locationProximity' 
  | 'salary';

export interface SortConfig {
  field: SortOption;
  direction: 'asc' | 'desc';
} 