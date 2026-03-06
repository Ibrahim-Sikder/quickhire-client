import {
  BarChart3,
  Briefcase,
  Code,
  Palette,
  Smartphone,
  TrendingUp,
  Users,
} from "lucide-react";

/* eslint-disable @typescript-eslint/no-explicit-any */
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
  applicants?: number;
  benefits?: string[];
  isActive: boolean;
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

export interface JobAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobAdded?: (job: any) => void;
  onJobUpdated?: (job: any) => void;
  jobToEdit?: Job | null;
}

export const iconMap: Record<string, any> = {
  Design: Palette,
  Sales: BarChart3,
  Marketing: TrendingUp,
  Finance: BarChart3,
  Technology: Smartphone,
  Engineering: Code,
  Business: Briefcase,
  "Human Resources": Users,
  "Human Resource": Users,
  "Software Engineering": Code,
};

export interface CategoryData {
  name: string;
  count: number;
  isActive: boolean;
}

// interface Job {
//   _id: string;
//   title: string;
//   company: string;
//   location: string;
//   category: string;
//   description: string;
//   tags: string[];
//   featured: boolean;
//   latest: boolean;
//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

export interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
    jobs: Job[];
  };
}
