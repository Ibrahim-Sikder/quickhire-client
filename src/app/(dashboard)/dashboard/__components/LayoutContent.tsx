"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if current route is dashboard or any dashboard sub-route
  const isDashboardRoute = pathname?.startsWith("/dashboard");

  // Also check for auth routes if needed
  const isAuthRoute =
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/register") ||
    pathname?.startsWith("/forgot-password");

  // Hide header/footer on dashboard and auth routes
  const shouldHideHeaderFooter = isDashboardRoute || isAuthRoute;

  return (
    <>
      {!shouldHideHeaderFooter && <Header />}
      <main className={shouldHideHeaderFooter ? "min-h-screen" : ""}>
        {children}
      </main>
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
}
