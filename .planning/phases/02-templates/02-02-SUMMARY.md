---
phase: 02-templates
plan: 02
subsystem: templates
tags: [markdown, lean-spec, bug-report, phase-templates, cps]

# Dependency graph
requires:
  - phase: 02-01
    provides: epic.md and story.md spec templates establishing lean-spec body structure pattern
provides:
  - templates/bugs/bug-report.md — bug report template for acps-new-bug skill (Phase 4)
  - templates/phases/vision.md — CPS vision phase document template for acps-vision skill (Phase 3)
  - templates/phases/backlog.md — CPS backlog phase document template for acps-backlog skill (Phase 3)
  - templates/phases/architecture-package.md — CPS architecture phase document template for acps-architecture skill (Phase 3)
affects:
  - Phase 3 skills (acps-vision, acps-backlog, acps-architecture, acps-new-bug Phase 4)
  - 02-03 through 02-05 (remaining template plans in phase 2)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Lean-spec body structure: Overview/Design/Plan/Test/Notes for all non-story templates"
    - "HTML comment placeholders for prose sections, Markdown checklist items for Plan/Test"
    - "No YAML front-matter on templates without programmatic consumers (D-04)"

key-files:
  created:
    - templates/bugs/bug-report.md
    - templates/phases/vision.md
    - templates/phases/backlog.md
    - templates/phases/architecture-package.md
  modified: []

key-decisions:
  - "D-04 confirmed: No YAML front-matter on bug-report, phase templates — only story.md has front-matter"
  - "D-06 confirmed: Phase templates written fresh (no copy source in old-acps)"
  - "D-07 confirmed: bug-report.md written fresh in lean-spec body format"

patterns-established:
  - "Bug fix workflow in Plan/Test: Reproduce → Root cause → Fix → Verify flow"
  - "Phase template structure: Setup phase marker, domain-appropriate checklist items per CPS chapter discipline"

requirements-completed:
  - TMPL-03
  - TMPL-04

# Metrics
duration: 5min
completed: 2026-04-19
---

# Phase 2 Plan 02: Templates Summary

**Four lean-spec body-structure templates — bug-report.md plus vision, backlog, and architecture-package phase documents — all plain Markdown, no YAML front-matter**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-04-19T03:37:00Z
- **Completed:** 2026-04-19T03:42:17Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Bug report template with reproduce/root-cause/fix/verify checklist workflow
- Vision phase template with CPS Ch.4 discipline placeholders (target users, value proposition, success metrics)
- Backlog phase template with CPS Ch.10 discipline placeholders (epic BCP estimates, prioritization)
- Architecture package template with CPS Ch.14 discipline placeholders (components, tech stack, integration points)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create templates/bugs/bug-report.md** - `dc50aff` (feat)
2. **Task 2: Create templates/phases/ vision.md, backlog.md, architecture-package.md** - `382bc73` (feat)

**Plan metadata:** _(docs commit follows)_

## Files Created/Modified

- `templates/bugs/bug-report.md` — Bug report template for acps-new-bug skill, lean-spec body format
- `templates/phases/vision.md` — Vision phase document for acps-vision skill, CPS Ch.4 discipline
- `templates/phases/backlog.md` — Backlog phase document for acps-backlog skill, CPS Ch.10 discipline
- `templates/phases/architecture-package.md` — Architecture package for acps-architecture skill, CPS Ch.14 discipline

## Decisions Made

- Followed D-04: No YAML front-matter on any of these four templates — all plain Markdown
- Followed D-06: Phase templates written fresh (old-acps has no templates/ directory to copy from)
- Followed D-07: bug-report.md written fresh in lean-spec body format

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Known Stubs

None - all four templates are intentionally scaffold-only (no data wired; templates are structure providers for skills).

## Threat Flags

None - static Markdown authoring with no network, input, or runtime surface.

## Next Phase Readiness

- 4 of 14 total templates complete (epic.md, story.md from 02-01; bug-report.md, 3 phase templates from 02-02)
- Ready for 02-03: deliverable templates
- No blockers

## Self-Check: PASSED

- templates/bugs/bug-report.md: FOUND
- templates/phases/vision.md: FOUND
- templates/phases/backlog.md: FOUND
- templates/phases/architecture-package.md: FOUND
- Commits dc50aff and 382bc73: FOUND in git log

---
*Phase: 02-templates*
*Completed: 2026-04-19*
