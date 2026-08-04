'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { useState, type FormEvent } from 'react'
import {
  AREAS,
  MAX_SCORE,
  bandFor,
  leaksFor,
  scoreFor,
  type AreaId,
} from '@/lib/chaos-score'

/**
 * The section headlined "Get your Chaos Score in 5 questions" and asked
 * none — it was a contact form. The five questions now run on the page,
 * the score lands on screen, and the email is optional and comes after
 * the value, never in front of it.
 *
 * Three things in here are contracts rather than styling choices:
 *
 * 1. NOTHING LEAVES THE PAGE until the visitor submits the email. The
 *    score, the band and the leaks are computed in client state. The copy
 *    a few lines below promises "no tracking, no resell, no drip campaign
 *    nonsense" and this section is the one that has to honour it.
 *
 * 2. NO GREEN, AMBER OR RED for any state — not the band, not the score,
 *    not the leaks, not form validation (ADR 0024). Those three colours
 *    mean value-adding, necessary-non-value-adding and waste everywhere
 *    else in this product. The error state is a glyph and a rule, and
 *    "but red is conventional for errors" is exactly the reasoning the
 *    ADR exists to overrule. Amber survives only as the brand hairline in
 *    the eyebrow, which is decoration and not a state signal; the step
 *    numbers are ink-soft because amber measures 3.62:1 and small text
 *    needs 4.5:1.
 *
 * 3. THE SPINE IS THE ONLY POSITION DISPLAY. The card carries no counter
 *    and no dots. That is what earns the left column the right to move —
 *    it stops being decoration and becomes the thing telling you where you
 *    are. On a phone it collapses to one line, because a five-item list
 *    above the question pushes the field note below the fold, and the note
 *    arriving before the next question is the whole point of the section.
 *
 * The Formspree path is unchanged — same endpoint, same field names, same
 * honeypot, same hidden _subject / _format / source. The score and the
 * five answers ride along as extra hidden fields so the reply can be
 * written without a second conversation.
 */

type Phase = 'intro' | 'quiz' | 'result'

/** No answer yet. */
const UNANSWERED = null

