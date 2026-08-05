// app/components/Header.jsx

'use client'
import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-night-sky/80 backdrop-blur-sm shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Egypt
        </h1>
        <ThemeToggle />
      </div>
    </header>
  )
}