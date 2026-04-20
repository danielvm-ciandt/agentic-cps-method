# acps-homologate Workflow

**CPS Reference:** CPS Chapter 28 — Continuous Homologation

## Context

`acps-homologate` runs the final quality gate of the CPS GSD loop. It presents all acceptance
criteria simultaneously, collects user pass/fail verdicts, computes aggregate telemetry from the
story's `sessions[]` array, and marks the story as `homologated` or `failed`. Failed stories route
to `acps-bug-fix` for correction.

**AC walkthrough format (D-12):** All ACs presented at once. User marks by number: `1-pass, 2-fail, 3-pass`
**Totals computation (D-13):** Sum all sessions[] values — duration_ms, tokens.input, tokens.output, tokens.total; count sessions
**On failure (D-14):** Complete the full AC review first, then report failures and route to acps-bug-fix
**On full pass (D-15):** Set `status: homologated` in story YAML front-matter

---

<workflow>

<step n="1" goal="Load story and verify execution completed">
  <action>Look for `.acps-config.json` in the project root</action>
  <check if=".acps-config.json exists">
    <action>Read `.acps-config.json` and extract `planningDir` value</action>
  </check>
  <check if=".acps-config.json is missing">
    <action>Set planningDir to `.planning` (silent default)</action>
  </check>
  <action>Ask: "Which story are we homologating? Provide the path to the story file."</action>
  <check if="story file does not exist">
    <output>Story file not found. Check the path and try again.</output>
    <action>HALT</action>
  </check>
  <action>Read the full story file. Extract:
    - YAML front-matter: story_id, sessions[] array, current totals
    - ## Test section: all acceptance criteria (checkbox items)
    - Story title
  </action>
  <check if="## Test section is missing or empty">
    <output>No acceptance criteria found. Run `acps-spec` first, then `acps-execute` before homologating.</output>
    <action>HALT</action>
  </check>
  <check if="sessions[] array is empty">
    <output>No sessions recorded. Run `acps-execute` to implement the story and record a session before homologating.</output>
    <action>HALT</action>
  </check>
</step>

<step n="2" goal="Present all ACs at once for UAT (D-12)">
  <output>**Homologation — {story title}**

### CPS Chapter 28: User Acceptance Test

Here are all acceptance criteria for this story. For each, verify the behavior in the running
system, then mark your results using the format: `1-pass, 2-fail, 3-pass` (number corresponds to
AC number below).

---

Acceptance Criteria:
{for each AC with its number:}
{N}. {AC description}
{end for}

---

Mark your results (e.g., "1-pass, 2-pass, 3-fail, 4-pass"):
  </output>
  <action>Wait for user's verdict string (format: "{N}-pass" or "{N}-fail" for each AC, comma-separated)</action>
  <action>Parse the verdict string: for each entry, record ac_number and result ("pass" or "fail")</action>
  <check if="any AC number in verdict is not in the AC list">
    <output>Unrecognized AC number in your verdict. Please re-enter with valid numbers ({min}–{max}).</output>
    <action>Re-display the ACs and ask for verdicts again</action>
  </check>
  <check if="not all AC numbers are covered in the verdict">
    <output>Missing verdict for AC(s): {missing_numbers}. Please provide a result for all ACs.</output>
    <action>Ask for the missing verdicts</action>
  </check>
</step>

<step n="3" goal="Compute totals from sessions[] (D-13)">
  <action>Iterate through all entries in the story YAML front-matter `sessions[]` array:
    - Sum all `duration_ms` values → total_duration_ms
    - Sum all `tokens.input` values → total_tokens_input
    - Sum all `tokens.output` values → total_tokens_output
    - Sum all `tokens.total` values → total_tokens_total
    - Count the number of sessions → sessions_count
  </action>
</step>

<step n="4" goal="Write totals block and set story status (D-14 / D-15)">
  <action>Count failed ACs from the verdicts collected in Step 2</action>
  <action>Update the story YAML front-matter:

- Write the `totals` block:

```yaml
totals:
  sessions_count: {sessions_count}
  total_duration_ms: {total_duration_ms}
  tokens:
    input: {total_tokens_input}
    output: {total_tokens_output}
    total: {total_tokens_total}
```

- Set story status:
  - If ALL ACs passed: add or update `status: homologated` in the YAML front-matter (D-15)
  - If ANY AC failed: add or update `status: failed` in the YAML front-matter (D-14)

- Annotate the ## Test section with per-AC results:
  - For each passed AC: change `- [ ]` to `- [x]`
  - For each failed AC: keep as `- [ ]` and append `← FAILED`
  </action>
  <action>Write the updated story file</action>
</step>

<step n="5" goal="Report results and route failures (D-14 / D-15)">
  <action>Count total ACs, passed ACs, failed ACs</action>
  <check if="failed_count == 0">
    <output>
**acps-homologate complete — HOMOLOGATED.**

Story: {story_title}
All {total_count} ACs passed.
Status: homologated

Totals written:

- Sessions: {sessions_count}
- Total duration: {total_duration_ms}ms
- Total tokens: {total_tokens_total} ({total_tokens_input} in / {total_tokens_output} out)

**The story is complete. Merge your branch and celebrate.**
    </output>
  </check>
  <check if="failed_count > 0">
    <output>
**acps-homologate complete — FAILED.**

Story: {story_title}
{failed_count} AC(s) failed:

{for each failed AC:}

- AC {N}: {AC description}

{end for}

Status: failed

Totals written:

- Sessions: {sessions_count}
- Total duration: {total_duration_ms}ms
- Total tokens: {total_tokens_total}

{failed_count} ACs failed — run acps-bug-fix to file bugs and fix.
    </output>
  </check>
</step>

</workflow>
