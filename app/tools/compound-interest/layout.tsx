import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/tools/metadata";

export const metadata: Metadata = generateToolMetadata({
  name: "Compound Interest Calculator",
  description:
    "Free compound interest calculator to see how your investments grow with compounding and regular contributions. Calculate future value, total interest, and growth projections instantly.",
  keywords: [
    "compound interest calculator",
    "investment growth calculator",
    "compound interest formula",
    "future value calculator",
    "savings calculator",
    "investment calculator",
    "interest calculator",
    "compound interest with contributions",
    "investment return calculator",
    "retirement savings calculator",
  ],
  slug: "compound-interest",
});

export default function CompoundInterestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

