// path: src/components/sections/SparkTerminal.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MarginNote } from '@/components/brand/MarginNote';
import { DimensionLine } from '@/components/brand/DimensionLine';
import { CornerDownLeft } from 'lucide-react';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system' | 'benchmark';
  text: string;
  timestamp?: string;
}

const INITIAL_LINES: TerminalLine[] = [
  {
    id: '1',
    type: 'system',
    text: 'APACHE SPARK OPERATIONAL TERMINAL // NODE CLUSTER: EDGE-US-WEST-01',
  },
  {
    id: '2',
    type: 'system',
    text: 'Type "help" to list available diagnostic commands, or click the quick action chips below.',
  },
  {
    id: '3',
    type: 'output',
    text: 'STATUS: READY // ALL SYSTEMS OPERATING WITHIN RIGID TOLERANCES',
  },
];

export const SparkTerminal: React.FC<{ onBookCall?: () => void }> = ({ onBookCall }) => {
  const [inputVal, setInputVal] = useState<string>('');
  const [lines, setLines] = useState<TerminalLine[]>(INITIAL_LINES);
  const [isRunningBenchmark, setIsRunningBenchmark] = useState<boolean>(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [lines]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const inputLine: TerminalLine = {
      id: Date.now().toString(),
      type: 'input',
      text: `guest@spark:~$ ${cmd}`,
    };

    let responseLines: TerminalLine[] = [];

    switch (trimmed) {
      case 'help':
        responseLines = [
          {
            id: (Date.now() + 1).toString(),
            type: 'output',
            text: [
              'AVAILABLE ARCHITECTURE COMMANDS:',
              '  spark status     - Display live edge node telemetry & health metrics',
              '  spark stack      - Inspect full-stack and systems engineering dependencies',
              '  spark benchmark  - Execute real-time distributed throughput & latency test',
              '  spark audit      - Inquire about the complimentary 48h Architecture Review',
              '  spark book       - Launch direct architectural discovery call booking',
              '  clear            - Wipe terminal buffer',
            ].join('\n'),
          },
        ];
        break;

      case 'spark status':
        responseLines = [
          {
            id: (Date.now() + 1).toString(),
            type: 'output',
            text: [
              '[MESH CLUSTER STATUS]: OPTIMAL (26 NODES ONLINE)',
              '  US-WEST-1: ONLINE (latency: 1.2ms, CPU: 8%, Mem: 18%)',
              '  US-EAST-1: ONLINE (latency: 1.6ms, CPU: 11%, Mem: 22%)',
              '  EU-CENTRAL: ONLINE (latency: 2.1ms, CPU: 7%, Mem: 15%)',
              '  RUNTIME: Edge Isolated V8 + Rust WebAssembly Kernel',
              '  ACTIVE CONNECTIONS: 14,890 persistent WebSockets',
              '  PACKET LOSS: 0.0000% over 48 hours continuous run',
            ].join('\n'),
          },
        ];
        break;

      case 'spark stack':
        responseLines = [
          {
            id: (Date.now() + 1).toString(),
            type: 'output',
            text: [
              'ENGINEERING STACK SPECIFICATION:',
              '  • Presentation: Next.js 15.5 App Router, React 19, TypeScript Strict, Tailwind CSS',
              '  • Interaction: Framer Motion, Lenis Smooth Scroll, Three.js / WebGL Custom Shaders',
              '  • Backend & Systems: Rust (Tokio runtime), Go (gRPC), Node.js 22 LTS',
              '  • Data Layer: Supabase Postgres, Prisma 5, Row-Level Security (RLS) isolation',
              '  • Telemetry & Hardware: Modbus, OPC-UA, SCADA Ethernet, Fluke DSX-8000 certs',
              '  • CI/CD & Deploy: Vercel Edge, Docker, Terraform IaC, Zero-Downtime Rollouts',
            ].join('\n'),
          },
        ];
        break;

      case 'spark benchmark':
        setIsRunningBenchmark(true);
        responseLines = [
          {
            id: (Date.now() + 1).toString(),
            type: 'benchmark',
            text: [
              'INITIALIZING DISTRIBUTED STRESS SIMULATION (10,000 CONCURRENT CLIENTS)...',
              '[████████████████████████████████] 100% COMPLETE',
              '',
              'BENCHMARK RESULTS:',
              '  Requests Executed: 100,000 in 0.702s',
              '  Throughput: 142,450 req/sec',
              '  Latency p50: 0.62ms',
              '  Latency p95: 1.18ms',
              '  Latency p99: 1.44ms',
              '  HTTP 5xx Errors: 0 (0.00%)',
              '  VERDICT: PRODUCTION-READY FOR HIGH-STAKES CONCURRENCY',
            ].join('\n'),
          },
        ];
        setTimeout(() => setIsRunningBenchmark(false), 600);
        break;

      case 'spark audit':
        responseLines = [
          {
            id: (Date.now() + 1).toString(),
            type: 'output',
            text: [
              'COMPLIMENTARY 48-HOUR ARCHITECTURE & BOTTLENECK AUDIT:',
              '  We offer prospective startups and enterprise engineering teams a free review of their',
              '  existing codebase or system schematics to identify latency bottlenecks, scaling risks,',
              '  and architectural friction before major capital investment.',
              '',
              '  To request an audit: email engage@apachespark.tech or visit /contact with your repo/spec.',
            ].join('\n'),
          },
        ];
        break;

      case 'spark book':
        if (onBookCall) {
          onBookCall();
        }
        responseLines = [
          {
            id: (Date.now() + 1).toString(),
            type: 'output',
            text: [
              'LAUNCHING ARCHITECTURAL DISCOVERY BOOKING MODAL...',
              'Routing request directly to Brandanlee Hugos (Lead Systems Developer) & Principal Eng Desk.',
            ].join('\n'),
          },
        ];
        break;

      case 'clear':
        setLines(INITIAL_LINES);
        setInputVal('');
        return;

      default:
        responseLines = [
          {
            id: (Date.now() + 1).toString(),
            type: 'output',
            text: `Command not recognized: "${cmd}". Type "help" to see valid commands.`,
          },
        ];
    }

    setLines((prev) => [...prev, inputLine, ...responseLines]);
    setInputVal('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  return (
    <section id="terminal" className="py-24 max-w-7xl mx-auto px-4 md:px-8 select-none">
      {/* Margin annotations */}
      <div className="flex items-center justify-between w-full border-b border-[rgba(20,24,28,0.16)] pb-3 mb-10">
        <MarginNote>SHEET 09C — LIVE OPERATIONAL TERMINAL</MarginNote>
        <MarginNote>INTERACTIVE RUNTIME BENCHMARKS</MarginNote>
      </div>

      {/* Header */}
      <div className="max-w-3xl flex flex-col gap-4 mb-10">
        <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.24em] uppercase">
          // LIVE DEVELOPER SANDBOX
        </span>
        <h2 className="font-sans text-[clamp(28px,4.5vw,52px)] font-bold text-[#14181C] tracking-[-0.02em] leading-[1.05]">
          Inspect Our Systems &amp; Engineering Rigor Live
        </h2>
        <p className="font-mono text-[14px] md:text-[16px] text-[#7C7568] leading-[1.8] max-w-2xl">
          Don’t take our word for it—interact directly with our diagnostic node sandbox. Run real-time performance benchmarks, audit our complete technology stack, or launch a direct engineering discovery session.
        </p>
      </div>

      {/* Terminal Window Frame */}
      <div className="border border-[#14181C] bg-[#14181C] text-[#F2EFE8] shadow-2xl rounded-none overflow-hidden flex flex-col">
        {/* Terminal Title Bar */}
        <div className="bg-[#1D2228] px-4 py-3 border-b border-[rgba(242,239,232,0.14)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block opacity-80" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block opacity-80" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block opacity-80" />
            <span className="ml-3 font-mono text-[11px] text-[rgba(242,239,232,0.6)] hidden sm:inline">
              guest@apache-spark-edge-node-01: ~ (zsh)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-[#C97A4A] tracking-wider uppercase">
              {isRunningBenchmark ? '● SIMULATING STRESS TEST...' : '● EDGE TELEMETRY ACTIVE'}
            </span>
          </div>
        </div>

        {/* Quick-Run Action Chips */}
        <div className="bg-[#171B20] px-4 py-2.5 border-b border-[rgba(242,239,232,0.08)] flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] text-[rgba(242,239,232,0.5)] mr-1 uppercase">
            Quick run:
          </span>
          {[
            { label: 'spark status', cmd: 'spark status' },
            { label: 'spark stack', cmd: 'spark stack' },
            { label: 'spark benchmark', cmd: 'spark benchmark' },
            { label: 'spark audit', cmd: 'spark audit' },
            { label: 'spark book', cmd: 'spark book' },
            { label: 'clear', cmd: 'clear' },
          ].map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => executeCommand(chip.cmd)}
              className="px-2.5 py-1 bg-[rgba(242,239,232,0.08)] hover:bg-[#9E5430] hover:text-[#F2EFE8] font-mono text-[10px] text-[rgba(242,239,232,0.85)] border border-[rgba(242,239,232,0.12)] transition-colors"
            >
              $ {chip.label}
            </button>
          ))}
        </div>

        {/* Terminal Output Area */}
        <div className="p-5 md:p-6 font-mono text-[12px] md:text-[13px] leading-relaxed max-h-[380px] min-h-[260px] overflow-y-auto flex flex-col gap-3 scrollbar-thin">
          {lines.map((line) => {
            if (line.type === 'input') {
              return (
                <div key={line.id} className="text-[#C97A4A] font-semibold">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'system') {
              return (
                <div key={line.id} className="text-[rgba(242,239,232,0.5)] italic text-[11px]">
                  # {line.text}
                </div>
              );
            }
            if (line.type === 'benchmark') {
              return (
                <pre key={line.id} className="text-[#27C93F] whitespace-pre-wrap font-mono">
                  {line.text}
                </pre>
              );
            }
            return (
              <pre key={line.id} className="text-[rgba(242,239,232,0.85)] whitespace-pre-wrap font-mono">
                {line.text}
              </pre>
            );
          })}
          <div ref={terminalEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleFormSubmit}
          className="bg-[#1D2228] p-3 md:p-4 border-t border-[rgba(242,239,232,0.14)] flex items-center gap-3"
        >
          <span className="font-mono text-[12px] text-[#C97A4A] select-none font-bold">
            guest@spark:~$
          </span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'spark benchmark', 'spark status', 'help'..."
            className="flex-1 bg-transparent border-none text-[#F2EFE8] font-mono text-[12px] placeholder:text-[rgba(242,239,232,0.3)] focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Execute command"
            className="p-1.5 bg-[#9E5430] text-[#F2EFE8] hover:bg-[#C97A4A] transition-colors"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>

      <div className="w-full pt-10">
        <DimensionLine label="DISTRIBUTED EXECUTION // REAL-TIME COMMAND TELEMETRY // 26 NODES" />
      </div>
    </section>
  );
};
