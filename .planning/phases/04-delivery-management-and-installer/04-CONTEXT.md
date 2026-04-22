# Phase 4: Delivery, Management & Installer — Context

**Gathered:** 2026-04-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Build 14 Delivery & Management skills (`skills/acps-*`) plus the full interactive installer (`bin/install.js`). Skills follow the same 2-file pattern as Phase 3 (SKILL.md + workflow.md). The installer is Node.js 24 ESM using `@inquirer/prompts` — the existing stub in `bin/install.js` is replaced with real implementation.

Phase 4 requirements: DELIV-01 through DELIV-14, INST-01 through INST-04.

</domain>

<decisions>
## Implementation Decisions

### Installer: IDE destination paths

- **D-01:** `bin/install.js` uses a **hardcoded constant map** in JS that maps each IDE name to its global and local skill directory paths. No auto-detection of installed IDEs. The map is the single source of truth.
- **D-02:** 10 IDEs supported: Claude Code, Cursor, Windsurf, Copilot, Gemini CLI, Cline, Augment, OpenCode, Codex, Trae.
  - Claude Code: global → `~/.claude/skills/`, local → `.claude/skills/`
  - Cursor: global → `~/.cursor/rules/`, local → `.cursor/rules/`
  - Windsurf: global → `~/.windsurf/rules/`, local → `.windsurf/rules/`
  - Copilot: global → `~/.github/copilot/`, local → `.github/copilot/`
  - Gemini CLI: global → `~/.gemini/skills/`, local → `.gemini/skills/`
  - Cline: global → `~/.cline/skills/`, local → `.cline/skills/`
  - Augment: global → `~/.augment/skills/`, local → `.augment/skills/`
  - OpenCode: global → `~/.opencode/skills/`, local → `.opencode/skills/`
  - Codex: global → `~/.codex/skills/`, local → `.codex/skills/`
  - Trae: global → `~/.trae/skills/`, local → `.trae/skills/`
  - **Note:** Downstream agent must verify actual canonical paths for non-Claude IDEs before coding. Use web search if needed.
- **D-03:** Skills are copied **as-is** (SKILL.md + workflow.md) into each IDE's destination. No file renaming, no format conversion, no `.mdc` transformation. The AI in any IDE reads the Markdown files directly.

### Installer: .acps-config.json schema

- **D-04:** The installer **merges** into an existing `.acps-config.json` when one is present (written by `acps-init`). The `planningDir` key set by `acps-init` is preserved. Installer adds its fields on top.
- **D-05:** Complete `.acps-config.json` schema after installer runs:

```json
{
  "planningDir": ".planning",
  "version": "0.1.0",
  "name": "my-project",
  "lang": "en",
  "docLang": "en",
  "estimation": "bcp_full",
  "runtimes": ["claude-code"],
  "location": "local",
  "installed_at": "2026-04-20T00:00:00Z"
}
```

- **D-06:** Field meanings:
  - `planningDir` — set by `acps-init`; preserved by installer
  - `version` — acps package version at install time (from `package.json`)
  - `name` — project/team name from interactive prompt
  - `lang` — implementation language code (e.g., `"en"`, `"pt-br"`)
  - `docLang` — documentation language code
  - `estimation` — one of: `"bcp_full"`, `"bcp_simplified"`, `"none"`
  - `runtimes` — array of IDE identifiers selected during install
  - `location` — `"global"` or `"local"`
  - `installed_at` — ISO 8601 timestamp of install

### Installer: non-interactive flags

- **D-07:** Non-interactive mode: `--claude --global --estimation bcp_full --lang en --doc-lang en` (as specified in INST-02). The `--claude` flag sets `runtimes: ["claude-code"]`. Installer skips all prompts when sufficient flags are provided.
- **D-08:** `--help` flag prints usage summary (already satisfied by CI gate check; keep it minimal).

### acps-gate: baseline locking

- **D-09:** `acps-gate` has two modes in one skill: (1) **blockers view** — lists what's blocking the current gate (reads `docs/gates.md` for gate conditions, scans planning dir for missing artifacts); (2) **approval** — when user types `"approve"`, locks BCP baseline.
- **D-10:** `change-log.md` format: YAML front-matter block at top with `baseline_bcp`, `baseline_fp`, `approved_at` (ISO timestamp), `approved_by` (IDE/model info). Body is a Markdown table with columns: `CR ID | Date | Description | BCP Delta | FP Delta | Balance`. Written to `{planningDir}/change-log.md`.
- **D-11:** BCP baseline is computed from the `roadmap.md` file (written by `acps-project-roadmap`) — sum of all epic BCP estimates. If `roadmap.md` doesn't exist, gate halts with a message to run `acps-project-roadmap` first.

### acps-pause / acps-resume: continue-here.md

- **D-12:** `continue-here.md` captures: current story file path, current loop phase (discuss/spec/plan/execute/homologate), git branch name, and open (incomplete) tasks from the story's `## Plan` section. Written to `{planningDir}/continue-here.md`.
- **D-13:** `continue-here.md` format:

