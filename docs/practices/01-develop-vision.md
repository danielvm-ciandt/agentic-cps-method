# Practice 01 — Develop Vision

**CPS Chapter:** Ch.4 · Develop Vision  
**Skill:** `/acps-vision`

## Overview

The Vision practice defines what the product is, why it exists, and who it
serves — before any architecture or backlog work begins. In agentic teams, the
vision also defines the two-layer structure: the methodology package and the
cockpit web application. A clear vision prevents scope drift and gives the AI
agent a stable anchor for every subsequent decision.

## Requirements

- [ ] Problem statement written in one paragraph — no jargon
- [ ] Solution statement: what the product does and how it differs from alternatives
- [ ] Two-repo strategy documented (if applicable)
- [ ] Filtered practice list: which CPS chapters apply and why others do not
- [ ] CPS lifecycle defined: Setup → Production Flow → Value Activation
- [ ] Source references listed (CPSBok, lean-spec, GSD, ScopeCounting)

## Non-goals

- Vision does not estimate scope — that is the Roadmap practice (Ch.12)
- It does not assign epics to iterations — that is the Backlog practice (Ch.10)
- It does not produce a client deliverable on its own

## Acceptance criteria

- [ ] AC 1: `vision.md` exists in `.planning/` with all required sections
- [ ] AC 2: Two-repo strategy is explicit — method repo and web repo are named
- [ ] AC 3: Filtered CPS practice list shows which of the 37 chapters are in scope and why
- [ ] AC 4: UX vision quote present — how the methodology should feel to the user
- [ ] AC 5: No "AI draft" language — all content is human-approved or command-generated

---

## How the practice works

`/acps-vision` guides the team through a structured interview:

1. What problem does the product solve?
2. Who are the users? What is their pain?
3. What does the solution do — in one sentence?
4. What makes it different from existing tools?
5. Which CPS practices apply? Which do not?

The AI synthesizes answers into `vision.md` using the lean-spec body structure.
The team reviews, edits, and approves before the next practice runs.

## CPS reference

Chapter 4 of the CPS Body of Knowledge (CPSBok) covers the full vision
development technique, including stakeholder alignment, value proposition
mapping, and the CI&T organizational hierarchy context. Agentic CPS filters
this to the decisions an AI agent can meaningfully support.
