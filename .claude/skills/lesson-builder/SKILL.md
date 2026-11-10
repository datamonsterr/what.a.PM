---
name: lesson-builder
description: Build an interactive lesson on the what.a.PM learning path (reading, video, infographic, game, quiz, connect-to-principles) from a validated research note. Use when the user asks to "make a lesson", "add a topic to the path", "teach me X with a quiz/game", or to turn a planned lesson into a ready one.
---

# Lesson builder

A lesson is a folder `content/<domain>/<NN-unit>/<lesson-id>/` with `research.md`, `lesson.js` and optional `infographic.html`, games and `assets/`. The site renders it; no build step.

## 0. Research first
If `research.md` doesn't exist or isn't validated, run the `first-principles-research` skill first. Lessons only cite sources marked "use" there.

## 1. Register on the path
In `content/<domain>/domain.js`, add or update the lesson entry: `id`, `path`, `icon`, `title`, `question`, `status: "ready"`. Keep the unit order meaningful: earlier lessons unlock later ones. New domain? Add it to `content/catalog.js` and create `content/<domain>/domain.js` (copy the PM one's shape).

## 2. Write lesson.js
Copy `templates/lesson/lesson.js`. Rules:
- `id` is `<domain>/<lesson-id>` and matches domain.js.
- `question`, one-line `answer`, `principles.uses` / `principles.creates` (IDs must exist in `principles/principles.js`).
- 2-4 `read` steps, each one idea, under ~150 words, start with a thought experiment, end the reasoning at the principles.
- Optional `video` (embed URL + original URL + minutes + what to watch for). Use `youtube-nocookie.com/embed/<id>` or `player.vimeo.com/video/<id>`.
- Optional `infographic` (copy `templates/infographic/`), one takeaway, gold "ground underneath" box.
- Optional `game`: reusable engine (`engine: "sort"`) or a custom file (see `learning-game-builder`).
- **Always** end with a `quiz` of 4-6 questions: at least one recall, one application to a new case, one "which principle is underneath", and one misconception trap. Every question gets an `explain` unless trivially obvious. Multi-select uses an array `answer`.
- `sources` with `accessed` dates. Synthetic data only in examples.

## 3. Check
- `node tools/validate.js` must report 0 errors.
- Open `index.html` (double-click, or `python -m http.server`) and play the lesson to the end; check it on a phone-width window.

## 4. Hand-off
Tell the user the lesson is on the path, what it builds on, and suggest the next planned lesson. Remind them their progress is per browser and can be exported from the dashboard into `records/`.
