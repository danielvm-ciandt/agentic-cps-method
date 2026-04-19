# Standard: README

**Reference:** [A Beginner's Guide to Writing a Kickass README — Meakaakka](https://meakaakka.medium.com/a-beginners-guide-to-writing-a-kickass-readme-7ac01da88ab3)  
**Enforced by:** `/acps-homologate` (verification at repo level)

## Required sections for every public ACPS repo

Every public repository in the Agentic CPS ecosystem must have a `README.md`
with these sections in this order:

1. **Project title + one-line description** — what it is in plain language
2. **Why it exists** — the problem it solves (2–4 sentences)
3. **Install command** — the exact command to install or run it
4. **Quick start** — the most important commands, in order
5. **Links to full docs** — where to learn more

## What makes a README kickass

- **Leads with value** — first paragraph answers "why should I care?"
- **Shows, doesn't tell** — code blocks over prose where possible
- **Scannable** — headers, tables, and short paragraphs
- **Honest about requirements** — Node version, OS constraints
- **No marketing language** — "blazing fast" and "game-changing" are red flags

## What kills a README

- Starting with "This is a README for..." (meta)
- Five paragraphs before the install command
- No code examples
- "Contributions welcome" without a CONTRIBUTING.md
- Broken links

## ACPS-specific rules

- **No "AI draft" language** — every deliverable is human-approved or generated
  by a named `/acps-*` command. "AI-generated draft" implies the human did not
  review it.
- **No "Sprint"** — always "Iteration"
- **ISO 8601 UTC** for any dates in the README (`Z` suffix)
- **npx acps@latest** is the canonical install command — not `npm install -g acps`

## Template

```markdown
# Project Name

One-line description of what this is.

## Why it exists

[2–4 sentences on the problem this solves and why existing tools fall short.]

## Install

\`\`\`bash
npx acps@latest
\`\`\`

## Quick start

\`\`\`text
/acps-help      → overview + recommended next command
/acps-init      → initialize .planning/ in your project
/acps-branch    → create semantic branch (always first)
\`\`\`

## Documentation

- [Getting started](docs/getting-started.md)
- [Full docs](docs/)

## Requirements

- Node.js ≥ 24
```
