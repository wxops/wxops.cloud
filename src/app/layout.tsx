import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'W\'xOps IDP — Internal Developer Portal',
  description:
    'A Platform Engineering showcase: The Golden Path to modern cloud-native development. One identity, one catalog, zero friction.',
  keywords: [
    'Internal Developer Portal',
    'Platform Engineering',
    'Golden Path',
    'DevOps',
    'Kubernetes',
    'IDP',
    'Developer Experience',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon-128x128.png', sizes: '128x128', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "W'xOps IDP — Internal Developer Portal",
    description:
      'Platform Engineering done right. Onboard in minutes, deploy with confidence, scale without friction.',
    type: 'website',
    url: siteUrl,
    siteName: "W'xOps IDP",
    images: [
      {
        url: '/thumbnail.png',
        width: 1200,
        height: 630,
        alt: "W'xOps IDP — Internal Developer Portal",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "W'xOps IDP — Internal Developer Portal",
    description:
      'Platform Engineering done right. Onboard in minutes, deploy with confidence, scale without friction.',
    images: ['/thumbnail.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script strategy="afterInteractive" src="https://analytics.xeusnguyen.xyz/script.js" data-website-id="6c2142a0-ff3f-4c50-82d3-9936b776de74" />
      </head>
      <body className="bg-[#050308] text-slate-100 antialiased">{children}</body>
    </html>
  )
}
