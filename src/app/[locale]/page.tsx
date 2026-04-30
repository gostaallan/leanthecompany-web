import { setRequestLocale } from 'next-intl/server'
import { Navbar }       from '@/components/marketing/Navbar'
import { Hero }         from '@/components/marketing/Hero'
import { ForWhom }      from '@/components/marketing/ForWhom'
import { Problem }      from '@/components/marketing/Problem'
import { Platform }     from '@/components/marketing/Platform'
import { WhatsComing }  from '@/components/marketing/WhatsComing'
import { Diagnostic }   from '@/components/marketing/Diagnostic'
import { Pricing }      from '@/components/marketing/Pricing'
import { About }        from '@/components/marketing/About'
import { FinalCTA }     from '@/components/marketing/FinalCTA'
import { Footer }       from '@/components/marketing/Footer'

interface Props {
  params: { locale: string }
}

export default function HomePage({ params: { locale } }: Props) {
  // Required for static rendering — same call as the [locale] layout.
  // Each Server-Component page that uses next-intl APIs (directly or
  // transitively through child components) needs this opt-in.
  setRequestLocale(locale)

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ForWhom />
        <Problem />
        <Platform />
        <WhatsComing />
        <Diagnostic />
        <Pricing />
        <About />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
