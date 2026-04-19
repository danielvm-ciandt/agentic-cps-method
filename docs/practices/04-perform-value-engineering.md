# Practice 04 — Perform Value Engineering

**CPS Chapter:** Ch.12 · Perform Value Engineering  
**Skill:** `/acps-project-roadmap`

## Overview

Value Engineering maps epics to business outcomes and produces the BCP or FP
estimates that become the project baseline. In Agentic CPS, this practice runs
after the backlog is complete and before architecture is finalized. Its output —
the roadmap — is the contract the team uses to manage scope throughout
Production Flow.

The AI evaluates each epic against 13 BCP dimensions (or FP+SNAP) and produces
a point estimate. These estimates are preliminary — they are recalculated when
the installed method runs `/acps-project-roadmap` on a real project.

## Requirements

- [ ] Estimation method chosen at install time: BCP Full / BCP Simplified / FP+SNAP / dual
- [ ] Every epic evaluated against the chosen estimation dimensions
- [ ] Roadmap written: BCP or FP per epic, iteration totals, and full timeline
- [ ] Iteration size bands assigned: XS / S / M / L / XL
- [ ] Roadmap stored in `.planning/roadmap.md`

## Non-goals

- Value Engineering does not prioritize features for the client — that is the
  Backlog practice
- It does not replace formal FP counting by a certified CFPS — it produces
  AI-assisted estimates for planning purposes
- BCP estimates are never surfaced to the client without human review

## Acceptance criteria

- [ ] AC 1: All epics have a BCP or FP estimate
- [ ] AC 2: Iteration BCP totals calculated and shown in the roadmap
- [ ] AC 3: Timeline shows all iterations in sequence with expected version tags
- [ ] AC 4: Estimation method is documented in the roadmap front-matter
- [ ] AC 5: Setup gate approval locks the BCP total as the baseline in `change-log.md`

---

## BCP Full — 13 dimensions

| # | Dimension | Category |
|---|-----------|----------|
| 1 | User Interactions | Functional |
| 2 | Data Transactions | Functional |
| 3 | Data Stores | Functional |
| 4 | Integrations | Functional |
| 5 | Business Rules | Functional |
| 6 | Reports | Functional |
| 7 | Workflows | Functional |
| 8 | Security | Functional |
| 9 | Data Volume | Functional |
| 10 | Technical Complexity | Functional |
| 11 | Availability | NFR |
| 12 | Performance | NFR |
| 13 | Scalability | NFR |

Each dimension scored 1–5. Sum = BCP for the epic.

**Size bands:** XS < 5 · S 5–10 · M 11–20 · L 21–35 · XL > 35

## Scope baseline

The BCP total from the roadmap is the baseline. Once locked at the setup gate:

- Adding scope requires equal removal or an approved overrun
- Removing scope credits the ledger
- The baseline itself is never changed — only the `change-log.md` ledger grows

## CPS reference

Chapter 12 of the CPSBok covers value engineering, ROI analysis, and the CI&T
ScopeCounting methodology. Agentic CPS inherits BCP Full (13 dimensions) and
adds BCP Simplified and FP+SNAP as alternative methods configurable at install.
