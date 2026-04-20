# Spec-First Agile (SFA) — Method Reference

> GSD flow style · lean-spec minimalist philosophy · APG + PMBOK 6 compliant · Spec-Driven Development

---

## Philosophy

> "One file per artifact. One command per ceremony. Spec gates everything.
> Ceremonies are the moment the report is written. Human approves, AI generates."

- Every artifact has exactly one command that produces it
- No artifact is written by hand — commands generate, humans review and approve
- The AI enforces step order — no step runs before its prerequisite passes
- Ceremonies are not meetings — they are the act of running a command that
  writes or updates the relevant PMBOK 6 report
- Tests are not separate from specs — a well-written AC IS a test
- Code review is a gate, not a suggestion

---

## Lifecycle — Three Commands

```
/initiating          Run once. Produces all planning artifacts. Ends at charter approval.

/executing <N>       Run per iteration. Loops through stories. Ends at iteration gate.
                     After each gate: "Run next iteration? (y/n)"

/closing             Run once. Produces closure artifacts. Ends at final sign-off.
```

Each top-level command is an orchestrated flow of nested steps. The AI runs
them in sequence, pausing for human input at each approval point.

---

## Artifact Inventory

| Artifact | Path | Produced by | PMBOK 6 equivalent |
|---|---|---|---|
| `charter.md` | `.planning/` | `/initiating` → `init` | Project Charter |
| `stakeholders.md` | `.planning/` | `/initiating` → `stakeholders` | Stakeholder Register |
| `backlog.md` | `.planning/` | `/initiating` → `backlog` | Product Backlog / Requirements Doc |
| `release-plan.md` | `.planning/` | `/initiating` → `release-plan` | Project Schedule + Cost Baseline |
| `risk-register.md` | `.planning/` | `/initiating` → `risks` | Risk Register |
| `standards/dor.md` | `.planning/` | `/initiating` → `dor` | Requirements Traceability (partial) |
| `standards/dod.md` | `.planning/` | `/initiating` → `dod` | Quality Management Plan (partial) |
| `iter-N-plan.md` | `iterations/` | `/executing N` → `iteration-plan` | Iteration Plan |
| `specs/US-NNN.md` | `specs/` | `/executing N` → `spec` | Requirements Traceability Matrix |
| `reviews/US-NNN.md` | `reviews/` | `/executing N` → `review-code` | Quality Control Measurements |
| `iter-N-review.md` | `iterations/` | `/executing N` → `iteration-review` | Work Performance Report |
| `iter-N-retro.md` | `iterations/` | `/executing N` → `retro` | Lessons Learned Register (running) |
| `issue-log.md` | `.planning/` | `/executing N` → `bug` | Issue Log |
| `change-log.md` | `.planning/` | `/executing N` → `cr` | Change Log + Scope Baseline |
| `uat-record.md` | `.planning/` | `/closing` → `uat` | Test & Evaluation Documents |
| `lessons-learned.md` | `.planning/` | `/closing` → `lessons` | Lessons Learned Register (final) |
| `closure.md` | `.planning/` | `/closing` → `close` | Project Closure Document |

**Total: 17 artifacts.** No sub-plans, no subsidiary management plans,
no register proliferation beyond what the project actually needs.

---

## `/initiating` — Full Flow

Runs once at project start. Guides through eight nested steps in sequence.
Ends when the Project Charter is approved and the BCP/story-point baseline
is locked.

```
/initiating
  ├── init              → charter.md
  ├── stakeholders      → stakeholders.md
  ├── backlog           → backlog.md  (User Stories, points, priority)
  ├── release-plan      → release-plan.md  (iteration map, cost baseline)
  ├── risks             → risk-register.md
  ├── dor               → standards/dor.md  (Definition of Ready)
  ├── dod               → standards/dod.md  (Definition of Done)
  └── gate              → charter approved → baseline locked in change-log.md
                          → /executing 1 unlocked
```

