# acps-change-request Workflow

**CPS Reference:** CPS Chapter 16 — Change Control and Scope Accounting

## Context

`acps-change-request` registers a formal CR entry in `change-log.md`. The AI reads the change description from the user, computes BCP/FP delta from existing story estimates, assigns the next sequential CR ID, and appends the row to the CR table immediately — no confirm step (D-01). If registering this CR causes the running balance to go negative (overrun), a warning banner is shown but the CR is still written (D-04 by extension).

**CR ID format (D-03):** Sequential integers prefixed `CR-` and zero-padded to 3 digits (CR-001, CR-002...). Derived from highest existing row.
**change-log.md format (D-02):** YAML front-matter (baseline_bcp, baseline_fp, approved_at, approved_by) + CR table (CR ID | Date | Description | BCP Delta | FP Delta | Balance)
**Missing file (Claude's Discretion):** If change-log.md does not exist, create it with default YAML front-matter (baseline_bcp: 0, baseline_fp: 0, approved_at: now, approved_by: "default") and an empty CR table before appending.

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

<step n="2" goal="Read or create change-log.md">
  <check if="`{planningDir}/change-log.md` does not exist">
    <action>Create `{planningDir}/change-log.md` with the following default content:

```markdown
---
baseline_bcp: 0
baseline_fp: 0
approved_at: "{current ISO-8601 timestamp}"
approved_by: "default"
---

## Change Log

| CR ID | Date | Description | BCP Delta | FP Delta | Balance |
|-------|------|-------------|-----------|----------|---------|
```

  </action>
  <action>Set baseline_bcp = 0, baseline_fp = 0</action>
  </check>
  <check if="`{planningDir}/change-log.md` exists">
    <action>Read `{planningDir}/change-log.md`</action>
    <action>Extract `baseline_bcp` from the YAML front-matter</action>
    <action>Extract `baseline_fp` from the YAML front-matter</action>
  </check>
</step>

<step n="3" goal="Derive next CR ID from existing rows">
  <action>Scan all data rows in the CR table of `change-log.md` (skip header and separator rows)</action>
  <check if="no data rows exist">
    <action>Set next_cr_id = `CR-001`</action>
  </check>
  <check if="data rows exist">
    <action>Extract the CR ID from each row (format `CR-NNN`). Find the highest integer N. Set next_cr_id = `CR-{N+1}` zero-padded to 3 digits (e.g., highest is CR-003 → next is CR-004)</action>
  </check>
</step>

<step n="4" goal="Collect CR inputs from user">
  <output>**acps-change-request — Register Change Request**

Please provide the following details for this change request:</output>
  <action>Ask: "Describe the change (1-2 sentences):"</action>
  <action>Wait for user response. Store as `cr_description`.</action>
  <action>Ask: "BCP delta for this change? (positive = scope addition, negative = removal, 0 = neutral):"</action>
  <action>Wait for user response. Store as `bcp_delta` (numeric).</action>
  <action>Ask: "FP delta for this change? (positive = new feature points, negative = removal, 0 = neutral):"</action>
  <action>Wait for user response. Store as `fp_delta` (numeric).</action>
</step>

<step n="5" goal="Compute running balance">
  <action>Read all existing data rows from the CR table. Sum all BCP Delta values → `previous_bcp_total`.</action>
  <action>Compute `new_bcp_balance = baseline_bcp + previous_bcp_total + bcp_delta`</action>
  <action>Record `cr_date` = today's date in YYYY-MM-DD format</action>
  <action>Set `cr_id = next_cr_id` (derived in step 3)</action>
  <action>Format `bcp_delta_display`: if bcp_delta > 0 show `+{bcp_delta}`, if negative show `{bcp_delta}` (already negative), if 0 show `0`</action>
  <action>Format `fp_delta_display`: same sign convention as bcp_delta_display</action>
</step>

<step n="6" goal="Append CR row to change-log.md">
  <action>Insert a new data row at the end of the CR table in `{planningDir}/change-log.md`:

`| {cr_id} | {cr_date} | {cr_description} | {bcp_delta_display} | {fp_delta_display} | {new_bcp_balance} |`

  </action>
  <action>Write the updated `change-log.md` to disk</action>
  <action>Confirm the file was written successfully</action>
</step>

<step n="7" goal="Check for scope overrun and warn if applicable">
  <check if="new_bcp_balance < 0">
    <output>**SCOPE OVERRUN:** Current BCP balance is {new_bcp_balance}. Baseline: {baseline_bcp}. Gap: {abs(new_bcp_balance)} BCP. Consider removing scope or negotiating a baseline adjustment via a new gate approval.</output>
  </check>
</step>

<step n="8" goal="Output completion message">
  <output>**acps-change-request complete.**

CR registered:

- CR ID:       {cr_id}
- Date:        {cr_date}
- Description: {cr_description}
- BCP delta:   {bcp_delta_display}
- FP delta:    {fp_delta_display}
- New balance: {new_bcp_balance} BCP

Written to: `{planningDir}/change-log.md`

Run `acps-scope-manager` to view the full scope ledger.
  </output>
</step>

</workflow>
