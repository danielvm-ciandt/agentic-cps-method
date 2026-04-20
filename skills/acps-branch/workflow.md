# acps-branch Workflow

**CPS Reference:** CPS GSD Loop — Branch First

## Context

`acps-branch` enforces the GSD discipline that all work starts with a semantic branch. No story
implementation, discussion, or spec work begins until a properly named branch exists. This creates
a clean audit trail and enables safe parallel work across stories.

**Branch naming convention:** `iter-{N}/{epic-id}-{story-slug}`
Examples: `iter-1/ep-m01-user-auth`, `iter-2/ep-m03-payment-api`

---

<workflow>

<step n="1" goal="Verify git repository">
  <action>Run `git rev-parse --is-inside-work-tree` to check if the current directory is inside a git repo</action>
  <check if="command fails (not a git repo)">
    <output>Not inside a git repository.

Initialize git first: `git init && git add . && git commit -m "chore: initial commit"`
Then re-run `acps-branch`.</output>
    <action>HALT</action>
  </check>
</step>

<step n="2" goal="Check working directory state">
  <action>Run `git status --porcelain` to check for uncommitted changes</action>
  <check if="output is non-empty (uncommitted changes exist)">
    <output>Warning: you have uncommitted changes in your working directory.

It is recommended to commit or stash changes before branching.
Type "continue" to branch anyway, or "cancel" to stash/commit first.</output>
    <check if="user types 'cancel'">
      <action>HALT — user will commit/stash changes first</action>
    </check>
  </check>
</step>

<step n="3" goal="Collect branch components">
  <output>**Branch Creation — GSD Discipline**

Branch naming convention: `iter-{N}/{epic-id}-{story-slug}`
Example: `iter-1/ep-m01-user-authentication`
  </output>
  <action>Ask: "Iteration number? (e.g., 1, 2, 3)"</action>
  <action>Ask: "Epic ID? (e.g., ep-m01, ep-m02 — use the ID from your backlog)"</action>
  <action>Ask: "Story slug? (short kebab-case description, e.g., user-auth, payment-api)"</action>
  <action>Compose branch_name = `iter-{iteration}/{epic-id}-{story-slug}`</action>
  <action>Normalize branch_name: lowercase, replace spaces with hyphens, remove special characters except hyphens and forward slashes</action>
</step>

<step n="4" goal="Validate and create branch">
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

<step n="5" goal="Report completion">
  <output>
**acps-branch complete.**

Branch created: `{branch_name}`
You are now on branch: `{branch_name}`

**Next steps (in order):**

1. Run `acps-discuss` — refine the story context and capture implementation decisions
2. Run `acps-spec` — write acceptance criteria (ambiguity gate ≤ 0.20)
3. Run `acps-plan` — break the story into tasks with BCP estimates
4. Run `acps-execute` — implement
5. Run `acps-homologate` — walk all ACs with the user

  </output>
</step>

</workflow>