### What each step does

**`init`** — Structured interview: problem, solution, objectives, success
criteria, constraints, timeline. Writes `charter.md`. Human reviews and
types "approve" to continue.

**`stakeholders`** — Identify stakeholders: name, role, interest level,
influence level. Writes `stakeholders.md`. Updates `charter.md` stakeholder
section.

**`backlog`** — Interview per epic: decompose into User Stories using
As a / I want / So that format. Assign story points (Fibonacci).
Set priority (P0/P1/P2). Writes `backlog.md` ordered by value.

**`release-plan`** — Team velocity input (or estimated default). Maps
stories to iterations. Produces cost baseline per iteration. Writes
`release-plan.md`. Re-run with `/executing N → release-plan` when
velocity is known.

**`risks`** — AI surfaces top risks for the project type. Human adds
project-specific risks. Writes `risk-register.md` with probability,
impact, mitigation, owner.

**`dor`** — Defines what "ready to execute" means for this project.
Writes `standards/dor.md`. Enforced automatically by `/spec` gate.

**`dod`** — Defines what "done" means for this project. Includes:
tests written and passing, code reviewed, AC walkthrough complete, CI
green, coverage threshold met. Writes `standards/dod.md`. Enforced
automatically by `/accept` gate.

**`gate`** — Verifies all seven artifacts exist and are approved. On
approval: locks story-point total as baseline in `change-log.md`.
Outputs "INITIATING complete — /executing 1 is unlocked."

---

## `/executing <N>` — Full Flow

Runs once per iteration. Orchestrates the full iteration from planning
to retrospective. After the iteration gate passes, asks: "Run next
iteration? (y/n)" — loops if yes.

```
/executing N
  ├── iteration-plan    → iter-N-plan.md   [CEREMONY: Iteration Planning]
  │
  ├── loop per story:
  │     ├── branch      → feat/US-NNN-slug  (branch first, always)
  │     ├── discuss     → decisions appended to specs/US-NNN.md
  │     ├── spec        → ACs + ambiguity gate + test stubs
  │     │                 [DoR certified before continuing]
  │     ├── plan        → tasks written to specs/US-NNN.md
  │     ├── execute     → implementation + test bodies
  │     │                 [CI must be green before next step]
  │     ├── test        → run suite, map results to AC IDs
  │     ├── review-code → reviews/US-NNN.md  [blocking findings must resolve]
  │     └── accept      → DoD walkthrough for [manual] ACs only
  │                       [all ACs green → story Done]
  │
  ├── iteration-review  → iter-N-review.md  [CEREMONY: Iteration Review]
  ├── retro             → iter-N-retro.md   [CEREMONY: Retrospective]
  ├── gate              → all stories Done + review sent → merge → tag
  │
  └── "Run next iteration? (y/n)"
        y → /executing N+1
        n → "Run /closing when all iterations are complete."
```

### Nested steps in detail

**`iteration-plan`** — Iteration goal drafted (AI proposes, human approves).
Team capacity entered. Stories pulled from backlog ordered by priority.
DoR verified per story — stories that fail DoR stay in backlog. Writes
`iter-N-plan.md`. **This is the Iteration Planning ceremony** — the
report is written here, not in a separate step.

**`branch`** — Creates `feat/US-NNN-slug` from the iteration branch.
Writes branch name to story front-matter. Command refuses to continue
if branch already has uncommitted changes from another story.

**`discuss`** — Structured interview: implementation approach, edge
cases, constraints, dependencies, testability decisions per AC. Output
appended to `specs/US-NNN.md` under "## Context". DoR pre-check runs
here — flags missing story points, unclear title, unnamed dependencies.

**`spec`** — Writes Acceptance Criteria in Given/When/Then format.
Scores each AC on five dimensions (testability, specificity,
independence, completeness, automatable). Gate: all ACs ≤ 0.20 or
rewrite. Each AC tagged `[auto]` or `[manual]`. Test stubs generated
per `[auto]` AC in the project test framework. DoR certified.
Writes/updates `specs/US-NNN.md`.

