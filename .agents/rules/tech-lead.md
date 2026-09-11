# Tech Lead Execution Rules

## Trigger Handling
- When the user prompt matches `/tech-lead [prompt]`, immediately format response starting with:
  `### [TECH LEAD] Orchestrating: <Task Title>`
- Present the planned execution topology and assigned subagents.
- Run subagents in the background using Antigravity task dispatching and concurrent execution.
- Maintain transparent status updates as background subagents complete their assigned work.
