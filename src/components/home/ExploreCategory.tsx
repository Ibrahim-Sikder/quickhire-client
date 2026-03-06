/* eslint-disable @typescript-eslint/no-explicit-any */
import { getJobs } from "@/lib/getJobs";
import { CategoryData, iconMap, Job } from "@/types/job";
import { Briefcase, MoveRight } from "lucide-react";
import Link from "next/link";

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

  if (categories.length > 2) {
    categories[2].isActive = true;
  }

  return (
    <section className="bg-white mb-20">
      <div className="container max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold">
            Explore by <span className="text-accent">category</span>
          </h2>

          <Link
            href="/jobs"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-indigo-600 cursor-pointer hover:gap-3 transition-all"
          >
            Show all jobs <MoveRight size={18} />
          </Link>
        </div>

        {/* Categories Grid */}
        {categories.length === 0 ? (
          <p className="text-gray-500">No categories found.</p>
        ) : (
          <>
            {/* Mobile Layout */}
            <div className="md:hidden space-y-4">
              {categories.map((category: CategoryData) => {
                const Icon = iconMap[category.name] || Briefcase;
                const isActive = category.isActive;

                // Find jobs in this category
                const categoryJobs = jobs.filter(
                  (job: Job) => job.category === category.name,
                );

                return (
                  <div key={category.name}>
                    {categoryJobs.length > 0 ? (
                      <Link href={`/jobs/${categoryJobs[0]._id}`}>
                        <div
                          className={`rounded-lg p-6 border transition-all duration-300 hover:shadow-lg cursor-pointer
                            flex items-center justify-between
                            ${
                              isActive
                                ? "bg-indigo-600 border-indigo-600 text-white"
                                : "bg-white border-gray-200 text-gray-900 hover:border-gray-300"
                            }`}
                        >
                          {/* LEFT SIDE */}
                          <div className="flex items-center gap-4">
                            {/* ICON */}
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                isActive ? "bg-white/20" : "bg-gray-100"
                              }`}
                            >
                              <Icon
                                className={`w-5 h-5 ${
                                  isActive ? "text-white" : "text-indigo-600"
                                }`}
                                strokeWidth={1.5}
                              />
                            </div>

                            {/* TEXT */}
                            <div>
                              <h3 className="font-bold text-base">
                                {category.name}
                              </h3>
                              <p
                                className={`text-sm ${
                                  isActive ? "text-white/80" : "text-gray-600"
                                }`}
                              >
                                {category.count} jobs available
                              </p>
                            </div>
                          </div>

                          {/* RIGHT SIDE ARROW */}
                          <MoveRight
                            size={18}
                            className={`${isActive ? "text-white/80" : "text-gray-400"}`}
                          />
                        </div>
                      </Link>
                    ) : (
                      <div
                        className={`rounded-lg p-6 border transition-all duration-300
                          flex items-center justify-between
                          ${
                            isActive
                              ? "bg-indigo-600 border-indigo-600 text-white"
                              : "bg-white border-gray-200 text-gray-900"
                          }`}
                      >
                        {/* LEFT SIDE */}
                        <div className="flex items-center gap-4">
                          {/* ICON */}
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              isActive ? "bg-white/20" : "bg-gray-100"
                            }`}
                          >
                            <Icon
                              className={`w-5 h-5 ${
                                isActive ? "text-white" : "text-indigo-600"
                              }`}
                              strokeWidth={1.5}
                            />
                          </div>

                          {/* TEXT */}
                          <div>
                            <h3 className="font-bold  text-base md:text-lg text-muted">
                              {category.name}
                            </h3>
                            <p
                              className={`text-sm ${
                                isActive
                                  ? "text-white/80"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {category.count} jobs available
                            </p>
                          </div>
                        </div>

                        {/* RIGHT SIDE ARROW */}
                        <MoveRight
                          size={18}
                          className={`${isActive ? "text-white/80" : "text-gray-400"}`}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category: CategoryData) => {
                const Icon = iconMap[category.name] || Briefcase;
                const isActive = category.isActive;

                // Find jobs in this category
                const categoryJobs = jobs.filter(
                  (job: Job) => job.category === category.name,
                );

                return (
                  <div key={category.name}>
                    {categoryJobs.length > 0 ? (
                      <Link href={`/jobs/${categoryJobs[0]._id}`}>
                        <div
                          className={`rounded-lg p-6 border transition-all duration-300 hover:shadow-lg cursor-pointer
                            flex flex-col items-start justify-between h-full
                            ${
                              isActive
                                ? "bg-indigo-600 border-indigo-600 text-white"
                                : "bg-white border-gray-200 text-gray-900 hover:border-gray-300"
                            }`}
                        >
                          {/* ICON */}
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

                          {/* TEXT */}
                          <div className="flex-grow w-full">
                            <h3 className="font-bold text-lg mb-2">
                              {category.name}
                            </h3>
                            <div className="flex items-center justify-between gap-x-3">
                              <p
                                className={`text-sm ${
                                  isActive ? "text-white/80" : "text-gray-600"
                                }`}
                              >
                                {category.count} jobs available
                              </p>
                              <span className="hidden md:block">
                                <MoveRight
                                  size={18}
                                  className={`font-bold ${
                                    isActive ? "text-white/80" : "text-gray-400"
                                  }`}
                                />
                              </span>
                            </div>
                          </div>

                          <MoveRight
                            size={18}
                            className={`md:hidden block mt-4 ${
                              isActive ? "text-white/80" : "text-gray-400"
                            }`}
                          />
                        </div>
                      </Link>
                    ) : (
                      <div
                        className={`rounded-lg p-6 border transition-all duration-300
                          flex flex-col items-start justify-between h-full
                          ${
                            isActive
                              ? "bg-indigo-600 border-indigo-600 text-white"
                              : "bg-white border-gray-200 text-gray-900"
                          }`}
                      >
                        {/* ICON */}
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

                        {/* TEXT */}
                        <div className="flex-grow w-full">
                          <h3 className="font-bold text-lg mb-2">
                            {category.name}
                          </h3>
                          <div className="flex items-center justify-between gap-x-3">
                            <p
                              className={`text-sm ${
                                isActive ? "text-white/80" : "text-gray-600"
                              }`}
                            >
                              {category.count} jobs available
                            </p>
                            <span className="hidden md:block">
                              <MoveRight
                                size={18}
                                className={`font-bold ${
                                  isActive ? "text-white/80" : "text-gray-400"
                                }`}
                              />
                            </span>
                          </div>
                        </div>

                        <MoveRight
                          size={18}
                          className={`md:hidden block mt-4 ${
                            isActive ? "text-white/80" : "text-gray-400"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
