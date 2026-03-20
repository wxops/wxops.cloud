'use client'

import { motion } from 'framer-motion'
import { MessageSquare, Zap, Users, GitPullRequest } from 'lucide-react'

const stats = [
  { icon: Users, value: 'Open', label: 'Early Access' },
  { icon: MessageSquare, value: '3', label: 'Issue Templates' },
  { icon: GitPullRequest, value: '100%', label: 'Open Source' },
  { icon: Zap, value: 'Free', label: 'MVP Demo' },
]

export function FeedbackHero() {
  return (
    <section className="relative pt-28 pb-16 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 grid-overlay opacity-60 pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-sm text-slate-600 mb-8"
        >
          <a href="/" className="hover:text-slate-400 transition-colors">
            W&apos;xOps IDP
          </a>
          <span>/</span>
          <span className="text-slate-400">Feedback</span>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 dot-active" />
          Early Access Programme — Accepting Feedback
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4 max-w-3xl"
        >
          Help Shape the{' '}
          <span className="text-gradient">Platform</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-slate-400 text-lg max-w-2xl mb-10 leading-relaxed"
        >
          Your feedback directly influences what we build next. Open a GitHub
          ticket from a template, join the public discussion via Giscus, or send
          us a private note — and be first in line for a free demo when we launch.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap gap-4"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 px-4 py-2.5 glass rounded-xl"
            >
              <Icon className="w-4 h-4 text-indigo-400" />
              <span className="text-white font-bold text-sm">{value}</span>
              <span className="text-slate-500 text-xs">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
