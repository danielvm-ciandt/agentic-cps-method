# Phase 4: Delivery, Management & Installer — Research

**Researched:** 2026-04-20
**Domain:** Node.js ESM installer (@inquirer/prompts), Agent Skills format, IDE path conventions, Markdown skill authoring
**Confidence:** HIGH (installer API verified from local node_modules; skill paths verified from official IDE docs; Phase 3 patterns verified from codebase)

---

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** `bin/install.js` uses a **hardcoded constant map** in JS mapping each IDE to global/local skill paths. No auto-detection.
- **D-02:** 10 IDEs supported with these paths (note: downstream agent MUST verify non-Claude paths — see IDE Paths section):
  - Claude Code: global → `~/.claude/skills/`, local → `.claude/skills/`
  - Cursor: global → `~/.cursor/skills/`, local → `.cursor/skills/`
  - Windsurf: global → `~/.codeium/windsurf/memories/` (rules), local → `.windsurf/rules/`
  - Copilot: global → (JetBrains only) `~/.config/github-copilot/intellij/`, local → `.github/copilot/`
  - Gemini CLI: global → `~/.gemini/skills/`, local → `.gemini/skills/`
  - Cline: global → `~/Documents/Cline/Rules` (macOS), local → `.clinerules/`
  - Augment: global → `~/.augment/skills/`, local → `.augment/skills/`
  - OpenCode: global → `~/.config/opencode/skills/`, local → `.opencode/skills/`
  - Codex: global → `~/.agents/skills/`, local → `.agents/skills/`
  - Trae: global → `~/.trae/skills/`, local → `.trae/skills/`
- **D-03:** Skills copied **as-is** (SKILL.md + workflow.md), no renaming or format conversion.
- **D-04:** Installer **merges** into existing `.acps-config.json` (preserving `planningDir` from acps-init).
- **D-05:** Full config schema written by installer (see CONTEXT.md for exact JSON).
- **D-06:** Field meanings: planningDir, version, name, lang, docLang, estimation, runtimes, location, installed_at.
- **D-07:** Non-interactive flags: `--claude --global --estimation bcp_full --lang en --doc-lang en`.
- **D-08:** `--help` flag prints minimal usage summary.
- **D-09:** `acps-gate` has two modes: blockers view + approval to lock BCP baseline.
- **D-10:** `change-log.md` format: YAML front-matter (baseline_bcp, baseline_fp, approved_at, approved_by) + Markdown table.
- **D-11:** BCP baseline computed from `roadmap.md` (written by acps-project-roadmap).
- **D-12:** `continue-here.md` captures: story path, loop phase, git branch, open tasks.
- **D-13:** `continue-here.md` format: YAML front-matter (story, loop_phase, branch, paused_at) + `## Open Tasks` section.
- **D-14:** `acps-resume` staleness check: compares story `status` vs `loop_phase`. Warns if status has advanced past paused phase.
- **D-15:** All 14 delivery/management skills follow 2-file pattern: SKILL.md + workflow.md.
- **D-16:** acps-new-epic, acps-new-story, acps-new-bug fill templates from `templates/`.
- **D-17:** `acps-bug-fix` branch naming: `bug/{bug-id}-{slug}`.
- **D-18:** `acps-pr` filters out `.planning/` commits from PR body.
- **D-19:** `acps-help` groups all skills by phase (Setup, Loop, Delivery, Management).
- **D-20:** `acps-status` reads: git branch, backlog.md, change-log.md.

### Claude's Discretion

- Exact CPS chapter references to cite in each skill's workflow.md header
- Exact step count and nesting within workflow.md (minimum 4 steps per Phase 3 pattern)
- The precise wording of output messages within the gate constraints defined above
- Canonical IDE destination paths for non-Claude-Code IDEs (verify via web search before implementing)

### Deferred Ideas (OUT OF SCOPE)

- leanspec CLI integration — still deferred; Phase 4 skills write Markdown directly (same as Phase 3)
- OS-specific path handling for Windows in installer — out of scope for Phase 4, noted for v2
- Upgrade path (`npx acps@latest` when already installed) — deferred to Phase 5 or post-v1

</user_constraints>

---