```markdown
---
story: .planning/specs/ep-m01-user-auth.md
loop_phase: execute
branch: iter-1/ep-m01-user-auth
paused_at: 2026-04-20T14:30:00Z
---

## Open Tasks

- [ ] Task 3: Wire up the token refresh endpoint
- [ ] Task 4: Write integration tests for refresh flow
```

- **D-14:** `acps-resume` staleness check: reads `continue-here.md`, reads the story file, compares `story.status` (from YAML front-matter) against `loop_phase`. If status has advanced past the paused phase (e.g., story is `homologated` but we paused at `execute`), show a warning: "Story status has changed since pause: {old_phase} → {current_status}. Resume anyway or discard?" User decides. If user discards, delete `continue-here.md`.

### Delivery skills: general pattern

- **D-15:** All 14 delivery/management skills follow the same 2-file pattern: `SKILL.md` (thin YAML frontmatter + delegate line) + `workflow.md` (XML step blocks). No companion files needed.
- **D-16:** Skills that create new artifacts (acps-new-epic, acps-new-story, acps-new-bug) write files using the corresponding templates from `templates/`. They don't write raw content — they fill the template.
- **D-17:** `acps-bug-fix` follows the GSD loop pattern: branch (using `acps-branch` convention `bug/{bug-id}-{slug}`) → implement fix → verify ACs → close bug → recommend PR.
- **D-18:** `acps-pr` creates a PR description using conventional commit title format. It filters out `.planning/` commits from the PR body (those are methodology bookkeeping, not code changes).
- **D-19:** `acps-help` is the onboarding skill — outputs a concise map of all `acps` skills grouped by phase (Setup, Loop, Delivery, Management), with 1-line description each and "next recommended skill" based on project state (reads `.acps-config.json` to determine phase).
- **D-20:** `acps-status` reads: current git branch (determines which iteration/epic is active), `{planningDir}/backlog.md` for iteration status, `change-log.md` for scope balance. Outputs: current phase + iteration, active epic, scope balance (BCP/FP baseline vs current).

### Claude's Discretion

- Exact CPS chapter references to cite in each skill's workflow.md header
- Exact step count and nesting within workflow.md (minimum 4 steps per Phase 3 pattern)
- The precise wording of output messages within the gate constraints defined above
- Canonical IDE destination paths for non-Claude-Code IDEs (verify via web search before implementing)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Existing patterns (copy from Phase 3)
- `skills/acps-init/SKILL.md` — SKILL.md structure: 6 lines, YAML frontmatter + delegate line
- `skills/acps-execute/workflow.md` — Most complex Phase 3 workflow; good model for multi-step skills
- `skills/acps-homologate/workflow.md` — Shows YAML write pattern and conditional routing

### Requirements (what must be built)
- `.planning/REQUIREMENTS.md` §Delivery & Management Skills (DELIV-01 through DELIV-14)
- `.planning/REQUIREMENTS.md` §Installer (INST-01 through INST-04)
- `.planning/ROADMAP.md` §Phase 4 — 6 success criteria that define done

### Templates (skills reference these for creating new artifacts)
- `templates/specs/epic.md` — acps-new-epic fills this template
- `templates/specs/story.md` — acps-new-story fills this template
- `templates/bugs/bug-report.md` — acps-new-bug + acps-bug-fix reference this
- `templates/phases/` — phase documents for acps-deliverable
- `templates/reports/` — daily/weekly/monthly/quarterly for acps-report

### Config schema (installer writes this)
- `skills/acps-init/workflow.md` — Step 4 shows the `planningDir`-only config that installer merges with

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `bin/install.js` — Currently a 7-line stub. Replace entirely with full implementation.
- `package.json` — `@inquirer/prompts` already installed as production dep. Use it for all interactive prompts.
- 11 skills in `skills/` — Already built in Phase 3. Installer copies these directories verbatim.
- `templates/` — 14 templates available. Skills reference them by path.

### Established Patterns
- Skill format: SKILL.md (thin) + workflow.md (full XML steps) — exact same in Phase 4
- `.acps-config.json` — already written by acps-init with `planningDir` key; installer merges
- Lint gate: `npm run lint` covers `skills/**/*.md` — new workflow.md files must pass 0 errors

### Integration Points
- `acps-homologate` routes failures to `acps-bug-fix` (Phase 4) — this link closes in Phase 4
- `acps-bug-fix` uses `acps-branch` naming convention: `bug/{bug-id}-{slug}`
- `acps-gate` reads `roadmap.md` (from acps-project-roadmap) to compute BCP baseline
- `acps-status` reads `change-log.md` (from acps-gate) for scope balance
- `acps-resume` reads `continue-here.md` (from acps-pause) — these two are tightly coupled

</code_context>

<deferred>
## Deferred Ideas

- leanspec CLI integration — still deferred; Phase 4 skills write Markdown directly (same as Phase 3)
- OS-specific path handling for Windows in installer — `~` expansion and path separators may differ; out of scope for Phase 4, noted for v2
- Upgrade path (`npx acps@latest` when already installed) — detect version diff and offer upgrade; deferred to Phase 5 or post-v1

</deferred>

---

*Phase: 04-delivery-management-and-installer*
*Context gathered: 2026-04-20*
