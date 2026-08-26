#!/usr/bin/env node
/**
 * Vocabulary gate — retired words must not come back.
 *
 * WHY THIS EXISTS
 *
 * The live site and the v3 branch both sold a product that no longer existed:
 * a "Founding 100" after the programme became the Original 100, and a "Compass
 * & North Star" module after the product renamed it True North. The copy source
 * moved and the page did not. Nobody noticed for four days, because nothing was
 * watching — a rename is exactly the kind of change that is easy to do in one
 * place and forget in twenty.
 *
 * This scan is what watches. It is deliberately NOT a test: the repo has no test
 * runner, so it runs as npm `prebuild`, which means a retired word fails
 * `next build` — locally and on Vercel — instead of shipping.
 *
 * WHAT IT IS NOT
 *
 * It is not a translation checker and not a style linter. It knows one thing:
 * these exact words are retired, and here is where one came back.
 *
 * THE TERM LISTS ARE PRECISE ON PURPOSE (session 125, ruling R2)
 *
 * The first draft of each term was wrong in a different direction, and each
 * wrong version would have been worse than no gate at all:
 *
 *   en — `founders` (plural) is retired; `founder` and `Founder's` (singular)
 *        are NOT. There is one founder, and he is on the About page, in the
 *        response-time bound, and in the Founder's Roundtable. A gate that
 *        banned the person would be muted within a day.
 *
 *   sv — `grundarplats` alone MISSED seven live occurrences
 *        (`grundarmedlem*`, `grundarrunda`, `grundarpris`), and the bare stem
 *        `grundar` would have caught the ten legitimate person-forms
 *        (`grundaren`, `grundarens`, `Grundare`). So the deny list is explicit
 *        rather than a stem.
 *
 *   zh — `创始` catches `创始人` (the founder, the person), which appears in
 *        eleven legitimate strings including 创始人圆桌, the Roundtable. The
 *        negative lookahead is the whole point of the term.
 *
 *   zh — `老师傅` is the SECOND zh term, and it is a brand rule rather than a
 *        retired programme name. **Sensei is a token and is never translated.**
 *        In today's register 老师傅 addresses a taxi driver or a street-food
 *        seller; it is not the word for a master of a craft. It needs no
 *        lookahead — there is no legitimate use of it on this site.
 *        Ruled 2026-08-26, after the R2 redrafts reintroduced it once already:
 *        the gate is what makes the ruling permanent rather than a memory.
 *
 * A gate that cries wolf gets switched off, and a gate that misses the live
 * string was never a gate. Both failure modes are one edit away from each other.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const SCAN_DIR = join(ROOT, 'src');
const EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.mdx', '.css']);

const TERMS = [
  { lang: 'en', re: /founding/gi, note: 'the programme is the Original 100' },
  {
    lang: 'en',
    re: /founders/gi,
    note: 'plural is retired — singular "founder" / "Founder’s" is legal',
  },
  { lang: 'sv', re: /grundarplats/gi, note: 'use Original-plats' },
  { lang: 'sv', re: /grundarmedlem/gi, note: 'use Original-prenumerant' },
  { lang: 'sv', re: /grundarrunda/gi, note: 'use grundarens rundabordssamtal' },
  { lang: 'sv', re: /grundarpris/gi, note: 'use Original-pris' },
  { lang: 'zh', re: /创始(?!人)/g, note: 'use Original — 创始人 (the person) is legal' },
  {
    lang: 'zh',
    re: /老师傅/g,
    note: 'Sensei is a brand token — never translated (ruling 2026-08-26)',
  },
];

/** Every tracked-ish source file under src/. node_modules and .next never appear here. */
function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, out);
      continue;
    }
    const dot = entry.lastIndexOf('.');
    if (dot > -1 && EXTS.has(entry.slice(dot))) out.push(full);
  }
  return out;
}

const hits = [];
for (const file of walk(SCAN_DIR)) {
  const lines = readFileSync(file, 'utf8').split(/\r?\n/);
  lines.forEach((line, i) => {
    for (const { lang, re, note } of TERMS) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(line)) !== null) {
        hits.push({
          file: relative(ROOT, file).replace(/\\/g, '/'),
          line: i + 1,
          col: m.index + 1,
          lang,
          term: m[0],
          note,
          text: line.trim().slice(0, 120),
        });
        if (m.index === re.lastIndex) re.lastIndex++;
      }
    }
  });
}

if (hits.length === 0) {
  console.log(`vocab-gate: clean — ${TERMS.length} retired terms, 0 hits in src/`);
  process.exit(0);
}

console.error(`\nvocab-gate: ${hits.length} retired-vocabulary hit(s) in src/\n`);
for (const h of hits) {
  console.error(`  ${h.file}:${h.line}:${h.col}  [${h.lang}] "${h.term}" — ${h.note}`);
  console.error(`      ${h.text}`);
}
console.error(
  '\nThese words were retired by GTM 006 v6. If a term here is genuinely legal,'
);
console.error('fix the term list in scripts/vocab-gate.mjs — do not silence the run.\n');
process.exit(1);
