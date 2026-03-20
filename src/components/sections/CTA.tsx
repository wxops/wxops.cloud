'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Github, Layers, Zap } from 'lucide-react'

const benefits = [
  'Onboard any developer in < 2 hours',
  'Production-ready templates for every stack',
  'Zero-trust security baked in, not bolted on',
  'Full observability from day one',
  'Self-service infrastructure — no ticket queue',
  'Open source, no vendor lock-in',
]

export function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="cta" className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/15 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-indigo-600/8 blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative glass rounded-3xl border-gradient overflow-hidden p-8 md:p-14 text-center"
        >
          {/* Decorative orbs inside card */}
          <div className="absolute top-0 left-1/4 w-[300px] h-[200px] rounded-full bg-indigo-500/8 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] rounded-full bg-purple-500/8 blur-[80px] pointer-events-none" />

          {/* Icon badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-6 shadow-lg shadow-indigo-500/30"
          >
            <Layers className="w-7 h-7 text-white" />
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight"
          >
            Start Your{' '}
            <span className="text-gradient">Golden Path</span>
            <br />
            Today
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-slate-400 max-w-xl mx-auto text-lg mb-8 leading-relaxed"
          >
            The W&apos;xOps Internal Developer Portal is open source, battle-tested,
            and ready to transform how your engineering teams work.
          </motion.p>

          {/* Benefits list */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-xl mx-auto mb-10 text-left"
          >
            {benefits.map((b, i) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.55 + i * 0.06 }}
                className="flex items-center gap-2.5 text-sm text-slate-400"
              >
                <Zap className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                {b}
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/feedback"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:opacity-95 transition-all"
            >
              Get Early Access
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://github.com/wxops"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 glass-hover rounded-xl text-white font-semibold"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          </motion.div>

          {/* Fine print */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-6 text-xs text-slate-600"
          >
            Open source · MIT License · No vendor lock-in · Self-hosted or cloud
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
