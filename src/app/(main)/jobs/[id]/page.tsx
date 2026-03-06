/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Job } from "@/types/job";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CompanyIcon } from "@/utils/companyIcon";
import {
  MapPin,
  Building2,
  Calendar,
  Briefcase,
  DollarSign,
  Clock,
  Users,
  Award,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import JobApply from "../__components/JobApply";

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showApplyForm, setShowApplyForm] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${id}`,
          { cache: "no-store" },
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch job details: ${response.status}`);
        }

        const result = await response.json();

        // Extract job data from the response structure
        const jobData = result?.data;

        if (!jobData) {
          throw new Error("Job not found");
        }

        setJob(jobData);
      } catch (err) {
        console.error("Error fetching job:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load job details",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600 font-medium">
            Loading job details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-600 mb-4 text-lg">⚠️ {error}</div>
          <Link href="/jobs">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Back to Jobs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Job Not Found
          </h2>
          <Link href="/jobs">
            <Button>Back to Jobs</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Combine tags with category for display
  const allTags = job.tags?.includes(job.category)
    ? job.tags
    : [...(job.tags || []), job.category].filter(Boolean);

  // Format date
  const formattedDate = job.createdAt
    ? new Date(job.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 py-4 md:py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Back Button */}
        <Link
          href="/jobs"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-4 md:mb-6 group text-sm md:text-base"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          <span className="ml-2">Back to Jobs</span>
        </Link>

        {/* Job Detail Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          {/* Header with Company Icon */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-4 md:px-8 py-6 md:py-8">
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 md:p-4 w-fit">
                <CompanyIcon company={job.company} />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3">
                  {job.title}
                </h1>
                <div className="flex flex-wrap gap-3 md:gap-4 text-indigo-100 text-sm md:text-base">
                  <span className="flex items-center gap-1 md:gap-2">
                    <Building2 className="h-3 w-3 md:h-4 md:w-4" />
                    {job.company}
                  </span>
                  <span className="flex items-center gap-1 md:gap-2">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1 md:gap-2">
                    <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                    Posted {formattedDate}
                  </span>
                </div>
              </div>
              {job.featured && (
                <Badge className="bg-yellow-400 text-yellow-900 px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm w-fit">
                  <Award className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-8">
            {/* Stats */}
            <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8 pb-4 md:pb-6 border-b border-slate-200">
              <div className="flex items-center gap-1 md:gap-2 text-slate-600 text-sm md:text-base">
                <Users className="h-4 w-4 md:h-5 md:w-5 text-indigo-600" />
                <span className="font-medium">
                  {job.applicants || 0} Applicants
                </span>
              </div>
              <div className="flex items-center gap-1 md:gap-2 text-slate-600 text-sm md:text-base">
                <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                <span className="font-medium">Active</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 md:gap-2 mb-6 md:mb-8">
              {allTags.map((tag, index) => (
                <Badge
                  key={tag + index}
                  variant={index === 0 ? "secondary" : "outline"}
                  className="text-xs px-2 md:px-3 py-0.5 md:py-1"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Job Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-slate-50 rounded-lg border border-slate-200">
                <Briefcase className="h-4 w-4 md:h-5 md:w-5 text-indigo-600 mt-1" />
                <div>
                  <h3 className="text-xs font-medium text-slate-500 uppercase">
                    Job Type
                  </h3>
                  <p className="font-semibold text-slate-900 text-sm md:text-base">
                    {job.jobType || "Full Time"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-slate-50 rounded-lg border border-slate-200">
                <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-indigo-600 mt-1" />
                <div>
                  <h3 className="text-xs font-medium text-slate-500 uppercase">
                    Salary
                  </h3>
                  <p className="font-semibold text-slate-900 text-sm md:text-base">
                    {job.salary || "Negotiable"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-slate-50 rounded-lg border border-slate-200">
                <Clock className="h-4 w-4 md:h-5 md:w-5 text-indigo-600 mt-1" />
                <div>
                  <h3 className="text-xs font-medium text-slate-500 uppercase">
                    Experience
                  </h3>
                  <p className="font-semibold text-slate-900 text-sm md:text-base">
                    {job.experience || "Not Specified"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-slate-50 rounded-lg border border-slate-200">
                <Building2 className="h-4 w-4 md:h-5 md:w-5 text-indigo-600 mt-1" />
                <div>
                  <h3 className="text-xs font-medium text-slate-500 uppercase">
                    Category
                  </h3>
                  <p className="font-semibold text-slate-900 text-sm md:text-base">
                    {job.category}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6 md:mb-8">
              <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-2 md:mb-4">
                Job Description
              </h2>
              <div className="prose max-w-none text-slate-600 whitespace-pre-line text-sm md:text-base">
                {job.description}
              </div>
            </div>

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-2 md:mb-4">
                  Benefits & Perks
                </h2>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {job.benefits.map((benefit, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-2 md:px-3 py-0.5 md:py-1 text-xs md:text-sm"
                    >
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Apply Button */}
            <Button
              onClick={() => setShowApplyForm(true)}
              className="w-full md:w-auto px-6 md:px-8 py-4 md:py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-base md:text-lg rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Apply Now
            </Button>
          </div>
        </div>

        {/* Apply Form Modal Component */}
        <JobApply
          job={job}
          isOpen={showApplyForm}
          onClose={() => setShowApplyForm(false)}
        />
      </div>
    </div>
  );
}
