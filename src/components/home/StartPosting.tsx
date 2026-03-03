import { Button } from "@/components/ui/button";
import content from "@/assets/posting/Content.png";
import bg from "@/assets/posting/Rectangle.png";
import Image from "next/image";

export default function StartPosting() {
  return (
    <section className="py-20 bg-white">
      <div className="container max-w-7xl mx-auto px-6">
        <div
          className="relative rounded-3xl overflow-hidden px-12 py-16 lg:px-20 lg:py-20"
          style={{
            backgroundImage: `url(${bg.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Optional overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-700/90 to-blue-600/90"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            {/* LEFT CONTENT */}
            <div className="text-white max-w-xl space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Start posting
                <br />
                jobs today
              </h2>

              <p className="text-white/90 text-lg">
                Start posting jobs for only $10.
              </p>

              <Button className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-8 py-6 rounded-lg text-base">
                Sign Up For Free
              </Button>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative flex justify-center lg:justify-end">
              <Image
                src={content}
                alt="Dashboard Preview"
                className="w-full max-w-xl drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
