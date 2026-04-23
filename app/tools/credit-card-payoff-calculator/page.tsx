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

export default function CreditCardPayoffCalculatorPage() {
  const [balance, setBalance] = useState(5000);
  const [interestRate, setInterestRate] = useState(18);
  const [minPayment, setMinPayment] = useState(150);
  const [extraPayment, setExtraPayment] = useState(0);

  const calculateMinPaymentMonths = useMemo(() => {
    return () => {
      let m = 0;
      let b = balance;
      const rate = interestRate / 100 / 12;
      
      while (b > 0.01 && m < 600) {
        m++;
        const interest = b * rate;
        b = b + interest - minPayment;
        if (b <= 0.01) b = 0;
      }
      return m;
    };
  }, [balance, interestRate, minPayment]);

  const calc = useMemo(() => {
    let months = 0;
    let totalInterest = 0;
    let workingBalance = balance;
    const monthlyPayment = minPayment + extraPayment;
    const monthlyRate = interestRate / 100 / 12;

    while (workingBalance > 0.01 && months < 600) {
      months++;
      const interest = workingBalance * monthlyRate;
      totalInterest += interest;
      workingBalance = workingBalance + interest;
      
      const payment = Math.min(workingBalance, monthlyPayment);
      workingBalance = Math.max(0, workingBalance - payment);
    }

    const minPaymentMonths = extraPayment === 0 ? months : calculateMinPaymentMonths();
    const savings = (minPaymentMonths - months) * minPayment;
    
    return {
      months,
      years: months / 12,
      totalInterest,
      totalPaid: balance + totalInterest,
      minPaymentMonths,
      savings,
    };
  }, [balance, interestRate, minPayment, extraPayment, calculateMinPaymentMonths]);

  const faqItems = [
    {
      question: "How long will it take to pay off my credit card?",
      answer:
        "Payoff time depends on balance, interest rate, and payment amount. Making only minimum payments can take decades. This calculator shows how extra payments dramatically reduce payoff time and interest costs.",
    },
    {
      question: "How much interest will I pay?",
      answer:
        "Interest depends on balance, rate, and payment amount. High balances with high rates and minimum payments result in thousands in interest. Even small extra payments save significant interest over time.",
    },
    {
      question: "Should I pay more than the minimum?",
      answer:
        "Absolutely! Minimum payments are designed to keep you in debt for years. Paying even $50-100 extra per month can save thousands in interest and cut years off your payoff timeline. Always pay as much extra as you can afford.",
    },
    {
      question: "What's the best strategy to pay off credit cards?",
      answer:
        "Two popular methods: (1) Avalanche—pay highest interest rate cards first (saves most money), (2) Snowball—pay smallest balances first (psychological wins). This calculator shows the impact of extra payments on a single card.",
    },
    {
      question: "Can I negotiate a lower interest rate?",
      answer:
        "Yes! Call your credit card company and ask for a lower rate. Mention competitor offers, your payment history, and threaten to transfer balance. Many will reduce rates to retain customers. Even 2-3% reduction saves significant interest.",
    },
    {
      question: "Should I use a balance transfer?",
      answer:
        "Balance transfers to 0% APR cards can save interest, but watch for transfer fees (typically 3-5%) and ensure you can pay off before the promotional rate expires. Only transfer if you're committed to paying off quickly.",
    },
  ];

  const howToSteps = [
    {
      number: 1,
      title: "Enter Credit Card Balance",
      description:
        "Input your current credit card balance. This is the amount you owe that you're paying off.",
    },
    {
      number: 2,
      title: "Enter Interest Rate",
      description:
        "Enter your credit card's annual interest rate (APR). This is typically 15-25% for most cards. Check your statement or online account for the exact rate.",
    },
    {
      number: 3,
      title: "Enter Minimum Payment",
      description:
        "Input your minimum monthly payment. This is usually 1-3% of balance or a fixed minimum (e.g., $25-35). Check your statement for the exact amount.",
    },
    {
      number: 4,
      title: "Enter Extra Payment (Optional)",
      description:
        "Enter any extra amount you can pay beyond the minimum. Even $50-100 extra per month dramatically reduces payoff time and interest costs.",
    },
    {
      number: 5,
      title: "Review Payoff Plan",
      description:
        "See how long it will take to pay off, total interest paid, and savings from extra payments. Use this to plan your payoff strategy.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Credit Card Payoff Calculator", url: "/tools/credit-card-payoff-calculator" },
  ]);

  const calculatorSchema = generateCalculatorSchema(
    "Credit Card Payoff Calculator",
    "Free calculator to calculate time to pay off credit card debt, minimum payment calculator, and see total interest paid.",
    "/tools/credit-card-payoff-calculator",
    "Debt Calculator"
  );

  const faqSchema = generateFAQSchema(faqItems);
  const howToSchema = generateHowToSchema(
    howToSteps,
    "How to Use the Credit Card Payoff Calculator",
    "Step-by-step guide to planning your credit card payoff strategy."
  );

  const relatedTools = [
    { name: "Debt Payoff Calculator", slug: "debt-payoff-calculator" },
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
              <h1 className="text-4xl font-bold text-white mb-3">Credit Card Payoff Calculator</h1>
              <p className="text-text-secondary-dark">
                Calculate time to pay off credit card debt and see total interest paid. Free and instant.
              </p>
            </header>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <NumberInput
                  label="Credit Card Balance"
                  value={balance}
                  onChange={setBalance}
                  min={0}
                  step={100}
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
                  label="Minimum Payment"
                  value={minPayment}
                  onChange={setMinPayment}
                  min={0}
                  step={10}
                  suffix="$"
                />
                <NumberInput
                  label="Extra Monthly Payment"
                  value={extraPayment}
                  onChange={setExtraPayment}
                  min={0}
                  step={25}
                  suffix="$"
                />
              </div>

              <div className="space-y-4">
                <ResultCard title="Payoff Plan">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-dark">Time to Pay Off</span>
                      <span className="text-2xl font-bold text-white">
                        {calc.years >= 1
                          ? `${Math.floor(calc.years)} years ${Math.round((calc.years % 1) * 12)} months`
                          : `${calc.months} months`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-dark">Total Interest Paid</span>
                      <span className="text-white">{toCurrency(calc.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-dark">Total Amount Paid</span>
                      <span className="text-white">{toCurrency(calc.totalPaid)}</span>
                    </div>
                    {extraPayment > 0 && (
                      <div className="pt-3 border-t border-secondary/20">
                        <div className="flex justify-between">
                          <span className="text-text-secondary-dark">Interest Savings</span>
                          <span className="text-accent font-semibold">{toCurrency(calc.savings)}</span>
                        </div>
                      </div>
                    )}
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
                  Credit card debt can feel overwhelming, especially when you're only making minimum payments. High
                  interest rates mean most of your payment goes toward interest, not reducing the balance, keeping you
                  in debt for years or even decades.
                </p>
                <p>
                  This free credit card payoff calculator helps you understand the true cost of credit card debt and
                  see how extra payments dramatically reduce payoff time and interest costs. It shows you exactly how
                  long it will take to become debt-free and how much interest you'll pay along the way.
                </p>
                <p>
                  Use this tool to plan your payoff strategy, see the impact of extra payments, and motivate yourself
                  to pay off credit card debt faster.
                </p>
              </ContentSection>

              <HowToSection
                title="How to Use the Credit Card Payoff Calculator"
                description="Follow these steps to plan your credit card payoff:"
                steps={howToSteps}
              />

              <ContentSection title="Understanding Credit Card Payoff">
                <p>
                  <strong>Minimum Payments:</strong> Credit card minimum payments are typically 1-3% of balance or a
                  fixed minimum ($25-35). These are designed to keep you in debt for years, maximizing interest
                  payments. Making only minimum payments can take 10-20+ years to pay off.
                </p>
                <p>
                  <strong>Interest Costs:</strong> High interest rates (15-25% APR) mean significant interest costs.
                  On a $5,000 balance at 18% APR with minimum payments, you could pay $3,000+ in interest over 10+
                  years. Extra payments save thousands.
                </p>
                <p>
                  <strong>Extra Payments:</strong> Even small extra payments ($50-100/month) dramatically reduce payoff
                  time and interest costs. The earlier you pay, the more interest you save due to compound interest
                  working against you.
                </p>
                <p>
                  <strong>Payoff Strategies:</strong> Focus on paying off high-interest credit cards first (Avalanche
                  method) to save the most money. Or pay off smallest balances first (Snowball method) for
                  psychological wins and motivation.
                </p>
              </ContentSection>

              <ContentSection title="Tips & Best Practices for Paying Off Credit Cards">
                <h3 className="font-semibold text-white mb-2">1. Pay More Than Minimum</h3>
                <p>
                  Always pay more than the minimum if possible. Even $50-100 extra per month can save thousands in
                  interest and cut years off your payoff timeline. This calculator shows the dramatic impact.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">2. Stop Using Credit Cards</h3>
                <p>
                  While paying off debt, stop using credit cards for new purchases. Cut them up or freeze them if
                  necessary. You can't get out of debt while continuing to accumulate it.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">3. Negotiate Lower Interest Rate</h3>
                <p>
                  Call your credit card company and ask for a lower rate. Mention competitor offers and your payment
                  history. Many will reduce rates to retain customers. Even 2-3% reduction saves significant interest.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">4. Consider Balance Transfer</h3>
                <p>
                  Transfer high-interest balances to 0% APR cards (watch for transfer fees). This can save interest,
                  but only if you can pay off before the promotional rate expires. Don't use this as an excuse to
                  accumulate more debt.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">5. Pay Off Highest Rate First</h3>
                <p>
                  If you have multiple cards, focus extra payments on the highest interest rate card first (Avalanche
                  method). This saves the most money in interest over time.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">6. Automate Payments</h3>
                <p>
                  Set up automatic payments for at least the minimum to avoid late fees and credit damage. Then make
                  additional manual payments when you have extra money.
                </p>
              </ContentSection>

              <div className="mt-8">
                <ShareButton
                  title="Credit Card Payoff Calculator - Free 2025 | Expenvisor"
                  url="/tools/credit-card-payoff-calculator"
                  description="Calculate time to pay off credit card debt and see total interest paid."
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
                <h3 className="text-2xl font-bold text-white mb-3">Track Your Debt Payoff with Expenvisor</h3>
                <p className="text-text-secondary-dark mb-4">
                  Paying off credit cards? Track all your expenses, payments, and financial progress with Expenvisor's
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

