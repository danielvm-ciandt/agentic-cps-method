# Backlog — `agentic-cps-method`

## Stack

- Node.js ≥24 — install script only, no framework
- Markdown + JSON — methodology docs, templates, schemas
- `skills/` — Claude Code skill format (SKILL.md + workflow.md)
- semantic-release — GitHub Releases only (no npm publish in v1)
- GitHub Actions: `ci.yml` + `release.yml`

---

## Epics

| ID | Epic | Iteration | Priority |
|---|---|---|---|
| EP-M01 | Foundation | 1 | P0 |
| EP-M02 | Methodology Documentation | 1 | P0 |
| EP-M03 | Templates | 2 | P0 |
| EP-M04 | Setup Phase Skills | 3 | P0 |
| EP-M05 | GSD Loop Skills + acps-branch | 3 | P0 |
| EP-M06 | Delivery & Management Skills | 4 | P0 |
| EP-M07 | Installer | 4 | P0 |
| EP-M08 | Scope & Change Management | 5 | P0 |
| EP-M09 | Project Intelligence | 5 | P0 |

---

## EP-M01 — Foundation

- Init repo structure
- `package.json` with bin field pointing to `bin/install.js`
- `.releaserc.json` — semantic-release config (branch mode)
- `.github/workflows/ci.yml` — lint on PR (npm ci + markdownlint + node --check)
- `.github/workflows/release.yml` — semantic-release on main push
- `README.md` — methodology overview
- Branch protection: main requires PR + CI green

## EP-M02 — Methodology Documentation

- `docs/getting-started.md`
- `docs/phases/setup.md` · `production-flow.md` · `value-activation.md`
- `docs/practices/01-vision.md` through `09-continuous-homologation.md`
- `docs/workflow/discuss.md` · `spec.md` · `plan.md` · `execute.md` · `homologate.md`
- `docs/gates.md` — gate conditions per phase and iteration
- `docs/standards/conventional-commits.md` — commit format rules (ref: conventionalcommits.org v1.0.0)
- `docs/standards/code-comments.md` — when and how to comment code (ref: douglas.rochedo/the-art-of-commenting)
- `docs/standards/readme.md` — README structure guide (ref: meakaakka/kickass-readme)
- `docs/standards/clean-code.md` — Clean Code (R.C. Martin): naming, functions, comments, formatting, error handling, tests, classes, smells catalog, Definition of Done
- `docs/standards/agent-behavior.md` — AI agent operating rules: Critical Partner Mindset, Search-First execution, Prohibited Actions (ref: danielvm-ciandt/helpers)

**Code quality standards (embedded in `acps-execute` and `acps-homologate`):**
- Conventional commits: `<type>(<scope>): <description>` — types: feat, fix, docs, refactor, test, chore, ci, perf. Breaking: `!` suffix + `BREAKING CHANGE:` footer
- Code comments: comment the WHY, never the WHAT. No endline comments, no magic numbers. Self-documenting names first
- Clean Code: functions do one thing, ≤ 20 lines; names are intention-revealing; no flag args; exceptions over error codes; zero duplication
- Agent discipline: Search first, reuse first, no assumptions, challenge ideas, log check after every change

## EP-M03 — Templates (lean-spec format)

All templates follow lean-spec body structure:
- Overview · Requirements (checklist) · Non-goals · Acceptance criteria

Story templates capture full per-session telemetry in YAML front-matter:
- `sessions[]` — one entry per ACPS command (acps-discuss, acps-spec, acps-plan, acps-execute, acps-homologate), each recording: `command`, `started_at`, `finished_at`, `duration_ms`, `tokens.input`, `tokens.output`, `tokens.total`, `model`
- `totals` — computed at homologation: `started_at`, `finished_at`, `duration_ms` (wall clock), `active_ms` (Σ session durations), `tokens.*` (Σ session tokens)
- Enables web UI to calculate cost, cycle time, flow efficiency, and step breakdown at story / epic / iteration / project level

| Template | Path | Client-facing? |
|---|---|---|
| Epic | `templates/specs/epic.md` | No |
| Story | `templates/specs/story.md` | No |
| Bug Report | `templates/bugs/bug-report.md` | No |
| Vision | `templates/phases/vision.md` | No |
| Backlog | `templates/phases/backlog.md` | No |
| Architecture Package | `templates/phases/architecture-package.md` | No |
| Setup Deliverable | `templates/deliverables/setup-deliverable.md` | **Yes** |
| Iteration Report | `templates/deliverables/iteration-report.md` | **Yes** |
| Value Activation Deliverable | `templates/deliverables/value-activation-deliverable.md` | **Yes** |
| Roadmap | `templates/deliverables/roadmap.md` | **Yes** |
| Daily Report | `templates/reports/daily.md` | **Yes** |
| Weekly Report | `templates/reports/weekly.md` | **Yes** |
| Monthly Report | `templates/reports/monthly.md` | **Yes** |
| Quarterly Report | `templates/reports/quarterly.md` | **Yes** |

## EP-M04 — Setup Phase Skills

| Skill | CPS Practice | Does |
|---|---|---|
| `acps-init` | — | Creates `.planning/` structure in any project |
| `acps-vision` | Ch.4 | Guides vision creation → `vision.md` |
| `acps-backlog` | Ch.10 | Guides epic + iteration creation → `backlog.md` |
| `acps-architecture` | Ch.14 | Guides architecture package → `architecture.md` |
| `acps-project-roadmap` | Ch.12 | BCP/FP estimates all epics → `roadmap.md` |

## EP-M05 — GSD Loop Skills + Branch

