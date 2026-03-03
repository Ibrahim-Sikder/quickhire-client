/* eslint-disable @typescript-eslint/no-explicit-any */
import JobSearch from "@/components/home/JobSearch";
import JobCard from "@/components/Jobs/JobCard";
import JobFilters from "@/components/Jobs/JobFilter";
import { getJobs } from "@/lib/getJobs";
import { Job } from "@/types/job";

export default async function JobsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const jobs = await getJobs();

  // Get unique categories and locations for filters
  const categories = [...new Set(jobs.map((job: Job) => job.category))];
  const locations = [...new Set(jobs.map((job: Job) => job.location))];

  // Filter jobs based on search params
  const filteredJobs = jobs.filter((job: Job) => {
    const searchTerm = searchParams?.search?.toString().toLowerCase() || "";
    const locationFilter = searchParams?.location?.toString() || "";
    const categoryFilter = searchParams?.category?.toString() || "";
    const jobTypeFilter = searchParams?.jobType?.toString() || "";

    const matchesSearch =
      !searchTerm ||
      job.title.toLowerCase().includes(searchTerm) ||
      job.company.toLowerCase().includes(searchTerm) ||
      job.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      job.category.toLowerCase().includes(searchTerm);

    const matchesLocation =
      !locationFilter ||
      locationFilter === "all" ||
      job.location === locationFilter;
    const matchesCategory =
      !categoryFilter ||
      categoryFilter === "all" ||
      job.category === categoryFilter;
    const matchesJobType =
      !jobTypeFilter ||
      jobTypeFilter === "all" ||
      job.jobType === jobTypeFilter;

    return (
      matchesSearch && matchesLocation && matchesCategory && matchesJobType
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Hero Section with Search */}
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
                {filteredJobs.length} Jobs Found
              </h2>
              <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Most Relevant</option>
                <option>Latest</option>
                <option>Highest Paying</option>
              </select>
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