**`plan`** — Breaks ACs into implementation tasks. Every `[auto]` AC
gets a paired test task. No task list is complete without test tasks.
Estimates in hours or points per task. Writes tasks to
`specs/US-NNN.md`.

**`execute`** — Implementation session. Conventional commits reference
story ID (`feat(US-NNN): description`). AI monitors CI status. Step
is not closed until CI is green on the story branch.

**`test`** — Runs full suite filtered to story's test files. Maps
pass/fail results back to AC IDs. Outputs which ACs are proven (green)
and which are pending (manual check). Failing `[auto]` ACs route to
bug fix before `review-code` can run.

**`review-code`** — AI reviews the story branch diff against: clean
code standards, OWASP Top 10, architecture consistency, test
meaningfulness, no dead code, no hardcoded values. Writes
`reviews/US-NNN.md` with findings classified as BLOCKING / WARNING /
INFO. BLOCKING findings must be resolved and CI re-run before
`accept` runs. WARNING and INFO are recorded but do not block.

**`accept`** — Pulls CI results from `test`. Auto-marks `[auto]` ACs
that are passing. Walks only `[manual]` ACs interactively:
pass (y) / fail (n) / waive (w + reason). Fail routes to bug branch
→ fix → test → re-accept that AC. All ACs green → story status set
to Done → DoD recorded in `specs/US-NNN.md` front-matter.

**`iteration-review`** — **Iteration Review ceremony.** Compiles completed
vs. incomplete stories. Captures stakeholder demo notes (human types
them in). Re-forecasts release date based on actual velocity. Updates
`risk-register.md` with new risks surfaced. Writes `iter-N-review.md`.

**`retro`** — **Retrospective ceremony.** Three prompts: Keep / Drop /
Try. AI surfaces metrics trend (velocity, defect rate, avg ambiguity
score, % ACs automated). Human adds observations. One action item
selected for next iteration. Writes `iter-N-retro.md`. Action item
pre-loaded into next `iteration-plan`.

**`gate`** — Verifies: all stories Done, no open blocking bugs, review
sent to stakeholders, scope ledger balanced. On pass: iteration branch
eligible for merge, pre-release tag created, `/executing N+1` unlocked.

---

## `/closing` — Full Flow

Runs once after all iterations are complete.

```
/closing
  ├── uat          → uat-record.md   (late UAT with real users)
  ├── lessons      → lessons-learned.md  (compiled from all iter-N-retro.md)
  ├── close        → closure.md
  └── gate         → UAT approved + closure signed off → project closed
                     → final stable release tag on main
```

**`uat`** — Structured UAT session with real users or stakeholders
against the live system. Each story's ACs re-verified. Failures
registered as bugs via nested `bug` → `bug-fix` → `accept` before
closing continues. Writes `uat-record.md`.

**`lessons`** — Compiles all `iter-N-retro.md` files. Groups by theme.
Surfaces recurring patterns. Writes `lessons-learned.md`.

**`close`** — Final status: planned vs. actual points, iterations,
defects. Objectives achievement table. Stakeholder sign-off block.
Links to archive (backlog, specs, test suite, release tags).
Writes `closure.md`.

**`gate`** — Final gate: UAT signed off, closure approved, all bugs
resolved. On pass: final stable release tag created on main.
Project officially closed.

---

## The Story Loop — Detail

