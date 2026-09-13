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
| 2.3 | ⚠ **AMENDED — see A1.3.** `<Platform />` sits between `<Problem />` and `<WhatsComing />` and `HowItConnects` is not composed. The count "twelve sections" was wrong: twelve *components*, **ten sections inside `<main>`** — Navbar and Footer sit outside it. | read the `HomePage` return |
| 2.4 | ⇒ **The section is INTRODUCED by PR #8.** It is not a change to an existing section. | 2.1 + 2.2 + 2.3 |
| 2.5 | **`Platform.tsx` does NOT render `chainLine` on main.** The `Platform` component renders `t('eyebrow')`, `t('headline')`, `t('lead')` and six cards over the `ITEMS` array (`makigami · vsm · sensei · tracker · warroom · report`), each `t('items.<key>.title')` / `.body`. There is no `t('chainLine')` call anywhere in the file. | read the whole component. ⚠ **The "2,586 bytes" I wrote was the CRLF WORKING COPY; the blob is 2,513** (`git ls-files --eol` → `i/lf w/crlf`). **The finding holds, the number did not** — and it was decoration, offered as proof of enumeration while proving nothing. See A1.1. |
| 2.6 | **`platform.chainLine` is therefore a NEW key added by PR #8**, consistent with the workbook's own section banner: *"howItConnects + platform.chainLine · 17 rows · session 133, the story section · **14 new keys**, 3 changed values · catalogue count 318 → 332"*. | 2.5 + workbook row 237 |
| 2.7 | **`platform.headline` = "The map that does the math."** — the line 015 §5 says must not be silently dropped. | read `en.json` `platform.headline` |

---

## 3 · The copy defects, measured against `GTM/zh-sv-copy-rules.md`

> ⛔ **AMENDED 2026-09-13, AND THIS IS THE BIGGEST CORRECTION IN THE BRIEF — READ A1 BEFORE §3.**
> **Everything below was measured against the WORKBOOK. None of it was measured against the PR
> branch, and the branch already holds every fix in §3.1, §3.2 and §3.3 — landed 1 September.**
> §3 is kept, not deleted, because it is the evidence that **the workbook is stale and §4.4 would
> have reverted that work.** Read it as a description of `117landingsvzhreview-260908.xlsx`, never
> as a description of the code.

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

### 4.4 ⛔ DROPPED — see A1.2
**Applying the workbook would revert 1 September's work.** CC diffed all 237 workbook rows against
the branch: 19 EN, 12 SV and 44 ZH differ, and **in all 75 the branch holds the later value.**
The surviving half of this item is in §5: the workbook must be **regenerated from the branch**
before the Chinese reviewer ever sees it.

---

## 5 · Scope (out → later)

> ⚠ **AMENDED (A1.2):** the first bullet is now load-bearing rather than a courtesy. The workbook is
> **older than the branch in all 75 rows where the two differ**, so it is not a source for anything;
> it must be **regenerated from the branch** before it is sent to anyone.

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

> ⛔ **AMENDED (A1.8): THE TEST ALREADY EXISTS AND I DID NOT LOOK.** `scripts/paragraph-gate.mjs`
> has carried a **"ZH HEADLINE CHECK"** section since `fcfcde2`, 1 September, running as postbuild.
> **The argument below survives; the deliverable inverts** — the job is to WIDEN an existing gate,
> not to write a new one, and it moves **into** this PR (A1.8).

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
   `<Platform />` gone from `page.tsx`. **`platform.headline` relocated to `whatsComing` as `whatsComing.mapLine` (A1.5), not lost.**
7. ⚠ **AMENDED (A1.7): RENAME, DO NOT REMOVE.** `whatsComing.previews.pdf.body` says **True North** where it said *compass / kompass / 战略罗盘*, in all three locales. **The claim is true and must survive** — `ProjectDocId` in `modules/print/queries.ts` includes `'compass'` and `'maturity'`, so True North does export from the A3 hub (ADR 0011).
8. ⚠ **AMENDED (A1.6) — the original wording contradicted AC 3.** EN carries **zero** `\n\n` after the cuts; **SV and ZH keep theirs** (SV 1, ZH 4) because they stay on the old bodies, and those blank lines must **render as paragraphs** with the paragraph gate green. Report all three counts.
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
- ⛔ **AMENDED — MY ORIGINAL "DO NOT TRANSLATE ANYTHING" WAS WRONG AND CONTRADICTED A RULED
  PROCESS (A1.4).** The 2026-08-08 ruling is: **Claude Code writes all three languages in the PR,
  then humans verify before merge — Gösta reads the Swedish, his wife reads the Chinese.**
  ⇒ **Write SV and ZH for the new labels**, under the constraints in A1.4, and **produce the review
  sheet `docs/186-locale-review.md`** — one row per changed key, columns **EN | SV | ZH | notes**.
  Precedent in this repo: `docs/125-locale-review.md`. **Do not merge on a green build alone.**
  ⚠ **Flag, don't guess** — every uncertain row carries a note rather than a confident invention.
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


