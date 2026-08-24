# 125 — Locale review sheet

**Branch:** `feat/pricing-v6-original` · **Date:** 2026-08-24
**Source of truth for EN:** GTM 006 v6 (final). **This PR does not merge without this sheet signed.**

## How to use this

Two reviewers, two languages, one pass each.

- **Gösta** reads the **Swedish**. **Gösta's wife** reads the **Chinese**.
- Mark a row `OK`, or write the correction straight into the **Your correction** column.
- English is only here as the reference. **If a correction to the English would change
  GTM 006 v6 copy, do not write it in — flag it to Gösta.** v6 is the copy source and
  this PR does not improve it.

## The two conventions, so they don't get "corrected"

| Term | Swedish | Chinese | Why |
|---|---|---|---|
| **True North** | stays English | stays English | Matches the product catalogues (`packages/i18n`, four keys each in sv and zh) |
| **Operational Space** | stays English | stays English | Same convention |
| **Original 100** | stays English | stays English | Programme name. The old Swedish `Grundarplats` and Chinese `创始` are retired |

## What is deliberately NOT changed

The **founder as a person** survives everywhere: Swedish `grundaren` / `grundarens`
(10 occurrences) and Chinese `创始人` (11 occurrences, including 创始人圆桌, the
Roundtable). Only the *programme* words were retired. If you see `grundaren` or
`创始人` below, that is correct and intentional.

One Swedish coinage did change: the old **`Grundarrunda`** is retired along with the rest
of the `grundar-` programme vocabulary, so the Founder's Roundtable is now
**`grundarens rundabordssamtal`** — which is also better Swedish than the coinage was.
**This one needs Gösta's eye specifically.**

---

## Rows — 81 strings changed or added

### `hero.ctaSecondary`

**EN (reference, v6):**

> Reserve an Original seat

**SV (draft — your pen):**

> Boka en Original-plats

**ZH (draft — your pen):**

> 预定 Original 席位

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `hero.proof.startLabel`

**EN (reference, v6):**

> Original seats — lifetime price-lock + the Founder’s Roundtable

**SV (draft — your pen):**

> Original-platser — livstidslåst pris + grundarens rundabordssamtal

**ZH (draft — your pen):**

> Original 席位 —— 价格永久锁定 + 创始人圆桌

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `platform.items.warroom.title`

**EN (reference, v6):**

> True North

**SV (draft — your pen):**

> True North

**ZH (draft — your pen):**

> True North

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `platform.items.warroom.body`

**EN (reference, v6):**

> Set the True North and the value priorities up top, so every map and every pilot below ties back to what the business actually needs. The CEO, the plant manager and the Lean coach finally read from one shared truth.

**SV (draft — your pen):**

> Sätt True North och värdeprioriteringarna högst upp, så att varje karta och varje pilot under knyter tillbaka till vad verksamheten faktiskt behöver. VD:n, fabrikschefen och lean-coachen läser äntligen från en gemensam sanning.

**ZH (draft — your pen):**

> 把 True North 和价值优先级放在最上面，让下面的每一张地图、每一个试点都能回扣到业务真正需要的东西。CEO、工厂经理和精益教练终于读的是同一份事实。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `whatsComing.originalNote`  · **NEW**

**EN (reference, v6):**

> Reserve an Original seat — 30 days free, then your price locked for life. 100 seats only.

**SV (draft — your pen):**

> Boka en Original-plats — 30 dagar gratis, sedan ditt pris låst för livet. Endast 100 platser.

**ZH (draft — your pen):**

> 预定 Original 席位 —— 30 天免费，之后您的价格永久锁定。仅 100 个席位。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `whatsComing.originalCta`  · **NEW**

**EN (reference, v6):**

> Reserve your seat

**SV (draft — your pen):**

> Boka din plats

**ZH (draft — your pen):**

> 预定您的席位

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `diagnostic.baselineTitle`  · **NEW**

**EN (reference, v6):**

> Write this number down, with today’s date.

**SV (draft — your pen):**

> Skriv ner den här siffran, med dagens datum.

**ZH (draft — your pen):**

> 把这个数字记下来，连同今天的日期。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `diagnostic.baselineBody`  · **NEW**

**EN (reference, v6):**

> In six months you’ll want to know whether it moved.

**SV (draft — your pen):**

> Om sex månader vill du veta om den rört sig.

**ZH (draft — your pen):**

> 六个月后，您会想知道它有没有变化。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.eyebrow.A`  · **NEW**

**EN (reference, v6):**

> Pricing — sales open {salesOpenLong}

**SV (draft — your pen):**

> Priser — försäljningen öppnar {salesOpenLong}

**ZH (draft — your pen):**

> 价格 —— {salesOpenLong}开售

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.eyebrow.B`  · **NEW**

**EN (reference, v6):**

> Pricing — Original 100 closes {closeLong}

