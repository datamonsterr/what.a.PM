/* Dashboard: streak, XP trend, path progress, weak questions, quiz history, records. */
(async function () {
  const W = window.WAPM, esc = W.esc, S = W.store;
  const $ = id => document.getElementById(id);
  W.renderHud($("hud"));
  const data = await W.loadCatalog();
  const st = S.state;
  const allNodes = Object.values(data.domains).flatMap(d => W.pathNodes(d));
  const titleOf = id => allNodes.find(n => n.fullId === id)?.title || (id === "_review" ? "Review session" : id);

  // Tiles
  const qs = Object.values(st.questions), seen = qs.reduce((a, q) => a + q.seen, 0), right = qs.reduce((a, q) => a + q.correct, 0);
  const ready = allNodes.filter(n => n.status !== "planned");
  const done = ready.filter(n => S.isDone(n.fullId)).length;
  $("tiles").innerHTML = [
    ["🔥 " + S.streak(), "day streak (best " + S.bestStreak() + ")"],
    ["⚡ " + S.todayXp() + "/" + st.dailyGoal, "XP today / goal"],
    ["🏆 " + st.xp, "total XP"],
    [done + "/" + ready.length, "lessons done"],
    [seen ? Math.round(right / seen * 100) + "%" : "–", "quiz accuracy (" + seen + " answers)"]
  ].map(([b, s]) => `<div class="tile"><b>${b}</b><span>${s}</span></div>`).join("");

  // XP bar chart, last 28 days (inline SVG, no library)
  const days = [...Array(28)].map((_, k) => S.addDays(S.today(), k - 27));
  const vals = days.map(d => st.days[d] || 0), max = Math.max(st.dailyGoal, ...vals);
  const w = 28 * 22, h = 140, bw = 16;
  $("chart").innerHTML = `<svg viewBox="0 0 ${w} ${h + 22}" width="100%" role="img" aria-label="XP per day for the last 28 days">
    <line x1="0" x2="${w}" y1="${h - st.dailyGoal / max * h}" y2="${h - st.dailyGoal / max * h}" style="stroke:var(--gold)" stroke-dasharray="4 4"/>
    ${vals.map((v, k) => `<rect x="${k * 22 + 3}" y="${h - v / max * h}" width="${bw}" height="${Math.max(v ? 2 : 0, v / max * h)}" rx="4" style="fill:${v >= st.dailyGoal ? "var(--ok)" : "var(--accent)"}"><title>${days[k]}: ${v} XP</title></rect>`).join("")}
    ${[0, 7, 14, 21, 27].map(k => `<text x="${k * 22 + 11}" y="${h + 16}" font-size="10" text-anchor="middle" style="fill:var(--muted)">${days[k].slice(5)}</text>`).join("")}
  </svg><p class="small muted">Dashed line is your daily goal. Green days hit it.</p>`;

  // Progress per domain and unit
  $("domains").innerHTML = Object.values(data.domains).map(d => {
    const units = d.units.map(u => {
      const r = u.lessons.filter(l => l.status !== "planned"), k = r.filter(l => S.isDone(d.id + "/" + l.id)).length;
      const pct = r.length ? Math.round(k / r.length * 100) : 0;
      return `<div style="margin:8px 0"><div class="small" style="display:flex;justify-content:space-between"><span>${esc(u.title)}</span><span class="muted">${k}/${r.length} ready · ${u.lessons.length - r.length} planned</span></div><div class="bar"><i style="width:${pct}%"></i></div></div>`;
    }).join("");
    return `<h3>${d.icon || ""} ${esc(d.title)}</h3>${units}`;
  }).join("");

  // Weak questions → review mode
  const weak = S.weakQuestions(8);
  $("weak").innerHTML = weak.length
    ? `<table><tr><th>Lesson · question</th><th>Right</th></tr>${weak.map(q => `<tr><td>${esc(titleOf(q.key.split("#")[0]))} · ${esc(q.key.split("#")[1])}</td><td>${q.correct}/${q.seen}</td></tr>`).join("")}</table>
       <p><a class="btn" href="lesson.html?review=1">Practise these</a></p>`
    : `<p class="muted">No weak spots yet. Questions you get wrong will collect here for review.</p>`;

  // History
  const hist = st.attempts.slice(-20).reverse();
  $("history").innerHTML = hist.length
    ? `<table><tr><th>When</th><th>Lesson</th><th>Score</th><th>XP</th></tr>${hist.map(a =>
        `<tr><td>${new Date(a.at).toLocaleString()}</td><td>${esc(titleOf(a.lessonId))}</td><td>${a.score}/${a.total}</td><td>+${a.xp}</td></tr>`).join("")}</table>`
    : `<p class="muted">Finish a lesson to see your quiz history.</p>`;

  // Records
  $("export").onclick = S.exportJson;
  $("import").onchange = e => {
    const f = e.target.files[0]; if (!f) return;
    f.text().then(t => { S.importJson(t); location.reload(); }).catch(err => alert(err.message));
  };
  $("goal").value = String(st.dailyGoal);
  $("goal").onchange = e => { S.setDailyGoal(+e.target.value); location.reload(); };
  $("reset").onclick = () => { if (confirm("Delete all progress in this browser? Export first if you want to keep it.")) { S.reset(); location.reload(); } };
})();
