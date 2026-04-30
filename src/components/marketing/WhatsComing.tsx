'use client'

import { useTranslations } from 'next-intl'
import { Sparkles } from 'lucide-react'

/**
 * WhatsComing — illustrated previews of what founding members get on launch day.
 * SVG-only, brand-coloured, with subtle CSS motion on card hover.
 *
 * Four cards:
 *   1. VSM canvas
 *   2. Makigami canvas
 *   3. AI Sensei chat
 *   4. A3 PDF export
 */

function VsmIllustration() {
  return (
    <svg viewBox="0 0 360 200" className="w-full h-auto" aria-hidden="true">
      <defs>
        <pattern id="vsm-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2DDD5" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect x="0" y="0" width="360" height="200" fill="#FDFBF6"/>
      <rect x="0" y="0" width="360" height="200" fill="url(#vsm-grid)"/>

      {/* Process boxes with amber header strip */}
      <g className="anim-fade-1">
        <rect x="30" y="60" width="80" height="60" rx="3" fill="#FFFFFF" stroke="#0D1117" strokeWidth="1.2"/>
        <rect x="30" y="60" width="80" height="14" rx="3" fill="#B07D20"/>
        <text x="70" y="71" fontSize="8" fontFamily="JetBrains Mono" fill="#FFFFFF" textAnchor="middle" fontWeight="600">CUT</text>
        <text x="70" y="92" fontSize="7" fontFamily="DM Sans" fill="#0D1117" textAnchor="middle">CT 40s</text>
        <text x="70" y="104" fontSize="7" fontFamily="DM Sans" fill="#4A5568" textAnchor="middle">C&amp;A 92%</text>
      </g>

      <g className="anim-fade-2">
        <rect x="140" y="60" width="80" height="60" rx="3" fill="#FFFFFF" stroke="#0D1117" strokeWidth="1.2"/>
        <rect x="140" y="60" width="80" height="14" rx="3" fill="#B07D20"/>
        <text x="180" y="71" fontSize="8" fontFamily="JetBrains Mono" fill="#FFFFFF" textAnchor="middle" fontWeight="600">WELD</text>
        <text x="180" y="92" fontSize="7" fontFamily="DM Sans" fill="#0D1117" textAnchor="middle">CT 65s</text>
        <text x="180" y="104" fontSize="7" fontFamily="DM Sans" fill="#4A5568" textAnchor="middle">C&amp;A 87%</text>
      </g>

      <g className="anim-fade-3">
        <rect x="250" y="60" width="80" height="60" rx="3" fill="#FFFFFF" stroke="#0D1117" strokeWidth="1.2"/>
        <rect x="250" y="60" width="80" height="14" rx="3" fill="#B07D20"/>
        <text x="290" y="71" fontSize="8" fontFamily="JetBrains Mono" fill="#FFFFFF" textAnchor="middle" fontWeight="600">PACK</text>
        <text x="290" y="92" fontSize="7" fontFamily="DM Sans" fill="#0D1117" textAnchor="middle">CT 22s</text>
        <text x="290" y="104" fontSize="7" fontFamily="DM Sans" fill="#4A5568" textAnchor="middle">C&amp;A 99%</text>
      </g>

      {/* Inventory triangles between boxes */}
      <g className="anim-fade-2">
        <polygon points="115,95 135,82 135,108" fill="#FDF6E3" stroke="#B07D20" strokeWidth="1"/>
        <text x="125" y="100" fontSize="6" fontFamily="JetBrains Mono" fill="#B07D20" textAnchor="middle">3d</text>
      </g>
      <g className="anim-fade-3">
        <polygon points="225,95 245,82 245,108" fill="#FDF6E3" stroke="#B07D20" strokeWidth="1"/>
        <text x="235" y="100" fontSize="6" fontFamily="JetBrains Mono" fill="#B07D20" textAnchor="middle">5d</text>
      </g>

      {/* Information flow line at top */}
      <line x1="30" y1="35" x2="330" y2="35" stroke="#1A6B6B" strokeWidth="1" strokeDasharray="4 3"/>
      <text x="180" y="28" fontSize="7" fontFamily="JetBrains Mono" fill="#1A6B6B" textAnchor="middle" fontWeight="600">PRODUCTION CONTROL</text>

      {/* Lead-time bar at bottom */}
      <line x1="30" y1="160" x2="330" y2="160" stroke="#0D1117" strokeWidth="1"/>
      <text x="30" y="178" fontSize="6.5" fontFamily="JetBrains Mono" fill="#4A5568">LT 11.2d</text>
      <text x="330" y="178" fontSize="6.5" fontFamily="JetBrains Mono" fill="#0D1117" textAnchor="end" fontWeight="600">VA 127s</text>

      {/* Kaizen burst */}
      <g className="anim-pulse">
        <polygon
          points="195,40 200,46 207,44 204,51 211,55 204,58 207,65 200,63 195,69 191,63 184,65 187,58 180,55 187,51 184,44 191,46"
          fill="#E8B84B"
          stroke="#B07D20"
          strokeWidth="0.8"
        />
        <text x="195.5" y="58" fontSize="5.5" fontFamily="JetBrains Mono" fill="#0D1117" textAnchor="middle" fontWeight="700">!</text>
      </g>
    </svg>
  )
}

