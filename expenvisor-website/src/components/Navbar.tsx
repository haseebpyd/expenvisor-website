"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Smartphone } from "lucide-react";
import { HexagonContainer } from "./ui";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <HexagonContainer size={40} glowColor="#00D9FF" variant="filled">
              <Smartphone className="w-5 h-5 text-accent-cyan" />
            </HexagonContainer>
            <span className="text-xl font-bold font-display text-text-primary group-hover:text-accent-cyan transition-colors duration-300">
              Expenvisor
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-text-secondary hover:text-accent-cyan transition-colors duration-200 font-medium hover:scale-105 transform"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="#download"
              className="bg-holographic text-text-primary px-6 py-2 rounded-2xl font-medium hover:shadow-[0_8px_32px_rgba(0,217,255,0.3)] hover:scale-105 transition-all duration-300 focus-visible"
            >
              Download App
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-secondary hover:text-accent-cyan transition-colors duration-200 p-2 rounded-lg hover:bg-white/10 focus-visible"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            className="md:hidden"
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 glass-effect-mobile rounded-lg mt-2 border border-white/10">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-3 text-text-secondary hover:text-accent-cyan transition-colors duration-200 font-medium hover:bg-white/10 rounded-lg min-h-[44px] flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="#download"
                className="px-3 py-3 bg-holographic text-text-primary rounded-lg font-medium text-center hover:shadow-[0_8px_32px_rgba(0,217,255,0.3)] transition-all duration-300 min-h-[44px] flex items-center justify-center"
                onClick={() => setIsOpen(false)}
              >
                Download App
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
