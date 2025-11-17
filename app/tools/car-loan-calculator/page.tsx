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

export default function CarLoanCalculatorPage() {
  const [carPrice, setCarPrice] = useState(30000);
  const [downPayment, setDownPayment] = useState(5000);
  const [tradeInValue, setTradeInValue] = useState(0);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(5);

  const calc = useMemo(() => {
    const loanAmount = carPrice - downPayment - tradeInValue;
    const monthlyPayment = calculatePayment(loanAmount, interestRate, loanTerm);
    const totalPaid = monthlyPayment * (loanTerm * 12);
    const totalInterest = totalPaid - loanAmount;
    
    return {
      loanAmount,
      monthlyPayment,
      totalPaid,
      totalInterest,
    };
  }, [carPrice, downPayment, tradeInValue, interestRate, loanTerm]);

  const faqItems = [
    {
      question: "How do I calculate car loan payments?",
      answer:
        "Car loan payments depend on loan amount (car price minus down payment and trade-in), interest rate, and loan term. This calculator uses standard amortization formulas to calculate monthly payments and total costs.",
    },
    {
      question: "What's a good interest rate for a car loan?",
      answer:
        "Interest rates vary by credit score: Excellent (720+) 3-5%, Good (690-719) 5-7%, Fair (630-689) 7-10%, Poor (<630) 10%+. Shop multiple lenders for the best rate. Rates also depend on loan term and vehicle age.",
    },
    {
      question: "Should I put money down on a car?",
      answer:
        "Yes, down payments reduce loan amount, monthly payments, and interest costs. Aim for 10-20% down minimum. Larger down payments save more interest and reduce risk of being underwater (owing more than car value).",
    },
    {
      question: "What loan term should I choose?",
      answer:
        "Shorter terms (3-4 years) have higher monthly payments but save interest and build equity faster. Longer terms (5-7 years) have lower payments but cost more interest. Avoid terms longer than the car's useful life.",
    },
    {
      question: "Should I finance through dealer or bank?",
      answer:
        "Compare both options. Dealers may offer promotional rates but often have higher rates. Get pre-approved from your bank/credit union first, then compare to dealer financing. Choose the lowest rate.",
    },
    {
      question: "What if I'm underwater on my car loan?",
      answer:
        "Being underwater means you owe more than the car is worth. This happens with long loan terms, low down payments, or rapid depreciation. Avoid this by putting more down, choosing shorter terms, or buying used cars that depreciate slower.",
    },
  ];

  const howToSteps = [
    {
      number: 1,
      title: "Enter Car Price",
      description:
        "Input the total purchase price of the car, including taxes and fees. This is the amount you're financing.",
    },
    {
      number: 2,
      title: "Enter Down Payment",
      description:
        "Enter your down payment amount. Larger down payments reduce loan amount, monthly payments, and interest costs. Aim for 10-20% minimum.",
    },
    {
      number: 3,
      title: "Enter Trade-In Value (Optional)",
      description:
        "If trading in a vehicle, enter its value. This reduces the loan amount along with your down payment.",
    },
    {
      number: 4,
      title: "Set Loan Terms",
      description:
        "Enter interest rate and loan term (years). Shop multiple lenders for the best rate. Shorter terms save interest but have higher payments.",
    },
    {
      number: 5,
      title: "Review Loan Details",
      description:
        "See your monthly payment, total amount paid, and total interest. Use this to compare loan options and make informed decisions.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Car Loan Calculator", url: "/tools/car-loan-calculator" },
  ]);

  const calculatorSchema = generateCalculatorSchema(
    "Car Loan Calculator",
    "Free calculator to calculate auto loan payments, total interest, and view amortization schedule. Compare car loan options.",
    "/tools/car-loan-calculator",
    "Auto Loan Calculator"
  );

  const faqSchema = generateFAQSchema(faqItems);
  const howToSchema = generateHowToSchema(
    howToSteps,
    "How to Use the Car Loan Calculator",
    "Step-by-step guide to calculating car loan payments and costs."
  );

  const relatedTools = [
    { name: "Loan Calculator", slug: "loan-calculator" },
    { name: "Debt-to-Income Ratio Calculator", slug: "debt-to-income-calculator" },
    { name: "Budget Planner", slug: "budget-planner" },
    { name: "APR Calculator", slug: "apr-calculator" },
  ];

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, calculatorSchema, faqSchema, howToSchema]} />
      <ExitIntentCTA />
      <ToolLayout>
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <header className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-white mb-3">Car Loan Calculator</h1>
              <p className="text-text-secondary-light">
                Calculate auto loan payments, total interest, and compare loan options. Free and instant.
              </p>
            </header>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <NumberInput
                  label="Car Price"
                  value={carPrice}
                  onChange={setCarPrice}
                  min={0}
                  step={1000}
                  suffix="$"
                />
                <NumberInput
                  label="Down Payment"
                  value={downPayment}
                  onChange={setDownPayment}
                  min={0}
                  step={500}
                  suffix="$"
                />
                <NumberInput
                  label="Trade-In Value"
                  value={tradeInValue}
                  onChange={setTradeInValue}
                  min={0}
                  step={500}
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
                  max={7}
                  step={1}
                />
              </div>

              <div className="space-y-4">
                <ResultCard title="Loan Summary">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-light">Loan Amount</span>
                      <span className="text-xl font-bold text-white">{toCurrency(calc.loanAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-light">Monthly Payment</span>
                      <span className="text-2xl font-bold text-white">{toCurrency(calc.monthlyPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Total Amount Paid</span>
                      <span className="text-white">{toCurrency(calc.totalPaid)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Total Interest</span>
                      <span className="text-white">{toCurrency(calc.totalInterest)}</span>
                    </div>
                  </div>
                </ResultCard>

                <FAQ items={faqItems} />
              </div>
            </div>

            <div className="mt-12 max-w-4xl mx-auto">
              <ContentSection title="Introduction">
                <p>
                  Buying a car is one of the largest purchases most people make, and financing adds complexity to the
                  decision. Understanding your car loan payments, total interest costs, and how different loan terms
                  affect your budget is essential for making informed decisions.
                </p>
                <p>
                  This free car loan calculator helps you calculate monthly payments, total interest, and compare
                  different loan scenarios. It accounts for down payments, trade-in values, interest rates, and loan
                  terms to give you a complete picture of your auto loan costs.
                </p>
                <p>
                  Use this tool to compare loan options, understand the true cost of financing, and ensure your car
                  loan fits within your budget.
                </p>
              </ContentSection>

              <HowToSection
                title="How to Use the Car Loan Calculator"
                description="Follow these steps to calculate your car loan:"
                steps={howToSteps}
              />

              <ContentSection title="Understanding Car Loans">
                <p>
                  <strong>Loan Amount:</strong> The amount you're borrowing (car price minus down payment and trade-in).
                  This is what you'll pay interest on. Larger down payments reduce loan amount and interest costs.
                </p>
                <p>
                  <strong>Interest Rates:</strong> Car loan rates vary by credit score, loan term, and lender. Excellent
                  credit (720+) can get 3-5%, while poor credit (under 630) may pay 10%+. Shop multiple lenders for the best
                  rate.
                </p>
                <p>
                  <strong>Loan Terms:</strong> Common terms are 3-7 years. Shorter terms (3-4 years) have higher
                  payments but save interest. Longer terms (5-7 years) have lower payments but cost more interest and
                  increase risk of being underwater.
                </p>
                <p>
                  <strong>Total Cost:</strong> Don't just focus on monthly payment. Consider total interest paid over
                  the loan term. A lower monthly payment with a longer term may cost thousands more in interest.
                </p>
              </ContentSection>

              <ContentSection title="Tips & Best Practices for Car Loans">
                <h3 className="font-semibold text-white mb-2">1. Put Down 10-20% Minimum</h3>
                <p>
                  Larger down payments reduce loan amount, monthly payments, and interest costs. They also reduce risk
                  of being underwater (owing more than car value). Aim for 10-20% down, more if possible.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">2. Shop Multiple Lenders</h3>
                <p>
                  Get pre-approved from your bank or credit union, then compare to dealer financing. Don't assume
                  dealer financing is best. Compare rates, terms, and total costs to find the best deal.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">3. Choose Shorter Terms When Possible</h3>
                <p>
                  Shorter loan terms (3-4 years) save interest and build equity faster. Only choose longer terms if you
                  truly can't afford higher payments. Avoid terms longer than the car's useful life.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">4. Improve Credit Before Buying</h3>
                <p>
                  Better credit scores get better rates. If your credit is poor, work on improving it before buying.
                  Even a 50-point improvement can save thousands in interest over the loan term.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">5. Consider Total Cost, Not Just Payment</h3>
                <p>
                  Don't just focus on monthly payment. A longer term with lower payment may cost thousands more in
                  interest. Use this calculator to see total cost and make informed decisions.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">6. Avoid Being Underwater</h3>
                <p>
                  Being underwater means you owe more than the car is worth. This happens with long terms, low down
                  payments, or rapid depreciation. Avoid by putting more down, choosing shorter terms, or buying used
                  cars.
                </p>
              </ContentSection>

              <div className="mt-8">
                <ShareButton
                  title="Car Loan Calculator - Free 2025 | Expenvisor"
                  url="/tools/car-loan-calculator"
                  description="Calculate auto loan payments, total interest, and compare car loan options."
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
                <h3 className="text-2xl font-bold text-white mb-3">Track Your Car Expenses with Expenvisor</h3>
                <p className="text-text-secondary-light mb-4">
                  Financing a car? Track all your expenses, loan payments, and financial progress with Expenvisor's
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

