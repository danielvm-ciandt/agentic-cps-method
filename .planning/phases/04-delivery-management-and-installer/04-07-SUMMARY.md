---
phase: 04-delivery-management-and-installer
plan: "07"
subsystem: installer
tags: [installer, npx, bin, acps, interactive, non-interactive, ide-paths]
dependency_graph:
  requires: [04-01, 04-02, 04-03, 04-04, 04-05, 04-06]
  provides: [bin/install.js]
  affects: [bin/install.js]
tech_stack:
  added: [node-esm, inquirer-prompts, fs-cpSync]
  patterns: [esm-shebang, fileURLToPath-dirname, homedir-paths, config-merge, flag-detection]
key_files:
  created: []
  modified:
    - bin/install.js
decisions:
  - id: D-ide-paths-research
    choice: "Used RESEARCH.md verified paths (windsurf global → ~/.codeium/windsurf/memories, cline global → ~/Documents/Cline/Rules, etc.)"
    reason: "RESEARCH.md corrected D-02 approximations with canonical IDE documentation"
  - id: D-non-interactive-detection
    choice: "nonInteractive = flaggedRuntimes.length > 0 AND flagLocation AND flagEstimation AND flagLang all set"
    reason: "All four required for a complete non-interactive install; missing any falls back to prompts"
self_check: PASSED
---

## What Was Built

Replaced the 7-line stub in `bin/install.js` with the full interactive installer (203 lines):

- **Shebang + ESM imports** — `@inquirer/prompts`, `fs`, `path`, `os`, `url` — no CommonJS
- **`fileURLToPath(import.meta.url)`** — ESM-safe `__dirname` equivalent; no `__dirname` usage
- **`homedir()`** — all user paths use `os.homedir()`; no `~` literals
- **`IDE_PATHS`** constant — hardcoded map of 10 IDEs × 2 locations (global/local), verified paths
- **`--help` flag** — prints usage and exits 0 immediately
- **Flag detection** — parses `--claude`, `--cursor`, etc. plus `--global/--local`, `--estimation`, `--lang`, `--doc-lang`
- **Non-interactive mode** — when all 4 required flags present, skips prompts entirely
- **Interactive mode** — `input`, `checkbox`, `select` prompts for all 6 fields
- **`--estimation` validation** — validates against `['bcp_full', 'bcp_simplified', 'none']`; exits 1 if invalid
- **`cpSync` copy** — recursive skills copy to each selected IDE destination
- **Config merge** — spreads `existing` first (preserves `planningDir` from acps-init) then installer fields
- **`installed_at`** — ISO timestamp written on every install

## Deviations

None — 203 lines (target was under 200; 3-line overage from flag parsing clarity).

## Self-Check

- [x] `node --check bin/install.js` exits 0
- [x] `node bin/install.js --help` exits 0, prints usage
- [x] contains `import { checkbox, input, select } from '@inquirer/prompts'`
- [x] contains `fileURLToPath(import.meta.url)`
- [x] contains `homedir()` — no `~` literals
- [x] contains `cpSync` with `{ recursive: true }`
- [x] contains `IDE_PATHS` with all 10 IDE keys
- [x] contains both `global` and `local` path entries for each IDE
- [x] config merge spreads `existing` before installer fields
- [x] contains `installed_at: new Date().toISOString()`
- [x] `nonInteractive` detection covers all 4 required flags
- [x] `validEstimations` check present
- [x] INST-01, INST-02, INST-03, INST-04 requirements covered
