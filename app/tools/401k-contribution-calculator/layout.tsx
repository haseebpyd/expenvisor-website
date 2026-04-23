import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/tools/metadata";

export const metadata: Metadata = generateToolMetadata({
  name: "401(k) Contribution Calculator",
  description:
    "Free 401(k) contribution calculator to calculate retirement savings, employer match, tax savings, and optimize your 401(k) contributions.",
  keywords: [
    "401k calculator",
    "401k contribution calculator",
    "retirement calculator",
    "401k match calculator",
    "401k savings calculator",
    "401k contribution",
    "retirement planning",
    "401k calculator 2025",
    "employer match calculator",
    "401k planning",
  ],
  slug: "401k-contribution-calculator",
});

export default function FourZeroOneKContributionCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

