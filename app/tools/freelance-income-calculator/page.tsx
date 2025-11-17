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

export default function FreelanceIncomeCalculatorPage() {
  const [annualIncome, setAnnualIncome] = useState(60000);
  const [businessExpenses, setBusinessExpenses] = useState(10000);
  const [quarterlyPayments, setQuarterlyPayments] = useState(true);

  const calc = useMemo(() => {
    const netIncome = annualIncome - businessExpenses;
    const selfEmploymentTax = netIncome * 0.1413; // 12.4% Social Security + 2.9% Medicare on 92.35% of net
    const adjustedNetIncome = netIncome - (selfEmploymentTax / 2); // Half of SE tax is deductible
    const estimatedIncomeTax = adjustedNetIncome * 0.22; // Approximate 22% bracket
    const totalTax = selfEmploymentTax + estimatedIncomeTax;
    const afterTaxIncome = netIncome - totalTax;
    const quarterlyTax = quarterlyPayments ? totalTax / 4 : 0;
    
    return {
      netIncome,
      selfEmploymentTax,
      estimatedIncomeTax,
      totalTax,
      afterTaxIncome,
      quarterlyTax,
      effectiveTaxRate: netIncome > 0 ? (totalTax / netIncome) * 100 : 0,
    };
  }, [annualIncome, businessExpenses, quarterlyPayments]);

  const faqItems = [
    {
      question: "What is self-employment tax?",
      answer:
        "Self-employment tax is Social Security and Medicare taxes for self-employed individuals. It's 15.3% total (12.4% Social Security on income up to $168,600, 2.9% Medicare on all income). You pay both employee and employer portions, but half is deductible.",
    },
    {
      question: "Do I need to pay quarterly taxes?",
      answer:
        "Yes, if you expect to owe $1,000 or more in taxes for the year, you must pay estimated quarterly taxes. Failure to pay can result in penalties. Pay by April 15, June 15, September 15, and January 15.",
    },
    {
      question: "What business expenses can I deduct?",
      answer:
        "Common deductions: home office, vehicle expenses, equipment, software, internet, phone, professional development, meals (50%), travel, insurance, and other business-related expenses. Keep receipts and records.",
    },
    {
      question: "How do I calculate quarterly taxes?",
      answer:
        "Estimate your annual tax liability and divide by 4. Use this calculator to estimate total taxes, then pay 25% each quarter. Adjust if income changes significantly during the year.",
    },
    {
      question: "What's the difference between 1099 and W-2?",
      answer:
        "W-2 employees have taxes withheld and receive benefits. 1099 contractors are self-employed, responsible for all taxes, and don't receive benefits. 1099 typically pays more but has higher tax burden.",
    },
    {
      question: "Should I set aside money for taxes?",
      answer:
        "Yes! Set aside 25-30% of income for taxes. Open a separate savings account and transfer tax money immediately when paid. This prevents spending money you'll owe to the IRS.",
    },
  ];

  const howToSteps = [
    {
      number: 1,
      title: "Enter Annual Income",
      description:
        "Input your total annual freelance/self-employment income. This is your gross income before expenses and taxes.",
    },
    {
      number: 2,
      title: "Enter Business Expenses",
      description:
        "Add up all deductible business expenses: home office, equipment, software, travel, meals, etc. These reduce your taxable income.",
    },
    {
      number: 3,
      title: "Review Tax Estimates",
      description:
        "See your net income, self-employment tax, estimated income tax, total tax, and after-tax income. This helps you plan for tax payments.",
    },
    {
      number: 4,
      title: "Plan Quarterly Payments",
      description:
        "If paying quarterly, divide total tax by 4. Set aside this amount each quarter and pay by the deadlines to avoid penalties.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Freelance Income Calculator", url: "/tools/freelance-income-calculator" },
  ]);

  const calculatorSchema = generateCalculatorSchema(
    "Freelance Income Calculator",
    "Free calculator to estimate tax withholding, calculate quarterly taxes, and understand business expense deductions for self-employed individuals.",
    "/tools/freelance-income-calculator",
    "Tax Calculator"
  );

  const faqSchema = generateFAQSchema(faqItems);
  const howToSchema = generateHowToSchema(
    howToSteps,
    "How to Use the Freelance Income Calculator",
    "Step-by-step guide to calculating taxes for self-employed individuals."
  );

  const relatedTools = [
    { name: "Income Tax Calculator", slug: "income-tax-calculator" },
    { name: "Business Expense Deduction Calculator", slug: "business-expense-deduction-calculator" },
    { name: "Hourly to Salary Converter", slug: "hourly-to-salary-converter" },
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
              <h1 className="text-4xl font-bold text-white mb-3">Freelance Income Calculator</h1>
              <p className="text-text-secondary-light">
                Calculate taxes, quarterly payments, and after-tax income for self-employed individuals. Free and instant.
              </p>
            </header>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <NumberInput
                  label="Annual Freelance Income"
                  value={annualIncome}
                  onChange={setAnnualIncome}
                  min={0}
                  step={1000}
                  suffix="$"
                />
                <NumberInput
                  label="Annual Business Expenses"
                  value={businessExpenses}
                  onChange={setBusinessExpenses}
                  min={0}
                  step={500}
                  suffix="$"
                />
                <label className="block">
                  <span className="block text-sm text-text-secondary-light mb-2">Payment Schedule</span>
                  <select
                    value={quarterlyPayments ? "quarterly" : "annual"}
                    onChange={(e) => setQuarterlyPayments(e.target.value === "quarterly")}
                    className="w-full rounded-xl bg-surface-elevated-light dark:bg-surface-elevated-dark border border-secondary/20 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent/30"
                  >
                    <option value="quarterly">Quarterly Estimated Payments</option>
                    <option value="annual">Annual Payment</option>
                  </select>
                </label>
              </div>

              <div className="space-y-4">
                <ResultCard title="Tax Estimate">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-light">Net Income</span>
                      <span className="text-xl font-bold text-white">{toCurrency(calc.netIncome)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Self-Employment Tax</span>
                      <span className="text-white">{toCurrency(calc.selfEmploymentTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Estimated Income Tax</span>
                      <span className="text-white">{toCurrency(calc.estimatedIncomeTax)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-light">Total Tax</span>
                      <span className="text-2xl font-bold text-white">{toCurrency(calc.totalTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">After-Tax Income</span>
                      <span className="text-accent font-semibold">{toCurrency(calc.afterTaxIncome)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Effective Tax Rate</span>
                      <span className="text-white">{calc.effectiveTaxRate.toFixed(1)}%</span>
                    </div>
                    {quarterlyPayments && (
                      <div className="pt-3 border-t border-secondary/20">
                        <div className="flex justify-between">
                          <span className="text-text-secondary-light">Quarterly Payment</span>
                          <span className="text-white font-semibold">{toCurrency(calc.quarterlyTax)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </ResultCard>

                <FAQ items={faqItems} />
              </div>
            </div>

            <div className="mt-12 max-w-4xl mx-auto">
              <ContentSection title="Introduction">
                <p>
                  As a freelancer or self-employed individual, you're responsible for managing your own taxes, which can
                  be complex and overwhelming. Unlike W-2 employees who have taxes withheld, you must estimate and pay
                  taxes yourself, including self-employment tax.
                </p>
                <p>
                  This free freelance income calculator helps you estimate your tax liability, understand self-employment
                  tax, and plan for quarterly tax payments. It accounts for business expense deductions and gives you a
                  realistic view of your after-tax income.
                </p>
                <p>
                  Use this tool to plan your tax payments, set aside money for taxes, and understand the true cost of
                  being self-employed. Always consult a tax professional for accurate calculations and planning.
                </p>
              </ContentSection>

              <HowToSection
                title="How to Use the Freelance Income Calculator"
                description="Follow these steps to calculate your freelance taxes:"
                steps={howToSteps}
              />

              <ContentSection title="Understanding Self-Employment Taxes">
                <p>
                  <strong>Self-Employment Tax:</strong> As a self-employed individual, you pay both employee and
                  employer portions of Social Security and Medicare taxes (15.3% total). However, you can deduct half
                  of this tax from your income tax calculation.
                </p>
                <p>
                  <strong>Income Tax:</strong> You also pay regular income tax on your net income (after business
                  expenses and SE tax deduction). Rates range from 10% to 37% based on income brackets.
                </p>
                <p>
                  <strong>Total Tax Burden:</strong> Self-employed individuals typically pay 25-30% of net income in
                  taxes (SE tax + income tax). This is higher than employees because you pay both portions of SE tax.
                </p>
                <p>
                  <strong>Quarterly Payments:</strong> You must pay estimated taxes quarterly if you expect to owe
                  $1,000+ for the year. Payments are due April 15, June 15, September 15, and January 15.
                </p>
              </ContentSection>

              <ContentSection title="Tips & Best Practices for Freelance Taxes">
                <h3 className="font-semibold text-white mb-2">1. Set Aside 25-30% for Taxes</h3>
                <p>
                  Immediately set aside 25-30% of every payment into a separate tax savings account. This prevents
                  spending money you'll owe to the IRS and ensures you can pay quarterly taxes.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">2. Track All Business Expenses</h3>
                <p>
                  Use expense tracking apps like Expenvisor to track all business expenses. Every deductible expense
                  reduces your tax burden. Keep receipts and records for tax time.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">3. Pay Quarterly Taxes on Time</h3>
                <p>
                  Pay estimated taxes quarterly to avoid penalties. Use this calculator to estimate quarterly amounts.
                  Adjust payments if income changes significantly during the year.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">4. Maximize Deductions</h3>
                <p>
                  Take advantage of all legitimate business deductions: home office, equipment, software, travel, meals,
                  professional development. Consult a tax professional to ensure you're maximizing deductions legally.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">5. Consider an S-Corp</h3>
                <p>
                  If income is high enough ($50,000+), forming an S-Corp can reduce self-employment tax by paying
                  yourself a reasonable salary and taking the rest as distributions. Consult a tax professional.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">6. Work with a Tax Professional</h3>
                <p>
                  Self-employment taxes are complex. Work with a CPA or tax professional who specializes in
                  self-employment to ensure you're compliant and maximizing deductions.
                </p>
              </ContentSection>

              <div className="mt-8">
                <ShareButton
                  title="Freelance Income Calculator - Free 2025 | Expenvisor"
                  url="/tools/freelance-income-calculator"
                  description="Calculate taxes, quarterly payments, and after-tax income for self-employed individuals."
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
                <h3 className="text-2xl font-bold text-white mb-3">Track Your Freelance Expenses with Expenvisor</h3>
                <p className="text-text-secondary-light mb-4">
                  Calculating freelance taxes? Track all your business expenses automatically with Expenvisor's
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

