# Requirements: Agentic CPS Method

**Defined:** 2026-04-18
**Core Value:** CPS methodology discipline as installable AI IDE skills — branch → discuss → spec → plan → execute → homologate, feeling like GSD commands

## v1 Requirements

### Foundation (EP-M01)

- [ ] **FOUND-01**: Repo has package.json with `name: "acps"`, `bin` pointing to `bin/install.js`, and correct devDependencies (semantic-release, markdownlint-cli) + `@inquirer/prompts` as production dep
- [ ] **FOUND-02**: `.github/workflows/ci.yml` runs markdownlint + `node --check bin/install.js` on every PR
- [ ] **FOUND-03**: `.github/workflows/release.yml` runs semantic-release on push to `main`, producing a GitHub Release
- [ ] **FOUND-04**: `.releaserc.json` configures semantic-release with commit-analyzer, changelog, git, and github plugins
- [ ] **FOUND-05**: `README.md` exists with methodology overview, install command, and quick start

### Methodology Docs (EP-M02)

- [ ] **DOCS-01**: `docs/phases/` has setup.md, production-flow.md, value-activation.md describing CPS lifecycle stages
- [ ] **DOCS-02**: `docs/practices/` has 9 files (01–09) covering all filtered CPS practices (Vision, Backlog, Business Processes, Value Engineering, Architecture, Backlog Refinement, One Piece Flow, Burn Quality In, Continuous Homologation)
- [ ] **DOCS-03**: `docs/workflow/` has discuss.md, spec.md, plan.md, execute.md, homologate.md describing the GSD inner-loop steps
- [ ] **DOCS-04**: `docs/gates.md` defines gate conditions per phase and per iteration (including setup gate checklist)
- [ ] **DOCS-05**: `docs/getting-started.md` guides first-time users from install to first iteration
- [ ] **DOCS-06**: `docs/standards/` has 5 files: conventional-commits.md, code-comments.md, readme.md, clean-code.md, agent-behavior.md

### Templates (EP-M03)

- [x] **TMPL-01**: `templates/specs/epic.md` in lean-spec format (Overview, Requirements checklist, Non-goals, Acceptance criteria)
- [x] **TMPL-02**: `templates/specs/story.md` with YAML front-matter capturing `sessions[]` entries (command, started_at, finished_at, duration_ms, tokens.input/output/total, model) and `totals` block
- [ ] **TMPL-03**: `templates/bugs/bug-report.md` in lean-spec format
- [ ] **TMPL-04**: `templates/phases/` has vision.md, backlog.md, architecture-package.md
- [ ] **TMPL-05**: `templates/deliverables/` has setup-deliverable.md, iteration-report.md, value-activation-deliverable.md, roadmap.md
- [ ] **TMPL-06**: `templates/reports/` has daily.md, weekly.md, monthly.md, quarterly.md

### Setup Phase Skills (EP-M04)

- [ ] **SETUP-01**: `skills/acps-init/` — creates `.planning/` structure with epics/, iterations/, specs/ in any project
- [ ] **SETUP-02**: `skills/acps-vision/` — guides vision creation, writes `vision.md` via CPS Ch.4 discipline
- [ ] **SETUP-03**: `skills/acps-backlog/` — guides epic + iteration creation, writes `backlog.md` via CPS Ch.10
- [ ] **SETUP-04**: `skills/acps-architecture/` — guides architecture package creation, writes `architecture.md` via CPS Ch.14
- [ ] **SETUP-05**: `skills/acps-project-roadmap/` — performs BCP/FP estimation on all epics, writes `roadmap.md` via CPS Ch.12

### GSD Loop Skills (EP-M05)

- [ ] **LOOP-01**: `skills/acps-branch/` — creates semantic branch first (GSD discipline), enforces naming convention
- [ ] **LOOP-02**: `skills/acps-discuss/` — GSD-style discuss loop extracting CPS implementation decisions
- [ ] **LOOP-03**: `skills/acps-spec/` — ambiguity scoring → acceptance criteria with gate ≤ 0.20 threshold (CPS Ch.27)
- [ ] **LOOP-04**: `skills/acps-plan/` — task breakdown + BCP estimates per story
- [ ] **LOOP-05**: `skills/acps-execute/` — implementation, appends session entry to story YAML front-matter
- [ ] **LOOP-06**: `skills/acps-homologate/` — interactive step-by-step UAT: walks ACs, prompts human verify, captures pass/fail, marks story homologated or routes to acps-bug-fix; computes and writes `totals` block (CPS Ch.28)

