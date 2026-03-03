import hero from "@/assets/hero/hero.png";
import group from "@/assets/Group.png";
import Image from "next/image";
import { MapPin, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
export default function HeroSection() {
  return (
    <section className="bg-[#F8F8FD] pt-5 overflow-hidden relative  hero-right-clip">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                Discover
                <br />
                more than
                <br />
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                  5000+ Jobs
                </span>
              </h1>
              <Image src={group} width={500} height={500} alt="hero" />
              <p className="text-gray-600 text-base leading-relaxed max-w-md font-medium">
                Great platform for the job seeker that searching for new
                opportunities in the tech industry.
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full flex justify-center">
              <div className="flex items-center bg-white shadow-md rounded-lg overflow-hidden w-full max-w-4xl border">
                {/* Job Input */}
                <div className="flex items-center px-4 flex-1">
                  <Search className="h-4 w-4 text-muted-foreground mr-2" />
                  <Input
                    placeholder="Job title or keyword"
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                  />
                </div>

                {/* Divider */}
                <div className="h-10 w-px bg-gray-200" />

                {/* Location Select */}
                <div className="flex items-center px-4 w-64">
                  <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                  <Select>
                    <SelectTrigger className="border-0 shadow-none focus:ring-0">
                      <SelectValue placeholder="Florence, Italy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="florence">Florence, Italy</SelectItem>
                      <SelectItem value="rome">Rome, Italy</SelectItem>
                      <SelectItem value="milan">Milan, Italy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Button */}
                <Button className="rounded-none h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white">
                  Search my job
                </Button>
              </div>
            </div>
            {/* Popular Tags */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-semibold text-gray-600">
                Popular :
              </span>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-200 transition cursor-pointer">
                  UI Designer
                </span>
                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-200 transition cursor-pointer">
                  UX Research
                </span>
                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-200 transition cursor-pointer">
                  Admin
                </span>
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-0 h-full w-[55%] bg-[#F8F8FD] flex items-end justify-center">
            <Image
              src={hero}
              alt="hero"
              className="object-contain h-[90%] w-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
