'use client'

import { useTranslations } from 'next-intl'

const ITEMS = ['chaos', 'handoffs', 'shadow'] as const

export function Problem() {
  const t = useTranslations('problem')

  return (
    <section id="problem" className="section section-alt">
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

        {/* Sensei quote */}
        <blockquote className="border-l-2 border-amber-DEFAULT pl-6 py-2 mb-14 max-w-3xl">
          <p className="font-serif text-xl md:text-2xl italic text-ink leading-snug">
            {t('quote')}
          </p>
        </blockquote>

        <div className="grid md:grid-cols-3 gap-10">
          {ITEMS.map((key) => (
            <div key={key}>
              <p className="font-mono text-xs text-amber-DEFAULT font-semibold tracking-wider uppercase mb-3">
                {t(`items.${key}.label`)}
              </p>
              <h3 className="font-serif text-lg mb-3 text-ink leading-snug">
                {t(`items.${key}.title`)}
              </h3>
              <p className="text-sm text-ink-soft leading-relaxed">
                {t(`items.${key}.body`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
