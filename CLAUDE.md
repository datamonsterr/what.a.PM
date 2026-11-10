@AGENTS.md

## Claude Code notes

- Skills live in `.claude/skills/<name>/SKILL.md` and load automatically in Claude Code. Other agents can read the same files as plain instructions.
- Before finishing any task that adds or changes content, run `node tools/validate.js`.
- When a thread of work ends, suggest a skill (new or improved) if the task is likely to repeat.
