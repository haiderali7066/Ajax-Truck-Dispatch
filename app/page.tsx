
import type { Metadata } from 'next'
import { HomeClient } from '@/components/HomeClient'

export const metadata: Metadata = {
  title: 'AJAX Dispatch — Professional Truck Dispatch Services',
  description:
    'Professional truck dispatch services for owner-operators & carriers across the USA. ' +
    'We find loads, negotiate the best rates, and handle all paperwork.',
  alternates: { canonical: 'https://www.ajaxdispatch.com' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'AJAX Dispatch',
  description:
    'Professional truck dispatch services for owner-operators and trucking companies across the USA.',
  url: 'https://www.ajaxdispatch.com',
  telephone: '+18554794089',
  email: 'info@ajaxdispatch.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Wyoming',
    addressCountry: 'US',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '120',
  },
}

export default function HomePage() {
  return (
    <>
      {/* Structured data — server-rendered so search engines see it immediately */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* All interactive UI, animations, and client state live in HomeClient */}
      <HomeClient />
    </>
  )
}