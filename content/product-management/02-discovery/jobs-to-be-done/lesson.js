WAPM.lesson({
  id: "product-management/jobs-to-be-done",
  title: "Jobs to be done",
  question: "Why do customers actually buy a product?",
  answer: "Because they are trying to make progress in a specific circumstance, and they \"hire\" whatever does that job best. Understand the job and circumstance, not just the customer's demographics or the feature they asked for.",
  summary: "The milkshake story, the theory behind it, and practice telling a job apart from a feature request.",
  minutes: 12, xp: 15,
  principles: { uses: ["FP-002", "FP-003"], creates: ["FP-007"] },
  notion: "",
  sources: [
    { title: "Christensen, Hall, Dillon & Duncan: Know Your Customers' \"Jobs to Be Done\" (Harvard Business Review, Sept 2016)", url: "https://hbr.org/2016/09/know-your-customers-jobs-to-be-done", type: "article", why: "Primary source by the theory's originator, peer-edited business journal.", accessed: "2026-11-10" },
    { title: "Clayton Christensen: Understanding the Job (video)", url: "https://www.youtube.com/watch?v=sfGtw2C95Ms", type: "video", why: "Christensen telling the milkshake story himself.", accessed: "2026-11-10" }
  ],
  steps: [
    { type: "read", title: "The milkshake puzzle", body: `
      <p>A fast-food chain wanted to sell more milkshakes. They asked people who fit the milkshake-buyer profile what would make a better shake, and made those changes. Sales didn't move.</p>
      <p>Then a researcher watched <em>when</em> shakes were bought. Many were bought early in the morning, by people alone, who drove off with them. Asked why, they described a <strong>long, boring commute</strong>: they wanted something to keep one hand busy and keep them full until lunch. The shake was competing with bananas, bagels and doughnuts, not with other shakes.</p>
      <blockquote>Customers don't buy products; they <strong>hire</strong> them to get a job done in a specific circumstance.</blockquote>` },
    { type: "video", title: "Christensen tells it himself", embed: "https://www.youtube-nocookie.com/embed/sfGtw2C95Ms", url: "https://www.youtube.com/watch?v=sfGtw2C95Ms", minutes: 5,
      note: "Notice he never asks 'what features do you want?'. He asks what job they were hiring it for." },
    { type: "read", title: "Why this is first-principles thinking", body: `
      <p>Dig to the ground: <strong>value is decided by the customer</strong> (FP-002), and <strong>our ideas are often wrong</strong> (FP-003). A feature request is the customer's guess at a solution, and our feature is our guess. The job is the part that is actually true.</p>
      <p>Build back up: <strong>describe needs as jobs, not features</strong> (FP-007). A useful format:</p>
      <blockquote>When <em>[circumstance]</em>, I want to <em>[progress]</em>, so I can <em>[outcome]</em>.</blockquote>` },
    { type: "game", title: "Job or feature?", engine: "sort", data: "sort-data.js", note: "Sort each statement. Finish to continue." },
    { type: "quiz", questions: [
      { id: "q1", q: "In the milkshake story, what was the morning shake really competing with?", options: ["Other milkshake brands", "Bananas, bagels and other commute snacks", "Coffee shops' loyalty apps"], answer: 1,
        explain: "Competition is defined by the job, not the product category." },
      { id: "q2", q: "Why did improving the shake to match the 'typical buyer profile' fail?", options: ["The improvements were too expensive", "Customer profiles don't tell you what job the product is hired for", "The team didn't run an A/B test"], answer: 1 },
      { id: "q3", q: "Which is written as a job, not a feature?", options: ["Add push notifications for delays", "When my ride is late, I want to know early so I can warn the person I'm meeting", "Build an ETA prediction model"], answer: 1 },
      { id: "q4", q: "A stakeholder asks for 'a CSV export'. What's the best next move?", options: ["Add it to the sprint, it's small", "Ask what they're trying to get done when they need the export", "Reject it, exports are low value"], answer: 1,
        explain: "Find the job behind the request. A better solution may serve it." }
    ] }
  ]
});
