/* Progress store: XP, streak, lesson completion and every quiz attempt.
 * Lives in localStorage (per browser). Export/import as JSON to keep a
 * permanent record in records/ (see records/README.md). */
(function () {
  const KEY = "wapm.progress.v1";
  const empty = () => ({
    version: 1,
    dailyGoal: 30,
    xp: 0,
    days: {},          // "YYYY-MM-DD": xp earned that day
    lessons: {},       // lessonId: { completedAt, bestPct, attempts, stars }
    attempts: [],      // { lessonId, at, score, total, xp, wrong: [questionKey] }
    questions: {}      // "lessonId#qid": { seen, correct, lastAt }
  });

  function safeRead() {
    try { const raw = localStorage.getItem(KEY); return raw ? Object.assign(empty(), JSON.parse(raw)) : empty(); }
    catch (e) { return empty(); }
  }
  let state = safeRead();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* private mode: keep in memory */ } }

  const today = (d = new Date()) => {
    const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return z.toISOString().slice(0, 10);
  };
  const addDays = (iso, n) => { const d = new Date(iso + "T00:00:00"); d.setDate(d.getDate() + n); return today(d); };

  function streak() {
    let s = 0, day = today();
    if (!state.days[day]) day = addDays(day, -1); // today not done yet: streak still alive from yesterday
    while (state.days[day]) { s++; day = addDays(day, -1); }
    return s;
  }
  function bestStreak() {
    const ds = Object.keys(state.days).sort();
    let best = 0, cur = 0, prev = null;
    ds.forEach(d => { cur = prev && addDays(prev, 1) === d ? cur + 1 : 1; best = Math.max(best, cur); prev = d; });
    return best;
  }

  function recordAttempt({ lessonId, results, baseXp }) {
    // results: [{ qid, correct }]
    const total = results.length, score = results.filter(r => r.correct).length;
    const pct = total ? Math.round(score / total * 100) : 100;
    const first = !state.lessons[lessonId];
    const xp = Math.round((baseXp || 10) * (first ? 1 : 0.5) * (0.5 + pct / 200));
    const at = new Date().toISOString();
    results.forEach(r => {
      const k = lessonId + "#" + r.qid;
      const q = state.questions[k] || { seen: 0, correct: 0 };
      q.seen++; if (r.correct) q.correct++; q.lastAt = at; state.questions[k] = q;
    });
    state.attempts.push({ lessonId, at, score, total, xp, wrong: results.filter(r => !r.correct).map(r => lessonId + "#" + r.qid) });
    const l = state.lessons[lessonId] || { attempts: 0, bestPct: 0 };
    l.attempts++; l.bestPct = Math.max(l.bestPct, pct);
    l.stars = l.bestPct >= 100 ? 3 : l.bestPct >= 80 ? 2 : 1;
    l.completedAt = l.completedAt || at;
    state.lessons[lessonId] = l;
    addXp(xp);
    return { score, total, pct, xp, stars: l.stars, streak: streak() };
  }

  // Review mode: results carry their own "lessonId#qid" key; no lesson completion.
  function recordReview(results) {
    const at = new Date().toISOString();
    results.forEach(r => {
      const q = state.questions[r.key] || { seen: 0, correct: 0 };
      q.seen++; if (r.correct) q.correct++; q.lastAt = at; state.questions[r.key] = q;
    });
    const score = results.filter(r => r.correct).length, xp = 5 + score * 2;
    state.attempts.push({ lessonId: "_review", at, score, total: results.length, xp, wrong: results.filter(r => !r.correct).map(r => r.key) });
    addXp(xp);
    return { score, total: results.length, pct: Math.round(score / Math.max(1, results.length) * 100), xp, streak: streak() };
  }

  function addXp(n) {
    const d = today();
    state.days[d] = (state.days[d] || 0) + n;
    state.xp += n; save();
  }

  function weakQuestions(limit = 10) {
    return Object.entries(state.questions)
      .map(([k, v]) => ({ key: k, ...v, acc: v.correct / v.seen }))
      .filter(q => q.acc < 0.8)
      .sort((a, b) => a.acc - b.acc || b.seen - a.seen)
      .slice(0, limit);
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "progress-" + today() + ".json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  function importJson(text) {
    const incoming = JSON.parse(text);
    if (!incoming || incoming.version !== 1) throw new Error("Not a what.a.PM progress file");
    state = Object.assign(empty(), incoming); save();
  }
  function reset() { state = empty(); save(); }
  function setDailyGoal(n) { state.dailyGoal = n; save(); }

  window.WAPM = window.WAPM || {};
  window.WAPM.store = {
    get state() { return state; },
    today, addDays, streak, bestStreak, recordAttempt, recordReview, addXp, weakQuestions,
    exportJson, importJson, reset, setDailyGoal,
    todayXp: () => state.days[today()] || 0,
    isDone: id => !!state.lessons[id]
  };
})();
