import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/tools/metadata";

export const metadata: Metadata = generateToolMetadata({
  name: "Tip Calculator",
  description:
    "Free tip calculator for restaurants, split bills with tip, and calculate service charges. Calculate gratuity quickly and fairly.",
  keywords: [
    "tip calculator",
    "restaurant tip calculator",
    "gratuity calculator",
    "tip calculator app",
    "how much to tip",
    "split bill calculator",
    "service charge calculator",
    "tip percentage calculator",
    "restaurant tip",
    "tip calculator 2025",
  ],
  slug: "tip-calculator",
});

export default function TipCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

