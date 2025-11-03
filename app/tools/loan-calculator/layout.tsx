import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Calculator | Expenvisor Free Tools",
  description:
    "Estimate monthly payment and total interest with an amortization schedule. Fast, private, no sign-up. Download CSV schedule.",
  alternates: { canonical: "/tools/loan-calculator" },
  keywords: [
    "loan calculator",
    "amortization schedule",
    "monthly payment calculator",
    "interest calculator",
    "mortgage calculator",
  ],
  openGraph: {
    title: "Free Loan Calculator - Amortization Schedule | Expenvisor",
    description: "Calculate loan payments and view complete amortization schedule. Export to CSV.",
    url: "/tools/loan-calculator",
  },
};

export default function LoanCalculatorLayout({
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
            name: "Loan Calculator",
            applicationCategory: "FinanceApplication",
            description: "Free loan calculator with amortization schedule and CSV export",
            url: "https://expenvisor.com/tools/loan-calculator",
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

