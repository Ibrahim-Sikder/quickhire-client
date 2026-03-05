/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import axios from "axios";
import {
  Briefcase,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  DownloadCloud,
  ExternalLink,
  Eye,
  FileText,
  Mail,
  MapPin,
  MoreVertical,
  RefreshCw,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
interface Application {
  _id: string;
  job: {
    _id: string;
    title: string;
    company: string;
    location: string;
    category: string;
  } | null;
  name: string;
  email: string;
  resume_link: string;
  cover_note: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
    applications: Application[];
  };
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
};

export default function ApplicationsPage() {
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
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Fetch applications from API
  const fetchApplications = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.get<ApiResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}?page=${page}&limit=10`,
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
  };

  useEffect(() => {
    fetchApplications(currentPage);
  }, [currentPage]);

  // Filter applications based on search term
  useEffect(() => {
    const filtered = applications.filter(
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
    setFilteredApplications(filtered);
  }, [searchTerm, applications]);

  const handleDeleteApplication = async (applicationId: string) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      const deleteToast = toast.loading("Deleting application...");

      try {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/${applicationId}`,
        );

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
        toast.error("Failed to delete application", {
          id: deleteToast,
        });
      }
    }
  };

  const handleRefresh = () => {
    fetchApplications(currentPage);
  };

  const handleExportCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Job Title",
      "Company",
      "Applied Date",
      "Cover Note",
    ];
    const csvData = filteredApplications.map((app) => [
      app.name,
      app.email,
      app.job?.title || "N/A",
      app.job?.company || "N/A",
      new Date(app.createdAt).toLocaleDateString(),
      app.cover_note || "N/A",
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `applications-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();

    toast.success("Applications exported successfully!");
  };

  const stats = {
    total: totalApplications,
    withJob: applications.filter((app) => app.job !== null).length,
    withoutJob: applications.filter((app) => app.job === null).length,
    today: applications.filter((app) => {
      const today = new Date().toDateString();
      return new Date(app.createdAt).toDateString() === today;
    }).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/30">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Job Applications
              </h1>
              <p className="text-slate-600 mt-2">
                Manage and review all candidate applications in one place
              </p>
            </div>
            <div className="flex gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleRefresh}
                      disabled={isLoading}
                      className="border-slate-200 hover:border-indigo-300 hover:bg-indigo-50"
                    >
                      <RefreshCw
                        className={cn("h-4 w-4", isLoading && "animate-spin")}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Refresh</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleExportCSV}
                      className="border-slate-200 hover:border-indigo-300 hover:bg-indigo-50"
                    >
                      <DownloadCloud className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Export CSV</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button
                onClick={() =>
                  setViewMode(viewMode === "table" ? "grid" : "table")
                }
                variant="outline"
                className="border-slate-200 hover:border-indigo-300 hover:bg-indigo-50"
              >
                {viewMode === "table" ? "Grid View" : "Table View"}
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">
                      Total Applications
                    </p>
                    <p className="text-3xl font-bold mt-2">{stats.total}</p>
                  </div>
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">
                      With Job
                    </p>
                    <p className="text-3xl font-bold mt-2">{stats.withJob}</p>
                  </div>
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Briefcase className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">
                      General Applications
                    </p>
                    <p className="text-3xl font-bold mt-2">
                      {stats.withoutJob}
                    </p>
                  </div>
                  <div className="p-3 bg-white/20 rounded-lg">
                    <FileText className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm font-medium">
                      Applied Today
                    </p>
                    <p className="text-3xl font-bold mt-2">{stats.today}</p>
                  </div>
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Clock className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by name, email, job title, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <Tabs
                defaultValue="all"
                className="w-full sm:w-auto"
                onValueChange={setStatusFilter}
              >
                <TabsList className="grid grid-cols-3 w-full sm:w-[300px]">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="with-job">With Job</TabsTrigger>
                  <TabsTrigger value="general">General</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Applications Display */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <div className="mt-4 text-slate-600 font-medium">
                Loading applications...
              </div>
            </div>
          </div>
        ) : filteredApplications.length === 0 ? (
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-20">
              <div className="p-4 bg-slate-100 rounded-full mb-4">
                <Users className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No applications found
              </h3>
              <p className="text-slate-500 text-center max-w-md">
                {searchTerm
                  ? "No applications match your search criteria. Try different keywords."
                  : "There are no applications to display at the moment."}
              </p>
            </CardContent>
          </Card>
        ) : viewMode === "table" ? (
          /* Table View */
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead className="font-semibold">Applicant</TableHead>
                    <TableHead className="font-semibold">
                      Job Position
                    </TableHead>
                    <TableHead className="font-semibold">Company</TableHead>
                    <TableHead className="font-semibold">
                      Applied Date
                    </TableHead>
                    <TableHead className="font-semibold">Resume</TableHead>
                    <TableHead className="font-semibold text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((app) => (
                    <TableRow
                      key={app._id}
                      className="group hover:bg-slate-50/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border-2 border-indigo-100">
                            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                              {getInitials(app.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-slate-900">
                              {app.name}
                            </div>
                            <div className="text-sm text-slate-500 flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {app.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {app.job ? (
                          <div>
                            <div className="font-medium text-slate-900">
                              {app.job.title}
                            </div>
                            <Badge
                              variant="outline"
                              className="mt-1 bg-indigo-50 text-indigo-700 border-indigo-200"
                            >
                              {app.job.category}
                            </Badge>
                          </div>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="bg-slate-100 text-slate-600"
                          >
                            General Application
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {app.job ? (
                          <div className="flex items-center gap-1 text-slate-600">
                            <Building2 className="h-4 w-4 text-slate-400" />
                            {app.job.company}
                          </div>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-slate-400" />
                          <div>
                            <div className="text-sm font-medium text-slate-900">
                              {new Date(app.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </div>
                            <div className="text-xs text-slate-500">
                              {formatDate(app.createdAt)}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <a
                          href={app.resume_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 hover:underline"
                        >
                          <FileText className="h-4 w-4" />
                          <span className="text-sm">View</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                                  onClick={() => setSelectedApplication(app)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>View Details</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-slate-600 hover:text-red-600 hover:bg-red-50"
                                  onClick={() =>
                                    handleDeleteApplication(app._id)
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Delete</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="gap-2"
                                onClick={() =>
                                  window.open(`mailto:${app.email}`)
                                }
                              >
                                <Mail className="h-4 w-4" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="gap-2"
                                onClick={() =>
                                  window.open(app.resume_link, "_blank")
                                }
                              >
                                <FileText className="h-4 w-4" />
                                View Resume
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="gap-2"
                                onClick={() =>
                                  navigator.clipboard.writeText(app.email)
                                }
                              >
                                <Copy className="h-4 w-4" />
                                Copy Email
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
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
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApplications.map((app) => (
              <Card
                key={app._id}
                className="border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-indigo-200 group"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border-2 border-indigo-100">
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-lg">
                          {getInitials(app.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{app.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <Mail className="h-3 w-3" />
                          {app.email}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        app.job
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-slate-100 text-slate-600 border-slate-200",
                      )}
                    >
                      {app.job ? "Specific" : "General"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {app.job && (
                    <div className="p-3 bg-indigo-50/50 rounded-lg border border-indigo-100">
                      <p className="text-sm font-medium text-indigo-900">
                        {app.job.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-indigo-700">
                        <Building2 className="h-3 w-3" />
                        {app.job.company}
                        <span className="text-indigo-400">•</span>
                        <MapPin className="h-3 w-3" />
                        {app.job.location}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-slate-500">
                      <Calendar className="h-4 w-4" />
                      {formatDate(app.createdAt)}
                    </div>
                    <a
                      href={app.resume_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 hover:underline text-sm"
                    >
                      <FileText className="h-4 w-4" />
                      Resume
                    </a>
                  </div>

                  {app.cover_note && (
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <p className="text-xs font-medium text-slate-500 mb-1">
                        Cover Note:
                      </p>
                      <p className="text-sm text-slate-700 line-clamp-2">
                        {app.cover_note}
                      </p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t border-slate-100 pt-4 flex justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
                    onClick={() => setSelectedApplication(app)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Details
                  </Button>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                      onClick={() => window.open(`mailto:${app.email}`)}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-600 hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleDeleteApplication(app._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Application Details Modal */}
        {selectedApplication && (
          <Dialog
            open={!!selectedApplication}
            onOpenChange={() => setSelectedApplication(null)}
          >
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  Application Details
                </DialogTitle>
                <DialogDescription>
                  Review the candidate s application information
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Candidate Info */}
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                  <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                    <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-xl">
                      {getInitials(selectedApplication.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900">
                      {selectedApplication.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-slate-600">
                      <Mail className="h-4 w-4" />
                      {selectedApplication.email}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                      <Calendar className="h-4 w-4" />
                      Applied on{" "}
                      {new Date(
                        selectedApplication.createdAt,
                      ).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>

                {/* Job Info */}
                {selectedApplication.job ? (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-slate-900 uppercase tracking-wider">
                      Applied Position
                    </h4>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-slate-900">
                          {selectedApplication.job.title}
                        </h5>
                        <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200">
                          {selectedApplication.job.category}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1 text-slate-600">
                          <Building2 className="h-4 w-4" />
                          {selectedApplication.job.company}
                        </div>
                        <div className="flex items-center gap-1 text-slate-600">
                          <MapPin className="h-4 w-4" />
                          {selectedApplication.job.location}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-slate-600">
                      General Application (not for a specific job)
                    </p>
                  </div>
                )}

                {/* Resume Link */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-slate-900 uppercase tracking-wider">
                    Resume
                  </h4>
                  <a
                    href={selectedApplication.resume_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    <FileText className="h-5 w-5" />
                    <span className="flex-1 font-medium">View Resume</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>

                {/* Cover Note */}
                {selectedApplication.cover_note && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-slate-900 uppercase tracking-wider">
                      Cover Note
                    </h4>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <p className="text-slate-700 whitespace-pre-wrap">
                        {selectedApplication.cover_note}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter className="border-t border-slate-200 pt-4">
                <div className="flex gap-2 w-full justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedApplication(null)}
                  >
                    Close
                  </Button>
                  <Button
                    className="bg-indigo-600 hover:bg-indigo-700"
                    onClick={() =>
                      window.open(`mailto:${selectedApplication.email}`)
                    }
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
