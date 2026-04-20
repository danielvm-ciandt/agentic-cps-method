# Phase 2: Templates - Research

**Researched:** 2026-04-19
**Domain:** Markdown template authoring — lean-spec body structure, YAML front-matter, CPS artifact formats
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** `sessions[]` entries capture: `command`, `started_at`, `finished_at`, `duration_ms`, `model`, `tokens.input`, `tokens.output`, `tokens.total`, `git_branch`, `plan_id` (optional), `story_id`
- **D-02:** `totals` block (computed at homologation): `sessions_count`, `total_duration_ms`, `tokens.input`, `tokens.output`, `tokens.total`
- **D-03:** Telemetry YAML lives in the `---` front-matter block at the top of story.md
- **D-04:** Only `story.md` gets YAML front-matter. All other templates are plain Markdown.
- **D-05:** All templates follow lean-spec body structure: Overview, Design, Plan, Test, Notes
- **D-06:** Phase, deliverable, and report templates are written fresh (no copy source)
- **D-07:** `templates/specs/epic.md` and `templates/bugs/bug-report.md` are written fresh in lean-spec body format
- **D-08:** All report templates use minimal scaffold: headings + placeholder comments only
- **D-09:** Reports have different rhythms per cadence:
  - `daily.md` — Today's Work, Blockers, Tomorrow
  - `weekly.md` — Iteration Progress, Metrics, Completed Stories, Next Week
  - `monthly.md` — Iteration Summary, Key Deliverables, Retrospective Notes
  - `quarterly.md` — Milestone Progress, Value Delivered, Scope Health, Next Quarter

### Claude's Discretion

- Exact section names within each report template (as long as they fit the cadence rhythm above)
- Placeholder comment wording within templates
- Whether to add a `Notes` section at the bottom of all templates

### Deferred Ideas (OUT OF SCOPE)

- None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| TMPL-01 | `templates/specs/epic.md` in lean-spec format (Overview, Requirements checklist, Non-goals, Acceptance criteria) | lean-spec spec-template.md body structure confirmed; write fresh per D-07 |
| TMPL-02 | `templates/specs/story.md` with YAML front-matter capturing `sessions[]` and `totals` block | YAML schema locked in D-01/D-02/D-03; body sections follow lean-spec per D-05 |
| TMPL-03 | `templates/bugs/bug-report.md` in lean-spec format | lean-spec body structure applies; write fresh per D-07 |
| TMPL-04 | `templates/phases/` has vision.md, backlog.md, architecture-package.md | Write fresh per D-06; follow lean-spec body structure |
| TMPL-05 | `templates/deliverables/` has setup-deliverable.md, iteration-report.md, value-activation-deliverable.md, roadmap.md | Write fresh per D-06; minimal scaffold per D-08 |
| TMPL-06 | `templates/reports/` has daily.md, weekly.md, monthly.md, quarterly.md | Write fresh per D-06; cadence rhythms locked in D-09; minimal scaffold per D-08 |
</phase_requirements>

---

## Summary

Phase 2 creates 14 Markdown template files across 5 directories under `templates/`. The work is pure file authoring — no code, no dependencies, no external services. The lean-spec `spec-template.md` body structure (Overview, Design, Plan, Test, Notes) is the canonical form to follow for all templates except those whose content requirements deviate (epic, bug-report have their own prescribed sections per TMPL-01/TMPL-03).

The only programmatically-consumed template is `story.md`, which requires YAML front-matter with `sessions[]` array entries and a `totals` block. All decisions about the schema are locked in CONTEXT.md (D-01 through D-03). Every other template is plain Markdown — no front-matter.

The entire phase is self-contained: no templates directory exists yet, no existing content to migrate, and the lint CI script does not cover `templates/`, so templates are not subject to markdownlint constraints. The single operational risk is the lint coverage gap — the planner should note that the lint script may need expanding to include `templates/**/*.md` or intentionally leave it uncovered.

