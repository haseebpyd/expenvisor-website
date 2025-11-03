import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Affordability Calculator | Expenvisor Free Tools",
  description:
    "Estimate how much home you can afford based on income, expenses, and DTI. Includes down payment and monthly payment estimates.",
  alternates: { canonical: "/tools/mortgage-affordability" },
  keywords: [
    "mortgage affordability calculator",
    "how much house can I afford",
    "DTI calculator",
    "home buying calculator",
    "mortgage calculator",
  ],
  openGraph: {
    title: "Free Mortgage Affordability Calculator | Expenvisor",
    description: "Calculate how much home you can afford based on income and debt-to-income ratio.",
    url: "/tools/mortgage-affordability",
  },
};

export default function MortgageAffordabilityLayout({
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
            name: "Mortgage Affordability Calculator",
            applicationCategory: "FinanceApplication",
            description: "Free calculator to estimate how much home you can afford",
            url: "https://expenvisor.com/tools/mortgage-affordability",
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

