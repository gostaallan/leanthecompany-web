'use client'

import { useTranslations } from 'next-intl'
import { Paragraphs } from '@/components/ui/Paragraphs'
import { cn } from '@/lib/utils'

/**
 * The chain — GTM 014 §3, drawn as a line (GTM 015 §3, brief 186).
 *
 * A quality manager inside the ICP read this page and could not work out what
 * the concept is (GTM 013): the site opened with the instruments and never told
 * the causal chain that makes them make sense. This section is that chain, and
 * it sits between the Problem and the Platform on purpose — the reader has just
 * been shown what is invisible, and is about to be shown the parts.
 *
 * ── FIVE STATIONS ON ONE RAIL, AND NO NUMERALS ─────────────────────────────
 *
 * 133 drew this as a vertical rail because five columns at 1280 gave each step
 * ~230px against ~250-character bodies. 015 cut the EN bodies by two thirds and
 * moved the tool names out of the prose into chips, so the columns now hold
 * what they carry. The rail itself carries the sequence, so the markers carry
 * no 01–05 (ruled 1 Sept) — Problem already numbers its items.
 *
 * ⚠ SV and ZH are still on the long bodies until their review closes (015 §7:
 * "a shorter EN beside a longer SV is not a defect, it is a queue"). Their
 * blank lines are paragraphs the writer asked for, which is why the bodies
 * still go through <Paragraphs> — scripts/paragraph-gate.mjs asserts it.
 *
 * ── WHAT IS NOT A STATION, AND WHAT IS NOT A STRING ────────────────────────
 *
 * The Sensei is a band UNDER the whole rail: it is used at every step, and a
 * fourth column for it would say otherwise.
 *
 * `PDCA` and `LOCALES_CHIP` are component constants, not catalogue keys. The
 * locale chip is the same in every language by definition. The phase names are
 * Latin in all three (brief 186 A1.10): Swedish is ruled identical by R4, and
 * one constant cannot drift into a second Swedish set the way a key can. The
 * Chinese is unruled and sits in docs/186-locale-review.md to be overturned.
 *
 * The chips and fork labels are font-mono labels, not display type, so R1a's
 * headline class does not reach them; no chip carries terminal punctuation in
 * any locale.
 */

type Station = { tools: number; hot?: boolean } | { fork: true }

/** Chip counts per station; `hot` marks the station's own module chip. */
const STATIONS: readonly Station[] = [
  { tools: 1, hot: true },
  { tools: 2 },
  { tools: 2, hot: true },
  { fork: true },
  { tools: 1, hot: true },
]

const FORK = ['info', 'material'] as const

const PDCA = ['PLAN', 'DO', 'CHECK', 'ACT'] as const

const LOCALES_CHIP = 'EN · SV · 中文'

/** The twelve-box A3 sheet, four by three; the lit boxes are decoration. */
const SHEET_LIT = new Set([0, 3, 5, 10])

const chip =
  'font-mono text-[10px] font-medium tracking-wide rounded border px-2 py-0.5 whitespace-nowrap bg-white'

