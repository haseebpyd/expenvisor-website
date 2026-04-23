import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/tools/metadata";

export const metadata: Metadata = generateToolMetadata({
  name: "Hourly to Salary Converter",
  description:
    "Free hourly to salary converter to calculate annual salary from hourly wage, compare contract vs. full-time, and understand benefits value.",
  keywords: [
    "hourly to salary calculator",
    "wage calculator",
    "salary converter",
    "hourly wage calculator",
    "annual salary calculator",
    "hourly to annual",
    "salary calculator",
    "wage to salary",
    "hourly rate calculator",
    "salary converter 2025",
  ],
  slug: "hourly-to-salary-converter",
});

export default function HourlyToSalaryConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

