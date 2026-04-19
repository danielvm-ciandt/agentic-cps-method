# Practice 05 — Develop Architecture Package

**CPS Chapter:** Ch.14 · Develop Architecture Package  
**Skill:** `/acps-architecture`

## Overview

The Architecture Package documents the technical decisions that shape the
entire project: stack choices, repository structure, installer architecture,
CI/CD design, and key ADRs (Architecture Decision Records). It is written once
during the Setup Phase and referenced by the AI agent throughout Production
Flow to maintain consistency.

In agentic development, the architecture document serves a dual purpose: it
guides the human team and it grounds the AI agent. A well-written architecture
package prevents the agent from making conflicting technology choices across
iterations.

## Requirements

- [ ] Tech stack documented: languages, frameworks, package managers, runtimes
- [ ] Repository structure diagrammed as a directory tree
- [ ] Installer architecture documented: prompts, IDE destinations, config schema
- [ ] CI/CD pipeline described: lint, release, branch protection rules
- [ ] Semantic-release config documented: branch mode, version scheme, plugins
- [ ] Key ADRs recorded: "No framework in method repo" style decisions with rationale

## Non-goals

- The Architecture Package does not specify story-level implementation details
- It does not cover operational runbooks — those belong in the project's wiki
- It is not updated after the setup gate without a formal change request

## Acceptance criteria

- [ ] AC 1: `architecture.md` exists in `.planning/` with repo structure tree
- [ ] AC 2: npm package name documented: `acps`
- [ ] AC 3: Invocation documented: `npx acps@latest`
- [ ] AC 4: All IDE destination paths listed (global + local) for all 10 IDEs
- [ ] AC 5: Story YAML schema documented: `sessions[]` + `totals` block
- [ ] AC 6: CI/CD workflows described matching actual `.github/workflows/` files

---

## Architecture Decision Records (ADRs)

### ADR-001: No framework in the method repo

**Decision:** Zero production framework dependencies.

**Rationale:** Skills are static Markdown artifacts consumed by the host IDE.
A framework adds complexity and security surface with no user value.

**Trade-off accepted:** No REST API, no build step. The cockpit lives in the
separate web repo.

### ADR-002: npm as the package manager

**Decision:** Standard npm with `package-lock.json`. No alternative package
managers or version managers.

**Rationale:** npm is the default Node.js package manager. Using npm keeps CI
configuration minimal and removes any version-pinning setup overhead. `npm ci`
provides deterministic installs from the lockfile.

**Trade-off accepted:** No workspace features. This repo has a single package —
workspaces are not needed.

### ADR-003: Semantic-release in branch mode

**Decision:** `main` → stable releases. `iteration/N` → pre-releases.

**Rationale:** Each iteration branch produces testable pre-release artifacts.
Stable releases only ship after gate approval and merge to main.

### ADR-004: No npm publish in v1

**Decision:** GitHub Releases only. `@semantic-release/npm` is included with
`npmPublish: false` — the package version is managed but not published to the
npm registry.

**Rationale:** v1 installs via `npx acps@latest` from the GitHub release. npm
publish is deferred to v2 when the installer is production-ready.

## CPS reference

Chapter 14 of the CPSBok covers architecture package development, including
technical architecture, solution architecture, and the CI&T architecture review
process. Agentic CPS focuses on the artifacts an AI agent needs to maintain
consistency across iterations.
