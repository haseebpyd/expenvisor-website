"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const techStack = [
  { name: "Swift & SwiftUI", desc: "Native iOS, built for performance" },
  { name: "Firebase", desc: "Auth + Firestore cloud sync" },
  { name: "Groq AI", desc: "llama-3.3-70b for chat, Whisper for voice" },
  { name: "StoreKit 2", desc: "Subscriptions & in-app purchases" },
];

const milestones = [
  { year: "2024", event: "Started building Expenvisor as a personal project" },
  { year: "2024", event: "Added voice input and receipt scanning" },
  { year: "2025", event: "Launched on the App Store" },
  { year: "2025", event: "Added ledgers, recurring payments, and cloud sync" },
  { year: "2026", event: "Pro subscription with unlimited AI features" },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-secondary-dark">
      <Navbar />

      <main className="relative z-10 pt-20">
        {/* Hero */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-white">The Person</span>
                <br />
                <span className="gradient-text">Behind Expenvisor</span>
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary-dark max-w-2xl mx-auto">
                Expenvisor is indie software — one developer, one vision, and a
                genuine belief that personal finance tools should be powerful
                without being expensive.
              </p>
            </motion.div>

            {/* Founder Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-surface-dark/60 backdrop-blur-sm rounded-3xl border border-accent/20 overflow-hidden mb-12"
            >
              <div className="flex flex-col md:flex-row items-stretch">
                {/* Photo */}
                <div className="w-full md:w-80 h-80 relative flex-shrink-0">
                  <Image
                    src="/team_photos/Muhammad_Haseeb.jpeg"
                    alt="Muhammad Haseeb — Founder of Expenvisor"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 320px"
                    priority
                  />
                </div>

                {/* Content */}
                <div className="p-8 sm:p-10 flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/30 rounded-full text-xs text-accent font-medium mb-5">
                    Founder & Solo Developer
                  </div>

                  <h2 className="text-3xl font-bold text-white mb-1">
                    Muhammad Haseeb
                  </h2>
                  <p className="text-text-secondary-dark text-sm mb-6">
                    iOS Developer · Pakistan
                  </p>

                  <blockquote className="text-text-secondary-dark leading-relaxed mb-6 border-l-2 border-accent/40 pl-4 italic">
                    "I built Expenvisor because every other expense tracker I
                    tried was either too basic or locked the useful features
                    behind expensive plans. I wanted voice input, receipt
                    scanning, ledgers for tracking who owes me money, and real
                    AI chat — not marketing AI. So I built it. It took months
                    of nights and weekends, but here it is."
                  </blockquote>

                  <div className="flex flex-wrap gap-2">
                    {["Swift", "SwiftUI", "Firebase", "Groq AI", "StoreKit"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-text-secondary-dark"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Story section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                How it started
              </h2>
              <div className="space-y-6 text-text-secondary-dark leading-relaxed">
                <p>
                  Like a lot of indie apps, Expenvisor started as a personal
                  frustration. Haseeb was tracking his own expenses in
                  spreadsheets and trying various apps — most were either
                  stripped-down free tiers or expensive subscriptions that felt
                  overkill for one person.
                </p>
                <p>
                  He wanted something that worked the way he actually spent
                  money: quickly, across multiple currencies, with voice entry
                  when his hands were full, and receipt scanning when he
                  collected paper receipts. He also wanted to track informal
                  loans (the "hey, I covered dinner, you owe me" kind) and
                  recurring bills in one place.
                </p>
                <p>
                  So he built it. Expenvisor is a native iOS app, fully offline
                  capable, with optional cloud sync. The AI is real — powered by
                  Groq's llama model for chat and Whisper for voice. No
                  gimmicks.
                </p>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
                Timeline
              </h2>
              <div className="relative border-l-2 border-accent/20 pl-8 space-y-8">
                {milestones.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute -left-10 top-1 w-4 h-4 rounded-full bg-accent/40 border-2 border-accent" />
                    <div className="text-accent text-xs font-mono font-bold mb-1">
                      {m.year}
                    </div>
                    <div className="text-white">{m.event}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
                What it's built with
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {techStack.map((t, i) => (
                  <div
                    key={i}
                    className="p-5 bg-surface-dark/50 rounded-2xl border border-white/10"
                  >
                    <div className="text-white font-semibold mb-1">{t.name}</div>
                    <div className="text-sm text-text-secondary-dark">
                      {t.desc}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center p-8 bg-surface-dark/40 rounded-3xl border border-accent/20"
            >
              <h3 className="text-2xl font-bold text-white mb-3">
                Questions? Just ask.
              </h3>
              <p className="text-text-secondary-dark mb-6">
                There's no support team. If you email, you're emailing the
                developer directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:haseeb@alrighttech.com"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-accent to-secondary text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Email Haseeb
                </a>
                <a
                  href="https://apps.apple.com/us/app/expenvisor-ai-expense-tracker/id6754627757"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  Download the App
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
