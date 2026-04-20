# Architecture Package — `agentic-cps-method`

## Document Information

- **Project:** Agentic CPS Method
- **Created:** 2026-04-18T00:00:00Z
- **Phase:** Setup
- **Iteration:** Pre-iteration (setup gate artifact)

---

## Overview

`agentic-cps-method` is a **pure-content repository** — no runtime, no server, no framework. It ships installable Claude Code skills, methodology documentation, and templates via a Node.js install script (`bin/install.js`), invoked with `npx acps@latest`.

The npm package name is **`acps`** (short, available). The GitHub repo remains `agentic-cps-method`.

The only runtime dependency is Node.js (for the installer). Everything else is Markdown + JSON consumed by the host IDE's AI.

---

## Architecture Decision: No Framework

**Decision:** The method repo has zero production framework dependencies.

**Rationale:** Skills are static Markdown + YAML artifacts consumed by the host IDE. A framework would add complexity, security surface, and update burden with zero user value. The installer needs only Node.js built-ins plus one prompting library.

**Trade-off accepted:** No REST API, no web UI, no build step. The cockpit UI lives in `agentic-cps-web` (separate repo).

---

## Repository structure

```
agentic-cps-method/
├── bin/
│   └── install.js              # npx entrypoint — Node.js 24 ESM, no deps except @inquirer/prompts
├── docs/
│   ├── getting-started.md
│   ├── phases/
│   │   ├── setup.md
│   │   ├── production-flow.md
│   │   └── value-activation.md
│   ├── practices/
│   │   ├── 01-develop-vision.md
│   │   ├── 02-develop-product-backlog.md
│   │   ├── 03-model-business-processes.md
│   │   ├── 04-perform-value-engineering.md
│   │   ├── 05-develop-architecture-package.md
│   │   ├── 06-perform-backlog-refinement.md
│   │   ├── 07-one-piece-flow.md
│   │   ├── 08-burn-quality-in.md
│   │   └── 09-continuous-homologation.md
│   ├── workflow/
│   │   ├── discuss.md
│   │   ├── spec.md
│   │   ├── plan.md
│   │   ├── execute.md
│   │   └── homologate.md
│   ├── standards/
│   │   ├── conventional-commits.md
│   │   ├── code-comments.md
│   │   ├── readme.md
│   │   ├── clean-code.md
│   │   └── agent-behavior.md
│   └── gates.md
├── skills/
│   ├── acps-init/
│   │   ├── SKILL.md
│   │   └── workflow.md
│   ├── acps-vision/
│   ├── acps-backlog/
│   ├── acps-architecture/
│   ├── acps-project-roadmap/
│   ├── acps-branch/
│   ├── acps-discuss/
│   ├── acps-spec/
│   ├── acps-plan/
│   ├── acps-execute/
│   ├── acps-homologate/
│   ├── acps-deliverable/
│   ├── acps-gate/
│   ├── acps-status/
│   ├── acps-report/
│   ├── acps-new-epic/
│   ├── acps-new-story/
│   ├── acps-new-bug/
│   ├── acps-bug-fix/
│   ├── acps-new-iteration/
│   ├── acps-pr/
│   ├── acps-pause/
│   ├── acps-resume/
│   ├── acps-note/
│   ├── acps-change-request/
│   ├── acps-scope-manager/
│   ├── acps-document-project/
│   ├── acps-scan/
│   ├── acps-code-map/
│   └── acps-help/
├── templates/
│   ├── specs/
│   │   ├── epic.md
│   │   └── story.md             # sessions[] + totals telemetry schema
│   ├── bugs/
│   │   └── bug-report.md
│   ├── phases/
│   │   ├── vision.md
│   │   ├── backlog.md
│   │   └── architecture-package.md
│   ├── deliverables/
│   │   ├── setup-deliverable.md
│   │   ├── iteration-report.md
│   │   ├── value-activation-deliverable.md
│   │   └── roadmap.md
│   └── reports/
│       ├── daily.md
│       ├── weekly.md
│       ├── monthly.md
│       └── quarterly.md
├── .planning/
│   ├── method/                  # active planning (this file)
│   └── web/                     # placeholder — starts after v1.0.0 ships
├── helps/
│   └── ecosystem-reference.md   # distilled context for AI agents
├── .github/
│   └── workflows/
│       ├── ci.yml               # lint on PR
│       └── release.yml          # semantic-release on main push
├── .releaserc.json
├── package.json
└── README.md
```

