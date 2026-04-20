# acps-pause Workflow

**CPS Reference:** CPS GSD Loop — Cross-Session Continuity

## Context

`acps-pause` saves the current work session state to `continue-here.md` so it can be restored in a
future session using `acps-resume`. It captures the active story file path, loop phase, git branch,
and all unchecked (open) tasks from the story's `## Plan` section.

---

<workflow>

<step n="1" goal="Load config">
  <action>Look for `.acps-config.json` in the project root</action>
  <check if=".acps-config.json exists">
    <action>Read `.acps-config.json` and extract `planningDir` value</action>
  </check>
  <check if=".acps-config.json is missing">
    <action>Set planningDir to `.planning` (silent default)</action>
  </check>
</step>

<step n="2" goal="Collect current story context">
  <action>Ask: "Which story are you pausing on? Provide the path to the story file."</action>
  <check if="story file does not exist">
    <output>Story file not found at the provided path. Check the path and try again.</output>
    <action>HALT</action>
  </check>
  <action>Read the story file. Extract: YAML front-matter fields (story_id, status) and the full `## Plan` section content</action>
  <action>Run `git branch --show-current` to get the current git branch name</action>
  <action>Ask: "Which loop phase are you pausing in? (discuss / spec / plan / execute / homologate)"</action>
</step>

<step n="3" goal="Extract open tasks from Plan section">
  <action>Scan the `## Plan` section of the story for all unchecked tasks (lines matching `- [ ]`)</action>
  <action>Collect each unchecked task as a list item — preserve the full task description text</action>
  <check if="no ## Plan section exists in the story">
    <action>Set open tasks to empty list</action>
  </check>
  <check if="## Plan section exists but all tasks are checked">
    <action>Set open tasks to empty list</action>
  </check>
</step>

<step n="4" goal="Write continue-here.md">
  <action>Write `{planningDir}/continue-here.md` with the following content:

```markdown
---
story: {story_file_path}
loop_phase: {loop_phase}
branch: {branch_name}
paused_at: {ISO 8601 timestamp}
---

## Open Tasks

{for each unchecked task from ## Plan:}
- [ ] {task description}
{end for}
```

If no open tasks exist, write the `## Open Tasks` section with this message instead of task items:
`(no incomplete tasks — all tasks checked off)`
  </action>
</step>

<step n="5" goal="Report completion">
  <output>
**acps-pause complete.**

State saved to: {planningDir}/continue-here.md
Story: {story_file_path}
Loop phase: {loop_phase}
Branch: {branch_name}
Open tasks: {count}

Run `acps-resume` in your next session to restore this state.
  </output>
</step>

</workflow>
