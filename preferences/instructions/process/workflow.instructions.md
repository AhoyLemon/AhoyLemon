---
applyTo: "**"
---

# Workflow Preferences

How I expect tasks to start and end.

## Starting complex tasks

Before beginning any multi-step task (adding a feature, refactoring, debugging something non-trivial), produce a numbered todo list of the steps involved. This is not optional for complex work — do not skip it.

Mark each item as complete as soon as it's done. Do not batch completions at the end. The list should reflect current progress at all times, not just the final state.

## Ending tasks

After completing a task, check whether any documentation should be updated. The rule depends on scope:

**Inside the project — update without asking:**
- README files
- Inline JSDoc/TSDoc
- AGENTS.md and/or CLAUDE.md
- Anything in a `docs/` folder
- Any other project-scoped documentation

Keep these as current as possible. Don't wait for permission.

**Outside the project — ask first:**
- Files in `/Users/darrin.mack/Repos/AhoyLemon/preferences/instructions/`
- Global memory or preference files of any kind

If the task surfaced something that might warrant updating these, flag it and ask before making changes. It may be a project-specific outlier that shouldn't be generalized.
