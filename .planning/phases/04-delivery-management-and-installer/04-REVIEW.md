---
phase: 04-delivery-management-and-installer
reviewed: 2026-04-20T00:00:00Z
depth: standard
files_reviewed: 29
files_reviewed_list:
  - bin/install.js
  - skills/acps-gate/SKILL.md
  - skills/acps-gate/workflow.md
  - skills/acps-status/SKILL.md
  - skills/acps-status/workflow.md
  - skills/acps-pause/SKILL.md
  - skills/acps-pause/workflow.md
  - skills/acps-resume/SKILL.md
  - skills/acps-resume/workflow.md
  - skills/acps-new-epic/SKILL.md
  - skills/acps-new-epic/workflow.md
  - skills/acps-new-story/SKILL.md
  - skills/acps-new-story/workflow.md
  - skills/acps-new-bug/SKILL.md
  - skills/acps-new-bug/workflow.md
  - skills/acps-bug-fix/SKILL.md
  - skills/acps-bug-fix/workflow.md
  - skills/acps-pr/SKILL.md
  - skills/acps-pr/workflow.md
  - skills/acps-deliverable/SKILL.md
  - skills/acps-deliverable/workflow.md
  - skills/acps-report/SKILL.md
  - skills/acps-report/workflow.md
  - skills/acps-new-iteration/SKILL.md
  - skills/acps-new-iteration/workflow.md
  - skills/acps-note/SKILL.md
  - skills/acps-note/workflow.md
  - skills/acps-help/SKILL.md
  - skills/acps-help/workflow.md
findings:
  critical: 2
  warning: 8
  info: 4
  total: 14
status: issues_found
---

# Phase 04: Code Review Report

**Reviewed:** 2026-04-20
**Depth:** standard
**Files Reviewed:** 29
**Status:** issues_found

## Summary

Reviewed `bin/install.js` (Node.js 24 ESM installer) and 14 skill pairs (SKILL.md + workflow.md)
covering delivery management, bug handling, iteration management, and supporting utilities.

The installer has two critical issues: uncaught JSON parse on a corrupt config file and missing
input validation on flag values that can silently accept empty strings. Skill workflows have
recurring patterns: three skills construct file paths directly from unvalidated user input (path
traversal), one skill has a wrong template variable that would produce incorrect output, and
several skills write files without an explicit prior read or without overwrite guards.

SKILL.md files for all 14 skills are clean — they follow the correct thin-wrapper pattern.

---

## Critical Issues

### CR-01: Corrupt `.acps-config.json` crashes with unhelpful error

**File:** `bin/install.js:178-180`
**Issue:** `JSON.parse(readFileSync(configPath, 'utf8'))` is called without a try/catch. If the
existing `.acps-config.json` is invalid JSON (truncated write, manual edit error), the installer
crashes with a raw `SyntaxError: Unexpected token` message instead of a helpful diagnostic.
The outer `install().catch()` at line 200 catches it, but the message `"Installation failed:
Unexpected token ..."` gives no indication of which file is malformed or how to fix it.

**Fix:**
```js
const existing = (() => {
  if (!existsSync(configPath)) return {};
  try {
    return JSON.parse(readFileSync(configPath, 'utf8'));
  } catch {
    console.error(`Error: .acps-config.json is invalid JSON. Fix or delete it and re-run.`);
    process.exit(1);
  }
})();
```

---

### CR-02: User-supplied ID strings used as file path segments without validation (3 skills)

**Files:**
- `skills/acps-new-epic/workflow.md:54` — `{planningDir}/epics/{epic_id}.md`
- `skills/acps-new-story/workflow.md:73` — `{planningDir}/specs/{story_id}.md`
- `skills/acps-new-bug/workflow.md:57` — `{planningDir}/bugs/{bug_id}.md`

**Issue:** Each skill accepts a free-form ID from the user (e.g., `"Epic ID? (e.g., ep-m01)"`)
and immediately uses it to construct a file path without validating the format. A value such as
`../../.env` or `../backlog` would cause the AI to write outside the intended subdirectory.
While the threat is low in a local AI-IDE workflow, it is a correctness issue: IDs that
accidentally include slashes or dots produce silently wrong paths rather than an error.

The prompts give examples (kebab-case) but the workflows contain no explicit validation step.

**Fix:** Add a validation check immediately after collecting each ID:

```xml
<check if="{epic_id} contains characters other than lowercase letters, digits, and hyphens">
  <output>Invalid epic ID "{epic_id}". Use lowercase letters, digits, and hyphens only (e.g., ep-m01).</output>
  <action>Re-ask the question</action>
</check>
```

Apply the equivalent check in `acps-new-story` (for `story_id`) and `acps-new-bug` (for
`bug_id`).

---

## Warnings