| Skill | CPS Practice | Does |
|---|---|---|
| `acps-branch` | Ch.26 | Creates semantic branch first (GSD discipline) |
| `acps-discuss` | Ch.26 | GSD-style discuss loop — extracts decisions |
| `acps-spec` | Ch.27 | Ambiguity scoring → acceptance criteria (gate ≤ 0.20) |
| `acps-plan` | Ch.27 | Tasks + estimates |
| `acps-execute` | Ch.27 | Implementation notes + artefacts |
| `acps-homologate` | Ch.28 | Interactive step-by-step UAT: walks through each AC, prompts human to verify, captures pass/fail, surfaces fixes needed → marks complete or routes to `acps-bug-fix` |

## EP-M06 — Delivery & Management Skills

| Skill | Does |
|---|---|
| `acps-deliverable` | Runs the deliverable workflow → IDE AI fills the template → human reviews and sends to client |
| `acps-gate` | Lists what's blocking the gate; at setup gate approval, locks BCP baseline into `change-log.md` |
| `acps-status` | Shows current phase, iteration, epic + scope balance |
| `acps-report` | Generates daily/weekly/monthly/quarterly report |
| `acps-new-epic` | Creates epic in lean-spec format via `leanspec create` |
| `acps-new-story` | Creates story under an epic via `leanspec create`; sets stage + BCP |
| `acps-new-bug` | Registers bug before fix — links to epic, logs in `bugs/`, assigns BCP credit |
| `acps-bug-fix` | Bug correction workflow during homologation: branch → fix → verify ACs → close bug → merge |
| `acps-new-iteration` | Opens new iteration branch, assigns pending epics |
| `acps-pr` | Creates semantic PR branch; filters `.planning/` commits; sets conventional commit title |
| `acps-pause` | Saves full work state to `continue-here.md` for cross-session handoff |
| `acps-resume` | Restores work state from `continue-here.md`; shows where to pick up |
| `acps-note` | Zero-friction capture: timestamped idea/impediment → `notes.md` |
| `acps-help` | Methodology overview + next recommended skill |

## EP-M07 — Installer

- `bin/install.js` — Node.js 24 ESM installer
- Interactive prompts:
  1. Name — team or personal name
  2. Communication language — EN / ES / PT-BR / ZH / JA
  3. Document output language — same options
  4. Runtime (multi-select) — Claude Code / Cursor / Windsurf / GitHub Copilot / Gemini CLI / Cline / Augment / OpenCode / Codex / Trae
  5. Location — Global / Local
  6. Estimation method — BCP Full / BCP Simplified / FP+SNAP / BCP Full + FP+SNAP (dual)
- Non-interactive flags: `--claude --global --estimation bcp_full --lang en --doc-lang en`
- Writes `.acps-config.json` to project root
- Copies skills to correct IDE destination paths

## EP-M08 — Scope & Change Management

| Skill | Does |
|---|---|
| `acps-change-request` | Registers a formal CR with BCP/FP delta; updates `change-log.md`; warns if scope exceeds baseline without equivalent removal |
| `acps-scope-manager` | Shows scope ledger: baseline vs current BCP/FP, all CRs, balance status; approves or flags overruns |

**`change-log.md` structure:**

```markdown
---
baseline_bcp: 389
current_bcp: 404
variance: +15
status: overrun          # balanced | overrun | under
---

| ID | Date | Title | Delta BCP | Type | Status | Running balance |
|---|---|---|---|---|---|---|
| CR-001 | 2026-04-20T14:00:00Z | Add Slack integration | +15 | add | pending | +15 |
```

**Scope rules enforced by `acps-change-request`:**
- Adding scope → must nominate equal BCP/FP to remove, OR flag as approved overrun with stakeholder sign-off
- Removing scope → credits ledger; unlocks capacity for future CRs
- Baseline is set once at gate approval (from `roadmap.md` BCP total); never updated, only the ledger grows

## EP-M09 — Project Intelligence

| Skill | Does |
|---|---|
| `acps-document-project` | BMAD-style: scans codebase → generates `project-overview.md`, `source-tree.md`, `component-inventory.md`, `dev-guide.md` in `.planning/intel/`; resume-capable via state file |
| `acps-scan` | Lightweight quick scan: reads key files, outputs a 1-page context summary for AI agents |
| `acps-code-map` | Brownfield deep-map: spawns parallel analysis per module/layer → `.planning/codebase/` with dependency graphs, component relationships, entry points, data flow |

---

## Iteration map

| Iteration | Epics | Deliverable |
|---|---|---|
| **1** | EP-M01 + EP-M02 | Repo live, CI green, 9 practice docs written |
| **2** | EP-M03 | 14 templates in lean-spec format |
| **3** | EP-M04 + EP-M05 | 11 skills working via `leanspec` CLI |
| **4** | EP-M06 + EP-M07 | All 29 skills + `npx acps@latest` works |
| **5** | EP-M08 + EP-M09 | Scope management + project intelligence → v1.0.0 ships |

## Branch naming convention

```
feat/[epic-code]-[issue]-[slug]    e.g. feat/ep-m01-1-init-repo
fix/[issue]-[slug]                 e.g. fix/12-release-config
chore/[issue]-[slug]               e.g. chore/3-update-readme
iteration/[n]                      e.g. iteration/1
```

## Spec backend versioning (One Piece Flow)

| Version | Backend |
|---|---|
| v1.x | Markdown only (zero config) |
| v2.x | + GitHub Issues |
| v3.x | + Azure DevOps |
| v4.x | + Jira |
