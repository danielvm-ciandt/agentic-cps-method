# acps-project-roadmap Workflow

**CPS Reference:** CPS Chapter 12 — Project Roadmap & Estimation

## Context

`acps-project-roadmap` applies BCP/FP estimation to all project epics following CPS Chapter 12 discipline. It reads the backlog, guides estimation of each epic, then writes a delivery roadmap with milestones and scope baseline.

---

<workflow>

<step n="1" goal="Load project configuration and backlog">
  <action>Look for `.acps-config.json` in the project root</action>
  <check if=".acps-config.json exists">
    <action>Read `.acps-config.json` and extract `planningDir` value</action>
  </check>
  <check if=".acps-config.json is missing">
    <action>Set planningDir to `.planning` (silent default)</action>
  </check>
  <action>Look for `{planningDir}/backlog.md`</action>
  <check if="backlog.md does NOT exist">
    <output>backlog.md not found at `{planningDir}/backlog.md`.

Run `acps-backlog` first to define your epics and iterations, then return to `acps-project-roadmap`.</output>
    <action>HALT</action>
  </check>
  <action>Read `{planningDir}/backlog.md` and extract all epics (ID, title, BCP estimate, stories)</action>
</step>

<step n="2" goal="BCP/FP estimation per epic — CPS Chapter 12">
  <output>**Project Roadmap — CPS Chapter 12: Estimation**

I'll guide you through BCP estimation for each epic. BCP (Business Complexity Points) measures relative business value and complexity.
  </output>
  <action>Ask: "Do you want to use BCP only, or BCP + FP (Function Points)? (default: BCP only)"</action>
  <action>For each epic extracted from backlog.md:
    - Display: "Epic {ID}: {title} — {story count} stories, current BCP estimate: {bcp_estimate}"
    - Ask: "Confirm or update the BCP estimate for {ID}: {title}? (press Enter to keep {bcp_estimate})"
    - If user provides a new value: update bcp_estimate for this epic
    - If FP mode selected: Ask: "FP estimate for {ID}?" and record fp_estimate
  </action>
  <action>Calculate totals: total_bcp = sum of all epic bcp_estimates, total_fp = sum of all fp_estimates (if collected)</action>
</step>

<step n="3" goal="Define delivery milestones">
  <output>**Milestone Definition**

Now let's define delivery milestones based on the iteration plan in your backlog.
  </output>
  <action>Display the iteration plan from backlog.md (iteration IDs, their epics, epic BCP totals)</action>
  <action>Ask: "What is the target delivery date or velocity assumption? (e.g., '4 BCP points per sprint' or 'target date: 2025-Q3')"</action>
  <action>For each iteration:
    - Ask: "Milestone name for Iteration {N}? (e.g., 'MVP Launch', 'Phase 1 Complete')"
    - Ask: "Target date for Iteration {N}? (optional — leave blank if unknown)"
    - Record as: milestone_name, target_date, epics[], bcp_total
  </action>
</step>

<step n="4" goal="Write roadmap.md">
  <action>Compose `{planningDir}/roadmap.md`:

```markdown
# Project Roadmap

**CPS Reference:** Chapter 12
**Total BCP:** {total_bcp}
{if fp_mode:}**Total FP:** {total_fp}{end if}

## Epic Summary

| Epic | Title | BCP | FP | Stories |
|------|-------|-----|----|---------|
{for each epic: | {id} | {title} | {bcp} | {fp or "-"} | {story_count} |}

## Milestones

{for each milestone:}
### {milestone_name} — Iteration {N}

**Target:** {target_date or "TBD"}
**Epics:** {epic IDs}
**BCP:** {bcp_total}

---
{end for}

## Scope Baseline

Total BCP at project start: **{total_bcp}**
{if fp_mode:}Total FP at project start: **{total_fp}**{end if}

> This baseline is used by `acps-gate` and `acps-change-request` to track scope changes.
```
  </action>
  <action>Write the composed content to `{planningDir}/roadmap.md`</action>
</step>

<step n="5" goal="Report completion">
  <output>
**acps-project-roadmap complete.**

Roadmap written to: `{planningDir}/roadmap.md`
Total BCP: {total_bcp}
Milestones: {count}

**Setup Phase complete.** Your project is ready to enter the GSD Loop.

**Next steps (GSD Loop):**
  1. Run `acps-branch` — create the iteration branch
  2. Run `acps-discuss` — refine story context and decisions
  3. Run `acps-spec` — write acceptance criteria (ambiguity gate ≤ 0.20)
  4. Run `acps-plan` — break story into tasks with BCP estimates
  5. Run `acps-execute` — implement the story
  6. Run `acps-homologate` — walk all ACs with the user, mark story done
  </output>
</step>

</workflow>
