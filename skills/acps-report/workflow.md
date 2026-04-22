# acps-report Workflow

**CPS Reference:** CPS Delivery Management — Report Generation

## Context

`acps-report` generates a structured project report by selecting the appropriate template from
`templates/reports/`, collecting data from planning artifacts and git history, filling the
template, and writing the output file. Supports four cadences: daily, weekly, monthly, quarterly.

---

<workflow>

<step n="1" goal="Load config and select report type">
  <action>Look for `.acps-config.json` in the project root</action>
  <check if=".acps-config.json exists">
    <action>Read `.acps-config.json` and extract `planningDir` value</action>
  </check>
  <check if=".acps-config.json is missing">
    <action>Set planningDir to `.planning` (silent default)</action>
  </check>
  <output>**acps-report — Select Report Type**

Which report type?

1. Daily   — end-of-day standup report
2. Weekly  — weekly summary
3. Monthly — monthly review
4. Quarterly — quarterly review

  </output>
  <action>Wait for user selection (1–4)</action>
  <action>Map selection to template:
    - 1 → `templates/reports/daily.md`
    - 2 → `templates/reports/weekly.md`
    - 3 → `templates/reports/monthly.md`
    - 4 → `templates/reports/quarterly.md`
  Set report_type to one of: daily, weekly, monthly, quarterly</action>
  <check if="selection is not 1–4">
    <output>Invalid selection. Enter 1, 2, 3, or 4.</output>
    <action>Repeat prompt</action>
  </check>
  <action>Ask: "Report date or period? (e.g., 2026-04-20, Week 16, April 2026)"</action>
  <action>Record the response as report_period</action>
</step>

<step n="2" goal="Collect report data">
  <action>Read `{planningDir}/backlog.md` to extract: completed stories this period, iteration status, open items</action>
  <check if="backlog.md is missing">
    <output>Warning: {planningDir}/backlog.md not found. Backlog data will need to be provided manually.</output>
  </check>
  <check if="report_type is weekly or monthly or quarterly">
    <action>Read `{planningDir}/change-log.md` to extract: BCP/FP scope balance for the period</action>
    <check if="change-log.md is missing">
      <output>Warning: {planningDir}/change-log.md not found. Scope balance section will be left blank.</output>
    </check>
  </check>
  <check if="report_type is daily">
    <action>Run: `git log --oneline --since="24 hours ago"` to list recent commits</action>
  </check>
  <check if="report_type is weekly">
    <action>Run: `git log --oneline --since="7 days ago"` to list commits this week</action>
  </check>
  <check if="report_type is monthly">
    <action>Run: `git log --oneline --since="30 days ago"` to list commits this month</action>
  </check>
  <check if="report_type is quarterly">
    <action>Run: `git log --oneline --since="90 days ago"` to list commits this quarter</action>
  </check>
  <action>Ask: "What was accomplished today/this week/this period? (list key items)"</action>
  <action>Ask: "Any blockers or risks to report?"</action>
  <action>Ask: "What is planned for tomorrow/next period?"</action>
</step>

<step n="3" goal="Fill template and write report">
  <action>Read the selected template file from `templates/reports/{template_file}`</action>
  <action>Fill each section of the template:
    - Replace date/period placeholders with report_period value
    - Populate accomplishments section with: key items from user input + completed stories from backlog.md
    - Populate blockers/risks section from user input
    - Populate next steps/planned section from user input
    - For weekly/monthly/quarterly: include scope balance (BCP/FP) from change-log.md
    - Append git log summary as "Recent Commits" if available
  </action>
  <action>Determine output path: `{planningDir}/reports/{report_type}-{YYYY-MM-DD}.md` (use today's ISO date)</action>
  <action>Create `{planningDir}/reports/` directory if it does not exist</action>
  <action>Write the filled report to the output path</action>
</step>

<step n="4" goal="Report completion">
  <output>**acps-report complete.**

Report: {output_path}
Type: {report_type}
Period: {report_period}

Report saved. Share with your team or archive as needed.

  </output>
</step>

</workflow>
