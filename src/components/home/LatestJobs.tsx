import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  tags: string[];
  icon: React.ReactNode;
}

const jobListings: JobListing[] = [
  {
    id: "1",
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    tags: ["Full-Time", "Marketing", "Design"],
    icon: (
      <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">
        P
      </div>
    ),
  },
  {
    id: "2",
    title: "Social Media Assistant",
    company: "Netlify",
    location: "Paris, France",
    tags: ["Full-Time", "Marketing", "Design"],
    icon: (
      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold">
        N
      </div>
    ),
  },
  {
    id: "3",
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, USA",
    tags: ["Full-Time", "Marketing", "Design"],
    icon: (
      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold">
        D
      </div>
    ),
  },
  {
    id: "4",
    title: "Brand Designer",
    company: "Maze",
    location: "San Francisco, USA",
    tags: ["Full-Time", "Marketing", "Design"],
    icon: (
      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
        M
      </div>
    ),
  },
  {
    id: "5",
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    tags: ["Full-Time", "Marketing", "Design"],
    icon: (
      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold">
        T
      </div>
    ),
  },
  {
    id: "6",
    title: "Interactive Developer",
    company: "Udacity",
    location: "Hamburg, Germany",
    tags: ["Full-Time", "Marketing", "Design"],
    icon: (
      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold">
        U
      </div>
    ),
  },
  {
    id: "7",
    title: "HR Manager",
    company: "Packer",
    location: "Lucern, Switzerland",
    tags: ["Full-Time", "Marketing", "Design"],
    icon: (
      <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center text-white font-bold">
        P
      </div>
    ),
  },
  {
    id: "8",
    title: "HR Manager",
    company: "Webflow",
    location: "Lucern, Switzerland",
    tags: ["Full-Time", "Marketing", "Design"],
    icon: (
      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold">
        W
      </div>
    ),
  },
];

export default function LatestJobsOpen() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-slate-900">
              Latest <span className="text-blue-500">jobs open</span>
            </h2>
          </div>
          <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
            <span className="text-sm font-medium">Show all jobs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobListings.map((job) => (
            <div
              key={job.id}
              className="flex gap-4 p-6 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 bg-white"
            >
              {/* Icon */}
              <div className="flex-shrink-0">{job.icon}</div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-slate-900 mb-1">
                  {job.title}
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  {job.company} • {job.location}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant={index === 0 ? "secondary" : "outline"}
                      className={`text-xs font-medium ${
                        index === 0
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                          : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
