import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Expenvisor - AI Expense Tracker | Smart Finance Management",
  description:
    "Track expenses with voice, scan receipts with AI, get personalized financial insights. Free iOS & Android app.",
  keywords:
    "expense tracker, ai finance, budget app, receipt scanner, voice expense tracking, financial advisor app",
  openGraph: {
    title: "Expenvisor - AI-Powered Expense Tracker",
    description: "Smart expense tracking with voice, OCR, and AI insights",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expenvisor - AI Expense Tracker",
    description: "Track smarter with AI",
    images: ["/twitter-image.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased overflow-x-hidden`}
      >
        <a
          href="#main-content"
          className="skip-link"
          aria-label="Skip to main content"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="min-h-screen w-full relative z-10">
          <div className="w-full">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
