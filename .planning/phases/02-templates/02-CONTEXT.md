# Phase 2: Templates - Context

**Gathered:** 2026-04-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Create 14 template files across `templates/specs/`, `templates/bugs/`, `templates/phases/`, `templates/deliverables/`, and `templates/reports/`. The story template includes a YAML front-matter telemetry schema (`sessions[]` + `totals`) consumed by the leanspec CLI and web UI. Skills and installer are NOT in scope — those are Phases 3–4.

</domain>

<decisions>
## Implementation Decisions

### Story telemetry schema

- **D-01:** `sessions[]` entries capture the following fields per execution:
  - `command` — which acps skill was run
  - `started_at` — ISO timestamp
  - `finished_at` — ISO timestamp
  - `duration_ms` — integer
  - `model` — AI model identifier string
  - `tokens.input` — integer
  - `tokens.output` — integer
  - `tokens.total` — integer
  - `git_branch` — branch name at execution time
  - `plan_id` — optional reference to associated plan
  - `story_id` — story identifier

- **D-02:** `totals` block is computed at homologation (by `acps-homologate`) and contains:
  - `sessions_count` — integer
  - `total_duration_ms` — integer
  - `tokens.input` — summed integer
  - `tokens.output` — summed integer
  - `tokens.total` — summed integer

- **D-03:** Telemetry YAML lives in the **YAML front-matter block** (`---` at top of file) — standard lean-spec pattern, parseable by leanspec CLI and web UI.

### Template format & front-matter

- **D-04:** Only `story.md` gets YAML front-matter. All other templates (epic, bug-report, phase, deliverable, report) are plain Markdown — no front-matter. YAML adds noise where there's no programmatic consumer.

- **D-05:** All templates follow **lean-spec body structure**: Overview, Design, Plan, Test, Notes sections — including `story.md`. This is consistent with the lean-spec inspiration and keeps the format uniform across the template directory.

### Copy source vs. write fresh

- **D-06:** Phase templates (`templates/phases/`), deliverable templates (`templates/deliverables/`), and report templates (`templates/reports/`) are **written fresh** — no existing source to copy from (old-acps has no templates/ directory; BMAD templates are agent-specific and not a good fit). Follow lean-spec body structure.

- **D-07:** `templates/specs/epic.md` and `templates/bugs/bug-report.md` are also written fresh in lean-spec body format.

### Report template depth & rhythm

- **D-08:** All report templates use **minimal scaffold**: headings + placeholder comments only. Example: `## Completed\n<!-- List completed stories -->`. The `acps-report` skill fills the content; templates provide structure only.

- **D-09:** Reports have **different rhythms per cadence**:
  - `daily.md` — tactical sections: Today's Work, Blockers, Tomorrow
  - `weekly.md` — strategic sections: Iteration Progress, Metrics, Completed Stories, Next Week
  - `monthly.md` — summary sections: Iteration Summary, Key Deliverables, Retrospective Notes
  - `quarterly.md` — executive sections: Milestone Progress, Value Delivered, Scope Health, Next Quarter

### Claude's Discretion

- Exact section names within each report template (as long as they fit the rhythm above)
- Placeholder comment wording within templates
- Whether to add a `Notes` section at the bottom of all templates

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Template format reference
- `/Users/danielvm/Sites/lean-spec/.lean-spec/templates/spec-template.md` — lean-spec body structure to follow (Overview, Design, Plan, Test, Notes)
- `/Users/danielvm/Sites/lean-spec/.claude/skills/bmad-create-story/template.md` — BMAD story template (reference for CPS story sections and AC pattern)

### Requirements
- `.planning/REQUIREMENTS.md` §Templates (TMPL-01 through TMPL-06) — defines all 14 required template files with their locations and content expectations

### Phase boundary
- `.planning/ROADMAP.md` §Phase 2 — Success criteria for templates phase

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `/Users/danielvm/Sites/lean-spec/.lean-spec/templates/spec-template.md` — Body structure to model acps templates on
- `/Users/danielvm/Sites/lean-spec/.claude/skills/bmad-create-story/template.md` — Story format with AC + Tasks pattern

### Established Patterns
- lean-spec: YAML front-matter only for programmatically-consumed files; plain Markdown for docs — acps follows this pattern
- lean-spec: `---` delimited front-matter at file top — acps story.md uses this

### Integration Points
- `templates/specs/story.md` — Written by `acps-new-story` (Phase 3), telemetry appended by `acps-execute` (Phase 3), `totals` written by `acps-homologate` (Phase 3)
- All templates consumed by their corresponding acps-* skills in Phase 3 and Phase 4

</code_context>

<specifics>
## Specific Ideas

- No specific "I want it like X" moments — user deferred to lean-spec convention throughout

</specifics>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-templates*
*Context gathered: 2026-04-19*
