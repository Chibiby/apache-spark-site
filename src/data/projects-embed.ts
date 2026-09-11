// path: src/data/projects-embed.ts
import type { Project } from '@/types';

export const PROJECTS_EMBED: Project[] = [
  {
    slug: 'project-litrack',
    title: 'DepEd ARAL Diagnostic Reading & Telemetry Core',
    client: 'Department of Education (Project LiTrack)',
    sector: 'Education',
    discipline: 'Software',
    year: 2025,
    duration: '6 Months',
    featured: true,
    sheetNo: 'SHEET 13',
    summary:
      'Multi-tenant school management and diagnostic platform tracking learner reading foundations, automated remediation cohorts, and division oversight.',
    brief:
      'DepEd schools required a deterministic system to identify and remediate reading deficiencies under the national ARAL program. Traditional paper-based profiling caused multi-week reporting lag and high error rates in assigning learners to appropriate remediation tiers.\n\nApache Spark engineered Project LiTrack to digitize diagnostic scoring across alphabet knowledge, phonological awareness, decoding, oral reading fluency, and comprehension. The platform delivers instant diagnostic categorization and real-time division synchronization.',
    approach:
      'We architected an offline-capable Next.js application backed by Supabase PostgreSQL and Prisma ORM. A responsive rubric evaluation engine calculates reading levels within 18ms. Role-based access controls separate Teacher scoring, School Head oversight, and Division Admin governance with automated data-lock deadlines.',
    outcome:
      'Over 12,000 learners profiled across participating schools with a 58.4% reduction in non-readers after targeted ARAL remediation sessions. Zero data discrepancies recorded during division audit cutovers.',
    stack: ['Next.js 14/15', 'TypeScript Strict', 'Supabase Postgres', 'Prisma 5', 'Tailwind CSS', 'shadcn/ui'],
    services: ['Cloud Architecture', 'Multi-Tenant RBAC', 'Diagnostic Engine', 'Postgres Pipeline'],
    metrics: [
      { label: 'LEARNERS PROFILED', value: '12480', unit: '+' },
      { label: 'CALCULATION LATENCY', value: '18', unit: 'MS' },
      { label: 'NON-READER REDUCTION', value: '58.4', unit: '%' },
      { label: 'TEACHER COMPLIANCE', value: '98.4', unit: '%' },
    ],
    schematic: [
      { step: '01 DIAGNOSTIC INGESTION', detail: 'Teacher records 5 foundational reading skills via interactive rubrics.' },
      { step: '02 REAL-TIME CLASSIFICATION', detail: 'Deterministic algorithm assigns Non-Reader, Frustration, Instructional, or Independent tier.' },
      { step: '03 ARAL COHORT SCHEDULING', detail: 'Automated remediation scheduler groups learners by specific skill deficiencies.' },
      { step: '04 DIVISION GOVERNANCE', detail: 'Division superintendents monitor aggregate progress charts with cryptographic audit trails.' },
    ],
    gallery: [
      { caption: 'Individual BOSY diagnostic evaluation rubric and real-time level calculation.', ratio: '16/9' },
      { caption: 'School Head grade-level reading distribution and cohort progress analytics.', ratio: '16/9' },
      { caption: 'ARAL reading intervention session log and attendance compliance tracking.', ratio: '4/3' },
    ],
    testimonial: {
      quote:
        'Project LiTrack gave our teachers immediate clarity on who needed urgent reading intervention. The platform is responsive, intuitive, and rock-solid.',
      author: 'Dr. Arthur Mendoza',
      role: 'Principal III, Rizal Central Elementary School',
    },
  },
  {
    slug: 'journalism-press-portal',
    title: 'Division Schools Press Conference (DSPC) Scoring & Tabulation',
    client: 'DepEd Sarangani (ASPAJCCJSI)',
    sector: 'Public',
    discipline: 'Software',
    year: 2026,
    duration: '4 Months',
    featured: true,
    sheetNo: 'SHEET 14',
    summary:
      'Real-time competition management system handling 48 schools, 1,420 entries, sealed judge rubrics, and automated sub-second medal tabulation.',
    brief:
      'The annual Division Schools Press Conference convenes hundreds of student journalists across 12 contested individual and group categories. Manual paper scorecards created extreme tabulation delays and contentious score verification procedures during medal award ceremonies.\n\nApache Spark was commissioned to develop the ASPAJCCJSI Press Portal to govern the entire tournament lifecycle—from online entry registration and digital school paper submission to sealed judge scoring and instantaneous championship tabulation.',
    approach:
      'We engineered a tamper-resistant scoring platform with strict automated submission locks tied to official Asia/Manila server time. An interactive multi-criteria rubric calculates weighted scores with double-entry validation. A concurrent tabulation engine aggregates school and district medal tallies in real-time.',
    outcome:
      'Successfully adjudicated 1,420 entries from 48 schools with zero downtime. Tabulation of overall division championship awards completed in under 2 seconds following final judge score seal.',
    stack: ['Next.js 15', 'React 19', 'PostgreSQL', 'Tailwind CSS', 'Sub-second Tally Engine'],
    services: ['Competition Infrastructure', 'Real-Time Tabulation Engine', 'Secure RBAC Portal', 'Automated Lock Auditing'],
    metrics: [
      { label: 'ENTRIES ADJUDICATED', value: '1420', unit: 'ENTRIES' },
      { label: 'PARTICIPATING SCHOOLS', value: '48', unit: 'CAMPUSES' },
      { label: 'TABULATION TIME', value: '1.4', unit: 'SEC' },
      { label: 'JUDGE QUORUM', value: '100.0', unit: '%' },
    ],
    schematic: [
      { step: '01 ENTRY SUBMISSION & LOCK', detail: 'Contestants upload drafts; automated lock enforces 23:59:00 deadline cutoff.' },
      { step: '02 ANONYMIZED JUDGING', detail: 'Judges evaluate anonymized entries across 4 official DepEd rubric criteria.' },
      { step: '03 CRYPTOGRAPHIC SCORE SEAL', detail: 'Scores are locked and verified against judge digital signatures.' },
      { step: '04 LIVE TABULATION', detail: 'Division leaderboard and medal tallies recompute dynamically within 2 seconds.' },
    ],
    gallery: [
      { caption: 'Judge scoring rubric with live points tally and qualitative notation box.', ratio: '16/9' },
      { caption: 'Division Admin command center monitoring submissions and deadline lock states.', ratio: '16/9' },
      { caption: 'Real-time division medal standings and championship point leaderboard.', ratio: '4/3' },
    ],
    testimonial: {
      quote:
        'The press conference ran with unprecedented speed and transparency. Tabulation was instantaneous and dispute-free. An exceptional technical achievement.',
      author: 'Prof. Carlos Mendoza',
      role: 'Chief Tabulator, ASPAJCCJSI DSPC 2026',
    },
  },
];
