import { Button } from "@/components/ui/button";
import content from "@/assets/posting/Content.png";
import bg from "@/assets/posting/Rectangle.png";
import Image from "next/image";
import Container from "../shared/Container";

export default function StartPosting() {
  return (
    <section className=" mt-8 md:mt-16">
      <Container>
        <div
          className="relative  overflow-hidden w-full startPosting px-8 py-14 "
          style={{
            backgroundImage: `url(${bg.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
          }}
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            {/* LEFT CONTENT */}
            <div className="text-white text-center md:text-left max-w-xl space-y-6">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Start posting
                <br />
                jobs today
              </h2>

              <p className="text-white/90 text-lg">
                Start posting jobs for only $10.
              </p>

              <Button className="bg-white w-full md:w-auto text-primary hover:bg-gray-100 font-semibold px-8 py-6 rounded-lg text-base">
                Sign Up For Free
              </Button>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative lg:absolute lg:right-5 lg:top-5 flex justify-center lg:justify-end md:mt-10 lg:mt-0">
              <Image
                src={content}
                alt="Dashboard Preview"
                className="w-full max-w-md lg:max-w-xl drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
