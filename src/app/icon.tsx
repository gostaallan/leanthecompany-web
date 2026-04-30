import { ImageResponse } from 'next/og'

// Next.js conventions: this file becomes the favicon.
// Renders the LeanTheCompany mark — three process boxes + chevrons,
// matching branding/LeanTheCompany_logo_mark.svg.
export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#F7F2E7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg viewBox="0 0 400 400" width="28" height="28">
          <rect x="20"  y="110" width="100" height="180" rx="10" fill="none" stroke="#1A1A1A" strokeWidth="14" />
          <rect x="150" y="110" width="100" height="180" rx="10" fill="#C97B0E" />
          <rect x="280" y="110" width="100" height="180" rx="10" fill="none" stroke="#1A1A1A" strokeWidth="14" />
          <polygon points="123,190 145,200 123,210" fill="#1A1A1A" />
          <polygon points="253,190 275,200 253,210" fill="#1A1A1A" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
