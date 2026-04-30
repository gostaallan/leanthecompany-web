'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { useState, type FormEvent } from 'react'

const STEPS = ['inventory', 'handoffs', 'shadow', 'decisions', 'standards'] as const

export function Diagnostic() {
  const t = useTranslations('diagnostic')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

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
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-start">

          {/* Left: pitch + steps */}
          <div>
            <p className="label-caps mb-4 flex items-center gap-3">
              <span className="w-7 h-px bg-amber-DEFAULT inline-block" />
              {t('eyebrow')}
            </p>
            <h2 className="heading-display text-4xl md:text-5xl mb-6">
              {t('headline')}
            </h2>
            <p className="body-lead mb-10">{t('lead')}</p>

            <ol className="space-y-4 list-none">
              {STEPS.map((key, i) => (
                <li key={key} className="flex gap-4 items-start">
                  <span className="font-mono text-xs font-semibold text-amber-DEFAULT pt-1 shrink-0">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-base mb-0.5">
                      {t(`steps.${key}.title`)}
                    </h3>
                    <p className="text-sm text-ink-soft leading-relaxed">
                      {t(`steps.${key}.body`)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Right: form card */}
          <div className="bg-smoke border border-rule rounded-lg p-8 md:p-10 lg:sticky lg:top-24">
            <h3 className="font-serif text-2xl mb-3">{t('form.title')}</h3>
            <p className="text-sm text-ink-soft mb-6 leading-relaxed">
              {t('form.description')}
            </p>

            {sent ? (
              <div className="bg-teal-DEFAULT/10 border border-teal-DEFAULT/30 rounded p-5">
                <p className="text-sm text-teal-DEFAULT font-semibold mb-1">
                  {t('form.thanksTitle')}
                </p>
                <p className="text-sm text-ink-soft">
                  {t('form.thanksBody')}
                </p>
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

                <input
                  name="name"
                  required
                  placeholder={t('form.namePlaceholder')}
                  className="w-full px-4 py-3 text-sm border border-rule rounded bg-white focus:outline-none focus:border-amber-DEFAULT transition-colors"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder={t('form.emailPlaceholder')}
                  className="w-full px-4 py-3 text-sm border border-rule rounded bg-white focus:outline-none focus:border-amber-DEFAULT transition-colors"
                />
                <input
                  name="company"
                  placeholder={t('form.companyPlaceholder')}
                  className="w-full px-4 py-3 text-sm border border-rule rounded bg-white focus:outline-none focus:border-amber-DEFAULT transition-colors"
                />
                <select
                  name="role"
                  required
                  defaultValue=""
                  className="w-full px-4 py-3 text-sm border border-rule rounded bg-white focus:outline-none focus:border-amber-DEFAULT transition-colors"
                >
                  <option value="" disabled>{t('form.rolePlaceholder')}</option>
                  {(t.raw('form.roles') as string[]).map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>

                <label className="flex items-start gap-2 text-xs text-ink-soft pt-2">
                  <input type="checkbox" name="consent" required className="mt-0.5" />
                  <span>{t('form.consent')}</span>
                </label>

                {error && <p className="text-xs text-red-600">{error}</p>}

                <Button type="submit" variant="primary" size="full" disabled={loading}>
                  {loading ? t('form.loading') : t('form.submit')}
                </Button>

                <p className="text-xs text-ink-soft text-center">
                  {t('form.meta')}
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
