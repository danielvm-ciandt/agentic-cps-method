# Phase 5: Scope & Intelligence — Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-20
**Phase:** 05-scope-intelligence
**Areas discussed:** CR workflow & scope ledger, Intelligence skill depth, State files & resume behavior

---

## CR workflow & scope ledger

| Option | Description | Selected |
|--------|-------------|----------|
| AI auto-registers on description alone | User describes the CR, AI computes BCP/FP delta, writes immediately | ✓ |
| User provides BCP/FP manually | User gives delta numbers, AI validates and writes | |
| Interactive confirm step | AI drafts row, user types 'confirm' to commit | |

**User's choice:** AI auto-registers on description alone
**Notes:** No confirm step — mirrors the low-friction note/capture pattern from acps-note

---

| Option | Description | Selected |
|--------|-------------|----------|
| Warn + display delta, no blocking | Clear overrun banner with exact gap, user can proceed | ✓ |
| Warn + require removal CR | Enforce scope balance before allowing additions | |
| Just display ledger | No overrun distinction | |

**User's choice:** Warn + display the delta, no blocking
**Notes:** acps-scope-manager surfaces information only — never blocks work

---

| Option | Description | Selected |
|--------|-------------|----------|
| Summary header + CR table | Baseline/current/balance header + full CR table | ✓ |
| Full accounting breakdown | Per-epic breakdown + CR history + totals | |
| Single-line status + link | Minimal output | |

**User's choice:** Summary header + CR table

---

## Intelligence skill depth

| Option | Description | Selected |
|--------|-------------|----------|
| Full deep scan — all source files, 4 output docs | Comprehensive codebase read + synthesize 4 docs | ✓ |
| Targeted scan — key files only | Faster, less comprehensive | |
| User-directed — interactive module selection | Most precise, requires user involvement | |

**User's choice:** Full deep scan

---

| Option | Description | Selected |
|--------|-------------|----------|
| Project overview + tech stack + active work snapshot | What/stack/current iteration/last commits/blockers | ✓ |
| Source tree + component list + stack | Structural, misses project state | |
| Condensed acps-document-project output | Requires intel files to exist first | |

**User's choice:** Project overview + tech stack + active work snapshot (for acps-scan)

---

| Option | Description | Selected |
|--------|-------------|----------|
| Spawn parallel sub-agents per top-level directory | Each agent analyzes one module; orchestrator merges | ✓ |
| Sequential analysis, single agent | Simpler but slower | |
| Auto-detect repo size, switch strategy | More adaptive but unpredictable | |

**User's choice:** Spawn parallel sub-agents per top-level directory

---

## State files & resume behavior

| Option | Description | Selected |
|--------|-------------|----------|
| List of completed output files + timestamp | Tracks which of 4 docs written; skip on resume | ✓ |
| Full scan results cached + completed docs list | Caches raw scan output too; state file gets large | |
| Just a completion flag | Binary done/not-done; restarts full scan if interrupted | |

**User's choice:** List of completed output files + timestamp

---

| Option | Description | Selected |
|--------|-------------|----------|
| .planning/intel/.scan-state.json | Co-located with output files; deleted on full completion | ✓ |
| .acps-scan-state.json in project root | Visible but clutters root | |
| .planning/.scan-state.json | In planning root, less co-located | |

**User's choice:** `.planning/intel/.scan-state.json`

---

## Claude's Discretion

- Exact step count and nesting within each workflow.md
- Precise wording of output banners and table headers
- Which CPS chapter to cite in each skill's workflow header
- Edge case handling (e.g., change-log.md absent when acps-change-request first runs)

## Deferred Ideas

- Upgrade path detection — deferred to v2
- Windows path handling — deferred to v2
- acps-scan reading from acps-document-project intel files — potential v2 enhancement
