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

export default function BusinessExpenseDeductionCalculatorPage() {
  const [homeOfficeSquareFeet, setHomeOfficeSquareFeet] = useState(100);
  const [totalHomeSquareFeet, setTotalHomeSquareFeet] = useState(1500);
  const [annualHomeExpenses, setAnnualHomeExpenses] = useState(24000);
  const [vehicleMiles, setVehicleMiles] = useState(5000);
  const [mileageRate, setMileageRate] = useState(0.655);
  const [otherExpenses, setOtherExpenses] = useState(5000);

  const calc = useMemo(() => {
    const homeOfficePercentage = totalHomeSquareFeet > 0 ? (homeOfficeSquareFeet / totalHomeSquareFeet) * 100 : 0;
    const homeOfficeDeduction = (annualHomeExpenses * homeOfficePercentage) / 100;
    const vehicleDeduction = vehicleMiles * mileageRate;
    const totalDeductions = homeOfficeDeduction + vehicleDeduction + otherExpenses;
    const taxSavings = totalDeductions * 0.22; // Approximate 22% tax bracket
    
    return {
      homeOfficePercentage,
      homeOfficeDeduction,
      vehicleDeduction,
      totalDeductions,
      taxSavings,
    };
  }, [homeOfficeSquareFeet, totalHomeSquareFeet, annualHomeExpenses, vehicleMiles, mileageRate, otherExpenses]);

  const faqItems = [
    {
      question: "What is the home office deduction?",
      answer:
        "If you use part of your home exclusively and regularly for business, you can deduct a portion of home expenses (mortgage interest, utilities, insurance, repairs) based on the percentage of your home used for business.",
    },
    {
      question: "How do I calculate home office deduction?",
      answer:
        "Calculate the percentage of your home used for business (business square feet ÷ total square feet), then apply that percentage to eligible home expenses. The simplified method allows $5 per square foot (up to 300 sq ft = $1,500 max).",
    },
    {
      question: "What vehicle expenses can I deduct?",
      answer:
        "You can deduct business vehicle expenses using either: (1) Standard mileage rate (currently $0.655/mile for 2024), or (2) Actual expenses (gas, maintenance, depreciation, insurance). You must choose one method for the vehicle's first year of business use.",
    },
    {
      question: "What other business expenses are deductible?",
      answer:
        "Common deductions: equipment, software, internet, phone, professional development, travel, meals (50%), advertising, insurance, legal fees, and other ordinary and necessary business expenses. Keep receipts and records.",
    },
    {
      question: "Do I need to itemize to claim business deductions?",
      answer:
        "No, business expenses are deducted on Schedule C (for sole proprietors) or business tax forms, separate from personal itemized deductions. You can take business deductions even if you take the standard deduction for personal taxes.",
    },
    {
      question: "What records do I need to keep?",
      answer:
        "Keep receipts, invoices, bank statements, mileage logs, and documentation for all business expenses. The IRS requires records to support deductions. Use expense tracking apps to maintain organized records.",
    },
  ];

  const howToSteps = [
    {
      number: 1,
      title: "Calculate Home Office Deduction",
      description:
        "Enter your home office square feet and total home square feet. Enter annual home expenses (mortgage interest, utilities, insurance, etc.). The calculator determines the deductible percentage and amount.",
    },
    {
      number: 2,
      title: "Calculate Vehicle Deduction",
      description:
        "Enter business miles driven and the standard mileage rate (currently $0.655/mile for 2024). The calculator calculates your vehicle expense deduction.",
    },
    {
      number: 3,
      title: "Add Other Business Expenses",
      description:
        "Enter other deductible business expenses: equipment, software, travel, meals, professional development, etc. Be comprehensive but only include legitimate business expenses.",
    },
    {
      number: 4,
      title: "Review Total Deductions",
      description:
        "See your total business expense deductions and estimated tax savings. Use this to plan your tax strategy and ensure you're maximizing legitimate deductions.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Business Expense Deduction Calculator", url: "/tools/business-expense-deduction-calculator" },
  ]);

  const calculatorSchema = generateCalculatorSchema(
    "Business Expense Deduction Calculator",
    "Free calculator to calculate home office deduction, vehicle expense deduction, and total tax deductions for self-employed individuals.",
    "/tools/business-expense-deduction-calculator",
    "Tax Calculator"
  );

  const faqSchema = generateFAQSchema(faqItems);
  const howToSchema = generateHowToSchema(
    howToSteps,
    "How to Use the Business Expense Deduction Calculator",
    "Step-by-step guide to calculating business expense deductions."
  );

  const relatedTools = [
    { name: "Freelance Income Calculator", slug: "freelance-income-calculator" },
    { name: "Income Tax Calculator", slug: "income-tax-calculator" },
    { name: "Budget Planner", slug: "budget-planner" },
    { name: "Expense Ratio Calculator", slug: "expense-ratio-calculator" },
  ];

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, calculatorSchema, faqSchema, howToSchema]} />
      <ExitIntentCTA />
      <ToolLayout>
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <header className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-white mb-3">Business Expense Deduction Calculator</h1>
              <p className="text-text-secondary-light">
                Calculate home office, vehicle, and business expense deductions. Free and instant.
              </p>
            </header>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Home Office Deduction</h3>
                <NumberInput
                  label="Home Office Square Feet"
                  value={homeOfficeSquareFeet}
                  onChange={setHomeOfficeSquareFeet}
                  min={0}
                  step={10}
                />
                <NumberInput
                  label="Total Home Square Feet"
                  value={totalHomeSquareFeet}
                  onChange={setTotalHomeSquareFeet}
                  min={0}
                  step={100}
                />
                <NumberInput
                  label="Annual Home Expenses"
                  value={annualHomeExpenses}
                  onChange={setAnnualHomeExpenses}
                  min={0}
                  step={1000}
                  suffix="$"
                />

                <h3 className="text-lg font-semibold text-white mt-6">Vehicle Deduction</h3>
                <NumberInput
                  label="Business Miles Driven"
                  value={vehicleMiles}
                  onChange={setVehicleMiles}
                  min={0}
                  step={100}
                />
                <NumberInput
                  label="Mileage Rate (per mile)"
                  value={mileageRate}
                  onChange={setMileageRate}
                  min={0}
                  step={0.01}
                  suffix="$"
                />

                <h3 className="text-lg font-semibold text-white mt-6">Other Expenses</h3>
                <NumberInput
                  label="Other Business Expenses"
                  value={otherExpenses}
                  onChange={setOtherExpenses}
                  min={0}
                  step={500}
                  suffix="$"
                />
              </div>

              <div className="space-y-4">
                <ResultCard title="Deduction Summary">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Home Office %</span>
                      <span className="text-white">{calc.homeOfficePercentage.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Home Office Deduction</span>
                      <span className="text-white">{toCurrency(calc.homeOfficeDeduction)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Vehicle Deduction</span>
                      <span className="text-white">{toCurrency(calc.vehicleDeduction)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Other Expenses</span>
                      <span className="text-white">{toCurrency(otherExpenses)}</span>
                    </div>
                    <div className="pt-3 border-t border-secondary/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-text-secondary-light">Total Deductions</span>
                        <span className="text-2xl font-bold text-white">{toCurrency(calc.totalDeductions)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary-light">Estimated Tax Savings (22% bracket)</span>
                        <span className="text-accent font-semibold">{toCurrency(calc.taxSavings)}</span>
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
                  As a self-employed individual or business owner, maximizing legitimate business expense deductions is
                  crucial for reducing your tax burden. Business expenses directly reduce your taxable income, saving you
                  money on taxes.
                </p>
                <p>
                  This free business expense deduction calculator helps you estimate deductions for home office use,
                  vehicle expenses, and other business costs. It shows you potential tax savings and helps you understand
                  which expenses are deductible.
                </p>
                <p>
                  Use this tool to plan your tax strategy, track deductible expenses throughout the year, and ensure
                  you're maximizing legitimate deductions. Always consult a tax professional for accurate calculations
                  and compliance.
                </p>
              </ContentSection>

              <HowToSection
                title="How to Use the Business Expense Deduction Calculator"
                description="Follow these steps to calculate your business expense deductions:"
                steps={howToSteps}
              />

              <ContentSection title="Understanding Business Expense Deductions">
                <p>
                  <strong>Home Office Deduction:</strong> If you use part of your home exclusively and regularly for
                  business, you can deduct a percentage of home expenses. Calculate: (Business Square Feet ÷ Total
                  Square Feet) × Annual Home Expenses. The simplified method allows $5/sq ft (max $1,500 for 300 sq ft).
                </p>
                <p>
                  <strong>Vehicle Deduction:</strong> Deduct business vehicle expenses using the standard mileage rate
                  ($0.655/mile for 2024) or actual expenses. Keep a mileage log showing date, destination, purpose, and
                  miles driven for each business trip.
                </p>
                <p>
                  <strong>Other Business Expenses:</strong> Deduct ordinary and necessary business expenses: equipment,
                  software, internet, phone, travel, meals (50%), professional development, advertising, insurance, and
                  more. Expenses must be directly related to your business.
                </p>
                <p>
                  <strong>Tax Savings:</strong> Deductions reduce taxable income, which reduces taxes. In the 22% tax
                  bracket, every $1,000 in deductions saves approximately $220 in taxes.
                </p>
              </ContentSection>

              <ContentSection title="Tips & Best Practices for Business Deductions">
                <h3 className="font-semibold text-white mb-2">1. Keep Detailed Records</h3>
                <p>
                  Maintain organized records of all business expenses: receipts, invoices, bank statements, mileage logs.
                  The IRS requires documentation to support deductions. Use expense tracking apps to stay organized.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">2. Understand Home Office Requirements</h3>
                <p>
                  Home office must be used exclusively and regularly for business. It can't double as personal space.
                  The space must be your principal place of business or used to meet clients. Consult a tax professional
                  to ensure you qualify.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">3. Track Business Miles</h3>
                <p>
                  Keep a detailed mileage log for all business trips. Include date, destination, business purpose, and
                  miles. Apps can help track this automatically. Without records, you can't claim vehicle deductions.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">4. Separate Business and Personal</h3>
                <p>
                  Keep business and personal expenses completely separate. Use separate bank accounts and credit cards
                  for business. This makes tracking and deduction calculations much easier and reduces audit risk.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">5. Maximize Legitimate Deductions</h3>
                <p>
                  Don't be afraid to claim legitimate deductions, but never claim personal expenses as business expenses.
                  The IRS audits self-employed individuals more frequently, so accuracy is crucial.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">6. Work with a Tax Professional</h3>
                <p>
                  Business deductions are complex. A CPA or tax professional can help you maximize deductions legally,
                  ensure compliance, and reduce audit risk. The cost is often worth the tax savings and peace of mind.
                </p>
              </ContentSection>

              <div className="mt-8">
                <ShareButton
                  title="Business Expense Deduction Calculator - Free 2025 | Expenvisor"
                  url="/tools/business-expense-deduction-calculator"
                  description="Calculate home office, vehicle, and business expense deductions for self-employed individuals."
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
                <h3 className="text-2xl font-bold text-white mb-3">Track Your Business Expenses with Expenvisor</h3>
                <p className="text-text-secondary-light mb-4">
                  Calculating deductions? Track all your business expenses automatically with Expenvisor's AI-powered
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

