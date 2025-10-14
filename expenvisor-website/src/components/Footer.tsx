import Link from "next/link";
import { Smartphone, Mail, Twitter, Instagram, Linkedin } from "lucide-react";
import { HexagonContainer } from "./ui";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Features", href: "/features" },
      { name: "Pricing", href: "/pricing" },
      { name: "Download", href: "#download" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "/faq" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  };

  const socialLinks = [
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "LinkedIn", href: "#", icon: Linkedin },
  ];

  return (
    <footer className="bg-surface border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-4 group">
              <HexagonContainer size={32} glowColor="#00D9FF" variant="filled">
                <Smartphone className="w-4 h-4 text-text-primary" />
              </HexagonContainer>
              <span className="text-xl font-bold font-display text-text-primary group-hover:text-accent-cyan-cyan transition-colors duration-300">
                Expenvisor
              </span>
            </Link>
            <p className="text-text-secondary mb-4 max-w-sm">
              Your finances, flowing seamlessly. Track expenses with AI, scan
              receipts, and get personalized financial insights.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-text-tertiary hover:text-accent-cyan transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-tertiary hover:text-accent-cyan transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-tertiary hover:text-accent-cyan transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-tertiary hover:text-accent-cyan transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-text-tertiary text-sm">
              © {currentYear} Expenvisor. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <Mail size={16} className="text-text-tertiary" />
              <a
                href="mailto:support@expenvisor.com"
                className="text-text-tertiary hover:text-accent-cyan transition-colors duration-200 text-sm min-h-[44px] flex items-center"
                aria-label="Contact support via email"
              >
                support@expenvisor.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
