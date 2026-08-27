'use client'

import { useTranslations } from 'next-intl'

/**
 * The chain — GTM 014 §3, the spine the page was missing.
 *
 * A quality manager inside the ICP read this page and could not work out what
 * the concept is (GTM 013): the site opened with the instruments and never told
 * the causal chain that makes them make sense. This section is that chain, and
 * it sits between the Problem and the Platform on purpose — the reader has just
 * been shown what is invisible, and is about to be shown six parts. This is the
 * line those six parts stand on.
 *
 * Drawn as ONE VERTICAL RAIL rather than five columns. Five side-by-side
 * columns at 1280 give each step ~230px against bodies of ~250 characters, and
 * — worse — they would read as another feature grid, which is the exact shape
 * 013 diagnosed. A rail reads as a sequence, and a sequence is the point.
 *
 * The numerals live HERE and not in the catalogue: Problem and Platform already
 * number their items in the component (`01 · Chaos`, `0{idx + 1}`), and a
 * translator who never sees a number cannot drop one.
 */

const STEP_COUNT = 5

export function HowItConnects() {
  const t = useTranslations('howItConnects')

  return (
    <section id="how-it-connects" className="section">
      <div className="wrap">
        <div className="max-w-3xl mb-14">
          <p className="label-caps mb-4 flex items-center gap-3">
            <span className="w-7 h-px bg-amber-DEFAULT inline-block" />
            {t('eyebrow')}
          </p>
          <h2 className="heading-display text-4xl md:text-5xl">{t('headline')}</h2>
        </div>

        <ol className="max-w-3xl list-none">
          {Array.from({ length: STEP_COUNT }, (_, i) => (
            <li key={i} className="relative pl-16 pb-10 last:pb-0">
              {/* The rail. Absent after the last station, so the line ends where
                  the chain ends rather than trailing into white space. */}
              {i < STEP_COUNT - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-5 top-11 bottom-0 w-px -translate-x-1/2 bg-rule"
                />
              )}

              <span
                aria-hidden="true"
                className="absolute left-0 top-0 w-10 h-10 rounded-full border border-amber-DEFAULT/50 bg-white flex items-center justify-center font-mono text-sm font-semibold text-amber-DEFAULT"
              >
                {i + 1}
              </span>

              <h3 className="font-serif text-xl mb-2 text-ink leading-snug">
                {t(`steps.${i}.title`)}
              </h3>
              <p className="text-ink-soft leading-relaxed">{t(`steps.${i}.body`)}</p>
            </li>
          ))}
        </ol>

        <p className="max-w-3xl mt-12 pt-8 border-t border-rule font-serif text-xl md:text-2xl text-ink leading-snug text-balance">
          {t('closing')}
        </p>
      </div>
    </section>
  )
}
