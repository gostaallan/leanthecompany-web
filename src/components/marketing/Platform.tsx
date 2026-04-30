'use client'

import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

// Status type kept wide so individual items can be flipped to 'live'
// later without re-typing this array.
type PlatformStatus = 'dev' | 'live'
interface PlatformItem {
  key: string
  status: PlatformStatus
}

const ITEMS: readonly PlatformItem[] = [
  { key: 'vsm',       status: 'dev' },
  { key: 'makigami',  status: 'dev' },
  { key: 'sensei',    status: 'dev' },
  { key: 'tracker',   status: 'dev' },
  { key: 'warroom',   status: 'dev' },
  { key: 'report',    status: 'dev' },
]

export function Platform() {
  const t = useTranslations('platform')

  return (
    <section id="platform" className="section section-dark">
      <div className="wrap">
        <div className="max-w-3xl mb-16">
          <p className="label-caps mb-4 flex items-center gap-3 text-amber-light">
            <span className="w-7 h-px bg-amber-DEFAULT inline-block" />
            {t('eyebrow')}
          </p>
          <h2 className="heading-display text-4xl md:text-5xl mb-6 text-white">
            {t('headline')}
          </h2>
          <p className="body-lead text-white/70">{t('lead')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ITEMS.map((item, idx) => (
            <div
              key={item.key}
              className="bg-white/5 border border-white/10 rounded p-7 hover:border-amber-DEFAULT/40 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-amber-light tracking-wider">
                  0{idx + 1}
                </span>
                <span
                  className={cn(
                    'text-xs font-semibold px-2.5 py-1 rounded-full border',
                    item.status === 'live'
                      ? 'bg-teal-DEFAULT/20 text-teal-light border-teal-DEFAULT/40'
                      : 'bg-white/5 text-white/60 border-white/15'
                  )}
                >
                  {t(`status.${item.status}`)}
                </span>
              </div>
              <h3 className="font-serif text-lg mb-3 text-white leading-snug">
                {t(`items.${item.key}.title`)}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {t(`items.${item.key}.body`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
