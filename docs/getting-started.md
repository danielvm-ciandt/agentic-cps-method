# Getting Started

## Overview

Agentic CPS is a Spec-Driven Development methodology for AI-powered teams. It
delivers 9 filtered CPS practices as Claude Code slash commands. This guide gets
you from zero to first iteration in under 10 minutes.

## Requirements

- Node.js ≥ 24
- Claude Code (or Cursor, Windsurf, or another supported IDE)

## Non-goals

- This guide does not cover the `agentic-cps-web` cockpit
- It does not explain every skill in depth — see [docs/workflow/](workflow/)

## Acceptance criteria

- [ ] AC 1: User installs `acps` and sees the confirmation message
- [ ] AC 2: User runs `/acps-init` and `.planning/` is created
- [ ] AC 3: User completes their first GSD loop with AI assistance

---

## Step 1 — Install

```bash
npx acps@latest
```

The installer prompts for:

1. Your name or team name
2. Communication language: English / Español / Português (Brasil) / 中文 / 日本語
3. Document output language (default: same as communication)
4. Runtime (multi-select): Claude Code, Cursor, Windsurf, and 7 others
5. Location: Global or Local
6. Estimation method: BCP Full / BCP Simplified / FP+SNAP / BCP Full + FP+SNAP

**Non-interactive (for CI or scripts):**

```bash
npx acps@latest --claude --global --estimation bcp_full --lang en --doc-lang en
```

## Step 2 — Initialize your project

Open your project in Claude Code (or your chosen IDE) and run:

```text
/acps-init
```

This creates the `.planning/` directory structure in your project.

## Step 3 — Run the Setup Phase (new projects only)

If this is a new project, run the setup phase commands in order:

```text
/acps-vision           → define the product vision
/acps-backlog          → create epics and iteration plan
/acps-architecture     → document technical decisions
/acps-project-roadmap  → estimate scope in BCP or FP
/acps-deliverable      → generate client-facing setup document
/acps-gate             → verify gate conditions → unlock Production Flow
```

Skip this step for brownfield projects — go directly to Step 4.

## Step 4 — Start your first iteration

Each iteration follows the GSD loop. Always create the branch first:

```text
/acps-branch      → creates feat/ep-XX-N-slug branch (branch-first discipline)
/acps-discuss     → extracts implementation decisions for the epic/story
/acps-spec        → writes acceptance criteria; blocks if ambiguity > 0.20
/acps-plan        → breaks work into tasks with estimates
/acps-execute     → implements the story
/acps-homologate  → interactive UAT: walks each AC one by one
```

Repeat for each story in the epic. At the end of the iteration:

```text
/acps-deliverable     → generate iteration report for client
/acps-gate            → verify iteration gate conditions
/acps-new-iteration   → open the next iteration
```

## Step 5 — Get help at any time

```text
/acps-help    → methodology overview + recommended next command
/acps-status  → current phase, iteration, epic, and scope balance
```

## Supported languages

Agentic CPS responds in your configured language. Skill names stay in English
(they are commands). Supported:

| Code | Language |
|------|----------|
| `en` | English |
| `es` | Español |
| `pt-br` | Português (Brasil) |
| `zh` | 中文 (简体) |
| `ja` | 日本語 |

## Next steps

- [Setup phase](phases/setup.md)
- [Production flow](phases/production-flow.md)
- [GSD workflow steps](workflow/)
- [Phase gates](gates.md)
- [Standards](standards/)
