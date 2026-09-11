#!/usr/bin/env node
/**
 * Dynamic On-the-Fly Subagent Synthesizer
 * Allows Tech Lead or developers to generate and persist specialized subagents
 * powered by Gemini 3.8 Pro for immediate and future use.
 */

import { promises as fs } from 'fs';
import path from 'path';

const AGENTS_DIR = path.resolve('.agents/plugins/tech-lead/agents');

function parseArgs(args) {
  const params = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = args[i + 1];
      if (next && !next.startsWith('--')) {
        params[key] = next;
        i++;
      } else {
        params[key] = true;
      }
    }
  }
  return params;
}

const DEFAULT_TOOLS_READONLY = [
  'view_file',
  'grep_search',
  'list_dir',
  'run_command',
];

const DEFAULT_TOOLS_FULL = [
  'view_file',
  'write_to_file',
  'replace_file_content',
  'multi_replace_file_content',
  'list_dir',
  'grep_search',
  'run_command',
];

export async function createAgent({
  name,
  description,
  model = 'gemini-3.8-pro',
  readOnly = false,
  tools = null,
  personaTitle = null,
  instructions = '',
}) {
  if (!name) {
    throw new Error('Agent name is required (e.g. --name api-specialist)');
  }

  const cleanName = name.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  const title = personaTitle || cleanName
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const chosenTools = tools
    ? tools.split(',').map((t) => t.trim())
    : readOnly
    ? DEFAULT_TOOLS_READONLY
    : DEFAULT_TOOLS_FULL;

  const desc = description || `Specialized ${title} agent powered by ${model}.`;

  const content = `---
name: ${cleanName}
description: "${desc}"
model: ${model}
subagent: true
mainAgent: false
commandExecutionPolicy: auto
tools:
${chosenTools.map((t) => `  - ${t}`).join('\n')}
---

# ${title} Persona (${model})

You are the ${title}, powered by ${model}. You operate as an autonomous specialized subagent orchestrated by the Tech Lead.

## Mission & Domain Scope

${desc}

## Operational Guidelines

1. **Follow Workspace Standards**: Respect all guidelines in \`AGENTS.md\` and existing codebase patterns.
2. **Deterministic Verification**: Verify all edits using the appropriate verification gates before reporting back.
3. **Focused Execution**: Stay strictly within your domain scope to maintain a minimal blast radius.

${instructions ? `## Domain-Specific Instructions\n\n${instructions}\n` : ''}
## Report Back to Tech Lead

- Exact files inspected, created, or modified.
- Analysis, decisions made, or rationale.
- Verification status and gate commands executed.
`;

  await fs.mkdir(AGENTS_DIR, { recursive: true });
  const targetFile = path.join(AGENTS_DIR, `${cleanName}.md`);
  await fs.writeFile(targetFile, content, 'utf-8');

  console.log(`[TECH LEAD] Successfully synthesized and saved new agent:`);
  console.log(`- Name: ${cleanName}`);
  console.log(`- Model: ${model}`);
  console.log(`- File: ${targetFile}`);
  console.log(`- Ready for immediate and future orchestration.`);

  return { cleanName, targetFile, model };
}

// CLI runner
const cliArgs = parseArgs(process.argv.slice(2));
if (cliArgs.name) {
  createAgent({
    name: cliArgs.name,
    description: cliArgs.description,
    model: cliArgs.model || 'gemini-3.8-pro',
    readOnly: Boolean(cliArgs.readOnly),
    tools: cliArgs.tools,
    personaTitle: cliArgs.title,
    instructions: cliArgs.instructions || '',
  }).catch((err) => {
    console.error('[TECH LEAD] Error creating agent:', err.message);
    process.exit(1);
  });
}
