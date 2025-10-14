"use client";

import { motion } from "framer-motion";
import {
  Mic,
  Camera,
  MessageCircle,
  Lightbulb,
  BarChart3,
  Moon,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { GlassContainer, HolographicCard, HexagonContainer } from "./ui";

export default function Features() {
  const features = [
    {
      icon: Mic,
      title: "Voice Input",
      description:
        "Add expenses by simply speaking. Our AI understands natural language and automatically categorizes your spending.",
      glowColor: "#00D9FF",
      benefits: [
        "Natural language processing",
        "Automatic categorization",
        "Hands-free tracking",
      ],
    },
    {
      icon: Camera,
      title: "Receipt Scanner",
      description:
        "Scan receipts with AI OCR technology. Automatically extract amounts, dates, and merchant information.",
      glowColor: "#A78BFA",
      benefits: ["AI-powered OCR", "Auto-extract data", "Smart categorization"],
    },
    {
      icon: MessageCircle,
      title: "AI Chat",
      description:
        "Ask questions about your spending patterns. Get instant insights and recommendations from our AI assistant.",
      glowColor: "#00FFA3",
      benefits: [
        "24/7 AI assistant",
        "Spending insights",
        "Personalized advice",
      ],
    },
    {
      icon: Lightbulb,
      title: "AI Advisor",
      description:
        "Get personalized financial insights and tips. Our AI learns your habits and suggests ways to save money.",
      glowColor: "#FFD93D",
      benefits: ["Smart recommendations", "Habit tracking", "Savings tips"],
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description:
        "Visual charts and trends help you understand your spending. Track progress towards your financial goals.",
      glowColor: "#FF6B9D",
      benefits: ["Visual reports", "Trend analysis", "Goal tracking"],
    },
    {
      icon: Moon,
      title: "Dark Mode",
      description:
        "Beautiful interface in any light. Switch between light and dark themes for comfortable viewing.",
      glowColor: "#00D9FF",
      benefits: ["Eye-friendly design", "Auto-switch", "Custom themes"],
    },
  ];

  return (
    <section
      id="features"
      className="py-24 bg-surface w-full overflow-x-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center space-x-2 glass-effect text-accent-cyan px-4 py-2 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4" />
            <span>Why Choose Expenvisor</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
            <span className="text-text-primary">Powerful Features</span>
            <br />
            <span className="holographic-text">for Smart Finance</span>
          </h2>

          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Everything you need to take control of your finances, powered by
            artificial intelligence
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 mt-12 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <GlassContainer className="p-8 hover:border-accent-cyan/30 transition-all duration-300 group-hover:-translate-y-2 h-full mx-2">
                  {/* Icon */}
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                    <HexagonContainer
                      size={64}
                      glowColor={feature.glowColor}
                      variant="filled"
                    >
                      <Icon size={32} className="text-white" />
                    </HexagonContainer>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-text-primary">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Benefits List */}
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <li
                          key={idx}
                          className="flex items-center space-x-2 text-sm text-text-tertiary"
                        >
                          <CheckCircle className="w-4 h-4 text-accent-cyan flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlassContainer>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-holographic rounded-3xl p-8 md:p-12 shadow-[0_8px_32px_rgba(0,217,255,0.2)]"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Trusted by Thousands
            </h3>
            <p className="text-xl text-text-secondary">
              Join our growing community of smart spenders
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent-cyan mb-2">
                10K+
              </div>
              <div className="text-text-secondary">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent-purple mb-2">
                $2M+
              </div>
              <div className="text-text-secondary">Money Saved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent-mint mb-2">
                4.9★
              </div>
              <div className="text-text-secondary">App Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent-yellow mb-2">
                50K+
              </div>
              <div className="text-text-secondary">Receipts Scanned</div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <HolographicCard className="p-8 md:p-12 text-text-primary relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-white/5 rounded-3xl" />
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold font-display mb-6">
                Ready to Transform Your Finances?
              </h3>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of users who are already saving money and
                achieving their financial goals with Expenvisor.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href="#download"
                  className="bg-text-primary text-bg-primary px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2 focus-visible min-h-[44px]"
                  aria-label="Start free trial of Expenvisor"
                >
                  <CheckCircle size={20} />
                  <span>Start Free Trial</span>
                </a>
                <a
                  href="/features"
                  className="border-2 border-text-primary text-text-primary px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-text-primary hover:text-bg-primary transition-all duration-300 flex items-center space-x-2 focus-visible min-h-[44px]"
                  aria-label="Learn more about Expenvisor features"
                >
                  <ArrowRight size={20} />
                  <span>Learn More</span>
                </a>
              </div>
            </div>
          </HolographicCard>
        </motion.div>
      </div>
    </section>
  );
}