**SV (draft — your pen):**

> Priser — Original 100 stänger {closeLong}

**ZH (draft — your pen):**

> 价格 —— Original 100 于{closeLong}截止

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.eyebrow.C`  · **NEW**

**EN (reference, v6):**

> Pricing

**SV (draft — your pen):**

> Priser

**ZH (draft — your pen):**

> 价格

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.headline`

**EN (reference, v6):**

> Four ways to use it. One product, built once.

**SV (draft — your pen):**

> Fyra sätt att använda det. En produkt, byggd en gång.

**ZH (draft — your pen):**

> 四种用法。一个产品，只造一次。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.lead.A`  · **NEW**

**EN (reference, v6):**

> We're not selling yet — we're building. Sales open {salesOpenLong}. Original seats close {closeLong}. A hundred seats, and then the price is just the price.

**SV (draft — your pen):**

> Vi säljer inte än — vi bygger. Försäljningen öppnar {salesOpenLong}. Original-platserna stänger {closeLong}. Hundra platser, sedan är priset bara priset.

**ZH (draft — your pen):**

> 我们还没开卖 —— 我们在造。{salesOpenLong}开售，Original 席位于{closeLong}截止。一百个席位，之后价格就只是价格。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.lead.B`  · **NEW**

**EN (reference, v6):**

> The first 100 pay full price and lock it for life. Original seats are open until {closeLong}. After that the price is just the price.

**SV (draft — your pen):**

> De första 100 betalar fullpris och låser det för livet. Original-platserna är öppna till {closeLong}. Därefter är priset bara priset.

**ZH (draft — your pen):**

> 前 100 位按全价付费，并把这个价格锁定终身。Original 席位开放至{closeLong}。之后价格就只是价格。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.lead.C`  · **NEW**

**EN (reference, v6):**

> Contributor is a person. Consultant is a practice. Process Owner is a team. Architect is a partnership.

**SV (draft — your pen):**

> Contributor är en person. Consultant är en praktik. Process Owner är ett team. Architect är ett partnerskap.

**ZH (draft — your pen):**

> Contributor 是一个人。Consultant 是一间事务所。Process Owner 是一个团队。Architect 是一段合作关系。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.tiers.contributor.audience`

**EN (reference, v6):**

> For the people who do the work

**SV (draft — your pen):**

> För dem som gör jobbet

**ZH (draft — your pen):**

> 给动手做事的人

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.tiers.contributor.desc`

**EN (reference, v6):**

> For the operator, analyst or engineer who wants to map their first process tonight — on their own laptop, with nobody asking permission. Start where the work actually happens.

**SV (draft — your pen):**

> För operatören, analytikern eller ingenjören som vill kartlägga sin första process i kväll — på sin egen laptop, utan att fråga någon om lov. Börja där arbetet faktiskt sker.

**ZH (draft — your pen):**

> 给今晚就想画出第一条流程的操作员、分析师或工程师 —— 用自己的笔记本电脑，不必向谁请示。从工作真正发生的地方开始。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.tiers.contributor.features`

**EN (reference, v6):**

> • 5 active Operational Spaces — five improvement projects running at once
> • Keep every Space you finish — archived Spaces stay free and never count against your five
> • Export to A3 PDF (EN / SV / ZH)
> • AI Sensei — 50 questions a month, top up any time
> • Private workspace — just you
> • Community forum
> • Founder replies within two business days

**SV (draft — your pen):**

> • 5 aktiva Operational Spaces — fem förbättringsprojekt igång samtidigt
> • Behåll varje Space du blir klar med — arkiverade Spaces är gratis och räknas aldrig mot dina fem
> • Export till A3-PDF (EN / SV / ZH)
> • AI Sensei — 50 frågor i månaden, fyll på när du vill
> • Privat arbetsyta — bara du
> • Communityforum
> • Grundaren svarar inom två arbetsdagar

**ZH (draft — your pen):**

> • 5 个活跃 Operational Space —— 五个改善项目同时进行
> • 完成的每个 Space 都留着 —— 归档的 Space 免费，永不占用您的五个额度
> • 导出 A3 PDF（EN / SV / ZH）
> • AI Sensei —— 每月 50 个问题，可随时充值
> • 私人工作区 —— 只有您
> • 社区论坛
> • 创始人在两个工作日内回复

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.tiers.contributor.lock`  · **NEW**

**EN (reference, v6):**

> €19 / month — locked for life if you join by {closeLong}

**SV (draft — your pen):**

> 19 € / månad — låst för livet om du går med senast {closeLong}

**ZH (draft — your pen):**

> 每月 19 € —— 若在{closeLong}前加入即终身锁定

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.tiers.contributor.price`  · **NEW**

**EN (reference, v6):**

> €19 / month

**SV (draft — your pen):**

> 19 € / månad

**ZH (draft — your pen):**

