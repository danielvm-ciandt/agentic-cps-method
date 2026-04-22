# Phase 5: Scope & Intelligence — Context

**Gathered:** 2026-04-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Build 5 skills — `acps-change-request` and `acps-scope-manager` (scope/change management) plus `acps-document-project`, `acps-scan`, and `acps-code-map` (project intelligence). All follow the same 2-file pattern (SKILL.md + workflow.md) established in prior phases. No new file formats introduced except `.planning/intel/.scan-state.json` for resume state.

Phase 5 requirements: SCOPE-01, SCOPE-02, INTEL-01, INTEL-02, INTEL-03.

</domain>

<decisions>
## Implementation Decisions

### CR workflow (acps-change-request)

- **D-01:** AI auto-registers the CR on description alone. User describes the change; AI computes BCP/FP delta from existing story estimates and writes the CR row to `change-log.md` immediately. No separate confirm step.
- **D-02:** `change-log.md` format is inherited from Phase 4 (D-10): YAML front-matter with `baseline_bcp`, `baseline_fp`, `approved_at`, `approved_by` + a Markdown CR table with columns `CR ID | Date | Description | BCP Delta | FP Delta | Balance`. `acps-change-request` appends a new row to this table.
- **D-03:** CR IDs are sequential integers prefixed `CR-` (e.g., `CR-001`, `CR-002`). AI derives the next ID from the highest existing row.

### Scope ledger (acps-scope-manager)

- **D-04:** On overrun (current BCP/FP > baseline), `acps-scope-manager` **warns with a clear overrun banner showing the exact gap**. It does not block work or require a removal CR. It surfaces information only.
- **D-05:** Ledger display format:
  - **Header block:** Baseline BCP | Current BCP | Balance (green if ≥ 0, red if < 0) — same for FP
  - **CR table:** Full list of CRs from `change-log.md` (CR ID, date, description, deltas, running balance)
  - Scannable, not a wall of text.

### Intelligence: acps-document-project

- **D-06:** Full deep scan — reads all source files via glob/grep, then synthesizes 4 output documents written to `.planning/intel/`:
  - `project-overview.md` — what the project is, tech stack, architecture summary
  - `source-tree.md` — annotated directory/file tree
  - `component-inventory.md` — key components, their responsibilities, public interfaces
  - `dev-guide.md` — how to build, run, test, extend
- **D-07:** Resume-capable via `.planning/intel/.scan-state.json`. The state file records which of the 4 output docs have been written (with timestamps). On re-run: if state file exists, skip completed docs and regenerate only missing ones. State file is deleted when all 4 docs are complete.
- **D-08:** State file schema:

```json
{
  "started_at": "ISO-8601",
  "completed": ["project-overview.md", "source-tree.md"],
  "pending": ["component-inventory.md", "dev-guide.md"]
}
```

### Intelligence: acps-scan

- **D-09:** 1-page context summary contains: (1) what the project is, (2) tech stack + key dependencies, (3) current iteration + active epic, (4) last 3 git commits, (5) any open impediments from `notes.md`. Designed to orient any AI agent starting a new session in under 30 seconds.
- **D-10:** `acps-scan` is independent — does not require `acps-document-project` to have run first. It reads key files directly (package.json, README, `.acps-config.json`, `backlog.md`, `git log`).

### Intelligence: acps-code-map

- **D-11:** Parallel analysis: spawn one sub-agent per top-level source directory. Each agent independently analyzes its module and returns findings. Orchestrator merges results into `.planning/codebase/` with dependency graphs and component relationships.
- **D-12:** Output files in `.planning/codebase/`: one file per analyzed module/directory (e.g., `codebase/src-components.md`) + a top-level `codebase/MANIFEST.md` summarizing all modules and their relationships.

### Shared: skill pattern

- **D-13:** All 5 skills follow the established 2-file pattern: thin `SKILL.md` (YAML frontmatter + delegate line) + full `workflow.md` (XML step blocks). No companion files.
- **D-14:** Lint gate: `npm run lint` covers `skills/**/*.md` — all new workflow.md files must pass 0 errors before phase is complete.

### Claude's Discretion

- Exact step count and nesting within each workflow.md
- Precise wording of output banners and table headers
- Which CPS chapter to cite in each skill's workflow.md header
- How to handle edge cases (e.g., `change-log.md` doesn't exist yet when `acps-change-request` runs — create it with default YAML front-matter)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Existing skill patterns (copy from prior phases)
- `skills/acps-gate/SKILL.md` — Thin SKILL.md structure to copy for all 5 new skills
- `skills/acps-gate/workflow.md` — Shows change-log.md write pattern + blockers/approval modes; `acps-change-request` and `acps-scope-manager` extend this
- `skills/acps-execute/workflow.md` — Most complex workflow; good model for multi-step skills
- `skills/acps-status/workflow.md` — Reads `change-log.md` for scope balance; new skills must write compatible format

### Requirements (what must be built)
- `.planning/REQUIREMENTS.md` §Scope & Change Management (SCOPE-01, SCOPE-02)
- `.planning/REQUIREMENTS.md` §Project Intelligence (INTEL-01, INTEL-02, INTEL-03)
- `.planning/ROADMAP.md` §Phase 5 — 5 success criteria that define done

### change-log.md format (established in Phase 4)
- `.planning/phases/04-delivery-management-and-installer/04-CONTEXT.md` §D-10 — change-log.md schema that acps-change-request and acps-scope-manager must extend

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `skills/acps-gate/workflow.md` — Already writes `change-log.md` with YAML front-matter + CR table. `acps-change-request` appends rows to this existing file; `acps-scope-manager` reads it.
- `skills/acps-status/workflow.md` — Already reads `change-log.md` for scope balance display. Ensures format compatibility.
- 25 skills in `skills/` — All installed via `bin/install.js`. New 5 skills are copied automatically once they exist.
- `package.json` → `scripts.lint` — Covers `skills/**/*.md`. All new workflow.md files auto-included in lint check.

### Established Patterns
- Skill format: `SKILL.md` (6-line thin) + `workflow.md` (XML `<workflow><step>` blocks) — exact same in Phase 5
- Config: `.acps-config.json` has `planningDir` key — use it in all 5 skills to find `.planning/`
- Intelligence output dir: `.planning/intel/` — new directory, created by `acps-document-project` on first run

### Integration Points
- `acps-gate` writes the initial `change-log.md` at baseline lock — `acps-change-request` appends to it, `acps-scope-manager` reads it
- `acps-status` (Phase 4) already shows scope balance — `acps-scope-manager` adds the full ledger view on top
- `acps-scan` reads `notes.md` (from `acps-note`) for open impediments — these two are loosely coupled
- `bin/install.js` copies all `skills/*/` directories — no installer changes needed for Phase 5 skills

</code_context>

<deferred>
## Deferred Ideas

- Upgrade path detection (`npx acps@latest` version diff check) — noted in Phase 4 deferred, still out of scope
- Windows path handling in new skills — deferred to v2 (same as installer)
- `acps-scan` reading from `acps-document-project` intel files if they exist — could be a v2 enhancement; Phase 5 keeps them independent

</deferred>

---

*Phase: 05-scope-intelligence*
*Context gathered: 2026-04-20*
