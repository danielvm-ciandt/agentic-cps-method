# acps-scope-manager Workflow

**CPS Reference:** CPS Chapter 16 — Change Control and Scope Accounting

## Context

`acps-scope-manager` reads `change-log.md` and renders the full scope ledger: a header block
comparing baseline vs current BCP/FP with balance, followed by the complete CR history table.
On overrun (current > baseline), displays a clear warning banner with the exact gap (D-04).
Information only — does not block work or require action (D-04).

**Ledger display format (D-05):**
- Header block: Baseline BCP | Current BCP | Balance — same row for FP
- CR table: All rows from change-log.md CR table (CR ID, date, description, deltas, running balance)

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

<step n="2" goal="Check that change-log.md exists">
  <check if="`{planningDir}/change-log.md` does not exist">
    <output>No scope baseline found. Run `acps-gate` to lock the BCP baseline and open the change log.</output>
    <action>HALT</action>
  </check>
</step>

<step n="3" goal="Read change-log.md and extract baseline values and CR history">
  <action>Read `{planningDir}/change-log.md`</action>
  <action>Extract from YAML front-matter:
    - `baseline_bcp` (numeric)
    - `baseline_fp` (numeric)
    - `approved_at` (ISO-8601 string)
    - `approved_by` (string)
  </action>
  <action>Read all data rows from the CR table (skip header and separator rows). Store as `cr_rows`.</action>
</step>

<step n="4" goal="Compute scope totals from CR history">
  <action>Sum all BCP Delta values from `cr_rows` → `total_bcp_delta`</action>
  <action>Sum all FP Delta values from `cr_rows` → `total_fp_delta`</action>
  <action>Compute `current_bcp = baseline_bcp + total_bcp_delta`</action>
  <action>Compute `current_fp = baseline_fp + total_fp_delta`</action>
  <action>Compute `bcp_balance = baseline_bcp - current_bcp` (positive = headroom remaining, negative = overrun)</action>
  <action>Compute `fp_balance = baseline_fp - current_fp` (positive = headroom remaining, negative = overrun)</action>
  <action>Format `bcp_balance_display`: if bcp_balance >= 0 show `+{bcp_balance}`, if negative show `{bcp_balance}` (already negative)</action>
  <action>Format `fp_balance_display`: same sign convention as bcp_balance_display</action>
</step>

<step n="5" goal="Display ledger header block">
  <output>**acps-scope-manager — Scope Ledger**

| Metric | Baseline | Current | Balance |
|--------|----------|---------|---------|
| BCP    | {baseline_bcp} | {current_bcp} | {bcp_balance_display} |
| FP     | {baseline_fp}  | {current_fp}  | {fp_balance_display}  |

Approved at: {approved_at} | Approved by: {approved_by}
  </output>
</step>

<step n="6" goal="Display CR history table">
  <check if="no CR data rows exist in cr_rows">
    <output>No change requests registered yet. Run `acps-change-request` to register the first CR.</output>
  </check>
  <check if="CR data rows exist">
    <output>**Change Request History**

| CR ID | Date | Description | BCP Delta | FP Delta | Balance |
|-------|------|-------------|-----------|----------|---------|
{display all rows from cr_rows exactly as stored in change-log.md}
    </output>
  </check>
</step>

<step n="7" goal="Check for overrun and display status or warning banner">
  <check if="bcp_balance < 0 OR fp_balance < 0">
    <output>**SCOPE OVERRUN DETECTED**
BCP overrun: {abs(bcp_balance)} BCP over baseline (if bcp_balance is negative)
FP overrun: {abs(fp_balance)} FP over baseline (if fp_balance is negative)
Consider running `acps-change-request` with a negative delta to remove scope,
or negotiate a baseline adjustment via a new gate approval.
    </output>
  </check>
  <check if="bcp_balance >= 0 AND fp_balance >= 0">
    <output>Scope is within baseline. No action required.</output>
  </check>
</step>

</workflow>
