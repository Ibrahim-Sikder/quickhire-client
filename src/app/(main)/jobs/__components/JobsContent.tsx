"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import JobSearch from "@/components/home/JobSearch";
import JobCard from "@/components/Jobs/JobCard";
import JobFilters from "@/components/Jobs/JobFilter";
import { Filters, INITIAL_STATE, Job } from "@/types/job";

export default function JobsContent() {
  const searchParams = useSearchParams();

  // Convert URLSearchParams to plain object for JobSearch component
  const searchParamsObject = useMemo(() => {
    const params: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  // State with proper initialization
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get current filters from URL
  const currentFilters: Filters = useMemo(
    () => ({
      search: searchParams.get("search"),
      location: searchParams.get("location"),
      category: searchParams.get("category"),
    }),
    [searchParams],
  );

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return Boolean(
      currentFilters.search ||
      (currentFilters.location && currentFilters.location !== "all") ||
      (currentFilters.category && currentFilters.category !== "all"),
    );
  }, [currentFilters]);

  // Build API query params
  const buildQueryParams = useCallback((): URLSearchParams => {
    const params = new URLSearchParams();

    if (currentFilters.search) params.set("search", currentFilters.search);
    if (currentFilters.location && currentFilters.location !== "all") {
      params.set("location", currentFilters.location);
    }
    if (currentFilters.category && currentFilters.category !== "all") {
      params.set("category", currentFilters.category);
    }

    return params;
  }, [currentFilters]);

  // Extract unique values from jobs
  const extractUniqueValues = useCallback((jobsData: Job[]) => {
    if (!jobsData || jobsData.length === 0) return;

    const uniqueCategories = [
      ...new Set(jobsData.map((job) => job.category).filter(Boolean)),
    ];

    const uniqueLocations = [
      ...new Set(jobsData.map((job) => job.location).filter(Boolean)),
    ];

    setCategories(uniqueCategories);
    setLocations(uniqueLocations);
  }, []);

  // Fetch jobs from API
  const fetchJobs = useCallback(async () => {
    const params = buildQueryParams();
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/jobs${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch jobs: ${response.status}`);
      }

      const data = await response.json();

      // Handle different API response structures
      const jobsData = data?.data?.jobs ?? data?.jobs ?? data ?? [];

      if (Array.isArray(jobsData)) {
        setJobs(jobsData);
        extractUniqueValues(jobsData);
      } else {
        console.error("Unexpected data format:", data);
        setJobs([]);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  }, [buildQueryParams, extractUniqueValues]);

  // Apply client-side filtering
  const applyFilters = useCallback(() => {
    if (!jobs.length) {
      setFilteredJobs([]);
      return;
    }

    let filtered = [...jobs];

    // Apply search filter
    if (currentFilters.search) {
      const searchLower = currentFilters.search.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title?.toLowerCase().includes(searchLower) ||
          job.description?.toLowerCase().includes(searchLower) ||
          job.company?.toLowerCase().includes(searchLower) ||
          job.tags?.some((tag) => tag.toLowerCase().includes(searchLower)),
      );
    }

    // Apply location filter
    if (currentFilters.location && currentFilters.location !== "all") {
      const locationLower = currentFilters.location.toLowerCase();
      filtered = filtered.filter((job) =>
        job.location?.toLowerCase().includes(locationLower),
      );
    }

    // Apply category filter
    if (currentFilters.category && currentFilters.category !== "all") {
      const categoryLower = currentFilters.category.toLowerCase();
      filtered = filtered.filter((job) =>
        job.category?.toLowerCase().includes(categoryLower),
      );
    }

    setFilteredJobs(filtered);
  }, [jobs, currentFilters]);

  // Effects
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Debug logs
  useEffect(() => {}, [jobs, filteredJobs]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600 font-medium">Loading jobs...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-600 mb-4 text-lg">⚠️ {error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Active filters display
  const renderActiveFilters = () => {
    if (!hasActiveFilters) return null;

    const parts = [];
    if (currentFilters.search) {
      parts.push(`"${currentFilters.search}"`);
    }
    if (currentFilters.location && currentFilters.location !== "all") {
      parts.push(currentFilters.location);
    }
    if (currentFilters.category && currentFilters.category !== "all") {
      parts.push(currentFilters.category);
    }

    return (
      <span className="text-sm text-gray-500">
        Filtered by: {parts.join(" • ")}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 md:mb-4">
            Find Your Dream Job Today
          </h1>
          <p className="text-lg md:text-xl text-center text-indigo-100 mb-6 md:mb-8 px-2">
            Discover thousands of job opportunities with top companies
          </p>
          <JobSearch initialJobs={jobs} searchParams={searchParamsObject} />
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-80">
            <div className="sticky top-4">
              <JobFilters categories={categories} locations={locations} />
            </div>
          </aside>

          {/* Jobs Grid */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                {filteredJobs.length} Job{filteredJobs.length !== 1 ? "s" : ""}{" "}
                Found
              </h2>
              {renderActiveFilters()}
            </div>

            {/* Job Cards */}
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 md:py-16 bg-white rounded-xl shadow-sm">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-2">
                  No Jobs Found
                </h3>
                <p className="text-gray-500 px-4">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </main>
        </div>
      </section>
    </div>
  );
}
