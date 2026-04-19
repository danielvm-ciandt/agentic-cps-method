# Standard: Conventional Commits

**Reference:** [conventionalcommits.org v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/#summary)  
**Enforced by:** `/acps-execute` (at commit time) · `/acps-homologate` (verification)

## Overview

Every commit in an Agentic CPS project follows the Conventional Commits
specification. This enables semantic-release to determine the correct version
bump automatically, and makes `git log` readable as a changelog.

## Format

```text
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Rules:**

- Type and description are required
- Description is in imperative mood ("add" not "added", "fix" not "fixed")
- No period at the end of the description
- Scope is optional but strongly recommended in multi-epic repos

## Types

| Type | SemVer bump | When to use |
|------|-------------|-------------|
| `feat` | MINOR | A new capability visible to users or consumers |
| `fix` | PATCH | A bug correction |
| `docs` | — | Documentation only — no code change |
| `refactor` | — | Code restructuring with no behavior change |
| `test` | — | Adding or modifying tests |
| `chore` | — | Tooling, dependency updates, config |
| `ci` | — | CI/CD pipeline changes |
| `perf` | PATCH | Performance improvement |
| `feat!` / `BREAKING CHANGE:` footer | MAJOR | Breaking API or behavior change |

## Scope convention for `agentic-cps-method`

```text
epic-m01/iter-1    EP-M01 work in Iteration 1
epic-m02/iter-1    EP-M02 work in Iteration 1
epic-m03/iter-2    EP-M03 work in Iteration 2
```

## Examples

```text
feat(epic-m01/iter-1): add package.json with bin field and engines constraint
fix(epic-m02/iter-1): correct ambiguity scoring threshold in acps-spec
docs(epic-m02/iter-1): add getting-started install steps
refactor(epic-m05/iter-3): extract branch naming into shared utility
chore(epic-m01/iter-1): upgrade markdownlint-cli2 to 0.22.0
ci(epic-m01/iter-1): pin actions/checkout to SHA instead of tag
```

## Breaking changes

```text
feat(epic-m07/iter-4)!: change installer prompt order

BREAKING CHANGE: estimation prompt moved from position 4 to position 6.
Scripts using non-interactive flags are unaffected.
```

## What violates this standard

- `Added readme` — no type prefix
- `feat: update stuff` — vague description
- `FEAT: Add thing` — uppercase type
- `fix(scope): fixed the bug.` — past tense + trailing period
- `feat(scope): Add thing` — capital description

## Integration with semantic-release

semantic-release reads commit messages to determine the next version:

- `feat` commits → MINOR bump (0.1.0 → 0.2.0)
- `fix` or `perf` commits → PATCH bump (0.1.0 → 0.1.1)
- `BREAKING CHANGE` → MAJOR bump (0.1.0 → 1.0.0)
- `docs`, `chore`, `refactor`, `test`, `ci` → no version bump
