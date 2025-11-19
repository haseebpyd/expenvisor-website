"use client";

import { motion } from "framer-motion";
import {
  Mic,
  Camera,
  MessageCircle,
  Brain,
  BarChart3,
  Moon,
} from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Voice Input",
    description:
      "Add expenses hands-free by simply speaking. Our AI understands natural language and automatically categorizes your expenses.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Camera,
    title: "Receipt Scanner",
    description:
      "Take a photo of any receipt and our advanced OCR technology extracts all relevant information automatically.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: MessageCircle,
    title: "AI Chat",
    description:
      "Ask questions about your spending patterns, get insights, and receive personalized financial advice through our AI chat interface.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Brain,
    title: "AI Financial Advisor",
    description:
      "Get personalized financial insights and recommendations based on your spending patterns and financial goals.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: BarChart3,
    title: "Analytics & Charts",
    description:
      "Comprehensive expense history with beautiful charts, trends analysis, and detailed reporting features.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Moon,
    title: "Dark Mode",
    description:
      "Beautiful, OLED-optimized dark mode that's easy on the eyes and saves battery life.",
    color: "from-gray-500 to-slate-500",
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
            <span className="text-text-primary-dark">Powerful Features</span>
            <br />
            <span className="gradient-text">for Smart Finance</span>
          </h2>
          <p className="text-xl text-text-secondary-dark max-w-3xl mx-auto">
            Everything you need to take control of your finances, powered by
            cutting-edge AI technology.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative p-8 bg-surface-elevated-dark rounded-2xl border border-border-dark hover:border-accent/50 transition-all duration-300 card-hover">
                {/* Icon */}
                <div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-text-primary-dark mb-4">
                  {feature.title}
                </h3>
                <p className="text-text-secondary-dark leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-full border border-accent/20">
            <span className="text-text-secondary-dark">
              And many more features coming soon...
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
