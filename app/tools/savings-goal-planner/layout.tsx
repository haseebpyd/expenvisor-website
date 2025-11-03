import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Savings Goal Planner | Expenvisor Free Tools",
  description:
    "Calculate how much to save monthly to reach your goal, or how long it will take with your current savings rate.",
  alternates: { canonical: "/tools/savings-goal-planner" },
  keywords: [
    "savings goal calculator",
    "monthly savings calculator",
    "financial goal planner",
    "savings planner",
    "how long to save",
  ],
  openGraph: {
    title: "Free Savings Goal Planner | Expenvisor",
    description: "Plan your savings goals and calculate monthly contributions needed.",
    url: "/tools/savings-goal-planner",
  },
};

export default function SavingsGoalPlannerLayout({
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
            name: "Savings Goal Planner",
            applicationCategory: "FinanceApplication",
            description: "Free savings goal planner with time-to-goal calculations",
            url: "https://expenvisor.com/tools/savings-goal-planner",
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