> 每月 19 €

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.tiers.contributor.priceNumber`  · **NEW**

**EN (reference, v6):**

> €19

**SV (draft — your pen):**

> 19 €

**ZH (draft — your pen):**

> 19 €

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.tiers.contributor.cycleNote`  · **NEW**

**EN (reference, v6):**

> An improvement cycle runs 12 to 15 weeks. Five Spaces at once is 17 to 22 projects a year — and the finished ones archive free, so the next five start clean.

**SV (draft — your pen):**

> En förbättringscykel tar 12 till 15 veckor. Fem Spaces samtidigt är 17 till 22 projekt om året — och de färdiga arkiveras gratis, så nästa fem börjar rent.

**ZH (draft — your pen):**

> 一个改善周期需要 12 到 15 周。五个 Space 同时跑，一年就是 17 到 22 个项目 —— 完成的免费归档，下一批五个从干净的状态开始。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.tiers.consultant.audience`

**EN (reference, v6):**

> For the people who coach the work

**SV (draft — your pen):**

> För dem som coachar jobbet

**ZH (draft — your pen):**

> 给辅导他人做事的人

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.tiers.consultant.desc`

**EN (reference, v6):**

> For the independent consultant or lean coach with a first client book. Each client kept separate — walk into the workshop with a live canvas instead of a PowerPoint, for less than an hour of your day rate per month.

**SV (draft — your pen):**

> För den oberoende konsulten eller lean-coachen med en första kundbok. Varje kund hålls separat — gå in i workshoppen med en levande canvas i stället för en PowerPoint, för mindre än en timme av ditt dagsarvode i månaden.

**ZH (draft — your pen):**

> 给刚有了第一批客户的独立顾问或精益教练。每个客户彼此隔离 —— 带着一张活的画布走进工作坊，而不是一份 PowerPoint，每月成本还不到您一小时的日费。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.tiers.consultant.features`

**EN (reference, v6):**

> • Everything in Contributor
> • 5 clients
> • 25 active Operational Spaces, pooled — put 12 on a big plant and 5 on a small one, your call
> • Keep every Space you finish, across every client
> • AI Sensei — 150 questions a month, pooled, top up any time
> • Kaizen tracker with PDCA cycles
> • Founder replies within two business days

**SV (draft — your pen):**

> • Allt i Contributor
> • 5 kunder
> • 25 aktiva Operational Spaces, i en gemensam pott — lägg 12 på en stor fabrik och 5 på en liten, ditt val
> • Behåll varje Space du blir klar med, hos varje kund
> • AI Sensei — 150 frågor i månaden, delad pott, fyll på när du vill
> • Kaizen-tracker med PDCA-cykler
> • Grundaren svarar inom två arbetsdagar

**ZH (draft — your pen):**

> • 包含 Contributor 全部内容
> • 5 个客户
> • 25 个活跃 Operational Space，共享额度 —— 大厂放 12 个、小厂放 5 个，您说了算
> • 每个客户处完成的每个 Space 都留着
> • AI Sensei —— 每月 150 个问题，共享额度，可随时充值
> • 带 PDCA 循环的改善追踪
> • 创始人在两个工作日内回复

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.tiers.consultant.lock`  · **NEW**

**EN (reference, v6):**

> €69 / month — locked for life if you join by {closeLong}

**SV (draft — your pen):**

> 69 € / månad — låst för livet om du går med senast {closeLong}

**ZH (draft — your pen):**

> 每月 69 € —— 若在{closeLong}前加入即终身锁定

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.tiers.consultant.price`  · **NEW**

**EN (reference, v6):**

> €69 / month

**SV (draft — your pen):**

> 69 € / månad

**ZH (draft — your pen):**

> 每月 69 €

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.tiers.consultant.priceNumber`  · **NEW**

**EN (reference, v6):**

> €69

**SV (draft — your pen):**

> 69 €

**ZH (draft — your pen):**

> 69 €

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.tiers.processOwner.audience`

**EN (reference, v6):**

> For the people who own the process

**SV (draft — your pen):**

> För dem som äger processen

**ZH (draft — your pen):**

> 给拥有这条流程的人

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.tiers.processOwner.price`  · **NEW**

**EN (reference, v6):**

> €249 / month

**SV (draft — your pen):**

> 249 € / månad

**ZH (draft — your pen):**

> 每月 249 €

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.tiers.processOwner.desc`

**EN (reference, v6):**

> For the manager or team that owns a process end to end — across departments, sites or shifts. One flat fee. No procurement headache. Shared canvases, real roles, one source of truth instead of a folder of screenshots.

**SV (draft — your pen):**

> För chefen eller teamet som äger en process från början till slut — över avdelningar, siter eller skift. En fast avgift. Inget upphandlingskrångel. Delade canvasar, riktiga roller, en sanning i stället för en mapp med skärmdumpar.

**ZH (draft — your pen):**

> 给端到端拥有一条流程的经理或团队 —— 跨部门、跨厂区、跨班次。一笔固定费用。没有采购的麻烦。共享画布、真实角色，一个统一事实来源，而不是一堆截图。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.tiers.processOwner.note`  · **NEW**

