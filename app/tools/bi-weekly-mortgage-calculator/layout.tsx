import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/tools/metadata";

export const metadata: Metadata = generateToolMetadata({
  name: "Bi-Weekly Mortgage Calculator",
  description:
    "Free bi-weekly mortgage calculator to calculate savings from bi-weekly payments, see payoff time reduction, and compare bi-weekly vs. monthly payments.",
  keywords: [
    "bi-weekly mortgage calculator",
    "biweekly mortgage calculator",
    "bi-weekly payment calculator",
    "mortgage bi-weekly",
    "bi-weekly vs monthly mortgage",
    "mortgage payment calculator",
    "bi-weekly savings",
    "mortgage calculator",
    "bi-weekly mortgage 2025",
    "accelerated mortgage payments",
  ],
  slug: "bi-weekly-mortgage-calculator",
});

export default function BiWeeklyMortgageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

