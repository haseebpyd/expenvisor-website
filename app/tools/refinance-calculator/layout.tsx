import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/tools/metadata";

export const metadata: Metadata = generateToolMetadata({
  name: "Refinance Calculator",
  description:
    "Free mortgage refinance calculator to calculate savings, break-even point, and compare refinancing vs. staying with current loan. Make informed refinancing decisions.",
  keywords: [
    "refinance calculator",
    "mortgage refinance calculator",
    "refinance savings calculator",
    "refinance break even",
    "should I refinance",
    "mortgage refinance",
    "refinance vs stay",
    "refinance savings",
    "refinance calculator 2025",
    "home refinance calculator",
  ],
  slug: "refinance-calculator",
});

export default function RefinanceCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

