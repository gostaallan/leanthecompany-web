/**
 * GEMBA DRILL — the question bank.
 *
 * ── Why this content is NOT in src/locales/*.json ──────────────────────
 * Every other user-facing string on this site lives in the locale files
 * and is translated into en / sv / zh. This bank deliberately does not,
 * and that is a ruling (089 R2), not an oversight. Please do not "fix" it.
 *
 * The `note` on each question is the product. It is 35 years of one man's
 * judgement, written in his voice — machine-translated into Swedish and
 * Chinese it would be worse than not shipping it at all. So the bank ships
 * English-only, and the drill stays visible on /sv and /zh with a one-line
 * English note. The surrounding chrome — headings, buttons, result copy —
 * IS translated and does live in src/locales/*.json, as normal.
 *
 * ── Editing rules ─────────────────────────────────────────────────────
 * The 30 questions are Gösta's IP. Reproduce, do not reword. If you think
 * a prompt, an option or a note is wrong, flag it — do not fix it.
 *
 * Strings are double-quoted throughout so the apostrophes and inline
 * single quotes in the content need no escaping. Each `note` is one
 * unwrapped line: they are meant to be rewritten in place.
 *
 * ── Invariant ─────────────────────────────────────────────────────────
 * Exactly five questions in each of the six layers. A round draws one per
 * layer (see gemba-deck.ts), so an uneven bank silently biases the draw.
 * Numbered q1 … q30 in authoring order, not grouped by layer.
 */

export const LAYERS = ['Flow', 'Waste', 'Equipment', 'People', 'Quality', 'Demand'] as const

export type Layer = (typeof LAYERS)[number]

export interface Question {
  id: string
  layer: Layer
  /** The situation. Two or three lines — it has to be readable on a phone. */
  prompt: string
  /** The question put to the reader. */
  ask: string
  /** Exactly three. Shuffled at draw time, so authoring order is not display order. */
  options: readonly [string, string, string]
  /** Index into `options` as authored above — remapped by buildDeck after the shuffle. */
  correct: 0 | 1 | 2
  /** The teaching. This is the product; the tick or cross is incidental. */
  note: string
}

