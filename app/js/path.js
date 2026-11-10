/* Home: the learning trail. Domain tabs → unit banners → lesson stones. */
(async function () {
  const W = window.WAPM, esc = W.esc;
  W.renderHud(document.getElementById("hud"));
  const data = await W.loadCatalog();
  const domains = data.catalog.domains;
  let active = (() => { try { return localStorage.getItem("wapm.domain"); } catch (e) { return null; } })();
  if (!data.domains[active]) active = domains[0].id;

  function tabs() {
    document.getElementById("tabs").innerHTML = domains.map(d =>
      `<button class="chip domain-tab" role="tab" aria-selected="${d.id === active}" data-id="${d.id}">${d.icon || "📘"} ${esc(d.title)}</button>`).join("") +
      `<a class="chip domain-tab" href="principles.html">🧱 First principles</a>`;
    document.querySelectorAll(".domain-tab[data-id]").forEach(b => b.onclick = () => {
      active = b.dataset.id; try { localStorage.setItem("wapm.domain", active); } catch (e) {}
      render();
    });
  }

  function render() {
    tabs();
    const domain = data.domains[active];
    const nodes = W.pathNodes(domain);
    const current = nodes.find(n => n.status !== "planned" && !W.store.isDone(n.fullId));
    document.getElementById("intro").innerHTML =
      `<p class="muted" style="margin:12px 0 0">${esc(domain.description || "")}</p>`;

    let i = 0;
    document.getElementById("path").innerHTML = domain.units.map((u, ui) => {
      const color = u.color || `var(--u${ui % 6})`;
      const ready = u.lessons.filter(l => l.status !== "planned");
      const done = ready.filter(l => W.store.isDone(domain.id + "/" + l.id)).length;
      const stones = u.lessons.map(l => {
        const n = nodes[i++], id = n.fullId;
        const offset = Math.round((Math.sin(i * 0.9) + 1) * 14); // gentle zigzag, 0-28% of the row
        const planned = l.status === "planned";
        const done = W.store.isDone(id), open = !planned && W.unlocked(domain, id);
        const cls = planned ? "planned" : done ? "done" : open ? "" : "locked";
        const rec = W.store.state.lessons[id];
        const stars = rec ? "★".repeat(rec.stars) + "☆".repeat(3 - rec.stars) : "";
        const isCur = current && current.fullId === id;
        const inner = `<span>${planned ? "🧩" : open || done ? (l.icon || "📘") : "🔒"}</span>`;
        const stone = open || done
          ? `<a class="stone ${cls} ${isCur ? "current" : ""}" href="lesson.html?id=${encodeURIComponent(id)}" aria-label="${esc(l.title)}">${inner}</a>`
          : `<div class="stone ${cls}" aria-label="${esc(l.title)} (${planned ? "planned" : "locked"})">${inner}</div>`;
        return `<div class="trail-row" style="padding-left:${offset}%">${stone}
          <div class="stone-label">${isCur ? `<span class="start-tip">Start</span>` : ""}
            <strong>${esc(l.title)}</strong>
            ${l.question ? `<span class="small muted">${esc(l.question)}</span>` : ""}
            <div>${stars ? `<span class="stars">${stars}</span>` : planned ? `<span class="badge">planned</span>` : ""}</div>
          </div></div>`;
      }).join("");
      return `<div class="unit-banner" style="--unit:${color}">
          <div><h2>Unit ${ui + 1} · ${esc(u.title)}</h2><p>${esc(u.goal || "")}</p></div>
          <span class="unit-progress">${done}/${ready.length}</span>
        </div>
        <div class="trail" style="--unit:${color}">${stones}</div>`;
    }).join("");
  }
  render();
})().catch(e => { document.getElementById("path").innerHTML = `<p class="card">⚠️ ${e.message}</p>`; });
