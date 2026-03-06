/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import Loading from "@/components/Loading/Loading";
import { COLORS, ITEMS_PER_PAGE } from "@/constant/color";
import { ApiResponse, Application } from "@/types/application";
import { ApplicationModal } from "./__components/ApplicationModal";
import { ApplicationTableRow } from "./__components/ApplicationTableRow";
import { SearchBar } from "./__components/SearchBar";
import StateCard from "./__components/StateCard";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ApplicationsPage() {
  // State
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<
    Application[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalApplications, setTotalApplications] = useState(0);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  // Stats
  const stats = useMemo(
    () => ({
      total: totalApplications,
      withJob: applications.filter((app) => app.job !== null).length,
      general: applications.filter((app) => app.job === null).length,
      today: applications.filter((app) => {
        const today = new Date().toDateString();
        return new Date(app.createdAt).toDateString() === today;
      }).length,
    }),
    [applications, totalApplications],
  );

  // Filter applications based on search only
  const filteredApps = useMemo(() => {
    if (!searchTerm) return applications;

    return applications.filter(
      (app) =>
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (app.job?.title || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (app.job?.company || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
    );
  }, [applications, searchTerm]);

  // Update filtered applications
  useEffect(() => {
    setFilteredApplications(filteredApps);
  }, [filteredApps]);

  // Fetch applications
  const fetchApplications = useCallback(async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.get<ApiResponse>(
        `${API_BASE_URL}/applications?page=${page}&limit=${ITEMS_PER_PAGE}`,
      );

      if (response.data.success) {
        setApplications(response.data.data.applications);
        setFilteredApplications(response.data.data.applications);
        setTotalPages(response.data.data.meta.totalPage);
        setTotalApplications(response.data.data.meta.total);
        toast.success("Applications loaded successfully!");
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to fetch applications");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications(currentPage);
  }, [currentPage, fetchApplications]);

  // Handlers
  const handleDeleteApplication = useCallback(async (applicationId: string) => {
    if (!window.confirm("Are you sure you want to delete this application?"))
      return;

    const deleteToast = toast.loading("Deleting application...");

    try {
      const response = await axios.delete(`${API_BASE_URL}/${applicationId}`);

      if (response.data.success) {
        setApplications((prev) =>
          prev.filter((app) => app._id !== applicationId),
        );
        toast.success("Application deleted successfully!", {
          id: deleteToast,
          icon: "🗑️",
        });
      }
    } catch (error) {
      console.error("Error deleting application:", error);
      toast.error("Failed to delete application", { id: deleteToast });
    }
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const statCards = [
    {
      title: "Total Applications",
      value: stats.total,
      icon: "Users",
      color: COLORS.primary,
    },
    {
      title: "With Job",
      value: stats.withJob,
      icon: "Briefcase",
      color: "#10b981",
    },
    {
      title: "General Applications",
      value: stats.general,
      icon: "FileText",
      color: "#8b5cf6",
    },
    {
      title: "Applied Today",
      value: stats.today,
      icon: "Clock",
      color: "#f97316",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/30">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})`,
            }}
          >
            Job Applications
          </h1>
          <p className="text-slate-600 mt-2">
            Manage and review all candidate applications
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {statCards.map((stat) => (
            <StateCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Search Bar */}
        <Card className="mb-6 border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && <Loading />}

        {/* Empty State */}
        {!isLoading && filteredApplications.length === 0 && (
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No applications found
              </h3>
              <p className="text-slate-500">
                {searchTerm
                  ? "Try adjusting your search criteria"
                  : "There are no applications to display"}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Applications Table */}
        {!isLoading && filteredApplications.length > 0 && (
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Applicant
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Job Position
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Applied Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Resume
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app) => (
                    <ApplicationTableRow
                      key={app._id}
                      app={app}
                      onView={setSelectedApplication}
                      onDelete={handleDeleteApplication}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="border-t border-slate-200 px-6 py-4 flex items-center justify-between bg-slate-50">
                <div className="text-sm text-slate-600">
                  Showing{" "}
                  <span className="font-medium">
                    {filteredApplications.length}
                  </span>{" "}
                  of <span className="font-medium">{totalApplications}</span>{" "}
                  applications
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="gap-1"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Application Details Modal */}
        <ApplicationModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      </div>
    </div>
  );
}
