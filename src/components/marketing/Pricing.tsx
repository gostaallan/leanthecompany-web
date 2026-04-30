'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { Check, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState, type FormEvent } from 'react'

const TIERS = [
  { key: 'practitioner', highlight: false },
  { key: 'cell',         highlight: true  },
  { key: 'consultant',   highlight: false },
] as const

export function Pricing() {
  const t = useTranslations('pricing')
  const [sentFor, setSentFor] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

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
            {t('eyebrow')}
          </p>
          <h2 className="heading-display text-4xl md:text-5xl mb-6">
            {t('headline')}
          </h2>
          <p className="body-lead">{t('lead')}</p>
        </div>

        {/* Founding-member banner */}
        <div className="bg-ink text-white rounded-lg p-6 md:p-7 mb-12 flex flex-col md:flex-row gap-5 md:items-center md:justify-between border border-amber-DEFAULT/40">
          <div className="flex gap-4 items-start md:items-center">
            <Sparkles size={22} className="text-amber-light shrink-0 mt-1 md:mt-0" strokeWidth={1.5} />
            <div>
              <p className="font-mono text-xs text-amber-light tracking-widest uppercase mb-1.5">
                {t('founding.eyebrow')}
              </p>
              <h3 className="font-serif text-xl md:text-2xl text-white leading-snug">
                {t('founding.headline')}
              </h3>
              <p className="text-sm text-white/70 mt-2 leading-relaxed">
                {t('founding.body')}
              </p>
            </div>
          </div>
          <span className="font-mono text-xs text-white/50 tracking-wider whitespace-nowrap shrink-0 self-start md:self-center">
            {t('founding.spots')}
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TIERS.map(({ key, highlight }) => {
            const features = t.raw(`tiers.${key}.features`) as string[]
            return (
              <div
                key={key}
                className={cn(
                  'bg-white rounded-lg p-8 flex flex-col border transition-all',
                  highlight ? 'border-amber-DEFAULT shadow-md' : 'border-rule'
                )}
              >
                <span className="inline-block self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-5 uppercase tracking-wide bg-amber-pale text-amber-DEFAULT border border-amber-DEFAULT/30">
                  {t('comingSoon')}
                </span>

                <h3 className="font-serif text-2xl mb-2">{t(`tiers.${key}.title`)}</h3>
                <p className="text-xs text-ink-soft mb-5 font-mono tracking-wide uppercase">
                  {t(`tiers.${key}.audience`)}
                </p>
                <p className="text-sm text-ink-soft leading-relaxed mb-6">{t(`tiers.${key}.desc`)}</p>

                <ul className="space-y-2 mb-8 list-none flex-1">
                  {features.map((feat) => (
                    <li key={feat} className="flex gap-2 text-sm text-ink">
                      <Check size={16} className="text-amber-DEFAULT shrink-0 mt-0.5" strokeWidth={2} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Per-tier waitlist form — always visible, no click-to-reveal */}
                {sentFor === key ? (
                  <div className="bg-teal-DEFAULT/10 border border-teal-DEFAULT/30 rounded p-4 text-center">
                    <p className="text-sm font-semibold text-teal-DEFAULT mb-1">
                      {t('form.thanksTitle')}
                    </p>
                    <p className="text-xs text-ink-soft">{t('form.thanksBody')}</p>
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
                      {loading ? t('form.loading') : t(`tiers.${key}.cta`)}
                    </Button>
                  </form>
                )}
              </div>
            )
          })}
        </div>

        {/* Partner strip */}
        <p className="text-center text-sm text-ink-soft mt-10">
          {t('partnerNote')}{' '}
          <a href="mailto:hello@leanthecompany.com" className="font-semibold text-amber-DEFAULT hover:text-ink transition-colors">
            {t('partnerCta')}
          </a>
        </p>
      </div>
    </section>
  )
}
