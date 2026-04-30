import type { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n'

// Next.js convention: serves /sitemap.xml at the root.
// Lists each locale variant of the landing page, with hreflang
// alternate references for international SEO.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://leanthecompany.com'
  const today = new Date()

  return locales.map((locale) => ({
    url: `${base}/${locale}`,
    lastModified: today,
    changeFrequency: 'monthly',
    priority: locale === 'en' ? 1.0 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${base}/${l}`])
      ),
    },
  }))
}