### WR-01: `--lang=` empty string silently enables non-interactive mode with blank lang

**File:** `bin/install.js:102-107`
**Issue:** When the user passes `--lang=` (with empty value), `flagLang` becomes `""` (empty
string). `nonInteractive` at line 107 checks `flagLang !== null`, and `"" !== null` is `true`,
so non-interactive mode fires with `answers.lang = ""`. The installer completes without error,
writing `"lang": ""` into `.acps-config.json`. The same applies to `--doc-lang=` and
`--estimation=`.

**Fix:** Treat empty-string flag values the same as `null`:
```js
const flagLang = (args.find(a => a.startsWith('--lang='))?.split('=')[1]
  ?? (args.indexOf('--lang') !== -1 ? args[args.indexOf('--lang') + 1] : null))
  || null;   // collapse empty string to null
```
Apply the same `|| null` coercion to `flagDocLang` and `flagEstimation`.

---

### WR-02: `acps-gate` — no overwrite guard on `change-log.md`

**File:** `skills/acps-gate/workflow.md:91-110` (step 4)
**Issue:** Step 4 writes `{planningDir}/change-log.md` unconditionally. If a project manager
runs `acps-gate approve` a second time after scope changes have been logged, the entire
change history is silently overwritten with a new baseline. There is no existence check and no
confirmation prompt before writing.

**Fix:** Add an existence check before the write:
```xml
<check if="`{planningDir}/change-log.md` already exists">
  <output>change-log.md already exists with baseline BCP: {existing_baseline_bcp}.
Overwrite it? This will discard all existing change-request history. (yes / no)</output>
  <check if="user says no">
    <action>HALT</action>
  </check>
</check>
```

---

### WR-03: `acps-new-iteration` — wrong template variable in step 4

**File:** `skills/acps-new-iteration/workflow.md:61-75` (step 4)
**Issue:** The backlog section template uses `## Iteration {N}` but the iteration number
collected in step 2 is the *new* iteration (`N+1`). The step 2 prompt reads:
`"New iteration number? (default: {N+1})"` and the result is stored as the new iteration.
Step 4 then writes `## Iteration {N}` (the old number) instead of `## Iteration {N+1}` (the
newly created one). This would write a duplicate section header if the backlog already contains
`## Iteration {N}`.

**Fix:** Replace `{N}` with the collected new iteration number in the template:
```markdown
## Iteration {new_iteration_number} — {iteration_goal}
```
The variable name should be unambiguous. If the collected value from step 2 is stored as
`new_iter_num`, use `{new_iter_num}` consistently in steps 3 and 4.

---

### WR-04: `acps-new-iteration` — appends to `backlog.md` without reading first in step 4

**File:** `skills/acps-new-iteration/workflow.md:61-75` (step 4)
**Issue:** Step 4 says "Append a new iteration section to `{planningDir}/backlog.md`" but does
not contain an explicit `Read` action before the write. The file was read in step 1, but the
instruction in step 4 provides no explicit reminder to use that earlier content as the basis
for the write. An AI agent executing step 4 in isolation (e.g., after a tool call gap) may
produce a write operation without the full file context, risking truncation or replacement of
existing content.

**Fix:** Add an explicit read reminder at the start of step 4:
```xml
<step n="4" goal="Update backlog.md">
  <action>Re-read `{planningDir}/backlog.md` to get the current file content.</action>
  <action>Append a new iteration section ...</action>
```

---

### WR-05: `acps-bug-fix` — step 5 updates bug file without explicit read before write

**File:** `skills/acps-bug-fix/workflow.md:110-115` (step 5)
**Issue:** Step 5 instructs updating the bug file (adding front-matter fields and appending
a section) but does not include an explicit "Read the bug file" action. The file was read in
step 1, but step 5 is the final step after branch creation, implementation, and AC verification
(steps 2-4). By step 5 the AI may have lost the step 1 file content in context, leading to
a write that overwrites rather than updates.

**Fix:** Add an explicit read at the top of step 5:
```xml
<step n="5" goal="Close bug file">
  <action>Read `{planningDir}/bugs/{bug_id}.md` to get current file content.</action>
  <action>Ask: "One-line summary of the fix? ..." </action>
  ...
```

---

### WR-06: `acps-pause` — no overwrite guard on `continue-here.md`

**File:** `skills/acps-pause/workflow.md:47-68` (step 4)
**Issue:** Step 4 writes `{planningDir}/continue-here.md` unconditionally. If a user
accidentally runs `acps-pause` twice in the same session, the first pause state (with its
story path, branch, and open tasks) is silently overwritten. Unlike `acps-resume`'s delete
prompt, there is no confirmation before clobbering an existing file.

