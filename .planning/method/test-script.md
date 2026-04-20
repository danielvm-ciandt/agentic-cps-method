# Test Script — `agentic-cps-method`
## Session acceptance criteria · GSD-style UAT

**Project:** agentic-cps-method
**Created:** 2026-04-18T00:00:00Z
**Purpose:** Step-by-step verification of every requirement. Run at the end of each iteration. Items marked `[Iter N]` become testable at that milestone.

---

## How to use this script

1. Open this file at the end of each iteration
2. Work through each section that matches your completed iteration
3. For each test: follow the steps → observe the result → check the box if it passes
4. Any failure → run `/acps-new-bug` → record the issue → route to `/acps-bug-fix`
5. All items for the iteration must pass before running `/acps-gate`

---

## Section 0 — Setup Phase (testable now)

### T-000 · Planning artifacts exist

```
ls .planning/method/
```
**Expected:** `vision.md`, `backlog.md`, `roadmap.md`, `architecture.md`, `test-script.md`

- [ ] All 5 files present and populated

---

### T-001 · Vision is complete

**Steps:** Open `.planning/method/vision.md`

- [ ] Two-repo strategy documented (method + web)
- [ ] 9 CPS practices listed with chapter numbers
- [ ] CPS lifecycle: Setup → Production Flow → Value Activation
- [ ] GSD workflow loop: branch → discuss → spec → plan → execute → homologate
- [ ] UX vision quote present
- [ ] No "AI draft" wording — deliverables reference `/acps-deliverable` command

---

### T-002 · Backlog is complete

**Steps:** Open `.planning/method/backlog.md`

- [ ] 9 epics (EP-M01 through EP-M09), 5 iterations
- [ ] "Sprint" never appears — only "Iteration"
- [ ] All 29 skills listed across the right epics
- [ ] Iteration map present

---

### T-003 · Roadmap is complete

**Steps:** Open `.planning/method/roadmap.md`

- [ ] 5 iterations, M-Iter-5 = v1.0.0
- [ ] Full ecosystem timeline shows method → web sequence
- [ ] Gate checklist: 4 of 5 items checked, gate approval pending
- [ ] Gate approval locks BCP baseline into `change-log.md`

---

### T-004 · Architecture is complete

**Steps:** Open `.planning/method/architecture.md`

- [ ] npm package name: `acps`, invocation: `npx acps@latest`
- [ ] 29 skills listed in repo structure tree
- [ ] 10 IDEs with global + local destination paths
- [ ] 5 languages: EN / ES / PT-BR / ZH / JA
- [ ] 6 installer prompts in correct order
- [ ] 4 estimation options
- [ ] Spec backend v1 = markdown only
- [ ] Story YAML has `sessions[]` and `totals` block
- [ ] UI metrics documented: cost, cycle time, flow efficiency, step breakdown
- [ ] Conventional commits type table present
- [ ] Code commenting + README standards present
- [ ] `engines: { node: ">=24" }`
- [ ] All timestamps ISO 8601 UTC (`Z` suffix)
- [ ] `change-log.md` schema documented
- [ ] `.planning/intel/` and `.planning/codebase/` artifacts documented

---

## Section 1 — M-Iter-1: Foundation + Methodology Docs `[Iter 1]`

### T-100 · Repo structure

```bash
git clone https://github.com/danielvm-ciandt/agentic-cps-method
cd agentic-cps-method && ls
```
**Expected:** `bin/`, `docs/`, `.planning/`, `helps/`, `.github/`, `.releaserc.json`, `package.json`, `README.md`

- [ ] All directories present
- [ ] No `.env` or `node_modules/` committed

---

### T-101 · package.json

```bash
cat package.json
```
- [ ] `"name": "acps"`
- [ ] `"type": "module"`
- [ ] `"bin": { "acps": "./bin/install.js" }`
- [ ] `"engines": { "node": ">=24" }`
- [ ] `@inquirer/prompts` in dependencies
- [ ] `semantic-release`, `markdownlint-cli` in devDependencies

---

### T-102 · Lint passes

```bash
npm ci
npm run lint
```
- [ ] Exit code 0 — no markdownlint errors on all `.md` files in `docs/`

---

### T-103 · node --check passes

```bash
node --check bin/install.js
```
- [ ] Exit code 0 — no syntax errors

---

### T-104 · CI green

**Steps:** GitHub → Actions tab → latest run

- [ ] `ci.yml` lint job passes: setup-node@24 → npm ci → npm run lint → node --check
- [ ] `release.yml` exists and runs on push to `main`

---

### T-105 · semantic-release wired

