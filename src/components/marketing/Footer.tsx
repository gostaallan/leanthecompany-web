'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { Linkedin } from 'lucide-react'
import { locales, localeNames, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function Footer() {
  const t      = useTranslations('footer')
  const locale = useLocale() as Locale
  const year   = new Date().getFullYear()

  const navCols: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
    {
      title: t('cols.product.title'),
      links: [
        { label: t('cols.product.platform'),   href: '#platform'   },
        { label: t('cols.product.pricing'),    href: '#pricing'    },
        { label: t('cols.product.diagnostic'), href: '#diagnostic' },
      ],
    },
    {
      title: t('cols.learn.title'),
      links: [
        { label: t('cols.learn.problem'), href: '#problem' },
        { label: t('cols.learn.forWhom'), href: '#for-whom' },
        { label: t('cols.learn.about'),   href: '#about'    },
      ],
    },
    {
      title: t('cols.family.title'),
      links: [
        { label: 'TPM-OS.com',        href: 'https://tpm-os.com',   external: true },
        { label: t('cols.family.contact'), href: 'mailto:hello@leanthecompany.com' },
      ],
    },
  ]

  return (
    <footer className="bg-ink text-white pt-20 pb-10 px-6">
      <div className="wrap">

        {/* Top grid */}
        <div className="grid md:grid-cols-[1.4fr_2fr] gap-12 pb-12 border-b border-white/10">

          {/* Brand + tagline — canonical LtcMark in cream/amber-light for the dark footer */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <svg viewBox="0 0 400 400" width="32" height="32" aria-hidden="true" className="shrink-0">
                <rect x="20"  y="110" width="100" height="180" rx="10" fill="none" stroke="#F7F2E7" strokeWidth="8" />
                <rect x="150" y="110" width="100" height="180" rx="10" fill="#E8B84B" />
                <rect x="280" y="110" width="100" height="180" rx="10" fill="none" stroke="#F7F2E7" strokeWidth="8" />
                <polygon points="123,190 145,200 123,210" fill="#F7F2E7" />
                <polygon points="253,190 275,200 253,210" fill="#F7F2E7" />
              </svg>
              <span className="font-mono text-base font-bold text-white tracking-tight">
                Lean<span className="text-amber-light">TheCompany</span>
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-sm">
              {t('tagline')}
            </p>

            <a
              href="https://www.linkedin.com/in/gostaseuranen/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-light hover:text-white transition-colors"
            >
              <Linkedin size={16} />
              {t('linkedin')}
            </a>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {navCols.map((col) => (
              <div key={col.title}>
                <h4 className="font-mono text-xs uppercase tracking-widest text-amber-light mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2 list-none">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-white/60 hover:text-amber-light transition-colors"
                        >
                          {link.label} ↗
                        </a>
                      ) : (
                        <a
                          href={link.href}
                          className="text-sm text-white/60 hover:text-amber-light transition-colors"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-white/40 font-mono">
          <p>
            © {year} LeanTheCompany · {t('copyright')}
          </p>

          <div className="flex items-center gap-2">
            {locales.map((loc, i) => (
              <span key={loc} className="flex items-center gap-2">
                {i > 0 && <span className="text-white/20">|</span>}
                <Link
                  href={`/${loc}`}
                  className={cn(
                    'transition-colors',
                    loc === locale
                      ? 'text-amber-light font-semibold'
                      : 'hover:text-amber-light'
                  )}
                >
                  {localeNames[loc]}
                </Link>
              </span>
            ))}
          </div>
        </div>

        <p className="text-xs text-white/30 mt-4 leading-relaxed max-w-3xl">
          {t('disclaimer')}
        </p>

        <p className="text-[11px] text-white/40 mt-3 font-mono tracking-wide">
          {t('legal')}
        </p>

      </div>
    </footer>
  )
}
