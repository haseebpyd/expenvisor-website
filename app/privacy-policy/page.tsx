import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy - Expenvisor",
  description:
    "Learn how we protect your data and privacy. GDPR and CCPA compliant.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-8">
            <strong>Last updated:</strong> January 2025
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p>
                Expenvisor ("we," "our," or "us") is committed to protecting
                your privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you use our mobile
                application and website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                2. Information We Collect
              </h2>

              <h3 className="text-xl font-medium mb-3">2.1 Financial Data</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Expense and income transaction amounts, categories, merchants,
                  and descriptions
                </li>
                <li>Transaction dates and timestamps</li>
                <li>Category preferences you create</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">
                2.2 Voice Recordings
              </h3>
              <p>
                We temporarily process voice recordings for expense entry using
                iOS speech recognition. Voice data is:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  Processed locally on your device using Apple's speech
                  recognition
                </li>
                <li>Not stored on our servers or by third parties</li>
                <li>
                  Converted to text before being used for transaction parsing
                </li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">
                2.3 Device Information
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Device model and iOS version (for analytics)</li>
                <li>App version and usage patterns</li>
                <li>
                  Crash reports and performance data (via Apple's crash
                  reporting)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                3. How We Use Your Information
              </h2>

              <h3 className="text-xl font-medium mb-3">3.1 Primary Uses</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process and categorize your financial transactions</li>
                <li>Convert voice input to text for transaction logging</li>
                <li>
                  Use AI to parse natural language into structured transactions
                </li>
                <li>Store your data locally on your device using Core Data</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">
                3.2 AI Processing
              </h3>
              <p>
                When you use AI features (chat or transaction parsing), the text
                you provide is sent to OpenAI for processing:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  Only the transaction text is sent (no personal identifiers)
                </li>
                <li>
                  OpenAI processes the text to extract transaction details
                </li>
                <li>OpenAI does not store your transaction data</li>
                <li>You can disable AI features in Settings at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                4. Third-Party Services
              </h2>

              <h3 className="text-xl font-medium mb-3">
                4.1 OpenAI (Optional)
              </h3>
              <p>
                We use OpenAI's API for enhanced AI processing of transactions:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  Only transaction text is sent to OpenAI (no personal data)
                </li>
                <li>
                  Data is used solely for parsing transactions into structured
                  format
                </li>
                <li>
                  OpenAI does not store your transaction data (per their privacy
                  policy)
                </li>
                <li>You can disable AI features in Settings if preferred</li>
                <li>Data transmission is encrypted via HTTPS</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">
                4.2 Apple Services
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Speech Recognition:</strong> Uses Apple's on-device
                  speech recognition for voice input
                </li>
                <li>
                  <strong>Core Data:</strong> Uses Apple's Core Data framework
                  for local data storage
                </li>
                <li>
                  <strong>Analytics:</strong> Uses Apple's App Store analytics
                  (anonymous usage data)
                </li>
                <li>
                  <strong>Crash Reporting:</strong> Uses Apple's crash reporting
                  service
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                5. Data Storage & Security
              </h2>

              <h3 className="text-xl font-medium mb-3">5.1 Local Storage</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  All financial data is stored locally on your device using Core
                  Data
                </li>
                <li>Data is encrypted using iOS security features</li>
                <li>
                  Your financial data never leaves your device unless you
                  explicitly choose to export it
                </li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">
                5.2 Security Measures
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Relies on iOS security features and device passcode</li>
                <li>All stored data is encrypted at rest</li>
                <li>Only you can access your financial data</li>
                <li>Data may be included in device backups (encrypted)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                6. Your Rights (GDPR/CCPA)
              </h2>

              <h3 className="text-xl font-medium mb-3">6.1 Right to Access</h3>
              <p>
                You can view all your personal data through the app settings.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">
                6.2 Right to Rectification
              </h3>
              <p>You can correct inaccurate data directly in the app.</p>

              <h3 className="text-xl font-medium mb-3 mt-6">
                6.3 Right to Erasure
              </h3>
              <p>
                You can delete your account and all associated data at any time.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">
                6.4 Right to Portability
              </h3>
              <p>You can export your data in CSV or PDF format.</p>

              <h3 className="text-xl font-medium mb-3 mt-6">
                6.5 Right to Object
              </h3>
              <p>You can opt-out of certain data processing activities.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                6. Children's Privacy
              </h2>
              <p>
                Expenvisor is not intended for children under 13. We do not
                knowingly collect personal information from children under 13.
                If you are a parent or guardian and believe your child has
                provided us with personal information, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>

              <h3 className="text-xl font-medium mb-3">7.1 Local Data</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Data is stored locally on your device until you delete it
                </li>
                <li>No automatic data deletion</li>
                <li>Data may be included in device backups (encrypted)</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">
                7.2 Third-Party Data
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Transaction text sent to OpenAI is not stored by OpenAI</li>
                <li>Anonymous usage data retained per Apple's policies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                8. International Users
              </h2>
              <p>
                Expenvisor is designed for global use. Data processing occurs on
                your device, ensuring compliance with local privacy laws
                including GDPR, CCPA, and other regional regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                9. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy periodically. We will notify
                you of any material changes by:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Posting the new Privacy Policy in the app</li>
                <li>Sending an in-app notification</li>
                <li>Updating the "Last updated" date</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>
              <div className="mt-4 p-4 bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-lg">
                <p className="mb-2">
                  <strong>Email:</strong> privacy@expenvisor.com
                </p>
                <p className="mb-2">
                  <strong>Website:</strong>{" "}
                  <a
                    href="https://expenvisor.com"
                    className="text-accent-dark hover:underline"
                  >
                    https://expenvisor.com
                  </a>
                </p>
                <p>
                  <strong>Response Time:</strong> Within 30 days
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Compliance</h2>
              <p>This Privacy Policy complies with:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Apple App Store Guidelines</li>
                <li>General Data Protection Regulation (GDPR)</li>
                <li>California Consumer Privacy Act (CCPA)</li>
                <li>Children's Online Privacy Protection Act (COPPA)</li>
              </ul>
              <p className="mt-4 italic">
                Your privacy is our priority. We're committed to protecting your
                financial data and providing transparency about our practices.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
