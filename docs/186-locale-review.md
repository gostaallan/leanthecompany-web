# 186 — Locale review sheet

**Branch:** `feat/133-the-story-section` (PR #8) · **Brief:** `docs/186-the-line-lands-inside-pr-8.md`, Amendment 1
**This PR does not merge on a green build alone.** Gösta reads the Swedish; the Chinese reviewer reads the Chinese.

Claude Code wrote every SV and ZH value below that is marked **new** (the 2026-08-08 process). Nothing
marked *moved*, *copied* or *unchanged* was translated — those values already existed and were carried
by key. The rows under **Raise** are questions, not decisions: each one is left as it is on the branch
until someone rules.

⚠ **Do not review from `GTM/117landingsvzhreview-260908.xlsx`.** It is older than this branch in all 75
rows where the two differ (brief 186 A1.2) and carries 6 rows for keys that no longer exist. Regenerate it
from the branch first.

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
6. **Pre-existing, outside this PR — found while reading, not touched:** ZH
   `diagnostic.areas.handoffs.options.3` holds two versions joined by `/`
   (`从来没人从开始到结束梳理过一遍。/我们从未对整个流程进行过端到端的梳理`), and ZH
   `diagnostic.areas.inventory.options` carries two near-duplicate first options. Review-sheet residue that
   the residue gate's three signatures do not match. **Needs its own fix.**
