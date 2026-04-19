# acps

CPS methodology discipline as installable AI IDE skills.

## Why it exists

AI-powered development teams have the tools but not the discipline. Existing SDD frameworks (GSD, BMAD, lean-spec) lack the enterprise methodology that CI&T's CPS provides — phases, iterations, epics, homologation gates, and scope counting. `acps` bridges this gap: 9 filtered CPS practices delivered as slash commands that feel like GSD, running in any AI IDE.

## Install

```bash
npx acps@latest
```

The installer prompts for: name, communication language, runtime (Claude Code, Cursor, Windsurf, and 7 others), location (global or local), and estimation method (BCP Full, BCP Simplified, FP+SNAP).

## Quick start

```text
/acps-help      → methodology overview + recommended next command
/acps-init      → create .planning/ in your project
/acps-branch    → create semantic branch (always first in the loop)
/acps-discuss   → extract implementation decisions
/acps-spec      → write acceptance criteria (ambiguity gate <= 0.20)
```

## The GSD loop

```text
acps-branch → acps-discuss → acps-spec → acps-plan → acps-execute → acps-homologate
```

Branch first, always. Spec gates block progress if ambiguity > 0.20.

## Documentation

- [Getting started](docs/getting-started.md)
- [Phases](docs/phases/setup.md)
- [Workflow steps](docs/workflow/discuss.md)
- [Phase gates](docs/gates.md)
- [Standards](docs/standards/conventional-commits.md)

## Requirements

- Node.js >= 24

## License

MIT
