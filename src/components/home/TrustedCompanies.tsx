import img from "@/assets/trust/amd-logo-1.png";
import img2 from "@/assets/trust/tesla-9 1.png";
import img3 from "@/assets/trust/intel-3.png";
import img4 from "@/assets/trust/vodafone-2017-logo.png";
import Image from "next/image";
import Container from "../shared/Container";

export default function TrustedCompanies() {
  const companies = [
    { logo: img },
    { logo: img3 },
    { logo: img2 },
    { logo: img4 },
  ];

  return (
    <Container>
      <section className="bg-white py-8 md:py-14 border-gray-200">
        <p className="text-[#202430] text-sm mb-6 ">Companies we help grow.</p>

        <div className="flex flex-wrap items-center  sm:justify-between gap-6">
          {companies.map((c, i) => (
            <div
              key={i}
              className="w-[35%] sm:w-[30%] md:w-[22%] flex justify-center"
            >
              <Image
                src={c.logo}
                alt="company"
                className="object-contain md:w-38  h-auto grayscale hover:grayscale-0 transition"
              />
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
