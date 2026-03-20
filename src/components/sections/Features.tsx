'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  KeyRound,
  MousePointerClick,
  BookOpen,
  GitMerge,
  FileCode2,
  Eye,
  CheckCircle2,
} from 'lucide-react'

const features = [
  {
    icon: KeyRound,
    title: 'Universal Identity',
    description:
      'One SSO integration to rule them all. Connect Okta, Azure AD, GitHub, or any OIDC/SAML provider in minutes. Every service, every team, one identity.',
    evidence: 'Zero unauthorized access incidents',
    evidenceTag: 'Security Win',
    color: 'from-indigo-500/15 to-indigo-600/5',
    border: 'border-indigo-500/25',
    iconBg: 'bg-indigo-500/15',
    iconColor: 'text-indigo-400',
    tagColor: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
    checks: ['Okta, Azure AD, LDAP, GitHub', 'OIDC & SAML 2.0', 'MFA out of the box', 'Role sync from IdP'],
  },
  {
    icon: MousePointerClick,
    title: 'One-Click Onboarding',
    description:
      "New developer? Pick a Golden Path template, fill in a name, click create. Your service scaffold, pipeline, secrets, and Kubernetes namespace are ready in < 5 minutes.",
    evidence: '2 weeks → 2 hours onboarding',
    evidenceTag: 'Speed Win',
    color: 'from-purple-500/15 to-purple-600/5',
    border: 'border-purple-500/25',
    iconBg: 'bg-purple-500/15',
    iconColor: 'text-purple-400',
    tagColor: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    checks: ['Service scaffold from templates', 'Namespace + RBAC auto-provisioned', 'Secrets injected via Vault', 'Pipeline wired automatically'],
  },
  {
    icon: BookOpen,
    title: 'Service Catalog',
    description:
      'A living, searchable catalog of every internal service, API, library, and resource. Browse dependencies, find owners, and deploy with one click.',
    evidence: '500+ self-service actions/month',
    evidenceTag: 'Productivity Win',
    color: 'from-cyan-500/15 to-cyan-600/5',
    border: 'border-cyan-500/25',
    iconBg: 'bg-cyan-500/15',
    iconColor: 'text-cyan-400',
    tagColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    checks: ['Powered by Backstage', 'Auto-discovered services', 'Owner + runbook links', 'Dependency graph view'],
  },
  {
    icon: GitMerge,
    title: 'Automated Pipelines',
    description:
      'Pre-built CI/CD pipelines with SAST, container scanning, and automated test gates. Push code, the platform handles the rest. Humans approve, machines execute.',
    evidence: '15x increase in deploy frequency',
    evidenceTag: 'Velocity Win',
    color: 'from-violet-500/15 to-violet-600/5',
    border: 'border-violet-500/25',
    iconBg: 'bg-violet-500/15',
    iconColor: 'text-violet-400',
    tagColor: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
    checks: ['GitHub Actions & ArgoCD', 'SAST + container scanning', 'Canary & blue/green deploy', 'GitOps with auto-rollback'],
  },
  {
    icon: FileCode2,
    title: 'Policy as Code',
    description:
      'OPA and Conftest policies enforce security, compliance, and best practices on every deploy. Automated audit trails, zero manual checklist.',
    evidence: '100% automated compliance checks',
    evidenceTag: 'Compliance Win',
    color: 'from-amber-500/15 to-amber-600/5',
    border: 'border-amber-500/25',
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-400',
    tagColor: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    checks: ['OPA / Conftest policies', 'SOC2 & ISO27001 ready', 'Automated audit evidence', 'Drift detection built-in'],
  },
  {
    icon: Eye,
    title: 'End-to-End Observability',
    description:
      'Logs, metrics, and distributed traces pre-configured on every new service. Grafana dashboards, Prometheus alerts, and Jaeger tracing — zero config.',
    evidence: 'MTTR reduced by 83%',
    evidenceTag: 'Reliability Win',
    color: 'from-emerald-500/15 to-emerald-600/5',
    border: 'border-emerald-500/25',
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
    tagColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    checks: ['Grafana + Prometheus + Loki', 'OpenTelemetry traces (Jaeger)', 'SLO dashboards auto-generated', 'PagerDuty / Slack alerts wired'],
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

export function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="features" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-purple-600/5 blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-4">
            IDP Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything a Developer{' '}
            <span className="text-gradient">Needs</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Six core pillars — each delivering measurable impact. Each backed by
            real evidence from production deployments.
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((f) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                variants={itemVariants}
                className={`group relative flex flex-col p-6 rounded-2xl bg-gradient-to-br ${f.color} border ${f.border} overflow-hidden glass-hover cursor-default`}
              >
                {/* Hover top-border glow */}
                <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-current to-transparent ${f.iconColor} opacity-0 group-hover:opacity-40 transition-opacity`} />

                {/* Icon + title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${f.iconBg} flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-5 h-5 ${f.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg leading-tight">
                      {f.title}
                    </h3>
                    <span className={`mt-1 inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border ${f.tagColor}`}>
                      {f.evidenceTag}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
                  {f.description}
                </p>

                {/* Checklist */}
                <ul className="space-y-1.5 mb-5">
                  {f.checks.map((check) => (
                    <li key={check} className="flex items-start gap-2 text-xs text-slate-500">
                      <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${f.iconColor}`} />
                      {check}
                    </li>
                  ))}
                </ul>

                {/* Evidence footer */}
                <div className={`pt-4 border-t border-white/[0.06] flex items-center gap-2`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${f.iconBg} ${f.iconColor} dot-active`} />
                  <span className="text-xs text-slate-500">
                    Result:{' '}
                    <span className={`font-semibold ${f.iconColor}`}>{f.evidence}</span>
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
