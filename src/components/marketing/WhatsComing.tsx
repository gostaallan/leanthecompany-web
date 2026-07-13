'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Sparkles } from 'lucide-react'

/**
 * WhatsComing — previews of what founding members get.
 *
 * Since 2026-07-13 three of the four cards show REAL platform screenshots
 * (public/previews/*.png — cropped from dev, refreshed manually when the UI
 * changes meaningfully). Sensei keeps its stylised SVG by ruling: the chat
 * is better told than screenshotted.
 *
 * Four cards:
 *   1. Makigami canvas   — real screenshot
 *   2. VSM canvas        — real screenshot
 *   3. AI Sensei chat    — illustration
 *   4. A3 export         — real screenshot (Kaizen Statistics, branded A4)
 */

function SenseiIllustration() {
  return (
    <svg viewBox="0 0 360 200" className="w-full h-auto" aria-hidden="true">
      <rect x="0" y="0" width="360" height="200" fill="#0D1117"/>
      {/* Soft amber glow */}
      <ellipse cx="270" cy="50" rx="120" ry="60" fill="#B07D20" opacity="0.08"/>

      {/* Avatar dot */}
      <circle cx="30" cy="40" r="9" fill="#B07D20"/>
      <text x="30" y="44" fontSize="9" fontFamily="DM Serif Display" fill="#0D1117" textAnchor="middle" fontWeight="700">先</text>

      {/* User question bubble */}
      <g className="anim-fade-1">
        <rect x="50" y="28" width="180" height="34" rx="6" fill="#FFFFFF" opacity="0.06" stroke="#FFFFFF" strokeOpacity="0.15"/>
        <text x="60" y="42" fontSize="7.5" fontFamily="DM Sans" fill="#FFFFFF" opacity="0.85">Where is the biggest waste in</text>
        <text x="60" y="54" fontSize="7.5" fontFamily="DM Sans" fill="#FFFFFF" opacity="0.85">my current value stream?</text>
      </g>

      {/* Sensei response bubble (longer, amber-edged) */}
      <g className="anim-fade-2">
        <rect x="50" y="78" width="280" height="100" rx="6" fill="#FFFFFF" opacity="0.04" stroke="#B07D20" strokeOpacity="0.4"/>
        <text x="60" y="93" fontSize="7" fontFamily="JetBrains Mono" fill="#E8B84B" fontWeight="600" letterSpacing="1">SENSEI</text>
        <text x="60" y="108" fontSize="7.5" fontFamily="DM Sans" fill="#FFFFFF" opacity="0.9">The 5-day wait between WELD and PACK is</text>
        <text x="60" y="120" fontSize="7.5" fontFamily="DM Sans" fill="#FFFFFF" opacity="0.9">86% of your lead time. Two questions for</text>
        <text x="60" y="132" fontSize="7.5" fontFamily="DM Sans" fill="#FFFFFF" opacity="0.9">tomorrow morning&apos;s gemba walk:</text>
        <text x="60" y="148" fontSize="7" fontFamily="DM Sans" fill="#E8B84B" fontWeight="600">→ What triggers movement out of WELD?</text>
        <text x="60" y="160" fontSize="7" fontFamily="DM Sans" fill="#E8B84B" fontWeight="600">→ Who decides the batch size?</text>
        <text x="60" y="173" fontSize="6.5" fontFamily="JetBrains Mono" fill="#FFFFFF" opacity="0.4">Pull-system pattern · Ohno, 1988</text>
      </g>

      {/* Typing dots */}
      <g className="anim-typing">
        <circle cx="320" cy="40" r="2.5" fill="#E8B84B"/>
        <circle cx="328" cy="40" r="2.5" fill="#E8B84B" opacity="0.6"/>
        <circle cx="336" cy="40" r="2.5" fill="#E8B84B" opacity="0.3"/>
      </g>
    </svg>
  )
}

type Preview =
  | { key: 'makigami' | 'vsm' | 'pdf'; image: { src: string; width: number; height: number } }
  | { key: 'sensei'; Illustration: () => JSX.Element }

const PREVIEWS: readonly Preview[] = [
  { key: 'makigami', image: { src: '/previews/makigami.png', width: 1106, height: 398 } },
  { key: 'vsm',      image: { src: '/previews/vsm.png',      width: 1376, height: 504 } },
  { key: 'sensei',   Illustration: SenseiIllustration },
  { key: 'pdf',      image: { src: '/previews/a3-print.png', width: 1440, height: 800 } },
]

export function WhatsComing() {
  const t = useTranslations('whatsComing')

  return (
    <section id="whats-coming" className="section">
      <div className="wrap">
        <div className="max-w-3xl mb-14">
          <p className="label-caps mb-4 flex items-center gap-3">
            <span className="w-7 h-px bg-amber-DEFAULT inline-block" />
            {t('eyebrow')}
          </p>
          <h2 className="heading-display text-4xl md:text-5xl mb-6">
            {t('headline')}
          </h2>
          <p className="body-lead">{t('lead')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PREVIEWS.map((entry) => (
            <div
              key={entry.key}
              className="preview-card group bg-white border border-rule rounded-lg overflow-hidden hover:border-amber-DEFAULT/50 hover:shadow-md transition-all"
            >
              <div className="bg-smoke border-b border-rule">
                {'image' in entry ? (
                  <Image
                    src={entry.image.src}
                    width={entry.image.width}
                    height={entry.image.height}
                    alt={t(`previews.${entry.key}.title`)}
                    className="w-full h-auto"
                  />
                ) : (
                  <entry.Illustration />
                )}
              </div>

              <div className="p-7">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h3 className="font-serif text-xl text-ink leading-snug">
                    {t(`previews.${entry.key}.title`)}
                  </h3>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-amber-DEFAULT shrink-0">
                    {t(`previews.${entry.key}.tag`)}
                  </span>
                </div>
                <p className="text-sm text-ink-soft leading-relaxed">
                  {t(`previews.${entry.key}.body`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Founding-member strip */}
        <div className="mt-12 pt-8 border-t border-rule flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-ink-soft flex items-center gap-2">
            <Sparkles size={14} className="text-amber-DEFAULT" strokeWidth={1.5} />
            {t('foundingNote')}
          </p>
          <a
            href="#pricing"
            className="text-sm font-semibold text-amber-DEFAULT hover:text-ink transition-colors"
          >
            {t('foundingCta')} →
          </a>
        </div>
      </div>

      {/* Scoped CSS for the Sensei illustration's subtle motion */}
      <style jsx>{`
        .preview-card :global(svg .anim-fade-1),
        .preview-card :global(svg .anim-fade-2) {
          animation: cascade .5s ease forwards;
          opacity: 1;
          transform: translateY(0);
        }

        .preview-card :global(svg .anim-typing circle) {
          animation: typing 1.4s ease-in-out infinite;
        }
        .preview-card :global(svg .anim-typing circle:nth-child(2)) { animation-delay: .2s; }
        .preview-card :global(svg .anim-typing circle:nth-child(3)) { animation-delay: .4s; }

        @keyframes cascade {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes typing {
          0%, 60%, 100% { opacity: 0.25; }
          30%           { opacity: 1;    }
        }
      `}</style>
    </section>
  )
}
