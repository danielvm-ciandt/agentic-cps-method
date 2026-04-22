# Retrospective: Agentic CPS Method

## Milestone: v1.0 — MVP

**Shipped:** 2026-04-20
**Archived:** 2026-04-22
**Phases:** 5 | **Plans:** 30 | **Timeline:** 3 days

### What Was Built

1. npm package scaffold (`acps`) with CI/CD, semantic-release, markdownlint gate
2. 14 methodology docs — CPS phases, 9 practices, 5 workflows, gates, getting-started, 5 standards
3. 14 lean-spec templates — specs (with story telemetry YAML schema), bugs, phases, deliverables, reports
4. 11 core CPS skills — full inner loop (init → branch → discuss → spec → plan → execute → homologate)
5. 14 delivery & management skills — gate, status, pause/resume, artifact creation, bug-fix, PR, deliverable, report, utilities
6. Interactive `npx acps@latest` installer for 10 AI IDEs (global + local modes, non-interactive flags)
7. 5 scope & intelligence skills — BCP/FP ledger (change-request, scope-manager) + codebase intelligence (document-project, scan, code-map)

### What Worked

- **Thin SKILL.md pattern:** 7-line SKILL.md delegating to workflow.md gave all 30 skills a consistent structure — the pattern was established early (Phase 3) and held through Phase 5 with zero drift
- **Copy-from-old-repo strategy:** Sourcing docs/ and bin/ from the old repo avoided significant rewrite time; content was already validated
- **Coarse granularity + yolo mode:** Batching 3-4 skills per plan kept context overhead low; plans executed in ~5 min average
- **lint gate per phase:** Running markdownlint at each phase boundary caught formatting issues early and kept CI green throughout
- **Conventional commits discipline:** Consistent `feat/fix/docs/chore` prefix with phase scope made the git log readable and semantic-release ready

### What Was Inefficient

- **Requirements tracking not maintained:** REQUIREMENTS.md checkboxes were only updated for 3/48 requirements during execution — most phases didn't update tracking. Required manual reconciliation at milestone close.
- **VERIFICATION.md human_needed status never resolved:** All 5 phase verification files left at `human_needed` — the human sign-off step was deferred each time. Accumulated into 7 open items at close.
- **UAT scenarios not driven to completion:** Two UAT files left in partial/testing state; no dedicated session was allocated to drive scenarios to pass/fail.
- **STATE.md performance metrics drifted:** Velocity table only captured Phase 1–3 data; Phases 4–5 not tracked. Total plans shows 18 instead of actual 30.

### Patterns Established

- **Thin SKILL.md:** `name:`, `description:`, `version:`, `delegate: workflow.md`, one-line instruction — canonical for all skills
- **XML workflow structure:** `<workflow>` wrapping numbered `<step name="...">` blocks — consistent across all 30 skills
- **Phase verification flow:** PLAN → execute → REVIEW.md → VERIFICATION.md → lint gate → human checkpoint
- **sessions[] empty array literal:** Canonical YAML in story.md front-matter (not null, not omitted)
- **epics/ flat structure:** Single-level directory; no subdirectory-per-epic overhead for v1

### Key Lessons

- **Track requirements as you go, not at close:** Updating REQUIREMENTS.md checkboxes per plan (30 seconds each) avoids the reconciliation debt at milestone close
- **Schedule human sign-off as a discrete task:** Don't treat VERIFICATION.md human_needed as "will do later" — block dedicated time in the same session
- **UAT is a first-class phase artifact:** MILESTONE-UAT.md with 10 pending scenarios is a deferred liability; drive it to done before the lint gate plan
- **Metrics need active maintenance:** If you want velocity data, update STATE.md at each plan completion — retroactive reconstruction from git log is lossy

### Cost Observations

- Sessions: ~3 primary sessions across 3 days
- Average plan duration: ~5 min (yolo mode, coarse granularity, balanced model profile)
- Total execution: ~90 min for 30 plans
- Notable: coarse granularity (3-4 skills per plan) was the right call — fine granularity would have tripled session overhead with no quality benefit for Markdown-only work

---

## Cross-Milestone Trends

| Metric | v1.0 |
|--------|------|
| Phases | 5 |
| Plans | 30 |
| Avg min/plan | ~5 |
| Files changed | 206 |
| Lines added | ~33,820 |
| Days to ship | 3 |
| Requirements tracked at close | 3/48 (6%) |
| UAT completion at close | 0% (deferred) |
