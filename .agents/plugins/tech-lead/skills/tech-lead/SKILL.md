---
name: tech-lead
description: "Master runbook for orchestrating multi-agent engineering workflows with concurrent background subagents using Google Gemini models, workflow superpowers, and high-craft design skills. Activates whenever `/tech-lead [prompt]` is invoked."
---

# Tech Lead Multi-Agent Orchestration Runbook

This skill defines the operational protocol for the **Tech Lead** when managing complex engineering tasks and orchestrating multiple subagents in the background.

## 1. The Trigger: `/tech-lead [prompt]`

When the user enters a prompt starting with `/tech-lead [prompt]` (or `/tech-lead <task>`):
1. **Acknowledge and Frame**:
   ```markdown
   ### [TECH LEAD] Orchestration Initialized: <Task Title>
   **Execution Topology**: <e.g., Architect -> (Backend + Frontend in parallel) -> QA Verifier -> Code Reviewer>
   **Dispatched Subagents**: `@architect`, `@backend-engineer`, `@frontend-engineer`, `@qa-verifier`
   **Active Superpowers & Skills**: `superpowers:brainstorming`, `frontend-design`, `nextjs-engineering:nextjs-app-router`
   ```
2. **Decompose**: Split into independent, concurrent tracks that can run without shared state collisions.
3. **Dispatch**: Run background tasks and subagents simultaneously.

## 2. Agent Roster & Assigned Superpowers

All agents operate with **Gemini 3.8 Pro**:

| Role | Model | Capabilities & Focus | Key Assigned Skills |
|---|---|---|---|
| **Tech Lead** | `gemini-3.8-pro` | Topology planning, parallel dispatch, gate enforcement, synthesis. | `superpowers:using-superpowers`, `superpowers:dispatching-parallel-agents` |
| **Architect** | `gemini-3.8-pro` | Read-only specs, invariant mapping, ADRs, task breakdown. | `superpowers:writing-plans`, `superpowers:brainstorming` |
| **Backend Engineer** | `gemini-3.8-pro` | API endpoints, business logic, pure modules, background jobs. | `superpowers:test-driven-development` |
| **Database Engineer** | `gemini-3.8-pro` | Forward-only migrations, schema, indexes, RLS, query tuning. | Invariant validation, idempotency |
| **Debugger** | `gemini-3.8-pro` | Root-cause analysis, reproducible test cases, minimal fixes. | `superpowers:systematic-debugging` |
| **Code Reviewer** | `gemini-3.8-pro` | Read-only adversarial diff review, regression risk, security checks. | `superpowers:requesting-code-review`, `superpowers:receiving-code-review` |
| **QA Verifier** | `gemini-3.8-pro` | Independent verification of gates, test runs, and builds with raw exit codes. | `superpowers:verification-before-completion` |
| **UI/UX Engineer** | `gemini-3.8-pro` | Design systems, responsive layouts, Tailwind tokens, micro-interactions, WCAG. | `frontend-design`, `design-craft:taste-craft`, `design-craft:brandkit`, `design-craft:impeccable-polish` |
| **Frontend Engineer** | `gemini-3.8-pro` | Next.js 15, React 19, TypeScript UI implementation, client/server boundaries. | `nextjs-engineering:nextjs-app-router`, `nextjs-engineering:react-best-practices`, `nextjs-engineering:shadcn-ui` |
| **Marketing Specialist** | `gemini-3.8-pro` | Conversion architecture, brand ledes, engineering positioning, case studies. | `frontend-design` (copywriting), `design-craft:brandkit` |
| **SEO Engineer** | `gemini-3.8-pro` | JSON-LD schemas, OpenGraph metadata, Core Web Vitals, sitemaps, robots.txt. | Structured metadata, CWV |
| **DevOps & Cloud** | `gemini-3.8-pro` | Build pipelines, Vercel/edge caching, security headers, zero-downtime cutover. | `nextjs-engineering:turbopack`, `nextjs-engineering:nextjs-caching` |
| **Security Auditor** | `gemini-3.8-pro` | Read-only adversarial vulnerability audit, secrets scanning, CVE checks. | Dependency scanning, auth checks |

## 3. Integrated Superpowers & Plugins

The repository is equipped with four specialized adapted plugins in `.agents/plugins/`:
1. **`superpowers`**: Full workflow lifecycle (brainstorming, systematic debugging, test-driven dev, parallel dispatch, verification gates).
2. **`frontend-design`**: Anti-cliche UI aesthetics, intentional typography, and design copywriting.
3. **`design-craft`**: Visual taste benchmarks, brand kit design systems, optical alignment, and UI redesign heuristics.
4. **`nextjs-engineering`**: Next.js 15 App Router architecture, React 19 best practices, caching, and Turbopack.

## 4. Dynamic On-The-Fly Agent Synthesis

When a task requires a specialized domain not covered by the default roster:
1. **Synthesize**:
   ```bash
   node .agents/plugins/tech-lead/skills/tech-lead/scripts/create-agent.mjs --name <agent-name> --description "<description>"
   ```
2. **Persistent Storage**:
   Placed in `.agents/plugins/tech-lead/agents/<agent-name>.md` and registered.
3. **Dispatch & Retain**:
   Dispatched immediately for the active task and retained permanently.

## 5. Background Concurrency Protocol

- **Parallel Spawning**: Launch background jobs via `run_command` or programmatic scripts.
- **Asynchronous Monitoring**: Do NOT poll in a tight loop. Wait reactively for task completion.
- **Artifact Consolidation**: Subagents write findings/diffs to designated artifacts or files.
- **Zero Collision**: Assign disjoint file sets to parallel agents.

## 6. Quality Gates Checklist

Executed and witnessed by `@qa-verifier`:
1. `Type-Check`: `npx tsc --noEmit`
2. `Lint`: `npm run lint`
3. `Tests`: `npm test` (if present)
4. `Build`: `npm run build`
