# Practice 02 — Develop Product Backlog

**CPS Chapter:** Ch.10 · Develop Product Backlog  
**Skill:** `/acps-backlog`

## Overview

The Backlog practice translates the vision into an ordered list of epics, maps
each epic to an iteration, and assigns priority. It establishes the vocabulary
the entire team — human and AI — will use throughout the project: epic IDs,
story IDs, iteration numbers, and priority codes.

In agentic development, the backlog is the AI's primary navigation artifact.
Well-structured epics with clear IDs let the agent reference work without
ambiguity. Poorly structured backlogs cause the agent to hallucinate scope.

## Requirements

- [ ] All epics named and given a unique ID (e.g., EP-M01, EP-01)
- [ ] Each epic assigned to an iteration with a rationale
- [ ] Priority set per epic: P0 (must-have), P1 (important), P2 (nice-to-have)
- [ ] Iteration map created: one row per iteration with epics and expected deliverable
- [ ] Branch naming convention defined and documented
- [ ] "Sprint" never appears — always "Iteration"

## Non-goals

- The Backlog practice does not estimate BCP — that is the Roadmap practice (Ch.12)
- It does not write story-level detail — stories are created during Production Flow
- It does not produce a client deliverable on its own

## Acceptance criteria

- [ ] AC 1: `backlog.md` exists in `.planning/` with all epics named and ID'd
- [ ] AC 2: Iteration map present with all iterations, epics, and deliverables
- [ ] AC 3: Priority assigned to every epic
- [ ] AC 4: Branch naming convention documented
- [ ] AC 5: No "Sprint" language anywhere in the backlog

---

## Epic ID convention

```text
Method repo:  EP-M01, EP-M02, ..., EP-M09
Web repo:     EP-01, EP-02, ..., EP-14
```

Story IDs are assigned within epics during Production Flow:

```text
EP-M01-001, EP-M01-002, ...
```

## Iteration map format

```markdown
| Iteration | Branch       | Epics            | Focus           | Estimated Size |
|-----------|--------------|------------------|-----------------|----------------|
| 1         | iteration/1  | EP-M01 + EP-M02  | Foundation + docs | M            |
```

## CPS reference

Chapter 10 of the CPSBok covers the full backlog development technique,
including epic decomposition, MoSCoW prioritization, and dependency mapping.
Agentic CPS inherits the epic/iteration structure and adapts the story format
to include session telemetry for AI cost tracking.
