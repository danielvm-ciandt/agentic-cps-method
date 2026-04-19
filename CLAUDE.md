# Agentic CPS Method — Project Guide

## Project

`acps` — installable CPS methodology package for AI IDE teams. Pure Markdown + JSON skills, `npx acps@latest` installer, no framework.

**Planning:** `.planning/` | **Roadmap:** `.planning/ROADMAP.md` | **State:** `.planning/STATE.md`

## GSD Workflow

This project uses GSD for structured execution. Key commands:

```
/gsd-discuss-phase N   — gather context for a phase
/gsd-plan-phase N      — create PLAN.md for a phase
/gsd-execute-phase N   — execute a phase plan
/gsd-progress          — check current status
```

## Code conventions

- **Conventional commits**: `feat(ep-m01/iter-1): ...`, `fix/docs/chore/ci/refactor`
- **No framework**: method repo is static Markdown + JSON only
- **Skill format**: every skill has `skills/<name>/SKILL.md` + `skills/<name>/workflow.md`
- **Node.js 24 ESM** for `bin/install.js` only

## Key constraint

Old reference repo at `/Users/danielvm/Sites/old-agentic-cps-method` — **copy from there when content exists** rather than creating from scratch. Check `docs/`, `bin/`, `helps/` before writing new files.

## Architecture

```
bin/install.js          ← npx entrypoint (Node.js 24 ESM, @inquirer/prompts only)
docs/                   ← methodology documentation
skills/<acps-*>/        ← Claude Code skills (SKILL.md + workflow.md)
templates/              ← lean-spec format templates
```

## Phase status

See `.planning/STATE.md` for current phase and progress.
