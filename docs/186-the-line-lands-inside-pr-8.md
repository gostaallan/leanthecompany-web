# 186 — The line lands inside PR #8, and the sweep that never reached it

**Kickoff for Claude Code · 2026-09-13 · repo: `leanthecompany-web` (NOT the platform monorepo)**
**Branch: continue `feat/133-the-story-section` — PR #8, already open**
**Sources:** `GTM/015-how-it-connects-as-a-line.md` · `GTM/117landingsvzhreview-260908.xlsx` ·
`GTM/zh-sv-copy-rules.md` · the artifact *Direction First, Then the Map* (1 Sept)

---

## 1 · Trigger

**Gösta ruled 2026-09-13: 015 rides INSIDE PR #8, not after it.** PR #8 has been open two weeks and
"ready to merge" — and the reason it waited is now measurable rather than a feeling:

> **Merging PR #8 first would have shipped five long step bodies and then deleted them days later —
> and it would have sent the Chinese reviewer, whose pass is scheduled after 15 September, a
> review of five paragraphs that no longer exist.**

The workbook's SV and ZH for `howItConnects.steps.*.body` are translations of the **long** bodies
PR #8 introduces. 015 §4.1 replaces all five with cuts that are 66 % shorter. Translating first and
cutting second is the expensive order, and it is the one that was about to happen by default.

