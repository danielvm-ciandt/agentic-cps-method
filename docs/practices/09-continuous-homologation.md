# Practice 09 — Continuous Homologation

**CPS Chapter:** Ch.28 · Continuous Homologation  
**Skill:** `/acps-homologate`

## Overview

Continuous Homologation means validating each story against its acceptance
criteria as soon as it is implemented — not at the end of the iteration. In
Agentic CPS, `/acps-homologate` drives an interactive UAT session: it presents
each acceptance criterion one by one, asks the human to verify pass or fail, and
routes failures immediately to `/acps-bug-fix`.

This practice eliminates the "big bang" integration test. Each story is
homologated in isolation, so failures are caught with full context rather than
weeks after the code was written.

## Requirements

- [ ] `/acps-homologate` is run immediately after `/acps-execute` completes
- [ ] Every acceptance criterion is verified — no criteria are skipped
- [ ] Failed criteria route to `/acps-bug-fix` before the story is marked complete
- [ ] The story is marked `homologated` in lean-spec only after all ACs pass
- [ ] Session telemetry is recorded in the story YAML front-matter

## Non-goals

- Continuous Homologation does not replace user acceptance testing (UAT) with
  real users — that happens in Value Activation
- It does not automatically pass criteria — human confirmation is required
- It does not skip the bug registration step when a criterion fails

## Acceptance criteria

- [ ] AC 1: `/acps-homologate` presents each AC individually in sequence
- [ ] AC 2: Human confirms pass (y), fail (n), or skip (s) for each AC
- [ ] AC 3: On fail: `/acps-bug-fix` is offered and the workflow routes there
- [ ] AC 4: Story is marked `homologated` in lean-spec only after all ACs pass (or are waived)
- [ ] AC 5: `acps-homologate` session entry written to story YAML with `started_at`, `finished_at`, `duration_ms`, `tokens.*`, `model`
- [ ] AC 6: `totals` block computed and written to story YAML at homologation

---

## Interactive UAT walkthrough

```text
/acps-homologate on story EP-M01-001

  Verifying: EP-M01-001 — Init repo structure
  ─────────────────────────────────────────────

  AC 1: package.json has name=acps, type=module, bin, engines
  → Did this pass? (y/n/skip): y  ✓

  AC 2: npm ci completes without error
  → Did this pass? (y/n/skip): y  ✓

  AC 3: node --check bin/install.js exits 0
  → Did this pass? (y/n/skip): n  ✗

  AC 3 failed. Options:
  [1] Run /acps-bug-fix now
  [2] Note the failure and continue (waive AC 3 — requires reason)
  → Choice: 1

  → Routing to /acps-bug-fix...
```

## Session telemetry

Each run of `/acps-homologate` appends one entry to `sessions[]` in the story
YAML front-matter. When the story passes, the `totals` block is computed:

```yaml
sessions:
  - command: acps-homologate
    started_at: 2026-04-20T11:15:00Z
    finished_at: 2026-04-20T11:28:00Z
    duration_ms: 780000
    tokens:
      input: 1400
      output: 420
      total: 1820
    model: claude-sonnet-4-6

totals:
  started_at: 2026-04-20T09:00:00Z
  finished_at: 2026-04-20T11:28:00Z
  duration_ms: 8880000
  active_ms: 7500000
  tokens:
    input: 17900
    output: 6570
    total: 24470
```

## CPS reference

Chapter 28 of the CPSBok covers Continuous Homologation, including the CI&T
homologation checklist, regression testing, and the link between homologation
and the Definition of Done. Agentic CPS automates the AC walkthrough and
telemetry capture so the cockpit can report on story quality over time.
