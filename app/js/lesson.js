/* Lesson player. Turns a lesson's steps into screens:
 *   read · video · infographic · game · quiz (one screen per question) · connect
 * Wrong answers come back once at the end. The first try is what gets scored.
 * ?id=<domain>/<lesson>   play a lesson
 * ?review=1               practise your weakest questions across all lessons */
(async function () {
  const W = window.WAPM, esc = W.esc, S = W.store;
  const $ = id => document.getElementById(id);
  const stage = $("stage"), next = $("next"), feedback = $("feedback"), bar = $("bar");
  $("streak").textContent = "🔥 " + S.streak();

  await W.loadCatalog();
  await W.loadScript("principles/principles.js").catch(() => {});
  const review = W.qs("review") === "1";
  let lesson, node, screens = [];

  if (review) {
    const weak = S.weakQuestions(10);
    const ids = [...new Set(weak.map(w => w.key.split("#")[0]))];
    await Promise.all(ids.map(id => W.loadLesson(id).catch(() => null)));
    weak.forEach(w => {
      const [lid, qid] = w.key.split("#"), l = W.data.lessons[lid];
      const q = l && quizQuestions(l).find(q => q.id === qid);
      if (q) screens.push({ type: "question", q, key: w.key, lessonTitle: l.title });
    });
    lesson = { id: "_review", title: "Review your weak spots", xp: 0 };
    if (!screens.length) { stage.innerHTML = `<div class="card celebrate"><div class="big">🌱</div><h2>Nothing to review yet</h2><p class="muted">Questions you miss show up here so you can practise them.</p><a class="btn" href="index.html">Back to the path</a></div>`; next.hidden = true; return; }
  } else {
    const id = W.qs("id");
    ({ node, lesson } = await W.loadLesson(id));
    if (!W.unlocked(W.data.domains[id.split("/")[0]], id)) { stage.innerHTML = `<div class="card">🔒 Finish the earlier lessons first. <a href="index.html">Back to the path</a></div>`; next.hidden = true; return; }
    document.title = "what.a.PM · " + lesson.title;
    screens.push({ type: "intro" });
    (lesson.steps || []).forEach(s => s.type === "quiz"
      ? quizQuestions(lesson).forEach(q => screens.push({ type: "question", q, key: lesson.id + "#" + q.id }))
      : screens.push(s));
    screens.push({ type: "connect" });
  }

  function quizQuestions(l) {
    const quiz = (l.steps || []).find(s => s.type === "quiz");
    return quiz ? quiz.questions.map((q, i) => ({ id: q.id || "q" + (i + 1), ...q })) : [];
  }

  const results = {};  // key -> first-try correctness
  let i = 0, retries = 0, gameDone = false;
  const total = () => screens.length;

  function show() {
    const s = screens[i];
    bar.style.width = Math.round(i / total() * 100) + "%";
    feedback.textContent = ""; feedback.className = "";
    next.disabled = false; next.className = "btn"; next.textContent = "Continue";
    const folder = node ? node.folder : "";
    const src = p => /^https?:/.test(p) ? p : folder + p;

    if (s.type === "intro") {
      stage.innerHTML = `<div class="card"><p class="step-kind">${esc(node.unit.title)} · ${lesson.minutes || 10} min · ${lesson.xp || 10} XP</p>
        <h1>${esc(lesson.title)}</h1>
        ${lesson.question ? `<blockquote class="step-body"><strong>The question:</strong> ${esc(lesson.question)}</blockquote>` : ""}
        <p class="muted">${esc(lesson.summary || "")}</p>
        ${principleChips(lesson.principles?.uses, "Builds on")}</div>`;
      next.textContent = "Start";
    } else if (s.type === "read") {
      stage.innerHTML = `<div class="card"><p class="step-kind">Read</p><h2>${esc(s.title || "")}</h2><div class="step-body">${s.body}</div></div>`;
    } else if (s.type === "video") {
      stage.innerHTML = `<div class="card"><p class="step-kind">Watch${s.minutes ? " · " + s.minutes + " min" : ""}</p><h2>${esc(s.title || "")}</h2>
        <div class="embed"><iframe src="${esc(s.embed)}" title="${esc(s.title || "video")}" allow="fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>
        <p class="small muted">${esc(s.note || "")} ${s.url ? `<a href="${esc(s.url)}" target="_blank" rel="noopener">Open the original</a>` : ""}</p></div>`;
    } else if (s.type === "infographic") {
      stage.innerHTML = `<div class="card"><p class="step-kind">Infographic</p><h2>${esc(s.title || "")}</h2>
        ${/\.(png|jpe?g|svg|webp)$/i.test(s.src) ? `<img src="${esc(src(s.src))}" alt="${esc(s.alt || s.title || "")}" style="width:100%">`
          : `<iframe class="frame" src="${esc(src(s.src))}" title="${esc(s.title || "infographic")}" style="min-height:${s.height || 620}px"></iframe>`}</div>`;
    } else if (s.type === "game") {
      gameDone = false;
      stage.innerHTML = `<div class="card"><p class="step-kind">Play</p><h2>${esc(s.title || "")}</h2><p class="muted">${esc(s.note || "")}</p>
        <iframe class="frame" src="${esc(s.engine ? "app/games/" + s.engine + ".html?data=" + encodeURIComponent(folder + s.data) : src(s.src))}" title="${esc(s.title || "game")}" style="min-height:${s.height || 560}px"></iframe></div>`;
      next.disabled = !s.optional; next.textContent = s.optional ? "Skip / continue" : "Finish the game to continue";
    } else if (s.type === "question") {
      renderQuestion(s);
    } else if (s.type === "connect") {
      renderConnect();
    }
  }

  function renderQuestion(s) {
    const q = s.q, multi = Array.isArray(q.answer);
    const picked = new Set();
    stage.innerHTML = `<div class="card"><p class="step-kind">${s.retry ? "Try again" : "Check yourself"}${s.lessonTitle ? " · " + esc(s.lessonTitle) : ""}</p>
      <h2>${esc(q.q)}</h2>${multi ? `<p class="small muted">Select all that apply.</p>` : ""}
      <div class="options">${q.options.map((o, k) => `<button class="option" data-k="${k}" aria-pressed="false">${esc(o)}</button>`).join("")}</div>
      <p id="explain" class="step-body" hidden></p></div>`;
    next.textContent = "Check"; next.disabled = true;
    const opts = [...stage.querySelectorAll(".option")];
    opts.forEach(b => b.onclick = () => {
      if (s.checked) return;
      const k = +b.dataset.k;
      if (!multi) { picked.clear(); opts.forEach(o => o.setAttribute("aria-pressed", "false")); }
      picked.has(k) ? picked.delete(k) : picked.add(k);
      b.setAttribute("aria-pressed", String(picked.has(k)));
      next.disabled = picked.size === 0;
    });
    s.check = () => {
      s.checked = true;
      const want = new Set(multi ? q.answer : [q.answer]);
      const ok = want.size === picked.size && [...want].every(k => picked.has(k));
      opts.forEach(o => { const k = +o.dataset.k; if (want.has(k)) o.classList.add("right"); else if (picked.has(k)) o.classList.add("wrong"); });
      if (!(s.key in results)) results[s.key] = ok;
      if (!ok && !s.retry) screens.splice(screens.length - (review ? 0 : 1), 0, { ...s, retry: true, checked: false });
      feedback.textContent = ok ? "✓ Nice!" : "✗ Not quite";
      feedback.className = ok ? "feedback-ok" : "feedback-bad";
      if (q.explain) { const e = $("explain"); e.hidden = false; e.innerHTML = q.explain; }
      next.className = ok ? "btn btn-ok" : "btn btn-bad"; next.textContent = "Continue"; next.disabled = false;
    };
  }

  function principleChips(ids, label) {
    if (!ids || !ids.length) return "";
    const P = W.data.principles || {};
    return `<p class="small"><strong>${label}:</strong> ${ids.map(id => `<a class="badge" href="principles.html#${id}">${id} ${esc(P[id]?.title || "")}</a>`).join(" ")}</p>`;
  }

  function renderConnect() {
    const p = lesson.principles || {}, P = W.data.principles || {};
    const created = (p.creates || []).map(id => P[id]).filter(Boolean);
    stage.innerHTML = `<div class="card"><p class="step-kind">Connect the dots</p><h2>What this lesson adds to your foundations</h2>
      ${lesson.question ? `<p><strong>Question:</strong> ${esc(lesson.question)}</p>` : ""}
      ${lesson.answer ? `<blockquote class="step-body"><strong>Answer in one line:</strong> ${lesson.answer}</blockquote>` : ""}
      ${principleChips(p.uses, "Built on")}
      ${created.map(c => `<div class="card" style="box-shadow:none;margin:10px 0"><span class="badge">New principle ${c.id}</span><h3 style="margin-top:6px">${esc(c.title)}</h3><p>${esc(c.statement)}</p></div>`).join("")}
      <h3>Sources (validated)</h3><ul class="sources small">${(lesson.sources || []).map(s =>
        `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a> <span class="badge">${esc(s.type || "source")}</span> <span class="muted">${esc(s.why || "")}${s.accessed ? " · checked " + esc(s.accessed) : ""}</span></li>`).join("")}</ul>
      ${lesson.notion ? `<p class="small">📓 <a href="${esc(lesson.notion)}" target="_blank" rel="noopener">Log your own first-principles notes in First Principal labs</a></p>` : `<p class="small muted">📓 Log your own breakdown in First Principal labs (Notion) and paste the link into this lesson's <code>notion</code> field.</p>`}
    </div>`;
    next.textContent = "Finish lesson";
  }

  let finished = false;
  function finish() {
    if (finished) return; finished = true;
    const rs = Object.entries(results).map(([key, correct]) => ({ key, qid: key.split("#")[1], correct }));
    const r = review ? S.recordReview(rs) : S.recordAttempt({ lessonId: lesson.id, results: rs, baseXp: lesson.xp });
    bar.style.width = "100%";
    stage.innerHTML = `<div class="card celebrate"><div class="big">${r.pct === 100 ? "🏆" : r.pct >= 80 ? "🎉" : "💪"}</div>
      <h1>${review ? "Review done" : "Lesson complete"}</h1>
      ${r.stars ? `<p class="stars" style="font-size:2rem">${"★".repeat(r.stars)}${"☆".repeat(3 - r.stars)}</p>` : ""}
      <div class="tiles"><div class="tile"><b>+${r.xp}</b><span>XP</span></div><div class="tile"><b>${r.score}/${r.total}</b><span>right first try</span></div><div class="tile"><b>🔥 ${r.streak}</b><span>day streak</span></div></div>
      <p><a class="btn" href="index.html">Back to the path</a> <a class="btn btn-ghost" href="dashboard.html">See dashboard</a></p></div>`;
    feedback.textContent = ""; next.hidden = true;
  }

  // Games report back with: parent.postMessage({ type: "wapm:game", score, total, done: true }, "*")
  window.addEventListener("message", e => {
    const m = e.data;
    if (!m || m.type !== "wapm:game" || screens[i]?.type !== "game" || gameDone) return;
    if (m.done) {
      gameDone = true;
      const bonus = Math.max(1, Math.round(5 * (m.total ? m.score / m.total : 1)));
      S.addXp(bonus);
      feedback.textContent = `🎮 ${m.score ?? ""}${m.total ? "/" + m.total : ""} · +${bonus} XP`; feedback.className = "feedback-ok";
      next.disabled = false; next.textContent = "Continue";
    }
  });

  next.onclick = () => {
    const s = screens[i];
    if (s.type === "question" && !s.checked) return s.check();
    if (i < total() - 1) { i++; show(); window.scrollTo(0, 0); } else finish();
  };
  show();
})().catch(e => { document.getElementById("stage").innerHTML = `<p class="card">⚠️ ${e.message}</p>`; });