function MakigamiIllustration() {
  return (
    <svg viewBox="0 0 360 200" className="w-full h-auto" aria-hidden="true">
      <rect x="0" y="0" width="360" height="200" fill="#FDFBF6"/>

      {/* Swim lane labels */}
      <text x="10" y="46" fontSize="7" fontFamily="JetBrains Mono" fill="#B07D20" fontWeight="600">SALES</text>
      <text x="10" y="100" fontSize="7" fontFamily="JetBrains Mono" fill="#B07D20" fontWeight="600">ENG</text>
      <text x="10" y="154" fontSize="7" fontFamily="JetBrains Mono" fill="#B07D20" fontWeight="600">PURCH</text>

      {/* Lane separators */}
      <line x1="60" y1="60" x2="350" y2="60" stroke="#E2DDD5" strokeWidth="1"/>
      <line x1="60" y1="115" x2="350" y2="115" stroke="#E2DDD5" strokeWidth="1"/>
      <line x1="60" y1="170" x2="350" y2="170" stroke="#E2DDD5" strokeWidth="1"/>
      <line x1="60" y1="20" x2="60" y2="170" stroke="#E2DDD5" strokeWidth="1"/>

      {/* Sales lane: action box → handoff */}
      <g className="anim-fade-1">
        <rect x="75" y="30" width="55" height="22" rx="2" fill="#FFFFFF" stroke="#0D1117" strokeWidth="1.2"/>
        <text x="102" y="44" fontSize="7" fontFamily="DM Sans" fill="#0D1117" textAnchor="middle">Order RFQ</text>
      </g>

      <g className="anim-fade-2">
        <rect x="155" y="30" width="55" height="22" rx="2" fill="#FFFFFF" stroke="#0D1117" strokeWidth="1.2"/>
        <text x="182" y="44" fontSize="7" fontFamily="DM Sans" fill="#0D1117" textAnchor="middle">Confirm</text>
      </g>

      {/* Handoff arrow Sales → Eng */}
      <path d="M 182,55 L 182,82 L 130,82" fill="none" stroke="#0D1117" strokeWidth="1" markerEnd="url(#arr-1)"/>

      {/* Eng lane */}
      <g className="anim-fade-3">
        <rect x="75" y="85" width="55" height="22" rx="2" fill="#FFFFFF" stroke="#0D1117" strokeWidth="1.2"/>
        <text x="102" y="99" fontSize="7" fontFamily="DM Sans" fill="#0D1117" textAnchor="middle">Spec</text>
      </g>

      {/* Wait triangle (delay) in Eng lane */}
      <g className="anim-fade-3">
        <polygon points="150,87 168,77 168,99" fill="#FDF6E3" stroke="#B07D20" strokeWidth="1"/>
        <text x="159" y="92" fontSize="5.5" fontFamily="JetBrains Mono" fill="#B07D20" textAnchor="middle">WAIT 4d</text>
      </g>

      <g className="anim-fade-4">
        <rect x="190" y="85" width="55" height="22" rx="2" fill="#FFFFFF" stroke="#0D1117" strokeWidth="1.2"/>
        <text x="217" y="99" fontSize="7" fontFamily="DM Sans" fill="#0D1117" textAnchor="middle">Approve</text>
      </g>

      {/* Handoff Eng → Purch */}
      <path d="M 217,110 L 217,135 L 130,135" fill="none" stroke="#0D1117" strokeWidth="1" markerEnd="url(#arr-1)"/>

      {/* Purch lane */}
      <g className="anim-fade-4">
        <rect x="75" y="138" width="55" height="22" rx="2" fill="#FFFFFF" stroke="#0D1117" strokeWidth="1.2"/>
        <text x="102" y="152" fontSize="7" fontFamily="DM Sans" fill="#0D1117" textAnchor="middle">Order parts</text>
      </g>

      <defs>
        <marker id="arr-1" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 8 4 L 0 8 z" fill="#0D1117"/>
        </marker>
      </defs>

      {/* Stats stamp top right */}
      <text x="345" y="20" fontSize="6.5" fontFamily="JetBrains Mono" fill="#4A5568" textAnchor="end">7 handoffs · 9d wait</text>
    </svg>
  )
}

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

