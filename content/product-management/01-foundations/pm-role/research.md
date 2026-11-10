# Research: What problem does a product manager exist to solve?
Status: Validated · Updated: 2026-11-10 · Lesson: `product-management/pm-role` · Notion: (add link)

## 1. The question
"PM" covers very different jobs across companies. Before learning techniques, I want the reason the role exists at all, so I can judge any job description against it.

## 2. Assumptions I'm carrying in
- A PM is the person who writes requirements and manages the backlog.
- A PM is "the CEO of the product".

## 3. Dig down

| Level | Claim | Why is it true? |
|---|---|---|
| 0 | Teams need a PM | Someone has to decide what the team builds and make sure it's worth building. |
| 1 | Deciding is hard | We can't build everything, and we can't tell in advance which ideas work. |
| ground | Capacity is finite; ideas are uncertain | Scarcity; evidence from repeated product failures (Cagan's four risks). |

## 4. Ground reached
- Existing: FP-001 Capacity is finite, FP-003 Most ideas are wrong at first.

## 5. Build back up
1. Every idea can fail on value, usability, feasibility or viability (SVPG).
2. Building to find out is the most expensive test, and capacity is finite.
3. So someone must make sure the riskiest parts are tested cheaply first, and that what gets built is valuable and viable.
4. In Cagan's model that is the PM (value, viability), with design (usability) and engineering (feasibility).

New derived principle: **FP-005 Test the riskiest assumption first, cheaply**. Built on: FP-001, FP-003.

## 6. Sources and validation

| Source | Type | Credibility | Date | Cross-checked with | Verdict |
|---|---|---|---|---|---|
| [SVPG: The Four Big Risks](https://svpg.com/four-big-risks/) | article | Marty Cagan, author of INSPIRED and EMPOWERED | 2017 | Many secondary summaries (e.g. delibr glossary) repeat the same four risks and ownership split | use |
| [Behind Every Great Product, MTP London 2016](https://vimeo.com/186483084) | video | Same author, conference recording | 2016 | Matches SVPG writing | use (optional) |

## 7. Limits and counter-arguments
- In feature-factory or project-funded organisations the PM role is often reduced to backlog administration. Cagan calls this a problem, not the definition.
- The four-risk ownership split is a model, not a law; small teams blur it.

## 8. Test myself
See the quiz in `lesson.js`: thought experiment (free building), classify a viability risk, ownership split, the derived principle.

## 9. Dots connected
- Leads to FP-005, which the discovery unit (assumption testing) will put into practice.
