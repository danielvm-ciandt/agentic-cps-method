# Roadmap — `agentic-cps-method`

## Document Information

- **Project:** Agentic CPS Method
- **Created:** 2026-04-18T00:00:00Z
- **Estimation method:** BCP Full (13 dimensions) — to be recalculated by `acps-project-roadmap` once method is built
- **Total iterations:** 5

---

## Iteration summary

| Iteration | Branch | Epics | Focus | Estimated Size |
|---|---|---|---|---|
| **Iter-1** | `iteration-01` | EP-M01 + EP-M02 | Foundation + Methodology docs | M |
| **Iter-2** | `iteration-02` | EP-M03 | Templates | S |
| **Iter-3** | `iteration-03` | EP-M04 + EP-M05 | Setup + GSD Loop skills | L |
| **Iter-4** | `iteration-04` | EP-M06 + EP-M07 | Delivery & Management skills + Installer | L |
| **Iter-5** | `iteration-05` | EP-M08 + EP-M09 | Scope management + Project intelligence | M |

---

## M-Iter-1 — Foundation + Methodology docs

**Branch:** `iteration/1`
**Stable tag on completion:** `v0.1.0`

| Epic | Stories | Key deliverables |
|---|---|---|
| EP-M01 Foundation | Init repo, package.json, .releaserc.json, ci.yml, release.yml, README | Green CI, semantic-release wired |
| EP-M02 Methodology docs | 3 phase docs, 9 practice docs, 5 workflow docs, gates.md, getting-started.md, 5 standards docs | Complete methodology documented |

**Branch naming examples:**
```
feat/ep-m01-1-init-repo-structure
feat/ep-m01-2-github-actions-ci
feat/ep-m01-3-semantic-release-config
feat/ep-m02-4-phase-docs
feat/ep-m02-5-practice-docs
feat/ep-m02-6-workflow-docs
feat/ep-m02-7-standards-docs
```

## M-Iter-2 — Templates

**Branch:** `iteration/2`
**Stable tag on completion:** `v0.2.0`

| Epic | Templates | Key deliverables |
|---|---|---|
| EP-M03 Templates | epic, story, bug-report, vision, backlog, architecture-package, setup-deliverable, iteration-report, value-activation-deliverable, roadmap, daily, weekly, monthly, quarterly | 14 templates in lean-spec format |

## M-Iter-3 — Skills (Setup + GSD Loop)

**Branch:** `iteration/3`
**Stable tag on completion:** `v0.3.0`

| Epic | Skills | Key deliverables |
|---|---|---|
| EP-M04 Setup Phase Skills | acps-init, acps-vision, acps-backlog, acps-architecture, acps-project-roadmap | 5 setup skills working |
| EP-M05 GSD Loop Skills | acps-branch, acps-discuss, acps-spec, acps-plan, acps-execute, acps-homologate | 6 loop skills working |

## M-Iter-4 — Delivery & Management Skills + Installer

**Branch:** `iteration/4`
**Stable tag on completion:** `v0.4.0`

| Epic | Skills / Output | Key deliverables |
|---|---|---|
| EP-M06 Delivery & Management | acps-deliverable, acps-gate, acps-status, acps-report, acps-new-epic, acps-new-story, acps-new-bug, acps-bug-fix, acps-new-iteration, acps-pr, acps-pause, acps-resume, acps-note, acps-help | 14 skills working |
| EP-M07 Installer | bin/install.js, `npx acps@latest` | Full install flow working across 10 IDEs |

**`npx acps@latest` install sequence:**
```
1. Name         — Your name or team name
2. Language     — English / Español / Português (Brasil) / 中文 / 日本語
3. Doc language — (same options, default: same as language)
4. Runtime      — Claude Code / Cursor / Windsurf / GitHub Copilot / Gemini CLI /
                  Cline / Augment / OpenCode / Codex / Trae
5. Location     — Global / Local
6. Estimation   — BCP Full / BCP Simplified / FP+SNAP / BCP Full + FP+SNAP (dual)
```

## M-Iter-5 — Scope Management + Project Intelligence

**Branch:** `iteration/5`
**Stable tag on completion:** `v1.0.0`

| Epic | Skills / Output | Key deliverables |
|---|---|---|
| EP-M08 Scope & Change Management | acps-change-request, acps-scope-manager | CR ledger, BCP balance enforcement |
| EP-M09 Project Intelligence | acps-document-project, acps-scan, acps-code-map | AI-context docs in `.planning/intel/` and `.planning/codebase/` |

---

## Ecosystem timeline

```
M-Iter-1  → Foundation + docs                      v0.1.0
M-Iter-2  → Templates                              v0.2.0
M-Iter-3  → Setup + GSD Loop skills                v0.3.0
M-Iter-4  → Delivery + management + installer      v0.4.0
M-Iter-5  → Scope management + project intelligence v1.0.0  ← method ships

           [Use method on agentic-cps-web]
           acps-init + acps-vision + acps-backlog
           + acps-architecture + acps-project-roadmap
           → full BCP estimates → locked roadmap

W-Iter-1 through W-Iter-8  ← cockpit ships at v1.0.0-web
```

---

## Phase gate — Setup

- [x] vision.md written and reviewed
- [x] backlog.md written with all epics and iterations
- [x] roadmap.md written with BCP estimates and timeline
- [x] architecture.md written
- [ ] Gate approved → baseline BCP locked in `change-log.md` → M-Iter-1 unlocks
