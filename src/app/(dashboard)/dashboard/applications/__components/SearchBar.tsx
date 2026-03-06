import { Input } from "@/components/ui/input";
import { COLORS } from "@/constant/color";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <div className="flex-1 relative">
    <Search
      className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
      style={{ color: COLORS.primary }}
    />
    <Input
      placeholder="Search by name, email, job title, or company..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="pl-10 border-slate-200 focus:ring-2 focus:ring-offset-0"
      style={{ borderColor: COLORS.primary }}
    />
  </div>
);
