/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormData, FormErrors, FormField, FieldName } from "@/types/jobApply";

interface JobApplicationFormProps {
  formData: FormData;
  errors: FormErrors;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  getInputClassName: (fieldName: FieldName) => string;
}

const FORM_FIELDS: FormField[] = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "John Doe",
    component: Input,
    helperText: null,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "john@example.com",
    component: Input,
    helperText: null,
  },
  {
    name: "resume_link",
    label: "Resume URL",
    type: "url",
    placeholder: "https://drive.google.com/...",
    component: Input,
    helperText: "Google Drive, Dropbox, or any shareable link",
  },
  {
    name: "cover_note",
    label: "Cover Note",
    placeholder: "Why are you the best candidate? (Minimum 20 characters)",
    component: Textarea,
    helperText: null,
    rows: 4,
  },
];

export default function JobApplicationForm({
  formData,
  errors,
  touched,
  isSubmitting,
  onChange,
  onBlur,
  onSubmit,
  getInputClassName,
}: JobApplicationFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {FORM_FIELDS.map((field) => {
        const Component = field.component;
        const hasError = touched[field.name] && errors[field.name];
        const showHelperText = field.helperText && !hasError;

        // Prepare props based on field type
        const inputProps: any = {
          name: field.name,
          value: formData[field.name],
          onChange,
          onBlur,
          placeholder: field.placeholder,
          className: getInputClassName(field.name),
          disabled: isSubmitting,
        };

        // Add type only if it exists (for Input components)
        if (field.type) {
          inputProps.type = field.type;
        }

        // Add rows only if it exists (for Textarea components)
        if (field.rows) {
          inputProps.rows = field.rows;
        }

        return (
          <div key={field.name}>
            <label className="block text-sm font-medium text-foreground mb-1">
              {field.label} <span className="text-red-500">*</span>
            </label>

            <Component {...inputProps} />

            {hasError ? (
              <p className="mt-1 text-xs text-red-500">{errors[field.name]}</p>
            ) : showHelperText ? (
              <p className="mt-1 text-xs text-muted-foreground">
                {field.helperText}
              </p>
            ) : null}
          </div>
        );
      })}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] disabled:hover:scale-100"
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