⚠ **`leanthecompany-web` has not deployed to production since 26 August (PR #7).** The landing page
the Original 100 window points at is two and a half weeks behind the product. That is the clock on
this brief.

---

## 2 · Verified against the working tree (file + symbol)

⚠ **METHOD CAVEAT, READ THIS FIRST.** The Cowork workspace mount to Gösta's machine has been down
since the 8 September Windows update, so **`git` could not be run from Cowork.** Everything below
was read off the working tree at `C:\CLAUDE PROJECTS\PLATFORM\web\leanthecompany-web`, which is
`main` **as of Gösta's last pull there** — it is **NOT verified against `origin/main`.**
**CC: confirm each of these against `origin/main` and against the PR branch in confirm-back.**

| # | Finding | How it was measured |
|---|---|---|
| 2.1 | **`howItConnects` is ABSENT from `src/locales/en.json`.** Top-level namespaces are `nav · hero · forWhom · problem · platform · whatsComing · diagnostic · gembaDrill · pricing · about · finalCta · footer` — twelve, no thirteenth. | `json.load` over the file, printing the key set — not a grep |
| 2.2 | **No `HowItConnects.tsx` exists** in `src/components/marketing/`. The directory holds `About · Diagnostic · FinalCTA · Footer · ForWhom · GembaDrill · Hero · Navbar · Platform · Pricing · Problem · WhatsComing` — twelve components. | directory listing, enumerated |
| 2.3 | **`app/[locale]/page.tsx` composes twelve sections and `HowItConnects` is not one of them.** `<Platform />` sits between `<Problem />` and `<WhatsComing />`. | read the `HomePage` return |
| 2.4 | ⇒ **The section is INTRODUCED by PR #8.** It is not a change to an existing section. | 2.1 + 2.2 + 2.3 |
| 2.5 | **`Platform.tsx` does NOT render `chainLine` on main.** The `Platform` component renders `t('eyebrow')`, `t('headline')`, `t('lead')` and six cards over the `ITEMS` array (`makigami · vsm · sensei · tracker · warroom · report`), each `t('items.<key>.title')` / `.body`. There is no `t('chainLine')` call anywhere in the file. | read the whole component — it is 2,586 bytes, so this is an enumeration, not a sample |
| 2.6 | **`platform.chainLine` is therefore a NEW key added by PR #8**, consistent with the workbook's own section banner: *"howItConnects + platform.chainLine · 17 rows · session 133, the story section · **14 new keys**, 3 changed values · catalogue count 318 → 332"*. | 2.5 + workbook row 237 |
| 2.7 | **`platform.headline` = "The map that does the math."** — the line 015 §5 says must not be silently dropped. | read `en.json` `platform.headline` |

---

## 3 · The copy defects, measured against `GTM/zh-sv-copy-rules.md`

### 3.1 ⛔ R1 — the `。` sweep never reached this block

`zh-sv-copy-rules.md` **R1**: *no `。` anywhere in a headline, eyebrow, section title, step title or
card title.* **R1a** swept 23 values carrying 28 `。` on **1 September**.

**The `howItConnects` block was added to the workbook on 8 September — a week after that sweep — so
it never inherited it.** Same shape as *"a count is taken at a sha"*: a sweep describes the
catalogue at the moment it ran, and copy added afterwards is outside it.

⚠ **METHOD, STATED PLAINLY.** This is a **key-name scan, not a render-derived measurement.** R1a is
explicit that headline class is decided **by render, not by key name**. I scanned the workbook's
`ZH — redraft` column for keys whose leaf is `title` / `headline` / `eyebrow` / `name` / `label` /
`chainLine` — **65 candidates, 11 carrying `。`** — then added `howItConnects.closing` (2 marks),
which my leaf filter missed and which R1a names explicitly. **Twelve is a FLOOR, not a total.** A
value rendering in display type but not named `title` or `headline` is invisible to this scan.
**CC: derive the real population over the render tree and report the number you get.**

**The two worst are the two the rules file writes out by name:**

- **`hero.headline` has REGRESSED.** R1's own worked example is `两块画布 四张地图` — a space, no
  stops — and the file lists `两块画布 四张地图。` as a known violation *at the time of ruling*. The
  8 September redraft reads **`两块画布。四张地图。`** — **both stops back.** Worse than the state the
  rule was written to fix, in the flagship headline of the page.
- **`platform.chainLine`** and **`howItConnects.closing`** are the two values R1a rules
  *"headline-class despite the name — strip `。`"*. Both still carry it.

**The twelve, with the mechanical transform applied (terminal `。` removed; internal `。` → U+0020):**

| key | now | after |
|---|---|---|
| `hero.headline` | `两块画布。四张地图。` | `两块画布 四张地图` |
| `problem.items.chaos.title` | `没有人清楚真正的流程。` | `没有人清楚真正的流程` |
| `problem.items.handoffs.title` | `…还要多。` | `…还要多` |
| `whatsComing.headline` | `…即将要上线的。` | `…即将要上线的` |
| `gembaDrill.headline` | `九十秒观察现场。六次判断` | `九十秒观察现场 六次判断` |
| `about.headline` | `…同一个问题。这正是…原因` | `…同一个问题 这正是…原因` ⚠ |
| `finalCta.headline` | `告别被动应对，开始持续改善。` | `告别被动应对，开始持续改善` |
| `howItConnects.headline` | `…流程图开始。我们首先…交付什么。` | `…流程图开始 我们首先…交付什么` ⚠ |
| `howItConnects.steps.1.title` | `给自己打分，1 到 5 分。` | `给自己打分，1 到 5 分` |
| `howItConnects.steps.4.title` | `落实改善，并让改善持续下去。` | `落实改善，并让改善持续下去` |
| `howItConnects.closing` | `…落实改善。顺序不能颠倒。` | `…落实改善 顺序不能颠倒` ⚠ |
| `platform.chainLine` | `…验证成果。` | **see §4.3 — may be DELETED instead** |

⚠ **The three marked rows are R1a's own open item, and they are for Gösta's eye at smoke, not for a
gate.** R1a: *"Three of the five internal substitutions join longer clauses that already contain
`，` or `、` … A space may read differently there than it does between two four-character phrases.
Not a blocker; look at them rendered before merging, because that is the only way to judge it."*
All three of ours are in that class. **Render them and look before merge.**

**This is a REMOVAL.** Taking a character out of verified text changes no words, so per R1 it does
not need re-verifying by the Chinese reviewer — unlike an addition, which does.

### 3.2 R5 — `platform.chainLine` SV, the exact string the rule was ruled on

`zh-sv-copy-rules.md` **R5**: *"A value in a set of sibling strings ends the way its siblings end.
`platform.chainLine` missing its final period among fifty siblings that have one is a defect, not a
style choice — ruled 1 Sept."*

**The 8 September redraft still reads `…förbättring och bevis` — no terminal period.** EN has one.
**Twelve days, the named string, the named defect, unchanged.** (Moot if §4.3 deletes the key.)

### 3.3 R5 — `howItConnects.steps.2.title` breaks its own siblings, in EN and SV

| | value | ends `.` |
|---|---|---|
| `steps.0.title` | Define what you promised. | ✅ |
| `steps.1.title` | Grade yourself, 1 to 5. | ✅ |
| **`steps.2.title`** | **Put a Number on Every Gap** | ⛔ **and Title Case, alone among five** |
| `steps.3.title` | Map where the loss lives. | ✅ |
| `steps.4.title` | Fix it, and keep it fixed. | ✅ |

SV follows the EN defect: `Sätt en siffra på varje gap`, no period. **ZH is correct as-is — R5 is a
Latin-script rule and does not extend to ZH (R1).**

⚠ **015 §2 and the artifact contradict each other here.** §2 says all five titles are *"verbatim, do
not touch."* **The artifact renders `Put a number on every gap.`** — sentence case, with the stop.

> **RULED (Sensei, 2026-09-13): the artifact is right and 015 §2 is amended.**
> EN → `Put a number on every gap.` · SV → `Sätt en siffra på varje gap.` · ZH unchanged.
> **Reason: §2's "verbatim" exists to protect the NARRATIVE — the five titles carry the story and
> must not be restyled. It was never a licence to preserve a casing error.** R5 settles the class
> of the thing: *a defect, not a style choice.* Recorded in the amendment table at §9.

### 3.4 The paragraph-render gate

015 §7 names it: the 133 defect was that `\n\n` inside a translation **does not render as a
paragraph**. The workbook's ZH bodies plainly contain blank lines (`steps.0.body`, `.1`, `.2`, `.3`,
`.4` all run to multiple paragraphs). **015's replacements are single-paragraph and carry no `\n\n`.**
⇒ After §4.1 lands, **grep the whole `howItConnects` block in all three locales for `\n\n` and
report the count.** Expected: zero. If anything still relies on it, say so before shipping.

