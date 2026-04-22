# acps-document-project Workflow

**CPS Reference:** CPS Chapter 14 — Architecture and Project Intelligence

## Context

`acps-document-project` performs a deep scan of the project codebase and synthesizes 4
documentation files in `{planningDir}/intel/`. On first run it creates all 4 docs. On
re-run it reads `.scan-state.json` to skip completed docs and only regenerate pending ones
(D-07). The state file is deleted when all 4 docs are complete (D-07).

**Output docs (D-06):** project-overview.md, source-tree.md, component-inventory.md, dev-guide.md
**State file (D-08):** `{planningDir}/intel/.scan-state.json` — created on start, deleted on completion
**Output dir:** `{planningDir}/intel/` — created if not present

---

<workflow>

<step n="1" goal="Load config">
  <action>Look for `.acps-config.json` in the project root</action>
  <check if=".acps-config.json exists">
    <action>Read `.acps-config.json` and extract `planningDir` value</action>
  </check>
  <check if=".acps-config.json is missing">
    <action>Set planningDir to `.planning` (silent default)</action>
  </check>
</step>

<step n="2" goal="Initialize or resume from state">
  <action>Check if `{planningDir}/intel/.scan-state.json` exists</action>
  <check if="{planningDir}/intel/.scan-state.json exists">
    <action>Read `{planningDir}/intel/.scan-state.json`</action>
    <check if="JSON is malformed or missing `completed` or `pending` arrays">
      <output>Warning: `.scan-state.json` is malformed. Treating as fresh run — all 4 docs will be regenerated.</output>
      <action>Set completed = [] and pending = ["project-overview.md", "source-tree.md", "component-inventory.md", "dev-guide.md"]</action>
    </check>
    <check if="JSON is valid and has `completed` and `pending` arrays">
      <action>Extract completed array and pending array from state file</action>
      <output>Resuming scan — {completed.length} docs already complete, {pending.length} remaining: {pending.join(', ')}.</output>
    </check>
  </check>
  <check if="{planningDir}/intel/.scan-state.json does not exist">
    <action>Create `{planningDir}/intel/` directory if it does not exist</action>
    <action>Set completed = [] and pending = ["project-overview.md", "source-tree.md", "component-inventory.md", "dev-guide.md"]</action>
    <action>Write `{planningDir}/intel/.scan-state.json`:
```json
{
  "started_at": "{now_ISO}",
  "completed": [],
  "pending": ["project-overview.md", "source-tree.md", "component-inventory.md", "dev-guide.md"]
}
```
    </action>
    <output>Starting fresh scan — 4 docs to generate in `{planningDir}/intel/`.</output>
  </check>
</step>

<step n="3" goal="Scan project structure">
  <check if="`source-tree.md` is in the pending list">
    <action>Run: `find . -not -path '*/node_modules/*' -not -path '*/.git/*' -not -path '*/dist/*' -not -path '*/.planning/*' -type f | sort` to enumerate all source files</action>
    <action>Group files by top-level directory. For each directory, derive a 1-line description based on its contents and naming conventions.</action>
    <action>Produce an annotated tree structure: directory-level grouping with purpose annotations, then file listing within each directory.</action>
  </check>
</step>

<step n="4" goal="Scan source code for intelligence">
  <check if="any of `project-overview.md`, `component-inventory.md`, or `dev-guide.md` are in pending">
    <action>Read key files in this order, extracting intelligence for the pending docs:
      1. `package.json` or `pyproject.toml` or equivalent manifest — extract: project name, description, main entry, dependencies, scripts
      2. `README.md` — extract: purpose statement, install instructions, usage examples
      3. Source entry points (e.g., `src/index.*`, `bin/*`, `main.*`) — read to understand architecture
      4. Config files (`.env.example`, `tsconfig.json`, `vite.config.*`, etc.) — extract tech stack signals
      5. Test files (sample 3–5) — understand test framework and conventions
    </action>
  </check>
</step>

<step n="5" goal="Write project-overview.md">
  <check if="`project-overview.md` is in the pending list">
    <action>Write `{planningDir}/intel/project-overview.md` with the following sections:
      - `# Project Overview`
      - `## What This Project Is` — 1–2 paragraph summary derived from README and manifest description
      - `## Tech Stack` — bulleted list: language, runtime, framework, key dependencies
      - `## Architecture Summary` — how the system is organized: layers, modules, main data flow
    </action>
    <action>Update `{planningDir}/intel/.scan-state.json`: move `project-overview.md` from `pending` to `completed`. Write the updated state file atomically before proceeding.</action>
    <output>Written: `{planningDir}/intel/project-overview.md`</output>
  </check>
</step>

<step n="6" goal="Write source-tree.md">
  <check if="`source-tree.md` is in the pending list">
    <action>Write `{planningDir}/intel/source-tree.md` with the following sections:
      - `# Source Tree`
      - `## Directory Structure` — annotated tree from step 3 (directory-level grouping, purpose annotations, file listing)
      - `## Key Entry Points` — list of main entry files with 1-line description each
    </action>
    <action>Update `{planningDir}/intel/.scan-state.json`: move `source-tree.md` from `pending` to `completed`. Write the updated state file atomically before proceeding.</action>
    <output>Written: `{planningDir}/intel/source-tree.md`</output>
  </check>
</step>

<step n="7" goal="Write component-inventory.md">
  <check if="`component-inventory.md` is in the pending list">
    <action>Write `{planningDir}/intel/component-inventory.md` with the following sections:
      - `# Component Inventory`
      - For each identified major component or module: component name as heading, file path, responsibility (1 sentence), public interface (exported functions, classes, or APIs)
      - Organize as heading-per-component or as a table, whichever is clearer given the project structure
    </action>
    <action>Update `{planningDir}/intel/.scan-state.json`: move `component-inventory.md` from `pending` to `completed`. Write the updated state file atomically before proceeding.</action>
    <output>Written: `{planningDir}/intel/component-inventory.md`</output>
  </check>
</step>

<step n="8" goal="Write dev-guide.md">
  <check if="`dev-guide.md` is in the pending list">
    <action>Write `{planningDir}/intel/dev-guide.md` with the following sections:
      - `# Developer Guide`
      - `## How to Install` — extracted from README and package.json install instructions
      - `## How to Run` — extracted from scripts or README run instructions
      - `## How to Test` — test command and framework name
      - `## How to Extend` — patterns for adding new features derived from code structure
    </action>
    <action>Update `{planningDir}/intel/.scan-state.json`: move `dev-guide.md` from `pending` to `completed`. Write the updated state file atomically before proceeding.</action>
    <output>Written: `{planningDir}/intel/dev-guide.md`</output>
  </check>
</step>

<step n="9" goal="Finalize — delete state file and report completion">
  <action>Confirm all 4 docs are now in the `completed` array (either just written or already complete from a previous run)</action>
  <action>Delete `{planningDir}/intel/.scan-state.json`</action>
  <output>
**acps-document-project complete.**

All 4 intel docs written to `{planningDir}/intel/`:

- `{planningDir}/intel/project-overview.md`
- `{planningDir}/intel/source-tree.md`
- `{planningDir}/intel/component-inventory.md`
- `{planningDir}/intel/dev-guide.md`

State file deleted. Re-run `acps-document-project` at any time to regenerate all docs.
  </output>
</step>

</workflow>
