# acps-execute Workflow

**CPS Reference:** CPS GSD Loop — Execute Phase

## Context

`acps-execute` drives implementation of the current story task by task, following the `## Plan`
section. When execution completes, it records the session as a telemetry entry in the story's YAML
front-matter `sessions[]` array. This data is later aggregated by `acps-homologate` to compute the
`totals` block.

---

<workflow>

<step n="1" goal="Load story and verify plan gate passed">
  <action>Look for `.acps-config.json` in the project root</action>
  <check if=".acps-config.json exists">
    <action>Read `.acps-config.json` and extract `planningDir` value</action>
  </check>
  <check if=".acps-config.json is missing">
    <action>Set planningDir to `.planning` (silent default)</action>
  </check>
  <action>Ask: "Which story are we executing? Provide the path to the story file."</action>
  <check if="story file does not exist">
    <output>Story file not found. Check the path and try again.</output>
    <action>HALT</action>
  </check>
  <action>Read the story file. Extract: title, YAML front-matter (sessions[]), Plan section tasks, Test section ACs</action>
  <check if="## Plan section is missing or contains no tasks">
    <output>No implementation plan found in {story_file}.

Run `acps-plan` first to break the story into tasks before executing.</output>
    <action>HALT</action>
  </check>
  <action>Record session_start = current ISO 8601 timestamp</action>
</step>

<step n="2" goal="Execute tasks from Plan section">
  <output>**Execute Phase — {story title}**

Working through {task_count} tasks from the Plan section.
  </output>
  <action>For each unchecked task (`- [ ]`) in the ## Plan section (in order):
    - Display: "Task {N}/{total}: {task description}"
    - Implement the task: write code, create files, run commands as needed to satisfy the task
    - Mark the task done by updating `- [ ]` to `- [x]` in the story file
    - Display: "Task {N} complete."
    - Ask: "Continue to next task? (yes / describe blockers)"
    - Check if user describes blockers:
      - If blocked: record blocker, ask if user wants to skip this task or halt execution
      - If skipped: leave task unchecked with a note, continue
      - If halt requested: proceed to Step 3 (record partial session)
  </action>
</step>

<step n="3" goal="Record session end time and collect telemetry">
  <action>Record session_end = current ISO 8601 timestamp</action>
  <action>Calculate duration_ms = (session_end - session_start) in milliseconds</action>
  <action>Ask: "What model was used for this session? (e.g., claude-opus-4, claude-sonnet-4)"</action>
  <action>Ask: "Input tokens for this session? (check your IDE usage panel — enter 0 if unknown)"</action>
  <action>Ask: "Output tokens for this session? (enter 0 if unknown)"</action>
  <action>Calculate tokens_total = input_tokens + output_tokens</action>
</step>

<step n="4" goal="Append session to story YAML front-matter">
  <action>Read the story file's current YAML front-matter (the block between the opening `---` and closing `---`)</action>
  <action>Append a new entry to the `sessions:` array:

```yaml
- command: acps-execute
  started_at: "{session_start}"
  finished_at: "{session_end}"
  duration_ms: {duration_ms}
  tokens:
    input: {input_tokens}
    output: {output_tokens}
    total: {tokens_total}
  model: "{model}"
```
  </action>
  <action>Write the updated story file with the new session appended to the sessions[] array in the YAML front-matter</action>
</step>

<step n="5" goal="Report completion">
  <action>Count the number of checked tasks (`- [x]`) vs total tasks in ## Plan</action>
  <output>
**acps-execute complete.**

Tasks completed: {completed_count}/{total_count}
Session duration: {duration_ms}ms
Session appended to: {story_file_path}

{if completed_count < total_count:}
Warning: {total_count - completed_count} tasks remain incomplete. Review before homologation.
{end if}

**Next step:** Run `acps-homologate` to walk all acceptance criteria with the user.
  </output>
</step>

</workflow>
