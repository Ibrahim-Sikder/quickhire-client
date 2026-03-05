"use client";

import { ReactNode } from "react";
import Sidebar from "./dashboard/__components/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar - Fixed on left */}
      <Sidebar />

      {/* Main Content - With left margin to account for sidebar */}
      <main className="ml-64 min-h-screen">
        {/* No header or footer here - just pure content */}
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
