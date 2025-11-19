"use client";

import { useState, useMemo } from "react";
import type { Metadata } from "next";
import ToolLayout from "./ToolLayout";
import ToolCard from "./ToolCard";
import { Search } from "lucide-react";
import Link from "next/link";

const tools = [
  // Debt Management
  { title: "Debt Payoff Calculator", slug: "debt-payoff-calculator", desc: "Compare Snowball vs. Avalanche methods and calculate time to debt-free.", category: "Debt Management" },
  { title: "Credit Card Payoff Calculator", slug: "credit-card-payoff-calculator", desc: "Calculate time to pay off credit card debt and see total interest paid.", category: "Debt Management" },
  { title: "Debt-to-Income Ratio Calculator", slug: "debt-to-income-calculator", desc: "Calculate DTI ratio to assess financial health and loan eligibility.", category: "Debt Management" },
  
  // Loans & Mortgages
  { title: "Loan Calculator", slug: "loan-calculator", desc: "Monthly payment and amortization schedule.", category: "Loans & Mortgages" },
  { title: "Mortgage Affordability", slug: "mortgage-affordability", desc: "How much home can you afford?", category: "Loans & Mortgages" },
  { title: "Refinance Calculator", slug: "refinance-calculator", desc: "Calculate refinance savings, break-even point, and compare options.", category: "Loans & Mortgages" },
  { title: "Car Loan Calculator", slug: "car-loan-calculator", desc: "Calculate auto loan payments, total interest, and compare loan options.", category: "Loans & Mortgages" },
  { title: "Bi-Weekly Mortgage Calculator", slug: "bi-weekly-mortgage-calculator", desc: "Calculate savings from bi-weekly payments and see payoff time reduction.", category: "Loans & Mortgages" },
  { title: "APR Calculator", slug: "apr-calculator", desc: "Calculate the true cost of borrowing and compare APR vs. interest rate.", category: "Loans & Mortgages" },
  
  // Retirement & Investment
  { title: "Retirement Savings Calculator", slug: "retirement-savings-calculator", desc: "Project 401(k), IRA, and Roth IRA growth and plan retirement age.", category: "Retirement & Investment" },
  { title: "401(k) Contribution Calculator", slug: "401k-contribution-calculator", desc: "Calculate retirement savings, employer match, and tax savings.", category: "Retirement & Investment" },
  { title: "Investment Return Calculator", slug: "investment-return-calculator", desc: "Calculate ROI, annualized returns, and investment performance.", category: "Retirement & Investment" },
  
  // Savings & Budgeting
  { title: "Compound Interest", slug: "compound-interest", desc: "Growth with contributions and compounding.", category: "Savings & Budgeting" },
  { title: "Savings Goal Planner", slug: "savings-goal-planner", desc: "Monthly target and time-to-goal.", category: "Savings & Budgeting" },
  { title: "Emergency Fund Calculator", slug: "emergency-fund-calculator", desc: "Calculate how much to save for emergencies and plan your safety net.", category: "Savings & Budgeting" },
  { title: "Budget Planner", slug: "budget-planner", desc: "50/30/20 and custom category planning.", category: "Savings & Budgeting" },
  { title: "Expense Ratio Calculator", slug: "expense-ratio-calculator", desc: "Analyze monthly expenses and calculate expense-to-income ratio.", category: "Savings & Budgeting" },
  
  // Business & Freelance
  { title: "Freelance Income Calculator", slug: "freelance-income-calculator", desc: "Calculate taxes, quarterly payments, and after-tax income for self-employed.", category: "Business & Freelance" },
  { title: "Hourly to Salary Converter", slug: "hourly-to-salary-converter", desc: "Convert hourly wage to annual salary and calculate total compensation.", category: "Business & Freelance" },
  { title: "Business Expense Deduction Calculator", slug: "business-expense-deduction-calculator", desc: "Calculate home office, vehicle, and business expense deductions.", category: "Business & Freelance" },
  
  // Advanced Planning
  { title: "Net Worth Calculator", slug: "net-worth-calculator", desc: "Calculate assets vs. liabilities and assess your financial health.", category: "Advanced Planning" },
  { title: "Inflation Calculator", slug: "inflation-calculator", desc: "Calculate purchasing power over time and see how inflation affects your money.", category: "Advanced Planning" },
  { title: "Currency Converter", slug: "currency-converter", desc: "Convert between currencies with exchange rates and travel budget calculator.", category: "Advanced Planning" },
  { title: "Tip Calculator", slug: "tip-calculator", desc: "Calculate restaurant tips, split bills, and service charges.", category: "Advanced Planning" },
  { title: "Income Tax Calculator", slug: "income-tax-calculator", desc: "Estimate taxes with simple assumptions.", category: "Advanced Planning" },
  { title: "HSA Contribution Calculator", slug: "hsa-contribution-calculator", desc: "Calculate HSA contributions, tax savings, and optimize for maximum benefits.", category: "Advanced Planning" },
];

