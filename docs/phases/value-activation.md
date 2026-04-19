# Value Activation

## Overview

Value Activation is the final phase. It covers the transition from development
to production: the production entry, late-stage homologation with real users,
and formal change management for any issues discovered post-release. The phase
ends with the team and client signing off on delivered value.

Value Activation is not a bug-fix iteration — it is a structured handoff. Issues
discovered here are registered as bugs via `/acps-new-bug`, fixed via
`/acps-bug-fix`, and re-homologated before the phase closes.

## Requirements

- [ ] All iterations of Production Flow are complete and gated
- [ ] Deployment to production (or staging with real users) completed
- [ ] Late homologation executed with actual users or stakeholders
- [ ] Any post-release bugs registered via `/acps-new-bug` before fixing
- [ ] Value Activation deliverable generated and approved
- [ ] Change management plan documented if operational changes are required

## Non-goals

- Value Activation does not add new features — scope is frozen
- It does not skip bug registration to move faster
- New feature requests go into the next project's backlog, not here

## Acceptance criteria

- [ ] AC 1: Production entry is complete — system is live with real users
- [ ] AC 2: Late homologation executed — all epics verified against real usage
- [ ] AC 3: All post-release bugs registered, fixed, and re-homologated
- [ ] AC 4: Value Activation deliverable reviewed and approved by client or sponsor
- [ ] AC 5: Change management plan documented for any operational impacts

---

## Commands

```text
/acps-new-bug       → register any post-release bug before fixing
/acps-bug-fix       → guided fix workflow: branch → fix → homologate → close
/acps-homologate    → re-verify acceptance criteria with real users
/acps-deliverable   → generate value activation deliverable for client
/acps-gate          → final gate: verify all items complete
```

## Late homologation

Late homologation follows the same AC-by-AC walkthrough as regular
`/acps-homologate`, but is performed with real users or stakeholders against the
live system. Each acceptance criterion from every epic is re-verified.

Failures during late homologation:

1. Register as a bug: `/acps-new-bug`
2. Fix on a dedicated branch: `/acps-bug-fix`
3. Re-homologate the AC that failed
4. Close the bug and merge

## Change management

If the system introduction requires operational changes (process changes, training,
data migration), document them in `deliverables/change-management-plan.md`.
The `/acps-deliverable` skill includes a change management section in the Value
Activation deliverable template.

## Gate checklist

- [ ] Production entry complete — system is accessible to real users
- [ ] Late homologation complete — all epics re-verified
- [ ] All post-release bugs resolved
- [ ] Value Activation deliverable approved
- [ ] Change management plan in place (or explicitly marked N/A)
- [ ] Project officially closed
