import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/tools/metadata";

export const metadata: Metadata = generateToolMetadata({
  name: "HSA Contribution Calculator",
  description:
    "Free HSA contribution calculator to calculate Health Savings Account contributions, tax savings, and optimize HSA contributions for maximum benefits.",
  keywords: [
    "HSA calculator",
    "HSA contribution calculator",
    "health savings account calculator",
    "HSA tax savings",
    "HSA contribution limit",
    "HSA calculator 2025",
    "health savings account",
    "HSA benefits",
    "HSA contribution",
    "HSA planning",
  ],
  slug: "hsa-contribution-calculator",
});

export default function HSAContributionCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

