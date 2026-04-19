# Workflow: Homologate

**Command:** `/acps-homologate`  
**CPS Practice:** Ch.28 — Continuous Homologation  
**Position in GSD loop:** Step 6 (after `/acps-execute`)

## Overview

The Homologate step verifies every acceptance criterion from `/acps-spec` before
the story is marked complete. The agent presents each AC one by one, asks the
human to confirm pass or fail, and routes failures to `/acps-bug-fix` before
continuing.

This is the GSD verify-work discipline applied to every story — not just
release milestones. No story is marked `homologated` until a human has
explicitly confirmed each AC.

## Requirements

- [ ] Execute is complete — all tasks checked off
- [ ] Each AC from `/acps-spec` is presented individually
- [ ] Human confirms pass (y), fail (n), or skip (s) per AC
- [ ] Failed ACs route to `/acps-bug-fix` before the session closes
- [ ] Story stage updated to `homologated` in lean-spec after all ACs pass
- [ ] Session entry appended to story YAML
- [ ] `totals` block computed and written to story YAML

## Non-goals

- Homologate does not create PRs — that is `/acps-pr`
- It does not perform load testing or performance benchmarking
- Skipped ACs are waived with a documented reason — they do not auto-pass

## Acceptance criteria

- [ ] AC 1: Each AC from `/acps-spec` is presented individually in sequence
- [ ] AC 2: Human confirmation required per AC — no batch approval
- [ ] AC 3: Failed AC immediately offers `/acps-bug-fix` routing
- [ ] AC 4: Story marked `homologated` in lean-spec only after all ACs pass
- [ ] AC 5: `acps-homologate` session entry written to story YAML
- [ ] AC 6: `totals` block computed: `started_at`, `finished_at`, `duration_ms` (wall clock), `active_ms` (Σ durations), `tokens.*` (Σ tokens)

---

## Interactive walkthrough

```text
/acps-homologate

  Story: EP-M01-001 — Init repo structure
  ──────────────────────────────────────────

  AC 1: Given a fresh repo, when `npm ci` runs,
        then exit code is 0 and `node_modules/` is populated
  → Did this pass? (y/n/skip): y  ✓

  AC 2: Given `bin/install.js` exists, when `node --check bin/install.js` runs,
        then exit code is 0
  → Did this pass? (y/n/skip): y  ✓

  AC 3: Given `npm run lint` runs, then exit code is 0
  → Did this pass? (y/n/skip): n  ✗

  AC 3 failed. Options:
  [1] Run /acps-bug-fix now and return
  [2] Waive AC 3 (enter reason)
  → Choice: 1

  → Routing to /acps-bug-fix...
```

## YAML output

After all ACs pass, the story YAML is updated:

```yaml
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

## Waived ACs

A waived AC is not a passed AC. It is recorded with a reason:

```markdown
- [WAIVED] AC 3: lint gate — waived because markdownlint is not yet installed.
  Bug registered: BUG-001. Will be resolved in next story.
```

Waived ACs must be resolved before the iteration gate passes.