export function HowItConnects() {
  const t = useTranslations('howItConnects')
  const last = STATIONS.length - 1

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

        <ol className="grid grid-cols-5 gap-4 list-none max-[1020px]:grid-cols-3 max-[1020px]:gap-y-7 max-[640px]:grid-cols-1 max-[640px]:gap-0">
          {STATIONS.map((station, i) => (
            <li
              key={i}
              className="relative flex flex-col min-w-0 max-[640px]:pl-8 max-[640px]:pb-6"
            >
              {/* The marker and the rail. The line runs into the gap to the next
                  station and stops at the end of each row, so it ends where the
                  chain ends — at 3 columns that is also after station 3. Below
                  640px it turns downward beside the stations. */}
              <span
                aria-hidden="true"
                className="relative block h-[26px] mb-3 max-[640px]:absolute max-[640px]:left-0 max-[640px]:top-0.5 max-[640px]:bottom-0 max-[640px]:w-3.5 max-[640px]:h-auto max-[640px]:mb-0"
              >
                <span
                  className={cn(
                    'absolute left-0 top-[11px] h-0.5 bg-amber-DEFAULT/35',
                    i === last ? 'right-0' : '-right-4',
                    i === 2 && 'max-[1020px]:right-0',
                    'max-[640px]:left-1.5 max-[640px]:right-auto max-[640px]:top-[15px] max-[640px]:-bottom-0.5 max-[640px]:h-auto max-[640px]:w-0.5',
                    i === last && 'max-[640px]:hidden',
                  )}
                />
                <span className="absolute left-0 top-1 w-3.5 h-3.5 rounded-full bg-white border-[3px] border-amber-DEFAULT max-[640px]:top-0" />
              </span>

              <h3 className="font-serif text-xl mb-2 text-ink leading-snug">
                {t(`steps.${i}.title`)}
              </h3>
              <Paragraphs
                text={t(`steps.${i}.body`)}
                className="text-sm text-ink-mid leading-relaxed"
                gapClass="mt-3"
              />

              {'fork' in station ? (
                /* The flow the loss sits in decides the map. */
                <div className="mt-3 grid gap-2">
                  {FORK.map((branch) => (
                    <div key={branch} className="bg-smoke border border-rule rounded px-3 py-2">
                      <span className="block font-mono text-[10px] font-semibold tracking-wider uppercase text-ink-soft mb-0.5">
                        {t(`steps.${i}.fork.${branch}.label`)}
                      </span>
                      <span className="block text-sm font-semibold text-amber-DEFAULT">
                        {t(`steps.${i}.fork.${branch}.tool`)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {i === last && (
                    /* PDCA into the one-page A3. */
                    <>
                      <div className="mt-3 flex flex-wrap items-center gap-1">
                        {PDCA.map((phase, p) => (
                          <span key={phase} className="flex items-center gap-1">
                            {p > 0 && (
                              <span aria-hidden="true" className="text-[11px] text-amber-DEFAULT">
                                ▸
                              </span>
                            )}
                            <span className="font-mono text-[10px] font-semibold tracking-wider rounded border border-rule bg-white px-1.5 py-0.5 text-ink-mid">
                              {phase}
                            </span>
                          </span>
                        ))}
                      </div>
                      <div aria-hidden="true" className="mt-2 grid grid-cols-4 gap-[3px] max-w-[132px]">
                        {Array.from({ length: 12 }, (_, box) => (
                          <span
                            key={box}
                            className={cn(
                              'block h-3 rounded-[1px] border',
                              SHEET_LIT.has(box)
                                ? 'bg-amber-DEFAULT/55 border-amber-DEFAULT'
                                : 'bg-smoke border-rule',
                            )}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {Array.from({ length: station.tools }, (_, j) => (
                      <span
                        key={j}
                        className={cn(
                          chip,
                          station.hot && j === 0
                            ? 'border-amber-DEFAULT text-amber-DEFAULT'
                            : 'border-rule text-ink-soft',
                        )}
                      >
                        {t(`steps.${i}.tools.${j}`)}
                      </span>
                    ))}
                    {i === last && (
                      <span className={cn(chip, 'border-rule text-ink-soft')}>{LOCALES_CHIP}</span>
                    )}
                  </div>
                </>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-5 grid grid-cols-[auto_1fr] items-center gap-4 rounded border border-dashed border-amber-DEFAULT bg-smoke px-4 py-3 max-[640px]:grid-cols-1 max-[640px]:gap-2">
          <p className="font-mono text-[11px] font-semibold tracking-widest uppercase text-amber-DEFAULT whitespace-nowrap">
            {t('sensei.tag')}
          </p>
          <p className="text-sm text-ink-mid leading-relaxed">{t('sensei.body')}</p>
        </div>

        <p className="max-w-3xl mt-12 pt-8 border-t border-rule font-serif text-xl md:text-2xl text-ink leading-snug text-balance">
          {t('closing')}
        </p>
      </div>
    </section>
  )
}
