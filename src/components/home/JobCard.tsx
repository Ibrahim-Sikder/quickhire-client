import { Badge } from "@/components/ui/badge";
import { CompanyIcon } from "@/utils/companyIcon";
import { JobListing } from "@/types/job";

interface Props {
  job: JobListing;
}

export default function JobCard({ job }: Props) {
  const { title, company, location, tags, category } = job;

  const allTags = tags?.includes(category) ? tags : [...(tags || []), category];

  return (
    <div
      className="flex md:flex-row flex-col gap-4 p-6 rounded-lg border border-slate-200 
      hover:border-slate-300 hover:shadow-md transition-all bg-white"
    >
      <CompanyIcon company={company} />

      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>

        <p className="text-sm text-slate-600 mb-3">
          {company} • {location}
        </p>

        <div className="flex flex-wrap gap-2">
          {allTags?.map((tag, index) => (
            <Badge
              key={tag + index}
              variant={index === 0 ? "secondary" : "outline"}
              className="text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
