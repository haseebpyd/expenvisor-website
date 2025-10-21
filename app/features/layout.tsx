import { Metadata } from "next";
import {
  generateMetadata as generateSEOMetadata,
} from "@/lib/metadata";

export const metadata: Metadata = generateSEOMetadata({
  title:
    "Expenvisor Features - AI-Powered Expense Tracking & Financial Management",
  description:
    "Discover Expenvisor's powerful features including voice expense tracking, OCR receipt scanning, AI insights, and smart budgeting tools. See how our app revolutionizes personal finance management.",
  keywords: [
    "expense tracker features",
    "AI expense tracking",
    "voice expense logging",
    "receipt scanner",
    "smart budgeting",
    "financial insights",
  ],
  canonical: "/features",
});

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
