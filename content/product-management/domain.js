/* Product management path. Every lesson is a question.
 * status: "ready" (has lesson.js) or "planned" (shows on the path as a placeholder).
 * path: folder under content/product-management/ holding lesson.js, research.md and any infographic/game files. */
WAPM.domain({
  id: "product-management",
  title: "Product management",
  description: "From \"what does a PM even do?\" to deciding what to build next. Each stop is a question; each answer adds to your first principles.",
  units: [
    {
      id: "foundations", title: "Foundations", goal: "Why the role exists and who decides what",
      lessons: [
        { id: "pm-role", path: "01-foundations/pm-role", icon: "🧭", status: "ready", title: "The PM's real job", question: "What problem does a product manager exist to solve?" },
        { id: "product-owner", path: "01-foundations/product-owner", icon: "🎯", status: "ready", title: "Product Owner in Scrum", question: "Why does Scrum insist on ONE Product Owner?" },
        { id: "pm-vs-po", path: "01-foundations/pm-vs-po", icon: "🔀", status: "planned", title: "PM vs PO in an enterprise", question: "When are PM and PO the same job, and when should they split?" }
      ]
    },
    {
      id: "discovery", title: "Discovery", goal: "Understand the customer before the solution",
      lessons: [
        { id: "jobs-to-be-done", path: "02-discovery/jobs-to-be-done", icon: "🥤", status: "ready", title: "Jobs to be done", question: "Why do customers actually buy a product?" },
        { id: "opportunity-solution-tree", path: "02-discovery/opportunity-solution-tree", icon: "🌳", status: "planned", title: "Opportunity solution trees", question: "How do we connect an outcome to the right experiments?" },
        { id: "assumption-testing", path: "02-discovery/assumption-testing", icon: "🧪", status: "planned", title: "Assumption testing", question: "What is the cheapest way to learn we are wrong?" }
      ]
    },
    {
      id: "prioritization", title: "Prioritization", goal: "Decide what to build next, and defend it",
      lessons: [
        { id: "rice-vs-wsjf", path: "03-prioritization/rice-vs-wsjf", icon: "⚖️", status: "ready", title: "RICE vs WSJF", question: "How should we choose what to build next?" },
        { id: "moscow", path: "03-prioritization/moscow", icon: "🪜", status: "planned", title: "MoSCoW", question: "Why (and when) should we follow MoSCoW?" },
        { id: "kano", path: "03-prioritization/kano", icon: "😍", status: "planned", title: "Kano model", question: "Why do some features delight while others are just expected?" }
      ]
    },
    {
      id: "strategy", title: "Strategy & outcomes", goal: "Point the team at outcomes, not output",
      lessons: [
        { id: "okrs", path: "04-strategy/okrs", icon: "📈", status: "planned", title: "OKRs", question: "Why measure outcomes instead of shipped features?" },
        { id: "stakeholders", path: "04-strategy/stakeholders", icon: "🤝", status: "planned", title: "Stakeholder mapping", question: "Whose yes do we really need, and why?" }
      ]
    }
  ]
});
