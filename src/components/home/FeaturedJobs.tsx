/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getFeaturedJobs } from "@/lib/getFeaturedJobs";
import { renderContent } from "@/utils/renderContent";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FeaturedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      const featureJobs = await getFeaturedJobs();
      setJobs(Array.isArray(featureJobs) ? featureJobs : ([] as any));
    }
    fetchJobs();
  }, []);

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            Featured <span className="text-primary">Jobs</span>
          </h2>
          <Link
            href="/jobs"
            className="hidden md:flex items-center gap-2 text-primary font-semibold hover:primary transition"
          >
            Show all jobs <MoveRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Jobs Grid - 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobs.slice(0, 8).map((job: any) => (
            <Link href={`/jobs/${job._id}`} key={job._id}>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white cursor-pointer h-full flex flex-col">
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
                <div className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {renderContent(job.description)}
                </div>

                {/* Tags/Categories */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {Array.isArray(job.tags) &&
                    job.tags.slice(0, 2).map((tag: any, idx: any) => {
                      const getTagColor = (tagString: string) => {
                        const colors = [
                          "bg-blue-50 text-blue-600",
                          "bg-green-50 text-green-600",
                          "bg-purple-50 text-purple-600",
                          "bg-orange-50 text-orange-600",
                          "bg-pink-50 text-pink-600",
                          "bg-indigo-50 text-indigo-600",
                          "bg-teal-50 text-teal-600",
                          "bg-red-50 text-red-600",
                          "bg-yellow-50 text-yellow-600",
                          "bg-cyan-50 text-cyan-600",
                        ];

                        const hash = tagString.split("").reduce((acc, char) => {
                          return char.charCodeAt(0) + ((acc << 5) - acc);
                        }, 0);

                        const index = Math.abs(hash) % colors.length;
                        return colors[index];
                      };

                      const colorClass = getTagColor(tag);

                      return (
                        <span
                          key={idx}
                          className={`px-3 py-1 text-xs font-medium rounded-full ${colorClass}`}
                        >
                          {tag}
                        </span>
                      );
                    })}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="flex justify-center mt-8 md:hidden">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition"
          >
            Show all jobs <MoveRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
