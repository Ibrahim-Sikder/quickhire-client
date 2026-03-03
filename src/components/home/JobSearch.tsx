import { ChevronDown, MapPin, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function JobSearch() {
  return (
    <div className="w-full py-8">
      <div className="flex items-center bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        {/* Job Title Input */}
        <div className="flex items-center px-6 flex-1 py-4 min-w-0">
          <Search className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
          <Input
            placeholder="Job title or keyword"
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none placeholder:text-gray-400 text-sm"
          />
        </div>

        {/* Vertical Divider */}
        <div className="h-12 w-px bg-gray-200 flex-shrink-0" />

        {/* Location Select */}
        <div className="flex items-center px-6 py-4 flex-shrink-0">
          <MapPin className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
          <Select defaultValue="florence">
            <SelectTrigger className="border-0 shadow-none focus:ring-0 focus:ring-offset-0 p-0 h-auto w-auto">
              <SelectValue placeholder="Florence, Italy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="florence">Florence, Italy</SelectItem>
              <SelectItem value="rome">Rome, Italy</SelectItem>
              <SelectItem value="milan">Milan, Italy</SelectItem>
              <SelectItem value="venice">Venice, Italy</SelectItem>
              <SelectItem value="naples">Naples, Italy</SelectItem>
            </SelectContent>
          </Select>
          <ChevronDown className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
        </div>

        {/* Search Button */}
        <Button className="rounded-none h-full px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base flex-shrink-0">
          Search my job
        </Button>
      </div>
    </div>
  );
}
