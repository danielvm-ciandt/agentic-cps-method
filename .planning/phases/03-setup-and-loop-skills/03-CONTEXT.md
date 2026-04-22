# Phase 3: Setup & Loop Skills - Context

**Gathered:** 2026-04-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Create 11 Claude Code skills (5 Setup Phase + 6 GSD Loop) in `skills/<acps-*>/`. Each skill delivers one CPS workflow command: init, vision, backlog, architecture, project-roadmap, branch, discuss, spec, plan, execute, homologate. Skills are static Markdown files consumed by the host IDE's AI agent — no runtime, no server, no leanspec CLI dependency (CLI does not exist yet; skills write Markdown directly).

</domain>

<decisions>
## Implementation Decisions

### Skill file structure

- **D-01:** Each skill has exactly two files: `skills/<name>/SKILL.md` + `skills/<name>/workflow.md`
- **D-02:** `SKILL.md` is thin — YAML frontmatter only (`name:`, `description:`) plus a single line `Follow the instructions in ./workflow.md.` Mirrors the lean-spec bmad-create-story pattern exactly.
- **D-03:** `workflow.md` contains all logic in **full XML step-by-step format** (`<step>` blocks with explicit actions, conditionals, and outputs) — no prose-only instructions. GSD-style depth. Nothing left to Claude's runtime interpretation.

### leanspec CLI — not used in Phase 3

- **D-04:** The leanspec CLI does not exist yet and will not be used in Phase 3. Skills write Markdown files directly using standard file operations.
- **D-05:** Skills read project configuration from `.acps-config.json` in the project root (written by `acps-init`) to determine the planning directory path. No hardcoded `.planning/` path.
- **D-06:** If `.acps-config.json` is missing, skills default silently to `.planning/` without prompting or erroring — no fallback ceremony.

### Output directory

- **D-07:** `acps-init` is the canonical writer of `.acps-config.json` with a `planningDir` key. All other skills read this key to resolve output paths.
- **D-08:** All output files (epics, stories, specs, deliverables) go into the user-configured `planningDir` structure — not hardcoded paths.

### acps-spec: ambiguity scoring

- **D-09:** After refining a story, Claude internally scores ambiguity on a 0.0–1.0 scale based on: vague ACs, undefined terms, unclear scope boundaries, missing edge cases.
- **D-10:** Score is displayed to the user. If score > 0.20, the skill does NOT finalize — it shows the specific items raising the score and loops back to refine. Loop repeats until score ≤ 0.20 or user explicitly overrides.
- **D-11:** Failure display format: `Ambiguity score: {X} > 0.20 threshold` followed by a bulleted list of specific issues. No hard stop — offer to continue refining.

### acps-homologate: AC walkthrough UX

- **D-12:** Present **all ACs at once** from the story file. User responds marking each by number (e.g., `1-pass, 2-fail, 3-pass`). Faster than one-at-a-time, still captures per-AC results.
- **D-13:** After all ACs are marked: compute `totals` block from `sessions[]` (sum duration_ms, tokens.input, tokens.output, tokens.total; count sessions), write to story YAML front-matter.
- **D-14:** If any ACs failed: set `status: failed` in story front-matter, print `{N} ACs failed — run acps-bug-fix to file bugs and fix.` Do not stop mid-walkthrough on first failure — complete the full AC review first.
- **D-15:** If all ACs passed: set `status: homologated` in story front-matter.

### Claude's Discretion

- Exact XML step naming and nesting depth within workflow.md files
- Which CPS chapter reference to cite in each skill's workflow.md header
- Whether to include a brief `## Context` preamble in workflow.md explaining the skill's CPS discipline role
- Exact ambiguity scoring rubric sub-weights (what counts as "vague AC" vs "undefined term")

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Skill format pattern (copy this)
- `/Users/danielvm/Sites/lean-spec/.claude/skills/bmad-create-story/SKILL.md` — Exact SKILL.md structure to mirror (YAML frontmatter + workflow delegate line)
- `/Users/danielvm/Sites/lean-spec/.claude/skills/bmad-create-story/workflow.md` — XML step-by-step workflow.md structure to mirror

### Requirements (what must be built)
- `.planning/REQUIREMENTS.md` §Setup Phase Skills (SETUP-01 through SETUP-05) — exact skill responsibilities
- `.planning/REQUIREMENTS.md` §GSD Loop Skills (LOOP-01 through LOOP-06) — exact skill responsibilities
- `.planning/ROADMAP.md` §Phase 3 — Success criteria (6 items) that define done

### Config schema
- `.planning/ROADMAP.md` §Phase 4 — `bin/install.js` writes `.acps-config.json` (installer in Phase 4 — acps-init in Phase 3 must write a compatible subset)

### Template files (skills reference these)
- `templates/specs/story.md` — YAML front-matter schema that acps-execute appends to and acps-homologate writes totals into
- `templates/specs/epic.md` — Epic format that acps-new-epic (Phase 4) follows, but acps-backlog references

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `/Users/danielvm/Sites/lean-spec/.claude/skills/bmad-create-story/` — 5-file pattern (SKILL.md, workflow.md, template.md, checklist.md, discover-inputs.md). Phase 3 skills use the 2-file subset (SKILL.md + workflow.md) — no checklist or template companion files needed.
- `templates/specs/story.md` — Already written in Phase 2. `acps-execute` appends a `sessions[]` entry; `acps-homologate` writes the `totals` block. Skills must read and understand this schema.
- `templates/` — All 14 templates from Phase 2 are available. Setup skills reference these when creating artifacts.

### Established Patterns
- From Phase 1: npm as package manager, markdownlint-cli2 for linting
- From Phase 2: lean-spec body structure (Overview, Design, Plan, Test, Notes); YAML front-matter only for programmatically-consumed files
- Skill format: SKILL.md = thin frontmatter, workflow.md = all logic (established in Phase 1 context)

### Integration Points
- `acps-init` writes `.acps-config.json` → all other skills read it for `planningDir`
- `acps-execute` appends to `sessions[]` in story YAML front-matter → `acps-homologate` reads sessions[] to compute totals
- `acps-spec` gates story advancement → `acps-plan` can only run on stories that passed the ≤0.20 ambiguity gate
- `acps-homologate` failure → routes user to `acps-bug-fix` (Phase 4 skill)

</code_context>

<specifics>
## Specific Ideas

- No "I want it like X" moments — user confirmed following lean-spec and GSD patterns throughout
- The leanspec CLI will be built later — Phase 3 skills are the foundation before the CLI layer exists

</specifics>

<deferred>
## Deferred Ideas

- leanspec CLI integration — skills currently write Markdown directly; CLI adapter layer is future work when leanspec CLI is built
- `checklist.md` and `discover-inputs.md` companion files (lean-spec has these in some skills) — not needed for Phase 3 skill set

</deferred>

---

*Phase: 03-setup-and-loop-skills*
*Context gathered: 2026-04-19*
