---
phase: 02-templates
reviewed: 2026-04-19T00:00:00Z
depth: standard
files_reviewed: 15
files_reviewed_list:
  - templates/specs/epic.md
  - templates/specs/story.md
  - templates/bugs/bug-report.md
  - templates/phases/vision.md
  - templates/phases/backlog.md
  - templates/phases/architecture-package.md
  - templates/deliverables/setup-deliverable.md
  - templates/deliverables/iteration-report.md
  - templates/deliverables/value-activation-deliverable.md
  - templates/deliverables/roadmap.md
  - templates/reports/daily.md
  - templates/reports/weekly.md
  - templates/reports/monthly.md
  - templates/reports/quarterly.md
  - package.json
findings:
  critical: 0
  warning: 4
  info: 6
  total: 10
status: issues_found
---

# Phase 2: Code Review Report

**Reviewed:** 2026-04-19
**Depth:** standard
**Files Reviewed:** 15
**Status:** issues_found

## Summary

14 Markdown templates and `package.json` were reviewed. All templates pass `markdownlint-cli2` lint cleanly. The overall structure is sound: most templates correctly follow the lean-spec body convention (Overview / Design / Plan / Test / Notes). No security issues exist. The findings are structural gaps and consistency problems that would confuse a user filling out templates in a live project — missing front-matter on several templates that need it, an incomplete front-matter schema on `story.md`, a misleading section label, a missing canonical `{date}` placeholder, and a lint script glob that silently excludes the `skills/` tree.

---

## Warnings

### WR-01: `story.md` front-matter schema is incomplete — missing `story_id` population guidance and `status` field

**File:** `templates/specs/story.md:1-11`
**Issue:** The YAML front-matter block exists but is missing a `status` field that tracks the story's lifecycle state. The body (line 15) has `> **Status**: planned` as inline prose, but the front-matter has no machine-readable `status` key. This creates a split — the inline blockquote and the front-matter go out of sync as status changes, and any tooling that reads front-matter will not see the status. All other phase-level templates express status only in the body blockquote (no front-matter), while `story.md` alone has front-matter, making the inconsistency harder to spot. Additionally `story_id` is left as `""` with no hint to the user of the expected naming convention (e.g. `ep-m01/st-01`).
**Fix:** Either:
1. Add `status: planned` to the front-matter and remove the duplicate inline blockquote, or
2. Remove front-matter entirely and keep only the inline blockquote (consistent with epic, bug-report, and all phase/deliverable templates).

If front-matter is kept, also add a `story_id` example comment:

```yaml
---
story_id: "ep-XX/st-01"   # Replace XX with epic ID, 01 with story number
status: planned
sessions: []
totals:
  sessions_count: 0
  total_duration_ms: 0
  tokens:
    input: 0
    output: 0
    total: 0
---
```

---

### WR-02: `epic.md` has no front-matter but `story.md` does — inconsistent schema within the same template family

**File:** `templates/specs/epic.md:1`
**Issue:** `story.md` carries structured YAML front-matter (for session tracking), while `epic.md` in the same `specs/` family has none. If the installer or any skill reads session data from stories, users who look at `epic.md` will expect the same structure and either manually add it (incorrectly) or be confused by the asymmetry. The setup docs at `docs/phases/setup.md` call out `.planning/` artifact paths but give no guidance on front-matter, so a new user has no cue that the two files in the same directory have different schemas.
**Fix:** Either add a minimal front-matter block to `epic.md` to mirror the story schema (even if session fields stay empty), or document explicitly in a `<!-- front-matter: none -->` comment why epics do not track sessions. A comment in the template is the lower-cost option:

```markdown
<!-- No session front-matter: epics are planning artifacts, not execution units -->
# {epic_title}
```

---

### WR-03: `templates/deliverables/roadmap.md` duplicates the Setup-phase artifact path — will collide with `templates/phases/backlog.md` in practice

**File:** `templates/deliverables/roadmap.md:15-16`
**Issue:** The `docs/phases/setup.md` describes two separate planning artifacts: `backlog.md` (epics and iterations) and `roadmap.md` (BCP estimates and timeline). However, the roadmap template's `## Plan` section (lines 15-16) lists `Epic 1 / Epic 2` entries that are structurally identical to the backlog template's `## Plan` entries (lines 15-16 of `backlog.md`). A user filling both documents will have no clear understanding of what belongs in roadmap vs. backlog — both appear to be epic lists.

The `docs/phases/setup.md` gate distinguishes them: backlog = "epics named, assigned to iterations"; roadmap = "BCP or FP estimates per epic, iteration timeline". The templates do not surface that distinction clearly.

**Fix:** Differentiate the Roadmap template's `## Plan` checklist to make the timeline/milestone nature explicit:

```markdown
## Plan

- [ ] Milestone 1 — {milestone_name} — Iteration {N}-{M} — BCP: {points}
- [ ] Milestone 2 — {milestone_name} — Iteration {N}-{M} — BCP: {points}
```

And update the `## Overview` comment to say "iteration timeline and BCP baseline" rather than the generic "delivery strategy at a glance."

---

### WR-04: `package.json` lint script glob excludes `skills/` directory — lint will silently not cover skill Markdown files if that tree is added

