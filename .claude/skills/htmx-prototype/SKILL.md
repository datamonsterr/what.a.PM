---
name: htmx-prototype
description: Build clickable, realistic product prototypes with plain HTML + htmx + CSS + a little vanilla JS — no build step, no framework. Fakes the backend in the browser so screens, forms, tables, filters, modals and multi-step flows actually work. Use when a PO/BA wants to "prototype", "mock up", "make a clickable demo", "wireframe that works", validate a flow with stakeholders or users, or turn user stories / use cases into screens (e.g. ops review queue, rider/driver app screens, fleet dashboard, fraud case management).
---

# htmx Prototype

Goal: a prototype a stakeholder can click through in a browser by **double-clicking `index.html`** — no server, no npm.

## 1. Start from the story, not the UI

1. List the user stories / use case steps the prototype must demonstrate (link to the doc).
2. Pick the **one happy path + one unhappy path** to make real. Everything else can be static.
3. Write a screen list: `screen → purpose → story IDs`. Keep it in the prototype `README.md`.

## 2. Stack & files

```
prototypes/<yyyy-mm>-<kebab-name>/
  index.html            # shell + nav, loads htmx and app.js
  app.css               # design tokens + components
  app.js                # fake backend (routes -> HTML fragments) + seed data
  partials/             # optional static fragments
  README.md             # stories covered, how to demo, open questions
```

- htmx from CDN, pinned: `<script src="https://unpkg.com/htmx.org@2.0.4"></script>`
- No frameworks, no Tailwind build. Small hand-written CSS with tokens.

## 3. Fake backend pattern (works from file://)

Intercept htmx requests and answer them in JS, so `hx-get`, `hx-post`, `hx-target`, `hx-swap` behave like a real server:

```js
// app.js
const db = { cases: [ { id: 'C-1042', type: 'GPS spoofing', driver: 'D-88', risk: 0.91, status: 'Open' } ] };
const routes = {
  'GET /cases': () => db.cases.map(rowHtml).join(''),
  'POST /cases/:id/resolve': ({ id }, form) => {
    const c = db.cases.find(x => x.id === id); c.status = form.get('decision'); return rowHtml(c);
  },
};
function match(method, path) {
  for (const key in routes) {
    const [m, pattern] = key.split(' ');
    if (m !== method) continue;
    const names = [];
    const re = new RegExp('^' + pattern.replace(/:(\w+)/g, (_, n) => (names.push(n), '([^/]+)')) + '$');
    const hit = path.match(re);
    if (hit) return { fn: routes[key], params: Object.fromEntries(names.map((n, k) => [n, decodeURIComponent(hit[k + 1])])) };
  }
}
document.addEventListener('htmx:beforeRequest', e => {
  const { verb, path } = e.detail.requestConfig;
  const r = match(verb.toUpperCase(), path.split('?')[0]);
  if (!r) return;
  e.preventDefault();
  const form = e.detail.elt.closest('form') ? new FormData(e.detail.elt.closest('form')) : new FormData();
  const html = r.fn(r.params, form);
  setTimeout(() => htmx.swap(e.detail.target, html, { swapStyle: e.detail.elt.getAttribute('hx-swap') || 'innerHTML' }), 250);
});
```

- Add a ~250ms delay so loading states (`hx-indicator`) are visible.
- Keep seed data realistic for the domain: trips, drivers, vehicles/assets, fleets, cities across regions, currencies, timestamps in local time zones.
- Persist to `localStorage` only if the demo needs state across reloads.

## 4. UI conventions

- Tokens in `:root`: `--bg`, `--surface`, `--text`, `--muted`, `--accent`, `--danger`, `--warn`, `--ok`, `--radius: 8px`, spacing on a 4/8px scale, font `system-ui`.
- Components to reuse: app shell (top bar + side nav), data table with filters, status pill, detail drawer, modal confirm, form with inline validation, toast, empty state, skeleton loader.
- Mobile screens (rider/driver apps): wrap in a 390×844 device frame div.
- Every destructive action has a confirm (`hx-confirm`) and an undo toast.
- Show realistic edge cases: empty list, error state, long names, RTL/locale text where global matters.

## 5. Demo readiness checklist

- [ ] Opens via double-click, no console errors
- [ ] Happy path and one unhappy path fully clickable
- [ ] Each screen maps to a story/UC ID (shown in a small corner tag, toggle with `?` key)
- [ ] Seed data is fake but plausible — **never real customer data**
- [ ] README lists stories covered, demo script, and open questions
