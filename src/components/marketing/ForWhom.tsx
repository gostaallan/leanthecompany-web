'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Home, Gauge, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'

const CARDS = [
  { key: 'reshoring', Icon: Home },
  { key: 'surge',     Icon: Gauge },
  { key: 'outgrown',  Icon: Layers },
] as const

export function ForWhom() {
  const t = useTranslations('forWhom')
  const locale = useLocale()

  return (
    <section id="for-whom" className="section">
      <div className="wrap">
        {/* The measure sits on each CHILD, not on the block, so one of them can
            be wider than the others without moving the rest (130 §2.4). The
            Chinese headline is 17 glyphs; at `text-5xl` that is 816px, and
            `max-w-3xl` is 768px, so it dropped its last character to a second
            line. `max-w-4xl` (896px) holds it, inside 1056px of `wrap`, with
            no change to the type size. en and sv keep `max-w-3xl` on every
            child and render byte-identically. */}
        <div className="mb-16">
          <p className="label-caps mb-4 flex items-center gap-3 max-w-3xl">
            <span className="w-7 h-px bg-amber-DEFAULT inline-block" />
            {t('eyebrow')}
          </p>
          <h2
            className={cn(
              'heading-display text-4xl md:text-5xl mb-6 max-w-3xl',
              locale === 'zh' && 'lg:max-w-4xl',
            )}
          >
            {t('headline')}
          </h2>
          <p className="body-lead max-w-3xl">{t('lead')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {CARDS.map(({ key, Icon }, idx) => (
            <div
              key={key}
              className="bg-white border border-rule rounded p-8 hover:border-amber-DEFAULT/40 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-xs text-amber-DEFAULT font-semibold tracking-wider">
                  0{idx + 1}
                </span>
                <Icon size={18} className="text-amber-DEFAULT" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl mb-3 text-ink leading-snug">
                {t(`cards.${key}.title`)}
              </h3>
              <p className="text-sm text-ink-soft leading-relaxed">
                {t(`cards.${key}.body`)}
              </p>
            </div>
          ))}
        </div>

        {/* Consultant partner strip */}
        <div className="mt-12 pt-8 border-t border-rule flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-ink-soft">
            {t('consultantStrip')}
          </p>
          <a href="mailto:hello@leanthecompany.com" className="text-sm font-semibold text-amber-DEFAULT hover:text-ink transition-colors">
            {t('consultantCta')} →
          </a>
        </div>

      </div>
    </section>
  )
}
