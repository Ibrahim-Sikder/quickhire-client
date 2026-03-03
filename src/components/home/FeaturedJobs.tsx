/* eslint-disable @typescript-eslint/no-explicit-any */
import { getFeaturedJobs } from "@/lib/getFeaturedJobs";
import { MoveRight } from "lucide-react";

export default async function FeaturedJobs() {
  const featureJobs = await getFeaturedJobs();
  const jobs = Array.isArray(featureJobs) ? featureJobs : [];

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            Featured <span className="text-blue-500">jobs</span>
          </h2>
          <button className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition">
            Show all jobs <MoveRight className="w-5 h-5" />
          </button>
        </div>

        {/* Jobs Grid - 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
            >
              {/* Top Section: Logo and Full Time Badge */}
              <div className="flex items-start justify-between mb-4">
                {/* Company Logo */}
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-gray-700">
                    {job.company ? job.company.charAt(0) : "C"}
                  </span>
                </div>

                {/* Full Time Badge */}
                <div className="px-3 py-1 border border-blue-500 text-blue-600 text-xs font-semibold rounded">
                  Full Time
                </div>
              </div>

              {/* Job Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {job.title}
              </h3>

              {/* Company and Location */}
              <p className="text-sm text-gray-600 mb-3">
                {job.company} · {job.location}
              </p>

              {/* Job Description */}
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {job.description}
              </p>

              {/* Tags/Categories */}
              <div className="flex flex-wrap gap-2">
                {Array.isArray(job.tags) &&
                  job.tags.slice(0, 2).map((tag: any, idx: any) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="flex justify-center mt-8 md:hidden">
          <button className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition">
            Show all jobs <MoveRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
