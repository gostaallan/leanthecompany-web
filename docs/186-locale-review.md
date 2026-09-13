# 186 — Locale review sheet

**Branch:** `feat/133-the-story-section` (PR #8) · **Brief:** `docs/186-the-line-lands-inside-pr-8.md`, Amendment 1
**This PR does not merge on a green build alone.** Gösta reads the Swedish; the Chinese reviewer reads the Chinese.

Claude Code wrote every SV and ZH value below that is marked **new** (the 2026-08-08 process). Nothing
marked *moved*, *copied* or *unchanged* was translated — those values already existed and were carried
by key. The rows under **Raise** are questions, not decisions: each one is left as it is on the branch
until someone rules.

⚠ **Do not review from `GTM/117landingsvzhreview-260908.xlsx`.** It is older than this branch in all 75
rows where the two differ (brief 186 A1.2) and carries 6 rows for keys that no longer exist. Regenerate it
from the branch first. **The one exception is §4:** Gösta ruled #183–#185 applied from it, verbatim, and none of
those values had ever existed on the branch.

## Applied in this PR — the `6566bf4` residue, and Gösta's rulings of 2026-09-13

`chaos-score.ts` scores by **index**: every area's `points` is `[0, 1, 2, 3]` and `scoreFor` reads
`area.points[picked]`. **A label at the wrong index is a wrong score** — which is why the two ZH answer rows
below were scoring defects, not style questions. Both arrived in `6566bf4` (24 Aug, the 117 R2 apply).

| key | locale | was on the branch | now | source |
|---|---|---|---|---|
| `diagnostic.areas.handoffs.options.3` | EN | Färre än fem, och jag vet exakt vilka eller vad de är. | Nobody has ever drawn it end to end. | **Restored from `43ecdd5`.** The Swedish was SV `options.0` verbatim — the healthiest answer at the 3-point index |
| `diagnostic.areas.handoffs.options.3` | ZH | 从来没人从开始到结束梳理过一遍。/我们从未对整个流程进行过端到端的梳理 | 从来没人从开始到结束梳理过一遍。 | **Removal** of the second candidate. ⚠ The `43ecdd5` value was 从来没人从头到尾画过一遍。 — 画 (drawn) matches EN *drawn* and SV *ritat upp* more closely than 梳理. **Reviewer:** [ ] keep 梳理 [ ] 画 |
| `diagnostic.form.error` | EN | Something went wrong？ Please email… | Something went wrong. Please email… | **Restored from `9dafafd`** (30 Apr); matches SV *Något gick fel.* Gösta ruled the full stop over `?`, 2026-09-13 |
| `diagnostic.areas.inventory.options.1` | ZH | 最多只等几个小时，工作基本不会停下来 | 等了一两天，才可以工作几个小时。 | **Ruled by Gösta, 2026-09-13** (workbook #87). The old value carried option 0's meaning, so the 1-point "a day or two" rung did not exist in Chinese. ⚠ **Gösta supplied it in Traditional characters; Sensei converted it to Simplified. The Chinese reviewer should still read it.** Body copy: the terminal 。 stays |
| `diagnostic.areas.decisions.options.3` | ZH | 通常要等到每周例会才能作出决定 | 这完全取决于谁有空。 | **Ruled by Gösta, 2026-09-13** (workbook #107). The old value carried option 2's meaning, so "wait for the weekly meeting" scored at 2 and at 3, and "depends on who is available" did not exist. ⚠ **Gösta supplied it in Traditional characters; Sensei converted it to Simplified. The Chinese reviewer should still read it.** Body copy: the terminal 。 stays |
| `diagnostic.noLeaks` | EN | …not the person closest to the report.. | …not the person closest to the report. | **Ruled by Gösta, 2026-09-13.** Doubled stop removed |
| `diagnostic.bands.drifting.line` | SV | …och deras effekter förstärks med tiden.. | …och deras effekter förstärks med tiden. | **Ruled by Gösta, 2026-09-13.** Doubled stop removed |
| `diagnostic.bands.runningOnPeople.line` | SV | …det är ett bemanningsschema. förklätt till ett. | …det är ett bemanningsschema förklätt till ett. | **Ruled by Gösta, 2026-09-13.** Stray stop removed; no comma added |

## What must NOT be "corrected" back

| Term | sv | zh | Why |
|---|---|---|---|
| True North · Value–KPI Bridge · Makigami · A3 | Latin | Latin | R3 do-not-translate |
| Value Stream Mapping (the fork chip) | Latin | Latin | A1.4 — parallel with Makigami in the same fork; one translated branch and one not reads as an accident |
| Sensei | Latin | Latin | Brand token; `老师傅` is a vocab-gate failure |
| `PLAN ▸ DO ▸ CHECK ▸ ACT` | Latin | Latin | Component constant. SV ruled identical by R4; **ZH is Sensei's call (A1.10) — see Raise 3** |
| `EN · SV · 中文` | same | same | Component constant; identical by definition |

---

## 1 · `howItConnects` — the rail (commit 1)

### 1.1 New keys — CC wrote SV and ZH

The chips and fork labels are `font-mono` labels, not display type: **no terminal punctuation in any
locale** (A1.4). `sensei.body` is body copy: normal punctuation, keeps `。`, addresses the reader as 您.

| key | EN | SV | ZH | notes |
|---|---|---|---|---|
| `steps.0.tools.0` | True North | True North | True North | Latin ×3 |
| `steps.1.tools.0` | 5 values | 5 värden | 5 项价值 | ⚠ ZH `steps.1.body` calls them 五项核心指标 (indicators); the deleted `platform.items.warroom.body` said 五项核心价值. 价值 follows the EN chip. **Reviewer: 价值 or 指标?** |
| `steps.1.tools.1` | current → target | nuläge → mål | 现状 → 目标 | SV `nuläge` matches `hero.lead`; the arrow is U+2192 in all three |
| `steps.2.tools.0` | Value–KPI Bridge | Value–KPI Bridge | Value–KPI Bridge | Latin ×3 — ⚠ see Raise 2 (SV body says `Värde-KPI-bryggan`) |
| `steps.2.tools.1` | ranked | rangordnade | 按优先级排序 | SV plural (the gaps are ranked) and echoes `rangordnar` in the body. ZH is longer than the EN — ⚠ **reviewer: shorter form, e.g. 已排序?** |
| `steps.3.fork.info.label` | Information & admin flow | Informations- och administrativt flöde | 信息与行政流程 | SV follows the body's `informations- eller administrativt flöde`; long for a mono label — **check the wrap at 1280 px and at 3 columns** |
| `steps.3.fork.info.tool` | Makigami | Makigami | Makigami | Latin ×3 — ⚠ see Raise 4 |
| `steps.3.fork.material.label` | Material flow | Materialflöde | 物料流 | ZH matches `hero.lead` 物料流 |
| `steps.3.fork.material.tool` | Value Stream Mapping | Value Stream Mapping | Value Stream Mapping | Latin ×3, ruled A1.4 — ⚠ see Raise 1 |
| `steps.4.tools.0` | A3 | A3 | A3 | Latin ×3 |
| `sensei.tag` | Embedded Sensei | Inbäddad Sensei | 内置 Sensei | Sensei Latin, *Embedded* translated (A1.4). SV capital S deliberately — the existing `Inbäddad AI-sensei` title is lower-case; **Gösta: which?** |
| `sensei.body` | Not a step — it runs the length of the line. Ask where your biggest waste is at any point, and the answer comes from your takt, your handoffs, your losses. | Inte ett steg – den följer hela linjen. Fråga när som helst var ditt största slöseri finns, så kommer svaret från din takt, dina överlämningar, dina förluster. | 它不是其中一个步骤，而是贯穿整条主线。无论进行到哪一步，您都可以问它最大的浪费在哪里，答案来自您的节拍、您的流程交接、您的损失。 | SV `du`, en dash as elsewhere in this section. The last clause in both languages reuses the deleted `platform.items.sensei.body` wording (`din takt, dina överlämningar, dina förluster` / `您的节拍、您的流程交接、您的损失`). ZH 您 per R2 |

### 1.2 Changed EN bodies — SV and ZH are deliberately NOT changed

015 §7: *a shorter EN beside a longer SV is not a defect, it is a queue.* These five rows are the queue.
**The SV and ZH to review are translations of the new EN, written from scratch — they do not exist yet.**

| key | EN (new) | SV | ZH | notes |
|---|---|---|---|---|
| `steps.0.body` | Choose your industry — the five things your customers judge you on are already there. | *old long body* | *old long body* | ZH old body has a blank line |
| `steps.1.body` | Current against target, with defined criteria at every level. Evidence, not a show of hands. | *old long body* | *old long body* | ZH old body has a blank line |
| `steps.2.body` | Which measure proves it, how large the loss is, how much you trust the data. Now you know where to look — before you draw anything. | *old long body* | *old long body* | ZH old body has a blank line |
| `steps.3.body` | The flow the loss sits in decides the map. | *old long body* | *old long body* | SV and ZH old bodies each have a blank line |
| `steps.4.body` | Improvement work with an owner and a due date — then the one page your management review actually reads. | *old long body* | *old long body* | |

Blank lines in `howItConnects`, measured on the branch: **EN 0 · SV 1 · ZH 4.** They render as paragraphs
(the paragraph gate asserts it). When the SV and ZH bodies are replaced, the replacements should carry none.

---

## 2 · `whatsComing.previews.pdf.body` — the old feature name (commit 2)

| | before | after |
|---|---|---|
| EN | Every map, compass, and kaizen report | Every map, True North, and kaizen report |
| SV | Varje karta, kompass och kaizen-rapport | Varje karta, True North och kaizen-rapport |
| ZH | 每一张流程图、战略罗盘和改善报告 | 每一张流程图、True North 和改善报告 |

A rename, ruled A1.7: True North does export from the A3 hub. No new words — only the Latin term. ZH keeps a
half-width space between `True North` and 和. **Reviewer: confirm the spacing reads right.**

---

## 3 · The `platform` section is deleted (commit 3)

| key | EN | SV | ZH | notes |
|---|---|---|---|---|
| `whatsComing.mapLine` | The map that does the math. | Kartan som räknar själv. | 不只看流程，更能算清流程 | **Moved verbatim** from `platform.headline`. Display type — no `。` in ZH (R1), pinned by the gate |
| `nav.platform` | How it works | Hur det fungerar | 运作方式 | **Copied verbatim** from `footer.cols.product.platform` (A1.9). Was *Platform / Plattformen / 平台*. Key name kept on purpose |
| `platform.*` (18 keys) | — | — | — | Deleted: `eyebrow`, `headline`, `lead`, `chainLine`, `status.{live,dev}`, `items.{warroom,makigami,vsm,sensei,tracker,report}.{title,body}`. **Nothing to review; delete their rows from the workbook** |

---

## 4 · `about` — the 117 workbook, applied verbatim (commit 7)

Gösta ruled option A, 2026-09-13: apply #183–#185, cut #186 and #187. **These are the reviewer's own approved
redraft, copied cell for cell** from the workbook's Review tab (EN · SV — redraft · ZH — redraft) and checked
codepoint for codepoint against it. Claude Code wrote and translated nothing here. **None of these values
existed anywhere in the repo's history before this commit**, so none of them reverts later work.

| # | key | EN | SV | ZH | notes |
|---|---|---|---|---|---|
| 183 | `about.lead` | My career in operations management began at Tetra Pak. Ten years of hands-on experience on the production line gave me a solid foundation in manufacturing, operations and continuous improvement, and shaped the working methods I still use today: seeing the actual workflow, understanding the real problems that arise on site and the gap between process design and actual operation. | Min karriär inom verksamhetsledning började på Tetra Pak. Tio års praktisk erfarenhet från produktionslinjen gav mig en solid grund inom tillverkning, drift och kontinuerlig förbättring, och formade de arbetsmetoder jag fortfarande använder idag: att se det faktiska arbetsflödet, förstå de verkliga problemen som uppstår på plats och gapet mellan processdesign och faktisk drift. | 我的运营管理职业生涯始于 Tetra Pak。十年的生产一线实践，让我建立了制造、运营与持续改善的扎实基础，也形成了至今沿用的工作方式：看清工作的实际流动，理解现场真正发生的问题，以及流程设计与实际运行之间的差距。 | Replaces the longer Tetra Pak lead |
| 184 | `about.bio.0` | Companies change. Products change. Operating environments change. Yet the underlying process problems are often remarkably similar. Years of practice reinforced a simple principle: consultants can help solve individual problems, but sustainable improvement depends on an organization’s ability to see how work actually flows, identify the gaps between current and target performance, and improve the system continuously. | Företag förändras, produkter förändras, arbetsplatser förändras, men många djupt rotade problem återkommer ständigt. Åratal av praktik har gradvis fått mig att inse att konsulter kan hjälpa företag att lösa individuella problem, men deras verkliga värde ligger i att ge företag möjlighet att identifiera problem, förstå processer och kontinuerligt förbättra systemet. | 企业在变，产品在变，现场在变，但许多深层问题却一再出现。这些经历让我逐渐明白：顾问可以帮助企业解决一个问题，但真正有价值的，是让企业拥有自己发现问题、看清流程、持续改善的能力。 | Was the 2009 East and Southeast Asia paragraph (EFESO, FrieslandCampina, Nestlé, Danone, Heineken). The company names remain in `hero.founderBio` |
| 185 | `about.bio.1` | That is why I created LeanTheCompany — a management system shaped by more than two decades of operational practice, tested and refined across different industries and operating environments. It gives teams a structured way to see the process, set improvement priorities, and turn improvement into an internal capability — not an external dependency. | Det är därför jag skapade LeanTheCompany – ett ledningssystem format av mer än två decenniers operativ praxis, testat och förfinat inom olika branscher och verksamhetsmiljöer. Det ger team ett strukturerat sätt att se processen, sätta förbättringsprioriteringar och omvandla förbättring till en intern förmåga – inte ett externt beroende. | 这就是我创建 LeanTheCompany 的原因——把二十多年从现场学到、在不同企业中反复验证的方法，沉淀成一套企业自己能够掌握并持续使用的改善方法。 | Was the 2014-onward paragraph (WCOM and TPM, Stora Enso to Nobia) |

### Cut — `about.bio.2` and `about.bio.3` deleted in all three locales

`bio` is now a **2-element array** in EN, SV and ZH; parity checks the length. The keys are **removed, not
blanked**: #187 holds a single space (`' '`, and `' \r\n'` in ZH), which would have kept the key alive and
rendered an empty paragraph. `About.tsx` maps over `t.raw('bio')`, so nothing reads an index that is gone.

It is a cut and not a fix because two defects retire with it:

- **#186 ZH is marked pink in the workbook** (fill `FCE4EC`) — a defect, not a style choice.
- **#186's EN and SV are not the same paragraph.** EN is a new proposal (*"…turns proven patterns into a
  practical method…"*); SV is the old live text (*"Företagen förändrades. Produkterna förändrades. Länderna
  förändrades…"*). They were never translations of each other.

---

## Raise — questions for the reviewers, not changed in this PR

1. **Value Stream Mapping is inconsistent across the page, and this PR does not fix it.** The fork chip is
   Latin in all three (ruled). Elsewhere the branch already says `价值流图` (ZH `hero.lead`, `steps.3.body`,
   `whatsComing.previews.vsm.title`) and `Värdeflödeskartläggning` (SV `steps.3.body`) beside
   `Value Stream Mapping-canvas` (SV `whatsComing.previews.vsm.title`). **Pick one per locale.**
   - [ ] SV: Latin everywhere   [ ] SV: Swedish in prose, Latin as a tool name
   - [ ] ZH: Latin everywhere   [ ] ZH: 价值流图 in prose, Latin as a tool name
2. **Value–KPI Bridge in Swedish prose.** The chip is Latin (R3); SV `steps.2.body` says `Värde-KPI-bryggan`.
   - [ ] keep both   [ ] Latin in the body too (when the body is re-translated)
3. **ZH PDCA phase names are Latin.** Sensei's call, not a precedent (A1.10): PDCA is current in Chinese
   manufacturing in Latin, and one constant cannot drift. **Overturn it here if it reads wrong.**
   - [ ] keep `PLAN ▸ DO ▸ CHECK ▸ ACT`   [ ] translate (then it becomes a key, and SV stays identical per R4)
4. **Makigami's Chinese rendering is the reviewer's call** (translation-rule 5, Japanese terms). The chip and
   the existing ZH strings use Latin `Makigami`.
   - [ ] keep Latin   [ ] other: ______
5. **你 in verified pen-pass text (R2 says 您).** Left as signed off: `howItConnects.steps.0.title`
   (明确你承诺交付的结果), `steps.0.body` (选择你…由你…替你), `steps.2.body` (你就已经知道…帮助你).
   `hero.lead` also says 帮助你检验判断. `steps.0.body` and `steps.2.body` are replaced by the new short
   bodies anyway; **the title and `hero.lead` are the ones that stay.**
   - [ ] rephrase to avoid direct address   [ ] 您
6. **The `6566bf4` residue in `diagnostic` — now split.** `handoffs.options.3` (EN + ZH) and EN `form.error`
   are restored in this PR, and the two ZH scoring defects are at the top of this sheet. **Still open:** ZH
   `diagnostic.form.error` reads `发出了问题？` — a fullwidth `？`, and wording that does not plainly say
   "something went wrong". The residue gate's three signatures match none of these; widening it is brief 187.
   - [ ] reviewer rewrites ZH `form.error`   [ ] leave
7. **`diagnostic.areas.inventory.options.0` — the EN is ruled short; do SV and ZH follow?** 125 §10 shortened
   the English to *Work keeps moving.* SV and ZH still carry the longer two-sentence form (*Som mest några
   timmars väntan. Arbetet rör på sig.* / 最多等几个小时。活是在往前走的。). Should they be trimmed to match,
   or does the longer form read better in each language? **EN is ruled and stays short either way.**
   - [ ] SV: trim to match   [ ] SV: keep the longer form
   - [ ] ZH: trim to match   [ ] ZH: keep the longer form