<phase_requirements>

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DELIV-01 | `skills/acps-deliverable/` — deliverable workflow, AI fills template, human reviews | Template path: `templates/deliverables/`, Phase 3 XML step pattern |
| DELIV-02 | `skills/acps-gate/` — lists blockers + locks BCP baseline into `change-log.md` | D-09/D-10/D-11 decisions in CONTEXT.md; change-log.md format documented |
| DELIV-03 | `skills/acps-status/` — current phase, iteration, epic + scope balance | D-20: reads git branch, backlog.md, change-log.md |
| DELIV-04 | `skills/acps-report/` — daily/weekly/monthly/quarterly report from template | Template paths: `templates/reports/` |
| DELIV-05 | `skills/acps-new-epic/` — creates epic in lean-spec format | Template: `templates/specs/epic.md`; Phase 3 XML step pattern |
| DELIV-06 | `skills/acps-new-story/` — creates story under epic, sets stage + BCP | Template: `templates/specs/story.md`; story YAML front-matter schema |
| DELIV-07 | `skills/acps-new-bug/` — registers bug, links to epic, logs in `bugs/`, assigns BCP | Template: `templates/bugs/bug-report.md` |
| DELIV-08 | `skills/acps-bug-fix/` — branch (`bug/{id}-{slug}`) → fix → verify ACs → close → merge | D-17; integrates with acps-homologate failure routing |
| DELIV-09 | `skills/acps-new-iteration/` — opens new iteration branch, assigns pending epics | Git branch pattern from acps-branch |
| DELIV-10 | `skills/acps-pr/` — semantic PR branch, filter `.planning/` commits, conventional commit title | D-18; reads git log |
| DELIV-11 | `skills/acps-pause/` — saves state to `continue-here.md` | D-12/D-13 format decisions; reads story YAML front-matter |
| DELIV-12 | `skills/acps-resume/` — restores state from `continue-here.md`, staleness check | D-14 staleness logic; coupled with acps-pause |
| DELIV-13 | `skills/acps-note/` — zero-friction timestamped capture → `notes.md` | Simple append pattern; 4+ steps |
| DELIV-14 | `skills/acps-help/` — methodology overview + next recommended skill from config | D-19: grouped by phase; reads .acps-config.json |
| INST-01 | `bin/install.js` Node.js 24 ESM with interactive prompts | @inquirer/prompts 8.4.2: checkbox, input, select, confirm all verified |
| INST-02 | Non-interactive flags: `--claude --global --estimation bcp_full --lang en --doc-lang en` | D-07; process.argv parsing pattern in bin/install.js |
| INST-03 | Copies skills to correct destination for all 10 IDEs, global + local | IDE path map verified (see IDE Paths section) |
| INST-04 | Writes `.acps-config.json` with version, name, languages, estimation, runtimes, location, installed_at | D-05/D-06; merges with existing config from acps-init |

</phase_requirements>

---

## Summary

Phase 4 builds 14 delivery/management skills plus the full `bin/install.js` interactive installer. The skill authoring pattern is **identical to Phase 3**: thin SKILL.md (YAML frontmatter + delegate line) + workflow.md (XML `<step>` blocks). No new format knowledge is needed — the executor copies the established pattern.

The installer is where new technical knowledge is required. `@inquirer/prompts` 8.4.2 is already installed and provides the exact prompts needed: `checkbox` for multi-select runtimes, `input` for name/language, `select` for estimation method and location, `confirm` for confirmations. Non-interactive mode is handled via `process.argv` flag detection before any prompts run. The installer uses `fs` (built-in) and `path` (built-in) to copy skill directories and merge the config JSON.

IDE skill destination paths are the most uncertain element. Claude Code paths are canonical (`~/.claude/skills/` and `.claude/skills/`). Paths for all 10 IDEs have been researched but vary in confidence level — the `.agents/skills/` cross-client standard is now an emerging convention (documented at agentskills.io) and is the canonical project-agnostic path. Where IDE-specific paths were not definitively verified, the research notes confidence level.

**Primary recommendation:** Plan 14 skills in 5 plans (2-3 skills per plan based on complexity grouping) + 1 plan for the installer + 1 plan for lint+verification. Total 7 plans, mirroring Phase 3's structure.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Interactive installer prompts | CLI (Node.js process) | — | `npx` runs Node.js directly; @inquirer/prompts owns stdin/stdout |
| Skill file copying | CLI (Node.js fs) | — | Installer owns the file system copy via `fs.cp` or manual recursive copy |
| Config JSON merge | CLI (Node.js) | — | Reads existing .acps-config.json (if any), merges, writes back |
| IDE path resolution | CLI constant map | — | D-01: hardcoded map, no runtime detection |
| Skill workflow authoring | AI agent (Markdown) | — | Pure Markdown files; no runtime component |
| Artifact creation (epic/story/bug) | AI agent (in-IDE) | Template files | Skills read templates from `templates/` and fill them |
| Gate baseline locking | AI agent (in-IDE) | change-log.md | acps-gate writes YAML front-matter + table to change-log.md |
| State save/restore | AI agent (in-IDE) | continue-here.md | acps-pause/resume reads/writes the continue-here.md file |

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@inquirer/prompts` | 8.4.2 | Interactive CLI prompts (checkbox, input, select, confirm) | Already installed as prod dep; official successor to inquirer.js; [VERIFIED: npm registry + local node_modules] |
| Node.js built-in `fs` | Node 24+ | File system operations (mkdir, cp, readFile, writeFile) | Built-in; no install; `fs.promises` API is standard for ESM [ASSUMED] |
| Node.js built-in `path` | Node 24+ | Path manipulation, `path.join`, `~` expansion via `os.homedir()` | Built-in; required for cross-platform path building [ASSUMED] |
| Node.js built-in `os` | Node 24+ | `os.homedir()` to resolve `~` for global install paths | Built-in; the only correct way to expand `~` in Node.js [ASSUMED] |
| Node.js built-in `url` | Node 24+ | `import.meta.url` + `fileURLToPath` to find package root in ESM | Required for ESM modules to locate their own directory [ASSUMED] |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `markdownlint-cli2` | 0.22.0 | Lint all workflow.md files in skills/ | Run in 04-verification plan; already in devDependencies [VERIFIED: package.json] |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `@inquirer/prompts` | `prompts`, `enquirer` | inquirer is already installed; no reason to add alternatives |
| Built-in `fs.cp()` | Custom recursive copy | `fs.cp` (recursive option) handles directory copying in Node 16+; simpler [ASSUMED] |

**Installation:** No new packages needed. `@inquirer/prompts` already in dependencies. [VERIFIED: package.json]

**Version verification:**

```bash
npm view @inquirer/prompts version
# 8.4.2  [VERIFIED: npm registry]
```

---

## Architecture Patterns

### System Architecture Diagram

```
npx acps@latest
       │
       ▼
