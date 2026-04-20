---
phase: 03-setup-and-loop-skills
verified: 2026-04-20T00:00:00Z
status: human_needed
score: 6/6 must-haves verified
overrides_applied: 0
human_verification:
  - test: "Run acps-init on a blank directory, confirm .planning/epics/, .planning/iterations/, .planning/specs/ all created and .acps-config.json written with planningDir key"
    expected: "Three subdirectories and .acps-config.json exist in the target project root after the skill runs"
    why_human: "Workflow is an AI-agent instruction set — directory creation happens at runtime; no executable to invoke in CI"
  - test: "Run acps-spec on a story file with vague ACs, confirm the ambiguity score is computed and the gate blocks advancement when score > 0.20"
    expected: "Score > 0.20 triggers the 'refine' / 'override' prompt; score ≤ 0.20 proceeds to writing the story file"
    why_human: "Gate logic is interpretive (AI scores language quality); cannot be exercised without a live agent session"
  - test: "Run acps-execute on a story that has a Plan section, confirm a new sessions[] entry is appended to YAML front-matter with command, started_at, finished_at, duration_ms, tokens, and model keys"
    expected: "Story YAML front-matter gains exactly one new sessions[] entry with all required keys populated"
    why_human: "Session telemetry requires a live agent session and user token input; not automatable offline"
  - test: "Run acps-homologate after execution; mark at least one AC as failed. Confirm totals block written, status: failed set, and acps-bug-fix is recommended in output"
    expected: "YAML totals block present, status: failed in front-matter, output text routes user to acps-bug-fix"
    why_human: "Requires a story file with recorded sessions[] and interactive UAT verdicts from the user"
---

# Phase 3: Setup & Loop Skills — Verification Report

**Phase Goal:** A user can run the full CPS inner loop — init a project, capture vision, build a backlog, branch, discuss, spec, plan, execute, and homologate — entirely through `acps` skills
**Verified:** 2026-04-20
**Status:** human_needed
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | `acps-init` creates `.planning/` with `epics/`, `iterations/`, `specs/` and writes `.acps-config.json` | VERIFIED (static) / HUMAN for runtime | workflow.md Step 3 creates all three subdirs; Step 4 writes `.acps-config.json` with `planningDir` key |
| 2 | `acps-vision`, `acps-backlog`, `acps-architecture`, `acps-project-roadmap` each write their output files following CPS chapter discipline | VERIFIED | vision.md writes `{planningDir}/vision.md` (Ch.4); backlog.md writes `{planningDir}/backlog.md` (Ch.10); architecture.md writes `{planningDir}/architecture.md` (Ch.14); roadmap.md writes `{planningDir}/roadmap.md` (Ch.12) |
| 3 | `acps-branch` creates a semantic branch and enforces naming convention before any other loop skill runs | VERIFIED | workflow.md declares convention `iter-{N}/{epic-id}-{story-slug}`, HALT on git failure, confirms before `git checkout -b`; context block: "No story implementation, discussion, or spec work begins until a properly named branch exists" |
| 4 | `acps-spec` enforces the ambiguity score gate at ≤ 0.20 before allowing a story to advance | VERIFIED (static) / HUMAN for runtime | Step 3 scores ACs, halts on score > 0.20 with "refine" / "override" choice; Step 4 refinement loop re-runs Step 3 until gate passes |
| 5 | `acps-execute` appends a correctly structured `sessions[]` entry to the story YAML front-matter | VERIFIED (static) / HUMAN for runtime | Step 4 appends entry with keys: `command`, `started_at`, `finished_at`, `duration_ms`, `tokens.input`, `tokens.output`, `tokens.total`, `model`; writes updated story file |
| 6 | `acps-homologate` walks all ACs interactively, captures pass/fail per criterion, writes `totals` block; failed stories route to `acps-bug-fix` | VERIFIED (static) / HUMAN for runtime | Step 2 presents all ACs at once, collects `{N}-pass/fail` verdicts; Step 3 computes totals from sessions[]; Step 4 writes totals block + sets `status: homologated` or `status: failed`; Step 5 output routes failures to `acps-bug-fix` |

**Score:** 6/6 truths verified at static/structural level. 4 truths require runtime human verification.

---

## Required Artifacts

### Skill Directories (11/11 present)

