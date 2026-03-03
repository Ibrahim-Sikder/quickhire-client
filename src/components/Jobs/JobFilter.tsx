"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JobFiltersProps {
  categories: string[];
  locations: string[];
}

export default function JobFilters({ categories, locations }: JobFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/jobs?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/jobs");
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Category</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              value="all"
              checked={!searchParams.get("category")}
              onChange={() => updateFilter("category", "all")}
              className="text-indigo-600"
            />
            <span className="text-gray-600">All Categories</span>
          </label>
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="category"
                value={category}
                checked={searchParams.get("category") === category}
                onChange={() => updateFilter("category", category)}
                className="text-indigo-600"
              />
              <span className="text-gray-600">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Location</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="location"
              value="all"
              checked={!searchParams.get("location")}
              onChange={() => updateFilter("location", "all")}
              className="text-indigo-600"
            />
            <span className="text-gray-600">All Locations</span>
          </label>
          {locations.map((location) => (
            <label
              key={location}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="location"
                value={location}
                checked={searchParams.get("location") === location}
                onChange={() => updateFilter("location", location)}
                className="text-indigo-600"
              />
              <span className="text-gray-600">{location}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Job Type</h3>
        <div className="space-y-2">
          {["Full Time", "Part Time", "Remote", "Contract", "Internship"].map(
            (type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="jobType"
                  value={type}
                  checked={searchParams.get("jobType") === type}
                  onChange={() => updateFilter("jobType", type)}
                  className="text-indigo-600"
                />
                <span className="text-gray-600">{type}</span>
              </label>
            ),
          )}
        </div>
      </div>

      <Button onClick={clearFilters} variant="outline" className="w-full">
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Filters</h2>
          <SlidersHorizontal className="h-5 w-5 text-gray-400" />
        </div>
        <FilterContent />
      </div>

      {/* Mobile Filters Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 bg-indigo-600 text-white p-4 rounded-full shadow-lg z-40"
      >
        <SlidersHorizontal className="h-6 w-6" />
      </button>

      {/* Mobile Filters Modal */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50">
          <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Filters</h2>
              <button onClick={() => setIsOpen(false)}>
                <X className="h-6 w-6 text-gray-400" />
              </button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}
    </>
  );
}
