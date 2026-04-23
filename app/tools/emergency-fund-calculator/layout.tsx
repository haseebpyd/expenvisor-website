import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/tools/metadata";

export const metadata: Metadata = generateToolMetadata({
  name: "Emergency Fund Calculator",
  description:
    "Free emergency fund calculator to determine how much you should save, calculate time to build your fund, and plan for financial emergencies. Build your safety net.",
  keywords: [
    "emergency fund calculator",
    "how much emergency fund",
    "emergency savings calculator",
    "rainy day fund calculator",
    "emergency fund how much",
    "savings calculator",
    "emergency fund size",
    "financial safety net",
    "emergency fund planning",
    "emergency fund 2025",
  ],
  slug: "emergency-fund-calculator",
});

export default function EmergencyFundCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