---

# AMENDMENT 1 — 2026-09-13, on CC's confirm-back

**CC stopped before any branch work and falsified a large part of this brief. That is the process
working.** Nine of my claims moved. The amendment is written into the sections above so no reader
meets a false one, and recorded here with what overruled it.

⚑ **The through-line, and it is the same error the manual audit taught on this very day:
§2 measured `main`, §3 measured the WORKBOOK, and neither measured the BRANCH — which is the
artefact the PR ships.** *A measurement was taken of something adjacent to the question and reported
as an answer to it.* The brief's own §2 caveat said `git` could not be run and asked CC to confirm;
it did not occur to me that the same gap made **§3 describe a file rather than the code.**

## A1.1 · The byte count that was decoration

`Platform.tsx` is **2,513 bytes** as a blob; my 2,586 was the CRLF working copy. The finding — no
`t('chainLine')` on `main` — stands, re-derived by CC with `git grep` on the origin ref.
**I offered the number as proof I had enumerated rather than sampled. A number that is wrong proves
neither.** → ways-of-working, *cite the symbol, not the line*; the same rule reaches byte counts.

## A1.2 · §4.4 is DROPPED — the workbook is older than the branch

CC diffed all 237 workbook rows against `fcfcde2` (`wb-compare.cjs`) and read all 75 that differ:
**19 EN, 12 SV, 44 ZH — the branch holds the later value in every one.** Applying §4.4 would have:
restored **14** `。` in ZH headlines · reverted **13** rows from 您 to 你 against R2 · removed the SV
periods on `chainLine` and `steps.2.title` · undone the pen-pass cuts in `steps.3.body` (all three)
and `steps.4.body` (SV) · restored the old SV bio and *"grundarplats"* · and put **"Compass & North
Star"**, **"reads what you drew"** and **"orginal"** back into EN.

⚑ **My §3.1 called `hero.headline` a REGRESSION. It is not. The branch reads `两块画布 四张地图`,
correct since 1 September.** The workbook is simply stale — and the **14** it would restore is two
more than my twelve: I also missed `diagnostic.introTitle` and `diagnostic.form.thanksTitle`.
**The real finding was never a regression in the product. It was that §4.4 was a regression vector,
and that is the more dangerous shape of the same observation.** → ways-of-working, *a falsified
premise does not automatically falsify the finding — re-derive, do not withdraw.*

**Surviving obligation:** the workbook must be **regenerated from the branch** before the Chinese
reviewer sees it. It also carries **6 rows for keys that no longer exist**
(`whatsComing.founding{Note,Cta}`, `about.credentials.{lean,china}.{title,body}`).

## A1.3 · §2's small corrections

- **2.3:** twelve *components*, **ten sections inside `<main>`** — Navbar and Footer are outside it.
- **2.6:** true for EN and SV (14 added, 3 changed); **ZH is 14 added and 21 changed** — the 3 plus
  18 from the 1 September R1 sweep.
- **2.1, 2.2, 2.4, 2.7 confirmed true** against `origin/main` at `eaa73d8`.

## A1.4 · ⛔ My "do not translate anything" was wrong

It contradicts the **ruled process of 2026-08-08**: *Claude Code writes all three languages in the
PR; Gösta reads the Swedish, his wife reads the Chinese, before merge*, and **the PR produces a
review sheet.** My instruction would have frozen the PR on `parity-gate.mjs`, which fails the build
when an EN key has no SV or ZH — so **015 §7's "leave SV/ZH on the old bodies" holds for EXISTING
keys and cannot hold for NEW ones.** CC was right to stop.

**RULED — the eleven new labels:**

| Label | SV | ZH |
|---|---|---|
| `True North` · `Value–KPI Bridge` · `Makigami` · `A3` | **identical** | **identical** |
| `Value Stream Mapping` | **identical** | **identical** |
| `5 values` · `current → target` · `ranked` · `Information & admin flow` · `Material flow` | CC writes | CC writes |
| `Embedded Sensei` | *Sensei* stays Latin, *Embedded* translates | same |
| `sensei.body` | CC writes | CC writes |

- **`Value Stream Mapping` is Latin in all three**, parallel with `Makigami` in the same fork.
  R3 and translation-rule 5 both list VSM as do-not-translate, and **two branches of one fork, one
  translated and one not, reads as an accident rather than a decision.**
  ⚠ **Raise in the sheet, do not fix here:** the branch already carries `价值流图` and a Swedish
  `Värdeflödeskartläggning` elsewhere. That inconsistency predates this PR and is the reviewer's.
