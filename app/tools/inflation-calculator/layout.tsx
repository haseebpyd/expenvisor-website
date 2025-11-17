import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/tools/metadata";

export const metadata: Metadata = generateToolMetadata({
  name: "Inflation Calculator",
  description:
    "Free inflation calculator to calculate purchasing power over time, adjust future values for inflation, and understand how inflation affects your money.",
  keywords: [
    "inflation calculator",
    "purchasing power calculator",
    "money value calculator",
    "inflation rate calculator",
    "CPI calculator",
    "buying power calculator",
    "inflation adjuster",
    "money value over time",
    "inflation impact",
    "inflation calculator 2025",
  ],
  slug: "inflation-calculator",
});

export default function InflationCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

