# acps-gate Workflow

**CPS Reference:** CPS Chapter 12 — Gate Management and Baseline Locking

## Context

`acps-gate` enforces CPS gate discipline at the boundary between the Setup Phase and the
Production Flow Phase. It operates in two modes: (1) **blockers view** — scans for missing
required artifacts and lists what is blocking gate approval; (2) **approval** — when the
user types `approve`, locks the BCP baseline by writing `change-log.md` with YAML front-matter.

**Two modes (D-09):** Blockers view runs automatically; approval is triggered by user typing `approve`
**BCP baseline (D-11):** Computed from `roadmap.md` — sum of all epic BCP estimates
**change-log.md format (D-10):** YAML front-matter + empty CR table ready for change requests

---

<workflow>

<step n="1" goal="Load config and determine planningDir">
  <action>Look for `.acps-config.json` in the project root</action>
  <check if=".acps-config.json exists">
    <action>Read `.acps-config.json` and extract `planningDir` value</action>
  </check>
  <check if=".acps-config.json is missing">
    <action>Set planningDir to `.planning` (silent default)</action>
  </check>
</step>

<step n="2" goal="Check blockers view — list missing artifacts blocking the gate">
  <action>Read `docs/gates.md` to identify the required artifacts for the current gate</action>
  <check if="docs/gates.md does not exist">
    <action>Use the standard Setup Gate checklist: vision.md, backlog.md, architecture.md, roadmap.md</action>
  </check>
  <action>Scan `{planningDir}/` for each required artifact. For each file, check whether it exists:
    - `{planningDir}/vision.md`
    - `{planningDir}/backlog.md`
    - `{planningDir}/architecture.md`
    - `{planningDir}/roadmap.md`
  </action>
  <action>Build a blockers table: for each missing file, add a row with the filename and the skill
  that creates it (e.g., `roadmap.md` → `acps-project-roadmap`)</action>
  <check if="all required artifacts are present">
    <output>**acps-gate — Setup Gate Check**

All required artifacts are present. The gate is clear.

| Artifact | Status |
|----------|--------|
| vision.md | present |
| backlog.md | present |
| architecture.md | present |
| roadmap.md | present |

Type `approve` to lock the BCP baseline and open the change log, or `exit` to cancel.
    </output>
  </check>
  <check if="any required artifacts are missing">
    <action>Display the heading "**acps-gate — Setup Gate Check**" followed by a blank line and the
    message "The following artifacts are missing. Complete them before approving the gate." Then
    display a table with columns "Artifact | Status | Create With" — one row per checked artifact:
    missing ones show status MISSING with the skill that creates it; present ones show status
    "present" with an em dash in the Create With column. Finally display: "Type `approve` to lock
    the BCP baseline anyway, or `exit` to fix blockers first."</action>
  </check>
  <action>Wait for user input</action>
  <check if="user typed anything other than `approve`">
    <output>Gate approval cancelled. Fix the blockers listed above, then run `acps-gate` again.</output>
    <action>HALT</action>
  </check>
</step>

<step n="3" goal="Compute BCP baseline from roadmap.md on approval (D-11)">
  <check if="`{planningDir}/roadmap.md` does not exist">
    <output>Cannot compute BCP baseline: `{planningDir}/roadmap.md` not found.

Run `acps-project-roadmap` first to generate roadmap.md with BCP estimates, then run `acps-gate` again.</output>
    <action>HALT</action>
  </check>
  <action>Read `{planningDir}/roadmap.md`</action>
  <action>Extract all epic BCP estimates from the roadmap. Look for BCP values in the epics table
  or epic sections — typically labeled as `BCP`, `bcp`, or `story points`. Sum all epic BCP
  values to compute `baseline_bcp`.</action>
  <action>Set `baseline_fp` to `0` — FP baseline is always 0 at the setup gate (no feature
  points have been added yet)</action>
  <action>Record `approved_at` = current ISO 8601 timestamp</action>
  <action>Ask: "Who or what is approving this gate? (e.g., 'Claude Code / claude-opus-4' or your name)"</action>
  <action>Set `approved_by` = user's answer</action>
</step>

<step n="4" goal="Write change-log.md with YAML front-matter (D-10)">
  <action>Write `{planningDir}/change-log.md` with the following content:

```markdown
---
baseline_bcp: {baseline_bcp}
baseline_fp: 0
approved_at: "{approved_at}"
approved_by: "{approved_by}"
---

## Change Log

| CR ID | Date | Description | BCP Delta | FP Delta | Balance |
|-------|------|-------------|-----------|----------|---------|
```

  </action>
  <action>Confirm the file was written successfully</action>
</step>

<step n="5" goal="Report completion and recommend next action">
  <output>**acps-gate complete — Setup Gate APPROVED.**

BCP baseline locked: `{baseline_bcp}` BCP
FP baseline locked: `0` FP
Approved at: `{approved_at}`
Approved by: `{approved_by}`

Written to: `{planningDir}/change-log.md`

The change log is open. All future scope changes (new epics, removed epics, renegotiated
stories) are tracked as CR entries in this file.

**Next step:** Run `acps-branch` to start the first iteration, or `acps-status` to view the
current delivery position.
  </output>
</step>

</workflow>
