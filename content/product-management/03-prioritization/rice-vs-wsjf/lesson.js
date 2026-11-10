WAPM.lesson({
  id: "product-management/rice-vs-wsjf",
  title: "RICE vs WSJF",
  question: "How should we choose what to build next?",
  answer: "Do first what returns the most customer value per unit of effort, adjusted for how much waiting costs. RICE and WSJF are two ways to write that down; neither is better than the assumptions you put in.",
  summary: "Two popular scoring models, the shared principle underneath, and practice making the call.",
  minutes: 15, xp: 20,
  principles: { uses: ["FP-001", "FP-002", "FP-004"], creates: ["FP-006"] },
  notion: "",
  sources: [
    { title: "Intercom (Sean McBride): RICE, simple prioritization for product managers", url: "https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/", type: "article", why: "Original description by the team that created RICE.", accessed: "2026-11-10" },
    { title: "Scaled Agile Framework: Weighted Shortest Job First", url: "https://framework.scaledagile.com/wsjf/", type: "primary", why: "Official SAFe definition of WSJF and cost of delay.", accessed: "2026-11-10" }
  ],
  steps: [
    { type: "read", title: "Start from the ground", body: `
      <p>Three facts force every prioritization method into the same shape:</p>
      <ol><li><strong>Capacity is finite</strong> (FP-001) → we need an order, not a wish list.</li>
      <li><strong>Value is judged by customers</strong> (FP-002) → the top of the fraction is customer value (or loss avoided).</li>
      <li><strong>Delay costs value</strong> (FP-004) → urgency matters, not only size of the prize.</li></ol>
      <p>Put together: <strong>value ÷ effort, adjusted for time</strong>. That's FP-006, and both RICE and WSJF are versions of it.</p>` },
    { type: "infographic", title: "RICE vs WSJF at a glance", src: "infographic.html", height: 760 },
    { type: "game", title: "Which goes first?", src: "order-game.html", height: 520, note: "Four rounds with made-up backlog items. Finish to continue." },
    { type: "read", title: "When to use which", body: `
      <ul><li><strong>RICE</strong> when you can count reach (users, trips, sessions) and want to keep optimism in check through Confidence.</li>
      <li><strong>WSJF</strong> when timing, deadlines or risk dominate, e.g. a regulation date or a fraud attack that grows every week.</li></ul>
      <blockquote>A score is an argument, not an answer. Write down the assumptions behind each number so stakeholders argue about inputs, not the ranking.</blockquote>` },
    { type: "quiz", questions: [
      { id: "q1", q: "What is the RICE formula?", options: ["Reach + Impact + Confidence + Effort", "(Reach × Impact × Confidence) ÷ Effort", "Reach × Impact ÷ (Confidence × Effort)"], answer: 1 },
      { id: "q2", q: "In SAFe, Cost of Delay is the sum of which three parts?", options: ["User-business value", "Time criticality", "Risk reduction and/or opportunity enablement", "Team velocity"], answer: [0, 1, 2] },
      { id: "q3", q: "Item A: CoD 21, size 3. Item B: CoD 30, size 13. Which has the higher WSJF?", options: ["A (7.0)", "B (2.3)", "They're equal"], answer: 0,
        explain: "21 ÷ 3 = 7. 30 ÷ 13 ≈ 2.3. Smaller, urgent jobs win." },
      { id: "q4", q: "Which first principle does WSJF make explicit that a plain value ÷ effort score hides?", options: ["Value is judged by the customer", "Delay costs value", "Ideas are often wrong"], answer: 1,
        explain: "Time criticality puts FP-004 into the formula. RICE handles uncertainty (FP-003) through Confidence instead." },
      { id: "q5", q: "Two stakeholders disagree about a RICE ranking. What makes the discussion productive?", options: ["Re-run the scores until they agree", "Show the assumption behind each input and debate those", "Let the most senior person decide"], answer: 1 }
    ] }
  ]
});
