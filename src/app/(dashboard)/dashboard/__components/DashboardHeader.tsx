"use client";

import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function DashboardHeader() {
  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center px-8">
      <div className="flex-1 flex items-center gap-4">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search..." className="pl-10 border-slate-200" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-slate-100 rounded-full">
          <Bell className="h-5 w-5 text-slate-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <button className="flex items-center gap-2 hover:bg-slate-100 rounded-lg p-2">
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-indigo-600" />
          </div>
          <span className="text-sm font-medium text-slate-700">Admin</span>
        </button>
      </div>
    </header>
  );
}
