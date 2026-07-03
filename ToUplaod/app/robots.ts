// app/robots.ts
// Generates /robots.txt automatically — no manual file needed.
// Next.js serves this at https://www.ajaxdispatch.com/robots.txt

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // All standard search engine crawlers
        userAgent: '*',
        allow:     '/',
        disallow:  [
          '/api/',     // Never expose API routes to crawlers
          '/_next/',   // Internal Next.js build paths
          '/admin/',   // Any admin/dashboard area
        ],
      },
      // Block AI training crawlers
      { userAgent: 'GPTBot',        disallow: ['/'] },
      { userAgent: 'CCBot',         disallow: ['/'] },
      { userAgent: 'anthropic-ai',  disallow: ['/'] },
      { userAgent: 'Claude-Web',    disallow: ['/'] },
      { userAgent: 'Google-Extended', disallow: ['/'] },
    ],
    sitemap: 'https://www.ajaxdispatch.com/sitemap.xml',
    host:    'https://www.ajaxdispatch.com',
  }
}
