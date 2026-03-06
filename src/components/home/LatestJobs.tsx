import { ArrowRight } from "lucide-react";
import { getLatestJobs } from "@/lib/getLatestJobs";
import { JobListing } from "@/types/job";
import JobCard from "./JobCard";
import Link from "next/link";

export default async function LatestJobsOpen() {
  const jobs: JobListing[] = await getLatestJobs();
  const hasJobs = jobs && jobs.length > 0;

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Latest <span className="text-accent">Jobs Open</span>
          </h2>

          <Link
            href="/jobs"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition"
          >
            Show All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Jobs */}
        {!hasJobs ? (
          <p className="text-center text-slate-500 py-12">No jobs available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {jobs.slice(0, 8).map((job) => (
              <Link href={`/jobs/${job._id}`} key={job._id} className="block">
                <JobCard job={job} />
              </Link>
            ))}
          </div>
        )}

        {/* Mobile Show All Button */}
        <div className="flex justify-center mt-8 md:hidden">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition"
          >
            Show All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
