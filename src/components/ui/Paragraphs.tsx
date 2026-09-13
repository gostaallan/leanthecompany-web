import { cn } from '@/lib/utils'

interface Props {
  /** A catalogue value. A run of two or more newlines separates paragraphs. */
  text: string
  /** Applied to EVERY paragraph — the type styles the call site already used. */
  className?: string
  /**
   * Applied to every paragraph after the first. Defaults to a design-system
   * step; pass `''` where the parent already spaces its children (`space-y-*`).
   */
  gapClass?: string
}

/**
 * A catalogue value, rendered as the paragraphs it was written as.
 *
 * ── WHY THIS EXISTS ────────────────────────────────────────────────────────
 *
 * The 133 pen-pass shipped eight values containing a blank line, and the page
 * had never rendered one. Inside a single `<p>`, `white-space: normal` throws
 * the newline away: the copy was right in the JSON and a run-on paragraph on
 * the screen. Two of the ten the gate then found — `platform.lead` (zh) and
 * `about.bio.3` (zh) — had been live and collapsed since before 133.
 *
 * ── WHY NOT `whitespace-pre-line` ──────────────────────────────────────────
 *
 * One class, no JS, and it was the wrong trade for THIS page. `pre-line`
 * renders whatever whitespace is in the JSON, and this repo carries
 * `scripts/residue-gate.mjs` precisely because reviewer commentary and bracket
 * leftovers have shipped live here before. `pre-line` would open a new VISIBLE
 * surface for that exact class of leak — a stray trailing space or a doubled
 * space in a future copy edit would render — on the page that has already been
 * bitten by it. Splitting reads only the separator it is told to read.
 *
 * It is also the better answer on its own terms: paragraph spacing becomes a
 * design decision (`gapClass`) instead of a side effect of `line-height`.
 *
 * ── THE SINGLE-PARAGRAPH CASE IS BYTE-IDENTICAL ────────────────────────────
 *
 * A value with no blank line yields exactly one `<p className={className}>` —
 * the same element the call sites rendered before. That is deliberate: this
 * change must be invisible everywhere the copy has not asked for a break.
 *
 * `scripts/paragraph-gate.mjs` asserts the result against the prerendered HTML,
 * because a splitter that is imported and never called looks exactly like one
 * that works.
 */
export function Paragraphs({ text, className, gapClass = 'mt-4' }: Props) {
  const paragraphs = text.split(/\n{2,}/)

  return (
    <>
      {paragraphs.map((paragraph, i) => (
        <p key={i} className={cn(className, i > 0 && gapClass)}>
          {paragraph}
        </p>
      ))}
    </>
  )
}
