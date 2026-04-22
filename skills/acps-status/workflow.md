# acps-status Workflow

**CPS Reference:** CPS Chapter 15 — Delivery Visibility and Scope Tracking

## Context

`acps-status` gives a real-time view of delivery health. It reads the current git branch to
determine iteration and active epic, reads `backlog.md` for iteration status, and reads
`change-log.md` for BCP/FP scope balance. The output is a formatted dashboard showing phase,
iteration, active epic, and scope balance at a glance.

**Source data (D-20):** git branch name, `{planningDir}/backlog.md`, `{planningDir}/change-log.md`
**Branch pattern:** `iter-{N}/{epic-id}-{slug}` — iteration number and epic ID are parsed from this

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

<step n="2" goal="Read current state from git branch and planning artifacts">
  <action>Run `git branch --show-current` to get the active branch name</action>
  <action>Parse the branch name using pattern `iter-{N}/{epic-id}-{slug}`:
    - Extract iteration number N from the `iter-{N}` prefix
    - Extract epic-id from the path segment after the slash (everything before the first `-{slug}`)
    - If the branch does not match this pattern, set iteration to "unknown" and epic-id to "unknown"
  </action>
  <check if="`{planningDir}/backlog.md` exists">
    <action>Read `{planningDir}/backlog.md`. Extract:
      - Current iteration status (look for the `iter-{N}` section matching the branch iteration)
      - Active epic title (match epic-id against epics listed in backlog.md)
      - Overall project phase (Setup / Production Flow / Value Activation — infer from backlog
        section headings or iteration number)
    </action>
  </check>
  <check if="`{planningDir}/backlog.md` does not exist">
    <action>Set phase to "unknown", iteration status to "unknown", epic title to "unknown"</action>
  </check>
  <check if="`{planningDir}/change-log.md` exists">
    <action>Read `{planningDir}/change-log.md`. Extract from the YAML front-matter:
      - `baseline_bcp` value
      - `baseline_fp` value
    </action>
  </check>
  <check if="`{planningDir}/change-log.md` does not exist">
    <action>Set baseline_bcp to "not set (run acps-gate)" and baseline_fp to "not set (run acps-gate)"</action>
  </check>
</step>

<step n="3" goal="Compute scope balance from change-log.md CR table">
  <check if="`{planningDir}/change-log.md` exists">
    <action>Read the CR table in `{planningDir}/change-log.md`. Scan every data row (skip the
    header and separator rows). For each row, extract the BCP Delta and FP Delta numeric values.
    Sum all BCP Delta values → total_bcp_delta. Sum all FP Delta values → total_fp_delta.
    Compute current_bcp = baseline_bcp + total_bcp_delta.
    Compute current_fp = baseline_fp + total_fp_delta.
    Compute bcp_delta_display = current_bcp - baseline_bcp (show with sign: +N or -N or 0).
    Compute fp_delta_display = current_fp - baseline_fp (show with sign: +N or -N or 0).
    </action>
  </check>
  <check if="`{planningDir}/change-log.md` does not exist">
    <action>Set current_bcp, current_fp, bcp_delta_display, and fp_delta_display all to
    "not tracked (run acps-gate to set baseline)"</action>
  </check>
</step>

<step n="4" goal="Output status dashboard">
  <output>**acps-status**

Phase:       {phase — e.g. Setup / Production Flow / Value Activation, derived from backlog.md}
Iteration:   iter-{N} (from git branch)
Active epic: {epic-id} — {epic title} (from backlog.md)

Scope balance:
  BCP baseline:  {baseline_bcp}
  BCP current:   {current_bcp}  (delta: {bcp_delta_display})
  FP baseline:   {baseline_fp}
  FP current:    {current_fp}   (delta: {fp_delta_display})
  </output>
  <check if="change-log.md does not exist">
    <output>Scope: not tracked (run acps-gate to set baseline)</output>
  </check>
  <check if="backlog.md does not exist">
    <output>Note: backlog.md not found — run `acps-backlog` to create it.</output>
  </check>
</step>

</workflow>
