# LeanTheCompany — Landing Page

The marketing site for **LeanTheCompany**, a Lean Transformation Platform for the manufacturing industry. It's the public face of the product (Chaos Score lead magnet, pricing waitlist, founder story) and a deliberate sibling of [TPM-OS.com](https://tpm-os.com): same colour palette, typography and section rhythm, distinct identity.

> **Status:** v0.1 — pre-launch landing page. The product itself (the dual-canvas VSM + Makigami app) is in development; this site captures interest and runs the Chaos Score diagnostic.

---

## What's in here

```
landing-page/
├─ src/
│  ├─ app/[locale]/         # Next.js App Router, locale-prefixed routes
│  │  ├─ layout.tsx         # <html>, fonts, metadata, NextIntlClientProvider
│  │  └─ page.tsx           # Composes the full marketing page
│  ├─ components/
│  │  ├─ marketing/         # Navbar, Hero, ForWhom, Problem, Platform,
│  │  │                     # Diagnostic, Pricing, About, FinalCTA, Footer
│  │  └─ ui/Button.tsx      # CVA + Radix Slot button (asChild fixed)
│  ├─ lib/
│  │  ├─ i18n.ts            # next-intl config, locales = ['en','sv','zh']
│  │  └─ utils.ts           # cn() helper (clsx + tailwind-merge)
│  ├─ locales/              # en.json, sv.json, zh.json — all copy lives here
│  └─ styles/globals.css    # Tailwind + design tokens
├─ public/founder.jpg       # Hero / About photo
├─ middleware.ts            # next-intl middleware (auto-detects browser locale)
├─ next.config.js           # next-intl plugin + security headers
├─ tailwind.config.ts       # Design tokens (mirrors TPM-OS exactly)
└─ .env.local.example       # Formspree endpoints, site URL, Plausible
```

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **next-intl** for i18n with `localePrefix: 'always'` (auto-detects from `Accept-Language`)
- **Tailwind CSS** with custom design tokens shared with TPM-OS
- **Radix UI** (`@radix-ui/react-slot`) for the polymorphic Button (`asChild` pattern)
- **class-variance-authority** for component variants
- **lucide-react** for icons
- **framer-motion** available for fade-up animations
- **Formspree** for the two lead forms (no backend to deploy)

---

## 1. First-time setup

```bash
cd landing-page
npm install
cp .env.local.example .env.local
```

Open `.env.local` and fill in:

- `NEXT_PUBLIC_FORMSPREE_WAITLIST` — Formspree endpoint for the **pricing tier waitlist**
- `NEXT_PUBLIC_FORMSPREE_CHAOS_SCORE` — Formspree endpoint for the **Chaos Score** lead magnet
- `NEXT_PUBLIC_SITE_URL` — `https://leanthecompany.com` in production
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — leave empty until you wire up analytics

### Setting up the two Formspree forms

1. Create a free account at [formspree.io](https://formspree.io).
2. Create **two separate forms** so the inboxes/sheets stay clean:
   - "LeanTheCompany — Chaos Score"
   - "LeanTheCompany — Waitlist"
3. For each form, in **Settings → Integrations**, connect a Google Sheet (Formspree pushes every submission as a new row).
4. Copy each form's endpoint URL (looks like `https://formspree.io/f/xyzabcde`) into `.env.local`.
5. While in Formspree, set the autoresponder for the Chaos Score form to send the 5-question questionnaire — that's what the user expects after submitting.

---

## 2. Run locally

```bash
npm run dev
```

Visit:

- http://localhost:3000 → middleware redirects to your browser's locale
- http://localhost:3000/en — English
- http://localhost:3000/sv — Swedish
- http://localhost:3000/zh — Chinese

Other helpful scripts:

```bash
npm run build       # Production build
npm run start       # Run the production build locally
npm run lint        # ESLint
npm run type-check  # tsc --noEmit
```

---

## 3. Editing copy

**All visible text lives in `src/locales/{en,sv,zh}.json`.** Components only import keys via `useTranslations()`. To change a headline, edit one or all three locale files — never hard-code copy in a component.

The three files share an identical structure. If you add a key, add it in all three at once; missing keys throw a runtime error in dev so you'll catch it.

> ⚠️ The Chinese translation is a strong first pass written by a non-native speaker. **Recommended:** before launching `/zh`, have a native Mandarin speaker (ideally with manufacturing/Lean vocabulary) review `src/locales/zh.json`. Particular care for "Chaos Score" (混乱分数), Makigami (卷纸图), and the Sensei tone.

---

## 4. Adding a new locale (e.g. German)

1. Add `'de'` to the `locales` array in `src/lib/i18n.ts`.
2. Add `de: 'DE'` to `localeNames` in the same file.
3. Copy `src/locales/en.json` → `src/locales/de.json` and translate.
4. Update `alternates.languages` in `src/app/[locale]/layout.tsx`.
5. `npm run dev` and visit `/de`.

---

## 5. Deploy to Vercel

The simplest path:

```bash
# From the landing-page directory
npx vercel             # First time — creates the project, links it
npx vercel --prod      # Promote to production
```

Or push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new). Set the **Root Directory** to `landing-page` if the repo holds other folders.

