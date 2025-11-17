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

function calculatePayment(principal: number, rate: number, years: number): number {
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  if (monthlyRate === 0) return principal / months;
  return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
}

export default function BiWeeklyMortgageCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const calc = useMemo(() => {
    const monthlyPayment = calculatePayment(loanAmount, interestRate, loanTerm);
    const biWeeklyPayment = monthlyPayment / 2;
    
    // Bi-weekly: 26 payments per year = 13 monthly payments
    // This effectively makes one extra payment per year
    const totalMonthlyPayments = loanTerm * 12;
    const totalBiWeeklyPayments = Math.ceil((loanTerm * 12) / 2) * 2;
    
    // Approximate bi-weekly payoff (faster due to extra payment)
    let biWeeklyBalance = loanAmount;
    let biWeeklyMonths = 0;
    const biWeeklyRate = interestRate / 100 / 26; // 26 periods per year
    
    while (biWeeklyBalance > 100 && biWeeklyMonths < loanTerm * 12) {
      biWeeklyMonths += 0.5; // Half month per bi-weekly payment
      const interest = biWeeklyBalance * biWeeklyRate;
      biWeeklyBalance = biWeeklyBalance + interest - biWeeklyPayment;
      if (biWeeklyBalance <= 100) biWeeklyBalance = 0;
    }
    
    const monthlyTotalInterest = (monthlyPayment * totalMonthlyPayments) - loanAmount;
    const biWeeklyTotalInterest = (biWeeklyPayment * totalBiWeeklyPayments) - loanAmount;
    const savings = monthlyTotalInterest - biWeeklyTotalInterest;
    const timeSaved = (loanTerm * 12) - biWeeklyMonths;
    
    return {
      monthlyPayment,
      biWeeklyPayment,
      monthlyTotalInterest,
      biWeeklyTotalInterest,
      savings,
      timeSaved,
      biWeeklyMonths,
    };
  }, [loanAmount, interestRate, loanTerm]);

  const faqItems = [
    {
      question: "What is a bi-weekly mortgage payment?",
      answer:
        "Bi-weekly payments mean paying half your monthly payment every two weeks (26 payments per year = 13 monthly payments). This makes one extra payment per year, reducing payoff time and interest costs.",
    },
    {
      question: "How much can I save with bi-weekly payments?",
      answer:
        "Bi-weekly payments can save thousands in interest and cut 4-7 years off a 30-year mortgage. Savings depend on loan amount, interest rate, and term. This calculator shows exact savings for your situation.",
    },
    {
      question: "How do bi-weekly payments work?",
      answer:
        "Instead of 12 monthly payments, you make 26 bi-weekly payments (every 2 weeks). Since there are 52 weeks per year, you make 26 payments = 13 monthly payments. The extra payment accelerates payoff.",
    },
    {
      question: "Should I switch to bi-weekly payments?",
      answer:
        "Yes, if you can afford it. Bi-weekly payments save significant interest and reduce payoff time with minimal impact on cash flow (same total per month, just split into smaller, more frequent payments).",
    },
    {
      question: "Do I need a special program for bi-weekly payments?",
      answer:
        "Some lenders offer bi-weekly programs (may have fees). You can also make bi-weekly payments yourself by paying half your monthly payment every two weeks. Both methods work, but DIY avoids fees.",
    },
    {
      question: "What's the difference between bi-weekly and twice-monthly?",
      answer:
        "Bi-weekly = every 2 weeks (26 payments/year = 13 monthly payments). Twice-monthly = 1st and 15th (24 payments/year = 12 monthly payments, no savings). Only bi-weekly provides the extra payment benefit.",
    },
  ];

  const howToSteps = [
    {
      number: 1,
      title: "Enter Loan Amount",
      description:
        "Input your mortgage loan amount. This is the principal you're paying off.",
    },
    {
      number: 2,
      title: "Enter Interest Rate",
      description:
        "Enter your mortgage interest rate (APR). This affects both monthly and bi-weekly payment calculations.",
    },
    {
      number: 3,
      title: "Enter Loan Term",
      description:
        "Enter your loan term in years (typically 15 or 30 years). This is your current mortgage term.",
    },
    {
      number: 4,
      title: "Review Bi-Weekly Savings",
      description:
        "See your monthly vs. bi-weekly payments, interest savings, and time saved. Compare to decide if bi-weekly payments make sense for you.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Bi-Weekly Mortgage Calculator", url: "/tools/bi-weekly-mortgage-calculator" },
  ]);

  const calculatorSchema = generateCalculatorSchema(
    "Bi-Weekly Mortgage Calculator",
    "Free calculator to calculate savings from bi-weekly payments, see payoff time reduction, and compare bi-weekly vs. monthly payments.",
    "/tools/bi-weekly-mortgage-calculator",
    "Mortgage Calculator"
  );

  const faqSchema = generateFAQSchema(faqItems);
  const howToSchema = generateHowToSchema(
    howToSteps,
    "How to Use the Bi-Weekly Mortgage Calculator",
    "Step-by-step guide to calculating bi-weekly mortgage payment savings."
  );

  const relatedTools = [
    { name: "Mortgage Affordability Calculator", slug: "mortgage-affordability" },
    { name: "Refinance Calculator", slug: "refinance-calculator" },
    { name: "Loan Calculator", slug: "loan-calculator" },
    { name: "Debt Payoff Calculator", slug: "debt-payoff-calculator" },
  ];

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, calculatorSchema, faqSchema, howToSchema]} />
      <ExitIntentCTA />
      <ToolLayout>
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <header className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-white mb-3">Bi-Weekly Mortgage Calculator</h1>
              <p className="text-text-secondary-light">
                Calculate savings from bi-weekly payments and see payoff time reduction. Free and instant.
              </p>
            </header>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <NumberInput
                  label="Loan Amount"
                  value={loanAmount}
                  onChange={setLoanAmount}
                  min={0}
                  step={10000}
                  suffix="$"
                />
                <NumberInput
                  label="Interest Rate (APR)"
                  value={interestRate}
                  onChange={setInterestRate}
                  min={0}
                  step={0.1}
                  suffix="%"
                />
                <NumberInput
                  label="Loan Term (years)"
                  value={loanTerm}
                  onChange={setLoanTerm}
                  min={1}
                  max={30}
                  step={1}
                />
              </div>

              <div className="space-y-4">
                <ResultCard title="Bi-Weekly vs. Monthly">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Monthly Payment</span>
                      <span className="text-white">{toCurrency(calc.monthlyPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Bi-Weekly Payment</span>
                      <span className="text-white">{toCurrency(calc.biWeeklyPayment)}</span>
                    </div>
                    <div className="pt-3 border-t border-secondary/20">
                      <div className="flex justify-between mb-2">
                        <span className="text-text-secondary-light">Interest Savings</span>
                        <span className="text-2xl font-bold text-accent">{toCurrency(calc.savings)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary-light">Time Saved</span>
                        <span className="text-white">
                          {Math.floor(calc.timeSaved / 12)} years {Math.round(calc.timeSaved % 12)} months
                        </span>
                      </div>
                    </div>
                  </div>
                </ResultCard>

                <FAQ items={faqItems} />
              </div>
            </div>

            <div className="mt-12 max-w-4xl mx-auto">
              <ContentSection title="Introduction">
                <p>
                  Bi-weekly mortgage payments are a simple strategy to pay off your mortgage faster and save thousands
                  in interest. By making payments every two weeks instead of monthly, you effectively make one extra
                  payment per year, accelerating your payoff timeline.
                </p>
                <p>
                  This free bi-weekly mortgage calculator helps you see exactly how much you can save by switching to
                  bi-weekly payments. It shows interest savings, time reduction, and compares bi-weekly vs. monthly
                  payment strategies.
                </p>
                <p>
                  Use this tool to understand the benefits of bi-weekly payments and decide if this strategy makes
                  sense for your financial situation.
                </p>
              </ContentSection>

              <HowToSection
                title="How to Use the Bi-Weekly Mortgage Calculator"
                description="Follow these steps to calculate bi-weekly payment savings:"
                steps={howToSteps}
              />

              <ContentSection title="Understanding Bi-Weekly Payments">
                <p>
                  <strong>How It Works:</strong> Instead of 12 monthly payments, you make 26 bi-weekly payments (every
                  2 weeks). Since there are 52 weeks per year, 26 bi-weekly payments equal 13 monthly payments. This
                  extra payment accelerates payoff.
                </p>
                <p>
                  <strong>Savings:</strong> Bi-weekly payments can save $20,000-$50,000+ in interest on a typical
                  30-year mortgage and cut 4-7 years off the payoff timeline. Savings depend on loan amount, rate, and
                  term.
                </p>
                <p>
                  <strong>Cash Flow Impact:</strong> Bi-weekly payments have minimal impact on cash flow since you're
                  paying the same total per month, just split into smaller, more frequent payments. It's the same money,
                  paid differently.
                </p>
                <p>
                  <strong>Implementation:</strong> You can set up bi-weekly payments through your lender (may have fees)
                  or make them yourself by paying half your monthly payment every two weeks. Both methods work.
                </p>
              </ContentSection>

              <ContentSection title="Tips & Best Practices for Bi-Weekly Payments">
                <h3 className="font-semibold text-white mb-2">1. Start Early</h3>
                <p>
                  The earlier you start bi-weekly payments, the more interest you save. Starting from the beginning of
                  your mortgage maximizes savings. But it's never too late to start.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">2. Do It Yourself to Avoid Fees</h3>
                <p>
                  Some lenders charge fees for bi-weekly programs. You can make bi-weekly payments yourself by paying
                  half your monthly payment every two weeks. This achieves the same result without fees.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">3. Ensure Payments Are Applied Correctly</h3>
                <p>
                  When making bi-weekly payments, ensure your lender applies them correctly. Some may hold the first
                  payment until the second arrives. Confirm with your lender that payments are applied immediately.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">4. Consider Your Budget</h3>
                <p>
                  While bi-weekly payments have minimal cash flow impact, ensure you can consistently make payments
                  every two weeks. Set up automatic payments to ensure consistency.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">5. Compare to Other Strategies</h3>
                <p>
                  Bi-weekly payments are one way to accelerate payoff. Compare to making one extra monthly payment per
                  year or increasing monthly payment amount. Choose the strategy that fits your budget and goals.
                </p>
              </ContentSection>

              <div className="mt-8">
                <ShareButton
                  title="Bi-Weekly Mortgage Calculator - Free 2025 | Expenvisor"
                  url="/tools/bi-weekly-mortgage-calculator"
                  description="Calculate savings from bi-weekly payments and see payoff time reduction."
                />
              </div>

              <div className="mt-8 bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-2xl p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Related Financial Tools</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="p-4 bg-surface-dark rounded-xl hover:bg-surface-dark/80 transition-colors border border-accent/20 hover:border-accent/40"
                    >
                      <h4 className="font-semibold text-white mb-1">{tool.name}</h4>
                      <p className="text-sm text-text-secondary-light">Calculate related financial metrics</p>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-2xl border border-accent/30 text-center">
                <h3 className="text-2xl font-bold text-white mb-3">Track Your Mortgage with Expenvisor</h3>
                <p className="text-text-secondary-light mb-4">
                  Paying bi-weekly? Track all your expenses, mortgage payments, and financial progress with Expenvisor's
                  AI-powered expense tracker.
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

