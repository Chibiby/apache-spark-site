// path: src/components/sections/ArchitecturalAudit.tsx
'use client';

import React, { useState } from 'react';
import { MarginNote } from '@/components/brand/MarginNote';
import { DimensionLine } from '@/components/brand/DimensionLine';
import { openScheduleModal } from '@/lib/events';
import {
  ArrowRight,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';

interface AuditQuestion {
  id: string;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    scoreWeight: number;
    insight: string;
  }[];
}

const QUESTIONS: AuditQuestion[] = [
  {
    id: 'bottleneck',
    title: 'What is your primary architectural friction point?',
    subtitle: 'Select the operational symptom causing the greatest drag on velocity or budget.',
    options: [
      {
        label: 'Database Latency & Lock Contention',
        description: 'Queries stall under peak loads; p99 latency spikes above 400ms.',
        scoreWeight: 20,
        insight: 'Requires read replicas, connection pooling with PgBouncer, and index refactoring.',
      },
      {
        label: 'Cloud Infrastructure Cost Sprawl',
        description: 'AWS / GCP bills multiplying without proportionate customer traffic growth.',
        scoreWeight: 25,
        insight: 'Unused over-provisioned VMs and unoptimized serverless cold-starts are driving waste.',
      },
      {
        label: 'Monolith Debt & Slow Deployments',
        description: 'Codebase has become brittle; releases risk regression and break existing features.',
        scoreWeight: 15,
        insight: 'Needs modular boundary decomposition and strict TypeScript typing end-to-end.',
      },
      {
        label: 'Security, Compliance & Multi-Tenancy',
        description: 'Enterprise prospects requesting SOC 2 Type II, HIPAA, or strict data isolation.',
        scoreWeight: 30,
        insight: 'Mandates Row-Level Security (RLS), encrypted audit logs, and zero-trust IAM.',
      },
    ],
  },
  {
    id: 'traffic',
    title: 'What is your active throughput / user concurrency?',
    subtitle: 'The peak transaction or request load your systems must sustain without degradation.',
    options: [
      {
        label: 'Early Stage (< 5,000 Daily Actives)',
        description: 'Validating product-market fit; velocity and low burn are highest priorities.',
        scoreWeight: 15,
        insight: 'Optimize for rapid iterative shipping with minimal maintenance overhead.',
      },
      {
        label: 'Scaling Production (10,000 – 100,000 Actives)',
        description: 'Consistent traffic; occasional spikes create intermittent service degradation.',
        scoreWeight: 25,
        insight: 'Edge caching and automated horizontal autoscaling will yield immediate stability.',
      },
      {
        label: 'High-Volume Enterprise (500,000+ Actives)',
        description: 'Mission-critical continuous ingestion; downtime causes measurable financial loss.',
        scoreWeight: 35,
        insight: 'Distributed multi-region active-active cluster with sub-second failover required.',
      },
    ],
  },
  {
    id: 'stack',
    title: 'Where is your primary compute runtime deployed?',
    subtitle: 'Your existing hosting environment and core application framework.',
    options: [
      {
        label: 'Public Cloud Serverless (AWS Lambda / Vercel)',
        description: 'Rapid developer ergonomics; vulnerability to cold-starts and connection limits.',
        scoreWeight: 20,
        insight: 'Edge compute + dedicated DB proxy layer will eliminate cold-start penalties.',
      },
      {
        label: 'Containerized Kubernetes / Docker Swarm',
        description: 'Flexible control; significant DevOps overhead and maintenance burden.',
        scoreWeight: 25,
        insight: 'Lightweight orchestration or container trimming reduces cluster footprint by ~40%.',
      },
      {
        label: 'Bare-Metal Dedicated Servers / On-Premise',
        description: 'High physical performance; requires specialized low-level networking & cabling.',
        scoreWeight: 30,
        insight: 'Fluke-calibrated cabling + zero-allocation Rust services maximize raw silicon.',
      },
      {
        label: 'Legacy Virtual Machines (EC2 / Compute Engine)',
        description: 'Long-running monolith instances running manual updates and unscripted states.',
        scoreWeight: 10,
        insight: 'Prime candidate for modern containerized pipeline migration and CI/CD automation.',
      },
    ],
  },
  {
    id: 'timeline',
    title: 'What is your deployment urgency?',
    subtitle: 'The timeline required to engineer and commission the solution.',
    options: [
      {
        label: 'Emergency Remediation (Within 14 Days)',
        description: 'Active outage, performance blocker, or critical enterprise deal on the line.',
        scoreWeight: 25,
        insight: 'Rapid tactical diagnostic pod deployed within 48 hours under expedited SLA.',
      },
      {
        label: 'Quarterly Modernization Sprint (30–60 Days)',
        description: 'Planned architectural upgrade to unblock major product features.',
        scoreWeight: 20,
        insight: 'Comprehensive architectural blueprinting followed by phased non-breaking cutover.',
      },
      {
        label: 'Long-Term Dedicated Pod Retainer',
        description: 'Ongoing senior technical leadership and continuous systems engineering.',
        scoreWeight: 15,
        insight: 'Permanent dedicated pod providing lead architect oversight and continuous releases.',
      },
    ],
  },
];

