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
