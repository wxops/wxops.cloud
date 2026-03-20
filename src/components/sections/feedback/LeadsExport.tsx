'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  MessageSquare,
  Users,
  Heart,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  GitBranch,
} from 'lucide-react'

/* ── Types ─────────────────────────────────────────────────────── */
interface GHUser {
  login: string
  avatar_url: string
  html_url: string
}

interface GHDiscussion {
  number: number
  title: string
  html_url: string
  body: string
  user: GHUser
  created_at: string
  updated_at: string
  comments: number
  reactions: { total_count: number }
  category: { name: string } | null
  state: string
}

/* ── Sub-components ─────────────────────────────────────────────── */
function StatCard({
  icon: Icon,
  value,
  label,
  color,
}: {
  icon: React.ElementType
  value: number
  label: string
  color: 'cyan' | 'indigo' | 'rose'
}) {
  const palette = {
    cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    indigo: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
    rose: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
  }
  return (
    <div className="glass rounded-xl p-4 text-center">
      <div className={`w-8 h-8 rounded-lg border flex items-center justify-center mx-auto mb-2 ${palette[color]}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="text-xl font-bold text-white">{value}</div>
      <div className="text-[11px] text-slate-600 mt-0.5">{label}</div>
    </div>
  )
}

function DiscussionRow({ d }: { d: GHDiscussion }) {
  const ago = (() => {
    const diff = Date.now() - new Date(d.updated_at).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    const days = Math.floor(hrs / 24)
    if (days < 30) return `${days}d ago`
    return new Date(d.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  })()

  return (
    <a
      href={d.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3.5 p-4 glass-hover rounded-xl transition-all group"
    >
      {/* Avatar */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={d.user?.avatar_url}
        alt={d.user?.login}
        className="w-8 h-8 rounded-full flex-shrink-0 mt-0.5 border border-white/[0.08]"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors leading-snug truncate">
            {d.title}
          </p>
          <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 flex-shrink-0 mt-0.5 transition-colors" />
        </div>
        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
          <span className="text-[11px] text-slate-500">
            <span className="text-slate-400">@{d.user?.login}</span>
          </span>
          {d.category && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.07] text-slate-500">
              {d.category.name}
            </span>
          )}
          {d.comments > 0 && (
            <span className="flex items-center gap-1 text-[11px] text-slate-600">
              <MessageSquare className="w-3 h-3" /> {d.comments}
            </span>
          )}
          {d.reactions?.total_count > 0 && (
            <span className="flex items-center gap-1 text-[11px] text-slate-600">
              <Heart className="w-3 h-3" /> {d.reactions.total_count}
            </span>
          )}
          <span className="text-[11px] text-slate-600 ml-auto">{ago}</span>
        </div>
      </div>
    </a>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="glass rounded-xl p-4 flex items-center gap-3 animate-pulse">
          <div className="w-8 h-8 rounded-full bg-white/[0.06] flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-white/[0.06] rounded w-3/4" />
            <div className="h-2 bg-white/[0.04] rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Main component ─────────────────────────────────────────────── */
export function LeadsExport() {
  const [discussions, setDiscussions] = useState<GHDiscussion[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showAll, setShowAll] = useState(false)

  const repo = process.env.NEXT_PUBLIC_GITHUB_REPO ?? ''
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN ?? ''

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  async function fetchDiscussions() {
    if (!repo) return
    setLoading(true)
    setError('')
    try {
      const headers: Record<string, string> = {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      }
      if (token) headers['Authorization'] = `Bearer ${token}`

      const res = await fetch(
        `https://api.github.com/repos/${repo}/discussions?per_page=20&sort=updated&direction=desc`,
        { headers }
      )
      if (!res.ok) {
        const msg = res.status === 404
          ? 'Repository not found or Discussions not enabled.'
          : res.status === 403
          ? 'API rate limit reached. Set NEXT_PUBLIC_GITHUB_TOKEN for higher limits.'
          : `GitHub API error ${res.status}`
        throw new Error(msg)
      }
      const data: GHDiscussion[] = await res.json()
      setDiscussions(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch discussions')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDiscussions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const totalReactions = discussions.reduce((s, d) => s + (d.reactions?.total_count ?? 0), 0)
  const uniqueAuthors = new Set(discussions.map((d) => d.user?.login).filter(Boolean)).size
  const visible = showAll ? discussions : discussions.slice(0, 5)

  return (
    <section className="pb-24 relative overflow-hidden">
      <div className="section-container relative z-10">
        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-12" />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <GitBranch className="w-4 h-4 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">
                  Community Activity
                </h3>
                {discussions.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold">
                    {discussions.length}
                  </span>
                )}
              </div>
              <p className="text-slate-600 text-xs">
                Live from{' '}
                {repo ? (
                  <a
                    href={`https://github.com/${repo}/discussions`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:underline"
                  >
                    {repo}/discussions
                  </a>
                ) : (
                  <span>GitHub — set <span className="font-mono text-indigo-400">NEXT_PUBLIC_GITHUB_REPO</span> to enable</span>
                )}
              </p>
            </div>

            <button
              onClick={fetchDiscussions}
              disabled={loading}
              className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white glass-hover rounded-lg transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading && discussions.length > 0 ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {/* States */}
          {!repo ? (
            <div className="glass rounded-2xl p-8 text-center">
              <AlertCircle className="w-8 h-8 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">
                Set <span className="font-mono text-indigo-400">NEXT_PUBLIC_GITHUB_REPO</span> in your environment to display live discussions.
              </p>
            </div>
          ) : loading && discussions.length === 0 ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="glass rounded-2xl p-5 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <p className="text-rose-300 text-sm">{error}</p>
            </div>
          ) : discussions.length === 0 ? (
            <div className="glass rounded-2xl p-8 text-center">
              <MessageSquare className="w-8 h-8 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">
                No discussions yet — start one using the Giscus widget above!
              </p>
            </div>
          ) : (
            <>
              {/* Summary stats */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <StatCard icon={MessageSquare} value={discussions.length} label="Discussions" color="cyan" />
                <StatCard icon={Users} value={uniqueAuthors} label="Participants" color="indigo" />
                <StatCard icon={Heart} value={totalReactions} label="Reactions" color="rose" />
              </div>

              {/* Discussion list */}
              <div className="space-y-2">
                {visible.map((d) => (
                  <DiscussionRow key={d.number} d={d} />
                ))}
              </div>

              {discussions.length > 5 && (
                <button
                  onClick={() => setShowAll((v) => !v)}
                  className="mt-3 w-full flex items-center justify-center gap-1.5 py-2.5 text-xs text-slate-500 hover:text-white glass-hover rounded-xl transition-all"
                >
                  {showAll ? (
                    <><ChevronUp className="w-3.5 h-3.5" /> Show less</>
                  ) : (
                    <><ChevronDown className="w-3.5 h-3.5" /> Show {discussions.length - 5} more</>
                  )}
                </button>
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
