"use client";

import { motion } from "framer-motion";
import {
  Mic,
  Camera,
  MessageCircle,
  BarChart3,
  RefreshCw,
  Globe,
  BookOpen,
  UploadCloud,
  TrendingUp,
  PenLine,
  ArrowLeftRight,
  CalendarRange,
} from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Voice Entry",
    description:
      'Say "spent $12 on lunch" and it\'s logged instantly. No tapping, no typing — powered by Whisper voice recognition.',
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Camera,
    title: "Receipt Scanning",
    description:
      "Photograph any receipt. AI reads the merchant, amount, and date, and adds the transaction for you.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: MessageCircle,
    title: "AI Chat",
    description:
      "Ask real questions: \"How much did I spend on food last month?\" or \"Am I on track to save $500 this month?\"",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: PenLine,
    title: "Manual Log",
    description:
      "Add expenses and income manually with full control — category, notes, date, and amount.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: BarChart3,
    title: "Analytics & Charts",
    description:
      "Line and bar charts for income, expenses, and savings rate. Weekly, monthly, bimonthly, and yearly views.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: TrendingUp,
    title: "Savings Rate Tracking",
    description:
      "Track your income vs. expenses and see your actual savings rate over time. Compare year over year.",
    color: "from-teal-500 to-green-500",
  },
  {
    icon: BookOpen,
    title: "Ledger / Debt Tracker",
    description:
      'Track who you\'ve lent money to and who owes you. Log what was spent on each ledger ("paid for dinner", "repaid $50").',
    color: "from-rose-500 to-red-500",
  },
  {
    icon: RefreshCw,
    title: "Recurring Payments",
    description:
      "Set up subscriptions, rent, and regular bills once. They log automatically so you never miss a recurring expense.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Globe,
    title: "All Currencies & Languages",
    description:
      "180+ currencies supported with live conversion. Full app localization across all major world languages.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: CalendarRange,
    title: "Full Transaction History",
    description:
      "Daily, weekly, monthly, and all-time views. Filter, search, and scroll back through every transaction.",
    color: "from-sky-500 to-indigo-500",
  },
  {
    icon: ArrowLeftRight,
    title: "Import & Export",
    description:
      "Export your data as CSV or PDF. Import from other apps. Your data is yours — always.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: UploadCloud,
    title: "Cloud Backup & Sync",
    description:
      "Encrypted backup to Firebase. Restore your data on any device, or keep it local-only if you prefer.",
    color: "from-emerald-500 to-teal-500",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-text-primary-dark">Everything You Need.</span>
            <br />
            <span className="gradient-text">Nothing You Don't.</span>
          </h2>
          <p className="text-xl text-text-secondary-dark max-w-3xl mx-auto">
            Built feature by feature based on what actually matters for tracking
            real money — not a feature checklist designed by a marketing team.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative p-8 bg-surface-elevated-dark rounded-2xl border border-border-dark hover:border-accent/50 transition-all duration-300 card-hover h-full">
                {/* Icon */}
                <div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-text-primary-dark mb-3">
                  {feature.title}
                </h3>
                <p className="text-text-secondary-dark leading-relaxed text-sm">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-full border border-accent/20">
            <span className="text-text-secondary-dark text-sm">
              More features added regularly based on real user feedback
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
