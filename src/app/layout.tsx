import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import LayoutContent from "./(dashboard)/dashboard/__components/LayoutContent";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "QuickHire - Job Platform",
    template: "%s | QuickHire",
  },
  description:
    "QuickHire is a modern job platform connecting employers and job seekers efficiently.",
  keywords: [
    "job portal",
    "hire talent",
    "job platform",
    "career opportunities",
    "recruitment system",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "QuickHire - Job Platform",
    description: "Find jobs and hire top talent faster with QuickHire.",
    url: "https://quickhire.anaadevelopersltd.com",
    siteName: "QuickHire",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-right" />
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
