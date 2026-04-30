'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

export function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="bg-ink text-white relative overflow-hidden py-28 px-6">
      {/* Subtle amber glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 60% 30%, rgba(200,146,42,0.10) 0%, transparent 70%)' }}
      />

      <div className="wrap relative">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center">

          {/* ── Left: core message ── */}
          <div>
            <p className="font-mono text-xs text-amber-light tracking-widest uppercase mb-6 flex items-center gap-3">
              <span className="w-7 h-px bg-amber-DEFAULT inline-block" />
              {t('eyebrow')}
            </p>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight font-normal mb-7">
              {t('headline')}<br />
              <em className="text-amber-light not-italic">{t('headlineSub')}</em>
            </h1>

            <p className="text-lg text-white/70 max-w-[52ch] leading-relaxed mb-10">
              {t('lead')}
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              <Button variant="primary" size="lg" asChild>
                <a href="#diagnostic">{t('ctaPrimary')}</a>
              </Button>
              <Button variant="outlineLight" size="lg" asChild>
                <a href="#pricing">{t('ctaSecondary')}</a>
              </Button>
            </div>

            {/* Proof bar */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div>
                <strong className="block font-serif text-3xl text-amber-light">{t('proof.years')}</strong>
                <span className="text-xs text-white/50 mt-1 block">{t('proof.yearsLabel')}</span>
              </div>
              <div>
                <strong className="block font-serif text-3xl text-amber-light">{t('proof.canvases')}</strong>
                <span className="text-xs text-white/50 mt-1 block">{t('proof.canvasesLabel')}</span>
              </div>
              <div>
                <strong className="block font-serif text-3xl text-amber-light">{t('proof.start')}</strong>
                <span className="text-xs text-white/50 mt-1 block">{t('proof.startLabel')}</span>
              </div>
            </div>
          </div>

          {/* ── Right: founder card ── */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-8 backdrop-blur-sm">
            <div className="w-20 h-20 rounded-full border-2 border-amber-DEFAULT mb-5 overflow-hidden bg-ink-mid">
              <Image
                src="/founder.jpg"
                alt="Gösta Seuranen"
                width={80}
                height={80}
                className="w-full h-full object-cover object-center"
              />
            </div>

            <h3 className="font-serif text-xl text-white mb-1">Gösta Seuranen</h3>
            <p className="text-xs text-amber-DEFAULT font-semibold uppercase tracking-wide mb-4">
              {t('founderTitle')}
            </p>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              {t('founderBio')}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {['MSc EE · LTH', 'MBA · Uppsala', '🇨🇳 Mandarin', 'SE Asia · Europe', '25+ yrs Lean'].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-DEFAULT/15 text-amber-light border border-amber-DEFAULT/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
