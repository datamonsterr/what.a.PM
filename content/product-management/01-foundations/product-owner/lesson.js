WAPM.lesson({
  id: "product-management/product-owner",
  title: "Product Owner in Scrum",
  question: "Why does Scrum insist on ONE Product Owner?",
  answer: "Ordering a backlog is a stream of trade-offs. A committee can't make them fast or consistently, so Scrum makes one person accountable, while letting them delegate the work.",
  summary: "The Scrum Guide is short. Read what it actually says about the Product Owner, then reason about why.",
  minutes: 8, xp: 10,
  principles: { uses: ["FP-001", "FP-002"], creates: ["FP-008"] },
  notion: "",
  sources: [
    { title: "The 2020 Scrum Guide (Schwaber & Sutherland)", url: "https://scrumguides.org/scrum-guide.html", type: "primary", why: "The official definition of Scrum, written by its creators.", accessed: "2026-11-10" }
  ],
  steps: [
    { type: "read", title: "What the Scrum Guide says", body: `
      <p>The 2020 Scrum Guide says the Product Owner is <strong>accountable for maximizing the value of the product</strong> resulting from the Scrum Team's work.</p>
      <p>That includes effective Product Backlog management: developing and communicating the <strong>Product Goal</strong>, creating and clearly communicating backlog items, <strong>ordering</strong> them, and making sure the backlog is transparent and understood.</p>
      <blockquote>The Product Owner is <strong>one person, not a committee</strong>. They may represent the needs of many stakeholders, and they can delegate the work, but they stay accountable.</blockquote>` },
    { type: "read", title: "Dig to the ground", body: `
      <p>Why one person? Follow the chain down:</p>
      <ol><li>The team can't do everything at once (<strong>FP-001</strong>), so the backlog must be <em>ordered</em>.</li>
      <li>Ordering means saying no to some stakeholders. Their wants conflict, and value is judged by customers, not by whoever argues loudest (<strong>FP-002</strong>).</li>
      <li>Conflicting trade-offs need someone who can make the final call and be held to it.</li></ol>
      <p>Built back up, that gives a new principle: <strong>one person is accountable for value trade-offs</strong> (FP-008). Note what it does <em>not</em> say: that the PO does all the work alone.</p>` },
    { type: "quiz", questions: [
      { id: "q1", q: "According to the 2020 Scrum Guide, the Product Owner is accountable for…", options: ["Maximizing the value of the product resulting from the Scrum Team's work", "Making sure the team finishes every sprint on time", "Writing all the code reviews"], answer: 0 },
      { id: "q2", q: "Can the Product Owner delegate backlog work to others?", options: ["No, they must do it all personally", "Yes, but they remain accountable", "Yes, and accountability moves with the work"], answer: 1,
        explain: "The guide lets the PO have others do the work, while the PO stays accountable." },
      { id: "q3", q: "Three senior stakeholders want to jointly own the backlog as a 'PO council'. What breaks first?", options: ["Sprint length", "Fast, consistent ordering decisions", "The Definition of Done"], answer: 1,
        explain: "Committees stall trade-offs. That is the reasoning behind FP-008." },
      { id: "q4", q: "Which of these are part of Product Backlog management in the 2020 guide?", options: ["Developing and communicating the Product Goal", "Ordering Product Backlog items", "Assigning tasks to individual developers", "Making the backlog transparent and understood"], answer: [0, 1, 3],
        explain: "The Developers plan their own work. The PO doesn't assign tasks." }
    ] }
  ]
});