---

## Skill format

Each skill follows the lean-spec skill format:

```
skills/<skill-name>/
├── SKILL.md      # YAML frontmatter (name, description, triggers) + user-facing instructions
└── workflow.md   # XML-style steps (STEP, DECISION, OUTPUT blocks)
```

**SKILL.md frontmatter:**
```yaml
---
name: acps-discuss
description: GSD-style discuss loop with CPS discipline — extracts implementation decisions
triggers:
  - /acps-discuss
---
```

**Workflow steps use:** `<STEP>`, `<DECISION>`, `<OUTPUT>`, `<VALIDATION>` tags — same format as GSD skills.

**All skills write state via `leanspec` CLI** (adapter-agnostic — works with lean-spec board natively):
```bash
leanspec create spec --epic EP-01 --title "..."
leanspec update spec <id> --stage in-progress
leanspec view board
```

---

## Story tracking — sessions, tokens, and cost

Every ACPS command execution is captured as an individual session entry inside the story's YAML front-matter. This gives the web UI full granularity: cost and time broken down by GSD step, per story, per epic, per iteration, and for the entire project.

**Design principle:** each skill that runs against a story appends one `sessions[]` entry. `acps-homologate` computes and writes the `totals` block when the story is marked homologated.

**Story YAML front-matter:**
```yaml
---
id: EP-M01-001
title: Init repo structure
epic: EP-M01
stage: homologated           # backlog | in-progress | homologated

sessions:
  - command: acps-discuss
    started_at: 2026-04-20T09:00:00Z
    finished_at: 2026-04-20T09:18:00Z
    duration_ms: 1080000
    tokens:
      input: 2100
      output: 650
      total: 2750
    model: claude-sonnet-4-6

  - command: acps-spec
    started_at: 2026-04-20T09:25:00Z
    finished_at: 2026-04-20T09:42:00Z
    duration_ms: 1020000
    tokens:
      input: 3400
      output: 1100
      total: 4500
    model: claude-sonnet-4-6

  - command: acps-plan
    started_at: 2026-04-20T09:45:00Z
    finished_at: 2026-04-20T09:57:00Z
    duration_ms: 720000
    tokens:
      input: 1800
      output: 600
      total: 2400
    model: claude-sonnet-4-6

  - command: acps-execute
    started_at: 2026-04-20T10:05:00Z
    finished_at: 2026-04-20T11:10:00Z
    duration_ms: 3900000
    tokens:
      input: 9200
      output: 3800
      total: 13000
    model: claude-opus-4-7

  - command: acps-homologate
    started_at: 2026-04-20T11:15:00Z
    finished_at: 2026-04-20T11:28:00Z
    duration_ms: 780000
    tokens:
      input: 1400
      output: 420
      total: 1820
    model: claude-sonnet-4-6

totals:
  started_at: 2026-04-20T09:00:00Z
  finished_at: 2026-04-20T11:28:00Z
  duration_ms: 8880000               # wall clock (includes human wait time)
  active_ms: 7500000                 # Σ session.duration_ms (pure AI time)
  tokens:
    input: 17900
    output: 6570
    total: 24470
---
```

**UI calculations (agentic-cps-web):**

| Metric | Scope | Formula |
|---|---|---|
| Cost per story | story | `Σ session.(tokens.input × model_input_price + tokens.output × model_output_price) / 1_000_000` |
| Cost per step | story | same formula scoped to one session entry |
| Cost per epic / iteration / project | aggregated | `Σ story costs` |
| Cycle time | story/epic/iter | `totals.finished_at − totals.started_at` |
| Active time | story | `totals.active_ms` |
| Flow efficiency | story | `totals.active_ms / totals.duration_ms` |
| Wait time | story | `totals.duration_ms − totals.active_ms` |
| Throughput | iteration | Stories homologated per iteration |
| Step breakdown | story | Duration + cost per command |

