import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#F8F8FD] ">
      <div className="container w-full max-w-[1300px] mx-auto flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center gap-x-8">
          <div className="flex items-center gap-2">
            <Link href="/">
              {" "}
              <Image height={30} width={30} src={logo} alt="logo" />
            </Link>
            <span className="font-bold text-xl text-[#25324B]">QuickHire</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 flex-1 justify-center font-medium text-gray-700 hover:text-gray-900 transition">
            <Link href="#">Find Jobs</Link>
            <Link href="#">Browse Companies</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="text-sm font-semibold text-[#4640DE] hover:text-gray-900 hover:bg-transparent"
          >
            Login
          </Button>
          <Button className="text-sm font-semibold bg-[#4640DE] text-white hover:bg-white hover:text-[#4640DE] cursor-pointer px-6 py-5">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}
