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
  return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

export default function TipCalculatorPage() {
  const [billAmount, setBillAmount] = useState(100);
  const [tipPercent, setTipPercent] = useState(20);
  const [numPeople, setNumPeople] = useState(1);
  const [taxAmount, setTaxAmount] = useState(0);

  const calc = useMemo(() => {
    const tipAmount = billAmount * (tipPercent / 100);
    const subtotal = billAmount + taxAmount;
    const total = subtotal + tipAmount;
    const perPerson = numPeople > 0 ? total / numPeople : total;
    const tipPerPerson = numPeople > 0 ? tipAmount / numPeople : tipAmount;
    
    return {
      tipAmount,
      subtotal,
      total,
      perPerson,
      tipPerPerson,
    };
  }, [billAmount, tipPercent, numPeople, taxAmount]);

  const faqItems = [
    {
      question: "How much should I tip?",
      answer:
        "Standard tipping: Restaurants 15-20% (18% average), Bars $1-2 per drink or 15-20%, Taxi/Uber 15-20%, Hotels $2-5 per night for housekeeping, Delivery 15-20% or $3-5 minimum. Adjust based on service quality.",
    },
    {
      question: "Should I tip on tax?",
      answer:
        "Generally, tip on the pre-tax amount (subtotal). However, many people tip on the total including tax for simplicity. Either is acceptable—the difference is usually small. This calculator allows you to include tax separately.",
    },
    {
      question: "How do I split the bill with tip?",
      answer:
        "Enter the total bill amount, tip percentage, and number of people. The calculator shows total amount, tip amount, and per-person cost. Each person pays their share of the total (bill + tip).",
    },
    {
      question: "What if service was poor?",
      answer:
        "You're not obligated to tip, but consider: Was it the server's fault or kitchen/management? For poor service, 10-15% is acceptable. For terrible service, you can tip less or nothing, but consider speaking with management.",
    },
    {
      question: "Do I need to tip if gratuity is included?",
      answer:
        "If gratuity is automatically added (common for large parties), you don't need to add more unless service was exceptional. Check your bill—some restaurants add 18-20% gratuity automatically for parties of 6+.",
    },
    {
      question: "How do I calculate tip quickly?",
      answer:
        "Quick mental math: 10% = move decimal one place left, 20% = double that. For 20% on $50: 10% = $5, 20% = $10. Or use this calculator for accuracy, especially when splitting bills.",
    },
  ];

  const howToSteps = [
    {
      number: 1,
      title: "Enter Bill Amount",
      description:
        "Input the total bill amount before tip. This is the subtotal from your receipt.",
    },
    {
      number: 2,
      title: "Enter Tax Amount (Optional)",
      description:
        "If you want to include tax in calculations, enter the tax amount. Otherwise, leave at 0 and tip will be calculated on the bill amount only.",
    },
    {
      number: 3,
      title: "Set Tip Percentage",
      description:
        "Enter your desired tip percentage. Standard is 15-20%. Adjust based on service quality. Use quick buttons for common percentages.",
    },
    {
      number: 4,
      title: "Enter Number of People (Optional)",
      description:
        "If splitting the bill, enter the number of people. The calculator will show per-person amounts including tip.",
    },
    {
      number: 5,
      title: "Review Tip Calculation",
      description:
        "See the tip amount, total bill (including tax and tip), and per-person cost if splitting. Use this to pay fairly and accurately.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Tip Calculator", url: "/tools/tip-calculator" },
  ]);

  const calculatorSchema = generateCalculatorSchema(
    "Tip Calculator",
    "Free tip calculator for restaurants, split bills with tip, and calculate service charges. Calculate gratuity quickly and fairly.",
    "/tools/tip-calculator",
    "Tip Calculator"
  );

  const faqSchema = generateFAQSchema(faqItems);
  const howToSchema = generateHowToSchema(
    howToSteps,
    "How to Use the Tip Calculator",
    "Step-by-step guide to calculating tips and splitting bills."
  );

  const relatedTools = [
    { name: "Currency Converter", slug: "currency-converter" },
    { name: "Budget Planner", slug: "budget-planner" },
    { name: "Expense Ratio Calculator", slug: "expense-ratio-calculator" },
    { name: "Bill Splitter", slug: "bill-splitter" },
  ];

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, calculatorSchema, faqSchema, howToSchema]} />
      <ExitIntentCTA />
      <ToolLayout>
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <header className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-white mb-3">Tip Calculator</h1>
              <p className="text-text-secondary-light">
                Calculate restaurant tips, split bills, and service charges. Free and instant.
              </p>
            </header>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <NumberInput
                  label="Bill Amount"
                  value={billAmount}
                  onChange={setBillAmount}
                  min={0}
                  step={1}
                  suffix="$"
                />
                <NumberInput
                  label="Tax Amount"
                  value={taxAmount}
                  onChange={setTaxAmount}
                  min={0}
                  step={1}
                  suffix="$"
                />
                <NumberInput
                  label="Tip Percentage"
                  value={tipPercent}
                  onChange={setTipPercent}
                  min={0}
                  max={100}
                  step={1}
                  suffix="%"
                />
                <div className="flex gap-2">
                  {[15, 18, 20, 25].map((p) => (
                    <button
                      key={p}
                      onClick={() => setTipPercent(p)}
                      className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                        tipPercent === p
                          ? "bg-gradient-to-r from-accent to-secondary text-white"
                          : "bg-surface-dark text-text-secondary-light hover:bg-surface-dark/80"
                      }`}
                    >
                      {p}%
                    </button>
                  ))}
                </div>
                <NumberInput
                  label="Number of People"
                  value={numPeople}
                  onChange={setNumPeople}
                  min={1}
                  step={1}
                />
              </div>

              <div className="space-y-4">
                <ResultCard title="Tip Calculation">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-light">Tip Amount</span>
                      <span className="text-2xl font-bold text-white">{toCurrency(calc.tipAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Subtotal (Bill + Tax)</span>
                      <span className="text-white">{toCurrency(calc.subtotal)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-light">Total Amount</span>
                      <span className="text-xl font-bold text-accent">{toCurrency(calc.total)}</span>
                    </div>
                    {numPeople > 1 && (
                      <>
                        <div className="pt-3 border-t border-secondary/20">
                          <div className="flex justify-between mb-2">
                            <span className="text-text-secondary-light">Per Person</span>
                            <span className="text-white font-semibold">{toCurrency(calc.perPerson)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary-light">Tip Per Person</span>
                            <span className="text-white">{toCurrency(calc.tipPerPerson)}</span>
                          </div>
                        </div>
                      </>
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
                  Calculating tips accurately and fairly is important when dining out, especially when splitting bills
                  with friends or colleagues. Whether you're at a restaurant, bar, or using delivery services,
                  knowing how much to tip helps you show appreciation for good service while staying within your budget.
                </p>
                <p>
                  This free tip calculator helps you calculate tips quickly and accurately, split bills fairly among
                  multiple people, and understand standard tipping practices. It accounts for tax and shows per-person
                  costs when splitting.
                </p>
                <p>
                  Use this tool to calculate tips for any service, split restaurant bills accurately, and ensure you're
                  tipping appropriately based on service quality.
                </p>
              </ContentSection>

              <HowToSection
                title="How to Use the Tip Calculator"
                description="Follow these steps to calculate tips and split bills:"
                steps={howToSteps}
              />

              <ContentSection title="Standard Tipping Guidelines">
                <p>
                  <strong>Restaurants:</strong> 15-20% of pre-tax bill. 18% is average for good service. 20%+ for
                  excellent service. 10-15% for poor service. Tip on the subtotal, not including tax (though many tip on
                  total for simplicity).
                </p>
                <p>
                  <strong>Bars:</strong> $1-2 per drink or 15-20% of tab. Tip bartenders directly for each drink or at
                  the end for a tab.
                </p>
                <p>
                  <strong>Delivery:</strong> 15-20% or $3-5 minimum, whichever is higher. Increase for bad weather or
                  large orders.
                </p>
                <p>
                  <strong>Taxi/Uber/Lyft:</strong> 15-20% or round up. For rideshare, tip through the app. For taxis,
                  cash is preferred.
                </p>
                <p>
                  <strong>Hotels:</strong> Housekeeping $2-5 per night, Bellhop $1-2 per bag, Concierge $5-20 for
                  special services.
                </p>
              </ContentSection>

              <ContentSection title="Tips & Best Practices for Tipping">
                <h3 className="font-semibold text-white mb-2">1. Tip Based on Service Quality</h3>
                <p>
                  Adjust tip percentage based on service. Excellent service deserves 20%+, good service 18%, average
                  15%, poor service 10-15%. Don't feel obligated to tip well for terrible service.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">2. Tip on Pre-Tax Amount</h3>
                <p>
                  Standard practice is to tip on the subtotal before tax. However, many people tip on the total for
                  simplicity. Either is acceptable—the difference is usually small.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">3. Split Bills Fairly</h3>
                <p>
                  When splitting bills, calculate total including tip, then divide by number of people. This ensures
                  everyone pays their fair share of both the bill and tip.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">4. Check for Automatic Gratuity</h3>
                <p>
                  Many restaurants add automatic gratuity (18-20%) for large parties (typically 6+ people). Check your
                  bill—if gratuity is included, you don't need to add more unless service was exceptional.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">5. Tip in Cash When Possible</h3>
                <p>
                  Servers often prefer cash tips as they receive them immediately. Credit card tips may be processed
                  through payroll and taxed. Cash tips are also more direct and personal.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">6. Be Generous for Great Service</h3>
                <p>
                  If service was exceptional, don't hesitate to tip 25% or more. Generous tipping rewards excellent
                  service and makes servers' days. Remember, many servers rely on tips as a significant portion of
                  income.
                </p>
              </ContentSection>

              <div className="mt-8">
                <ShareButton
                  title="Tip Calculator - Free 2025 | Expenvisor"
                  url="/tools/tip-calculator"
                  description="Calculate restaurant tips, split bills, and service charges quickly and fairly."
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
                <h3 className="text-2xl font-bold text-white mb-3">Track Your Dining Expenses with Expenvisor</h3>
                <p className="text-text-secondary-light mb-4">
                  Calculating tips? Track all your dining expenses, tips, and spending with Expenvisor's AI-powered
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