**Fix:** Add a guard before the write:
```xml
<check if="`{planningDir}/continue-here.md` already exists">
  <output>A pause state already exists (saved at {existing_paused_at}).
Overwrite it? (yes / no)</output>
  <check if="user says no">
    <action>HALT</action>
  </check>
</check>
```

---

### WR-07: `acps-resume` — silent HALT with no output when user declines to discard

**File:** `skills/acps-resume/workflow.md:41-43` (step 2)
**Issue:** When the story file is not found and the user answers "no" to discard, the workflow
HALTs with no output message. The user receives no feedback explaining why execution stopped
or what to do next.

```xml
<check if="user answers no">
  <action>HALT</action>   <!-- no output before HALT -->
</check>
```

**Fix:**
```xml
<check if="user answers no">
  <output>Pause state kept. Locate the story file and update the path in
`{planningDir}/continue-here.md`, then run `acps-resume` again.</output>
  <action>HALT</action>
</check>
```

---

### WR-08: `acps-pr` — unescaped PR title/body passed directly to shell command

**File:** `skills/acps-pr/workflow.md:110`
**Issue:** Step 4 runs:
```
gh pr create --title "{pr_title}" --body "{pr_body}"
```
`pr_title` and `pr_body` are free-form user input. If they contain double-quotes, backticks,
or `$()` sequences, the shell interpolation in the `gh` command can break or behave
unexpectedly. This is especially likely in PR bodies that include code blocks or conventional
commit examples.

**Fix:** Recommend using a heredoc or a temp file for the body:
```xml
<action>Write pr_body to a temporary file `/tmp/acps-pr-body.md`</action>
<action>Run: `gh pr create --title "{pr_title}" --body-file /tmp/acps-pr-body.md`</action>
```
The `--body-file` flag avoids shell-quoting issues entirely.

---

## Info

### IN-01: `bin/install.js` — `answers.name` hardcoded to `'my-project'` in non-interactive mode

**File:** `bin/install.js:117`
**Issue:** In non-interactive mode, `answers.name` is always `'my-project'` regardless of the
project context. The `--help` output does not mention a `--name` flag. The `name` field is
written into `.acps-config.json` and surfaced in deliverable templates. A team running
`npx acps@latest --claude --local --estimation=bcp_full --lang=en` gets a config with a
generic project name they must remember to edit.

**Fix:** Add a `--name` flag and fall back to `'my-project'` only if absent:
```js
const flagName = args.find(a => a.startsWith('--name='))?.split('=')[1]
  ?? (args.indexOf('--name') !== -1 ? args[args.indexOf('--name') + 1] : null);
// In nonInteractive answers:
name: flagName || 'my-project',
```

---

### IN-02: `acps-status` — `change-log.md` read twice (steps 2 and 3)

**File:** `skills/acps-status/workflow.md:47-54` and `59-72`
**Issue:** `change-log.md` is read in step 2 to extract `baseline_bcp` and `baseline_fp`, then
read again in step 3 to scan the CR table. A single read at the start of step 2 with both
extractions performed in one pass would be cleaner and avoids issuing two file-read tool calls.

**Fix:** Merge the `change-log.md` reads into a single action in step 2 that extracts both
the YAML front-matter values and the CR table rows in one pass.

---

### IN-03: `acps-deliverable` — no HALT for unrecognised inputs in the review loop (step 4)

**File:** `skills/acps-deliverable/workflow.md:99-106` (step 4)
**Issue:** The review loop handles `approved` and `edit` but does not specify what to do if
the user types anything else. The description says "Continue until user types `approved`" but
the step structure will leave the AI in an ambiguous state if the user types `cancel`, `quit`,
or anything unexpected.

**Fix:** Add an explicit catch-all:
```xml
<check if="user types anything other than `approved` or `edit`">
  <output>Type `approved` to finalize or `edit [corrections]` to revise.</output>
  <action>Repeat the review prompt</action>
</check>
```

---

### IN-04: `acps-help` — skill map references `acps-init`, `acps-vision`, etc. that are not in the reviewed file set

**File:** `skills/acps-help/workflow.md:33-66` (step 2)
**Issue:** The skill map output lists setup phase skills (`acps-init`, `acps-vision`,
`acps-backlog`, `acps-architecture`, `acps-project-roadmap`) and loop phase skills
(`acps-branch`, `acps-discuss`, `acps-spec`, `acps-plan`, `acps-execute`, `acps-homologate`)
that are referenced but not yet present in the `skills/` directory based on the current file
set. If a user types any of those skill names expecting to use them, they will find missing
files. This is a documentation-accuracy gap, not a code bug, but it degrades first-run
experience.

**Fix:** Add a note in the skill map output (or in the SKILL.md description) indicating which
skills are available in the current release version. Alternatively, ensure all referenced
skills exist before shipping this skill.

---

_Reviewed: 2026-04-20_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
