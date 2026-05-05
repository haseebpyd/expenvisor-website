"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Team() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-secondary-dark" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          >
            <span className="text-white">Built by One</span>
            <br />
            <span className="gradient-text">Developer</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg lg:text-xl text-text-secondary-dark max-w-2xl mx-auto"
          >
            No big company. No bloated team. Just one developer who wanted a
            better way to track money — and built it.
          </motion.p>
        </motion.div>

        {/* Founder Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-surface-dark/60 backdrop-blur-sm rounded-3xl border border-accent/20 overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-center gap-0 md:gap-0">
            {/* Photo */}
            <div className="w-full md:w-72 h-72 md:h-auto md:self-stretch relative flex-shrink-0">
              <Image
                src="/team_photos/Muhammad_Haseeb.jpeg"
                alt="Muhammad Haseeb — Founder of Expenvisor"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 288px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/0" />
            </div>

            {/* Content */}
            <div className="p-8 sm:p-10 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/30 rounded-full text-xs text-accent font-medium mb-5">
                Founder & Developer
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Muhammad Haseeb
              </h3>

              <p className="text-text-secondary-dark leading-relaxed mb-6">
                "I got tired of expense apps that were either too simple or cost
                $15/month. So I built Expenvisor — everything I actually needed,
                without the bloat. Voice input, receipt scanning, AI insights,
                ledgers, multi-currency support. It started as a personal tool.
                Now it's on the App Store for everyone."
              </p>

              <div className="flex flex-wrap gap-3 text-sm text-text-secondary-dark mb-6">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  Swift / SwiftUI
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  Firebase
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  Groq AI
                </span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://apps.apple.com/us/app/expenvisor-ai-expense-tracker/id6754627757"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-accent to-secondary text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  Download the App
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Why indie builds trust */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center"
        >
          {[
            { label: "Direct support", desc: "You're talking to the person who built it" },
            { label: "Fast updates", desc: "No corporate approval chains" },
            { label: "Your data, private", desc: "No investors to answer to" },
          ].map((item, i) => (
            <div
              key={i}
              className="p-5 bg-white/5 rounded-2xl border border-white/10"
            >
              <div className="text-white font-semibold mb-1">{item.label}</div>
              <div className="text-sm text-text-secondary-dark">{item.desc}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
