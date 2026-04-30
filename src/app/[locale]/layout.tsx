import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/lib/i18n'
import '@/styles/globals.css'

interface Props {
  children: React.ReactNode
  params: { locale: string }
}

// Tell Next.js which locales to prerender at build time — required for
// static export when using next-intl in Server Components.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale as Locale
  if (!locales.includes(locale)) notFound()

  const t = await getTranslations({ locale, namespace: 'hero' })

  return {
    title: {
      default:  'LeanTheCompany — Lean Transformation Platform for Manufacturing',
      template: '%s | LeanTheCompany',
    },
    description: t('lead'),
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://leanthecompany.com'),
    openGraph: {
      type:     'website',
      siteName: 'LeanTheCompany',
      locale:   locale === 'zh' ? 'zh_CN' : locale === 'sv' ? 'sv_SE' : 'en_GB',
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `https://leanthecompany.com/${locale}`,
      languages: {
        en: 'https://leanthecompany.com/en',
        sv: 'https://leanthecompany.se',
        zh: 'https://leanthecompany.com/zh',
      },
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const locale = params.locale as Locale
  if (!locales.includes(locale)) notFound()

  // Opt this layout (and everything it renders) into static rendering.
  // Without this, next-intl APIs in Server Components fall back to
  // dynamic rendering — which breaks the static export for /en, /sv, /zh.
  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
