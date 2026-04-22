---
phase: 03-setup-and-loop-skills
plan: 02
subsystem: skills
tags: [acps-vision, acps-backlog, CPS, skills, markdown, xml-workflow]

# Dependency graph
requires:
  - phase: 03-01
    provides: acps-init skill writing .acps-config.json with planningDir — all subsequent skills read this config
provides:
  - skills/acps-vision/SKILL.md and workflow.md — CPS Ch.4 vision creation skill
  - skills/acps-backlog/SKILL.md and workflow.md — CPS Ch.10 backlog + iteration skill
affects:
  - 03-03 (acps-architecture)
  - 03-04 (acps-project-roadmap)
  - phase 4 installer (must copy these skills)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Thin SKILL.md: YAML frontmatter (name, description) + single delegate line 'Follow the instructions in ./workflow.md.'"
    - "XML workflow.md: 5 steps with <step>, <action>, <check if>, <output> elements — full GSD-style explicitness, nothing left to runtime interpretation"
    - "Config read pattern: look for .acps-config.json, extract planningDir, default to .planning if missing (D-05/D-06)"

key-files:
  created:
    - skills/acps-vision/SKILL.md
    - skills/acps-vision/workflow.md
    - skills/acps-backlog/SKILL.md
    - skills/acps-backlog/workflow.md
  modified: []

key-decisions:
  - "acps-vision runs a 7-question Ch.4 interview (problem, users, value proposition, differentiation, success metrics, non-goals) before writing vision.md"
  - "acps-backlog reads vision.md for context if it exists, then guides epic definition + iteration assignment before writing backlog.md"
  - "Both skills warn/confirm before overwriting existing output files (vision.md handled; backlog can be re-run to update)"

patterns-established:
  - "5-step skill structure: (1) load config, (2) guard check, (3) interview/gather input, (4) write output file, (5) report completion with next-step guidance"
  - "CPS chapter reference cited in workflow.md header: 'CPS Reference: CPS Chapter N — Name'"

requirements-completed: [SETUP-02, SETUP-03]

# Metrics
duration: 8min
completed: 2026-04-20
---

# Phase 3 Plan 02: acps-vision and acps-backlog Skills Summary

**Two CPS Setup Phase skills created: acps-vision (Ch.4 7-question interview → vision.md) and acps-backlog (Ch.10 epic + iteration planning → backlog.md), both reading .acps-config.json for output path.**

## Performance

- **Duration:** 8 min
- **Started:** 2026-04-20T14:16:00Z
- **Completed:** 2026-04-20T14:24:22Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Created `skills/acps-vision/` with SKILL.md and workflow.md — 5-step Ch.4 vision workshop (project name, problem, target users, value proposition, differentiation, success metrics, non-goals)
- Created `skills/acps-backlog/` with SKILL.md and workflow.md — 5-step Ch.10 backlog workshop (epic definition with BCP estimates, iteration assignment, reads vision.md for context)
- Both skills follow the established D-01/D-02/D-03/D-05/D-06 patterns exactly: thin SKILL.md, full XML workflow, config-driven planningDir

## Task Commits

Each task was committed atomically:

1. **Task 1: Create acps-vision skill** - `04d9838` (feat)
2. **Task 2: Create acps-backlog skill** - `8871364` (feat)

**Plan metadata:** (committed with SUMMARY below)

## Files Created/Modified

- `skills/acps-vision/SKILL.md` — Thin frontmatter: name, description + workflow delegate line
- `skills/acps-vision/workflow.md` — 5 XML steps: config load, overwrite guard, Ch.4 interview (7 questions), write vision.md, completion report
- `skills/acps-backlog/SKILL.md` — Thin frontmatter: name, description + workflow delegate line
- `skills/acps-backlog/workflow.md` — 5 XML steps: config load (reads vision.md for context), epic definition (Ch.10), iteration planning, write backlog.md, completion report

## Decisions Made

- `acps-vision` asks 7 focused Ch.4 questions before composing vision.md — chosen to match the plan specification exactly. Questions cover: project name, problem statement, target users, value proposition, differentiation, success metrics, and non-goals (v1 scope)
- `acps-backlog` reads `{planningDir}/vision.md` if it exists to provide richer context during epic definition — cross-skill context flow enabled without requiring it
- Both skills default to `.planning` silently when `.acps-config.json` is absent (D-06 — no fallback ceremony)

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- SETUP-02 and SETUP-03 satisfied
- Skills/acps-vision/ and skills/acps-backlog/ exist with correct file structure
- Ready for 03-03 (acps-architecture) and 03-04 (acps-project-roadmap)

---
*Phase: 03-setup-and-loop-skills*
*Completed: 2026-04-20*
