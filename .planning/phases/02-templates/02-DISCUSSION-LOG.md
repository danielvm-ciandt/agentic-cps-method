# Phase 2: Templates - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-19
**Phase:** 02-templates
**Areas discussed:** Story telemetry schema, Template format & front-matter, Copy source vs. write fresh, Report template depth

---

## Story telemetry schema

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal: command, started_at, finished_at, duration_ms, model | Enough for timeline + model used | |
| Full: + tokens.input, tokens.output, tokens.total | Matches TMPL-02 spec exactly | ✓ |
| Extended: + git_branch, plan_id, story_id | Richer cross-session traceability | ✓ |

**User's choice:** Full + Extended (options 2 and 3 combined)
**Notes:** User explicitly selected both option 2 (token counts) and option 3 (git_branch, plan_id, story_id) — all fields included.

| Option | Description | Selected |
|--------|-------------|----------|
| Aggregated: sessions_count, total_duration_ms, tokens.input/output/total | Computed at homologation | ✓ |
| + cost_usd field | Adds billing visibility | |
| Same fields as sessions[] summed | Mirrors sessions structure | |

**User's choice:** Aggregated totals block — sessions_count, total_duration_ms, tokens sums.

| Option | Description | Selected |
|--------|-------------|----------|
| YAML front-matter block (--- at top) | Standard lean-spec pattern | ✓ |
| Trailing YAML block at bottom | Non-standard but keeps Markdown preview clean | |
| Separate sidecar file | Separates data from docs | |

**User's choice:** YAML front-matter (standard lean-spec pattern).

---

## Template format & front-matter

| Option | Description | Selected |
|--------|-------------|----------|
| Only story.md gets front-matter | Only programmatic consumer | ✓ |
| story.md + epic.md + bug-report.md | Consistent across spec types | |
| All templates get minimal front-matter | Fully uniform | |

**User's choice:** Only story.md — no front-matter in other templates.

| Option | Description | Selected |
|--------|-------------|----------|
| lean-spec generic: Overview, Design, Plan, Test, Notes | Same structure across all | ✓ |
| CPS-specific sections per doc type | Tailored to CPS artifacts | |
| Minimal scaffold: just headings | Placeholder-only | |

**User's choice:** lean-spec body structure for all templates including story.md.

| Option | Description | Selected |
|--------|-------------|----------|
| CPS story format: Story (As a/I want/so that), ACs, Tasks, Dev Notes | Matches BMAD pattern | |
| lean-spec generic: Overview, Design, Plan, Test, Notes | Same structure as all templates | ✓ |

**User's choice:** lean-spec generic sections for story.md (consistent with other templates).

---

## Copy source vs. write fresh

| Option | Description | Selected |
|--------|-------------|----------|
| Write fresh following lean-spec body structure | No existing source matches | ✓ |
| Copy from BMAD templates and adapt | lean-spec BMAD templates available | |
| Copy from CPSBok docs | May have CPS-standard templates | |

**User's choice:** Write fresh for phase, deliverable templates.

| Option | Description | Selected |
|--------|-------------|----------|
| Write fresh — no existing source | | ✓ |
| Check old-acps helps/ directory | May have report-like docs | |
| Claude's discretion | | |

**User's choice:** Write fresh for report templates.

---

## Report template depth

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal scaffold: headings + placeholder comments | acps-report fills content | ✓ |
| Guided prompts: headings + instructional text | More opinionated but standalone-useful | |
| Full examples with dummy data | Clearest on intent | |

**User's choice:** Minimal scaffold — headings + `<!-- placeholder -->` comments.

| Option | Description | Selected |
|--------|-------------|----------|
| Different rhythms per cadence | Daily=tactical, Weekly=strategic | ✓ |
| Same sections for all 4, different time scopes | Simpler to maintain | |
| Claude's discretion | | |

**User's choice:** Different rhythms — daily is tactical, weekly/monthly/quarterly are progressively more strategic.

---

## Claude's Discretion

- Exact section names within each report template
- Placeholder comment wording within templates
- Whether to add a `Notes` section at the bottom of all templates

## Deferred Ideas

None — discussion stayed within phase scope.
