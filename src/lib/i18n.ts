import { getRequestConfig } from 'next-intl/server'

export const locales = ['en', 'sv', 'zh'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'EN',
  sv: 'SV',
  zh: '中文',
}

export default getRequestConfig(async ({ requestLocale }) => {
  // Migrated to the next-intl 3.22+ pattern: requestLocale is async and
  // may be undefined for routes outside the [locale] segment. Fall back
  // to defaultLocale rather than 404'ing — the [locale] layout/page
  // validates the locale before we ever get here.
  let locale = await requestLocale
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale
  }

  return {
    locale,
    messages: (await import(`@/locales/${locale}.json`)).default,
  }
})