```
[DoR not certified]
      ↑
/branch → /discuss → /spec ──────────────────────────────────────┐
                       │ ambiguity > 0.20                        │
                       └── rewrite AC → re-score ────────────────┘
                       │ all ACs ≤ 0.20
                       ↓
                    /plan
                       │
                    /execute ← fix & recommit ←──────────────────┐
                       │ CI green                                 │
                    /test                                         │
                       │ [auto] AC failing                        │
                       └── bug branch → fix → CI → /test ────────┘
                       │ all [auto] ACs green
                    /review-code
                       │ BLOCKING finding                         │
                       └── fix → CI → /review-code ──────────────┘
                       │ approved
                    /accept
                       │ [manual] AC: pass (y) / fail (n) / waive (w)
                       │ fail                                     │
                       └── bug branch → fix → CI → /test → /accept┘
                       │ all ACs green
                    story = Done ✓
```

---

## Ceremonies → Report Generation

| Ceremony | Command | Report written | PMBOK 6 report |
|---|---|---|---|
| Initiating review | `/initiating → gate` | `charter.md` approved | Project Charter |
| Iteration Planning | `/executing N → iteration-plan` | `iter-N-plan.md` | Iteration Plan |
| Iteration Review | `/executing N → iteration-review` | `iter-N-review.md` | Work Performance Report |
| Retrospective | `/executing N → retro` | `iter-N-retro.md` | Lessons Learned (running) |
| Code Review | `/executing N → review-code` | `reviews/US-NNN.md` | Quality Control Measurements |
| UAT | `/closing → uat` | `uat-record.md` | Test & Evaluation Documents |
| Project Closure | `/closing → gate` | `closure.md` approved | Project Closure Document |

Ceremonies are not calendar events — they are the act of running
the command. The report is the ceremony output.

---

## Standards

### Definition of Ready (`standards/dor.md`)

A story is ready to enter `/execute` when all of these are true:

- [ ] User Story format: As a / I want / So that
- [ ] Story points assigned
- [ ] Dependencies listed (or explicitly "none")
- [ ] ACs written in Given/When/Then with ambiguity score ≤ 0.20
- [ ] Each AC tagged `[auto]` or `[manual]`
- [ ] Test stubs generated for all `[auto]` ACs
- [ ] Story is not blocked (or blocker is resolved)

DoR is enforced automatically by `/spec`. Stories that fail DoR
cannot enter the iteration plan.

### Definition of Done (`standards/dod.md`)

A story is Done when all of these are true:

- [ ] All `[auto]` ACs have passing tests in CI
- [ ] CI is green on the story branch
- [ ] Code coverage on new code ≥ project threshold (set at `/initiating → dod`)
- [ ] No test is skipped or pending
- [ ] Code review approved (no BLOCKING findings open)
- [ ] All `[manual]` ACs verified by human in `/accept`
- [ ] No waived ACs without documented reason
- [ ] Story merged to iteration branch
- [ ] DoD recorded in `specs/US-NNN.md` front-matter

DoD is enforced automatically by `/accept`. Stories where any
condition fails cannot be marked Done.

---

## Scope Control

```
/executing N → cr       Register a Change Request
               → delta story points declared (+ add or − remove)
               → if running balance goes positive without approval → command blocks
               → human approves or rejects
               → change-log.md updated

/executing N → status   Show scope ledger:
               Baseline: [X] points
               Approved additions: +[Y]
               Approved removals: −[Z]
               Current: [X+Y−Z] points
               Open CRs: [list]
```

---

## Command Reference

### Top-level (three commands)

| Command | Phase | Description |
|---|---|---|
| `/initiating` | Initiating + Planning | Full project setup → charter approved |
| `/executing <N>` | Executing + M&C | Full iteration N → gate passed |
| `/closing` | Closing | UAT + closure → project closed |

### Nested — Initiating

| Command | Output |
|---|---|
| `init` | `charter.md` |
| `stakeholders` | `stakeholders.md` |
| `backlog` | `backlog.md` |
| `release-plan` | `release-plan.md` |
| `risks` | `risk-register.md` |
| `dor` | `standards/dor.md` |
| `dod` | `standards/dod.md` |
| `gate` | baseline locked in `change-log.md` |

### Nested — Executing (per iteration)

