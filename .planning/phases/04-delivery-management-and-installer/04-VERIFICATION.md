---
phase: 04-delivery-management-and-installer
verified: 2026-04-20T17:48:17Z
status: human_needed
score: 18/18 must-haves verified
overrides_applied: 0
human_verification:
  - test: "npx acps@latest interactive install — full prompt flow"
    expected: "Prompts appear for name, lang, docLang, runtimes (checkbox), location (select), estimation (select); completing them copies skills and writes .acps-config.json"
    why_human: "Interactive @inquirer/prompts cannot be driven non-interactively in a test harness; TTY required"
  - test: "Verify skills land at correct path for a second IDE (e.g., cursor local)"
    expected: ".cursor/skills/ directory populated with all 25 acps-* subdirectories"
    why_human: "Smoke test ran only --claude --local; other IDE paths need spot-check verification"
---

# Phase 4: Delivery, Management & Installer Verification Report

**Phase Goal:** Teams can install `acps` via `npx acps@latest` into any of 10 supported IDEs, and have a full suite of delivery and management skills for epics, stories, bugs, reports, gate management, and cross-session continuity
**Verified:** 2026-04-20T17:48:17Z
**Status:** human_needed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | All 14 delivery/management skill directories exist with SKILL.md and workflow.md | VERIFIED | `ls -d skills/acps-*/` returns 25 dirs; all 14 Phase 4 skills confirmed present |
| 2 | `acps-gate` has two-mode workflow (blockers view + approval-to-lock) writing `change-log.md` from `roadmap.md` BCP | VERIFIED | workflow.md: 5 steps, `approve` trigger (line 55), `change-log.md` write (line 87), `roadmap.md` BCP sum (line 80–83), `HALT` for missing roadmap (line 78) |
| 3 | `acps-status` reads git branch + backlog.md + change-log.md and outputs scope balance | VERIFIED | workflow.md: 4 steps, `git branch --show-current` (line 30), `backlog.md` read (line 36), `change-log.md` read (documented in header lines 8–9) |
| 4 | `acps-pause` writes `continue-here.md` with story, loop_phase, branch, paused_at, and open tasks | VERIFIED | workflow.md: 5 steps, `continue-here.md` write (line 48), `loop_phase` YAML (line 53), `paused_at` (line 55), `## Open Tasks` section |
| 5 | `acps-resume` reads `continue-here.md`, staleness check, warns/offers discard | VERIFIED | workflow.md: 5 steps, `continue-here.md` read (line 28), staleness check (line 32), `discard` option (lines 37–42), `HALT` cases present |
| 6 | `acps-new-epic`, `acps-new-story`, `acps-new-bug` fill templates from `templates/` | VERIFIED | epic: `templates/specs/epic.md` (line 46); story: `templates/specs/story.md` (line 50) + `story_id/bcp/sessions: []`; bug: `templates/bugs/bug-report.md` (line 50) |
| 7 | `acps-bug-fix` uses `bug/{id}-{slug}` branch naming, closes bug with `status: closed`, hands off to `acps-pr` | VERIFIED | workflow.md: 6 steps, `bug/` prefix (line 48), `git checkout -b` (line 55), `status: closed` (line 111), `acps-pr` reference (line 128) |
| 8 | `acps-pr` filters `.planning/` commits from PR body; uses conventional commit title; creates PR via `gh pr create` | VERIFIED | workflow.md: 5 steps, `:(exclude).planning/` filter (line 41), `type(scope): description` format (line 56), `gh pr create` (line 110) |
| 9 | `acps-deliverable` fills `templates/deliverables/` template, pauses for human `approved` before flagging client-ready | VERIFIED | workflow.md: 5 steps, all 4 deliverable template references (lines 36–39), `approved` gate (line 97, 105), `change-log.md` data source (line 52) |
| 10 | `acps-report` supports daily/weekly/monthly/quarterly from `templates/reports/`; reads git log | VERIFIED | workflow.md: 4 steps, all 4 template files referenced (lines 35–38), `git log --since=` variants (lines 60/63/66/69) |
| 11 | `acps-new-iteration` creates iter-{N} branch and updates `backlog.md` | VERIFIED | workflow.md: 5 steps, `git checkout -b` (line 46), `backlog.md` read (line 17) + update (line 60), `HALT` for missing backlog (line 22) |
| 12 | `acps-note` appends timestamped entry to `notes.md` with zero friction (single-line confirm) | VERIFIED | workflow.md: 4 steps, `notes.md` append (line 41), category options idea/impediment/decision/question (line 21), single-line output `Captured.` (line 55) |
| 13 | `acps-help` lists all 25 skills grouped by Setup/Loop/Delivery/Management; recommends next skill from project state | VERIFIED | workflow.md: 4 steps, `## Setup Phase` (line 31), `## Loop Phase` (line 39), `acps-init` through all 25 skills listed, `continue-here.md` state detection (line 23) |
| 14 | `bin/install.js` is a Node.js 24 ESM file (203 lines) with `@inquirer/prompts` interactive prompts | VERIFIED | `node --check bin/install.js` exits 0; `import { checkbox, input, select } from '@inquirer/prompts'` present; `fileURLToPath(import.meta.url)` used; 203 lines |
| 15 | Non-interactive mode completes without prompts (`--claude --local --estimation bcp_full --lang en --doc-lang en`) | VERIFIED | `nonInteractive` detection on all 4 required flags; smoke test confirmed: exits 0 with "acps installed successfully" |
| 16 | `--help` flag prints usage and exits 0 | VERIFIED | `node bin/install.js --help` exits 0; prints full usage with all 10 IDE flags documented |
| 17 | Skills copied to correct IDE destination for all 10 IDEs in both global/local modes | VERIFIED | `IDE_PATHS` constant: all 10 IDEs (claude-code through trae) each with `global`/`local` entries using `homedir()`; `cpSync` recursive copy confirmed |
| 18 | `.acps-config.json` written with version, name, lang, docLang, estimation, runtimes, location, installed_at — preserving planningDir | VERIFIED | Config merge: `...existing` spread first (preserves planningDir); all 8 installer fields confirmed in `.acps-config.json` after smoke test |