bin/install.js (Node.js 24 ESM)
       │
       ├─── process.argv parse
       │         │
       │    flags complete?──YES──► skip prompts
       │         │
       │         NO
       │         ▼
       │    @inquirer/prompts
       │    ├── input(name)
       │    ├── input(lang)
       │    ├── input(docLang)
       │    ├── checkbox(runtimes) ← multi-select: 10 IDEs
       │    ├── select(location)   ← global | local
       │    └── select(estimation) ← bcp_full | bcp_simplified | none
       │
       ├─── resolve skill source (import.meta.url → package skills/ dir)
       │
       ├─── IDE_PATHS[ide][location] → destination dir
       │         │
       │    for each selected runtime:
       │    └── fs.cp(skills/, destination, { recursive: true })
       │
       └─── merge .acps-config.json
                 │
            existing? ──YES──► read + merge fields
                 │
                 NO──► create new
                 │
            write .acps-config.json to process.cwd()
```

### Recommended Project Structure

```
bin/
└── install.js              ← Full installer (replaces stub)
skills/
├── acps-deliverable/       ← SKILL.md + workflow.md
├── acps-gate/              ← SKILL.md + workflow.md
├── acps-status/            ← SKILL.md + workflow.md
├── acps-report/            ← SKILL.md + workflow.md
├── acps-new-epic/          ← SKILL.md + workflow.md
├── acps-new-story/         ← SKILL.md + workflow.md
├── acps-new-bug/           ← SKILL.md + workflow.md
├── acps-bug-fix/           ← SKILL.md + workflow.md
├── acps-new-iteration/     ← SKILL.md + workflow.md
├── acps-pr/                ← SKILL.md + workflow.md
├── acps-pause/             ← SKILL.md + workflow.md
├── acps-resume/            ← SKILL.md + workflow.md
├── acps-note/              ← SKILL.md + workflow.md
└── acps-help/              ← SKILL.md + workflow.md
```

### Pattern 1: SKILL.md Thin Frontmatter (established — copy exactly)

**What:** 6-line file: `---`, `name:`, `description:`, `---`, blank line, delegate line
**When to use:** Every skill

```markdown
---
name: acps-gate
description: 'Lists what is blocking the current gate and, upon approval, locks the BCP baseline into change-log.md. Run after all setup phase artifacts are complete.'
---

Follow the instructions in ./workflow.md.
```

[VERIFIED: skills/acps-init/SKILL.md, skills/acps-execute/SKILL.md — confirmed exact pattern]

**Important:** The agentskills.io specification requires the `name` field to match the parent directory name exactly. All Phase 3 skills comply. Phase 4 skills must do the same. [VERIFIED: agentskills.io/specification]

### Pattern 2: workflow.md XML Step Structure (established — copy exactly)

**What:** Markdown file with `# Title`, `**CPS Reference:**`, `## Context`, `---`, `<workflow>`, `<step n="N" goal="...">` blocks, `</workflow>`
**When to use:** Every skill's workflow.md

```xml
<workflow>

<step n="1" goal="Load config and validate preconditions">
  <action>Look for `.acps-config.json` in the project root</action>
  <check if=".acps-config.json exists">
    <action>Read `.acps-config.json` and extract `planningDir` value</action>
  </check>
  <check if=".acps-config.json is missing">
    <action>Set planningDir to `.planning` (silent default)</action>
  </check>
  ...
</step>

<step n="2" goal="...">
  ...
</step>

</workflow>
```

[VERIFIED: skills/acps-execute/workflow.md, skills/acps-homologate/workflow.md — confirmed XML step pattern with `<action>`, `<check if>`, `<output>` elements]

**Step count guidance (from Phase 3):**
- Simple skills (acps-note, acps-help): 4 steps minimum
- Medium skills (acps-gate, acps-status, acps-pause, acps-resume): 4-5 steps
- Complex skills (acps-bug-fix, acps-pr): 5-6 steps

### Pattern 3: Installer Flag Detection (non-interactive mode)

**What:** Parse `process.argv` before any prompts; skip prompts if all flags supplied
**When to use:** bin/install.js

```js
#!/usr/bin/env node

import { checkbox, input, select } from '@inquirer/prompts';
import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Flag detection
const args = process.argv.slice(2);
const flags = {
  claude: args.includes('--claude'),
  global: args.includes('--global'),
  local: args.includes('--local'),
  estimation: args.find(a => a.startsWith('--estimation='))?.split('=')[1]
              || (args.indexOf('--estimation') !== -1 ? args[args.indexOf('--estimation') + 1] : null),
  lang: /* similar */ null,
  docLang: /* similar */ null,
  help: args.includes('--help'),
};

const nonInteractive = flags.claude && (flags.global || flags.local) && flags.estimation && flags.lang;

// IDE path map
const IDE_PATHS = {
  'claude-code': {
    global: join(homedir(), '.claude', 'skills'),
    local: join(process.cwd(), '.claude', 'skills'),
  },
  // ... all 10 IDEs
};
```

