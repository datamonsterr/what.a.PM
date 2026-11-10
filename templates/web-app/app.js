/* Tiny state + render loop. State is saved per browser; wrap storage in try/catch. */
const KEY = "wapm.tool.<kebab-name>";
let items = (() => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } })();
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {} };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function render() {
  const rows = items.map(it => ({ ...it, score: it.value / it.effort })).sort((a, b) => b.score - a.score);
  document.getElementById("list").innerHTML = rows.length
    ? `<table><tr><th>Item</th><th>Value</th><th>Effort</th><th>Score</th></tr>${rows.map(r => `<tr><td>${esc(r.name)}</td><td>${r.value}</td><td>${r.effort}</td><td>${r.score.toFixed(2)}</td></tr>`).join("")}</table>`
    : `<p class="muted">Add an item to see it ranked.</p>`;
}
document.getElementById("form").onsubmit = e => {
  e.preventDefault();
  const f = new FormData(e.target);
  items.push({ name: f.get("name"), value: +f.get("value"), effort: +f.get("effort") });
  save(); render(); e.target.reset();
};
render();
