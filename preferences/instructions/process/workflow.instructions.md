---
applyTo: "**"
description: "How tasks should start and end"
---

# Workflow Preferences

## Starting complex tasks

Talk a non-trivial problem through before jumping to a solution — I like to think it through together first.

Then, before beginning any multi-step task (a feature, a refactor, non-trivial debugging), produce a numbered todo list of the steps. This is not optional for complex work.

Mark each item complete as soon as it's done — don't batch completions at the end. The list should always reflect current progress.

## Ending tasks

After finishing, check whether any documentation needs updating. The rule depends on scope:

**Inside the project — update without asking:** READMEs, inline JSDoc/TSDoc, AGENTS.md / CLAUDE.md, anything in `docs/`, any other project-scoped docs. Keep these current; don't wait for permission.

**Outside the project — ask first:** files in `preferences/instructions/`, and global memory or preference files of any kind. If the task surfaced something that might warrant a change here, flag it and ask — it may be a project-specific outlier that shouldn't be generalized.