```bash
cat .releaserc.json
```
- [ ] `"branches": ["main"]`
- [ ] Plugins: commit-analyzer, release-notes-generator, changelog, git, github
- [ ] NO `@semantic-release/npm` (no publish in v1)

After first push to `main`:
- [ ] Stable tag created (e.g. `v0.1.0`)
- [ ] `CHANGELOG.md` committed by release bot

---

### T-106 · Branch + commit convention

```bash
git log --oneline -10
```
- [ ] All commits: `type(scope): description` format
- [ ] Branch names: `feat/ep-m01-N-slug`

---

### T-107 · README

- [ ] Title + one-line description
- [ ] Why it exists
- [ ] Install command: `npx acps@latest`
- [ ] Key commands listed
- [ ] Link to `docs/getting-started.md`

---

### T-108 · Getting started doc

- [ ] Step-by-step for new users
- [ ] References `npx acps@latest`
- [ ] Shows GSD loop sequence
- [ ] Mentions 5 supported languages

---

### T-109 · Phase docs (3)

```bash
ls docs/phases/
```
- [ ] `setup.md`, `production-flow.md`, `value-activation.md` exist
- [ ] Each follows lean-spec body structure

---

### T-110 · Practice docs (9)

```bash
ls docs/practices/
```
- [ ] 9 files: 01 through 09
- [ ] Each references its CPS chapter
- [ ] Ch.28 describes interactive UAT step

---

### T-111 · Workflow docs (5)

```bash
ls docs/workflow/
```
- [ ] `discuss.md`, `spec.md`, `plan.md`, `execute.md`, `homologate.md`
- [ ] `homologate.md` describes interactive AC walkthrough

---

### T-112 · Gates doc

- [ ] Gate conditions for: setup phase, each iteration, value activation
- [ ] Setup gate includes BCP baseline lock item

---

### T-113 · Standards docs (5)

```bash
ls docs/standards/
```
- [ ] `conventional-commits.md` — links to conventionalcommits.org v1.0.0
- [ ] `code-comments.md` — links to douglas.rochedo article
- [ ] `readme.md` — links to meakaakka article
- [ ] `clean-code.md` — R.C. Martin summary
- [ ] `agent-behavior.md` — Critical Partner Mindset (ref: danielvm-ciandt/helpers)

---

## Section 2 — M-Iter-2: Templates `[Iter 2]`

### T-200 · 14 templates exist

```bash
find templates/ -name "*.md" | sort
```
- [ ] `templates/specs/epic.md`
- [ ] `templates/specs/story.md`
- [ ] `templates/bugs/bug-report.md`
- [ ] `templates/phases/vision.md`
- [ ] `templates/phases/backlog.md`
- [ ] `templates/phases/architecture-package.md`
- [ ] `templates/deliverables/setup-deliverable.md`
- [ ] `templates/deliverables/iteration-report.md`
- [ ] `templates/deliverables/value-activation-deliverable.md`
- [ ] `templates/deliverables/roadmap.md`
- [ ] `templates/reports/daily.md`
- [ ] `templates/reports/weekly.md`
- [ ] `templates/reports/monthly.md`
- [ ] `templates/reports/quarterly.md`

---

### T-201 · Story template telemetry

- [ ] `story.md` YAML has `sessions: []` and `totals:` block
- [ ] After `/acps-execute`: session entry appears under `sessions`
- [ ] After `/acps-homologate`: `totals` computed (`duration_ms`, `active_ms`, `tokens.*`)
- [ ] All timestamps ISO 8601 UTC

---

### T-202 · Deliverables are client-facing

- [ ] `iteration-report.md` addressed to client/stakeholders
- [ ] No internal `.planning/` content leaked

---

## Section 3 — M-Iter-3: Skills `[Iter 3]`

### T-300 · All 11 core skills exist

```bash
ls skills/
```
- [ ] `acps-init/`, `acps-vision/`, `acps-backlog/`, `acps-architecture/`, `acps-project-roadmap/`
- [ ] `acps-branch/`, `acps-discuss/`, `acps-spec/`, `acps-plan/`, `acps-execute/`, `acps-homologate/`
- [ ] Each has `SKILL.md` + `workflow.md`

---

### T-301 · acps-branch creates semantic branch

- [ ] Prompts: epic, story number, slug
- [ ] Creates: `feat/ep-01-12-add-user-auth`

---

### T-302 · acps-spec ambiguity gate

- [ ] Scores ambiguity 0.00–1.00
- [ ] Blocks if score > 0.20
- [ ] Passes if score ≤ 0.20 → generates ACs

---

### T-303 · acps-homologate interactive UAT

- [ ] Lists each AC one by one
- [ ] Prompts: pass / fail / skip
- [ ] On fail: routes to `/acps-bug-fix`
- [ ] On all pass: marks story homologated

