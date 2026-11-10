---
name: first-principles-research
description: Research a topic as a question and dig it down to first principles, linking existing principles or proposing new ones, with validated sources. Use when the user wants to understand WHY a method, framework or practice works ("why follow MoSCoW?", "why OKRs?"), asks for first-principles thinking, or before building any lesson in this repo.
---

# First-principles research

Output: `content/<domain>/<NN-unit>/<lesson-id>/research.md` from `templates/lesson/research.md`, plus any new principles in `principles/principles.js`.

## 1. Turn the topic into a question
A label ("MoSCoW") becomes a question that has a *why* in it ("Why, and when, should we follow MoSCoW?"). Confirm it with the user if it changes their meaning.

## 2. Write down the assumptions first
List what the user (and you) currently believe. These get checked at the end.

## 3. Read the existing ground
Read `principles/principles.js`. Know the axioms (ground layer) and derived principles before digging, so you link instead of duplicating.

## 4. Find and validate sources
- Prefer the **originator or official source** (the framework's own site, the author's book or article, the standard).
- Check **date** and whether it's still current.
- Confirm each key claim in a **second independent source**.
- Note commercial interest (vendor blogs selling a tool).
- Videos: prefer the originator speaking; record the URL and length.
- If web fetch is restricted, use web search to confirm the page exists and the claim appears in it; say so in the table.
- Use `/hyperresearch` for deep questions when the user asks for depth.
Record each source in the research table with a verdict: use / context only / reject. Only "use" sources go in the lesson.

## 5. Dig down
Ask "why is that true?" level by level until you reach something accepted without further proof. Stop at the ground; don't go philosophical. Usually two to four levels.

## 6. Link or create principles
- If the ground matches an existing axiom, link it.
- If you reached new ground, propose a new **axiom** (empty `builtOn`).
- The answer you build back up usually becomes a **derived** principle (`builtOn` lists the principles under it).
- New IDs: next free `FP-NNN`; IDs are never reused. Status starts at `seed`.
- If evidence contradicts an existing principle, do not silently edit it: flag it to the user and propose a change.

## 7. Build back up and write the one-line answer
Three to six reasoning steps from the ground to the answer. The final line goes into the lesson's `answer` field.

## 8. Limits, test ideas, dots
Write when the answer stops being true, the best counter-argument, quiz ideas (recall, apply, which-principle, trap), and links to other lessons or daily dots.

## 9. Hand-off
Run `node tools/validate.js`. Then offer the user: build the lesson (`lesson-builder` skill), and log the breakdown in their Notion "First Principal labs" (only write to Notion when they confirm).
