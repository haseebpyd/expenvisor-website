"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

export default function ToolLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-secondary-dark">
      <Navbar />
      <div className="relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full animate-gradient" />
        </div>
        <div className="relative z-10 py-12 sm:py-16 lg:py-20">
          {children}
        </div>
      </div>
      <Footer />
    </main>
  );
}


