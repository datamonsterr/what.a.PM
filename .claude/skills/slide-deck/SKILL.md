---
name: slide-deck
description: Write and design presentation decks with good taste — clear storyline, one message per slide, simple modern templates. Produces a self-contained HTML deck (keyboard navigable, prints to PDF) or a Claude slide artifact, with speaker notes. Use for stakeholder updates, roadmap reviews, discovery readouts, PI/quarterly planning, business cases, fraud/risk briefings, steering committee packs, or any "make slides / deck / presentation" request.
---

# Slide Deck

Good decks are **writing first, design second**. Do the storyline before touching layout.

## 1. Storyline (do this before any slide)

1. **Audience & decision.** Who is in the room, and what do we need from them? (approve, prioritize, fund, be informed)
2. **Governing thought** — one sentence the audience should remember. Put it on slide 2.
3. **Pyramid / SCQA**: Situation → Complication → Question → Answer. Each section supports the answer.
4. **Write action titles**: every slide title is a full-sentence takeaway (≤ 15 words), e.g. "GPS-spoofing trips cost 1.8% of GMV in SEA, double LATAM" — not "GPS spoofing".
5. Read only the titles in order. If they don't tell the whole story, fix the titles, not the visuals.

Write the outline into `outline.md` first and confirm it with the user when the deck is longer than ~8 slides.

## 2. Slide rules

- One message per slide; the body proves the title.
- ≤ 30 words of body text, or one chart, or one diagram. No bullet walls; max 3 bullets, max 2 levels.
- Numbers: always unit, period, source. Round aggressively (1.8%, not 1.8274%).
- Charts: one highlighted series, everything else grey; label directly, no legend if avoidable.
- Every claim that came from research gets a footnote source.
- Standard flow for PO decks: Title → Exec summary (answer + ask) → Context → Evidence (2–5) → Options/Recommendation → Roadmap/Next steps → Ask → Appendix.

## 3. Visual system (simple modern default)

- 16:9, generous margins (≥ 64px), left-aligned text, 8px spacing grid.
- Typography: one sans family (Inter / system-ui). Title 40px semibold, body 22–24px, footnote 14px.
- Palette: near-black text `#111827`, muted `#6B7280`, background `#FFFFFF`, one accent `#2563EB`, alert `#DC2626` only for risk. Dark variant swaps bg/text.
- Layout templates (use these names in the outline): `title`, `statement` (big single sentence), `two-column`, `chart`, `diagram`, `table`, `timeline`, `quote`, `section-divider`, `ask`.
- No clip-art, no gradients, no drop shadows, no logos unless the user supplies them.

## 4. Output options

Ask only if unclear; default to (a).

**(a) Self-contained HTML deck** — `deck.html` in the presentation folder. Use the template in `templates/deck-template.html`: each `<section class="slide" data-layout="...">` is one slide, `<aside class="notes">` holds speaker notes, arrows/space navigate, `P` toggles print view (Ctrl+P → Save as PDF gives 1 slide per page).

**(b) Claude slide artifact** — when working in Claude apps that offer a Slides artifact type, feed it the same outline and action titles.

**(c) PowerPoint** — only if the user explicitly asks for .pptx; use the pptx skill with the same storyline and visual system.

Diagrams come from the `diagram-builder` skill and are embedded as SVG.

## 5. Review checklist

- [ ] Titles alone tell the story
- [ ] Exec summary states the answer and the ask
- [ ] Each slide has one message; ≤ 30 words body
- [ ] Every number has unit, period, source
- [ ] Speaker notes on every content slide
- [ ] Prints cleanly to PDF
