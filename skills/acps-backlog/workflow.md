# acps-backlog Workflow

**CPS Reference:** CPS Chapter 10 — Backlog

## Context

`acps-backlog` facilitates backlog construction following CPS Chapter 10 discipline. It guides the definition of epics (business capability clusters) and their breakdown into stories, then assigns epics to iterations for phased delivery.

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
  <check if="`{planningDir}/vision.md` exists">
    <action>Read `{planningDir}/vision.md` to provide context during epic definition</action>
  </check>
</step>

<step n="2" goal="Define epics — CPS Chapter 10">
  <output>**Backlog Workshop — CPS Chapter 10: Epic Definition**

An epic is a business capability cluster — a meaningful unit of value delivery. Let's define your epics.
  </output>
  <action>Ask: "How many epics will this project have? (Start with a number — you can add more later)"</action>
  <action>For each epic (repeat until all epics defined):
    - Ask: "Epic {N} title?"
    - Ask: "Epic {N} goal — what business value does this deliver?"
    - Ask: "Epic {N} stories — list the stories as brief titles (one per line)"
    - Ask: "Epic {N} BCP estimate — how many Business Complexity Points? (rough order of magnitude)"
    - Record as: id=EP-{N}, title, goal, stories[], bcp_estimate
  </action>
</step>

<step n="3" goal="Plan iterations">
  <output>**Iteration Planning — CPS Chapter 10**

Now assign epics to iterations. Each iteration delivers one or more epics.
  </output>
  <action>Ask: "How many iterations do you plan?"</action>
  <action>For each iteration (repeat until all iterations defined):
    - Ask: "Iteration {N} — which epics does it contain? (list epic IDs, e.g., EP-01, EP-02)"
    - Ask: "Iteration {N} — any iteration-specific goal or focus?"
    - Record as: id=ITER-{N}, epics[], goal
  </action>
</step>

<step n="4" goal="Write backlog.md">
  <action>Compose `{planningDir}/backlog.md`:

```markdown
# Project Backlog

## Epics

{for each epic:}
### {id}: {title}

**Goal:** {goal}
**BCP Estimate:** {bcp_estimate}

**Stories:**
{for each story in stories[]:}
- {story title}

---
{end for}

## Iterations

{for each iteration:}
### Iteration {id}

**Goal:** {goal}
**Epics:** {epics — comma-separated IDs}

---
{end for}
```

  </action>
  <action>Write the composed content to `{planningDir}/backlog.md`</action>
</step>

<step n="5" goal="Report completion">
  <output>
**acps-backlog complete.**

Backlog written to: `{planningDir}/backlog.md`
Epics defined: {count of epics}
Iterations planned: {count of iterations}

**Next steps:**

1. Run `acps-architecture` to capture the architecture package
2. Run `acps-project-roadmap` to apply BCP/FP estimation to the roadmap
3. When iteration work begins: run `acps-branch` -> `acps-discuss` -> `acps-spec` -> `acps-plan` -> `acps-execute` -> `acps-homologate`

  </output>
</step>

</workflow>
