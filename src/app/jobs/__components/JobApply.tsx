/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CompanyIcon } from "@/utils/companyIcon";

import toast from "react-hot-toast";
import {
  FormData,
  FormErrors,
  initialFormData,
  JobApplyProps,
} from "@/types/jobApply";

export default function JobApply({ job, isOpen, onClose }: JobApplyProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validation rules
  const validators = {
    name: (value: string) => {
      if (!value.trim()) return "Name is required";
      if (value.trim().length < 2) return "Name must be at least 2 characters";
      return "";
    },
    email: (value: string) => {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!value) return "Email is required";
      if (!emailRegex.test(value)) return "Please enter a valid email address";
      return "";
    },
    resume_link: (value: string) => {
      if (!value) return "Resume URL is required";
      try {
        new URL(value);
        return "";
      } catch {
        return "Please enter a valid URL (e.g., https://drive.google.com/...)";
      }
    },
    cover_note: (value: string) => {
      if (!value.trim()) return "Cover note is required";
      if (value.trim().length < 20)
        return "Cover note must be at least 20 characters";
      return "";
    },
  };

  const validateField = (name: keyof FormData, value: string): string => {
    return validators[name]?.(value) || "";
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setTouched({});
    setIsSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {},
    );
    setTouched(allTouched);

    // Validate form
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/applications`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            job: job._id,
            ...formData,
            email: formData.email.toLowerCase().trim(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        // Handle backend validation errors
        if (data.errorSources?.length) {
          const backendErrors: FormErrors = {};
          data.errorSources.forEach(
            (err: { path: string; message: string }) => {
              const field = err.path as keyof FormErrors;
              if (field in validators) {
                backendErrors[field] = err.message;
              }
            },
          );
          setErrors(backendErrors);
          toast.error(data.errorSources[0].message);
        } else {
          toast.error(data.message || "Failed to submit application");
        }
        return;
      }

      // Success
      setIsSuccess(true);
      toast.success("Application submitted successfully!");

      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClassName = (fieldName: keyof FormData) => {
    const baseClass = "w-full transition-colors duration-200";
    const hasError = touched[fieldName] && errors[fieldName];
    const isValid =
      touched[fieldName] && !errors[fieldName] && formData[fieldName];

    if (hasError)
      return `${baseClass} border-red-300 focus:border-red-500 focus:ring-red-500`;
    if (isValid)
      return `${baseClass} border-green-300 focus:border-green-500 focus:ring-green-500`;
    return `${baseClass} border-slate-200 focus:border-indigo-500 focus:ring-indigo-500`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative animate-fade-in border border-slate-200 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <CompanyIcon company={job.company} />
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-slate-900 truncate">
              {job.title}
            </h2>
            <p className="text-sm text-slate-600 truncate">{job.company}</p>
          </div>
        </div>

        {isSuccess ? (
          /* Success State */
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Application Submitted!
            </h3>
            <p className="text-slate-600">We'll notify you of any updates.</p>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="John Doe"
                className={getInputClassName("name")}
                disabled={isSubmitting}
              />
              {touched.name && errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="john@example.com"
                className={getInputClassName("email")}
                disabled={isSubmitting}
              />
              {touched.email && errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Resume URL Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Resume URL <span className="text-red-500">*</span>
              </label>
              <Input
                name="resume_link"
                value={formData.resume_link}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="https://drive.google.com/..."
                className={getInputClassName("resume_link")}
                disabled={isSubmitting}
              />
              {touched.resume_link && errors.resume_link ? (
                <p className="mt-1 text-xs text-red-500">
                  {errors.resume_link}
                </p>
              ) : (
                <p className="mt-1 text-xs text-slate-500">
                  Google Drive, Dropbox, or any shareable link
                </p>
              )}
            </div>

            {/* Cover Note Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Cover Note <span className="text-red-500">*</span>
              </label>
              <Textarea
                name="cover_note"
                value={formData.cover_note}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Why are you the best candidate? (Minimum 20 characters)"
                rows={4}
                className={getInputClassName("cover_note")}
                disabled={isSubmitting}
              />
              {touched.cover_note && errors.cover_note && (
                <p className="mt-1 text-xs text-red-500">{errors.cover_note}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