| Command | Output |
|---|---|
| `iteration-plan` | `iter-N-plan.md` |
| `branch` | `feat/US-NNN-slug` |
| `discuss` | decisions in `specs/US-NNN.md` |
| `spec` | ACs + test stubs in `specs/US-NNN.md` |
| `plan` | tasks in `specs/US-NNN.md` |
| `execute` | implementation + tests |
| `test` | AC-to-test result map |
| `review-code` | `reviews/US-NNN.md` |
| `accept` | DoD recorded in `specs/US-NNN.md` |
| `iteration-review` | `iter-N-review.md` |
| `retro` | `iter-N-retro.md` |
| `cr` | `change-log.md` updated |
| `status` | scope ledger output |
| `bug` | `issue-log.md` updated |
| `bug-fix` | guided fix → re-test → re-accept |
| `gate` | iteration closed → merge → tag |

### Nested — Closing

| Command | Output |
|---|---|
| `uat` | `uat-record.md` |
| `lessons` | `lessons-learned.md` |
| `close` | `closure.md` |
| `gate` | project closed → final tag |

### Utility (any phase)

| Command | Description |
|---|---|
| `pause` | Save session state → handoff note |
| `resume` | Restore session state |
| `note` | Append to current artifact |
| `help` | Show available nested commands for current phase |

**Total: 28 commands** across three top-level orchestrators.

---

## Document Templates

### `charter.md`

```markdown
---
project: [name]
version: 1.0
created: [date]
status: draft | approved
approved_by:
approved_date:
---

# Project Charter — [Project Name]

## Problem Statement
[One paragraph — no jargon. What pain exists today?]

## Solution
[What the product does and how it differs from existing alternatives.
Two sentences maximum.]

## Objectives

| # | Objective | Measurable success criterion |
|---|---|---|
| 1 | | |

## Stakeholders

| Name | Role | Interest | Influence |
|---|---|---|---|
| | | H/M/L | H/M/L |

## High-level Scope

**In scope:**
-

**Out of scope:**
-

## Constraints & Assumptions

**Constraints:**
-

**Assumptions:**
-

## High-level Timeline

| Milestone | Target |
|---|---|
| Initiating complete | |
| First iteration | |
| Final delivery | |

## Authorization

Approved by: ___________________________ Date: ___________
```

---

### `backlog.md`

```markdown
---
baseline_points: 0
last_updated: [date]
---

# Product Backlog

## Ordered Backlog

| ID | User Story | Points | Priority | Iteration | Status |
|---|---|---|---|---|---|
| US-001 | As a [role], I want [feature] so that [benefit] | | P0/P1/P2 | | backlog |

## Epics

| ID | Epic | Stories |
|---|---|---|
| EP-01 | | US-001, US-002 |

## Backlog health

- Total stories: [N]
- Total points: [X]
- P0 stories: [N]
- Stories without points: [N] ← must be 0 before /initiating → gate
```

---

### `release-plan.md`

```markdown
---
baseline_points: [X]
velocity: [X]
iteration_length_weeks: 2
created: [date]
last_updated: [date]
---

# Release Plan

## Velocity & Capacity

| Metric | Value |
|---|---|
| Team velocity | [X] points/iteration |
| Iteration length | [N] weeks |
| Total backlog | [X] points |
| Estimated iterations | [N] |

## Iteration Map

| Iteration | Iteration Goal | Stories | Points | Target date |
|---|---|---|---|---|
| 1 | | US-001, US-002 | | |

## Cost Baseline

| Iteration | Estimated effort (days) | Cost |
|---|---|---|
| 1 | | |
| **Total** | | |

## Release milestones

| Version | Iteration | Features included |
|---|---|---|
| v0.1.0 | 1 | |
| v1.0.0 | N | Full feature set |
```

---

### `iter-N-plan.md` (Iteration Plan)

