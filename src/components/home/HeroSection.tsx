import hero from "@/assets/hero/hero.png";
import group from "@/assets/Group.png";
import Image from "next/image";
export default function HeroSection() {
  return (
    <section className="bg-white pt-16 pb-24 overflow-hidden">
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
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 max-w-md border border-gray-200">
              <div className="flex-1 flex items-center gap-3 px-4">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  className="bg-transparent outline-none text-gray-700 placeholder-gray-500 w-full py-3 text-sm font-medium"
                />
              </div>
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg h-auto transition">
                Search
              </button>
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

          {/* Right Image */}
          <div className="relative flex justify-center lg:justify-end">
            <Image src={hero} width={500} height={500} alt="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
