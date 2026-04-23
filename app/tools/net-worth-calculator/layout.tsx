import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/tools/metadata";

export const metadata: Metadata = generateToolMetadata({
  name: "Net Worth Calculator",
  description:
    "Free net worth calculator to calculate assets vs. liabilities, track net worth over time, and assess your financial health score.",
  keywords: [
    "net worth calculator",
    "assets calculator",
    "financial health calculator",
    "net worth tracker",
    "assets and liabilities",
    "personal net worth",
    "wealth calculator",
    "net worth calculation",
    "financial net worth",
    "net worth calculator 2025",
  ],
  slug: "net-worth-calculator",
});

export default function NetWorthCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

