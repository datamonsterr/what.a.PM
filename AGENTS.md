# AGENTS.md

Guidance for any AI agent (Claude Code, Codex, Cursor, others) working in this repository. `CLAUDE.md` imports this file.

## Purpose

**what.a.PM** is a reusable learning system. It started for product management, but the structure works for any subject:

- a **learning path** (units of question-lessons, XP, streak, stars) you play in the browser,
- **first principles** as a first-class layer: every lesson digs a question down to the ground and links or creates principles,
- **records** of every quiz attempt and a **dashboard** of your learning,
- **skills** (Claude Code standard) and **templates** so any agent can add lessons, games and infographics the same way.

No build step, no dependencies. Open `index.html` by double-clicking, or serve the folder (GitHub Pages works as is).

## Owner's learning principles (apply to every task)

1. Apply first-principles thinking; the owner tracks it in Notion "First Principal labs".
2. Collect the dots every day; connect them when they connect (`dots/`).
3. Learn with interactive web lessons, games, videos and infographics.
4. Find and **validate** sources before building a lesson.
5. Test knowledge after every lesson (every lesson ends with a quiz).
6. Keep reusable code in git.
7. After a task, suggest a skill if the task will repeat.

## Folder structure

```
.
├── index.html               # learning path (home)
├── lesson.html              # lesson player: ?id=<domain>/<lesson>  or ?review=1
├── principles.html          # first-principles map (ground layer → derived)
├── dashboard.html           # XP, streak, accuracy, weak spots, history, export
├── app/                     # shared engine, reused by every domain
│   ├── css/app.css          # design tokens (light/dark) + components
│   ├── js/                  # store (progress), registry (content loader), page scripts
│   └── games/               # reusable game engines (sort.html, ...)
├── content/                 # knowledge, grouped by domain (category of knowledge)
│   ├── catalog.js           # list of domains
│   └── <domain>/
│       ├── domain.js        # units → lessons (each lesson is a question)
│       └── <NN-unit>/<lesson-id>/
│           ├── research.md  # first-principles research + source validation
│           ├── lesson.js    # steps: read, video, infographic, game, quiz
│           ├── infographic.html, *-game.html, *-data.js
│           └── assets/
├── principles/principles.js # first principles registry (FP-NNN)
├── dots/YYYY/YYYY-MM-DD.md  # daily dots and connections
├── records/                 # exported progress snapshots (quiz history)
├── labs/                    # standalone web apps / tools / prototypes (from templates/web-app)
├── templates/               # lesson, research note, infographic, game, web app, dots entry
├── tools/validate.js        # content checker: node tools/validate.js
└── .claude/skills/          # agent skills (SKILL.md standard)
```

## Content model

**Domain** (`content/<domain>/domain.js`): `{ id, title, description, units: [{ id, title, goal, lessons: [{ id, path, icon, title, question, status }] }] }`. `status` is `ready` (has `lesson.js`) or `planned` (placeholder on the path). A ready lesson unlocks when every earlier ready lesson in the domain is done.

**Lesson** (`lesson.js`): `WAPM.lesson({ id: "<domain>/<lesson>", title, question, answer, summary, minutes, xp, principles: { uses, creates }, notion, sources: [{ title, url, type, why, accessed }], steps: [...] })`. Step types: `read {title, body}`, `video {embed, url, minutes, note}`, `infographic {src, height}`, `game {src | engine+data, optional}`, `quiz {questions: [{ id, q, options, answer (index or array), explain }]}`. Template: `templates/lesson/lesson.js`.

**Principle** (`principles/principles.js`): `{ id: "FP-NNN", kind: "axiom" | "derived", status: "seed" | "tested" | "core", title, statement, why, builtOn: [ids], sources, test, notion }`. Axioms have empty `builtOn` and form the ground layer. IDs are never reused.

**Progress**: stored in the browser (`localStorage`, key `wapm.progress.v1`): XP per day, lessons (best %, stars, attempts), every attempt, per-question accuracy. Export/import JSON from the dashboard; commit snapshots to `records/`.

Content files are JavaScript (not JSON) so the site works from `file://` without a server.

## Workflows

| Task | Skill | Steps |
|---|---|---|
| Understand a topic deeply | `first-principles-research` | topic → question → validated sources → dig down → link/create principles → `research.md` |
| Add a lesson | `lesson-builder` | research → register in `domain.js` → `lesson.js` → quiz → `node tools/validate.js` → play it |
| Add a game | `learning-game-builder` | pick mechanic → engine or custom file → postMessage contract → test |
| Daily learning log | `daily-dots` | `dots/YYYY/YYYY-MM-DD.md` → connect to principles/lessons |
| Add a domain | `lesson-builder` | add to `content/catalog.js`, create `content/<domain>/domain.js`, first lesson |
| Diagrams, decks, prototypes | `diagram-builder`, `slide-deck`, `htmx-prototype` | put outputs in the lesson's `assets/` or in `labs/` |
| Discovery, stories, use cases | `ask-why-ba`, `user-story-ac-writer`, `use-case-writer` | practice material goes in the lesson folder |

## Rules

1. **Write in English** unless the user writes in Vietnamese.
2. **Every lesson is a question** and has a `research.md`, validated `sources` with `accessed` dates, linked principles and a quiz.
3. **Validate sources**: originator or official source first, check date, confirm key claims in a second independent source, note commercial bias. Cite with link + date.
4. **Principles change with evidence, not silently.** Propose changes to the user; never delete or reuse an ID.
5. **No real personal or company-confidential data.** Use synthetic data in games and examples.
6. **Original designs.** Gamification is our own; don't copy a commercial app's name, mascot, art or exact look.
7. **Run `node tools/validate.js`** before committing content; it must report 0 errors.
8. Keep the shared engine generic: domain-specific things go in `content/`, not `app/`.
9. Commit messages: `<area>: <what>`, e.g. `content: add MoSCoW lesson`, `app: review mode`, `skills: add daily-dots`.
10. Notion and other external tools: read freely, but write only after the user confirms.
11. Outputs must open on a phone: 360px wide, light and dark mode via the tokens in `app/css/app.css`.

## Using this repo for another subject

Fork or copy the repo, delete `content/product-management/` and its line in `content/catalog.js`, keep the ground-layer principles that still apply, and add your domain. The engine, templates, skills and validator don't change.
