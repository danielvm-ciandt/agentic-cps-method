# Workflow: Spec

**Command:** `/acps-spec`  
**CPS Practice:** Ch.27 — Burn Quality In  
**Position in GSD loop:** Step 3 (after `/acps-discuss`)

## Overview

The Spec step writes acceptance criteria for a story and scores each criterion
on an ambiguity scale (0.00–1.00). If any criterion scores above 0.20, the step
blocks and prompts for clarification. This ambiguity gate is the primary quality
enforcement point before implementation begins.

No story enters `/acps-execute` with unclear acceptance criteria. The gate
exists because ambiguous specs produce ambiguous code, and ambiguous code
produces homologation failures.

## Requirements

- [ ] Discuss session is complete before spec runs
- [ ] Each acceptance criterion uses the Given/When/Then format
- [ ] Ambiguity score is calculated for each AC individually
- [ ] Overall ambiguity score ≤ 0.20 required to pass the gate
- [ ] ACs written to the story file under `## Acceptance criteria`
- [ ] Session entry appended to story YAML

## Non-goals

- Spec does not estimate task effort — that is `/acps-plan`
- It does not write implementation code — that is `/acps-execute`
- It does not homologate the story — that is `/acps-homologate`

## Acceptance criteria

- [ ] AC 1: Each AC follows Given/When/Then format
- [ ] AC 2: Ambiguity score shown per AC (0.00–1.00)
- [ ] AC 3: Gate blocks if any AC scores > 0.20 — prompts for rewrite
- [ ] AC 4: Gate passes if all ACs score ≤ 0.20
- [ ] AC 5: Session entry written to story YAML

---

## Ambiguity scoring

The agent evaluates each AC against these dimensions:

| Dimension | Question |
|-----------|----------|
| Testability | Can this be objectively verified? |
| Specificity | Is the behavior fully defined? |
| Independence | Can this be tested without other ACs? |
| Completeness | Are all edge cases addressed? |

**Score bands:**

| Score | Label | Action |
|-------|-------|--------|
| 0.00–0.20 | Clear | Passes gate |
| 0.21–0.50 | Unclear | Rewrite before proceeding |
| 0.51–1.00 | Ambiguous | Blocked — must resolve |

## Output format

```markdown
## Acceptance criteria

- [ ] AC 1: Given a fresh repo, when `npm ci` runs,
            then exit code is 0 and `node_modules/` is populated
            [ambiguity: 0.05 ✓]

- [ ] AC 2: Given `bin/install.js` exists, when `node --check bin/install.js` runs,
            then exit code is 0
            [ambiguity: 0.03 ✓]
```

## When the gate blocks

```text
AC 3 ambiguity score: 0.34 — too vague to implement safely.

Issue: "should work correctly" is not testable.
Suggestion: specify the expected output or behavior precisely.

→ Rewrite AC 3 before continuing.
```
