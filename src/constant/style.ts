export const JOB_CARD_STYLES = {
  container:
    "flex gap-4 p-6 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 bg-white",
  title: "text-base font-semibold text-slate-900 mb-1",
  company: "text-sm text-slate-600 mb-3",
  icon: "w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold",
} as const;
// Constants
export const GRADIENTS = [
  "from-emerald-400 to-emerald-600",
  "from-cyan-400 to-cyan-600",
  "from-blue-500 to-blue-700",
  "from-blue-400 to-blue-600",
  "from-red-400 to-red-600",
  "from-purple-400 to-purple-600",
  "from-yellow-500 to-yellow-700",
  "from-pink-400 to-pink-600",
] as const;

export const TAG_STYLES = {
  primary:
    "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
  secondary: "bg-white text-slate-700 border-slate-300 hover:bg-slate-50",
} as const;
