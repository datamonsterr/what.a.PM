/* First principles registry. One entry per principle. IDs are never reused.
 * kind: "axiom" (ground layer, builtOn is empty) or "derived" (builtOn lists the principles it rests on).
 * status: "seed" (stated, not yet tested) → "tested" (checked against a real case) → "core" (used often, still holds).
 * Write the human breakdown for each in principles/notes/<id>.md and mirror it in First Principal labs (Notion). */
WAPM.principles([
  {
    id: "FP-001", kind: "axiom", status: "seed", title: "Capacity is finite",
    statement: "A team has a limited amount of time and attention. Every yes is a no to something else.",
    why: "This is scarcity, the starting point of economics: resources are limited and wants are not. It applies to people-hours exactly as it applies to money.",
    builtOn: [], test: "List what your team is doing this month. Could you add one more item without dropping or slowing another?"
  },
  {
    id: "FP-002", kind: "axiom", status: "seed", title: "Value is decided by the customer",
    statement: "Something is valuable only if the person using or paying for it judges that it helps them make progress.",
    why: "Christensen et al. frame purchases as customers \"hiring\" a product to get a job done in their circumstances. The builder's opinion of the feature does not enter that decision.",
    builtOn: [], sources: [{ title: "Christensen et al., Know Your Customers' Jobs to Be Done (HBR, 2016)", url: "https://hbr.org/2016/09/know-your-customers-jobs-to-be-done" }],
    test: "Pick a feature you shipped. Can you name a customer who changed their behaviour because of it?"
  },
  {
    id: "FP-003", kind: "axiom", status: "seed", title: "Most ideas are wrong at first",
    statement: "Before evidence, we cannot know whether an idea will work. Many of our ideas will not deliver what we expect.",
    why: "Cagan's four big risks (value, usability, feasibility, viability) exist because any of them can sink an idea, and none can be known in advance by opinion alone.",
    builtOn: [], sources: [{ title: "SVPG, The Four Big Risks", url: "https://svpg.com/four-big-risks/" }],
    test: "Look back at the last five things your team shipped. How many hit the outcome you predicted?"
  },
  {
    id: "FP-004", kind: "axiom", status: "seed", title: "Value delivered later is worth less",
    statement: "Waiting has a cost: every week a valuable thing is not live, its value (or the loss it prevents) is not being collected.",
    why: "This is the time value of money applied to product work. SAFe and Reinertsen call it cost of delay.",
    builtOn: [], sources: [{ title: "SAFe, Weighted Shortest Job First", url: "https://framework.scaledagile.com/wsjf/" }],
    test: "For one backlog item, estimate what one month of delay costs. Is it zero? If not, you are paying it."
  },
  {
    id: "FP-005", kind: "derived", status: "seed", title: "Test the riskiest assumption first, cheaply",
    statement: "Because ideas are often wrong and capacity is limited, spend the least effort that will tell you whether the biggest risk is real before building the whole thing.",
    builtOn: ["FP-001", "FP-003"], sources: [{ title: "SVPG, The Four Big Risks", url: "https://svpg.com/four-big-risks/" }],
    test: "For your next feature, write the one assumption that would kill it if false, and the cheapest test for it."
  },
  {
    id: "FP-006", kind: "derived", status: "seed", title: "Rank work by value per unit of effort, over time",
    statement: "When capacity is finite and delay is costly, do first the work that returns the most customer value (or avoided loss) per unit of effort, adjusted for how urgent it is.",
    builtOn: ["FP-001", "FP-002", "FP-004"],
    sources: [{ title: "SAFe, WSJF", url: "https://framework.scaledagile.com/wsjf/" }, { title: "Intercom, RICE", url: "https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/" }],
    test: "Score your top five backlog items with WSJF and RICE. Do both put the same item first? If not, which assumption differs?"
  },
  {
    id: "FP-007", kind: "derived", status: "seed", title: "Describe needs as jobs, not features",
    statement: "Write what the customer is trying to get done and in what circumstance, before naming any solution. Features are guesses about how to serve the job.",
    builtOn: ["FP-002", "FP-003"],
    sources: [{ title: "Christensen et al., HBR 2016", url: "https://hbr.org/2016/09/know-your-customers-jobs-to-be-done" }],
    test: "Rewrite three feature requests as \"When ___, I want to ___, so I can ___\". Does a different solution appear?"
  },
  {
    id: "FP-008", kind: "derived", status: "seed", title: "One person is accountable for value trade-offs",
    statement: "Because every yes is a no to something else, someone must be able to make the final ordering call. If that is a committee, trade-offs stall.",
    builtOn: ["FP-001", "FP-002"],
    sources: [{ title: "The 2020 Scrum Guide", url: "https://scrumguides.org/scrum-guide.html" }],
    test: "Who decides when two stakeholders want conflicting things this sprint? If the answer is \"it depends\", test this principle."
  }
]);
