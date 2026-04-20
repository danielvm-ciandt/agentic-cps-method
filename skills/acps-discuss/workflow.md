# acps-discuss Workflow

**CPS Reference:** CPS GSD Loop — Discuss Phase

## Context

`acps-discuss` runs a structured discussion loop to extract the implementation decisions a story
needs before specs can be written. Inspired by GSD's `/gsd-discuss-phase`, it turns ambiguity into
locked decisions and surfaces open questions for the user to resolve. The output is a `## Decisions`
section appended to the story file.

---

<workflow>

<step n="1" goal="Load configuration and story context">
  <action>Look for `.acps-config.json` in the project root</action>
  <check if=".acps-config.json exists">
    <action>Read `.acps-config.json` and extract `planningDir` value</action>
  </check>
  <check if=".acps-config.json is missing">
    <action>Set planningDir to `.planning` (silent default)</action>
  </check>
  <action>Ask: "Which story are we discussing? Provide the path to the story file (e.g., {planningDir}/specs/ep-m01-user-auth.md)"</action>
  <check if="story file does not exist at the provided path">
    <output>Story file not found: {provided_path}

Check the path and try again. Story files are typically in `{planningDir}/specs/`.</output>
    <action>HALT</action>
  </check>
  <action>Read the story file and extract: story title, Overview section, Plan section (tasks), Test section (ACs if any)</action>
</step>

<step n="2" goal="Present story context and open discussion">
  <output>**Discuss Phase — {story title}**

Story context loaded. I've read the story and identified areas that need implementation decisions
before we can write specs.

Let's work through the key questions. For each topic, I'll ask a question — you answer, and I'll
capture it as a locked decision or open question.

Type "done" at any point to end the discussion and finalize decisions.
  </output>
</step>

<step n="3" goal="Run discuss loop — extract implementation decisions">
  <action>Analyze the story content and identify 3-7 implementation topics that need decisions. Consider:
    - Technology or library choices (if multiple options exist)
    - Data model or schema design choices
    - API design or contract decisions
    - UX or interaction behavior decisions
    - Error handling or edge case behavior
    - Integration approach or sequence
    - Performance or scaling considerations
  </action>
  <action>For each identified topic:
    - Present the question clearly: "Decision needed: {topic} — {specific question}"
    - Wait for user's answer
    - Ask: "Is this locked (finalized decision) or still open (needs more thought)?"
    - Record as: {topic, question, answer, status: "locked" | "open"}
  </action>
  <action>After each answer, ask: "Any other topics to cover? (Type the topic or 'done' to finish)"</action>
  <check if="user types 'done'">
    <action>Exit the discuss loop and proceed to Step 4</action>
  </check>
  <action>Continue loop: present any remaining topics from the initial list, then open the floor for user-driven topics</action>
</step>

<step n="4" goal="Summarize and confirm decisions">
  <output>**Discussion Summary**

Locked decisions ({count}):
{for each locked decision: - **{topic}:** {answer}}

Open questions ({count}):
{for each open question: - **{topic}:** {answer} — needs resolution before spec}
  </output>
  <action>Ask: "Does this capture everything correctly? (Type 'yes' to write to story file, or make corrections)"</action>
  <check if="user makes corrections">
    <action>Apply corrections to the decisions list</action>
    <action>Re-display the summary</action>
    <action>Ask for final confirmation</action>
  </check>
</step>

<step n="5" goal="Append decisions to story file">
  <action>Append a `## Decisions` section to the story file (after the last existing section):

```markdown
## Decisions

<!-- Captured by acps-discuss on {current_date} -->

### Locked

{for each locked decision:}
- **{topic}:** {answer}
{end for}

### Open Questions

{for each open question:}
- **{topic}:** {answer} — resolve before running acps-spec
{end for}
```
  </action>
  <action>Write the updated story file</action>
</step>

<step n="6" goal="Report completion">
  <output>
**acps-discuss complete.**

Decisions written to: {story_file_path}
Locked decisions: {count}
Open questions: {count}

{if open_questions > 0:}
Resolve the open questions above before running `acps-spec`.
{end if}

**Next step:** Run `acps-spec` to write acceptance criteria (ambiguity gate ≤ 0.20).
  </output>
</step>

</workflow>
