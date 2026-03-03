import { Button } from "@/components/ui/button";
import { MapPin, Clock } from "lucide-react";

export default function FeaturedJobs() {
  const jobs = [
    {
      id: 1,
      title: "Senior UI/UX Designer",
      company: "Google",
      location: "Mountain View, CA",
      type: "Full Time",
      salary: "$120k - $160k",
      logo: "G",
      logoColor: "bg-blue-100",
      logoTextColor: "text-blue-600",
      tags: ["Design", "UI/UX"],
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Apple",
      location: "Cupertino, CA",
      type: "Full Time",
      salary: "$150k - $200k",
      logo: "A",
      logoColor: "bg-gray-200",
      logoTextColor: "text-gray-700",
      tags: ["Product", "Management"],
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "Meta",
      location: "Menlo Park, CA",
      type: "Full Time",
      salary: "$130k - $180k",
      logo: "M",
      logoColor: "bg-purple-100",
      logoTextColor: "text-purple-600",
      tags: ["Data", "AI/ML"],
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "Amazon",
      location: "Seattle, WA",
      type: "Full Time",
      salary: "$110k - $150k",
      logo: "Am",
      logoColor: "bg-orange-100",
      logoTextColor: "text-orange-600",
      tags: ["DevOps", "Cloud"],
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-xl md:text-5xl font-bold text-gray-900 mb-2">
              Featured <span className="text-[#26A4FF]">jobs</span>
            </h2>
          </div>
          <Button
            variant="outline"
            className="hidden md:inline-flex text-sm font-semibold border-gray-300 text-gray-700"
          >
            View all →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-gray-300 transition group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-lg ${job.logoColor} flex items-center justify-center`}
                  >
                    <span className={`font-bold text-sm ${job.logoTextColor}`}>
                      {job.logo}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition text-sm">
                      {job.title}
                    </h3>
                    <p className="text-xs text-gray-600 font-medium">
                      {job.company}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-red-500 text-lg"
                >
                  ♡
                </Button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                  <Clock className="w-4 h-4" />
                  {job.type}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex gap-2 flex-wrap">
                  {job.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="font-bold text-gray-900 text-xs">
                  {job.salary}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
