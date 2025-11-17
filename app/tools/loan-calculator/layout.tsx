import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/tools/metadata";

export const metadata: Metadata = generateToolMetadata({
  name: "Loan Calculator",
  description:
    "Free loan calculator to estimate monthly payments, total interest, and view complete amortization schedule. Calculate any loan payment instantly with our easy-to-use calculator.",
  keywords: [
    "loan calculator",
    "loan payment calculator",
    "amortization calculator",
    "monthly payment calculator",
    "loan interest calculator",
    "mortgage calculator",
    "auto loan calculator",
    "personal loan calculator",
    "loan amortization schedule",
    "calculate loan payment",
  ],
  slug: "loan-calculator",
});

export default function LoanCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
