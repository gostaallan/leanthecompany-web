'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { locales, localeNames, type Locale } from '@/lib/i18n'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

/**
 * LeanTheCompany wordmark — canonical LtcMark.
 * Links to the current locale's home (/en, /sv, /zh) — never bare `/`,
 * because middleware-resolved redirects can land on the wrong locale.
 */
function Logo({ locale }: { locale: Locale }) {
  return (
    <Link href={`/${locale}`} className="flex items-center gap-3 group">
      <svg viewBox="0 0 400 400" width="32" height="32" aria-hidden="true" className="shrink-0">
        <rect x="20"  y="110" width="100" height="180" rx="10" fill="none" stroke="#1A1A1A" strokeWidth="8" />
        <rect x="150" y="110" width="100" height="180" rx="10" fill="#C97B0E" />
        <rect x="280" y="110" width="100" height="180" rx="10" fill="none" stroke="#1A1A1A" strokeWidth="8" />
        <polygon points="123,190 145,200 123,210" fill="#1A1A1A" />
        <polygon points="253,190 275,200 253,210" fill="#1A1A1A" />
      </svg>
      <span className="font-mono text-base font-bold text-ink tracking-tight">
        Lean<span className="text-amber-DEFAULT">TheCompany</span>
      </span>
    </Link>
  )
}

export function Navbar() {
  const t      = useTranslations('nav')
  const locale = useLocale() as Locale
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { href: '#for-whom',   label: t('forWhom')    },
    { href: '#problem',    label: t('problem')    },
    { href: '#platform',   label: t('platform')   },
    { href: '#diagnostic', label: t('diagnostic') },
    { href: '#pricing',    label: t('pricing')    },
    { href: '#about',      label: t('about')      },
  ]

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-rule">
      <div className="wrap flex items-center justify-between h-16 gap-4">

        <Logo locale={locale} />

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1 list-none">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm font-medium text-ink-soft hover:text-ink px-3 py-2 rounded transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <div className="hidden sm:flex items-center gap-1 font-mono text-xs text-ink-soft">
            {locales.map((loc, i) => (
              <span key={loc} className="flex items-center gap-1">
                {i > 0 && <span className="text-rule">|</span>}
                <Link
                  href={`/${loc}`}
                  className={cn(
                    'px-1.5 py-0.5 rounded transition-colors',
                    loc === locale
                      ? 'text-ink font-semibold'
                      : 'hover:text-ink hover:bg-smoke'
                  )}
                >
                  {localeNames[loc]}
                </Link>
              </span>
            ))}
          </div>

          {/* CTA */}
          <Button variant="primary" size="sm" asChild>
            <a href="#pricing">{t('cta')}</a>
          </Button>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-ink-soft hover:text-ink"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-rule px-6 pb-6">
          <ul className="flex flex-col gap-1 pt-4 list-none">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="block text-sm font-medium text-ink-soft hover:text-ink py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex gap-2 pt-4 border-t border-rule mt-2 font-mono text-xs">
            {locales.map((loc) => (
              <Link
                key={loc}
                href={`/${loc}`}
                className={loc === locale ? 'text-ink font-semibold' : 'text-ink-soft'}
              >
                {localeNames[loc]}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
