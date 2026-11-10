WAPM_GAME({
  instructions: "Is this a job the customer is trying to get done, or a feature request (a guessed solution)?",
  buckets: [{ id: "job", label: "🎯 Job to be done" }, { id: "feature", label: "🧩 Feature request" }],
  outro: "Feature requests are clues. Ask \"what are you trying to get done when you want that?\" to find the job behind them.",
  items: [
    { text: "Add a dark mode toggle to the app.", bucket: "feature", why: "It names a solution. The job might be \"read comfortably at night without waking my partner\"." },
    { text: "When I'm driving to work early, I want something that keeps me busy and full until lunch.", bucket: "job", why: "Circumstance + progress wanted, no solution named. This is the milkshake job." },
    { text: "We need a CSV export button on the report.", bucket: "feature", why: "The job may be \"show my manager the numbers in our weekly meeting\", which a shared link might serve better." },
    { text: "When a payment fails abroad, I want to know quickly whether it was my card or the shop, so I can pay another way.", bucket: "job", why: "It describes the situation and the progress, and leaves the solution open." },
    { text: "Build a chatbot for customer support.", bucket: "feature", why: "A chatbot is one possible solution. What job is the customer stuck on when they contact support?" },
    { text: "When I join a new team, I want to understand who decides what, so I don't waste my first month.", bucket: "job", why: "Clear circumstance and desired progress." },
    { text: "Let users upload a profile photo.", bucket: "feature", why: "Solution first. The job could be \"help riders recognise their driver at pickup\"." },
    { text: "When I'm planning the next quarter, I want to defend my priorities with numbers, so stakeholders stop re-opening decisions.", bucket: "job", why: "This one is your job as a PM, and it's why the prioritization unit exists." }
  ]
});
