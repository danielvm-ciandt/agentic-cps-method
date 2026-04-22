---
phase: 04-delivery-management-and-installer
plan: "04"
subsystem: skills
tags: [acps-bug-fix, acps-pr, git-workflow, bug-correction, pull-request]
dependency_graph:
  requires: [acps-branch, acps-homologate, acps-new-bug]
  provides: [acps-bug-fix, acps-pr]
  affects: [skills/acps-bug-fix, skills/acps-pr]
tech_stack:
  added: []
  patterns: [skill-2file-pattern, xml-workflow-steps, conventional-commits, git-branch-naming]
key_files:
  created:
    - skills/acps-bug-fix/SKILL.md
    - skills/acps-bug-fix/workflow.md
    - skills/acps-pr/SKILL.md
    - skills/acps-pr/workflow.md
  modified: []
decisions:
  - "D-17 applied: bug branch naming uses bug/{bug-id}-{slug} pattern with user confirmation before git checkout -b"
  - "D-18 applied: acps-pr filters .planning/ commits via git log :(exclude).planning/ so only code changes appear in PR body"
  - "T-04-04-03 mitigated: acps-pr displays full PR title and body for user review before invoking gh pr create"
metrics:
  duration: ~5 min
  completed: 2026-04-20
  tasks_completed: 2
  tasks_total: 2
---

# Phase 04 Plan 04: acps-bug-fix and acps-pr Skills Summary

Bug correction and PR creation skills — `acps-bug-fix` creates a typed `bug/{id}-{slug}` branch, walks the fix cycle, closes the bug file with `status: closed`, and hands off to `acps-pr`; `acps-pr` filters `.planning/` commits via `:(exclude).planning/` so only code changes appear in the PR body and creates the PR via `gh pr create` with a conventional commit title.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create skills/acps-bug-fix/ (SKILL.md + workflow.md) | 6c34394 | skills/acps-bug-fix/SKILL.md, skills/acps-bug-fix/workflow.md |
| 2 | Create skills/acps-pr/ (SKILL.md + workflow.md) | 0a676e7 | skills/acps-pr/SKILL.md, skills/acps-pr/workflow.md |

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — both skills are complete workflows. The `gh pr create` graceful fallback (display content for manual paste) is intentional design, not a stub.

## Threat Flags

No new threat surface introduced beyond what the plan's threat model covers. The T-04-04-03 mitigation (user review before `gh pr create`) is implemented in Step 4 of acps-pr/workflow.md.

## Self-Check: PASSED

- `skills/acps-bug-fix/SKILL.md` exists — FOUND
- `skills/acps-bug-fix/workflow.md` exists — FOUND
- `skills/acps-pr/SKILL.md` exists — FOUND
- `skills/acps-pr/workflow.md` exists — FOUND
- Commit 6c34394 exists — FOUND
- Commit 0a676e7 exists — FOUND
- `npm run lint` (scoped to new files only) — 0 errors
