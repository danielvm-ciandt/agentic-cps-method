---
phase: 05-scope-intelligence
reviewed: 2026-04-20T21:34:53Z
depth: standard
files_reviewed: 10
files_reviewed_list:
  - skills/acps-change-request/SKILL.md
  - skills/acps-change-request/workflow.md
  - skills/acps-scope-manager/SKILL.md
  - skills/acps-scope-manager/workflow.md
  - skills/acps-document-project/SKILL.md
  - skills/acps-document-project/workflow.md
  - skills/acps-scan/SKILL.md
  - skills/acps-scan/workflow.md
  - skills/acps-code-map/SKILL.md
  - skills/acps-code-map/workflow.md
findings:
  critical: 3
  warning: 8
  info: 4
  total: 15
status: issues_found
---

# Phase 05: Code Review Report

**Reviewed:** 2026-04-20T21:34:53Z
**Depth:** standard
**Files Reviewed:** 10
**Status:** issues_found

## Summary

Reviewed 5 skill pairs (SKILL.md + workflow.md) covering scope accounting (`acps-change-request`, `acps-scope-manager`) and project intelligence (`acps-document-project`, `acps-scan`, `acps-code-map`). The skills are well-structured overall, but contain three critical issues — two logic/correctness errors in the balance computation algorithms and one path-traversal exposure in `acps-document-project`. Eight warnings cover missing existence/error handling, race-prone multi-step file updates, and logical gaps. Four info items address naming inconsistencies, stale output text, and missing SKILL.md field alignment.

---

## Critical Issues

### CR-01: Balance formula in `acps-scope-manager` is always zero

**File:** `skills/acps-scope-manager/workflow.md:54`
**Issue:** Step 4 computes `bcp_balance = baseline_bcp - current_bcp`. But `current_bcp = baseline_bcp + total_bcp_delta` (computed on line 52), so the formula reduces to `baseline_bcp - (baseline_bcp + total_bcp_delta)` = `-total_bcp_delta`. When no CRs have been registered the balance correctly shows `0`, but the sign is wrong in all other cases: a positive-delta CR (scope added) should produce a *negative* balance (scope used up), yet the formula yields a negative balance — which triggers the overrun warning — even for scope removals. The conceptually correct balance that aligns with the Change-Log step 5 in `acps-change-request` is `balance = baseline - total_delta_consumed`, but the overrun condition should fire when `total_bcp_delta > baseline_bcp`, not when the subtraction is merely negative. The safest fix: replace the formula with `bcp_balance = baseline_bcp - total_bcp_delta` and keep the overrun guard as `bcp_balance < 0`.

**Fix:**
```yaml
# step 4 — correct formula
Compute `bcp_balance = baseline_bcp - total_bcp_delta`
Compute `fp_balance  = baseline_fp  - total_fp_delta`
```

---

### CR-02: `acps-change-request` step 5 computes balance inconsistently with step 3 (ID derivation can lag one CR)

**File:** `skills/acps-change-request/workflow.md:78-82`
**Issue:** Step 5 reads `previous_bcp_total` by re-scanning the CR table *after* step 3 has already scanned it for the ID. The ID derivation in step 3 and the balance summation in step 5 are two independent sequential reads of the same file. Because no lock is taken and the workflow is silent about re-reading, a concurrent invocation (two agents running `acps-change-request` simultaneously on the same project) could assign the same `next_cr_id` and produce a corrupted table. More importantly, the balance row appended to `change-log.md` stores `new_bcp_balance` (step 5, line 82), yet `acps-scope-manager` re-derives current BCP by summing the `BCP Delta` column — it does not trust the stored balance column. This means if the stored balance ever diverges from the summed deltas (e.g., manual edit, baseline change), `scope-manager` will show a different "current" value than what the CR row recorded. The Balance column should be treated as a *display cache* and the description in the context block should explicitly say it is informational only.

