# Practice 06 — Perform Backlog Refinement

**CPS Chapter:** Ch.16 · Perform Backlog Refinement  
**Skill:** Embedded in `/acps-discuss` and `/acps-spec`

## Overview

Backlog Refinement is the ongoing process of keeping the backlog accurate and
actionable as the project evolves. In Agentic CPS, refinement happens at two
moments: during `/acps-discuss` (implementation decisions refine the epic's
scope) and at iteration planning (stories are estimated and sequenced for the
next iteration).

Refinement is not a separate ceremony — it is woven into the GSD loop. The AI
agent flags stories that have grown beyond their original BCP estimate and
surfaces them for re-estimation via `/acps-change-request`.

## Requirements

- [ ] Every story has a clear title, BCP estimate, and dependency list before `/acps-plan` runs
- [ ] Stories that exceed their original BCP by more than 20% trigger a change request
- [ ] Backlog ordering reflects current iteration priorities — not initial guesses
- [ ] Blocked stories are explicitly marked and the blocker is named
- [ ] Definition of Ready is met before a story enters `/acps-execute`

## Non-goals

- Backlog Refinement does not re-estimate the entire project BCP at each session
- It does not create new epics — that is a scope change requiring `/acps-change-request`
- It does not replace the ambiguity gate in `/acps-spec`

## Acceptance criteria

- [ ] AC 1: Every story entering `/acps-execute` has: title, BCP, dependencies, acceptance criteria
- [ ] AC 2: Stories exceeding BCP by > 20% are flagged and a CR is filed
- [ ] AC 3: Blocked stories are marked with a named blocker before the iteration closes
- [ ] AC 4: Iteration planning revisits story order based on current dependencies
- [ ] AC 5: Definition of Ready checklist passes before any story starts execution

---

## Definition of Ready

A story is ready to execute when all of these are true:

- [ ] Title is clear and unambiguous
- [ ] BCP estimate assigned
- [ ] Dependencies listed (or explicitly "none")
- [ ] Acceptance criteria written by `/acps-spec` with ambiguity score ≤ 0.20
- [ ] Blocker status: not blocked (or blocker is resolved)

## Refinement triggers

| Trigger | Action |
|---------|--------|
| Story scope grows > 20% during `/acps-discuss` | File `/acps-change-request` |
| New dependency discovered during `/acps-plan` | Update story dependencies |
| Story blocked by another story | Mark blocked, name the blocker |
| Epic BCP total drifts from roadmap by > 10% | Flag for `/acps-scope-manager` |

## CPS reference

Chapter 16 of the CPSBok covers backlog refinement techniques including
story splitting, INVEST criteria, and the CI&T Definition of Ready checklist.
Agentic CPS automates the ambiguity check and BCP drift detection.
