# Workflow: Execute

**Command:** `/acps-execute`  
**CPS Practice:** Ch.27 — Burn Quality In  
**Position in GSD loop:** Step 5 (after `/acps-plan`)

## Overview

The Execute step implements the story. The AI agent works through the task list
from `/acps-plan`, commits after each logical unit of work, and follows the code
quality standards at every commit. Execution does not end until all tasks are
checked off and every commit is clean.

The agent does not skip quality checks to move faster. Conventional commits,
code commenting standards, and Clean Code principles are enforced at the moment
of writing — not reviewed afterward.

## Requirements

- [ ] Plan is complete (all tasks listed, dependencies explicit)
- [ ] Branch exists and is checked out
- [ ] Every commit follows conventional commit format
- [ ] Code comments explain WHY, never WHAT
- [ ] Session entry appended to story YAML at start and end of execution

## Non-goals

- Execute does not homologate the story — that is `/acps-homologate`
- It does not create PRs — that is `/acps-pr`
- It does not skip tasks without recording the reason

## Acceptance criteria

- [ ] AC 1: All tasks from the plan are completed or explicitly skipped with a reason
- [ ] AC 2: Every commit follows `type(scope): description` conventional format
- [ ] AC 3: No magic numbers in committed code — all constants are named
- [ ] AC 4: No function exceeds 20 lines
- [ ] AC 5: Session entry written to story YAML with `started_at`, `finished_at`, `duration_ms`, `tokens.*`, `model`

---

## Commit discipline

Every commit during execute follows conventional commits:

```bash
git commit -m "feat(epic-m01/iter-1): add package.json with required fields"
git commit -m "feat(epic-m01/iter-1): add semantic-release config"
git commit -m "feat(epic-m01/iter-1): add markdownlint config"
```

**Commit scope convention for this repo:**

```text
epic-m01/iter-1    EP-M01 work in Iteration 1
epic-m02/iter-1    EP-M02 work in Iteration 1
epic-m03/iter-2    EP-M03 work in Iteration 2
```

## Code quality checklist (per commit)

Before each commit, verify:

- [ ] Names are intention-revealing — no `tmp`, `x`, `data` as variable names
- [ ] Functions do one thing — if the function has an `and` in its name, split it
- [ ] No comments explain WHAT — only WHY when non-obvious
- [ ] No magic numbers — use named constants
- [ ] Error paths are handled — no silent `catch` blocks

## Conventional commits reference

See [docs/standards/conventional-commits.md](../standards/conventional-commits.md)
and [conventionalcommits.org v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/#summary).

## Code commenting reference

See [docs/standards/code-comments.md](../standards/code-comments.md)
and [The Art of Commenting](https://medium.com/@douglas.rochedo/the-art-of-commenting-how-to-do-it-right-848e299771b8).