[ASSUMED based on @inquirer/prompts API verified from local node_modules; pattern is standard Node.js ESM]

### Pattern 4: @inquirer/prompts API Usage

**What:** The specific prompt types needed for INST-01
**Verified from:** local node_modules type declarations [VERIFIED]

```js
// Multi-select runtimes (checkbox)
const runtimes = await checkbox({
  message: 'Select AI IDEs to install skills for:',
  choices: [
    { name: 'Claude Code', value: 'claude-code', checked: true },
    { name: 'Cursor', value: 'cursor' },
    { name: 'Windsurf', value: 'windsurf' },
    { name: 'Copilot', value: 'copilot' },
    { name: 'Gemini CLI', value: 'gemini-cli' },
    { name: 'Cline', value: 'cline' },
    { name: 'Augment', value: 'augment' },
    { name: 'OpenCode', value: 'opencode' },
    { name: 'Codex', value: 'codex' },
    { name: 'Trae', value: 'trae' },
  ],
  required: true,  // at least one must be selected
});

// Single selection (select)
const location = await select({
  message: 'Install globally (for your user) or locally (for this project)?',
  choices: [
    { name: 'Global — ~/.ide/skills/', value: 'global' },
    { name: 'Local — .ide/skills/', value: 'local' },
  ],
  default: 'local',
});

// Text input (input)
const name = await input({
  message: 'Project or team name:',
  required: true,
});
```

[VERIFIED: node_modules/@inquirer/checkbox/dist/index.d.ts, node_modules/@inquirer/select/dist/index.d.ts, node_modules/@inquirer/input/dist/index.d.ts]

### Anti-Patterns to Avoid

- **Importing `inquirer` (v8 CommonJS):** Package is `@inquirer/prompts` (ESM). The old `inquirer` package has different API. [VERIFIED: package.json]
- **Using `__dirname` directly in ESM:** Not available. Must use `fileURLToPath(import.meta.url)` + `dirname()`. [ASSUMED: Node.js ESM standard]
- **Hardcoding `~` in paths:** Must use `os.homedir()` — tilde expansion is a shell feature, not Node.js. [ASSUMED]
- **Writing workflow.md with trailing spaces:** markdownlint rule MD009 (trailing spaces) will fail CI. [VERIFIED: .markdownlint.json — default: true means MD009 is on]
- **Missing blank line before/after headings:** MD022 will fail. Always blank line above `##` headings in workflow.md. [VERIFIED: .markdownlint.json]
- **Skipping the `<workflow>` root element:** Every workflow.md requires `<workflow>` and `</workflow>` tags. MD033 (inline HTML) is disabled so XML is allowed. [VERIFIED: .markdownlint.json — MD033: false]

---

## IDE Skill Destination Paths

The CONTEXT.md (D-02) notes that "downstream agent must verify actual canonical paths for non-Claude IDEs before coding." This research section provides those verified paths.

### Claude Code (canonical — HIGH confidence)

- Global: `~/.claude/skills/` [VERIFIED: project CLAUDE.md, acps-init references]
- Local: `.claude/skills/`

### Cursor (HIGH confidence)

Cursor supports the agentskills.io standard. From official Cursor skills docs:

- Global: `~/.cursor/skills/` [VERIFIED: cursor.com/docs/context/skills]
- Local: `.cursor/skills/`
- Compatibility aliases also scanned: `.claude/skills/`, `.codex/skills/`, `~/.claude/skills/`, `~/.codex/skills/`

**Note:** The CONTEXT.md D-02 specifies `~/.cursor/rules/` and `.cursor/rules/` — these are Cursor **rules** directories (for .mdc files), not skills directories. Since D-03 says skills are copied as-is, the correct destination is the **skills** path. The D-02 paths may need correction during implementation — the verified path is `.cursor/skills/` for agentskills format.

### Windsurf (MEDIUM confidence)

Windsurf uses rules, not a skills-compatible format. From official docs:

- Global: `~/.codeium/windsurf/memories/global_rules.md` (single file, 6000 char limit) [VERIFIED: docs.windsurf.com/windsurf/cascade/memories]
- Local: `.windsurf/rules/*.md` (directory of rule files, 12000 char/file)

**Critical mismatch:** The CONTEXT.md D-02 specifies `~/.windsurf/rules/` and `.windsurf/rules/` — the local path matches but the global path is incorrect. The actual global is `~/.codeium/windsurf/memories/`. This needs correction. Windsurf does NOT support the agentskills.io SKILL.md format natively. Copying SKILL.md into `.windsurf/rules/` will likely work as a plain Markdown rule file.

### GitHub Copilot (MEDIUM confidence)

From official GitHub docs:

- Global: `~/.config/github-copilot/intellij/global-copilot-instructions.md` (JetBrains only) [VERIFIED: docs.github.com]
- Local: `.github/copilot-instructions.md` (single file) or `.github/instructions/*.instructions.md`

