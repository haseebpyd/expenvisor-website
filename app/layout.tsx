import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Expenvisor - AI Expense Tracker | Smart Finance Management',
  description: 'Track expenses with voice, scan receipts with AI, get personalized financial insights. Free iOS & Android app.',
  keywords: 'expense tracker, ai finance, budget app, receipt scanner, voice expense tracking, financial advisor app',
  authors: [{ name: 'Expenvisor Team' }],
  creator: 'Expenvisor',
  publisher: 'Expenvisor',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://expenvisor.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Expenvisor - AI-Powered Expense Tracker',
    description: 'Smart expense tracking with voice, OCR, and AI insights',
    url: 'https://expenvisor.com',
    siteName: 'Expenvisor',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Expenvisor - AI Expense Tracker',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expenvisor - AI Expense Tracker',
    description: 'Track smarter with AI',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} dark`}>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}