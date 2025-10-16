import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy - Expenvisor',
  description: 'Learn how we protect your data and privacy. GDPR and CCPA compliant.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-8">
            <strong>Last updated:</strong> January 15, 2024
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p>
                Expenvisor ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-medium mb-3">2.1 Account Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and email address</li>
                <li>Phone number (optional)</li>
                <li>Profile information</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">2.2 Financial Data</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Expense and income transactions</li>
                <li>Budget information</li>
                <li>Category preferences</li>
                <li>Financial goals and targets</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">2.3 Voice Recordings</h3>
              <p>
                We temporarily process voice recordings for expense entry. These recordings are processed locally on your device and are not stored on our servers.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">2.4 Receipt Images</h3>
              <p>
                Receipt images are processed locally using on-device OCR technology. Images are only uploaded to our secure servers if you explicitly choose to enable cloud backup.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">2.5 Device Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Device model and operating system</li>
                <li>App version and usage statistics</li>
                <li>Crash reports and performance data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and maintain our services</li>
                <li>Process and categorize your transactions</li>
                <li>Generate financial insights and recommendations</li>
                <li>Improve our AI algorithms and user experience</li>
                <li>Send important updates and notifications</li>
                <li>Provide customer support</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>
              
              <h3 className="text-xl font-medium mb-3">4.1 Firebase (Google)</h3>
              <p>
                We use Firebase for authentication, data storage, and analytics. Your data is encrypted and stored securely on Google's servers.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">4.2 OpenAI</h3>
              <p>
                We use OpenAI's API for AI processing. Financial data sent to OpenAI is anonymized and not stored by OpenAI.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">4.3 RevenueCat</h3>
              <p>
                We use RevenueCat for subscription management. Payment information is processed securely through the App Store and Google Play.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Data Storage & Security</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All data is encrypted using AES-256 encryption</li>
                <li>Secure transmission using HTTPS/TLS</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
                <li>Data retention policies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Your Rights (GDPR/CCPA)</h2>
              
              <h3 className="text-xl font-medium mb-3">6.1 Right to Access</h3>
              <p>You can view all your personal data through the app settings.</p>

              <h3 className="text-xl font-medium mb-3 mt-6">6.2 Right to Rectification</h3>
              <p>You can correct inaccurate data directly in the app.</p>

              <h3 className="text-xl font-medium mb-3 mt-6">6.3 Right to Erasure</h3>
              <p>You can delete your account and all associated data at any time.</p>

              <h3 className="text-xl font-medium mb-3 mt-6">6.4 Right to Portability</h3>
              <p>You can export your data in CSV or PDF format.</p>

              <h3 className="text-xl font-medium mb-3 mt-6">6.5 Right to Object</h3>
              <p>You can opt-out of certain data processing activities.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Children's Privacy</h2>
              <p>
                Our service is not intended for children under 18. We do not knowingly collect personal information from children under 18.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. International Transfers</h2>
              <p>
                Your data may be processed outside your country. We ensure adequate protection through standard contractual clauses and other appropriate safeguards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-lg">
                <p><strong>Email:</strong> privacy@expenvisor.com</p>
                <p><strong>Response Time:</strong> Within 30 days</p>
                <p><strong>Address:</strong> [Your Business Address]</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}