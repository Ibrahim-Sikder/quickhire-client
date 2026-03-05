import hero from "@/assets/hero/hero.png";
import group from "@/assets/Group.png";
import Image from "next/image";
import JobSearch from "./JobSearch";
import { getJobs } from "@/lib/getJobs";
import Container from "../shared/Container";
import pattern from "@/assets/Pattern.png";
export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const jobs = await getJobs();
  return (
    <section className=" bg-[#F8F8FD] pt-5 h-[650px] overflow-hidden relative hero-right-clip ">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-bold lg:text-7xl font-bold text-[#25324B] leading-tight mb-6">
                Discover
                <br />
                more than
                <br />
                <span className=" text-[#26A4FF] font-bold ">5000+ Jobs</span>
              </h1>
              <Image
                src={group}
                width={500}
                height={500}
                className="w-[500px]"
                alt="hero"
              />
              <p className="mt-3 text-[#515B6F] text-md leading-relaxed max-w-md font-medium">
                Great platform for the job seeker that searching for new
                opportunities in the tech industry.
              </p>
            </div>
            <JobSearch initialJobs={jobs} searchParams={searchParams} />
            {/* Popular Tags */}
            <div className="flex gap-2 flex-wrap text-[#202430] text-sm ">
              Popular : UI Designer, UX Researcher, Android, Admin
            </div>
          </div>

          <div className="hidden  md:flex items-end justify-center mt-3 ">
            <Image
              src={hero}
              alt="hero"
              className="object-contain h-[600px] w-auto"
              priority
            />
          </div>
        </div>
      </Container>
      <Image src={pattern} alt="hero" className="pattern " priority />
    </section>
  );
}
