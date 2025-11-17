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

export default function MortgageAffordabilityPage() {
  const [annualIncome, setAnnualIncome] = useState(75000);
  const [monthlyDebt, setMonthlyDebt] = useState(500);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [termYears, setTermYears] = useState(30);
  const [maxDTI, setMaxDTI] = useState(36);

  const calc = useMemo(() => {
    const monthlyIncome = annualIncome / 12;
    const maxMonthlyPayment = (monthlyIncome * maxDTI) / 100 - monthlyDebt;
    const monthlyRate = interestRate / 100 / 12;
    const months = termYears * 12;
    const downPercent = downPaymentPercent / 100;

    if (maxMonthlyPayment <= 0 || monthlyRate <= 0 || months <= 0) {
      return { affordablePrice: 0, downPayment: 0, monthlyPayment: 0, totalInterest: 0 };
    }

    const affordableLoanAmount = (maxMonthlyPayment * (1 - Math.pow(1 + monthlyRate, -months))) / monthlyRate;
    const affordablePrice = affordableLoanAmount / (1 - downPercent);
    const downPayment = affordablePrice * downPercent;
    const totalInterest = maxMonthlyPayment * months - affordableLoanAmount;

    return {
      affordablePrice: Math.max(0, affordablePrice),
      downPayment: Math.max(0, downPayment),
      monthlyPayment: maxMonthlyPayment,
      totalInterest,
    };
  }, [annualIncome, monthlyDebt, downPaymentPercent, interestRate, termYears, maxDTI]);

  const faqItems = [
    {
      question: "What is debt-to-income (DTI) ratio?",
      answer:
        "DTI ratio is the percentage of your monthly gross income that goes toward paying debts, including your new mortgage payment. Lenders use this to assess your ability to manage monthly payments. Most conventional lenders prefer a DTI ratio of 36% or less, though some may accept up to 43%.",
    },
    {
      question: "How much house can I afford?",
      answer:
        "The amount you can afford depends on your annual income, existing monthly debt payments, down payment percentage, interest rate, and loan term. This calculator uses your DTI ratio to determine the maximum monthly mortgage payment you can handle, then calculates the corresponding home price.",
    },
    {
      question: "What down payment percentage should I use?",
      answer:
        "A 20% down payment is traditional and helps you avoid private mortgage insurance (PMI). However, many loans accept lower down payments (3-10%), especially for first-time homebuyers. Use this calculator to see how different down payment amounts affect your affordable home price.",
    },
    {
      question: "Are property taxes and insurance included?",
      answer:
        "No, this calculator shows principal and interest only. Your actual monthly payment will also include property taxes, homeowners insurance, and possibly PMI and HOA fees. These can add 20-30% to your monthly payment, so factor them into your budget.",
    },
    {
      question: "What's a good DTI ratio for mortgage approval?",
      answer:
        "Most lenders prefer a DTI ratio of 36% or less for conventional loans. FHA loans may accept up to 43%, and some programs allow up to 50%. However, a lower DTI ratio improves your chances of approval and may qualify you for better interest rates.",
    },
    {
      question: "How does my credit score affect affordability?",
      answer:
        "Your credit score directly impacts the interest rate you'll receive. A higher credit score means a lower interest rate, which increases the home price you can afford. This calculator uses the interest rate you provide, so adjust it based on your expected credit score.",
    },
    {
      question: "Should I include all my debts in monthly debt payments?",
      answer:
        "Yes, include all recurring monthly debt obligations: credit card minimum payments, car loans, student loans, personal loans, and any other debts. Don't include utilities, groceries, or other living expenses—only actual debt payments.",
    },
    {
      question: "Can I afford more if I have a larger down payment?",
      answer:
        "Yes! A larger down payment reduces your loan amount, which can lower your monthly payment and allow you to afford a more expensive home. However, make sure you still have enough left for closing costs, moving expenses, and an emergency fund.",
    },
    {
      question: "What if my DTI is too high?",
      answer:
        "If your DTI is too high, consider: (1) Paying down existing debts, (2) Increasing your down payment, (3) Looking for a less expensive home, (4) Improving your credit score to get a better rate, or (5) Waiting until your income increases or debts decrease.",
    },
    {
      question: "How accurate is this calculator?",
      answer:
        "This calculator provides a good estimate based on standard lending formulas. However, actual affordability depends on many factors including credit score, employment history, assets, and lender-specific requirements. Always consult with a mortgage professional for accurate pre-approval.",
    },
    {
      question: "What's the difference between front-end and back-end DTI?",
      answer:
        "Front-end DTI includes only housing costs (mortgage, taxes, insurance). Back-end DTI includes all debts. Most lenders focus on back-end DTI, which is what this calculator uses. The 36% guideline typically refers to back-end DTI.",
    },
    {
      question: "Should I use gross or net income?",
      answer:
        "Lenders use gross (before-tax) income for DTI calculations, which is what this calculator uses. This gives you a more conservative estimate. If you want to see what you can afford based on take-home pay, you can adjust the income figure accordingly.",
    },
  ];

  const howToSteps = [
    {
      number: 1,
      title: "Enter Your Annual Income",
      description:
        "Input your gross annual income (before taxes). Include all sources of income if you're applying jointly with a spouse or partner.",
    },
    {
      number: 2,
      title: "Enter Monthly Debt Payments",
      description:
        "Add up all your monthly debt obligations: credit cards, car loans, student loans, personal loans, and any other recurring debt payments.",
    },
    {
      number: 3,
      title: "Set Your Down Payment Percentage",
      description:
        "Enter the percentage of the home price you plan to put down. Common amounts are 3%, 5%, 10%, or 20%. A 20% down payment avoids PMI.",
    },
    {
      number: 4,
      title: "Enter Interest Rate and Term",
      description:
        "Input the expected mortgage interest rate (APR) and loan term (typically 15 or 30 years). Use current market rates or your expected rate based on your credit score.",
    },
    {
      number: 5,
      title: "Set Maximum DTI Ratio",
      description:
        "Choose your maximum DTI ratio. Most lenders prefer 36% or less. You can adjust this to see how different DTI thresholds affect affordability.",
    },
    {
      number: 6,
      title: "Review Your Results",
      description:
        "The calculator shows your affordable home price, required down payment, loan amount, estimated monthly payment, and total interest. Remember to add taxes, insurance, and other costs.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Mortgage Affordability Calculator", url: "/tools/mortgage-affordability" },
  ]);

  const calculatorSchema = generateCalculatorSchema(
    "Mortgage Affordability Calculator",
    "Free calculator to estimate how much home you can afford based on income, debt-to-income ratio, and down payment.",
    "/tools/mortgage-affordability",
    "Mortgage Calculator"
  );

  const faqSchema = generateFAQSchema(faqItems);
  const howToSchema = generateHowToSchema(
    howToSteps,
    "How to Use the Mortgage Affordability Calculator",
    "Step-by-step guide to calculating how much home you can afford."
  );

  const relatedTools = [
    { name: "Loan Calculator", slug: "loan-calculator" },
    { name: "Refinance Calculator", slug: "refinance-calculator" },
    { name: "Debt-to-Income Ratio Calculator", slug: "debt-to-income-calculator" },
    { name: "Budget Planner", slug: "budget-planner" },
  ];

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, calculatorSchema, faqSchema, howToSchema]} />
      <ExitIntentCTA />
    <ToolLayout>
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-white mb-3">Mortgage Affordability Calculator</h1>
              <p className="text-text-secondary-light">
                Estimate how much home you can afford based on income, DTI ratio, and down payment. Free and instant.
              </p>
          </header>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <NumberInput
                label="Annual Income"
                value={annualIncome}
                onChange={setAnnualIncome}
                min={0}
                step={1000}
                suffix="$"
              />
              <NumberInput
                label="Monthly Debt Payments"
                value={monthlyDebt}
                onChange={setMonthlyDebt}
                min={0}
                step={50}
                suffix="$"
              />
              <NumberInput
                label="Down Payment (%)"
                value={downPaymentPercent}
                onChange={setDownPaymentPercent}
                min={0}
                max={100}
                step={1}
                suffix="%"
              />
              <NumberInput
                label="Interest Rate (APR)"
                value={interestRate}
                onChange={setInterestRate}
                min={0}
                step={0.1}
                suffix="%"
              />
              <NumberInput label="Loan Term (years)" value={termYears} onChange={setTermYears} min={5} step={5} />
              <NumberInput
                label="Max DTI Ratio (%)"
                value={maxDTI}
                onChange={setMaxDTI}
                min={20}
                max={50}
                step={1}
                suffix="%"
              />
            </div>

            <div className="space-y-4">
              <ResultCard title="Affordability Estimate">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary-light">Affordable Home Price</span>
                    <span className="text-2xl font-bold text-white">{toCurrency(calc.affordablePrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary-light">Down Payment</span>
                    <span className="text-white">{toCurrency(calc.downPayment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary-light">Loan Amount</span>
                    <span className="text-white">
                      {toCurrency(calc.affordablePrice - calc.downPayment)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary-light">Estimated Monthly Payment</span>
                    <span className="text-white">{toCurrency(calc.monthlyPayment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary-light">Total Interest (estimated)</span>
                    <span className="text-white">{toCurrency(calc.totalInterest)}</span>
                  </div>
                </div>
              </ResultCard>

            <p className="text-xs text-text-secondary-light mt-4">
                Disclaimer: Results are estimates for educational purposes only. Actual affordability may vary based on
                credit score, property taxes, insurance, and lender requirements.
            </p>
          </div>
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <FAQ items={faqItems} />
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <ContentSection title="Introduction">
            <p>
              Buying a home is one of the biggest financial decisions you'll make, and understanding how much you can
              actually afford is crucial before you start house hunting. The mortgage affordability calculator helps you
              determine your maximum home price based on your income, existing debts, and down payment.
            </p>
            <p>
              This calculator uses your debt-to-income (DTI) ratio, which is a key metric lenders use to evaluate your
              loan application. By calculating your affordable home price upfront, you can set realistic expectations,
              avoid overextending yourself, and make informed decisions about your home purchase.
            </p>
            <p>
              Whether you're a first-time homebuyer or looking to upgrade, this free tool provides instant estimates
              with no sign-up required, helping you plan your home purchase with confidence.
            </p>
          </ContentSection>

          <HowToSection
            title="How to Use the Mortgage Affordability Calculator"
            description="Follow these steps to determine how much home you can afford:"
            steps={howToSteps}
          />

          <ContentSection title="Understanding Debt-to-Income (DTI) Ratio">
            <p>
              Your debt-to-income ratio is calculated by dividing your total monthly debt payments (including your new
              mortgage) by your gross monthly income, then multiplying by 100 to get a percentage.
            </p>
            <div className="bg-surface-dark rounded-lg p-4 my-4">
              <p className="text-white mb-2 font-mono text-sm">
                DTI Ratio = (Total Monthly Debt Payments ÷ Gross Monthly Income) × 100
              </p>
            </div>
            <p>
              <strong>Front-end DTI</strong> includes only housing costs (mortgage, taxes, insurance).{" "}
              <strong>Back-end DTI</strong> includes all debts. Most lenders focus on back-end DTI, which is what this
              calculator uses.
            </p>
            <p>
              <strong>DTI Guidelines:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>36% or less: Excellent - Most lenders prefer this</li>
              <li>37-43%: Acceptable - May qualify but with stricter requirements</li>
              <li>44-50%: Risky - Limited loan options, higher rates</li>
              <li>Above 50%: Very difficult to qualify</li>
            </ul>
          </ContentSection>

          <ContentSection title="Tips & Best Practices for Home Buying">
            <h3 className="font-semibold text-white mb-2">1. Don't Max Out Your Budget</h3>
            <p>
              Just because you can afford a certain price doesn't mean you should. Leave room in your budget for home
              maintenance, repairs, property taxes, insurance, and unexpected expenses. Aim for a payment that's
              comfortable, not maximum.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">2. Factor in All Homeownership Costs</h3>
            <p>
              Beyond your mortgage payment, budget for property taxes (typically 1-2% of home value annually),
              homeowners insurance, PMI (if down payment is less than 20%), HOA fees, maintenance (1% of home value per
              year), and utilities.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">3. Improve Your DTI Before Buying</h3>
            <p>
              Pay down existing debts to lower your DTI ratio. This not only increases your affordable home price but
              also improves your chances of loan approval and may qualify you for better interest rates.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">4. Save for a Larger Down Payment</h3>
            <p>
              A larger down payment reduces your loan amount, lowers monthly payments, and may eliminate PMI. It also
              gives you more equity in your home from day one and can help you afford a more expensive home.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">5. Get Pre-Approved</h3>
            <p>
              Use this calculator as a starting point, but get pre-approved by a lender for accurate numbers. They'll
              consider your credit score, employment history, assets, and other factors to give you a precise
              affordability estimate.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">6. Consider Your Long-Term Plans</h3>
            <p>
              Think about how long you plan to stay in the home. If it's short-term, a lower down payment might be
              acceptable. For long-term ownership, a larger down payment and lower monthly payment provide more
              financial security.
            </p>
          </ContentSection>

          <div className="mt-8">
            <ShareButton
              title="Mortgage Affordability Calculator - Free 2025 | Expenvisor"
              url="/tools/mortgage-affordability"
              description="Calculate how much home you can afford based on income, DTI ratio, and down payment."
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
            <h3 className="text-2xl font-bold text-white mb-3">Track Your Home Buying Journey with Expenvisor</h3>
            <p className="text-text-secondary-light mb-4">
              Planning to buy a home? Track all your expenses, savings goals, and financial progress with Expenvisor's
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

