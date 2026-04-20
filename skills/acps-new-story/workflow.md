# acps-new-story Workflow

**CPS Reference:** CPS Delivery Management — Story Creation

## Context

`acps-new-story` guides the AI through collecting story information from the user and filling
`templates/specs/story.md` to produce a properly structured story file. The YAML front-matter
is set at creation time with `story_id`, `stage`, `bcp`, and empty `sessions: []` and `totals`
blocks for telemetry tracking by `acps-execute` and `acps-homologate`.

---

<workflow>

<step n="1" goal="Load config and prepare specs directory">
  <action>Look for `.acps-config.json` in the project root</action>
  <check if=".acps-config.json exists">
    <action>Read `.acps-config.json` and extract `planningDir` value</action>
  </check>
  <check if=".acps-config.json is missing">
    <action>Set planningDir to `.planning` (silent default)</action>
  </check>
  <check if="{planningDir}/specs/ directory does not exist">
    <action>Create `{planningDir}/specs/` directory</action>
  </check>
</step>

<step n="2" goal="Collect story information from user">
  <action>Ask the following questions in sequence, waiting for each answer before proceeding:</action>
  <action>Ask: "Epic ID this story belongs to? (e.g., ep-m01)"</action>
  <action>Ask: "Story ID? (e.g., ep-m01-us-01 — use {epic-id}-us-{N} convention)"</action>
  <action>Ask: "Story title? (short descriptive title)"</action>
  <action>Ask: "Stage? (backlog / in-progress / done — default: backlog)"</action>
  <action>Ask: "BCP estimate? (integer: number of business complexity points)"</action>
  <action>Ask: "Story description? (1-3 sentence user story — 'As a {user}, I want {action} so that {benefit}')"</action>
  <check if="{planningDir}/specs/{story_id}.md already exists">
    <output>A story file already exists at {planningDir}/specs/{story_id}.md.
Overwrite it? (yes / no)</output>
    <check if="user answers no">
      <action>HALT — do not overwrite the existing story file</action>
    </check>
  </check>
  <check if="stage is empty or not provided">
    <action>Set stage to `backlog`</action>
  </check>
</step>

<step n="3" goal="Fill template and write story file">
  <action>Read `templates/specs/story.md` to obtain the template structure</action>
  <action>Build the YAML front-matter block with the collected values:

```yaml
---
story_id: {story_id}
stage: {stage}
bcp: {bcp}
sessions: []
totals:
  sessions_count: 0
  total_duration_ms: 0
  tokens:
    input: 0
    output: 0
    total: 0
---
```

  </action>
  <action>Replace the template YAML front-matter with the filled block above</action>
  <action>Replace the `# {story_title}` heading with `# {story_id}: {story_title}`</action>
  <action>Replace the Overview section placeholder with the story description provided by the user</action>
  <action>Write the filled file to `{planningDir}/specs/{story_id}.md`</action>
</step>

<step n="4" goal="Report completion">
  <output>
**acps-new-story complete.**

Story created: {planningDir}/specs/{story_id}.md
Epic: {epic_id}
Stage: {stage}
BCP: {bcp}

Next steps:

1. Run `acps-branch` to create the implementation branch
2. Run `acps-discuss` to refine the story before speccing

  </output>
</step>

</workflow>
