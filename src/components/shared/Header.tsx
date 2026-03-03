import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-purple-200">
      <div className="container max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">Q</span>
          </div>
          <span className="font-bold text-lg text-gray-900">QuickHire</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
          <a
            href="#"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
          >
            For Employers
          </a>
          <a
            href="#"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
          >
            Browse Jobs
          </a>
          <a
            href="#"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
          >
            About
          </a>
          <a
            href="#"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
          >
            Contact
          </a>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-transparent"
          >
            Login
          </Button>
          <Button className="text-sm font-semibold bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}
