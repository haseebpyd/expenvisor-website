"use client";

import ToolLayout from "../ToolLayout";
import { useMemo, useState } from "react";
import { NumberInput, ResultCard } from "@/components/tools/inputs";
import FAQ, { generateFAQSchema } from "@/components/tools/FAQ";
import { ContentSection, HowToSection, generateHowToSchema } from "@/components/tools/ContentSection";
import SchemaMarkup, { generateBreadcrumbSchema, generateCalculatorSchema } from "@/components/tools/SchemaMarkup";
import ShareButton from "@/components/tools/ShareButton";
import ExitIntentCTA from "@/components/tools/ExitIntentCTA";
import Link from "next/link";

export default function DebtToIncomeCalculatorPage() {
  const [monthlyIncome, setMonthlyIncome] = useState(5000);
  const [monthlyDebt, setMonthlyDebt] = useState(1500);
  const [housingCost, setHousingCost] = useState(1500);

  const calc = useMemo(() => {
    const frontEndDTI = monthlyIncome > 0 ? (housingCost / monthlyIncome) * 100 : 0;
    const backEndDTI = monthlyIncome > 0 ? ((housingCost + monthlyDebt) / monthlyIncome) * 100 : 0;
    return { frontEndDTI, backEndDTI };
  }, [monthlyIncome, monthlyDebt, housingCost]);

  const faqItems = [
    {
      question: "What is debt-to-income (DTI) ratio?",
      answer:
        "DTI ratio is the percentage of your monthly gross income that goes toward paying debts. It's calculated by dividing total monthly debt payments (including housing) by gross monthly income, then multiplying by 100. Lenders use this to assess your ability to manage monthly payments.",
    },
    {
      question: "What's the difference between front-end and back-end DTI?",
      answer:
        "Front-end DTI includes only housing costs (mortgage/rent, property taxes, insurance, HOA). Back-end DTI includes housing plus all other debts (credit cards, car loans, student loans, etc.). Most lenders focus on back-end DTI.",
    },
    {
      question: "What's a good DTI ratio?",
      answer:
        "Generally: 36% or less is excellent, 37-43% is acceptable, 44-50% is risky, above 50% is very difficult to qualify. Most conventional lenders prefer 36% or less for back-end DTI. FHA loans may accept up to 43%.",
    },
    {
      question: "How do lenders use DTI ratio?",
      answer:
        "Lenders use DTI to evaluate loan applications. A lower DTI shows you can comfortably manage payments. High DTI suggests financial stress and higher default risk. DTI is a key factor in loan approval and interest rates.",
    },
    {
      question: "What debts are included in DTI?",
      answer:
        "Include all recurring monthly debt payments: mortgage/rent, credit card minimums, car loans, student loans, personal loans, alimony, child support, and any other monthly obligations. Don't include utilities, groceries, or insurance premiums.",
    },
    {
      question: "How can I improve my DTI ratio?",
      answer:
        "To improve DTI: (1) Increase income, (2) Pay down debts to reduce monthly payments, (3) Avoid new debt, (4) Refinance high-rate debt to lower payments, (5) Pay off small debts completely to eliminate minimum payments.",
    },
  ];

  const howToSteps = [
    {
      number: 1,
      title: "Enter Monthly Income",
      description:
        "Input your gross monthly income (before taxes). Include all income sources: salary, wages, bonuses, rental income, and any other regular income.",
    },
    {
      number: 2,
      title: "Enter Housing Costs",
      description:
        "Enter your total monthly housing costs: mortgage/rent payment, property taxes, homeowners/renters insurance, HOA fees, and PMI if applicable.",
    },
    {
      number: 3,
      title: "Enter Other Monthly Debts",
      description:
        "Add all other monthly debt payments: credit cards, car loans, student loans, personal loans, and any other recurring debt obligations.",
    },
    {
      number: 4,
      title: "Review Your DTI Ratios",
      description:
        "See your front-end DTI (housing only) and back-end DTI (housing + all debts). Compare to lender guidelines to assess your loan eligibility.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Debt-to-Income Ratio Calculator", url: "/tools/debt-to-income-calculator" },
  ]);

  const calculatorSchema = generateCalculatorSchema(
    "Debt-to-Income Ratio Calculator",
    "Free calculator to assess your financial health and loan eligibility by calculating front-end and back-end DTI ratios.",
    "/tools/debt-to-income-calculator",
    "DTI Calculator"
  );

  const faqSchema = generateFAQSchema(faqItems);
  const howToSchema = generateHowToSchema(
    howToSteps,
    "How to Use the Debt-to-Income Ratio Calculator",
    "Step-by-step guide to calculating your DTI ratio."
  );

  const relatedTools = [
    { name: "Mortgage Affordability Calculator", slug: "mortgage-affordability" },
    { name: "Debt Payoff Calculator", slug: "debt-payoff-calculator" },
    { name: "Budget Planner", slug: "budget-planner" },
    { name: "Loan Calculator", slug: "loan-calculator" },
  ];

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, calculatorSchema, faqSchema, howToSchema]} />
      <ExitIntentCTA />
      <ToolLayout>
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <header className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-white mb-3">Debt-to-Income Ratio Calculator</h1>
              <p className="text-text-secondary-dark">
                Calculate your DTI ratio to assess financial health and loan eligibility. Free and instant.
              </p>
            </header>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <NumberInput
                  label="Monthly Gross Income"
                  value={monthlyIncome}
                  onChange={setMonthlyIncome}
                  min={0}
                  step={100}
                  suffix="$"
                />
                <NumberInput
                  label="Monthly Housing Costs"
                  value={housingCost}
                  onChange={setHousingCost}
                  min={0}
                  step={50}
                  suffix="$"
                />
                <NumberInput
                  label="Other Monthly Debt Payments"
                  value={monthlyDebt}
                  onChange={setMonthlyDebt}
                  min={0}
                  step={50}
                  suffix="$"
                />
              </div>

              <div className="space-y-4">
                <ResultCard title="DTI Ratios">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-dark">Front-End DTI</span>
                      <span className="text-2xl font-bold text-white">{calc.frontEndDTI.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-dark">Back-End DTI</span>
                      <span className="text-2xl font-bold text-white">{calc.backEndDTI.toFixed(1)}%</span>
                    </div>
                    <div className="pt-3 border-t border-secondary/20">
                      <div className="text-sm text-text-secondary-dark">
                        {calc.backEndDTI <= 36 ? (
                          <span className="text-green-400">✓ Excellent - Most lenders prefer this</span>
                        ) : calc.backEndDTI <= 43 ? (
                          <span className="text-yellow-400">⚠ Acceptable - May qualify with stricter requirements</span>
                        ) : calc.backEndDTI <= 50 ? (
                          <span className="text-orange-400">⚠ Risky - Limited loan options</span>
                        ) : (
                          <span className="text-red-400">✗ Very difficult to qualify</span>
                        )}
                      </div>
                    </div>
                  </div>
                </ResultCard>
              </div>
            </div>

            <div className="mt-12 max-w-4xl mx-auto">
              <FAQ items={faqItems} />
            </div>

            <div className="mt-12 max-w-4xl mx-auto">
              <ContentSection title="Introduction">
                <p>
                  Your debt-to-income (DTI) ratio is one of the most important financial metrics lenders use to
                  evaluate your creditworthiness. It measures what percentage of your monthly income goes toward debt
                  payments, helping lenders assess your ability to manage additional debt.
                </p>
                <p>
                  This free DTI calculator helps you understand your financial health and loan eligibility. It calculates
                  both front-end DTI (housing costs only) and back-end DTI (all debts), giving you a complete picture of
                  your debt burden.
                </p>
                <p>
                  Whether you're applying for a mortgage, personal loan, or just want to assess your financial health,
                  knowing your DTI ratio is essential for making informed financial decisions.
                </p>
              </ContentSection>

              <HowToSection
                title="How to Use the Debt-to-Income Ratio Calculator"
                description="Follow these steps to calculate your DTI ratio:"
                steps={howToSteps}
              />

              <ContentSection title="Understanding DTI Ratio Guidelines">
                <p>
                  <strong>36% or Less (Excellent):</strong> Most lenders prefer this. Shows you can comfortably manage
                  debt payments and have room for additional obligations.
                </p>
                <p>
                  <strong>37-43% (Acceptable):</strong> May qualify for loans but with stricter requirements. Some lenders
                  may require higher credit scores or larger down payments.
                </p>
                <p>
                  <strong>44-50% (Risky):</strong> Limited loan options available. Higher interest rates likely. Consider
                  improving DTI before applying for major loans.
                </p>
                <p>
                  <strong>Above 50% (Very Difficult):</strong> Extremely difficult to qualify for new loans. Focus on
                  reducing debt before applying for additional credit.
                </p>
              </ContentSection>

              <ContentSection title="Tips & Best Practices for Improving DTI">
                <h3 className="font-semibold text-white mb-2">1. Pay Down Existing Debts</h3>
                <p>
                  The fastest way to improve DTI is to reduce monthly debt payments. Pay off small debts completely or
                  make extra payments to reduce balances and minimum payments.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">2. Increase Your Income</h3>
                <p>
                  Higher income automatically improves your DTI ratio. Consider asking for a raise, taking on a side
                  hustle, or finding higher-paying opportunities.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">3. Avoid New Debt</h3>
                <p>
                  Don't take on new debt while trying to improve DTI. Every new monthly payment increases your DTI and
                  makes it harder to qualify for loans.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">4. Refinance High-Rate Debt</h3>
                <p>
                  Refinance credit cards or loans to lower interest rates, which reduces monthly payments and improves
                  DTI. Balance transfer cards or debt consolidation loans can help.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">5. Pay Off Small Debts First</h3>
                <p>
                  Eliminating small debts completely removes their minimum payments from your DTI calculation, providing
                  immediate improvement.
                </p>
              </ContentSection>

              <div className="mt-8">
                <ShareButton
                  title="Debt-to-Income Ratio Calculator - Free 2025 | Expenvisor"
                  url="/tools/debt-to-income-calculator"
                  description="Calculate your DTI ratio to assess financial health and loan eligibility."
                />
              </div>

              <div className="mt-8 bg-surface-elevated-dark rounded-2xl p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Related Financial Tools</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="p-4 bg-surface-dark rounded-xl hover:bg-surface-dark/80 transition-colors border border-accent/20 hover:border-accent/40"
                    >
                      <h4 className="font-semibold text-white mb-1">{tool.name}</h4>
                      <p className="text-sm text-text-secondary-dark">Calculate related financial metrics</p>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-2xl border border-accent/30 text-center">
                <h3 className="text-2xl font-bold text-white mb-3">Track Your Debt and Income with Expenvisor</h3>
                <p className="text-text-secondary-dark mb-4">
                  Calculated your DTI? Track all your expenses, income, and debt payments with Expenvisor's AI-powered
                  expense tracker.
                </p>
                <a
                  href="https://apps.apple.com/pk/app/expenvisor-ai-expense-tracker/id6754627757"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-secondary text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Download Expenvisor →
                </a>
              </div>
            </div>
          </div>
        </section>
      </ToolLayout>
    </>
  );
}

