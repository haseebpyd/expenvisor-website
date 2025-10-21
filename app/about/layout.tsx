import { Metadata } from "next";
import {
  generateMetadata as generateSEOMetadata,
} from "@/lib/metadata";

export const metadata: Metadata = generateSEOMetadata({
  title: "About Expenvisor - AI-Powered Expense Tracking Company",
  description:
    "Learn about Expenvisor's mission to revolutionize personal finance management with AI technology. Meet our team and discover our vision for the future of expense tracking.",
  keywords: [
    "about expenvisor",
    "AI finance company",
    "expense tracking team",
    "fintech mission",
    "personal finance technology",
  ],
  canonical: "/about",
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
