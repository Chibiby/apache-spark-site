#!/usr/bin/env python3
"""
Tech Lead Background Multi-Agent Orchestrator
Spawns and coordinates multiple concurrent worker tasks in the background.
Supports arbitrary numbers of concurrent agents using asyncio.
"""

import argparse
import asyncio
import json
import os
import sys
import time
from datetime import datetime
from pathlib import Path

# Supported roles
ROLES = {
    "architect": "Architect (gemini-3.8-pro)",
    "backend-engineer": "Backend Engineer (gemini-3.8-pro)",
    "database-engineer": "Database Engineer (gemini-3.8-pro)",
    "debugger": "Debugger (gemini-3.8-pro)",
    "code-reviewer": "Code Reviewer (gemini-3.8-pro)",
}

async def run_agent_task(agent_name: str, task_desc: str, output_dir: Path, index: int):
    """Simulates/dispatches an individual subagent task in the background."""
    start_time = time.time()
    role_label = ROLES.get(agent_name, agent_name)
    log_file = output_dir / f"agent_{index:02d}_{agent_name}.log"
    
    with open(log_file, "w", encoding="utf-8") as f:
        f.write(f"=== Subagent [{role_label}] Started ===\n")
        f.write(f"Timestamp: {datetime.now().isoformat()}\n")
        f.write(f"Task: {task_desc}\n\n")
    
    # Process / execute task
    await asyncio.sleep(0.5)
    
    elapsed = time.time() - start_time
    with open(log_file, "a", encoding="utf-8") as f:
        f.write(f"\n=== Subagent [{role_label}] Finished ({elapsed:.2f}s) ===\n")
        f.write(f"Status: COMPLETED\n")
    
    return {
        "agent": agent_name,
        "role": role_label,
        "task": task_desc,
        "status": "COMPLETED",
        "duration_seconds": round(elapsed, 2),
        "log_file": str(log_file),
    }

async def orchestrate(tasks: list, output_dir: Path):
    """Runs all subagent tasks concurrently."""
    output_dir.mkdir(parents=True, exist_ok=True)
    print(f"[TECH LEAD] Launching {len(tasks)} subagents in background...")
    
    coros = [
        run_agent_task(t["agent"], t.get("task", ""), output_dir, i + 1)
        for i, t in enumerate(tasks)
    ]
    results = await asyncio.gather(*coros)
    
    summary_file = output_dir / "orchestration_summary.json"
    summary = {
        "timestamp": datetime.now().isoformat(),
        "total_agents": len(tasks),
        "results": results,
    }
    with open(summary_file, "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2)
        
    print(f"[TECH LEAD] All {len(tasks)} subagents completed. Summary written to {summary_file}")
    return summary

def main():
    parser = argparse.ArgumentParser(description="Tech Lead Background Multi-Agent Orchestrator")
    parser.add_argument("--tasks-json", help="JSON string or file containing array of {agent, task} objects")
    parser.add_argument("--output-dir", default=".agents/runs/latest", help="Directory to store agent run artifacts")
    args = parser.parse_args()
    
    if not args.tasks_json:
        # Default demonstration topology
        tasks = [
            {"agent": "architect", "task": "Design component architecture and invariant boundaries."},
            {"agent": "database-engineer", "task": "Verify schema migrations and constraint definitions."},
            {"agent": "backend-engineer", "task": "Implement service logic, handlers, and unit tests."},
            {"agent": "code-reviewer", "task": "Adversarially audit diff for edge cases and regressions."},
        ]
    else:
        if os.path.exists(args.tasks_json):
            with open(args.tasks_json, "r", encoding="utf-8") as f:
                tasks = json.load(f)
        else:
            tasks = json.loads(args.tasks_json)
            
    out_dir = Path(args.output_dir)
    asyncio.run(orchestrate(tasks, out_dir))

if __name__ == "__main__":
    main()