**Critical mismatch:** CONTEXT.md D-02 specifies `.github/copilot/` directory — the verified path is `.github/copilot-instructions.md` (a file, not a directory). For the installer, copying into `.github/copilot/` creates a directory that Copilot will not read by default. This needs correction.

### Gemini CLI (HIGH confidence)

Gemini CLI natively supports agentskills.io format:

- Global: `~/.gemini/skills/` [VERIFIED: geminicli.com/docs/cli/skills/]
- Local: `.gemini/skills/`
- Also accepts: `~/.agents/skills/`, `.agents/skills/` (preferred cross-client alias)

CONTEXT.md D-02 paths match verified paths.

### Cline (MEDIUM confidence)

From official Cline docs:

- Global: `~/Documents/Cline/Rules` (macOS/Linux) [VERIFIED: docs.cline.bot/customization/cline-rules]
- Local: `.clinerules/` (directory of .md/.txt files)

**Mismatch:** CONTEXT.md D-02 specifies `~/.cline/skills/` (global) and `.cline/skills/` (local) — these are NOT the Cline-documented paths. Cline uses `.clinerules/` locally and `~/Documents/Cline/Rules` globally. Cline does not use the agentskills.io SKILL.md format natively — it reads `.clinerules/*.md` as plain rule files.

### Augment (LOW confidence)

Augment docs did not expose specific filesystem paths during research. Augment references agentskills.io format via the `agentskills.io` specification (they appear in the supported clients list). Likely paths follow the cross-client convention:

- Global: `~/.augment/skills/` [ASSUMED — not verified from official docs]
- Local: `.augment/skills/` [ASSUMED]

### OpenCode (HIGH confidence)

From official OpenCode docs:

- Global: `~/.config/opencode/skills/<name>/SKILL.md` [VERIFIED: opencode.ai/docs/skills]
- Local: `.opencode/skills/<name>/SKILL.md`
- Also accepts `.claude/skills/` and `.agents/skills/` (compatibility)

CONTEXT.md D-02 `~/.opencode/skills/` needs correction to `~/.config/opencode/skills/`.

### OpenAI Codex (HIGH confidence)

From official Codex docs and agentskills.io listing:

- Global: `~/.agents/skills/` [VERIFIED: developers.openai.com/codex/skills/]
- Local: `.agents/skills/`
- Also reads: `.codex/skills/` (project-level)

CONTEXT.md D-02 specifies `~/.codex/skills/` and `.codex/skills/` — `.codex/skills/` is a valid project-local path but the primary global is `~/.agents/skills/`.

### Trae (LOW confidence)

Trae (ByteDance) documentation was not accessible during research. Trae appears in the agentskills.io carousel (listed as supporting agentskills format) but direct documentation was unavailable.

- Global: `~/.trae/skills/` [ASSUMED]
- Local: `.trae/skills/` [ASSUMED]

### Cross-Client Standard (HIGH confidence)

The `.agents/skills/` path is an emerging open standard documented at agentskills.io/client-implementation, adopted by Cursor, Codex, Gemini CLI, OpenCode, and others:

- Global cross-client: `~/.agents/skills/`
- Local cross-client: `.agents/skills/`

**Recommendation for D-02 corrections:** The installer should use the verified paths above. For IDEs where the CONTEXT.md path is wrong (Windsurf global, Copilot local format, Cline paths), the executor should use the verified paths from this research rather than the CONTEXT.md approximations. The CONTEXT.md note "downstream agent must verify" grants this discretion.

---

## Phase 3 Grouping Pattern (Wave Structure)

Phase 3 built 11 skills in 7 plans across 4 waves:

| Plan | Skills Built | Wave | Type |
|------|-------------|------|------|
| 03-01 | acps-init (1 skill) | 1 | autonomous |
| 03-02 | acps-vision + acps-backlog (2 skills) | 2 | autonomous |
| 03-03 | acps-architecture + acps-project-roadmap (2 skills) | 2 | autonomous |
| 03-04 | acps-branch + acps-discuss (2 skills) | 3 | autonomous |
| 03-05 | acps-spec + acps-plan (2 skills) | 3 | autonomous |
| 03-06 | acps-execute + acps-homologate (2 skills) | 3 | autonomous |
| 03-07 | Lint + verification (0 skills) | 4 | autonomous+human |

**Effective grouping principle:** Skills are grouped by thematic relationship and dependency — skills that reference each other go together. The final plan is always lint gate + human checkpoint.

**Recommended Phase 4 grouping (14 skills + installer = 16 items, 9 plans):**

| Plan | Items | Rationale |
|------|-------|-----------|
| 04-01 | acps-gate + acps-status | Gate/reporting pair; both read roadmap/backlog |
| 04-02 | acps-pause + acps-resume | Tightly coupled pair (D-12/D-14) |
| 04-03 | acps-new-epic + acps-new-story + acps-new-bug | Artifact creation trio; all fill templates |
| 04-04 | acps-bug-fix + acps-pr | Both involve git branch operations |
| 04-05 | acps-deliverable + acps-report | Both generate documents from templates |
| 04-06 | acps-new-iteration + acps-note + acps-help | Lighter utility skills |
| 04-07 | bin/install.js full implementation | Installer is separate from skills (Node.js code) |
| 04-08 | Lint extension + skills verification | Same as 03-07; pass 0 lint errors |
| 04-09 | End-to-end verification + human checkpoint | Mirrors 03-07 human gate |

