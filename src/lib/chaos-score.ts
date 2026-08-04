/**
 * CHAOS SCORE — the areas, the points, the bands and the leak ranking.
 *
 * ── Pure by requirement, not by taste (ADR 0025) ──────────────────────
 * No React, no DOM, no next-intl. This repo has no test runner, and the
 * failure mode here is invisible by inspection: a band boundary off by one,
 * or a leak ranking that sorts the wrong way, renders perfectly. The page
 * looks right and tells the visitor something false about their plant.
 * Purity is what keeps the check re-runnable — see the PR body for the
 * numbers from the exhaustive run over all 4^5 = 1024 answer combinations.
 *
 * ── There is no shuffle here, and adding one would be a defect ─────────
 * The Gemba Drill shuffles its three options because one of them is right
 * and its position must not give it away. These four are an ordered
 * severity scale — best first, worst last — and the order IS the reading.
 * Shuffling them would destroy it. So this module calls Math.random()
 * nowhere, which is also why it has no hydration hazard and no build step
 * on the start click. Please do not add one for symmetry with the drill.
 *
 * ── What lives here and what lives in src/locales (ADR 0023) ───────────
 * The unit of that decision is the SENTENCE, not the section. The test is
 * "would a good translation of this still be true?"
 *
 *   "How many different people or systems touch an order from quote to
 *    ship?"  — instrument text. A good Swedish translation is exactly as
 *    true. It lives in the locale files and IS translated.
 *
 *   "A shadow spreadsheet is a process that was never designed — it grew."
 *    — voice. Thirty-five years of one man's judgement in his own words.
 *    It lives here, English-only, until he writes the Swedish himself.
 *
 * So: the five questions, the twenty options, the band names and the band
 * lines are in src/locales/*.json and are translated. The five `note`
 * fields are here and are not. On /sv and /zh the section renders one line
 * above the first note saying so — that line is chrome and is translated.
 *
 * ── Editing rules ─────────────────────────────────────────────────────
 * The notes are Gösta's IP. Reproduce, do not reword. If you think one is
 * wrong, flag it — do not fix it.
 *
 * ── Direction ─────────────────────────────────────────────────────────
 * HIGHER IS WORSE. Zero is a quiet plant, fifteen is firefighting. Every
 * comparison in this file runs that way round, and it is the opposite of
 * the drill's score. Read twice before changing a `>=`.
 */

export const AREA_IDS = ['inventory', 'handoffs', 'shadow', 'decisions', 'standards'] as const

export type AreaId = (typeof AREA_IDS)[number]

/** Chaos points a single option is worth. 0 = healthy, 3 = worst. */
export type Points = 0 | 1 | 2 | 3

export interface ChaosArea {
  id: AreaId
  /**
   * Points for each option, in the order the options are authored in the
   * locale files — best first, worst last. Declared rather than assumed:
   * `leaksFor` reads its severity from here, so a future area with a
   * non-linear scale (two options both worth 2, say) keeps working.
   */
  points: readonly [Points, Points, Points, Points]
  /** The teaching, shown the moment the answer is given. This is the product. */
  note: string
}

export const AREAS: readonly ChaosArea[] = [
  {
    id: "inventory",
    points: [0, 1, 2, 3],
    note: "Almost every plant that measures this for the first time finds a ratio under 1%. That is normal, and it is the good news: the improvement is not inside the working time, it is in the waiting wrapped around it. Not knowing is its own answer — you cannot shorten what nobody has timed.",
  },
  {
    id: "handoffs",
    points: [0, 1, 2, 3],
    note: "Handoffs are where time and ownership go missing. Every one is a chance for the work to sit, and a chance for two people to each assume the other has it. Count them once — the number usually surprises the person who runs the process.",
  },
  {
    id: "shadow",
    points: [0, 1, 2, 3],
    note: "A shadow spreadsheet is a process that was never designed — it grew. It usually encodes a rule nobody else can read, which means it is also a person who cannot take a holiday. Ask what happens to it the day its author leaves.",
  },
  {
    id: "decisions",
    points: [0, 1, 2, 3],
    note: "Decision latency is the cheapest waste to remove and the one nobody measures. Every hour a problem waits for a decision, the line is either running wrong or not running at all. \"It depends who's available\" means the authority sits with people rather than with the role.",
  },
  {
    id: "standards",
    points: [0, 1, 2, 3],
    note: "Without a standard there is no baseline, so no improvement can be proven or held — three shifts each improve a different thing and nothing accumulates. A standard written for an audit is worse than none: it tells you you are covered when you are not.",
  },
]

/** Four options per area, always. The locale files must match this. */
export const OPTIONS_PER_AREA = 4

/** 15 — five areas at three points each. Presented as `11 / 15`. */
export const MAX_SCORE = AREAS.reduce((sum, a) => sum + Math.max(...a.points), 0)

export const BAND_IDS = ['firefighting', 'runningOnPeople', 'drifting', 'quietPlant'] as const

export type BandId = (typeof BAND_IDS)[number]

export interface Band {
  /** Lowest score that earns this band. Ordered high → low, and higher is worse. */
  min: number
  id: BandId
}

export const BANDS: readonly Band[] = [
  { min: 12, id: "firefighting" },
  { min: 8, id: "runningOnPeople" },
  { min: 4, id: "drifting" },
  { min: 0, id: "quietPlant" },
]

/** `answers[i]` is the index of the option picked for `AREAS[i]`, or null. */
export type Answers = readonly (number | null)[]

/** Total chaos points. Unanswered areas contribute nothing. */
export function scoreFor(answers: Answers): number {
  return AREAS.reduce((sum, area, i) => {
    const picked = answers[i]
    if (picked === null || picked === undefined) return sum
    return sum + (area.points[picked] ?? 0)
  }, 0)
}

export function bandFor(score: number): Band {
  // The last band is min: 0, so this always resolves. The fallback is for
  // the type-checker, not for a case that can happen.
  return BANDS.find((b) => score >= b.min) ?? BANDS[BANDS.length - 1]
}

/**
 * The highest-scoring areas, worst first, at most three.
 *
 * Areas scoring zero are excluded — naming a leak that scored nothing is
 * a false statement about the visitor's plant, and a quiet plant gets no
 * list at all rather than three phantom ones. The caller must handle the
 * empty case; the result screen says something different when it is empty.
 *
 * Ties break in question order. Array.sort is stable in every runtime this
 * ships to, so the explicit index comparison is belt-and-braces — but it
 * is also what makes the tie-break a stated rule the check can verify
 * rather than an accident of the engine.
 */
export function leaksFor(answers: Answers): AreaId[] {
  return AREAS.map((area, i) => {
    const picked = answers[i]
    const points =
      picked === null || picked === undefined ? 0 : (area.points[picked] ?? 0)
    return { id: area.id, points, i }
  })
    .filter((a) => a.points > 0)
    .sort((a, b) => b.points - a.points || a.i - b.i)
    .slice(0, 3)
    .map((a) => a.id)
}
