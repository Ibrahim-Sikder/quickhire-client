import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, ArrowRight, MoveRight } from "lucide-react";

export default function FeaturedJobs() {
  const jobs = [
    {
      id: 1,
      title: "Email Marketing",
      company: "Revolut",
      location: "Madrid, Spain",
      type: "Full Time",
      category: "Marketing",
      logo: "R",
      logoColor: "bg-blue-100",
      logoTextColor: "text-blue-600",
      tags: ["Marketing", "Design"],
      description: "Revolut is looking for Email Marketing to help team ma ...",
    },
    {
      id: 2,
      title: "Brand Designer",
      company: "Dropbox",
      location: "San Fransisco, US",
      type: "Full Time",
      category: "Design",
      logo: "D",
      logoColor: "bg-blue-100",
      logoTextColor: "text-blue-600",
      tags: ["Business", "Design"],
      description: "Dropbox is looking for Brand Design to help the team t ...",
    },
    {
      id: 3,
      title: "Email Marketing",
      company: "Pitch",
      location: "Berlin, Germany",
      type: "Full Time",
      category: "Marketing",
      logo: "P",
      logoColor: "bg-green-100",
      logoTextColor: "text-green-600",
      tags: ["Marketing", "Design"],
      description:
        "Pitch is looking for Customer Manager to join marketing t ...",
    },
    {
      id: 4,
      title: "Visual Designer",
      company: "Blinklist",
      location: "Granada, Spain",
      type: "Full Time",
      category: "Design",
      logo: "B",
      logoColor: "bg-purple-100",
      logoTextColor: "text-purple-600",
      tags: ["Design", "Design"],
      description:
        "Blinklist is looking for Visual Design to help team desi ...",
    },
    {
      id: 5,
      title: "Product Designer",
      company: "ClassPass",
      location: "Manchester, UK",
      type: "Full Time",
      category: "Design",
      logo: "C",
      logoColor: "bg-pink-100",
      logoTextColor: "text-pink-600",
      tags: ["Marketing", "Design"],
      description: "ClassPass is looking for Product Designer to help us...",
    },
    {
      id: 6,
      title: "Lead Designer",
      company: "Canva",
      location: "Ontario, Canada",
      type: "Full Time",
      category: "Design",
      logo: "C",
      logoColor: "bg-cyan-100",
      logoTextColor: "text-cyan-600",
      tags: ["Business", "Design"],
      description: "Canva is looking for Lead Engineer to help develop n ...",
    },
    {
      id: 7,
      title: "Brand Strategist",
      company: "GoDaddy",
      location: "Marseille, France",
      type: "Full Time",
      category: "Marketing",
      logo: "G",
      logoColor: "bg-yellow-100",
      logoTextColor: "text-yellow-600",
      tags: ["Marketing", "Design"],
      description:
        "GoDaddy is looking for Brand Strategist to join the team...",
    },
    {
      id: 8,
      title: "Data Analyst",
      company: "Twitter",
      location: "San Diego, US",
      type: "Full Time",
      category: "Technology",
      logo: "T",
      logoColor: "bg-blue-100",
      logoTextColor: "text-blue-600",
      tags: ["Technology", "Technology"],
      description: "Twitter is looking for Data Analyst to help team desi ...",
    },
  ];

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-xl md:text-5xl font-bold text-gray-900 mb-2">
              Featured <span className="text-[#26A4FF]">jobs</span>
            </h2>
          </div>
          <div className="hidden md:inline-flex gap-1.5  font-semibold border-gray-300 text-[#4640DE] text-sm">
            Show All Jobs <MoveRight />
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="group bg-white border border-gray-200 rounded-2xl p-5 md:p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300 cursor-pointer"
            >
              {/* Company Logo and Title Row */}
              <div className="flex items-start gap-3 mb-3">
                <div
                  className={`w-12 h-12 rounded-lg ${job.logoColor} flex items-center justify-center flex-shrink-0`}
                >
                  <span className={`font-bold text-lg ${job.logoTextColor}`}>
                    {job.logo}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-base md:text-lg truncate">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-600">{job.company}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-red-500 hover:bg-transparent h-8 w-8 p-0 -mt-1"
                >
                  <span className="text-xl">♡</span>
                </Button>
              </div>

              {/* Location and Job Type */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Briefcase className="w-4 h-4 flex-shrink-0" />
                  <span>{job.type}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {job.description}
              </p>

              {/* Tags and Category */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex gap-2 flex-wrap">
                  {job.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {job.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="flex justify-center mt-8 md:hidden">
          <Button
            variant="ghost"
            className="inline-flex items-center gap-2 text-[#4640DE] font-semibold"
          >
            Show All Jobs <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
