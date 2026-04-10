# preferences/

Personal development preferences for use with AI coding tools.

## Files

- **`personal.instructions.md`** — Global Copilot instructions in VS Code's `.instructions.md` format
- **`vscode-settings-snippet.json`** — VS Code settings snippet that registers the global instructions path

---

## How it works

VS Code reads Copilot instructions from local files only — there's no URL or remote reference support. The approach here uses a **symlink**: `personal.instructions.md` lives in this repo as the single source of truth, and a symlink in your home directory points back to it. Editing the file in the repo takes effect immediately everywhere, with no copy step.

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

The second entry is what makes this global — VS Code expands `~/` to your home directory on all platforms.

---

### Step 2 — Create the symlink

#### macOS

```sh
mkdir -p ~/.github/instructions
for f in ~/Repos/AhoyLemon/preferences/instructions/*.instructions.md; do
  ln -sf "$f" ~/.github/instructions/"$(basename "$f")"
done
```

#### Linux Mint

```sh
mkdir -p ~/.github/instructions
for f in ~/Repos/AhoyLemon/preferences/instructions/*.instructions.md; do
  ln -sf "$f" ~/.github/instructions/"$(basename "$f")"
done
```

#### Windows 11

Option A — Developer Mode (no admin required). Enable it via **Settings → System → For developers → Developer Mode**, then in PowerShell:

```powershell
$src = "I:\Sites\AhoyLemon\preferences\instructions"
$dest = "$HOME\.github\instructions"
New-Item -ItemType Directory -Force -Path $dest
Get-ChildItem -Path $src -Filter *.instructions.md | ForEach-Object {
  New-Item -ItemType SymbolicLink -Path (Join-Path $dest $_.Name) -Target $_.FullName -Force
}
```

Option B — Run PowerShell as Administrator and skip Developer Mode, using the same commands above.

---

## Updating instruction files

Because the home directory files are symlinks back to this repo, **just edit the files in `preferences/instructions/`**. Changes take effect immediately in VS Code with no additional steps on any platform.

If for some reason you used a plain file copy instead of a symlink (e.g. you couldn't get symlinks working on Windows), you'll need to re-copy the files after each edit:

### macOS
```zsh
mkdir -p ~/.github/instructions
cp ~/Repos/AhoyLemon/preferences/instructions/*.instructions.md ~/.github/instructions/
```

#### Linux Mint
```sh
mkdir -p ~/.github/instructions
cp ~/Repos/AhoyLemon/preferences/instructions/*.instructions.md ~/.github/instructions/
```

#### Windows 11 (PowerShell)
```powershell
$src = "C:\path\to\repo\preferences\instructions"
$dest = "$HOME\.github\instructions"
New-Item -ItemType Directory -Force -Path $dest
Copy-Item "$src\*.instructions.md" $dest -Force
```

---

## Setting up a new machine

1. Clone this repo
2. Apply the VS Code settings snippet (Step 1 above)
3. Run the symlink command for your platform (Step 2 above), pointing at the cloned repo path

---

## Relationship to per-project instructions

Individual projects may have a `.github/instructions/` folder with repo-specific conventions. These are additive — Copilot uses both. Project-level instructions take priority when they conflict with these global ones.
