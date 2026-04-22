#!/usr/bin/env node

import { checkbox, input, select } from '@inquirer/prompts';
import { existsSync, readFileSync, writeFileSync, mkdirSync, cpSync } from 'fs';
import { join, dirname } from 'path';
import { homedir } from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PACKAGE_ROOT = join(__dirname, '..');

const { version } = JSON.parse(
  readFileSync(join(PACKAGE_ROOT, 'package.json'), 'utf8')
);

const IDE_PATHS = {
  'claude-code': {
    global: join(homedir(), '.claude', 'skills'),
    local: join(process.cwd(), '.claude', 'skills'),
  },
  'cursor': {
    global: join(homedir(), '.cursor', 'skills'),
    local: join(process.cwd(), '.cursor', 'skills'),
  },
  'windsurf': {
    global: join(homedir(), '.codeium', 'windsurf', 'memories'),
    local: join(process.cwd(), '.windsurf', 'rules'),
  },
  'copilot': {
    global: join(homedir(), '.github', 'copilot'),
    local: join(process.cwd(), '.github', 'copilot'),
  },
  'gemini-cli': {
    global: join(homedir(), '.gemini', 'skills'),
    local: join(process.cwd(), '.gemini', 'skills'),
  },
  'cline': {
    global: join(homedir(), 'Documents', 'Cline', 'Rules'),
    local: join(process.cwd(), '.clinerules'),
  },
  'augment': {
    global: join(homedir(), '.augment', 'skills'),
    local: join(process.cwd(), '.augment', 'skills'),
  },
  'opencode': {
    global: join(homedir(), '.config', 'opencode', 'skills'),
    local: join(process.cwd(), '.opencode', 'skills'),
  },
  'codex': {
    global: join(homedir(), '.agents', 'skills'),
    local: join(process.cwd(), '.agents', 'skills'),
  },
  'trae': {
    global: join(homedir(), '.trae', 'skills'),
    local: join(process.cwd(), '.trae', 'skills'),
  },
};

const args = process.argv.slice(2);

if (args.includes('--help')) {
  console.log(`
acps — Agentic CPS methodology installer v${version}

Usage:
  npx acps@latest                          Interactive install
  npx acps@latest --claude --local         Install for Claude Code (local)
  npx acps@latest --claude --global        Install for Claude Code (global)

Flags:
  --claude          Select Claude Code as the target IDE
  --cursor          Select Cursor
  --windsurf        Select Windsurf
  --copilot         Select Copilot
  --gemini-cli      Select Gemini CLI
  --cline           Select Cline
  --augment         Select Augment
  --opencode        Select OpenCode
  --codex           Select Codex
  --trae            Select Trae
  --global          Install to global user directory
  --local           Install to local project directory (default)
  --estimation      Estimation method: bcp_full | bcp_simplified | none
  --lang            Implementation language code (e.g., en, pt-br)
  --doc-lang        Documentation language code
  --help            Show this help
`);
  process.exit(0);
}

const ideFlagMap = {
  '--claude': 'claude-code', '--cursor': 'cursor', '--windsurf': 'windsurf',
  '--copilot': 'copilot', '--gemini-cli': 'gemini-cli', '--cline': 'cline',
  '--augment': 'augment', '--opencode': 'opencode', '--codex': 'codex', '--trae': 'trae',
};

const flaggedRuntimes = args.filter(a => ideFlagMap[a]).map(a => ideFlagMap[a]);
const flagLocation = args.includes('--global') ? 'global' : args.includes('--local') ? 'local' : null;
const flagEstimation = args.find(a => a.startsWith('--estimation='))?.split('=')[1]
  ?? (args.indexOf('--estimation') !== -1 ? args[args.indexOf('--estimation') + 1] : null);
const flagLang = args.find(a => a.startsWith('--lang='))?.split('=')[1]
  ?? (args.indexOf('--lang') !== -1 ? args[args.indexOf('--lang') + 1] : null);
const flagDocLang = args.find(a => a.startsWith('--doc-lang='))?.split('=')[1]
  ?? (args.indexOf('--doc-lang') !== -1 ? args[args.indexOf('--doc-lang') + 1] : null);

const nonInteractive = flaggedRuntimes.length > 0 && flagLocation !== null && flagEstimation !== null && flagLang !== null;

async function install() {
  console.log(`\nacps v${version} — Agentic CPS Methodology Installer\n`);

  let answers;

  if (nonInteractive) {
    answers = {
      name: 'my-project',
      lang: flagLang,
      docLang: flagDocLang ?? flagLang,
      runtimes: flaggedRuntimes,
      location: flagLocation,
      estimation: flagEstimation,
    };
    console.log('Non-interactive mode. Installing with flags...');
  } else {
    answers = {
      name: await input({ message: 'Project or team name:', required: true }),
      lang: await input({ message: 'Implementation language code (e.g., en, pt-br):', default: 'en' }),
      docLang: await input({ message: 'Documentation language code (e.g., en, pt-br):', default: 'en' }),
      runtimes: await checkbox({
        message: 'Select AI IDEs to install skills for:',
        choices: [
          { name: 'Claude Code', value: 'claude-code', checked: true },
          { name: 'Cursor', value: 'cursor' },
          { name: 'Windsurf', value: 'windsurf' },
          { name: 'GitHub Copilot', value: 'copilot' },
          { name: 'Gemini CLI', value: 'gemini-cli' },
          { name: 'Cline', value: 'cline' },
          { name: 'Augment', value: 'augment' },
          { name: 'OpenCode', value: 'opencode' },
          { name: 'Codex (OpenAI)', value: 'codex' },
          { name: 'Trae', value: 'trae' },
        ],
        required: true,
      }),
      location: await select({
        message: 'Install globally (for your user) or locally (for this project)?',
        choices: [
          { name: 'Local — install into this project directory', value: 'local' },
          { name: 'Global — install into your user home directory', value: 'global' },
        ],
      }),
      estimation: await select({
        message: 'Estimation method:',
        choices: [
          { name: 'BCP Full — full business complexity points (recommended)', value: 'bcp_full' },
          { name: 'BCP Simplified — simplified points scale', value: 'bcp_simplified' },
          { name: 'None — no estimation', value: 'none' },
        ],
      }),
    };
  }

  const validEstimations = ['bcp_full', 'bcp_simplified', 'none'];
  if (!validEstimations.includes(answers.estimation)) {
    console.error(`Invalid --estimation value: ${answers.estimation}. Must be one of: ${validEstimations.join(', ')}`);
    process.exit(1);
  }

  const SKILLS_SRC = join(PACKAGE_ROOT, 'skills');
  for (const runtime of answers.runtimes) {
    const dest = IDE_PATHS[runtime][answers.location];
    mkdirSync(dest, { recursive: true });
    cpSync(SKILLS_SRC, dest, { recursive: true });
    console.log(`Installed skills for ${runtime} → ${dest}`);
  }

  const configPath = join(process.cwd(), '.acps-config.json');
  const existing = existsSync(configPath)
    ? JSON.parse(readFileSync(configPath, 'utf8'))
    : {};

  const config = {
    ...existing,
    version,
    name: answers.name,
    lang: answers.lang,
    docLang: answers.docLang,
    estimation: answers.estimation,
    runtimes: answers.runtimes,
    location: answers.location,
    installed_at: new Date().toISOString(),
  };

  writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n');
  console.log(`Config written to .acps-config.json`);

  console.log(`\nacps installed successfully. Run "acps-help" in your AI IDE to get started.\n`);
}

install().catch(err => {
  console.error('Installation failed:', err.message);
  process.exit(1);
});
