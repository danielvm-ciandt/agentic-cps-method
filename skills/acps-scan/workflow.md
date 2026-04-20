# acps-scan Workflow

**CPS Reference:** CPS Chapter 14 — Architecture and Project Intelligence

## Context

`acps-scan` produces a 1-page context summary that orients any AI agent to the project in
under 30 seconds. It reads 6 files + git log directly — no dependency on `acps-document-project`
having run first (D-10).

**5 summary sections (D-09):**

1. What the project is (from package.json + README)
2. Tech stack + key dependencies (from package.json)
3. Current iteration + active epic (from .acps-config.json + backlog.md + git branch)
4. Last 3 git commits (from git log)
5. Open impediments (from notes.md)

---

<workflow>

<step n="1" goal="Load config and determine planningDir">
  <action>Look for `.acps-config.json` in the project root</action>
  <check if=".acps-config.json exists">
    <action>Read `.acps-config.json` and extract `planningDir` value</action>
  </check>
  <check if=".acps-config.json is missing">
    <action>Set planningDir to `.planning` (silent default)</action>
  </check>
</step>

<step n="2" goal="Read project identity from package.json and README">
  <action>Check if `package.json` exists in the project root</action>
  <check if="package.json exists">
    <action>Read `package.json`. Extract: `name`, `description`, `version` fields</action>
  </check>
  <check if="package.json is missing">
    <action>Check for alternative manifest files: `pyproject.toml`, `Cargo.toml`, `go.mod`, `pom.xml`.
    If found, extract equivalent name/description/version fields.
    If none found, set name="unknown project", description="no manifest found", version="0.0.0"</action>
  </check>
  <action>Read `README.md` (first 50 lines) if it exists. Extract the project's one-line purpose
  statement — typically the first non-heading paragraph or the line immediately after the H1 title.
  If README does not exist, use the `description` field from the package manifest instead.</action>
</step>

<step n="3" goal="Read tech stack and key dependencies">
  <check if="package.json exists">
    <action>Read `package.json`. Extract:
      - `dependencies` object: count total keys → dep_count. Take first 5 keys → top_deps list.
      - `devDependencies` object: count total keys → dev_dep_count.
      - `engines` field if present → runtime version (e.g., "node: >=24")
      - Identify framework: scan dependency names for known framework patterns
        (react, vue, svelte, express, fastify, nextjs, nuxt, etc.) → framework name or "none"
      - Infer language: check for `typescript` in devDependencies → "TypeScript";
        otherwise inspect file extensions in root for `.ts`, `.js`, `.py`, `.rs`, `.go` → language name
    </action>
  </check>
  <check if="package.json is missing and pyproject.toml exists">
    <action>Read `pyproject.toml`. Extract project name, dependencies list, python version requirement.
    Set runtime to "Python", framework to "none" unless flask/django/fastapi detected in deps.</action>
  </check>
  <check if="no known manifest found">
    <action>Set runtime="unknown", framework="none", top_deps=[], dep_count=0, language="unknown"</action>
  </check>
</step>

<step n="4" goal="Read current iteration and active epic from git branch and backlog.md">
  <action>Run `git branch --show-current` to get the active branch name</action>
  <action>Parse the branch name using pattern `iter-{N}/{epic-id}-{slug}`:
    - Extract iteration number N from the `iter-{N}` prefix
    - Extract epic-id from the path segment after the slash (everything before the first `-{slug}`)
    - If the branch does not match this pattern, set iteration to branch name, epic-id to "unknown"
  </action>
  <check if="`{planningDir}/backlog.md` exists">
    <action>Read `{planningDir}/backlog.md`. Search for the epic-id extracted from the branch name.
    If found, extract the epic title (the text following the epic-id on that line or in the heading).
    If not found or epic-id is "unknown", set epic_title to "unknown".</action>
  </check>
  <check if="`{planningDir}/backlog.md` does not exist">
    <action>Set epic_title to "unknown (backlog.md not found)"</action>
  </check>
</step>

<step n="5" goal="Read last 3 git commits">
  <action>Run `git log --oneline -3` to get the 3 most recent commit lines.
  Each line has format: `{short-hash} {commit subject}`.
  Capture all 3 lines as commit_1, commit_2, commit_3.</action>
  <check if="git is not available or repository has no commits">
    <action>Set all commit lines to "no commits yet"</action>
  </check>
</step>

<step n="6" goal="Read open impediments from notes.md">
  <check if="`{planningDir}/notes.md` exists">
    <action>Read `{planningDir}/notes.md`. Scan for lines containing any of:
      - `[IMPEDIMENT]`
      - `[BLOCKER]`
      - `[OPEN]`
      - `- [ ]` (unchecked task items)
    Collect up to 5 most recent matching lines.
    If no matching lines found, set impediments to "None".</action>
  </check>
  <check if="`{planningDir}/notes.md` does not exist">
    <action>Set impediments to "No open impediments found."</action>
  </check>
</step>

<step n="7" goal="Output 1-page context summary">
  <output>
**acps-scan — Project Context Summary**
*Generated: {today's date}*

---

## 1. What This Project Is

{name} v{version} — {description}

## 2. Tech Stack

- Runtime: {runtime}
- Framework: {framework or "none"}
- Key dependencies: {top_deps joined by ", "}
- Estimated dep count: {dep_count} production + {dev_dep_count} dev

## 3. Current Iteration

- Branch: {git branch}
- Iteration: {iter-N or "unknown"}
- Active epic: {epic-id} — {epic_title or "unknown"}

## 4. Last 3 Commits

- {commit_1}
- {commit_2}
- {commit_3}

## 5. Open Impediments

{impediments list, one per line, or "None"}

---
*Read via: acps-scan | Source files: package.json, README.md, backlog.md, notes.md, git log*
  </output>
</step>

</workflow>
