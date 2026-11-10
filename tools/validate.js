#!/usr/bin/env node
/* Content checker. Run from the repo root:  node tools/validate.js
 * Loads catalog, domains, lessons and principles the same way the browser does
 * and reports broken references, so agents and humans can extend content safely. */
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.resolve(__dirname, "..");
const data = { catalog: null, domains: {}, lessons: {}, principles: [] };
const games = [];
const ctx = {
  WAPM: {
    catalog: c => (data.catalog = c), domain: d => (data.domains[d.id] = d),
    lesson: l => (data.lessons[l.id] = l), principles: p => (data.principles = p)
  },
  WAPM_GAME: g => games.push(g)
};
vm.createContext(ctx);
const load = rel => vm.runInContext(fs.readFileSync(path.join(root, rel), "utf8"), ctx, { filename: rel });
const errors = [], warn = [];
const err = m => errors.push(m);

load("content/catalog.js");
load("principles/principles.js");
const P = Object.fromEntries(data.principles.map(p => [p.id, p]));

// Principles
const seen = new Set();
data.principles.forEach(p => {
  if (seen.has(p.id)) err(`Duplicate principle id ${p.id}`); seen.add(p.id);
  if (!/^FP-\d{3}$/.test(p.id)) err(`Principle id ${p.id} should look like FP-001`);
  (p.builtOn || []).forEach(b => P[b] || err(`${p.id} builtOn unknown ${b}`));
  if (p.kind === "axiom" && (p.builtOn || []).length) err(`${p.id} is an axiom but has builtOn`);
  if (p.kind === "derived" && !(p.builtOn || []).length) err(`${p.id} is derived but has no builtOn`);
});
const visiting = new Set(), done = new Set();
const cycle = id => { if (done.has(id)) return; if (visiting.has(id)) return err(`Cycle in principles at ${id}`); visiting.add(id); (P[id]?.builtOn || []).forEach(cycle); visiting.delete(id); done.add(id); };
Object.keys(P).forEach(cycle);

// Domains and lessons
let ready = 0, planned = 0;
data.catalog.domains.forEach(d => {
  const f = `content/${d.id}/domain.js`;
  if (!fs.existsSync(path.join(root, f))) return err(`Missing ${f}`);
  load(f);
  const dom = data.domains[d.id]; if (!dom) return err(`${f} did not register domain ${d.id}`);
  const ids = new Set();
  dom.units.forEach(u => u.lessons.forEach(l => {
    if (ids.has(l.id)) err(`Duplicate lesson id ${d.id}/${l.id}`); ids.add(l.id);
    if (!l.question) warn.push(`${d.id}/${l.id} has no question`);
    const folder = `content/${d.id}/${l.path}`;
    if (l.status === "planned") { planned++; return; }
    ready++;
    const lf = `${folder}/lesson.js`;
    if (!fs.existsSync(path.join(root, lf))) return err(`Missing ${lf}`);
    load(lf);
    const full = `${d.id}/${l.id}`, les = data.lessons[full];
    if (!les) return err(`${lf} must call WAPM.lesson({ id: "${full}" })`);
    if (!fs.existsSync(path.join(root, folder, "research.md"))) warn.push(`${full} has no research.md`);
    if (!(les.sources || []).length) err(`${full} has no sources`);
    (les.sources || []).forEach(s => (!s.url || !s.accessed) && err(`${full} source "${s.title}" needs url and accessed date`));
    [...(les.principles?.uses || []), ...(les.principles?.creates || [])].forEach(id => P[id] || err(`${full} references unknown principle ${id}`));
    const qids = new Set();
    let hasQuiz = false;
    (les.steps || []).forEach(s => {
      if (["infographic", "game"].includes(s.type) && s.src && !/^https?:/.test(s.src) && !fs.existsSync(path.join(root, folder, s.src))) err(`${full}: missing ${s.type} file ${s.src}`);
      if (s.type === "game" && s.engine) {
        if (!fs.existsSync(path.join(root, "app/games", s.engine + ".html"))) err(`${full}: unknown game engine ${s.engine}`);
        if (!fs.existsSync(path.join(root, folder, s.data))) err(`${full}: missing game data ${s.data}`);
      }
      if (s.type === "quiz") {
        hasQuiz = true;
        s.questions.forEach((q, i) => {
          const id = q.id || "q" + (i + 1);
          if (qids.has(id)) err(`${full}: duplicate question id ${id}`); qids.add(id);
          const ans = Array.isArray(q.answer) ? q.answer : [q.answer];
          ans.forEach(a => (a < 0 || a >= q.options.length) && err(`${full} ${id}: answer ${a} out of range`));
        });
      }
    });
    if (!hasQuiz) err(`${full} has no quiz (every lesson ends with a knowledge check)`);
  }));
});

warn.forEach(w => console.log("warn  " + w));
errors.forEach(e => console.log("ERROR " + e));
console.log(`\n${data.catalog.domains.length} domain(s), ${ready} ready lesson(s), ${planned} planned, ${data.principles.length} principle(s): ${errors.length} error(s), ${warn.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