### Delivery & Management Skills (EP-M06)

- [ ] **DELIV-01**: `skills/acps-deliverable/` — runs deliverable workflow, AI fills template, human reviews and sends to client
- [ ] **DELIV-02**: `skills/acps-gate/` — lists what's blocking the gate; at setup gate approval, locks BCP baseline into `change-log.md`
- [ ] **DELIV-03**: `skills/acps-status/` — shows current phase, iteration, epic + scope balance
- [ ] **DELIV-04**: `skills/acps-report/` — generates daily/weekly/monthly/quarterly report from template
- [ ] **DELIV-05**: `skills/acps-new-epic/` — creates epic in lean-spec format via `leanspec create`
- [ ] **DELIV-06**: `skills/acps-new-story/` — creates story under an epic, sets stage + BCP
- [ ] **DELIV-07**: `skills/acps-new-bug/` — registers bug before fix, links to epic, logs in `bugs/`, assigns BCP credit
- [ ] **DELIV-08**: `skills/acps-bug-fix/` — bug correction workflow: branch → fix → verify ACs → close bug → merge
- [ ] **DELIV-09**: `skills/acps-new-iteration/` — opens new iteration branch, assigns pending epics
- [ ] **DELIV-10**: `skills/acps-pr/` — creates semantic PR branch, filters `.planning/` commits, sets conventional commit title
- [ ] **DELIV-11**: `skills/acps-pause/` — saves full work state to `continue-here.md` for cross-session handoff
- [ ] **DELIV-12**: `skills/acps-resume/` — restores work state from `continue-here.md`, shows where to pick up
- [ ] **DELIV-13**: `skills/acps-note/` — zero-friction capture: timestamped idea/impediment → `notes.md`
- [ ] **DELIV-14**: `skills/acps-help/` — methodology overview + next recommended skill

### Installer (EP-M07)

- [ ] **INST-01**: `bin/install.js` is Node.js 24 ESM, runs interactive prompts (name, language, doc language, runtime multi-select, location, estimation method)
- [ ] **INST-02**: Non-interactive flags work: `--claude --global --estimation bcp_full --lang en --doc-lang en`
- [ ] **INST-03**: Installer copies skills to correct destination for each of 10 IDEs (Claude Code, Cursor, Windsurf, Copilot, Gemini CLI, Cline, Augment, OpenCode, Codex, Trae) for both global and local locations
- [ ] **INST-04**: Installer writes `.acps-config.json` to project root with version, name, languages, estimation, runtimes, location, installed_at

### Scope & Change Management (EP-M08)

- [ ] **SCOPE-01**: `skills/acps-change-request/` — registers formal CR with BCP/FP delta, updates `change-log.md`, warns if scope exceeds baseline without equivalent removal
- [ ] **SCOPE-02**: `skills/acps-scope-manager/` — shows scope ledger (baseline vs current BCP/FP, all CRs, balance status), approves or flags overruns

### Project Intelligence (EP-M09)

- [ ] **INTEL-01**: `skills/acps-document-project/` — scans codebase, generates project-overview.md, source-tree.md, component-inventory.md, dev-guide.md in `.planning/intel/`; resume-capable via state file
- [ ] **INTEL-02**: `skills/acps-scan/` — lightweight quick scan: reads key files, outputs 1-page context summary for AI agents
- [ ] **INTEL-03**: `skills/acps-code-map/` — brownfield deep-map: parallel analysis per module → `.planning/codebase/` with dependency graphs, component relationships, data flow

## v2 Requirements

### Spec Backends

- **BACK-01**: GitHub Issues as spec backend (v2.x)
- **BACK-02**: Azure DevOps as spec backend (v3.x)
- **BACK-03**: Jira as spec backend (v4.x)

### Publishing

- **PUB-01**: npm registry publish (currently GitHub Releases only)

## Out of Scope

