import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Income Tax Calculator | Expenvisor Free Tools",
  description:
    "Estimate federal income tax using 2024 brackets. Simple calculation for educational purposes with standard deduction.",
  alternates: { canonical: "/tools/income-tax-calculator" },
  keywords: [
    "income tax calculator",
    "tax estimator",
    "tax bracket calculator",
    "federal tax calculator",
    "2024 tax calculator",
  ],
  openGraph: {
    title: "Free Income Tax Calculator (2024) | Expenvisor",
    description: "Estimate your federal income tax using 2024 tax brackets with standard deduction.",
    url: "/tools/income-tax-calculator",
  },
};

export default function IncomeTaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Income Tax Calculator",
            applicationCategory: "FinanceApplication",
            description: "Free federal income tax calculator using 2024 tax brackets",
            url: "https://expenvisor.com/tools/income-tax-calculator",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
      {children}
    </>
  );
}

