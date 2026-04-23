"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Users, Target, Lightbulb, Heart, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
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
                  About <span className="gradient-text">Expenvisor</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-xl text-text-secondary-dark max-w-3xl mx-auto"
                >
                  We're on a mission to revolutionize personal finance
                  management through the power of artificial intelligence,
                  making expense tracking effortless and financial insights
                  accessible to everyone.
                </motion.p>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl font-bold text-white mb-6">
                    Our Mission
                  </h2>
                  <p className="text-lg text-text-secondary-dark mb-6">
                    At Expenvisor, we believe that managing personal finances
                    should be simple, intelligent, and accessible to everyone.
                    Our mission is to eliminate the complexity and
                    time-consuming nature of traditional expense tracking by
                    leveraging cutting-edge AI technology.
                  </p>
                  <p className="text-lg text-text-secondary-dark mb-8">
                    We envision a world where financial management is so
                    seamless that it happens naturally in the background,
                    allowing people to focus on what truly matters—achieving
                    their financial goals and living their best lives.
                  </p>
                  <div className="flex items-center gap-4">
                    <Target className="w-8 h-8 text-accent" />
                    <span className="text-lg font-semibold text-white">
                      Empowering Financial Wellness
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-surface-elevated-dark rounded-2xl p-8 shadow-2xl"
                >
                  <h3 className="text-2xl font-bold text-text-primary-dark mb-6">
                    Our Values
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Lightbulb className="w-6 h-6 text-accent mt-1" />
                      <div>
                        <h4 className="font-semibold text-text-primary-dark mb-2">
                          Innovation
                        </h4>
                        <p className="text-text-secondary-dark">
                          We continuously push the boundaries of what's possible
                          in fintech, always seeking new ways to improve the
                          user experience.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Heart className="w-6 h-6 text-accent mt-1" />
                      <div>
                        <h4 className="font-semibold text-text-primary-dark mb-2">
                          User-Centric
                        </h4>
                        <p className="text-text-secondary-dark">
                          Every feature we build is designed with our users'
                          needs in mind, ensuring our solutions are both
                          powerful and intuitive.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Users className="w-6 h-6 text-accent mt-1" />
                      <div>
                        <h4 className="font-semibold text-text-primary-dark mb-2">
                          Accessibility
                        </h4>
                        <p className="text-text-secondary-dark">
                          We believe financial management tools should be
                          accessible to everyone, regardless of their technical
                          expertise or financial background.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Story Section */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Our Story
                </h2>
                <p className="text-lg text-text-secondary-dark max-w-3xl mx-auto">
                  Expenvisor was born from a simple observation: traditional
                  expense tracking was broken, and AI technology could fix it.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-accent">2024</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    The Beginning
                  </h3>
                  <p className="text-text-secondary-dark">
                    Founded with a vision to make expense tracking effortless
                    through AI technology.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-accent">10K+</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Growing Community
                  </h3>
                  <p className="text-text-secondary-dark">
                    Over 10,000 users trust Expenvisor to manage their personal
                    finances.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-accent">4.9★</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    User Satisfaction
                  </h3>
                  <p className="text-text-secondary-dark">
                    Consistently high ratings from users who love our AI-powered
                    approach.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Meet the Founder
                </h2>
                <p className="text-lg text-text-secondary-dark max-w-3xl mx-auto">
                  Driven by a passion for innovation and AI, building the future
                  of intelligent personal finance management.
                </p>
              </div>

              <div className="max-w-2xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="bg-surface-elevated-dark p-8 rounded-xl shadow-lg border border-primary-light/20 text-center"
                >
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-accent/50 shadow-lg">
                    <Image
                      src="/team_photos/Muhammad_Haseeb.jpeg"
                      alt="MrHaseeb - Founder & Full Stack AI Engineer"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-text-primary-dark mb-2">
                    MrHaseeb
                  </h3>
                  <p className="text-accent mb-4">Founder & Full Stack AI Engineer</p>
                  <p className="text-text-secondary-dark mb-6">
                    Visionary full-stack AI engineer passionate about revolutionizing personal finance with intelligent automation.
                  </p>
                  <a 
                    href="https://mrhaseeb.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:text-secondary transition-colors"
                  >
                    Visit Website <ArrowRight className="w-4 h-4" />
                  </a>
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
                  Ready to Join Our Mission?
                </h2>
                <p className="text-lg text-text-secondary-dark mb-8 max-w-2xl mx-auto">
                  Experience the future of personal finance management with
                  Expenvisor. Download our app today and discover how AI can
                  transform your financial life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/download"
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-accent to-secondary text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[44px]"
                  >
                    Download Expenvisor
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-accent text-accent rounded-xl font-semibold text-lg hover:bg-accent hover:text-white transition-all duration-300 min-h-[44px]"
                  >
                    Get in Touch
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
