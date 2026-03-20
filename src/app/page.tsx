import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/sections/Hero'
import { GoldenPath } from '@/components/sections/GoldenPath'
import { Features } from '@/components/sections/Features'
import { Architecture } from '@/components/sections/Architecture'
import { CTA } from '@/components/sections/CTA'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050308] overflow-x-hidden">
      <Navbar />
      <Hero />
      <GoldenPath />
      <Features />
      <Architecture />
      <CTA />
      <Footer />
    </main>
  )
}
