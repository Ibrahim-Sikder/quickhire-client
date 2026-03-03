import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Code,
  Palette,
  BarChart3,
  Smartphone,
  Zap,
  TrendingUp,
  Users,
  ArrowBigDown,
  ArrowBigLeft,
  MoveRight,
} from "lucide-react";

export default function ExploreCategory() {
  const categories = [
    {
      icon: Briefcase,
      label: "Accounting",
      count: "20 Open",
      bg: "bg-green-100",
      icon_color: "text-green-600",
    },
    {
      icon: Code,
      label: "Design",
      count: "20 Open",
      bg: "bg-orange-100",
      icon_color: "text-orange-600",
    },
    {
      icon: Palette,
      label: "Marketing",
      count: "20 Open",
      bg: "bg-purple-600",
      icon_color: "text-white",
      featured: true,
    },
    {
      icon: BarChart3,
      label: "Finance",
      count: "20 Open",
      bg: "bg-teal-100",
      icon_color: "text-teal-600",
    },
    {
      icon: Smartphone,
      label: "Technology",
      count: "20 Open",
      bg: "bg-purple-100",
      icon_color: "text-purple-600",
    },
    {
      icon: Zap,
      label: "Engineering",
      count: "20 Open",
      bg: "bg-pink-100",
      icon_color: "text-pink-600",
    },
    {
      icon: TrendingUp,
      label: "Business",
      count: "20 Open",
      bg: "bg-blue-100",
      icon_color: "text-blue-600",
    },
    {
      icon: Users,
      label: "Human Resources",
      count: "20 Open",
      bg: "bg-indigo-100",
      icon_color: "text-indigo-600",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-xl md:text-5xl font-bold text-gray-900 mb-2">
              Explore by <span className="text-[#26A4FF]">category</span>
            </h2>
          </div>
          <div className="hidden md:inline-flex gap-1.5  font-semibold border-gray-300 text-[#4640DE] text-sm">
            Show All Jobs <MoveRight />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isFeatured = category.featured;

            return (
              <div
                key={index}
                className={`${isFeatured ? category.bg : "bg-white border border-gray-200"} rounded-xl p-6 hover:shadow-lg transition cursor-pointer group`}
              >
                <div
                  className={`w-12 h-12 rounded-lg ${isFeatured ? "bg-white/20" : category.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition`}
                >
                  <Icon
                    className={`w-6 h-6 ${isFeatured ? "text-white" : category.icon_color}`}
                  />
                </div>
                <h3
                  className={`font-bold mb-1 text-sm ${isFeatured ? "text-white" : "text-gray-900"}`}
                >
                  {category.label}
                </h3>
                <p
                  className={`text-xs font-medium ${isFeatured ? "text-white/80" : "text-gray-600"}`}
                >
                  {category.count}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