All timestamps are **ISO 8601 UTC** (`Z` suffix). Offset variants accepted on input, normalized on write.

---

## Installer architecture

```
bin/install.js  (Node.js 24 ESM, ~200 lines)
```

**Prompts sequence (interactive):**
```
? Your name or team name:

? Communication language:
  ❯ English
    Español (Colombia / México / España)
    Português (Brasil)
    中文 (简体)
    日本語

? Document output language: (same options)

? Runtime (multi-select):
  ◉ Claude Code    ◯ Cursor      ◯ Windsurf
  ◯ GitHub Copilot ◯ Gemini CLI  ◯ Cline
  ◯ Augment        ◯ OpenCode    ◯ Codex
  ◯ Trae

? Location:
  ❯ Global
    Local

? Estimation method:
  ❯ BCP Full (10 functional + 3 NFR dimensions — CI&T standard)
    BCP Simplified (3 pillars — faster)
    FP + SNAP (IFPUG standard)
    BCP Full + FP+SNAP (dual reporting)
```

**Non-interactive flags:**
```bash
npx acps@latest --claude --global --estimation bcp_full --lang en --doc-lang en
```

**IDE destination paths:**

| IDE | Global path | Local path |
|---|---|---|
| Claude Code | `~/.claude/skills/` | `.claude/skills/` |
| Cursor | `~/.cursor/rules/` | `.cursor/rules/` |
| Windsurf | `~/.codeium/windsurf/rules/` | `.windsurfrules/` |
| GitHub Copilot | `~/.github/copilot-instructions/` | `.github/copilot-instructions/` |
| Gemini CLI | `~/.gemini/skills/` | `.gemini/skills/` |
| Cline | `~/.cline/rules/` | `.clinerules/` |
| Augment | `~/.augment/rules/` | `.augment/rules/` |
| OpenCode | `~/.opencode/skills/` | `.opencode/skills/` |
| Codex | `~/.codex/skills/` | `.codex/skills/` |
| Trae | `~/.trae/rules/` | `.trae/rules/` |

**`.acps-config.json` schema:**
```json
{
  "version": "1.0.0",
  "name": "Team",
  "communication_language": "English",
  "document_output_language": "English",
  "estimation": "bcp_full",
  "runtimes": ["claude"],
  "location": "global",
  "installed_at": "2026-04-18T00:00:00Z"
}
```

---

## CI/CD architecture

### `ci.yml` — runs on every PR

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@<SHA>
      - uses: actions/setup-node@<SHA>
        with: { node-version: '24' }
      - run: npm ci
      - run: npm run lint
      - run: node --check bin/install.js
```

### `release.yml` — runs on push to `main`

```yaml
on:
  push:
    branches: [main]
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@<SHA>
        with: { fetch-depth: 0 }
      - uses: actions/setup-node@<SHA>
        with: { node-version: '24' }
      - run: npm ci
      - run: npx semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## Semantic-release config

**`.releaserc.json`:**
```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    ["@semantic-release/git", {
      "assets": ["CHANGELOG.md", "package.json"],
      "message": "chore(release): ${nextRelease.version} [skip ci]"
    }],
    "@semantic-release/github"
  ]
}
```

**Version scheme:** `main` push → stable GitHub Release (`v0.1.0`, `v0.2.0`, …, `v1.0.0`)

---

## Package.json

```json
{
  "name": "acps",
  "version": "0.0.0",
  "type": "module",
  "bin": {
    "acps": "./bin/install.js"
  },
  "scripts": {
    "lint": "markdownlint-cli docs/ templates/ skills/ \"*.md\""
  },
  "devDependencies": {
    "@semantic-release/changelog": "^6.0.3",
    "@semantic-release/git": "^10.0.1",
    "markdownlint-cli": "^0.48.0",
    "semantic-release": "^25.0.3"
  },
  "dependencies": {
    "@inquirer/prompts": "^8.4.1"
  },
  "engines": {
    "node": ">=24"
  }
}
```

