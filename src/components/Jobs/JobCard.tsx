import { Badge } from "@/components/ui/badge";
import { CompanyIcon } from "@/utils/companyIcon";
import { Job } from "@/types/job";
import { MapPin, Briefcase, Clock } from "lucide-react";
import Link from "next/link";

interface Props {
  job: Job;
}

export default function JobCard({ job }: Props) {
  const { title, company, location, tags, category } = job;

  const allTags = tags?.includes(category) ? tags : [...(tags || []), category];

  return (
    <Link href={`/jobs/${job._id}`}>
      <div
        className="flex gap-4 p-6 rounded-lg border border-slate-200 
        hover:border-indigo-300 hover:shadow-lg transition-all bg-white group cursor-pointer"
      >
        <CompanyIcon company={company} />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
              {title}
            </h3>
            {job.featured && (
              <Badge
                variant="secondary"
                className="text-xs bg-yellow-100 text-yellow-800"
              >
                Featured
              </Badge>
            )}
          </div>

          <p className="text-sm text-slate-600 mb-3 flex items-center gap-2">
            <span>{company}</span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {location}
            </span>
          </p>

          <div className="flex flex-wrap gap-2 mb-3">
            {allTags?.slice(0, 3).map((tag, index) => (
              <Badge
                key={tag + index}
                variant={index === 0 ? "secondary" : "outline"}
                className="text-xs"
              >
                {tag}
              </Badge>
            ))}
            {allTags?.length > 3 && (
              <span className="text-xs text-slate-400">
                +{allTags.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Briefcase className="h-3 w-3" />
              {job.jobType || "Full Time"}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {new Date(job.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
