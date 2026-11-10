/* Data for the reusable "sort" engine (app/games/sort.html).
 * In lesson.js: { type: "game", title: "...", engine: "sort", data: "sort-data.js" } */
WAPM_GAME({
  instructions: "<What the learner decides for each card>",
  buckets: [{ id: "a", label: "<Bucket A>" }, { id: "b", label: "<Bucket B>" }],
  outro: "<The lesson to take away after playing>",
  items: [
    { text: "<Statement 1>", bucket: "a", why: "<Why it belongs in A>" },
    { text: "<Statement 2>", bucket: "b", why: "<Why it belongs in B>" }
  ]
});
