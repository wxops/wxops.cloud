'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Lightbulb, MessageCircle, Rocket, ExternalLink, ArrowRight } from 'lucide-react'

const GITHUB_REPO =
  process.env.NEXT_PUBLIC_GITHUB_REPO ?? 'owner/wxops.cloud'

const BASE_URL = `https://github.com/${GITHUB_REPO}/issues/new`

const templates = [
  {
    id: 'feature',
    icon: Lightbulb,
    title: 'Feature Request',
    description:
      "Have an idea that would make the platform better? Suggest a new capability, integration, or workflow improvement.",
    labels: ['enhancement', 'feature-request'],
    templateFile: '01-feature-request.yml',
    titlePrefix: '[Feature]: ',
    color: 'from-indigo-500/15 to-indigo-600/5',
    border: 'border-indigo-500/25',
    iconBg: 'bg-indigo-500/15',
    iconColor: 'text-indigo-400',
    badgeColor: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
    ctaColor:
      'bg-indigo-500/10 border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20',
    preview: [
      'Feature category dropdown',
      'AS/WANT/SO-THAT problem format',
      'Proposed solution',
      'Business priority selector',
    ],
  },
  {
    id: 'feedback',
    icon: MessageCircle,
    title: 'General Feedback',
    description:
      'Share your experience — pain points, positive moments, documentation gaps, or anything else on your mind.',
    labels: ['feedback', 'community'],
    templateFile: '03-general-feedback.yml',
    titlePrefix: '[Feedback]: ',
    color: 'from-cyan-500/15 to-cyan-600/5',
    border: 'border-cyan-500/25',
    iconBg: 'bg-cyan-500/15',
    iconColor: 'text-cyan-400',
    badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    ctaColor:
      'bg-cyan-500/10 border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/20',
    preview: [
      'Feedback type (positive / pain point / idea)',
      'Your role context',
      'Impact level & NPS score',
      'Option to join beta programme',
    ],
  },
  {
    id: 'demo',
    icon: Rocket,
    title: 'Request Free Demo',
    description:
      "Skip the form — scroll down to our private feedback section, drop your email, and we'll reach out personally when we launch.",
    labels: [],
    templateFile: null,
    titlePrefix: '',
    color: 'from-emerald-500/15 to-emerald-600/5',
    border: 'border-emerald-500/25',
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    ctaColor:
      'bg-emerald-500/10 border-emerald-500/20 text-emerald-300 hover:bg-emerald-500/20',
    preview: [
      'Private — team only',
      'Pick a 30-min slot',
      'Free for early adopters',
      'No credit card, no strings',
    ],
  },
]

function buildIssueUrl(templateFile: string, titlePrefix: string): string {
  const params = new URLSearchParams({
    template: templateFile,
    title: titlePrefix,
  })
  return `${BASE_URL}?${params.toString()}`
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
}

export function TemplateBoard() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="template-board" className="pb-10 relative overflow-hidden">
      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Create a Ticket
          </h2>
          <p className="text-slate-500 text-sm max-w-xl">
            Choose a template below — it opens GitHub Issues with a pre-filled
            form so you spend less time writing and more time building.
          </p>
        </motion.div>

        {/* Template cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {templates.map((t) => {
            const Icon = t.icon
            const isDemo = t.id === 'demo'

            return (
              <motion.div
                key={t.id}
                variants={itemVariants}
                className={`group relative flex flex-col p-5 rounded-2xl bg-gradient-to-br ${t.color} border ${t.border} glass-hover overflow-hidden`}
              >
                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-xl ${t.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`w-5 h-5 ${t.iconColor}`} />
                </div>

                {/* Labels */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {t.labels.map((l) => (
                    <span
                      key={l}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${t.badgeColor}`}
                    >
                      {l}
                    </span>
                  ))}
                  {isDemo && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${t.badgeColor}`}
                    >
                      free
                    </span>
                  )}
                </div>

                {/* Title + desc */}
                <h3 className="text-white font-bold text-base mb-2">{t.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-1">
                  {t.description}
                </p>

                {/* Template preview */}
                <ul className="space-y-1 mb-5">
                  {t.preview.map((p) => (
                    <li
                      key={p}
                      className={`flex items-center gap-1.5 text-[11px] ${t.iconColor}`}
                    >
                      <span className="w-1 h-1 rounded-full bg-current opacity-60 flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>

                {/* CTA button */}
                {isDemo ? (
                  <a
                    href="#feedback-form"
                    className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-colors ${t.ctaColor}`}
                  >
                    Register Interest
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <a
                    href={buildIssueUrl(t.templateFile!, t.titlePrefix)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-colors ${t.ctaColor}`}
                  >
                    Open on GitHub
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </motion.div>
            )
          })}
        </motion.div>

        {/* All templates link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-5 text-center"
        >
          <a
            href={`https://github.com/${GITHUB_REPO}/issues/new/choose`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            View all templates on GitHub
            <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
