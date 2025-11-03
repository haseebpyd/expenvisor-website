import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Budget Planner | Expenvisor Free Tools",
  description:
    "Create a budget using the 50/30/20 rule or custom categories. Plan spending, savings, and track your financial goals.",
  alternates: { canonical: "/tools/budget-planner" },
  keywords: [
    "budget planner",
    "50 30 20 rule",
    "budget calculator",
    "financial planning",
    "monthly budget planner",
  ],
  openGraph: {
    title: "Free Budget Planner - 50/30/20 Rule | Expenvisor",
    description: "Plan your budget using the 50/30/20 rule or create custom category allocations.",
    url: "/tools/budget-planner",
  },
};

export default function BudgetPlannerLayout({
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
            name: "Budget Planner",
            applicationCategory: "FinanceApplication",
            description: "Free budget planner with 50/30/20 rule and custom categories",
            url: "https://expenvisor.com/tools/budget-planner",
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

