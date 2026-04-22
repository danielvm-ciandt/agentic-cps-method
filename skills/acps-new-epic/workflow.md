# acps-new-epic Workflow

**CPS Reference:** CPS Delivery Management — Epic Creation

## Context

`acps-new-epic` guides the AI through collecting epic information from the user and filling
`templates/specs/epic.md` to produce a properly structured epic file in the planning directory.
Epics are the top-level planning artifacts under which stories are organized.

---

<workflow>

<step n="1" goal="Load config and prepare epics directory">
  <action>Look for `.acps-config.json` in the project root</action>
  <check if=".acps-config.json exists">
    <action>Read `.acps-config.json` and extract `planningDir` value</action>
  </check>
  <check if=".acps-config.json is missing">
    <action>Set planningDir to `.planning` (silent default)</action>
  </check>
  <check if="{planningDir}/epics/ directory does not exist">
    <action>Create `{planningDir}/epics/` directory</action>
  </check>
</step>

<step n="2" goal="Collect epic information from user">
  <action>Ask the following questions in sequence, waiting for each answer before proceeding:</action>
  <action>Ask: "Epic ID? (e.g., ep-m01, ep-m02 — use kebab-case)"</action>
  <action>Ask: "Epic title? (short descriptive title)"</action>
  <action>Ask: "Epic overview? (1-3 sentence description of what this epic delivers)"</action>
  <action>Ask: "Requirements to include? (comma-separated list, or press Enter to leave blank)"</action>
  <action>Ask: "Non-goals? (what this epic explicitly does NOT cover, or press Enter to leave blank)"</action>
  <action>Ask: "Acceptance criteria? (list the conditions for completion, one per line)"</action>
  <check if="{planningDir}/epics/{epic_id}.md already exists">
    <output>An epic file already exists at {planningDir}/epics/{epic_id}.md.
Overwrite it? (yes / no)</output>
    <check if="user answers no">
      <action>HALT — do not overwrite the existing epic file</action>
    </check>
  </check>
</step>

<step n="3" goal="Fill template and write epic file">
  <action>Read `templates/specs/epic.md` to obtain the template structure</action>
  <action>Fill each section with the collected information:
    - Replace the `# {epic_title}` heading with `# {epic_id}: {epic_title}`
    - Replace the Overview section placeholder with the epic overview text
    - Replace the Requirements checklist items with the provided requirements, formatted as `- [ ] {requirement}` per item; if none provided, leave the placeholder
    - Replace the Non-goals placeholder with the provided non-goals list, one item per line; if none provided, leave the placeholder
    - Replace the Acceptance Criteria checklist items with the provided ACs, formatted as `- [ ] {ac}` per item
  </action>
  <action>Write the filled file to `{planningDir}/epics/{epic_id}.md`</action>
</step>

<step n="4" goal="Report completion">
  <output>
**acps-new-epic complete.**

Epic created: {planningDir}/epics/{epic_id}.md
Title: {epic_title}

Next steps:

1. Run `acps-new-story` to add stories under this epic
2. Run `acps-backlog` to estimate and sequence all epics

  </output>
</step>

</workflow>
