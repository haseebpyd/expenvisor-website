import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service - Expenvisor",
  description: "Terms and conditions for using Expenvisor AI expense tracker.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-surface-dark">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

          <p className="text-lg text-text-secondary-dark mb-8">
            <strong>Last updated:</strong> January 15, 2024
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                1. Acceptance of Terms
              </h2>
              <p>
                By downloading, installing, or using the Expenvisor mobile
                application ("App") or accessing our website, you agree to be
                bound by these Terms of Service ("Terms"). If you do not agree
                to these Terms, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Account Terms</h2>

              <h3 className="text-xl font-medium mb-3">2.1 Age Requirement</h3>
              <p>You must be at least 18 years old to use our service.</p>

              <h3 className="text-xl font-medium mb-3 mt-6">
                2.2 Accurate Information
              </h3>
              <p>
                You must provide accurate and complete information when creating
                your account.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">
                2.3 Account Security
              </h3>
              <p>
                You are responsible for maintaining the security of your account
                and password.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">2.4 One Account</h3>
              <p>You may only create one account per person.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                3. Subscription Terms
              </h2>

              <h3 className="text-xl font-medium mb-3">3.1 Billing</h3>
              <p>Subscriptions are billed monthly or annually in advance.</p>

              <h3 className="text-xl font-medium mb-3 mt-6">
                3.2 Auto-renewal
              </h3>
              <p>
                Subscriptions automatically renew unless cancelled before the
                renewal date.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">
                3.3 Cancellation
              </h3>
              <p>
                You may cancel your subscription at any time through your
                account settings or the app store.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">3.4 Refunds</h3>
              <p>
                Refunds are handled according to Apple and Google's refund
                policies. We do not provide direct refunds.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">
                3.5 Price Changes
              </h3>
              <p>
                We will notify you 30 days before any price changes to your
                subscription.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                4. Acceptable Use Policy
              </h2>

              <h3 className="text-xl font-medium mb-3">
                4.1 Prohibited Activities
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Using the service for illegal activities</li>
                <li>Attempting to hack or reverse engineer the app</li>
                <li>Abusing AI features or creating spam</li>
                <li>Sharing your account with others</li>
                <li>Violating others' intellectual property rights</li>
                <li>Using automated tools to access the service</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">
                4.2 Content Guidelines
              </h3>
              <p>
                You are responsible for all content you input into the app,
                including transaction descriptions and financial data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                5. AI Disclaimer (Important)
              </h2>

              <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-medium mb-3 text-yellow-200">
                  ⚠️ Important Notice
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-yellow-300">
                  <li>
                    <strong>
                      AI financial advice is for informational purposes only
                    </strong>
                  </li>
                  <li>
                    <strong>
                      Not a substitute for professional financial advice
                    </strong>
                  </li>
                  <li>
                    <strong>We are not licensed financial advisors</strong>
                  </li>
                  <li>
                    <strong>
                      Consult professionals for important financial decisions
                    </strong>
                  </li>
                  <li>
                    <strong>
                      AI recommendations are not guaranteed to be accurate
                    </strong>
                  </li>
                </ul>
              </div>

              <p>
                The AI features in our app are designed to provide helpful
                insights and suggestions based on your spending patterns.
                However, these recommendations should not be considered as
                professional financial advice. Always consult with qualified
                financial professionals for important financial decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                6. Intellectual Property
              </h2>

              <h3 className="text-xl font-medium mb-3">6.1 Our Content</h3>
              <p>
                Expenvisor owns all rights to the app, website, and all content
                we create.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">6.2 Your Data</h3>
              <p>
                You retain ownership of your financial data. We only use it to
                provide our service.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">6.3 License</h3>
              <p>
                We grant you a limited, non-transferable license to use our
                service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                7. Limitation of Liability
              </h2>

              <div className="bg-red-900/20 border border-red-800 rounded-lg p-6">
                <h3 className="text-xl font-medium mb-3 text-red-200">
                  Important Limitations
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-red-300">
                  <li>Service provided "as is" without warranties</li>
                  <li>Not liable for financial decisions or losses</li>
                  <li>
                    Not liable for data loss (though we try to prevent it)
                  </li>
                  <li>Not liable for service interruptions</li>
                  <li>Maximum liability limited to amount paid for service</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                8. Indemnification
              </h2>
              <p>
                You agree to indemnify and hold Expenvisor harmless from any
                claims, damages, or expenses arising from your use of the
                service or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>

              <h3 className="text-xl font-medium mb-3">9.1 By You</h3>
              <p>
                You may stop using the service and delete your account at any
                time.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">9.2 By Us</h3>
              <p>
                We may terminate your access if you violate these Terms or for
                other reasons at our discretion.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">
                9.3 Effect of Termination
              </h3>
              <p>
                Upon termination, your right to use the service ceases
                immediately. We may delete your data after a reasonable period.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
              <p>
                These Terms are governed by the laws of [Your Jurisdiction]. Any
                disputes will be resolved in the courts of [Your Jurisdiction].
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                11. Changes to Terms
              </h2>
              <p>
                We may update these Terms from time to time. We will notify you
                of significant changes via email or through the app. Continued
                use of the service after changes constitutes acceptance of the
                new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                12. Contact Information
              </h2>
              <p>
                If you have any questions about these Terms, please contact us
                at:
              </p>
              <div className="mt-4 p-4 bg-surface-elevated-dark rounded-lg">
                <p>
                  <strong>Email:</strong> legal@expenvisor.com
                </p>
                <p>
                  <strong>Support:</strong> support@expenvisor.com
                </p>
                <p>
                  <strong>Response Time:</strong> Within 5 business days
                </p>
                <p>
                  <strong>Address:</strong> [Your Business Address]
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
