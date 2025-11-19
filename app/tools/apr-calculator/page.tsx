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

export default function APRCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(20000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(5);
  const [fees, setFees] = useState(500);

  const calc = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12;
    const months = loanTerm * 12;
    const monthlyPayment = monthlyRate === 0 
      ? loanAmount / months 
      : (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    
    const totalPaid = monthlyPayment * months;
    const totalCost = totalPaid + fees;
    const effectiveAmount = loanAmount + fees;
    
    // Approximate APR calculation
    let apr = interestRate;
    if (fees > 0) {
      const feeRate = (fees / loanAmount) * 100;
      apr = interestRate + (feeRate / loanTerm);
    }
    
    return {
      monthlyPayment,
      totalPaid,
      totalCost,
      totalInterest: totalPaid - loanAmount,
      apr: Math.min(apr, 100),
      effectiveRate: apr,
    };
  }, [loanAmount, interestRate, loanTerm, fees]);

  const faqItems = [
    {
      question: "What is APR (Annual Percentage Rate)?",
      answer:
        "APR is the true cost of borrowing, expressed as a yearly percentage. It includes the interest rate plus any fees or costs associated with the loan. APR gives you a more accurate picture of the total cost than interest rate alone.",
    },
    {
      question: "What's the difference between APR and interest rate?",
      answer:
        "Interest rate is the cost of borrowing the principal amount. APR includes the interest rate plus additional fees (origination fees, closing costs, etc.). APR is typically higher than the interest rate and gives you the true cost of the loan.",
    },
    {
      question: "Why is APR important?",
      answer:
        "APR allows you to compare loans on an equal basis. Two loans with the same interest rate can have different APRs if one has higher fees. Always compare APRs when shopping for loans to see the true cost.",
    },
    {
      question: "What fees are included in APR?",
      answer:
        "APR typically includes: origination fees, closing costs, discount points, prepaid interest, and other finance charges. It does not include late fees, penalties, or optional services like credit insurance.",
    },
    {
      question: "Is a lower APR always better?",
      answer:
        "Generally yes, but consider the full picture. A loan with a slightly higher APR but lower fees might be better if you're paying off quickly. Also consider loan terms, prepayment penalties, and other factors beyond just APR.",
    },
    {
      question: "How do I calculate APR?",
      answer:
        "APR calculation is complex and involves the interest rate, fees, loan amount, and term. This calculator provides an approximation. For exact APR, lenders are required to disclose it in loan documents. The formula accounts for how fees increase the effective cost of borrowing.",
    },
  ];

  const howToSteps = [
    {
      number: 1,
      title: "Enter Loan Amount",
      description:
        "Input the total amount you're borrowing. This is the principal that you'll repay over the loan term.",
    },
    {
      number: 2,
      title: "Enter Interest Rate",
      description:
        "Enter the annual interest rate (not APR) as a percentage. This is the base rate before fees are added.",
    },
    {
      number: 3,
      title: "Enter Loan Term",
      description:
        "Specify the loan term in years. Common terms are 1-5 years for personal loans, 3-7 years for auto loans, 15-30 years for mortgages.",
    },
    {
      number: 4,
      title: "Enter Fees",
      description:
        "Input any upfront fees or costs: origination fees, closing costs, processing fees, etc. These are added to calculate the true APR.",
    },
    {
      number: 5,
      title: "Review APR and Costs",
      description:
        "See the calculated APR (true cost of borrowing), monthly payment, total amount paid, and total interest. Compare this APR when shopping for loans.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "APR Calculator", url: "/tools/apr-calculator" },
  ]);

  const calculatorSchema = generateCalculatorSchema(
    "APR Calculator",
    "Free calculator to calculate the true cost of borrowing, compare APR vs. interest rate, and understand loan costs.",
    "/tools/apr-calculator",
    "Loan Calculator"
  );

  const faqSchema = generateFAQSchema(faqItems);
  const howToSchema = generateHowToSchema(
    howToSteps,
    "How to Use the APR Calculator",
    "Step-by-step guide to calculating APR and understanding the true cost of borrowing."
  );

  const relatedTools = [
    { name: "Loan Calculator", slug: "loan-calculator" },
    { name: "Refinance Calculator", slug: "refinance-calculator" },
    { name: "Debt Payoff Calculator", slug: "debt-payoff-calculator" },
    { name: "Mortgage Affordability Calculator", slug: "mortgage-affordability" },
  ];

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, calculatorSchema, faqSchema, howToSchema]} />
      <ExitIntentCTA />
      <ToolLayout>
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <header className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-white mb-3">APR Calculator</h1>
              <p className="text-text-secondary-dark">
                Calculate the true cost of borrowing with APR. Compare APR vs. interest rate. Free and instant.
              </p>
            </header>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <NumberInput
                  label="Loan Amount"
                  value={loanAmount}
                  onChange={setLoanAmount}
                  min={0}
                  step={1000}
                  suffix="$"
                />
                <NumberInput
                  label="Interest Rate (Annual)"
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
                  min={0.5}
                  step={0.5}
                />
                <NumberInput
                  label="Fees & Costs"
                  value={fees}
                  onChange={setFees}
                  min={0}
                  step={100}
                  suffix="$"
                />
              </div>

              <div className="space-y-4">
                <ResultCard title="APR & Loan Costs">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-dark">APR (Annual Percentage Rate)</span>
                      <span className="text-2xl font-bold text-white">{calc.apr.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-dark">Monthly Payment</span>
                      <span className="text-white">{toCurrency(calc.monthlyPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-dark">Total Amount Paid</span>
                      <span className="text-white">{toCurrency(calc.totalPaid)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-dark">Total Interest</span>
                      <span className="text-white">{toCurrency(calc.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-dark">Total Cost (with fees)</span>
                      <span className="text-white">{toCurrency(calc.totalCost)}</span>
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
                  Understanding APR (Annual Percentage Rate) is crucial when borrowing money. While the interest rate
                  tells you the cost of borrowing, APR gives you the true cost by including fees and other charges. This
                  makes APR the most important number to compare when shopping for loans.
                </p>
                <p>
                  This free APR calculator helps you understand the true cost of borrowing by calculating APR from
                  interest rate and fees. It shows you how fees affect the effective cost of your loan, helping you make
                  informed borrowing decisions.
                </p>
                <p>
                  Whether you're comparing personal loans, credit cards, mortgages, or auto loans, always compare APRs
                  rather than just interest rates to see which loan truly costs less.
                </p>
              </ContentSection>

              <HowToSection
                title="How to Use the APR Calculator"
                description="Follow these steps to calculate APR and understand loan costs:"
                steps={howToSteps}
              />

              <ContentSection title="Understanding APR vs. Interest Rate">
                <p>
                  <strong>Interest Rate:</strong> The cost of borrowing the principal amount, expressed as a percentage.
                  This is the base rate before any fees are added.
                </p>
                <p>
                  <strong>APR (Annual Percentage Rate):</strong> The true cost of borrowing, including interest rate
                  plus fees and other costs. APR is always equal to or higher than the interest rate.
                </p>
                <p>
                  <strong>Example:</strong> A $20,000 loan at 6.5% interest with $500 in fees has an APR of
                  approximately 7.0%. The APR is higher because fees increase the effective cost of borrowing.
                </p>
                <p>
                  <strong>Why It Matters:</strong> Two loans with the same 6.5% interest rate can have different APRs
                  if one has higher fees. Always compare APRs to see the true cost difference.
                </p>
              </ContentSection>

              <ContentSection title="Tips & Best Practices for Comparing Loans">
                <h3 className="font-semibold text-white mb-2">1. Always Compare APRs</h3>
                <p>
                  When shopping for loans, compare APRs rather than just interest rates. APR includes all costs, giving
                  you an apples-to-apples comparison.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">2. Understand What's Included</h3>
                <p>
                  APR includes most upfront fees but not all costs. Late fees, prepayment penalties, and optional
                  services aren't included. Read the fine print.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">3. Consider Your Timeline</h3>
                <p>
                  If you're paying off quickly, a loan with higher fees but lower rate might have a better APR. If
                  you're keeping the loan long-term, focus on the lowest APR overall.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">4. Negotiate Fees</h3>
                <p>
                  Many loan fees are negotiable. Ask lenders to waive or reduce origination fees, processing fees, and
                  other charges to lower your APR.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">5. Watch for Prepayment Penalties</h3>
                <p>
                  Some loans charge penalties for early payoff. These aren't included in APR but can significantly
                  increase costs if you plan to pay off early.
                </p>
              </ContentSection>

              <div className="mt-8">
                <ShareButton
                  title="APR Calculator - Free 2025 | Expenvisor"
                  url="/tools/apr-calculator"
                  description="Calculate the true cost of borrowing with APR and compare loan options."
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
                <h3 className="text-2xl font-bold text-white mb-3">Track Your Loans with Expenvisor</h3>
                <p className="text-text-secondary-dark mb-4">
                  Comparing loans? Track all your expenses, loan payments, and financial progress with Expenvisor's
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

