# acps-spec Workflow

**CPS Reference:** CPS Chapter 27 — Specification & Ambiguity Gate

## Context

`acps-spec` writes acceptance criteria (ACs) for the current story and enforces the CPS Chapter 27
ambiguity gate. Before a story can proceed to planning and implementation, its ACs must score
≤ 0.20 on the ambiguity scale. This prevents vague requirements from reaching the implementation
phase.

**Ambiguity scoring factors (0.0–1.0 scale):**

- Vague ACs (e.g., "should work well", "handles errors") — each adds 0.05–0.15
- Undefined terms (domain terms without definition) — each adds 0.05–0.10
- Unclear scope boundaries (what's in/out not stated) — adds 0.05–0.15
- Missing edge cases (error paths, empty states, limits) — each adds 0.03–0.08

**Gate:** Score must be ≤ 0.20 to advance. Override available with explicit user confirmation.

---

<workflow>

<step n="1" goal="Load story context">
  <action>Look for `.acps-config.json` in the project root</action>
  <check if=".acps-config.json exists">
    <action>Read `.acps-config.json` and extract `planningDir` value</action>
  </check>
  <check if=".acps-config.json is missing">
    <action>Set planningDir to `.planning` (silent default)</action>
  </check>
  <action>Ask: "Which story are we speccing? Provide the path to the story file (e.g., {planningDir}/specs/ep-m01-user-auth.md)"</action>
  <check if="story file does not exist at the provided path">
    <output>Story file not found: {provided_path}

Check the path and try again. Story files are in `{planningDir}/specs/`.</output>
    <action>HALT</action>
  </check>
  <action>Read the story file. Extract: title, Overview, Decisions section (from acps-discuss), existing Test section if any</action>
</step>

<step n="2" goal="Draft acceptance criteria">
  <output>**Spec Phase — {story title}**

Based on the story context and decisions, I'll draft acceptance criteria. Each AC must be:

- Specific (testable by a human or automated test)
- Bounded (clear pass/fail condition)
- Complete (covers the happy path + key edge cases)
  </output>
  <action>Analyze story content and draft 3-8 acceptance criteria covering:
    - The primary happy-path behavior
    - Key error or failure conditions
    - Boundary cases (limits, empty states, invalid input)
    - Any behavior explicitly stated in the Decisions section
  </action>
  <action>Display the drafted ACs to the user in checkbox format:

```
Draft Acceptance Criteria:
- [ ] {AC 1}
- [ ] {AC 2}
```
  </action>
  <action>Ask: "Do you want to add, remove, or reword any ACs before scoring?"</action>
  <check if="user makes changes">
    <action>Apply the requested changes to the AC list</action>
    <action>Display updated ACs and ask for final confirmation to proceed to scoring</action>
  </check>
</step>

<step n="3" goal="Score ambiguity (CPS Chapter 27 gate)">
  <action>Score the current AC list on the 0.0–1.0 ambiguity scale:
    - For each AC: identify if it is vague (subjective language, no measurable outcome)
    - For each AC: identify any undefined terms
    - Assess whether scope boundaries are clear
    - Identify missing edge cases that should be covered
  </action>
  <action>Calculate total ambiguity score (sum of penalty weights, capped at 1.0)</action>
  <action>Collect the specific issues that contributed to the score</action>
  <check if="score ≤ 0.20">
    <output>Ambiguity score: {score} — PASS (≤ 0.20 threshold)</output>
    <action>Proceed to Step 5 (write to story file)</action>
  </check>
  <check if="score > 0.20">
    <output>Ambiguity score: {score} > 0.20 threshold

Issues raising the score:
{for each issue:}
- {specific issue description}
{end for}

Options:

1. Continue refining (recommended) — I'll suggest improvements for each issue
2. Override the gate — accept current ACs as-is (not recommended)

Type "refine" or "override":</output>
    <check if="user types 'override'">
      <output>Gate overridden by user. Proceeding with current ACs (score: {score}).</output>
      <action>Proceed to Step 5 (write to story file)</action>
    </check>
    <check if="user types 'refine' or any other input">
      <action>Proceed to Step 4 (refinement loop)</action>
    </check>
  </check>
</step>

<step n="4" goal="Refinement loop — resolve ambiguity">
  <action>For each identified issue from Step 3:
    - Display the issue: "Issue: {description}"
    - Suggest a specific rewrite: "Suggestion: {reworded AC or new AC}"
    - Ask: "Apply this suggestion, write your own fix, or skip?"
  </action>
  <action>Apply all accepted changes to the AC list</action>
  <action>Display updated AC list</action>
  <action>Return to Step 3 (re-score the updated ACs)</action>
</step>

<step n="5" goal="Write ACs to story file">
  <action>Update the `## Test` section of the story file with the finalized ACs:

Replace any existing `## Test` content with:

```markdown
## Test

<!-- Acceptance criteria — scored {score} by acps-spec on {current_date} -->
{for each AC:}
- [ ] {AC}
{end for}
```
  </action>
  <action>Write the updated story file</action>
</step>

<step n="6" goal="Report completion">
  <output>
**acps-spec complete.**

Acceptance criteria written to: {story_file_path}
Final ambiguity score: {score}
ACs written: {count}

**Next step:** Run `acps-plan` to break the story into tasks with BCP estimates.
  </output>
</step>

</workflow>
