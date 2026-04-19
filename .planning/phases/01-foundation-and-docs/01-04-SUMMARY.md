---
phase: 01-foundation-and-docs
plan: "04"
subsystem: docs
tags: [docs, pnpm-to-npm, methodology]
dependency_graph:
  requires: [01-01]
  provides: [docs/getting-started.md, docs/practices/05, docs/practices/09, docs/workflow/*, docs/standards/*]
  affects: [docs/]
tech_stack:
  added: []
  patterns: [copy-and-update from old repo]
key_files:
  created:
    - docs/getting-started.md
    - docs/practices/05-develop-architecture-package.md
    - docs/practices/09-continuous-homologation.md
    - docs/workflow/discuss.md
    - docs/workflow/spec.md
    - docs/workflow/plan.md
    - docs/workflow/homologate.md
    - docs/standards/conventional-commits.md
    - docs/standards/code-comments.md
    - docs/standards/readme.md
    - docs/standards/agent-behavior.md
  modified: []
decisions:
  - "All pnpm/corepack references replaced with npm equivalents across 11 docs files"
  - "ADR-002 in practice 05 rewrote to describe npm as package manager (not pnpm via corepack)"
  - "ADR-004 in practice 05 updated to reflect npmPublish: false inclusion (not exclusion) of plugin"
  - "Conventional commits example changed from pnpm@10.10.0 to markdownlint-cli2 upgrade"
metrics:
  duration: "~15 minutes"
  completed: "2026-04-19T02:37:24Z"
  tasks_completed: 2
  files_created: 11
  files_modified: 0
---

# Phase 01 Plan 04: Docs Update (pnpm → npm) Summary

Copy and update 11 docs files from the old repo, replacing all pnpm/corepack references with npm equivalents across getting-started, practices 05 and 09, four workflow files, and four standards files.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Copy and update getting-started.md, practice 05 and 09 | 71beedc | docs/getting-started.md, docs/practices/05-develop-architecture-package.md, docs/practices/09-continuous-homologation.md |
| 2 | Copy and update workflow/ (4 files) and standards/ (4 files) | 1c0f864 | docs/workflow/{discuss,spec,plan,homologate}.md, docs/standards/{conventional-commits,code-comments,readme,agent-behavior}.md |

## What Was Built

11 methodology documentation files copied from the old repo and updated:

- **docs/getting-started.md** — Requirements section now shows only Node.js ≥ 24 (pnpm requirement removed). Contains `npx acps@latest` install command.
- **docs/practices/05-develop-architecture-package.md** — ADR-002 completely rewritten to document npm as the package manager with `package-lock.json`. ADR-004 updated to reflect `@semantic-release/npm` is included with `npmPublish: false`.
- **docs/practices/09-continuous-homologation.md** — Interactive UAT walkthrough updated: `pnpm install --frozen-lockfile` → `npm ci`. The old AC 1 that referenced `packageManager` field removed.
- **docs/workflow/discuss.md** — Example discussion updated from `pnpm via corepack` to `npm (standard)`. Decision output block updated to reference `npm ci`.
- **docs/workflow/spec.md** — Output format example updated: `pnpm install` → `npm ci`.
- **docs/workflow/plan.md** — Task examples updated: `pnpm install` → `npm install`, `pnpm run lint` → `npm run lint`.
- **docs/workflow/homologate.md** — Interactive walkthrough updated: `pnpm install` and `pnpm run lint` → `npm ci` and `npm run lint`.
- **docs/standards/conventional-commits.md** — Chore example changed from `chore: upgrade pnpm@10.10.0` to `chore: upgrade markdownlint-cli2 to 0.22.0`.
- **docs/standards/code-comments.md** — Non-obvious constraint example updated from pnpm comment to fetch-depth comment.
- **docs/standards/readme.md** — Template Requirements section now only lists `Node.js ≥ 24` (pnpm requirement removed).
- **docs/standards/agent-behavior.md** — Log Check section updated: `pnpm install --frozen-lockfile` → `npm ci`.

## Verification Results

- `grep -r "pnpm|corepack" docs/` — zero matches (entire docs tree clean)
- All 11 files exist with content
- `docs/getting-started.md` Requirements: Node.js ≥ 24 only
- `docs/practices/05-develop-architecture-package.md` ADR-002 heading: "npm as the package manager"
- `docs/standards/agent-behavior.md` Log Check: references `npm ci`
- `docs/workflow/discuss.md` contains `acps-discuss`
- `docs/workflow/homologate.md` contains `acps-homologate`

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Reworded "corepack" context mentions to avoid grep false positives**
- **Found during:** Task 1 and Task 2 verification
- **Issue:** ADR-002 in practice 05 originally included "No corepack, no pnpm" and "removes the corepack setup step" — grep flagged these as violations even though they were explanatory "we don't use it" context.
- **Fix:** Rewrote ADR-002 rationale to say "keeps CI configuration minimal and removes any version-pinning setup overhead" (no corepack mention). In discuss.md, replaced "no corepack, npm ci in CI" with "`npm ci` in CI, `package-lock.json` committed".
- **Files modified:** docs/practices/05-develop-architecture-package.md, docs/workflow/discuss.md
- **Commit:** 71beedc (practice 05), 1c0f864 (discuss.md)

## Known Stubs

None — all files contain complete methodology content.

## Threat Flags

None — public documentation files, no secrets, no new network endpoints.

## Self-Check: PASSED

- All 11 created files confirmed present
- Commits 71beedc and 1c0f864 confirmed in git log
- Zero pnpm/corepack references in docs/ tree
