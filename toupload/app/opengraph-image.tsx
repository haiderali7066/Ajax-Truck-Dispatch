// app/opengraph-image.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Auto-generates the OG image served at /opengraph-image
// Next.js uses this automatically for all og:image tags.
// Appears when the site is shared on Twitter, LinkedIn, iMessage, Slack, etc.
//
// No external image file needed — this generates it at request time.
// ─────────────────────────────────────────────────────────────────────────────

import { ImageResponse } from 'next/og'

export const runtime     = 'edge'
export const alt         = 'AJAX Dispatch — Professional Truck Dispatch Services'
export const size        = { width: 1200, height: 630 }
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
        {/* Dot grid background */}
        <div
          style={{
            position:        'absolute',
            inset:           0,
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize:  '40px 40px',
          }}
        />

        {/* Amber glow — left bloom */}
        <div
          style={{
            position:   'absolute',
            left:       '-80px',
            top:        '50%',
            transform:  'translateY(-50%)',
            width:      '600px',
            height:     '600px',
            background: 'radial-gradient(circle, rgba(245,158,11,0.18) 0%, transparent 65%)',
          }}
        />

        {/* Amber glow — top right */}
        <div
          style={{
            position:   'absolute',
            right:      '-40px',
            top:        '-40px',
            width:      '380px',
            height:     '380px',
            background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 62%)',
          }}
        />

        {/* Large "AJAX" watermark — faded background text */}
        <div
          style={{
            position:      'absolute',
            right:         '-20px',
            top:           '-10px',
            fontSize:      '280px',
            fontWeight:    900,
            color:         'rgba(255,255,255,0.022)',
            lineHeight:    1,
            letterSpacing: '-8px',
            fontFamily:    'sans-serif',
          }}
        >
          AJAX
        </div>

        {/* Logo — hexagon mark + wordmark */}
        <div
          style={{
            display:      'flex',
            alignItems:   'center',
            gap:          '16px',
            marginBottom: '36px',
          }}
        >
          {/* Hexagon "A" mark */}
          <div
            style={{
              width:           '52px',
              height:          '52px',
              backgroundColor: '#F59E0B',
              clipPath:        'polygon(20% 0%,80% 0%,100% 50%,80% 100%,20% 100%,0% 50%)',
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
              fontSize:        '22px',
              fontWeight:      900,
              color:           '#0A0A14',
              fontFamily:      'sans-serif',
            }}
          >
            A
          </div>
          {/* Wordmark */}
          <span
            style={{
              fontSize:      '30px',
              fontWeight:    900,
              color:         'white',
              letterSpacing: '4px',
              fontFamily:    'sans-serif',
            }}
          >
            AJAX
            <span style={{ color: '#F59E0B' }}>.</span>
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            display:      'flex',
            flexDirection: 'column',
            gap:          '2px',
            marginBottom: '28px',
          }}
        >
          <div style={{ fontSize: '76px', fontWeight: 900, color: 'white',   lineHeight: 0.88, letterSpacing: '-2px', fontFamily: 'sans-serif' }}>
            KEEP YOUR
          </div>
          <div style={{ fontSize: '76px', fontWeight: 900, color: '#F59E0B', lineHeight: 0.88, letterSpacing: '-2px', fontFamily: 'sans-serif' }}>
            TRUCKS
          </div>
          <div style={{ fontSize: '76px', fontWeight: 900, color: 'white',   lineHeight: 0.88, letterSpacing: '-2px', fontFamily: 'sans-serif' }}>
            MOVING.
          </div>
        </div>

        {/* Subtext description */}
        <div
          style={{
            fontSize:     '21px',
            color:        'rgba(156,163,175,1)',
            fontWeight:   400,
            maxWidth:     '580px',
            lineHeight:   1.55,
            marginBottom: '40px',
            fontFamily:   'sans-serif',
          }}
        >
          Professional dispatch for owner-operators &amp; carriers across 48 states.
          Dedicated dispatchers · $2.80/mi avg · Start in 24 hours.
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '44px', marginBottom: '8px' }}>
          {[
            { v: '500+',    l: 'Carriers'   },
            { v: '$2.8/mi', l: 'Avg Rate'   },
            { v: '98%',     l: 'On-Time'    },
            { v: '48',      l: 'States'     },
          ].map(s => (
            <div key={s.v} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div style={{ fontSize: '34px', fontWeight: 900, color: '#F59E0B', lineHeight: 1, fontFamily: 'sans-serif' }}>
                {s.v}
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(107,114,128,1)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2.5px', fontFamily: 'sans-serif' }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom amber accent line */}
        <div
          style={{
            position:   'absolute',
            bottom:     0,
            left:       0,
            right:      0,
            height:     '4px',
            background: 'linear-gradient(to right, transparent 0%, rgba(245,158,11,0.9) 30%, rgba(245,158,11,0.9) 70%, transparent 100%)',
          }}
        />

        {/* Top amber hairline */}
        <div
          style={{
            position:   'absolute',
            top:        0,
            left:       0,
            right:      0,
            height:     '2px',
            background: 'linear-gradient(to right, transparent, rgba(245,158,11,0.4), transparent)',
          }}
        />
      </div>
    ),
    { ...size },
  )
}