export function Diagnostic() {
  const t = useTranslations('diagnostic')
  const locale = useLocale()

  const [phase, setPhase] = useState<Phase>('intro')
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => AREAS.map(() => UNANSWERED)
  )
  const [idx, setIdx] = useState(0)

  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const titles = AREAS.map((a) => t(`areas.${a.id}.title`))

  const area = AREAS[idx]
  const picked = answers[idx]
  const revealed = picked !== UNANSWERED

  const score = scoreFor(answers)
  const band = bandFor(score)
  const leaks = leaksFor(answers)

  function start() {
    setAnswers(AREAS.map(() => UNANSWERED))
    setIdx(0)
    setSent(false)
    setError(null)
    setPhase('quiz')
  }

  function choose(option: number) {
    if (revealed) return
    setAnswers((prev) => {
      const next = [...prev]
      next[idx] = option
      return next
    })
  }

  function next() {
    if (idx + 1 >= AREAS.length) {
      setPhase('result')
      return
    }
    setIdx(idx + 1)
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_CHAOS_SCORE

    if (!endpoint) {
      setError(t('form.noEndpoint'))
      setLoading(false)
      return
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setSent(true)
      } else {
        setError(t('form.error'))
      }
    } catch {
      setError(t('form.error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="diagnostic" className="section">
      <div className="wrap">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">

          {/* Left: pitch + the spine */}
          <div>
            <p className="label-caps mb-4 flex items-center gap-3">
              <span className="w-7 h-px bg-amber inline-block" />
              {t('eyebrow')}
            </p>
            <h2 className="heading-display text-4xl md:text-5xl mb-6">
              {t('headline')}
            </h2>
            <p className="body-lead mb-10">{t('lead')}</p>

            {/* Desktop: the full spine, always. */}
            <div className="hidden lg:block">
              <p className="label-caps mb-4">{t('spineLabel')}</p>
              <Spine
                titles={titles}
                answers={answers}
                current={phase === 'quiz' ? idx : -1}
              />
            </div>

            {/* Phone: the same concept at a different density. The full list
                during the intro, one line while answering, nothing after. */}
            <div className="lg:hidden">
              {phase === 'intro' && (
                <>
                  <p className="label-caps mb-4">{t('spineLabel')}</p>
                  <Spine titles={titles} answers={answers} current={-1} />
                </>
              )}
              {phase === 'quiz' && (
                <p className="font-mono text-xs tracking-widest uppercase text-ink-soft">
                  {String(idx + 1).padStart(2, '0')} /{' '}
                  {String(AREAS.length).padStart(2, '0')} · {titles[idx]}
                </p>
              )}
            </div>
          </div>

          {/* Right: the card */}
          <div className="bg-smoke border border-rule rounded-lg p-6 md:p-10">

            {/* ------------------------------ INTRO ------------------------------ */}
            {phase === 'intro' && (
              <div>
                <h3 className="font-serif text-2xl mb-3">{t('introTitle')}</h3>
                <p className="text-sm text-ink-soft mb-6 leading-relaxed">
                  {t('introBody')}
                </p>

                <div className="flex flex-wrap gap-x-6 gap-y-1 mb-8 font-mono text-xs tracking-widest uppercase text-ink-soft">
                  <span>{t('metaQuestions')}</span>
                  <span>{t('metaInstant')}</span>
                  <span>{t('metaNoSignup')}</span>
                </div>

                <Button variant="teal" size="lg" onClick={start}>
                  {t('start')}
                </Button>

                <p className="mt-6 text-xs text-ink-soft">{t('form.meta')}</p>
              </div>
            )}

            {/* ------------------------------- QUIZ ------------------------------ */}
            {phase === 'quiz' && (
              <div key={area.id} className="animate-fade-in">
                <p className="label-caps">{t(`areas.${area.id}.title`)}</p>
                <p className="mt-4 text-lg md:text-xl leading-snug">
                  {t(`areas.${area.id}.ask`)}
                </p>

                <div className="mt-6 flex flex-col gap-2">
                  {(t.raw(`areas.${area.id}.options`) as string[]).map((option, i) => {
                    // There is no right answer here — the four options are a
                    // severity scale, so nothing is marked correct or wrong.
                    // The pick is carried by weight and border; the rest
                    // collapse so the field note stays above the fold.
                    const isPicked = revealed && i === picked

                    if (revealed && !isPicked) {
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
                        aria-current={isPicked ? 'true' : undefined}
                        className={[
                          'text-left flex gap-3 p-4 rounded border bg-white transition-colors',
                          isPicked
                            ? 'border-ink font-medium'
                            : 'border-rule hover:border-ink cursor-pointer',
                        ].join(' ')}
                      >
                        <span className="font-mono text-xs pt-1 shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-sm md:text-base leading-relaxed">
                          {option}
                        </span>
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

                    {/* ADR 0023: the instrument is translated, the notes are
                        not. Said once, where the first note lands — not on
                        every question, which would nag. */}
                    {locale !== 'en' && idx === 0 && (
                      <p className="text-xs text-ink-soft border-l-2 border-rule pl-3 mb-4">
                        {t('notesEnglish')}
                      </p>
                    )}

                    <p className="font-serif text-xl md:text-2xl leading-snug">
                      {area.note}
                    </p>

                    <div className="mt-6 flex justify-end">
                      <Button variant="teal" onClick={next}>
                        {idx + 1 >= AREAS.length ? t('seeResult') : t('next')}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------ RESULT ----------------------------- */}
            {phase === 'result' && (
              <div className="animate-fade-in">
                <p className="label-caps mb-3">{t('scoreLabel')}</p>

                {/* The number sits BESIDE the band, never above it. Higher is
                    worse here, and a lone "12 / 15" reads as an achievement
                    for the half-second before the band lands. */}
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-mono text-5xl md:text-6xl leading-none tracking-tight">
                    {score}
                  </span>
                  <span className="font-mono text-xl text-ink-soft">
                    / {MAX_SCORE}
                  </span>
                  <h3 className="heading-display text-3xl">
                    {t(`bands.${band.id}.name`)}
                  </h3>
                </div>
                <p className="mt-3 text-ink-mid leading-relaxed">
                  {t(`bands.${band.id}.line`)}
                </p>

                {/* Where it's leaking — up to three, worst first, zero-point
                    areas excluded. A plant with nothing above zero gets a
                    different line rather than three phantom leaks. */}
                <div className="mt-9">
                  {leaks.length > 0 ? (
                    <>
                      <p className="label-caps mb-4">{t('leaksTitle')}</p>
                      <ol className="flex flex-col gap-2 list-none">
                        {leaks.map((id, i) => (
                          <li key={id} className="flex items-center gap-3 text-sm">
                            <span className="font-mono text-xs text-ink-soft w-5 shrink-0">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="font-medium">
                              {t(`areas.${id}.title`)}
                            </span>
                            <span className="flex-1 h-px bg-rule" />
                          </li>
                        ))}
                      </ol>
                    </>
                  ) : (
                    <p className="text-ink-mid leading-relaxed border-l-2 border-rule pl-4">
                      {t('noLeaks')}
                    </p>
                  )}
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={start}
                    className="font-mono text-xs tracking-widest uppercase text-ink-soft hover:text-ink underline underline-offset-4 cursor-pointer"
                  >
                    {t('again')}
                  </button>
                </div>

                {/* ---------------------------- THE EMAIL --------------------------
                    Below the result and always visible. Not behind a control:
                    a button that expands a form is the shape of every
                    newsletter interstitial on the internet and reads as a gate
                    even when it is not one. There is no skip control because
                    there is nothing to skip — the score stays either way. */}
                <div className="mt-10 pt-7 border-t border-rule">
                  <h4 className="font-serif text-2xl mb-3">{t('form.title')}</h4>
                  <p className="text-sm text-ink-soft mb-6 leading-relaxed">
                    {t('form.description')}
                  </p>

                  {sent ? (
                    <div className="bg-teal/10 border border-teal/30 rounded p-5">
                      <p className="text-sm text-teal font-semibold mb-1">
                        {t('form.thanksTitle')}
                      </p>
                      <p className="text-sm text-ink-soft">{t('form.thanksBody')}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input type="hidden" name="_subject" value="LeanTheCompany — Chaos Score request" />
                      <input type="hidden" name="_format"  value="plain" />
                      <input type="hidden" name="source"   value="chaos-score" />
                      {/* Honeypot — bots fill this, humans never see it. Reduces false positives. */}
                      <input
                        type="text"
                        name="_gotcha"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        className="absolute left-[-9999px] w-px h-px opacity-0"
                      />

                      {/* The result, so the reply can be written without asking
                          for any of it a second time. */}
                      <input type="hidden" name="chaos_score" value={`${score} / ${MAX_SCORE}`} />
                      <input type="hidden" name="chaos_band"  value={t(`bands.${band.id}.name`)} />
                      <input
                        type="hidden"
                        name="chaos_leaks"
                        value={leaks.map((id) => t(`areas.${id}.title`)).join(', ')}
                      />
                      {AREAS.map((a, i) => {
                        const answer = answers[i]
                        const options = t.raw(`areas.${a.id}.options`) as string[]
                        return (
                          <input
                            key={a.id}
                            type="hidden"
                            name={`answer_${a.id}`}
                            value={
                              answer === UNANSWERED
                                ? ''
                                : `${a.points[answer]} — ${options[answer]}`
                            }
                          />
                        )
                      })}

                      <input
                        name="email"
                        type="email"
                        required
                        placeholder={t('form.emailPlaceholder')}
                        className="w-full px-4 py-3 text-sm border border-rule rounded bg-white focus:outline-none focus:border-ink transition-colors"
                      />
                      <input
                        name="name"
                        placeholder={t('form.namePlaceholder')}
                        className="w-full px-4 py-3 text-sm border border-rule rounded bg-white focus:outline-none focus:border-ink transition-colors"
                      />
                      <input
                        name="company"
                        placeholder={t('form.companyPlaceholder')}
                        className="w-full px-4 py-3 text-sm border border-rule rounded bg-white focus:outline-none focus:border-ink transition-colors"
                      />
                      <select
                        name="role"
                        defaultValue=""
                        className="w-full px-4 py-3 text-sm border border-rule rounded bg-white focus:outline-none focus:border-ink transition-colors"
                      >
                        <option value="">{t('form.rolePlaceholder')}</option>
                        {(t.raw('form.roles') as string[]).map((role) => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>

                      {/* GDPR artefact, not copy. `name` is what puts the record
                          in the payload and `required` is the enforcement — both
                          move together or the record becomes an absence of one.
                          It now gates only the email: the score was already
                          given, unconditionally, above. */}
                      <label className="flex items-start gap-2 text-xs text-ink-soft pt-2">
                        <input type="checkbox" name="consent" required className="mt-0.5" />
                        <span>{t('form.consent')}</span>
                      </label>

                      {error && (
                        <p
                          role="alert"
                          className="flex gap-2 text-xs text-ink border-l-2 border-ink pl-3"
                        >
                          <span className="font-mono shrink-0" aria-hidden="true">✕</span>
                          <span>{error}</span>
                        </p>
                      )}

                      <Button type="submit" variant="primary" size="full" disabled={loading}>
                        {loading ? t('form.loading') : t('form.submit')}
                      </Button>

                      <p className="text-xs text-ink-soft text-center">
                        {t('form.meta')}
                      </p>
                    </form>
                  )}
                </div>

                {/* The bridge — this scored your plant, the drill scores your
                    reading of one. */}
                <div className="mt-10 pt-7 border-t border-rule">
                  <p className="text-ink-mid leading-relaxed mb-4">{t('drillLead')}</p>
                  <Button variant="outline" asChild>
                    <a href="#gemba-drill">{t('drillCta')}</a>
                  </Button>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  )
}

/**
 * Position and progress, and the only one on screen. Neutral by design —
 * the trailing rule is ink where the question has been answered and rule
 * where it has not. Weight, not colour (see the file header).
 */
function Spine({
  titles,
  answers,
  current,
}: {
  titles: string[]
  answers: (number | null)[]
  current: number
}) {
  return (
    <ol className="space-y-3 list-none">
      {titles.map((title, i) => {
        const done = answers[i] !== null
        const here = i === current
        return (
          <li key={i} className="flex items-center gap-4">
            <span
              className={[
                'font-mono text-xs shrink-0',
                here || done ? 'text-ink font-semibold' : 'text-ink-soft',
              ].join(' ')}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              className={[
                'text-sm',
                here ? 'font-medium text-ink' : done ? 'text-ink' : 'text-ink-soft',
              ].join(' ')}
            >
              {title}
            </span>
            <span className={`flex-1 h-px ${done ? 'bg-ink' : 'bg-rule'}`} />
          </li>
        )
      })}
    </ol>
  )
}
