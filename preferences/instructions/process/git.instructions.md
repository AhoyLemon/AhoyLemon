---
applyTo: "**"
---

# Git & Code Review Preferences

## GitHub is the source of truth

Unless I explicitly say otherwise for a given task, treat GitHub as the source of truth for what work exists, what's been decided, and what's been done. That has two practical implications:

1. **Read from GitHub before assuming.** Before starting non-trivial work, check the relevant issue(s) and any open PR for context, prior discussion, and acceptance criteria. Don't reconstruct the requirements from the code or my chat messages alone if there's an issue you could be reading instead. Use the `gh` CLI for this.
2. **Write back to GitHub to keep it in sync.** When you do meaningful work, reflect it on GitHub — open or update an issue, comment on the relevant PR, update the PR description, close issues that are actually resolved. Don't leave the truth in the code while GitHub goes stale.

If you're unsure whether something rises to the level of needing a GitHub update, ask. Better to surface it than to let GitHub drift out of sync silently.

## Work against an established issue

Strongly prefer to work against an open GitHub issue. Almost every meaningful change should be tied to one. If a task you've been given doesn't have an issue, flag it and ask whether to file one before starting non-trivial work — drive-by changes that aren't tracked anywhere make history hard to read later.

## Commit messages

Commit messages should start with the relevant issue number when one exists, e.g. `#42 Fix scoring bug`.

## Branch naming

Use the format `type_NN-brief-description`, e.g. `issue_31-fix-scoring-bug`.

- **Type** — `issue`, `feature`, `bug`, or `chore`
- **Underscore** separates the type+number block from the description slug
- **Hyphens** within the description

When there's no associated issue, replace the issue number with a date (`YYYYMMDD`), e.g. `chore_20260527-npm-dependencies`. Prefer working against an issue when the work is non-trivial — see the section below on working against an established issue.

Avoid forward slashes in branch names. Git treats slashes as a directory hierarchy, which prevents having a bare `issue` branch alongside `issue/*` branches and breaks some CI tooling and shell completions.

## Pull requests

When a PR resolves an issue, the merge commit should begin with `This closes #XX`.

If a PR resolves multiple issues, give each its own line — GitHub only auto-closes when the keyword is immediately followed by a single issue reference:

```
This closes #1
This closes #2
This closes #3
```

Do **not** combine them like `This closes #1, #2, #3` — GitHub will render the issue links but won't close them on merge.

PR descriptions should explain WHY the change is being made, not just WHAT it does. The diff already shows what — the description is for context the diff can't carry: motivation, alternatives considered, links back to the issue.

## Code comments vs. PR descriptions

Context that's tied to a moment in time belongs in the PR description, not in code comments. Things like "added for the X flow" or "fixes the bug from #123" rot as the codebase evolves — they age into noise once the surrounding code has moved on. Put that information where it lives forever (the PR/issue), not where it'll mislead a future reader.

Code comments should explain WHY when the why is non-obvious — a hidden constraint, a subtle invariant, a workaround for a specific browser bug. If a well-named identifier already conveys the intent, don't add a comment.