**Primary recommendation:** Create the `templates/` directory tree and all 14 files in a single logical wave. Group by template type: specs pair (2 files), bugs (1 file), phases group (3 files), deliverables group (4 files), reports group (4 files). Each group is one atomic commit.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Template file authoring | Filesystem (static content) | — | Pure Markdown files; no runtime component |
| YAML front-matter schema | story.md file | acps-execute / acps-homologate skills (Phase 3) | Schema defined here; read/write logic lives in Phase 3 skills |
| Template consumption | acps-* skills (Phase 3+4) | — | Skills use these files as copy sources; templates don't self-execute |
| Lint compliance | CI (if script extended) | — | Currently lint only covers docs/ and root *.md; templates/ is uncovered |

## Standard Stack

### Core

| Item | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| Markdown | CommonMark | Template file format | Project is pure Markdown + JSON, no framework |
| YAML front-matter | YAML 1.1 (Jekyll-style `---` delimiters) | story.md telemetry schema | Used by lean-spec CLI and web UI; standard in static-site/doc tooling |

### Supporting

| Item | Version | Purpose | When to Use |
|------|---------|---------|-------------|
| HTML comments `<!-- -->` | — | Placeholder text in templates | All templates — preferred over removing sections or leaving blank |
| markdownlint-cli2 | ^0.22.0 (already installed) | Lint consistency | If templates are added to lint scope |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| HTML comments for placeholders | Freeform text like `[placeholder]` | Comments are invisible when rendered; bracket syntax renders as text and looks unfinished |
| YAML front-matter for all templates | No front-matter | D-04 is locked: only story.md gets front-matter |

**Installation:** No new dependencies required for this phase.

## Architecture Patterns

### System Architecture Diagram

```
  User invokes acps-* skill
           |
           v
  Skill reads template file     <-- Phase 2 creates these files
  (templates/<type>/<file>.md)
           |
           v
  Skill fills placeholders / appends data
           |
           v
  Output written to .planning/ in target project
```

### Recommended Project Structure

```
templates/
├── specs/
│   ├── epic.md              # lean-spec body structure (no front-matter)
│   └── story.md             # YAML front-matter + lean-spec body
├── bugs/
│   └── bug-report.md        # lean-spec body structure (no front-matter)
├── phases/
│   ├── vision.md            # lean-spec body structure
│   ├── backlog.md           # lean-spec body structure
│   └── architecture-package.md  # lean-spec body structure
├── deliverables/
│   ├── setup-deliverable.md
│   ├── iteration-report.md
│   ├── value-activation-deliverable.md
│   └── roadmap.md
└── reports/
    ├── daily.md
    ├── weekly.md
    ├── monthly.md
    └── quarterly.md
```

### Pattern 1: lean-spec body structure (plain Markdown templates)

**What:** Every non-story template follows the Overview/Design/Plan/Test/Notes section order, using HTML comments as placeholder text.

**When to use:** All 13 non-story templates (epic, bug-report, all phase, all deliverable, all report templates).

**Example (from `/Users/danielvm/Sites/lean-spec/.lean-spec/templates/spec-template.md`):**
```markdown
# {name}

> **Status**: {status} · **Priority**: {priority} · **Created**: {date}

## Overview

<!-- What are we solving? Why now? -->

## Design

<!-- Technical approach, architecture decisions -->

## Plan

- [ ] Task 1
- [ ] Task 2

## Test

- [ ] Test criteria 1

## Notes

<!-- Optional: Research findings, alternatives considered, open questions -->
```

**Note for report templates:** The Report section names replace Overview/Design/Plan/Test with cadence-appropriate names per D-09. The Notes section may be included at Claude's discretion.

**Note for TMPL-01 (epic.md):** Requirements specify Overview, Requirements checklist, Non-goals, Acceptance criteria — this deviates from the default lean-spec section order. The planner should use these prescribed sections rather than the generic template.

### Pattern 2: story.md YAML front-matter

**What:** story.md has `---`-delimited YAML at the top capturing telemetry state. The body follows lean-spec structure after the closing `---`.

**When to use:** Only `templates/specs/story.md`.

