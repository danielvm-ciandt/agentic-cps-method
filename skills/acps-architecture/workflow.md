# acps-architecture Workflow

**CPS Reference:** CPS Chapter 14 — Architecture Package

## Context

`acps-architecture` facilitates architecture package creation following CPS Chapter 14 discipline. It captures the foundational technical decisions that will guide all implementation work: stack choices, system boundaries, patterns, and quality constraints.

---

<workflow>

<step n="1" goal="Load project configuration and context">
  <action>Look for `.acps-config.json` in the project root</action>
  <check if=".acps-config.json exists">
    <action>Read `.acps-config.json` and extract `planningDir` value</action>
  </check>
  <check if=".acps-config.json is missing">
    <action>Set planningDir to `.planning` (silent default)</action>
  </check>
  <check if="`{planningDir}/vision.md` exists">
    <action>Read `{planningDir}/vision.md` for project context</action>
  </check>
  <check if="`{planningDir}/backlog.md` exists">
    <action>Read `{planningDir}/backlog.md` for epic context</action>
  </check>
</step>

<step n="2" goal="Check for existing architecture package">
  <action>Check if `{planningDir}/architecture.md` already exists</action>
  <check if="architecture.md exists">
    <output>An architecture.md already exists at `{planningDir}/architecture.md`.
Continuing will overwrite it. Type "overwrite" to proceed or "cancel" to stop.</output>
    <check if="user types 'cancel'">
      <action>HALT — existing architecture package preserved</action>
    </check>
  </check>
</step>

<step n="3" goal="Run CPS Chapter 14 architecture interview">
  <output>**Architecture Workshop — CPS Chapter 14**

Let's define the architecture package. These decisions will guide all implementation work.
  </output>
  <action>Ask: "1. What is the primary tech stack? (languages, frameworks, runtime)"</action>
  <action>Ask: "2. What are the system boundaries? List external services and integrations."</action>
  <action>Ask: "3. What is the primary architectural pattern? (e.g., monolith, microservices, event-driven, MVC)"</action>
  <action>Ask: "4. Describe the data model at a high level — key entities and their relationships."</action>
  <action>Ask: "5. What are the quality attribute requirements? (performance SLAs, security level, uptime, scalability targets)"</action>
  <action>Ask: "6. What are the deployment and infrastructure choices? (cloud provider, containerization, CI/CD approach)"</action>
  <action>Ask: "7. What are the hard technical constraints or non-negotiables? (legacy systems, compliance requirements, team skills)"</action>
  <action>Record all answers as: tech_stack, system_boundaries, arch_pattern, data_model, quality_attributes, deployment, constraints</action>
</step>

<step n="4" goal="Write architecture.md">
  <action>Compose `{planningDir}/architecture.md`:

```markdown
# Architecture Package

**CPS Reference:** Chapter 14

## Tech Stack

{tech_stack}

## System Boundaries

{system_boundaries}

## Architectural Pattern

{arch_pattern}

## Data Model

{data_model}

## Quality Attributes

{quality_attributes}

## Deployment & Infrastructure

{deployment}

## Constraints & Non-Negotiables

{constraints}
```

  </action>
  <action>Write the composed content to `{planningDir}/architecture.md`</action>
</step>

<step n="5" goal="Report completion">
  <output>
**acps-architecture complete.**

Architecture package written to: `{planningDir}/architecture.md`

**Next steps:**

1. Run `acps-project-roadmap` to apply BCP/FP estimation to the roadmap
2. When iteration work begins: run `acps-branch` to start the GSD loop

  </output>
</step>

</workflow>