**Score:** 18/18 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `skills/acps-gate/SKILL.md` | Gate skill entry point with `name: acps-gate` | VERIFIED | Exists; delegate line present |
| `skills/acps-gate/workflow.md` | 5-step gate workflow | VERIFIED | 5 steps; `<workflow>` tag; change-log.md + roadmap.md wired |
| `skills/acps-status/SKILL.md` | Status skill entry point | VERIFIED | Exists; `name: acps-status` |
| `skills/acps-status/workflow.md` | 4-step status dashboard | VERIFIED | 4 steps; git branch + backlog.md + change-log.md |
| `skills/acps-pause/SKILL.md` | Pause skill entry point | VERIFIED | Exists; `name: acps-pause` |
| `skills/acps-pause/workflow.md` | 5-step state-save workflow | VERIFIED | 5 steps; continue-here.md write |
| `skills/acps-resume/SKILL.md` | Resume skill entry point | VERIFIED | Exists; `name: acps-resume` |
| `skills/acps-resume/workflow.md` | 5-step state-restore workflow | VERIFIED | 5 steps; staleness check; discard option |
| `skills/acps-new-epic/SKILL.md` | New epic skill entry point | VERIFIED | Exists; `name: acps-new-epic` |
| `skills/acps-new-epic/workflow.md` | 4-step epic creation | VERIFIED | 4 steps; templates/specs/epic.md |
| `skills/acps-new-story/SKILL.md` | New story skill entry point | VERIFIED | Exists; `name: acps-new-story` |
| `skills/acps-new-story/workflow.md` | 4-step story creation | VERIFIED | story_id, bcp, sessions: [] set |
| `skills/acps-new-bug/SKILL.md` | New bug skill entry point | VERIFIED | Exists; `name: acps-new-bug` |
| `skills/acps-new-bug/workflow.md` | 5-step bug registration | VERIFIED | templates/bugs/bug-report.md; bcp; epic link |
| `skills/acps-bug-fix/SKILL.md` | Bug fix skill entry point | VERIFIED | Exists; `name: acps-bug-fix` |
| `skills/acps-bug-fix/workflow.md` | 6-step bug fix workflow | VERIFIED | bug/ branch; status: closed; acps-pr reference |
| `skills/acps-pr/SKILL.md` | PR skill entry point | VERIFIED | Exists; `name: acps-pr` |
| `skills/acps-pr/workflow.md` | 5-step PR creation | VERIFIED | .planning/ filter; gh pr create; conventional commit |
| `skills/acps-deliverable/SKILL.md` | Deliverable skill entry point | VERIFIED | Exists; `name: acps-deliverable` |
| `skills/acps-deliverable/workflow.md` | 5-step deliverable generation | VERIFIED | 4 templates; approved gate; change-log.md |
| `skills/acps-report/SKILL.md` | Report skill entry point | VERIFIED | Exists; `name: acps-report` |
| `skills/acps-report/workflow.md` | 4-step report generation | VERIFIED | daily/weekly/monthly/quarterly; git log |
| `skills/acps-new-iteration/SKILL.md` | New iteration skill entry point | VERIFIED | Exists; `name: acps-new-iteration` |
| `skills/acps-new-iteration/workflow.md` | 5-step iteration management | VERIFIED | git checkout -b; backlog.md update |
| `skills/acps-note/SKILL.md` | Note skill entry point | VERIFIED | Exists; `name: acps-note` |
| `skills/acps-note/workflow.md` | 4-step note capture | VERIFIED | notes.md append; single-line confirm |
| `skills/acps-help/SKILL.md` | Help skill entry point | VERIFIED | Exists; `name: acps-help` |
| `skills/acps-help/workflow.md` | 4-step methodology map | VERIFIED | All 25 skills listed; 4 groups; state-aware recommendation |
| `bin/install.js` | Full interactive installer (100+ lines) | VERIFIED | 203 lines; ESM; IDE_PATHS; interactive + non-interactive |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `skills/acps-gate/workflow.md` | `{planningDir}/change-log.md` | approval step write action | WIRED | Step 4 writes change-log.md with YAML front-matter |
| `skills/acps-gate/workflow.md` | `{planningDir}/roadmap.md` | BCP baseline computation | WIRED | Step 3 reads roadmap.md; HALT if missing |
| `skills/acps-status/workflow.md` | `{planningDir}/change-log.md` | scope balance read | WIRED | Step 3 reads change-log.md for BCP/FP values |
| `skills/acps-pause/workflow.md` | `{planningDir}/continue-here.md` | write action in step 4 | WIRED | Step 4 writes continue-here.md per D-13 |
| `skills/acps-resume/workflow.md` | `{planningDir}/continue-here.md` | read action in step 1 | WIRED | Step 1 reads continue-here.md; HALT if missing |
| `skills/acps-new-epic/workflow.md` | `templates/specs/epic.md` | template fill step | WIRED | Step 3 reads templates/specs/epic.md |
| `skills/acps-new-story/workflow.md` | `templates/specs/story.md` | template fill step | WIRED | Step 3 reads templates/specs/story.md |
| `skills/acps-new-bug/workflow.md` | `templates/bugs/bug-report.md` | template fill step | WIRED | Step 3 reads templates/bugs/bug-report.md |
| `skills/acps-bug-fix/workflow.md` | `{planningDir}/bugs/{bug-id}.md` | bug file close action | WIRED | Step 5 updates bugs/{id}.md with status: closed |
| `skills/acps-pr/workflow.md` | `git log` | commit filtering step | WIRED | Step 2 runs git log with :(exclude).planning/ |
| `skills/acps-deliverable/workflow.md` | `templates/deliverables/` | template selection step | WIRED | Step 3 reads from templates/deliverables/ |
| `skills/acps-report/workflow.md` | `templates/reports/` | template selection step | WIRED | Step 3 reads from templates/reports/ |
| `skills/acps-note/workflow.md` | `{planningDir}/notes.md` | append write action | WIRED | Step 3 appends to notes.md |
| `skills/acps-help/workflow.md` | `.acps-config.json` | read for next recommended skill | WIRED | Step 1 reads .acps-config.json; checks continue-here.md |
| `bin/install.js` | `skills/` | cpSync recursive copy to IDE destination | WIRED | `cpSync(SKILLS_SRC, dest, { recursive: true })` |
| `bin/install.js` | `.acps-config.json` | JSON merge and writeFileSync | WIRED | `...existing` spread + `writeFileSync(configPath, ...)` |
| `bin/install.js` | `package.json` | version read at startup | WIRED | `JSON.parse(readFileSync(join(PACKAGE_ROOT, 'package.json')))` |

