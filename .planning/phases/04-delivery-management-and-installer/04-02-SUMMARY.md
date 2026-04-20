---
phase: 04-delivery-management-and-installer
plan: "02"
subsystem: skills
tags: [acps-pause, acps-resume, continue-here, cross-session, state-handoff]

# Dependency graph
requires:
  - phase: 03-setup-and-loop-skills
    provides: skill SKILL.md + workflow.md pattern, acps-init config pattern
provides:
  - acps-pause skill — writes continue-here.md with story state snapshot
  - acps-resume skill — reads continue-here.md with staleness check and discard option
affects: [04-08-installer, any skill that references cross-session continuity]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "acps-pause/resume: tightly coupled skill pair sharing continue-here.md file format per D-12/D-13/D-14"
    - "Staleness check: compare story YAML status field against saved loop_phase before restoring"

key-files:
  created:
    - skills/acps-pause/SKILL.md
    - skills/acps-pause/workflow.md
    - skills/acps-resume/SKILL.md
    - skills/acps-resume/workflow.md
  modified: []

key-decisions:
  - "D-12/D-13: continue-here.md YAML captures story path, loop_phase, branch, paused_at — written by pause, read by resume"
  - "D-14: staleness check compares story status vs loop_phase; if advanced, warn user and offer discard before restoring"
  - "acps-resume discard path: deletes continue-here.md when story has moved on or file not found, preventing stale context from misleading users"

patterns-established:
  - "Paired skill pattern: acps-pause writes a file that acps-resume reads — same file format shared between two skills"
  - "Discard option in resume: user can always discard stale pause state with a single prompt response"

requirements-completed:
  - DELIV-11
  - DELIV-12

# Metrics
duration: 8min
completed: 2026-04-20
---

# Phase 4 Plan 02: acps-pause + acps-resume Summary

**Cross-session continuity skill pair: acps-pause writes a continue-here.md snapshot (story path, loop phase, git branch, open tasks); acps-resume restores it with D-14 staleness check and discard option**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-04-20T00:00:00Z
- **Completed:** 2026-04-20T00:08:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Created `acps-pause` skill with 5-step workflow: load config, collect story context + git branch, extract open tasks from `## Plan`, write `continue-here.md` per D-13 format, report completion
- Created `acps-resume` skill with 5-step workflow: load config + read continue-here.md (HALT if missing), staleness check comparing story `status` vs `loop_phase` (D-14), git branch verification, restore context display, cleanup offer
- Both skills lint-clean (0 markdownlint errors)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create skills/acps-pause/ (SKILL.md + workflow.md)** - `7ecc738` (feat)
2. **Task 2: Create skills/acps-resume/ (SKILL.md + workflow.md)** - `c8f4c66` (feat)

**Plan metadata:** (committed with SUMMARY.md)

## Files Created/Modified

- `skills/acps-pause/SKILL.md` - Thin frontmatter (name + description) + delegate line
- `skills/acps-pause/workflow.md` - 5-step workflow: config load, story collect, open task extraction, continue-here.md write, completion report
- `skills/acps-resume/SKILL.md` - Thin frontmatter (name + description) + delegate line
- `skills/acps-resume/workflow.md` - 5-step workflow: config + continue-here.md read, staleness check, branch verify, state restore, cleanup offer

## Decisions Made

- `continue-here.md` lives in `{planningDir}/continue-here.md` (from `.acps-config.json` or `.planning` default) — consistent with other skills that use planningDir
- If no open tasks remain when pausing, workflow writes `(no incomplete tasks — all tasks checked off)` instead of an empty section
- Staleness check uses CPS loop phase order (discuss → spec → plan → execute → homologate) to detect advancement

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None. Pre-existing lint errors in `skills/acps-gate/workflow.md` (MD055/MD056) were out of scope — not introduced by this plan.

## Known Stubs

None — both skills are complete workflow implementations with no placeholder content.

## Threat Flags

None — no new network endpoints, auth paths, or schema changes introduced. Skill files are Markdown consumed by AI IDEs only.

## Next Phase Readiness

- `acps-pause` and `acps-resume` are complete and ready for installer inclusion in Plan 08
- The `continue-here.md` format (D-13) is established and can be referenced by any future skill that needs cross-session state

---
*Phase: 04-delivery-management-and-installer*
*Completed: 2026-04-20*
