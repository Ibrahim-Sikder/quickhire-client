/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChevronDown, MapPin, Search, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

interface Job {
  _id: string;
  title: string;
  tags: string[];
  category: string;
  location: string;
  company: string;
}

export default function JobSearch({
  initialJobs = [],
  searchParams,
}: {
  initialJobs?: Job[];
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(searchParams?.search || "");
  const [location, setLocation] = useState(searchParams?.location || "all");
  const [suggestions, setSuggestions] = useState<Job[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Use useMemo to memoize locations - only recalculate when initialJobs changes
  const locations = useMemo(() => {
    return [...new Set(initialJobs.map((job: Job) => job.location))];
  }, [initialJobs]);

  // Use useRef to track previous search term to prevent unnecessary updates
  const previousSearchTerm = useRef(searchTerm);

  // Filter jobs based on search term for suggestions - with proper dependencies
  useEffect(() => {
    // Only run if searchTerm has actually changed
    if (previousSearchTerm.current === searchTerm) {
      return;
    }
    previousSearchTerm.current = searchTerm;

    if (searchTerm.trim().length > 0) {
      setIsLoading(true);

      // Use a timeout to debounce the filtering
      const timeoutId = setTimeout(() => {
        // Filter jobs that match title, tags, or category
        const filtered = initialJobs
          .filter((job) => {
            const searchLower = searchTerm.toLowerCase();
            return (
              job.title?.toLowerCase().includes(searchLower) ||
              job.category?.toLowerCase().includes(searchLower) ||
              job.tags?.some((tag) =>
                tag.toLowerCase().includes(searchLower),
              ) ||
              job.company?.toLowerCase().includes(searchLower)
            );
          })
          .slice(0, 5); // Limit to 5 suggestions

        setSuggestions(filtered);
        setShowSuggestions(true);
        setIsLoading(false);
      }, 300); // Debounce for 300ms

      return () => clearTimeout(timeoutId);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
    }
  }, [searchTerm, initialJobs]); // Keep dependencies, but added debounce and previous value check

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle search - redirect to jobs page with search params
  const handleSearch = useCallback(() => {
    const params = new URLSearchParams();
    if (searchTerm.trim()) {
      params.set("title", searchTerm.trim());
    }
    if (location && location !== "all") {
      params.set("location", location);
    }
    router.push(`/jobs?${params.toString()}`);
    setShowSuggestions(false);
  }, [searchTerm, location, router]);

  // Handle suggestion click - ONLY update search term, do NOT navigate
  const handleSuggestionClick = useCallback((job: Job) => {
    setSearchTerm(job.title);
    setShowSuggestions(false);
  }, []);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchTerm("");
    setSuggestions([]);
    setShowSuggestions(false);
  }, []);

  return (
    <div className="w-full py-8">
      <div className="relative">
        <div className="flex items-center bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
          {/* Job Title Input with Suggestions */}
          <div className="flex items-center px-6 flex-1 py-4 min-w-0 relative">
            <Search className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() =>
                searchTerm.trim().length > 0 && setShowSuggestions(true)
              }
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Job title, tags, or category"
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none placeholder:text-gray-400 text-sm pr-8"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Vertical Divider */}
          <div className="h-12 w-px bg-gray-200 flex-shrink-0" />

          {/* Location Select */}
          <div className="flex items-center px-6 py-4 flex-shrink-0">
            <MapPin className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="border-0 shadow-none focus:ring-0 focus:ring-offset-0 p-0 h-auto w-auto min-w-[120px]">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((location: string) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ChevronDown className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="rounded-none h-full px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base flex-shrink-0"
          >
            Search my job
          </Button>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && (
          <div
            ref={suggestionsRef}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
          >
            {isLoading ? (
              <div className="px-4 py-3 text-sm text-gray-500">Loading...</div>
            ) : suggestions.length > 0 ? (
              <div>
                {suggestions.map((job) => (
                  <button
                    key={job._id}
                    onClick={() => handleSuggestionClick(job)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors"
                  >
                    <div className="font-medium text-gray-900">{job.title}</div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">
                        {job.category}
                      </span>
                      {job.tags?.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {job.tags?.length > 2 && (
                        <span className="text-gray-400">
                          +{job.tags.length - 2}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs">
                      <span className="text-gray-600">{job.company}</span>
                      <span className="flex items-center text-gray-400">
                        <MapPin className="h-3 w-3 mr-1" />
                        {job.location}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500">
                No jobs found matching {searchTerm}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