### Data-Flow Trace (Level 4)

Not applicable — all artifacts are Markdown skill workflows and a CLI script. There are no dynamic data-rendering components. The installer reads from `package.json` (version) and existing `.acps-config.json` (planningDir) — both verified as present and producing real data.

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| `--help` exits 0 and prints usage | `node bin/install.js --help` | Printed full usage with all 10 IDEs; exit 0 | PASS |
| Non-interactive install writes config | `node bin/install.js --claude --local --estimation bcp_full --lang en --doc-lang en` | `.acps-config.json` written with all 8 fields; exit 0 | PASS |
| Installed skills in .claude/skills/ | `ls .claude/skills/ | wc -l` | 25 directories | PASS |
| ESM syntax valid | `node --check bin/install.js` | Exit 0 | PASS |
| Lint gate | `npm run lint` | 92 files, 0 errors | PASS |
| 25 skill directories present | `ls -d skills/acps-*/ | wc -l` | 25 | PASS |
| Interactive prompts exist | `grep -c "input\|checkbox\|select" bin/install.js` | 7 matches | PASS |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| DELIV-01 | 04-05 | `skills/acps-deliverable/` — AI fills template, human reviews and sends to client | SATISFIED | workflow.md: templates/deliverables/ + `approved` gate |
| DELIV-02 | 04-01 | `skills/acps-gate/` — lists gate blockers; locks BCP baseline | SATISFIED | workflow.md: 5 steps, 2 modes, change-log.md write |
| DELIV-03 | 04-01 | `skills/acps-status/` — shows phase, iteration, epic + scope balance | SATISFIED | workflow.md: 4 steps, git branch + backlog.md + change-log.md |
| DELIV-04 | 04-05 | `skills/acps-report/` — daily/weekly/monthly/quarterly from template | SATISFIED | workflow.md: 4 report types from templates/reports/ |
| DELIV-05 | 04-03 | `skills/acps-new-epic/` — creates epic in lean-spec format | SATISFIED | workflow.md: templates/specs/epic.md fill |
| DELIV-06 | 04-03 | `skills/acps-new-story/` — creates story under epic, sets stage + BCP | SATISFIED | workflow.md: story_id, stage, bcp, sessions: [] |
| DELIV-07 | 04-03 | `skills/acps-new-bug/` — registers bug, links to epic, assigns BCP credit | SATISFIED | workflow.md: templates/bugs/bug-report.md + epic link step |
| DELIV-08 | 04-04 | `skills/acps-bug-fix/` — branch → fix → verify ACs → close bug → merge | SATISFIED | workflow.md: 6 steps, bug/ branch, status: closed |
| DELIV-09 | 04-06 | `skills/acps-new-iteration/` — opens new iteration branch, assigns pending epics | SATISFIED | workflow.md: git checkout -b + backlog.md update |
| DELIV-10 | 04-04 | `skills/acps-pr/` — filters .planning/ commits, conventional commit title | SATISFIED | workflow.md: :(exclude).planning/, gh pr create |
| DELIV-11 | 04-02 | `skills/acps-pause/` — saves work state to continue-here.md | SATISFIED | workflow.md: 5 steps, continue-here.md write per D-13 |
| DELIV-12 | 04-02 | `skills/acps-resume/` — restores from continue-here.md, staleness check | SATISFIED | workflow.md: 5 steps, staleness check, discard option |
| DELIV-13 | 04-06 | `skills/acps-note/` — zero-friction capture → notes.md | SATISFIED | workflow.md: 4 steps, single-line confirm |
| DELIV-14 | 04-06 | `skills/acps-help/` — methodology overview + next recommended skill | SATISFIED | workflow.md: 25 skills, 4 groups, state-aware recommendation |
| INST-01 | 04-07, 04-08 | `bin/install.js` — interactive prompts for all 6 fields | SATISFIED | @inquirer/prompts: input, checkbox, select; 203 lines |
| INST-02 | 04-07, 04-08 | Non-interactive flags work | SATISFIED | nonInteractive detection; smoke test passed |
| INST-03 | 04-07, 04-08 | Correct destination for all 10 IDEs in global/local | SATISFIED | IDE_PATHS constant: 10 IDEs × 2 locations; cpSync |
| INST-04 | 04-07, 04-08 | Writes .acps-config.json with all required fields | SATISFIED | Config merge confirmed; all 8 fields verified |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `skills/acps-new-epic/workflow.md` | 49–51 | "placeholder" word | Info | Instructional context: directs AI to replace template placeholders when filling epic.md — not a code stub |
| `skills/acps-new-story/workflow.md` | 72 | "placeholder" word | Info | Instructional context: same template-fill pattern — not a code stub |
| `skills/acps-new-bug/workflow.md` | 53 | "placeholder" word | Info | Instructional context: same template-fill pattern — not a code stub |
| `skills/acps-report/workflow.md` | 79 | "placeholder" word | Info | Instructional context: tells AI to replace date/period placeholders in template — not a code stub |

