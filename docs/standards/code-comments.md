# Standard: Code Comments

**Reference:** [The Art of Commenting — Douglas Rochedo](https://medium.com/@douglas.rochedo/the-art-of-commenting-how-to-do-it-right-848e299771b8)  
**Enforced by:** `/acps-execute` (at write time) · `/acps-homologate` (verification)

## The rule in one sentence

Comment the **WHY**, never the WHAT.

The code already says what it does. A comment that restates the code adds noise
and goes stale. A comment that explains why a non-obvious decision was made
adds permanent value.

## When to comment

| Situation | Comment? | Example |
|-----------|----------|---------|
| Non-obvious constraint | Yes | `// fetch-depth: 0 required — shallow clones miss tag history` |
| Workaround for a known bug | Yes | `// inquirer 9.x breaks ESM — pinned to 8.x until fixed` |
| Business rule with no code analog | Yes | `// BCP baseline is locked at gate approval — never modify` |
| Code that would surprise a reader | Yes | `// intentionally returns null here — caller handles undefined` |
| Code that reads clearly | No | `// loop through users` (the for loop already says that) |
| Variable or function name | No | `// get the user` before `getUser()` is redundant |

## Rules

1. **No endline comments** — comments belong on their own line, above the code
2. **No magic numbers** — name every constant (`MAX_RETRIES = 3`, not `3`)
3. **No obvious explanations** — `i++` does not need a comment
4. **No commented-out code** — delete it; git history preserves it
5. **No TODO without a ticket** — `// TODO: fix this` is not actionable without a bug ID

## File-level comments

A single-line comment at the top of a non-obvious file is acceptable:

```js
// Installer stub — full interactive install implemented in EP-M07 (M-Iter-4).
```

Not acceptable:

```js
// This file contains the installer for the acps package.
// It was created on 2026-04-18 by the agentic-cps-method project.
// Author: Daniel
```

## Function-level comments

Comment a function only when the WHY of its design is not obvious from its
name and signature:

```js
// Semantic-release requires fetch-depth: 0 to read tag history.
// Shallow clones cause it to miss prior releases and publish wrong versions.
function configureCheckout() { ... }
```

Do not comment:

```js
// Creates the checkout configuration object
function configureCheckout() { ... }
```

## What the AI agent checks

During `/acps-homologate`, the agent flags:

- Comments that restate the code (WHAT comments)
- Magic numbers without named constants
- Commented-out code blocks
- TODOs without a linked bug ID
- Endline comments that could be moved above the code line

## Self-documenting code first

The best comment is a well-named identifier. Before adding a comment, ask:
can I rename this variable, function, or constant to make the comment
unnecessary? If yes — rename it.