In **Project → Settings → Environment Variables**, paste the same four variables from `.env.local`.

### Domains

- `leanthecompany.com` → primary (defaults to `/en` for English locales, redirects others)
- `leanthecompany.se` → optional Swedish vanity domain. Easiest setup: add it in Vercel as an alias and let middleware still serve `/sv` content; later you can add a redirect rule that pins `leanthecompany.se` to the `sv` locale.

---

## 6. The two leads in & where they go

| Form              | Component                  | Env var                            | Goes to        |
|-------------------|----------------------------|------------------------------------|----------------|
| **Chaos Score**   | `marketing/Diagnostic.tsx` | `NEXT_PUBLIC_FORMSPREE_CHAOS_SCORE`| Formspree → Sheet |
| **Pricing waitlist** | `marketing/Pricing.tsx` | `NEXT_PUBLIC_FORMSPREE_WAITLIST`   | Formspree → Sheet |

Each form POSTs `multipart/form-data` to Formspree with `Accept: application/json`, which means the page handles success/error inline (no Formspree redirect). Email autoresponders are configured in the Formspree dashboard, not in code.

---

## 7. Updating founder content

- **Photo:** drop a new image at `public/founder.jpg` (square, ≥ 400×400, looks best with the face in the upper portion since the Hero card crops `object-top`).
- **Bio paragraphs:** `about.bio` array in each locale JSON. The component renders one `<p>` per array item.
- **Tags shown in Hero:** hard-coded in `src/components/marketing/Hero.tsx` (`'MSc EE · LTH'`, etc.) — these are intentionally not translated since they're credentials.
- **LinkedIn URL:** referenced in `About.tsx` and `Footer.tsx` — search-and-replace `linkedin.com/in/gostaseuranen` if it ever changes.

---

## 8. Design system at a glance

Mirrors TPM-OS exactly so the two sites read as siblings:

| Token         | Value     | Used for                               |
|---------------|-----------|----------------------------------------|
| `ink`         | `#0D1117` | Body text, dark sections (Hero, Platform, FinalCTA, Footer) |
| `ink-soft`    | `#4A5568` | Secondary text                          |
| `amber`       | `#B07D20` | Primary brand, CTAs, accents            |
| `amber-light` | `#E8B84B` | Highlights on dark backgrounds          |
| `teal`        | `#1A6B6B` | "Available" / success states            |
| `smoke`       | `#F4F2EE` | Alt-section backgrounds                 |
| `rule`        | `#E2DDD5` | Borders                                 |

**Typography:**
- Display: DM Serif Display (headlines, founder name)
- Body: DM Sans (paragraphs, UI)
- Monospace: JetBrains Mono (eyebrows, labels, footer meta)

**Layout:** `1120px` content max-width, generous `py-20` section padding, eyebrow line + serif headline + body lead pattern.

---

## 9. Sibling relationship to TPM-OS

The footer has a `Family` column linking out to TPM-OS. If you launch a third sibling (e.g., `kaizen-school.com`), add it to that column rather than scattering links across the page.

If TPM-OS updates its design tokens, mirror the change in `tailwind.config.ts` and `src/styles/globals.css` here so they stay in sync.

---

## 10. Known to-do before public launch

- [ ] Native Mandarin review of `src/locales/zh.json`
- [ ] Replace `public/og-image.png` placeholder with a real OG image (1200×630)
- [ ] Add `public/favicon.svg` and `public/apple-touch-icon.png`
- [ ] Create the two Formspree forms and paste real endpoints into Vercel env vars
- [ ] Wire up Plausible (cookie-free) once `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set
- [ ] Decide whether `leanthecompany.se` is a redirect or its own deployment

---

Built by the founder, in Malmö & Shanghai, on too many flights between the two.
