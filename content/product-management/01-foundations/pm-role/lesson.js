WAPM.lesson({
  id: "product-management/pm-role",
  title: "The PM's real job",
  question: "What problem does a product manager exist to solve?",
  answer: "Ideas fail in four ways (value, usability, feasibility, viability). The PM's job is to make sure the team finds out which risks are real <em>before</em> spending its limited capacity building.",
  summary: "Strip the role down: if building were free and every idea worked, nobody would need a PM. Neither is true.",
  minutes: 10, xp: 15,
  principles: { uses: ["FP-001", "FP-003"], creates: ["FP-005"] },
  notion: "",
  sources: [
    { title: "SVPG (Marty Cagan): The Four Big Risks", url: "https://svpg.com/four-big-risks/", type: "article", why: "Primary source for the four risks, written by the author of INSPIRED.", accessed: "2026-11-10" },
    { title: "Marty Cagan: Behind Every Great Product (Mind the Product London 2016)", url: "https://vimeo.com/186483084", type: "video", why: "Talk by the same author, conference recording.", accessed: "2026-11-10" }
  ],
  steps: [
    { type: "read", title: "Start from zero", body: `
      <p>Imagine two magic powers: <strong>building costs nothing</strong>, and <strong>every idea works</strong>. Would a team need a product manager? No. You would build everything.</p>
      <p>So the role exists because of two facts you can't wish away:</p>
      <ol><li><strong>Capacity is finite</strong> (FP-001). Building one thing means not building another.</li>
      <li><strong>Most ideas are wrong at first</strong> (FP-003). We can't know in advance which ones.</li></ol>
      <p>Everything else a PM does (talking to customers, writing stories, roadmaps) is a tool for living with those two facts.</p>` },
    { type: "read", title: "Four ways an idea fails", body: `
      <p>Marty Cagan (SVPG) names four big risks every idea carries:</p>
      <ul><li><strong>Value:</strong> will customers buy it or choose to use it?</li>
      <li><strong>Usability:</strong> can users figure out how to use it?</li>
      <li><strong>Feasibility:</strong> can engineers build it with the time, skills and tech we have?</li>
      <li><strong>Business viability:</strong> does it work for the rest of the business (sales, legal, finance, support)?</li></ul>
      <blockquote>In his model the PM owns <strong>value</strong> and <strong>viability</strong>; the designer owns usability; the tech lead owns feasibility.</blockquote>` },
    { type: "video", title: "Behind every great product", embed: "https://player.vimeo.com/video/186483084", url: "https://vimeo.com/186483084", minutes: 30,
      note: "Optional deep dive. Watch for how Cagan describes the PM's responsibilities and why 'roadmap of features' teams struggle." },
    { type: "quiz", questions: [
      { id: "q1", q: "If building were free and every idea worked, what would happen to the PM role?", options: ["It would be more important than ever", "It would mostly disappear", "It would turn into project management"], answer: 1,
        explain: "The role exists because capacity is finite and ideas are uncertain. Remove both and there is nothing to decide." },
      { id: "q2", q: "Customers love a prototype, engineers can build it, but legal says it breaks payment rules in two markets. Which risk is this?", options: ["Value", "Usability", "Feasibility", "Business viability"], answer: 3,
        explain: "Viability covers whether the solution works for the rest of the business: legal, finance, sales, support." },
      { id: "q3", q: "In Cagan's model, which two risks does the product manager own?", options: ["Value", "Usability", "Feasibility", "Business viability"], answer: [0, 3],
        explain: "PM: value and viability. Designer: usability. Tech lead: feasibility." },
      { id: "q4", q: "Which first step best follows from 'ideas are often wrong' + 'capacity is finite'?", options: ["Build the full feature quickly, then measure", "Find the riskiest assumption and test it as cheaply as possible", "Ask the most senior stakeholder which idea is best"], answer: 1,
        explain: "That is FP-005, built on FP-001 and FP-003. Building fully first spends the scarce resource before you learn." }
    ] }
  ]
});