| Feature | Reason |
|---------|--------|
| `agentic-cps-web` SvelteKit cockpit | Separate repo, built after method ships v1.0.0 |
| REST API or web server | Method repo is pure content; UI lives in agentic-cps-web |
| npm publish | GitHub Releases only for v1; npm deferred |
| Real-time collaboration | Out of scope for CLI-based methodology tool |
| Workspace/multi-project management | Each project runs its own acps install |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 — Foundation & Docs | Pending |
| FOUND-02 | Phase 1 — Foundation & Docs | Pending |
| FOUND-03 | Phase 1 — Foundation & Docs | Pending |
| FOUND-04 | Phase 1 — Foundation & Docs | Pending |
| FOUND-05 | Phase 1 — Foundation & Docs | Pending |
| DOCS-01 | Phase 1 — Foundation & Docs | Pending |
| DOCS-02 | Phase 1 — Foundation & Docs | Pending |
| DOCS-03 | Phase 1 — Foundation & Docs | Pending |
| DOCS-04 | Phase 1 — Foundation & Docs | Pending |
| DOCS-05 | Phase 1 — Foundation & Docs | Pending |
| DOCS-06 | Phase 1 — Foundation & Docs | Pending |
| TMPL-01 | Phase 2 — Templates | Complete |
| TMPL-02 | Phase 2 — Templates | Complete |
| TMPL-03 | Phase 2 — Templates | Pending |
| TMPL-04 | Phase 2 — Templates | Pending |
| TMPL-05 | Phase 2 — Templates | Pending |
| TMPL-06 | Phase 2 — Templates | Pending |
| SETUP-01 | Phase 3 — Setup & Loop Skills | Pending |
| SETUP-02 | Phase 3 — Setup & Loop Skills | Pending |
| SETUP-03 | Phase 3 — Setup & Loop Skills | Pending |
| SETUP-04 | Phase 3 — Setup & Loop Skills | Pending |
| SETUP-05 | Phase 3 — Setup & Loop Skills | Pending |
| LOOP-01 | Phase 3 — Setup & Loop Skills | Pending |
| LOOP-02 | Phase 3 — Setup & Loop Skills | Pending |
| LOOP-03 | Phase 3 — Setup & Loop Skills | Pending |
| LOOP-04 | Phase 3 — Setup & Loop Skills | Pending |
| LOOP-05 | Phase 3 — Setup & Loop Skills | Pending |
| LOOP-06 | Phase 3 — Setup & Loop Skills | Pending |
| DELIV-01 | Phase 4 — Delivery, Management & Installer | Pending |
| DELIV-02 | Phase 4 — Delivery, Management & Installer | Pending |
| DELIV-03 | Phase 4 — Delivery, Management & Installer | Pending |
| DELIV-04 | Phase 4 — Delivery, Management & Installer | Pending |
| DELIV-05 | Phase 4 — Delivery, Management & Installer | Pending |
| DELIV-06 | Phase 4 — Delivery, Management & Installer | Pending |
| DELIV-07 | Phase 4 — Delivery, Management & Installer | Pending |
| DELIV-08 | Phase 4 — Delivery, Management & Installer | Pending |
| DELIV-09 | Phase 4 — Delivery, Management & Installer | Pending |
| DELIV-10 | Phase 4 — Delivery, Management & Installer | Pending |
| DELIV-11 | Phase 4 — Delivery, Management & Installer | Pending |
| DELIV-12 | Phase 4 — Delivery, Management & Installer | Pending |
| DELIV-13 | Phase 4 — Delivery, Management & Installer | Pending |
| DELIV-14 | Phase 4 — Delivery, Management & Installer | Pending |
| INST-01 | Phase 4 — Delivery, Management & Installer | Pending |
| INST-02 | Phase 4 — Delivery, Management & Installer | Pending |
| INST-03 | Phase 4 — Delivery, Management & Installer | Pending |
| INST-04 | Phase 4 — Delivery, Management & Installer | Pending |
| SCOPE-01 | Phase 5 — Scope & Intelligence | Pending |
| SCOPE-02 | Phase 5 — Scope & Intelligence | Pending |
| INTEL-01 | Phase 5 — Scope & Intelligence | Pending |
| INTEL-02 | Phase 5 — Scope & Intelligence | Pending |
| INTEL-03 | Phase 5 — Scope & Intelligence | Pending |

**Coverage:**
- v1 requirements: 48 total
- Mapped to phases: 48
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-18*
*Last updated: 2026-04-18 — traceability updated with phase names after roadmap creation*
