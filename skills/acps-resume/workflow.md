# acps-resume Workflow

**CPS Reference:** CPS GSD Loop — Cross-Session Continuity

## Context

`acps-resume` restores the work session state saved by `acps-pause`. It reads `continue-here.md`,
runs a staleness check by comparing the story's current `status` against the saved `loop_phase`,
verifies the git branch, and displays the full restoration block with open tasks. The user can
discard the pause state if the story has advanced or if cleanup is desired.

---

<workflow>

<step n="1" goal="Load config and read continue-here.md">
  <action>Look for `.acps-config.json` in the project root</action>
  <check if=".acps-config.json exists">
    <action>Read `.acps-config.json` and extract `planningDir` value</action>
  </check>
  <check if=".acps-config.json is missing">
    <action>Set planningDir to `.planning` (silent default)</action>
  </check>
  <check if="`{planningDir}/continue-here.md` does not exist">
    <output>No pause state found. Run `acps-pause` during an active session to save state.</output>
    <action>HALT</action>
  </check>
  <action>Read `{planningDir}/continue-here.md` and extract YAML front-matter fields: `story`, `loop_phase`, `branch`, `paused_at`</action>
  <action>Extract the `## Open Tasks` section content from continue-here.md</action>
</step>

<step n="2" goal="Staleness check — compare story status vs loop_phase (D-14)">
  <check if="story file at the `story` path does not exist">
    <output>Story file not found at {story}. The file may have moved or been deleted.</output>
    <action>Ask: "Discard the pause state? (yes / no)"</action>
    <check if="user answers yes">
      <action>Delete `{planningDir}/continue-here.md`</action>
      <output>Pause state discarded.</output>
      <action>HALT</action>
    </check>
    <check if="user answers no">
      <action>HALT</action>
    </check>
  </check>
  <action>Read the story file and extract the YAML front-matter `status` field</action>
  <action>Compare `status` against `loop_phase` using the CPS loop phase order: discuss → spec → plan → execute → homologate</action>
  <check if="status is more advanced than loop_phase (e.g., story is `homologated` but paused at `execute`)">
    <output>Story status has changed since pause: {loop_phase} → {status}. Resume anyway or discard?</output>
    <action>Ask: "Type 'resume' to continue or 'discard' to delete the pause state."</action>
    <check if="user types `discard`">
      <action>Delete `{planningDir}/continue-here.md`</action>
      <output>Pause state discarded.</output>
      <action>HALT</action>
    </check>
  </check>
</step>

<step n="3" goal="Verify git branch">
  <action>Run `git branch --show-current` to get the current branch name</action>
  <check if="current branch does not match `branch` from continue-here.md">
    <output>Current branch ({current}) does not match paused branch ({saved_branch}). Switch with: `git checkout {saved_branch}`</output>
    <action>Ask: "Continue on current branch? (yes / no)"</action>
    <check if="user answers no">
      <action>HALT</action>
    </check>
  </check>
</step>

<step n="4" goal="Restore and display context">
  <output>
**acps-resume — State Restored**

Story:       {story}
Loop phase:  {loop_phase}
Branch:      {branch}
Paused at:   {paused_at}

## Open Tasks

{open tasks list from continue-here.md}

Pick up where you left off. Run `acps-{loop_phase}` to continue.
  </output>
</step>

<step n="5" goal="Offer cleanup">
  <action>Ask: "Delete continue-here.md now that you have resumed? (yes / no)"</action>
  <check if="user answers yes">
    <action>Delete `{planningDir}/continue-here.md`</action>
    <output>continue-here.md removed.</output>
  </check>
</step>

</workflow>
