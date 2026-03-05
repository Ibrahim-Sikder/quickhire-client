/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  Building2,
  Clock,
  Copy,
  Download,
  Edit,
  Eye,
  Filter,
  MapPin,
  MoreVertical,
  PlusCircle,
  Power,
  RefreshCw,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import { useState, useEffect } from "react";
import JobAddModal from "../__components/JobModal";
import axios from "axios";
import toast from "react-hot-toast";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  tags: string[];
  featured: boolean;
  latest: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
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

export default function JobsList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);

  // Fetch jobs from API
  const fetchJobs = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.get<ApiResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/jobs?page=${page}&limit=10`,
      );

      if (response.data.success) {
        setJobs(response.data.data.jobs);
        setTotalPages(response.data.data.meta.totalPage);
        setTotalJobs(response.data.data.meta.total);
        toast.success("Jobs loaded successfully!");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to fetch jobs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(currentPage);
  }, [currentPage]);

  // Filter jobs based on search term and category
  const filteredJobs = jobs.filter(
    (job) =>
      (selectedCategory === "all" ||
        job.category.toLowerCase() === selectedCategory) &&
      (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const toggleJobStatus = async (jobId: string, currentStatus: boolean) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${jobId}`,
        {
          isActive: !currentStatus,
        },
      );

      if (response.data.success) {
        setJobs((prev) =>
          prev.map((job) =>
            job._id === jobId ? { ...job, isActive: !job.isActive } : job,
          ),
        );
        toast.success(
          `Job ${!currentStatus ? "activated" : "deactivated"} successfully!`,
          {
            icon: !currentStatus ? "✅" : "⏸️",
            style: {
              background: !currentStatus ? "#10b981" : "#f59e0b",
              color: "#fff",
            },
          },
        );
      }
    } catch (error) {
      console.error("Error toggling job status:", error);
      toast.error("Failed to update job status");
    }
  };

  const toggleFeatured = async (jobId: string, currentFeatured: boolean) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${jobId}`,
        {
          featured: !currentFeatured,
        },
      );

      if (response.data.success) {
        setJobs((prev) =>
          prev.map((job) =>
            job._id === jobId ? { ...job, featured: !job.featured } : job,
          ),
        );
        toast.success(
          `Job ${!currentFeatured ? "featured" : "unfeatured"} successfully!`,
          {
            icon: !currentFeatured ? "⭐" : "☆",
            style: {
              background: !currentFeatured ? "#8b5cf6" : "#6b7280",
              color: "#fff",
            },
          },
        );
      }
    } catch (error) {
      console.error("Error toggling featured:", error);
      toast.error("Failed to update featured status");
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    // Show confirmation alert before delete
    if (
      window.confirm(
        "⚠️ Are you sure you want to delete this job?\n\nThis action cannot be undone!",
      )
    ) {
      const deleteToast = toast.loading("Deleting job...");

      try {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${jobId}`,
        );

        if (response.data.success) {
          setJobs((prev) => prev.filter((job) => job._id !== jobId));
          toast.success("Job deleted successfully!", {
            id: deleteToast,
            icon: "🗑️",
          });
        }
      } catch (error) {
        console.error("Error deleting job:", error);
        toast.error("Failed to delete job", {
          id: deleteToast,
        });
      }
    }
  };

  const handleAddJob = async (newJob: any) => {
    await fetchJobs(currentPage);
  };

  const handleEditJob = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleUpdateJob = async (updatedJob: any) => {
    await fetchJobs(currentPage);
  };

  const handleDuplicateJob = async (job: Job) => {
    const duplicateToast = toast.loading("Duplicating job...");

    try {
      // Create a copy without _id and with new title
      const { _id, createdAt, updatedAt, ...jobData } = job;
      const duplicatedJob = {
        ...jobData,
        title: `${job.title} (Copy)`,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/jobs`,
        duplicatedJob,
      );

      if (response.data.success) {
        toast.success("Job duplicated successfully!", {
          id: duplicateToast,
          icon: "📋",
        });
        fetchJobs(currentPage);
      }
    } catch (error) {
      console.error("Error duplicating job:", error);
      toast.error("Failed to duplicate job", {
        id: duplicateToast,
      });
    }
  };

  const handleRefresh = () => {
    fetchJobs(currentPage);
  };

  const stats = {
    total: totalJobs,
    active: jobs.filter((j) => j.isActive).length,
    featured: jobs.filter((j) => j.featured).length,
    latest: jobs.filter((j) => j.latest).length,
  };

  // Get unique categories from jobs for filter
  const categories = ["All", ...new Set(jobs.map((job) => job.category))];

  return (
    <>
      <div className="space-y-6">
        {/* Header with Gradient */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Job Management
                </h1>
                <p className="text-indigo-100">
                  Manage and monitor all job listings in one place
                </p>
              </div>
              <Button
                onClick={() => {
                  setSelectedJob(null);
                  setIsModalOpen(true);
                }}
                className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-lg"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add New Job
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
              {[
                {
                  label: "Total Jobs",
                  value: stats.total,
                  icon: Building2,
                  color: "blue",
                },
                {
                  label: "Active Jobs",
                  value: stats.active,
                  icon: Power,
                  color: "green",
                },
                {
                  label: "Featured Jobs",
                  value: stats.featured,
                  icon: Star,
                  color: "yellow",
                },
                {
                  label: "Latest Jobs",
                  value: stats.latest,
                  icon: Clock,
                  color: "purple",
                },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                const colors = {
                  blue: "bg-blue-500/20 text-blue-200",
                  green: "bg-green-500/20 text-green-200",
                  yellow: "bg-yellow-500/20 text-yellow-200",
                  purple: "bg-purple-500/20 text-purple-200",
                };

                return (
                  <div
                    key={idx}
                    className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-indigo-100 text-sm">{stat.label}</p>
                        <p className="text-2xl font-bold text-white mt-1">
                          {stat.value}
                        </p>
                      </div>
                      <div
                        className={cn(
                          "p-3 rounded-lg",
                          colors[stat.color as keyof typeof colors],
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search jobs by title, company, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="gap-2"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCw
                  className={cn("h-4 w-4", isLoading && "animate-spin")}
                />
                Refresh
              </Button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat.toLowerCase())}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  selectedCategory === cat.toLowerCase()
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead className="font-semibold">Job Details</TableHead>
                    <TableHead className="font-semibold">Category</TableHead>
                    <TableHead className="font-semibold">Tags</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Posted Date</TableHead>
                    <TableHead className="font-semibold text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-10 text-slate-500"
                      >
                        No jobs found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredJobs.map((job) => (
                      <TableRow
                        key={job._id}
                        className="group hover:bg-slate-50/50"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border-2 border-slate-200">
                              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                                {getInitials(job.company)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-slate-900 flex items-center gap-2">
                                {job.title}
                                {job.featured && (
                                  <Badge
                                    variant="secondary"
                                    className="bg-yellow-100 text-yellow-700 border-yellow-200"
                                  >
                                    <Star className="h-3 w-3 mr-1" />
                                    Featured
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                                <span className="flex items-center gap-1">
                                  <Building2 className="h-3 w-3" />
                                  {job.company}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {job.location}
                                </span>
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-indigo-50 text-indigo-700 border-indigo-200"
                          >
                            {job.category}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {job.tags.slice(0, 3).map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="bg-slate-100"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {job.tags.length > 3 && (
                              <Badge
                                variant="secondary"
                                className="bg-slate-100"
                              >
                                +{job.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Switch
                              checked={job.isActive}
                              onCheckedChange={() =>
                                toggleJobStatus(job._id, job.isActive)
                              }
                              className="data-[state=checked]:bg-green-600"
                            />
                            <Badge
                              className={cn(
                                "capitalize",
                                job.isActive
                                  ? "bg-green-100 text-green-700 border-green-200"
                                  : "bg-slate-100 text-slate-600 border-slate-200",
                              )}
                            >
                              {job.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="text-sm">
                            <div className="font-medium text-slate-900">
                              {new Date(job.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </div>
                            <div className="text-xs text-slate-500">
                              {new Date(job.createdAt).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
                              onClick={() =>
                                toggleFeatured(job._id, job.featured)
                              }
                            >
                              <Star
                                className={cn(
                                  "h-4 w-4",
                                  job.featured &&
                                    "fill-yellow-400 text-yellow-400",
                                )}
                              />
                            </Button>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-slate-600 hover:text-green-600 hover:bg-green-50"
                              onClick={() => handleEditJob(job)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem
                                  className="gap-2 cursor-pointer"
                                  onClick={() => handleDuplicateJob(job)}
                                >
                                  <Copy className="h-4 w-4" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="gap-2 text-red-600 focus:text-red-600 cursor-pointer"
                                  onClick={() => handleDeleteJob(job._id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="border-t border-slate-200 px-6 py-4 flex items-center justify-between bg-slate-50">
                  <div className="text-sm text-slate-600">
                    Showing page {currentPage} of {totalPages} ({totalJobs}{" "}
                    total jobs)
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Add/Edit Job Modal */}
      <JobAddModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedJob(null);
        }}
        onJobAdded={handleAddJob}
        onJobUpdated={handleUpdateJob}
        jobToEdit={selectedJob}
      />
    </>
  );
}
