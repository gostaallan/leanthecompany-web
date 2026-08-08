# 091 — Locale review sheet

**This PR does not merge on a green build.** Two people mark this file up first:
**Gösta reads the Swedish, his wife reads the Chinese.** Then the marks get applied and
the branch is re-pushed.

**Why the sheet exists.** Reviewing three JSON files in a diff is the wrong shape for
pricing copy. Everything changed is below, one row per key, side by side. GTM Handover
006 and 007 supply **English only** — so every Swedish and Chinese string here is a first
draft by definition, and the review is the quality gate, not a formality.

**Book it by 3 September.** The page has to be live on 8 September because Post 13 links
to it, so the review is on the critical path, not the code.

## How to mark it up

Edit the **Note** column in place, or add a line under the row:

- `OK` — leave it
- `→ <new text>` — replace with this
- `?` — I'm not sure, talk to me

Anything you leave untouched ships as written.

## Three rules that governed the translation, so you know what you're reading

1. **Legal-adjacent strings are literal, not idiomatic.** The price-lock small print, the
   dated "locked for life" lines, the two-business-day bound and the cancellation wording.
   A smoother sentence that shifts the meaning one degree is a worse outcome than a stiff
   one. These rows are marked.
2. **Dates are never an English string in a Swedish or Chinese sentence.** They render from
   one config value as `1 October` · `1 oktober` · `10月1日`. If a date reads wrong, the fix
   is in the sentence around it, not the date.
3. **`€` in every locale, `kr` in none.** Ruling 078 R1 is EUR-only. Do not convert, do not
   add an approximate local amount.

**Not translated, by rule:** LeanTheCompany · LTC-OS · Sensei · Chaos Score · A3 · VSM ·
Makigami · Kaizen · Gemba.

---

## Three Chinese decisions taken before the sheet — read these first

These were ruled on 2026-08-08 so that the review is *"does this read naturally"* rather
than *"which word is right"*. If you disagree with a ruling, say so — but the reasoning is
here so you're not re-deciding it from scratch.

### 1 · Sensei — the site said `老师傅`, the app says `Sensei`

The platform's own Chinese bundle uses **`Sensei` 28 times and `老师傅` zero**. This site
used **`老师傅` 12 times and `Sensei` zero**. That is a product name split across two
surfaces, not a translation choice — a customer who reads the pricing page and then signs
in meets two different names for the same thing.

**Applied:** the site now says `Sensei`, with `老师傅` kept as a gloss on **first mention
only** — `Sensei（老师傅）` in `hero.lead` — and plain `Sensei` everywhere after.

**What to check:** does the gloss read naturally in that sentence, or does it interrupt it?
And see the two rows for `hero.founderTitle` / `about.title` — those are **Gösta's own
title**, not the product, and `创始人 · Sensei` may read colder than `创始人 · 老师傅`.
That one wants an explicit call.

### 2 · 你 → 您

The app is 您 ×7 against 你 ×2; the site was mixed, sometimes inside the same section.
**Applied site-wide: 您.** 13 strings changed, including some outside the pricing block
(`forWhom`, `problem`, `platform`, `gembaDrill`).

**What to check:** `gembaDrill.eyebrow` — "测测您自己" for "Test yourself" is correct but
formal for what is meant to be a quick self-test. Flag it if it reads stiff.

### 3 · Kaizen stays `改善`

Rule 5 says don't translate Kaizen, but the app has only **one** occurrence, so there is no
clear precedent to match — and `改善` is the standard Chinese rendering, not a loose
paraphrase. **Left as `改善` and put to you rather than changed.** If it should be `Kaizen`,
say so and it changes in one pass.

### Also noticed, not changed

- The Chinese file mixes punctuation styles: most of it uses a half-width comma `,` with a
  full-width period `。`, but the `gembaDrill` section (from the Chaos Score work) uses
  full-width `，`. The new pricing copy **matches the majority style** so the page doesn't
  switch mid-scroll. Worth settling for the whole file at some point — not in this PR.

---

## What changed

### Page frame

