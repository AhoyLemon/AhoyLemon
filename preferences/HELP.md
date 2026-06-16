# preferences/

Personal development preferences for use with AI coding tools.

## Files

Everything lives under `instructions/`, in subfolders. All files end in `*.instructions.md` so VS Code's Copilot picks them up automatically (it scans recursively).

### `instructions/code/` — how to write code

- **`architecture.instructions.md`** — stack/framework defaults, architecture, dependencies, code quality, file length, UX
- **`ts.instructions.md`** — TypeScript
- **`css.instructions.md`** — SCSS/CSS
- **`markup.instructions.md`** — semantic HTML, Pug, and SVG
- **`vue.instructions.md`** — Vue
- **`terminal.instructions.md`** — bash/zsh/Node CLI scripts

### `instructions/communication/` — how the AI should talk to me

- **`plan.instructions.md`** — when and how to push back on my ideas

### `instructions/process/` — how work should flow

- **`workflow.instructions.md`** — discuss-first, todo lists for complex tasks, doc updates at end of task
- **`git.instructions.md`** — GitHub-as-source-of-truth, commit/PR/branch conventions
- **`testing.instructions.md`** — TDD-on-bugfix, meaningful coverage over volume

### `instructions/tools/` — tool-specific behavior

- **`notion.instructions.md`** — Notion API/MCP usage, two-workspace routing, content style

### Other

- **`claude/PROFILE.md`** — bio and communication style. Loaded by Claude via the index.
- **`claude/CLAUDE.md`** — index Claude Code loads; `@`-imports `PROFILE.md` and everything in `instructions/`.
- **`Codex/AGENTS.md`** — the equivalent index for Codex.
- **`settings.json.snippet.md`** — VS Code settings snippet that registers the global instructions path.

---

## How it works

This repo is the single source of truth for all AI coding preferences.

**Copilot** reads instructions from local files. A single symlink at `~/.github/instructions` points back to `preferences/instructions/` here, and Copilot recursively scans the subfolders for `*.instructions.md` — editing the repo takes effect immediately.

**Claude Code** reads `~/.claude/CLAUDE.md` at startup. That file contains a single `@` import pointing back to `preferences/claude/CLAUDE.md` here — same principle.

---

## First-time setup

### Step 1 — VS Code settings (all platforms)

Open your user `settings.json` (`Cmd/Ctrl+Shift+P` → **"Open User Settings (JSON)"**) and add:

```json
"chat.instructionsFilesLocations": {
  ".github/instructions": true,
  "~/.github/instructions": true
}
```

VS Code scans these folders recursively, so the subfolders are picked up without listing them.

### Step 2 — Copilot symlink

A single folder-level symlink. New files added to the repo get picked up automatically.

#### macOS / Linux

```sh
# If upgrading from a previous setup, first: rm -rf ~/.github/instructions
mkdir -p ~/.github
ln -s ~/Repos/AhoyLemon/preferences/instructions ~/.github/instructions
```

#### Windows 11

Enable Developer Mode (**Settings → System → For developers → Developer Mode**), then in PowerShell:

```powershell
# If upgrading from a previous setup, first: Remove-Item -Recurse -Force "$HOME\.github\instructions"
$repo = "I:\Sites\AhoyLemon"   # ← change to your clone location
New-Item -ItemType Directory -Force -Path "$HOME\.github"
New-Item -ItemType SymbolicLink -Path "$HOME\.github\instructions" -Target "$repo\preferences\instructions" -Force
```

Alternatively, run PowerShell as Administrator and skip Developer Mode.

### Step 3 — Claude Code

`~/.claude/CLAUDE.md` needs a single line that `@`-imports the repo's index file. The leading `@` is what makes Claude treat the line as an import (without it, Claude reads it as plain text and loads nothing). The target is the repo's `claude/CLAUDE.md`, which itself `@`-imports the rest.

#### macOS / Linux

```sh
mkdir -p ~/.claude
echo '@/Users/darrin.mack/Repos/AhoyLemon/preferences/claude/CLAUDE.md' > ~/.claude/CLAUDE.md
```

#### Windows 11 (PowerShell)

```powershell
$repo = "I:\Sites\AhoyLemon"   # ← change to your clone location
New-Item -ItemType Directory -Force -Path "$HOME\.claude"
Set-Content "$HOME\.claude\CLAUDE.md" "@$repo\preferences\claude\CLAUDE.md"
```

> ⚠️ This **overwrites** `~/.claude/CLAUDE.md`. If you've added personal `@`-imports there, back the file up first or re-add them after.

---

## Setting up a new machine

1. Clone this repo
2. Add the VS Code settings snippet (Step 1)
3. Run the Copilot symlink command for your platform (Step 2)
4. Run the Claude Code setup command for your platform (Step 3)

---

## Per-project instructions

Individual projects may have a `.github/instructions/` folder with repo-specific conventions. These are additive — Copilot uses both, and project-level instructions win when they conflict with these global ones.

---

## Testing that preferences loaded

### Copilot

In Copilot Chat, ask:

> I'm starting a fresh project. What package manager, build tool, and framework should I use?

Expected: **bun**, **Vite**, **Vue**. A generic answer (npm, webpack, React) means the instructions aren't loading — confirm `chat.instructionsFilesLocations` is saved and `~/.github/instructions` points at `preferences/instructions/`.

### Claude Code

Start a session and ask:

> I need to add some interactivity to a page. Backend endpoint or handle it on the frontend?

Expected: frontend first — composable, computed, or smart component before any API endpoint. A neutral answer means `~/.claude/CLAUDE.md` isn't importing correctly — check the `@` line and its path.