**Fix:**
In the `acps-change-request` context block, add a clarifying note:

```markdown
**Balance column:** The balance value appended to each CR row is a display cache
computed at insert time. `acps-scope-manager` always re-derives the running total
from the delta columns and the YAML baseline — it does not read the balance column.
```

And in `acps-scope-manager` step 6, add an explicit instruction:

```yaml
<action>Display all rows from cr_rows as stored. Note: the Balance column in the
CR table is informational; the authoritative balance is computed in step 4.</action>
```

---

### CR-03: Path traversal via unvalidated `planningDir` from `.acps-config.json`

**File:** `skills/acps-document-project/workflow.md:61`
**Issue:** Step 3 runs a shell `find` command that uses the project root (`.`) as its base. The workflow does not validate the `planningDir` value read from `.acps-config.json`. If a malicious or misconfigured config sets `planningDir` to `../../etc` or any path outside the project root, the workflow will write state and output files to arbitrary locations on the filesystem. The same exposure applies to `acps-change-request` (step 2 writes to `{planningDir}/change-log.md`), `acps-scope-manager` (step 2 reads from `{planningDir}/change-log.md`), `acps-scan` (step 4 reads `{planningDir}/backlog.md` and `{planningDir}/notes.md`), and `acps-code-map` (step 1 creates `{planningDir}/codebase/`). The `find` command in `acps-document-project` is the highest-risk instance because it enumerates the filesystem and the results feed into multiple file writes.

**Fix:** Add a validation step after reading `planningDir` in every skill's step 1:

```yaml
<action>Validate `planningDir`: reject any value containing `..` or starting with `/`.
If invalid, warn the user and fall back to `.planning`.</action>
```

---

## Warnings

### WR-01: `acps-change-request` does not validate numeric inputs for BCP/FP delta

**File:** `skills/acps-change-request/workflow.md:71-74`
**Issue:** Step 4 collects `bcp_delta` and `fp_delta` from user input and stores them as "numeric", but there is no instruction to validate that the values are actually numbers before using them in arithmetic in step 5. A non-numeric entry (e.g., empty string, `"TBD"`, or `"~10"`) will silently produce `NaN` or break the arithmetic, resulting in a corrupted `change-log.md` row.

**Fix:**
```yaml
<action>Parse user response as a number. If the value is not a valid integer or decimal,
re-prompt: "Please enter a numeric value (e.g., 5, -3, 0)."</action>
```

---

### WR-02: `acps-document-project` state file update is not atomic — partial-completion is silently skipped on resume

**File:** `skills/acps-document-project/workflow.md:87,99,111,125`
**Issue:** Each doc-writing step (5–8) says "write the updated `.scan-state.json` atomically before proceeding." However, the phrase "atomically" is not actionable for an AI agent — there is no instruction for what to do if the state write fails after the doc was written. On resume (step 2), the malformed-JSON guard resets to a full re-run, but a valid state file that was written *before* the doc write could list a doc as "pending" even though it already exists on disk. The resume logic should check whether the output file already exists on disk and reconcile with the state file.

**Fix:**
```yaml
<step n="2" — add reconciliation>
<action>For each doc in the `pending` array, check if `{planningDir}/intel/{doc}` already
exists on disk. If it does, move it from `pending` to `completed` in the in-memory state
(the previous run wrote the file but failed to update state). Log reconciled items.</action>
```

---

### WR-03: `acps-document-project` step 3 `find` command excludes `.planning` but not `{planningDir}` when custom

**File:** `skills/acps-document-project/workflow.md:61`
**Issue:** The `find` command hard-codes `-not -path '*/.planning/*'` as the exclusion for the planning directory. If the user has configured a custom `planningDir` (e.g., `.project-planning`), that directory will *not* be excluded from the source tree enumeration, and planning artifacts will appear in `source-tree.md` as source files.

