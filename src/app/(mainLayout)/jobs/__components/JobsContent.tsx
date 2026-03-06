"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import JobSearch from "@/components/home/JobSearch";
import JobCard from "@/components/Jobs/JobCard";
import JobFilters from "@/components/Jobs/JobFilter";
import { Filters, Job } from "@/types/job";
import Container from "@/components/shared/Container";
import { JOBCOLORS } from "@/constant/color";

export default function JobsContent() {
  const searchParams = useSearchParams();

  // URL params to object
  const searchParamsObject = useMemo(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => (params[key] = value));
    return params;
  }, [searchParams]);

  // State
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get current filters
  const currentFilters: Filters = useMemo(
    () => ({
      search: searchParams.get("search"),
      location: searchParams.get("location"),
      category: searchParams.get("category"),
    }),
    [searchParams],
  );

  const hasActiveFilters = useMemo(
    () =>
      Boolean(
        currentFilters.search ||
        (currentFilters.location && currentFilters.location !== "all") ||
        (currentFilters.category && currentFilters.category !== "all"),
      ),
    [currentFilters],
  );

  // Build query params
  const buildQueryParams = useCallback(() => {
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

  // Extract unique values
  const extractUniqueValues = useCallback((jobsData: Job[]) => {
    if (!jobsData.length) return;
    setCategories([
      ...new Set(jobsData.map((j) => j.category).filter(Boolean)),
    ]);
    setLocations([...new Set(jobsData.map((j) => j.location).filter(Boolean))]);
  }, []);

  // Fetch jobs
  const fetchJobs = useCallback(async () => {
    const params = buildQueryParams();
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/jobs${params.toString() ? `?${params}` : ""}`;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to fetch jobs`);

      const data = await res.json();
      const jobsData = data?.data?.jobs ?? data?.jobs ?? data ?? [];

      if (Array.isArray(jobsData)) {
        setJobs(jobsData);
        extractUniqueValues(jobsData);
      } else {
        setJobs([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  }, [buildQueryParams, extractUniqueValues]);

  // Apply filters
  const applyFilters = useCallback(() => {
    if (!jobs.length) {
      setFilteredJobs([]);
      return;
    }

    let filtered = [...jobs];
    const { search, location, category } = currentFilters;

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title?.toLowerCase().includes(searchLower) ||
          job.company?.toLowerCase().includes(searchLower) ||
          job.tags?.some((tag) => tag.toLowerCase().includes(searchLower)),
      );
    }

    if (location && location !== "all") {
      filtered = filtered.filter((job) =>
        job.location?.toLowerCase().includes(location.toLowerCase()),
      );
    }

    if (category && category !== "all") {
      filtered = filtered.filter((job) =>
        job.category?.toLowerCase().includes(category.toLowerCase()),
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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div
            className="w-16 h-16 border-4 rounded-full animate-spin mx-auto"
            style={{
              borderColor: JOBCOLORS.primaryLight,
              borderTopColor: JOBCOLORS.primary,
            }}
          />
          <p className="mt-4 text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <p className="text-red-600 mb-4">⚠️ {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 text-white rounded-lg transition-colors"
            style={{ backgroundColor: JOBCOLORS.primary }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(135deg, #f8fafc 0%, ${JOBCOLORS.secondaryLight} 100%)`,
      }}
    >
      {/* Hero */}
      <section
        className="text-white"
        style={{ background: JOBCOLORS.gradient }}
      >
        <div className="container mx-auto px-4 py-12 md:py-16">
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">
            Find Your Dream Job Today
          </h1>
          <p className="text-lg md:text-xl text-center text-indigo-100 mb-8">
            Discover thousands of job opportunities with top companies
          </p>
          <JobSearch initialJobs={jobs} searchParams={searchParamsObject} />
        </div>
      </section>

      {/* Main */}
      <Container>
        <section className="px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-80">
              <div className="sticky top-4">
                <JobFilters categories={categories} locations={locations} />
              </div>
            </aside>

            {/* Content */}
            <main className="flex-1">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  <span style={{ color: JOBCOLORS.primary }}>
                    {filteredJobs.length}
                  </span>{" "}
                  Job
                  {filteredJobs.length !== 1 ? "s" : ""} Found
                </h2>
                {hasActiveFilters && (
                  <span className="text-sm text-gray-500">
                    Filtered by:{" "}
                    {[
                      currentFilters.search && `"${currentFilters.search}"`,
                      currentFilters.location !== "all" &&
                        currentFilters.location,
                      currentFilters.category !== "all" &&
                        currentFilters.category,
                    ]
                      .filter(Boolean)
                      .join(" • ")}
                  </span>
                )}
              </div>

              {/* Jobs Grid */}
              {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredJobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No Jobs Found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Try adjusting your search or filters
                  </p>
                  <button
                    onClick={() => window.history.pushState({}, "", "/jobs")}
                    className="px-6 py-2 text-white rounded-lg transition-colors"
                    style={{ backgroundColor: JOBCOLORS.primary }}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </main>
          </div>
        </section>
      </Container>
    </div>
  );
}
