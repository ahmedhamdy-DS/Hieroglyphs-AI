// app/components/Section.jsx

'use client'
import { motion } from 'framer-motion'

export default function Section({ children, className }) {
  return (
    <motion.section
      className={`py-20 px-4 sm:px-6 lg:px-8 ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.section>
  )
}