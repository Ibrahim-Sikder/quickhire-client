/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiResponse, Job } from "@/types/job";
import axios from "axios";
import { PlusCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import JobAddModal from "../__components/JobModal";
import JobsTable from "./__components/JobsTable";

export default function JobsList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  // Filter jobs based on search term
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDeleteJob = async (jobId: string) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${jobId}`,
        );

        if (response.data.success) {
          setJobs((prev) => prev.filter((job) => job._id !== jobId));
          toast.success("Job deleted successfully!");
        }
      } catch (error) {
        console.error("Error deleting job:", error);
        toast.error("Failed to delete job");
      }
    }
  };

  const handleAddJob = async () => {
    await fetchJobs(currentPage);
  };

  const handleEditJob = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleUpdateJob = async () => {
    await fetchJobs(currentPage);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Job Management</h1>
        <Button
          onClick={() => {
            setSelectedJob(null);
            setIsModalOpen(true);
          }}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Job
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Jobs Table */}
      <JobsTable
        jobs={filteredJobs}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        totalJobs={totalJobs}
        onEdit={handleEditJob}
        onDelete={handleDeleteJob}
        onPageChange={setCurrentPage}
      />

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
    </div>
  );
}
