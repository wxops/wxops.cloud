'use client'

import { Layers, Github, Globe, Heart } from 'lucide-react'
import Image from 'next/image'

const footerLinks = {
  Platform: [
    { label: 'Golden Path', href: '#golden-path' },
    { label: 'Service Catalog', href: '#features' },
    { label: 'Identity & Access', href: '#features' },
    { label: 'CI/CD Pipelines', href: '#features' },
  ],
  'Open Source': [
    { label: 'Backstage', href: 'https://backstage.io', external: true },
    { label: 'Terraform', href: 'https://terraform.io', external: true },
    { label: 'ArgoCD', href: 'https://argoproj.github.io/argo-cd', external: true },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#050308]">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
              <Image src="/favicon-32x32.png" alt="W'xOps logo" width={32} height={32} className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-gradient">W&apos;xOps IDP</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Platform Engineering with the Golden Path. One portal for every
              developer, every team, every service.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/wxops"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-500 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 text-slate-500 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-sm font-semibold text-white mb-4">{section}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={'external' in link && link.external ? '_blank' : undefined}
                      rel={'external' in link && link.external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-slate-500 hover:text-slate-200 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} W&apos;xOps. Open source under MIT License.
          </p>
          <p className="text-sm text-slate-600 flex items-center gap-1.5">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500" /> by
            W'xOps Team from Vietnam 🇻🇳
          </p>
        </div>
      </div>
    </footer>
  )
}
