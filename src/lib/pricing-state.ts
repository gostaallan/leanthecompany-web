/**
 * The pricing page has three states, and they are driven by exactly two dates.
 *
 *   A  now → 14 Sept      open beta, nothing for sale
 *   B  15 Sept → 1 Oct    sales open, Founding 100 live, countdown running
 *   C  after the close    plain pricing, no founding block, no countdown
 *
 * Nothing else on the page decides which state it is in. Change the two values
 * below and the eyebrow, the lead, the badges, the CTAs, the founding block,
 * the price-lock note and the countdown all move together — no code edit, no
 * second template. Brief 091 AC2.
 *
 * Both dates are pinned to +02:00 (CEST) because that is what the copy says.
 * Sweden leaves CEST on 25 October 2026, after the close, so there is no DST
 * edge inside the window.
 */
export const SALES_OPEN = new Date('2026-09-15T00:00:00+02:00')
export const FOUNDING_CLOSE = new Date('2026-10-01T23:59:59+02:00')

export type PricingState = 'A' | 'B' | 'C'

export function pricingState(now: Date): PricingState {
  if (now.getTime() < SALES_OPEN.getTime()) return 'A'
  if (now.getTime() <= FOUNDING_CLOSE.getTime()) return 'B'
  return 'C'
}

/**
 * Whole days remaining until the close, floored, never negative.
 *
 * Floored rather than rounded on purpose: at 23 days and 12 hours the honest
 * thing to say is "23 days left", not 24. The number must never be generous
 * about a deadline.
 */
export function daysLeft(now: Date): number {
  const ms = FOUNDING_CLOSE.getTime() - now.getTime()
  if (ms <= 0) return 0
  return Math.floor(ms / 86_400_000)
}

/**
 * Formatting locales, deliberately not the routing locales.
 *
 * `en` on its own is US English to Intl, which renders "October 1". The copy
 * says "1 October" and the rest of the site is British ("honour roll",
 * og:locale en_GB), so English formats as en-GB. This is the only place the
 * distinction exists — the URL segment stays `en`.
 */
const DATE_LOCALE: Record<string, string> = {
  en: 'en-GB',
  sv: 'sv-SE',
  zh: 'zh-CN',
}

/**
 * The two dates, rendered in the locale's own form — `1 October`, `1 oktober`,
 * `10月1日`. Never an English date inside a Swedish sentence (091 AC10).
 *
 * Formatted server-side and handed to the client as plain strings: the zone is
 * pinned to Europe/Stockholm, so the server and a browser in Singapore agree,
 * and nobody is told the seats close on 2 October.
 */
export interface PricingDates {
  /* Index signature so the whole object can be spread straight into a
     next-intl `t(key, values)` call without restating the four fields. */
  [key: string]: string
  salesOpenLong: string
  salesOpenShort: string
  closeLong: string
  closeShort: string
}

export function pricingDates(locale: string): PricingDates {
  const tag = DATE_LOCALE[locale] ?? DATE_LOCALE.en
  const long = new Intl.DateTimeFormat(tag, {
    day: 'numeric',
    month: 'long',
    timeZone: 'Europe/Stockholm',
  })
  const short = new Intl.DateTimeFormat(tag, {
    day: 'numeric',
    month: 'short',
    timeZone: 'Europe/Stockholm',
  })

  return {
    salesOpenLong:  long.format(SALES_OPEN),
    salesOpenShort: short.format(SALES_OPEN),
    closeLong:      long.format(FOUNDING_CLOSE),
    closeShort:     short.format(FOUNDING_CLOSE),
  }
}

/**
 * Test seam. `PRICING_NOW` renders any of the three states for real instead of
 * reasoning about them (brief 091 AC5, AC8, AC11):
 *
 *   PRICING_NOW=2026-10-05T12:00:00+02:00 npm run build
 *
 * Gated on VERCEL_ENV rather than NODE_ENV on purpose. The thing that must
 * never be overridable is the live deployment, and Vercel sets VERCEL_ENV to
 * "production" there. Gating on NODE_ENV instead would also block a local
 * production build — which is exactly the build you want to check the close
 * date against before shipping it.
 */
export function resolveNow(): Date {
  const override = process.env.PRICING_NOW
  if (override && process.env.VERCEL_ENV !== 'production') {
    const parsed = new Date(override)
    if (!Number.isNaN(parsed.getTime())) return parsed
  }
  return new Date()
}