**EN (reference, v6):**

> Not available at launch. We’re building the team side properly rather than shipping a seat count we can’t yet honour. Tell me you want it and you’ll be first in the queue — at the Original rate.

**SV (draft — your pen):**

> Inte tillgänglig vid lanseringen. Vi bygger teamdelen ordentligt i stället för att skeppa ett platsantal vi ännu inte kan hålla. Säg till att du vill ha den så står du först i kön — till Original-pris.

**ZH (draft — your pen):**

> 发布时暂不可用。我们宁愿把团队侧做扎实，也不愿先放出一个还兑现不了的席位数。告诉我您想要，您就排在队首 —— 并享有 Original 价格。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.tiers.processOwner.cta`

**EN (reference, v6):**

> Join the Process Owner queue

**SV (draft — your pen):**

> Ställ dig i kön för Process Owner

**ZH (draft — your pen):**

> 加入 Process Owner 排队

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.tiers.architect.audience`

**EN (reference, v6):**

> For the people who design the system

**SV (draft — your pen):**

> För dem som designar systemet

**ZH (draft — your pen):**

> 给设计这套系统的人

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.tiers.architect.desc`

**EN (reference, v6):**

> For the continuous-improvement lead, business architect or external partner running LeanTheCompany across many teams or clients. Multi-workspace, full white-label, with a clean handoff at the end.

**SV (draft — your pen):**

> För förbättringsledaren, verksamhetsarkitekten eller den externa partnern som kör LeanTheCompany över många team eller kunder. Flera arbetsytor, full white-label, med en ren överlämning på slutet.

**ZH (draft — your pen):**

> 给在多个团队或多个客户处推行 LeanTheCompany 的持续改善负责人、业务架构师或外部合作伙伴。多工作区、完整白标，并在结束时干净地交接。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.tiers.architect.note`  · **NEW**

**EN (reference, v6):**

> Architect isn’t a subscription tier — it’s a partnership, and it’s priced as one. Revenue share on every seat you refer, multi-workspace across clients or business units, white-label export with no LeanTheCompany mark, workspace handoff to a Contributor seat, and a direct line to me.

**SV (draft — your pen):**

> Architect är ingen prenumerationsnivå — det är ett partnerskap, och det prissätts som ett. Intäktsdelning på varje plats du hänvisar, flera arbetsytor över kunder eller affärsenheter, white-label-export utan LeanTheCompany-märke, överlämning av arbetsytan till en Contributor-plats, och en direktlinje till mig.

**ZH (draft — your pen):**

> Architect 不是订阅方案 —— 它是一段合作关系，也按合作关系定价。您推荐的每个席位都有收入分成、跨客户或业务单元的多工作区、不带 LeanTheCompany 标识的白标导出、把工作区交接给 Contributor 席位，以及一条直接找到我的通道。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.tiers.architect.note2`  · **NEW**

**EN (reference, v6):**

> We’re opening applications after launch. If you’re running Lean inside a consultancy, an OEM academy or a university programme, tell me now and you’ll be first in the queue.

**SV (draft — your pen):**

> Vi öppnar ansökningarna efter lanseringen. Kör du Lean inom en konsultfirma, en OEM-akademi eller ett universitetsprogram — säg till nu så står du först i kön.

**ZH (draft — your pen):**

> 我们将在发布后开放申请。如果您在一家咨询公司、一所 OEM 学院或一个大学项目里推行精益，现在就告诉我，您会排在队首。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.tiers.architect.cta`

**EN (reference, v6):**

> Apply for the partner track

**SV (draft — your pen):**

> Ansök till partnerspåret

**ZH (draft — your pen):**

> 申请合作伙伴通道

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.form.thanksTitle`

**EN (reference, v6):**

> Seat reserved.

**SV (draft — your pen):**

> Plats reserverad.

**ZH (draft — your pen):**

> 席位已预定。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.form.thanksBody`

**EN (reference, v6):**

> I’ll email you the moment we open access — and you’ll be in the Original 100. No drip emails in between.

**SV (draft — your pen):**

> Jag mejlar dig så fort vi öppnar åtkomsten — och du är med i Original 100. Inga utskick däremellan.

**ZH (draft — your pen):**

> 我们一开放您就会收到邮件 —— 而且您已经在 Original 100 名单里。中间不会有任何骚扰邮件。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.space.headline`  · **NEW**

**EN (reference, v6):**

> One Space, one process, seen properly.

**SV (draft — your pen):**

> Ett Space, en process, ordentligt sedd.

**ZH (draft — your pen):**

> 一个 Space，一条流程，看个明白。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.space.p1`  · **NEW**

