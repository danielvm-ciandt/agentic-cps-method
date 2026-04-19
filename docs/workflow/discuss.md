# Workflow: Discuss

**Command:** `/acps-discuss`  
**CPS Practice:** Ch.26 — One Piece Flow  
**Position in GSD loop:** Step 2 (after `/acps-branch`)

## Overview

The Discuss step extracts implementation decisions before any specification is
written. It is a structured conversation between the team member and the AI
agent — the agent asks clarifying questions, surfaces assumptions, and records
decisions in a decision log. Nothing moves to `/acps-spec` until the discuss
session is closed.

This mirrors GSD's `/gsd-discuss-phase` but adds CPS discipline: each decision
is linked to a CPS practice, and the agent challenges ideas that contradict the
architecture package.

## Requirements

- [ ] Branch exists (created by `/acps-branch`) before discuss runs
- [ ] Epic ID and story ID are established before discuss starts
- [ ] All implementation decisions are recorded in the story file
- [ ] Assumptions are explicitly named and flagged for verification
- [ ] Session entry appended to story YAML: `command: acps-discuss`, `started_at`, `finished_at`, `duration_ms`, `tokens.*`, `model`

## Non-goals

- Discuss does not write acceptance criteria — that is `/acps-spec`
- It does not produce tasks or estimates — that is `/acps-plan`
- It does not start implementation — `/acps-execute` does that

## Acceptance criteria

- [ ] AC 1: Agent asks at least 3 clarifying questions before closing the session
- [ ] AC 2: All decisions recorded in the story file under `## Decisions`
- [ ] AC 3: All assumptions flagged with `[ASSUMPTION]` marker
- [ ] AC 4: Session entry written to story YAML with correct timestamps and token counts
- [ ] AC 5: Story stage updated to `in-progress` in lean-spec

---

## How it works

```text
/acps-discuss

  Story: EP-M01-001 — Init repo structure
  Branch: feat/ep-m01-1-init-repo-structure

  Agent: What package manager will this project use?
  User: npm (standard)

  Agent: What Node.js version constraint?
  User: >=24

  Agent: Should semantic-release publish to npm in v1?
  User: No — GitHub Releases only

  Agent: [records decisions]
  Agent: Discuss session complete. Run /acps-spec to write ACs.
```

## Output

Decisions are appended to the story file:

```markdown
## Decisions

- Package manager: npm (standard) — `npm ci` in CI, `package-lock.json` committed
- Node.js constraint: `>=24`
- Release: GitHub Releases only — no npm publish in v1 (ADR-004)

## Assumptions

- [ASSUMPTION] CI uses ubuntu-latest — verify when writing ci.yml
```