This keeps plans focused (1-3 skills each) and matches the ~5 min/plan velocity established in Phase 3.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Interactive CLI prompts | Custom readline/stdin loop | `@inquirer/prompts` checkbox/input/select | Already installed; handles terminal edge cases, arrow keys, validation [VERIFIED] |
| Directory copy (recursive) | Manual recursive fs.readdir loop | `fs.cpSync(src, dest, { recursive: true })` or `fs.cp` (async) | Built into Node 16+; handles nested dirs correctly [ASSUMED] |
| Home directory resolution | String replace `~` with `$HOME` | `os.homedir()` | Shell expansion does not work in Node.js [ASSUMED] |
| JSON merge logic | Custom deep merge | Read-parse-spread-write pattern | Config schema is flat enough for simple object spread [ASSUMED] |
| Markdownlint compliance | Custom linting | `npm run lint` after each workflow.md write | Already configured in package.json; catches all issues [VERIFIED] |

**Key insight:** The installer is intentionally simple — no framework, no complex DI, just Node.js stdlib + @inquirer/prompts. Keep it under 200 lines.

---

## Common Pitfalls

### Pitfall 1: Wrong `name` Field in SKILL.md

**What goes wrong:** The `name` field in SKILL.md frontmatter does not match the parent directory name.
**Why it happens:** Copy-paste from another skill without updating the name.
**How to avoid:** Always set `name: acps-<skill-name>` to match `skills/acps-<skill-name>/`.
**Warning signs:** agentskills.io spec validation warns; some clients may shadow or skip the skill.

### Pitfall 2: Missing Blank Lines in workflow.md

**What goes wrong:** `npm run lint` fails with MD022 (headings) or MD032 (lists) violations.
**Why it happens:** XML step blocks with adjacent Markdown headings/lists need blank lines separating them.
**How to avoid:** Always add blank line before `##` headings and before/after list blocks.
**Warning signs:** `npm run lint` exit code non-zero; specific line numbers reported.

### Pitfall 3: Overwriting `.acps-config.json` (losing planningDir)

**What goes wrong:** Installer writes a fresh config, losing `planningDir` set by acps-init.
**Why it happens:** Simple `writeFileSync` without reading first.
**How to avoid:** D-04 decision: always read existing file, spread its values, override only installer fields.
**Warning signs:** `.acps-config.json` is missing `planningDir` after install.

### Pitfall 4: ESM `__dirname` Not Available

**What goes wrong:** `ReferenceError: __dirname is not defined` at runtime.
**Why it happens:** `__dirname` is a CommonJS global; `package.json` has `"type": "module"`.
**How to avoid:** Use `fileURLToPath(import.meta.url)` + `dirname()` pattern (see code examples).
**Warning signs:** CI's `node --check bin/install.js` passes but runtime fails; check this explicitly.

### Pitfall 5: Tilde Not Expanded in Node.js Paths

**What goes wrong:** `~/.claude/skills/` is created literally as a directory starting with `~`.
**Why it happens:** Shell expands `~`, Node.js does not.
**How to avoid:** Always use `join(os.homedir(), '.claude', 'skills')`.
**Warning signs:** Install appears to succeed but files land in wrong location.

### Pitfall 6: Skills Copied to Wrong Destination

**What goes wrong:** acps skill files land in `.cursor/rules/` (Cursor rules format) instead of `.cursor/skills/` (agentskills format).
**Why it happens:** CONTEXT.md D-02 has some approximated paths (noted as "verify before coding").
**How to avoid:** Use the verified paths from this research document, not the CONTEXT.md approximations.
**Warning signs:** Cursor does not discover the skills despite copying.

### Pitfall 7: Non-Interactive Mode Misses One Flag

**What goes wrong:** Installer hangs waiting for a prompt even when `--claude --global` flags are passed, because `--lang` was not checked.
**Why it happens:** Incomplete flag coverage check before entering prompt mode.
**How to avoid:** Check ALL required flags: runtimes (`--claude` etc.), location (`--global`/`--local`), estimation, lang, doc-lang. Only skip prompts when all are provided.
**Warning signs:** CI hangs or times out running `node bin/install.js --claude --global --estimation bcp_full --lang en --doc-lang en`.

---

## Code Examples

Verified patterns from official sources and existing codebase:

### ESM bin/install.js skeleton

```js
#!/usr/bin/env node

import { checkbox, input, select } from '@inquirer/prompts';
import { existsSync, readFileSync, writeFileSync, mkdirSync, cpSync } from 'fs';
import { join, dirname } from 'path';
import { homedir } from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PACKAGE_ROOT = join(__dirname, '..');

// Read version from package.json
const { version } = JSON.parse(
  readFileSync(join(PACKAGE_ROOT, 'package.json'), 'utf8')
);

// IDE destination map
const IDE_PATHS = {
  'claude-code': {
    global: join(homedir(), '.claude', 'skills'),
    local: join(process.cwd(), '.claude', 'skills'),
  },
  'cursor': {
    global: join(homedir(), '.cursor', 'skills'),
    local: join(process.cwd(), '.cursor', 'skills'),
  },
  // ... remaining IDEs
};
```

