---
plan: 03-05
phase: 03-setup-and-loop-skills
status: complete
completed: 2026-04-20
requirements:
  - LOOP-03
  - LOOP-04
---

# Plan 03-05 Summary: acps-spec + acps-plan

## What Was Built

Two GSD Loop skills enforcing spec quality and task planning:

- **`skills/acps-spec/`** — Ambiguity-gated spec writing (CPS Ch.27). 6-step XML workflow: loads story, drafts 3-8 ACs, scores 0.0–1.0 ambiguity (gate ≤ 0.20), displays exact failure format `Ambiguity score: {X} > 0.20 threshold` + issues list, refinement loop, override path, writes ACs to `## Test` section. LOOP-03 satisfied.

- **`skills/acps-plan/`** — Task breakdown with BCP estimates. 5-step XML workflow: loads story, gates on `## Test` section existing (halts if missing — must run acps-spec first), derives tasks from ACs, BCP estimation per task (1/2/3/5/8 scale with >13 BCP warning), writes to `## Plan` section. LOOP-04 satisfied.

## Key Files

| File | Purpose |
|------|---------|
| `skills/acps-spec/SKILL.md` | Thin frontmatter + delegate line |
| `skills/acps-spec/workflow.md` | 6-step spec workflow with Ch.27 ambiguity gate |
| `skills/acps-plan/SKILL.md` | Thin frontmatter + delegate line |
| `skills/acps-plan/workflow.md` | 5-step plan workflow with BCP estimation |

## Deviations

None — plan executed as written.
