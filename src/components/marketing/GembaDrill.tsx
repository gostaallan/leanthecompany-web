'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { LAYERS, type Layer, type Question } from '@/lib/gemba-bank'
import { ROUND, bandFor, buildDeck } from '@/lib/gemba-deck'

/**
 * The drill runs entirely in client state. No fetch, no form, no beacon —
 * the page promises "no tracking, no resell, no drip campaign nonsense"
 * a few hundred pixels above this section, and this section honours it.
 *
 * Correctness is never signalled with colour. Green means value-adding and
 * red means waste everywhere else in this product, and teaching a visitor
 * that green means "you got it right" devalues every map they later read
 * inside the platform. The verdict is carried by glyph and weight only.
 */

type Phase = 'intro' | 'quiz' | 'results'

export function GembaDrill() {
  const t = useTranslations('gembaDrill')
  const locale = useLocale()

  const [phase, setPhase] = useState<Phase>('intro')
  const [deck, setDeck] = useState<Question[]>([])
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)

  const question = deck[idx]
  const revealed = picked !== null
  const score = answers.filter(Boolean).length
  const band = bandFor(score)

  /** One question per layer, so a layer is simply hit or missed. */
  const byLayer = useMemo(() => {
    const map = new Map<Layer, boolean>()
    deck.forEach((q, i) => {
      if (answers[i] !== undefined) map.set(q.layer, answers[i])
    })
    return LAYERS.filter((l) => map.has(l)).map((l) => ({ layer: l, hit: map.get(l) === true }))
  }, [deck, answers])

  const missed = deck.filter((_, i) => answers[i] === false)

  const shareText = t('share', { score, total: ROUND, band: band.name })

  // buildDeck() calls Math.random(), so it runs on the click and never during
  // render — a deck drawn while rendering would differ between the server and
  // the client and React would fail to hydrate the section.
  function start() {
    setDeck(buildDeck())
    setIdx(0)
    setPicked(null)
    setAnswers([])
    setCopied(false)
    setCopyFailed(false)
    setPhase('quiz')
  }

  function choose(i: number) {
    if (revealed) return
    setPicked(i)
    setAnswers((prev) => {
      const next = [...prev]
      next[idx] = i === question.correct
      return next
    })
  }

  function next() {
    if (idx + 1 >= deck.length) {
      setPhase('results')
      return
    }
    setIdx(idx + 1)
    setPicked(null)
  }

  async function copyShare() {
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setCopyFailed(false)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      // No clipboard permission, or no secure context. Do not claim success —
      // surface the line as selectable text so it can be copied by hand.
      setCopyFailed(true)
    }
  }

  return (
    <section id="gemba-drill" className="section">
      <div className="wrap">
        <div className="mx-auto" style={{ maxWidth: 680 }}>

          {/* ------------------------------- INTRO ------------------------------ */}
          {phase === 'intro' && (
            <div className="animate-fade-up">
              <p className="label-caps mb-4 flex items-center gap-3">
                <span className="w-7 h-px bg-amber inline-block" />
                {t('eyebrow')}
              </p>
              <h2 className="heading-display text-4xl md:text-5xl mb-6">{t('headline')}</h2>
              <p className="body-lead mb-6">{t('lead')}</p>

              {locale !== 'en' && (
                <p className="text-sm text-ink-soft border-l-2 border-rule pl-4 mb-8">
                  {t('englishNote')}
                </p>
              )}

              <div className="flex flex-wrap gap-x-6 gap-y-1 mb-8 font-mono text-xs tracking-widest uppercase text-ink-soft">
                <span>{t('metaQuestions')}</span>
                <span>{t('metaLayers')}</span>
                <span>{t('metaNoSignup')}</span>
              </div>

              <Button variant="teal" size="lg" onClick={start}>
                {t('start')}
              </Button>
            </div>
          )}

          {/* -------------------------------- QUIZ ------------------------------ */}
          {phase === 'quiz' && question && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <Progress total={deck.length} answers={answers} current={idx} />
                <span className="font-mono text-xs text-ink-soft">
                  {String(idx + 1).padStart(2, '0')} / {String(deck.length).padStart(2, '0')}
                </span>
              </div>

              <div
                key={question.id}
                className="animate-fade-in bg-smoke border border-rule rounded-lg p-6 md:p-8"
              >
                <p className="label-caps">{question.layer}</p>

                <p className="mt-4 text-lg md:text-xl leading-snug">{question.prompt}</p>
                <p className="mt-2 text-sm text-ink-soft">{question.ask}</p>

                <div className="mt-6 flex flex-col gap-2">
                  {question.options.map((option, i) => {
                    const isCorrect = revealed && i === question.correct
                    const isWrongPick = revealed && i === picked && i !== question.correct
                    const isCollapsed = revealed && !isCorrect && !isWrongPick

                    if (isCollapsed) {
                      return (
                        <p
                          key={i}
                          className="flex gap-3 px-4 py-1 text-sm text-ink-soft min-w-0"
                        >
                          <span className="font-mono text-xs pt-0.5 shrink-0">
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className="truncate min-w-0">{option}</span>
                        </p>
                      )
                    }

                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => choose(i)}
                        disabled={revealed}
                        className={[
                          'text-left flex gap-3 p-4 rounded border bg-white transition-colors',
                          isCorrect
                            ? 'border-ink font-medium'
                            : isWrongPick
                              ? 'border-rule text-ink-soft'
                              : 'border-rule hover:border-ink cursor-pointer',
                        ].join(' ')}
                      >
                        <span className="font-mono text-xs pt-1 shrink-0">
                          {isCorrect ? '✓' : isWrongPick ? '✕' : String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-sm md:text-base leading-relaxed">{option}</span>
                      </button>
                    )
                  })}
                </div>

                {revealed && (
                  <div
                    className="animate-fade-in mt-6 pt-6 border-t border-rule"
                    aria-live="polite"
                  >
                    <p className="label-caps mb-3">{t('fieldNote')}</p>
                    <p className="font-serif text-xl md:text-2xl leading-snug">{question.note}</p>

                    <div className="mt-6 flex justify-end">
                      <Button variant="teal" onClick={next}>
                        {idx + 1 >= deck.length ? t('seeResult') : t('next')}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ------------------------------ RESULTS ----------------------------- */}
          {phase === 'results' && (
            <div className="animate-fade-in">
              <div className="mb-6">
                <Progress total={deck.length} answers={answers} current={-1} />
              </div>

              <div className="flex items-end gap-3">
                <span className="font-mono text-6xl leading-none tracking-tight">{score}</span>
                <span className="font-mono text-xl text-ink-soft pb-1">/ {deck.length}</span>
              </div>

              <h3 className="heading-display text-3xl mt-4">{band.name}</h3>
              <p className="mt-2 text-ink-mid leading-relaxed">{band.line}</p>

              {/* by layer */}
              <div className="mt-9">
                <p className="label-caps mb-4">{t('byLayer')}</p>
                <ul className="flex flex-col gap-2 list-none">
                  {byLayer.map(({ layer, hit }) => (
                    <li key={layer} className="flex items-center gap-3 text-sm">
                      <span className="font-mono text-xs w-4 shrink-0">{hit ? '✓' : '✕'}</span>
                      <span className={hit ? 'font-medium' : 'text-ink-soft'}>{layer}</span>
                      <span className="flex-1 h-px bg-rule" />
                    </li>
                  ))}
                </ul>
              </div>

              {/* the notes they missed */}
              {missed.length > 0 && (
                <div className="mt-9">
                  <p className="label-caps mb-4">{t('missed')}</p>
                  <div className="flex flex-col gap-3">
                    {missed.map((m) => (
                      <div key={m.id} className="bg-smoke border border-rule rounded-lg p-5">
                        <p className="label-caps mb-2">{m.layer}</p>
                        <p className="font-serif text-lg leading-snug">{m.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* share */}
              <div className="mt-9">
                <p className="text-sm text-ink-soft select-all border-l-2 border-rule pl-4">
                  {shareText}
                </p>
                {copyFailed && (
                  <p className="mt-2 text-xs text-ink-soft">{t('copyFallback')}</p>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="outline" onClick={start}>
                  {t('again')}
                </Button>
                <Button variant="outline" onClick={copyShare}>
                  {copied ? t('copied') : t('copy')}
                </Button>
              </div>

              {/* the bridge — drill scores your knowledge, Chaos Score scores your plant */}
              <div className="mt-10 pt-7 border-t border-rule">
                <p className="text-ink-mid leading-relaxed mb-4">{t('chaosLead')}</p>
                <Button variant="teal" asChild>
                  <a href="#diagnostic">{t('chaosCta')}</a>
                </Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}

/**
 * Position and running result. Neutral by design — filled = right, faint =
 * wrong, outlined = still to come. Weight, not colour (see the file header).
 */
function Progress({
  total,
  answers,
  current,
}: {
  total: number
  answers: boolean[]
  current: number
}) {
  return (
    <div className="flex gap-1.5" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => {
        const answer = answers[i]
        const className =
          answer === true
            ? 'bg-ink border border-ink'
            : answer === false
              ? 'bg-ink/20 border border-ink/20'
              : i === current
                ? 'border-2 border-ink'
                : 'border border-rule'
        return <span key={i} className={`block w-3.5 h-3.5 rounded-sm ${className}`} />
      })}
    </div>
  )
}
