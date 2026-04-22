# Vision — Agentic CPS Ecosystem

## Overview

Agentic CPS is a Spec-Driven Development (SDD) methodology built for agentic software development teams. It filters the CI&T Production System (CPS) to the practices that are meaningful when AI agents are doing the coding, and delivers them as installable Claude Code skills with a visual cockpit built on SvelteKit.

## Problem

Existing SDD tools (GSD, BMAD, lean-spec) are either too lightweight for enterprise teams or too generic — they lack the methodological structure that CI&T's CPS provides. Teams using AI agents to build software have no methodology that:

- Speaks CPS language (phases, iterations, epics, deliverables, homologation)
- Integrates GSD's practical workflow discipline (branch-first, discuss→spec→plan→execute)
- Shows project state visually in a cockpit
- Estimates scope using BCP/FP methodology
- Supports the full CI&T organizational hierarchy (Region → Alliance → GU → Client → Project → Team)

## Solution

Two repositories, one ecosystem:

### `agentic-cps-method` (this repo)
A standalone, installable methodology package. Works with any AI IDE. Delivers CPS as Claude Code skills that feel like GSD commands with CPS discipline, and write state into lean-spec's UI.

### `agentic-cps-web`
A SvelteKit cockpit that visualizes the methodology — phases, iterations, epics, deliverables, reports, integrations. Migrates lean-spec's existing UI as its foundation.

## The UX vision

> "I want to feel like I'm using GSD with CPS commands and flow, and checking it on lean-spec's UI."

- `/acps-discuss` feels like `/gsd-discuss-phase` — with CPS discipline
- `/acps-branch` creates a semantic branch first — GSD's discipline
- lean-spec board shows CPS epics, stages, sessions natively
- Phase gates enforce: all epics homologated + deliverable approved → next phase unlocks

## Filtered CPS practices (9 of 37)

| # | Chapter | Practice |
|---|---|---|
| 1 | Ch.4 | Develop Vision |
| 2 | Ch.10 | Develop Product Backlog |
| 3 | Ch.11 | Model Business Processes |
| 4 | Ch.12 | Perform Value Engineering |
| 5 | Ch.14 | Develop Architecture Package |
| 6 | Ch.16 | Perform Backlog Refinement |
| 7 | Ch.26 | One Piece Flow |
| 8 | Ch.27 | Burn Quality In |
| 9 | Ch.28 | Continuous Homologation |

## CPS lifecycle

```
SETUP PHASE
  Vision → Backlog → Architecture → Roadmap (BCP/FP)
  → /acps-deliverable → human review → gate

PRODUCTION FLOW  (repeating iterations)
  Branch → Discuss → Spec → Plan → Execute → Homologate
  → /acps-deliverable → human review → next iteration

VALUE ACTIVATION
  Production entry → Late homologation → Change management
  → /acps-deliverable → human review → complete
```

## GSD workflow loop (inner rhythm per epic)

```
acps-branch      → create semantic branch first
acps-discuss     → extract implementation decisions
acps-spec        → acceptance criteria (ambiguity gate ≤ 0.20)
acps-plan        → tasks + estimates
acps-execute     → implementation
acps-homologate  → validate vs acceptance criteria → mark complete
```

## Estimation

Scope counting via BCP (Business Complexity Points) or FP+SNAP, configured at install time. Based on CI&T's ScopeCounting methodology — 10 functional + 3 NFR dimensions, evaluated by the IDE's AI at epic level.

| Method | Description |
|---|---|
| BCP Full | 10 functional + 3 NFR dimensions (CI&T standard) |
| BCP Simplified | 3 pillars — faster estimation |
| FP + SNAP | IFPUG international standard |
| BCP Full + FP+SNAP | Dual reporting |

## Source references

- CPSBok: `/Users/danielvm/Sites/CPSBok`
- lean-spec: `/Users/danielvm/Sites/lean-spec`
- get-shit-done: `/Users/danielvm/Sites/get-shit-done`
- ScopeCounting: `/Users/danielvm/Sites/ScopeCounting`
- Templates: `/Users/danielvm/Public/templates`
