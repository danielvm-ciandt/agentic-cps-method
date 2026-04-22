# acps-pr Workflow

**CPS Reference:** CPS GSD Loop — Pull Request & Merge

## Context

`acps-pr` produces clean pull requests by filtering methodology bookkeeping commits from the PR
description. Only code changes appear in the PR body. The PR title follows conventional commit
format to integrate with semantic-release and team conventions.

**PR title format (D-18):** `type(scope): description`
Example: `fix(auth): resolve null pointer in token refresh`

**Planning commit filter (D-18):** Commits that touch only `.planning/` files are excluded from
the PR body — they are methodology bookkeeping, not code changes.

---

<workflow>

<step n="1" goal="Load context and verify git state">
  <action>Look for `.acps-config.json` in the project root</action>
  <check if=".acps-config.json exists">
    <action>Read `.acps-config.json` and extract `planningDir` value</action>
  </check>
  <check if=".acps-config.json is missing">
    <action>Set planningDir to `.planning` (silent default)</action>
  </check>
  <action>Run `git branch --show-current` to get current branch name (branch_name)</action>
  <action>Run `git status --porcelain` to check for uncommitted changes</action>
  <check if="output is non-empty (uncommitted changes exist)">
    <output>Warning: uncommitted changes detected. Commit or stash before creating a PR.</output>
    <action>Ask: "Continue anyway? (yes / no)"</action>
    <check if="user says no">
      <action>HALT — user will commit or stash changes first</action>
    </check>
  </check>
</step>

<step n="2" goal="Collect code-only commits (D-18)">
  <action>Run: `git log --oneline --no-merges origin/main..HEAD -- . ":(exclude).planning/"` to list commits that touch non-planning files. Store result as code_commits.</action>
  <action>Run: `git log --oneline --no-merges origin/main..HEAD` to get total commit count (total_commits).</action>
  <action>Count code_commits lines → code_commits_count</action>
  <action>Compute planning_commits_count = total_commits - code_commits_count</action>
  <output>**Commit summary for this branch:**

Code commits (will appear in PR body): {code_commits_count}

{code_commits as a numbered list}

Planning commits excluded: {planning_commits_count}
  </output>
</step>

<step n="3" goal="Compose PR title and body">
  <action>Ask: "PR title? Use conventional commit format: `type(scope): description`
Examples: `feat(auth): add token refresh endpoint`, `fix(api): handle null response from provider`"</action>
  <action>Store as pr_title</action>
  <action>Ask: "Additional PR description? (press Enter to use auto-generated body only)"</action>
  <action>Store as extra_description (may be empty)</action>
  <action>Parse branch_name to derive story or bug reference:
    - Pattern `iter-{N}/{epic-id}-{slug}` → story reference = epic-id + slug
    - Pattern `bug/{bug-id}-{slug}` → bug reference = bug-id
    - Otherwise → reference = branch_name
  </action>
  <action>Build pr_body:

```markdown
## What changed

{code_commits as a bulleted list — each commit message prefixed with "- "}

## Story / Bug

{story or bug reference derived from branch name}

{extra_description if provided}

## Checklist

- [ ] All acceptance criteria verified
- [ ] No .planning/ changes in this PR body (methodology commits excluded)
```

  </action>
</step>

<step n="4" goal="Create the PR">
  <output>**PR Preview:**

Title: {pr_title}

---

{pr_body}

---
  </output>
  <action>Ask: "Create PR with this content? (yes / edit title / edit body)"</action>
  <check if="user says 'edit title'">
    <action>Ask: "New title?"</action>
    <action>Update pr_title and re-display the full preview</action>
    <action>Ask: "Create PR now? (yes / edit body)"</action>
  </check>
  <check if="user says 'edit body'">
    <action>Ask: "Provide the corrected PR body:"</action>
    <action>Update pr_body to the user's corrected version</action>
    <action>Ask: "Create PR now? (yes)"</action>
  </check>
  <action>Run `gh pr create --title "{pr_title}" --body "{pr_body}"`</action>
  <check if="gh CLI is not available or command fails">
    <output>Could not create PR via `gh` CLI. Create the PR manually using the content above.

Title to paste: {pr_title}

Body to paste:
{pr_body}
    </output>
  </check>
</step>

<step n="5" goal="Report completion">
  <output>**acps-pr complete.**

PR created: {PR URL from gh output, or 'see above to create manually'}
Branch: {branch_name}
Title: {pr_title}
Code commits: {code_commits_count}
Planning commits excluded: {planning_commits_count}
  </output>
</step>

</workflow>
