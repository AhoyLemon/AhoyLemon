---
applyTo: "**"
description: "Git, GitHub, commit, branch, and PR conventions"
---

# Git & Code Review Preferences

## GitHub is the source of truth

Unless I say otherwise, treat GitHub as the source of truth for what work exists, what's been decided, and what's done:

1. **Read before assuming.** Before non-trivial work, check the relevant issue(s) and any open PR for context, prior discussion, and acceptance criteria — don't reconstruct requirements from the code or my chat messages alone.
2. **Write back to stay in sync.** When you do meaningful work, reflect it on GitHub — open/update an issue, comment on the PR, update its description, close resolved issues. Don't let GitHub go stale while the truth lives only in the code.

If unsure whether something needs a GitHub update, ask.

## GitHub tool selection

Use the GitHub connector/app or the `gh` CLI according to the operation; neither is reserved for, or prohibited to, a particular agent.

- Prefer one integration per operation. Do not automatically retry a failed operation through the other path without identifying the failure's cause.
- The connector is well suited to structured repository, issue, PR, comment, label, and reaction work. `gh` is well suited to local-branch context, authentication checks, GitHub Actions logs, and API operations the connector does not expose cleanly.
- When using `gh` or `gh api`, be precise about shell quoting and HTTP method: quote array-style form fields such as `'labels[]=post-workshop feedback'`, and force `GET` when passing query parameters to a read endpoint.
- In Codex's restricted terminal, request elevated network access for any `gh` command that needs GitHub rather than first running an expected-to-fail sandboxed probe. This is an execution constraint, not a tool-selection rule.

## Work against an established issue

Strongly prefer working against an open issue — almost every meaningful change should be tied to one. If a task has no issue, flag it and ask whether to file one before starting non-trivial work.

## Commit messages

The commit title includes the issue number when one exists, ideally at the start, e.g. `#42 Fix scoring bug`. (`This closes #XX` lines belong in the PR description / merge-commit body, not the title — see Pull requests.)

## Branch naming

Format: `type_NN--brief-description`, e.g. `issue_31--fix-scoring-bug`.

- **Type** — `issue`, `feature`, `bug`, or `chore`
- **Underscore** separates the type+number from the slug; **hyphens** within the slug
- No associated issue? Use a date instead of the number: `chore_20260527--npm-dependencies`

Avoid forward slashes — Git treats them as a directory hierarchy, which blocks a bare `issue` branch alongside `issue/*` branches and breaks some CI tooling and shell completions.

## Worktrees

Default to a branch cut from `main` (named per Branch naming above), worked in the main checkout — not a worktree. Worktrees make changes harder to verify personally, so they are the exception, not the default.

Worktrees are fine when genuinely warranted — parallel workflows where multiple agents mutate files at the same time, or work that must not disturb the current checkout. If you believe one is warranted, say why and ask permission before creating it.

This is enforced technically, not just by instruction: `~/.claude/settings.json` gates the `EnterWorktree` tool with `permissions.ask` plus a `PreToolUse` hook forcing an approval prompt, globally across repos. That also covers the case where a background job's harness forces worktree isolation before it can edit files — the forced call to `EnterWorktree` still has to clear the same approval gate, so it can't happen silently. Don't treat harness-enforced isolation as an exception to asking first; if you hit it, the gate will stop you and ask on your behalf.

## Pull requests

When a PR resolves an issue, the PR description (and thus the merge-commit body) should begin with `This closes #XX`. For multiple issues, give each its own line — GitHub only auto-closes when the keyword is immediately followed by a single reference:

```
This closes #1
This closes #2
This closes #3
```

Do **not** combine them as `This closes #1, #2, #3` — GitHub renders the links but won't close them.

PR descriptions should explain WHY, not just WHAT. The diff shows what; the description carries what the diff can't — motivation, alternatives considered, links to the issue.

## Markdown formatting

PR/issue bodies and commit-message bodies follow [markdown.instructions.md](../code/markdown.instructions.md).

## Code comments vs. PR descriptions

Time-bound context ("added for the X flow", "fixes the bug from #123") belongs in the PR/issue, not in code comments — it rots into noise as the code moves on. Put it where it lives forever.

Code comments should explain WHY when the why is non-obvious — a hidden constraint, a subtle invariant, a browser-bug workaround. If a well-named identifier already conveys intent, skip the comment.

## Writing `#` on GitHub

GitHub auto-links a bare `#` followed by a number to an issue or PR. In commit messages, PR descriptions, and comments, only write `#NN` when you actually mean that reference. For finding/item numbering or anything else, write it another way ("Finding 1", "item 3", "step 2") so it doesn't turn into an accidental link.
