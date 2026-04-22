---
phase: 03-setup-and-loop-skills
plan: 01
subsystem: skills
tags: [acps-init, skills, xml-workflow, acps-config]

# Dependency graph
requires: []
provides:
  - "skills/acps-init/SKILL.md — thin YAML frontmatter + workflow delegate entry point"
  - "skills/acps-init/workflow.md — 5-step XML init workflow creating .planning/ structure and .acps-config.json"
affects: [03-02, 03-03, 03-04, 03-05, 03-06, 03-07]

# Tech tracking
tech-stack:
  added: []
  patterns: ["SKILL.md = thin frontmatter + delegate line", "workflow.md = full XML step-by-step with <step>, <action>, <check if>, <output>"]

key-files:
  created:
    - skills/acps-init/SKILL.md
    - skills/acps-init/workflow.md
  modified: []

key-decisions:
  - "acps-init guards against re-initialization: halts if .acps-config.json already exists"
  - "planningDir is user-configurable via prompt with .planning default — no hardcoded path"
  - "workflow.md uses <check if> conditional blocks to handle both existing and new init paths"

patterns-established:
  - "Skill pattern: SKILL.md = YAML frontmatter (name, description) + one delegate line to workflow.md"
  - "Workflow pattern: <workflow> root with numbered <step n=N goal=...> blocks; each step has <action>, <check if>, <output>"

requirements-completed: [SETUP-01]

# Metrics
duration: 5min
completed: 2026-04-20
---

# Phase 3 Plan 01: acps-init Skill Summary

**acps-init skill: 5-step XML workflow creating epics/, iterations/, specs/ directories and writing .acps-config.json with user-configurable planningDir**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-04-20T14:13:00Z
- **Completed:** 2026-04-20T14:18:13Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Created `skills/acps-init/SKILL.md` mirroring lean-spec bmad-create-story pattern exactly (YAML frontmatter + delegate line)
- Created `skills/acps-init/workflow.md` with full 5-step XML workflow covering all init responsibilities
- Workflow handles re-initialization guard, user-configurable planningDir, directory creation with .gitkeep, config file writing, and completion report

## Task Commits

1. **Task 1: Create skills/acps-init/SKILL.md** - `af22714` (feat)
2. **Task 2: Create skills/acps-init/workflow.md** - `2c63c0a` (feat)

## Files Created/Modified

- `skills/acps-init/SKILL.md` — Skill entry point: YAML frontmatter with name/description, workflow delegate line
- `skills/acps-init/workflow.md` — Full init workflow: config guard, directory prompt, directory creation, .acps-config.json write, completion report

## Decisions Made

- Used `<check if=".acps-config.json already exists">` guard in Step 1 to prevent accidental re-initialization — critical for idempotency
- Step 2 explicitly prompts user for planningDir (default `.planning`) per D-05/D-07 decisions — no hardcoded paths
- Added `.gitkeep` creation in Step 3 so empty directories are git-tracked without requiring placeholder files

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `acps-init` is the canonical writer of `.acps-config.json` — all subsequent skills (03-02 through 03-07) can reference this config
- Pattern established: SKILL.md thin frontmatter + workflow.md XML steps is now the template for all remaining 10 skills in Phase 3
- SETUP-01 requirement satisfied

---
*Phase: 03-setup-and-loop-skills*
*Completed: 2026-04-20*
