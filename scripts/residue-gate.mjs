#!/usr/bin/env node
/**
 * Residue gate — the review sheet must not reach the page.
 *
 * ── WHY THIS EXISTS ────────────────────────────────────────────────────────
 *
 * Four values went live carrying their own review-sheet formatting. The sv
 * waitlist labels kept the sheet's bracket wrapper —
 * `[ Ställ dig i kön för Process Owner ]` — and the zh ones additionally had
 * the NEXT SHEET ROW glued onto the end:
 *
 *   [ 加入 Process Owner 等候队列 ] 7 · Architect — partner track
 *
 * Rendered inside a nowrap button, that overflowed across card boundaries.
 * Nothing in the toolchain looked. The vocabulary gate reads WORDS and the
 * parity gate reads STRUCTURE; a value that is well-formed, present in all
 * three locales and spelled correctly is invisible to both, and can still be
 * an editing artefact rather than copy.
 *
 * ── THREE SIGNATURES, NOT ONE (ruling R1, 2026-08-26) ──────────────────────
 *
 * The first draft of this gate had only the bracket rules. A sweep of the
 * catalogue then turned up the same class wearing different clothes: two
 * English credential bodies that were internal questions to the author —
 *
 *   about.credentials.lean.body  = "(Do you need this part still?)"
 *   about.credentials.china.body = "(not going to do anything about this part)"
 *
 * — live on the page, and untouched by any bracket rule. A gate that stops at
 * the signature that happened to be noticed first is the checker whose scan
 * root ends one directory short. So: three rules, and each one has its own
 * proven red run rather than one rung standing in for all three.
 *
 * ── WHY VALUES AND NOT LINES ───────────────────────────────────────────────
 *
 * This parses the catalogues and tests each leaf VALUE. A line scan over `src`
 * would fire on ordinary array code (`[ 'a', 'b' ]`) and on every legitimate
 * parenthesis inside a sentence. The property being asserted is about a whole
 * catalogue value, so a whole catalogue value is what gets tested.
 *
 * ── NO ALLOWLIST, ON PURPOSE ───────────────────────────────────────────────
 *
 * There are zero legitimate matches today. If a value is ever legitimately
 * parenthetical in full, the red run NAMES it, and the allowlist entry is a
 * one-line ruling made that day with the string in hand — which is worth more
 * than a guess made now about a string nobody has written yet.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LOCALES = ['en', 'sv', 'zh'];

const RULES = [
  {
    name: 'bracket-wrap',
    re: /^\[ | \]$/,
    note: "the review sheet's own wrapper — ship the label, not the row",
  },
  {
    name: 'glued-sheet-row',
    re: /\] \d+ · /,
    note: 'the NEXT sheet row was pasted onto the end of this value',
  },
  {
    name: 'whole-value-parenthetical',
    re: /^\(.*\)$/s,
    note: 'a note to the author, not copy for a reader',
  },
];

/** Flatten to dotted keys; array items become `key.N`. */
function flat(node, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(node)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (Array.isArray(v)) {
      v.forEach((item, i) =>
        item && typeof item === 'object' ? flat(item, `${key}.${i}`, out) : (out[`${key}.${i}`] = String(item)),
      );
    } else if (v && typeof v === 'object') {
      flat(v, key, out);
    } else {
      out[key] = String(v);
    }
  }
  return out;
}

const hits = [];
let scanned = 0;

for (const locale of LOCALES) {
  const cat = JSON.parse(readFileSync(join(ROOT, 'src', 'locales', `${locale}.json`), 'utf8'));
  const values = flat(cat);
  scanned += Object.keys(values).length;
  for (const [key, value] of Object.entries(values)) {
    for (const rule of RULES) {
      if (rule.re.test(value)) {
        hits.push({ locale, key, rule: rule.name, note: rule.note, value: value.slice(0, 100) });
      }
    }
  }
}

if (hits.length === 0) {
  console.log(
    `residue-gate: clean — ${RULES.length} signatures, ${scanned} values across ${LOCALES.length} locales, 0 hits`,
  );
  process.exit(0);
}

console.error(`\nresidue-gate: ${hits.length} review-sheet residue hit(s)\n`);
for (const h of hits) {
  console.error(`  [${h.locale}] ${h.key}  (${h.rule}) — ${h.note}`);
  console.error(`      ${h.value}`);
}
console.error('\nA reader is about to see an editing artefact. Fix the value — and if a');
console.error('value here is genuinely legitimate, rule on it and allowlist that one\n');
process.exit(1);