**Fix:**
```yaml
<action>Run: `find . -not -path '*/node_modules/*' -not -path '*/.git/*'
  -not -path '*/dist/*' -not -path '*/{planningDir}/*' -type f | sort`</action>
```
(substitute the resolved `planningDir` value into the exclusion path)

---

### WR-04: `acps-scan` SKILL.md frontmatter uses `delegate: workflow` instead of `delegate: workflow.md`

**File:** `skills/acps-scan/SKILL.md:5`
**Issue:** The `delegate` field reads `workflow` (no extension), while all other skills in the batch consistently use `delegate: workflow.md`. Similarly, `acps-code-map/SKILL.md` line 5 has the same discrepancy. This inconsistency is a correctness issue because the loader that resolves `delegate` values may perform a file-existence check and fail silently if the extension is required.

**Fix:**
```yaml
delegate: workflow.md
```
Apply to both `skills/acps-scan/SKILL.md` and `skills/acps-code-map/SKILL.md`.

---

### WR-05: `acps-scan` step 4 branch-name parsing is fragile — epic-id extraction stops at first `-`

**File:** `skills/acps-scan/workflow.md:71-75`
**Issue:** Step 4 instructs: "Extract epic-id from the path segment after the slash (everything before the first `-{slug}`)." However the branch pattern is `iter-{N}/{epic-id}-{slug}`. The instruction says to take "everything before the first `-{slug}`", but if the epic-id itself contains a hyphen (e.g., `EP-M01`), then `EP-M01-implement-auth` would be parsed as epic-id `EP` and slug `M01-implement-auth`. The correct split point is the *last* hyphen-delimited segment that begins the human-readable slug, which is ambiguous without a delimiter convention. The intended extraction algorithm needs to be more precise.

**Fix:**
```yaml
<action>Parse the segment after the slash by splitting on `-`. The epic-id is
the leading uppercase-prefixed tokens joined until the first all-lowercase token.
Example: `EP-M01-implement-auth` → epic-id `EP-M01`, slug `implement-auth`.
If parsing fails, set epic-id to the full post-slash segment and log a warning.</action>
```

---

### WR-06: `acps-code-map` step 2 does not distinguish files from directories at the listing stage

**File:** `skills/acps-code-map/workflow.md:32-44`
**Issue:** Step 2 lists "all top-level entries (files and directories)" and then adds entries that are "a directory OR a recognized source file directory". The wording is contradictory — it first implies both files and directories are listed, then filters to directories only. Loose top-level source files (e.g., a root-level `index.js` or `Makefile`) are silently ignored and will not appear in any module analysis output, creating gaps in the MANIFEST.

**Fix:** Clarify the intent explicitly:
```yaml
<action>List all top-level directory entries only (ignore top-level files).
Separately, check if any top-level source files exist (e.g., `index.js`,
`main.go`, `Makefile`). If so, create a synthetic module entry:
`{ dir_name: "(root)", path: "." }` and add it to the modules list.</action>
```

---

### WR-07: `acps-code-map` does not handle sub-agent failure or partial results

**File:** `skills/acps-code-map/workflow.md:56-79`
**Issue:** Step 4 spawns sub-agents and step 5 proceeds to write files using the collected results. There is no instruction for what happens if one or more sub-agents return an error, time out, or return incomplete/malformed analysis. Step 5 would silently skip failed modules or write empty files, and MANIFEST.md would have missing rows with no user notification.

**Fix:**
```yaml
<action>After collecting sub-agent results, check each result for the required
7 sections. For any module whose result is missing required sections or indicates
an error, log: "Warning: module `{dir_name}` analysis incomplete — {reason}.
Skipping file write for this module." List skipped modules in the completion
summary (step 7).</action>
```

---

### WR-08: `acps-scope-manager` step 6 CR table output uses a placeholder comment inside the table row

