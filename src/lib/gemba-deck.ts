/**
 * GEMBA DRILL — the draw and the scoring.
 *
 * Pure module. No React, no DOM, no next-intl — so `buildDeck` can be
 * exercised by hand in a repo that has no test runner. That matters more
 * here than it looks: the failure mode this module guards against is
 * invisible by inspection. If the option shuffle and the `correct` remap
 * ever come apart, the drill still renders perfectly and simply becomes
 * guessable — most questions are authored `correct: 1`, so the answer
 * would sit in the middle slot every round. It has to be checkable by
 * execution, which means this file must stay importable on its own.
 *
 * The band names and lines live here rather than in src/locales/*.json,
 * for the same reason the question bank does — they are Gösta's voice,
 * English-only by ruling (089 R2). See the header of gemba-bank.ts.
 */

import { BANK, LAYERS, type Question } from '@/lib/gemba-bank'

/** Six questions — one drawn from each layer. */
export const ROUND = LAYERS.length

export interface Band {
  /** Lowest score that earns this band. Ordered high → low. */
  min: number
  name: string
  line: string
}

export const BANDS: readonly Band[] = [
  { min: 6, name: "Sensei territory", line: "Six from six, across every layer. Now go and teach it." },
  { min: 5, name: "Practitioner", line: "Strong judgement. The gap is in the layer you touch least often." },
  { min: 3, name: "Shop-floor solid", line: "Good instincts, thin theory. The theory is the part that travels between plants." },
  { min: 0, name: "Gemba curious", line: "Plenty of headroom — and the fastest gains of anyone reading this." },
]

export function bandFor(score: number): Band {
  // The last band is min: 0, so this always resolves; the fallback is for
  // the type-checker, not for a case that can happen.
  return BANDS.find((b) => score >= b.min) ?? BANDS[BANDS.length - 1]
}

/** Fisher–Yates. Returns a new array; the input is not mutated. */
export function shuffle<T>(input: readonly T[]): T[] {
  const a = [...input]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * One random question from each layer, layer order shuffled, options
 * shuffled per question with `correct` remapped to the new index.
 *
 * Never six drawn at random from thirty: that gives rounds with three Flow
 * questions and no Equipment, which makes the end-of-round layer breakdown
 * an artefact of the shuffle instead of a reading of the person.
 *
 * Calls Math.random(), so it must never run during render — the server and
 * the client would draw different decks and React would fail to hydrate.
 * The caller runs it in the start-click handler.
 */
export function buildDeck(): Question[] {
  const oneEach = LAYERS.map((layer) => {
    const pool = BANK.filter((q) => q.layer === layer)
    return pool[Math.floor(Math.random() * pool.length)]
  })

  return shuffle(oneEach).map((q) => {
    const order = shuffle([0, 1, 2] as const)
    return {
      ...q,
      options: [q.options[order[0]], q.options[order[1]], q.options[order[2]]] as const,
      // Safe: `q.correct` is 0 | 1 | 2 and `order` is a permutation of those,
      // so indexOf always finds it. TypeScript can't see that through indexOf.
      correct: order.indexOf(q.correct) as 0 | 1 | 2,
    }
  })
}
