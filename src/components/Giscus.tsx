'use client'

import { useEffect, useRef } from 'react'
import { ExternalLink } from 'lucide-react'

interface GiscusProps {
  repo?: string
  repoId?: string
  category?: string
  categoryId?: string
  mapping?: 'pathname' | 'url' | 'title' | 'og:title' | 'specific' | 'number'
  term?: string
  reactionsEnabled?: boolean
  inputPosition?: 'top' | 'bottom'
  theme?: string
  lang?: string
}

export function GiscusEmbed({
  repo = process.env.NEXT_PUBLIC_GISCUS_REPO ?? '',
  repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? '',
  category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? 'General',
  categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? '',
  mapping = 'pathname',
  term,
  reactionsEnabled = true,
  inputPosition = 'bottom',
  theme = 'dark_protanopia',
  lang = 'en',
}: GiscusProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || !repo || !repoId) return

    // Remove stale script + iframe on re-mount / config change
    while (container.firstChild) container.removeChild(container.firstChild)

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'

    const attrs: Record<string, string> = {
      'data-repo': repo,
      'data-repo-id': repoId,
      'data-category': category,
      'data-category-id': categoryId,
      'data-mapping': mapping,
      'data-strict': '0',
      'data-reactions-enabled': reactionsEnabled ? '1' : '0',
      'data-emit-metadata': '0',
      'data-input-position': inputPosition,
      'data-theme': theme,
      'data-lang': lang,
      'data-loading': 'lazy',
    }
    if (term) attrs['data-term'] = term

    Object.entries(attrs).forEach(([k, v]) => script.setAttribute(k, v))
    container.appendChild(script)

    return () => {
      while (container.firstChild) container.removeChild(container.firstChild)
    }
  }, [repo, repoId, category, categoryId, mapping, term, reactionsEnabled, inputPosition, theme, lang])

  if (!repo || !repoId) {
    return (
      <div className="glass rounded-2xl p-8 text-center space-y-3">
        <p className="text-slate-400 text-sm leading-relaxed">
          Public discussions are powered by{' '}
          <span className="text-indigo-400 font-medium">Giscus</span> (GitHub
          Discussions). Configure the environment variables below to enable them.
        </p>
        <div className="font-mono text-xs text-slate-600 space-y-1 bg-black/30 rounded-lg p-4 text-left">
          <p>
            <span className="text-indigo-400">NEXT_PUBLIC_GISCUS_REPO</span>=owner/repo
          </p>
          <p>
            <span className="text-indigo-400">NEXT_PUBLIC_GISCUS_REPO_ID</span>=R_xxxxxxxxxx
          </p>
          <p>
            <span className="text-indigo-400">NEXT_PUBLIC_GISCUS_CATEGORY</span>=General
          </p>
          <p>
            <span className="text-indigo-400">NEXT_PUBLIC_GISCUS_CATEGORY_ID</span>=DIC_xxxxxxxxxx
          </p>
        </div>
        <a
          href="https://giscus.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 underline underline-offset-2"
        >
          Get your config at giscus.app <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    )
  }

  return <div ref={containerRef} className="[&_.giscus]:mt-0 [&_.giscus-frame]:w-full" />
}
