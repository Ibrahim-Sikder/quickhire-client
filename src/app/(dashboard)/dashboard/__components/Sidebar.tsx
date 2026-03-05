"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  Settings,
  LogOut,
  Bell,
  BarChart3,
  HelpCircle,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Jobs",
    icon: Briefcase,
    href: "/dashboard/jobs",
  },
  {
    title: "Applications",
    icon: FileText,
    href: "/dashboard/applications",
  },
  {
    title: "Candidates",
    icon: Users,
    href: "/dashboard/candidates",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
  },
  {
    title: "Notifications",
    icon: Bell,
    href: "/dashboard/notifications",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
  {
    title: "Help",
    icon: HelpCircle,
    href: "/dashboard/help",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-indigo-900 to-indigo-800 text-white shadow-xl">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-indigo-700">
        <h1 className="text-xl font-bold">QuickHire</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-indigo-700 text-white shadow-lg"
                  : "text-indigo-100 hover:bg-indigo-700/50 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.title}</span>

              {/* Active Indicator */}
              {isActive && (
                <div className="ml-auto w-1.5 h-5 bg-white rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <button
          onClick={() => {
            // Add logout logic here
            console.log("Logout clicked");
          }}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-indigo-100 hover:bg-red-600/20 hover:text-red-300 transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
