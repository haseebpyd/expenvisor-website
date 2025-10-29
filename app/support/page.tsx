import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Support - Expenvisor",
  description:
    "Get help with Expenvisor. Find answers to frequently asked questions and contact our support team.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8">Support & Help Center</h1>

          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-8">
            We're here to help you get the most out of Expenvisor. Find answers
            to common questions below or contact our support team.
          </p>

          <div className="space-y-8">
            {/* Contact Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Support</h2>
              <div className="mt-4 p-6 bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-lg">
                <p className="mb-4">
                  <strong>Email:</strong> support@expenvisor.com
                </p>
                <p className="mb-4">
                  <strong>Response Time:</strong> Within 24-48 hours
                </p>
                <p className="mb-4">
                  <strong>Hours:</strong> Monday - Friday, 9am - 5pm EST
                </p>
                <p>
                  <strong>For urgent issues:</strong> Please include "URGENT" in
                  your subject line.
                </p>
              </div>
            </section>

            {/* Getting Started */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2">
                    How do I add my first expense?
                  </h3>
                  <p>You can add expenses in three ways:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>
                      <strong>Voice Input:</strong> Tap the microphone button
                      and speak your expense naturally, like "I spent $5 on
                      coffee"
                    </li>
                    <li>
                      <strong>AI Chat:</strong> Type a message describing your
                      expense in natural language
                    </li>
                    <li>
                      <strong>Manual Entry:</strong> Tap the + button in the
                      History tab to manually add an expense
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">
                    How does voice input work?
                  </h3>
                  <p>
                    Tap the microphone icon and speak your expense. Expenvisor
                    will use speech recognition to convert your words to text,
                    then AI will parse the transaction details. For example, say
                    "I spent $15.50 at Starbucks for breakfast" and we'll add it
                    as an expense automatically.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">
                    Can I edit or delete transactions?
                  </h3>
                  <p>Yes! In the History tab, you can:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Tap any transaction to view details</li>
                    <li>Swipe left on any transaction to delete it</li>
                    <li>Edit transactions from the detail view</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* AI Features */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">AI Features</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2">
                    How does AI transaction parsing work?
                  </h3>
                  <p>
                    When you describe an expense using natural language, our AI
                    analyzes the text to extract the amount, merchant, category,
                    and date. It uses OpenAI's GPT model to understand your
                    intent and create a properly categorized transaction.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">
                    What categories are supported?
                  </h3>
                  <p>Expenvisor supports the following expense categories:</p>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Food & Dining</li>
                      <li>Groceries</li>
                      <li>Transportation</li>
                      <li>Entertainment</li>
                      <li>Shopping</li>
                    </ul>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Healthcare</li>
                      <li>Utilities</li>
                      <li>Education</li>
                      <li>Travel</li>
                      <li>Other</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">
                    Is my data private when using AI features?
                  </h3>
                  <p>Yes! When you use AI features:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>
                      Only the transaction text is sent to OpenAI for processing
                    </li>
                    <li>No personal identifiers are included</li>
                    <li>
                      OpenAI does not store your data (transaction text is
                      processed and discarded)
                    </li>
                    <li>
                      You can disable AI features in Settings if preferred
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Management */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Data & Privacy</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2">
                    Where is my data stored?
                  </h3>
                  <p>
                    All your transaction data is stored locally on your device
                    using Core Data. Your information never leaves your device
                    unless you explicitly choose to export it.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">
                    Can I export my data?
                  </h3>
                  <p>
                    Yes! You can export your transactions and chat history in
                    two formats:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>
                      <strong>JSON:</strong> Complete data structure for backup
                      and transfer
                    </li>
                    <li>
                      <strong>CSV:</strong> Spreadsheet-compatible format for
                      analysis
                    </li>
                  </ul>
                  <p className="mt-2">
                    Go to Settings → Data → Export Data to export your
                    information.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">
                    Can I clear all my data?
                  </h3>
                  <p>
                    Yes, you can delete all transactions and chat history from
                    Settings → Data → Clear All Data. This action cannot be
                    undone, so please make sure to export your data first if
                    needed.
                  </p>
                </div>
              </div>
            </section>

            {/* Troubleshooting */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2">
                    Voice input isn't working
                  </h3>
                  <p>Check the following:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>
                      Ensure microphone permissions are granted in iOS Settings
                      → Expenvisor
                    </li>
                    <li>Check that voice input is enabled in App Settings</li>
                    <li>
                      Ensure you have a stable internet connection for speech
                      recognition
                    </li>
                    <li>Try speaking more slowly and clearly</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">
                    AI chat isn't responding
                  </h3>
                  <p>If the AI chat isn't working:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Check your internet connection</li>
                    <li>Wait a few seconds for processing</li>
                    <li>Try rephrasing your message</li>
                    <li>Check if OpenAI API is accessible</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">
                    Transactions aren't appearing in history
                  </h3>
                  <p>Try the following:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Pull down on the History screen to refresh</li>
                    <li>
                      Check if you're using a filter that hides transactions
                    </li>
                    <li>Restart the app</li>
                    <li>
                      Check if the transaction was actually added (scroll down
                      in History)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">
                    App crashes or freezes
                  </h3>
                  <p>If the app is unstable:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Force quit and restart the app</li>
                    <li>Ensure your iOS version is up to date</li>
                    <li>Restart your device</li>
                    <li>Delete and reinstall the app (export data first!)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Advanced Topics */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Advanced</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2">
                    What currencies are supported?
                  </h3>
                  <p>Expenvisor supports the following currencies:</p>
                  <p className="mt-2">
                    USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, SEK, NZD
                  </p>
                  <p className="mt-2">
                    Change your currency in Settings → Preferences → Currency.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">
                    Can I sync data across devices?
                  </h3>
                  <p>
                    Currently, Expenvisor stores all data locally on your device
                    for maximum privacy. Cloud sync is not yet available, but
                    you can export your data and import it on another device if
                    needed.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">
                    Is there a desktop version?
                  </h3>
                  <p>
                    Expenvisor is currently available as an iOS app. Web and
                    desktop versions are planned for future releases.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
