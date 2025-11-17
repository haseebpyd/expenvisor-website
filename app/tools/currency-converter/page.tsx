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

function formatCurrency(n: number, currency: string = "USD") {
  return n.toLocaleString(undefined, { style: "currency", currency, maximumFractionDigits: 2 });
}

const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "INR", name: "Indian Rupee" },
  { code: "MXN", name: "Mexican Peso" },
];

// Approximate exchange rates (for demo - in production, use real-time API)
const exchangeRates: Record<string, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  CAD: 1.35,
  AUD: 1.52,
  CHF: 0.88,
  CNY: 7.24,
  INR: 83.1,
  MXN: 17.0,
};

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  const calc = useMemo(() => {
    const fromRate = exchangeRates[fromCurrency] || 1;
    const toRate = exchangeRates[toCurrency] || 1;
    const converted = (amount / fromRate) * toRate;
    
    return {
      converted,
      rate: toRate / fromRate,
    };
  }, [amount, fromCurrency, toCurrency]);

  const faqItems = [
    {
      question: "How do currency exchange rates work?",
      answer:
        "Exchange rates show how much one currency is worth in another currency. Rates fluctuate based on economic factors, interest rates, inflation, political stability, and market demand. Rates change constantly throughout the day.",
    },
    {
      question: "Are these exchange rates real-time?",
      answer:
        "This calculator uses approximate exchange rates for demonstration. For actual transactions, use real-time rates from banks, currency exchange services, or financial websites. Rates vary by provider and include fees.",
    },
    {
      question: "What fees are included in currency conversion?",
      answer:
        "This calculator shows the exchange rate only. Actual conversions include fees: bank fees, credit card foreign transaction fees (typically 3%), exchange service fees, and ATM fees. Always check total cost before converting.",
    },
    {
      question: "How do I get the best exchange rate?",
      answer:
        "Compare rates from multiple sources: banks, credit unions, online services, and credit cards. Avoid airport exchanges (worst rates). Use credit cards with no foreign transaction fees when traveling. Consider currency exchange apps.",
    },
    {
      question: "Should I exchange currency before traveling?",
      answer:
        "It depends. Some prefer exchanging a small amount before travel for immediate needs, then using ATMs or credit cards abroad (often better rates). Research your destination's payment methods and exchange options.",
    },
    {
      question: "How do exchange rates affect my travel budget?",
      answer:
        "Exchange rates directly impact your purchasing power abroad. If your home currency weakens, everything costs more. Use this calculator to estimate costs and adjust your travel budget accordingly.",
    },
  ];

  const howToSteps = [
    {
      number: 1,
      title: "Enter Amount",
      description:
        "Input the amount you want to convert. This could be money you're exchanging, a purchase price, or a budget amount.",
    },
    {
      number: 2,
      title: "Select From Currency",
      description:
        "Choose the currency you're converting from. This is the currency you currently have or the currency of the original amount.",
    },
    {
      number: 3,
      title: "Select To Currency",
      description:
        "Choose the currency you're converting to. This is the currency you want to receive or the currency you need.",
    },
    {
      number: 4,
      title: "Review Conversion",
      description:
        "See the converted amount and exchange rate. Remember that actual conversions include fees, so the amount you receive may be slightly less.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Currency Converter", url: "/tools/currency-converter" },
  ]);

  const calculatorSchema = generateCalculatorSchema(
    "Currency Converter",
    "Free currency converter with exchange rates and travel budget calculator. Convert between currencies instantly.",
    "/tools/currency-converter",
    "Currency Calculator"
  );

  const faqSchema = generateFAQSchema(faqItems);
  const howToSchema = generateHowToSchema(
    howToSteps,
    "How to Use the Currency Converter",
    "Step-by-step guide to converting currencies and understanding exchange rates."
  );

  const relatedTools = [
    { name: "Tip Calculator", slug: "tip-calculator" },
    { name: "Budget Planner", slug: "budget-planner" },
    { name: "Expense Ratio Calculator", slug: "expense-ratio-calculator" },
    { name: "Travel Budget Calculator", slug: "travel-budget-calculator" },
  ];

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, calculatorSchema, faqSchema, howToSchema]} />
      <ExitIntentCTA />
      <ToolLayout>
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <header className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-white mb-3">Currency Converter</h1>
              <p className="text-text-secondary-light">
                Convert between currencies with exchange rates. Free and instant.
              </p>
            </header>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <NumberInput
                  label="Amount"
                  value={amount}
                  onChange={setAmount}
                  min={0}
                  step={1}
                />
                <label className="block">
                  <span className="block text-sm text-text-secondary-light mb-2">From Currency</span>
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="w-full rounded-xl bg-surface-elevated-light dark:bg-surface-elevated-dark border border-secondary/20 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent/30"
                  >
                    {currencies.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} - {c.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="block text-sm text-text-secondary-light mb-2">To Currency</span>
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="w-full rounded-xl bg-surface-elevated-light dark:bg-surface-elevated-dark border border-secondary/20 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent/30"
                  >
                    {currencies.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} - {c.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="space-y-4">
                <ResultCard title="Conversion Result">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-light">Converted Amount</span>
                      <span className="text-2xl font-bold text-white">
                        {formatCurrency(calc.converted, toCurrency)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Exchange Rate</span>
                      <span className="text-white">
                        1 {fromCurrency} = {calc.rate.toFixed(4)} {toCurrency}
                      </span>
                    </div>
                    <div className="pt-3 border-t border-secondary/20 text-sm text-text-secondary-light">
                      Note: This uses approximate rates. Actual conversions include fees and may vary.
                    </div>
                  </div>
                </ResultCard>

                <FAQ items={faqItems} />
              </div>
            </div>

            <div className="mt-12 max-w-4xl mx-auto">
              <ContentSection title="Introduction">
                <p>
                  Whether you're traveling abroad, making international purchases, or managing foreign investments,
                  understanding currency conversion is essential. Exchange rates determine how much your money is worth in
                  different currencies and directly impact your purchasing power.
                </p>
                <p>
                  This free currency converter helps you convert between major world currencies using approximate
                  exchange rates. It's perfect for travel planning, budget estimation, and understanding currency
                  values.
                </p>
                <p>
                  Use this tool to estimate costs, plan travel budgets, and understand exchange rates. For actual
                  transactions, always check real-time rates and fees from your bank or currency exchange service.
                </p>
              </ContentSection>

              <HowToSection
                title="How to Use the Currency Converter"
                description="Follow these steps to convert currencies:"
                steps={howToSteps}
              />

              <ContentSection title="Understanding Exchange Rates">
                <p>
                  <strong>Exchange Rate:</strong> The rate at which one currency can be exchanged for another. If 1 USD =
                  0.92 EUR, then $100 USD equals 92 EUR. Rates fluctuate constantly based on economic conditions.
                </p>
                <p>
                  <strong>Factors Affecting Rates:</strong> Interest rates, inflation, economic growth, political
                  stability, trade balances, and market speculation all influence exchange rates. Central bank policies
                  also play a major role.
                </p>
                <p>
                  <strong>Bid-Ask Spread:</strong> Banks and exchange services buy currency at one rate (bid) and sell
                  at another (ask). The difference is their profit. This is why you get slightly less when converting
                  than the "market rate" suggests.
                </p>
                <p>
                  <strong>Fees:</strong> In addition to exchange rates, currency conversions include fees: bank fees,
                  credit card foreign transaction fees (typically 3%), ATM fees, and exchange service fees. Always
                  factor in total cost.
                </p>
              </ContentSection>

              <ContentSection title="Tips & Best Practices for Currency Conversion">
                <h3 className="font-semibold text-white mb-2">1. Compare Multiple Sources</h3>
                <p>
                  Exchange rates vary by provider. Compare rates from banks, credit unions, online services, and credit
                  cards. Small differences add up on large amounts.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">2. Avoid Airport Exchanges</h3>
                <p>
                  Airport currency exchanges offer the worst rates and highest fees. Only use in emergencies. Exchange
                  at banks, credit unions, or use ATMs abroad for better rates.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">3. Use Credit Cards with No Foreign Fees</h3>
                <p>
                  Many credit cards charge 3% foreign transaction fees. Use cards with no foreign fees when traveling
                  abroad. You'll get better rates and avoid fees.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">4. Consider Timing</h3>
                <p>
                  Exchange rates fluctuate. If you're planning a large conversion, monitor rates and convert when
                  favorable. However, don't try to time the market—rates are unpredictable.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">5. Factor in All Costs</h3>
                <p>
                  Don't just look at exchange rates. Include all fees: bank fees, transaction fees, ATM fees. The total
                  cost determines the best option, not just the rate.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">6. Use ATMs Abroad</h3>
                <p>
                  Using ATMs abroad often provides better rates than currency exchanges. Use ATMs from major banks and
                  check your bank's foreign ATM fees. Some banks reimburse ATM fees.
                </p>
              </ContentSection>

              <div className="mt-8">
                <ShareButton
                  title="Currency Converter - Free 2025 | Expenvisor"
                  url="/tools/currency-converter"
                  description="Convert between currencies with exchange rates and travel budget calculator."
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
                <h3 className="text-2xl font-bold text-white mb-3">Track Your Travel Expenses with Expenvisor</h3>
                <p className="text-text-secondary-light mb-4">
                  Traveling abroad? Track all your expenses, including currency conversions, with Expenvisor's
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