**EN (reference, v6):**

> An Operational Space is one business process — mapped as it actually runs today, and as it should run instead.

**SV (draft — your pen):**

> Ett Operational Space är en affärsprocess — kartlagd som den faktiskt fungerar idag, och som den borde fungera i stället.

**ZH (draft — your pen):**

> 一个 Operational Space 就是一条业务流程 —— 既画出它今天实际如何运行，也画出它本该如何运行。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.space.p2`  · **NEW**

**EN (reference, v6):**

> You map the office flow with a Makigami and the material flow with a value stream map. You mark where the time really goes. Then you draw the future state, and the kaizen cards are the work that gets you from one to the other.

**SV (draft — your pen):**

> Du kartlägger kontorsflödet med en Makigami och materialflödet med en värdeflödesanalys. Du markerar var tiden faktiskt tar vägen. Sedan ritar du det framtida läget, och kaizenkorten är arbetet som tar dig från det ena till det andra.

**ZH (draft — your pen):**

> 您用 Makigami 画办公流，用价值流图画物料流，标出时间到底花在哪里。然后画出未来状态，而改善卡就是把您从前者带到后者的那些工作。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.space.p3`  · **NEW**

**EN (reference, v6):**

> One Space holds all of it, including the record of what you tried and what happened. Add another Space for the next process. That is the whole system.

**SV (draft — your pen):**

> Ett Space rymmer allt, inklusive noteringen om vad du provade och vad som hände. Lägg till ett Space till för nästa process. Det är hela systemet.

**ZH (draft — your pen):**

> 一个 Space 装得下全部内容，包括您试过什么、结果如何的记录。下一条流程，就再加一个 Space。整套系统就是这样。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.archive.headline`  · **NEW**

**EN (reference, v6):**

> A Space doesn't get abandoned. It graduates.

**SV (draft — your pen):**

> Ett Space överges inte. Det tar examen.

**ZH (draft — your pen):**

> 一个 Space 不会被丢下，它是毕业了。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.archive.p1`  · **NEW**

**EN (reference, v6):**

> Your plan sets how many Spaces you can work in at once. It does not set how many you can keep.

**SV (draft — your pen):**

> Din plan avgör hur många Spaces du kan arbeta i samtidigt. Den avgör inte hur många du får behålla.

**ZH (draft — your pen):**

> 您的方案决定您能同时在多少个 Space 里工作，不决定您能保留多少个。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.archive.p2`  · **NEW**

**EN (reference, v6):**

> When a process is good enough and stable enough to run without you, that Space is finished — so you archive it. It stays readable, printable, exportable, and it never counts against your active limit again. Bring it back whenever you want. Nothing is ever deleted.

**SV (draft — your pen):**

> När en process är tillräckligt bra och tillräckligt stabil för att gå utan dig är det Spacet färdigt — så du arkiverar det. Det förblir läsbart, utskrivbart och exporterbart, och det räknas aldrig mot din aktiva gräns igen. Ta tillbaka det när du vill. Ingenting raderas någonsin.

**ZH (draft — your pen):**

> 当一条流程已经足够好、足够稳定，不需要您也能运转，那个 Space 就完成了 —— 于是您把它归档。它依然可读、可打印、可导出，而且再也不占用您的活跃额度。想调回来随时可以。任何东西都不会被删除。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.archive.p3`  · **NEW**

**EN (reference, v6):**

> Keep everything you finish. And if you stop subscribing, you keep read-only access to all of it for two years, with export available the whole time. We’ll remind you before anything goes.

**SV (draft — your pen):**

> Behåll allt du blir klar med. Och om du slutar prenumerera behåller du läsrättigheter till allt i två år, med export tillgänglig hela tiden. Vi påminner dig innan något försvinner.

**ZH (draft — your pen):**

> 您完成的一切都留着。即使您停止订阅，仍可只读访问全部内容两年，其间导出始终可用。在任何东西被清理前，我们都会提醒您。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.archive.p4`  · **NEW**

**EN (reference, v6):**

> You did the work. It’s yours.

**SV (draft — your pen):**

> Du gjorde jobbet. Det är ditt.

**ZH (draft — your pen):**

> 活是您干的，东西就是您的。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.comparison.headline`  · **NEW**

**EN (reference, v6):**

> You could do this on a whiteboard. People try.

**SV (draft — your pen):**

> Du skulle kunna göra det här på en whiteboard. Folk försöker.

**ZH (draft — your pen):**