export const BANK: readonly Question[] = [
  {
    id: "q1",
    layer: "Flow",
    prompt: "Six stations on an assembly line run at 40, 35, 52, 38, 41 and 36 seconds. Customer takt is 45 seconds.",
    ask: "What does this tell you?",
    options: [
      "The line is fine — average cycle time is 40 s, comfortably under takt.",
      "Station 3 sits above takt, so the line cannot meet demand however well the others run.",
      "Station 2 at 35 s is starving the line and should be slowed to match.",
    ],
    correct: 1,
    note: "Averages hide bottlenecks. Output is set by the slowest station, never the mean. I have watched plants chase five-second savings at fast stations for months while the 52-second station stayed untouched.",
  },
  {
    id: "q2",
    layer: "Waste",
    prompt: "An operator walks 12 metres to a parts rack and back, every single cycle.",
    ask: "Which waste is this, and why does the label matter?",
    options: [
      "Transport — something is being moved across the floor.",
      "Motion — the operator moves, not the product.",
      "Waiting — no value is added while walking.",
    ],
    correct: 1,
    note: "Transport is solved with layout and logistics. Motion is solved at the workstation. Mislabel it and you will redesign the wrong thing at ten times the cost.",
  },
  {
    id: "q3",
    layer: "Equipment",
    prompt: "A packing line reports availability 90%, performance 95%, quality 99%.",
    ask: "What is the OEE?",
    options: [
      "94.7%",
      "84.6%",
      "90.0%",
    ],
    correct: 1,
    note: "OEE multiplies. Three respectable numbers make one mediocre number. Any plant reporting OEE as the average of the three is reporting fiction to itself.",
  },
  {
    id: "q4",
    layer: "People",
    prompt: "A kaizen event delivers a 30% cycle-time gain. Three months later the old method is back.",
    ask: "What is the most likely cause?",
    options: [
      "The operators lacked the discipline to hold the standard.",
      "The standard was written for the team rather than by them — no owner, no feedback loop.",
      "The event was too short; five days instead of three would have held.",
    ],
    correct: 1,
    note: "Reverting is almost never a discipline problem. Check four things: is the role clear, is the skill built, is feedback visible, and does the manager follow the standard too?",
  },
  {
    id: "q5",
    layer: "Demand",
    prompt: "One 8-hour shift with 30 minutes of breaks. The customer needs 450 units per shift.",
    ask: "What is takt time?",
    options: [
      "64 seconds",
      "60 seconds",
      "53 seconds",
    ],
    correct: 1,
    note: "450 minutes available, 450 units. Takt comes from the customer and the available time — never from what the machine can do. When someone 'adjusts takt' to suit the equipment, they have stopped measuring the gap.",
  },
  {
    id: "q6",
    layer: "Quality",
    prompt: "A plant director says the new line is 'fully jidoka'.",
    ask: "What should you expect to see?",
    options: [
      "Automated steps that let the line run with fewer operators.",
      "Machines — and people — with the authority to stop the moment something abnormal appears.",
      "A final inspection station checking every unit before despatch.",
    ],
    correct: 1,
    note: "Jidoka is built-in judgement, not automation. The test is blunt: can a person stop the line without asking permission first?",
  },
  {
    id: "q7",
    layer: "Waste",
    prompt: "Of the seven classic wastes, one is usually called the worst.",
    ask: "Which one, and why?",
    options: [
      "Waiting — it is the most visible and the most demoralising.",
      "Overproduction — it funds inventory, and inventory hides everything else.",
      "Defects — they reach the customer and cost the most per unit.",
    ],
    correct: 1,
    note: "Overproduction pays for inventory, and inventory covers long changeovers, unstable quality and unreliable machines. Cut it and the plant's real problems surface within a week.",
  },
  {
    id: "q8",
    layer: "Flow",
    prompt: "You count roughly 500 units of work-in-progress between goods-in and despatch. The line ships 50 units an hour.",
    ask: "What is the approximate production lead time?",
    options: [
      "10 hours",
      "25,000 hours",
      "6 minutes",
    ],
    correct: 0,
    note: "Little's Law: WIP divided by throughput. The fastest lead-time estimate on the floor, and it needs nothing but a clipboard.",
  },
  {
    id: "q9",
    layer: "Equipment",
    prompt: "You are starting autonomous maintenance on a neglected filler.",
    ask: "What is step one?",
    options: [
      "Hand the operators a lubrication schedule and a training slot.",
      "Initial clean-and-inspect, so hidden defects become visible.",
      "Move planned overhauls from the maintenance team to the operators.",
    ],
    correct: 1,
    note: "Cleaning is inspection. The first proper clean on a neglected machine turns up loose bolts, weeping seals and missing guards — and that list is your improvement plan, already prioritised by the people who run it.",
  },
  {
    id: "q10",
    layer: "People",
    prompt: "A 5 Whys investigation into a customer complaint concludes: 'operator error'.",
    ask: "How do you respond?",
    options: [
      "Accept it — retrain the operator and close the finding.",
      "Push back: human error is where the analysis should get harder, not stop.",
      "Add a checklist so the step cannot be skipped again.",
    ],
    correct: 1,
    note: "'Operator error' is where root cause analysis usually gets abandoned. Ask why the process permitted the error — and whether anyone felt able to flag it before it left the building.",
  },
  {
    id: "q11",
    layer: "Quality",
    prompt: "Three countermeasures are proposed for a recurring assembly error.",
    ask: "Which is the strongest poka-yoke?",
    options: [
      "A warning lamp when a torque value drifts out of spec.",
      "A fixture the part physically cannot enter the wrong way round.",
      "A sign-off box added to the shift check sheet.",
    ],
    correct: 1,
    note: "Rank them: prevent, then detect, then warn. Anything that depends on somebody noticing is the weakest kind, and the night shift is where it fails first.",
  },
  {
    id: "q12",
    layer: "Demand",
    prompt: "A kanban card comes back to the supplying process.",
    ask: "What has it just communicated?",
    options: [
      "A forecast update for next month's plan.",
      "That something was consumed, authorising replacement of exactly that.",
      "A release instruction generated by the MRP schedule.",
    ],
    correct: 1,
    note: "Pull replaces the schedule with consumption. If the cards move but the plan still pushes, you have kanban decoration rather than a pull system.",
  },
  {
    id: "q13",
    layer: "Flow",
    prompt: "A value stream map shows 5 calendar days door-to-door, with 12 minutes of actual value-adding work.",
    ask: "What is the value-add ratio?",
    options: [
      "About 4%",
      "About 0.2%",
      "About 17%",
    ],
    correct: 1,
    note: "Under 1% is normal rather than shocking — which is precisely the point. The improvement is not inside the 12 minutes. It is in the five days of waiting wrapped around them.",
  },
  {
    id: "q14",
    layer: "People",
    prompt: "A plant manager proudly notes that the andon has not been pulled once this quarter.",
    ask: "What is your read?",
    options: [
      "Good news — a stable process should not need stopping.",
      "Suspicious — a silent andon usually means people do not feel safe stopping the line.",
      "Neutral — it means the training programme worked.",
    ],
    correct: 1,
    note: "Ask an operator what happened the last time somebody stopped the line. That answer tells you more about the culture than any engagement survey.",
  },
  {
    id: "q15",
    layer: "Flow",
    prompt: "A changeover on the filling line takes 45 minutes. The team's proposal is to buy a faster machine.",
    ask: "Where do you look first?",
    options: [
      "At the machine — 45 minutes suggests the equipment is the constraint.",
      "At which of those 45 minutes could happen while the line is still running.",
      "At the schedule — fewer changeovers means less time lost.",
    ],
    correct: 1,
    note: "Split the work into internal (line stopped) and external (line running) before you spend a krona. On most first passes half the internal time turns out to be fetching, finding and waiting — work that never needed the line stopped at all. Bigger batches are the answer that makes next year worse.",
  },
  {
    id: "q16",
    layer: "Flow",
    prompt: "Every machine in the plant now runs above 95% utilisation. The plant manager is pleased. Lead times have doubled since spring.",
    ask: "How are both of these true at once?",
    options: [
      "They can't be — high utilisation and short lead times go together.",
      "Queues grow sharply as utilisation approaches 100%; the plant is busy, the product is waiting.",
      "Lead time is a planning problem and unrelated to utilisation.",
    ],
    correct: 1,
    note: "Past roughly 85%, every extra point of utilisation buys a disproportionate amount of queue. A plant optimised so no machine is ever idle is a plant where the product always is. Ask which one the customer pays for.",
  },
  {
    id: "q17",
    layer: "Waste",
    prompt: "A component is machined to ±0.01 mm. The drawing calls for ±0.1 mm. It has been made this way for years.",
    ask: "What is this?",
    options: [
      "Good practice — tighter than required is never a problem.",
      "Overprocessing — effort the customer neither asked for nor pays for.",
      "Defect prevention, since it keeps the process well inside spec.",
    ],
    correct: 1,
    note: "Overprocessing is the hardest waste to see, because it looks like craftsmanship. The giveaway is always the same: nobody can tell you which customer requirement it satisfies. Ask why the tolerance is there and you usually find someone who left in 2009.",
  },
  {
    id: "q18",
    layer: "Waste",
    prompt: "Scrap runs at 2% and is reported weekly. Rework is done on the line by the operators and never leaves the department.",
    ask: "What is the real quality cost?",
    options: [
      "2% — scrap is the material actually lost.",
      "Unknown, and larger. Rework consumes capacity that nobody is counting.",
      "2% plus the rework labour hours, which payroll already captures.",
    ],
    correct: 1,
    note: "This is the hidden factory: a second plant inside your plant, making the same units twice, invisible because it never generates a transaction. Start counting rework minutes before you fund a capacity project — the capacity you need may already exist.",
  },
  {
    id: "q19",
    layer: "Waste",
    prompt: "An operator has run the same packing line for eleven years. She is never asked how it could run better.",
    ask: "Which waste is this?",
    options: [
      "None — waste categories describe material and time, not people.",
      "Unused talent: the one waste that never appears on the loss tree.",
      "Motion, since her experience isn't being applied efficiently.",
    ],
    correct: 1,
    note: "Eleven years on one line is eleven years of data nobody has queried. The wastes you can measure are usually the cheap ones. This is the one that decides whether the other six ever stay fixed.",
  },
  {
    id: "q20",
    layer: "Equipment",
    prompt: "A capper stops for 20–30 seconds perhaps forty times a shift. The operator clears it each time. Nothing is logged — the threshold for a recorded stop is five minutes.",
    ask: "What is this costing?",
    options: [
      "Very little — every stop is cleared in under a minute.",
      "Roughly 20 minutes a shift, invisible in availability, showing up as a performance loss nobody can explain.",
      "Nothing measurable; short stops are absorbed by line buffers.",
    ],
    correct: 1,
    note: "Minor stops are the losses your OEE report cannot see, because your logging threshold was set by whoever designed the form. Forty stops a shift is also forty interruptions to the operator's attention, which is where the next quality problem comes from. Count them for one shift by hand — that number changes meetings.",
  },
  {
    id: "q21",
    layer: "Equipment",
    prompt: "Machine A fails once a month and is back in 8 hours. Machine B fails weekly and is back in 15 minutes. Both feed the same line.",
    ask: "Which do you attack first?",
    options: [
      "Machine B — four failures a month is four times the instability.",
      "Machine A — one failure removes a whole shift and nothing downstream can absorb that.",
      "Neither until you know which has the worse OEE.",
    ],
    correct: 1,
    note: "Frequency and duration are different problems with different fixes: frequency is usually a condition problem, duration is usually a spares-and-skills problem. Eight hours down is a shift the customer doesn't get. Fifteen minutes is a buffer.",
  },
  {
    id: "q22",
    layer: "Equipment",
    prompt: "Planned maintenance is repeatedly postponed because the line cannot be spared. Breakdowns are rising.",
    ask: "What is happening?",
    options: [
      "Normal pressure — PM is the right thing to sacrifice when demand is high.",
      "A spiral: skipped PM causes breakdowns, breakdowns consume the time PM needed.",
      "A resourcing problem that more maintenance headcount would solve.",
    ],
    correct: 1,
    note: "Every plant in this spiral believes it will do the PM once things calm down. Things do not calm down — unplanned downtime always takes more hours than the planned work it displaced, and it takes them at the worst moment. Breaking it needs a decision at plant-manager level, not a better schedule.",
  },
  {
    id: "q23",
    layer: "People",
    prompt: "A plant manager says he supports the TPM programme fully, and has not been on the floor in three weeks.",
    ask: "What have you learnt?",
    options: [
      "Nothing much — a plant manager's job is running the business, not walking the floor.",
      "That the programme will not survive. Leader standard work is the system; the rest is training.",
      "That he needs a better dashboard so he can follow it from his office.",
    ],
    correct: 1,
    note: "People do what their manager checks, not what he announces. Three weeks of absence tells the shop floor precisely how important this is, and they are right to read it that way. I have never seen a system outlive a leader who stopped showing up for it.",
  },
  {
    id: "q24",
    layer: "People",
    prompt: "One operator is the only person who can run the coating line. He is very good. Holiday planning is built around him.",
    ask: "How do you read this?",
    options: [
      "A strength — deep expertise on a difficult process is worth protecting.",
      "A risk carried as a compliment. The process depends on a person rather than a standard.",
      "A pay-grade question, best handled through retention.",
    ],
    correct: 1,
    note: "If the knowledge is only in his head, you have no standard — you have a person. Ask him to teach it to one colleague and watch what surfaces: the tricks he uses are the improvements the standard is missing. A skills matrix with one name in a column is a countermeasure waiting to be written.",
  },
  {
    id: "q25",
    layer: "Quality",
    prompt: "A fill-weight control chart shows a run of nine consecutive points above the mean. Every point is inside specification.",
    ask: "What do you do?",
    options: [
      "Nothing — everything is within spec and the customer is protected.",
      "Investigate. Nine on one side is a signal; the process has shifted and spec limits didn't notice.",
      "Widen the control limits so the chart stops flagging normal variation.",
    ],
    correct: 1,
    note: "Specification limits come from the customer. Control limits come from the process. A process can sit inside spec all week while drifting steadily towards the edge, and the chart is the only thing that will tell you before the customer does. Anyone who responds by widening the limits has just switched off the alarm.",
  },
  {
    id: "q26",
    layer: "Quality",
    prompt: "A filling process reports Cpk 0.9. The team's improvement plan is 100% end-of-line weight checking.",
    ask: "What is wrong with the plan?",
    options: [
      "Nothing — inspection protects the customer while the process is improved.",
      "It sorts the output instead of fixing the process, and 100% inspection is never 100% effective.",
      "Cpk 0.9 is acceptable, so no action is needed at all.",
    ],
    correct: 1,
    note: "Cpk below 1.33 means the process is producing defects by design, not by accident. Inspection just decides who finds them. It also costs a person forever, and people miss things — reliably, around 15% of the time, and more on nights.",
  },
  {
    id: "q27",
    layer: "Quality",
    prompt: "A team wants to run a kaizen on a process that has no written standard.",
    ask: "What comes first?",
    options: [
      "The kaizen — writing standards for a bad process wastes effort.",
      "The standard. Without one there is no baseline, so no improvement can be proven or held.",
      "A time study, so the current cycle time is at least known.",
    ],
    correct: 1,
    note: "Improving an unstandardised process means three shifts each improving a different thing, and no way to tell whether anything got better. The standard is not bureaucracy — it is the measuring stick. Write it with the people who run it, or it will be back to three methods within a month.",
  },
  {
    id: "q28",
    layer: "Demand",
    prompt: "A plant runs product A for three weeks, then product B for three weeks, to minimise changeovers. Finished-goods inventory is high and the sales team complains about responsiveness.",
    ask: "What is the trade being made?",
    options: [
      "A sound one — fewer changeovers means lower unit cost.",
      "Changeover time has been bought with inventory, cash and lead time.",
      "A scheduling error that better forecasting would fix.",
    ],
    correct: 1,
    note: "Long runs don't remove the changeover cost, they move it onto the balance sheet and into the customer's wait. Level the mix and the changeover problem becomes visible and solvable — which is exactly why plants avoid levelling. It exposes the thing nobody wants to work on.",
  },
  {
    id: "q29",
    layer: "Demand",
    prompt: "Every process in the value stream receives its own schedule from MRP.",
    ask: "What does this produce?",
    options: [
      "Good visibility — each area knows exactly what to make.",
      "Competing schedules and inventory between every step. One process should be scheduled; the rest should pull.",
      "The standard arrangement for any plant of reasonable size.",
    ],
    correct: 1,
    note: "Schedule at one point — the pacemaker — and let everything upstream replenish what was consumed. Schedule everywhere and each area optimises its own numbers, which is how you get a plant full of busy departments and an empty despatch bay.",
  },
  {
    id: "q30",
    layer: "Demand",
    prompt: "End-customer demand varies by about 5% month to month. Your raw-material orders vary by 40%.",
    ask: "What is going on?",
    options: [
      "Normal supply-chain behaviour that safety stock exists to absorb.",
      "Amplification. Each step adds its own buffer and reorder rule, and the signal grows as it travels upstream.",
      "A supplier reliability problem showing up as order variation.",
    ],
    correct: 1,
    note: "The bullwhip is manufactured internally, not imported from the customer. Every batching rule, every safety-stock policy, every 'while we're ordering anyway' adds a little. The fix is shorter, more frequent, smaller signals — which sounds inefficient until you price the inventory it removes.",
  },
]
