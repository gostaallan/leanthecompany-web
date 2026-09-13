#!/usr/bin/env node
/**
 * Paragraph gate — a blank line in a catalogue value must reach the page as a
 * paragraph, not as a space.
 *
 * ── WHY THIS EXISTS ────────────────────────────────────────────────────────
 *
 * The 133 pen-pass shipped eight values containing a blank line, and the page
 * had never rendered one: inside a `<p>`, `white-space: normal` throws the
 * newline away. The copy was correct in the JSON and a run-on paragraph on the
 * screen.
 *
 * ⚠ **AND IT FOUND TEN, NOT EIGHT.** The handover named eight and the hand
 * measurement checked those eight. This gate enumerates the CATALOGUE instead,
 * and turned up `platform.lead` (zh) and `about.bio.3` (zh) — both carrying a
 * blank line since before 133, both live, both collapsed. The claim that no
 * shipped value had ever contained one was false, and only a check that looks
 * at every value rather than at the values under discussion could say so.
 *
 * **FIVE GATES RAN GREEN OVER IT.** Vocabulary reads WORDS, parity reads
 * STRUCTURE, residue reads the SHAPE OF A VALUE, the key count reads a NUMBER,
 * and `next build` reads whether the compiler was happy. Not one of them asks
 * whether a string's shape survives to the page. It was found by measuring the
 * DOM by hand, which is not a thing that happens twice.
 *
 * ── WHY IT READS THE BUILT HTML AND NOT THE SOURCE ─────────────────────────
 *
 * A source scan could assert that the components call a splitter. That is the
 * 104 mistake in a new costume: asserting that the instruction is PRESENT is not
 * asserting that it DID anything. `next build` prerenders `/en`, `/sv` and `/zh`
 * to static HTML, so the actual render is sitting on disk by the time this runs
 * as `postbuild` — and reading it costs nothing and cannot be fooled by a
 * splitter that is imported and not used.
 *
 * ── WHAT IT ASSERTS, AND WHY THIS PREDICATE ────────────────────────────────
 *
 * The hand measurement that found the defect looked at four things:
 * `textContent` had the newline, `innerText` did not, BLOCK CHILDREN 0, client
 * rects 1. **Block children is the one that says "did it become a paragraph"**
 * rather than "is the character still in the string" — a value can keep its
 * newline forever and still render as one box.
 *
 * In static HTML the equivalent of "N block children" is: each of the value's N
 * paragraphs closes its own `</p>`. So, per value:
 *
 *   1. the raw value, newlines and all, must NOT appear verbatim — that is the
 *      signature of the whole thing landing in one text node;
 *   2. every paragraph must be immediately followed by `</p>`.
 *
 * Rule 2 alone would pass on the broken tree for the LAST paragraph, which is
 * why it is every paragraph and not any.
 *
 * ── PROVEN RED ─────────────────────────────────────────────────────────────
 *
 * Run against the build immediately before the fix, this failed 10 for 10 and
 * named every one. A gate that has never failed has not been tested.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LOCALES = ['en', 'sv', 'zh'];
const BLANK_LINE = /\n{2,}/;

/**
 * React's text-child escaping. `"` is in the list and it matters: today's ten
 * values happen not to contain one, so leaving it out would have made this gate
 * pass by luck and fail the first time a writer used a quotation mark. Verified
 * against the built HTML, where `problem.items.handoffs.body` renders
 * `&quot;waiting for clarification.&quot;`.
 */
const esc = (s) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Flatten to dotted keys; array items become `key.N`. */
function flat(node, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(node)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (Array.isArray(v)) {
      v.forEach((item, i) =>
        item && typeof item === 'object'
          ? flat(item, `${key}.${i}`, out)
          : (out[`${key}.${i}`] = String(item)),
      );
    } else if (v && typeof v === 'object') {
      flat(v, key, out);
    } else {
      out[key] = String(v);
    }
  }
  return out;
}

const problems = [];
let checked = 0;

