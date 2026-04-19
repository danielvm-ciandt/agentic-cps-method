# Phase 1: Foundation & Docs - Research

**Researched:** 2026-04-18
**Domain:** npm package setup, GitHub Actions CI/CD, semantic-release, markdownlint-cli2, Markdown docs migration
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Use npm (not pnpm). No corepack, no pnpm-lock.yaml. CI uses `npm ci`.
- **D-02:** Two separate workflow files: `.github/workflows/ci.yml` and `.github/workflows/release.yml`.
- **D-03:** `ci.yml` triggers on `pull_request` to `main` and `iteration/*` branches. Runs `npm ci`, `npm run lint`, and `node --check bin/install.js`.
- **D-04:** `release.yml` triggers on push to `main`. Runs semantic-release with `GITHUB_TOKEN` and `NPM_TOKEN` secrets.
- **D-05:** Use markdownlint-cli2 (not markdownlint-cli). Lint script: `markdownlint-cli2 "docs/**/*.md" "*.md" "!CHANGELOG.md"`.
- **D-06:** Copy `bin/install.js` stub from old repo verbatim.
- **D-07:** Copy all docs from old repo then review and update each file. Do NOT blindly overwrite.
- **D-08:** Files to copy: `getting-started.md`, `gates.md`, `phases/` (3), `practices/` (9), `workflow/` (5), `standards/` (5).
- **D-09:** Write a fresh README — do not copy from old repo.
- **D-10:** Copy `.releaserc.json` from old repo, keep `"npmPublish": false`.

### Claude's Discretion

