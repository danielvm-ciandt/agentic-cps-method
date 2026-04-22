---
plan: 05-01
phase: 05-scope-intelligence
status: complete
completed: 2026-04-20
requirements:
  - SCOPE-01
  - SCOPE-02
---

# Plan 05-01 Summary — Scope Management Skills

## What Was Built

Two scope management skills following the 2-file thin SKILL.md + workflow.md pattern:

- **`skills/acps-change-request/`** — registers formal CRs with BCP/FP delta in `change-log.md`. Auto-derives next CR ID (CR-001, CR-002...), appends row to CR table, shows overrun warning when balance goes negative. Creates `change-log.md` with default front-matter if it doesn't exist.
- **`skills/acps-scope-manager/`** — reads `change-log.md` and renders the full scope ledger: baseline vs current vs balance header block for BCP and FP, complete CR history table, and an informational overrun banner with exact gap. Never blocks work.

## Key Files

| File | Purpose |
|------|---------|
| `skills/acps-change-request/SKILL.md` | Thin entry — delegates to workflow.md |
| `skills/acps-change-request/workflow.md` | 8-step CR registration workflow |
| `skills/acps-scope-manager/SKILL.md` | Thin entry — delegates to workflow.md |
| `skills/acps-scope-manager/workflow.md` | 7-step scope ledger display workflow |

## Commits

- `c7a66c3` feat(05-01): add acps-change-request skill
- `52ac19f` feat(05-01): add acps-scope-manager skill — scope ledger display with overrun banner

## Requirements Coverage

- **SCOPE-01** — BCP/FP accounting via acps-change-request ✓
- **SCOPE-02** — Scope visibility via acps-scope-manager ledger display ✓

## Self-Check: PASSED

- Both SKILL.md files use thin 6-line pattern with `name:`, `description:`, `delegate:` ✓
- Both workflow.md files use XML `<workflow>` wrapping `<step n="N">` blocks ✓
- acps-change-request: derives CR ID sequentially, appends to change-log.md, warns on overrun ✓
- acps-scope-manager: displays baseline/current/balance header, full CR table, overrun banner (non-blocking) ✓
