import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from '@/lib/i18n'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always', // /en, /sv, /zh
})

export const config = {
  matcher: [
    // Match everything except Next internals, API routes, and static assets
    '/((?!_next|_vercel|api|.*\\..*).*)',
  ],
}
