# acps-new-bug Workflow

**CPS Reference:** CPS Delivery Management — Bug Registration

## Context

`acps-new-bug` guides the AI through registering a bug before the fix begins. It fills
`templates/bugs/bug-report.md`, writes the file to `{planningDir}/bugs/`, links the bug
to the parent epic, and records the BCP credit assigned for the fix work. Always run this
skill before running `acps-bug-fix`.

---

<workflow>

<step n="1" goal="Load config and prepare bugs directory">
  <action>Look for `.acps-config.json` in the project root</action>
  <check if=".acps-config.json exists">
    <action>Read `.acps-config.json` and extract `planningDir` value</action>
  </check>
  <check if=".acps-config.json is missing">
    <action>Set planningDir to `.planning` (silent default)</action>
  </check>
  <check if="{planningDir}/bugs/ directory does not exist">
    <action>Create `{planningDir}/bugs/` directory</action>
  </check>
</step>

<step n="2" goal="Collect bug information from user">
  <action>Ask the following questions in sequence, waiting for each answer before proceeding:</action>
  <action>Ask: "Bug ID? (e.g., bug-001, bug-ep-m01-001 — use kebab-case)"</action>
  <action>Ask: "Bug title? (short descriptive title)"</action>
  <action>Ask: "Which epic does this bug belong to? (e.g., ep-m01)"</action>
  <action>Ask: "Which story triggered this bug? (story ID or 'none' if standalone)"</action>
  <action>Ask: "Bug description? (what went wrong)"</action>
  <action>Ask: "Steps to reproduce? (numbered steps)"</action>
  <action>Ask: "Expected behavior? (what should happen)"</action>
  <action>Ask: "Actual behavior? (what actually happens)"</action>
  <action>Ask: "BCP credit for fixing this bug? (integer — this is the BCP assigned for the fix work)"</action>
  <check if="{planningDir}/bugs/{bug_id}.md already exists">
    <output>A bug file already exists at {planningDir}/bugs/{bug_id}.md.
Overwrite it? (yes / no)</output>
    <check if="user answers no">
      <action>HALT — do not overwrite the existing bug file</action>
    </check>
  </check>
</step>

<step n="3" goal="Fill bug template and write file">
  <action>Read `templates/bugs/bug-report.md` to obtain the template structure</action>
  <action>Fill each section with the collected information:
    - Replace the `# {bug_title}` heading with `# {bug_id}: {bug_title}`
    - Replace the Overview section placeholder with: the bug description, steps to reproduce (as a numbered list), expected behavior, and actual behavior — all clearly labeled within the Overview section
    - Set `bcp_credit: {bcp}` as a note in the Notes section: "BCP credit for fix: {bcp}"
    - Add a link to the related story in the Notes section if a story ID was provided (not 'none'): "Related story: {story_id}"
  </action>
  <action>Write the filled file to `{planningDir}/bugs/{bug_id}.md`</action>
</step>

<step n="4" goal="Link bug to parent epic">
  <check if="{planningDir}/epics/{epic_id}.md exists">
    <action>Read `{planningDir}/epics/{epic_id}.md`</action>
    <check if="the epic file contains a ## Bugs section">
      <action>Append the following line to the ## Bugs section:
`- [{bug_id}]({relative_path_to_bug_file}) — {bug_title}`</action>
    </check>
    <check if="the epic file does not contain a ## Bugs section">
      <action>Append a new `## Bugs` section to the end of the epic file containing the line:
`- [{bug_id}]({relative_path_to_bug_file}) — {bug_title}`</action>
    </check>
    <action>Write the updated epic file</action>
  </check>
  <check if="{planningDir}/epics/{epic_id}.md does not exist">
    <output>Epic file not found at {planningDir}/epics/{epic_id}.md. Bug registered standalone.</output>
  </check>
</step>

<step n="5" goal="Report completion">
  <output>
**acps-new-bug complete.**

Bug registered: {planningDir}/bugs/{bug_id}.md
Linked to epic: {epic_id}
BCP credit: {bcp}

Next step: Run `acps-bug-fix` with this bug ID to begin the fix workflow.
  </output>
</step>

</workflow>
