# acps-plan Workflow

**CPS Reference:** CPS GSD Loop — Plan Phase

## Context

`acps-plan` breaks the current story into concrete implementation tasks and assigns BCP (Business
Complexity Points) estimates. It reads the story's acceptance criteria (from acps-spec) to derive
the tasks needed to satisfy each AC, then writes the task breakdown to the `## Plan` section.

---

<workflow>

<step n="1" goal="Load story and verify spec gate passed">
  <action>Look for `.acps-config.json` in the project root</action>
  <check if=".acps-config.json exists">
    <action>Read `.acps-config.json` and extract `planningDir` value</action>
  </check>
  <check if=".acps-config.json is missing">
    <action>Set planningDir to `.planning` (silent default)</action>
  </check>
  <action>Ask: "Which story are we planning? Provide the path to the story file."</action>
  <check if="story file does not exist">
    <output>Story file not found. Check the path and try again.</output>
    <action>HALT</action>
  </check>
  <action>Read the story file. Extract: title, Overview, Decisions, Test section (ACs)</action>
  <check if="## Test section is missing or empty">
    <output>No acceptance criteria found in {story_file}.

Run `acps-spec` first to write acceptance criteria and pass the ambiguity gate (≤ 0.20) before planning.</output>
    <action>HALT</action>
  </check>
</step>

<step n="2" goal="Derive implementation tasks from ACs">
  <output>**Plan Phase — {story title}**

Analyzing acceptance criteria to derive implementation tasks...
  </output>
  <action>For each AC in the ## Test section:
    - Identify the implementation work needed to satisfy this AC
    - Group related ACs that share implementation tasks
    - Avoid duplicating tasks across ACs
  </action>
  <action>Draft an ordered task list covering:
    - Setup tasks (models, schemas, config changes)
    - Core implementation tasks (business logic, API endpoints, UI components)
    - Integration tasks (wiring components together)
    - Verification tasks (tests, manual verification steps)
  </action>
  <action>Display the draft task list to the user:

```
Draft Tasks:
- [ ] {Task 1}
- [ ] {Task 2}
```

  </action>
  <action>Ask: "Do you want to add, remove, or reorder any tasks?"</action>
  <check if="user makes changes">
    <action>Apply changes and re-display the task list</action>
  </check>
</step>

<step n="3" goal="Assign BCP estimates per task">
  <output>**BCP Estimation**

Assign BCP points to each task. BCP scale:

- 1 BCP: trivial (config change, simple field addition)
- 2 BCP: small (CRUD endpoint, single component)
- 3 BCP: medium (feature with multiple parts, API integration)
- 5 BCP: large (new subsystem, complex logic)
- 8 BCP: very large — consider splitting the task
  </output>
  <action>For each task:
  - Display: "Task: {task description}"
  - Ask: "BCP estimate? (1, 2, 3, 5, or 8)"
  - Record bcp for this task
  </action>
  <action>Calculate story_total_bcp = sum of all task BCP values</action>
  <output>Story BCP total: {story_total_bcp}</output>
  <check if="story_total_bcp > 13">
    <output>Warning: Story BCP total ({story_total_bcp}) is high.
Consider splitting this story into two smaller stories before implementation.
Type "continue" to proceed anyway or "split" to rethink the scope.</output>
    <check if="user types 'split'">
      <output>Good call. Split the story, then run `acps-spec` on each sub-story before planning.</output>
      <action>HALT — user will split the story</action>
    </check>
  </check>
</step>

<step n="4" goal="Write plan to story file">
  <action>Update the `## Plan` section of the story file:

Replace any existing `## Plan` content with:

```markdown
## Plan

<!-- Task breakdown — BCP estimated by acps-plan on {current_date} -->
<!-- Story BCP total: {story_total_bcp} -->
{for each task:}
- [ ] {task description} _(BCP: {bcp})_
{end for}
```

  </action>
  <action>Write the updated story file</action>
</step>

<step n="5" goal="Report completion">
  <output>
**acps-plan complete.**

Plan written to: {story_file_path}
Tasks: {task_count}
Story BCP total: {story_total_bcp}

**Next step:** Run `acps-execute` to implement the story.
  </output>
</step>

</workflow>
