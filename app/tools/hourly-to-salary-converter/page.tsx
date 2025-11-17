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

export default function HourlyToSalaryConverterPage() {
  const [hourlyWage, setHourlyWage] = useState(25);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(52);
  const [benefitsValue, setBenefitsValue] = useState(10000);

  const calc = useMemo(() => {
    const annualSalary = hourlyWage * hoursPerWeek * weeksPerYear;
    const totalCompensation = annualSalary + benefitsValue;
    const monthlySalary = annualSalary / 12;
    const weeklySalary = annualSalary / weeksPerYear;
    const dailySalary = annualSalary / (weeksPerYear * 5);
    
    return {
      annualSalary,
      totalCompensation,
      monthlySalary,
      weeklySalary,
      dailySalary,
    };
  }, [hourlyWage, hoursPerWeek, weeksPerYear, benefitsValue]);

  const faqItems = [
    {
      question: "How do I convert hourly wage to salary?",
      answer:
        "Multiply hourly wage by hours per week, then multiply by weeks worked per year. Formula: Hourly Wage × Hours/Week × Weeks/Year = Annual Salary. For full-time (40 hours/week, 52 weeks/year): Hourly × 2,080 = Annual Salary.",
    },
    {
      question: "What's the difference between salary and total compensation?",
      answer:
        "Salary is base pay only. Total compensation includes salary plus benefits value (health insurance, retirement contributions, paid time off, etc.). Total compensation gives a more accurate picture of your earnings.",
    },
    {
      question: "Should I include benefits in salary calculations?",
      answer:
        "Yes, for accurate comparison. Benefits can add 20-30% to your total compensation. Health insurance alone can be worth $5,000-$15,000 annually. Include all benefits when comparing job offers.",
    },
    {
      question: "How many hours do full-time employees work?",
      answer:
        "Full-time is typically 40 hours per week, 52 weeks per year (2,080 hours). However, some positions may work more or less. Adjust the calculator based on your specific situation.",
    },
    {
      question: "What if I work part-time or irregular hours?",
      answer:
        "Adjust hours per week and weeks per year to match your actual schedule. For irregular hours, use average hours per week. This calculator is flexible to accommodate different work schedules.",
    },
    {
      question: "How do I compare hourly vs. salary positions?",
      answer:
        "Convert hourly to annual salary using this calculator, then add benefits value. Compare total compensation (salary + benefits) rather than just base pay to make fair comparisons.",
    },
  ];

  const howToSteps = [
    {
      number: 1,
      title: "Enter Hourly Wage",
      description:
        "Input your hourly wage rate. This is what you earn per hour of work.",
    },
    {
      number: 2,
      title: "Set Work Schedule",
      description:
        "Enter hours worked per week and weeks worked per year. Full-time is typically 40 hours/week, 52 weeks/year.",
    },
    {
      number: 3,
      title: "Add Benefits Value (Optional)",
      description:
        "Enter the annual value of benefits: health insurance, retirement contributions, paid time off, etc. This calculates total compensation.",
    },
    {
      number: 4,
      title: "Review Salary Conversion",
      description:
        "See your annual salary, total compensation (with benefits), monthly, weekly, and daily salary equivalents.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Hourly to Salary Converter", url: "/tools/hourly-to-salary-converter" },
  ]);

  const calculatorSchema = generateCalculatorSchema(
    "Hourly to Salary Converter",
    "Free converter to calculate annual salary from hourly wage, compare contract vs. full-time, and understand benefits value.",
    "/tools/hourly-to-salary-converter",
    "Salary Calculator"
  );

  const faqSchema = generateFAQSchema(faqItems);
  const howToSchema = generateHowToSchema(
    howToSteps,
    "How to Use the Hourly to Salary Converter",
    "Step-by-step guide to converting hourly wage to annual salary."
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
              <h1 className="text-4xl font-bold text-white mb-3">Hourly to Salary Converter</h1>
              <p className="text-text-secondary-light">
                Convert hourly wage to annual salary and calculate total compensation. Free and instant.
              </p>
            </header>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <NumberInput
                  label="Hourly Wage"
                  value={hourlyWage}
                  onChange={setHourlyWage}
                  min={0}
                  step={1}
                  suffix="$"
                />
                <NumberInput
                  label="Hours Per Week"
                  value={hoursPerWeek}
                  onChange={setHoursPerWeek}
                  min={1}
                  max={168}
                  step={1}
                />
                <NumberInput
                  label="Weeks Per Year"
                  value={weeksPerYear}
                  onChange={setWeeksPerYear}
                  min={1}
                  max={52}
                  step={1}
                />
                <NumberInput
                  label="Annual Benefits Value"
                  value={benefitsValue}
                  onChange={setBenefitsValue}
                  min={0}
                  step={1000}
                  suffix="$"
                />
              </div>

              <div className="space-y-4">
                <ResultCard title="Salary Conversion">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-light">Annual Salary</span>
                      <span className="text-2xl font-bold text-white">{toCurrency(calc.annualSalary)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Total Compensation</span>
                      <span className="text-white">{toCurrency(calc.totalCompensation)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Monthly Salary</span>
                      <span className="text-white">{toCurrency(calc.monthlySalary)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Weekly Salary</span>
                      <span className="text-white">{toCurrency(calc.weeklySalary)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Daily Salary (5-day week)</span>
                      <span className="text-white">{toCurrency(calc.dailySalary)}</span>
                    </div>
                  </div>
                </ResultCard>

                <FAQ items={faqItems} />
              </div>
            </div>

            <div className="mt-12 max-w-4xl mx-auto">
              <ContentSection title="Introduction">
                <p>
                  Whether you're comparing job offers, negotiating salary, or planning your budget, converting between
                  hourly wages and annual salaries is essential. Hourly positions and salary positions are structured
                  differently, making direct comparison challenging without conversion.
                </p>
                <p>
                  This free hourly to salary converter helps you calculate annual salary from hourly wage, account for
                  different work schedules, and include benefits value to see total compensation. It's perfect for
                  comparing job offers, understanding your earnings, and making informed career decisions.
                </p>
                <p>
                  Use this tool to convert hourly rates to annual salaries, compare contract vs. full-time positions,
                  and understand the true value of compensation packages including benefits.
                </p>
              </ContentSection>

              <HowToSection
                title="How to Use the Hourly to Salary Converter"
                description="Follow these steps to convert hourly wage to salary:"
                steps={howToSteps}
              />

              <ContentSection title="Understanding Salary Conversion">
                <p>
                  <strong>Standard Full-Time:</strong> 40 hours/week × 52 weeks/year = 2,080 hours/year. To convert
                  hourly to annual: Hourly Wage × 2,080 = Annual Salary.
                </p>
                <p>
                  <strong>Example:</strong> $25/hour × 2,080 hours = $52,000 annual salary. This assumes full-time work
                  with no unpaid time off.
                </p>
                <p>
                  <strong>Benefits Value:</strong> Don't forget to add benefits value when comparing positions. Health
                  insurance, retirement contributions, paid time off, and other benefits can add 20-30% to total
                  compensation.
                </p>
                <p>
                  <strong>Part-Time Adjustments:</strong> For part-time work, adjust hours per week. For positions with
                  unpaid time off, reduce weeks per year accordingly.
                </p>
              </ContentSection>

              <ContentSection title="Tips & Best Practices for Salary Comparison">
                <h3 className="font-semibold text-white mb-2">1. Always Compare Total Compensation</h3>
                <p>
                  Don't just compare base salary. Include benefits value, retirement contributions, paid time off, and
                  other perks. A lower salary with great benefits may be better than a higher salary with no benefits.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">2. Account for Work Schedule Differences</h3>
                <p>
                  Hourly positions may offer overtime pay, while salary positions typically don't. Consider expected
                  hours worked when comparing. Salary positions may require more than 40 hours/week.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">3. Factor in Job Security</h3>
                <p>
                  Salary positions often offer more job security and stability. Hourly contract positions may pay more
                  but lack benefits and job security. Consider your risk tolerance.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">4. Consider Career Growth</h3>
                <p>
                  Look beyond immediate compensation. Consider opportunities for advancement, skill development, and
                  long-term career growth when comparing positions.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">5. Negotiate Based on Total Value</h3>
                <p>
                  When negotiating, present total compensation (salary + benefits) rather than just base pay. This gives
                  you more leverage and shows you understand the full value of the position.
                </p>
              </ContentSection>

              <div className="mt-8">
                <ShareButton
                  title="Hourly to Salary Converter - Free 2025 | Expenvisor"
                  url="/tools/hourly-to-salary-converter"
                  description="Convert hourly wage to annual salary and calculate total compensation."
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
                <h3 className="text-2xl font-bold text-white mb-3">Track Your Income with Expenvisor</h3>
                <p className="text-text-secondary-light mb-4">
                  Converting your salary? Track all your income, expenses, and financial progress with Expenvisor's
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