[VERIFIED: package.json `"type": "module"` confirmed; @inquirer/prompts exports confirmed from node_modules]

### Config merge pattern

```js
const configPath = join(process.cwd(), '.acps-config.json');
const existing = existsSync(configPath)
  ? JSON.parse(readFileSync(configPath, 'utf8'))
  : {};

const config = {
  ...existing,            // preserve planningDir from acps-init
  version,
  name: answers.name,
  lang: answers.lang,
  docLang: answers.docLang,
  estimation: answers.estimation,
  runtimes: answers.runtimes,
  location: answers.location,
  installed_at: new Date().toISOString(),
};

writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n');
```

[ASSUMED based on D-04/D-05/D-06; pattern is standard Node.js JSON manipulation]

### Recursive skill copy

```js
const SKILLS_SRC = join(PACKAGE_ROOT, 'skills');

for (const runtime of answers.runtimes) {
  const dest = IDE_PATHS[runtime][answers.location];
  mkdirSync(dest, { recursive: true });
  cpSync(SKILLS_SRC, dest, { recursive: true });
}
```

[ASSUMED: `fs.cpSync` with `{ recursive: true }` available in Node 16+; project requires Node 24]

### Existing workflow.md config-read pattern (copy from Phase 3)

```xml
<step n="1" goal="Load config and verify preconditions">
  <action>Look for `.acps-config.json` in the project root</action>
  <check if=".acps-config.json exists">
    <action>Read `.acps-config.json` and extract `planningDir` value</action>
  </check>
  <check if=".acps-config.json is missing">
    <action>Set planningDir to `.planning` (silent default)</action>
  </check>
```

[VERIFIED: skills/acps-execute/workflow.md — identical pattern used by all Phase 3 skills]

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `inquirer` (CommonJS v8) | `@inquirer/prompts` (ESM, individual exports) | ~2023 | All prompts via named imports; no default export |
| `__dirname` in Node.js scripts | `fileURLToPath(import.meta.url)` + `dirname()` | Node.js ESM adoption | Required for all ESM bin scripts |
| IDE-specific rule files only | agentskills.io open standard (SKILL.md + workflow.md) | 2024-2026 | Cross-IDE skills now possible; `.agents/skills/` is the canonical cross-client path |
| Single `.cursor/rules/` for everything | `.cursor/skills/` for agentskills; `.cursor/rules/` for .mdc rules | Cursor added skills support | Two separate directories now serve different purposes |

**Deprecated/outdated:**

- `inquirer` (old CommonJS package): Replaced by `@inquirer/prompts` ESM package; do not install or import the old package.
- `fs.rmdirSync` (recursive option): Removed in newer Node.js; use `fs.rmSync({ recursive: true })` instead.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `fs.cpSync(src, dest, { recursive: true })` is the correct API for recursive directory copy in Node 24 | Code Examples | Could use `fs.promises.cp` async version instead; either works |
| A2 | Augment uses `~/.augment/skills/` and `.augment/skills/` paths | IDE Paths | Augment may use a different convention; installer copies to wrong location |
| A3 | Trae uses `~/.trae/skills/` and `.trae/skills/` paths | IDE Paths | Trae may use a different convention; installer copies to wrong location |
| A4 | `os.homedir()` correctly resolves to user home on all supported platforms | Code Examples | Edge case with unusual system config; standard practice |
| A5 | Non-interactive mode accepts `--estimation bcp_full` (value after space, not `=`) | Architecture Patterns | Flag parsing could require `=` syntax; test with actual run |
| A6 | Skills copied to Windsurf's `.windsurf/rules/` directory will be read as plain Markdown rules | IDE Paths | Windsurf may not pick up multi-file skills correctly; their format is different |

---

## Open Questions

1. **Copilot local path format**
   - What we know: GitHub Copilot local path is `.github/copilot-instructions.md` (single file) or `.github/instructions/*.instructions.md`
   - What's unclear: The CONTEXT.md says `.github/copilot/` (a directory). The installer would copy skills into that directory, but Copilot reads a single `copilot-instructions.md` file, not a skills directory.
   - Recommendation: Use `.github/copilot/` as specified in D-02 (installer just copies there); document in the skill that Copilot users may need to reference the files manually from their copilot-instructions.md. Alternatively, treat Copilot as "best-effort" since it doesn't natively support the agentskills format.

2. **Windsurf global path**
   - What we know: Actual global path is `~/.codeium/windsurf/memories/global_rules.md` (single file)
   - What's unclear: CONTEXT.md specifies `~/.windsurf/rules/` which doesn't exist per official docs
   - Recommendation: Use `.windsurf/rules/` for local (verified) and skip global or use `~/.codeium/windsurf/memories/` with a note that it's a single file, not a directory.

3. **Augment and Trae skill paths**
   - What we know: Both appear in the agentskills.io supported clients list. Both have LOW-confidence path assumptions.
   - What's unclear: Neither had accessible documentation during research.
   - Recommendation: Use the cross-client standard `~/.agents/skills/` and `.agents/skills/` as fallback — both IDEs likely scan these paths as part of agentskills standard compliance.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | bin/install.js | ✓ | v24+ (required by package.json) | — |