```markdown
---
iteration: N
start_date: [date]
end_date: [date]
iteration_goal:
velocity_target: [X]
status: planning | active | complete
action_from_retro: [action item from iter N-1 retro]
---

# Iteration N — Plan

## Iteration Goal
[One sentence that defines success. Human-approved.]

## Team Capacity

| Team member | Available days | Points capacity |
|---|---|---|
| | | |
| **Total** | | [X] |

## Selected Stories

| ID | User Story | Points | DoR ✓ |
|---|---|---|---|
| US-001 | | | ✓ / ✗ |

Total committed: [X] points

## Dependencies & Risks

| Item | Type | Mitigation |
|---|---|---|
| | dependency/risk | |

## Daily log

| Date | Update |
|---|---|
| | |
```

---

### `specs/US-NNN.md` (Story Spec)

```markdown
---
id: US-NNN
title: [title]
epic: EP-01
iteration: N
points: 0
priority: P0/P1/P2
status: backlog | ready | in-progress | review | done
branch: feat/us-nnn-slug
dor_certified: false
dor_certified_date:
dod_certified: false
dod_certified_date:
sessions: []
totals: {}
---

# US-NNN — [Title]

## User Story

As a [role],
I want [feature],
So that [benefit].

## Context
[From /discuss — key decisions, constraints, edge cases, testability notes]

## Acceptance Criteria

- [ ] AC 1: Given [context], when [action], then [outcome]
            [ambiguity: 0.00 ✓] [auto]
- [ ] AC 2: Given [context], when [action], then [outcome]
            [ambiguity: 0.00 ✓] [manual]

## Tasks

- [ ] T1: [implementation task]
- [ ] T2: Write test for AC 1
- [ ] T3: [implementation task]

## Test Coverage

| AC | Test file | Status |
|---|---|---|
| AC 1 | tests/us-nnn.spec.js | pending |

## Code Review

| Field | Value |
|---|---|
| Review file | reviews/US-NNN.md |
| Status | pending / approved / changes-requested |
| Blocking findings | 0 |

## DoD Checklist

- [ ] All [auto] ACs have passing tests
- [ ] CI green on branch
- [ ] Coverage threshold met
- [ ] No tests skipped
- [ ] Code review approved
- [ ] All [manual] ACs verified
- [ ] No unwaived failures
```

---

### `reviews/US-NNN.md` (Code Review)

```markdown
---
story: US-NNN
branch: feat/us-nnn-slug
reviewed_at: [date]
status: approved | changes-requested
blocking_count: 0
warning_count: 0
---

# Code Review — US-NNN

## Summary
[Two-sentence overall assessment]

## Findings

| # | Severity | File | Line | Finding | Status |
|---|---|---|---|---|---|
| 1 | BLOCKING | | | | open / resolved |
| 2 | WARNING | | | | open / noted |
| 3 | INFO | | | | noted |

**Severity guide:**
- BLOCKING — must resolve before /accept runs
- WARNING — should resolve; recorded in issue-log.md if deferred
- INFO — observation; no action required

## Checklist

- [ ] No obvious bugs or logic errors
- [ ] No security vulnerabilities (OWASP Top 10)
- [ ] Follows project architecture patterns from charter.md
- [ ] No commented-out or dead code
- [ ] Tests are present and test the right things (not implementation details)
- [ ] No magic numbers or hardcoded configuration values
- [ ] Error handling is present at system boundaries

## Decision

[ ] Approved — proceed to /accept
[ ] Changes requested — resolve BLOCKING findings first
```

---

### `iter-N-review.md` (Iteration Review / Work Performance Report)

