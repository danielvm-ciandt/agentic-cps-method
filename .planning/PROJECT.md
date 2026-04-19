# Agentic CPS Method

## What This Is

A standalone, installable methodology package (`acps`) that delivers the CI&T CPS framework as Claude Code skills — installable via `npx acps@latest` across 10 AI IDEs. It gives agentic software teams CPS discipline (phases, iterations, epics, homologation) with GSD's practical workflow rhythm, writing state into lean-spec's UI. No framework, no server — pure Markdown + JSON skills consumed by the host IDE's AI.

## Core Value

CPS methodology discipline (branch → discuss → spec → plan → execute → homologate) available as installable AI IDE skills that feel like GSD commands — so teams using AI agents get enterprise methodology without changing how they work.

## Requirements

### Validated

- [x] Repo foundation: package.json (`acps`), bin entrypoint, README, CI/CD (ci.yml + release.yml), semantic-release — Validated in Phase 1: Foundation & Docs
- [x] Methodology docs: 3 phase docs, 9 CPS practice docs, 5 workflow docs, gates.md, getting-started.md, 5 standards docs — Validated in Phase 1: Foundation & Docs

### Active

- [ ] 14 templates in lean-spec format (specs, phases, deliverables, reports) with sessions[] telemetry schema in story template
- [ ] 5 Setup Phase skills: acps-init, acps-vision, acps-backlog, acps-architecture, acps-project-roadmap
- [ ] 6 GSD Loop skills: acps-branch, acps-discuss, acps-spec, acps-plan, acps-execute, acps-homologate
- [ ] 14 Delivery & Management skills: acps-deliverable, acps-gate, acps-status, acps-report, acps-new-epic, acps-new-story, acps-new-bug, acps-bug-fix, acps-new-iteration, acps-pr, acps-pause, acps-resume, acps-note, acps-help
- [ ] Installer: `bin/install.js` — Node.js 24 ESM, interactive prompts, non-interactive flags, 10 IDE destinations
- [ ] Scope & Change Management: acps-change-request, acps-scope-manager with change-log.md ledger
- [ ] Project Intelligence: acps-document-project, acps-scan, acps-code-map

### Out of Scope

- npm publish — GitHub Releases only for v1 (no npm registry)
- REST API or web server — cockpit lives in `agentic-cps-web` (separate repo)
- `agentic-cps-web` SvelteKit cockpit — built after method ships v1.0.0
- v2+ spec backends (GitHub Issues, Azure DevOps, Jira) — v1 is Markdown only

## Context

- **Old reference repo:** `/Users/danielvm/Sites/old-agentic-cps-method` — has existing `docs/`, `bin/install.js`, and other artifacts. Prefer copying over creating where equivalent content exists.
- **lean-spec** (`/Users/danielvm/Sites/lean-spec`) — the original inspiration. Tool-agnostic spec framework with skill format, `leanspec` CLI, BMAD skills, and a SvelteKit UI (`packages/ui/`). The `acps` skill format and `leanspec` CLI integration are modeled directly on this codebase. Reference it for: skill SKILL.md/workflow.md patterns, CLI conventions, template body structure, and the web UI component architecture (for `agentic-cps-web`).
- **Source references:** CPSBok at `/Users/danielvm/Sites/CPSBok`, GSD at `/Users/danielvm/Sites/get-shit-done`, ScopeCounting at `/Users/danielvm/Sites/ScopeCounting`.
- **Skill format:** Each skill has `SKILL.md` (YAML frontmatter + user instructions) + `workflow.md` (XML-style steps). All skills write state via `leanspec` CLI.
- **Story telemetry:** YAML front-matter captures per-session `sessions[]` (command, timestamps, duration_ms, tokens, model) + `totals` block computed at homologation — feeds web UI metrics.
- **5 iterations planned**, each merges to `iteration/N` branch, tags `v0.N.0`, with `v1.0.0` at M-Iter-5 completion.
- **M-Iter-1 already planned** (EP-M01 Foundation + EP-M02 Methodology docs) and appears to be the starting point for execution.

## Constraints

- **Tech stack**: Node.js ≥24 ESM only for installer — no framework, no production runtime
- **Dependencies**: `@inquirer/prompts` only production dep; `markdownlint-cli` + `semantic-release` plugins as devDeps
- **Releases**: semantic-release on push to `main` only; no npm publish in v1
- **Skill format**: Must follow lean-spec SKILL.md + workflow.md pattern exactly
- **State**: All skills write state via `leanspec` CLI — adapter-agnostic

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| No framework in method repo | Skills are static Markdown+JSON; framework adds complexity with zero user value | — Pending |
| `acps` as npm package name | Short, available, matches CLI feel | — Pending |
| Markdown-only spec backend for v1 | Zero config, works everywhere; GitHub Issues/ADO/Jira deferred to v2+ | — Pending |
| Copy from old repo when content exists | Avoid rewriting what already works; old repo has docs/ and bin/ | — Pending |
| semantic-release branch mode | Stable releases on `main`; no snapshot/pre-release complexity for v1 | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-19 — Phase 1 complete*
