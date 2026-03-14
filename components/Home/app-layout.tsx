// app/layout.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Root layout — Navbar + Footer rendered once for ALL pages.
// Full site-wide SEO defaults (overridden per page via metadata exports).
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata, Viewport } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import './globals.css'

/* ─── Site-wide default metadata ─────────────────────────────────────────── */

export const metadata: Metadata = {
  // Default title template — pages override the %s part
  title: {
    default:  'AJAX Dispatch — Professional Truck Dispatch Services USA',
    template: '%s | AJAX Dispatch',
  },
  description:
    'AJAX Dispatch provides professional truck dispatch services for owner-operators & carriers across 48 states. ' +
    'Dedicated dispatchers, best rates, full paperwork coverage.',
  applicationName: 'AJAX Dispatch',
  referrer:        'origin-when-cross-origin',
  authors:   [{ name: 'AJAX Dispatch', url: 'https://www.ajaxdispatch.com' }],
  creator:   'AJAX Dispatch',
  publisher: 'AJAX Dispatch',
  metadataBase: new URL('https://www.ajaxdispatch.com'),
  alternates: {
    canonical: '/',
  },

  // Open Graph defaults — pages override as needed
  openGraph: {
    type:     'website',
    locale:   'en_US',
    url:      'https://www.ajaxdispatch.com',
    siteName: 'AJAX Dispatch',
    images: [
      {
        url:    '/og-image.jpg',   // place a 1200×630 image at /public/og-image.jpg
        width:  1200,
        height: 630,
        alt:    'AJAX Dispatch — Professional Truck Dispatch Services',
      },
    ],
  },

  // Twitter card defaults
  twitter: {
    card:    'summary_large_image',
    site:    '@ajaxdispatch',    // update to your handle
    creator: '@ajaxdispatch',
  },

  // Favicon / icons — place files in /public
  icons: {
    icon: [
      { url: '/favicon.ico',                  sizes: 'any'     },
      { url: '/icon-16.png',    type: 'image/png', sizes: '16x16'  },
      { url: '/icon-32.png',    type: 'image/png', sizes: '32x32'  },
      { url: '/icon-192.png',   type: 'image/png', sizes: '192x192'},
      { url: '/icon-512.png',   type: 'image/png', sizes: '512x512'},
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
    shortcut: '/favicon.ico',
  },

  // Web app manifest
  manifest: '/manifest.json',

  // Verification tags — replace with real codes from each platform
  verification: {
    google: 'REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_CODE',
    // bing:   'REPLACE_WITH_BING_WEBMASTER_CODE',
  },

  // Robots — allow indexing by default (pages can override)
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:              true,
      follow:             true,
      'max-video-preview':  -1,
      'max-image-preview':  'large',
      'max-snippet':        -1,
    },
  },

  // Category for app stores / directories
  category: 'transportation',
}

/* ─── Viewport ───────────────────────────────────────────────────────────── */

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F59E0B' },
    { media: '(prefers-color-scheme: dark)',  color: '#0A0A14' },
  ],
  width:        'device-width',
  initialScale: 1,
  maximumScale: 5,
}

/* ─── Root Layout ─────────────────────────────────────────────────────────── */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to font providers */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Bebas Neue — display font used for headings */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
        {/* DNS-prefetch for external image CDN */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="antialiased bg-white text-gray-900">
        {/* Navbar — rendered once for every page */}
        <Navbar />

        {/* Page content */}
        {children}

        {/* Footer — rendered once for every page */}
        <Footer />
      </body>
    </html>
  )
}
