import { Button } from "@/components/ui/button";
import { MapPin, Briefcase } from "lucide-react";

export default function LatestJobs() {
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Stripe",
      location: "San Francisco, CA",
      type: "Full Time",
      logo: "S",
      logoColor: "bg-green-100",
      logoTextColor: "text-green-600",
      level: "Senior",
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "Figma",
      location: "Remote",
      type: "Full Time",
      logo: "F",
      logoColor: "bg-purple-100",
      logoTextColor: "text-purple-600",
      level: "Mid-level",
    },
    {
      id: 3,
      title: "Backend Engineer",
      company: "Notion",
      location: "San Francisco, CA",
      type: "Full Time",
      logo: "N",
      logoColor: "bg-gray-200",
      logoTextColor: "text-gray-700",
      level: "Senior",
    },
    {
      id: 4,
      title: "Product Designer",
      company: "Slack",
      location: "Remote",
      type: "Full Time",
      logo: "Sl",
      logoColor: "bg-blue-100",
      logoTextColor: "text-blue-600",
      level: "Mid-level",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Latest <span className="text-blue-500">jobs open</span></h2>
            <p className="text-gray-600 text-sm font-medium">Explore the most recent job postings</p>
          </div>
          <Button variant="outline" className="hidden md:inline-flex text-sm font-semibold border-gray-300 text-gray-700">
            View all →
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-gray-300 transition group"
            >
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-xl ${job.logoColor} flex items-center justify-center flex-shrink-0`}>
                  <span className={`font-bold text-sm ${job.logoTextColor}`}>{job.logo}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition text-sm">
                        {job.title}
                      </h3>
                      <p className="text-xs text-gray-600 font-medium">{job.company}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-red-500 text-lg flex-shrink-0"
                    >
                      ♡
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-600 font-medium mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {job.level}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full font-bold">
                      {job.type}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700 font-bold text-xs"
                    >
                      Apply Now →
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
