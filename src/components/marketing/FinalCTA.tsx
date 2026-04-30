'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'

export function FinalCTA() {
  const t = useTranslations('finalCta')

  return (
    <section className="bg-ink text-white relative overflow-hidden py-24 px-6">
      {/* Soft amber wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,146,42,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="wrap relative text-center">
        <p className="font-mono text-xs text-amber-light tracking-widest uppercase mb-5">
          {t('eyebrow')}
        </p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 max-w-3xl mx-auto">
          {t('headline')}<br />
          <em className="text-amber-light not-italic">{t('headlineSub')}</em>
        </h2>
        <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('lead')}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" size="lg" asChild>
            <a href="#diagnostic">{t('ctaPrimary')}</a>
          </Button>
          <Button variant="outlineLight" size="lg" asChild>
            <a href="#pricing">{t('ctaSecondary')}</a>
          </Button>
        </div>

        <p className="mt-10 text-xs text-white/40 font-mono tracking-wide">
          {t('meta')}
        </p>
      </div>
    </section>
  )
}