> 这些事您也可以在白板上做。有人试过。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.comparison.p1`  · **NEW**

**EN (reference, v6):**

> Miro, Lucidchart, a PowerPoint template — €5 to €9 a month for shapes and arrows. They're good tools. They just don't know anything.

**SV (draft — your pen):**

> Miro, Lucidchart, en PowerPoint-mall — 5 till 9 euro i månaden för former och pilar. Bra verktyg. De vet bara ingenting.

**ZH (draft — your pen):**

> Miro、Lucidchart、一个 PowerPoint 模板 —— 每月 5 到 9 欧元，买的是形状和箭头。都是好工具，只是它们什么都不懂。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.comparison.p2`  · **NEW**

**EN (reference, v6):**

> A blank canvas doesn't know what a value stream is. It won't tell you your Makigami has a handoff loop in it, it won't turn the map into an A3 your steering group will actually read, and it won't still be there in eleven months when the consultant has gone and nobody remembers why the board was drawn that way. And when you stop paying for one of those, your boards go read-only and you're told to delete some to get back in. We don't do that. Archive what you finish, keep it forever, and if you leave you still have two years and an export button.

**SV (draft — your pen):**

> En tom canvas vet inte vad ett värdeflöde är. Den säger inte att din Makigami har en överlämningsloop i sig, den gör inte kartan till en A3 som din styrgrupp faktiskt läser, och den finns inte kvar om elva månader när konsulten är borta och ingen minns varför tavlan ritades som den gjordes. Och när du slutar betala för ett av dem blir dina tavlor skrivskyddade och du blir ombedd att radera några för att komma in igen. Så gör inte vi. Arkivera det du blir klar med, behåll det för alltid, och om du lämnar har du fortfarande två år och en exportknapp.

**ZH (draft — your pen):**

> 一张空白画布不知道什么是价值流。它不会告诉您 Makigami 里有一个交接回路，不会把地图变成您的指导委员会真会读的 A3，也不会在十一个月后还在那里 —— 那时顾问已经走了，没人记得当初为什么那样画。而当您不再为它们付费，您的板会变成只读，还会被要求删掉几块才能再进去。我们不这么干。完成的就归档，永久保留；即便您离开，仍有两年时间和一个导出按钮。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.comparison.p3`  · **NEW**

**EN (reference, v6):**

> That's the difference. Not the canvas — what the canvas knows, and whether it's still yours.

**SV (draft — your pen):**

> Det är skillnaden. Inte canvasen — vad canvasen vet, och om den fortfarande är din.

**ZH (draft — your pen):**

> 差别就在这里。不在画布本身 —— 而在画布懂什么，以及它是否仍然属于您。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.original.eyebrow.A`  · **NEW**

**EN (reference, v6):**

> Original 100 · opens {salesOpenLong}

**SV (draft — your pen):**

> Original 100 · öppnar {salesOpenLong}

**ZH (draft — your pen):**

> Original 100 · {salesOpenLong}开启

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.original.eyebrow.B`  · **NEW**

**EN (reference, v6):**

> Original 100

**SV (draft — your pen):**

> Original 100

**ZH (draft — your pen):**

> Original 100

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.original.headline`  · **NEW**

**EN (reference, v6):**

> Be one of the first 100. Pay full price. Lock that price for life.

**SV (draft — your pen):**

> Bli en av de första 100. Betala fullpris. Lås det priset för livet.

**ZH (draft — your pen):**

> 成为前 100 位。按全价付费。把这个价格锁定终身。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.original.bodyA.p1`  · **NEW**

**EN (reference, v6):**

> We're not selling yet — we're building. Sales open {salesOpenLong}. Original seats close {closeLong}. A hundred seats, and then the price is just the price.

**SV (draft — your pen):**

> Vi säljer inte än — vi bygger. Försäljningen öppnar {salesOpenLong}. Original-platserna stänger {closeLong}. Hundra platser, sedan är priset bara priset.

**ZH (draft — your pen):**

> 我们还没开卖 —— 我们在造。{salesOpenLong}开售，Original 席位于{closeLong}截止。一百个席位，之后价格就只是价格。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.original.bodyA.p2`  · **NEW**

**EN (reference, v6):**

> The beta is open now and it’s free until {closeLong}. Beta members get first call on an Original seat when sales open.

**SV (draft — your pen):**

> Betan är öppen nu och den är gratis till {closeLong}. Betamedlemmar får förtur till en Original-plats när försäljningen öppnar.

**ZH (draft — your pen):**

> 公测现已开放，到{closeLong}前免费。开售时，公测成员优先获得 Original 席位。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.original.bodyB.p1`  · **NEW**

**EN (reference, v6):**

> Original seats are open until {closeLong}. After that the price is just the price.

**SV (draft — your pen):**

> Original-platserna är öppna till {closeLong}. Därefter är priset bara priset.

**ZH (draft — your pen):**

> Original 席位开放至{closeLong}。之后价格就只是价格。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.original.bodyB.p2`  · **NEW**

**EN (reference, v6):**

