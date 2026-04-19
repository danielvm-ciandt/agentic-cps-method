# Roadmap: Agentic CPS Method

## Overview

This roadmap builds the `acps` methodology package across 5 phases that mirror the 5 planned iterations. Each phase delivers a coherent, independently verifiable capability: first the repo foundation and methodology docs, then templates, then the two skill layers (setup+loop, then delivery+installer), and finally scope management and project intelligence. The result is a fully installable CPS discipline package available via `npx acps@latest`.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation & Docs** - Repo scaffold, CI/CD, and all methodology documentation
- [ ] **Phase 2: Templates** - All lean-spec templates including story telemetry schema
- [ ] **Phase 3: Setup & Loop Skills** - 5 setup phase skills and 6 GSD loop skills (core workflow)
- [ ] **Phase 4: Delivery, Management & Installer** - 14 delivery/management skills plus the npx installer
- [ ] **Phase 5: Scope & Intelligence** - Scope/change management skills and project intelligence skills

## Phase Details

### Phase 1: Foundation & Docs
**Goal**: The repo is a valid npm package with working CI/CD and complete methodology documentation that teams can read to understand CPS
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, DOCS-01, DOCS-02, DOCS-03, DOCS-04, DOCS-05, DOCS-06
**Success Criteria** (what must be TRUE):
  1. Running `npm install` in the repo succeeds and `node bin/install.js --help` executes without error
  2. A PR to the repo triggers CI that runs markdownlint and syntax-checks `bin/install.js`
  3. Pushing to `main` creates a GitHub Release via semantic-release
  4. `docs/` contains complete methodology coverage: 3 phase docs, 9 practice docs, 5 workflow docs, gates, getting-started, and 5 standards docs
  5. A first-time reader can follow `docs/getting-started.md` from install to starting a first iteration without external references
**Plans**: 6 plans

Plans:
- [x] 01-01-PLAN.md — npm package scaffold (package.json, bin/install.js, .releaserc.json, .gitignore, markdownlint config)
- [x] 01-02-PLAN.md — GitHub Actions workflows (ci.yml + release.yml)
- [x] 01-03-PLAN.md — Docs verbatim copy (gates.md, 3 phase docs, 8 practice docs, execute.md, clean-code.md)
- [x] 01-04-PLAN.md — Docs copy + npm update (getting-started, practices 05+09, workflow 4 files, standards 4 files)
- [x] 01-05-PLAN.md — Fresh README.md (kickass-readme standard)
- [x] 01-06-PLAN.md — End-to-end verification (npm install + lint gate + human checkpoint)

### Phase 2: Templates
**Goal**: Every lean-spec artifact type has a ready-to-use template, including story telemetry YAML schema, so skills can generate consistent documents
**Depends on**: Phase 1
**Requirements**: TMPL-01, TMPL-02, TMPL-03, TMPL-04, TMPL-05, TMPL-06
**Success Criteria** (what must be TRUE):
  1. `templates/specs/` contains epic.md and story.md; story.md front-matter has `sessions[]` and `totals` blocks matching the telemetry schema
  2. `templates/bugs/bug-report.md` exists in lean-spec format
  3. `templates/phases/` and `templates/deliverables/` contain all defined phase and deliverable templates
  4. `templates/reports/` contains daily, weekly, monthly, and quarterly report templates
**Plans**: 5 plans

Plans:
- [x] 02-01-PLAN.md — Spec templates: epic.md (prescribed sections) and story.md (YAML telemetry front-matter + lean-spec body)
- [x] 02-02-PLAN.md — Bug report + phase templates: bug-report.md, vision.md, backlog.md, architecture-package.md
- [ ] 02-03-PLAN.md — Deliverable templates: setup-deliverable.md, iteration-report.md, value-activation-deliverable.md, roadmap.md
- [ ] 02-04-PLAN.md — Report templates: daily.md, weekly.md, monthly.md, quarterly.md (minimal scaffold, cadence sections)
- [ ] 02-05-PLAN.md — Lint extension (templates/**/*.md) + end-to-end verification + human checkpoint

