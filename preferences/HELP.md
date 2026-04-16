# preferences/

Personal development preferences for use with AI coding tools.

## Files

- **`instructions/personal.instructions.md`** — Global Copilot instructions (VS Code)
- **`instructions/ts.instructions.md`** — TypeScript preferences (VS Code)
- **`instructions/css.instructions.md`** — SCSS/CSS preferences (VS Code)
- **`instructions/vue.instructions.md`** — Vue preferences (VS Code)
- **`claude/CLAUDE.md`** — Consolidated preferences for Claude Code (Claude CLI)
- **`settings.json.snippet.md`** — VS Code settings snippet that registers the global instructions path

---

## How it works

This repo is the single source of truth for all AI coding preferences.

**Copilot** reads instructions from local files. A symlink in `~/.github/instructions/` points back to the files here — editing the repo takes effect immediately, no copy step needed.

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

---

### Step 2 — Copilot symlinks

#### macOS / Linux

```sh
mkdir -p ~/.github/instructions
for f in ~/Repos/AhoyLemon/preferences/instructions/*.instructions.md; do
  ln -sf "$f" ~/.github/instructions/"$(basename "$f")"
done
```

#### Windows 11

Enable Developer Mode via **Settings → System → For developers → Developer Mode**, then in PowerShell:

```powershell
$src = "I:\Sites\AhoyLemon\preferences\instructions"
$dest = "$HOME\.github\instructions"
New-Item -ItemType Directory -Force -Path $dest
Get-ChildItem -Path $src -Filter *.instructions.md | ForEach-Object {
  New-Item -ItemType SymbolicLink -Path (Join-Path $dest $_.Name) -Target $_.FullName -Force
}
```

Alternatively, run PowerShell as Administrator and skip Developer Mode.

---

### Step 3 — Claude Code

#### macOS / Linux

```sh
mkdir -p ~/.claude
echo '{YourReposDirectory}/AhoyLemon/preferences/claude/CLAUDE.md' > ~/.claude/CLAUDE.md
```

#### Windows 11 (PowerShell)

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\.claude"
Set-Content "$HOME\.claude\CLAUDE.md" '{YourReposDirectory}\AhoyLemon\preferences\claude\CLAUDE.md'
```

👆 fix the path for {YourReposDirectory} before copy/pasting

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

Expected answer: **bun**, **Vite**, **Vue**. If Copilot gives a generic answer (npm, webpack, React), the instructions aren't loading — confirm the `chat.instructionsFilesLocations` setting is saved and that the symlinks exist in `~/.github/instructions/`.

### Claude Code

Start a session and ask:

> I need to add some interactivity to a page. Should I reach for a backend endpoint or handle it on the frontend?

Expected answer: handle it on the frontend first — composable, computed, or smart component before any API endpoint. If Claude gives a neutral answer, check that `~/.claude/CLAUDE.md` contains the `@` import line and that the path points to the correct location on this machine.
