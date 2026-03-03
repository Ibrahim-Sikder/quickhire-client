import { Button } from "@/components/ui/button";

export default function StartPosting() {
  return (
    <section className="bg-white py-20">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 md:p-16 overflow-hidden relative">
          {/* Background accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="text-white space-y-6">
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                Start posting
                <br />
                jobs today
              </h2>
              <p className="text-white/90 text-base leading-relaxed font-medium">
                Start posting jobs for only $10. Promotions and discounts available!
              </p>
              <Button className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-3 rounded-lg text-base">
                Get Started →
              </Button>
            </div>

            {/* Right Dashboard Preview */}
            <div className="relative">
              {/* Dashboard card mockup */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-200">
                  <div className="flex gap-2 mb-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <p className="text-xs text-gray-600 font-semibold">Dashboard Preview</p>
                </div>
                <div className="p-6 space-y-4">
                  {/* Mock chart bars */}
                  <div className="space-y-2">
                    <div className="flex gap-1 h-16">
                      <div className="flex-1 bg-blue-200 rounded-t-lg"></div>
                      <div className="flex-1 bg-blue-400 rounded-t-lg"></div>
                      <div className="flex-1 bg-blue-300 rounded-t-lg"></div>
                      <div className="flex-1 bg-blue-100 rounded-t-lg"></div>
                    </div>
                  </div>
                  {/* Mock data boxes */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="bg-teal-100 h-6 rounded-lg"></div>
                    <div className="bg-purple-100 h-6 rounded-lg"></div>
                    <div className="bg-orange-100 h-6 rounded-lg"></div>
                  </div>
                </div>
              </div>

              {/* Floating avatar */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-blue-600">
                <span className="text-5xl">👤</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
