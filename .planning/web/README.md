# Planning — `agentic-cps-web`

**Status:** Not started. Begins after `agentic-cps-method` v1.0.0 ships.

## What goes here

Run the full ACPS setup phase on the web repo using the built method:

```
/acps-init        → creates this .planning/ structure in agentic-cps-web
/acps-vision      → vision.md
/acps-backlog     → backlog.md (14 epics, 8 iterations)
/acps-architecture → architecture.md (SvelteKit, Drizzle, Neon, shadcn)
/acps-project-roadmap → roadmap.md (BCP estimates)
/acps-gate        → locks baseline BCP in change-log.md
```

## Reference

- Preliminary epic list and BCP estimates: `.planning-old/backlog.md §Repo 2`
- Preliminary roadmap: `.planning-old/roadmap.md §Repo 2`
- Stack decisions: SvelteKit 2 + Svelte 5 runes, Drizzle ORM, Neon (Postgres), shadcn-svelte, Tailwind, Anthropic SDK

## Migration strategy

Always check `/Users/danielvm/Sites/lean-spec` first. Migrate what exists. Build new only if not found.
