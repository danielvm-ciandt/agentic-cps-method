---
phase: 03-setup-and-loop-skills
plan: "03"
subsystem: skills
tags: [acps-architecture, acps-project-roadmap, cps-chapter-14, cps-chapter-12, bcp, fp, architecture, roadmap]

requires:
  - phase: 03-01
    provides: acps-init skill that writes .acps-config.json (planningDir key)

provides:
  - acps-architecture skill — CPS Ch.14 architecture interview, writes {planningDir}/architecture.md
  - acps-project-roadmap skill — BCP/FP estimation per epic (CPS Ch.12), writes {planningDir}/roadmap.md

affects:
  - 03-04
  - 03-05
  - 03-06
  - 03-07

tech-stack:
  added: []
  patterns:
    - "Two-file skill pattern: thin SKILL.md (frontmatter + delegate) + logic in workflow.md"
    - "XML step format with <step>, <check>, <action>, <output> elements"
    - ".acps-config.json read pattern with silent .planning default"
    - "HALT guard for missing prerequisite files (backlog.md)"
    - "Overwrite guard for existing output files"

key-files:
  created:
    - skills/acps-architecture/SKILL.md
    - skills/acps-architecture/workflow.md
    - skills/acps-project-roadmap/SKILL.md
    - skills/acps-project-roadmap/workflow.md
  modified: []

key-decisions:
  - "acps-architecture asks 7 structured questions matching CPS Ch.14 discipline (tech stack, system boundaries, arch pattern, data model, quality attributes, deployment, constraints)"
  - "acps-project-roadmap halts with actionable message if backlog.md is missing (prerequisite gate)"
  - "acps-project-roadmap supports BCP-only or BCP+FP mode — user selects at estimation start"
  - "roadmap.md scope baseline includes reference to acps-gate and acps-change-request for scope tracking continuity"

patterns-established:
  - "Prerequisite gate: check required input file exists, HALT with run-X-first message if absent"
  - "Overwrite guard: check for existing output file, require 'overwrite' confirmation before proceeding"
  - "Estimation loop: display current value, offer to confirm or update per-item"

requirements-completed: [SETUP-04, SETUP-05]

duration: 8min
completed: 2026-04-20
---

# Phase 3 Plan 03: Setup Skills — Architecture & Project Roadmap Summary

**CPS Ch.14 architecture interview skill (7 questions, writes architecture.md) and CPS Ch.12 BCP/FP estimation skill (per-epic estimation loop with milestone definition, writes roadmap.md) completing the Setup Phase skill set**

## Performance

- **Duration:** 8 min
- **Started:** 2026-04-20T00:00:00Z
- **Completed:** 2026-04-20T00:08:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- `acps-architecture`: 5-step workflow running CPS Chapter 14 architecture interview with 7 structured questions, overwrite guard, and architecture.md output
- `acps-project-roadmap`: 5-step workflow with prerequisite gate (halts if backlog.md absent), BCP/FP per-epic estimation loop, milestone definition per iteration, and roadmap.md with scope baseline
- Both skills read `.acps-config.json` (silent `.planning` default per D-05, D-06) and follow the two-file thin-SKILL.md + XML-workflow pattern

## Task Commits

Each task was committed atomically:

1. **Task 1: Create acps-architecture skill** - `05e8e69` (feat)
2. **Task 2: Create acps-project-roadmap skill** - `9baa539` (feat)

## Files Created/Modified

- `skills/acps-architecture/SKILL.md` — Thin skill entry point, name: acps-architecture
- `skills/acps-architecture/workflow.md` — 5-step CPS Ch.14 architecture package workflow
- `skills/acps-project-roadmap/SKILL.md` — Thin skill entry point, name: acps-project-roadmap
- `skills/acps-project-roadmap/workflow.md` — 5-step CPS Ch.12 BCP/FP estimation and roadmap workflow

## Decisions Made

- acps-architecture uses 7 discrete questions (one per `<action>` line) rather than a single multi-part ask — gives Claude a clear elicitation sequence and produces named variables for architecture.md composition
- acps-project-roadmap introduces a prerequisite gate (HALT with run-acps-backlog message) because roadmap estimation requires the epic list — no partial execution is meaningful
- BCP/FP mode selection is asked once upfront rather than per-epic — avoids repetition and lets user commit to one estimation method for the whole project
- roadmap.md scope baseline section explicitly names acps-gate and acps-change-request as downstream consumers — establishes the scope management chain for Phase 4+ skills

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Setup Phase skill set is complete: acps-init (03-01), acps-vision + acps-backlog (03-02), acps-architecture + acps-project-roadmap (03-03)
- Plans 03-04 through 03-07 implement the 6 GSD Loop skills (acps-branch, acps-discuss, acps-spec, acps-plan, acps-execute, acps-homologate)
- No blockers

---
*Phase: 03-setup-and-loop-skills*
*Completed: 2026-04-20*
