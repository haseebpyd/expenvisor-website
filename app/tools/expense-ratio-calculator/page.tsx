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

function toCurrency(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function ExpenseRatioCalculatorPage() {
  const [monthlyIncome, setMonthlyIncome] = useState(5000);
  const [housing, setHousing] = useState(1500);
  const [utilities, setUtilities] = useState(200);
  const [groceries, setGroceries] = useState(600);
  const [transportation, setTransportation] = useState(400);
  const [insurance, setInsurance] = useState(300);
  const [debtPayments, setDebtPayments] = useState(500);
  const [otherExpenses, setOtherExpenses] = useState(500);

  const calc = useMemo(() => {
    const totalExpenses = housing + utilities + groceries + transportation + insurance + debtPayments + otherExpenses;
    const expenseRatio = monthlyIncome > 0 ? (totalExpenses / monthlyIncome) * 100 : 0;
    const remaining = monthlyIncome - totalExpenses;
    const savingsRate = monthlyIncome > 0 ? (remaining / monthlyIncome) * 100 : 0;
    
    return {
      totalExpenses,
      expenseRatio,
      remaining,
      savingsRate,
    };
  }, [monthlyIncome, housing, utilities, groceries, transportation, insurance, debtPayments, otherExpenses]);

  const faqItems = [
    {
      question: "What is expense ratio?",
      answer:
        "Expense ratio is the percentage of your income that goes toward expenses. It's calculated as (Total Expenses / Income) × 100. A lower expense ratio means more money available for savings and investments.",
    },
    {
      question: "What's a good expense ratio?",
      answer:
        "Following the 50/30/20 rule, aim for expenses around 80% of income (50% needs + 30% wants), leaving 20% for savings. Lower expense ratios (60-70%) are even better, allowing more savings and faster wealth building.",
    },
    {
      question: "What expenses should I include?",
      answer:
        "Include all monthly expenses: housing, utilities, groceries, transportation, insurance, debt payments, entertainment, dining out, subscriptions, and any other regular expenses. Be comprehensive for accurate analysis.",
    },
    {
      question: "How can I reduce my expense ratio?",
      answer:
        "To reduce expense ratio: (1) Cut non-essential expenses, (2) Negotiate bills (insurance, utilities, subscriptions), (3) Reduce housing costs if possible, (4) Pay off debt to eliminate payments, (5) Increase income.",
    },
    {
      question: "What's the difference between expense ratio and DTI?",
      answer:
        "Expense ratio includes all expenses (housing, utilities, groceries, etc.). DTI (debt-to-income) includes only debt payments and housing. Expense ratio is broader and shows total spending relative to income.",
    },
    {
      question: "Should I track expense ratio monthly?",
      answer:
        "Yes, tracking monthly helps you identify spending patterns, catch increases early, and ensure you're staying within your budget. Regular tracking is key to financial control and optimization.",
    },
  ];

  const howToSteps = [
    {
      number: 1,
      title: "Enter Monthly Income",
      description:
        "Input your total monthly take-home income (after taxes). This is your baseline for calculating expense ratios.",
    },
    {
      number: 2,
      title: "Enter Expense Categories",
      description:
        "Input your monthly expenses in each category: housing, utilities, groceries, transportation, insurance, debt payments, and other expenses.",
    },
    {
      number: 3,
      title: "Review Expense Analysis",
      description:
        "See your total expenses, expense ratio (percentage of income), remaining income, and savings rate. Compare to recommended ratios.",
    },
    {
      number: 4,
      title: "Optimize Your Budget",
      description:
        "If expense ratio is too high, identify categories to reduce. Aim for 80% or less to leave room for savings and investments.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Expense Ratio Calculator", url: "/tools/expense-ratio-calculator" },
  ]);

  const calculatorSchema = generateCalculatorSchema(
    "Expense Ratio Calculator",
    "Free calculator to analyze monthly expense breakdown, expense-to-income ratio, and get budget optimization suggestions.",
    "/tools/expense-ratio-calculator",
    "Budget Calculator"
  );

  const faqSchema = generateFAQSchema(faqItems);
  const howToSchema = generateHowToSchema(
    howToSteps,
    "How to Use the Expense Ratio Calculator",
    "Step-by-step guide to analyzing your expense ratio and optimizing your budget."
  );

  const relatedTools = [
    { name: "Budget Planner", slug: "budget-planner" },
    { name: "Debt-to-Income Ratio Calculator", slug: "debt-to-income-calculator" },
    { name: "Savings Goal Planner", slug: "savings-goal-planner" },
    { name: "Emergency Fund Calculator", slug: "emergency-fund-calculator" },
  ];

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, calculatorSchema, faqSchema, howToSchema]} />
      <ExitIntentCTA />
      <ToolLayout>
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <header className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-white mb-3">Expense Ratio Calculator</h1>
              <p className="text-text-secondary-dark">
                Analyze your monthly expenses and calculate expense-to-income ratio. Free and instant.
              </p>
            </header>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <NumberInput
                  label="Monthly Income"
                  value={monthlyIncome}
                  onChange={setMonthlyIncome}
                  min={0}
                  step={100}
                  suffix="$"
                />
                <h3 className="text-lg font-semibold text-white mt-4">Monthly Expenses</h3>
                <NumberInput
                  label="Housing (Rent/Mortgage)"
                  value={housing}
                  onChange={setHousing}
                  min={0}
                  step={50}
                  suffix="$"
                />
                <NumberInput
                  label="Utilities"
                  value={utilities}
                  onChange={setUtilities}
                  min={0}
                  step={25}
                  suffix="$"
                />
                <NumberInput
                  label="Groceries"
                  value={groceries}
                  onChange={setGroceries}
                  min={0}
                  step={50}
                  suffix="$"
                />
                <NumberInput
                  label="Transportation"
                  value={transportation}
                  onChange={setTransportation}
                  min={0}
                  step={50}
                  suffix="$"
                />
                <NumberInput
                  label="Insurance"
                  value={insurance}
                  onChange={setInsurance}
                  min={0}
                  step={25}
                  suffix="$"
                />
                <NumberInput
                  label="Debt Payments"
                  value={debtPayments}
                  onChange={setDebtPayments}
                  min={0}
                  step={50}
                  suffix="$"
                />
                <NumberInput
                  label="Other Expenses"
                  value={otherExpenses}
                  onChange={setOtherExpenses}
                  min={0}
                  step={50}
                  suffix="$"
                />
              </div>

              <div className="space-y-4">
                <ResultCard title="Expense Analysis">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-dark">Total Expenses</span>
                      <span className="text-2xl font-bold text-white">{toCurrency(calc.totalExpenses)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-dark">Expense Ratio</span>
                      <span className={`text-xl font-bold ${calc.expenseRatio <= 80 ? "text-accent" : "text-red-400"}`}>
                        {calc.expenseRatio.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-dark">Remaining Income</span>
                      <span className={`font-semibold ${calc.remaining >= 0 ? "text-accent" : "text-red-400"}`}>
                        {toCurrency(calc.remaining)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-dark">Savings Rate</span>
                      <span className="text-white">{calc.savingsRate.toFixed(1)}%</span>
                    </div>
                    <div className="pt-3 border-t border-secondary/20 text-sm">
                      {calc.expenseRatio <= 80 ? (
                        <span className="text-accent">✓ Good expense ratio - room for savings</span>
                      ) : (
                        <span className="text-red-400">⚠ High expense ratio - consider reducing expenses</span>
                      )}
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
                  Understanding your expense ratio—the percentage of income that goes toward expenses—is crucial for
                  financial health. A high expense ratio leaves little room for savings, investments, and financial goals,
                  while a lower ratio provides flexibility and accelerates wealth building.
                </p>
                <p>
                  This free expense ratio calculator helps you analyze your monthly spending, calculate your
                  expense-to-income ratio, and identify opportunities to optimize your budget. It breaks down expenses
                  by category and shows you exactly where your money goes.
                </p>
                <p>
                  Use this tool to track your spending patterns, identify areas for reduction, and ensure you're
                  maintaining a healthy balance between expenses and savings.
                </p>
              </ContentSection>

              <HowToSection
                title="How to Use the Expense Ratio Calculator"
                description="Follow these steps to analyze your expense ratio:"
                steps={howToSteps}
              />

              <ContentSection title="Understanding Expense Ratios">
                <p>
                  <strong>80% or Less (Excellent):</strong> Leaves 20%+ for savings and investments. This is the target
                  for most people following the 50/30/20 budget rule (50% needs, 30% wants, 20% savings).
                </p>
                <p>
                  <strong>81-90% (Acceptable):</strong> Still manageable but leaves limited room for savings. Consider
                  reducing expenses in non-essential categories to improve your savings rate.
                </p>
                <p>
                  <strong>91-100% (Risky):</strong> Living paycheck to paycheck with little to no savings. This is
                  unsustainable long-term and leaves no buffer for emergencies or financial goals.
                </p>
                <p>
                  <strong>Above 100% (Critical):</strong> Spending more than you earn, going into debt. Immediate action
                  required to reduce expenses or increase income.
                </p>
              </ContentSection>

              <ContentSection title="Tips & Best Practices for Reducing Expense Ratio">
                <h3 className="font-semibold text-white mb-2">1. Track All Expenses</h3>
                <p>
                  Use expense tracking apps like Expenvisor to see exactly where your money goes. Awareness is the first
                  step to reducing expenses.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">2. Reduce Housing Costs</h3>
                <p>
                  Housing is typically the largest expense. Consider downsizing, getting a roommate, or refinancing to
                  lower your mortgage payment. Even small reductions have big impact.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">3. Cut Non-Essential Expenses</h3>
                <p>
                  Review subscriptions, dining out, entertainment, and other discretionary spending. Cancel unused
                  services and reduce frequency of non-essential purchases.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">4. Negotiate Bills</h3>
                <p>
                  Call service providers to negotiate lower rates on insurance, utilities, internet, phone, and other
                  bills. Many companies offer discounts to retain customers.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">5. Pay Off Debt</h3>
                <p>
                  Eliminating debt payments reduces your expense ratio and frees up money for savings. Focus on
                  high-interest debt first using the debt payoff calculator.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">6. Increase Income</h3>
                <p>
                  While reducing expenses is important, increasing income also improves your expense ratio. Consider side
                  hustles, asking for raises, or finding higher-paying opportunities.
                </p>
              </ContentSection>

              <div className="mt-8">
                <ShareButton
                  title="Expense Ratio Calculator - Free 2025 | Expenvisor"
                  url="/tools/expense-ratio-calculator"
                  description="Analyze monthly expenses and calculate expense-to-income ratio."
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
                <h3 className="text-2xl font-bold text-white mb-3">Track Your Expenses with Expenvisor</h3>
                <p className="text-text-secondary-dark mb-4">
                  Analyzing your expenses? Track all your spending automatically with Expenvisor's AI-powered expense
                  tracker.
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

