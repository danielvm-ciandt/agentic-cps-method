# Practice 03 — Model Business Processes

**CPS Chapter:** Ch.11 · Model Business Processes  
**Skill:** Embedded in `/acps-vision` and `/acps-backlog`

## Overview

Business process modeling maps the workflows a product must support before
architecture is designed. In agentic development, this practice surfaces the
decision points, approval flows, and data lifecycles that the AI agent must
understand to spec and implement correctly.

Agentic CPS does not produce a separate BPMN diagram — instead, it captures
process decisions as structured sections inside `vision.md` and `backlog.md`.
The AI uses these as grounding context when running `/acps-discuss` and
`/acps-spec`.

## Requirements

- [ ] Key workflows identified and named (e.g., "Setup Phase Gate flow")
- [ ] Decision points in each workflow documented
- [ ] Actor roles named: user, AI agent, human reviewer, system
- [ ] Happy path and exception paths described in plain language
- [ ] Workflow sections added to `vision.md` or `backlog.md` as appropriate

## Non-goals

- This practice does not produce BPMN diagrams in `.planning/`
- It does not model every edge case — only the decision points relevant to scope
- Detailed workflow steps are captured in `docs/workflow/` during Production Flow

## Acceptance criteria

- [ ] AC 1: CPS lifecycle (Setup → Production Flow → Value Activation) modeled as a workflow
- [ ] AC 2: GSD loop (branch → discuss → spec → plan → execute → homologate) documented
- [ ] AC 3: Phase gate flow documented: what blocks the gate, who approves, what unlocks
- [ ] AC 4: Actor roles named: team member, AI agent, reviewer, client/sponsor
- [ ] AC 5: Scope management flow documented: how CRs are submitted, reviewed, and approved

---

## Key workflows in Agentic CPS

### CPS Lifecycle

```text
SETUP PHASE
  Vision → Backlog → Architecture → Roadmap
  → /acps-deliverable → human review → /acps-gate

PRODUCTION FLOW (N iterations)
  /acps-new-iteration
    For each epic:
      /acps-branch → /acps-discuss → /acps-spec → /acps-plan
      → /acps-execute → /acps-homologate
  → /acps-deliverable → /acps-gate

VALUE ACTIVATION
  Production entry → Late homologation → Change management
  → /acps-deliverable → /acps-gate
```

### Gate flow

```text
/acps-gate runs → checks all conditions
  If blocked: lists what is missing → team resolves → re-run /acps-gate
  If passed:  locks BCP baseline (setup gate only) → unlocks next phase
```

### Scope change flow

```text
Discovery → /acps-change-request (declares +/- BCP delta)
  → if adding scope: nominate equal removal OR flag as approved overrun
  → /acps-scope-manager reviews → approves or rejects CR
  → change-log.md updated
```

## CPS reference

Chapter 11 of the CPSBok covers business process modeling using BPMN notation
and CI&T's process architecture framework. Agentic CPS simplifies this to
prose-based workflow documentation embedded in the planning artifacts.
