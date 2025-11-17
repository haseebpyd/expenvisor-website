"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Download, Smartphone, Apple, Play, CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-secondary-dark">
      <Navbar />

      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <div className="inline-flex p-6 bg-gradient-to-r from-accent to-secondary rounded-3xl mb-6">
                  <Download className="w-16 h-16 text-white" />
                </div>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
              >
                Download <span className="gradient-text">Expenvisor</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-text-secondary-light max-w-3xl mx-auto mb-12"
              >
                Get started with the smartest AI-powered expense tracker. Available on iOS and Android.
              </motion.p>

              {/* Download Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              >
                <a
                  href="https://apps.apple.com/pk/app/expenvisor-ai-expense-tracker/id6754627757"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-4 px-8 py-5 bg-black text-white rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-accent/20 transition-all duration-300 min-h-[70px] min-w-[200px] justify-center"
                >
                  <Apple className="w-8 h-8" />
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Download on the</div>
                    <div className="text-xl">App Store</div>
                  </div>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="https://play.google.com/store/apps/details?id=com.expenvisor.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-4 px-8 py-5 bg-black text-white rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-accent/20 transition-all duration-300 min-h-[70px] min-w-[200px] justify-center"
                >
                  <Play className="w-8 h-8" />
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Get it on</div>
                    <div className="text-xl">Google Play</div>
                  </div>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Why Download Expenvisor?
              </h2>
              <p className="text-lg text-text-secondary-light max-w-3xl mx-auto">
                Join thousands of users who are already using Expenvisor to take control of their finances.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Smartphone,
                  title: "Free to Download",
                  description: "Download and start tracking expenses for free. Upgrade to Pro for advanced features.",
                },
                {
                  icon: CheckCircle,
                  title: "No Credit Card Required",
                  description: "Start using Expenvisor immediately. No sign-up fees or hidden charges.",
                },
                {
                  icon: Download,
                  title: "Available on All Devices",
                  description: "Works seamlessly on iPhone, iPad, and Android devices. Sync across all your devices.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-2xl p-8 text-center"
                >
                  <div className="inline-flex p-4 bg-gradient-to-r from-accent to-secondary rounded-2xl mb-6">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-text-secondary-light">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-2xl p-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                What&apos;s Included
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "AI-powered voice expense tracking",
                  "OCR receipt scanning",
                  "Unlimited AI chat co-pilot",
                  "Advanced analytics and insights",
                  "Multi-language support",
                  "Bank-level security",
                  "Export to CSV/JSON",
                  "Customizable categories",
                  "Budget planning tools",
                  "Real-time sync across devices",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-text-secondary-light text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* System Requirements */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                System Requirements
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Apple className="w-10 h-10 text-white" />
                  <h3 className="text-2xl font-bold text-white">iOS</h3>
                </div>
                <ul className="space-y-3 text-text-secondary-light">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <span>iOS 15.0 or later</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <span>iPhone, iPad, or iPod touch</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <span>Requires internet connection for AI features</span>
                  </li>
                </ul>
              </div>

              <div className="bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Play className="w-10 h-10 text-white" />
                  <h3 className="text-2xl font-bold text-white">Android</h3>
                </div>
                <ul className="space-y-3 text-text-secondary-light">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <span>Android 8.0 (API level 26) or later</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <span>All Android devices</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <span>Requires internet connection for AI features</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-accent/20 to-secondary/20 rounded-2xl p-12 text-center border border-accent/30"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-text-secondary-light mb-8">
                Download Expenvisor now and start tracking your expenses smarter, faster, and easier.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://apps.apple.com/pk/app/expenvisor-ai-expense-tracker/id6754627757"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-secondary text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[44px]"
                >
                  <Apple className="w-5 h-5" />
                  Download for iOS
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.expenvisor.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-secondary text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[44px]"
                >
                  <Play className="w-5 h-5" />
                  Download for Android
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