**Schema (from CONTEXT.md D-01 through D-03):**
```yaml
---
story_id: ""
sessions:
  - command: ""
    started_at: ""
    finished_at: ""
    duration_ms: 0
    model: ""
    tokens:
      input: 0
      output: 0
      total: 0
    git_branch: ""
    plan_id: ""
totals:
  sessions_count: 0
  total_duration_ms: 0
  tokens:
    input: 0
    output: 0
    total: 0
---
```

**Integration points:**
- `acps-execute` (Phase 3) — appends a new entry to `sessions[]` on each run
- `acps-homologate` (Phase 3) — computes and writes the `totals` block after all sessions are complete

### Pattern 3: lean-spec YAML front-matter (for reference — NOT used in acps templates)

**What:** The lean-spec CLI writes front-matter with status lifecycle fields (`status`, `created_at`, `updated_at`, `transitions[]`, `completed_at`) to its spec README.md files.

**When to use:** This is lean-spec's own schema, not the acps schema. Documented here so the planner knows acps intentionally uses a different YAML shape.

```yaml
---
status: planned
created: '2026-04-19'
tags: []
priority: medium
created_at: '2026-04-19T10:00:00Z'
updated_at: '2026-04-19T10:00:00Z'
transitions: []
---
```

The acps `story.md` front-matter does NOT include lean-spec lifecycle fields — it is a telemetry schema, not a spec status schema.

### Anti-Patterns to Avoid

- **Using lean-spec status lifecycle fields in acps templates:** acps YAML is telemetry (sessions/tokens/timing), not spec status. Do not copy lean-spec's `transitions[]`, `status`, `priority` fields into acps story.md.
- **Adding front-matter to non-story templates:** D-04 is locked — only story.md gets YAML. Adding `---` blocks to epic.md or phase templates creates noise and inconsistency.
- **Using bracket placeholders `[placeholder]`:** These render as visible text in Markdown viewers. Use HTML comments `<!-- placeholder text -->` instead.
- **Using emoji in template content:** Project CLAUDE.md explicitly prohibits emoji unless requested. Templates are shipped content — no emoji.
- **Making report templates verbose:** D-08 says minimal scaffold only. Resist the urge to pre-fill content — the `acps-report` skill fills it.
- **Incorrect section order for epic.md:** TMPL-01 specifies Overview, Requirements checklist, Non-goals, Acceptance criteria — not the generic Overview/Design/Plan/Test.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| YAML parsing/validation | Custom YAML parser | Standard YAML libraries (Phase 3 concern) | Phase 2 only creates the template file; parsing is Phase 3 skill work |
| Template engine / variable substitution | Custom `{{var}}` substitution in templates | Skills read the file and populate at runtime | Phase 2 is static Markdown — no runtime processing needed here |

**Key insight:** This phase is content authoring, not engineering. There is nothing to build beyond the text of 14 Markdown files. All complexity (reading, writing, parsing YAML) is deferred to Phase 3 skills.

## Common Pitfalls

### Pitfall 1: Lint coverage gap for templates/

**What goes wrong:** The current lint script (`"lint": "markdownlint-cli2 \"docs/**/*.md\" \"*.md\" \"!CHANGELOG.md\""`) does NOT cover `templates/**/*.md`. Templates can contain Markdown lint violations that CI won't catch.

**Why it happens:** The lint script was written in Phase 1 for docs/ only. `templates/` did not exist.

**How to avoid:** Either (a) extend the lint script to include `"templates/**/*.md"` in Phase 2, or (b) consciously accept that templates are not linted. Option (a) is recommended for consistency.

**Warning signs:** A malformed template (e.g., missing ATX heading space, unclosed code block) would be committed without any CI warning.

### Pitfall 2: Treating TMPL-01 as a generic lean-spec template

**What goes wrong:** Requirements explicitly prescribe sections for epic.md: "Overview, Requirements checklist, Non-goals, Acceptance criteria." Using the generic lean-spec sections (Overview, Design, Plan, Test, Notes) creates a mismatch with what `acps-new-epic` will expect in Phase 3.

**Why it happens:** The lean-spec body structure is the default pattern but is not universal. TMPL-01 has different downstream consumers.

