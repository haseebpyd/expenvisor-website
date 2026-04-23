import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/tools/metadata";

export const metadata: Metadata = generateToolMetadata({
  name: "Car Loan Calculator",
  description:
    "Free car loan calculator to calculate auto loan payments, total interest, and view amortization schedule. Compare car loan options.",
  keywords: [
    "car loan calculator",
    "auto loan calculator",
    "car payment calculator",
    "vehicle loan calculator",
    "auto loan payment",
    "car financing calculator",
    "car loan payment",
    "auto loan",
    "car loan calculator 2025",
    "vehicle financing",
  ],
  slug: "car-loan-calculator",
});

export default function CarLoanCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

