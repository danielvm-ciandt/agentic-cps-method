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

## Key references — copy before creating

| Repo | Path | What to copy from |
|------|------|-------------------|
| Old acps | `/Users/danielvm/Sites/old-agentic-cps-method` | `docs/`, `bin/install.js`, `helps/` |
| lean-spec | `/Users/danielvm/Sites/lean-spec` | Skill SKILL.md/workflow.md patterns, `leanspec` CLI conventions, template body structure, UI components (`packages/ui/`) |

**Always check these repos before writing new files.** lean-spec is the direct inspiration — skill format, CLI, and templates are modeled on it.

## Architecture

```
bin/install.js          ← npx entrypoint (Node.js 24 ESM, @inquirer/prompts only)
docs/                   ← methodology documentation
skills/<acps-*>/        ← Claude Code skills (SKILL.md + workflow.md)
templates/              ← lean-spec format templates
```

## Phase status

See `.planning/STATE.md` for current phase and progress.