- Exact markdownlint rule configuration (whether to add `.markdownlint.json` or use defaults)
- Node.js version pinning in workflows (>=24 is the constraint, exact version choice is Claude's)
- Branch protection rules documentation in README (recommend but don't configure)

### Deferred Ideas (OUT OF SCOPE)

- npm registry publish — `npmPublish: false` enforces this
- Branch protection rule enforcement — document in README, not automated here
- `.markdownlint.json` config file — add only if lint runs produce noise
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FOUND-01 | Repo has `package.json` with `name: "acps"`, `bin` pointing to `bin/install.js`, correct devDependencies, and `@inquirer/prompts` as production dep | package.json schema documented below; versions verified against npm registry |
| FOUND-02 | `.github/workflows/ci.yml` runs markdownlint + `node --check bin/install.js` on every PR | Workflow pattern documented; old repo had combined file, new must be split |
| FOUND-03 | `.github/workflows/release.yml` runs semantic-release on push to `main`, producing a GitHub Release | Documented in Architecture Patterns; requires `fetch-depth: 0` and both tokens |
| FOUND-04 | `.releaserc.json` configures semantic-release with commit-analyzer, changelog, git, github plugins | Old `.releaserc.json` verified — copy verbatim, keep `npmPublish: false` |
| FOUND-05 | `README.md` exists with methodology overview, install command, and quick start | Kickass-readme standard documented; write fresh per D-09 |
| DOCS-01 | `docs/phases/` has setup.md, production-flow.md, value-activation.md | All 3 files verified in old repo — none contain pnpm refs, safe to copy verbatim |
| DOCS-02 | `docs/practices/` has 9 files covering all filtered CPS practices | All 9 files verified; 2 need pnpm/corepack updates (05, 09) |
| DOCS-03 | `docs/workflow/` has discuss.md, spec.md, plan.md, execute.md, homologate.md | All 5 exist; 4 need pnpm updates (discuss, spec, plan, homologate); execute.md clean |
| DOCS-04 | `docs/gates.md` defines gate conditions per phase and per iteration | Verified in old repo — no pnpm refs, safe to copy verbatim |
| DOCS-05 | `docs/getting-started.md` guides first-time users from install to first iteration | Verified — has pnpm requirement line, needs update |
| DOCS-06 | `docs/standards/` has 5 files: conventional-commits.md, code-comments.md, readme.md, clean-code.md, agent-behavior.md | All 5 verified; 4 need pnpm updates; clean-code.md is clean |
</phase_requirements>

---

## Summary

Phase 1 is a file-assembly phase, not a build phase. The repo starts with only `CLAUDE.md` and `.planning/` — everything else must be created. The primary work is: (1) write `package.json`, `bin/install.js`, `.releaserc.json`, and two GitHub Actions workflows; (2) copy 24 docs files from the old repo and update 11 of them for the npm-instead-of-pnpm decision; (3) write a fresh `README.md`.

The old repo is the canonical source for nearly all content in this phase. It already uses markdownlint-cli2 (same tool), the same docs structure, and a `.releaserc.json` that is 90% correct. The primary delta between old and new is the package manager switch from pnpm to npm, which affects the CI workflow patterns and 11 docs files with pnpm/corepack references.

Two important discrepancies exist between the architecture.md planning doc and the locked decisions: (1) architecture.md shows `markdownlint-cli` but D-05 locks `markdownlint-cli2` — the CONTEXT.md decision wins; (2) architecture.md's package.json template omits `@semantic-release/npm` but D-10 says copy `.releaserc.json` from old repo which includes it with `npmPublish: false` — the old `.releaserc.json` must be used, and `@semantic-release/npm` must be in devDependencies.

**Primary recommendation:** Create all files in a single wave in dependency order: package.json first (unlocks `npm ci`), then `.releaserc.json` and workflows (unlocks CI verification), then `bin/install.js` (unlocks `node --check` gate), then docs tree (24 files), then README last.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Package identity + bin entry | npm package manifest | — | `package.json` is the npm package contract |
| Lint gate (PR) | GitHub Actions (ci.yml) | markdownlint-cli2 (tool) | CI enforces quality; tool does the checking |
| Release automation | GitHub Actions (release.yml) | semantic-release (tool) | CI triggers; semantic-release reads commits |
| Installer stub | Node.js script (bin/install.js) | — | Satisfies `node --check`; no runtime logic yet |
| Methodology docs | Markdown files (docs/) | — | Static content; no processing layer |
| README | Markdown file (root) | — | GitHub-rendered; human-facing entry point |

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| markdownlint-cli2 | 0.22.0 | Lint Markdown files in CI | Old repo already uses it; D-05 locks it; faster than markdownlint-cli |
| semantic-release | 25.0.3 | Automated versioning + GitHub Releases | Standard for conventional-commits repos; no manual tag management |
| @semantic-release/changelog | 6.0.3 | Generates CHANGELOG.md from commits | Required by .releaserc.json |
| @semantic-release/git | 10.0.1 | Commits CHANGELOG.md + package.json back to repo | Required by .releaserc.json |
| @semantic-release/github | 12.0.6 | Creates GitHub Release | Required by .releaserc.json |
| @semantic-release/npm | 13.1.5 | npm integration (publish disabled) | Required by .releaserc.json (copied from old repo); `npmPublish: false` |

[VERIFIED: npm registry — all versions checked 2026-04-18]

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @inquirer/prompts | 8.4.1 | Interactive CLI prompts | Production dep for installer (stub only in Phase 1, full in Phase 4) |

[VERIFIED: npm registry]

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| markdownlint-cli2 | markdownlint-cli | markdownlint-cli2 is newer, faster, and uses glob patterns natively — old repo already uses it |
| semantic-release | release-please, standard-version | semantic-release is the de facto standard for conventional commits; fully automated |
| @semantic-release/npm (npmPublish: false) | Omitting the plugin | Omitting avoids NPM_TOKEN requirement; but D-10 locks "copy .releaserc.json verbatim" which includes the plugin |

**Installation:**

```bash
npm install
```

`package.json` will specify all devDependencies — `npm ci` is the CI command.

**Version verification:** All versions verified against npm registry on 2026-04-18.

---

## Architecture Patterns

### System Architecture Diagram

```
PR pushed to main or iteration/* branch
        |
        v
[ci.yml — GitHub Actions]
        |
        +---> npm ci
        |
        +---> npm run lint
        |     (markdownlint-cli2 "docs/**/*.md" "*.md" "!CHANGELOG.md")
        |
        +---> node --check bin/install.js
        |
        v
      PASS / FAIL (blocks merge on fail)

Push to main branch
        |
        v
[release.yml — GitHub Actions]
        |
        +---> npm ci
        |
        +---> npx semantic-release
              |
              +---> reads commit messages since last tag
              |
              +---> determines version bump (feat=MINOR, fix=PATCH)
              |
              +---> writes CHANGELOG.md
              |
              +---> commits CHANGELOG.md + package.json [skip ci]
              |
              +---> creates GitHub Release + git tag
```

### Recommended Project Structure

```
agentic-cps-method/
├── bin/
│   └── install.js              # 3-line stub; "coming in v0.4.0"
├── docs/
│   ├── getting-started.md      # copy + update (pnpm -> npm)
│   ├── gates.md                # copy verbatim
│   ├── phases/
│   │   ├── setup.md            # copy verbatim
│   │   ├── production-flow.md  # copy verbatim
│   │   └── value-activation.md # copy verbatim
│   ├── practices/
│   │   ├── 01-develop-vision.md          # copy verbatim
│   │   ├── 02-develop-product-backlog.md # copy verbatim
│   │   ├── 03-model-business-processes.md # copy verbatim
│   │   ├── 04-perform-value-engineering.md # copy verbatim
│   │   ├── 05-develop-architecture-package.md # copy + update (ADR-002 pnpm->npm)
│   │   ├── 06-perform-backlog-refinement.md # copy verbatim
│   │   ├── 07-one-piece-flow.md          # copy verbatim
│   │   ├── 08-burn-quality-in.md         # copy verbatim
│   │   └── 09-continuous-homologation.md # copy + update (pnpm->npm)
│   ├── workflow/
│   │   ├── discuss.md     # copy + update (pnpm->npm in examples)
│   │   ├── spec.md        # copy + update (pnpm->npm)
│   │   ├── plan.md        # copy + update (pnpm->npm tasks)
│   │   ├── execute.md     # copy verbatim
│   │   └── homologate.md  # copy + update (pnpm->npm)
│   └── standards/
│       ├── conventional-commits.md # copy + update (pnpm example->npm)
│       ├── code-comments.md        # copy + update (pnpm comment example->npm)
│       ├── readme.md               # copy + update (pnpm requirement->npm)
│       ├── clean-code.md           # copy verbatim
│       └── agent-behavior.md       # copy + update (pnpm check->npm)
├── .github/
│   └── workflows/
│       ├── ci.yml          # NEW — split from old repo's combined file
│       └── release.yml     # NEW — split from old repo's combined file
├── .gitignore              # extend existing (add node_modules)
├── .markdownlint.json      # copy from old repo (MD013, MD033, MD041 off)
├── .markdownlintignore     # copy from old repo (CHANGELOG.md, node_modules/)
├── .releaserc.json         # copy from old repo, keep npmPublish: false
├── package.json            # NEW — see schema below
└── README.md               # NEW — fresh, kickass-readme standard
```

### Pattern 1: GitHub Actions — ci.yml (split from old combined workflow)

The old repo uses a single combined `ci.yml` that handles both lint and release. D-02 mandates two separate files. The new `ci.yml` is lint-only.

```yaml
# Source: architecture.md + D-03 decisions
name: CI

on:
  pull_request:
    branches:
      - main
      - 'iteration/*'

jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '24'
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: node --check bin/install.js
```

Key differences from old repo's workflow:
- No `pnpm/action-setup` step (npm is native to setup-node)
- `cache: npm` instead of `cache: pnpm`
- `npm ci` instead of `pnpm install --frozen-lockfile`
- No `release` job (moved to release.yml)
- Trigger: `pull_request` only (not `push` to main)

### Pattern 2: GitHub Actions — release.yml

```yaml
# Source: architecture.md release.yml section + D-04
name: Release

on:
  push:
    branches:
      - main

permissions:
  contents: write
  issues: write
  pull-requests: write

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: '24'
          cache: npm
      - run: npm ci
      - run: npx semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Critical detail: `fetch-depth: 0` is required for semantic-release to read the full git history and determine the correct version bump.

### Pattern 3: package.json

```json
{
  "name": "acps",
  "version": "0.0.0",
  "description": "Agentic CPS — installable CPS methodology skills for AI-powered development teams",
  "type": "module",
  "bin": {
    "acps": "./bin/install.js"
  },
  "scripts": {
    "lint": "markdownlint-cli2 \"docs/**/*.md\" \"*.md\" \"!CHANGELOG.md\""
  },
  "engines": {
    "node": ">=24"
  },
  "dependencies": {
    "@inquirer/prompts": "^8.4.1"
  },
  "devDependencies": {
    "@semantic-release/changelog": "^6.0.3",
    "@semantic-release/git": "^10.0.1",
    "@semantic-release/github": "^12.0.6",
    "@semantic-release/npm": "^13.1.5",
    "markdownlint-cli2": "^0.22.0",
    "semantic-release": "^25.0.3"
  },
  "keywords": ["agentic", "cps", "methodology", "claude-code", "skills", "sdd"],
  "license": "MIT"
}
```

Notes:
- `@semantic-release/npm` IS included because `.releaserc.json` (copied from old repo) references it
- `markdownlint-cli2` is correct (not `markdownlint-cli` as shown in architecture.md) per D-05
- Lint script scope: `docs/**/*.md` and root `*.md` — covers Phase 1 deliverables exactly

### Pattern 4: .releaserc.json (copy from old repo)

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@semantic-release/changelog", {
      "changelogFile": "CHANGELOG.md"
    }],
    ["@semantic-release/npm", { "npmPublish": false }],
    ["@semantic-release/git", {
      "assets": ["package.json", "CHANGELOG.md"],
      "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
    }],
    ["@semantic-release/github", { "failComment": false, "failTitle": false }]
  ]
}
```

[VERIFIED: read from `/Users/danielvm/Sites/old-agentic-cps-method/.releaserc.json`]

### Pattern 5: bin/install.js (copy verbatim from old repo)

```javascript
#!/usr/bin/env node

// Installer stub — full interactive install implemented in EP-M07 (M-Iter-4).
// This file exists to satisfy CI's `node --check bin/install.js` gate.

console.log('Agentic CPS installer — coming in v0.4.0.');
console.log('For docs: https://github.com/danielvm-ciandt/agentic-cps-method');
```

[VERIFIED: read from `/Users/danielvm/Sites/old-agentic-cps-method/bin/install.js`]

### Pattern 6: markdownlint configuration (copy from old repo)

`.markdownlint.json`:
```json
{
  "default": true,
  "MD013": false,
  "MD033": false,
  "MD041": false
}
```

`.markdownlintignore`:
```
CHANGELOG.md
node_modules/
```

These rules disable: MD013 (line length), MD033 (inline HTML), MD041 (first heading). The old repo verified that the existing docs pass with this config. Copy both files.

[VERIFIED: read from `/Users/danielvm/Sites/old-agentic-cps-method/.markdownlint.json` and `.markdownlintignore`]

### Anti-Patterns to Avoid

- **Using pnpm/action-setup in ci.yml:** New workflows must use npm — no `pnpm/action-setup`, no `cache: pnpm`, no `--frozen-lockfile`.
- **Single combined workflow file:** Old repo had one file for both lint + release. D-02 requires two separate files.
- **Copying package.json from old repo:** Old repo has `"packageManager": "pnpm@10.10.0"` — do NOT copy this field.
- **Using markdownlint-cli instead of markdownlint-cli2:** Architecture.md has a typo/outdated entry — D-05 is authoritative.
- **Omitting @semantic-release/npm from devDependencies:** The .releaserc.json plugin list requires it even with `npmPublish: false`.
- **Committing CHANGELOG.md manually:** semantic-release auto-generates it. Do not create it; add it to `.gitignore` if needed, or let semantic-release manage it.
- **Using `fetch-depth: 1` (default) in release.yml:** semantic-release needs full git history to compute versions — must use `fetch-depth: 0`.
- **Forgetting permissions block in release.yml:** semantic-release needs `contents: write`, `issues: write`, `pull-requests: write` to create releases and close issues.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Version bumping from commit messages | Custom version parser | semantic-release | Handles edge cases: pre-releases, force patch, multi-branch; battle-tested |
| Markdown linting | Custom regex checks | markdownlint-cli2 | 50+ rules, configurable, fast; reinventing this is a maintenance trap |
| GitHub Release creation | Custom GitHub API calls | @semantic-release/github | Handles release notes formatting, asset upload, release editing |
| CHANGELOG generation | Custom git log formatting | @semantic-release/changelog | Correct grouping, breaking change handling, link generation |

**Key insight:** This phase is entirely about assembling proven tools. Every custom solution here would be re-implementing what semantic-release's plugin ecosystem already does correctly.

---

## Common Pitfalls

### Pitfall 1: NPM_TOKEN required even with npmPublish: false

**What goes wrong:** CI release job fails with `ENEEDAUTH: need auth` because `@semantic-release/npm` still runs its `verifyConditions` step even when `npmPublish: false`.

**Why it happens:** The plugin always verifies auth credentials in `verifyConditions`, regardless of publish setting.

**How to avoid:** Set `NPM_TOKEN` in GitHub repository secrets (even a placeholder value works if you truly never publish). D-04 already specifies both `GITHUB_TOKEN` and `NPM_TOKEN` in release.yml env.

**Warning signs:** CI log shows `ENEEDAUTH` or `Invalid npm token` during the `verifyConditions` step.

### Pitfall 2: Git history truncated — semantic-release picks wrong version

**What goes wrong:** semantic-release tags the release as `v0.1.0` when it should be a later version, or fails with "no commits found."

**Why it happens:** Default `actions/checkout` uses `fetch-depth: 1` (shallow clone). semantic-release needs the full tag history to find the previous release tag.

**How to avoid:** Always set `fetch-depth: 0` in the `actions/checkout` step of release.yml.

**Warning signs:** semantic-release log says "no commits since last release" when there clearly are commits.

### Pitfall 3: pnpm references remain in docs after copy

**What goes wrong:** The lint step passes (markdownlint doesn't check for pnpm), but the docs instruct users to install pnpm — broken user experience.

**Why it happens:** 11 of 24 docs files contain pnpm/corepack references from the old repo. Copy-without-review propagates the outdated content.

**How to avoid:** After copying each file, search for `pnpm`, `corepack`, `packageManager`, `pnpm-lock`. Update to `npm`, remove corepack steps, update `npm ci`/`npm install` equivalents.

**Warning signs:** `grep -r "pnpm" docs/` returns any results after migration.

### Pitfall 4: Lint scope too broad — Phase 1 docs trigger false failures

**What goes wrong:** Lint script references `templates/` or `skills/` that don't exist yet in Phase 1, causing markdownlint to fail.

**Why it happens:** Architecture.md shows a broader lint script (`markdownlint-cli docs/ templates/ skills/ "*.md"`). If implemented, it would try to lint nonexistent directories.

**How to avoid:** Use D-05's lint script exactly: `markdownlint-cli2 "docs/**/*.md" "*.md" "!CHANGELOG.md"`. This covers what exists in Phase 1; it auto-expands in later phases when those directories exist.

**Warning signs:** `npm run lint` fails with "no files found" or "directory not found."

### Pitfall 5: .gitignore missing node_modules

**What goes wrong:** `node_modules/` gets committed (large, pointless, breaks CI).

**Why it happens:** The current `.gitignore` only excludes `.DS_Store`. `npm ci` will create `node_modules/`.

**How to avoid:** Extend `.gitignore` with `node_modules/` and `package-lock.json` (if not committing lockfile).

**Note on lockfile:** `package-lock.json` SHOULD be committed so `npm ci` works deterministically. Do NOT add it to .gitignore.

### Pitfall 6: README includes pnpm in Requirements section

**What goes wrong:** README instructs users to install pnpm.

**Why it happens:** The old README template in `docs/standards/readme.md` lists pnpm as a requirement. Writing fresh README from the template without removing pnpm.

**How to avoid:** Requirements section should only say `Node.js >= 24`. No package manager requirement for end users (they run `npx acps@latest`).

---

## Code Examples

### Doc update pattern — pnpm to npm substitution

Files needing pnpm -> npm updates follow this substitution pattern:

| Old text | Replace with |
|----------|-------------|
| `pnpm ≥ 10 (installed via corepack)` | remove (Node.js >=24 is the only requirement) |
| `pnpm install --frozen-lockfile` | `npm ci` |
| `pnpm run lint` | `npm run lint` |
| `pnpm install` | `npm install` |
| `packageManager: "pnpm@10.10.0"` | remove (not used with npm) |
| `corepack enable` | remove |
| `pnpm/action-setup@v4` | remove action entirely |
| `cache: pnpm` | `cache: npm` |
| ADR-002 (pnpm decision) in `05-develop-architecture-package.md` | Update ADR-002: "npm as the package manager — no corepack, standard `npm ci` in CI" |

### README structure (kickass-readme standard, D-09)

Per `docs/standards/readme.md` from old repo:

```markdown
# acps

One-line description of what this is.

## Why it exists

[Problem paragraph — 2-4 sentences]

## Install

\`\`\`bash
npx acps@latest
\`\`\`

## Quick start

\`\`\`text
/acps-help     → methodology overview + recommended next command
/acps-init     → creates .planning/ in your project
/acps-branch   → create semantic branch (always first)
\`\`\`

## Documentation

- [Getting started](docs/getting-started.md)
- ...

## Requirements

- Node.js >= 24
```

Do NOT include pnpm in Requirements. Do NOT copy the old README.

---

## Doc File Inventory

24 total files to handle — verified by directory listing of old repo:

| File | Action | Reason |
|------|--------|--------|
| `docs/getting-started.md` | Copy + update | Has `pnpm >= 10` requirement |
| `docs/gates.md` | Copy verbatim | No pnpm refs |
| `docs/phases/setup.md` | Copy verbatim | No pnpm refs |
| `docs/phases/production-flow.md` | Copy verbatim | No pnpm refs |
| `docs/phases/value-activation.md` | Copy verbatim | No pnpm refs |
| `docs/practices/01-develop-vision.md` | Copy verbatim | No pnpm refs |
| `docs/practices/02-develop-product-backlog.md` | Copy verbatim | No pnpm refs |
| `docs/practices/03-model-business-processes.md` | Copy verbatim | No pnpm refs |
| `docs/practices/04-perform-value-engineering.md` | Copy verbatim | No pnpm refs |
| `docs/practices/05-develop-architecture-package.md` | Copy + update | ADR-002 is pnpm decision; needs npm rewrite |
| `docs/practices/06-perform-backlog-refinement.md` | Copy verbatim | No pnpm refs |
| `docs/practices/07-one-piece-flow.md` | Copy verbatim | No pnpm refs |
| `docs/practices/08-burn-quality-in.md` | Copy verbatim | No pnpm refs |
| `docs/practices/09-continuous-homologation.md` | Copy + update | AC has `packageManager` field and `pnpm install` |
| `docs/workflow/discuss.md` | Copy + update | Example decisions reference pnpm |
| `docs/workflow/spec.md` | Copy + update | AC references `pnpm install` |
| `docs/workflow/plan.md` | Copy + update | Tasks reference `pnpm install`, `pnpm run lint` |
| `docs/workflow/execute.md` | Copy verbatim | No pnpm refs |
| `docs/workflow/homologate.md` | Copy + update | ACs reference `pnpm install`, `pnpm run lint` |
| `docs/standards/conventional-commits.md` | Copy + update | Example commit has `pnpm@10.10.0` in description |
| `docs/standards/code-comments.md` | Copy + update | Example comment references pnpm |
| `docs/standards/readme.md` | Copy + update | Template Requirements section lists pnpm |
| `docs/standards/clean-code.md` | Copy verbatim | No pnpm refs |
| `docs/standards/agent-behavior.md` | Copy + update | Has `pnpm install --frozen-lockfile` check |

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Single combined ci.yml (lint + release) | Two separate ci.yml + release.yml | D-02 decision | Cleaner separation of concerns; release.yml only runs on main |
| pnpm + corepack | npm (standard) | D-01 decision | Removes corepack complexity from CI; `npm ci` is simpler |
| markdownlint-cli | markdownlint-cli2 | Old repo already uses cli2 | Glob-first, faster, configurable via .markdownlint.json |

**Deprecated/outdated:**
- `pnpm/action-setup@v4`: Do not use in new workflows — no pnpm in this repo
- `packageManager` field in package.json: Not needed with npm
- Combined lint + release workflow: Split per D-02

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `@semantic-release/npm` v13.x still runs `verifyConditions` even with `npmPublish: false`, requiring NPM_TOKEN | Pitfall 1 | If the behavior changed, NPM_TOKEN is optional — release.yml would still work without it |
| A2 | `node --check bin/install.js` passes on the 3-line stub (no syntax to fail) | Standard Stack | No risk — the stub is trivially valid JS |
| A3 | GitHub Actions `actions/checkout@v4` and `actions/setup-node@v4` are current and unpinned tags are acceptable | Architecture Patterns | Unpinned tags can introduce breaking changes; pinning to SHAs is more secure but requires more maintenance |

**Claim A1 and A3 are [ASSUMED]** — based on training knowledge. A1 can be validated during execution by checking `@semantic-release/npm` changelog. A3 is a deliberate tradeoff — the architecture doc shows `@v4` tags (not SHAs); matching that pattern.

---

## Open Questions

1. **SHA pinning for GitHub Actions**
   - What we know: The architecture.md shows `actions/checkout@v4` (tag, not SHA). The old repo also uses tags.
   - What's unclear: Whether this project requires SHA-pinned actions for security.
   - Recommendation: Use `@v4` tags matching the architecture doc and old repo pattern. If security requirements change, pin to SHAs.

2. **NPM_TOKEN placeholder value**
   - What we know: `@semantic-release/npm` with `npmPublish: false` may still check for NPM_TOKEN in `verifyConditions`.
   - What's unclear: Whether a dummy/placeholder value satisfies the check.
   - Recommendation: Document in README/workflow comment that NPM_TOKEN must be set in GitHub Secrets (even as a placeholder string).

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | bin/install.js, npm ci | ✓ | v22.15.0 (local) | — |
| npm | npm ci, npm run lint | ✓ | 10.9.2 | — |
| GitHub Actions | CI/CD workflows | ✓ (remote) | — | — |

**Note on Node.js version:** Local machine has Node.js v22.15.0 but workflows will use Node.js 24 via `actions/setup-node`. The `engines.node: ">=24"` constraint only applies at runtime — the local dev environment does not need Node.js 24 to write the files in Phase 1. The stub `bin/install.js` will pass `node --check` on any recent Node.js version.

**Missing dependencies with no fallback:** None.

---

## Validation Architecture

> nyquist_validation is explicitly `false` in `.planning/config.json` — this section is skipped.

---

## Security Domain

> security_enforcement is not set in config — treated as enabled.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | No auth in this phase |
| V3 Session Management | No | No sessions |
| V4 Access Control | No | No access control logic |
| V5 Input Validation | No | No user input (bin/install.js is a stub) |
| V6 Cryptography | No | No crypto |

### Known Threat Patterns

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Malicious GitHub Action supply chain | Tampering | Use pinned action versions (@v4 tags minimum; SHAs preferred) |
| NPM_TOKEN exposure in logs | Information Disclosure | Never echo secrets; GitHub Actions masks secrets automatically |
| semantic-release push bypasses branch protection | Elevation of Privilege | Use `[skip ci]` in release commit message; review branch protection rules |

---

## Sources

### Primary (HIGH confidence)
- `/Users/danielvm/Sites/old-agentic-cps-method/` — old repo read directly: `bin/install.js`, `.releaserc.json`, `package.json`, all 24 docs files, `.markdownlint.json`, `.markdownlintignore`, `.github/workflows/ci.yml`
- `/Users/danielvm/Sites/agentic-cps-method/.planning/phases/01-foundation-and-docs/01-CONTEXT.md` — locked decisions D-01 through D-10
- `/Users/danielvm/Sites/agentic-cps-method/.planning/method/architecture.md` — package.json schema, CI/CD architecture, semantic-release config
- npm registry (`npm view <package> version`) — all package versions verified 2026-04-18

### Secondary (MEDIUM confidence)
- `/Users/danielvm/Sites/agentic-cps-method/.planning/REQUIREMENTS.md` — requirement IDs and descriptions
- `/Users/danielvm/Sites/agentic-cps-method/.planning/method/vision.md` — project context

### Tertiary (LOW confidence)
- [ASSUMED] @semantic-release/npm behavior with `npmPublish: false` — not re-verified from official docs this session

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all versions verified against npm registry
- Architecture: HIGH — patterns copied from verified sources (old repo + architecture.md + CONTEXT.md decisions)
- Doc inventory: HIGH — all 24 files verified by directory listing and spot reads
- Pitfalls: MEDIUM — pnpm pitfall verified by grep; semantic-release pitfalls based on training knowledge

**Research date:** 2026-04-18
**Valid until:** 2026-05-18 (stable ecosystem; npm packages don't change behavior in 30 days)
