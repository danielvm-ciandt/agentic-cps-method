# Phase 3: Setup & Loop Skills - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-19
**Phase:** 03-setup-and-loop-skills
**Areas discussed:** Skill file depth, leanspec CLI integration, Ambiguity scoring (acps-spec), Homologation UX (acps-homologate)

---

## Skill file depth

| Option | Description | Selected |
|--------|-------------|----------|
| Full XML step-by-step (GSD-style) | `<step>` blocks with explicit actions, conditionals, outputs | ✓ |
| Concise prose instructions | Short narrative paragraphs, Claude fills gaps | |
| Hybrid: key steps structured, rest prose | Gates as XML, narrative as prose | |

**User's choice:** Full XML step-by-step (GSD-style)
**Notes:** Matches lean-spec BMAD pattern exactly.

| Option | Description | Selected |
|--------|-------------|----------|
| SKILL.md = YAML frontmatter only, workflow.md = all logic | Thin SKILL.md + delegate line, full logic in workflow.md | ✓ |
| SKILL.md = YAML + brief usage guide, workflow.md = steps | Heavier SKILL.md | |
| Everything in SKILL.md, no workflow.md | Single file | |

**User's choice:** SKILL.md = YAML frontmatter only, workflow.md = all logic

---

## leanspec CLI integration

| Option | Description | Selected |
|--------|-------------|----------|
| Skills call leanspec commands directly | Tight coupling, assume CLI installed | |
| Skills describe what to write, not how | Loose coupling, no CLI | |
| Skills check for leanspec, fall back | Guard clause + dual path | |

**User's choice (freeform):** "we will not have lean spec cli installed, we are going to build it going forward"
**Notes:** leanspec CLI doesn't exist yet. Skills write Markdown directly. CLI integration is future work.

| Option | Description | Selected |
|--------|-------------|----------|
| Error with install instructions | Hard requirement, print install message | |
| Fall back to direct Markdown writes silently | No error, just write files directly | ✓ |
| Warn but continue | Half-measure | |

**User's choice:** Fall back to direct Markdown writes silently

| Option | Description | Selected |
|--------|-------------|----------|
| .acps-config.json in project root | acps-init writes planningDir key | ✓ |
| Hardcoded .planning/ | Simple, inflexible | |
| Ask user on first run | Interactive first-run | |

**User's choice:** .acps-config.json in project root

---

## Ambiguity scoring (acps-spec)

| Option | Description | Selected |
|--------|-------------|----------|
| Claude scores the story, shows score, blocks if >0.20 | Internal scoring, display, loop back | ✓ |
| User self-scores and confirms | Checklist-based, user rates | |
| Fixed checklist: N criteria must all pass | Deterministic pass/fail | |

**User's choice:** Claude scores the story, shows score, blocks if >0.20

| Option | Description | Selected |
|--------|-------------|----------|
| Show score + specific problems, loop back to refine | Iterative refinement loop | ✓ |
| Hard stop with error message | Print score, stop | |
| Save draft and notify which ACs need work | DRAFT status, list issues | |

**User's choice:** Show score + specific problems, loop back to refine

---

## Homologation UX (acps-homologate)

| Option | Description | Selected |
|--------|-------------|----------|
| One AC at a time: show AC, ask pass/fail | Sequential, guided | |
| Show all ACs at once, user marks each | Batch response (1-pass, 2-fail) | ✓ |
| Screenshot/evidence-based: user pastes proof | Evidence per AC, heavyweight | |

**User's choice:** Show all ACs at once, user marks each

| Option | Description | Selected |
|--------|-------------|----------|
| Write totals block, mark story FAILED, instruct to run acps-bug-fix | Complete record + clear next step | ✓ |
| Don't write totals, stop on first fail | Halt, lose complete record | |
| Ask user to choose: retry AC or log as bug | Per-failure prompt | |

**User's choice:** Write totals block, mark story FAILED, instruct to run acps-bug-fix

---

## Claude's Discretion

- Exact XML step naming and nesting depth within workflow.md files
- Which CPS chapter reference to cite in each skill's workflow.md header
- Whether to include a `## Context` preamble in workflow.md
- Exact ambiguity scoring rubric sub-weights

## Deferred Ideas

- leanspec CLI adapter layer — skills write Markdown directly now; CLI integration when CLI is built
- Companion files (checklist.md, discover-inputs.md) — not needed for Phase 3
