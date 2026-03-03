/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Job } from "@/types/job";
import { getJobs } from "@/lib/getJobs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CompanyIcon } from "@/utils/companyIcon";
import {
  MapPin,
  Building2,
  Calendar,
  Briefcase,
  DollarSign,
  Clock,
  Send,
  X,
  Users,
  Award,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

// Static job data for better performance and reliability
const staticJobs: Job[] = [
  {
    _id: "1",
    title: "Senior Frontend Engineer",
    company: "TechNova Ltd",
    location: "Dhaka, Bangladesh",
    category: "Software Engineering",
    description:
      "We are looking for a Senior Frontend Engineer to lead our web development team. You will be responsible for architecting and implementing complex web applications using React, Next.js, and TypeScript. You'll work closely with designers and backend engineers to create seamless user experiences.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GraphQL"],
    featured: true,
    latest: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    salary: "$80k - $120k",
    experience: "5+ years",
    jobType: "Full Time",
    benefits: [
      "Remote Work",
      "Health Insurance",
      "Stock Options",
      "Learning Budget",
    ],
    applicants: 45,
  },
  {
    _id: "2",
    title: "DevOps Engineer",
    company: "CloudOps Solutions",
    location: "Remote",
    category: "DevOps",
    description:
      "Join our infrastructure team to build and maintain scalable cloud solutions. You'll work with AWS, Kubernetes, and CI/CD pipelines to ensure high availability and performance of our services.",
    tags: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD"],
    featured: false,
    latest: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    salary: "$90k - $130k",
    experience: "3+ years",
    jobType: "Remote",
    benefits: ["100% Remote", "Unlimited PTO", "Home Office Stipend"],
    applicants: 28,
  },
  {
    _id: "3",
    title: "Full Stack Developer",
    company: "InnovateX",
    location: "Chattogram, Bangladesh",
    category: "Software Engineering",
    description:
      "We're seeking a Full Stack Developer to build end-to-end features for our growing platform. You'll work with Node.js, React, and MongoDB to create scalable applications that serve thousands of users.",
    tags: ["Node.js", "React", "MongoDB", "Express", "TypeScript"],
    featured: false,
    latest: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    salary: "$60k - $90k",
    experience: "2+ years",
    jobType: "Full Time",
    benefits: ["Flexible Hours", "Gym Membership", "Annual Bonus"],
    applicants: 67,
  },
  {
    _id: "4",
    title: "UX/UI Designer",
    company: "Creative Digital",
    location: "Dhaka, Bangladesh",
    category: "Design",
    description:
      "Create beautiful and intuitive user interfaces for web and mobile applications. You'll lead the design process from research to high-fidelity prototypes, working closely with product managers and developers.",
    tags: ["Figma", "UI/UX", "Wireframing", "Prototyping", "User Research"],
    featured: true,
    latest: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    salary: "$50k - $80k",
    experience: "3+ years",
    jobType: "Full Time",
    benefits: [
      "Creative Environment",
      "Design Conferences",
      "Flexible Schedule",
    ],
    applicants: 32,
  },
  {
    _id: "5",
    title: "Backend Engineer",
    company: "DataCore Ltd",
    location: "Remote",
    category: "Software Engineering",
    description:
      "Build robust and scalable backend services using Node.js and Python. You'll design APIs, optimize database queries, and ensure system reliability.",
    tags: ["Node.js", "Python", "PostgreSQL", "Redis", "Microservices"],
    featured: false,
    latest: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    salary: "$70k - $110k",
    experience: "4+ years",
    jobType: "Remote",
    benefits: ["Remote First", "Equipment Budget", "Annual Retreat"],
    applicants: 51,
  },
  {
    _id: "6",
    title: "Product Manager",
    company: "NextGen Solutions",
    location: "Dhaka, Bangladesh",
    category: "Product",
    description:
      "Lead product development from ideation to launch. You'll work with stakeholders to define requirements, prioritize features, and guide the engineering team to deliver exceptional products.",
    tags: [
      "Product Strategy",
      "Agile",
      "Roadmapping",
      "User Stories",
      "Analytics",
    ],
    featured: true,
    latest: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    salary: "$70k - $100k",
    experience: "5+ years",
    jobType: "Full Time",
    benefits: ["Leadership Role", "Stock Options", "Health Insurance"],
    applicants: 19,
  },
  {
    _id: "7",
    title: "QA Automation Engineer",
    company: "TestPro Ltd",
    location: "Remote",
    category: "Quality Assurance",
    description:
      "Develop and maintain automated test suites to ensure software quality. You'll work with Cypress, Jest, and Selenium to create comprehensive testing strategies.",
    tags: ["Cypress", "Jest", "Selenium", "Testing", "CI/CD"],
    featured: false,
    latest: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    salary: "$50k - $75k",
    experience: "2+ years",
    jobType: "Remote",
    benefits: ["Learning Budget", "Flexible Hours", "Remote Work"],
    applicants: 23,
  },
  {
    _id: "8",
    title: "Data Scientist",
    company: "Analytix Corp",
    location: "Dhaka, Bangladesh",
    category: "Data Science",
    description:
      "Apply machine learning and statistical models to solve complex business problems. You'll analyze large datasets, build predictive models, and communicate insights to stakeholders.",
    tags: [
      "Python",
      "Machine Learning",
      "SQL",
      "TensorFlow",
      "Data Visualization",
    ],
    featured: true,
    latest: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    salary: "$80k - $120k",
    experience: "3+ years",
    jobType: "Full Time",
    benefits: ["Research Opportunities", "Conference Budget", "Flexible Hours"],
    applicants: 37,
  },
  {
    _id: "9",
    title: "Mobile Developer (React Native)",
    company: "AppWorks Studio",
    location: "Remote",
    category: "Mobile Development",
    description:
      "Build cross-platform mobile applications using React Native. You'll create beautiful, performant apps for both iOS and Android platforms.",
    tags: ["React Native", "TypeScript", "Redux", "iOS", "Android"],
    featured: false,
    latest: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    salary: "$60k - $90k",
    experience: "2+ years",
    jobType: "Remote",
    benefits: ["MacBook Pro", "App Store Credits", "Flexible Schedule"],
    applicants: 42,
  },
  {
    _id: "10",
    title: "Technical Writer",
    company: "DocuTech",
    location: "Dhaka, Bangladesh",
    category: "Documentation",
    description:
      "Create clear and comprehensive technical documentation for developer tools and APIs. You'll work with engineering teams to document features and create tutorials.",
    tags: [
      "Technical Writing",
      "API Documentation",
      "Markdown",
      "Developer Tools",
    ],
    featured: false,
    latest: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    salary: "$40k - $60k",
    experience: "1+ years",
    jobType: "Full Time",
    benefits: ["Writing Workshops", "Flexible Hours", "Home Office Stipend"],
    applicants: 15,
  },
];

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: "",
    coverNote: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Use static data instead of API call for better performance
    const foundJob = staticJobs.find((j: Job) => j._id === id);
    setJob(foundJob || null);
    setLoading(false);
  }, [id]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setShowApplyForm(false);
      setSubmitted(false);
      setFormData({ name: "", email: "", resume: "", coverNote: "" });
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Job Not Found
          </h2>
          <Link href="/jobs">
            <Button>Back to Jobs</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Combine tags with category for display
  const allTags = job.tags?.includes(job.category)
    ? job.tags
    : [...(job.tags || []), job.category];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Back Button */}
        <Link
          href="/jobs"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          <span className="ml-2">Back to Jobs</span>
        </Link>

        {/* Job Detail Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          {/* Header with Company Icon */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-8 py-8">
            <div className="flex items-start gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                <CompanyIcon company={job.company} size={48} />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {job.title}
                </h1>
                <div className="flex flex-wrap gap-4 text-indigo-100">
                  <span className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    {job.company}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Posted {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              {job.featured && (
                <Badge className="bg-yellow-400 text-yellow-900 px-4 py-2">
                  <Award className="h-4 w-4 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Stats */}
            <div className="flex items-center gap-6 mb-8 pb-6 border-b border-slate-200">
              <div className="flex items-center gap-2 text-slate-600">
                <Users className="h-5 w-5 text-indigo-600" />
                <span className="font-medium">
                  {job.applicants || 0} Applicants
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="font-medium">Active</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {allTags.map((tag, index) => (
                <Badge
                  key={tag + index}
                  variant={index === 0 ? "secondary" : "outline"}
                  className="text-xs px-3 py-1"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Job Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <Briefcase className="h-5 w-5 text-indigo-600 mt-1" />
                <div>
                  <h3 className="text-xs font-medium text-slate-500 uppercase">
                    Job Type
                  </h3>
                  <p className="font-semibold text-slate-900">
                    {job.jobType || "Full Time"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <DollarSign className="h-5 w-5 text-indigo-600 mt-1" />
                <div>
                  <h3 className="text-xs font-medium text-slate-500 uppercase">
                    Salary
                  </h3>
                  <p className="font-semibold text-slate-900">
                    {job.salary || "Negotiable"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <Clock className="h-5 w-5 text-indigo-600 mt-1" />
                <div>
                  <h3 className="text-xs font-medium text-slate-500 uppercase">
                    Experience
                  </h3>
                  <p className="font-semibold text-slate-900">
                    {job.experience || "Not Specified"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <Building2 className="h-5 w-5 text-indigo-600 mt-1" />
                <div>
                  <h3 className="text-xs font-medium text-slate-500 uppercase">
                    Category
                  </h3>
                  <p className="font-semibold text-slate-900">{job.category}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Job Description
              </h2>
              <div className="prose max-w-none text-slate-600 whitespace-pre-line">
                {job.description}
              </div>
            </div>

            {/* Benefits */}
            {job.benefits && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">
                  Benefits & Perks
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.benefits.map((benefit, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-3 py-1"
                    >
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Apply Button */}
            <Button
              onClick={() => setShowApplyForm(true)}
              className="w-full md:w-auto px-8 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-lg rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Apply Now
            </Button>
          </div>
        </div>

        {/* Apply Form Modal */}
        {showApplyForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-fade-in border border-slate-200">
              <button
                onClick={() => setShowApplyForm(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <CompanyIcon company={job.company} size={40} />
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {job.title}
                  </h2>
                  <p className="text-sm text-slate-600">{job.company}</p>
                </div>
              </div>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Application Submitted!
                  </h3>
                  <p className="text-slate-600">
                    We'll notify you of any updates.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name
                    </label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="John Doe"
                      className="w-full border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email
                    </label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="john@example.com"
                      className="w-full border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Resume URL
                    </label>
                    <Input
                      required
                      value={formData.resume}
                      onChange={(e) =>
                        setFormData({ ...formData, resume: e.target.value })
                      }
                      placeholder="https://drive.google.com/..."
                      className="w-full border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Cover Note
                    </label>
                    <Textarea
                      required
                      value={formData.coverNote}
                      onChange={(e) =>
                        setFormData({ ...formData, coverNote: e.target.value })
                      }
                      placeholder="Why are you the best candidate?"
                      rows={4}
                      className="w-full border-slate-200"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6"
                  >
                    Submit Application
                  </Button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
