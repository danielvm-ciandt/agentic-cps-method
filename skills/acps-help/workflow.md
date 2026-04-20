# acps-help Workflow

**CPS Reference:** CPS — Methodology Orientation and Onboarding

## Context

`acps-help` is the onboarding and orientation skill. It outputs a complete map of all acps skills
grouped by phase with 1-line descriptions, then recommends the next skill based on detected project
state. Use it any time to reorient yourself in the methodology.

---

<workflow>

<step n="1" goal="Load project state">
  <action>Read `.acps-config.json` in the project root.</action>
  <check if=".acps-config.json is missing">
    <action>Set project_state to "not initialized". Skip remaining state checks in this step.</action>
  </check>
  <check if=".acps-config.json exists">
    <action>Extract `planningDir` from the config (default `.planning` if not set).</action>
    <action>Check if `{planningDir}/backlog.md` exists. If yes: set setup_complete = true.</action>
    <action>Check if `{planningDir}/continue-here.md` exists. If yes: set paused_session = true.</action>
    <action>Run `git branch --show-current` to get the current branch name. Store as current_branch.</action>
  </check>
</step>

<step n="2" goal="Display full skill map">
  <output>**acps — Skill Map**

## Setup Phase (run once per project)

- `acps-init`             — Initialize project: create .planning/ structure and .acps-config.json
- `acps-vision`           — Write project vision following CPS Ch.4 discipline
- `acps-backlog`          — Define epics and iterations, write backlog.md
- `acps-architecture`     — Capture architecture package following CPS Ch.14
- `acps-project-roadmap`  — BCP/FP estimation on all epics, write roadmap.md

## Loop Phase (repeat per story)

- `acps-branch`           — Create semantic branch: iter-{N}/{epic-id}-{slug}
- `acps-discuss`          — Extract CPS implementation decisions for the story
- `acps-spec`             — Write acceptance criteria; enforce ambiguity gate ≤ 0.20
- `acps-plan`             — Task breakdown with BCP estimates
- `acps-execute`          — Implement story tasks; record session telemetry
- `acps-homologate`       — Interactive UAT: walk ACs, capture pass/fail, write totals

## Delivery

- `acps-deliverable`      — Generate client deliverable from template; human reviews before sending
- `acps-gate`             — List gate blockers; approve to lock BCP baseline in change-log.md
- `acps-status`           — Show current phase, iteration, epic, and scope balance
- `acps-report`           — Generate daily/weekly/monthly/quarterly report from template

## Management

- `acps-new-epic`         — Create epic in lean-spec format from templates/specs/epic.md
- `acps-new-story`        — Create story under an epic with stage and BCP set
- `acps-new-bug`          — Register bug before fixing; link to epic; assign BCP credit
- `acps-bug-fix`          — Bug fix workflow: branch (bug/{id}-{slug}) → fix → verify → close
- `acps-new-iteration`    — Open new iteration: branch + assign pending epics
- `acps-pr`               — Create PR with conventional commit title; filter .planning/ commits
- `acps-pause`            — Save work state to continue-here.md for cross-session handoff
- `acps-resume`           — Restore work state from continue-here.md; staleness check
- `acps-note`             — Zero-friction timestamped capture → notes.md
- `acps-help`             — This skill: methodology overview + next recommended skill
  </output>
</step>

<step n="3" goal="Determine next recommended skill">
  <action>Based on project state detected in Step 1, determine the recommendation:

- If project_state is "not initialized" (no .acps-config.json):
  → recommend = "acps-init"
  → reason = "Your project has not been initialized yet."

- If .acps-config.json exists but setup_complete is false (no backlog.md):
  → recommend = "acps-vision then acps-backlog"
  → reason = "Setup phase is incomplete: vision and backlog not yet created."

- If paused_session is true (continue-here.md exists):
  → recommend = "acps-resume"
  → reason = "You have a paused session. Resume where you left off."

- If current_branch matches pattern `iter-{N}/{epic-id}-{slug}` (story branch):
  → Check git log for commits on this branch.
  → If no commits yet on branch: recommend = "acps-discuss", reason = "You are on a story branch with no work started yet."
  → If commits exist: recommend = "acps-execute or acps-homologate depending on story status", reason = "Story work is in progress."

- If current_branch is main, master, or iter-{N} (iteration base branch) with setup_complete = true:
  → recommend = "acps-branch"
  → reason = "Setup is complete. Start your next story with a semantic branch."
  </action>
</step>

<step n="4" goal="Output recommendation">
  <output>**Recommended next step:**

{recommend} — {reason}

Run it by typing its name in your AI IDE (e.g., "acps-discuss" or "@acps-discuss").
  </output>
</step>

</workflow>
