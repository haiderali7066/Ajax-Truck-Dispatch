// app/sitemap.ts
// Generates /sitemap.xml automatically — Next.js serves it at
// https://www.ajaxdispatch.com/sitemap.xml
//
// Priority guide:
//   1.0 = homepage (most important)
//   0.9 = primary conversion pages (services, contact)
//   0.7 = supporting pages (about)
//   0.6 = secondary pages (careers)
//   0.2 = legal / utility pages

import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.ajaxdispatch.com'
  const now  = new Date()

  return [
    {
      url:             `${base}/`,
      lastModified:    now,
      changeFrequency: 'weekly',
      priority:        1.0,
    },
    {
      url:             `${base}/services`,
      lastModified:    now,
      changeFrequency: 'monthly',
      priority:        0.9,
    },
    {
      url:             `${base}/contact`,
      lastModified:    now,
      changeFrequency: 'monthly',
      priority:        0.9,
    },
    {
      url:             `${base}/about`,
      lastModified:    now,
      changeFrequency: 'monthly',
      priority:        0.7,
    },
    {
      url:             `${base}/careers`,
      lastModified:    now,
      changeFrequency: 'weekly',   // update when roles open/close
      priority:        0.6,
    },
    {
      url:             `${base}/privacy-policy`,
      lastModified:    now,
      changeFrequency: 'yearly',
      priority:        0.2,
    },
    {
      url:             `${base}/terms-of-service`,
      lastModified:    now,
      changeFrequency: 'yearly',
      priority:        0.2,
    },
  ]
}
