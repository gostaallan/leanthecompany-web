import { ImageResponse } from 'next/og'

// Next.js convention: served as /opengraph-image when shared on
// LinkedIn, X, Slack, etc. Generated at build time — no PNG to manage.
export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'LeanTheCompany — Lean Transformation Platform for Manufacturing'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#F7F2E7',
          color: '#1A1A1A',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top — mark + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <svg viewBox="0 0 400 400" width="80" height="80">
            <rect x="20"  y="110" width="100" height="180" rx="10" fill="none" stroke="#1A1A1A" strokeWidth="14" />
            <rect x="150" y="110" width="100" height="180" rx="10" fill="#C97B0E" />
            <rect x="280" y="110" width="100" height="180" rx="10" fill="none" stroke="#1A1A1A" strokeWidth="14" />
            <polygon points="123,190 145,200 123,210" fill="#1A1A1A" />
            <polygon points="253,190 275,200 253,210" fill="#1A1A1A" />
          </svg>
          <span
            style={{
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            LeanTheCompany
          </span>
        </div>

        {/* Middle — headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 26,
              fontWeight: 500,
              color: '#C97B0E',
              fontFamily: 'monospace',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Lean Transformation Platform · Founding-100 cohort
          </div>
          <div
            style={{
              fontSize: 70,
              fontWeight: 400,
              lineHeight: 1.05,
              fontFamily: 'serif',
              maxWidth: 1000,
            }}
          >
            Run your Lean transformation as a system, not a slogan.
          </div>
        </div>

        {/* Bottom — meta strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            fontFamily: 'monospace',
            color: '#4A5568',
            paddingTop: 24,
            borderTop: '1px solid #E2DDD5',
          }}
        >
          <span>leanthecompany.com</span>
          <span>VSM · Makigami · Kaizen · A3 — with AI sensei</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
