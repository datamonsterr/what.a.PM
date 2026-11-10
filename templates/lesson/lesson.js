/* Copy this folder to content/<domain>/<NN-unit>/<lesson-id>/ and register the
 * lesson in content/<domain>/domain.js with status: "ready". Then run: node tools/validate.js
 * Step types: read · video · infographic · game · quiz. The player adds an intro and a
 * "connect the dots" screen automatically. HTML is allowed in body/answer/explain. */
WAPM.lesson({
  id: "<domain>/<lesson-id>",                 // must match domain.js: "<domain id>/<lesson id>"
  title: "<Short title>",
  question: "<The question this lesson answers?>",
  answer: "<One-line answer, reasoned from the principles>",
  summary: "<One sentence teaser on the intro screen>",
  minutes: 10, xp: 15,
  principles: { uses: ["FP-001"], creates: [] },  // add new ones to principles/principles.js first
  notion: "",                                     // First Principal labs page for this lesson
  sources: [                                      // only sources that passed validation in research.md
    { title: "<Title (author)>", url: "https://...", type: "primary|article|video|book|paper", why: "<why it's credible>", accessed: "YYYY-MM-DD" }
  ],
  steps: [
    { type: "read", title: "Start from zero", body: `<p>Set up the question with a thought experiment.</p>` },
    { type: "video", title: "<Video title>", embed: "https://www.youtube-nocookie.com/embed/<VIDEO_ID>", url: "https://www.youtube.com/watch?v=<VIDEO_ID>", minutes: 5, note: "What to watch for." },
    { type: "infographic", title: "<Title>", src: "infographic.html", height: 700 },   // or an image: src: "assets/x.svg"
    { type: "game", title: "<Title>", engine: "sort", data: "sort-data.js" },        // reusable engine, or src: "my-game.html"
    { type: "quiz", questions: [
      { id: "q1", q: "<Recall question>", options: ["A", "B", "C"], answer: 0, explain: "<Why>" },
      { id: "q2", q: "<Apply to a new case>", options: ["A", "B", "C"], answer: 2 },
      { id: "q3", q: "<Select all that apply>", options: ["A", "B", "C", "D"], answer: [0, 2] },
      { id: "q4", q: "<Which principle is underneath?>", options: ["FP-001 ...", "FP-002 ...", "FP-003 ..."], answer: 1 }
    ] }
  ]
});