**File:** `package.json:10`
**Issue:** The lint script is:
```
markdownlint-cli2 "docs/**/*.md" "templates/**/*.md" "*.md" "!CHANGELOG.md"
```
The CLAUDE.md project guide states that every skill lives at `skills/<name>/SKILL.md` + `skills/<name>/workflow.md`. The `skills/` directory is not covered by any glob in the script. When skills are added in a later phase, all skill Markdown will be silently excluded from lint. The developer will assume CI covers it; it will not.
**Fix:**
```json
"lint": "markdownlint-cli2 \"docs/**/*.md\" \"templates/**/*.md\" \"skills/**/*.md\" \"*.md\" \"!CHANGELOG.md\""
```

---

## Info

### IN-01: `templates/reports/daily.md` — no `{date}` placeholder in the body comment, date only in H1

**File:** `templates/reports/daily.md:1`
**Issue:** The H1 heading has `{date}` which is correct for the filename/title, but the sections "Tomorrow" and "Today's Work" give no indication to the user how to record the date of the session referenced. Minor usability gap — not a bug, but users copying this template manually may forget to fill the H1.
**Fix:** Add a one-line front-matter or a visible fill-in hint such as `> **Date**: {YYYY-MM-DD}` directly below the H1, consistent with how other templates show their metadata inline.

---

### IN-02: `templates/reports/monthly.md` and `templates/reports/quarterly.md` — missing `## Notes` section present in other templates

**File:** `templates/reports/monthly.md:1`, `templates/reports/quarterly.md:1`
**Issue:** The `daily.md` and `weekly.md` report templates omit `## Notes` intentionally (they are lightweight). However the monthly and quarterly reports are more substantial documents that parallel the deliverable templates. The deliverable templates (`setup-deliverable.md`, `iteration-report.md`, `value-activation-deliverable.md`) all end with `## Notes`. The monthly and quarterly reports do not, making the family inconsistent and leaving no designated place for open questions or carry-forward items in longer-cycle reports.
**Fix:** Append a `## Notes` section to both templates:

```markdown
## Notes

<!-- Carry-forward items, open risks, decisions deferred to next period -->
```

---

### IN-03: `templates/specs/bug-report.md` — "Design" section label is misleading for a bug template

**File:** `templates/bugs/bug-report.md:9`
**Issue:** The lean-spec body convention uses `## Design` to mean technical approach and decisions. In a bug report, "Design" is not a natural label — users will hesitate over whether to record "root cause analysis" or "fix design" there. The comment partially compensates (`Root cause analysis and proposed fix approach`) but the heading itself reads as out-of-place for a bug artifact.
**Fix:** Consider renaming to `## Analysis` for the bug-report template only, since it is a standalone template file not shared with story.md:

```markdown
## Analysis

<!-- Root cause analysis and proposed fix approach -->
```

This matches what practitioners expect from a bug-tracking document and removes ambiguity without breaking any structural contract.

---

### IN-04: `templates/phases/backlog.md` — `## Plan` checklist uses `{points}` placeholder without defining unit

**File:** `templates/phases/backlog.md:15-16`
**Issue:** The placeholder `BCP: {points}` gives no hint about what unit `{points}` is. In the acps docs, BCP (Business Complexity Points) is the unit, but a new user filling this template may write story points, hours, or some other measure. The same issue appears in `templates/deliverables/roadmap.md:15-16`.
**Fix:** Add a comment or example value that anchors the unit:

```markdown
- [ ] Epic 1: {title} — BCP: {N}   <!-- BCP = Business Complexity Points, integer -->
```

---

### IN-05: `templates/deliverables/iteration-report.md` — `## Plan` section describes meta-checklist items about the report itself, not the iteration's plan

**File:** `templates/deliverables/iteration-report.md:15-17`
**Issue:** In the lean-spec body convention, `## Plan` records the work plan for the artifact. In `iteration-report.md`, the checklist items are about whether the report itself is complete ("All completed stories listed", "BCP actuals recorded"). This is closer to a `## Test` checklist (does this document meet its criteria?) than a plan. The `## Test` section (lines 21-23) then repeats a similar completeness check. The two sections blur together, which will confuse users trying to fill out the report.
**Fix:** Reframe `## Plan` as the iteration's actual delivery plan (what was planned going into the iteration), and let `## Test` remain the "is this report complete" checklist:

```markdown
## Plan

<!-- Paste the iteration plan here: list stories that were planned for this iteration -->

- [ ] Story: {title} — planned BCP: {N}
```

---

### IN-06: `templates/specs/epic.md` has no `{date}` or `{epic_id}` placeholder — user has no cue for ID convention

**File:** `templates/specs/epic.md:1`
**Issue:** All other templates include at least a `{project_name}` or `{date}` placeholder. `epic.md` has only `{epic_title}` in the H1. The `docs/phases/production-flow.md` uses epic IDs (`ep-m01`, `ep-XX`) extensively in branch naming and commit conventions, but the epic template gives no cue that the file should carry an ID. A user who creates this file as `epic.md` without knowing the naming convention will name branches incorrectly.
**Fix:** Add an inline metadata line below the H1 to surface the expected fields:

```markdown
# {epic_title}

> **Epic ID**: {ep-XX} · **Iteration**: {N} · **Status**: planned
```

---

_Reviewed: 2026-04-19_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