| Key | EN | SV | ZH | Note / uncertainty |
|---|---|---|---|---|
| `eyebrow.A` | What's coming | På väg | 即将上线 |  |
| `eyebrow.B` | Pricing | Priser | 价格 |  |
| `eyebrow.C` | Pricing | Priser | 价格 |  |
| `headline` | One product, built once. Four rungs — two of them open today. | En produkt, byggd en gång. Fyra steg — två av dem öppna idag. | 一个产品,一次造好。四个梯级——其中两个今天已开放。 | **SV/ZH — please rule.** GTM 007 §2 offered a shorter alternative if the primary reads long. "Rungs" is a ladder metaphor: SV uses `steg` (steps) because `pinnar` (literal rungs) reads odd standalone; ZH uses `梯级`, which keeps the ladder. If either reads clumsy, the alternative is *"One product, built once. Start on the rung you're on."* |
| `lead.A` | We're not selling yet — we're building. Sales open {salesOpenLong}. The first 100 founding members pay full price and lock that price for life. Privilege, not discount. | Vi säljer inte ännu — vi bygger. Försäljningen öppnar {salesOpenLong}. De första 100 grundarmedlemmarna betalar fullt pris och låser det priset för livet. Privilegium, inte rabatt. | 我们还没开始卖——我们在造。{salesOpenLong}开始销售。前 100 位创始会员按原价付费,并将该价格永久锁定。是特权,而非折扣。 |  |
| `lead.B` | Sales are open. The first 100 founding members pay full price and lock that price for life — seats close {closeLong}. Privilege, not discount. | Försäljningen är öppen. De första 100 grundarmedlemmarna betalar fullt pris och låser det priset för livet — platserna stänger {closeLong}. Privilegium, inte rabatt. | 销售已开放。前 100 位创始会员按原价付费,并将该价格永久锁定——席位于{closeLong}关闭。是特权,而非折扣。 |  |
| `lead.C` | Thirty days free, then pay for the rung you're on. Cancel any time. | Trettio dagar gratis, sedan betalar du för det steg du står på. Säg upp när du vill. | 30 天免费,之后按您所在的梯级付费。可随时取消。 | SV `det steg du står på` and ZH `您所在的梯级` must match whatever `headline` settles on. |

### Badges

| Key | EN | SV | ZH | Note / uncertainty |
|---|---|---|---|---|
| `badges.stateA` | Open beta · sales open {salesOpenShort} | Öppen beta · försäljningen öppnar {salesOpenShort} | 公开测试 · {salesOpenShort}开始销售 | SV renders as `15 sep.` — Swedish abbreviates with a trailing full stop, which looks odd inside an uppercased badge. Long form `15 september` is the alternative. **SV call.** |
| `badges.stateB` | Founding 100 · closes {closeShort} | De första 100 · stänger {closeShort} | 创始 100 · {closeShort}关闭 | SV renders `1 okt.` — same trailing-stop question. Also: the badge says `De första 100` while `founding.bodyB.p2` keeps `Founding 100-hederslistan` as a proper noun. Deliberate (the honour roll is a name, the badge is a description) but **worth confirming**. |
| `badges.comingSoon` | Coming soon | Kommer snart | 即将推出 |  |
| `badges.partnerTrack` | Partner track · applications open after launch | Partnerspår · ansökningar öppnar efter lansering | 合作伙伴通道 · 上线后开放申请 | SV `Partnerspår` is a coinage — no settled Swedish term for a partner track. ZH `合作伙伴通道`. **Both worth a look.** |

### Comparison block (new — GTM 003 §5)

