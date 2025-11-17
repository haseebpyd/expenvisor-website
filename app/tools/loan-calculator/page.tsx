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

type Row = { month: number; interest: number; principal: number; balance: number };

function amortize(amount: number, annualRate: number, months: number): { payment: number; rows: Row[]; totalInterest: number } {
  const r = annualRate / 100 / 12;
  const payment = r === 0 ? amount / months : (amount * r) / (1 - Math.pow(1 + r, -months));
  let balance = amount;
  const rows: Row[] = [];
  let totalInterest = 0;
  for (let m = 1; m <= months; m++) {
    const interest = balance * r;
    const principal = Math.min(payment - interest, balance);
    balance = Math.max(0, balance - principal);
    totalInterest += interest;
    rows.push({ month: m, interest, principal, balance });
  }
  return { payment, rows, totalInterest };
}

function toCurrency(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

export default function LoanCalculatorPage() {
  const [amount, setAmount] = useState(20000);
  const [rate, setRate] = useState(6.5);
  const [termYears, setTermYears] = useState(5);

  const months = Math.max(1, Math.round(termYears * 12));
  const calc = useMemo(() => amortize(amount, rate, months), [amount, rate, months]);

  const csv = useMemo(() => {
    const header = "Month,Interest,Principal,Balance\n";
    const body = calc.rows
      .map((r) => `${r.month},${r.interest.toFixed(2)},${r.principal.toFixed(2)},${r.balance.toFixed(2)}`)
      .join("\n");
    return header + body;
  }, [calc.rows]);

  const downloadCSV = () => {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "amortization.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const faqItems = [
    {
      question: "How is the monthly payment calculated?",
      answer:
        "We use the standard amortization formula: P = [r × PV × (1 + r)^n] / [(1 + r)^n - 1], where P is payment, r is monthly interest rate (annual rate divided by 12), PV is the loan amount (present value), and n is the number of monthly payments. This formula ensures that each payment covers both interest and principal, with the loan fully paid off by the end of the term.",
    },
    {
      question: "What is an amortization schedule?",
      answer:
        "An amortization schedule is a table that shows how each loan payment is split between principal and interest over the life of the loan. Early payments primarily cover interest, while later payments go more toward reducing the principal balance. This schedule helps you understand exactly how much you'll pay in interest over time.",
    },
    {
      question: "Can I export the amortization schedule?",
      answer:
        "Yes! Click the 'Download CSV' button to export the complete amortization schedule as a CSV file. You can then open it in Excel, Google Sheets, or any spreadsheet software to analyze your payment schedule, create charts, or use it for financial planning.",
    },
    {
      question: "What's the difference between APR and interest rate?",
      answer:
        "The interest rate is the cost of borrowing the principal amount. APR (Annual Percentage Rate) includes the interest rate plus any additional fees or costs associated with the loan. For comparison purposes, APR gives you a more accurate picture of the total cost of borrowing. Our calculator uses the interest rate you provide.",
    },
    {
      question: "How does the loan term affect my payments?",
      answer:
        "A longer loan term (e.g., 30 years vs. 15 years) results in lower monthly payments but higher total interest paid over the life of the loan. A shorter term means higher monthly payments but less total interest. Use this calculator to compare different term options and find the balance that works for your budget.",
    },
    {
      question: "Can I calculate different types of loans with this calculator?",
      answer:
        "Yes! This calculator works for any type of amortizing loan, including personal loans, auto loans, student loans, and mortgages. Simply enter the loan amount, interest rate, and term to get your payment schedule. Note that some loans may have additional fees not included in this calculation.",
    },
    {
      question: "What if I want to make extra payments?",
      answer:
        "This calculator shows the standard payment schedule. If you plan to make extra payments, you'll pay off the loan faster and save on interest. To see the impact of extra payments, you'd need to recalculate with a shorter term or use a specialized prepayment calculator.",
    },
    {
      question: "Is the interest rate fixed or variable?",
      answer:
        "This calculator assumes a fixed interest rate. If you have a variable-rate loan, your payments may change over time. For variable-rate loans, use the current rate as an estimate, but be aware that your actual payments may fluctuate.",
    },
    {
      question: "How accurate are these calculations?",
      answer:
        "Our calculations use standard financial formulas and are mathematically accurate. However, actual loan terms may include additional fees, points, or other costs not reflected here. Always consult with your lender for exact payment amounts and terms.",
    },
    {
      question: "Can I use this for refinancing calculations?",
      answer:
        "Yes, you can use this calculator to estimate payments on a refinanced loan. Enter the new loan amount (which may be different from your original loan if you're cashing out or paying closing costs), the new interest rate, and the new term to see your new payment schedule.",
    },
    {
      question: "What happens if I miss a payment?",
      answer:
        "This calculator shows the ideal payment schedule. Missing payments can result in late fees, increased interest, and damage to your credit score. If you're struggling to make payments, contact your lender immediately to discuss options like deferment or loan modification.",
    },
    {
      question: "How do I reduce the total interest I pay?",
      answer:
        "To reduce total interest: (1) Choose a shorter loan term if you can afford higher monthly payments, (2) Make extra principal payments when possible, (3) Refinance to a lower interest rate if rates have dropped, or (4) Make bi-weekly payments instead of monthly (effectively making one extra payment per year).",
    },
  ];

  const howToSteps = [
    {
      number: 1,
      title: "Enter Loan Amount",
      description:
        "Input the total amount you're borrowing. This is the principal that you'll be paying back over the loan term.",
    },
    {
      number: 2,
      title: "Enter Interest Rate",
      description:
        "Enter the annual interest rate (APR) as a percentage. For example, if your rate is 6.5%, enter 6.5. This is the annual rate, which will be converted to a monthly rate for calculations.",
    },
    {
      number: 3,
      title: "Enter Loan Term",
      description:
        "Specify the loan term in years. Common terms are 15 or 30 years for mortgages, 3-7 years for auto loans, and 1-5 years for personal loans. The calculator will convert this to months automatically.",
    },
    {
      number: 4,
      title: "Review Results",
      description:
        "The calculator will instantly show your monthly payment, total interest over the life of the loan, and a complete amortization schedule showing how each payment is allocated.",
    },
    {
      number: 5,
      title: "Export Schedule (Optional)",
      description:
        "Click 'Download CSV' to export the full amortization schedule to a spreadsheet for further analysis or record-keeping.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Loan Calculator", url: "/tools/loan-calculator" },
  ]);

  const calculatorSchema = generateCalculatorSchema(
    "Loan Calculator",
    "Free loan calculator to estimate monthly payments, total interest, and view complete amortization schedule.",
    "/tools/loan-calculator",
    "Loan Calculator"
  );

  const faqSchema = generateFAQSchema(faqItems);
  const howToSchema = generateHowToSchema(
    howToSteps,
    "How to Use the Loan Calculator",
    "Step-by-step guide to calculating loan payments and viewing amortization schedules."
  );

  const relatedTools = [
    { name: "Mortgage Affordability Calculator", slug: "mortgage-affordability" },
    { name: "Debt Payoff Calculator", slug: "debt-payoff-calculator" },
    { name: "Refinance Calculator", slug: "refinance-calculator" },
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
              <h1 className="text-4xl font-bold text-white mb-3">Loan Calculator</h1>
              <p className="text-text-secondary-light">
                Estimate monthly payment and view an amortization schedule. Free, instant, and private.
              </p>
            </header>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <NumberInput label="Loan Amount" value={amount} onChange={setAmount} min={0} step={100} suffix="$" />
              <NumberInput label="Interest Rate (APR)" value={rate} onChange={setRate} min={0} step={0.1} suffix="%" />
              <NumberInput label="Term (years)" value={termYears} onChange={setTermYears} min={0.5} step={0.5} />

              <div className="flex gap-3">
                <button
                  onClick={downloadCSV}
                  className="px-4 py-3 bg-gradient-to-r from-accent to-secondary text-white rounded-xl font-semibold btn-hover"
                >
                  Download CSV
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <ResultCard title="Results">
                <div className="space-y-2">
                  <div className="flex justify-between"><span>Monthly Payment</span><span>{toCurrency(calc.payment)}</span></div>
                  <div className="flex justify-between"><span>Total Interest</span><span>{toCurrency(calc.totalInterest)}</span></div>
                  <div className="flex justify-between"><span>Term</span><span>{months} months</span></div>
                </div>
              </ResultCard>

              <div className="bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-2xl p-4 shadow-2xl overflow-auto max-h-[420px]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-text-secondary-light">
                      <th className="py-2 pr-4">Month</th>
                      <th className="py-2 pr-4">Interest</th>
                      <th className="py-2 pr-4">Principal</th>
                      <th className="py-2">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calc.rows.map((r) => (
                      <tr key={r.month} className="border-t border-secondary/10 text-text-secondary-light">
                        <td className="py-2 pr-4">{r.month}</td>
                        <td className="py-2 pr-4">{toCurrency(r.interest)}</td>
                        <td className="py-2 pr-4">{toCurrency(r.principal)}</td>
                        <td className="py-2">{toCurrency(r.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            <FAQ items={faqItems} />

            <p className="text-xs text-text-secondary-light mt-4">
              Disclaimer: Results are estimates for educational purposes and may not reflect your lender's terms.
            </p>
          </div>
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <ContentSection title="Introduction">
            <p>
              A loan calculator is an essential tool for anyone considering borrowing money, whether for a mortgage, auto
              loan, personal loan, or any other type of financing. Understanding your monthly payment, total interest
              cost, and how your loan balance decreases over time is crucial for making informed financial decisions.
            </p>
            <p>
              This free loan calculator helps you estimate your monthly payments and view a complete amortization
              schedule before you commit to a loan. It's perfect for comparing different loan options, understanding the
              true cost of borrowing, and planning your budget accordingly.
            </p>
            <p>
              Whether you're a first-time homebuyer, looking to refinance, or considering a personal loan, this tool
              provides instant, accurate calculations with no sign-up required and complete privacy.
            </p>
          </ContentSection>

          <HowToSection
            title="How to Use the Loan Calculator"
            description="Follow these simple steps to calculate your loan payments and view your amortization schedule:"
            steps={howToSteps}
          />

          <ContentSection title="Loan Payment Formula Explained">
            <p>
              The monthly payment for an amortizing loan is calculated using the standard amortization formula:
            </p>
            <div className="bg-surface-dark rounded-lg p-4 my-4 font-mono text-sm">
              <p className="text-white mb-2">P = [r × PV × (1 + r)^n] / [(1 + r)^n - 1]</p>
              <div className="text-text-secondary-light space-y-1 text-xs">
                <p>Where:</p>
                <p>P = Monthly Payment</p>
                <p>r = Monthly Interest Rate (Annual Rate ÷ 12)</p>
                <p>PV = Present Value (Loan Amount)</p>
                <p>n = Number of Monthly Payments (Term in Years × 12)</p>
              </div>
            </div>
            <p>
              This formula ensures that each payment covers both interest and principal, with early payments primarily
              covering interest and later payments going more toward principal reduction. The loan is fully paid off by
              the end of the term.
            </p>
            <p>
              For example, a $20,000 loan at 6.5% APR for 5 years results in a monthly payment of approximately $391.
              Over the 60-month term, you'll pay about $3,460 in total interest, bringing your total repayment to
              $23,460.
            </p>
          </ContentSection>

          <ContentSection title="Tips & Best Practices">
            <h3 className="font-semibold text-white mb-2">1. Compare Multiple Scenarios</h3>
            <p>
              Try different loan terms and interest rates to see how they affect your monthly payment and total
              interest. A longer term means lower monthly payments but more interest over time.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">2. Consider Your Budget</h3>
            <p>
              Make sure your monthly payment fits comfortably within your budget. Financial experts recommend keeping
              total debt payments (including this loan) below 36% of your gross monthly income.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">3. Factor in Additional Costs</h3>
            <p>
              Remember that this calculator shows principal and interest only. Your actual monthly payment may include
              property taxes, insurance, PMI (for mortgages), or other fees. Always get a complete quote from your
              lender.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">4. Understand the Amortization Schedule</h3>
            <p>
              Review the schedule to see how much interest you'll pay over time. Early payments are mostly interest,
              which is why making extra principal payments early can significantly reduce total interest.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">5. Use for Refinancing Decisions</h3>
            <p>
              Compare your current loan payments with potential refinance terms. Consider closing costs and how long
              you'll stay in the home to determine if refinancing makes financial sense.
            </p>
          </ContentSection>

          <div className="mt-8">
            <ShareButton
              title="Loan Calculator - Free 2025 | Expenvisor"
              url="/tools/loan-calculator"
              description="Calculate loan payments and view complete amortization schedule. Free, instant, and private."
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
            <h3 className="text-2xl font-bold text-white mb-3">Track Your Loan Payments with Expenvisor</h3>
            <p className="text-text-secondary-light mb-4">
              Calculated your loan payment? Track it and all your expenses effortlessly with Expenvisor's AI-powered
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


