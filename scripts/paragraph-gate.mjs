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

if (problems.length === 0) {
  console.log(
    `paragraph-gate: clean — ${checked} value(s) with a blank line, each rendering as its own` +
      ` paragraphs across ${LOCALES.length} locales`,
  );
  process.exit(0);
}

console.error(`\nparagraph-gate: ${problems.length} problem(s)\n`);
for (const p of problems) console.error(`  ${p}`);
console.error('\nA blank line in the copy is a paragraph the writer asked for. If it renders as a');
console.error('space, the page is not the text that was signed off. Fix the COMPONENT — never');
console.error('reach for the copy to work around the renderer.\n');
process.exit(1);
