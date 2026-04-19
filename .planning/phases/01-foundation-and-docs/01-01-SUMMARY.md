---
phase: 01-foundation-and-docs
plan: 01
subsystem: infra
tags: [npm, semantic-release, markdownlint-cli2, package-json, gitignore]

# Dependency graph
requires: []
provides:
  - package.json with acps identity, bin entry, lint script, and all devDependencies
  - bin/install.js stub (node --check gate passes; npx acps@latest prints coming-in message)
  - .releaserc.json configuring semantic-release with 6 plugins and npmPublish: false
  - .gitignore excluding node_modules/ (retains .DS_Store)
  - .markdownlint.json with MD013/MD033/MD041 disabled
  - .markdownlintignore excluding CHANGELOG.md and node_modules/
affects: [02-02-ci-cd, all subsequent plans that depend on npm ci]

# Tech tracking
tech-stack:
  added:
    - markdownlint-cli2 ^0.22.0
    - semantic-release ^25.0.3
    - "@semantic-release/changelog ^6.0.3"
    - "@semantic-release/git ^10.0.1"
    - "@semantic-release/github ^12.0.6"
    - "@semantic-release/npm ^13.1.5"
    - "@inquirer/prompts ^8.4.1"
  patterns:
    - npm (not pnpm) as package manager — no corepack, standard npm ci in CI
    - semantic-release on main branch only with npmPublish: false (GitHub Releases only)
    - markdownlint-cli2 for Markdown quality gate

key-files:
  created:
    - package.json
    - bin/install.js
    - .releaserc.json
    - .markdownlint.json
    - .markdownlintignore
  modified:
    - .gitignore

key-decisions:
  - "npm (not pnpm) — no corepack, standard npm ci in CI (D-01)"
  - "npmPublish: false in .releaserc.json — GitHub Releases only, no npm registry in v1 (D-10)"
  - "markdownlint-cli2 lint script scoped to docs/**/*.md and *.md — does not reference templates/ or skills/ (not yet created)"

patterns-established:
  - "bin/install.js: shebang + stub message; passes node --check; full installer deferred to EP-M07"
  - "package.json version 0.0.0: semantic-release owns version bumps; never manually edit version"

requirements-completed: [FOUND-01, FOUND-04]

# Metrics
duration: 2min
completed: 2026-04-19
---

# Phase 1 Plan 01: npm Package Scaffold Summary

**npm package scaffold: package.json (acps), bin/install.js stub (node --check gate), .releaserc.json (semantic-release with npmPublish: false), and markdownlint config**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-04-19T02:22:38Z
- **Completed:** 2026-04-19T02:24:46Z
- **Tasks:** 3
- **Files modified:** 6

## Accomplishments

- Created `package.json` with correct `acps` identity, `bin.acps` entry, `markdownlint-cli2` lint script, and all required devDependencies (including `@semantic-release/npm` with `npmPublish: false`)
- Created `bin/install.js` stub that passes `node --check` and prints the "coming in v0.4.0" message when run via `npx acps@latest`
- Created `.releaserc.json` configuring semantic-release with all 6 plugins, `npmPublish: false`, and `[skip ci]` in the release commit message
- Extended `.gitignore` to exclude `node_modules/` while retaining `.DS_Store`; created `.markdownlint.json` (MD013/MD033/MD041 off) and `.markdownlintignore` (CHANGELOG.md, node_modules/)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create package.json** - `1614ee0` (feat)
2. **Task 2: Create bin/install.js stub and .releaserc.json** - `2db057f` (feat)
3. **Task 3: Update .gitignore and create markdownlint config files** - `bec3ec3` (chore)

## Files Created/Modified

- `package.json` — npm package identity, bin entry, lint script, all devDependencies
- `bin/install.js` — npx entrypoint stub; satisfies `node --check` CI gate
- `.releaserc.json` — semantic-release config with 6 plugins, npmPublish: false, GitHub Releases only
- `.gitignore` — appended `node_modules/` (retains `.DS_Store`; package-lock.json NOT excluded)
- `.markdownlint.json` — disables MD013 (line length), MD033 (inline HTML), MD041 (first heading)
- `.markdownlintignore` — excludes CHANGELOG.md (auto-generated) and node_modules/

## Decisions Made

- Used npm (not pnpm): `package.json` has no `packageManager` field; CI will use `npm ci` (D-01 locked)
- `@semantic-release/npm` included in devDependencies even though `npmPublish: false` — the plugin still runs `verifyConditions` and requires NPM_TOKEN in CI (Pitfall 1 from research)
- `@semantic-release/github` included despite not appearing in architecture.md — `.releaserc.json` plugin list requires it
- package-lock.json NOT added to .gitignore — must be committed for deterministic `npm ci` in CI

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required for this plan. CI/CD workflows (which require GitHub secrets `GITHUB_TOKEN` and `NPM_TOKEN`) are created in Plan 02.

## Known Stubs

- `bin/install.js` — intentional stub; full interactive installer deferred to EP-M07 (M-Iter-4, Phase 4). Prints "coming in v0.4.0" message. This is the expected behavior for Plan 01.

## Next Phase Readiness

- `npm install` can now run (package.json exists with all dependencies)
- `node --check bin/install.js` passes (CI gate satisfied)
- `semantic-release` is configured and will work once CI workflows are created in Plan 02
- `npm run lint` command is wired up (markdownlint-cli2 with correct glob) — will run once docs exist (Plan 03)
- No blockers for subsequent plans

---

*Phase: 01-foundation-and-docs*
*Completed: 2026-04-19*

## Self-Check: PASSED

- FOUND: package.json
- FOUND: bin/install.js
- FOUND: .releaserc.json
- FOUND: .gitignore
- FOUND: .markdownlint.json
- FOUND: .markdownlintignore
- FOUND: 01-01-SUMMARY.md
- Commits verified: 1614ee0, 2db057f, bec3ec3
