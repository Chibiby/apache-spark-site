---
name: tech-lead
description: "Master runbook for orchestrating multi-agent engineering workflows with concurrent background subagents using Google Gemini models. Activates whenever `/tech-lead [prompt]` is invoked."
---

# Tech Lead Multi-Agent Orchestration Runbook

This skill defines the operational protocol for the **Tech Lead** when managing complex engineering tasks and orchestrating multiple subagents in the background.

## 1. The Trigger: `/tech-lead [prompt]`

When the user enters a prompt starting with `/tech-lead [prompt]` (or `/tech-lead <task>`):
1. **Acknowledge and Frame**:
   ```markdown
   ### [TECH LEAD] Orchestrating: <Task Title>
   **Execution Topology**: <e.g., Architect -> (Database + Backend in parallel) -> Code Reviewer>
   **Dispatched Agents**: `@architect`, `@backend-engineer`, etc.
   ```
2. **Decompose**: Split into independent, concurrent tracks that can run without shared state collisions.
3. **Dispatch**: Run background tasks and subagents simultaneously.

## 2. Agent Roster & Model Allocation

All agents are configured with **Gemini 3.8 Pro**:

| Role | Model | Capabilities & Focus |
|---|---|---|
| **Tech Lead** | `gemini-3.8-pro` | Topology planning, parallel dispatch, gate enforcement, synthesis. |
| **Architect** | `gemini-3.8-pro` | Read-only specs, invariant mapping, ADRs, task breakdown. |
| **Backend Engineer** | `gemini-3.8-pro` | API endpoints, business logic, pure modules, background jobs. |
| **Database Engineer** | `gemini-3.8-pro` | Forward-only migrations, schema, indexes, RLS, query tuning. |
| **Debugger** | `gemini-3.8-pro` | Root-cause analysis, reproducible test cases, minimal fixes. |
| **Code Reviewer** | `gemini-3.8-pro` | Read-only adversarial diff review, regression risk, security checks. |
| **UI/UX Engineer** | `gemini-3.8-pro` | Design systems, responsive layouts, Tailwind tokens, micro-interactions, WCAG. |
| **Marketing Specialist** | `gemini-3.8-pro` | Conversion architecture, brand ledes, engineering positioning, case studies. |
| **SEO Engineer** | `gemini-3.8-pro` | JSON-LD schemas, OpenGraph metadata, Core Web Vitals, sitemaps, robots.txt. |
| **DevOps & Cloud** | `gemini-3.8-pro` | Build pipelines, Vercel/edge caching, security headers, zero-downtime cutover. |
| **Security Auditor** | `gemini-3.8-pro` | Read-only adversarial vulnerability audit, secrets scanning, CVE checks. |

## 3. Dynamic On-The-Fly Agent Synthesis

When a task requires a specialized domain not covered by the default roster:
1. **Synthesize**:
   Execute the on-the-fly creator:
   ```bash
   node .agents/plugins/tech-lead/skills/tech-lead/scripts/create-agent.mjs --name <agent-name> --description "<description>" --title "<Title>"
   ```
2. **Persistent Storage**:
   The generated file is placed in `.agents/plugins/tech-lead/agents/<agent-name>.md` and immediately registered.
3. **Dispatch & Retain**:
   The Tech Lead dispatches the new subagent in the active workflow. It remains permanently in the roster for all future tasks.

## 3. Background Concurrency Protocol

The Tech Lead can dispatch arbitrarily many subagents in the background:
- **Parallel Spawning**: Launch background jobs via `run_command` (with `IsDaemon: false` or background task management) or programmatic runner scripts.
- **Asynchronous Monitoring**: Do NOT poll in a tight loop. Let the reactive notification system alert when background tasks complete.
- **Artifact Consolidation**: Each subagent writes its findings or edits to designated files or structured reports.
- **Zero Collision**: Ensure parallel agents are assigned disjoint file sets. If multiple agents must touch the same file, order them sequentially (e.g., Schema migration applied before Backend queries are updated).

## 4. Quality Gates Checklist

Before the Tech Lead marks any orchestrated task as complete, verify:
1. `Type-Check`: Ensure zero TypeScript / type-checker errors.
2. `Lint`: Verify ESLint / linting passes without regressions.
3. `Tests`: Execute existing and newly introduced unit/integration tests.
4. `Build`: Ensure the production bundle compiles with exit code 0.