> Original Subscribers get 30 days free, then pay their tier’s full rate — and that rate never moves for as long as the subscription runs. You also get a standing seat at the Founder’s Roundtable with me, your company on the Original 100 honour roll (with permission), and first call on every new module before it ships.

**SV (draft — your pen):**

> Original-prenumeranter får 30 dagar gratis och betalar sedan sin nivås fulla pris — och det priset rör sig aldrig så länge prenumerationen löper. Du får också en stående plats vid grundarens rundabordssamtal med mig, ditt företag på hederslistan för Original 100 (med tillstånd), och förtur till varje ny modul innan den släpps.

**ZH (draft — your pen):**

> Original 订阅者获得 30 天免费，之后按各自方案的全价付费 —— 只要订阅不中断，这个价格永远不变。您还将获得与我同席的创始人圆桌常设席位、经您授权后出现在 Original 100 荣誉榜上的公司名，以及每个新模块发布前的优先体验权。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.original.bodyB.p3`  · **NEW**

**EN (reference, v6):**

> We chose privilege over discount because customers who pay full price build a sharper product. Cancel any time — no long-term commitment from your side, only the price-lock from ours.

**SV (draft — your pen):**

> Vi valde privilegium framför rabatt, eftersom kunder som betalar fullpris bygger en skarpare produkt. Säg upp när du vill — ingen långsiktig bindning från din sida, bara prislåset från vår.

**ZH (draft — your pen):**

> 我们选择特权而非折扣，因为按全价付费的客户会把产品打磨得更锋利。随时可取消 —— 您这边没有长期绑定，只有我们这边的价格锁定。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.original.chipSalesOpen`  · **NEW**

**EN (reference, v6):**

> Sales open {salesOpenLong}

**SV (draft — your pen):**

> Försäljningen öppnar {salesOpenLong}

**ZH (draft — your pen):**

> {salesOpenLong}开售

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.original.chipClose`  · **NEW**

**EN (reference, v6):**

> Original 100 closes {closeLong}

**SV (draft — your pen):**

> Original 100 stänger {closeLong}

**ZH (draft — your pen):**

> Original 100 于{closeLong}截止

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.original.countdown`  · **NEW**

**EN (reference, v6):**

> Closes {closeLong} · {days} days left

**SV (draft — your pen):**

> Stänger {closeLong} · {days} dagar kvar

**ZH (draft — your pen):**

> {closeLong}截止 · 还剩 {days} 天

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.priceLock.title`  · **NEW**

**EN (reference, v6):**

> What the price lock covers.

**SV (draft — your pen):**

> Vad prislåset omfattar.

**ZH (draft — your pen):**

> 价格锁定涵盖什么。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.priceLock.body`  · **NEW**

**EN (reference, v6):**

> Your Original rate is locked on the tier you joined, for as long as your subscription runs without a break. Change tier and the new tier is charged at its then-current rate — with your Original Subscriber status carried across. Let the subscription lapse and the lock ends with it. Original Subscriber status belongs to you or your company, and doesn’t transfer in a sale. Add-ons — extra clients, extra Spaces, Sensei top-ups — are charged at their price when you add them.

**SV (draft — your pen):**

> Ditt Original-pris är låst på den nivå du gick med på, så länge din prenumeration löper utan avbrott. Byter du nivå debiteras den nya nivån till sitt då gällande pris — med din status som Original-prenumerant med dig. Låter du prenumerationen upphöra tar låset slut med den. Statusen som Original-prenumerant tillhör dig eller ditt företag och följer inte med vid en försäljning. Tillägg — fler klienter, fler Spaces, Sensei-påfyllningar — debiteras till sitt pris när du lägger till dem.

**ZH (draft — your pen):**

> 您的 Original 价格锁定在您加入时所选的方案上，只要订阅不中断即持续有效。更换方案时，新方案按其当时价格计费 —— 但您的 Original 订阅者身份会一并带过去。若订阅中断，锁定也随之结束。Original 订阅者身份属于您本人或贵公司，不随公司出售而转让。加购项 —— 更多客户、更多 Space、Sensei 充值 —— 均按加购当时的价格计费。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.badges.comingSoon`  · **NEW**

**EN (reference, v6):**

> Coming soon

**SV (draft — your pen):**

> Kommer snart

**ZH (draft — your pen):**

> 即将推出

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.badges.partnerTrack`  · **NEW**

**EN (reference, v6):**

> Partner track

**SV (draft — your pen):**

> Partnerspår

**ZH (draft — your pen):**

> 合作伙伴通道

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.badges.stateA`  · **NEW**

**EN (reference, v6):**

> Open beta · sales open {salesOpenShort}

**SV (draft — your pen):**

> Öppen beta · försäljning öppnar {salesOpenShort}

**ZH (draft — your pen):**

> 公开测试 · {salesOpenShort}开售

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.badges.stateB`  · **NEW**

**EN (reference, v6):**

