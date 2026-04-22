# acps-deliverable Workflow

**CPS Reference:** CPS Delivery Management — Deliverable Generation

## Context

`acps-deliverable` generates a CPS-compliant client deliverable by selecting the appropriate
template from `templates/deliverables/`, filling it with current project data from planning
artifacts, and presenting the draft for human review before marking it as client-ready. The
human review gate (Step 4) prevents accidental transmission per DELIV-01.

---

<workflow>

<step n="1" goal="Load config and select deliverable type">
  <action>Look for `.acps-config.json` in the project root</action>
  <check if=".acps-config.json exists">
    <action>Read `.acps-config.json` and extract `planningDir` value</action>
  </check>
  <check if=".acps-config.json is missing">
    <action>Set planningDir to `.planning` (silent default)</action>
  </check>
  <output>**acps-deliverable — Select Deliverable Type**

Which deliverable are you generating?

1. Setup Deliverable — end of setup phase
2. Iteration Report  — end of iteration
3. Value Activation Deliverable — value activation phase
4. Roadmap Document — delivery roadmap

  </output>
  <action>Wait for user selection (1–4)</action>
  <action>Map selection to template path:
    - 1 → `templates/deliverables/setup-deliverable.md`
    - 2 → `templates/deliverables/iteration-report.md`
    - 3 → `templates/deliverables/value-activation-deliverable.md`
    - 4 → `templates/deliverables/roadmap.md`
  Set deliverable_type to one of: setup-deliverable, iteration-report, value-activation-deliverable, roadmap</action>
  <check if="selection is not 1–4">
    <output>Invalid selection. Enter 1, 2, 3, or 4.</output>
    <action>Repeat prompt</action>
  </check>
</step>

<step n="2" goal="Gather data from planning artifacts">
  <action>Read `{planningDir}/backlog.md` to extract: iteration status, completed epics list, completed stories count</action>
  <check if="backlog.md is missing">
    <output>Warning: {planningDir}/backlog.md not found. Skipping backlog data — you will need to provide this information manually.</output>
  </check>
  <action>Read `{planningDir}/change-log.md` to extract: BCP baseline, FP balance, approved scope changes</action>
  <check if="change-log.md is missing">
    <output>Warning: {planningDir}/change-log.md not found. Scope balance section will be left blank.</output>
  </check>
  <check if="deliverable_type is roadmap">
    <action>Read `{planningDir}/roadmap.md` to extract: delivery timeline, phase dates, milestone targets</action>
  </check>
  <action>Ask: "What is the primary value delivered this phase/iteration? (Describe in 1–2 sentences)"</action>
  <check if="deliverable_type is iteration-report">
    <action>Ask: "Which iteration number is this report for? (e.g., 1, 2, 3)"</action>
  </check>
  <check if="deliverable_type is setup-deliverable">
    <action>Ask: "What is the project name?"</action>
  </check>
  <action>Record current ISO date as document_date (format: YYYY-MM-DD)</action>
</step>

<step n="3" goal="Fill template and generate draft">
  <action>Read the selected template file from `templates/deliverables/{template_file}`</action>
  <action>Fill each section of the template:
    - Replace `{project_name}` with project name from .acps-config.json or user input
    - Replace `{date}` with document_date
    - Replace `{N}` (iteration number) with iteration number if applicable
    - Populate the Overview section with the primary value delivered (from user input) and iteration/phase summary from backlog.md
    - Populate the Design section with key decisions and technical notes from backlog.md or context
    - Fill scope/BCP/FP data in relevant sections from change-log.md
    - Mark completed checklist items in Plan and Test sections based on backlog.md status
    - Populate Notes section with any open items or deferred decisions
  </action>
  <action>Determine output path: `{planningDir}/deliverables/{deliverable_type}-{document_date}.md`</action>
  <action>Create `{planningDir}/deliverables/` directory if it does not exist</action>
  <action>Write the filled document to the output path</action>
</step>

<step n="4" goal="Present for human review">
  <output>**Draft Deliverable Ready — Review Required**

The deliverable has been written to: {output_path}

---

{display the full generated document as a markdown block}

---

Please review the document above. Type `approved` when ready for client submission, or type
`edit` followed by your corrections to revise.

  </output>
  <action>Wait for user response</action>
  <check if="user types edit (followed by corrections)">
    <action>Apply the specified corrections to the document in {output_path}</action>
    <action>Re-display the updated document and repeat the review prompt</action>
    <action>Continue until user types `approved`</action>
  </check>
</step>

<step n="5" goal="Report completion">
  <output>**acps-deliverable complete.**

Document: {output_path}
Status: Approved for client submission

The document is in {planningDir}/deliverables/ — share with your client.

  </output>
</step>

</workflow>
