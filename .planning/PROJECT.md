# Agentic CPS Method

## What This Is

A standalone, installable methodology package (`acps`) that delivers the CI&T CPS framework as Claude Code skills — installable via `npx acps@latest` across 10 AI IDEs. It gives agentic software teams CPS discipline (phases, iterations, epics, homologation) with GSD's practical workflow rhythm, writing state into lean-spec's UI. No framework, no server — pure Markdown + JSON skills consumed by the host IDE's AI.

## Core Value

CPS methodology discipline (branch → discuss → spec → plan → execute → homologate) available as installable AI IDE skills that feel like GSD commands — so teams using AI agents get enterprise methodology without changing how they work.

## Requirements

### Validated

- ✓ Repo foundation: package.json (`acps`), bin entrypoint, README, CI/CD (ci.yml + release.yml), semantic-release — v1.0
- ✓ Methodology docs: 3 phase docs, 9 CPS practice docs, 5 workflow docs, gates.md, getting-started.md, 5 standards docs — v1.0
- ✓ 14 templates in lean-spec format (specs, phases, deliverables, reports) with sessions[] telemetry schema in story template — v1.0
- ✓ 5 Setup Phase skills: acps-init, acps-vision, acps-backlog, acps-architecture, acps-project-roadmap — v1.0
- ✓ 6 GSD Loop skills: acps-branch, acps-discuss, acps-spec, acps-plan, acps-execute, acps-homologate — v1.0
- ✓ 14 Delivery & Management skills: acps-deliverable, acps-gate, acps-status, acps-report, acps-new-epic, acps-new-story, acps-new-bug, acps-bug-fix, acps-new-iteration, acps-pr, acps-pause, acps-resume, acps-note, acps-help — v1.0
- ✓ Installer: `bin/install.js` — Node.js 24 ESM, interactive prompts, non-interactive flags, 10 IDE destinations — v1.0
- ✓ Scope & Change Management: acps-change-request, acps-scope-manager with change-log.md ledger — v1.0
- ✓ Project Intelligence: acps-document-project, acps-scan, acps-code-map — v1.0

### Active

*(No active requirements — v1.1 requirements to be defined via /gsd-new-milestone)*

### Out of Scope

- npm publish — GitHub Releases only for v1 (no npm registry)
- REST API or web server — cockpit lives in `agentic-cps-web` (separate repo)
- `agentic-cps-web` SvelteKit cockpit — built after method ships v1.0.0
- v2+ spec backends (GitHub Issues, Azure DevOps, Jira) — v1 is Markdown only

## Context

**v1.0 shipped 2026-04-20:** 30 skills, 14 templates, full installer for 10 IDEs, scope & intelligence layer. Built in 3 days across 5 phases and 30 plans (206 files, 33,820 lines).

- **Tech stack:** Node.js 24 ESM installer only; method is pure Markdown + JSON
- **Skills:** 30 skills across `skills/`, each with SKILL.md + workflow.md (thin delegating pattern)
- **Install:** `npx acps@latest` — interactive (prompts) and non-interactive (`--claude --global` flags)
- **Old reference repo:** `/Users/danielvm/Sites/old-agentic-cps-method` — has original `docs/`, `bin/install.js`
- **lean-spec** (`/Users/danielvm/Sites/lean-spec`) — direct inspiration for skill format, CLI, templates
- **Source references:** CPSBok at `/Users/danielvm/Sites/CPSBok`, GSD at `/Users/danielvm/Sites/get-shit-done`, ScopeCounting at `/Users/danielvm/Sites/ScopeCounting`
- **Story telemetry:** YAML front-matter captures per-session `sessions[]` (command, timestamps, duration_ms, tokens, model) + `totals` block computed at homologation
- **5 iterations planned**, each merges to `iteration/N` branch, tags `v0.N.0`, with `v1.0.0` at M-Iter-5 completion

## Constraints

- **Tech stack**: Node.js ≥24 ESM only for installer — no framework, no production runtime
- **Dependencies**: `@inquirer/prompts` only production dep; `markdownlint-cli` + `semantic-release` plugins as devDeps
- **Releases**: semantic-release on push to `main` only; no npm publish in v1
- **Skill format**: Must follow lean-spec SKILL.md + workflow.md pattern exactly
- **State**: All skills write state via `leanspec` CLI — adapter-agnostic

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| No framework in method repo | Skills are static Markdown+JSON; framework adds complexity with zero user value | ✓ Good — kept repo lean and portable |
| `acps` as npm package name | Short, available, matches CLI feel | ✓ Good — consistent with convention |
| Markdown-only spec backend for v1 | Zero config, works everywhere; GitHub Issues/ADO/Jira deferred to v2+ | ✓ Good — v1 ships clean |
| Copy from old repo when content exists | Avoid rewriting what already works; old repo has docs/ and bin/ | ✓ Good — saved significant time |
| semantic-release branch mode | Stable releases on `main`; no snapshot/pre-release complexity for v1 | ✓ Good — clean release flow |
| acps-init guards via .acps-config.json check | Prevents re-initialization accidents | ✓ Good — deterministic init guard |
| sessions: [] empty array literal in story.md | Canonical YAML — not null, not omitted | ✓ Good — consistent parsing |
| tokens uses nested YAML sub-keys (not dot notation) | Cleaner YAML structure | ✓ Good — readable front-matter |
| Only story.md gets YAML front-matter | epic.md has no programmatic consumer in v1 | ✓ Good — YAGNI applied |
| epics/ flat structure (not subdirectory-per-epic) | Simpler for v1 | ✓ Good — can add nesting in v2 |
| Thin SKILL.md pattern (delegate: workflow.md) | 7-line SKILL.md delegates to workflow.md; keeps skill entry point minimal | ✓ Good — all 30 skills consistent |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-22 after v1.0 milestone*
