import type { MetadataRoute } from 'next'

// Next.js convention: serves /robots.txt at the root.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://leanthecompany.com/sitemap.xml',
    host: 'https://leanthecompany.com',
  }
}