---

## 4 · Scope (in) — four commits, in this order

### 4.1 The rail component + the EN cuts
Build the line behind the existing `howItConnects` keys plus 015 §4.2's new labels. **Five stations,
one horizontal rail, amber marker per station, NO 01–05 numerals** (015 §3 — the rail carries the
sequence, and `problem`/`platform` already use numbered markers). Station 4 forks into two bordered
branches; station 5 carries PDCA chips → the 4 × 3 A3 grid → the `A3` chip and `EN · SV · 中文`.
**The Sensei is a dashed band UNDER the whole rail, not a station** — it is used at every step and
putting it at position 4 would be false.

Apply 015 §4.1's five body cuts in **EN only**. Add 015 §4.2's labels.
**`EN · SV · 中文` is not a translatable string** — it is identical in every locale; put it in the
component, not the catalogues.
**PDCA phase names: reuse the existing keys** — R4 already rules the Swedish. Do not translate
PLAN/DO/CHECK/ACT again or a review will produce a second, different Swedish set.

Responsive: 5 columns → 3 at ≤1020px → vertical rail at ≤640px. **Existing tokens only** —
`ink`, `amber`, `teal`, `smoke`, `rule`, DM Serif Display / DM Sans / JetBrains Mono.
Reference rendering: the artifact *Direction First, Then the Map*.

⚠ **SV and ZH stay on the OLD long bodies through this commit.** 015 §7: *"a shorter EN beside a
longer SV is not a defect, it is a queue."* That queue is now deliberate — see §5.

### 4.2 The copy fixes
§3.1's R1 removals (the count CC derives, not my twelve) · §3.2's SV period if the key survives ·
§3.3's ruled title fix in EN and SV.

### 4.3 ⛔ DELETE the `platform` section — its own commit, revertable alone
**Ruled by Gösta, 2026-09-13: 015 §5 Option A.** Delete `Platform.tsx`, the `platform` block in all
three locales, and `<Platform />` from `app/[locale]/page.tsx`.

015 §5 proves nothing is lost: `makigami` · `vsm` · `sensei` · `report` are each covered by a
`diagnostic` card **with a real screenshot**; `warroom` by station 1 and steps 1–2; `tracker` by
station 5's PDCA chips; and `lead` restates `hero.lead` almost clause for clause.

**Two things must survive the delete:**
1. ⚠ **`platform.headline` — "The map that does the math."** 015 §5: *the best headline on the page,
   and it dies with the section.* **Move it to `diagnostic`.** Do not silently drop it.
