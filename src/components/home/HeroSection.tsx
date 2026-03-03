import hero from "@/assets/hero/hero.png";
import group from "@/assets/Group.png";
import Image from "next/image";
import JobSearch from "./JobSearch";
import { getJobs } from "@/lib/getJobs";

export default async function HeroSection() {
  const jobData = await getJobs();
  console.log("job data this ", jobData);
  return (
    <section className=" bg-[#F8F8FD] pt-5 overflow-hidden relative hero-right-clip">
      <div className="container mx-auto  px-6">
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
            <JobSearch />
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

          {/* Right Hero Image */}
          <div className="h-[700px]  bg-[#F8F8FD] flex items-end justify-center">
            <Image
              src={hero}
              alt="hero"
              className="object-contain h-full w-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
