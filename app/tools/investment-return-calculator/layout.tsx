import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/tools/metadata";

export const metadata: Metadata = generateToolMetadata({
  name: "Investment Return Calculator",
  description:
    "Free investment return calculator to calculate ROI, stock market returns, and portfolio growth projections. Plan your investment strategy.",
  keywords: [
    "investment calculator",
    "ROI calculator",
    "stock return calculator",
    "investment return calculator",
    "portfolio calculator",
    "return on investment",
    "investment ROI",
    "stock calculator",
    "investment growth calculator",
    "ROI calculator 2025",
  ],
  slug: "investment-return-calculator",
});

export default function InvestmentReturnCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

