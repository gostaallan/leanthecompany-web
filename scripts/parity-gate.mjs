#!/usr/bin/env node
/**
 * Parity gate — key parity and placeholder parity across en / sv / zh.
 *
 * ── WHY THIS EXISTS ────────────────────────────────────────────────────────
 *
 * Ported from the platform repo, where `key-parity.test.ts` has caught real
 * drift more than once. This repo has no test runner at all, so it runs as
 * `prebuild` beside the vocabulary gate: a broken catalogue fails `next build`
 * rather than shipping.
 *
 * TWO FAILURE MODES, AND THEY ARE NOT THE SAME ONE.
 *
 * **Key parity.** A key added to en and forgotten in sv/zh renders the key path
 * to the reader — `pricing.archiveNote.title` in the middle of a paragraph. A
 * key deleted from en but left in sv/zh is dead weight that a later translator
 * dutifully maintains. Arrays are compared by LENGTH as well as presence: a
 * feature list with six bullets in en and seven in sv is a silent extra promise
 * on the Swedish page, and nothing else in the toolchain looks at it.
 *
 * **Placeholder parity.** This is the one that actually bit. next-intl fills
 * `{closeLong}` from a context object; a translation that drops the token
 * renders a sentence missing its date, and a translation that INVENTS a token
 * throws FORMATTING_ERROR at render — which next-intl logs and then recovers
 * from, so the build stays green and the page is wrong. That is exactly the
 * shape caught by hand on this branch: six FORMATTING_ERROR lines under a green
 * `next build`, because the state eyebrow carried `{salesOpenLong}` and the call
 * site never passed `dates`. An exit code cannot see it. This can.
 *
 * The comparison is over the SET of placeholder names, not their order — word
 * order legitimately differs between English, Swedish and Chinese, and a gate
 * that insisted on order would be wrong about every well-translated sentence.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LOCALES = ['en', 'sv', 'zh'];
const BASE = 'en';
const PLACEHOLDER = /\{([a-zA-Z0-9_]+)\}/g;

/** Flatten to dotted keys. Arrays become `key.N` plus a `key.length` sentinel. */
function flat(node, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(node)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (Array.isArray(v)) {
      out[`${key}#length`] = String(v.length);
      v.forEach((item, i) => {
        if (item && typeof item === 'object') flat(item, `${key}.${i}`, out);
        else out[`${key}.${i}`] = String(item);
      });
    } else if (v && typeof v === 'object') {
      flat(v, key, out);
    } else {
      out[key] = String(v);
    }
  }
  return out;
}

const cat = {};
for (const l of LOCALES) {
  cat[l] = flat(JSON.parse(readFileSync(join(ROOT, 'src', 'locales', `${l}.json`), 'utf8')));
}

const problems = [];
const baseKeys = Object.keys(cat[BASE]);

// ── key parity ───────────────────────────────────────────────────────────────
for (const l of LOCALES.filter((x) => x !== BASE)) {
  for (const k of baseKeys) {
    if (!(k in cat[l])) {
      problems.push(
        k.endsWith('#length')
          ? `key-parity: ${l} is missing the array ${k.replace('#length', '')}`
          : `key-parity: ${l} is missing ${k}`,
      );
    }
  }
  for (const k of Object.keys(cat[l])) {
    if (!(k in cat[BASE])) problems.push(`key-parity: ${l} has ${k}, which ${BASE} does not`);
  }
  for (const k of baseKeys) {
    if (k.endsWith('#length') && k in cat[l] && cat[l][k] !== cat[BASE][k]) {
      const arr = k.replace('#length', '');
      problems.push(
        `key-parity: ${arr} has ${cat[BASE][k]} items in ${BASE} but ${cat[l][k]} in ${l}` +
          ' — a list of different length is a different promise',
      );
    }
  }
}

// ── placeholder parity ───────────────────────────────────────────────────────
const names = (s) => new Set([...String(s).matchAll(PLACEHOLDER)].map((m) => m[1]));
for (const k of baseKeys) {
  if (k.endsWith('#length')) continue;
  const want = names(cat[BASE][k]);
  for (const l of LOCALES.filter((x) => x !== BASE)) {
    if (!(k in cat[l])) continue;
    const got = names(cat[l][k]);
    const missing = [...want].filter((n) => !got.has(n));
    const extra = [...got].filter((n) => !want.has(n));
    if (missing.length) {
      problems.push(
        `placeholder-parity: ${l} ${k} drops {${missing.join('}, {')}} — the sentence renders` +
          ' without the value it was written around',
      );
    }
    if (extra.length) {
      problems.push(
        `placeholder-parity: ${l} ${k} invents {${extra.join('}, {')}} — next-intl throws` +
          ' FORMATTING_ERROR at render, logs it, and recovers, so the build stays GREEN' +
          ' while the page is wrong',
      );
    }
  }
}

if (problems.length === 0) {
  const n = baseKeys.filter((k) => !k.endsWith('#length')).length;
  console.log(
    `parity-gate: clean — ${n} keys × ${LOCALES.length} locales, key and placeholder parity hold`,
  );
  process.exit(0);
}

console.error(`\nparity-gate: ${problems.length} problem(s)\n`);
for (const p of problems) console.error(`  ${p}`);
console.error('\nA catalogue that disagrees with itself renders a key path or an empty slot');
console.error('to a reader. Fix the catalogue — do not relax the gate.\n');
process.exit(1);
