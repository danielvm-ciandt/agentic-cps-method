---
phase: 01-foundation-and-docs
reviewed: 2026-04-19T02:48:44Z
depth: standard
files_reviewed: 9
files_reviewed_list:
  - package.json
  - bin/install.js
  - .releaserc.json
  - .markdownlint.json
  - .markdownlintignore
  - .gitignore
  - .github/workflows/ci.yml
  - .github/workflows/release.yml
  - README.md
findings:
  critical: 0
  warning: 3
  info: 3
  total: 6
status: issues_found
---

# Phase 01: Code Review Report

**Reviewed:** 2026-04-19T02:48:44Z
**Depth:** standard
**Files Reviewed:** 9
**Status:** issues_found

## Summary

Nine foundation files reviewed: package manifest, installer stub, release configuration, markdown lint config, ignore files, CI/CD workflows, and README. No critical security vulnerabilities or correctness bugs were found. Three warnings surface a dead secret reference in the release workflow, unpinned GitHub Actions (supply chain concern), and a lint scope gap. Three info items cover minor quality/consistency notes.

## Warnings

### WR-01: NPM_TOKEN secret passed to a workflow that never publishes

**File:** `.github/workflows/release.yml:28`
**Issue:** `NPM_TOKEN` is injected as an environment variable on line 28, but `.releaserc.json` sets `"npmPublish": false` (line 9). The token is never consumed, but requiring it means the workflow will silently fail (or require an unnecessary secret to be provisioned) if the token is absent or rotated. It also creates a false expectation that the package is being published to npm.
**Fix:** Remove the `NPM_TOKEN` line from `release.yml` until publish is intentionally enabled. When publish is re-enabled, also add it back to `.releaserc.json`:
```yaml
# release.yml — remove this line while npmPublish is false
# NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

### WR-02: GitHub Actions pinned to floating major-version tags, not commit SHAs

**File:** `.github/workflows/ci.yml:14-15`, `.github/workflows/release.yml:17-18`
**Issue:** Both workflows use `actions/checkout@v4` and `actions/setup-node@v4`. Floating `@vN` tags can be moved by the action author to point at a different (potentially malicious) commit without any change to the workflow file. This is a supply-chain attack vector documented by GitHub Security Lab.
**Fix:** Pin each action to its full commit SHA. Retrieve current SHAs with `gh api /repos/actions/checkout/git/refs/tags/v4` and use the resolved SHA:
```yaml
# Example (verify SHA is current before using)
- uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683  # v4.2.2
- uses: actions/setup-node@39370e3970a6d050c480ffad4ff0ed4d3fdee5af  # v4.1.0
```

---

### WR-03: Markdown lint scope misses future `skills/` directory

**File:** `package.json:10`
**Issue:** The `lint` script pattern is `"docs/**/*.md" "*.md" "!CHANGELOG.md"`. The architecture in CLAUDE.md states `skills/<acps-*>/SKILL.md` and `skills/<acps-*>/workflow.md` are first-class source files. When the `skills/` directory is created (planned for later iterations), those files will silently bypass lint.
**Fix:** Add the `skills/` glob now so the linter scope grows with the repo:
```json
"lint": "markdownlint-cli2 \"docs/**/*.md\" \"skills/**/*.md\" \"*.md\" \"!CHANGELOG.md\""
```

---

## Info

### IN-01: `.gitignore` is minimal — consider adding common artifacts

**File:** `.gitignore:1-2`
**Issue:** Only `.DS_Store` and `node_modules/` are ignored. Common artifacts that could be accidentally committed include `.env` files, editor directories (`.idea/`, `.vscode/`), and OS files on other platforms (`Thumbs.db`). Not a current risk, but a safety net worth adding early.
**Fix:**
```gitignore
.DS_Store
Thumbs.db
node_modules/
.env
.env.local
.idea/
.vscode/
*.log
```

---

### IN-02: `MD040` (fenced code block language) disabled without documented reason

**File:** `.markdownlint.json:5`
**Issue:** `"MD040": false` silences the rule requiring language identifiers on fenced code blocks (e.g., ` ```bash ` vs bare ` ``` `). Code blocks without language tags lose syntax highlighting in GitHub rendering. The existing `docs/` files and README already use language tags consistently, making this disable overly broad.
**Fix:** Re-enable `MD040` and fix any bare fences in docs (the README already uses tagged fences, so compliance cost is low):
```json
"MD040": true
```

---

### IN-03: `bin/install.js` hardcodes a future version string

**File:** `bin/install.js:6`
**Issue:** The console output says `"coming in v0.4.0"`. This will become stale as the package evolves — it is not linked to `package.json`'s version field and will require a manual update. The package's current `version` in `package.json` is `"0.0.0"`.
**Fix:** When the stub is eventually replaced by the real installer (EP-M07), import `version` from `package.json` dynamically rather than hardcoding a target version string. For now, consider a vaguer string like `"full installer coming soon"` to avoid version drift.

---

_Reviewed: 2026-04-19T02:48:44Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
