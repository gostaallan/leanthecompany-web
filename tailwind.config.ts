import type { Config } from 'tailwindcss'

/**
 * LeanTheCompany design tokens — mirrors TPM-OS exactly so the two sites
 * feel like siblings. Keep this file in sync with the TPM-OS scaffold.
 */
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0D1117',
          mid:     '#2A3240',
          soft:    '#4A5568',
        },
        amber: {
          DEFAULT: '#B07D20',
          light:   '#E8B84B',
          pale:    '#FDF6E3',
        },
        teal: {
          DEFAULT: '#1A6B6B',
          light:   '#2A9090',
        },
        smoke:  '#F4F2EE',
        rule:   '#E2DDD5',
      },
      fontFamily: {
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
        serif: ['DM Serif Display', 'Georgia', 'serif'],
        mono:  ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      maxWidth: {
        content: '1120px',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out forwards',
        'fade-in': 'fade-in 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
}

export default config