for (const locale of LOCALES) {
  const html = join(ROOT, '.next', 'server', 'app', `${locale}.html`);
  if (!existsSync(html)) {
    problems.push(
      `${locale}: no prerendered HTML at .next/server/app/${locale}.html — this gate runs as` +
        ' postbuild and needs the build output. Run `npm run build`.',
    );
    continue;
  }
  const page = readFileSync(html, 'utf8');
  const values = flat(JSON.parse(readFileSync(join(ROOT, 'src', 'locales', `${locale}.json`), 'utf8')));

  for (const [key, value] of Object.entries(values)) {
    if (!BLANK_LINE.test(value)) continue;
    checked++;
    const paras = value.split(BLANK_LINE);

    if (page.includes(esc(value))) {
      problems.push(
        `[${locale}] ${key} — the whole value is in ONE text node, blank line and all.` +
          ` It renders as a single run-on paragraph; the break collapses to a space.`,
      );
      continue;
    }
    paras.forEach((p, i) => {
      if (!page.includes(`${esc(p)}</p>`)) {
        problems.push(
          `[${locale}] ${key} — paragraph ${i + 1} of ${paras.length} does not close its own` +
            ` <p>. "${p.slice(0, 60)}…"`,
        );
      }
    });
  }
}


// ═══════════════════════════════════════════════════════════════════════════
// ZH HEADLINE CHECK — no 。 in a headline (GTM zh-sv-copy-rules.md R1 / R1a)
// ═══════════════════════════════════════════════════════════════════════════
//
// Ruled by Gösta, 1 Sept 2026: "We should not have any full stop anywhere in a
// headline." Not between clauses, not at the end. Where English separates two
// short clauses with a period, Chinese uses a space.
//
// The ruling already existed and was written down NOWHERE, so the next spec
// contradicted it — which is why zh-sv-copy-rules.md now exists and why this
// check does too. A rule that lives only in someone's memory is a rule the next
// person breaks in good faith.
//
// ── TWO LAYERS, AND NEITHER ALONE WOULD HAVE FOUND THE 23 ──────────────────
//
// PINS are the ruling: the exact keys Gösta confirmed. Explicit, auditable, and
// blind to any key nobody added.
//
// The NET is the countermeasure for that blindness, and it classifies THE WAY
// THE CLASSIFICATION WAS ACTUALLY MADE (R1a): by how the value renders, not by
// what the key is called. The key names lie — two values named `tagline` are
// three-sentence body paragraphs, and `howItConnects.closing` is not named like
// a headline while rendering in the same display family as the h2s.
//
// ── THE ALLOWLIST CARRIES A REQUIRED `ruledBy`, AND THAT IS THE POINT ───────
//
// The net will eventually meet a display-type value that legitimately wants a
// 。. Without required attribution the allowlist is the quiet escape hatch: an
// entry appears, the gate goes green, and nobody knows who decided or when.
// Same shape as RULED_IDENTICAL_BY_DESIGN in the platform repo, for the same
// reason. AN ENTRY WITH NO `ruledBy` FAILS THIS GATE.
const FULL_STOP = '。';

/**
 * The 23 swept on 1 Sept, less `platform.chainLine` (deleted with its section)
 * and plus `whatsComing.mapLine` (the Platform headline, moved) — brief 186.
 * Pins are the ruling; they do not classify.
 */
const HEADLINE_PINS = [
  'hero.headline', 'hero.headlineSub',
  'problem.items.chaos.title', 'problem.items.handoffs.title',
  'howItConnects.headline', 'howItConnects.steps.1.title',
  'howItConnects.steps.4.title', 'howItConnects.closing',
  'whatsComing.headline', 'whatsComing.mapLine',
  'diagnostic.introTitle', 'diagnostic.form.thanksTitle', 'diagnostic.baselineTitle',
  'gembaDrill.headline',
  'pricing.headline', 'pricing.form.thanksTitle', 'pricing.space.headline',
  'pricing.archive.headline', 'pricing.comparison.headline',
  'pricing.original.headline', 'pricing.priceLock.title',
  'about.headline', 'finalCta.headline',

  // ── display type the NET cannot see in the prerender (brief 186 A1.8) ──
  // Rendered only after an interaction — the Chaos Score result phase — so
  // zh.html never holds them and a pin is the only check there can be.
  'diagnostic.bands.firefighting.name', 'diagnostic.bands.runningOnPeople.name',
  'diagnostic.bands.drifting.name', 'diagnostic.bands.quietPlant.name',
  'diagnostic.form.title',
  // In the prerender, inside elements the first net could not read: a <strong>,
  // and an <em> nested in the h2. The widened net reaches them now; the pins
  // stay because they do not depend on the HTML being there at all.
  'hero.proof.years', 'hero.proof.canvases', 'hero.proof.start',
  'finalCta.headlineSub',
];

