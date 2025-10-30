'use client'

import { motion } from 'framer-motion'
import ComingSoon from '@/components/ComingSoon'
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
      >
        <ComingSoon />
        <Footer />
      </motion.div>
    </main>
  )
}