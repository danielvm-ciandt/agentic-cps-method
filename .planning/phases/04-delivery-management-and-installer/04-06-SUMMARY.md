---
phase: 04-delivery-management-and-installer
plan: "06"
subsystem: skills
tags: [skills, management, iteration, notes, help, onboarding]
dependency_graph:
  requires: []
  provides: [acps-new-iteration, acps-note, acps-help]
  affects: [skills/]
tech_stack:
  added: []
  patterns: [SKILL.md thin frontmatter, workflow.md XML steps, 4-5 step workflow pattern]
key_files:
  created:
    - skills/acps-new-iteration/SKILL.md
    - skills/acps-new-iteration/workflow.md
    - skills/acps-note/SKILL.md
    - skills/acps-note/workflow.md
    - skills/acps-help/SKILL.md
    - skills/acps-help/workflow.md
  modified: []
decisions:
  - "acps-note uses single-line confirmation output per DELIV-13 zero-friction requirement"
  - "acps-help skill map lists all 25 skills across 4 groups matching D-19 exactly"
  - "acps-new-iteration uses 5 steps (not minimum 4) to properly separate branch creation from backlog update"
metrics:
  duration: ~10 min
  completed_date: "2026-04-20"
---

# Phase 4 Plan 06: Utility Trio Skills (acps-new-iteration, acps-note, acps-help) Summary

**One-liner:** Three utility skills — iteration branch creation with backlog update, zero-friction note capture to notes.md, and full 25-skill methodology map with state-aware next-step recommendation.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create acps-new-iteration and acps-note skills | d84e499 | skills/acps-new-iteration/SKILL.md, skills/acps-new-iteration/workflow.md, skills/acps-note/SKILL.md, skills/acps-note/workflow.md |
| 2 | Create acps-help skill | 2326def | skills/acps-help/SKILL.md, skills/acps-help/workflow.md |

## What Was Built

### acps-new-iteration (DELIV-09)

5-step workflow that opens a new delivery iteration:

1. Load config and read backlog.md (HALT if missing with message to run acps-backlog)
2. Collect iteration details (number, goal, epic IDs)
3. Create iteration base branch via `git checkout -b iter-{N}` with confirmation and error handling
4. Append new iteration section to backlog.md with epic table
5. Report completion with iteration details and next-step guidance

### acps-note (DELIV-13)

4-step zero-friction capture skill:

1. Load config (planningDir)
2. Capture note text + category (idea/impediment/decision/question, default: idea) — no preamble
3. Append timestamped entry to notes.md (creates file with header if not exists)
4. Single-line confirmation: `Captured. ({planningDir}/notes.md)`

### acps-help (DELIV-14)

4-step methodology orientation skill:

1. Load project state (reads .acps-config.json, backlog.md, continue-here.md, git branch)
2. Display complete skill map: 5 Setup + 6 Loop + 4 Delivery + 10 Management = 25 skills
3. Determine next recommended skill based on detected state (6 state branches)
4. Output recommendation with reason and usage guidance

## Verification Results

- `ls skills/acps-new-iteration/` → SKILL.md workflow.md
- `grep "name: acps-new-iteration"` → exits 0
- `grep "git checkout -b"` → exits 0
- `ls skills/acps-note/` → SKILL.md workflow.md
- `grep "name: acps-note"` → exits 0
- `grep "notes.md"` → exits 0
- `ls skills/acps-help/` → SKILL.md workflow.md
- `grep "name: acps-help"` → exits 0
- `grep "Loop Phase"` → exits 0
- `npm run lint` → 0 errors (70 files linted)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Files created in wrong path (main repo vs worktree)**

- **Found during:** Task 1 commit attempt
- **Issue:** Initial file writes went to `/Users/danielvm/Sites/agentic-cps-method/skills/` (main repo) instead of the worktree at `/Users/danielvm/Sites/agentic-cps-method/.claude/worktrees/agent-a3388605/skills/`. Git commands run in the worktree cwd, so they could not see the files.
- **Fix:** Recreated all 6 files in the correct worktree path. The main-repo copies were left as-is (will be cleaned up by the orchestrator).
- **Files modified:** All 6 skill files recreated in worktree path
- **Commits:** d84e499, 2326def

**2. [Rule 1 - Bug] Lint errors in new workflow.md files**

- **Found during:** Task 1 verification
- **Issue:** `acps-new-iteration/workflow.md` had MD032 (list not surrounded by blank lines inside `<output>` block); `acps-note/workflow.md` had MD031 (fenced code blocks not surrounded by blank lines inside `<action>` tags)
- **Fix:** Added blank lines around the list in new-iteration and around fenced code blocks in note workflow
- **Files modified:** Both workflow.md files

## Known Stubs

None. All skills have complete, wired workflows with no placeholder content.

## Threat Flags

None. The new skills stay within the already-accepted trust boundaries in the threat model (skill→filesystem, append-only, user-authenticated IDE context).

## Self-Check: PASSED

All 6 created files confirmed present in worktree.
Both task commits (d84e499, 2326def) confirmed in git log.
