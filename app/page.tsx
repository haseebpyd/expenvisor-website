'use client'

import { motion } from 'framer-motion'
import Hero from '@/components/Hero'
import Video from '@/components/Video'
import Team from '@/components/Team'
import Features from '@/components/Features'
import Screenshots from '@/components/Screenshots'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-secondary-dark">
      <Navbar />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-10"
      >
        <Hero />
        <Video />
        <Team />
        <Features />
        <Screenshots />
        <Pricing />
        <FAQ />
        <Footer />
      </motion.div>
    </main>
  )
}