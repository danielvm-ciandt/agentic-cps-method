---
phase: 01-foundation-and-docs
plan: "05"
subsystem: documentation
tags: [readme, docs, public-face, kickass-readme]
dependency_graph:
  requires: [01-03, 01-04]
  provides: [README.md]
  affects: []
tech_stack:
  added: []
  patterns: [kickass-readme standard]
key_files:
  created:
    - README.md
  modified: []
decisions:
  - "D-09 honored: fresh README written — no content copied from old repo"
  - "Requirements section contains only Node.js >= 24 (no pnpm, no corepack)"
  - "No badges in v1 — CI not yet set up at time of writing"
metrics:
  duration: "2m 19s"
  completed: "2026-04-19"
  tasks_completed: 1
  tasks_total: 1
---

# Phase 1 Plan 5: Write README — Summary

Fresh README.md written following kickass-readme standard (D-09): title + one-liner, why-it-exists drawn from vision.md, install command (npx acps@latest), quick start (5 commands), GSD loop, docs links, and Node.js >= 24 requirement only.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Write fresh README.md | e764c89 | README.md |

## Deviations from Plan

None — plan executed exactly as written.

## Success Criteria Verification

| Criterion | Status |
|-----------|--------|
| README.md exists at repo root | PASS |
| Contains `npx acps@latest` | PASS |
| Contains link to `docs/getting-started.md` | PASS |
| `## Requirements` section with only `Node.js >= 24` | PASS |
| No `pnpm` references | PASS |
| No `corepack` references | PASS |
| Contains `/acps-help`, `/acps-init`, `/acps-branch` | PASS |
| GSD loop sequence present | PASS |
| More than 20 lines (not a stub) — 49 lines | PASS |

## Self-Check: PASSED

- README.md exists: FOUND
- Commit e764c89 exists: FOUND
- No stubs detected
- No threat flags: README is intentionally public, contains no secrets or internal paths
