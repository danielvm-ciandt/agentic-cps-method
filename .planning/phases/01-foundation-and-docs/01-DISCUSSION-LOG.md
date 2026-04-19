# Phase 1: Foundation & Docs - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-18
**Phase:** 01-foundation-and-docs
**Areas discussed:** Package manager, CI layout, Doc copy strategy, Markdownlint tool, README

---

## Package Manager

| Option | Description | Selected |
|--------|-------------|----------|
| pnpm (copy from old repo) | Preserves existing CI setup — pnpm/action-setup@v4, pnpm install --frozen-lockfile | |
| npm (architecture doc) | Simpler, no corepack needed — npm ci in CI, npm run lint locally | ✓ |

**User's choice:** npm (architecture doc)
**Notes:** This diverges from the old repo. Do not copy pnpm-related files.

---

## CI Layout

| Option | Description | Selected |
|--------|-------------|----------|
| Combined (copy old repo) | Single ci.yml with both lint and release jobs | |
| Separate files (architecture doc) | ci.yml for PRs, release.yml for main push | ✓ |

**User's choice:** Separate files per architecture doc
**Notes:** Clearer separation of concerns — lint gate vs release automation.

---

## Doc Copy Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Copy verbatim | Direct copy from old repo — fastest | |
| Copy and update | Copy then review each file for changes from new planning docs | ✓ |

**User's choice:** Copy and update
**Notes:** Content may have evolved since old repo was built (vision, architecture, backlog updated).

---

## Markdownlint Tool

| Option | Description | Selected |
|--------|-------------|----------|
| markdownlint-cli (architecture doc) | Simpler, no config file needed | |
| markdownlint-cli2 (old repo) | More powerful, supports .markdownlint.json config | ✓ |

**User's choice:** markdownlint-cli2
**Notes:** Keep the more capable tool — already proven in old repo.

---

## README

| Option | Description | Selected |
|--------|-------------|----------|
| Copy and update | Start from old README | |
| Write fresh | New README from scratch following kickass-readme standard | ✓ |

**User's choice:** Write fresh README
**Notes:** Old README is tied to old repo history. Fresh README targets first-time GitHub visitors.

---

## Claude's Discretion

- Exact markdownlint rule configuration
- Node.js version pinning in workflows
- Whether to add `.markdownlint.json`
