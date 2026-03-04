/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import JobSearch from "@/components/home/JobSearch";
import JobCard from "@/components/Jobs/JobCard";
import JobFilters from "@/components/Jobs/JobFilter";
import { Job } from "@/types/job";
import { useSearchParams } from "next/navigation";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  console.log("search params this", searchParams);
  // Fetch jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      const category = searchParams.get("category");

      const queryString = category
        ? `category=${encodeURIComponent(category)}`
        : "";
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${queryString}`,
          {
            cache: "no-store",
          },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await res.json();
        const jobsData = data?.data?.jobs ?? [];

        setJobs(jobsData);

        // Extract unique categories and locations for filters
        const uniqueCategories = [
          ...new Set(jobsData.map((job: Job) => job.category)),
        ];
        const uniqueLocations = [
          ...new Set(jobsData.map((job: Job) => job.location)),
        ];

        setCategories(uniqueCategories);
        setLocations(uniqueLocations);

        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch jobs");
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []); // Empty dependency array means this runs once on mount

  // Filter jobs based on searchParams
  useEffect(() => {
    if (!jobs.length) return;

    let filtered = [...jobs];

    // Filter by search term
    if (searchParams?.search) {
      const searchTerm = searchParams.search.toString().toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title?.toLowerCase().includes(searchTerm) ||
          job.description?.toLowerCase().includes(searchTerm) ||
          job.company?.toLowerCase().includes(searchTerm),
      );
    }

    // Filter by location
    if (searchParams?.location && searchParams.location !== "all") {
      const location = searchParams.location.toString().toLowerCase();
      filtered = filtered.filter((job) =>
        job.location?.toLowerCase().includes(location),
      );
    }

    // Filter by category
    if (searchParams?.category && searchParams.category !== "all") {
      const category = searchParams.category.toString().toLowerCase();
      filtered = filtered.filter((job) =>
        job.category?.toLowerCase().includes(category),
      );
    }

    setFilteredJobs(filtered);
  }, [jobs, searchParams]); // Re-run when jobs or searchParams change

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Find Your Dream Job Today
          </h1>
          <p className="text-xl text-center text-indigo-100 mb-8">
            Discover thousands of job opportunities with top companies
          </p>
          <JobSearch initialJobs={jobs} searchParams={searchParams} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-80">
            <div className="sticky top-4">
              <JobFilters categories={categories} locations={locations} />
            </div>
          </aside>

          {/* Jobs Grid */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {filteredJobs.length} Job{filteredJobs.length !== 1 ? "s" : ""}{" "}
                Found
              </h2>
              {(searchParams?.search ||
                (searchParams?.location && searchParams.location !== "all") ||
                (searchParams?.category &&
                  searchParams.category !== "all")) && (
                <span className="text-sm text-gray-500">
                  Filtered by:{" "}
                  {searchParams?.search && `"${searchParams.search}"`}
                  {searchParams?.location &&
                    searchParams.location !== "all" &&
                    ` • ${searchParams.location}`}
                  {searchParams?.category &&
                    searchParams.category !== "all" &&
                    ` • ${searchParams.category}`}
                </span>
              )}
            </div>

            {/* Job Cards */}
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredJobs.map((job: Job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  No Jobs Found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
