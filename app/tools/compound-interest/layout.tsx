import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compound Interest Calculator | Expenvisor Free Tools",
  description:
    "Calculate compound interest growth with regular contributions. See how time and compounding accelerate your savings.",
  alternates: { canonical: "/tools/compound-interest" },
  keywords: [
    "compound interest calculator",
    "investment growth calculator",
    "savings calculator",
    "interest calculator",
    "future value calculator",
  ],
  openGraph: {
    title: "Free Compound Interest Calculator | Expenvisor",
    description: "Calculate how your investments grow with compound interest and regular contributions.",
    url: "/tools/compound-interest",
  },
};

export default function CompoundInterestLayout({
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
            name: "Compound Interest Calculator",
            applicationCategory: "FinanceApplication",
            description: "Free compound interest calculator with contributions and yearly breakdown",
            url: "https://expenvisor.com/tools/compound-interest",
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