| Skill | SKILL.md | workflow.md | Status |
|-------|----------|-------------|--------|
| `skills/acps-init/` | present | present | VERIFIED |
| `skills/acps-vision/` | present | present | VERIFIED |
| `skills/acps-backlog/` | present | present | VERIFIED |
| `skills/acps-architecture/` | present | present | VERIFIED |
| `skills/acps-project-roadmap/` | present | present | VERIFIED |
| `skills/acps-branch/` | present | present | VERIFIED |
| `skills/acps-discuss/` | present | present | VERIFIED |
| `skills/acps-spec/` | present | present | VERIFIED |
| `skills/acps-plan/` | present | present | VERIFIED |
| `skills/acps-execute/` | present | present | VERIFIED |
| `skills/acps-homologate/` | present | present | VERIFIED |

### SKILL.md Structural Check (all 11)

Each SKILL.md is exactly 6 lines: `---` / `name: acps-{x}` / `description: '...'` / `---` / (blank) / `Follow the instructions in ./workflow.md.`

| Check | Result |
|-------|--------|
| `name:` frontmatter present in all 11 | PASS |
| `description:` field present in all 11 | PASS |
| Delegate line `Follow the instructions in ./workflow.md.` in all 11 | PASS |
| No extra content beyond frontmatter + delegate line | PASS (6 lines each) |

### workflow.md Structural Check (all 11)

| Skill | `<workflow>` tag | Step count | Min 4 steps |
|-------|-----------------|------------|-------------|
| acps-init | 1 | 5 | PASS |
| acps-vision | 1 | 5 | PASS |
| acps-backlog | 1 | 5 | PASS |
| acps-architecture | 1 | 5 | PASS |
| acps-project-roadmap | 1 | 5 | PASS |
| acps-branch | 1 | 5 | PASS |
| acps-discuss | 1 | 6 | PASS |
| acps-spec | 1 | 6 | PASS |
| acps-plan | 1 | 5 | PASS |
| acps-execute | 1 | 5 | PASS |
| acps-homologate | 1 | 5 | PASS |

---

## Key Link Verification

| From | To | Via | Status |
|------|----|-----|--------|
| `acps-init/SKILL.md` | `acps-init/workflow.md` | `Follow the instructions in ./workflow.md.` | WIRED |
| `acps-init/workflow.md` | `.acps-config.json` | Step 4 write action with `planningDir` key | WIRED |
| `acps-init/workflow.md` | `epics/ iterations/ specs/` | Step 3 directory creation | WIRED |
| `acps-spec/workflow.md` | ambiguity gate | Step 3 score ≤ 0.20 check + Step 4 refinement loop | WIRED |
| `acps-execute/workflow.md` | story YAML `sessions[]` | Step 4 append action with structured YAML entry | WIRED |
| `acps-homologate/workflow.md` | `totals` block | Step 3 aggregation + Step 4 write | WIRED |
| `acps-homologate/workflow.md` | `status: homologated` / `status: failed` | Step 4 conditional set | WIRED |
| `acps-homologate/workflow.md` | `acps-bug-fix` | Step 5 failure output routing | WIRED |
| `acps-branch/workflow.md` | naming convention `iter-{N}/{epic-id}-{story-slug}` | Step 3 compose + Step 4 validate | WIRED |
| `acps-vision/workflow.md` | `{planningDir}/vision.md` | Step 4 write action | WIRED |
| `acps-backlog/workflow.md` | `{planningDir}/backlog.md` | Step 4 write action | WIRED |
| `acps-architecture/workflow.md` | `{planningDir}/architecture.md` | Step 4 write action | WIRED |
| `acps-project-roadmap/workflow.md` | `{planningDir}/roadmap.md` | Step 4 write action | WIRED |

---

## Lint Gate

| Check | Result |
|-------|--------|
| `package.json` `scripts.lint` includes `skills/**/*.md` | PASS — value: `"markdownlint-cli2 \"docs/**/*.md\" \"templates/**/*.md\" \"skills/**/*.md\" \"*.md\" \"!CHANGELOG.md\""` |
| `npm run lint` exit code | 0 (64 files linted, 0 errors) |

---

## Requirements Coverage

