/* Content registry. Content files are plain JS that call WAPM.catalog(),
 * WAPM.domain() or WAPM.lesson(). Loading them with <script> tags (not fetch)
 * means the site works by double-clicking index.html AND on GitHub Pages. */
(function () {
  const W = (window.WAPM = window.WAPM || {});
  const data = { catalog: null, domains: {}, lessons: {} };
  W.data = data;

  W.catalog = c => { data.catalog = c; };
  W.domain = d => { data.domains[d.id] = d; };
  W.lesson = l => { data.lessons[l.id] = l; };
  W.principles = list => { data.principleList = list; data.principles = Object.fromEntries(list.map(p => [p.id, p])); };

  const loaded = {};
  W.loadScript = src => loaded[src] || (loaded[src] = new Promise((ok, fail) => {
    const s = document.createElement("script");
    s.src = src; s.onload = ok; s.onerror = () => fail(new Error("Could not load " + src));
    document.head.appendChild(s);
  }));

  W.loadCatalog = async () => {
    await W.loadScript("content/catalog.js");
    await Promise.all(data.catalog.domains.map(d => W.loadScript("content/" + d.id + "/domain.js")));
    return data;
  };

  // Flatten a domain into an ordered list of path nodes with full ids and folders.
  W.pathNodes = domain => {
    const out = [];
    domain.units.forEach((u, ui) => u.lessons.forEach((l, li) => out.push({
      ...l, unit: u, unitIndex: ui, lessonIndex: li,
      fullId: domain.id + "/" + l.id,
      folder: "content/" + domain.id + "/" + l.path + "/"
    })));
    return out;
  };

  // A lesson is unlocked when every earlier "ready" lesson in its domain is done.
  W.unlocked = (domain, fullId) => {
    for (const n of W.pathNodes(domain)) {
      if (n.fullId === fullId) return true;
      if (n.status !== "planned" && !W.store.isDone(n.fullId)) return false;
    }
    return false;
  };

  W.findNode = fullId => {
    const [domainId] = fullId.split("/");
    const domain = data.domains[domainId];
    return domain && W.pathNodes(domain).find(n => n.fullId === fullId);
  };

  W.loadLesson = async fullId => {
    const node = W.findNode(fullId);
    if (!node) throw new Error("Unknown lesson " + fullId);
    await W.loadScript(node.folder + "lesson.js");
    return { node, lesson: data.lessons[fullId] };
  };

  W.qs = k => new URLSearchParams(location.search).get(k);
  W.esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Shared header: streak, XP today vs goal, total XP.
  W.renderHud = el => {
    const st = W.store;
    const goal = st.state.dailyGoal, t = st.todayXp();
    el.innerHTML = `
      <a class="brand" href="index.html"><span class="brand-mark">w.</span>what.a.PM</a>
      <nav class="hud">
        <span class="chip chip-streak" title="Day streak">🔥 ${st.streak()}</span>
        <span class="chip chip-xp" title="XP today / daily goal">⚡ ${t}/${goal}</span>
        <span class="chip" title="Total XP">🏆 ${st.state.xp}</span>
        <a class="chip chip-link" href="dashboard.html">Dashboard</a>
      </nav>`;
  };
})();