**How to avoid:** Follow REQUIREMENTS.md TMPL-01 spec exactly for epic.md. Use generic lean-spec sections only where requirements do not prescribe specific sections.

### Pitfall 3: Confusing nested YAML keys with dot notation in front-matter

**What goes wrong:** Writing `tokens.input: 0` as a flat key instead of proper nested YAML:
```yaml
# WRONG
tokens.input: 0

# CORRECT
tokens:
  input: 0
```

**Why it happens:** D-01 describes the schema using dot notation (`tokens.input`, `tokens.output`, `tokens.total`) which is a description format, not YAML syntax.

**How to avoid:** Always use proper YAML nesting for the `tokens` sub-object in both `sessions[]` entries and the `totals` block.

### Pitfall 4: Empty `sessions` array vs. missing key

**What goes wrong:** Omitting the `sessions:` key entirely from story.md front-matter, or using `sessions: null`. The `acps-execute` skill in Phase 3 will append to this array — it must exist as an empty array `[]`.

**Why it happens:** Template authors may leave the key out thinking "it starts empty anyway."

**How to avoid:** story.md front-matter must include `sessions: []` (empty array, not null or missing).

### Pitfall 5: story.md body missing lean-spec sections

**What goes wrong:** story.md only gets YAML front-matter but the body is left with BMAD-style sections (Story, Acceptance Criteria, Tasks/Subtasks). D-05 mandates lean-spec body structure for ALL templates including story.md.

**Why it happens:** The BMAD template.md from lean-spec shows a different section structure; it's tempting to use it as the story body.

**How to avoid:** After the closing `---` of story.md front-matter, follow lean-spec sections: Overview, Design, Plan, Test, Notes. The BMAD template is a reference only for AC/tasks patterns within those sections.

## Code Examples

### story.md complete structure

Source: CONTEXT.md D-01/D-02/D-03 + lean-spec spec-template.md body [VERIFIED: local file read]

```markdown
---
story_id: ""
sessions: []
totals:
  sessions_count: 0
  total_duration_ms: 0
  tokens:
    input: 0
    output: 0
    total: 0
---

# {story_title}

> **Status**: planned

## Overview

<!-- Describe what this story delivers and why -->

## Design

<!-- Technical approach and decisions -->

## Plan

- [ ] Task 1
- [ ] Task 2

## Test

- [ ] Acceptance criteria 1
- [ ] Acceptance criteria 2

## Notes

<!-- Research findings, references, open questions -->
```

### story.md — sessions[] entry added by acps-execute (runtime, not template)

Source: CONTEXT.md D-01 [VERIFIED: local file read]

```yaml
sessions:
  - command: "acps-execute"
    started_at: "2026-04-19T10:00:00Z"
    finished_at: "2026-04-19T10:45:00Z"
    duration_ms: 2700000
    model: "claude-opus-4-5"
    tokens:
      input: 12500
      output: 8300
      total: 20800
    git_branch: "feat/epic-m03/iter-2"
    plan_id: "02-01-PLAN"
    story_id: "m03.01"
```

### epic.md structure (per TMPL-01 prescription)

Source: REQUIREMENTS.md TMPL-01 [VERIFIED: local file read]

```markdown
# {epic_title}

> **Status**: planned

## Overview

<!-- What is this epic solving? Business context and value. -->

## Requirements

- [ ] Requirement 1
- [ ] Requirement 2

## Non-goals

<!-- What this epic explicitly does NOT do -->

## Acceptance Criteria

- [ ] AC 1
- [ ] AC 2

## Notes

<!-- Optional: open questions, deferred ideas, references -->
```

### report template structure (daily.md example — minimal scaffold per D-08)

Source: CONTEXT.md D-08/D-09 [VERIFIED: local file read]

