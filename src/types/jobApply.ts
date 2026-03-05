import { Job } from "./job";

export interface JobApplyProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

export interface FormData {
  name: string;
  email: string;
  resume_link: string;
  cover_note: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  resume_link?: string;
  cover_note?: string;
}

export const initialFormData: FormData = {
  name: "",
  email: "",
  resume_link: "",
  cover_note: "",
};

export type FieldName = keyof FormData;

export interface FormField {
  name: FieldName;
  label: string;
  type?: string;
  placeholder: string;
  component: React.ElementType;
  helperText?: string | null;
  rows?: number;
}
