// path: src/app/embed/journalism/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  Users,
  School,
  Map,
  Table2,
  Gavel,
  Calculator,
  ShieldCheck,
  Search,
  CheckCircle,
  Clock,
  ArrowRight,
  LogOut,
  Menu,
  Sun,
  Moon,
  Save,
  Award,
  Lock,
  UserRound,
} from 'lucide-react';

/* =========================================================================
   DIRECTION CONTRACT – ASPAJCCJSI PRESS PORTAL (DSPC 2026 Tabulation Engine)
   - Layout & Design faithfully reproduced from C:\Users\PC5\Desktop\Journalism
   - Color Scheme: Fresh Academic Teal (primary: #0d9488 / oklch(0.6 0.118 184.704)),
     warning amber (#f59e0b), slate surfaces, crisp borders.
   - 100% Database Bypass with 1-Click Navigation & Real-time Adjudication Matrix
   ========================================================================= */

type JournalismRole = 'ADMIN' | 'JUDGE' | 'COACH';

type AdminNavPage =
  | 'dashboard'
  | 'entries'
  | 'school-papers'
  | 'participants'
  | 'coaches'
  | 'schools'
  | 'districts'
  | 'events'
  | 'judges'
  | 'tabulators'
  | 'summary'
  | 'activity'
  | 'users';

interface EntryRow {
  code: string;
  category: string;
  medium: 'English' | 'Filipino';
  level: 'Elementary' | 'Secondary';
  school: string;
  district: string;
  status: 'Verified' | 'Pending Adjudication' | 'Scored';
  score?: number;
  rank?: number;
}

const INITIAL_ENTRIES: EntryRow[] = [
  {
    code: 'NWS-SEC-ENG-001',
    category: 'News Writing',
    medium: 'English',
    level: 'Secondary',
    school: 'Glan Central Integrated School',
    district: 'Glan 1',
    status: 'Scored',
    score: 94.5,
    rank: 1,
  },
  {
    code: 'NWS-SEC-ENG-002',
    category: 'News Writing',
    medium: 'English',
    level: 'Secondary',
    school: 'Alabel National High School',
    district: 'Alabel',
    status: 'Scored',
    score: 92.0,
    rank: 2,
  },
  {
    code: 'NWS-SEC-ENG-003',
    category: 'News Writing',
    medium: 'English',
    level: 'Secondary',
    school: 'Malungon National High School',
    district: 'Malungon',
    status: 'Scored',
    score: 89.5,
    rank: 3,
  },
  {
    code: 'EDT-SEC-FIL-001',
    category: 'Editorial Writing',
    medium: 'Filipino',
    level: 'Secondary',
    school: 'Maitum National High School',
    district: 'Maitum',
    status: 'Scored',
    score: 95.0,
    rank: 1,
  },
  {
    code: 'PHT-ELEM-ENG-001',
    category: 'Photojournalism',
    medium: 'English',
    level: 'Elementary',
    school: 'Kiamba Central Elementary',
    district: 'Kiamba',
    status: 'Pending Adjudication',
  },
  {
    code: 'RAD-SEC-ENG-001',
    category: 'Radio Broadcasting',
    medium: 'English',
    level: 'Secondary',
    school: 'Glan Central Integrated School',
    district: 'Glan 1',
    status: 'Verified',
  },
  {
    code: 'CRN-SEC-FIL-001',
    category: 'Editorial Cartooning',
    medium: 'Filipino',
    level: 'Secondary',
    school: 'Malapatan National High School',
    district: 'Malapatan',
    status: 'Scored',
    score: 91.0,
    rank: 1,
  },
  {
    code: 'COL-ELEM-ENG-001',
    category: 'Collaborative Desktop Publishing',
    medium: 'English',
    level: 'Elementary',
    school: 'Alabel Central Elementary',
    district: 'Alabel',
    status: 'Verified',
  },
];

const PER_SCHOOL_ROWS = [
  { schoolName: 'Glan Central Integrated School', districtName: 'Glan 1', learners: 48, coaches: 8, entries: 56 },
  { schoolName: 'Alabel National High School', districtName: 'Alabel', learners: 44, coaches: 7, entries: 52 },
  { schoolName: 'Malungon National High School', districtName: 'Malungon', learners: 42, coaches: 6, entries: 48 },
  { schoolName: 'Maitum National High School', districtName: 'Maitum', learners: 38, coaches: 6, entries: 44 },
  { schoolName: 'Kiamba Central Elementary', districtName: 'Kiamba', learners: 36, coaches: 5, entries: 40 },
  { schoolName: 'Malapatan National High School', districtName: 'Malapatan', learners: 34, coaches: 5, entries: 38 },
];

