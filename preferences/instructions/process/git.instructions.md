---
applyTo: "**"
description: "Git, GitHub, commit, branch, and PR conventions"
---

# Git & Code Review Preferences

## GitHub is the source of truth

Unless I say otherwise, treat GitHub as the source of truth for what work exists, what's been decided, and what's done:

1. **Read before assuming.** Before non-trivial work, check the relevant issue(s) and any open PR for context, prior discussion, and acceptance criteria — don't reconstruct requirements from the code or my chat messages alone. Use the `gh` CLI.
2. **Write back to stay in sync.** When you do meaningful work, reflect it on GitHub — open/update an issue, comment on the PR, update its description, close resolved issues. Don't let GitHub go stale while the truth lives only in the code.

If unsure whether something needs a GitHub update, ask.

## Work against an established issue

Strongly prefer working against an open issue — almost every meaningful change should be tied to one. If a task has no issue, flag it and ask whether to file one before starting non-trivial work.

## Commit messages

Start with the issue number when one exists, e.g. `#42 Fix scoring bug`.

## Branch naming

Format: `type_NN--brief-description`, e.g. `issue_31--fix-scoring-bug`.

- **Type** — `issue`, `feature`, `bug`, or `chore`
- **Underscore** separates the type+number from the slug; **hyphens** within the slug
- No associated issue? Use a date instead of the number: `chore_20260527--npm-dependencies`

Avoid forward slashes — Git treats them as a directory hierarchy, which blocks a bare `issue` branch alongside `issue/*` branches and breaks some CI tooling and shell completions.

## Pull requests

When a PR resolves an issue, the merge commit should begin with `This closes #XX`. For multiple issues, give each its own line — GitHub only auto-closes when the keyword is immediately followed by a single reference:

```
This closes #1
This closes #2
This closes #3
```

Do **not** combine them as `This closes #1, #2, #3` — GitHub renders the links but won't close them.

PR descriptions should explain WHY, not just WHAT. The diff shows what; the description carries what the diff can't — motivation, alternatives considered, links to the issue.

## Code comments vs. PR descriptions

Time-bound context ("added for the X flow", "fixes the bug from #123") belongs in the PR/issue, not in code comments — it rots into noise as the code moves on. Put it where it lives forever.

Code comments should explain WHY when the why is non-obvious — a hidden constraint, a subtle invariant, a browser-bug workaround. If a well-named identifier already conveys intent, skip the comment.

## Writing `#` on GitHub

GitHub auto-links a bare `#` followed by a number to an issue or PR. In commit messages, PR descriptions, and comments, only write `#NN` when you actually mean that reference. For finding/item numbering or anything else, write it another way ("Finding 1", "item 3", "step 2") so it doesn't turn into an accidental link.
