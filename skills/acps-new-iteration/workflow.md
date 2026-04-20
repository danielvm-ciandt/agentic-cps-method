# acps-new-iteration Workflow

**CPS Reference:** CPS Ch.10 — Backlog and Iteration Management

## Context

`acps-new-iteration` opens a new delivery iteration: it creates the iteration base branch and
assigns pending epics from the backlog to the new iteration. Run this at the start of each
new delivery cycle before branching into individual stories.

---

<workflow>

<step n="1" goal="Load config and read backlog">
  <action>Read `.acps-config.json` in the project root to get `planningDir`. If the file does not exist, fall back to `.planning`.</action>
  <action>Read `{planningDir}/backlog.md` to identify the current highest iteration number and the list of pending epics.</action>
  <check if="backlog.md does not exist">
    <output>No backlog found at `{planningDir}/backlog.md`.

Run `acps-backlog` first to define your epics and iterations.</output>
    <action>HALT</action>
  </check>
  <action>Parse backlog.md to determine: highest existing iteration number (e.g., iter-2 → N=2), and all epics with status `pending` or `in-progress` that are not yet assigned to an iteration.</action>
</step>

<step n="2" goal="Collect iteration details">
  <output>**acps-new-iteration — Open New Iteration**

Current highest iteration: iter-{N}
  </output>
  <action>Ask: "New iteration number? (default: {N+1})"</action>
  <action>Ask: "Iteration goal? (1–2 sentence description of what this iteration delivers)"</action>
  <action>Ask: "Which pending epics to assign to this iteration? (list epic IDs from backlog, comma-separated — e.g., ep-m03, ep-m04)"</action>
  <action>Parse the comma-separated epic IDs into a list. Look up each epic's title and BCP from backlog.md.</action>
</step>

<step n="3" goal="Create iteration branch">
  <action>Compose `branch_name = iter-{N+1}` (using the iteration number from Step 2).</action>
  <output>Branch to create: `{branch_name}`</output>
  <action>Ask: "Confirm? (Enter to confirm, or type a correction)"</action>
  <check if="user provides a correction">
    <action>Update branch_name to the corrected value and re-display.</action>
    <action>Ask for final confirmation again.</action>
  </check>
  <action>Run `git checkout -b {branch_name}`</action>
  <check if="git command fails">
    <output>Branch creation failed. Error: {git error output}

Common causes:

- Branch `{branch_name}` already exists → use `git checkout {branch_name}` instead
- Invalid branch name → check for invalid characters

</output>
    <action>HALT — display the git error for the user to resolve</action>
  </check>
</step>

<step n="4" goal="Update backlog.md">
  <action>Append a new iteration section to `{planningDir}/backlog.md`:

```markdown
## Iteration {N} — {iteration_goal}

**Status:** active
**Epics:** {epic_id_1}, {epic_id_2}

| Epic ID | Title | BCP | Status |
|---------|-------|-----|--------|
| {epic_id} | {epic title from backlog} | {bcp} | pending |
```

Replace `{N}`, `{iteration_goal}`, and each epic row with the values collected in Step 2.
For each epic ID the user listed, look up the title and BCP from the existing backlog.md content and fill in the row.</action>
</step>

<step n="5" goal="Report completion">
  <output>**acps-new-iteration complete.**

Iteration: iter-{N}
Branch: {branch_name}
Goal: {iteration_goal}
Assigned epics: {comma-separated epic IDs}

Backlog updated: {planningDir}/backlog.md

Next step: Run `acps-branch` for each story you start within this iteration.
  </output>
</step>

</workflow>