- ⚠ **Makigami's Chinese rendering is the reviewer's call, not ours** — translation-rule 5's last
  line is explicit about Japanese terms. Raise it; don't decide it.
- **The chips are `font-mono` ~10px — NOT display type**, so R1a's headline class does not reach
  them. They are labels with no sentence, so **no terminal punctuation in any locale** regardless.
- **`sensei.body` is body copy:** normal punctuation, **keeps its `。`**, and takes **您** per R2.
- **Swedish is `du`** (translation-rule 6).

## A1.5 · Q6 — `whatsComing.mapLine`, and 015 §5 names the wrong section

**CC caught an error in 015 itself: the screenshot cards are `whatsComing.previews.*`, not
`diagnostic`.** `diagnostic` is the Chaos Score quiz and holds no screenshots. 015 §5's coverage
table is wrong; its conclusion still holds. **My "relocate to `diagnostic`" inherited that error.**

**RULED: `whatsComing.mapLine`**, a display line between the header block and the `PREVIEWS` grid,
in `chainLine`'s shape (`font-serif text-xl md:text-2xl`). Values move **verbatim, no new words** —
EN `The map that does the math.` · SV `Kartan som räknar själv.` · ZH `不只看流程，更能算清流程`.
**I verified the ZH independently: it carries no `。` on `main` either.** Add it to `HEADLINE_PINS`.
**It goes in the deletion commit, so a revert brings the section and the line back together.**

## A1.6 · AC 8 contradicted AC 3

Correct, and mine. Zero `\n\n` in all three locales is impossible while SV and ZH stay on the old
bodies. Restated in AC 8. **Keep `<Paragraphs>` in the rail for exactly that reason.**

## A1.7 · ⛔ Q7.7 — RENAME, DO NOT REMOVE. The claim is TRUE.

CC proposed deleting the word: *"Every map, compass, and kaizen report"* → *"Every map and kaizen
report"*, and asked whether True North exports as an A3. **It does, and I measured it rather than
passing the question back.**

`ProjectDocId` in `apps/ltc-os-platform/modules/print/queries.ts` enumerates
`vsm · makigami · compass · maturity · kaizen-stats · bridge · problem-records · flow-workshops`,
and `getProjectDocuments` emits a `doc: 'compass'` row. The hub is **ADR 0011, print-a3-document-hub**.
⇒ **Removing the word would drop a TRUE claim from the page to avoid a rename.**

**RULED — the rename, which invents no new SV or ZH words because `True North` is on the
do-not-translate list (R3 / translation-rule 5):**

- EN: `Every map, compass, and kaizen report` → **`Every map, True North, and kaizen report`**
- SV: `Varje karta, kompass och kaizen-rapport` → **`Varje karta, True North och kaizen-rapport`**
- ZH: `每一张流程图、战略罗盘和改善报告` → **`每一张流程图、True North 和改善报告`**

## A1.8 · Q4 and §6 — the gate exists; widen it, and it comes INTO this PR

CC derived the population **over the render tree**, not by key name: **45 display-type values, and
ZERO carry a `。` on the branch.** My twelve were workbook artefacts. 45 is 3.75× my name-shaped 65
candidates' yield — **the scan under-counted the population and over-counted the defects, both.**

**The real finding is CC's gap:** of the 45, **9 are covered by neither the pins nor the net** —
`finalCta.headlineSub` (in an `<em>`), `hero.proof.*` (3, in `<strong>`), `diagnostic.bands.*.name`
(4) and `diagnostic.form.title` (both render only in the result phase) — **and the net skips
`font-mono` eyebrows entirely.** All 9 are clean today.

**RULED: widen the gate in THIS PR**, against my own Scope (out). Reason: the PR already opens
`paragraph-gate.mjs` to drop the `platform.chainLine` pin and to add `whatsComing.mapLine`, and it
adds new display strings to the page. **Leaving a known blind spot open in the same commit that
feeds it new values is how the blind spot gets exercised.** ⚠ **Verify by reverting one fix and
watching it go red** — a test that has never failed has not been tested.

## A1.9 · Q5 — the two dead anchors

`#platform` is the target of `Navbar.tsx` `links` and `Footer.tsx` `navCols`. **RULED: point both at
`#how-it-connects`.** The footer label `footer.cols.product.platform` is already *"How it works" /
"Hur det fungerar" / "运作方式"* — **accurate for the rail, and already ruled in all three locales.**