---

### T-304 · Skills write via leanspec CLI

- [ ] Running `/acps-new-epic` → epic appears on lean-spec board with stage = `backlog`

---

### T-305 · Multilingual response

- [ ] Set `communication_language: "Español"` → `/acps-help` responds in Spanish

---

## Section 4 — M-Iter-4: Installer + Management `[Iter 4]`

### T-400 · npx acps@latest runs

```bash
npx acps@latest
```
- [ ] 6 prompts in correct order
- [ ] Completion: "✓ Agentic CPS installed. Run /acps-help to get started."

---

### T-401 · Non-interactive install

```bash
npx acps@latest --claude --global --estimation bcp_full --lang en --doc-lang en
```
- [ ] No prompts
- [ ] `.acps-config.json` created
- [ ] Skills copied to `~/.claude/skills/`

---

### T-402 · .acps-config.json schema

- [ ] Fields: `version`, `name`, `communication_language`, `document_output_language`, `estimation`, `runtimes`, `location`, `installed_at`
- [ ] `installed_at` is ISO 8601 UTC

---

### T-403 · acps-bug-fix workflow

- [ ] Creates fix branch: `fix/<issue>-<slug>`
- [ ] Runs AC verification logic
- [ ] On pass: closes bug + conventional commit `fix(<scope>): <description>`

---

### T-404 · acps-pause / acps-resume

- [ ] `/acps-pause` creates `continue-here.md` with current epic, story, decisions, next step
- [ ] `/acps-resume` in new session picks up exactly where it left off

---

### T-405 · acps-deliverable

- [ ] Uses correct template from `templates/deliverables/`
- [ ] Output saved to `deliverables/`
- [ ] No `.planning/` content leaked to client doc

---

## Section 5 — M-Iter-5: Scope + Project Intelligence `[Iter 5]`

### T-500 · acps-change-request enforcement

- [ ] Adding +20 BCP without removal → warning shown, blocked until resolved
- [ ] Adding +15 with matching -15 removal → status: balanced
- [ ] All CRs in `change-log.md` with ISO 8601 timestamps

---

### T-501 · acps-scope-manager ledger

- [ ] Shows baseline, current, variance, status
- [ ] Lists all CRs; can approve pending from this view

---

### T-502 · Baseline locked at gate

- [ ] `change-log.md` `baseline_bcp` matches `roadmap.md` total
- [ ] `status: balanced` at gate

---

### T-503 · acps-document-project

- [ ] `.planning/intel/` created with all 5 files + `scan-state.json`
- [ ] Resume: run again → offered to resume or rescan

---

### T-504 · acps-code-map

- [ ] `.planning/codebase/map-index.md` created
- [ ] At least one `modules/<name>.md`, `dependency-graph.md`, `data-flow.md`

---

## Section 6 — Cross-cutting (test at any iteration)

### T-600 · ISO 8601 dates everywhere

```bash
grep -r "202[0-9]-[0-9][0-9]-[0-9][0-9]" . --include="*.md" | grep -v "T[0-9][0-9]:[0-9][0-9]"
```
- [ ] Zero results — all dates include time + Z suffix

---

### T-601 · No "sprint" language

```bash
grep -r -i "sprint" . --include="*.md"
```
- [ ] Zero results

---

### T-602 · No "AI draft" language

```bash
grep -r -i "ai draft" . --include="*.md"
```
- [ ] Zero results

---

### T-603 · Per-command session telemetry

Complete a full story (discuss → spec → plan → execute → homologate):
- [ ] `sessions` array has one entry per command
- [ ] Each entry has `command`, `started_at`, `finished_at`, `duration_ms`, `tokens.*`, `model`
- [ ] `totals.active_ms` = Σ session `duration_ms`
- [ ] `totals.duration_ms` ≥ `totals.active_ms`

---

### T-604 · Cost calculation

- [ ] Story cost = Σ(session tokens × model price) / 1_000_000
- [ ] Web UI step breakdown chart shows time + cost per command

---

## Summary

| Section | Iteration | Blocker for gate? |
|---|---|---|
| 0 — Setup | Now | Yes |
| 1 — Foundation | M-Iter-1 | Yes |
| 2 — Templates | M-Iter-2 | Yes |
| 3 — Skills | M-Iter-3 | Yes |
| 4 — Installer | M-Iter-4 | Yes |
| 5 — Scope + Intel | M-Iter-5 | Yes |
| 6 — Cross-cutting | Any | Yes |

Run `/acps-homologate` after each section. All failures → `/acps-new-bug` → `/acps-bug-fix` → re-test.
