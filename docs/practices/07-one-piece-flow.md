# Practice 07 — One Piece Flow

**CPS Chapter:** Ch.26 · One Piece Flow  
**Skill:** `/acps-branch` (enforces branch-first discipline)

## Overview

One Piece Flow means finishing one work item completely before starting the
next. In software, this translates to the branch-first discipline: create the
semantic branch before writing a single line of code, work one story at a time,
and homologate it before picking up the next.

The `/acps-branch` skill enforces this. It will not let the team start coding
without a semantic branch. The branch name encodes the epic, story number, and
intent — making every commit traceable to a backlog item.

One Piece Flow also governs the spec backend versioning strategy: start with
Markdown-only (v1), add GitHub Issues (v2), Azure DevOps (v3), Jira (v4). Each
version ships one integration fully before the next begins.

## Requirements

- [ ] `/acps-branch` is always run before any code is written
- [ ] One story is active at a time per team member
- [ ] Stories are fully homologated before the next story starts
- [ ] Branch names follow the convention: `feat/ep-XX-N-slug`
- [ ] No work-in-progress accumulates across multiple open branches

## Non-goals

- One Piece Flow does not prohibit parallel work across different team members
- It does not require stories to be tiny — it requires them to be finished
- It does not replace CI/CD — it complements it

## Acceptance criteria

- [ ] AC 1: Every story has a semantic branch created by `/acps-branch` before `/acps-execute`
- [ ] AC 2: Branch name follows: `feat/ep-XX-N-slug` or `fix/N-slug`
- [ ] AC 3: No story moves to the next GSD step without completing the current one
- [ ] AC 4: Stories are merged to the iteration branch only after homologation passes
- [ ] AC 5: WIP limit: no more than one story in `/acps-execute` per team member at a time

---

## Branch naming convention

```text
feat/[epic-code]-[issue]-[slug]   e.g. feat/ep-m01-1-init-repo
fix/[issue]-[slug]                e.g. fix/12-release-config
chore/[issue]-[slug]              e.g. chore/3-update-readme
```

Feature branches are always cut from the iteration branch:

```text
iteration/1
  └─ feat/ep-m01-1-init-repo-structure
  └─ feat/ep-m01-2-github-actions-ci
  └─ feat/ep-m02-4-phase-docs
```

## Spec backend versioning (One Piece Flow applied)

| Version | Backend | Ships when |
|---------|---------|------------|
| v1.x | Markdown only (zero config) | M-Iter-1 |
| v2.x | + GitHub Issues | Future |
| v3.x | + Azure DevOps | Future |
| v4.x | + Jira | Future |

Each backend is a complete, tested integration before the next begins.
v1 ships with no install question about the backend — silent Markdown default.

## CPS reference

Chapter 26 of the CPSBok covers One Piece Flow, WIP limits, and pull-system
principles from lean manufacturing applied to software delivery. Agentic CPS
enforces these through the branch-first discipline and the GSD loop sequence.
