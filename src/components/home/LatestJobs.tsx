import { ArrowRight } from "lucide-react";
import { getLatestJobs } from "@/lib/getLatestJobs";
import { JobListing } from "@/types/job";
import JobCard from "./JobCard";

export default async function LatestJobsOpen() {
  const jobs: JobListing[] = await getLatestJobs();

  const hasJobs = jobs && jobs.length > 0;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900">
            Latest <span className="text-blue-500">Jobs</span>
          </h2>

          <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition">
            Show All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Jobs */}
        {!hasJobs ? (
          <p className="text-center text-slate-500 py-12">No jobs available.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
