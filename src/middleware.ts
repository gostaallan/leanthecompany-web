import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from '@/lib/i18n'

// next-intl middleware:
//  - Redirects "/" to the visitor's preferred locale (Accept-Language),
//    falling back to defaultLocale ("en") when nothing matches.
//  - Ensures every request lives under /en, /sv, or /zh.
//  - Sets a cookie to remember the chosen locale across visits.
export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
})

export const config = {
  // Run on all paths except Next.js internals, API routes, and static files.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
