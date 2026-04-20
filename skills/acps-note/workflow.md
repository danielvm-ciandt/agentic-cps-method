# acps-note Workflow

**CPS Reference:** CPS — Zero-Friction Capture Discipline

## Context

`acps-note` is a single-purpose, zero-friction skill. Its only job is to append a timestamped
note to `notes.md` as fast as possible. No navigation, no selection, no preamble.

---

<workflow>

<step n="1" goal="Load config">
  <action>Read `.acps-config.json` in the project root to get `planningDir`. If the file does not exist or `planningDir` is not set, fall back to `.planning`.</action>
</step>

<step n="2" goal="Capture the note">
  <action>Ask immediately, with no preamble or context-setting output:</action>
  <action>Ask: "Note: " (single line — the note text to capture)</action>
  <action>Ask: "Category? (idea / impediment / decision / question — default: idea)"</action>
  <action>If the user does not provide a category or presses Enter, use `idea` as the default.</action>
</step>

<step n="3" goal="Append to notes.md">
  <action>Check if `{planningDir}/notes.md` exists.</action>
  <check if="notes.md does not exist">
    <action>Create `{planningDir}/notes.md` with this header:

```markdown
# Project Notes

Captured ideas, impediments, decisions, and questions.

---
```

  </action>
  </check>
  <action>Get the current ISO 8601 timestamp (e.g., `2026-04-20T14:30:00Z`).</action>
  <action>Append the following entry to `{planningDir}/notes.md`:

```markdown
## {ISO 8601 timestamp} — {category}

{note text}

---
```

  </action>
</step>

<step n="4" goal="Confirm capture">
  <output>Captured. ({planningDir}/notes.md)</output>
</step>

</workflow>
