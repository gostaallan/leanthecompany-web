import { setRequestLocale } from 'next-intl/server'
import {
  daysLeft,
  pricingDates,
  pricingState,
  resolveNow,
} from '@/lib/pricing-state'
import { Navbar }        from '@/components/marketing/Navbar'
import { Hero }          from '@/components/marketing/Hero'
import { ForWhom }       from '@/components/marketing/ForWhom'
import { Problem }       from '@/components/marketing/Problem'
import { HowItConnects } from '@/components/marketing/HowItConnects'
import { WhatsComing }   from '@/components/marketing/WhatsComing'
import { Diagnostic }    from '@/components/marketing/Diagnostic'
import { GembaDrill }    from '@/components/marketing/GembaDrill'
import { Pricing }       from '@/components/marketing/Pricing'
import { About }         from '@/components/marketing/About'
import { FinalCTA }      from '@/components/marketing/FinalCTA'
import { Footer }        from '@/components/marketing/Footer'

interface Props {
  params: { locale: string }
}

/**
 * The pricing state is a function of the wall clock, and this page is
 * prerendered — so without a revalidate window the build would freeze whatever
 * state it happened to be in and the page would still say "sales open 15
 * September" on the 16th. Five minutes keeps the page static and cheap while
 * bounding how long a stale state can survive the transition on 15 September
 * and the close on 1 October.
 */
export const revalidate = 300

export default function HomePage({ params: { locale } }: Props) {
  // Required for static rendering — same call as the [locale] layout.
  // Each Server-Component page that uses next-intl APIs (directly or
  // transitively through child components) needs this opt-in.
  setRequestLocale(locale)

  // State and dates are resolved HERE, on the server, and cross into the client
  // components as plain strings and numbers. If Pricing called new Date()
  // itself, a render that straddled a boundary would hydrate against a
  // different state — and no Date crosses the RSC boundary either way.
  const now = resolveNow()
  const state = pricingState(now)
  const dates = pricingDates(locale)

  return (
    <>
      <Navbar />
      <main>
        <Hero closeLong={dates.closeLong} />
        <ForWhom />
        <Problem />
        <HowItConnects />
        <WhatsComing closeLong={dates.closeLong} />
        <Diagnostic />
        <GembaDrill />
        <Pricing state={state} daysLeft={daysLeft(now)} dates={dates} />
        <About />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