2. ⚠ **`platform.chainLine` — OPEN, and it is confirm-back Q1.** On `main` nothing renders it (§2.5);
   PR #8 adds it. Its text is *"Six parts. One continuous line…"* — **"six parts" IS the six
   `platform` items**, so if the section goes, its referent goes with it. **CC: say where PR #8
   renders it, and whether it can survive. Do not fix its SV period or strip its `。` if it is about
   to be deleted** — fixing a string you are deleting is work that reads as diligence.

**Deleting the section retires three of the workbook's own ⚠ FIX NOW rows** — `items.warroom.title`
("Compass & North Star", the old feature name, wrong in all three locales), `items.sensei.body`
("reads what you drew", still wrong in EN), and `items.vsm.body`'s two ZH term errors
(`节拍时间` for cycle time, `合格率` for %C&A). **They stop existing rather than getting translated.**
⚠ **But `whatsComing.previews.pdf.body` still carries the old name in prose** (`kompass` / `罗盘`)
and is NOT in the deleted section. **That one still has to be fixed.**

### 4.4 Apply the workbook SV/ZH for the rows that survive
Everything in `117landingsvzhreview-260908.xlsx` whose key still exists after 4.3.

---

## 5 · Scope (out → later)

- **The Chinese reviewer's pass — after 15 September, and ON THE POST-015 BODIES ONLY.** Do not send
  her the current workbook. Regenerate the `howItConnects` rows from the shipped EN first.
  *This is the whole reason PR #8 waited; do not undo it by sending the old sheet.*
- **The `。` rule as a repo test** — see §6. Named, not silently deferred.
- **Porting the `LOCALISED_NAMESPACES` ratchet and the placeholder-parity test** from the monorepo.
  The workbook's own Findings tab ends: *"This repo has no LOCALISED_NAMESPACES ratchet and no
  placeholder-parity test — the instrument lives in the monorepo only. Porting it is smaller than
  the redraft."* Not in this PR.
- Everything 015 §2 protects: `howItConnects.eyebrow`, `.headline`, `.closing` and all five
  `steps[].title` stay verbatim — **with the single ruled exception in §3.3.**

---

## 6 · ⚠ The structural item, and it is the point of this brief

**R1 has now failed twice on the same catalogue.** Ruled 1 September. Swept 1 September. A block
added 8 September walked straight past it, and `hero.headline` — the string the rule uses as its own
worked example — came back carrying **both** the stops the rule exists to remove.

This project's own principle answers it: **structures, not rules — replace a rule someone must
remember with a signature that refuses the bad case.**

⇒ **A `。` sweep that a human runs is not the fix. A test is.** Scoped out of this PR (§5) but
specified here so it is not lost:

> A test that derives the headline-class population **over the render tree** — per R1a, display type
> decides class, not the key name — and fails on any such ZH value containing `。`.
> ⚠ **Verify it by reverting one fix and watching it go red.** A test that has never failed has not
> been tested. And note the ADR 0053 hazard: if the test and the code ever share a predicate, the
> red belongs to the predicate, not the render — a **mutation probe** is then the only evidence.

**Report the ADR candidate in your "Architectural decisions" block if you think this earns one.**

---

## 7 · AC

1. `howItConnects` renders as the five-station rail, matching the artifact's structure: markers +
   rail, **no numerals**, station 4 forked into two bordered branches, station 5 carrying
   PDCA → 4 × 3 grid → `A3` + `EN · SV · 中文`, Sensei as a dashed band **under** the rail.
2. Responsive at 5 / 3 / 1 columns (1020px, 640px), vertical rail with the marker column left at
   ≤640px. **No new design tokens.**
3. EN bodies are 015 §4.1's five cuts, verbatim. **SV and ZH still on the old bodies** — deliberate.
4. `steps.2.title` reads `Put a number on every gap.` (EN) and `Sätt en siffra på varje gap.` (SV).
5. **Zero `。` in any ZH value CC's render-derived scan classes as headline-class.** Report the
   population size and the number fixed — both numbers, with the method beside each.
6. `platform` section deleted: `Platform.tsx` gone, `platform` block gone from all three catalogues,
   `<Platform />` gone from `page.tsx`. **`platform.headline` relocated to `diagnostic`, not lost.**
7. `whatsComing.previews.pdf.body` no longer carries the old feature name in any locale.
8. **Zero `\n\n` in the `howItConnects` block in all three locales** (§3.4), reported as a count.
9. Placeholder parity EN↔SV and EN↔ZH holds across every key touched.
10. `pnpm build` green; the page renders in all three locales with no console error.