export default function JournalismEmbedPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<JournalismRole>('ADMIN');
  const [activeNav, setActiveNav] = useState<AdminNavPage>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Login form state
  const [districtSelection, setDistrictSelection] = useState('ALL');
  const [schoolSelection, setSchoolSelection] = useState('Glan Central Integrated School');
  const [loginPassword, setLoginPassword] = useState('101294');

  // Adjudication state
  const [entries, setEntries] = useState<EntryRow[]>(INITIAL_ENTRIES);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [filterMedium, setFilterMedium] = useState<string>('ALL');
  const [searchEntryQuery, setSearchEntryQuery] = useState('');
  const [saveSuccessToast, setSaveSuccessToast] = useState(false);

  // Judge scoring state
  const [judgeScoreContent, setJudgeScoreContent] = useState<number>(38);
  const [judgeScoreMechanics, setJudgeScoreMechanics] = useState<number>(27);
  const [judgeScoreStyle, setJudgeScoreStyle] = useState<number>(18);
  const [judgeScoreEthics, setJudgeScoreEthics] = useState<number>(9.5);
  const [selectedEntryCode, setSelectedEntryCode] = useState('NWS-SEC-ENG-001');
  const [isResultsLocked, setIsResultsLocked] = useState<boolean>(false);

  // Computed judge total score
  const computedJudgeTotal = useMemo(() => {
    return judgeScoreContent + judgeScoreMechanics + judgeScoreStyle + judgeScoreEthics;
  }, [judgeScoreContent, judgeScoreMechanics, judgeScoreStyle, judgeScoreEthics]);

  // 1-Click quick login bypass
  const handleQuickLogin = (targetRole: JournalismRole, targetPage: AdminNavPage) => {
    setUserRole(targetRole);
    setActiveNav(targetPage);
    setIsAuthenticated(true);
  };

  const handleSaveJudgeScore = () => {
    setEntries((prev) =>
      prev.map((e) =>
        e.code === selectedEntryCode
          ? {
              ...e,
              status: 'Scored',
              score: computedJudgeTotal,
            }
          : e
      )
    );
    setSaveSuccessToast(true);
    setTimeout(() => setSaveSuccessToast(false), 2500);
  };

  const filteredEntries = useMemo(() => {
    return entries.filter((item) => {
      const matchesSearch =
        item.code.toLowerCase().includes(searchEntryQuery.toLowerCase()) ||
        item.school.toLowerCase().includes(searchEntryQuery.toLowerCase());
      const matchesCat = filterCategory === 'ALL' || item.category === filterCategory;
      const matchesMed = filterMedium === 'ALL' || item.medium === filterMedium;
      return matchesSearch && matchesCat && matchesMed;
    });
  }, [entries, searchEntryQuery, filterCategory, filterMedium]);

  /* =========================================================================
     RENDER: 1. PRE-AUTH LOGIN PAGE (Legit Layout of Journalism app/login)
     ========================================================================= */
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex flex-col font-sans transition-colors ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
        {/* Quick Database Bypass Banner */}
        <div className="bg-teal-700 text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-950 font-bold px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider">
              1-Click Database Bypass Active
            </span>
            <span>Bypass database requirements and navigate directly to the competition modules:</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <button
              onClick={() => handleQuickLogin('ADMIN', 'dashboard')}
              className="bg-white/20 hover:bg-white/30 text-white px-2.5 py-1 rounded transition-colors text-xs flex items-center gap-1"
            >
              <ShieldCheck className="size-3" /> 1-Click Division Admin
            </button>
            <button
              onClick={() => handleQuickLogin('JUDGE', 'judges')}
              className="bg-white/20 hover:bg-white/30 text-white px-2.5 py-1 rounded transition-colors text-xs flex items-center gap-1"
            >
              <Gavel className="size-3" /> 1-Click Judge Portal
            </button>
            <button
              onClick={() => handleQuickLogin('COACH', 'entries')}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-2.5 py-1 rounded transition-colors text-xs flex items-center gap-1 font-bold"
            >
              <FileText className="size-3" /> 1-Click School Entries
            </button>
          </div>
        </div>

        {/* Top bar theme toggle */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 text-xs flex items-center gap-1.5"
          >
            {isDarkMode ? <Sun className="size-4 text-amber-400" /> : <Moon className="size-4 text-slate-700" />}
            <span>{isDarkMode ? 'Light' : 'Dark'}</span>
          </button>
        </div>

        {/* Center Container: AuthShell & Wordmark */}
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 space-y-6">
            {/* Wordmark Header matching Journalism components/brand/wordmark.tsx */}
            <div className="text-center space-y-2 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Image
                  src="/embed/journalism/aspajccjsi-mark.png"
                  alt="DSPC Logo Mark"
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </div>
              <p className="text-xs font-bold tracking-wider text-teal-700 dark:text-teal-400 uppercase">
                Department of Education · Division of Sarangani
              </p>
              <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Schools Press Conference 2026
              </h1>
              <p className="text-xs text-slate-500">
                ASPAJCCJSI Competition Management & Live Tabulation Engine
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  District Division
                </label>
                <select
                  value={districtSelection}
                  onChange={(e) => setDistrictSelection(e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="ALL">All Districts (Division Wide)</option>
                  <option value="Glan 1">Glan 1 District</option>
                  <option value="Glan 2">Glan 2 District</option>
                  <option value="Alabel">Alabel District</option>
                  <option value="Malungon">Malungon District</option>
                  <option value="Kiamba">Kiamba District</option>
                  <option value="Maitum">Maitum District</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Participating School
                </label>
                <select
                  value={schoolSelection}
                  onChange={(e) => setSchoolSelection(e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option>Glan Central Integrated School</option>
                  <option>Alabel National High School</option>
                  <option>Malungon National High School</option>
                  <option>Maitum National High School</option>
                  <option>Kiamba Central Elementary</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  School ID Number / Access Key
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                onClick={() => handleQuickLogin('ADMIN', 'dashboard')}
                className="w-full py-2.5 px-4 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>1-Click Sign In</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>

            {/* Official Partner Badges */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-4 opacity-75">
              <div className="size-8 relative">
                <Image src="/embed/journalism/logo-deped-matatag.png" alt="MATATAG" width={32} height={32} className="object-contain" />
              </div>
              <div className="size-8 relative">
                <Image src="/embed/journalism/logo-deped-sarangani.png" alt="Sarangani" width={32} height={32} className="object-contain" />
              </div>
              <div className="size-8 relative">
                <Image src="/embed/journalism/logo-bagong-pilipinas.png" alt="Bagong Pilipinas" width={32} height={32} className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     RENDER: 2. AUTHENTICATED ADMIN SHELL (Layout of Journalism app/admin/(shell))
     ========================================================================= */
  return (
    <div className={`min-h-screen flex font-sans ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Toast */}
      {saveSuccessToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-teal-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle className="size-4" />
          <span>Official judge scorecard saved and tabulated!</span>
        </div>
      )}

      {/* =====================================================================
          SIDEBAR: Matching C:\Users\PC5\Desktop\Journalism\components\admin\shell\Sidebar.tsx
          ===================================================================== */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex flex-col border-r transition-all duration-200 ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        } ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
      >
        {/* Brand Lockup */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 min-w-0">
            <div className="size-9 relative shrink-0">
              <Image
                src="/embed/journalism/aspajccjsi-mark.png"
                alt="DSPC Mark"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            {!isSidebarCollapsed && (
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-black tracking-tight text-slate-900 dark:text-white uppercase">
                    PRESS LINK
                  </p>
                  <span className="text-[9px] bg-teal-100 text-teal-800 dark:bg-teal-950/80 dark:text-teal-300 font-bold px-1.5 py-0.2 rounded">
                    DSPC 2026
                  </span>
                </div>
                <p className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold truncate">
                  Tabulation Shell
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Menu className="size-4" />
          </button>
        </div>

        {/* Navigation Group Items: Exact ADMIN_NAV from lib/admin/nav.ts */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 text-xs">
          {/* Group 1: Overview */}
          <div className="space-y-1">
            {!isSidebarCollapsed && (
              <p className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Overview
              </p>
            )}
            <button
              onClick={() => setActiveNav('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition-colors ${
                activeNav === 'dashboard'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="size-4 shrink-0" />
              {!isSidebarCollapsed && <span>Dashboard</span>}
            </button>
          </div>

          {/* Group 2: Submissions */}
          <div className="space-y-1">
            {!isSidebarCollapsed && (
              <p className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Submissions
              </p>
            )}
            <button
              onClick={() => setActiveNav('entries')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition-colors ${
                activeNav === 'entries'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <FileText className="size-4 shrink-0" />
              {!isSidebarCollapsed && (
                <div className="flex-1 flex items-center justify-between">
                  <span>Entries</span>
                  <span className="bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                    1,248
                  </span>
                </div>
              )}
            </button>

            <button
              onClick={() => setActiveNav('school-papers')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition-colors ${
                activeNav === 'school-papers'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <Newspaper className="size-4 shrink-0" />
              {!isSidebarCollapsed && <span>School Papers</span>}
            </button>
          </div>

          {/* Group 3: Adjudication */}
          <div className="space-y-1">
            {!isSidebarCollapsed && (
              <p className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Adjudication
              </p>
            )}
            <button
              onClick={() => setActiveNav('judges')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition-colors ${
                activeNav === 'judges'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <Gavel className="size-4 shrink-0" />
              {!isSidebarCollapsed && <span>Judges Portal</span>}
            </button>

            <button
              onClick={() => setActiveNav('tabulators')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition-colors ${
                activeNav === 'tabulators'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <Calculator className="size-4 shrink-0" />
              {!isSidebarCollapsed && (
                <div className="flex-1 flex items-center justify-between">
                  <span>Tabulators</span>
                  <span className="bg-amber-400 text-slate-950 font-bold text-[10px] px-1.5 py-0.2 rounded-full">
                    4
                  </span>
                </div>
              )}
            </button>

            <button
              onClick={() => setActiveNav('summary')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition-colors ${
                activeNav === 'summary'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <Table2 className="size-4 shrink-0" />
              {!isSidebarCollapsed && <span>Medal Tally</span>}
            </button>
          </div>

          {/* Group 4: Overall Data */}
          <div className="space-y-1">
            {!isSidebarCollapsed && (
              <p className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Overall Data
              </p>
            )}
            <button
              onClick={() => setActiveNav('schools')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition-colors ${
                activeNav === 'schools'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <School className="size-4 shrink-0" />
              {!isSidebarCollapsed && <span>Schools (42)</span>}
            </button>

            <button
              onClick={() => setActiveNav('districts')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition-colors ${
                activeNav === 'districts'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <Map className="size-4 shrink-0" />
              {!isSidebarCollapsed && <span>Districts (8)</span>}
            </button>
          </div>
        </div>

        {/* Sidebar Footer User Chip */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
              AD
            </div>
            {!isSidebarCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate leading-none">
                  Division Admin User
                </p>
                <p className="text-[10px] text-teal-600 font-semibold mt-0.5">
                  Super Admin
                </p>
              </div>
            )}
            <button
              onClick={() => setIsAuthenticated(false)}
              className="p-1.5 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
              title="Sign Out"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* =====================================================================
          MAIN APP CONTENT GROUND
          ===================================================================== */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        {/* Topbar: Matching components/admin/shell/Topbar.tsx */}
        <header className="h-16 sticky top-0 z-20 px-6 border-b flex items-center justify-between gap-4 backdrop-blur bg-white/95 dark:bg-slate-900/95 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 text-xs">
            <span className="font-bold text-slate-900 dark:text-white">DSPC 2026</span>
            <span className="text-slate-400">/</span>
            <span className="text-slate-600 dark:text-slate-300 font-medium capitalize">
              {activeNav.replace('-', ' ')}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 px-2 py-0.5 rounded-full text-[10px] font-bold ml-2">
              <Clock className="size-3" /> Live Manila Time: 03:25 PM PHT
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* 1-Click Role Switcher */}
            <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-semibold">
              <span className="px-2 text-[10px] uppercase text-slate-400 font-bold">1-Click Role:</span>
              <button
                onClick={() => handleQuickLogin('ADMIN', 'dashboard')}
                className={`px-2 py-1 rounded transition-colors ${
                  userRole === 'ADMIN' ? 'bg-teal-600 text-white' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                Division Admin
              </button>
              <button
                onClick={() => handleQuickLogin('JUDGE', 'judges')}
                className={`px-2 py-1 rounded transition-colors ${
                  userRole === 'JUDGE' ? 'bg-teal-600 text-white' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                Judge Portal
              </button>
              <button
                onClick={() => handleQuickLogin('COACH', 'entries')}
                className={`px-2 py-1 rounded transition-colors ${
                  userRole === 'COACH' ? 'bg-teal-600 text-white' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                School Coach
              </button>
            </div>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDarkMode ? <Sun className="size-4 text-amber-400" /> : <Moon className="size-4" />}
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 space-y-6">
          {/* VIEW: DASHBOARD (Matching app/admin/(shell)/page.tsx) */}
          {activeNav === 'dashboard' && (
            <div className="space-y-6">
              {/* PageHeading: Title, Badge, Subtitle, and Top Action Buttons */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                      Schools Press Conference 2026
                    </h1>
                    <span className="bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      Registration Closed · Live Adjudication
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Welcome back, Division Admin. Division-wide figures as of March 10, 2026 (Asia/Manila).
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setActiveNav('judges')}
                    className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
                  >
                    <Gavel className="size-3.5" /> 1-Click Judges Portal
                  </button>
                  <button
                    onClick={() => setActiveNav('tabulators')}
                    className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
                  >
                    <Calculator className="size-3.5" /> 1-Click Tabulators Portal
                  </button>
                  <button
                    onClick={() => setActiveNav('entries')}
                    className="border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                  >
                    Export entries
                  </button>
                </div>
              </div>

              {/* 6 KPI TILES (Matching components/dashboard/KpiTile.tsx) */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Schools</p>
                      <p className="text-2xl font-black mt-1 text-slate-900 dark:text-white">42</p>
                    </div>
                    <span className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600">
                      <School className="size-4" />
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2">100% active participating schools</p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Learners</p>
                      <p className="text-2xl font-black mt-1 text-slate-900 dark:text-white">864</p>
                    </div>
                    <span className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600">
                      <Users className="size-4" />
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2">Individual contestants in roster</p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Coaches</p>
                      <p className="text-2xl font-black mt-1 text-slate-900 dark:text-white">126</p>
                    </div>
                    <span className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600">
                      <UserRound className="size-4" />
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2">School publication advisers</p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Entries</p>
                      <p className="text-2xl font-black mt-1 text-teal-600">1,248</p>
                    </div>
                    <span className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600">
                      <FileText className="size-4" />
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2">+12% vs previous division meet</p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Contest Events</p>
                      <p className="text-2xl font-black mt-1 text-slate-900 dark:text-white">18</p>
                    </div>
                    <span className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600">
                      <Award className="size-4" />
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2">9 Individual & 4 Group categories</p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Districts</p>
                      <p className="text-2xl font-black mt-1 text-slate-900 dark:text-white">8</p>
                    </div>
                    <span className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600">
                      <Map className="size-4" />
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2">Sarangani municipalities total</p>
                </div>
              </div>

              {/* Panel Grid: PerSchoolTable & ActivityFeed */}
              <div className="grid gap-6 lg:grid-cols-3">
                {/* PerSchoolTable Panel (Col span 2) */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-slate-900 dark:text-white">Registration by school</h2>
                      <p className="text-xs text-slate-500">Learners, coaches and entries per school, the busiest first.</p>
                    </div>
                    <button
                      onClick={() => setActiveNav('schools')}
                      className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
                    >
                      View all 42 schools &rarr;
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase font-bold">
                        <tr>
                          <th className="py-2.5 px-3">School Name</th>
                          <th className="py-2.5 px-3">District</th>
                          <th className="py-2.5 px-3 text-right">Learners</th>
                          <th className="py-2.5 px-3 text-right">Coaches</th>
                          <th className="py-2.5 px-3 text-right">Entries</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {PER_SCHOOL_ROWS.map((row) => (
                          <tr key={row.schoolName} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                            <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">{row.schoolName}</td>
                            <td className="py-2.5 px-3 text-slate-500">{row.districtName}</td>
                            <td className="py-2.5 px-3 text-right tabular-nums">{row.learners}</td>
                            <td className="py-2.5 px-3 text-right tabular-nums">{row.coaches}</td>
                            <td className="py-2.5 px-3 text-right font-bold text-teal-600 tabular-nums">{row.entries}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="border-t-2 border-slate-200 dark:border-slate-800 font-bold">
                        <tr>
                          <td className="py-2.5 px-3 text-slate-900 dark:text-white">Division total</td>
                          <td className="py-2.5 px-3 text-slate-500">42 of 42 schools</td>
                          <td className="py-2.5 px-3 text-right tabular-nums">864</td>
                          <td className="py-2.5 px-3 text-right tabular-nums">126</td>
                          <td className="py-2.5 px-3 text-right tabular-nums text-teal-600">1,248</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* ActivityFeed Panel (Col span 1) */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-slate-900 dark:text-white">Live Activity Feed</h2>
                      <p className="text-xs text-slate-500">Adjudication & scoring trail</p>
                    </div>
                    <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-teal-600">Judge Sheet Submitted</span>
                        <span className="text-[10px] text-slate-400">2 mins ago</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">
                        Judge Santos certified scores for News Writing Secondary (English).
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-600">Tabulator Certification</span>
                        <span className="text-[10px] text-slate-400">8 mins ago</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">
                        Rank Sum verified for Photojournalism Elementary.
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-blue-600">School Paper Upload</span>
                        <span className="text-[10px] text-slate-400">18 mins ago</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">
                        The Spark (Glan Central IS) publication PDF verified by Division Admin.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: JUDGES PORTAL */}
          {activeNav === 'judges' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                      Division Board of Judges · Official Scoring Rubric
                    </span>
                    <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                      Adjudication Sheet: News Writing Secondary (English)
                    </h1>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      <span>Select Entry:</span>
                      <select
                        value={selectedEntryCode}
                        onChange={(e) => setSelectedEntryCode(e.target.value)}
                        className="font-mono font-bold text-teal-600 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded px-2 py-0.5"
                      >
                        <option value="NWS-SEC-ENG-001">NWS-SEC-ENG-001 (Glan Central IS)</option>
                        <option value="NWS-SEC-ENG-002">NWS-SEC-ENG-002 (Alabel NHS)</option>
                        <option value="NWS-SEC-ENG-003">NWS-SEC-ENG-003 (Malungon NHS)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Live Composite Score</p>
                      <p className="text-2xl font-black text-teal-600 tabular-nums">
                        {computedJudgeTotal.toFixed(1)} <span className="text-xs font-semibold text-slate-400">/ 100</span>
                      </p>
                    </div>

                    <button
                      onClick={handleSaveJudgeScore}
                      className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2.5 rounded-lg text-xs flex items-center gap-2 shadow-sm transition-colors"
                    >
                      <Save className="size-3.5" /> 1-Click Submit Scorecard
                    </button>
                  </div>
                </div>

                {/* 4-Part Adjudication Rubric Sliders */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-800 dark:text-slate-200">1. Content & Factual Accuracy</span>
                      <span className="text-teal-600 tabular-nums">{judgeScoreContent} / 40</span>
                    </div>
                    <p className="text-[11px] text-slate-500">Lead quality, 5 Ws and 1 H, inverted pyramid structure, depth of reporting</p>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      step="0.5"
                      value={judgeScoreContent}
                      onChange={(e) => setJudgeScoreContent(parseFloat(e.target.value))}
                      className="w-full accent-teal-600 cursor-pointer"
                    />
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-800 dark:text-slate-200">2. Technical Rules & Mechanics</span>
                      <span className="text-teal-600 tabular-nums">{judgeScoreMechanics} / 30</span>
                    </div>
                    <p className="text-[11px] text-slate-500">Grammar, syntax, AP/DepEd stylebook compliance, attribution, spelling</p>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      step="0.5"
                      value={judgeScoreMechanics}
                      onChange={(e) => setJudgeScoreMechanics(parseFloat(e.target.value))}
                      className="w-full accent-teal-600 cursor-pointer"
                    />
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-800 dark:text-slate-200">3. Writing Style & Organization</span>
                      <span className="text-teal-600 tabular-nums">{judgeScoreStyle} / 20</span>
                    </div>
                    <p className="text-[11px] text-slate-500">Transitions, conciseness, active voice, flow, objective news tone</p>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      step="0.5"
                      value={judgeScoreStyle}
                      onChange={(e) => setJudgeScoreStyle(parseFloat(e.target.value))}
                      className="w-full accent-teal-600 cursor-pointer"
                    />
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-800 dark:text-slate-200">4. Ethical Journalism & Fairness</span>
                      <span className="text-teal-600 tabular-nums">{judgeScoreEthics} / 10</span>
                    </div>
                    <p className="text-[11px] text-slate-500">Balance, avoidance of libel/editorializing in straight news, accuracy of quotes</p>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.5"
                      value={judgeScoreEthics}
                      onChange={(e) => setJudgeScoreEthics(parseFloat(e.target.value))}
                      className="w-full accent-teal-600 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: TABULATORS PORTAL */}
          {activeNav === 'tabulators' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                      Official Division Tabulation Committee
                    </span>
                    <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                      Rank-Sum Computation & Official Placement Certification
                    </h1>
                    <p className="text-xs text-slate-500">
                      Event: News Writing Secondary (English) · 3 Certified Judges · Low Rank Sum Method
                    </p>
                  </div>

                  <button
                    onClick={() => setIsResultsLocked(!isResultsLocked)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      isResultsLocked
                        ? 'bg-red-600 text-white'
                        : 'bg-teal-600 text-white hover:bg-teal-700'
                    }`}
                  >
                    <Lock className="size-3.5" />
                    <span>{isResultsLocked ? 'Results Locked (Official)' : '1-Click Lock Event Results'}</span>
                  </button>
                </div>

                {/* Rank Sum Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase font-bold">
                      <tr>
                        <th className="py-3 px-3">Entry Code</th>
                        <th className="py-3 px-3">School Name</th>
                        <th className="py-3 px-3 text-center">Judge 1</th>
                        <th className="py-3 px-3 text-center">Judge 2</th>
                        <th className="py-3 px-3 text-center">Judge 3</th>
                        <th className="py-3 px-3 text-center">Rank Sum</th>
                        <th className="py-3 px-3 text-right">Placement</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      <tr className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                        <td className="py-3 px-3 font-mono font-bold text-teal-600">NWS-SEC-ENG-001</td>
                        <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">Glan Central Integrated School</td>
                        <td className="py-3 px-3 text-center">Rank 1 (94.5)</td>
                        <td className="py-3 px-3 text-center">Rank 1 (96.0)</td>
                        <td className="py-3 px-3 text-center">Rank 2 (93.0)</td>
                        <td className="py-3 px-3 text-center font-bold text-slate-900 dark:text-white">4</td>
                        <td className="py-3 px-3 text-right">
                          <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full text-[10px]">
                            1st Place (Gold Medal)
                          </span>
                        </td>
                      </tr>

                      <tr className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                        <td className="py-3 px-3 font-mono font-bold text-teal-600">NWS-SEC-ENG-002</td>
                        <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">Alabel National High School</td>
                        <td className="py-3 px-3 text-center">Rank 2 (92.0)</td>
                        <td className="py-3 px-3 text-center">Rank 3 (91.5)</td>
                        <td className="py-3 px-3 text-center">Rank 1 (95.0)</td>
                        <td className="py-3 px-3 text-center font-bold text-slate-900 dark:text-white">6</td>
                        <td className="py-3 px-3 text-right">
                          <span className="bg-slate-200 text-slate-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                            2nd Place (Silver Medal)
                          </span>
                        </td>
                      </tr>

                      <tr className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                        <td className="py-3 px-3 font-mono font-bold text-teal-600">NWS-SEC-ENG-003</td>
                        <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">Malungon National High School</td>
                        <td className="py-3 px-3 text-center">Rank 3 (89.5)</td>
                        <td className="py-3 px-3 text-center">Rank 2 (93.0)</td>
                        <td className="py-3 px-3 text-center">Rank 3 (90.0)</td>
                        <td className="py-3 px-3 text-center font-bold text-slate-900 dark:text-white">8</td>
                        <td className="py-3 px-3 text-right">
                          <span className="bg-amber-800/20 text-amber-900 dark:text-amber-300 font-bold px-2 py-0.5 rounded-full text-[10px]">
                            3rd Place (Bronze Medal)
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: SUBMISSION ENTRIES LIST */}
          {activeNav === 'entries' && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h1 className="text-base font-bold text-slate-900 dark:text-white">Division Entries Directory</h1>
                  <p className="text-xs text-slate-500">1,248 Verified Submissions across 18 events</p>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <div className="relative">
                    <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search code or school..."
                      value={searchEntryQuery}
                      onChange={(e) => setSearchEntryQuery(e.target.value)}
                      className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 w-44"
                    />
                  </div>

                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-2 py-1.5"
                  >
                    <option value="ALL">All Categories</option>
                    <option value="News Writing">News Writing</option>
                    <option value="Editorial Writing">Editorial Writing</option>
                    <option value="Photojournalism">Photojournalism</option>
                    <option value="Radio Broadcasting">Radio Broadcasting</option>
                  </select>

                  <select
                    value={filterMedium}
                    onChange={(e) => setFilterMedium(e.target.value)}
                    className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-2 py-1.5"
                  >
                    <option value="ALL">All Mediums</option>
                    <option value="English">English</option>
                    <option value="Filipino">Filipino</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase font-bold">
                    <tr>
                      <th className="py-2.5 px-3">Entry Code</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">Medium</th>
                      <th className="py-2.5 px-3">Level</th>
                      <th className="py-2.5 px-3">School Name</th>
                      <th className="py-2.5 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredEntries.map((e) => (
                      <tr key={e.code} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                        <td className="py-2.5 px-3 font-mono font-bold text-teal-600">{e.code}</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">{e.category}</td>
                        <td className="py-2.5 px-3 text-slate-500">{e.medium}</td>
                        <td className="py-2.5 px-3 text-slate-500">{e.level}</td>
                        <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200">{e.school}</td>
                        <td className="py-2.5 px-3 text-right">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              e.status === 'Scored'
                                ? 'bg-emerald-100 text-emerald-800'
                                : e.status === 'Pending Adjudication'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {e.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW: MEDAL SUMMARY & RESULTS */}
          {activeNav === 'summary' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h1 className="text-base font-bold text-slate-900 dark:text-white">Overall Division Medal Standing</h1>
                    <p className="text-xs text-slate-500">Cumulative points calculation across all 18 categories</p>
                  </div>
                  <span className="bg-teal-100 text-teal-800 font-bold px-2.5 py-1 rounded-full text-xs">
                    Division Meet 2026
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase font-bold">
                      <tr>
                        <th className="py-2.5 px-3">Rank</th>
                        <th className="py-2.5 px-3">School Name</th>
                        <th className="py-2.5 px-3">District</th>
                        <th className="py-2.5 px-3 text-center">Gold (7 pts)</th>
                        <th className="py-2.5 px-3 text-center">Silver (5 pts)</th>
                        <th className="py-2.5 px-3 text-center">Bronze (3 pts)</th>
                        <th className="py-2.5 px-3 text-right">Total Points</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      <tr className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                        <td className="py-2.5 px-3 font-bold text-amber-500 text-sm">#1</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">Glan Central Integrated School</td>
                        <td className="py-2.5 px-3 text-slate-500">Glan 1</td>
                        <td className="py-2.5 px-3 text-center font-bold text-amber-600">5</td>
                        <td className="py-2.5 px-3 text-center font-bold text-slate-500">3</td>
                        <td className="py-2.5 px-3 text-center font-bold text-amber-800">2</td>
                        <td className="py-2.5 px-3 text-right font-black text-teal-600 text-sm">56</td>
                      </tr>

                      <tr className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                        <td className="py-2.5 px-3 font-bold text-slate-400 text-sm">#2</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">Alabel National High School</td>
                        <td className="py-2.5 px-3 text-slate-500">Alabel</td>
                        <td className="py-2.5 px-3 text-center font-bold text-amber-600">4</td>
                        <td className="py-2.5 px-3 text-center font-bold text-slate-500">4</td>
                        <td className="py-2.5 px-3 text-center font-bold text-amber-800">1</td>
                        <td className="py-2.5 px-3 text-right font-black text-teal-600 text-sm">51</td>
                      </tr>

                      <tr className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                        <td className="py-2.5 px-3 font-bold text-amber-700 text-sm">#3</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">Malungon National High School</td>
                        <td className="py-2.5 px-3 text-slate-500">Malungon</td>
                        <td className="py-2.5 px-3 text-center font-bold text-amber-600">3</td>
                        <td className="py-2.5 px-3 text-center font-bold text-slate-500">3</td>
                        <td className="py-2.5 px-3 text-center font-bold text-amber-800">4</td>
                        <td className="py-2.5 px-3 text-right font-black text-teal-600 text-sm">48</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