### Phase 3: Setup & Loop Skills
**Goal**: A user can run the full CPS inner loop — init a project, capture vision, build a backlog, branch, discuss, spec, plan, execute, and homologate — entirely through `acps` skills
**Depends on**: Phase 2
**Requirements**: SETUP-01, SETUP-02, SETUP-03, SETUP-04, SETUP-05, LOOP-01, LOOP-02, LOOP-03, LOOP-04, LOOP-05, LOOP-06
**Success Criteria** (what must be TRUE):
  1. `acps-init` creates the full `.planning/` directory structure (epics/, iterations/, specs/) in any target project
  2. `acps-vision`, `acps-backlog`, `acps-architecture`, and `acps-project-roadmap` each write their respective output files following CPS chapter discipline
  3. `acps-branch` creates a semantic branch and enforces naming convention before any other loop skill runs
  4. `acps-spec` enforces the ambiguity score gate at ≤ 0.20 before allowing a story to advance
  5. `acps-execute` appends a correctly structured `sessions[]` entry to the story YAML front-matter on completion
  6. `acps-homologate` walks all acceptance criteria interactively, captures pass/fail per criterion, and writes the `totals` block; failed stories route to `acps-bug-fix`
**Plans**: TBD

### Phase 4: Delivery, Management & Installer
**Goal**: Teams can install `acps` via `npx acps@latest` into any of 10 supported IDEs, and have a full suite of delivery and management skills for epics, stories, bugs, reports, gate management, and cross-session continuity
**Depends on**: Phase 3
**Requirements**: DELIV-01, DELIV-02, DELIV-03, DELIV-04, DELIV-05, DELIV-06, DELIV-07, DELIV-08, DELIV-09, DELIV-10, DELIV-11, DELIV-12, DELIV-13, DELIV-14, INST-01, INST-02, INST-03, INST-04
**Success Criteria** (what must be TRUE):
  1. `npx acps@latest` launches an interactive installer that prompts for name, language, doc language, runtimes, location, and estimation method, then copies skills to the correct destination
  2. Non-interactive flags (`--claude --global --estimation bcp_full --lang en --doc-lang en`) complete installation without prompts
  3. Skills are correctly placed for all 10 IDEs (Claude Code, Cursor, Windsurf, Copilot, Gemini CLI, Cline, Augment, OpenCode, Codex, Trae) in both global and local modes
  4. Installation writes `.acps-config.json` to the project root with version, name, languages, estimation, runtimes, location, and `installed_at`
  5. `acps-gate` lists current blockers and locks BCP baseline into `change-log.md` upon setup gate approval
  6. `acps-pause` saves full work state to `continue-here.md`; `acps-resume` restores it accurately
**Plans**: TBD

### Phase 5: Scope & Intelligence
**Goal**: Teams can formally manage scope changes with BCP/FP accounting and run automated project intelligence scans to give AI agents accurate codebase context
**Depends on**: Phase 4
**Requirements**: SCOPE-01, SCOPE-02, INTEL-01, INTEL-02, INTEL-03
**Success Criteria** (what must be TRUE):
  1. `acps-change-request` registers a CR with BCP/FP delta in `change-log.md` and warns when scope exceeds baseline without equivalent removal
  2. `acps-scope-manager` shows the full scope ledger (baseline vs current BCP/FP, all CRs, balance status) and flags overruns
  3. `acps-document-project` scans a codebase and produces project-overview.md, source-tree.md, component-inventory.md, and dev-guide.md in `.planning/intel/`; re-runs resume from state file rather than restarting
  4. `acps-scan` produces a 1-page context summary readable by any AI agent in a new session
  5. `acps-code-map` runs parallel per-module analysis and writes dependency graphs and component relationships to `.planning/codebase/`
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Docs | 6/6 | Complete | 2026-04-19 |
| 2. Templates | 2/5 | In progress | - |
| 3. Setup & Loop Skills | 0/TBD | Not started | - |
| 4. Delivery, Management & Installer | 0/TBD | Not started | - |
| 5. Scope & Intelligence | 0/TBD | Not started | - |
