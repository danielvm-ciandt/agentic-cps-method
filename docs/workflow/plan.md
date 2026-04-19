# Workflow: Plan

**Command:** `/acps-plan`  
**CPS Practice:** Ch.27 — Burn Quality In  
**Position in GSD loop:** Step 4 (after `/acps-spec`)

## Overview

The Plan step breaks the story into implementation tasks and estimates each
task in hours or story points. The agent uses the acceptance criteria from
`/acps-spec` and the decisions from `/acps-discuss` to generate a task list
that maps directly to the ACs.

Planning is intentionally lightweight — it does not produce a Gantt chart or
a detailed project plan. It produces just enough structure for `/acps-execute`
to proceed without ambiguity.

## Requirements

- [ ] Spec session is complete (all ACs passed the ambiguity gate)
- [ ] Tasks map to acceptance criteria — each AC has at least one task
- [ ] Dependencies between tasks are explicit
- [ ] Estimate is recorded per task
- [ ] Task list written to story file under `## Plan`
- [ ] Session entry appended to story YAML

## Non-goals

- Plan does not assign tasks to specific people — Agentic CPS assumes the AI
  agent executes all tasks unless a human override is noted
- It does not produce a formal work breakdown structure (WBS)
- It does not re-estimate BCP — that is a change request

## Acceptance criteria

- [ ] AC 1: Task list is present in the story file under `## Plan`
- [ ] AC 2: Every AC from `/acps-spec` has at least one corresponding task
- [ ] AC 3: Dependencies between tasks are marked (e.g., "depends on task 2")
- [ ] AC 4: Estimates are present per task
- [ ] AC 5: Session entry written to story YAML

---

## Output format

```markdown
## Plan

- [ ] Task 1: Create `package.json` with required fields [est: 15 min]
- [ ] Task 2: Create `.releaserc.json` with semantic-release config [est: 20 min]
- [ ] Task 3: Run `npm install` and commit lockfile [est: 10 min]
        depends on: Task 1
- [ ] Task 4: Create `.markdownlint.json` [est: 5 min]
- [ ] Task 5: Verify `npm run lint` exits 0 [est: 10 min]
        depends on: Task 4
- [ ] Task 6: Verify `node --check bin/install.js` exits 0 [est: 5 min]
```

## Definition of Ready for execute

Before `/acps-execute` starts, the plan must meet:

- [ ] All tasks listed with estimates
- [ ] All dependencies explicit
- [ ] No task references an undefined external system without a note
- [ ] The branch exists and the story is `in-progress` in lean-spec