**File:** `skills/acps-scope-manager/workflow.md:81`
**Issue:** The output template for the CR history table (step 6) writes a literal row with an inline comment: `| (display all rows from cr_rows exactly as stored in change-log.md) | | | | | |`. This is a template instruction embedded as if it were a table row. If an agent renders this literally — which is possible given the `<output>` block semantics in these skill files — the user will see a malformed table with empty trailing columns and confusing bracketed text as the first cell.

**Fix:** Rewrite the output block to use a proper instruction/output split:
```xml
<action>Format and emit the CR table header, then emit each row from cr_rows
exactly as stored, one per line.</action>
<output>
| CR ID | Date | Description | BCP Delta | FP Delta | Balance |
|-------|------|-------------|-----------|----------|---------|
</output>
<action>For each row in cr_rows: emit `| {cr_id} | {date} | {description} | {bcp_delta} | {fp_delta} | {balance} |`</action>
```

---

## Info

### IN-01: `acps-change-request` step 7 uses `abs()` function without specifying implementation

**File:** `skills/acps-change-request/workflow.md:98`
**Issue:** The overrun warning references `{abs(new_bcp_balance)}` inline in an `<output>` block. `abs()` is not a defined operation within the workflow DSL — only `acps-scope-manager` has the same pattern. Agents may interpret this correctly, but the DSL should use a consistent `<action>` to compute the absolute value and bind it to a named variable before referencing it in the output block.

**Fix:**
```xml
<action>Compute `overrun_gap = abs(new_bcp_balance)` (negate if negative)</action>
<output>Gap: {overrun_gap} BCP.</output>
```

---

### IN-02: `acps-document-project` completion message says "Re-run to regenerate all docs" but resume logic exists

**File:** `skills/acps-document-project/workflow.md:143`
**Issue:** Step 9's completion output says: "Re-run `acps-document-project` at any time to regenerate all docs." This is misleading because the state file is deleted on completion (same step), so a re-run will indeed regenerate all 4 docs. But it implies the skill has no incremental/resume capability, when in fact the entire step 2 resume mechanism exists for mid-run restarts. The message does not mention that the resume feature only applies to interrupted runs.

**Fix:**
```markdown
State file deleted. To regenerate all docs, re-run `acps-document-project`.
(Interrupted runs resume automatically from the last completed doc.)
```

---

### IN-03: `acps-code-map` MANIFEST.md template row format uses inconsistent placeholder style

**File:** `skills/acps-code-map/workflow.md:127`
**Issue:** The MANIFEST.md table row template mixes two placeholder styles in one line: bare braces `{dir_name}` and a prose instruction `{top 1-3 export names}`. Other output templates in the same file use only `{variable}` substitution. The prose instruction inside braces is an action, not a substitutable variable, making this line ambiguous to parse.

**Fix:**
```markdown
{one row per module: | {dir_name} | codebase/{slug}.md | {responsibility_1_sentence} | {export_1}, {export_2}, {export_3} |}
```
Or better, split into an `<action>` that loops and emits rows rather than embedding the loop instruction in an `<output>` block.

---

### IN-04: `acps-scan` context block says "reads 6 files" but the workflow reads fewer in some branches

**File:** `skills/acps-scan/workflow.md:8`
**Issue:** The context block states "It reads 6 files + git log directly." Counting the actually-read files across all steps: `package.json` (step 2), `README.md` (step 2), `backlog.md` (step 4), `notes.md` (step 6), and `.acps-config.json` (step 1) = 5 named files. The 6th file is `pyproject.toml` or another manifest alternative, which is only read when `package.json` is absent. The statement "6 files" is only accurate on the non-Node happy path with all optional files present.

**Fix:**
```markdown
It reads up to 6 files + git log (package.json or equivalent manifest, README.md,
.acps-config.json, backlog.md, notes.md, and one alternative manifest if needed) —
no dependency on `acps-document-project` having run first (D-10).
```

---

_Reviewed: 2026-04-20T21:34:53Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
