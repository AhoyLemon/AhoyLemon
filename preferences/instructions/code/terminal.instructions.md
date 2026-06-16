---
applyTo: "**/*.sh,**/*.bash,**/*.zsh,**/*.mjs,**/*.cjs"
description: "Conventions for bash, zsh, and Node CLI scripts"
---

# Terminal Script Preferences

For bash, zsh, and Node CLI scripts. Guiding goal: **output should be pretty and easy to digest, without unnecessary cruft.**

## Output

- `chalk` for colored output.
- `cli-table3` for tabular data.
- A trusted progress bar (e.g. `cli-progress`) only when a job genuinely warrants it — roughly 3+ seconds of work. Don't add one to fast scripts, and don't add `cli-progress` to devDependencies until a slow job actually needs it.
- Use `clear` judiciously when earlier output no longer needs to be read.

## Dependencies

Lean on what's already in the project before adding a new package (see architecture.instructions.md).
