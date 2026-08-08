'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { Check, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState, type FormEvent } from 'react'
import type { PricingDates, PricingState } from '@/lib/pricing-state'

/** Where a buyer actually goes once there is something to buy. GTM 007 §6. */
const APP_URL = 'https://app.leanthecompany.com'

/**
 * One card component, four tiers, three states — no fork.
 *
 * `badge` and `cta`, when present, are the tier's OWN and beat the page state:
 * Process Owner reads COMING SOON in every state and Architect reads PARTNER
 * TRACK in every state, because neither is for sale on any date. The two tiers
 * that are for sale carry no badge or CTA of their own, so they fall through to
 * whatever the state says.
 *
 * `shape` picks how the card reads, not which component renders it. GTM 006 §1
 * and 003 §3 replaced Process Owner and Architect with prose: a price or an
 * audience line, a paragraph, a note, and a CTA — no tick list, because a queue
 * and a partner application are not feature comparisons.
 *
 * `sellable` is the one that matters on 15 September: it is what turns the CTA
 * from a Formspree form into a link to the app.
 */
const TIERS = [
  { key: 'contributor',  highlight: false, shape: 'list',  sellable: true  },
  { key: 'consultant',   highlight: false, shape: 'list',  sellable: true  },
  { key: 'processOwner', highlight: true,  shape: 'prose', sellable: false, badge: 'comingSoon',   cta: true },
  { key: 'architect',    highlight: false, shape: 'prose', sellable: false, badge: 'partnerTrack', cta: true },
] as const

interface Props {
  state: PricingState
  /** Whole days to the close. Only rendered in state B. */
  daysLeft: number
  /** Both dates, already formatted in this locale's own form by the server. */
  dates: PricingDates
}

