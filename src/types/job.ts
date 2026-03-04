export interface JobListing {
  _id: string;
  title: string;
  company: string;
  location: string;
  tags: string[];
  category: string;
  description: string;
  featured: boolean;
  isActive: boolean;
  latest: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  tags: string[];
  featured: boolean;
  latest: boolean;
  createdAt: string;
  updatedAt: string;
  salary?: string;
  experience?: string;
  jobType?: string;
}

export interface ApplyFormData {
  name: string;
  email: string;
  resume: string;
  coverNote: string;
}

export interface JobFilters {
  search: string;
  location: string;
  category: string;
  jobType: string;
}

export interface Filters {
  search: string | null;
  location: string | null;
  category: string | null;
}

export const INITIAL_STATE = {
  jobs: [] as Job[],
  filteredJobs: [] as Job[],
  categories: [] as string[],
  locations: [] as string[],
  loading: true,
  error: null as string | null,
};
export interface JobFiltersProps {
  categories: string[];
  locations: string[];
}
