'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Lock,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  User,
  Mail,
  Building2,
  Briefcase,
} from 'lucide-react'
import { GiscusEmbed } from '@/components/Giscus'

/* ── Types ────────────────────────────────────────────────────── */
type SubmitStatus = 'idle' | 'success'

interface FormState {
  name: string
  email: string
  company: string
  role: string
  interestLevel: string
  message: string
}

/* ── Constants ────────────────────────────────────────────────── */
const INTEREST_OPTIONS = [
  { value: 'just-curious', label: 'Just curious / research', emoji: '🔍' },
  { value: 'want-demo', label: 'Want an early demo', emoji: '🎯' },
  { value: 'ready-to-adopt', label: 'Ready to pilot / adopt', emoji: '🚀' },
  { value: 'want-to-contribute', label: 'Want to contribute', emoji: '🤝' },
]

const ROLE_OPTIONS = [
  'Developer / Software Engineer',
  'Platform Engineer',
  'DevOps / SRE',
  'Engineering Manager',
  'CTO / VP Engineering',
  'Security Engineer',
  'Architect',
  'Student / Learner',
  'Other',
]

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  company: '',
  role: '',
  interestLevel: 'want-demo',
  message: '',
}

const BUSINESS_MAIL = 'xeusnguyen@wxops.cloud'

/* ── Helpers ──────────────────────────────────────────────────── */
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/* ── Sub-components ───────────────────────────────────────────── */
function InputField({
  label,
  id,
  icon: Icon,
  error,
  children,
}: {
  label: string
  id: string
  icon: React.ElementType
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-medium text-slate-400 mb-1.5"
      >
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 pointer-events-none" />
        {children}
      </div>
      {error && (
        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  )
}

function TextInput({
  id,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
  className = '',
}: {
  id: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  required?: boolean
  className?: string
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      autoComplete={type === 'email' ? 'email' : 'off'}
      className={`w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all ${className}`}
    />
  )
}

/* ── Main component ───────────────────────────────────────────── */
export function FeedbackForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(form.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    const interest = INTEREST_OPTIONS.find((o) => o.value === form.interestLevel)
    const body = [
      `Name:     ${form.name.trim()}`,
      `Email:    ${form.email.trim()}`,
      `Company:  ${form.company.trim() || '—'}`,
      `Role:     ${form.role || '—'}`,
      `Interest: ${interest ? `${interest.emoji} ${interest.label}` : form.interestLevel}`,
      '',
      'Message:',
      form.message.trim() || '(no message)',
    ].join('\n')

    window.location.href = `mailto:${BUSINESS_MAIL}?subject=${encodeURIComponent(
      `[WxOps IDP] Early Access — ${form.name.trim()}`
    )}&body=${encodeURIComponent(body)}`

    setStatus('success')
    setForm(INITIAL_FORM)
  }

  return (
    <section id="feedback-form" className="pb-16 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-purple-600/6 blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Share Your Feedback
          </h2>
          <p className="text-slate-500 text-sm max-w-xl">
            Join the public{' '}
            <span className="text-cyan-300 font-medium">GitHub Discussion</span>{' '}
            or send a{' '}
            <span className="text-indigo-300 font-medium">private message</span>{' '}
            directly to our team.
          </p>
        </motion.div>

        {/* ── Two-column layout ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
        >
          {/* ── Left: Giscus public discussion ─────────────── */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-500/25">
                <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white leading-none">Public Discussion</p>
                <p className="text-[11px] text-slate-500 mt-0.5">via GitHub Discussions · requires a GitHub account</p>
              </div>
            </div>
            <GiscusEmbed mapping="pathname" term="feedback" />
          </div>

          {/* ── Right: Private mailto form ──────────────────── */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/25">
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white leading-none">Private Message</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Sent directly to the W&apos;xOps team — never shared</p>
              </div>
            </div>

            {status === 'success' ? (
              <SuccessCard onReset={() => setStatus('idle')} />
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="glass rounded-2xl p-6 space-y-4"
              >
                {/* Row: name + email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="Full Name *" id="name" icon={User} error={errors.name}>
                    <TextInput
                      id="name"
                      value={form.name}
                      onChange={(v) => setField('name', v)}
                      placeholder="Ada Lovelace"
                      required
                    />
                  </InputField>

                  <InputField label="Email Address *" id="email" icon={Mail} error={errors.email}>
                    <TextInput
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(v) => setField('email', v)}
                      placeholder="ada@company.com"
                      required
                    />
                  </InputField>
                </div>

                {/* Row: company + role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="Company / Organisation" id="company" icon={Building2}>
                    <TextInput
                      id="company"
                      value={form.company}
                      onChange={(v) => setField('company', v)}
                      placeholder="Acme Corp"
                    />
                  </InputField>

                  <div>
                    <label htmlFor="role" className="block text-xs font-medium text-slate-400 mb-1.5">
                      Role
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 pointer-events-none" />
                      <select
                        id="role"
                        value={form.role}
                        onChange={(e) => setField('role', e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-[#0d0d18]">Select role…</option>
                        {ROLE_OPTIONS.map((r) => (
                          <option key={r} value={r} className="bg-[#0d0d18]">{r}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Interest level */}
                <div>
                  <p className="text-xs font-medium text-slate-400 mb-2">Interest Level</p>
                  <div className="grid grid-cols-2 gap-2">
                    {INTEREST_OPTIONS.map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border cursor-pointer transition-all text-sm ${
                          form.interestLevel === opt.value
                            ? 'bg-indigo-500/15 border-indigo-500/40 text-white'
                            : 'bg-white/[0.03] border-white/[0.06] text-slate-400 hover:border-white/[0.12]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="interestLevel"
                          value={opt.value}
                          checked={form.interestLevel === opt.value}
                          onChange={() => setField('interestLevel', opt.value)}
                          className="sr-only"
                        />
                        <span className="text-base leading-none">{opt.emoji}</span>
                        <span className="text-xs leading-tight">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-slate-400 mb-1.5">
                    Message <span className="text-slate-600">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setField('message', e.target.value)}
                    placeholder="Tell us about your use case, pain points, or what you're most excited to explore..."
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white font-semibold text-sm shadow-lg shadow-indigo-500/20 hover:opacity-95 transition-all"
                >
                  <Send className="w-4 h-4" />
                  Send Feedback
                </button>

                <p className="text-center text-[11px] text-slate-600">
                  No spam. No vendor pitch. Just a real conversation about what you need.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── Success state ────────────────────────────────────────────── */
function SuccessCard({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-2xl p-8 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">
        Almost there! 📬
      </h3>
      <p className="text-slate-400 text-sm max-w-sm mx-auto mb-5 leading-relaxed">
        Your email client should have opened with a pre-filled message. Hit{' '}
        <span className="text-white font-medium">Send</span> to complete your
        submission — we&apos;ll get back to you personally.
      </p>
      <button
        onClick={onReset}
        className="text-xs text-slate-600 hover:text-slate-400 underline underline-offset-2 transition-colors"
      >
        Submit another response
      </button>
    </motion.div>
  )
}