function PdfIllustration() {
  return (
    <svg viewBox="0 0 360 200" className="w-full h-auto" aria-hidden="true">
      <rect x="0" y="0" width="360" height="200" fill="#F4F2EE"/>

      {/* Page silhouette */}
      <g className="anim-fade-1">
        <rect x="100" y="20" width="160" height="160" fill="#FFFFFF" stroke="#E2DDD5" strokeWidth="1" filter="url(#shadow-1)"/>
        <defs>
          <filter id="shadow-1" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="2" dy="3" result="offsetblur"/>
            <feComponentTransfer><feFuncA type="linear" slope="0.18"/></feComponentTransfer>
            <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Header bar */}
        <rect x="100" y="20" width="160" height="20" fill="#0D1117"/>
        <text x="108" y="33" fontSize="7" fontFamily="JetBrains Mono" fill="#E8B84B" fontWeight="600">A3 REPORT</text>
        <text x="252" y="33" fontSize="6" fontFamily="JetBrains Mono" fill="#FFFFFF" textAnchor="end" opacity="0.6">2026-04-24</text>

        {/* Title */}
        <text x="108" y="56" fontSize="9" fontFamily="DM Serif Display" fill="#0D1117">VSM · Line 3</text>

        {/* Mini VSM */}
        <rect x="108" y="64" width="20" height="14" fill="#FFFFFF" stroke="#0D1117" strokeWidth="0.7"/>
        <rect x="108" y="64" width="20" height="4" fill="#B07D20"/>
        <line x1="128" y1="71" x2="138" y2="71" stroke="#0D1117" strokeWidth="0.6"/>
        <rect x="138" y="64" width="20" height="14" fill="#FFFFFF" stroke="#0D1117" strokeWidth="0.7"/>
        <rect x="138" y="64" width="20" height="4" fill="#B07D20"/>
        <line x1="158" y1="71" x2="168" y2="71" stroke="#0D1117" strokeWidth="0.6"/>
        <rect x="168" y="64" width="20" height="14" fill="#FFFFFF" stroke="#0D1117" strokeWidth="0.7"/>
        <rect x="168" y="64" width="20" height="4" fill="#B07D20"/>
        <line x1="188" y1="71" x2="198" y2="71" stroke="#0D1117" strokeWidth="0.6"/>
        <rect x="198" y="64" width="20" height="14" fill="#FFFFFF" stroke="#0D1117" strokeWidth="0.7"/>
        <rect x="198" y="64" width="20" height="4" fill="#B07D20"/>

        {/* Stats row */}
        <line x1="108" y1="92" x2="252" y2="92" stroke="#E2DDD5" strokeWidth="0.6"/>
        <text x="108" y="104" fontSize="6" fontFamily="JetBrains Mono" fill="#4A5568">LEAD TIME</text>
        <text x="108" y="115" fontSize="9" fontFamily="DM Serif Display" fill="#0D1117" fontWeight="700">11.2d</text>
        <text x="160" y="104" fontSize="6" fontFamily="JetBrains Mono" fill="#4A5568">VA TIME</text>
        <text x="160" y="115" fontSize="9" fontFamily="DM Serif Display" fill="#0D1117" fontWeight="700">127s</text>
        <text x="212" y="104" fontSize="6" fontFamily="JetBrains Mono" fill="#4A5568">RATIO</text>
        <text x="212" y="115" fontSize="9" fontFamily="DM Serif Display" fill="#1A6B6B" fontWeight="700">0.013%</text>

        {/* Three dummy lines */}
        <line x1="108" y1="128" x2="248" y2="128" stroke="#E2DDD5" strokeWidth="0.6"/>
        <line x1="108" y1="138" x2="240" y2="138" stroke="#E2DDD5" strokeWidth="0.6"/>
        <line x1="108" y1="148" x2="220" y2="148" stroke="#E2DDD5" strokeWidth="0.6"/>

        {/* Footer */}
        <rect x="100" y="166" width="160" height="14" fill="#FDF6E3"/>
        <text x="108" y="176" fontSize="6" fontFamily="JetBrains Mono" fill="#B07D20" fontWeight="600">leanthecompany.com</text>
        <text x="252" y="176" fontSize="6" fontFamily="JetBrains Mono" fill="#B07D20" textAnchor="end">EN · SV · ZH</text>
      </g>
    </svg>
  )
}