> Original 100 · closes {closeShort}

**SV (draft — your pen):**

> Original 100 · stänger {closeShort}

**ZH (draft — your pen):**

> Original 100 · {closeShort}截止

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.cta.A`  · **NEW**

**EN (reference, v6):**

> Start the open beta

**SV (draft — your pen):**

> Starta den öppna betan

**ZH (draft — your pen):**

> 开始公开测试

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.cta.B`  · **NEW**

**EN (reference, v6):**

> Become an Original Subscriber

**SV (draft — your pen):**

> Bli Original-prenumerant

**ZH (draft — your pen):**

> 成为 Original 订阅者

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.cta.C`  · **NEW**

**EN (reference, v6):**

> Start your 30 days

**SV (draft — your pen):**

> Starta dina 30 dagar

**ZH (draft — your pen):**

> 开始您的 30 天

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.microcopy.A`  · **NEW**

**EN (reference, v6):**

> Free while the beta runs. Sales open {salesOpenLong}.

**SV (draft — your pen):**

> Gratis så länge betan pågår. Försäljningen öppnar {salesOpenLong}.

**ZH (draft — your pen):**

> 公测期间免费。{salesOpenLong}开售。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.microcopy.B`  · **NEW**

**EN (reference, v6):**

> 30 days free, then {price}/month — locked for life. Your first charge is 30 days after you join. We’ll email you before it happens.

**SV (draft — your pen):**

> 30 dagar gratis, sedan {price}/månad — låst för livet. Din första debitering sker 30 dagar efter att du gått med. Vi mejlar dig innan det händer.

**ZH (draft — your pen):**

> 30 天免费，之后每月 {price} —— 终身锁定。首次扣款在您加入 30 天后，扣款前我们会先发邮件。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.microcopy.C`  · **NEW**

**EN (reference, v6):**

> 30 days free, then {price}/month. Your first charge is 30 days after you join. We’ll email you before it happens.

**SV (draft — your pen):**

> 30 dagar gratis, sedan {price}/månad. Din första debitering sker 30 dagar efter att du gått med. Vi mejlar dig innan det händer.

**ZH (draft — your pen):**

> 30 天免费，之后每月 {price}。首次扣款在您加入 30 天后，扣款前我们会先发邮件。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.consultantNote`  · **NEW**

**EN (reference, v6):**

> Consultant is five Contributor licences in one. Bought separately they’d be €95.

**SV (draft — your pen):**

> Consultant är fem Contributor-licenser i en. Köpta var för sig hade de kostat 95 €.

**ZH (draft — your pen):**

> Consultant 相当于五个 Contributor 授权合在一起。分开买要 95 €。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.addOns`  · **NEW**

**EN (reference, v6):**

> Growing? Add a client for €12/month — five more Spaces come with it. Need more room on the clients you have? +5 Spaces for €6/month. Sensei top-ups are €12 per 100 questions, and credits never expire.

**SV (draft — your pen):**

> Växer du? Lägg till en kund för 12 €/månad — fem Spaces till följer med. Behöver du mer utrymme hos kunderna du har? +5 Spaces för 6 €/månad. Sensei-påfyllningar kostar 12 € per 100 frågor, och krediterna förfaller aldrig.

**ZH (draft — your pen):**

> 在成长？每月 12 € 加一个客户 —— 附带五个 Space。现有客户那边需要更多空间？每月 6 € 加 5 个 Space。Sensei 充值每 100 个问题 12 €，额度永不过期。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.annualNote`  · **NEW**

**EN (reference, v6):**

> Annual billing arrives after launch. Original Subscribers get first call — and your locked price comes with you.

**SV (draft — your pen):**

> Årsvis fakturering kommer efter lanseringen. Original-prenumeranter får förtur — och ditt låsta pris följer med.

**ZH (draft — your pen):**

> 年付将在发布后推出。Original 订阅者优先 —— 您锁定的价格也一并带过去。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `pricing.responseBound`  · **NEW**

**EN (reference, v6):**

> Founder replies within two business days — Monday to Friday, excluding Swedish public holidays and the July period.

**SV (draft — your pen):**

> Grundaren svarar inom två arbetsdagar — måndag till fredag, utom svenska helgdagar och juliperioden.

**ZH (draft — your pen):**

> 创始人在两个工作日内回复 —— 周一至周五，瑞典公共假日与七月假期除外。

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---

### `finalCta.ctaSecondary`

**EN (reference, v6):**

> Reserve an Original seat

**SV (draft — your pen):**

> Boka en Original-plats

**ZH (draft — your pen):**

> 预定 Original 席位

| | verdict | Your correction |
|---|---|---|
| SV | ☐ OK  ☐ change | |
| ZH | ☐ OK  ☐ change | |

---


*Generated from the branch diff against `main`, not from a summary — every row above is a string that actually changed in this PR.*
