/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface ReusableModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  showFooter?: boolean;
  submitText?: string;
  cancelText?: string;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  size?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "full";
  className?: string;
}

const sizeClasses = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
  "3xl": "sm:max-w-3xl",
  "4xl": "sm:max-w-4xl",
  "5xl": "sm:max-w-5xl",
  "6xl": "sm:max-w-6xl",
  "7xl": "sm:max-w-7xl",
  full: "sm:max-w-[95vw]",
};

export default function QuickHireModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  showFooter = true,
  submitText = "Submit",
  cancelText = "Cancel",
  onSubmit,
  isSubmitting = false,
  size = "lg",
  className = "",
}: ReusableModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto p-0 ${className}`}
      >
        <div className="p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-[#4640de] text-xl font-semibold">
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription className="text-gray-500 mt-1">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>

          <div className="py-2">{children}</div>

          {showFooter && (
            <DialogFooter className="mt-6 pt-4 border-t border-gray-200">
              {footer || (
                <div className="flex w-full justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="border-gray-200 hover:bg-[#26A4FF]/10 hover:border-[#26A4FF] min-w-[100px]"
                  >
                    {cancelText}
                  </Button>
                  <Button
                    type={onSubmit ? "button" : "submit"}
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    className="bg-[#4640de] hover:bg-[#4640de]/90 text-white min-w-[100px]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{submitText}</span>
                      </div>
                    ) : (
                      submitText
                    )}
                  </Button>
                </div>
              )}
            </DialogFooter>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
