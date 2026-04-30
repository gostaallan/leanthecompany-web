'use client'

import { useTranslations } from 'next-intl'
import { Home, Gauge, Layers } from 'lucide-react'

const CARDS = [
  { key: 'reshoring', Icon: Home },
  { key: 'surge',     Icon: Gauge },
  { key: 'outgrown',  Icon: Layers },
] as const

export function ForWhom() {
  const t = useTranslations('forWhom')

  return (
    <section id="for-whom" className="section">
      <div className="wrap">
        <div className="max-w-3xl mb-16">
          <p className="label-caps mb-4 flex items-center gap-3">
            <span className="w-7 h-px bg-amber-DEFAULT inline-block" />
            {t('eyebrow')}
          </p>
          <h2 className="heading-display text-4xl md:text-5xl mb-6">
            {t('headline')}
          </h2>
          <p className="body-lead">{t('lead')}</p>
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
