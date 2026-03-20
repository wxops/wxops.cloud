'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  TrendingDown,
  TrendingUp,
  Clock,
  Zap,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react'

/* ──────────────────────────────────────────────
   Animated counter
──────────────────────────────────────────────── */
function AnimatedNumber({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
}: {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
}) {
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 2200
          const start = performance.now()
          function tick(now: number) {
            const t = Math.min((now - start) / duration, 1)
            const ease = 1 - Math.pow(1 - t, 3)
            const cur = value * ease
            setDisplay(decimals > 0 ? cur.toFixed(decimals) : Math.floor(cur).toString())
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [value, decimals])

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

/* ──────────────────────────────────────────────
   Data
──────────────────────────────────────────────── */
const bigMetrics = [
  {
    value: 78,
    suffix: 'hrs',
    label: 'Saved per developer onboarding',
    sub: '2 weeks → 2 hours',
    icon: Clock,
    color: 'from-indigo-500/20 to-indigo-600/5',
    border: 'border-indigo-500/30',
    iconColor: 'text-indigo-400',
    trend: 'down',
  },
  {
    value: 96,
    suffix: '%',
    label: 'Reduction in deploy lead time',
    sub: 'Days → Minutes',
    icon: Zap,
    color: 'from-purple-500/20 to-purple-600/5',
    border: 'border-purple-500/30',
    iconColor: 'text-purple-400',
    trend: 'down',
  },
  {
    value: 15,
    suffix: 'x',
    label: 'Increase in deployment frequency',
    sub: '2/month → 30+/month',
    icon: TrendingUp,
    color: 'from-cyan-500/20 to-cyan-600/5',
    border: 'border-cyan-500/30',
    iconColor: 'text-cyan-400',
    trend: 'up',
  },
  {
    value: 83,
    suffix: '%',
    label: 'Faster incident recovery (MTTR)',
    sub: '4 hours → 20 minutes',
    icon: AlertTriangle,
    color: 'from-amber-500/20 to-amber-600/5',
    border: 'border-amber-500/30',
    iconColor: 'text-amber-400',
    trend: 'down',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Automated compliance checks',
    sub: '60 manual steps → 0',
    icon: ShieldCheck,
    color: 'from-emerald-500/20 to-emerald-600/5',
    border: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
    trend: 'up',
  },
  {
    value: 50,
    suffix: '+',
    label: 'Integrated internal services',
    sub: 'All discoverable in catalog',
    icon: TrendingDown,
    color: 'from-pink-500/20 to-pink-600/5',
    border: 'border-pink-500/30',
    iconColor: 'text-pink-400',
    trend: 'up',
  },
]

const testimonials = [
  {
    quote:
      '"I went from zero to a running service in Kubernetes in under 10 minutes. I didn\'t file a single ticket."',
    author: 'Backend Engineer',
    role: 'New joiner, Day 1',
  },
  {
    quote:
      '"Our audit prep used to take 2 weeks. With Policy as Code in the IDP, we passed in an afternoon."',
    author: 'Security Lead',
    role: 'Platform Security',
  },
  {
    quote:
      '"Every new microservice used to start from scratch. Now engineers pick a template and they\'re done in 15 minutes."',
    author: 'Platform Architect',
    role: 'Engineering Excellence',
  },
]

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

export function Metrics() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="metrics"
      className="section-padding relative overflow-hidden bg-[#050308]"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-medium mb-4">
            Evidence-Based Results
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Real Impact,{' '}
            <span className="text-gradient-green">Real Numbers</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            These aren&apos;t estimates. These are measured outcomes from teams using the
            W&apos;xOps IDP in production.
          </p>
        </motion.div>

        {/* Metrics grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16"
        >
          {bigMetrics.map((m) => {
            const Icon = m.icon
            const TrendIcon = m.trend === 'up' ? TrendingUp : TrendingDown
            const trendColor = m.trend === 'down' ? 'text-emerald-400' : 'text-emerald-400'

            return (
              <motion.div
                key={m.label}
                variants={itemVariants}
                className={`relative p-6 rounded-2xl bg-gradient-to-br ${m.color} border ${m.border} overflow-hidden group glass-hover`}
              >
                {/* Shimmer */}
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2.5 rounded-xl bg-white/5 ${m.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className={`flex items-center gap-1 ${trendColor} text-xs font-medium`}>
                    <TrendIcon className="w-3.5 h-3.5" />
                    {m.trend === 'down' ? 'reduced' : 'improved'}
                  </div>
                </div>

                <div className={`text-4xl font-extrabold mb-1 ${m.iconColor}`}>
                  <AnimatedNumber value={m.value} suffix={m.suffix} />
                </div>
                <p className="text-white font-semibold text-sm mb-1">{m.label}</p>
                <p className="text-slate-500 text-xs">{m.sub}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-16" />

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            From the Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                className="glass rounded-2xl p-6 relative"
              >
                {/* Quote mark */}
                <div className="absolute top-4 right-5 text-5xl text-indigo-500/15 font-serif leading-none select-none">
                  &ldquo;
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {t.quote}
                </p>
                <div>
                  <p className="text-white font-semibold text-sm">{t.author}</p>
                  <p className="text-slate-600 text-xs">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
