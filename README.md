# what.a.PM

A reusable, gamified learning system. Learn a subject one **question** at a time on a path of short lessons (read, watch, infographic, game, quiz), dig every answer down to **first principles**, and keep a record of every quiz on your own **dashboard**. It starts with product management; the same engine works for any subject.

## Open it

- **Locally**: double-click `index.html`. No install, no server.
- **Online**: Settings → Pages → Deploy from branch → `main` / root. The site appears at `https://<user>.github.io/what.a.PM/`.

## What's inside

| Page | What it does |
|---|---|
| `index.html` | The learning path: domains → units → question-lessons, with XP, streak and stars |
| `lesson.html` | Plays a lesson; wrong answers come back once; ends with "connect the dots" to principles |
| `principles.html` | First-principles map: ground layer (axioms) at the bottom, derived principles above, the lessons that use each one |
| `dashboard.html` | Streak, XP trend, accuracy, weak spots (with review mode), quiz history, export/import |

Starter content: 4 product-management lessons (PM's real job, Product Owner in Scrum, Jobs to be done, RICE vs WSJF), 7 planned lessons including MoSCoW, and 8 principles.

## Extend it

- Read [AGENTS.md](AGENTS.md) for the structure and content model.
- Copy from [`templates/`](templates/): lesson, research note, infographic, game, web app, daily dots entry.
- Use the skills in [`.claude/skills/`](.claude/skills/): `first-principles-research`, `lesson-builder`, `learning-game-builder`, `daily-dots`, plus PM craft skills.
- Check your work: `node tools/validate.js`.

## Your progress

Progress lives in your browser. Use **Export progress** on the dashboard to save a JSON snapshot into [`records/`](records/) and **Import** to restore it on another device.

Third-party credits: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