export function Pricing({ state, daysLeft, dates }: Props) {
  const t = useTranslations('pricing')
  const [sentFor, setSentFor] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  const foundingOpen = state === 'A' || state === 'B'

  async function handleWaitlist(e: FormEvent<HTMLFormElement>, tierKey: string) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    formData.append('tier', tierKey)
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_WAITLIST

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
        setSentFor(tierKey)
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
    <section id="pricing" className="section section-alt">
      <div className="wrap">
        <div className="max-w-3xl mb-10">
          <p className="label-caps mb-4 flex items-center gap-3">
            <span className="w-7 h-px bg-amber-DEFAULT inline-block" />
            {t(`eyebrow.${state}`)}
          </p>
          <h2 className="heading-display text-4xl md:text-5xl mb-6">
            {t('headline')}
          </h2>
          <p className="body-lead">{t(`lead.${state}`, dates)}</p>
        </div>

        {/* The €69-vs-Miro answer. Above the grid on purpose — the buyer asks
            this before they read a single price. GTM 003 §5. */}
        <div className="max-w-3xl mb-12 border-l-2 border-amber-DEFAULT/40 pl-6">
          <h3 className="font-serif text-2xl mb-4">{t('comparison.headline')}</h3>
          <p className="text-sm text-ink-soft leading-relaxed mb-3">{t('comparison.p1')}</p>
          <p className="text-sm text-ink-soft leading-relaxed mb-3">{t('comparison.p2')}</p>
          <p className="text-sm text-ink leading-relaxed font-semibold">{t('comparison.p3')}</p>
        </div>

        {/* Founding-member banner — gone once the seats close. */}
        {foundingOpen && (
          <>
            <div className="bg-ink text-white rounded-lg p-6 md:p-7 mb-4 flex flex-col md:flex-row gap-5 md:items-center md:justify-between border border-amber-DEFAULT/40">
              <div className="flex gap-4 items-start md:items-center">
                <Sparkles size={22} className="text-amber-light shrink-0 mt-1 md:mt-0" strokeWidth={1.5} />
                <div>
                  <p className="font-mono text-xs text-amber-light tracking-widest uppercase mb-1.5">
                    {t(`founding.eyebrow.${state}`, dates)}
                  </p>
                  <h3 className="font-serif text-xl md:text-2xl text-white leading-snug">
                    {t('founding.headline')}
                  </h3>
                  {state === 'A' ? (
                    <>
                      <p className="text-sm text-white/70 mt-2 leading-relaxed">{t('founding.bodyA.p1', dates)}</p>
                      <p className="text-sm text-white/70 mt-2 leading-relaxed">{t('founding.bodyA.p2', dates)}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-white/70 mt-2 leading-relaxed">{t('founding.bodyB.p1', dates)}</p>
                      <p className="text-sm text-white/70 mt-2 leading-relaxed">{t('founding.bodyB.p2', dates)}</p>
                      <p className="text-sm text-white/70 mt-2 leading-relaxed">{t('founding.bodyB.p3', dates)}</p>
                    </>
                  )}
                </div>
              </div>

              {/* State A shows two flat dates: a day count toward a door that
                  has not opened yet is a countdown to nothing. The real
                  countdown starts when the seats do. GTM 006 §5. */}
              <div className="flex flex-col gap-2 shrink-0 self-start md:self-center">
                {state === 'A' ? (
                  <>
                    <span className="font-mono text-xs text-white/50 tracking-wider whitespace-nowrap">
                      {t('founding.chipSalesOpen', dates)}
                    </span>
                    <span className="font-mono text-xs text-white/50 tracking-wider whitespace-nowrap">
                      {t('founding.chipClose', dates)}
                    </span>
                  </>
                ) : (
                  <span className="font-mono text-xs text-amber-light tracking-wider whitespace-nowrap">
                    {t('founding.countdown', { ...dates, days: daysLeft })}
                  </span>
                )}
              </div>
            </div>

            {/* This is what turns "for life" from an open-ended liability into
                a bounded promise. It goes out on the same page as the claim it
                bounds, never a click away. GTM 003 §2. */}
            <p className="text-xs text-ink-soft leading-relaxed max-w-3xl mb-12">
              <strong className="text-ink">{t('priceLock.title')}</strong>{' '}
              {t('priceLock.body')}
            </p>
          </>
        )}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {TIERS.map((tier) => {
            const { key, highlight, shape, sellable } = tier
            const ownBadge = 'badge' in tier ? tier.badge : undefined

            // The tier's own badge wins; otherwise the state's; otherwise none,
            // which is what state C looks like on a tier that is simply for sale.
            const badge =
              ownBadge ? t(`badges.${ownBadge}`)
              : state === 'A' ? t('badges.stateA', dates)
              : state === 'B' ? t('badges.stateB', dates)
              : null

            // Formspree in state A for everyone, and in every state for the two
            // tiers that are not for sale. A link to the app only where there is
            // genuinely something to buy. GTM 007 §6.
            const linkToApp = sellable && state !== 'A'
            const ctaLabel = 'cta' in tier ? t(`tiers.${key}.cta`) : t(`cta.${state}`)

            return (
              <div
                key={key}
                className={cn(
                  'bg-white rounded-lg p-8 flex flex-col border transition-all',
                  highlight ? 'border-amber-DEFAULT shadow-md' : 'border-rule'
                )}
              >
                {badge ? (
                  <span className="inline-block self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-5 uppercase tracking-wide bg-amber-pale text-amber-DEFAULT border border-amber-DEFAULT/30">
                    {badge}
                  </span>
                ) : (
                  // Keeps the four cards on one baseline once the badges go.
                  <span className="block mb-5 h-[1.75rem]" aria-hidden="true" />
                )}

                <h3 className="font-serif text-2xl mb-2">{t(`tiers.${key}.title`)}</h3>
                <p className="text-xs text-ink-soft mb-2 font-mono tracking-wide uppercase">
                  {t(`tiers.${key}.audience`)}
                </p>

                {/* Process Owner keeps its number even though it has a queue and
                    not a checkout. A tier with a queue and a price is a ladder
                    rung; a tier with a queue and no price makes €69 look like
                    the ceiling. GTM 006 §1. */}
                {key === 'processOwner' && (
                  <p className="font-serif text-xl text-ink mb-4">{t('tiers.processOwner.price')}</p>
                )}

                <p className={cn('text-sm text-ink-soft leading-relaxed mb-6', key !== 'processOwner' && 'mt-3')}>
                  {t(`tiers.${key}.desc`)}
                </p>

                {shape === 'list' ? (
                  <ul className="space-y-2 mb-8 list-none flex-1">
                    {(t.raw(`tiers.${key}.features`) as string[]).map((feat) => (
                      <li key={feat} className="flex gap-2 text-sm text-ink">
                        <Check size={16} className="text-amber-DEFAULT shrink-0 mt-0.5" strokeWidth={2} />
                        <span>{feat}</span>
                      </li>
                    ))}
                    <li className="flex gap-2 text-sm text-ink font-semibold">
                      <Check size={16} className="text-amber-DEFAULT shrink-0 mt-0.5" strokeWidth={2} />
                      {/* The dated lock is a claim with a deadline in it, so it
                          stops being made the day the deadline passes. */}
                      <span>{state === 'C' ? t(`tiers.${key}.price`) : t(`tiers.${key}.lock`, dates)}</span>
                    </li>
                  </ul>
                ) : (
                  <div className="mb-8 flex-1 space-y-3">
                    <p className="text-sm text-ink leading-relaxed">{t(`tiers.${key}.note`)}</p>
                    {key === 'architect' && (
                      <p className="text-sm text-ink leading-relaxed">{t('tiers.architect.note2')}</p>
                    )}
                  </div>
                )}

                {linkToApp ? (
                  <div className="space-y-2.5">
                    <Button asChild variant="softCta" size="full">
                      <a href={APP_URL}>{ctaLabel}</a>
                    </Button>
                    <p className="text-xs text-ink-soft leading-relaxed">
                      {t(`microcopy.${state}`, { ...dates, price: t(`tiers.${key}.priceNumber`) })}
                    </p>
                  </div>
                ) : sentFor === key ? (
                  <div className="bg-teal-DEFAULT/10 border border-teal-DEFAULT/30 rounded p-4 text-center">
                    <p className="text-sm font-semibold text-teal-DEFAULT mb-1">
                      {t('form.thanksTitle')}
                    </p>
                    <p className="text-xs text-ink-soft">{t('form.thanksBody', dates)}</p>
                  </div>
                ) : (
                  <form onSubmit={(e) => handleWaitlist(e, key)} className="space-y-2.5">
                    {/* Hidden meta — give Formspree real subject + reply-to to reduce spam scoring */}
                    <input type="hidden" name="_subject" value={`LeanTheCompany — ${key} founding-member request`} />
                    <input type="hidden" name="_format"  value="plain" />
                    <input type="hidden" name="tier"     value={key} />
                    {/* Honeypot — bots fill this, humans never see it. Paradoxically reduces false positives. */}
                    <input
                      type="text"
                      name="_gotcha"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="absolute left-[-9999px] w-px h-px opacity-0"
                    />
                    <input
                      name="name"
                      required
                      placeholder={t('form.namePlaceholder')}
                      className="w-full px-3.5 py-2.5 text-sm border border-ink/20 rounded bg-smoke focus:outline-none focus:border-amber-DEFAULT focus:bg-white transition-colors placeholder:text-ink-soft/70"
                    />
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder={t('form.emailPlaceholder')}
                      className="w-full px-3.5 py-2.5 text-sm border border-ink/20 rounded bg-smoke focus:outline-none focus:border-amber-DEFAULT focus:bg-white transition-colors placeholder:text-ink-soft/70"
                    />
                    {error && <p className="text-xs text-red-600">{error}</p>}
                    <Button
                      type="submit"
                      variant="softCta"
                      size="full"
                      disabled={loading}
                    >
                      {loading ? t('form.loading') : ctaLabel}
                    </Button>
                    {/* Only the two sellable tiers carry an under-button line.
                        A queue and a partner application are not purchases, so
                        neither gets card-and-cancellation wording. GTM 007 §5. */}
                    {sellable && (
                      <p className="text-xs text-ink-soft leading-relaxed">
                        {t(`microcopy.${state}`, { ...dates, price: t(`tiers.${key}.priceNumber`) })}
                      </p>
                    )}
                  </form>
                )}
              </div>
            )
          })}
        </div>

        {/* Annual is a lever we still have, not a thing we sell here. GTM 006 §2. */}
        <p className="text-center text-sm text-ink-soft mt-10 max-w-2xl mx-auto">
          {t('annualNote')}
        </p>

        {/* Metering note — explains why Sensei is capped + top-up, so a limit reads as fair */}
        <p className="text-center text-sm text-ink-soft mt-6 max-w-2xl mx-auto">
          {t('meteringNote')}
        </p>

        {/* Publish the bound or don't publish the promise. GTM 006 §3. */}
        <p className="text-center text-xs text-ink-soft mt-6 max-w-2xl mx-auto">
          {t('responseBound')}
        </p>
      </div>
    </section>
  )
}
