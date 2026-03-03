import img from "@/assets/trust/amd-logo-1.png";
import img2 from "@/assets/trust/tesla-9 1.png";
import img3 from "@/assets/trust/intel-3.png";
import img4 from "@/assets/trust/vodafone-2017-logo.png";
import Image from "next/image";
export default function TrustedCompanies() {
  const companies = [
    { logo: img },
    { logo: img3 },
    { logo: img2 },
    { logo: img4 },
  ];

  return (
    <section className="bg-white py-12  border-gray-200">
      <div className="container max-w-7xl mx-auto ">
        <span className="text-[#202430] text-sm">Companies we help grow.</span>
        <div className="flex justify-between items-center mt-5">
          {companies.map((c, i) => (
            <div key={i} className="w-32 h-32">
              {" "}
              <Image
                src={c.logo}
                alt="company"
                width={80}
                height={40}
                className="object-contain h-auto w-full "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