| Requirement | Skill | Description | Status |
|-------------|-------|-------------|--------|
| SETUP-01 | acps-init | Creates `.planning/` structure + `.acps-config.json` | SATISFIED |
| SETUP-02 | acps-vision | Vision document via CPS Ch.4 interview | SATISFIED |
| SETUP-03 | acps-backlog | Backlog + iterations via CPS Ch.10 | SATISFIED |
| SETUP-04 | acps-architecture | Architecture package via CPS Ch.14 | SATISFIED |
| SETUP-05 | acps-project-roadmap | Roadmap + BCP estimation via CPS Ch.12 | SATISFIED |
| LOOP-01 | acps-branch | Semantic branch with naming enforcement | SATISFIED |
| LOOP-02 | acps-discuss | Story discussion and decisions loop | SATISFIED |
| LOOP-03 | acps-spec | Acceptance criteria + ambiguity gate ≤ 0.20 | SATISFIED |
| LOOP-04 | acps-plan | Task breakdown with BCP estimates | SATISFIED |
| LOOP-05 | acps-execute | Task execution + sessions[] telemetry | SATISFIED |
| LOOP-06 | acps-homologate | UAT walkthrough + totals + pass/fail routing | SATISFIED |

---

## Anti-Patterns Found

No TODOs, FIXMEs, placeholders, or stub markers found in any of the 22 skill files (11 SKILL.md + 11 workflow.md). No empty implementations detected.

| File | Pattern | Severity | Impact |
|------|---------|----------|--------|
| — | — | — | None found |

---

## Behavioral Spot-Checks

Step 7b: SKIPPED — skills are AI-agent instruction sets (Markdown workflow files). There are no runnable entry points to invoke without a live agent session. Runtime behaviors are routed to human verification below.

---

## Human Verification Required

These items passed all static/structural checks but require a live agent session to confirm runtime behavior.

### 1. acps-init: directory structure creation

**Test:** In a clean blank directory, invoke `acps-init`. Accept the default `.planning` location.
**Expected:** `.planning/epics/`, `.planning/iterations/`, `.planning/specs/` all exist (with `.gitkeep` files); `.acps-config.json` is written at the project root with `{"planningDir": ".planning"}`.
**Why human:** Directory creation happens at agent runtime; no CLI to invoke offline.

### 2. acps-spec: ambiguity gate blocks advancement

**Test:** Create a minimal story file. Run `acps-spec` and provide deliberately vague ACs (e.g., "should work correctly", "handles all cases").
**Expected:** Ambiguity score computed > 0.20; agent displays issues and prompts `refine` / `override`; typing `refine` loops back through Step 4 and re-scores; only after score ≤ 0.20 does the `## Test` section get written.
**Why human:** Ambiguity scoring is interpretive AI judgment; cannot be exercised offline.

### 3. acps-execute: sessions[] entry appended correctly

**Test:** Use a story file with a `## Plan` section containing tasks. Run `acps-execute`, complete at least one task, provide token counts when prompted.
**Expected:** Story YAML front-matter gains exactly one new `sessions[]` entry containing all required keys: `command: acps-execute`, `started_at`, `finished_at`, `duration_ms`, `tokens.input`, `tokens.output`, `tokens.total`, `model`.
**Why human:** Session timestamps and token collection require live agent interaction.

### 4. acps-homologate: totals written + failed stories routed

**Test:** Use a story with at least one recorded session in `sessions[]` and ACs in `## Test`. Run `acps-homologate`. Mark at least one AC as `fail`.
**Expected:** `totals` block written to YAML front-matter with correct aggregated values; `status: failed` set; output text explicitly routes to `acps-bug-fix`. Run again with all ACs passing: `status: homologated` set instead.
**Why human:** Requires a live story file with recorded sessions and interactive AC verdicts from the user.

---

## Gaps Summary

No structural gaps. All 11 skill directories exist with exactly `SKILL.md` + `workflow.md`. All SKILL.md files have correct `name:` frontmatter and the delegate line. All `workflow.md` files have a `<workflow>` root with 5 or 6 `<step>` blocks. The lint gate passes (64 files, 0 errors). All 6 roadmap success criteria are met at the static verification level.

Status is `human_needed` because the behavioral success criteria (SC-1, SC-4, SC-5, SC-6) require a live agent session to confirm that runtime behavior matches the workflow instructions.

---

_Verified: 2026-04-20_
_Verifier: Claude (gsd-verifier)_