/**
 * Display type, as R1a defines headline-class: `heading-display`,
 * `heading-section`, `label-caps` (the eyebrows), or `font-serif` at text-xl
 * and up. Body type keeps its 。 whatever the key is called.
 */
const DISPLAY = /(heading-display|heading-section|label-caps|font-serif[^"]*text-(xl|2xl|3xl|4xl|5xl|6xl))/;

/**
 * Mono caps: `font-mono` + `uppercase`, class order free. The Hero, FinalCTA and
 * Original-banner eyebrows are set this way rather than in `label-caps`, and so
 * are the rail's fork labels and Sensei tag. A label has no sentence, so a 。 in
 * one is wrong whatever R1a calls the type (brief 186 A1.8).
 */
const isMonoCaps = (cls) => /\bfont-mono\b/.test(cls) && /\buppercase\b/.test(cls);

/**
 * Ruled exemptions from the NET. `{ text, reason, ruledBy }` — `ruledBy` is
 * REQUIRED and non-empty, naming the person and the date.
 * Empty today, deliberately: there are zero legitimate matches, and the entry
 * that is ever needed is a one-line ruling made with the string in hand, which
 * is worth more than a guess made now about a string nobody has written.
 */
const HEADLINE_ALLOW = [];

for (const [i, entry] of HEADLINE_ALLOW.entries()) {
  if (!entry || typeof entry.ruledBy !== 'string' || entry.ruledBy.trim() === '') {
    problems.push(
      `HEADLINE_ALLOW[${i}] has no \`ruledBy\`. An exemption without an owner and a date is` +
        ' the escape hatch this list exists to avoid — name who ruled it and when.',
    );
  }
  if (!entry || typeof entry.reason !== 'string' || entry.reason.trim() === '') {
    problems.push(`HEADLINE_ALLOW[${i}] has no \`reason\`. Say what was decided, not that a gate was red.`);
  }
}
let netScanned = 0;
const allowed = new Set(HEADLINE_ALLOW.filter((e) => e && e.ruledBy && e.reason).map((e) => e.text));

{
  const zh = flat(JSON.parse(readFileSync(join(ROOT, 'src', 'locales', 'zh.json'), 'utf8')));

  // ── pins ────────────────────────────────────────────────────────────────
  for (const key of HEADLINE_PINS) {
    const value = zh[key];
    if (value === undefined) {
      problems.push(`[zh] HEADLINE_PINS names ${key}, which is not in the catalogue — a pin that points at nothing.`);
      continue;
    }
    if (value.includes(FULL_STOP)) {
      problems.push(
        `[zh] ${key} — a headline holds ${value.split(FULL_STOP).length - 1} full stop(s).` +
          ` R1: none anywhere, terminal or between clauses. "${value.slice(0, 50)}…"`,
      );
    }
  }

  // ── net ─────────────────────────────────────────────────────────────────
  const htmlPath = join(ROOT, '.next', 'server', 'app', 'zh.html');
  if (existsSync(htmlPath)) {
    const page = readFileSync(htmlPath, 'utf8');

    // ⚠ A QUOTATION IS NOT A HEADLINE, and the net found that out on its first
    // run. `problem.quote` is Ohno's sentence, set in `font-serif text-2xl
    // italic` — display type by every measure the rule names, and stripping its
    // 。 would be editing a quotation.
    //
    // It is excluded STRUCTURALLY, by the <blockquote> it sits in, rather than
    // by an allowlist entry. R1a classifies by render, and a blockquote renders
    // as a quotation rather than as a headline — so this is the classification
    // getting more precise, not an exemption from it. An allowlist entry would
    // have needed a `ruledBy` naming someone who never ruled on this value: the
    // confirmed list did not mention it, because neither Sensei nor CC
    // surfaced it. The net did, which is what a net is for.
    const quoted = [...page.matchAll(/<blockquote\b[\s\S]*?<\/blockquote>/g)].map((q) => [
      q.index,
      q.index + q[0].length,
    ]);
    const inBlockquote = (i) => quoted.some(([a, b]) => i >= a && i < b);

    // ⚠ THE FIRST NET READ ONLY TEXT THAT STARTED RIGHT AFTER THE OPENING TAG
    // (`>([^<]+)<`), and measured on the 186 build that missed every eyebrow on
    // the page — each `label-caps` eyebrow opens with its amber hairline <span>,
    // so the text begins after a child tag — plus the <em> under the Hero and
    // FinalCTA headlines and the <strong> proof numbers. It scanned 38 elements
    // and reported "clean" about all of them, which was true and was not the page.
    //
    // So: take the element's whole inner HTML up to its own matching close tag,
    // strip the child tags, and test that text. An <em> inside a display h2 is
    // then read as part of the h2, which is how it renders.
    const OPEN = /<(h1|h2|h3|h4|h5|h6|p|span|li|div|strong|em)\b[^>]*\bclass="([^"]*)"[^>]*>/g;
    const innerText = (tag, from) => {
      const tagRe = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'g');
      tagRe.lastIndex = from;
      let depth = 1;
      let t;
      while ((t = tagRe.exec(page)) !== null) {
        if (t[0].endsWith('/>')) continue;
        depth += t[1] ? -1 : 1;
        if (depth === 0) return page.slice(from, t.index).replace(/<[^>]*>/g, '');
      }
      return null;
    };

    let m;
    while ((m = OPEN.exec(page)) !== null) {
      const [open, tag, cls] = m;
      if (!DISPLAY.test(cls) && !isMonoCaps(cls)) continue;
      if (inBlockquote(m.index)) continue;
      const text = (innerText(tag, m.index + open.length) ?? '').trim();
      if (text === '') continue;
      netScanned++;
      if (!text.includes(FULL_STOP)) continue;
      if (allowed.has(text)) continue;
      problems.push(
        `[zh] NET — display-type <${tag}> renders a full stop: "${text.slice(0, 50)}…"` +
          ` (class "${cls.slice(0, 60)}"). Either it is a headline and R1 applies, or it is` +
          ' an allowlist entry with a `ruledBy`.',
      );
    }

    // A net that parses nothing prints "clean" about nothing. The prerender is
    // present, so zero elements means the pattern broke, not that the page is clean.
    if (netScanned === 0) {
      problems.push('[zh] NET — zh.html exists but no display-type element was read. The net is blind.');
    }
  }
}

if (problems.length === 0) {
  // The success line NAMES BOTH CHECKS AND THEIR COUNTS. A gate that runs two
  // things and reports one is a green that describes half of itself — and a
  // check whose count silently drops to zero (a renamed key, a moved HTML path)
  // still prints "clean".
  console.log(
    `render-gate: clean` +
      ` — paragraphs: ${checked} value(s) with a blank line render as their own paragraphs` +
      ` across ${LOCALES.length} locales` +
      ` · zh headlines: ${HEADLINE_PINS.length} pinned keys carry no ${FULL_STOP},` +
      ` ${netScanned} display-type element(s) scanned, ${HEADLINE_ALLOW.length} ruled exemption(s)`,
  );
  process.exit(0);
}

console.error(`\nrender-gate: ${problems.length} problem(s)\n`);
for (const p of problems) console.error(`  ${p}`);
console.error('\nA blank line in the copy is a paragraph the writer asked for. If it renders as a');
console.error('space, the page is not the text that was signed off. Fix the COMPONENT — never');
console.error('reach for the copy to work around the renderer.\n');
process.exit(1);
