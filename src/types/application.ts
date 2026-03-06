export interface Application {
  _id: string;
  job: {
    _id: string;
    title: string;
    company: string;
    location: string;
    category: string;
  } | null;
  name: string;
  email: string;
  resume_link: string;
  cover_note: string;
  createdAt: string;
  updatedAt: string;
}

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
    applications: Application[];
  };
}
