# Research: How should we choose what to build next?
Status: Validated · Updated: 2026-11-10 · Lesson: `product-management/rice-vs-wsjf` · Notion: (add link)

## 1. The question
Prioritization frameworks multiply (RICE, WSJF, MoSCoW, Kano, ICE). I want the shared logic so I can pick or adapt one instead of memorising them.

## 2. Assumptions I'm carrying in
- One framework is "the right one".
- A score settles the debate.

## 3. Dig down

| Level | Claim | Why is it true? |
|---|---|---|
| 0 | Score with RICE or WSJF | Frameworks used in industry. |
| 1 | Both divide value by effort | Effort is what we spend; value is what we get. |
| 2 | WSJF adds time criticality | Waiting has a cost. |
| ground | Finite capacity; customer-defined value; delay is costly | FP-001, FP-002, FP-004 |

## 4. Ground reached
- Existing: FP-001, FP-002. New axiom: FP-004 Value delivered later is worth less (time value; SAFe/Reinertsen cost of delay).

## 5. Build back up
With finite capacity, the order of work matters. The best order maximises customer value per unit of effort, and because value decays with delay, urgent items move up. RICE writes this with reach × impact × confidence; WSJF with cost of delay ÷ job size.

New derived principle: **FP-006 Rank work by value per unit of effort, over time**. Built on: FP-001, FP-002, FP-004.

## 6. Sources and validation

| Source | Type | Credibility | Date | Cross-checked with | Verdict |
|---|---|---|---|---|---|
| [Intercom: RICE](https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/) | article | Created by Intercom's product team (Sean McBride) | 2016 | Product School, Roadmunk, Railsware guides all cite the same scales | use |
| [SAFe: WSJF](https://framework.scaledagile.com/wsjf/) | primary | Official framework site | current | ProductPlan glossary, agility-at-scale summary | use |

## 7. Limits and counter-arguments
- Inputs are guesses; scores give false precision. Relative (Fibonacci) estimation in WSJF tries to reduce this.
- WSJF's job size is a proxy for duration; a big job with a big team may finish quickly.
- MoSCoW and Kano answer different questions (scope negotiation, satisfaction type). Planned lessons will connect them to the same ground.

## 8. Test myself
"Which goes first?" game plus the quiz in `lesson.js`.

## 9. Dots connected
- Fraud repo: WSJF is the default prioritisation there (cost of delay as expected monthly loss avoided).