| Key | EN | SV | ZH | Note / uncertainty |
|---|---|---|---|---|
| `comparison.headline` | You could do this on a whiteboard. People try. | Du skulle kunna göra det här på en whiteboard. Folk försöker. | 您也可以用白板做这件事。确实有人试过。 | ZH `确实有人试过` = "people really have tried it" — carries the dry tone of the English. Check it does not read sarcastic. |
| `comparison.p1` | Miro, Lucidchart, a PowerPoint template — €5 to €9 a month for shapes and arrows. They’re good tools. They just don’t know anything. | Miro, Lucidchart, en PowerPoint-mall — €5 till €9 i månaden för former och pilar. Det är bra verktyg. De vet bara ingenting. | Miro、Lucidchart、一个 PowerPoint 模板——每月 €5 到 €9,买的是形状和箭头。它们是好工具。只是它们什么都不懂。 |  |
| `comparison.p2` | A blank canvas doesn't know what a value stream is. It won't tell you your Makigami has a handoff loop in it, it won't turn the map into an A3 your steering group will actually read, and it won't still be there in eleven months when the consultant has gone and nobody remembers why the board was drawn that way. | En tom canvas vet inte vad ett värdeflöde är. Den säger inte att din Makigami har en överlämningsloop i sig, den gör inte kartan till ett A3 som din styrgrupp faktiskt läser, och den står inte kvar om elva månader när konsulten är borta och ingen minns varför tavlan ritades som den gjordes. | 一张空白画布不知道什么是价值流。它不会告诉您 Makigami 里有一个交接回路,不会把地图变成指导小组真正会读的 A3,也不会在十一个月后还在那里——那时顾问已经走了,没人记得当初为什么那样画。 | The durability claim (`eleven months`). GTM 005 §4 flags it as a promise the product has to keep. SV `överlämningsloop` and ZH `交接回路` are both coinages for "handoff loop" — **check against how you actually say it on the floor.** |
| `comparison.p3` | That's the whole difference. Not the canvas — what the canvas knows. | Det är hela skillnaden. Inte canvasen — utan vad canvasen vet. | 这就是全部的差别。不在于画布,而在于画布懂什么。 | SV adds `utan` ("Inte canvasen — utan vad canvasen vet"); the English has no equivalent word. Without it the Swedish is ungrammatical, but it does soften the snap of the original. **SV call.** |

### Founding block