```markdown
---
iteration: N
date: [date]
iteration_goal_achieved: yes | partial | no
velocity_actual: [X]
velocity_target: [X]
---

# Iteration N — Review

## Iteration Goal

**Goal:** [iteration goal from iter-N-plan.md]
**Achieved:** Yes / Partial / No

## Completed Stories

| ID | User Story | Points | Notes |
|---|---|---|---|
| US-001 | | | |

Total completed: [X] points

## Incomplete Stories

| ID | User Story | Points | Reason | Carry to iter N+1? |
|---|---|---|---|---|
| | | | | |

## Demo Notes
[Stakeholder feedback captured during review]

## Velocity

| Metric | Value |
|---|---|
| Committed | [X] points |
| Completed | [Y] points |
| Velocity this iteration | [Y] points |
| Rolling average | [Z] points |

## Updated Release Forecast

Based on actual velocity of [Y] points/iter:
Remaining backlog: [R] points → ~[N] iterations remaining
Projected completion: [date]

## Risks & Issues

| Item | Status | Action |
|---|---|---|
| | | |

## Stakeholder sign-off

Reviewed with: ___________________________ Date: ___________
```

---

### `iter-N-retro.md` (Retrospective / Lessons Learned Running)

```markdown
---
iteration: N
date: [date]
action_item_owner:
action_item_due: iter-N+1
---

# Iteration N — Retrospective

## Keep (what worked well)
-

## Drop (what didn't work)
-

## Try (one improvement for next iteration)
-

## Action Item (single, highest-priority)

| Action | Owner | Due |
|---|---|---|
| | | Iteration N+1 |

## Metrics

| Metric | Iter N-1 | Iter N | Trend |
|---|---|---|---|
| Velocity | | | ↑ / ↓ / → |
| Stories completed | | | |
| Bugs found in /accept | | | |
| Avg AC ambiguity score | | | |
| % ACs automated | | | |
| Code review blocking findings | | | |
```

---

### `change-log.md` (Scope Baseline + Change Log)

```markdown
---
baseline_points: [X]
current_points: [X]
balance: 0
---

# Change Log

## Scope Baseline

Locked at: [date] (Initiating gate approval)
Baseline story points: [X]

## Change Requests

| CR-ID | Date | Story / Reason | Delta | Status | Approved by |
|---|---|---|---|---|---|
| CR-001 | | | +5 | approved | |

## Scope Ledger

| Entry | Points |
|---|---|
| Baseline | [X] |
| Approved additions | +[Y] |
| Approved removals | −[Z] |
| **Current** | **[X+Y−Z]** |
| Open CRs (pending) | [±W] |
```

---

### `issue-log.md` (Issue Log)

```markdown
# Issue Log

| ID | Description | Date | Story | Severity | Owner | Status | Resolution |
|---|---|---|---|---|---|---|---|
| BUG-001 | | | US-NNN | P0/P1/P2 | | open / closed | |
```

---

### `lessons-learned.md` (Lessons Learned Register — Final)

```markdown
---
compiled_at: [date]
iterations_covered: N
---

# Lessons Learned Register

## By iteration

| Iteration | Keep | Drop | Try | Action taken |
|---|---|---|---|---|
| 1 | | | | |

## Recurring themes

[AI-compiled patterns from all iter-N-retro.md files]

## Metrics summary

| Metric | Iter 1 | Iter 2 | Iter N | Trend |
|---|---|---|---|---|
| Velocity | | | | |
| Defect rate | | | | |
| Avg ambiguity score | | | | |
| % ACs automated | | | | |

## Recommendations for next project

-
```

---

### `closure.md` (Project Closure Document)

```markdown
---
project: [name]
closed_date: [date]
final_status: completed | cancelled | suspended
approved_by:
approved_date:
---

# Project Closure Document — [Project Name]

## Final Status

| Metric | Planned | Actual | Variance |
|---|---|---|---|
| Story points | | | |
| Iterations | | | |
| Duration (weeks) | | | |
| Bugs found (total) | | | |
| Bugs in UAT | | | |

## Objectives Achievement

| Objective | Success criterion | Achieved? | Notes |
|---|---|---|---|
| 1 | | Yes / Partial / No | |

## Deliverables Accepted

| Deliverable | Accepted by | Date |
|---|---|---|
| | | |

## Lessons Learned Summary

[Key findings from lessons-learned.md — 5 bullets maximum]

## Recommendations

[For future projects of this type]

## Archive

| Artifact | Location |
|---|---|
| Product Backlog | `.planning/backlog.md` |
| All story specs | `specs/` |
| Test suite | [test directory] |
| Release tags | [repo URL/releases] |
| Iteration reviews | `iterations/` |

## Final Authorization

Project closed by: ___________________________ Date: ___________
```

