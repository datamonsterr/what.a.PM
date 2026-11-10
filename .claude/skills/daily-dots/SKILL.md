---
name: daily-dots
description: Log today's "dots" (things learned, noticed or read) and connect them to lessons, principles and earlier dots in the what.a.PM repo. Use when the user says "collect the dots", "log what I learned today", "daily note", "connect the dots", or shares a link/insight to keep.
---

# Daily dots

Principle: collect dots every day, connect them when they connect.

## Collect
1. Open or create `dots/YYYY/YYYY-MM-DD.md` from `templates/dots-entry.md` (use the user's local date).
2. Add each dot as one bullet: what it is, where it came from (link + date), and why it caught the user's attention. One idea per bullet. Don't paste confidential work material; summarise and point to where the original lives.

## Connect
3. Search the repo for related material: `principles/principles.js`, `content/**/research.md`, earlier `dots/`.
4. For each real connection, add it under "Connections" with the link and one sentence on *how* they connect. Don't force links.
5. If a dot challenges a principle, say so and suggest the user test it (a principle's `test` field says how).
6. If several dots point at the same question, propose it as a planned lesson (add to `domain.js` with `status: "planned"` after the user agrees).

## Weekly
On request, summarise the week's dots: themes, the strongest connection, and one question worth a lesson. Offer to mirror the summary to Notion "First Principal labs" (only with confirmation).
