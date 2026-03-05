/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Briefcase,
  Building2,
  Code,
  Eraser,
  Heading1,
  Heading2,
  Heading3,
  Image,
  Italic,
  Link2,
  List,
  ListOrdered,
  MapPin,
  Minus,
  Pilcrow,
  Plus,
  PlusCircle,
  Quote,
  Redo,
  Search,
  Sparkles,
  Star,
  Strikethrough,
  Tag,
  Underline,
  Undo,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

// Rich Text Editor Components
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import ImageExtension from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Strike from "@tiptap/extension-strike";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import UnderlineExtension from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { availableTags, defaultCategories } from "@/constant/job";
import { JobAddModalProps } from "@/types/job";

const API_BASE_URL = "http://localhost:8000/api/v1";

// Enhanced Category Select with Search Component
const CategorySelect = ({ value, onChange, disabled }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customCategory, setCustomCategory] = useState("");
  const [categories, setCategories] = useState(defaultCategories);

  const filteredCategories = categories.filter((cat) =>
    cat.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddCustomCategory = () => {
    if (customCategory.trim()) {
      setCategories((prev) => [...prev, customCategory.trim()]);
      onChange(customCategory.trim());
      setCustomCategory("");
      setIsAddingCustom(false);
      setSearchTerm("");
    }
  };

  return (
    <div className="space-y-2">
      {!isAddingCustom ? (
        <Select value={value} onValueChange={onChange} disabled={disabled}>
          <SelectTrigger className="border-slate-200 focus:ring-indigo-500">
            <SelectValue placeholder="Select or search category" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            <div className="p-2 sticky top-0 bg-white border-b border-slate-200">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 h-8 text-sm"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
            <div className="py-1">
              {filteredCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
              {filteredCategories.length === 0 && (
                <div className="px-2 py-4 text-center">
                  <p className="text-sm text-slate-500 mb-2">
                    No categories found
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAddingCustom(true);
                      setCustomCategory(searchTerm);
                    }}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add {searchTerm} as new category
                  </Button>
                </div>
              )}
            </div>
          </SelectContent>
        </Select>
      ) : (
        <div className="flex gap-2">
          <Input
            placeholder="Enter custom category"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            className="border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
            autoFocus
          />
          <Button
            type="button"
            onClick={handleAddCustomCategory}
            size="sm"
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Add
          </Button>
          <Button
            type="button"
            onClick={() => setIsAddingCustom(false)}
            size="sm"
            variant="outline"
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

// Enhanced Menu Bar Component for Rich Text Editor
const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b border-slate-200 bg-white sticky top-0 z-10">
      {/* Main Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-slate-100">
        {/* Text Style Dropdown */}
        <div className="flex items-center gap-1 px-2 border-r border-slate-200">
          <select
            className="text-sm border-none bg-transparent focus:outline-none cursor-pointer py-1 px-2 rounded hover:bg-slate-100"
            onChange={(e) => {
              const value = e.target.value;
              if (value === "paragraph") {
                editor.chain().focus().setParagraph().run();
              } else if (value === "h1") {
                editor.chain().focus().toggleHeading({ level: 1 }).run();
              } else if (value === "h2") {
                editor.chain().focus().toggleHeading({ level: 2 }).run();
              } else if (value === "h3") {
                editor.chain().focus().toggleHeading({ level: 3 }).run();
              }
            }}
            value={
              editor.isActive("heading", { level: 1 })
                ? "h1"
                : editor.isActive("heading", { level: 2 })
                  ? "h2"
                  : editor.isActive("heading", { level: 3 })
                    ? "h3"
                    : "paragraph"
            }
          >
            <option value="paragraph">Normal Text</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
          </select>
        </div>

        {/* Text Color */}
        <div className="flex items-center gap-1 px-2 border-r border-slate-200">
          <input
            type="color"
            onInput={(e) =>
              editor
                .chain()
                .focus()
                .setColor((e.target as HTMLInputElement).value)
                .run()
            }
            value={editor.getAttributes("textStyle").color || "#000000"}
            className="w-6 h-6 p-0 border-0 cursor-pointer"
            title="Text Color"
          />
        </div>

        {/* Highlight Color */}
        <div className="flex items-center gap-1 px-2">
          <input
            type="color"
            onInput={(e) =>
              editor
                .chain()
                .focus()
                .setHighlight({ color: (e.target as HTMLInputElement).value })
                .run()
            }
            value={editor.getAttributes("highlight").color || "#ffff00"}
            className="w-6 h-6 p-0 border-0 cursor-pointer"
            title="Highlight Color"
          />
        </div>
      </div>

      {/* Formatting Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("bold") && "bg-indigo-100 text-indigo-600",
          )}
          title="Bold (Ctrl+B)"
        >
          <Bold className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("italic") && "bg-indigo-100 text-indigo-600",
          )}
          title="Italic (Ctrl+I)"
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("underline") && "bg-indigo-100 text-indigo-600",
          )}
          title="Underline (Ctrl+U)"
        >
          <Underline className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("strike") && "bg-indigo-100 text-indigo-600",
          )}
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-slate-200 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("heading", { level: 1 }) &&
              "bg-indigo-100 text-indigo-600",
          )}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("heading", { level: 2 }) &&
              "bg-indigo-100 text-indigo-600",
          )}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("heading", { level: 3 }) &&
              "bg-indigo-100 text-indigo-600",
          )}
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("paragraph") && "bg-indigo-100 text-indigo-600",
          )}
          title="Paragraph"
        >
          <Pilcrow className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-slate-200 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("bulletList") && "bg-indigo-100 text-indigo-600",
          )}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("orderedList") && "bg-indigo-100 text-indigo-600",
          )}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-slate-200 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive({ textAlign: "left" }) &&
              "bg-indigo-100 text-indigo-600",
          )}
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive({ textAlign: "center" }) &&
              "bg-indigo-100 text-indigo-600",
          )}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive({ textAlign: "right" }) &&
              "bg-indigo-100 text-indigo-600",
          )}
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-slate-200 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            const url = window.prompt("Enter URL:");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("link") && "bg-indigo-100 text-indigo-600",
          )}
          title="Insert Link"
        >
          <Link2 className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            const url = window.prompt("Enter image URL:");
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          className="h-8 w-8 p-0"
          title="Insert Image"
        >
          <Image className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("blockquote") && "bg-indigo-100 text-indigo-600",
          )}
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={cn(
            "h-8 w-8 p-0",
            editor.isActive("codeBlock") && "bg-indigo-100 text-indigo-600",
          )}
          title="Code Block"
        >
          <Code className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="h-8 w-8 p-0"
          title="Horizontal Line"
        >
          <Minus className="h-4 w-4" />
        </Button>

        <div className="flex-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="h-8 w-8 p-0"
          title="Undo (Ctrl+Z)"
        >
          <Undo className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="h-8 w-8 p-0"
          title="Redo (Ctrl+Y)"
        >
          <Redo className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
          className="h-8 w-8 p-0"
          title="Clear Formatting"
        >
          <Eraser className="h-4 w-4" />
        </Button>
      </div>
    </div>
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

  // Initialize TipTap editor with fixed heading support
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      UnderlineExtension,
      Strike,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Typography,
      Placeholder.configure({
        placeholder: `
          Write a comprehensive job description...

          Suggested sections:
          • About the company
          • Job responsibilities
          • Required qualifications
          • Preferred qualifications
          • Benefits & perks
          • How to apply
        `,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            "text-indigo-600 underline underline-offset-2 hover:text-indigo-800",
        },
      }),
      ImageExtension.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto my-4",
        },
      }),
      HorizontalRule,
    ],
    content: formData.description,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({
        ...prev,
        description: editor.getHTML(),
      }));
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg max-w-none focus:outline-none min-h-[400px] p-6",
      },
    },
  });

  // Update editor content when formData.description changes (for editing)
  useEffect(() => {
    if (editor && formData.description !== editor.getHTML()) {
      editor.commands.setContent(formData.description);
    }
  }, [formData.description, editor]);

  // Load job data when editing
  useEffect(() => {
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
        isActive: jobToEdit.isActive !== undefined ? jobToEdit.isActive : true,
      });
    } else {
      // Reset form when adding new
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
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
        // Update existing job
        response = await axios.patch(
          `${API_BASE_URL}/jobs/${jobToEdit._id}`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (response.data.success) {
          toast.success("Job updated successfully!", {
            id: submitToast,
            icon: "✅",
          });
          if (onJobUpdated) {
            onJobUpdated(response.data);
          }
        }
      } else {
        // Create new job
        response = await axios.post(`${API_BASE_URL}/jobs`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.data.success) {
          toast.success("Job created successfully!", {
            id: submitToast,
            icon: "✨",
          });
          if (onJobAdded) {
            onJobAdded(response.data);
          }
        }
      }

      // Close modal after successful operation
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error: any) {
      console.error("Error saving job:", error);

      let errorMessage = `Failed to ${jobToEdit ? "update" : "create"} job`;

      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      }

      toast.error(errorMessage, {
        id: submitToast,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b border-slate-200 pb-4 sticky top-0 bg-white z-20">
          <DialogTitle className="text-2xl font-semibold text-slate-900">
            {jobToEdit ? "Edit Job" : "Create New Job"}
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            {jobToEdit
              ? "Update the job listing details below."
              : "Add a new job listing to your platform. Fill in the details below."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Basic Information Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-900 uppercase tracking-wider">
              Basic Information
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Job Title <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="title"
                    placeholder="e.g. Senior Frontend Engineer"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="pl-10 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-medium">
                  Company Name <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="company"
                    placeholder="e.g. TechNova Ltd"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="pl-10 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium">
                  Location <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="location"
                    placeholder="e.g. Remote or Dhaka, Bangladesh"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="pl-10 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">
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

          {/* Description Section with Rich Text Editor */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-900 uppercase tracking-wider">
              Job Description <span className="text-red-500">*</span>
            </h3>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <MenuBar editor={editor} />
              <EditorContent editor={editor} className="bg-white" />
            </div>

            {/* Preview of formatted text */}
            {formData.description && (
              <div className="mt-2 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs font-medium text-slate-500 mb-3 uppercase tracking-wider">
                  Preview
                </p>
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: formData.description }}
                />
              </div>
            )}
          </div>

          {/* Tags Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-900 uppercase tracking-wider">
              Tags
            </h3>

            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Add tags (e.g. React, NodeJS)"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), handleAddTag())
                    }
                    className="pl-10 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                    disabled={isSubmitting}
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleAddTag}
                  variant="outline"
                  className="border-slate-200 hover:bg-slate-100"
                  disabled={isSubmitting}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Selected Tags */}
              <div className="flex flex-wrap gap-2 mt-3 min-h-[40px] p-3 bg-slate-50 rounded-lg border border-slate-200">
                {formData.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 hover:text-indigo-900"
                      disabled={isSubmitting}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {formData.tags.length === 0 && (
                  <p className="text-sm text-slate-500">No tags added yet</p>
                )}
              </div>

              {/* Suggested Tags */}
              <div className="mt-3">
                <p className="text-xs text-slate-500 mb-2">Suggested tags:</p>
                <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto p-2 border border-slate-100 rounded-lg">
                  {availableTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
                      onClick={() => {
                        if (!formData.tags.includes(tag)) {
                          setFormData((prev) => ({
                            ...prev,
                            tags: [...prev.tags, tag],
                          }));
                        }
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-900 uppercase tracking-wider">
              Settings
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium text-slate-700">
                    Featured Job
                  </span>
                </div>
                <Switch
                  checked={formData.featured}
                  onCheckedChange={(checked: boolean) =>
                    setFormData({ ...formData, featured: checked })
                  }
                  className="data-[state=checked]:bg-yellow-600"
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium text-slate-700">
                    Latest Job
                  </span>
                </div>
                <Switch
                  checked={formData.latest}
                  onCheckedChange={(checked: boolean) =>
                    setFormData({ ...formData, latest: checked })
                  }
                  className="data-[state=checked]:bg-purple-600"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-green-700">
                  Publish immediately
                </span>
              </div>
              <Switch
                checked={formData.isActive}
                onCheckedChange={(checked: boolean) =>
                  setFormData({ ...formData, isActive: checked })
                }
                className="data-[state=checked]:bg-green-600"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <DialogFooter className="border-t border-slate-200 pt-4 sticky bottom-0 bg-white">
            <div className="flex gap-2 w-full justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-slate-200 hover:bg-slate-100"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[100px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {jobToEdit ? "Updating..." : "Creating..."}
                  </div>
                ) : jobToEdit ? (
                  "Update Job"
                ) : (
                  "Create Job"
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
