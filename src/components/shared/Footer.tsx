import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Container from "./Container";
import logo from "@/assets/logo.png";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-8 md:mt-16">
      <Container>
        <div className="py-10 md:py-16 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image height={30} width={30} src={logo} alt="logo" />
                <span className="font-bold text-white text-2xl">QuickHire</span>
              </div>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                Great platform for the job seeker that passionate about
                startups. Find your dream job easier.
              </p>
            </div>

            {/* About */}
            <div className="md:flex items-center justify-between  hidden ">
              <div className="space-y-4">
                <h4 className="font-bold text-primary-foreground  text-lg">
                  About
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-white transition font-medium"
                    >
                      Companies
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-white transition font-medium"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-white transition font-medium"
                    >
                      Terms
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-white transition font-medium"
                    >
                      Advice
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-white transition font-medium"
                    >
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:block hidden ">
              {/* Resources */}
              <div className="space-y-4">
                <h4 className="font-bold text-primary-foreground  text-lg">
                  Resources
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-white transition font-medium"
                    >
                      Help Docs
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-white transition font-medium"
                    >
                      Guide
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-white transition font-medium"
                    >
                      Updates
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-white transition font-medium"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap md:hidden justify-between ">
              <div className="flex items-center justify-between">
                <div className="space-y-4">
                  <h4 className="font-bold text-primary-foreground  text-lg">
                    About
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-white transition font-medium"
                      >
                        Companies
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-white transition font-medium"
                      >
                        Pricing
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-white transition font-medium"
                      >
                        Terms
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-white transition font-medium"
                      >
                        Advice
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-white transition font-medium"
                      >
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                {/* Resources */}
                <div className="space-y-4">
                  <h4 className="font-bold text-white text-lg">Resources</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-white transition font-medium"
                      >
                        Help Docs
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-white transition font-medium"
                      >
                        Guide
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-white transition font-medium"
                      >
                        Updates
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-white transition font-medium"
                      >
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Newsletter */}
            <div className="space-y-4">
              <h4 className="font-bold text-primary-foreground text-lg">
                Get job notification{" "}
              </h4>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                The latest job news, articles, sent to your inbox weekly.
              </p>
              <div className="flex flex-wrap md:flex-nowrap  gap-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="flex-1 bg-primary-foreground  border border-gray-700 px-5 py-3 text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:border-purple-500 font-medium"
                />
                <Button className="bg-primary w-full md:w-28 hover:bg-purple-700 text-primary-foreground  px-5 h-14 py-3 rounded-none  font-bold text-sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-xs text-muted-foreground font-medium">
                © 2024 QuickHire. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-white transition"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-white transition"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-white transition"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-white transition"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
