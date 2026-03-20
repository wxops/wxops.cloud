'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ExternalLink } from 'lucide-react'
import Image from 'next/image'

const navLinks = [
  { label: 'Golden Path', href: '/#golden-path' },
  { label: 'Features', href: '/#features' },
  { label: 'Architecture', href: '/#architecture' },
  { label: 'Feedback', href: '/feedback' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050308]/80 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2.5 font-bold text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
              <Image src="/favicon-32x32.png" alt="W'xOps logo" width={32} height={32} className="w-full h-full object-contain" />
            </div>
            <span className="text-gradient">W&apos;xOps</span>
            <span className="text-slate-400 font-normal text-sm hidden sm:block">
              IDP
            </span>
          </motion.a>

          {/* Desktop nav */}
          <motion.ul
            className="hidden md:flex items-center gap-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </motion.ul>

          {/* CTA */}
          <motion.div
            className="hidden md:flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="https://github.com/wxops"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              GitHub <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="/feedback"
              className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white hover:opacity-90 transition-opacity"
            >
              Get Early Access
            </a>
          </motion.div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-slate-400 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#050308]/95 backdrop-blur-xl border-b border-white/[0.06]"
          >
            <div className="section-container py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-slate-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/feedback"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-4 py-3 text-center font-medium bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white"
              >
                Get Early Access
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
