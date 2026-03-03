import ExploreCategory from "@/components/home/ExploreCategory";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import HeroSection from "@/components/home/HeroSection";
import LatestJobs from "@/components/home/LatestJobs";
import StartPosting from "@/components/home/StartPosting";
import TrustedCompanies from "@/components/home/TrustedCompanies";

export default function page() {
  return (
    <>
      <HeroSection />
      <TrustedCompanies />
      <ExploreCategory />
      <StartPosting />
      <FeaturedJobs />
      <LatestJobs />
    </>
  );
}