const PREVIEWS = [
  { key: 'vsm',      Illustration: VsmIllustration      },
  { key: 'makigami', Illustration: MakigamiIllustration },
  { key: 'sensei',   Illustration: SenseiIllustration   },
  { key: 'pdf',      Illustration: PdfIllustration      },
] as const

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
          {PREVIEWS.map(({ key, Illustration }) => (
            <div
              key={key}
              className="preview-card group bg-white border border-rule rounded-lg overflow-hidden hover:border-amber-DEFAULT/50 hover:shadow-md transition-all"
            >
              <div className="bg-smoke border-b border-rule">
                <Illustration />
              </div>

              <div className="p-7">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h3 className="font-serif text-xl text-ink leading-snug">
                    {t(`previews.${key}.title`)}
                  </h3>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-amber-DEFAULT shrink-0">
                    {t(`previews.${key}.tag`)}
                  </span>
                </div>
                <p className="text-sm text-ink-soft leading-relaxed">
                  {t(`previews.${key}.body`)}
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

      {/* Scoped CSS for the subtle motion */}
      <style jsx>{`
        .preview-card :global(svg .anim-fade-1) { opacity: 0; transform: translateY(4px); transition: opacity .5s ease .05s, transform .5s ease .05s; }
        .preview-card :global(svg .anim-fade-2) { opacity: 0; transform: translateY(4px); transition: opacity .5s ease .15s, transform .5s ease .15s; }
        .preview-card :global(svg .anim-fade-3) { opacity: 0; transform: translateY(4px); transition: opacity .5s ease .25s, transform .5s ease .25s; }
        .preview-card :global(svg .anim-fade-4) { opacity: 0; transform: translateY(4px); transition: opacity .5s ease .35s, transform .5s ease .35s; }
        .preview-card:hover :global(svg .anim-fade-1),
        .preview-card:hover :global(svg .anim-fade-2),
        .preview-card:hover :global(svg .anim-fade-3),
        .preview-card:hover :global(svg .anim-fade-4) { opacity: 1; transform: translateY(0); }

        /* Default state — visible (so users without hover still see it) */
        @media (hover: none) {
          .preview-card :global(svg .anim-fade-1),
          .preview-card :global(svg .anim-fade-2),
          .preview-card :global(svg .anim-fade-3),
          .preview-card :global(svg .anim-fade-4) { opacity: 1; transform: translateY(0); }
        }

        /* Always visible on first paint, hover just refreshes the cascade */
        .preview-card :global(svg) { opacity: 1; }
        .preview-card :global(svg .anim-fade-1),
        .preview-card :global(svg .anim-fade-2),
        .preview-card :global(svg .anim-fade-3),
        .preview-card :global(svg .anim-fade-4) {
          animation: cascade .5s ease forwards;
          animation-delay: var(--d, 0s);
          opacity: 1;
          transform: translateY(0);
        }

        .preview-card :global(svg .anim-pulse) {
          transform-origin: 195px 55px;
          animation: pulse 2.6s ease-in-out infinite;
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
        @keyframes pulse {
          0%, 100% { transform: scale(1);   opacity: 1;   }
          50%      { transform: scale(1.08); opacity: 0.85; }
        }
        @keyframes typing {
          0%, 60%, 100% { opacity: 0.25; }
          30%           { opacity: 1;    }
        }
      `}</style>
    </section>
  )
}
