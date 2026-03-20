'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Code2,
  Package,
  GitBranch,
  ShieldCheck,
  Rocket,
  BarChart3,
} from 'lucide-react'

const steps = [
  {
    icon: Code2,
    label: 'Write Code',
    sub: 'Developer',
    color: 'from-indigo-500/20 to-indigo-600/10',
    border: 'border-indigo-500/30',
    iconColor: 'text-indigo-400',
    badge: 'Day 0',
  },
  {
    icon: Package,
    label: 'Pick Template',
    sub: 'Service Catalog',
    color: 'from-purple-500/20 to-purple-600/10',
    border: 'border-purple-500/30',
    iconColor: 'text-purple-400',
    badge: 'Golden Path',
  },
  {
    icon: GitBranch,
    label: 'CI/CD Pipeline',
    sub: 'Auto-triggered',
    color: 'from-violet-500/20 to-violet-600/10',
    border: 'border-violet-500/30',
    iconColor: 'text-violet-400',
    badge: 'Automated',
  },
  {
    icon: ShieldCheck,
    label: 'Security Gate',
    sub: 'Policy as Code',
    color: 'from-cyan-500/20 to-cyan-600/10',
    border: 'border-cyan-500/30',
    iconColor: 'text-cyan-400',
    badge: '0 Manual Steps',
  },
  {
    icon: Rocket,
    label: 'Deploy',
    sub: 'Kubernetes / Cloud',
    color: 'from-sky-500/20 to-sky-600/10',
    border: 'border-sky-500/30',
    iconColor: 'text-sky-400',
    badge: '< 5 min',
  },
  {
    icon: BarChart3,
    label: 'Observe',
    sub: 'Logs + Metrics + Traces',
    color: 'from-emerald-500/20 to-emerald-600/10',
    border: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
    badge: 'Built-in',
  },
]

const principles = [
  {
    title: 'Paved Road, Not a Cage',
    desc: 'Golden Paths are the easiest path — not the only one. Teams can deviate when justified, but the default keeps everyone productive and safe.',
    color: 'from-indigo-500/10 to-indigo-600/5',
    border: 'border-indigo-500/20',
    dot: 'bg-indigo-400',
  },
  {
    title: 'Platform as a Product',
    desc: 'The platform team treats internal developers as customers. We iterate, collect feedback, and ship improvements continuously.',
    color: 'from-purple-500/10 to-purple-600/5',
    border: 'border-purple-500/20',
    dot: 'bg-purple-400',
  },
  {
    title: 'Self-Service by Default',
    desc: "Developers provision services, add team members, rotate secrets — all without filing tickets or waiting on platform team's approval.",
    color: 'from-cyan-500/10 to-cyan-600/5',
    border: 'border-cyan-500/20',
    dot: 'bg-cyan-400',
  },
  {
    title: 'Shift-Left Everything',
    desc: 'Security, compliance, observability — baked in from day one, not bolted on after the fact. Less panic, smoother audits.',
    color: 'from-emerald-500/10 to-emerald-600/5',
    border: 'border-emerald-500/20',
    dot: 'bg-emerald-400',
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

export function GoldenPath() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="golden-path" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-4">
            Platform Engineering
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            The{' '}
            <span className="text-gradient">Golden Path</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            A pre-paved, opinionated path from developer idea to production. Zero
            boilerplate, zero ops tickets, zero guesswork.
          </p>
        </motion.div>

        {/* Flow steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="relative mb-20"
        >
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-px bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-cyan-500/0 z-0" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div key={step.label} variants={itemVariants}>
                  <div
                    className={`relative flex flex-col items-center p-5 rounded-2xl bg-gradient-to-b ${step.color} border ${step.border} glass-hover group cursor-default`}
                  >
                    {/* Step number */}
                    <span className="absolute -top-2.5 -right-2.5 w-5 h-5 bg-[#050308] border border-white/10 rounded-full text-[10px] font-bold text-slate-500 flex items-center justify-center">
                      {i + 1}
                    </span>

                    {/* Icon */}
                    <div className={`w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-5 h-5 ${step.iconColor}`} />
                    </div>

                    {/* Label */}
                    <p className="text-white font-semibold text-sm text-center mb-1">
                      {step.label}
                    </p>
                    <p className="text-slate-500 text-xs text-center mb-3">
                      {step.sub}
                    </p>

                    {/* Badge */}
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${step.border} ${step.iconColor} bg-white/5`}>
                      {step.badge}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Info box — time saving */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass rounded-2xl p-6 md:p-8 mb-16 border-gradient"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { before: '3–5 days', after: '< 15 min', label: 'New service bootstrapped' },
              { before: '2 weeks', after: '< 2 hours', label: 'Developer onboarding' },
              { before: '60+ steps', after: '0 manual steps', label: 'Security compliance' },
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-center gap-3 text-lg font-bold">
                  <span className="text-slate-500 line-through text-base">{item.before}</span>
                  <span className="text-slate-600">→</span>
                  <span className="text-gradient">{item.after}</span>
                </div>
                <p className="text-sm text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Core principles */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Core Principles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {principles.map((p) => (
              <motion.div
                key={p.title}
                variants={itemVariants}
                className={`p-6 rounded-2xl bg-gradient-to-br ${p.color} border ${p.border} glass-hover`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full ${p.dot} mt-2.5 flex-shrink-0`} />
                  <div>
                    <h4 className="font-semibold text-white mb-1.5">{p.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