const categories = ["All", "Debt Management", "Loans & Mortgages", "Retirement & Investment", "Savings & Budgeting", "Business & Freelance", "Advanced Planning"];

// Trending tools (most popular)
const trendingTools = [
  "loan-calculator",
  "mortgage-affordability",
  "debt-payoff-calculator",
  "budget-planner",
  "retirement-savings-calculator",
  "compound-interest",
];

export default function ToolsHubPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch = 
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const trendingToolsList = useMemo(() => {
    return tools.filter((tool) => trendingTools.includes(tool.slug));
  }, []);

  const groupedTools = useMemo(() => {
    const grouped: Record<string, typeof tools> = {};
    filteredTools.forEach((tool) => {
      if (!grouped[tool.category]) {
        grouped[tool.category] = [];
      }
      grouped[tool.category].push(tool);
    });
    return grouped;
  }, [filteredTools]);

  return (
    <ToolLayout>
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              <span className="gradient-text">Financial Tools</span>
            </h1>
            <p className="text-text-secondary-dark max-w-2xl mx-auto text-lg">
              Free, privacy-first calculators. Calculate payments, plan savings, and explore scenarios. No sign-up. No tracking. Just answers.
            </p>
          </header>

          {/* Search Bar */}
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary-dark" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-elevated-dark border border-secondary/20 text-white placeholder-text-secondary-light focus:outline-none focus:ring-2 focus:ring-accent/30 text-base"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-8 flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-accent to-secondary text-white shadow-lg"
                    : "bg-surface-elevated-dark text-text-secondary-dark hover:bg-surface-dark"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Trending Section */}
          {searchQuery === "" && selectedCategory === "All" && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-accent">🔥</span> Trending Tools
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {trendingToolsList.map((tool) => (
                  <ToolCard key={tool.slug} title={tool.title} slug={tool.slug} desc={tool.desc} />
                ))}
              </div>
            </div>
          )}

          {/* All Tools by Category */}
          <div className="mb-12">
            {searchQuery !== "" || selectedCategory !== "All" ? (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">
                  {filteredTools.length} {filteredTools.length === 1 ? "Tool" : "Tools"} Found
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredTools.map((tool) => (
                    <ToolCard key={tool.slug} title={tool.title} slug={tool.slug} desc={tool.desc} />
                  ))}
                </div>
              </>
            ) : (
              Object.entries(groupedTools).map(([category, categoryTools]) => (
                <div key={category} className="mb-12">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">{category}</h2>
                    <Link
                      href={`/tools/${category.toLowerCase().replace(/\s+/g, "-").replace("&", "")}`}
                      className="text-accent hover:text-secondary text-sm font-semibold"
                    >
                      View All →
                    </Link>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categoryTools.map((tool) => (
                      <ToolCard key={tool.slug} title={tool.title} slug={tool.slug} desc={tool.desc} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-secondary-dark text-lg mb-4">No tools found matching your search.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-6 py-3 bg-gradient-to-r from-accent to-secondary text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}

          <div className="mt-12 text-center text-text-secondary-dark text-sm">
            Results are estimates for educational purposes. Consult a professional for advice.
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}
