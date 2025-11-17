import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/tools/metadata";

export const metadata: Metadata = generateToolMetadata({
  name: "Currency Converter",
  description:
    "Free currency converter with real-time exchange rates, historical conversion data, and travel budget calculator. Convert between currencies instantly.",
  keywords: [
    "currency converter",
    "exchange rate calculator",
    "money converter",
    "currency exchange",
    "forex calculator",
    "currency conversion",
    "exchange rate",
    "money converter 2025",
    "currency calculator",
    "foreign exchange",
  ],
  slug: "currency-converter",
});

export default function CurrencyConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