---

## Template format — lean-spec body structure

```markdown
## Overview
[What and why]

## Requirements
- [ ] Requirement 1

## Non-goals
- Not in scope: X

## Acceptance criteria
- [ ] AC 1: Given X, when Y, then Z
```

Story templates extend this with:
- `## BCP estimate` (score per dimension)
- `## Dependencies`
- YAML front-matter: `sessions[]` (one entry per ACPS command) + `totals` block (computed at homologation)

---

## Estimation architecture

**BCP Full — 13 dimensions:**

| # | Dimension | Category |
|---|---|---|
| 1 | User Interactions | Functional |
| 2 | Data Transactions | Functional |
| 3 | Data Stores | Functional |
| 4 | Integrations | Functional |
| 5 | Business Rules | Functional |
| 6 | Reports | Functional |
| 7 | Workflows | Functional |
| 8 | Security | Functional |
| 9 | Data Volume | Functional |
| 10 | Technical Complexity | Functional |
| 11 | Availability | NFR |
| 12 | Performance | NFR |
| 13 | Scalability | NFR |

Each dimension scored 1–5. Sum = BCP. Size bands: XS <5, S 5–10, M 11–20, L 21–35, XL >35.

---

## Code quality standards

### Conventional commits — [conventionalcommits.org v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/#summary)

| Type | SemVer bump | When |
|---|---|---|
| `feat` | MINOR | New capability |
| `fix` | PATCH | Bug correction |
| `docs` | — | Docs only |
| `refactor` | — | No behavior change |
| `test` | — | Tests only |
| `chore` | — | Tooling, deps |
| `ci` | — | CI/CD pipeline |
| `perf` | PATCH | Performance |
| `feat!` / `BREAKING CHANGE:` | MAJOR | Breaking change |

Scope for this repo: `epic-m01/iter-1`, `epic-m02/iter-1`, etc.

### Code commenting — [The Art of Commenting](https://medium.com/@douglas.rochedo/the-art-of-commenting-how-to-do-it-right-848e299771b8)

- Comment the **WHY**, never the WHAT
- No endline comments, no magic numbers without named constants
- Self-documenting names are the first priority

### README standard — [Kickass README guide](https://meakaakka.medium.com/a-beginners-guide-to-writing-a-kickass-readme-7ac01da88ab3)

Required sections: title + one-liner, why it exists, install command, quick start, links to docs.

### Agent behavior — [helpers repo](https://github.com/danielvm-ciandt/helpers)

Critical Partner Mindset: never affirm blindly, flag risks. Search First → Reuse First → No Assumptions → Challenge Ideas → Log Check → Self-Check.

---

## Scope & change management artifacts

`change-log.md` lives in the project root, created by `acps-change-request` at first use.

```markdown
---
baseline_bcp: <locked at gate approval>
current_bcp: <running total>
variance: <+/- delta>
status: balanced | overrun | under
last_updated: ISO 8601 UTC
---

| ID | Date | Title | Delta BCP | Type | Status | Running balance |
```

---

## Project intelligence artifacts

**`.planning/intel/`** — generated by `acps-document-project`:
```
index.md · project-overview.md · source-tree.md · component-inventory.md · dev-guide.md · scan-state.json
```

**`.planning/codebase/`** — generated by `acps-code-map`:
```
map-index.md · modules/<name>.md · dependency-graph.md · data-flow.md
```

---

## Phase gate checklist

- [x] vision.md written and reviewed
- [x] backlog.md written with all epics and iterations
- [x] roadmap.md written with BCP estimates and timeline
- [x] architecture.md written
- [ ] Gate approved → baseline BCP locked in `change-log.md` → M-Iter-1 unlocks