| Key | EN | SV | ZH | Note / uncertainty |
|---|---|---|---|---|
| `founding.eyebrow.A` | Founding 100 · opens {salesOpenLong} | De första 100 · öppnar {salesOpenLong} | 创始 100 · {salesOpenLong}开放 |  |
| `founding.eyebrow.B` | Founding 100 | De första 100 | 创始 100 |  |
| `founding.headline` | Be one of the first 100. Pay full price. Lock that price for life. | Bli en av de första 100. Betala fullt pris. Lås det priset för livet. | 成为前 100 位创始会员。原价付费。永久锁定该价格。 |  |
| `founding.bodyA.p1` | We're not selling yet — we're building. Sales open {salesOpenLong}. Founding seats close {closeLong}. One hundred seats, and then the price is just the price. | Vi säljer inte ännu — vi bygger. Försäljningen öppnar {salesOpenLong}. Grundarplatserna stänger {closeLong}. Etthundra platser, och sedan är priset bara priset. | 我们还没开始卖——我们在造。{salesOpenLong}开始销售。创始席位于{closeLong}关闭。一百个席位,之后价格就只是价格。 | GTM 003 §2 read *"Sixteen days, one hundred seats…"*. The day count is deleted per 006 §6 (it was 17, not 16, and the date converts better than the count). All three locales carry the deletion. |
| `founding.bodyA.p2` | The beta is open now and it's free until {closeLong}. Beta members get first call on a founding seat when sales open. | Betan är öppen nu och den är gratis till {closeLong}. Betamedlemmar får första tjing på en grundarplats när försäljningen öppnar. | 测试版现在已开放,到{closeLong}为止免费。销售开放时,测试版会员优先获得创始席位。 |  |
| `founding.bodyB.p1` | Founding seats are open until {closeLong}. After that the price is just the price. | Grundarplatserna är öppna till {closeLong}. Därefter är priset bara priset. | 创始席位开放至{closeLong}。之后价格就只是价格。 |  |
| `founding.bodyB.p2` | Founding members get 30 days free, then pay their tier’s full rate — and that rate never moves for as long as the subscription runs. You also get a standing seat at the Founders’ Roundtable with me, your company on the Founding 100 honour roll (with permission), and first call on every new module before it ships. | Grundarmedlemmar får 30 dagar gratis och betalar sedan sin nivås fulla pris — och det priset rör sig aldrig så länge prenumerationen löper. Du får också en stående plats vid Grundarrundan med mig, ditt företag på Founding 100-hederslistan (med ditt godkännande), och första tjing på varje ny modul innan den lanseras. | 创始会员获得 30 天免费试用,之后按各自梯级的全价付费——只要订阅不中断,该价格永远不变。您还将获得创始人圆桌会的常设席位(与我同席);经您授权,贵公司将出现在 Founding 100 荣誉墙上;每个新模块上线前率先体验。 | **Conflict 2 fixed here** — was "a quarterly Founders' Roundtable", now "a standing seat". SV `en stående plats vid Grundarrundan`, ZH `创始人圆桌会的常设席位`. ZH also drops the old `(与我视频)` ("by video") in favour of `(与我同席)` — no video promise is made anywhere else. **Check.** |
| `founding.bodyB.p3` | We chose privilege over discount because customers who pay full price build a sharper product. Cancel any time — no long-term commitment from your side, only the price-lock from ours. | Vi valde privilegium framför rabatt — kunder som betalar fullt pris bygger en skarpare produkt. Säg upp när du vill — ingen långsiktig bindning från din sida, bara prislåsningen från vår. | 我们选择特权而非折扣——按原价付费的客户能打造更锐利的产品。可随时取消——您方无长期承诺,只有我方的价格锁定承诺。 | **Conflict 1 fixed here** — the live copy promised "30 days free — no card", which contradicts the card-required founding terms. No card promise survives in any locale's founding block. (State A's beta microcopy still says "No card" — that one is true.) |
| `founding.chipSalesOpen` | Sales open {salesOpenLong} | Försäljningen öppnar {salesOpenLong} | {salesOpenLong}开始销售 |  |
| `founding.chipClose` | Founding closes {closeLong} | Grundarplatserna stänger {closeLong} | 创始席位于{closeLong}关闭 |  |
| `founding.countdown` | Founding seats close {closeLong} · {days, plural, one {# day left} other {# days left}} | Grundarplatserna stänger {closeLong} · {days, plural, one {# dag kvar} other {# dagar kvar}} | 创始席位于{closeLong}关闭 · {days, plural, other {还剩 # 天}} | **Test the plural.** SV must read `1 dag kvar` at one day and `2 dagar kvar` at two — verified by build, see the PR. ZH has no plural form: `还剩 11 天`. |

### Price-lock small print (new — GTM 003 §2) — LEGAL, translated literally

| Key | EN | SV | ZH | Note / uncertainty |
|---|---|---|---|---|
| `priceLock.title` | What the price lock covers. | Vad prislåsningen omfattar. | 价格锁定涵盖什么。 | Legal-adjacent. Translated literally per rule 1. |
| `priceLock.body` | Your founding rate is locked on the tier you joined, for as long as your subscription runs without a break. Change tier and the new tier is charged at its then-current rate — with your founding status carried across. Let the subscription lapse and the lock ends with it. Founding status belongs to you or your company, and doesn't transfer in a sale. It applies to both monthly and annual billing on that tier. | Ditt grundarpris är låst på den nivå du gick med på, så länge din prenumeration löper utan avbrott. Byter du nivå debiteras den nya nivån till sitt då gällande pris — med din grundarstatus överförd. Låter du prenumerationen upphöra tar låsningen slut med den. Grundarstatus tillhör dig eller ditt företag och överlåts inte vid en försäljning. Den gäller både månads- och årsbetalning på den nivån. | 您的创始价格锁定在您加入时所选的梯级上,只要您的订阅不中断即持续有效。更换梯级时,新梯级按其当时的现行价格计费——您的创始身份随之保留。订阅一旦失效,锁定即随之终止。创始身份属于您或贵公司,不随公司出售而转移。该锁定同时适用于该梯级的按月和按年付费。 | **The most important row on this sheet.** Every clause is load-bearing and will be quoted back: locked *on the tier you joined*; *without a break*; tier change is charged at the *then-current* rate; a lapse *ends* the lock; founding status *does not transfer in a sale*. SV `då gällande pris` and ZH `当时的现行价格` both mean "the rate in force at that time" — **confirm that reading.** Last sentence mentions annual billing while annual is cut from the page: intentional, it matches `annualNote`, but flag if you disagree. |

### CTA and under-button microcopy

| Key | EN | SV | ZH | Note / uncertainty |
|---|---|---|---|---|
| `cta.A` | Start the open beta | Starta den öppna betan | 开始公开测试 |  |
| `cta.B` | Become a founding member | Bli grundarmedlem | 成为创始会员 |  |
| `cta.C` | Start your 30 days | Starta dina 30 dagar | 开始您的 30 天 |  |
| `microcopy.A` | Free until {closeLong}. No card. Beta members get first call on a founding seat. | Gratis till {closeLong}. Inget kort. Betamedlemmar får första tjing på en grundarplats. | 到{closeLong}为止免费。无需绑卡。测试版会员优先获得创始席位。 | "No card" is correct here — the beta genuinely takes no card. This is the only place a no-card promise survives. |
| `microcopy.B` | 30 days free, then €{price}/month — locked for life. Card required. Cancel any time before the first charge. | 30 dagar gratis, sedan €{price}/månad — låst för livet. Kort krävs. Säg upp när du vill före den första debiteringen. | 30 天免费,之后每月 €{price} —— 价格永久锁定。需要绑定银行卡。首次扣款前可随时取消。 | Legal-adjacent (card required, cancellation). `€{price}` is filled per tier at render — €19 and €69 only. Verified in all three locales. |
| `microcopy.C` | 30 days free. Card required. Cancel any time before the first charge. | 30 dagar gratis. Kort krävs. Säg upp när du vill före den första debiteringen. | 30 天免费。需要绑定银行卡。首次扣款前可随时取消。 | Legal-adjacent. |

### Contributor

| Key | EN | SV | ZH | Note / uncertainty |
|---|---|---|---|---|
| `tiers.contributor.price` | €19 / month | €19 / månad | 每月 €19 |  |
| `tiers.contributor.lock` | €19 / month — locked for life if you join before {closeLong} | €19 / månad — låst för livet om du går med före {closeLong} | 每月 €19 —— 若在{closeLong}前加入即终身锁定 | Dated lock. Renders `1 October` / `1 oktober` / `10月1日` from the config date — no English date inside a Swedish or Chinese sentence. In state C this line is replaced by the plain `price`, because a deadline that has passed should stop being advertised. |
| `tiers.contributor.features.5` | Founder replies within two business days | Grundaren svarar inom två arbetsdagar | 创始人在两个工作日内回复 | New line, GTM 006 §3. Bounded in `responseBound` at the foot of the page. |

### Consultant

| Key | EN | SV | ZH | Note / uncertainty |
|---|---|---|---|---|
| `tiers.consultant.price` | €69 / month | €69 / månad | 每月 €69 |  |
| `tiers.consultant.lock` | €69 / month — locked for life if you join before {closeLong} | €69 / månad — låst för livet om du går med före {closeLong} | 每月 €69 —— 若在{closeLong}前加入即终身锁定 |  |
| `tiers.consultant.features.6` | Founder replies within two business days | Grundaren svarar inom två arbetsdagar | 创始人在两个工作日内回复 | Same new line. |

### Process Owner — card replaced wholesale (GTM 006 §1)

| Key | EN | SV | ZH | Note / uncertainty |
|---|---|---|---|---|
| `tiers.processOwner.price` | €249 / month | €249 / månad | 每月 €249 |  |
| `tiers.processOwner.desc` | For the improvement team, not the lone practitioner. Unlimited projects, unlimited canvases, 300 Sensei questions a month pooled across the team, and a North Star dashboard the plant manager will actually open. | För förbättringsteamet, inte den ensamma utövaren. Obegränsat antal projekt, obegränsat antal canvas, 300 Sensei-frågor i månaden delade i teamet, och en North Star-dashboard som fabrikschefen faktiskt öppnar. | 面向改善团队,而不是单打独斗的实践者。不限项目数、不限画布数,每月 300 个 Sensei 问题在团队内共享,以及一块厂长真的会打开的 North Star 仪表板。 | GTM 006 §1 verbatim in EN. **The card lost its tick list entirely** — 006 reproduces it as prose. SV/ZH are first drafts of that prose. ZH `单打独斗的实践者` for "the lone practitioner" — check the register. |
| `tiers.processOwner.note` | Not available at launch. We're building the team side properly rather than shipping a seat count we can't yet honour. Tell me you want it and you'll be first in the queue — at the founding rate. | Inte tillgänglig vid lansering. Vi bygger teamsidan ordentligt i stället för att skeppa ett platsantal vi ännu inte kan hålla. Säg till att du vill ha den så står du först i kön — till grundarpriset. | 上线时暂不提供。我们要把团队侧做扎实,而不是先发布一个我们还兑现不了的席位数。告诉我您想要它,您就会排在队伍最前面——并享受创始价格。 | GTM 006 §1 verbatim in EN. ZH `我们还兑现不了的席位数` = "a seat count we cannot yet honour". |
| `tiers.processOwner.cta` | Join the Process Owner queue | Ställ dig i kön för Process Owner | 加入 Process Owner 排队名单 | ZH `加入 Process Owner 排队名单` — literally "join the Process Owner queue list". A shorter `Process Owner 候补名单` (waitlist) is the alternative. **ZH call.** |

### Architect — card replaced wholesale (GTM 003 §3)

| Key | EN | SV | ZH | Note / uncertainty |
|---|---|---|---|---|
| `tiers.architect.note` | Architect isn't a subscription tier — it's a partnership, and it's priced as one. Revenue share on every seat you refer, multi-workspace across clients or business units, white-label A3 export, workspace handoff to a Contributor seat, and a direct line to me. | Architect är ingen prenumerationsnivå — det är ett partnerskap, och det prissätts som ett. Intäktsdelning för varje plats du hänvisar, flera workspaces över kunder eller affärsenheter, white-label A3-export, överlämning av workspace till en Contributor-plats, och en direktlinje till mig. | Architect 不是一个订阅梯级——它是一种合作关系,并按合作关系来定价。您推荐的每个席位都有收入分成,跨客户或业务单元的多工作区,白标 A3 导出,可将工作区交接给 Contributor 席位,以及一条直通我的联络线。 |  |
| `tiers.architect.note2` | We're opening applications after launch. If you're running Lean inside a consultancy, an OEM academy or a university programme, tell me now and you'll be first in the queue. | Vi öppnar ansökningarna efter lansering. Driver du Lean inom en konsultbyrå, en OEM-akademi eller ett universitetsprogram — säg till nu så står du först i kön. | 我们将在上线后开放申请。如果您在咨询公司、OEM 学院或大学课程里推行精益,现在就告诉我,您会排在队伍最前面。 | SV fixes a grammar error carried in the old `partnerNote`: `ett OEM-akademi` → `en OEM-akademi` (akademi is an en-word). |
| `tiers.architect.cta` | Apply for the partner track | Ansök till partnerspåret | 申请合作伙伴通道 | SV `Ansök till partnerspåret`, ZH `申请合作伙伴通道` — both depend on the `partnerTrack` badge wording above. |

### Foot of the page

| Key | EN | SV | ZH | Note / uncertainty |
|---|---|---|---|---|
| `annualNote` | Annual billing arrives after launch. Founding members get first call — and your locked price comes with you. | Årsbetalning kommer efter lansering. Grundarmedlemmar får första tjing — och ditt låsta pris följer med. | 按年付费将在上线后推出。创始会员优先——您锁定的价格也会一并带过来。 | SV changed from the old `din låsta prisnivå` to `ditt låsta pris` — the English is "your locked price", not "price level". |
| `responseBound` | Two business days means Monday to Friday, excluding Swedish public holidays and the July holiday period. | Två arbetsdagar betyder måndag till fredag, undantaget svenska helgdagar och semesterperioden i juli. | 两个工作日指周一至周五,不含瑞典法定节假日和七月假期。 | **Legal-adjacent, translated literally.** This is the bound that makes the two-business-day promise publishable. SV renders "the July holiday period" as `semesterperioden i juli` — plain `juliperioden` was the alternative and is vaguer. ZH `七月假期`. **Confirm both say what you would defend.** |
| `meteringNote` | Sensei runs on real AI, so we meter it — and you can top up anytime. Storage doesn't, so canvases aren't capped on team plans. No surprise bills, ever. | Sensei drivs av riktig AI, så vi mäter den — och du kan fylla på när som helst. Lagring kostar nästan inget, så canvas är inte begränsade på team-planer. Inga överraskningar på fakturan, någonsin. | Sensei 由真正的 AI 驱动,所以我们对它计量——您可以随时充值加量。存储几乎不花钱,所以团队套餐的画布不设上限。绝不会有意外账单。 |  |

### Form

| Key | EN | SV | ZH | Note / uncertainty |
|---|---|---|---|---|
| `form.thanksBody` | You're on the list. I'll email you when sales open on {salesOpenLong}, and a couple of times before founding seats close on {closeLong}. Nothing after that unless you ask. | Du är på listan. Jag mejlar dig när försäljningen öppnar {salesOpenLong}, och ett par gånger innan grundarplatserna stänger {closeLong}. Inget efter det om du inte ber om det. | 您已在名单上。销售于{salesOpenLong}开放时我会给您发邮件,在创始席位于{closeLong}关闭前还会再发几次。之后除非您主动要求,不会再发。 | **Conflict 3 fixed here.** GTM 007 §1 verbatim in EN. The old string promised "No drip emails in between" and has already been sent to everyone who reserved a seat — see the PR body, GTM is handling the acknowledgement separately. |

### Dated lifetime claims outside the pricing block (GTM 007 §7)

| Key | EN | SV | ZH | Note / uncertainty |
|---|---|---|---|---|
| `whatsComing.foundingNote` | Reserve a founding seat — 30 days free, then your price locked for life if you join before {closeLong}. 100 seats only. | Boka en grundarplats — 30 dagar gratis, sedan ditt pris låst för livet om du går med före {closeLong}. Endast 100 platser. | 预定创始席位——30 天免费,之后若在{closeLong}前加入,您的价格永久锁定。仅 100 个席位。 | GTM 007 §7 verbatim in EN. Was an undated lifetime claim. |
| `hero.proof.startLabel` | Founding seats — price locked for life if you join before {closeLong}, and a standing seat at the Founders’ Roundtable | Grundarplatser — priset låst för livet om du går med före {closeLong}, och en stående plats vid Grundarrundan | 创始席位——若在{closeLong}前加入即永久锁定价格,并获得创始人圆桌会的常设席位 | **CC-composed, not transcribed.** GTM 007 §7 gave the instruction ("date it the same way and match the Roundtable wording") but not the string. Longest label in the hero proof strip — check it does not wrap badly. **All three need your pen.** |

### Chinese normalisation — EN and SV unchanged, ZH rewritten

| Key | EN | SV | ZH | Note / uncertainty |
|---|---|---|---|---|
| `hero.lead` | Value Stream Mapping for the flow of goods. Makigami for the office. Each in current and future state — with takt time, lead time and waste calculated live while you draw. The map that does the math, and an embedded sensei that questions it. | Value Stream Mapping för varuflödet. Makigami för kontoret. Båda i nuläge och börläge — med takttid, ledtid och slöseri beräknade live medan du ritar. Kartan som räknar själv, och en inbäddad sensei som ifrågasätter den. | 价值流图(VSM)画实物流,Makigami 画办公室。每一块都有当前状态与未来状态——节拍时间、交期、浪费在您画图的同时实时算出。一张会算数的地图,加一位追问到底的内嵌 Sensei(老师傅)。 | ZH only. Carries the `Sensei（老师傅）` gloss — the one and only place the gloss appears. EN and SV unchanged. |
| `hero.founderTitle` | Founder · Sensei | Grundare · Sensei | 创始人 · Sensei | ZH only. **This one is a person, not the product** — it is Gösta's own title. `创始人 · Sensei` follows the ruling, but `创始人 · 老师傅` may read warmer for a human being. **Explicit call wanted.** |
| `about.title` | Founder · Sensei | Grundare · Sensei | 创始人 · Sensei | ZH only. Same question as `hero.founderTitle` — they must agree. |
| `platform.items.sensei.title` | Embedded AI Sensei | Inbäddad AI-sensei | 内嵌 AI Sensei | ZH only. Product name, now matches the app. |
| `whatsComing.previews.sensei.title` | Embedded AI Sensei | Inbäddad AI-sensei | 内嵌 AI Sensei | ZH only. Product name, now matches the app. |
| `tiers.contributor.features.2` | AI Sensei — 50 questions / month · top up anytime | AI-sensei — 50 frågor / månad · fyll på när som helst | AI Sensei——每月 50 个问题 · 可随时充值加量 | ZH now reads `AI Sensei`, matching the app. **Note the SV asymmetry:** SV still reads `AI-sensei` (lowercase, hyphenated) in the feature lists while the new `processOwner.desc` reads `Sensei-frågor` (capitalised). Left alone deliberately — the ruling covered Chinese only. **SV call: normalise Swedish to `Sensei` too?** |