All "placeholder" occurrences are template-fill instructions telling the AI agent what to replace in source templates. None represent unimplemented code paths. No blockers found.

### Human Verification Required

#### 1. Interactive Install Flow

**Test:** Run `npx acps@latest` (or `node bin/install.js`) without any flags from a project directory that does not already have `.acps-config.json`.
**Expected:** Prompts appear in sequence: project/team name, implementation language, documentation language, AI IDE multi-select (checkbox), global/local select, estimation method select. After completing all prompts, skills are copied to the selected IDE destination and `.acps-config.json` is written with all fields including `planningDir` preserved if one exists.
**Why human:** `@inquirer/prompts` requires an interactive TTY; automated test harnesses cannot drive the checkbox and select prompts.

#### 2. Correct Skill Destination for a Second IDE

**Test:** Run `node bin/install.js --cursor --local --estimation bcp_full --lang en --doc-lang en` from the project root.
**Expected:** `.cursor/skills/` directory is created and populated with all 25 `acps-*` subdirectories. Each subdirectory contains `SKILL.md` and `workflow.md`.
**Why human:** Only `--claude --local` was smoke-tested in Plan 08. A second IDE path should be spot-checked to confirm `IDE_PATHS` routing works for non-default IDEs.

### Gaps Summary

No gaps found. All 18 must-haves are fully verified at all three levels (exists, substantive, wired). The two human verification items are about interactive behavior (TTY prompts) and multi-IDE spot-checking that cannot be confirmed programmatically.

---

_Verified: 2026-04-20T17:48:17Z_
_Verifier: Claude (gsd-verifier)_
