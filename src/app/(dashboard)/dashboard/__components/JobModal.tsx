/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Briefcase,
  Building2,
  MapPin,
  Plus,
  Sparkles,
  Star,
  Tag,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { defaultCategories } from "@/constant/job";
import { JobAddModalProps } from "@/types/job";
import RichTextEditor from "./RichTextEditor";
import QuickHireModal from "@/components/shared/QuickHireModal";

// Category Select Component
const CategorySelect = ({ value, onChange, disabled }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customCategory, setCustomCategory] = useState("");

  const filteredCategories = defaultCategories.filter((cat) =>
    cat.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddCustomCategory = () => {
    if (customCategory.trim()) {
      onChange(customCategory.trim());
      setCustomCategory("");
      setIsAddingCustom(false);
      setSearchTerm("");
    }
  };

  if (isAddingCustom) {
    return (
      <div className="flex gap-2">
        <Input
          placeholder="Enter custom category"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          autoFocus
          className="border-gray-200 focus:border-primary focus:ring-primary/20"
        />
        <Button
          type="button"
          onClick={handleAddCustomCategory}
          size="sm"
          className="bg-primary hover:bg-primary/90 text-white"
        >
          Add
        </Button>
        <Button
          type="button"
          onClick={() => setIsAddingCustom(false)}
          size="sm"
          variant="outline"
          className="border-gray-200 hover:bg-accent/10"
        >
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="border-gray-200 focus:ring-primary/20">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        {filteredCategories.map((cat) => (
          <SelectItem
            key={cat}
            value={cat}
            className="cursor-pointer hover:bg-accent/10"
          >
            {cat}
          </SelectItem>
        ))}
        <Button
          type="button"
          variant="ghost"
          className="w-full mt-2 text-primary hover:bg-accent/10"
          onClick={() => setIsAddingCustom(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Custom
        </Button>
      </SelectContent>
    </Select>
  );
};

export default function JobAddModal({
  isOpen,
  onClose,
  onJobAdded,
  onJobUpdated,
  jobToEdit,
}: JobAddModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    category: "",
    description: "",
    tags: [] as string[],
    featured: false,
    latest: true,
    isActive: true,
  });
  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens/closes or jobToEdit changes
  useEffect(() => {
    if (isOpen) {
      if (jobToEdit) {
        setFormData({
          title: jobToEdit.title,
          company: jobToEdit.company,
          location: jobToEdit.location,
          category: jobToEdit.category,
          description: jobToEdit.description,
          tags: jobToEdit.tags,
          featured: jobToEdit.featured || false,
          latest: jobToEdit.latest !== undefined ? jobToEdit.latest : true,
          isActive:
            jobToEdit.isActive !== undefined ? jobToEdit.isActive : true,
        });
      } else {
        setFormData({
          title: "",
          company: "",
          location: "",
          category: "",
          description: "",
          tags: [],
          featured: false,
          latest: true,
          isActive: true,
        });
      }
      setTagInput("");
    }
  }, [jobToEdit, isOpen]);

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // FIX: Made 'e' optional (e?) to satisfy QuickHireModal's () => void requirement
  // while still working with the <form> submit event.
  const handleSubmit = async (e?: React.FormEvent) => {
    // Prevent default only if the event exists (i.e., called from Form)
    if (e) {
      e.preventDefault();
    }

    if (
      !formData.title ||
      !formData.company ||
      !formData.location ||
      !formData.category ||
      !formData.description
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    const submitToast = toast.loading(
      jobToEdit ? "Updating job..." : "Creating job...",
    );

    try {
      let response;
      if (jobToEdit) {
        response = await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${jobToEdit._id}`,
          formData,
        );
        toast.success("Job updated successfully!", { id: submitToast });
        if (onJobUpdated) {
          onJobUpdated(response.data);
        }
      } else {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/jobs`,
          formData,
        );
        toast.success("Job created successfully!", { id: submitToast });
        if (onJobAdded) {
          onJobAdded(response.data);
        }
      }
      onClose();
    } catch (error) {
      toast.error(`Failed to ${jobToEdit ? "update" : "create"} job`, {
        id: submitToast,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <QuickHireModal
      isOpen={isOpen}
      onClose={onClose}
      title={jobToEdit ? "Edit Job" : "Create New Job"}
      description={
        jobToEdit
          ? "Update the job listing details below."
          : "Add a new job listing to your platform."
      }
      size="5xl"
      submitText={jobToEdit ? "Update Job" : "Create Job"}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit} // No type error now
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="font-medium text-primary">Basic Information</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-700">
                Job Title <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="title"
                  placeholder="e.g. Senior Frontend Engineer"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="pl-10 border-gray-200 focus:border-primary focus:ring-primary/20"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-gray-700">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="company"
                  placeholder="e.g. TechNova Ltd"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="pl-10 border-gray-200 focus:border-primary focus:ring-primary/20"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-gray-700">
                Location <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="location"
                  placeholder="e.g. Remote or Dhaka"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="pl-10 border-gray-200 focus:border-primary focus:ring-primary/20"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-700">
                Category <span className="text-red-500">*</span>
              </Label>
              <CategorySelect
                value={formData.category}
                onChange={(value: string) =>
                  setFormData({ ...formData, category: value })
                }
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <h3 className="font-medium text-primary">Job Description *</h3>
          <RichTextEditor
            value={formData.description}
            onChange={(value) =>
              setFormData({ ...formData, description: value })
            }
          />
        </div>

        {/* Tags */}
        <div className="space-y-4">
          <h3 className="font-medium text-primary">Tags</h3>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Add tags (e.g. React, NodeJS)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                className="pl-10 border-gray-200 focus:border-primary focus:ring-primary/20"
                disabled={isSubmitting}
              />
            </div>
            <Button
              type="button"
              onClick={handleAddTag}
              variant="outline"
              className="border-gray-200 hover:bg-[#26A4FF]/10 hover:border-[#26A4FF]"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg min-h-[60px]">
            {formData.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="px-3 py-1 bg-primary text-white hover:bg-primary/90"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 hover:text-white/80"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {formData.tags.length === 0 && (
              <p className="text-sm text-gray-500">No tags added yet</p>
            )}
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-4">
          <h3 className="font-medium text-primary">Settings</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-gray-700">
                  Featured Job
                </span>
              </div>
              <Switch
                checked={formData.featured}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, featured: checked })
                }
                disabled={isSubmitting}
                className="data-[state=checked]:bg-primary"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#26A4FF]" />
                <span className="text-sm font-medium text-gray-700">
                  Latest Job
                </span>
              </div>
              <Switch
                checked={formData.latest}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, latest: checked })
                }
                disabled={isSubmitting}
                className="data-[state=checked]:bg-[#26A4FF]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <span className="text-sm font-medium text-green-700">
              Publish immediately
            </span>
            <Switch
              checked={formData.isActive}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isActive: checked })
              }
              disabled={isSubmitting}
              className="data-[state=checked]:bg-green-600"
            />
          </div>
        </div>
      </form>
    </QuickHireModal>
  );
}
