"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  Smartphone,
  Play,
  Star,
  Mic,
  Camera,
  MessageCircle,
} from "lucide-react";
import { GlassContainer, HolographicCard, HexagonContainer } from "./ui";

export default function Hero() {
  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
      {/* Holographic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-4 md:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-accent-cyan/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute top-40 right-4 md:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-accent-pink/10 rounded-full blur-3xl animate-float-slow"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-20 left-1/4 md:left-1/3 w-56 sm:w-80 h-56 sm:h-80 bg-accent-purple/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-accent-mint/5 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 glass-effect rounded-full px-4 py-2 text-text-primary text-sm font-medium"
            >
              <Star className="w-4 h-4 text-accent-cyan" />
              <span>AI-Powered Finance Management</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-tight">
                <span className="text-text-primary">Smart</span>
                <br />
                <span className="holographic-text">Expense Tracking</span>
                <br />
                <span className="text-text-primary">Made Simple</span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-text-secondary leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Track expenses with voice, scan receipts with AI, and get
                personalized financial insights that help you save money and
                achieve your goals.
              </p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6 mt-8 max-w-2xl"
            >
              <GlassContainer className="px-6 py-4 text-center lg:text-left hover:glow-cyan transition-all duration-300">
                <div className="text-3xl font-bold text-accent-cyan">10K+</div>
                <div className="text-sm text-text-secondary">Active Users</div>
              </GlassContainer>
              <GlassContainer className="px-6 py-4 text-center lg:text-left hover:glow-purple transition-all duration-300">
                <div className="text-3xl font-bold text-accent-purple">
                  $2M+
                </div>
                <div className="text-sm text-text-secondary">Saved</div>
              </GlassContainer>
              <GlassContainer className="px-6 py-4 text-center lg:text-left hover:glow-cyan transition-all duration-300">
                <div className="text-3xl font-bold text-accent-cyan">4.9★</div>
                <div className="text-sm text-text-secondary">App Rating</div>
              </GlassContainer>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8"
            >
              <a
                href="#download"
                className="group bg-holographic text-text-primary px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-[0_8px_32px_rgba(0,217,255,0.4)] hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 focus-visible min-h-[44px]"
                aria-label="Download Expenvisor mobile app"
              >
                <Smartphone size={24} />
                <span>Download App</span>
              </a>
              <a
                href="#features"
                className="group glass-effect border border-accent-cyan/30 text-text-primary px-8 py-4 rounded-2xl font-semibold text-lg hover:border-accent-cyan/60 hover:glow-cyan transition-all duration-300 flex items-center justify-center space-x-2 focus-visible min-h-[44px]"
                aria-label="Watch demo video of Expenvisor features"
              >
                <Play size={20} />
                <span>Watch Demo</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - App Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm lg:max-w-none">
              {/* Main Phone Mockup */}
              <HolographicCard className="w-64 sm:w-72 md:w-80 h-80 sm:h-88 md:h-96 p-2 mx-auto">
                <div className="w-full h-full bg-surface rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-center text-text-primary z-10">
                    <Smartphone
                      size={60}
                      className="mx-auto mb-4 text-accent-cyan sm:w-16 sm:h-16 md:w-20 md:h-20"
                    />
                    <p className="text-base sm:text-lg font-semibold">
                      Expenvisor
                    </p>
                    <p className="text-xs sm:text-sm text-text-secondary">
                      Coming Soon
                    </p>
                  </div>
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-holographic opacity-20 animate-pulse-slow" />
                </div>
              </HolographicCard>

              {/* Floating Feature Cards - Responsive positioning */}
              <div className="absolute -top-1 -right-1 sm:-top-3 sm:-right-3 md:-top-4 md:-right-4 lg:-top-6 lg:-right-6">
                <GlassContainer className="w-14 sm:w-16 md:w-20 lg:w-24 h-10 sm:h-12 md:h-14 lg:h-16 p-1 sm:p-2 animate-float">
                  <div className="text-center">
                    <HexagonContainer
                      size={16}
                      glowColor="#00D9FF"
                      variant="outline"
                      className="mx-auto mb-1"
                    >
                      <Mic className="w-2 h-2 text-accent-cyan sm:w-2.5 sm:h-2.5" />
                    </HexagonContainer>
                    <div className="text-xs text-text-secondary leading-tight">
                      Voice Input
                    </div>
                    <div className="text-xs font-bold text-accent-cyan">
                      $25
                    </div>
                  </div>
                </GlassContainer>
              </div>

              <div
                className="absolute -bottom-1 -left-1 sm:-bottom-3 sm:-left-3 md:-bottom-4 md:-left-4 lg:-bottom-6 lg:-left-6 animate-float"
                style={{ animationDelay: "1s" }}
              >
                <GlassContainer className="w-14 sm:w-16 md:w-20 lg:w-24 h-10 sm:h-12 md:h-14 lg:h-16 p-1 sm:p-2">
                  <div className="text-center">
                    <HexagonContainer
                      size={16}
                      glowColor="#A78BFA"
                      variant="outline"
                      className="mx-auto mb-1"
                    >
                      <Camera className="w-2 h-2 text-accent-purple sm:w-2.5 sm:h-2.5" />
                    </HexagonContainer>
                    <div className="text-xs text-text-secondary leading-tight">
                      AI Analysis
                    </div>
                    <div className="text-xs font-bold text-accent-purple">
                      95%
                    </div>
                  </div>
                </GlassContainer>
              </div>

              <div className="absolute top-1/2 -left-1 sm:-left-3 md:-left-4 lg:-left-8">
                <HexagonContainer
                  size={32}
                  glowColor="#00FFA3"
                  variant="filled"
                  className="animate-pulse-slow sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
                >
                  <MessageCircle className="w-3 h-3 text-accent-mint sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                </HexagonContainer>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          onClick={scrollToFeatures}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-text-primary hover:text-accent-cyan transition-colors duration-200 focus-visible min-h-[44px] min-w-[44px]"
          aria-label="Scroll down to discover features"
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm font-medium">Discover Features</span>
            <div className="w-8 h-8 rounded-full glass-effect flex items-center justify-center">
              <ArrowDown
                size={20}
                className="animate-bounce text-accent-cyan"
              />
            </div>
          </div>
        </motion.button>
      </div>
    </section>
  );
}
