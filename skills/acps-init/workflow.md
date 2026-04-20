# acps-init Workflow

**CPS Reference:** CPS Setup Phase — Project Initialization

## Context

`acps-init` bootstraps a project for CPS methodology discipline. It creates the canonical `.planning/` directory structure and writes `.acps-config.json` so all other `acps` skills know where to write their output. Run once at project start.

---

<workflow>

<step n="1" goal="Check for existing initialization">
  <action>Look for `.acps-config.json` in the current project root</action>
  <check if=".acps-config.json already exists">
    <action>Read `.acps-config.json` and extract the `planningDir` value</action>
    <output>Project already initialized. Planning directory: {planningDir}

If you want to re-initialize, delete `.acps-config.json` first and re-run acps-init.</output>
    <action>HALT — no further action needed</action>
  </check>
</step>

<step n="2" goal="Determine planning directory">
  <action>Ask the user: "Where should the planning directory be created? (default: .planning)"</action>
  <check if="user provides a custom path">
    <action>Set planningDir to the user-provided path (strip trailing slash if present)</action>
  </check>
  <check if="user accepts default or provides no input">
    <action>Set planningDir to `.planning`</action>
  </check>
</step>

<step n="3" goal="Create directory structure">
  <action>Create the following directories in the project root (create parent directories as needed):
    - {planningDir}/
    - {planningDir}/epics/
    - {planningDir}/iterations/
    - {planningDir}/specs/
  </action>
  <action>In each subdirectory, create a `.gitkeep` file so empty directories are tracked by git</action>
</step>

<step n="4" goal="Write .acps-config.json">
  <action>Write `.acps-config.json` to the project root with the following content:

```json
{
  "planningDir": "{planningDir}"
}
```

Where `{planningDir}` is the value determined in Step 2.
  </action>
</step>

<step n="5" goal="Report completion">
  <output>
**acps-init complete.**

Planning directory created: `{planningDir}/`
Structure:
  - {planningDir}/epics/      — epic specification files
  - {planningDir}/iterations/ — iteration tracking files
  - {planningDir}/specs/      — story specification files

Config written: `.acps-config.json` (planningDir: "{planningDir}")

**Next steps:**
  1. Run `acps-vision` to create your project vision
  2. Run `acps-backlog` to define epics and iterations
  3. Run `acps-architecture` to capture the architecture package
  4. Run `acps-project-roadmap` to estimate and plan delivery
  </output>
</step>

</workflow>
