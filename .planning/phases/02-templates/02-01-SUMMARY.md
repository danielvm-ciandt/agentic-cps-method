---
phase: 02-templates
plan: "01"
subsystem: templates
tags: [markdown, yaml, lean-spec, telemetry, story, epic]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: Repository foundation, docs structure, project conventions
provides:
  - templates/specs/epic.md — plain Markdown epic template with Overview/Requirements/Non-goals/Acceptance Criteria
  - templates/specs/story.md — story template with YAML telemetry front-matter (sessions[]+totals) and lean-spec body
affects:
  - 02-02 (bug report template)
  - 03-skills (acps-new-epic, acps-new-story consume these templates)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - YAML front-matter only on programmatically-consumed files (story.md); epic.md is plain Markdown
    - lean-spec body sections: Overview, Design, Plan, Test, Notes for story.md
    - Telemetry schema locked: sessions[] per-execution entries + totals block at homologation

key-files:
  created:
    - templates/specs/epic.md
    - templates/specs/story.md
  modified: []

key-decisions:
  - "D-04: Only story.md gets YAML front-matter; epic.md is plain Markdown (no programmatic consumer)"
  - "D-05: story.md body follows lean-spec sections (Overview/Design/Plan/Test/Notes)"
  - "sessions: [] (empty array literal) is canonical — not null, not omitted"
  - "tokens in totals uses nested YAML sub-keys, not dot notation"

patterns-established:
  - "Template prose placeholders use HTML comments, not bracket syntax"
  - "Checklist items (- [ ]) used for Requirements and Acceptance Criteria in epic.md"
  - "story.md YAML schema: story_id, sessions[], totals with nested tokens"

requirements-completed: [TMPL-01, TMPL-02]

# Metrics
duration: 1min
completed: 2026-04-19
---

# Phase 2 Plan 01: Spec Templates (Epic + Story) Summary

**YAML telemetry schema locked in story.md (sessions[]+nested tokens totals) with lean-spec body; epic.md is plain Markdown with CPS-prescribed sections**

## Performance

- **Duration:** ~1 min
- **Started:** 2026-04-19T03:37:19Z
- **Completed:** 2026-04-19T03:38:24Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Created `templates/specs/epic.md` as plain Markdown (no YAML front-matter) with four prescribed CPS sections: Overview, Requirements checklist, Non-goals, Acceptance Criteria
- Created `templates/specs/story.md` with locked telemetry YAML schema (story_id, sessions:[], totals block with nested tokens) followed by lean-spec body sections
- Established template authoring conventions: HTML comments for prose placeholders, checklist items for structured sections, no emoji

## Task Commits

Each task was committed atomically:

1. **Task 1: Create templates/specs/epic.md** - `45bc340` (feat)
2. **Task 2: Create templates/specs/story.md** - `514de66` (feat)

## Files Created/Modified

- `templates/specs/epic.md` - Epic spec template with Overview/Requirements/Non-goals/Acceptance Criteria sections, plain Markdown
- `templates/specs/story.md` - Story spec template with YAML telemetry front-matter and lean-spec body (Overview/Design/Plan/Test/Notes)

## Decisions Made

- Followed plan decisions D-01 through D-05 exactly as specified in CONTEXT.md
- `sessions: []` empty array literal is canonical (not null, not omitted) — required by acps-execute append pattern
- Nested YAML for `tokens` sub-keys under `totals` (not dot notation) — required for YAML parser compatibility
- epic.md has no YAML front-matter per D-04 (no programmatic consumer in Phase 3 for epics)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None — `templates/specs/` directory did not exist and was created as part of Task 1 execution (expected first-file behavior).

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `templates/specs/epic.md` and `templates/specs/story.md` are ready for consumption by `acps-new-epic` and `acps-new-story` skills in Phase 3
- Schema is locked per D-01/D-02/D-03; no breaking changes expected
- Remaining Phase 2 plans: bug-report template (02-02), phase/deliverable templates (02-03), report templates (02-04), installer template (02-05)

---
*Phase: 02-templates*
*Completed: 2026-04-19*
