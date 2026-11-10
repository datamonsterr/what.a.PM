---
name: learning-game-builder
description: Make a small web learning game for a what.a.PM lesson (sorting, pick-the-best, ordering, calculators, simulations) that reports its score to the lesson player. Use when the user wants a game, interactive exercise or simulator for a topic, or a lesson needs practice beyond a quiz.
---

# Learning game builder

Games are original, self-contained HTML (no build, no framework) that run inside the lesson player's iframe and also open on their own.

## 1. Pick the mechanic from the learning goal
| Goal | Mechanic | How |
|---|---|---|
| Tell categories apart | Sort into buckets | Reuse the engine: data file from `templates/game/sort-data.js`, step `{ type: "game", engine: "sort", data: "sort-data.js" }` |
| Judge between options | Pick the best | Copy `templates/game/game.html` into the lesson folder |
| Apply a formula | Which goes first / calculator | See `content/product-management/03-prioritization/rice-vs-wsjf/order-game.html` |
| Feel a dynamic over time | Simulation (sliders, rounds) | Start from `templates/game/game.html`, add state per round |

If a new mechanic will be reused, make it an engine in `app/games/<engine>.html` that loads `?data=<path to data .js>` (see `app/games/sort.html`) and document the data shape at the top.

## 2. Contract with the lesson player
When the game ends:
```js
parent.postMessage({ type: "wapm:game", score, total, done: true }, "*");
```
The player unlocks Continue and awards bonus XP. Add `optional: true` on the step to allow skipping.

## 3. Design rules
- 3-8 rounds, under 3 minutes. Immediate feedback with the *why* after each answer.
- Use the shared tokens from `app/css/app.css` (light and dark mode come free). Mobile first: works at 360px wide, buttons not drag-only.
- Synthetic, realistic data only. No real company, customer or employee data.
- Original look and names; don't copy an existing commercial game's branding or art.
- Check every "right answer" by computing it, not by eye.

## 4. Check
`node tools/validate.js`, then play it inside the lesson and on its own.