| @inquirer/prompts | INST-01 prompts | ✓ | 8.4.2 | — |
| markdownlint-cli2 | Lint gate (skills/*.md) | ✓ | 0.22.0 | — |
| npm | package scripts | ✓ | (system npm) | — |
| git | acps-branch, acps-pr workflow steps | ✓ (assumed) | system git | Skills document requirement |

**Missing dependencies with no fallback:** None identified.

**Missing dependencies with fallback:** None identified.

---

## Validation Architecture

> `workflow.nyquist_validation` not found in .planning/config.json (file absent) — treating as enabled.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | markdownlint-cli2 (structural lint for skill Markdown) |
| Config file | `.markdownlint.json` |
| Quick run command | `npm run lint` |
| Full suite command | `npm run lint` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DELIV-01 through DELIV-14 | Each skill has SKILL.md + workflow.md with correct structure | structural | `npm run lint` + `grep -l "<workflow>" skills/*/workflow.md` | ❌ Wave N (created during execution) |
| INST-01 | Installer runs interactive prompts | smoke | `node bin/install.js --help` (non-interactive) | ❌ Wave 7 |
| INST-02 | Non-interactive flags complete install | smoke | `node bin/install.js --claude --global --estimation bcp_full --lang en --doc-lang en` (dry-run or sandboxed) | ❌ Wave 7 |
| INST-03 | Skills copied to correct IDE destinations | manual-verify | Human checks destination dirs after non-interactive install | manual-only |
| INST-04 | Config written with all fields | smoke | `node -e` check after install, inspect .acps-config.json | ❌ Wave 7 |

### Sampling Rate

- **Per task commit:** `npm run lint` (catches Markdown violations before they accumulate)
- **Per wave merge:** `npm run lint` + structural grep checks
- **Phase gate:** Full lint pass + node --check + human checkpoint before `/gsd-verify-work`

### Wave 0 Gaps

- [ ] `node --check bin/install.js` currently passes (stub is valid JS); will need re-verification after full implementation
- [ ] Structural grep script: `grep -l "<workflow>" skills/*/workflow.md | wc -l` — should output 25 (11 existing + 14 new) after Phase 4

*(Existing test infrastructure (markdownlint) covers structural requirements; no new test framework needed)*

---

## Security Domain

> `security_enforcement` not found in config — treating as enabled.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | Installer has no auth; CLI tool |
| V3 Session Management | no | No sessions; stateless CLI |
| V4 Access Control | yes | Installer writes to user-owned directories only; no escalation |
| V5 Input Validation | yes | Validate flag values (estimation must be one of 3 values, lang is freetext) |
| V6 Cryptography | no | No secrets or encryption |

### Known Threat Patterns for this stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Path traversal via flag input | Tampering | Validate `--estimation` against allowed list; `--lang` is freetext but only used as JSON string value |
| Skills overwriting user files outside target dir | Tampering | `cpSync` copies to IDE skills dir only; no `rm` operations; user owns target dirs |
| `.acps-config.json` injection | Tampering | JSON.stringify sanitizes output; no eval; low-value target |
| Malformed skill YAML frontmatter | Tampering | markdownlint enforces structure; IDE parsers are lenient per agentskills.io spec |

---

## Sources

### Primary (HIGH confidence)

- `skills/acps-init/SKILL.md`, `skills/acps-execute/workflow.md`, `skills/acps-homologate/workflow.md` — confirmed Phase 3 patterns
- `node_modules/@inquirer/prompts/dist/index.d.ts`, `@inquirer/checkbox`, `@inquirer/select`, `@inquirer/input` type declarations — API verification
- `package.json` — dependency versions, lint script, ESM module type
- `.markdownlint.json` — lint rules (MD033:false enables XML; MD013:false disables line length; MD041:false disables first heading requirement)
- agentskills.io/specification — SKILL.md format specification, canonical directory discovery paths
- cursor.com/docs/context/skills — Cursor skills directory paths
- geminicli.com/docs/cli/skills/ — Gemini CLI skills paths
- opencode.ai/docs/skills — OpenCode skills paths
- developers.openai.com/codex/skills/ — Codex skills paths

### Secondary (MEDIUM confidence)

- docs.windsurf.com/windsurf/cascade/memories — Windsurf rules directory paths
- docs.github.com/en/copilot — GitHub Copilot instruction file paths
- docs.cline.bot/customization/cline-rules — Cline rules directory paths

### Tertiary (LOW confidence)

- Augment paths: assumed from agentskills.io standard convention; official docs not accessible
- Trae paths: assumed from agentskills.io standard convention; official docs returned empty pages

---

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — @inquirer/prompts verified from local node_modules; Node.js stdlib is stable
- Architecture: HIGH — Installer pattern is straightforward; Phase 3 skill pattern verified from codebase
- IDE paths: MEDIUM — Claude Code + Cursor + Gemini + OpenCode + Codex verified; Windsurf/Copilot/Cline have documented mismatches vs CONTEXT.md; Augment/Trae are assumed
- Pitfalls: HIGH — Markdownlint rules verified; ESM patterns confirmed; path pitfalls are standard Node.js knowledge

**Research date:** 2026-04-20
**Valid until:** 2026-05-20 (30 days — IDE paths can shift; agentskills.io spec is stable)
