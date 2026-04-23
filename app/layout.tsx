import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'

const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5G8ZM7GF');`

const gaMeasurementId = 'G-SVQ38XQ84F'

const gtagInitScript = `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${gaMeasurementId}');`

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
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      {/* Google Tag Manager — beforeInteractive injects into <head> as early as Next allows */}
      <Script id="gtm-init" strategy="beforeInteractive">
        {gtmScript}
      </Script>
      {/* End Google Tag Manager */}
      {/* Google tag (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
        strategy="beforeInteractive"
      />
      <Script id="google-tag-gtag" strategy="beforeInteractive">
        {gtagInitScript}
      </Script>
      {/* End Google tag (gtag.js) */}
      <body className={`${inter.className} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5G8ZM7GF"
            height={0}
            width={0}
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <Analytics />
      </body>
    </html>
  )
}