```markdown
# Daily Report — {date}

## Today's Work

<!-- List completed stories, tasks, and commits from today -->

## Blockers

<!-- Active blockers and their impact -->

## Tomorrow

<!-- Priority items for the next session -->
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| BMAD story template (no front-matter, custom sections) | lean-spec body + YAML telemetry front-matter | acps design (2026) | acps-execute/homologate can parse structured telemetry without custom parsers |
| Generic spec format | lean-spec Overview/Design/Plan/Test/Notes | lean-spec convention | Consistent authoring pattern across all artifact types |

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | YAML 1.1 `---` delimiter front-matter will be parseable by the leanspec CLI and web UI | Architecture Patterns (story.md schema) | Downstream CLI/UI may require a different YAML dialect or delimiter; verify in Phase 3 when skills are built |
| A2 | `templates/` being outside the markdownlint lint glob is acceptable for v1 (or the planner adds it) | Common Pitfalls | Lint violations in templates go undetected; low severity for static content |

## Open Questions (RESOLVED)

1. **Should `templates/**/*.md` be added to the lint script?**
   - What we know: Current lint script covers `docs/**/*.md` and root `*.md` only
   - What's unclear: Whether the project owner wants templates linted for Markdown consistency
   - Recommendation: Extend the lint script in the plan as a first task; easy to do, prevents quality drift
   - **RESOLVED:** Yes — plan 02-05/T1 extends the lint glob to `"docs/**/*.md", "templates/**/*.md", "*.md"`.

2. **Should story.md front-matter include a `status` field?**
   - What we know: lean-spec uses `status` in all its spec front-matter; acps CONTEXT.md does not list `status` in D-01/D-02
   - What's unclear: Whether `acps-homologate` needs a `status` field in YAML to mark a story complete vs. just in the Markdown body
   - Recommendation: Leave out for now per D-04 (only telemetry fields locked in CONTEXT.md); add in Phase 3 if acps-homologate requires it
   - **RESOLVED:** No status field — CONTEXT.md D-04 locks story.md front-matter to telemetry fields only (sessions[], totals). Defer to Phase 3 if acps-homologate requires it.

## Environment Availability

Step 2.6: SKIPPED (no external dependencies — this phase is pure Markdown file authoring with no CLI tools, services, or databases required)

## Security Domain

Step omitted: This phase creates static Markdown template files with no authentication, no user input handling, no cryptographic operations, and no network endpoints. ASVS categories do not apply to static content authoring.

## Sources

### Primary (HIGH confidence)

- `/Users/danielvm/Sites/lean-spec/.lean-spec/templates/spec-template.md` — Canonical lean-spec body structure (Overview, Design, Plan, Test, Notes) with YAML front-matter convention [VERIFIED: local file read]
- `/Users/danielvm/Sites/lean-spec/.claude/skills/bmad-create-story/template.md` — BMAD story template body structure (Story, Acceptance Criteria, Tasks/Subtasks pattern) [VERIFIED: local file read]
- `/Users/danielvm/Sites/agentic-cps-method/.planning/phases/02-templates/02-CONTEXT.md` — All locked decisions D-01 through D-09 [VERIFIED: local file read]
- `/Users/danielvm/Sites/agentic-cps-method/.planning/REQUIREMENTS.md` — TMPL-01 through TMPL-06 exact content specifications [VERIFIED: local file read]
- `/Users/danielvm/Sites/agentic-cps-method/package.json` — Lint script scope confirmed [VERIFIED: local file read]
- `/Users/danielvm/Sites/agentic-cps-method/.markdownlint.json` — Lint rules confirmed [VERIFIED: local file read]

### Secondary (MEDIUM confidence)

- `/Users/danielvm/Sites/lean-spec/specs/*/README.md` (sample files) — Confirmed lean-spec YAML front-matter fields in practice (status, created, tags, priority, transitions) [VERIFIED: local file read]

### Tertiary (LOW confidence)

- None — all claims verified from local files

## Metadata

**Confidence breakdown:**
- Template file list (14 files, 5 directories): HIGH — directly from REQUIREMENTS.md
- lean-spec body structure: HIGH — read from actual template file
- story.md YAML schema: HIGH — locked in CONTEXT.md D-01/D-02/D-03
- Lint script scope gap: HIGH — read from package.json scripts
- BMAD vs lean-spec distinction: HIGH — read both files directly

**Research date:** 2026-04-19
**Valid until:** 2026-06-01 (stable static content — no external dependencies to expire)
