// ═══════════════════════════════════════════════════════════════════════════
// FILE 1 of 4: app/robots.ts
// Generates /robots.txt — tells crawlers what to index
// ═══════════════════════════════════════════════════════════════════════════

// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow:     '/',
        disallow:  [
          '/api/',        // Never expose API routes
          '/_next/',      // Internal Next.js paths
          '/admin/',      // Any admin area
        ],
      },
      // Block AI training crawlers if desired
      {
        userAgent: 'GPTBot',
        disallow:  ['/'],
      },
      {
        userAgent: 'CCBot',
        disallow:  ['/'],
      },
    ],
    sitemap:   'https://www.ajaxdispatch.com/sitemap.xml',
    host:      'https://www.ajaxdispatch.com',
  }
}


// ═══════════════════════════════════════════════════════════════════════════
// FILE 2 of 4: app/sitemap.ts
// Generates /sitemap.xml — all public pages with priority signals
// ═══════════════════════════════════════════════════════════════════════════

// app/sitemap.ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.ajaxdispatch.com'
  const now  = new Date()

  return [
    {
      url:              `${base}/`,
      lastModified:     now,
      changeFrequency:  'weekly',
      priority:         1.0,
    },
    {
      url:              `${base}/services`,
      lastModified:     now,
      changeFrequency:  'monthly',
      priority:         0.9,
    },
    {
      url:              `${base}/contact`,
      lastModified:     now,
      changeFrequency:  'monthly',
      priority:         0.9,
    },
    {
      url:              `${base}/about`,
      lastModified:     now,
      changeFrequency:  'monthly',
      priority:         0.7,
    },
    {
      url:              `${base}/careers`,
      lastModified:     now,
      changeFrequency:  'weekly',     // changes when roles open/close
      priority:         0.6,
    },
    {
      url:              `${base}/privacy-policy`,
      lastModified:     now,
      changeFrequency:  'yearly',
      priority:         0.2,
    },
    {
      url:              `${base}/terms-of-service`,
      lastModified:     now,
      changeFrequency:  'yearly',
      priority:         0.2,
    },
  ]
}


// ═══════════════════════════════════════════════════════════════════════════
// FILE 3 of 4: public/manifest.json
// Web app manifest — enables "Add to Home Screen" on mobile
// Place this file at: public/manifest.json
// ═══════════════════════════════════════════════════════════════════════════

/*
public/manifest.json content:

{
  "name": "AJAX Dispatch",
  "short_name": "AJAX Dispatch",
  "description": "Professional truck dispatch services for owner-operators & carriers across the USA.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0A0A14",
  "theme_color": "#F59E0B",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ],
  "categories": ["business", "transportation"],
  "screenshots": [
    {
      "src": "/screenshot-desktop.jpg",
      "sizes": "1280x720",
      "type": "image/jpeg",
      "form_factor": "wide",
      "label": "AJAX Dispatch homepage"
    }
  ]
}
*/


// ═══════════════════════════════════════════════════════════════════════════
// FILE 4 of 4: app/opengraph-image.tsx
// Auto-generates the /og-image.jpg using Next.js ImageResponse
// This appears when the site is shared on Twitter, LinkedIn, iMessage etc.
// ═══════════════════════════════════════════════════════════════════════════

// app/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt     = 'AJAX Dispatch — Professional Truck Dispatch Services'
export const size    = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width:           '100%',
          height:          '100%',
          display:         'flex',
          flexDirection:   'column',
          alignItems:      'flex-start',
          justifyContent:  'flex-end',
          backgroundColor: '#0A0A14',
          padding:         '64px',
          position:        'relative',
          overflow:        'hidden',
        }}
      >
        {/* Background dot grid */}
        <div style={{
          position:        'absolute',
          inset:           0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize:  '40px 40px',
        }} />

        {/* Amber glow */}
        <div style={{
          position:   'absolute',
          left:       '-80px',
          top:        '50%',
          transform:  'translateY(-50%)',
          width:      '600px',
          height:     '600px',
          background: 'radial-gradient(circle, rgba(245,158,11,0.18) 0%, transparent 65%)',
        }} />

        {/* AJAX watermark */}
        <div style={{
          position:   'absolute',
          right:      '40px',
          top:        '20px',
          fontSize:   '220px',
          fontWeight: 900,
          color:      'rgba(255,255,255,0.025)',
          lineHeight: 1,
          letterSpacing: '-4px',
        }}>
          AJAX
        </div>

        {/* Logo mark */}
        <div style={{
          display:         'flex',
          alignItems:      'center',
          gap:             '16px',
          marginBottom:    '32px',
        }}>
          <div style={{
            width:           '48px',
            height:          '48px',
            backgroundColor: '#F59E0B',
            clipPath:        'polygon(20% 0%,80% 0%,100% 50%,80% 100%,20% 100%,0% 50%)',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            fontSize:        '20px',
            fontWeight:      900,
            color:           'white',
          }}>
            A
          </div>
          <span style={{ fontSize: '28px', fontWeight: 900, color: 'white', letterSpacing: '4px' }}>
            AJAX<span style={{ color: '#F59E0B' }}>.</span>
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '24px' }}>
          <div style={{ fontSize: '72px', fontWeight: 900, color: 'white',    lineHeight: 0.88, letterSpacing: '-1px' }}>KEEP YOUR</div>
          <div style={{ fontSize: '72px', fontWeight: 900, color: '#F59E0B',  lineHeight: 0.88, letterSpacing: '-1px' }}>TRUCKS</div>
          <div style={{ fontSize: '72px', fontWeight: 900, color: 'white',    lineHeight: 0.88, letterSpacing: '-1px' }}>MOVING.</div>
        </div>

        {/* Subtext */}
        <div style={{ fontSize: '22px', color: 'rgba(156,163,175,1)', fontWeight: 400, maxWidth: '560px', lineHeight: 1.5, marginBottom: '36px' }}>
          Professional dispatch for owner-operators & carriers across 48 states.
          Dedicated dispatchers · $2.80/mi avg · Start in 24 hours.
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '40px' }}>
          {[
            { v: '500+',    l: 'Carriers'      },
            { v: '$2.8/mi', l: 'Avg Rate'      },
            { v: '98%',     l: 'On-Time'       },
            { v: '48',      l: 'States'        },
          ].map(s => (
            <div key={s.v} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ fontSize: '32px', fontWeight: 900, color: '#F59E0B', lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: '12px', color: 'rgba(107,114,128,1)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Bottom amber line */}
        <div style={{
          position:   'absolute',
          bottom:     0,
          left:       0,
          right:      0,
          height:     '4px',
          background: 'linear-gradient(to right, transparent, rgba(245,158,11,0.8), transparent)',
        }} />
      </div>
    ),
    { ...size },
  )
}
