---
phase: 04-delivery-management-and-installer
plan: "01"
subsystem: skills
tags: [acps-gate, acps-status, delivery-governance, baseline-locking, scope-balance]
dependency_graph:
  requires: [acps-init]
  provides: [acps-gate, acps-status]
  affects: [skills/acps-gate, skills/acps-status]
tech_stack:
  added: []
  patterns: [skill-2file-pattern, xml-workflow-steps, yaml-frontmatter, change-log]
key_files:
  created:
    - skills/acps-gate/SKILL.md
    - skills/acps-gate/workflow.md
    - skills/acps-status/SKILL.md
    - skills/acps-status/workflow.md
  modified: []
decisions:
  - id: D-gate-modes
    choice: "Two-mode design: view-blockers (no write) and approve-and-lock (writes change-log.md)"
    reason: "Separates read-only gate checks from the irreversible baseline-locking action"
  - id: D-status-sources
    choice: "acps-status reads git branch, backlog.md, change-log.md — no user prompts"
    reason: "Zero-friction status readout; all data already in planning artifacts"
self_check: PASSED
---

## What Was Built

Created the delivery governance skill pair for Phase 4:

**`acps-gate`** — 5-step workflow with two modes:
- View-blockers mode: reads backlog.md, change-log.md, roadmap.md to surface incomplete must-haves; HALT if roadmap.md is missing
- Approve-and-lock mode: computes BCP baseline from roadmap.md, writes `change-log.md` with YAML front-matter (`baseline_bcp`, `baseline_fp`, `approved_at`, `approved_by`) and a CR table; requires explicit "approve" confirmation before writing

**`acps-status`** — 4-step workflow:
- Reads `.acps-config.json` for `planningDir`
- Reads git branch to extract current phase/iteration
- Reads `backlog.md` for active epic and iteration status
- Reads `change-log.md` for BCP/FP baseline vs current balance
- Outputs structured project status block: phase, iteration, active epic, scope balance

## Deviations

None.

## Self-Check

- [x] skills/acps-gate/SKILL.md exists, contains `name: acps-gate`
- [x] skills/acps-gate/workflow.md has 5 steps, two-mode design, writes change-log.md
- [x] skills/acps-status/SKILL.md exists, contains `name: acps-status`
- [x] skills/acps-status/workflow.md reads git branch + backlog.md + change-log.md
- [x] 0 markdownlint errors
- [x] DELIV-02, DELIV-03 requirements covered
