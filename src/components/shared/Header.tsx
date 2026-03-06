"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F8F8FD]">
      <div className="container w-full max-w-[1300px] mx-auto flex items-center justify-between h-16 px-6">
        {/* Logo - Visible on all devices */}
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image height={30} width={30} src={logo} alt="logo" />

            <span className="font-bold text-2xl text-[#25324B]">QuickHire</span>
          </div>
        </Link>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center gap-8 flex-1 justify-center font-medium text-gray-700">
          <Link href="/jobs" className="hover:text-gray-900 transition">
            Find Jobs
          </Link>
          <Link href="#" className="hover:text-gray-900 transition">
            Browse Companies
          </Link>
        </nav>

        {/* Desktop Buttons - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            className="text-sm font-semibold text-primary hover:text-gray-900 hover:bg-transparent"
          >
            Login
          </Button>
          <Button className="text-sm font-semibold bg-primary text-white hover:bg-white hover:text-primary cursor-pointer px-6 py-6 rounded-none">
            Sign Up
          </Button>
        </div>

        {/* Mobile Menu Button - Visible only on mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center justify-center p-2 text-gray-700 hover:text-gray-900 transition"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu - Visible only on mobile when open */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="flex flex-col items-start gap-4 px-6 py-4 font-medium text-gray-700">
            <Link
              href="#"
              className="hover:text-gray-900 transition w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Jobs
            </Link>
            <Link
              href="#"
              className="hover:text-gray-900 transition w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Companies
            </Link>
            <div className="flex flex-col gap-3 w-full pt-4 border-t border-gray-200">
              <Button
                variant="ghost"
                className="text-sm font-semibold text-primary hover:text-gray-900 hover:bg-transparent w-full justify-start"
              >
                Login
              </Button>
              <Button className="text-sm font-semibold bg-primary text-white hover:bg-white hover:text-primary cursor-pointer w-full">
                Sign Up
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
