export const ITEMS_PER_PAGE = 10;

export const COLORS = {
  primary: "#4640de",
  secondary: "#26A4FF",
  primaryLight: "rgba(70, 64, 222, 0.1)",
  secondaryLight: "rgba(38, 164, 255, 0.1)",
} as const;

export const STAT_CARDS = [
  {
    title: "Total Applications",
    icon: "Users",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    title: "With Job",
    icon: "Briefcase",
    gradient: "from-green-500 to-green-600",
  },
  {
    title: "General Applications",
    icon: "FileText",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    title: "Applied Today",
    icon: "Clock",
    gradient: "from-orange-500 to-orange-600",
  },
] as const;
