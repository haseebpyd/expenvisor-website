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

const TAX_BRACKETS_2024 = [
  { min: 0, max: 11000, rate: 0.1 },
  { min: 11000, max: 44725, rate: 0.12 },
  { min: 44725, max: 95375, rate: 0.22 },
  { min: 95375, max: 201050, rate: 0.24 },
  { min: 201050, max: 383900, rate: 0.32 },
  { min: 383900, max: 487450, rate: 0.35 },
  { min: 487450, max: Infinity, rate: 0.37 },
];

const STANDARD_DEDUCTION_SINGLE = 14600;
const STANDARD_DEDUCTION_MARRIED = 29200;

export default function IncomeTaxCalculatorPage() {
  const [annualIncome, setAnnualIncome] = useState(75000);
  const [filingStatus, setFilingStatus] = useState<"single" | "married">("single");
  const [standardDeduction, setStandardDeduction] = useState(STANDARD_DEDUCTION_SINGLE);

  const calc = useMemo(() => {
    const taxableIncome = Math.max(0, annualIncome - standardDeduction);
    let tax = 0;
    const breakdown: { bracket: string; amount: number; tax: number }[] = [];

    for (const bracket of TAX_BRACKETS_2024) {
      if (taxableIncome <= bracket.min) break;

      const taxableInBracket = Math.min(taxableIncome - bracket.min, bracket.max - bracket.min);
      const bracketTax = taxableInBracket * bracket.rate;
      tax += bracketTax;

      if (taxableInBracket > 0) {
        breakdown.push({
          bracket: `${bracket.rate * 100}% (${toCurrency(bracket.min)} - ${bracket.max === Infinity ? "∞" : toCurrency(bracket.max)})`,
          amount: taxableInBracket,
          tax: bracketTax,
        });
      }
    }

    const effectiveRate = annualIncome > 0 ? (tax / annualIncome) * 100 : 0;
    const marginalRate = TAX_BRACKETS_2024.find((b) => taxableIncome >= b.min && taxableIncome < b.max)?.rate ?? 0;

    return {
      taxableIncome,
      tax,
      afterTax: annualIncome - tax,
      effectiveRate,
      marginalRate: marginalRate * 100,
      breakdown,
    };
  }, [annualIncome, standardDeduction]);

  const faqItems = [
    {
      question: "How are federal income taxes calculated?",
      answer:
        "Federal income tax uses a progressive tax system with brackets. Your income is taxed at different rates as it increases. The first portion is taxed at the lowest rate (10%), and as your income increases, higher portions are taxed at progressively higher rates up to 37%.",
    },
    {
      question: "What's the difference between effective and marginal tax rate?",
      answer:
        "Effective tax rate is your total tax divided by total income—the average rate you pay overall. Marginal tax rate is the rate on your last dollar of income—the rate you'd pay on additional income. Effective rate is always lower than marginal rate due to progressive brackets.",
    },
    {
      question: "What is the standard deduction?",
      answer:
        "The standard deduction is a fixed amount that reduces your taxable income. For 2024, it's $14,600 for single filers and $29,200 for married filing jointly. You can either take the standard deduction or itemize deductions (whichever is higher).",
    },
    {
      question: "Should I use standard or itemized deductions?",
      answer:
        "Use whichever is higher. Most taxpayers use the standard deduction because it's simpler and often higher. Itemize if your deductions (mortgage interest, state/local taxes, charitable contributions, medical expenses) exceed the standard deduction.",
    },
    {
      question: "What tax brackets are used for 2024?",
      answer:
        "2024 federal tax brackets: 10% ($0-$11,000), 12% ($11,001-$44,725), 22% ($44,726-$95,375), 24% ($95,376-$201,050), 32% ($201,051-$383,900), 35% ($383,901-$487,450), 37% (over $487,450). These apply to taxable income after deductions.",
    },
    {
      question: "Does this calculator include state taxes?",
      answer:
        "No, this calculator only estimates federal income tax. State and local taxes vary by location and are calculated separately. Some states have no income tax, while others have rates up to 13%.",
    },
    {
      question: "What about FICA taxes (Social Security and Medicare)?",
      answer:
        "This calculator doesn't include FICA taxes. Social Security tax is 6.2% on income up to $168,600 (2024), and Medicare tax is 1.45% on all income. These are separate from income tax and are withheld from your paycheck.",
    },
    {
      question: "How do tax brackets work?",
      answer:
        "Tax brackets are progressive—you don't pay the same rate on all income. For example, if you're in the 22% bracket, you pay 10% on the first $11,000, 12% on income from $11,001-$44,725, and 22% only on income above $44,725. This is why your effective rate is lower than your marginal rate.",
    },
    {
      question: "Can I reduce my taxable income?",
      answer:
        "Yes! Common ways to reduce taxable income: contribute to 401(k) or IRA (pre-tax), HSA contributions, student loan interest deduction, traditional IRA contributions, and business expenses (if self-employed). This calculator uses standard deduction only.",
    },
    {
      question: "What if I'm self-employed?",
      answer:
        "Self-employed individuals pay both employee and employer portions of FICA (15.3% total), plus income tax. This calculator only shows income tax. Self-employed people can deduct business expenses, which significantly reduces taxable income.",
    },
    {
      question: "How accurate is this calculator?",
      answer:
        "This calculator provides a good estimate using 2024 tax brackets and standard deduction. However, actual taxes depend on many factors: itemized deductions, credits, other income sources, and tax law changes. Consult a tax professional for accurate calculations.",
    },
    {
      question: "When should I consult a tax professional?",
      answer:
        "Consult a tax professional if you: have complex income sources, own a business, have significant deductions, are planning major financial moves, need tax planning strategies, or want to maximize deductions and credits. This calculator is for basic estimates only.",
    },
  ];

  const howToSteps = [
    {
      number: 1,
      title: "Enter Your Annual Income",
      description:
        "Input your total annual gross income (before taxes). Include all income sources: salary, wages, interest, dividends, rental income, and any other taxable income.",
    },
    {
      number: 2,
      title: "Select Filing Status",
      description:
        "Choose your filing status: Single or Married Filing Jointly. This determines which tax brackets and standard deduction apply. The calculator automatically adjusts the standard deduction based on your selection.",
    },
    {
      number: 3,
      title: "Review Standard Deduction",
      description:
        "The calculator shows the standard deduction for your filing status ($14,600 for single, $29,200 for married). You can adjust this if you plan to itemize deductions instead.",
    },
    {
      number: 4,
      title: "View Your Tax Estimate",
      description:
        "See your taxable income (after deduction), estimated federal tax, after-tax income, effective tax rate, marginal tax rate, and a breakdown showing how much tax you pay in each bracket.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Income Tax Calculator", url: "/tools/income-tax-calculator" },
  ]);

  const calculatorSchema = generateCalculatorSchema(
    "Income Tax Calculator",
    "Free calculator to estimate your federal income tax using 2024 tax brackets with standard deduction.",
    "/tools/income-tax-calculator",
    "Tax Calculator"
  );

  const faqSchema = generateFAQSchema(faqItems);
  const howToSchema = generateHowToSchema(
    howToSteps,
    "How to Use the Income Tax Calculator",
    "Step-by-step guide to estimating your federal income tax."
  );

  const relatedTools = [
    { name: "Budget Planner", slug: "budget-planner" },
    { name: "Freelance Income Calculator", slug: "freelance-income-calculator" },
    { name: "Hourly to Salary Converter", slug: "hourly-to-salary-converter" },
    { name: "Business Expense Deduction Calculator", slug: "business-expense-deduction-calculator" },
  ];

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, calculatorSchema, faqSchema, howToSchema]} />
      <ExitIntentCTA />
    <ToolLayout>
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-white mb-3">Income Tax Calculator</h1>
              <p className="text-text-secondary-light">
                Estimate federal income tax using 2024 tax brackets. Free and instant.
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

              <label className="block">
                <span className="block text-sm text-text-secondary-light mb-2">Filing Status</span>
                <select
                  value={filingStatus}
                  onChange={(e) => {
                    const status = e.target.value as "single" | "married";
                    setFilingStatus(status);
                    setStandardDeduction(status === "married" ? STANDARD_DEDUCTION_MARRIED : STANDARD_DEDUCTION_SINGLE);
                  }}
                  className="w-full rounded-xl bg-surface-elevated-light dark:bg-surface-elevated-dark border border-secondary/20 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent/30"
                >
                  <option value="single">Single</option>
                  <option value="married">Married Filing Jointly</option>
                </select>
              </label>

              <NumberInput
                label="Standard Deduction"
                value={standardDeduction}
                onChange={setStandardDeduction}
                min={0}
                step={100}
                suffix="$"
              />
            </div>

            <div className="space-y-4">
              <ResultCard title="Tax Estimate">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary-light">Taxable Income</span>
                    <span className="text-xl font-bold text-white">{toCurrency(calc.taxableIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary-light">Federal Tax</span>
                    <span className="text-2xl font-bold text-white">{toCurrency(calc.tax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary-light">After-Tax Income</span>
                    <span className="text-white">{toCurrency(calc.afterTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary-light">Effective Tax Rate</span>
                    <span className="text-white">{calc.effectiveRate.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary-light">Marginal Tax Rate</span>
                    <span className="text-white">{calc.marginalRate.toFixed(1)}%</span>
                  </div>
                </div>
              </ResultCard>

              {calc.breakdown.length > 0 && (
                <div className="bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-2xl p-4 shadow-2xl">
                  <h3 className="text-lg font-semibold text-white mb-3">Tax Breakdown by Bracket</h3>
                  <div className="space-y-2 text-sm">
                    {calc.breakdown.map((b, i) => (
                      <div key={i} className="flex justify-between border-b border-secondary/10 pb-2">
                        <span className="text-text-secondary-light">{b.bracket}</span>
                        <span className="text-white">{toCurrency(b.tax)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            <p className="text-xs text-text-secondary-light mt-4">
              Disclaimer: This is a simplified estimate for educational purposes only. Does not include state/local taxes,
              FICA, itemized deductions, or credits. Consult a tax professional for accurate calculations.
            </p>
          </div>
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <FAQ items={faqItems} />
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <ContentSection title="Introduction">
            <p>
              Understanding how much you'll pay in federal income taxes is crucial for financial planning. The U.S. uses
              a progressive tax system where different portions of your income are taxed at different rates, making it
              important to understand both your effective and marginal tax rates.
            </p>
            <p>
              This free income tax calculator estimates your federal income tax using 2024 tax brackets and the standard
              deduction. It shows you how much tax you'll pay, your after-tax income, and breaks down how your income is
              taxed across different brackets.
            </p>
            <p>
              While this calculator provides a good estimate, remember that actual taxes depend on many factors including
              itemized deductions, tax credits, and other income sources. Use this as a starting point for tax planning,
              but consult a tax professional for accurate calculations.
            </p>
          </ContentSection>

          <HowToSection
            title="How to Use the Income Tax Calculator"
            description="Follow these steps to estimate your federal income tax:"
            steps={howToSteps}
          />

          <ContentSection title="Understanding Tax Brackets and Rates">
            <p>
              The U.S. federal income tax system uses progressive brackets, meaning you pay different rates on different
              portions of your income:
            </p>
            <div className="bg-surface-dark rounded-lg p-4 my-4">
              <p className="text-white mb-2 font-semibold">2024 Tax Brackets (Single Filer):</p>
              <div className="text-text-secondary-light space-y-1 text-sm">
                <p>10% on income from $0 to $11,000</p>
                <p>12% on income from $11,001 to $44,725</p>
                <p>22% on income from $44,726 to $95,375</p>
                <p>24% on income from $95,376 to $201,050</p>
                <p>32% on income from $201,051 to $383,900</p>
                <p>35% on income from $383,901 to $487,450</p>
                <p>37% on income over $487,450</p>
              </div>
            </div>
            <p>
              <strong>Example:</strong> If you earn $75,000 as a single filer with $14,600 standard deduction, your
              taxable income is $60,400. You pay: 10% on $11,000 ($1,100), 12% on $33,725 ($4,047), and 22% on $15,675
              ($3,449), for a total tax of $8,596. Your effective rate is 11.5%, while your marginal rate is 22%.
            </p>
          </ContentSection>

          <ContentSection title="Tips & Best Practices for Tax Planning">
            <h3 className="font-semibold text-white mb-2">1. Maximize Pre-Tax Contributions</h3>
            <p>
              Contribute to 401(k), traditional IRA, or HSA accounts to reduce taxable income. For example, a $5,000
              401(k) contribution saves $1,100 in taxes if you're in the 22% bracket.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">2. Understand Standard vs. Itemized Deductions</h3>
            <p>
              Most people benefit from the standard deduction ($14,600 single, $29,200 married). Itemize only if your
              deductions (mortgage interest, state taxes, charitable contributions) exceed the standard deduction.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">3. Plan for Quarterly Taxes (If Self-Employed)</h3>
            <p>
              Self-employed individuals must pay estimated taxes quarterly. Calculate your expected annual tax and
              divide by four to avoid penalties. This calculator helps estimate your tax liability.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">4. Consider Tax-Loss Harvesting</h3>
            <p>
              If you have investments, consider selling losing positions to offset capital gains. This can reduce your
              taxable income and overall tax burden.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">5. Adjust Withholding Throughout the Year</h3>
            <p>
              Use this calculator to estimate your tax and adjust your W-4 withholding to avoid large refunds or
              unexpected tax bills. Aim to owe or receive less than $1,000 at tax time.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">6. Plan Major Purchases Strategically</h3>
            <p>
              Large deductible expenses (like charitable contributions or business expenses) are more valuable in higher
              tax years. Time major deductions to maximize their tax benefit.
            </p>
          </ContentSection>

          <div className="mt-8">
            <ShareButton
              title="Income Tax Calculator - Free 2025 | Expenvisor"
              url="/tools/income-tax-calculator"
              description="Estimate your federal income tax using 2024 tax brackets with standard deduction."
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
            <h3 className="text-2xl font-bold text-white mb-3">Track Your Income and Expenses with Expenvisor</h3>
            <p className="text-text-secondary-light mb-4">
              Calculated your taxes? Track all your income, expenses, and financial transactions with Expenvisor's
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

