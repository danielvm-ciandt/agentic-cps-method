# Practice 08 — Burn Quality In

**CPS Chapter:** Ch.27 · Burn Quality In  
**Skills:** `/acps-spec` (ambiguity gate) · `/acps-execute` (commit standards) · `/acps-homologate` (AC verification)

## Overview

Burn Quality In means building quality into each story as it is written, not
inspecting it in after the fact. In Agentic CPS, this runs at three moments:

1. **Before execution** — `/acps-spec` enforces an ambiguity gate (score ≤ 0.20)
   so the AI never starts coding against a vague requirement
2. **During execution** — `/acps-execute` enforces conventional commits, code
   commenting standards, and Clean Code principles at every commit
3. **After execution** — `/acps-homologate` walks every acceptance criterion
   before marking the story complete

Quality is not a phase at the end — it is a property of every commit.

## Requirements

- [ ] `/acps-spec` ambiguity gate must pass (≤ 0.20) before `/acps-execute` runs
- [ ] Every commit follows conventional commit format: `type(scope): description`
- [ ] Code comments explain WHY, never WHAT — no inline comments, no magic numbers
- [ ] Functions do one thing, ≤ 20 lines, no flag arguments (Clean Code)
- [ ] `/acps-homologate` verifies every AC before the story is marked complete

## Non-goals

- Burn Quality In does not require 100% test coverage as a hard gate
- It does not enforce a specific testing framework — it enforces testable design
- It does not replace code review — it sets the minimum bar before review

## Acceptance criteria

- [ ] AC 1: No story reaches `/acps-execute` with ambiguity score > 0.20
- [ ] AC 2: All commits in `git log` follow `type(scope): description` format
- [ ] AC 3: No magic numbers in committed code — all constants are named
- [ ] AC 4: No function in committed code exceeds 20 lines
- [ ] AC 5: `/acps-homologate` confirms all ACs before story is marked homologated

---

## Ambiguity gate

`/acps-spec` scores each acceptance criterion on a 0.00–1.00 ambiguity scale:

| Score | Meaning | Action |
|-------|---------|--------|
| 0.00–0.20 | Clear — passes gate | Proceed to `/acps-plan` |
| 0.21–0.50 | Unclear — needs refinement | Clarify before proceeding |
| 0.51–1.00 | Ambiguous — blocked | Must rewrite before proceeding |

## Conventional commits

```text
feat(epic-m01/iter-1): add semantic branch creation
fix(epic-m02/iter-1): correct ambiguity scoring threshold
docs(epic-m02/iter-1): update getting-started install steps
```

| Type | SemVer bump | When to use |
|------|-------------|-------------|
| `feat` | MINOR | New capability |
| `fix` | PATCH | Bug correction |
| `docs` | — | Docs only |
| `refactor` | — | No behavior change |
| `test` | — | Tests only |
| `chore` | — | Tooling, deps |
| `ci` | — | CI/CD pipeline |
| `perf` | PATCH | Performance |
| `feat!` / `BREAKING CHANGE:` | MAJOR | Breaking change |

See full spec: [conventionalcommits.org v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/#summary)

## Clean Code principles (R.C. Martin — applied)

- **Names:** intention-revealing, pronounceable, searchable — no abbreviations
- **Functions:** do one thing, ≤ 20 lines, no flag arguments, no side effects
- **Comments:** explain the WHY of non-obvious decisions — never the WHAT
- **Formatting:** consistent indentation, blank lines between concepts
- **Error handling:** exceptions over error codes, don't swallow errors silently
- **Tests:** one assert per test, test one concept per test, fast and repeatable

## CPS reference

Chapter 27 of the CPSBok covers Burn Quality In, including the CI&T Definition
of Done, pair programming, TDD, and code review standards. Agentic CPS focuses
on the disciplines an AI agent can enforce autonomously at commit time.
