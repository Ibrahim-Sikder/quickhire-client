import { Badge } from "@/components/ui/badge";
import { CompanyIcon } from "@/utils/companyIcon";
import { JobListing } from "@/types/job";

interface Props {
  job: JobListing;
}

export default function JobCard({ job }: Props) {
  const { title, company, location, tags, category } = job;

  const allTags = tags?.includes(category) ? tags : [...(tags || []), category];

  // Function to get consistent color for tags
  const getTagColor = (tagString: string, index: number): string => {
    const colorVariants = [
      "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200",
      "bg-green-100 text-green-700 hover:bg-green-200 border-green-200",
      "bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200",
      "bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200",
      "bg-pink-100 text-pink-700 hover:bg-pink-200 border-pink-200",
      "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-indigo-200",
      "bg-teal-100 text-teal-700 hover:bg-teal-200 border-teal-200",
      "bg-red-100 text-red-700 hover:bg-red-200 border-red-200",
      "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200",
      "bg-cyan-100 text-cyan-700 hover:bg-cyan-200 border-cyan-200",
      "bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200",
      "bg-lime-100 text-lime-700 hover:bg-lime-200 border-lime-200",
      "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200",
      "bg-fuchsia-100 text-fuchsia-700 hover:bg-fuchsia-200 border-fuchsia-200",
    ];

    // Use index for first tag, then hash for consistent colors
    if (index === 0) {
      return colorVariants[0]; // First tag gets blue (secondary style)
    }

    // Hash function for consistent colors based on tag text
    const hash = tagString.split("").reduce((acc: number, char: string) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    const colorIndex = (Math.abs(hash) % (colorVariants.length - 1)) + 1;
    return colorVariants[colorIndex];
  };

  return (
    <div
      className="flex md:flex-row flex-col gap-4 p-6 rounded-lg border border-slate-200 
      hover:border-slate-300 hover:shadow-md transition-all bg-primary-foreground md:px-8"
    >
      <CompanyIcon company={company} />

      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>

        <p className="text-sm text-muted-foreground mb-3">
          {company} • {location}
        </p>

        <div className="flex flex-wrap gap-2">
          {allTags?.map((tag, index) => {
            const colorClass = getTagColor(tag, index);

            return (
              <Badge key={tag + index} className={`text-xs ${colorClass}`}>
                {tag}
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
}