**`nav.platform` takes those same three values verbatim** — "Platform / Plattformen / 平台" names a
section that no longer exists. **Copying the footer's ruled strings invents nothing in any locale.**
⚠ **Keep the KEY name.** Renaming it churns three catalogues, the parity gate and the workbook for
no behaviour; leave a one-line comment at the `links` site and let a later sweep rename it.
*R1a's lesson exactly: the key names lie, and that is survivable as long as the render is right.*

## A1.10 · Q7.3 — the ZH PDCA chips

**There are no PDCA keys to reuse in this repo** — R4's `RULED_IDENTICAL_BY_DESIGN` lives in the
monorepo. My "reuse the existing keys" was false here.

**RULED: a component constant, `PLAN ▸ DO ▸ CHECK ▸ ACT`, identical in all three locales** — the
same treatment as `EN · SV · 中文`, and what the reference artifact does. R4 already makes Swedish
identical to English; making Chinese identical keeps the row **one constant rather than a
translatable set**, which is what stops a second, divergent Swedish set being minted later.
⚠ **ZH is UNRULED and this is my call, not a precedent — put it in the review sheet for the Chinese
reviewer to overturn.** PDCA is current in Chinese manufacturing in Latin, which is why I ruled it
this way rather than translating it.

## A1.11 · Accepted without change

Q1 (`chainLine` dies with the section; **fix nothing on it**, and **drop its `HEADLINE_PINS` entry in
the deletion commit or the postbuild gate fails on a pin pointing at nothing**) · Q3 (the branch
matches the workbook exactly: 14 added, 318 → 332, no PR #8 key untranslated) · Q7.1 (rewrite of the
existing 78-line `HowItConnects.tsx`, hand-matched style, no Prettier) · Q7.5 (Tailwind arbitrary
variants, no new token) · Q7.6 (smoke the long SV/ZH bodies at 1280 px **on the Vercel preview**) ·
CC's R2 note (branch `steps.0.title`, `steps.0.body`, `steps.2.body` use 你 — verified pen-pass text;
**leave it and raise it in the sheet**).

## A1.12 · The commits

CC's four-becomes-three stands, plus the sheet:

1. `feat(page)` — the rail, the EN cuts, the eleven labels with SV/ZH, the PDCA constant.
2. `copy(page)` — the A1.7 rename.
3. `feat(page)` — delete `platform`; `whatsComing.mapLine`; retarget both anchors; `nav.platform`
   revalued; drop the `chainLine` pin; fix the false docstring. **Its own commit, revertable alone.**
4. `test(gate)` — A1.8's nine pins plus the `font-mono` eyebrows.
5. `docs(186)` — `docs/186-locale-review.md`, the review sheet.

---

## Amendment table — Amendment 1

| Said | Now says | Overruled by |
|---|---|---|
| §2.5 `Platform.tsx` is 2,586 bytes | **2,513** (blob; 2,586 was the CRLF working copy) | CC, `git cat-file -s` + `git ls-files --eol` |
| §2.3 twelve sections | twelve components, **ten sections** in `<main>` | CC, `git show origin/main:…/page.tsx` |
| §2.6 ZH 14 added, 3 changed | 14 added, **21 changed** | CC, `keys.cjs` across both refs |
| §3.1 `hero.headline` **regressed** | **It did not.** The branch has been correct since `fcfcde2`; the WORKBOOK is stale | CC, `git show` on the branch catalogues |
| §3.1 twelve ZH values carry `。` | **Zero on the branch.** Twelve was a workbook count, and even there it was **14** | CC, render-tree derivation |
| §3.2, §3.3 are work to do | **Already done** on the branch — `308b74d`, `494fa74` | CC |
| §4.4 apply the workbook | ⛔ **DROPPED** — it reverts 1 Sept in all 75 differing rows | CC, `wb-compare.cjs` |
| §6 write the `。` test | **It exists** (`scripts/paragraph-gate.mjs`, 1 Sept). **Widen it, in this PR** | CC |
| §8 "do not translate anything" | ⛔ **Wrong.** CC writes all three + a review sheet | the ruled process of 2026-08-08 |
| AC 6 move the headline to `diagnostic` | **`whatsComing.mapLine`** — `diagnostic` holds no screenshots | CC; 015 §5's own coverage table is wrong |
| AC 7 remove the old feature name | ⛔ **RENAME to True North.** The claim is true | `ProjectDocId` in `modules/print/queries.ts`; ADR 0011 |
| AC 8 zero `\n\n` in all three | EN 0; SV/ZH keep theirs and must render as paragraphs | CC — it contradicted AC 3 |
| 015 §4.2 labels ship EN-only | **Impossible** — `parity-gate.mjs` fails the build | CC |
| 015 §4.2 "reuse the PDCA keys" | **There are none in this repo.** Component constant, Latin ×3 | CC |
