/* First-principles map. Ground layer (axioms) at the bottom, derived principles
 * stacked above by how many steps they are from the ground. */
(async function () {
  const W = window.WAPM, esc = W.esc;
  W.renderHud(document.getElementById("hud"));
  const data = await W.loadCatalog();
  await W.loadScript("principles/principles.js");
  const list = data.principleList, P = data.principles;

  // Which lessons use / create each principle (loads every ready lesson once).
  const nodes = Object.values(data.domains).flatMap(d => W.pathNodes(d)).filter(n => n.status !== "planned");
  await Promise.all(nodes.map(n => W.loadLesson(n.fullId).catch(() => null)));
  const usage = {};
  nodes.forEach(n => {
    const l = data.lessons[n.fullId]; if (!l) return;
    (l.principles?.uses || []).forEach(id => (usage[id] = usage[id] || { uses: [], creates: [] }).uses.push(n));
    (l.principles?.creates || []).forEach(id => (usage[id] = usage[id] || { uses: [], creates: [] }).creates.push(n));
  });

  const depth = {};
  const d = id => depth[id] ?? (depth[id] = (P[id]?.builtOn || []).length ? 1 + Math.max(...P[id].builtOn.map(d)) : 0);
  list.forEach(p => d(p.id));
  const maxD = Math.max(0, ...Object.values(depth));
  const children = {}; list.forEach(p => (p.builtOn || []).forEach(b => (children[b] = children[b] || []).push(p.id)));

  const layers = document.getElementById("layers");
  let html = "";
  for (let k = maxD; k >= 0; k--) {
    const row = list.filter(p => depth[p.id] === k);
    html += `<div class="layer"><h3>${k === 0 ? "Ground layer · axioms" : "Layer " + k + " · derived"}</h3><div class="layer-row">${row.map(p =>
      `<button class="pcard ${k === 0 ? "axiom" : ""}" id="${p.id}" data-id="${p.id}"><span class="id">${p.id} · ${esc(p.status || "seed")}</span><strong style="display:block">${esc(p.title)}</strong><span class="small muted">${esc(p.statement)}</span></button>`).join("")}</div></div>`;
  }
  layers.insertAdjacentHTML("beforeend", html);

  const svg = document.getElementById("links");
  function drawLinks(hit) {
    const box = layers.getBoundingClientRect();
    svg.setAttribute("width", box.width); svg.setAttribute("height", box.height);
    svg.innerHTML = list.flatMap(p => (p.builtOn || []).map(b => {
      const a = document.getElementById(p.id).getBoundingClientRect(), c = document.getElementById(b).getBoundingClientRect();
      const x1 = a.left + a.width / 2 - box.left, y1 = a.bottom - box.top, x2 = c.left + c.width / 2 - box.left, y2 = c.top - box.top;
      const on = hit && hit.has(p.id) && hit.has(b);
      return `<path d="M${x1},${y1} C${x1},${(y1 + y2) / 2} ${x2},${(y1 + y2) / 2} ${x2},${y2}" fill="none" style="stroke:${on ? "var(--accent)" : "var(--line)"};stroke-width:${on ? 3 : 2}"/>`;
    })).sort((a, b) => a.includes("accent") - b.includes("accent")).join(""); // highlighted lines on top
  }

  const walk = (id, next, acc = new Set()) => { acc.add(id); (next(id) || []).forEach(x => acc.has(x) || walk(x, next, acc)); return acc; };
  function select(id) {
    const p = P[id]; if (!p) return;
    const down = walk(id, x => P[x]?.builtOn), up = walk(id, x => children[x]);
    const hit = new Set([...down, ...up]);
    document.querySelectorAll(".pcard").forEach(c => { c.classList.toggle("dim", !hit.has(c.dataset.id)); c.classList.toggle("hit", c.dataset.id === id); });
    drawLinks(hit);
    const u = usage[id] || { uses: [], creates: [] };
    const link = n => `<a href="lesson.html?id=${encodeURIComponent(n.fullId)}">${esc(n.title)}</a>`;
    document.getElementById("detail").innerHTML = `<div class="card">
      <span class="badge">${p.id} · ${p.kind || (depth[id] ? "derived" : "axiom")} · ${esc(p.status || "seed")}</span>
      <h2 style="margin-top:8px">${esc(p.title)}</h2><p class="step-body">${esc(p.statement)}</p>
      ${p.why ? `<h3>Why we believe it</h3><p>${p.why}</p>` : ""}
      ${(p.builtOn || []).length ? `<p><strong>Rests on:</strong> ${p.builtOn.map(b => `<a href="#${b}" data-go="${b}">${b} ${esc(P[b]?.title || "")}</a>`).join(", ")}</p>` : `<p><strong>Ground layer:</strong> accepted without further proof. Challenge it if a source or your own experience contradicts it.</p>`}
      ${(children[id] || []).length ? `<p><strong>Supports:</strong> ${children[id].map(c => `<a href="#${c}" data-go="${c}">${c} ${esc(P[c].title)}</a>`).join(", ")}</p>` : ""}
      ${u.creates.length ? `<p><strong>Discovered in:</strong> ${u.creates.map(link).join(", ")}</p>` : ""}
      ${u.uses.length ? `<p><strong>Used by lessons:</strong> ${u.uses.map(link).join(", ")}</p>` : ""}
      ${(p.sources || []).length ? `<p class="small"><strong>Evidence:</strong> ${p.sources.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a>`).join(" · ")}</p>` : ""}
      ${p.test ? `<p class="small"><strong>How to test it:</strong> ${esc(p.test)}</p>` : ""}
      ${p.notion ? `<p class="small">📓 <a href="${esc(p.notion)}" target="_blank" rel="noopener">First Principal labs page</a></p>` : ""}
    </div>`;
    document.querySelectorAll("[data-go]").forEach(a => a.onclick = e => { e.preventDefault(); history.replaceState(null, "", "#" + a.dataset.go); select(a.dataset.go); });
  }
  document.querySelectorAll(".pcard").forEach(c => c.onclick = () => { history.replaceState(null, "", "#" + c.dataset.id); select(c.dataset.id); });
  window.addEventListener("resize", () => drawLinks());
  drawLinks();
  if (P[location.hash.slice(1)]) select(location.hash.slice(1));
})();
