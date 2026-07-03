// app/page.tsx — SERVER COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
// All SEO metadata lives here (server-rendered).
// Interactive UI lives in HomeClient (client component).
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from 'next'
import { HomeClient } from '@/components/Home/HomeClient'

/* ─── Page-level metadata ─────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'AJAX Dispatch — Professional Truck Dispatch Services USA',
  description:
    'AJAX Dispatch provides professional truck dispatch services for owner-operators & carriers across 48 states. ' +
    'We find loads, negotiate the best rates ($2.80/mi avg), and handle all paperwork. Start within 24 hours.',
  keywords: [
    'truck dispatch service',
    'owner operator dispatch',
    'freight dispatch',
    'trucking dispatch company',
    'dry van dispatch',
    'flatbed dispatch',
    'reefer dispatch',
    'load board service',
    'truck dispatcher USA',
    'dispatch service for truckers',
  ].join(', '),
  authors:   [{ name: 'AJAX Dispatch', url: 'https://www.ajaxdispatch.com' }],
  creator:   'AJAX Dispatch',
  publisher: 'AJAX Dispatch',
  alternates: {
    canonical: 'https://www.ajaxdispatch.com',
  },
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         'https://www.ajaxdispatch.com',
    siteName:    'AJAX Dispatch',
    title:       'AJAX Dispatch — Keep Your Trucks Moving',
    description: 'Professional dispatch for owner-operators & carriers. We find loads, negotiate rates, and handle all paperwork — start in under 24 hours.',
    images: [
      {
        url:    'https://www.ajaxdispatch.com/og-image.jpg',
        width:  1200,
        height: 630,
        alt:    'AJAX Dispatch — Professional Truck Dispatch Services',
      },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'AJAX Dispatch — Professional Truck Dispatch Services',
    description: 'We find loads, negotiate rates, handle paperwork. 500+ carriers, $2.80/mi avg, 48 states.',
    images:      ['https://www.ajaxdispatch.com/og-image.jpg'],
  },
  robots: {
    index:               true,
    follow:              true,
    googleBot: {
      index:             true,
      follow:            true,
      'max-video-preview':  -1,
      'max-image-preview':  'large',
      'max-snippet':        -1,
    },
  },
}

/* ─── Structured Data (JSON-LD) ───────────────────────────────────────────── */

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type':       'LocalBusiness',
      '@id':         'https://www.ajaxdispatch.com/#business',
      name:          'AJAX Dispatch',
      description:   'Professional truck dispatch services for owner-operators and trucking companies across the USA.',
      url:           'https://www.ajaxdispatch.com',
      telephone:     '+18554794089',
      email:         'info@ajaxdispatch.com',
      logo: {
        '@type': 'ImageObject',
        url:     'https://www.ajaxdispatch.com/logo.png',
      },
      image:         'https://www.ajaxdispatch.com/og-image.jpg',
      address: {
        '@type':          'PostalAddress',
        addressLocality:  'Wyoming',
        addressCountry:   'US',
      },
      geo: {
        '@type':    'GeoCoordinates',
        latitude:   43.0753,
        longitude: -107.2903,
      },
      openingHoursSpecification: [
        {
          '@type':     'OpeningHoursSpecification',
          dayOfWeek:   ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens:       '09:00',
          closes:      '18:00',
        },
      ],
      aggregateRating: {
        '@type':       'AggregateRating',
        ratingValue:   '4.9',
        reviewCount:   '120',
        bestRating:    '5',
        worstRating:   '1',
      },
      sameAs: [
        'https://www.facebook.com/ajaxdispatch',
        'https://www.instagram.com/ajaxdispatch',
        'https://www.linkedin.com/company/ajaxdispatch',
      ],
      priceRange: '$$',
      areaServed: {
        '@type': 'Country',
        name:    'United States',
      },
      serviceType: [
        'Truck Dispatching',
        'Freight Dispatching',
        'Load Board Services',
        'Rate Negotiation',
        'Broker Communication',
        'Route Planning',
      ],
    },
    {
      '@type':     'WebSite',
      '@id':       'https://www.ajaxdispatch.com/#website',
      url:         'https://www.ajaxdispatch.com',
      name:        'AJAX Dispatch',
      description: 'Professional truck dispatch services for owner-operators & carriers across the USA.',
      publisher: { '@id': 'https://www.ajaxdispatch.com/#business' },
      potentialAction: {
        '@type':       'SearchAction',
        target: {
          '@type':       'EntryPoint',
          urlTemplate:   'https://www.ajaxdispatch.com/search?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type':        'FAQPage',
      '@id':          'https://www.ajaxdispatch.com/#faq',
      mainEntity: [
        {
          '@type':          'Question',
          name:             'How long does onboarding take with AJAX Dispatch?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:    'Onboarding takes less than 24 hours. Submit your info, upload your MC authority, insurance, and W9, sign the dispatch agreement, and your dedicated dispatcher will be finding loads the same day.',
          },
        },
        {
          '@type':          'Question',
          name:             'What is the average rate per mile AJAX Dispatch secures?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:    'AJAX Dispatch secures an average of $2.80 per mile across our carrier network through aggressive negotiation with brokers on DAT, Truckstop, and direct relationships.',
          },
        },
        {
          '@type':          'Question',
          name:             'What equipment types does AJAX Dispatch handle?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:    'We dispatch Dry Van, Reefer, Flatbed, Step Deck, Power Only, and Box Truck equipment across all 48 contiguous states.',
          },
        },
        {
          '@type':          'Question',
          name:             'Are there long-term contracts or hidden fees?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:    'No. AJAX Dispatch has no long-term contracts and zero hidden fees. You can cancel at any time.',
          },
        },
      ],
    },
  ],
}

/* ─── Page Component ──────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* JSON-LD structured data — server-rendered, immediately visible to crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* All interactive UI, animations, and client state */}
      <HomeClient />
    </>
  )
}
