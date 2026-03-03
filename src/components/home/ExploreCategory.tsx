/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Briefcase,
  Code,
  Palette,
  BarChart3,
  Smartphone,
  TrendingUp,
  Users,
  MoveRight,
} from "lucide-react";
import { getJobs } from "@/lib/getJobs";

const iconMap: Record<string, any> = {
  Design: Palette,
  Sales: BarChart3,
  Marketing: TrendingUp,
  Finance: BarChart3,
  Technology: Smartphone,
  Engineering: Code,
  Business: Briefcase,
  "Human Resources": Users,
  "Human Resource": Users,
  "Software Engineering": Code,
};

interface Job {
  category: string;
  company: string;
  createdAt: string;
  description: string;
  featured: boolean;
  isActive: boolean;
  latest: boolean;
  location: string;
  tags: string[];
  title: string;
  updatedAt: string;
  _id: string;
}

interface CategoryData {
  name: string;
  count: number;
  isActive: boolean;
}

export default async function ExploreCategory() {
  const jobs = await getJobs();

  // Group jobs by category and count them
  const categoryMap = new Map<string, number>();
  const categoryOrder: string[] = [];

  jobs.forEach((job: Job) => {
    const category = job.category;
    if (!categoryMap.has(category)) {
      categoryMap.set(category, 0);
      categoryOrder.push(category);
    }
    categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
  });

  // Convert to array and take first 8
  const categories: CategoryData[] = Array.from(categoryMap.entries())
    .slice(0, 8)
    .map(([name, count]) => ({
      name,
      count,
      isActive: false,
    }));

  // Set one category as active (e.g., the third one like in the image)
  if (categories.length > 2) {
    categories[2].isActive = true;
  }

  return (
    <section className="bg-white mb-20">
      <div className="container max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Explore by <span className="text-blue-500">category</span>
          </h2>

          <div className="hidden md:flex items-center gap-2 text-sm font-semibold text-indigo-600 cursor-pointer hover:gap-3 transition-all">
            Show all jobs <MoveRight size={18} />
          </div>
        </div>

        {/* Categories Grid */}
        {categories.length === 0 ? (
          <p className="text-gray-500">No categories found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category: CategoryData) => {
              const Icon = iconMap[category.name] || Briefcase;
              const isActive = category.isActive;

              return (
                <div
                  key={category.name}
                  className={`rounded-lg p-6 transition-all duration-300 hover:shadow-lg cursor-pointer border ${
                    isActive
                      ? "bg-indigo-600 border-indigo-600 text-white"
                      : "bg-white border-gray-200 text-gray-900 hover:border-gray-300"
                  }`}
                >
                  {/* Icon Container */}
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                      isActive ? "bg-white/20" : "bg-gray-100"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        isActive ? "text-white" : "text-indigo-600"
                      }`}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Category Name */}
                  <h3 className="font-bold text-lg mb-2">{category.name}</h3>

                  {/* Job Count and Arrow */}
                  <div className="flex items-center gap-x-5">
                    <p
                      className={`text-sm ${
                        isActive ? "text-white/80" : "text-gray-600"
                      }`}
                    >
                      {category.count} jobs available
                    </p>
                    <MoveRight
                      size={18}
                      className={`${
                        isActive ? "text-white/80" : "text-gray-400"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
