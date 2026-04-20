# acps-vision Workflow

**CPS Reference:** CPS Chapter 4 — Vision

## Context

`acps-vision` facilitates a structured vision workshop following CPS Chapter 4 discipline. It guides the user through the key questions that define the project's purpose, target audience, and success criteria, then writes a clean `vision.md` document.

---

<workflow>

<step n="1" goal="Load project configuration">
  <action>Look for `.acps-config.json` in the project root</action>
  <check if=".acps-config.json exists">
    <action>Read `.acps-config.json` and extract `planningDir` value</action>
  </check>
  <check if=".acps-config.json is missing">
    <action>Set planningDir to `.planning` (silent default per D-06)</action>
  </check>
</step>

<step n="2" goal="Check for existing vision">
  <action>Check if `{planningDir}/vision.md` already exists</action>
  <check if="vision.md exists">
    <output>A vision.md already exists at `{planningDir}/vision.md`.
Continuing will overwrite it. Type "overwrite" to proceed or "cancel" to stop.</output>
    <check if="user types 'cancel'">
      <action>HALT — existing vision preserved</action>
    </check>
  </check>
</step>

<step n="3" goal="Run CPS Chapter 4 vision interview">
  <output>**Vision Workshop — CPS Chapter 4**

I'll guide you through the key questions that define your project vision. Answer each question — the more specific, the better.
  </output>
  <action>Ask: "1. What is the project name?"</action>
  <action>Ask: "2. What problem does this project solve? (1-3 sentences)"</action>
  <action>Ask: "3. Who are the primary target users or customers?"</action>
  <action>Ask: "4. What is the core value proposition — why will users choose this over alternatives?"</action>
  <action>Ask: "5. What makes this different from existing solutions?"</action>
  <action>Ask: "6. How will you measure success? (2-3 specific, measurable metrics)"</action>
  <action>Ask: "7. What is explicitly out of scope for v1?"</action>
  <action>Record all answers as: project_name, problem_statement, target_users, value_proposition, differentiation, success_metrics, non_goals</action>
</step>

<step n="4" goal="Write vision.md">
  <action>Compose `{planningDir}/vision.md` using the interview answers:

```markdown
# {project_name} — Vision

## Problem

{problem_statement}

## Target Users

{target_users}

## Value Proposition

{value_proposition}

## Differentiation

{differentiation}

## Success Metrics

{success_metrics — formatted as a bulleted list}

## Non-Goals (v1)

{non_goals — formatted as a bulleted list}
```
  </action>
  <action>Write the composed content to `{planningDir}/vision.md`</action>
</step>

<step n="5" goal="Report completion">
  <output>
**acps-vision complete.**

Vision written to: `{planningDir}/vision.md`

**Next steps:**
  1. Run `acps-backlog` to define epics and iterations
  2. Run `acps-architecture` to capture the architecture package
  3. Run `acps-project-roadmap` to estimate delivery
  </output>
</step>

</workflow>
