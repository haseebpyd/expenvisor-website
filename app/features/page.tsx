"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Mic,
  Camera,
  Brain,
  Shield,
  Smartphone,
  BarChart3,
  Zap,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: Mic,
      title: "Voice Expense Tracking",
      description:
        "Simply speak your expenses and let AI handle the rest. Our advanced voice recognition technology understands natural language and automatically categorizes your transactions.",
      benefits: [
        "Hands-free expense logging",
        "Natural language processing",
        "Automatic categorization",
        "Multi-language support",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Camera,
      title: "OCR Receipt Scanning",
      description:
        "Take a photo of any receipt and watch as our AI extracts all the important details automatically. No more manual data entry or lost receipts.",
      benefits: [
        "Instant receipt digitization",
        "Automatic data extraction",
        "Smart categorization",
        "Tax-ready reports",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description:
        "Get intelligent financial insights and predictions based on your spending patterns. Our AI learns from your behavior to provide personalized recommendations.",
      benefits: [
        "Spending pattern analysis",
        "Budget recommendations",
        "Expense predictions",
        "Smart alerts",
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Visualize your financial data with beautiful charts and graphs. Track trends, identify opportunities, and make informed financial decisions.",
      benefits: [
        "Interactive dashboards",
        "Customizable reports",
        "Trend analysis",
        "Export capabilities",
      ],
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description:
        "Your financial data is protected with enterprise-grade security. We use 256-bit encryption and never store your banking credentials.",
      benefits: [
        "256-bit encryption",
        "Secure data storage",
        "Privacy protection",
        "Regular security audits",
      ],
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Smartphone,
      title: "Cross-Platform Sync",
      description:
        "Access your financial data anywhere, anytime. Seamlessly sync across all your devices with real-time updates and offline support.",
      benefits: [
        "Real-time synchronization",
        "Offline functionality",
        "Multi-device access",
        "Automatic backups",
      ],
      color: "from-gray-500 to-slate-500",
    },
  ];

  return (
      <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-secondary-dark">
        <Navbar />

        <main className="relative z-10 pt-20">
          {/* Hero Section */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
                >
                  Powerful <span className="gradient-text">Features</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-xl text-text-secondary-dark max-w-3xl mx-auto"
                >
                  Discover how Expenvisor's AI-powered features can transform
                  your personal finance management and make expense tracking
                  effortless.
                </motion.p>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="relative p-8 bg-surface-elevated-dark rounded-2xl border border-border-dark hover:border-accent/50 transition-all duration-300 card-hover">
                      {/* Icon with gradient background */}
                      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-semibold text-text-primary-dark mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-text-secondary-dark leading-relaxed mb-6">
                        {feature.description}
                      </p>

                      {/* Benefits list with checkmarks */}
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <li
                            key={benefitIndex}
                            className="flex items-center gap-2 text-sm text-text-secondary-dark"
                          >
                            <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Hover Effect Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-6">
                  How It Works
                </h2>
                <p className="text-lg text-text-secondary-dark max-w-3xl mx-auto">
                  Getting started with Expenvisor is simple. Follow these three
                  easy steps to begin your journey toward smarter financial
                  management.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    Download & Setup
                  </h3>
                  <p className="text-text-secondary-dark">
                    Download Expenvisor from the App Store or Google Play.
                    Create your account in seconds with our simple onboarding
                    process.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    Start Tracking
                  </h3>
                  <p className="text-text-secondary-dark">
                    Use voice commands, scan receipts, or manually add expenses.
                    Our AI learns from your patterns and gets smarter over time.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    Get Insights
                  </h3>
                  <p className="text-text-secondary-dark">
                    View detailed analytics, receive smart recommendations, and
                    make informed financial decisions with AI-powered insights.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl font-bold text-white mb-6">
                    Why Choose Expenvisor?
                  </h2>
                  <p className="text-lg text-text-secondary-dark mb-8">
                    Expenvisor isn't just another expense tracker. It's an
                    intelligent financial assistant that learns from your
                    behavior and adapts to your unique needs, making money
                    management effortless and effective.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Zap className="w-6 h-6 text-accent mt-1" />
                      <div>
                        <h3 className="font-semibold text-white mb-2">
                          Lightning Fast
                        </h3>
                        <p className="text-text-secondary-dark">
                          Log expenses in seconds with voice commands or receipt
                          scanning. No more tedious manual entry.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Brain className="w-6 h-6 text-accent mt-1" />
                      <div>
                        <h3 className="font-semibold text-white mb-2">
                          AI-Powered
                        </h3>
                        <p className="text-text-secondary-dark">
                          Our advanced AI learns from your spending patterns to
                          provide personalized insights and recommendations.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Shield className="w-6 h-6 text-accent mt-1" />
                      <div>
                        <h3 className="font-semibold text-white mb-2">
                          Secure & Private
                        </h3>
                        <p className="text-text-secondary-dark">
                          Bank-level security protects your financial data. We
                          never share your information with third parties.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-surface-elevated-dark rounded-2xl p-8 shadow-2xl"
                >
                  <h3 className="text-2xl font-bold text-text-primary-dark mb-6">
                    Key Statistics
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary-dark">
                        Time Saved per Month
                      </span>
                      <span className="text-2xl font-bold text-accent">
                        5+ Hours
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary-dark">
                        Accuracy Rate
                      </span>
                      <span className="text-2xl font-bold text-accent">
                        99.2%
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary-dark">
                        User Satisfaction
                      </span>
                      <span className="text-2xl font-bold text-accent">
                        4.9/5
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary-dark">
                        Active Users
                      </span>
                      <span className="text-2xl font-bold text-accent">
                        10K+
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-surface-elevated-dark rounded-2xl p-12 text-center shadow-2xl"
              >
                <h2 className="text-3xl font-bold text-text-primary-dark mb-6">
                  Ready to Experience the Future of Expense Tracking?
                </h2>
                <p className="text-lg text-text-secondary-dark mb-8 max-w-2xl mx-auto">
                  Join thousands of users who are already using Expenvisor to
                  take control of their finances with AI-powered expense
                  tracking.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/download"
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-accent to-secondary text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[44px]"
                  >
                    Download Expenvisor
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                  <a
                    href="/pricing"
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-accent text-accent rounded-xl font-semibold text-lg hover:bg-accent hover:text-white transition-all duration-300 min-h-[44px]"
                  >
                    View Pricing
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
