# acps-bug-fix Workflow

**CPS Reference:** CPS GSD Loop — Bug Correction Cycle

## Context

`acps-bug-fix` routes failed homologations into a structured fix cycle. It creates a properly
named bug branch (`bug/{bug-id}-{slug}`), provides bug context for implementation, verifies
acceptance criteria, closes the bug file, and hands off to `acps-pr` for merge.

**Branch naming convention (D-17):** `bug/{bug-id}-{slug}`
Example: `bug/bug-001-token-refresh-null-pointer`

---

<workflow>

<step n="1" goal="Load config and identify bug">
  <action>Look for `.acps-config.json` in the project root</action>
  <check if=".acps-config.json exists">
    <action>Read `.acps-config.json` and extract `planningDir` value</action>
  </check>
  <check if=".acps-config.json is missing">
    <action>Set planningDir to `.planning` (silent default)</action>
  </check>
  <action>Ask: "Which bug are you fixing? Provide the bug ID (e.g., bug-001) or the path to the bug file."</action>
  <action>Resolve the bug file path: if the user provided an ID, construct `{planningDir}/bugs/{bug_id}.md`; if they provided a path, use it directly</action>
  <check if="bug file does not exist">
    <output>Bug file not found: {resolved_path}

Run `acps-new-bug` to register the bug before attempting a fix.</output>
    <action>HALT</action>
  </check>
  <action>Read the bug file. Extract:
    - bug_id from the file name or front-matter
    - bug_title
    - linked epic_id and story_id
    - bug_description
    - steps_to_reproduce
    - expected behavior
    - actual behavior
    - acceptance_criteria (from the bug file or linked story ## Test section)
  </action>
</step>

<step n="2" goal="Create bug branch">
  <action>Compose slug: kebab-case summary of bug_title, max 5 words, lowercase, hyphens only (e.g., "Token refresh returns null" → "token-refresh-returns-null")</action>
  <action>Compose branch_name = `bug/{bug_id}-{slug}`</action>
  <output>Branch to create: `{branch_name}`</output>
  <action>Ask: "Confirm? (Enter to confirm, or type a correction)"</action>
  <check if="user provides a correction">
    <action>Update branch_name to the corrected value and re-display</action>
    <action>Ask for final confirmation again</action>
  </check>
  <action>Run `git checkout -b {branch_name}`</action>
  <check if="git command fails">
    <output>Branch creation failed. Error: {git error output}

Common causes:

- Branch `{branch_name}` already exists → use `git checkout {branch_name}` instead
- Invalid branch name → check for invalid characters</output>
    <action>HALT — display the git error for the user to resolve</action>
  </check>
</step>

<step n="3" goal="Implement the fix">
  <output>**Bug context for fix — {bug_id}: {bug_title}**

Epic: {epic_id}
Story: {story_id}

Description:
{bug_description}

Steps to Reproduce:
{steps_to_reproduce}

Expected: {expected}
Actual: {actual}
  </output>
  <action>Ask: "Ready to implement the fix? (yes — I will work through the fix now)"</action>
  <action>Implement the fix: write code, modify files, run commands as needed to resolve the bug described above</action>
  <action>Ask: "Fix complete? Describe what was changed."</action>
  <action>Record the user's description as fix_summary for use in Step 5</action>
</step>

<step n="4" goal="Verify acceptance criteria">
  <output>**Acceptance Criteria Verification**

Verify each AC in the running system:

{for each acceptance criterion with its number:}
{N}. {AC description}
{end for}
  </output>
  <action>Ask: "All ACs verified? (yes / no — describe failures)"</action>
  <check if="user reports failures">
    <action>Note which ACs failed</action>
    <action>Ask: "Continue to close bug anyway? (yes / fix more first)"</action>
    <check if="user says 'fix more first'">
      <output>Returning control — implement additional fixes and re-run `acps-bug-fix` when ready.</output>
      <action>HALT</action>
    </check>
  </check>
</step>

<step n="5" goal="Close bug file">
  <action>Ask: "One-line summary of the fix? (will be written to the bug file Resolution section)"</action>
  <action>Update `{planningDir}/bugs/{bug_id}.md`:
    - Add or update `status: closed` in the front-matter
    - Add `closed_at: {ISO 8601 timestamp}` to the front-matter
    - Append a `## Resolution` section with the fix_summary from Step 3 and the one-line summary from above
  </action>
  <action>Write the updated bug file</action>
</step>

<step n="6" goal="Report completion and recommend PR">
  <output>**acps-bug-fix complete.**

Bug closed: {planningDir}/bugs/{bug_id}.md
Branch: {branch_name}
Status: closed

Commits on this branch:
(run: git log --oneline {base_branch}..{branch_name})

Next step: Run `acps-pr` to create a PR for this bug fix.
  </output>
</step>

</workflow>
