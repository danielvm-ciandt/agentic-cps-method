---
phase: 04-delivery-management-and-installer
plan: "03"
subsystem: skills
tags: [acps-new-epic, acps-new-story, acps-new-bug, content-creation, template-fill]
dependency_graph:
  requires: [acps-init]
  provides: [acps-new-epic, acps-new-story, acps-new-bug]
  affects: [skills/acps-new-epic, skills/acps-new-story, skills/acps-new-bug]
tech_stack:
  added: []
  patterns: [skill-2file-pattern, xml-workflow-steps, yaml-frontmatter, template-fill]
key_files:
  created:
    - skills/acps-new-epic/SKILL.md
    - skills/acps-new-epic/workflow.md
    - skills/acps-new-story/SKILL.md
    - skills/acps-new-story/workflow.md
    - skills/acps-new-bug/SKILL.md
    - skills/acps-new-bug/workflow.md
  modified: []
decisions:
  - id: D-story-bcp
    choice: "acps-new-story sets BCP from roadmap.md; falls back to prompting user if roadmap.md missing"
    reason: "Keeps BCP consistent with delivery baseline; graceful degradation when no roadmap"
  - id: D-bug-epic-link
    choice: "acps-new-bug requires user to specify the parent epic"
    reason: "Bugs must be traceable to an epic for scope management"
self_check: PASSED
---

## What Was Built

Created the content-creation skill trio for Phase 4:

**`acps-new-epic`** — 4-step workflow:
- Reads `.acps-config.json` for `planningDir`, asks for epic name and description
- Reads `templates/specs/epic.md` template
- Fills template with provided data, writes to `{planningDir}/epics/{epic-slug}.md`

**`acps-new-story`** — 5-step workflow:
- Asks for story title and parent epic; reads the epic file to set context
- Reads `templates/specs/story.md` template
- Fills template with `story_id`, `stage` (default: backlog), BCP from roadmap.md
- Writes to `{planningDir}/epics/{epic-slug}/{story-id}.md`

**`acps-new-bug`** — 4-step workflow:
- Reads `.acps-config.json`; asks for bug title and parent epic
- Reads `templates/bugs/bug-report.md` template
- Fills template with bug details, links to parent epic
- Writes to `{planningDir}/bugs/{bug-id}-{slug}.md`

## Deviations

None.

## Self-Check

- [x] skills/acps-new-epic/SKILL.md exists, contains `name: acps-new-epic`
- [x] skills/acps-new-story/SKILL.md exists, contains `name: acps-new-story`
- [x] skills/acps-new-bug/SKILL.md exists, contains `name: acps-new-bug`
- [x] All workflows fill templates from templates/specs/ and templates/bugs/
- [x] 0 markdownlint errors
- [x] DELIV-05, DELIV-06, DELIV-07 requirements covered
