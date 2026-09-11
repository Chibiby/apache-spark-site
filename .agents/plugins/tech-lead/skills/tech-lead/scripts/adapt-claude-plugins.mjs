#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const CLAUDE_BASE = 'C:\\Users\\PC5\\.claude';
const WORKSPACE_BASE = process.cwd();
const AGENTS_DIR = path.join(WORKSPACE_BASE, '.agents');
const PLUGINS_DIR = path.join(AGENTS_DIR, 'plugins');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function adaptContent(text) {
  return text
    .replace(/Claude/g, 'Gemini')
    .replace(/Anthropic/g, 'Google DeepMind')
    .replace(/claude-3-5-sonnet/g, 'gemini-3.8-pro')
    .replace(/claude-3-opus/g, 'gemini-3.8-pro')
    .replace(/claude-code/g, 'antigravity')
    .replace(/\.claude\//g, '.agents/')
    .replace(/Bash\(/g, 'run_command(')
    .replace(/Edit\(/g, 'replace_file_content(')
    .replace(/Write\(/g, 'write_to_file(')
    .replace(/Read\(/g, 'view_file(');
}

// 1. Adapt Superpowers
console.log('--- Adapting Superpowers ---');
const superpowersSrc = path.join(CLAUDE_BASE, 'plugins', 'cache', 'claude-plugins-official', 'superpowers', '6.3.0', 'skills');
const superpowersDest = path.join(PLUGINS_DIR, 'superpowers');
ensureDir(superpowersDest);

fs.writeFileSync(path.join(superpowersDest, 'plugin.json'), JSON.stringify({
  name: "superpowers",
  version: "6.3.0",
  description: "Comprehensive engineering workflow superpowers: brainstorming, systematic debugging, test-driven development, parallel agent dispatch, and verification gates."
}, null, 2));

if (fs.existsSync(superpowersSrc)) {
  const skillDirs = fs.readdirSync(superpowersSrc, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  for (const skill of skillDirs) {
    const srcSkillDir = path.join(superpowersSrc, skill);
    const destSkillDir = path.join(superpowersDest, 'skills', skill);
    ensureDir(destSkillDir);

    const srcFiles = fs.readdirSync(srcSkillDir);
    for (const f of srcFiles) {
      const srcFile = path.join(srcSkillDir, f);
      const stat = fs.statSync(srcFile);
      if (stat.isFile()) {
        const content = fs.readFileSync(srcFile, 'utf8');
        fs.writeFileSync(path.join(destSkillDir, f), adaptContent(content));
      } else if (stat.isDirectory()) {
        const subDest = path.join(destSkillDir, f);
        ensureDir(subDest);
        for (const subF of fs.readdirSync(srcFile)) {
          const subSrc = path.join(srcFile, subF);
          if (fs.statSync(subSrc).isFile()) {
            const c = fs.readFileSync(subSrc, 'utf8');
            fs.writeFileSync(path.join(subDest, subF), adaptContent(c));
          }
        }
      }
    }
    console.log(`Adapted superpower skill: ${skill}`);
  }
}

// 2. Adapt Frontend Design
console.log('--- Adapting Frontend Design ---');
const feSrc = path.join(CLAUDE_BASE, 'plugins', 'cache', 'claude-plugins-official', 'frontend-design', '3b600518a637', 'skills', 'frontend-design');
const feDest = path.join(PLUGINS_DIR, 'frontend-design');
ensureDir(path.join(feDest, 'skills', 'frontend-design'));

fs.writeFileSync(path.join(feDest, 'plugin.json'), JSON.stringify({
  name: "frontend-design",
  version: "1.0.0",
  description: "Distinctive, production-grade frontend design guidelines: typography, intentional color palettes, layout hierarchy, anti-cliche aesthetics, and copywriting."
}, null, 2));

if (fs.existsSync(feSrc)) {
  const skillMd = fs.readFileSync(path.join(feSrc, 'SKILL.md'), 'utf8');
  fs.writeFileSync(path.join(feDest, 'skills', 'frontend-design', 'SKILL.md'), adaptContent(skillMd));
  console.log('Adapted frontend-design skill');
}

// 3. Adapt Design Craft (Taste + Impeccable)
console.log('--- Adapting Design Craft ---');
const craftDest = path.join(PLUGINS_DIR, 'design-craft');
ensureDir(craftDest);

fs.writeFileSync(path.join(craftDest, 'plugin.json'), JSON.stringify({
  name: "design-craft",
  version: "1.0.0",
  description: "Aesthetic taste benchmarks, brand kit design systems, optical alignment, spacing precision, and UI redesign heuristics."
}, null, 2));

const tasteSrc = path.join(CLAUDE_BASE, 'plugins', 'cache', 'taste-skill', 'taste-skill', '1.0.0', 'skills');
if (fs.existsSync(tasteSrc)) {
  const mapping = [
    { src: 'taste-skill', dest: 'taste-craft' },
    { src: 'brandkit', dest: 'brandkit' },
    { src: 'redesign-skill', dest: 'ui-redesign' }
  ];

  for (const m of mapping) {
    const srcSkillPath = path.join(tasteSrc, m.src, 'SKILL.md');
    if (fs.existsSync(srcSkillPath)) {
      const destDir = path.join(craftDest, 'skills', m.dest);
      ensureDir(destDir);
      const content = fs.readFileSync(srcSkillPath, 'utf8');
      fs.writeFileSync(path.join(destDir, 'SKILL.md'), adaptContent(content));
      console.log(`Adapted taste skill: ${m.dest}`);
    }
  }
}

const impeccableSrc = path.join(CLAUDE_BASE, 'plugins', 'cache', 'impeccable', 'impeccable', '4.1.1', 'skills', 'impeccable', 'SKILL.md');
if (fs.existsSync(impeccableSrc)) {
  const destDir = path.join(craftDest, 'skills', 'impeccable-polish');
  ensureDir(destDir);
  const content = fs.readFileSync(impeccableSrc, 'utf8');
  fs.writeFileSync(path.join(destDir, 'SKILL.md'), adaptContent(content));
  console.log('Adapted impeccable skill: impeccable-polish');
}

// 4. Adapt Next.js Engineering (Vercel)
console.log('--- Adapting Next.js Engineering ---');
const nextDest = path.join(PLUGINS_DIR, 'nextjs-engineering');
ensureDir(nextDest);

fs.writeFileSync(path.join(nextDest, 'plugin.json'), JSON.stringify({
  name: "nextjs-engineering",
  version: "1.0.0",
  description: "Production Next.js 15, React 19, Turbopack, and Tailwind engineering best practices."
}, null, 2));

const vercelSrc = path.join(CLAUDE_BASE, 'plugins', 'cache', 'claude-plugins-official', 'vercel', '0.48.0', 'skills');
if (fs.existsSync(vercelSrc)) {
  const vercelSkills = [
    { src: 'nextjs', dest: 'nextjs-app-router' },
    { src: 'react-best-practices', dest: 'react-best-practices' },
    { src: 'cdn-caching', dest: 'nextjs-caching' },
    { src: 'shadcn', dest: 'shadcn-ui' },
    { src: 'turbopack', dest: 'turbopack' }
  ];

  for (const vs of vercelSkills) {
    const srcPath = path.join(vercelSrc, vs.src, 'SKILL.md');
    if (fs.existsSync(srcPath)) {
      const destDir = path.join(nextDest, 'skills', vs.dest);
      ensureDir(destDir);
      const content = fs.readFileSync(srcPath, 'utf8');
      fs.writeFileSync(path.join(destDir, 'SKILL.md'), adaptContent(content));
      console.log(`Adapted Vercel skill: ${vs.dest}`);
    }
  }
}

console.log('Plugin adaptation script completed successfully!');
