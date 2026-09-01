'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { GraduationCap, Briefcase } from 'lucide-react'
import { Paragraphs } from '@/components/ui/Paragraphs'

/**
 * The two schools. `lean` and `china` went in 130 Amendment 1 — the experience
 * they listed is in the bio now, and their EN bodies were internal comments
 * that had reached the live page. Two cards fill `sm:grid-cols-2` as one row.
 */
const CREDENTIALS = [
  { key: 'edu',    Icon: GraduationCap },
  { key: 'mba',    Icon: Briefcase     },
] as const

// ⚠ `china` here is `about.geo.china` — a different key path from the deleted
// `about.credentials.china`. It stays.
const GEO = ['malmo', 'china', 'seasia', 'europe'] as const

export function About() {
  const t = useTranslations('about')

  return (
    <section id="about" className="section section-alt">
      <div className="wrap">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-start">

          {/* Left: founder photo + name card */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white border border-rule rounded-lg p-8">
              <div className="w-24 h-24 rounded-full border-2 border-amber-DEFAULT mb-5 overflow-hidden bg-smoke">
                <Image
                  src="/founder.jpg"
                  alt="Gösta Seuranen"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <h3 className="font-serif text-2xl mb-1">Gösta Seuranen</h3>
              <p className="text-xs text-amber-DEFAULT font-semibold uppercase tracking-wide mb-4">
                {t('title')}
              </p>
              <p className="text-sm text-ink-soft leading-relaxed mb-6">
                {t('tagline')}
              </p>

              <Button variant="outline" size="full" asChild>
                <a
                  href="https://www.linkedin.com/in/gostaseuranen/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('linkedinCta')} →
                </a>
              </Button>
            </div>

            {/* Geo strip */}
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-soft font-mono">
              {GEO.map((key, i) => (
                <span key={key} className="flex items-center gap-2">
                  {i > 0 && <span className="text-rule">·</span>}
                  {t(`geo.${key}`)}
                </span>
              ))}
            </div>
          </div>

          {/* Right: eyebrow + bio + credentials */}
          <div>
            <p className="label-caps mb-4 flex items-center gap-3">
              <span className="w-7 h-px bg-amber-DEFAULT inline-block" />
              {t('eyebrow')}
            </p>
            <h2 className="heading-display text-4xl md:text-5xl mb-6">
              {t('headline')}
            </h2>
            <p className="body-lead mb-6">{t('lead')}</p>

            <div className="space-y-4 text-base text-ink-soft leading-relaxed mb-10">
              {/* `space-y-4` on the wrapper already spaces siblings, so the
                  splitter adds no margin of its own here. */}
              {(t.raw('bio') as string[]).map((para, i) => (
                <Paragraphs key={i} text={para} gapClass="" />
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {CREDENTIALS.map(({ key, Icon }) => (
                <div
                  key={key}
                  className="bg-white border border-rule rounded p-5 flex gap-3 items-start"
                >
                  <Icon size={18} className="text-amber-DEFAULT shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <h4 className="font-serif text-sm text-ink mb-1">
                      {t(`credentials.${key}.title`)}
                    </h4>
                    <p className="text-xs text-ink-soft leading-relaxed">
                      {t(`credentials.${key}.body`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
