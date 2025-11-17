import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Pricing from '@/components/Pricing'

export const metadata: Metadata = {
  title: 'Pricing - Expenvisor AI Expense Tracker Plans',
  description: 'Choose the perfect plan: Free, Standard ($4.99/mo), or Premium ($9.99/mo). Cancel anytime.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark">
      <Navbar />
      <main className="pt-20">
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}