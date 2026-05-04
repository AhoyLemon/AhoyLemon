# preferences/

Personal development preferences for use with AI coding tools.

## Files

Everything lives under `instructions/`, organized into three subfolders. All files end in `*.instructions.md` so VS Code's Copilot picks them up automatically (it scans recursively).

### `instructions/code/` — how to write code

- **`architecture.instructions.md`** — stack defaults, architecture, dependencies, code quality, file length, UX philosophy
- **`ts.instructions.md`** — TypeScript preferences
- **`css.instructions.md`** — SCSS/CSS preferences
- **`vue.instructions.md`** — Vue preferences
- **`react.instructions.md`** — React preferences

### `instructions/communication/` — how the AI should talk to me

- **`plan.instructions.md`** — when and how the AI should push back on my ideas

### `instructions/process/` — how work should flow

- **`workflow.instructions.md`** — todo lists for complex tasks, doc updates at end of task
- **`git.instructions.md`** — GitHub-as-source-of-truth, commit/PR conventions, code-comment vs PR-description split

### Other

- **`PROFILE.md`** — bio context about me (role, experience, communication style). Loaded by Claude via the index.
- **`claude/CLAUDE.md`** — Index file Claude Code loads. `@`-imports `PROFILE.md` and everything in `instructions/`.
- **`settings.json.snippet.md`** — VS Code settings snippet that registers the global instructions path

---

## How it works

This repo is the single source of truth for all AI coding preferences.

**Copilot** reads instructions from local files. A single symlink at `~/.github/instructions` points back to `preferences/instructions/` here, and Copilot recursively scans the subfolders for `*.instructions.md` — editing the repo takes effect immediately, no copy step needed.

**Claude Code** reads `~/.claude/CLAUDE.md` at startup. That file contains a single `@` import pointing back to `preferences/claude/CLAUDE.md` here — same principle, same result.

---

## First-time setup

### Step 1 — VS Code settings (all platforms)

Open your user `settings.json` via `Cmd/Ctrl+Shift+P` → **"Open User Settings (JSON)"** and add:

```json
"chat.instructionsFilesLocations": {
  ".github/instructions": true,
  "~/.github/instructions": true
}
```

VS Code scans these folders recursively for `*.instructions.md`, so the subfolders inside `instructions/` are picked up without listing them individually.

---

### Step 2 — Copilot symlink

A single folder-level symlink replaces the old per-file approach. New files added to the repo get picked up automatically.

#### macOS / Linux

```sh
# If upgrading from a previous setup, first: rm -rf ~/.github/instructions
mkdir -p ~/.github
ln -s ~/Repos/AhoyLemon/preferences/instructions ~/.github/instructions
```

#### Windows 11

Enable Developer Mode via **Settings → System → For developers → Developer Mode**, then in PowerShell:

```powershell
# If upgrading from a previous setup, first: Remove-Item -Recurse -Force "$HOME\.github\instructions"
New-Item -ItemType Directory -Force -Path "$HOME\.github"
New-Item -ItemType SymbolicLink -Path "$HOME\.github\instructions" -Target "I:\Sites\AhoyLemon\preferences\instructions" -Force
```

Alternatively, run PowerShell as Administrator and skip Developer Mode.

---

### Step 3 — Claude Code

`~/.claude/CLAUDE.md` needs to contain a single line that `@`-imports the repo's index file. The leading `@` is what makes Claude treat the line as an import directive (without it, Claude reads it as plain text and nothing gets loaded). The target is the repo's `claude/CLAUDE.md` — the file that itself `@`-imports the rest.

#### macOS / Linux

```sh
mkdir -p ~/.claude
echo '@/Users/darrin.mack/Repos/AhoyLemon/preferences/claude/CLAUDE.md' > ~/.claude/CLAUDE.md
```

#### Windows 11 (PowerShell)

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\.claude"
Set-Content "$HOME\.claude\CLAUDE.md" '@{YourReposDirectory}\AhoyLemon\preferences\claude\CLAUDE.md'
```

👆 fix the path for {YourReposDirectory} before copy/pasting (use an absolute path, e.g. `/Users/you/Repos`)

> ⚠️ This command **overwrites** `~/.claude/CLAUDE.md`. If you've added personal `@`-imports there (like `@~/.claude/profile.md`), back the file up first or re-add those lines after running.

---

## Setting up a new machine

1. Clone this repo
2. Add the VS Code settings snippet (Step 1)
3. Run the Copilot symlink command for your platform (Step 2)
4. Run the Claude Code setup command for your platform (Step 3)

---

## Per-project instructions

Individual projects may have a `.github/instructions/` folder with repo-specific conventions. These are additive — Copilot uses both. Project-level instructions take priority when they conflict with these global ones.

---

## Testing that preferences loaded

### Copilot

In VS Code, open Copilot Chat and ask:

> I'm starting a fresh project. What package manager, build tool, and framework should I use?

Expected answer: **bun**, **Vite**, **Vue**. If Copilot gives a generic answer (npm, webpack, React), the instructions aren't loading — confirm the `chat.instructionsFilesLocations` setting is saved and that `~/.github/instructions` points at `preferences/instructions/`.

### Claude Code

Start a session and ask:

> I need to add some interactivity to a page. Should I reach for a backend endpoint or handle it on the frontend?

Expected answer: handle it on the frontend first — composable, computed, or smart component before any API endpoint. If Claude gives a neutral answer, check that `~/.claude/CLAUDE.md` contains the `@` import line and that the path points to the correct location on this machine.