---

## 8 · CC IMPORTANT — non-overridable

- ⛔ **Confirm-back BEFORE any code.** No branch work, no component, until Sensei green-lights.
- ⛔ **This is `leanthecompany-web`, NOT the platform monorepo.** Different repo, different gates.
  **There is no four-gate real-DB lane here** — this repo has no DB. Run what it has: typecheck,
  lint, build. **Say which commands you ran and their exit codes**; do not report a harness code.
- ⛔ **You are continuing `feat/133-the-story-section` — an OPEN PR with 6 commits.** Do not branch
  fresh, do not rebase it onto anything without saying so first, and **do not merge.** Gösta merges.
- ⛔ **PRETTIER IS NOT IN THE LINT GATE. Format only files you create.** 015 adds one component;
  everything else is an edit. A reflow of files you only touched buries the real change.
- ⛔ **`git add -A` is forbidden.** Explicit paths only. This checkout sits under
  `C:\CLAUDE PROJECTS\PLATFORM\web\` and has its own `.git`.
- ⛔ **Do not translate anything.** SV and ZH values come from the workbook or from the mechanical
  `。` removal in §3.1. **A removal is not a translation.** Anything that would be a new SV or ZH
  *sentence* stops and comes back to Sensei.
- ⚠ **Cite the file and the SYMBOL, not the line.** A line number only if you read it at the sha you
  name beside it.
- ⚠ **Enumerate, do not sample.** If your search returns N hits, open N — and say which it was.

---

## 9 · Confirm-back contract — answer every item before coding

1. ⛔ **`platform.chainLine`: where does PR #8 render it, and does it survive §4.3's deletion?**
   Quote the render site. This decides whether §3.1's twelfth row and §3.2 are work or noise.
2. **Confirm §2 against `origin/main`** — I could not run `git`. Is `howItConnects` absent from
   `main`? Does `Platform.tsx` on `main` really never call `t('chainLine')`? Name the commands.
3. **What is the actual key set PR #8 adds?** The workbook says 14 new keys, 318 → 332. Does that
   match the branch? List any key in the branch that the workbook does not carry — **a key with no
   SV/ZH row is a key that ships untranslated.**
4. **Derive the headline-class population over the RENDER TREE** (R1a), not by key name. How many
   values are in it, how many carry `。`, and **how does your number differ from my twelve?**
   I expect it to be larger and I want to know by how much.
5. **Does anything besides `howItConnects` depend on the `platform` namespace?** `page.tsx` imports,
   the Navbar anchor `#platform`, `sitemap.ts`, any `href="#platform"` in Footer or Hero.
   **A dead anchor is a visible defect on a page whose whole job is the first impression.**
6. **Where should `platform.headline` land inside `diagnostic`?** Propose the key and the render
   site; do not invent a new section for it.
7. **Any deviation from 015 §3's component spec** you think is right — say it now, with the reason.

---

## 10 · Branch

```
feat/133-the-story-section
```
**Already exists. Already has 6 commits and an open PR #8. Continue it.**

---

## 11 · Amendment table — what changed from 015, and why

| Document | Said | Now says | Overruled by |
|---|---|---|---|
| 015 §2 | All five `steps[].title` are *"verbatim, do not touch"* | **`steps.2.title` is corrected** in EN and SV | `zh-sv-copy-rules.md` **R5** — terminal punctuation matches siblings, *"a defect, not a style choice"*; and the artifact, which already renders the corrected form. §2's "verbatim" protects the narrative, not a casing error |
| 015 §5 | Options A and B, *"A is recommended"*, decision open | **A. Delete the section.** | Gösta, 2026-09-13 |
| 015 §7 step 3 | The `platform` decision is *"a separate commit, so it can be reverted alone"* | **Unchanged — still its own commit**, now §4.3 | — |
| 015 §7 | 015 follows PR #8 | **015 lands INSIDE PR #8** | Gösta, 2026-09-13 — the translation-ordering trap in §1 |
| 015 §3 | *"Reference rendering: the artifact in Gösta's gallery"* | Unchanged, and the artifact was read back in full on 2026-09-13 to write §4.1 | — |
| — | *(not in 015)* | **§3.1's R1 regression and §6's test** | `zh-sv-copy-rules.md` R1/R1a; found 2026-09-13 |