export const ArchitecturalAudit: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [completed, setCompleted] = useState<boolean>(false);

  const currentQ = QUESTIONS[currentStep];

  const handleSelectOption = (optionIndex: number) => {
    const newAnswers = { ...answers, [currentQ.id]: optionIndex };
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setCompleted(false);
  };

  // Calculate readiness score
  let totalScore = 45;
  const selectedInsights: string[] = [];
  QUESTIONS.forEach((q) => {
    const selectedIdx = answers[q.id];
    if (selectedIdx !== undefined) {
      const opt = q.options[selectedIdx];
      totalScore += opt.scoreWeight;
      selectedInsights.push(opt.insight);
    }
  });

  const normalizedScore = Math.min(96, Math.max(52, Math.round((totalScore / 130) * 100)));

  const handleBookWithAudit = () => {
    const summary = QUESTIONS.map((q) => {
      const idx = answers[q.id];
      return idx !== undefined ? `${q.title}: ${q.options[idx].label}` : '';
    })
      .filter(Boolean)
      .join('; ');

    openScheduleModal({
      interest: `Audit Score ${normalizedScore}/100. Details: ${summary}`,
    });
  };

  return (
    <section id="audit" className="py-20 border-t border-[rgba(20,24,28,0.16)] bg-[#F2EFE8] relative select-none">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-12">
        {/* Margin Annotations */}
        <div className="flex items-center justify-between w-full border-b border-[rgba(20,24,28,0.16)] pb-3">
          <MarginNote>INSTRUMENTATION // ARCHITECTURAL AUDIT</MarginNote>
          <MarginNote>60-SECOND TECHNICAL READINESS EVALUATION</MarginNote>
        </div>

        {/* Section Header */}
        <div className="max-w-3xl flex flex-col gap-3">
          <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.24em] uppercase font-semibold">
            // FREE TECHNICAL DIAGNOSTIC
          </span>
          <h2 className="font-sans text-[clamp(28px,5vw,48px)] font-bold text-[#14181C] tracking-[-0.02em] leading-[1.05]">
            Evaluate Your System Readiness &amp; ROI
          </h2>
          <p className="font-mono text-[13px] md:text-[15px] text-[#7C7568] leading-[1.8]">
            Answer 4 quick questions about your current infrastructure. Our diagnostic engine evaluates performance bottlenecks, estimated cloud waste, and recommends a sprint topology.
          </p>
        </div>

        {/* Diagnostic Interactive Container */}
        <div className="border border-[rgba(20,24,28,0.20)] bg-[#EFECE5] p-6 md:p-10 shadow-sm relative">
          {!completed ? (
            <div className="flex flex-col gap-8">
              {/* Progress Bar & Counter */}
              <div className="flex items-center justify-between font-mono text-[11px] text-[#7C7568] border-b border-[rgba(20,24,28,0.12)] pb-4">
                <span className="text-[#9E5430] font-semibold tracking-[0.2em] uppercase">
                  QUESTION 0{currentStep + 1} OF 0{QUESTIONS.length}
                </span>
                <div className="flex items-center gap-2">
                  {QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 w-8 rounded-full transition-colors ${
                        i <= currentStep ? 'bg-[#9E5430]' : 'bg-[rgba(20,24,28,0.12)]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Active Question */}
              <div className="flex flex-col gap-2">
                <h3 className="font-sans text-[22px] md:text-[28px] font-bold text-[#14181C]">
                  {currentQ.title}
                </h3>
                <p className="font-mono text-[13px] text-[#7C7568]">
                  {currentQ.subtitle}
                </p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={opt.label}
                    onClick={() => handleSelectOption(idx)}
                    className="p-5 text-left border border-[rgba(20,24,28,0.16)] bg-[#F2EFE8] hover:border-[#9E5430] hover:bg-[#FAF8F3] transition-all flex flex-col justify-between min-h-[140px] group"
                  >
                    <div>
                      <div className="flex items-center justify-between font-mono text-[10px] text-[#7C7568] mb-2">
                        <span>OPTION 0{idx + 1}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#7C7568] group-hover:text-[#9E5430] group-hover:translate-x-1 transition-all" />
                      </div>
                      <div className="font-sans text-[16px] font-bold text-[#14181C] group-hover:text-[#9E5430] transition-colors">
                        {opt.label}
                      </div>
                    </div>
                    <p className="font-mono text-[11px] text-[#7C7568] mt-2 leading-relaxed">
                      {opt.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="flex flex-col gap-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(20,24,28,0.14)]">
                <div>
                  <div className="font-mono text-[11px] text-[#9E5430] tracking-[0.2em] uppercase font-semibold">
                    // DIAGNOSTIC COMPLETE // REPORT COMPILED
                  </div>
                  <h3 className="font-sans text-[26px] md:text-[34px] font-bold text-[#14181C] mt-1">
                    System Modernization Roadmap
                  </h3>
                </div>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#7C7568] hover:text-[#14181C] transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RE-TAKE AUDIT</span>
                </button>
              </div>

              {/* Score & Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-[#F2EFE8] border border-[rgba(20,24,28,0.14)]">
                <div className="flex flex-col justify-between">
                  <span className="font-mono text-[10px] text-[#7C7568] tracking-[0.2em] uppercase">
                    ARCHITECTURAL READINESS INDEX
                  </span>
                  <div className="flex items-baseline gap-2 my-2">
                    <span className="font-sans text-[48px] font-bold text-[#14181C]">
                      {normalizedScore}
                    </span>
                    <span className="font-mono text-[18px] text-[#7C7568]">/ 100</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#9E5430] font-semibold">
                    {normalizedScore > 75 ? 'HIGH RESILIENCE POTENTIAL' : 'MODERATE BOTTLENECK RISK'}
                  </span>
                </div>

                <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-[rgba(20,24,28,0.10)] pt-4 md:pt-0 md:pl-6">
                  <span className="font-mono text-[10px] text-[#7C7568] tracking-[0.2em] uppercase">
                    PROJECTED CLOUD SAVINGS
                  </span>
                  <div className="font-sans text-[36px] font-bold text-emerald-700 my-2">
                    ~38% – 55%
                  </div>
                  <span className="font-mono text-[11px] text-[#7C7568]">
                    Via edge caching &amp; DB connection pooling
                  </span>
                </div>

                <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-[rgba(20,24,28,0.10)] pt-4 md:pt-0 md:pl-6">
                  <span className="font-mono text-[10px] text-[#7C7568] tracking-[0.2em] uppercase">
                    RECOMMENDED POD TOPOLOGY
                  </span>
                  <div className="font-sans text-[20px] font-bold text-[#14181C] my-2">
                    1 Lead Architect + 2 Systems Devs
                  </div>
                  <span className="font-mono text-[11px] text-[#7C7568]">
                    2-to-4 week dedicated sprint execution
                  </span>
                </div>
              </div>

              {/* Actionable Engineering Insights */}
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] text-[#9E5430] tracking-[0.2em] uppercase font-semibold">
                  IDENTIFIED HIGH-IMPACT INTERVENTIONS
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedInsights.map((insight, i) => (
                    <div
                      key={i}
                      className="p-4 bg-[#F2EFE8] border border-[rgba(20,24,28,0.10)] flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#9E5430] shrink-0 mt-0.5" />
                      <span className="font-mono text-[12px] text-[#14181C] leading-relaxed">
                        {insight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Booking CTA */}
              <div className="p-6 bg-[#14181C] text-[#F2EFE8] flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="font-mono text-[10px] text-[#C97A4A] tracking-[0.2em] uppercase">
                    // CONFIRM WITH A PRINCIPAL ARCHITECT
                  </div>
                  <h4 className="font-sans text-[20px] font-bold text-[#F2EFE8] mt-1">
                    Book a 20-minute technical roadmap review.
                  </h4>
                  <p className="font-mono text-[11px] text-[#C0B9AA] mt-1">
                    Zero sales fluff. Speak directly with a senior engineer who has reviewed your diagnostic answers.
                  </p>
                </div>

                <button
                  onClick={handleBookWithAudit}
                  className="btn-spark solid text-[11px] py-3.5 px-6 whitespace-nowrap self-start md:self-auto"
                >
                  DISCUSS THIS ROADMAP →
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4">
          <DimensionLine label="DIAGNOSTIC ENGINE // CONFIDENTIAL // ZERO DATA RETENTION" />
        </div>
      </div>
    </section>
  );
};
