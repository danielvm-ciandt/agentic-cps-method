---
phase: 04-delivery-management-and-installer
plan: "05"
subsystem: skills
tags: [acps-deliverable, acps-report, document-generation, template-fill, human-review]
dependency_graph:
  requires: [acps-init]
  provides: [acps-deliverable, acps-report]
  affects: [skills/acps-deliverable, skills/acps-report]
tech_stack:
  added: []
  patterns: [skill-2file-pattern, xml-workflow-steps, human-review-gate, template-fill]
key_files:
  created:
    - skills/acps-deliverable/SKILL.md
    - skills/acps-deliverable/workflow.md
    - skills/acps-report/SKILL.md
    - skills/acps-report/workflow.md
  modified: []
decisions:
  - id: D-deliverable-review-gate
    choice: "acps-deliverable pauses for human 'approved' before marking client-ready"
    reason: "DELIV-01: AI fills template, human reviews and sends to client — prevents accidental transmission"
  - id: D-report-git-log
    choice: "acps-report reads git log with period-appropriate --since flag for commit listing"
    reason: "Gives teams accurate record of work done without manual entry"
self_check: PASSED
---

## What Was Built

Created the document generation skill pair for Phase 4:

**`acps-deliverable`** — 5-step workflow:
- Reads `.acps-config.json`; presents 4 deliverable types mapped to `templates/deliverables/`
- Gathers data from `backlog.md` (iteration status) and `change-log.md` (BCP/FP balance)
- Fills selected template; writes to `{planningDir}/deliverables/{type}-{date}.md`
- Presents full draft for human review with edit loop (repeat until 'approved')
- Reports client-ready status after approval

**`acps-report`** — 4-step workflow:
- Reads `.acps-config.json`; presents 4 report types mapped to `templates/reports/`
- Collects data from `backlog.md`, `change-log.md`, and git log (period-appropriate)
- Fills selected template; writes to `{planningDir}/reports/{type}-{date}.md`
- Reports completion with path and period

## Deviations

None — `acps-report` was created inline (agent couldn't commit it) but content matches plan spec exactly.

## Self-Check

- [x] skills/acps-deliverable/SKILL.md contains `name: acps-deliverable`
- [x] skills/acps-deliverable/workflow.md references `templates/deliverables`, has 'approved' gate
- [x] skills/acps-report/SKILL.md contains `name: acps-report`
- [x] skills/acps-report/workflow.md references `templates/reports`, daily/weekly/monthly/quarterly, git log
- [x] 0 markdownlint errors
- [x] DELIV-01, DELIV-04 requirements covered
