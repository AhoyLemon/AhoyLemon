---
applyTo: "**/*.sh,**/*.bash,**/*.zsh,**/*.mjs,**/*.cjs"
description: "Conventions for bash, zsh, and Node CLI scripts"
---

# Terminal Script Preferences

For bash, zsh, and Node CLI scripts. Guiding goal: **output should be pretty and easy to digest, without unnecessary cruft.**

## Output

- `chalk` for colored output and `cli-table3` for tabular data — when the script is user-facing or a lasting project tool. For incidental or throwaway scripts in projects that don't already have them, plain output is fine; don't pull dependencies by rote.
- A trusted progress bar (e.g. `cli-progress`) only when a job genuinely warrants it — roughly 3+ seconds of work. Don't add one to fast scripts, and don't add `cli-progress` to devDependencies until a slow job actually needs it.
- Use `clear` judiciously when earlier output no longer needs to be read.
