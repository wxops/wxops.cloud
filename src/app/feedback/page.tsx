import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { FeedbackHero } from '@/components/sections/feedback/FeedbackHero'
import { TemplateBoard } from '@/components/sections/feedback/TemplateBoard'
import { FeedbackForm } from '@/components/sections/feedback/FeedbackForm'
import { LeadsExport } from '@/components/sections/feedback/LeadsExport'

export const metadata: Metadata = {
  title: "Feedback & Early Access — W'xOps IDP",
  description:
    "Help shape the W'xOps Internal Developer Portal. Share feedback, report bugs, request features, or register for a free MVP demo.",
}

export default function FeedbackPage() {
  return (
    <main className="min-h-screen bg-[#050308] overflow-x-hidden">
      <Navbar />
      <FeedbackHero />

      {/* Divider */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>

      <TemplateBoard />

      {/* Divider */}
      <div className="section-container py-2">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>

      <FeedbackForm />
      <LeadsExport />
      <Footer />
    </main>
  )
}
