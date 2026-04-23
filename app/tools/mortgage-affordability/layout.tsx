import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/tools/metadata";

export const metadata: Metadata = generateToolMetadata({
  name: "Mortgage Affordability Calculator",
  description:
    "Free mortgage affordability calculator to estimate how much home you can afford based on income, debt-to-income ratio, and down payment. Calculate your maximum home price instantly.",
  keywords: [
    "mortgage affordability calculator",
    "how much house can I afford",
    "home affordability calculator",
    "DTI calculator",
    "mortgage calculator",
    "home buying calculator",
    "house affordability",
    "mortgage pre-approval calculator",
    "home price calculator",
    "affordable home calculator",
  ],
  slug: "mortgage-affordability",
});

export default function MortgageAffordabilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