---

## How It Feels

```
$ /initiating
→ [init] What problem does this project solve? ...
→ charter.md written — review and approve: _

→ [stakeholders] Who are the key stakeholders? ...
→ stakeholders.md written ✓

→ [backlog] Let's build the Product Backlog. Tell me about your first epic...
→ backlog.md written — 14 User Stories, 87 points ✓

→ [release-plan] Team velocity? (or press enter to estimate from team size)
→ release-plan.md written — 5 iterations projected ✓

→ [risks] Top 3 risks I see for this project type: [list]
→ Any additional risks? ...
→ risk-register.md written ✓

→ [dor] Coverage threshold for this project? (recommended: 80%)
→ standards/dor.md + standards/dod.md written ✓

→ [gate] All conditions met. Approve to lock 87-point baseline.
→ approve
→ INITIATING complete. Baseline locked. /executing 1 is unlocked.

$ /executing 1
→ [iteration-plan] Iteration goal for iteration 1? ...
→ iter-1-plan.md written — 22 points committed ✓

→ [branch] US-001 — feat/us-001-user-login created ✓

→ [discuss] How should failed login attempts be handled? ...
→ Context written to specs/US-001.md ✓

→ [spec]
→ AC 1: Given valid credentials, when submitted, then redirect to dashboard
         [ambiguity: 0.04 ✓] [auto]
→ AC 2: Given invalid password, when submitted, then show error
         [ambiguity: 0.07 ✓] [auto]
→ AC 3: Given 5 failed attempts, then lock account 15 min
         [ambiguity: 0.11 ✓] [auto]
→ AC 4: Error message must be accessible (ARIA)
         [ambiguity: 0.09 ✓] [manual]
→ Gate passed. Test stubs generated for AC 1–3. DoR certified. ✓

→ [plan] Tasks written — 6 tasks including 3 test tasks ✓

→ [execute] Implementation session...
→ CI: green ✓

→ [test]
→ AC 1: ✓ passing
→ AC 2: ✓ passing
→ AC 3: ✗ FAILING — account not locked after 5 attempts
→ Bug branch created. Fix and recommit.
→ CI: green ✓
→ AC 3: ✓ passing — all [auto] ACs green ✓

→ [review-code]
→ 0 BLOCKING  |  1 WARNING: magic number (15) — extract to config
→ WARNING logged. Approved. ✓

→ [accept]
→ AC 1–3: auto-verified by CI ✓
→ AC 4 [manual]: Is the error message accessible? (y/n): y ✓
→ US-001 Done. DoD recorded. ✓

[loop continues for US-002, US-003...]

→ [iteration-review] Iteration goal achieved: Yes
→ Velocity: 22/22 points ✓
→ iter-1-review.md written ✓

→ [retro] Keep: branch-first. Drop: estimating too late. Try: spec before planning.
→ iter-1-retro.md written ✓

→ [gate] All conditions met. Merge to main. Tag: v0.1.0-iter1 ✓

→ Run next iteration? (y/n): y → /executing 2

$ /closing
→ [uat] Walking all story ACs with real users...
→ uat-record.md written ✓

→ [lessons] Compiling 5 retrospectives...
→ lessons-learned.md written ✓

→ [close] Final status: 87/87 points, 5 iterations, 3 bugs found and resolved.
→ closure.md written ✓

→ [gate] UAT approved? approve
→ Project closed. Final tag: v1.0.0 ✓
```
