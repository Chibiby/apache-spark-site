// path: src/app/embed/litrack/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  FileBarChart,
  School,
  Users,
  ScrollText,
  GraduationCap,
  UserRoundCheck,
  CheckCircle2,
  Search,
  Bell,
  Menu,
  LogOut,
  Save,
  ArrowRight,
  User,
  ShieldCheck,
  Info,
  Sun,
  Moon,
  CheckCircle,
} from 'lucide-react';

/* =========================================================================
   DIRECTION CONTRACT – PROJECT LITRACK AUTHENTIC EMBED (DepEd ARAL Telemetry)
   - Layout & Design faithfully reproduced from C:\Users\PC5\Desktop\project-litrack
   - Color Scheme: #eef3fa blue-gray ground, white surface panels, DepEd blue (#2563eb),
     ARAL violet (#6D4AE0), warm amber (#f5a623), emerald (#10b981).
   - 100% Database Bypass with 1-Click Navigation & Real-time Role Matrix
   ========================================================================= */

type Role = 'TEACHER' | 'SCHOOL_HEAD' | 'SUPER_ADMIN';

type ActivePage =
  | 'teacher-dashboard'
  | 'teacher-learners'
  | 'teacher-aral'
  | 'teacher-reports'
  | 'teacher-settings'
  | 'head-dashboard'
  | 'head-teachers'
  | 'head-school-info'
  | 'head-aral'
  | 'head-reports'
  | 'head-audit'
  | 'admin-dashboard'
  | 'admin-schools'
  | 'admin-audit'
  | 'admin-database';

interface LearnerRecord {
  lrn: string;
  name: string;
  gender: 'M' | 'F';
  grade: string;
  section: string;
  readingLevel: 'Non-Reader' | 'Frustration' | 'Instructional' | 'Independent';
  aralStatus: 'Enrolled' | 'Graduated' | 'Not Needed';
  scores: {
    alphabet: number;
    phonology: number;
    decoding: number;
    fluency: number;
    comprehension: number;
  };
}

const INITIAL_LEARNERS: LearnerRecord[] = [
  {
    lrn: '101294200001',
    name: 'Alcantara, Kyle J.',
    gender: 'M',
    grade: 'Grade 3',
    section: 'Mabini',
    readingLevel: 'Non-Reader',
    aralStatus: 'Enrolled',
    scores: { alphabet: 8, phonology: 7, decoding: 6, fluency: 12, comprehension: 4 },
  },
  {
    lrn: '101294200002',
    name: 'Bautista, Angelo R.',
    gender: 'M',
    grade: 'Grade 3',
    section: 'Mabini',
    readingLevel: 'Frustration',
    aralStatus: 'Enrolled',
    scores: { alphabet: 13, phonology: 11, decoding: 10, fluency: 22, comprehension: 10 },
  },
  {
    lrn: '101294200003',
    name: 'Cruz, Juan dela M.',
    gender: 'M',
    grade: 'Grade 3',
    section: 'Mabini',
    readingLevel: 'Instructional',
    aralStatus: 'Not Needed',
    scores: { alphabet: 15, phonology: 14, decoding: 18, fluency: 48, comprehension: 18 },
  },
  {
    lrn: '101294200004',
    name: 'Del Rosario, Nicole A.',
    gender: 'F',
    grade: 'Grade 3',
    section: 'Mabini',
    readingLevel: 'Independent',
    aralStatus: 'Not Needed',
    scores: { alphabet: 15, phonology: 15, decoding: 20, fluency: 72, comprehension: 23 },
  },
  {
    lrn: '101294200005',
    name: 'Estrada, Bea Patricia C.',
    gender: 'F',
    grade: 'Grade 3',
    section: 'Mabini',
    readingLevel: 'Frustration',
    aralStatus: 'Enrolled',
    scores: { alphabet: 12, phonology: 10, decoding: 9, fluency: 19, comprehension: 8 },
  },
  {
    lrn: '101294200006',
    name: 'Flores, Christian K.',
    gender: 'M',
    grade: 'Grade 3',
    section: 'Mabini',
    readingLevel: 'Instructional',
    aralStatus: 'Not Needed',
    scores: { alphabet: 15, phonology: 14, decoding: 16, fluency: 44, comprehension: 17 },
  },
  {
    lrn: '101294200007',
    name: 'Gonzales, Danielle Marie',
    gender: 'F',
    grade: 'Grade 3',
    section: 'Mabini',
    readingLevel: 'Independent',
    aralStatus: 'Not Needed',
    scores: { alphabet: 15, phonology: 15, decoding: 20, fluency: 80, comprehension: 24 },
  },
  {
    lrn: '101294200008',
    name: 'Hernandez, Ethan James',
    gender: 'M',
    grade: 'Grade 3',
    section: 'Mabini',
    readingLevel: 'Non-Reader',
    aralStatus: 'Enrolled',
    scores: { alphabet: 6, phonology: 5, decoding: 4, fluency: 8, comprehension: 2 },
  },
];

const TEACHERS_LIST = [
  { id: 't-1', name: 'Maria Elena Santos, LPT', grade: 'Grade 3 - Mabini', status: 'Submitted', learners: 36, aralCount: 8 },
  { id: 't-2', name: 'Ronaldo D. Aquino, LPT', grade: 'Grade 4 - Rizal', status: 'Submitted', learners: 40, aralCount: 6 },
  { id: 't-3', name: 'Grace Villaruel, LPT', grade: 'Grade 5 - Bonifacio', status: 'In Progress', learners: 38, aralCount: 10 },
  { id: 't-4', name: 'Arthur Pendelton, LPT', grade: 'Grade 6 - Luna', status: 'Submitted', learners: 42, aralCount: 4 },
  { id: 't-5', name: 'Clarissa Soriano, LPT', grade: 'Grade 2 - Silang', status: 'Pending Review', learners: 34, aralCount: 12 },
];

export default function LitrackEmbedPage() {
  // Pre-auth vs Post-auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [role, setRole] = useState<Role>('TEACHER');
  const [activePage, setActivePage] = useState<ActivePage>('teacher-dashboard');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Login form state
  const [loginScreen, setLoginScreen] = useState<'select-role' | 'school-head' | 'teacher'>('select-role');
  const [selectedDistrict, setSelectedDistrict] = useState('Glan 1 District');
  const [selectedSchool, setSelectedSchool] = useState('Glan Central Integrated School');
  const [loginEmail, setLoginEmail] = useState('m.santos@deped.gov.ph');
  const [loginPassword, setLoginPassword] = useState('••••••••••••');

  // Interactive diagnostic state
  const [learners, setLearners] = useState<LearnerRecord[]>(INITIAL_LEARNERS);
  const [selectedLearner, setSelectedLearner] = useState<LearnerRecord | null>(INITIAL_LEARNERS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // Diagnostic form state for selected learner
  const [diagAlphabet, setDiagAlphabet] = useState(selectedLearner?.scores.alphabet ?? 10);
  const [diagPhonology, setDiagPhonology] = useState(selectedLearner?.scores.phonology ?? 8);
  const [diagDecoding, setDiagDecoding] = useState(selectedLearner?.scores.decoding ?? 7);
  const [diagFluency, setDiagFluency] = useState(selectedLearner?.scores.fluency ?? 15);
  const [diagComprehension, setDiagComprehension] = useState(selectedLearner?.scores.comprehension ?? 6);

  // Computed composite reading level
  const computedReadingLevel = useMemo(() => {
    const total = diagAlphabet + diagPhonology + diagDecoding + diagFluency + diagComprehension;
    if (total < 35 || diagFluency < 15) return 'Non-Reader';
    if (total < 60 || diagFluency < 35) return 'Frustration';
    if (total < 85 || diagFluency < 60) return 'Instructional';
    return 'Independent';
  }, [diagAlphabet, diagPhonology, diagDecoding, diagFluency, diagComprehension]);

  // 1-Click login bypass handlers
  const handleQuickLogin = (targetRole: Role, defaultPage: ActivePage) => {
    setRole(targetRole);
    setActivePage(defaultPage);
    setIsAuthenticated(true);
  };

  const handleSelectLearnerForDiag = (l: LearnerRecord) => {
    setSelectedLearner(l);
    setDiagAlphabet(l.scores.alphabet);
    setDiagPhonology(l.scores.phonology);
    setDiagDecoding(l.scores.decoding);
    setDiagFluency(l.scores.fluency);
    setDiagComprehension(l.scores.comprehension);
    setActivePage('teacher-aral');
  };

  const handleSaveDiagnostic = () => {
    if (!selectedLearner) return;
    setLearners((prev) =>
      prev.map((item) =>
        item.lrn === selectedLearner.lrn
          ? {
              ...item,
              readingLevel: computedReadingLevel,
              aralStatus: computedReadingLevel === 'Non-Reader' || computedReadingLevel === 'Frustration' ? 'Enrolled' : 'Not Needed',
              scores: {
                alphabet: diagAlphabet,
                phonology: diagPhonology,
                decoding: diagDecoding,
                fluency: diagFluency,
                comprehension: diagComprehension,
              },
            }
          : item
      )
    );
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const filteredLearners = useMemo(() => {
    return learners.filter((l) => {
      const matchesSearch =
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.lrn.includes(searchQuery);
      const matchesLevel = filterLevel === 'ALL' || l.readingLevel === filterLevel;
      return matchesSearch && matchesLevel;
    });
  }, [learners, searchQuery, filterLevel]);

  // Reading level counts
  const readingStats = useMemo(() => {
    const total = learners.length;
    const nonReader = learners.filter((l) => l.readingLevel === 'Non-Reader').length;
    const frustration = learners.filter((l) => l.readingLevel === 'Frustration').length;
    const instructional = learners.filter((l) => l.readingLevel === 'Instructional').length;
    const independent = learners.filter((l) => l.readingLevel === 'Independent').length;
    const aralEnrolled = learners.filter((l) => l.aralStatus === 'Enrolled').length;

    return {
      total,
      nonReader,
      frustration,
      instructional,
      independent,
      aralEnrolled,
      profiledPercent: 88.9,
    };
  }, [learners]);

  /* =========================================================================
     RENDER: 1. PRE-AUTH LOGIN PAGE (Legit Layout of project-litrack login)
     ========================================================================= */
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex flex-col font-sans transition-colors ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-[#eef3fa] text-slate-900'}`}>
        {/* Quick Database Bypass Announcement Bar */}
        <div className="bg-blue-600 text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-950 font-bold px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider">
              1-Click Database Bypass Active
            </span>
            <span>Click any direct role button below to immediately bypass database auth and enter the live system:</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <button
              onClick={() => handleQuickLogin('TEACHER', 'teacher-dashboard')}
              className="bg-white/20 hover:bg-white/30 text-white px-2.5 py-1 rounded transition-colors text-xs flex items-center gap-1"
            >
              <User className="size-3" /> 1-Click Teacher
            </button>
            <button
              onClick={() => handleQuickLogin('SCHOOL_HEAD', 'head-dashboard')}
              className="bg-white/20 hover:bg-white/30 text-white px-2.5 py-1 rounded transition-colors text-xs flex items-center gap-1"
            >
              <GraduationCap className="size-3" /> 1-Click School Head
            </button>
            <button
              onClick={() => handleQuickLogin('SUPER_ADMIN', 'admin-dashboard')}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-2.5 py-1 rounded transition-colors text-xs flex items-center gap-1 font-bold"
            >
              <ShieldCheck className="size-3" /> 1-Click Super Admin
            </button>
          </div>
        </div>

        {/* Top Header / Theme Switch */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-colors text-xs flex items-center gap-1.5"
            title="Toggle theme"
          >
            {isDarkMode ? <Sun className="size-4 text-amber-400" /> : <Moon className="size-4 text-slate-700" />}
            <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>

        {/* Center Container: Exact LoginForm UI */}
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <div className="mx-auto size-28 relative flex items-center justify-center">
                <Image
                  src="/embed/litrack/logo.png"
                  alt="PROJECT LITRACK Logo"
                  width={112}
                  height={112}
                  priority
                  className="object-contain"
                />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">PROJECT LITRACK</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">School reading-profiling system</p>
            </div>

            {/* Role Switcher Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
              {loginScreen === 'select-role' ? (
                <div className="space-y-4">
                  <div className="text-center pb-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Select your account role</p>
                    <p className="text-xs text-slate-500">Sign in to access student diagnostic profiling</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setLoginScreen('school-head')}
                      className="p-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 bg-slate-50 dark:bg-slate-800/60 text-center transition-all group"
                    >
                      <GraduationCap className="size-7 mx-auto text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                      <span className="block text-sm font-bold text-slate-900 dark:text-white">School Head</span>
                      <span className="block text-[11px] text-slate-500 mt-0.5">Principal / Administrator</span>
                    </button>

                    <button
                      onClick={() => setLoginScreen('teacher')}
                      className="p-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-violet-500 dark:hover:border-violet-500 bg-slate-50 dark:bg-slate-800/60 text-center transition-all group"
                    >
                      <User className="size-7 mx-auto text-violet-600 dark:text-violet-400 mb-2 group-hover:scale-110 transition-transform" />
                      <span className="block text-sm font-bold text-slate-900 dark:text-white">Teacher</span>
                      <span className="block text-[11px] text-slate-500 mt-0.5">Adviser / ARAL Volunteer</span>
                    </button>
                  </div>

                  <div className="pt-2 text-center">
                    <button
                      onClick={() => handleQuickLogin('SUPER_ADMIN', 'admin-dashboard')}
                      className="text-xs text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 underline underline-offset-4 transition-colors"
                    >
                      Super Admin? Admin login &rarr;
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {loginScreen === 'school-head' ? 'School Head Sign In' : 'Teacher Sign In'}
                    </span>
                    <button
                      onClick={() => setLoginScreen('select-role')}
                      className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline"
                    >
                      Change role
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Schools Division District
                      </label>
                      <select
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>Glan 1 District</option>
                        <option>Glan 2 District</option>
                        <option>Alabel East District</option>
                        <option>Malungon Central District</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        School Institution
                      </label>
                      <select
                        value={selectedSchool}
                        onChange={(e) => setSelectedSchool(e.target.value)}
                        className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>Glan Central Integrated School</option>
                        <option>Alabel National High School</option>
                        <option>Malungon Central Elementary</option>
                        <option>Pangyan Integrated School</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        {loginScreen === 'school-head' ? 'School Access Key' : 'DepEd Email Address'}
                      </label>
                      <input
                        type={loginScreen === 'school-head' ? 'password' : 'email'}
                        value={loginScreen === 'school-head' ? loginPassword : loginEmail}
                        onChange={(e) => loginScreen === 'school-head' ? setLoginPassword(e.target.value) : setLoginEmail(e.target.value)}
                        className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleQuickLogin(loginScreen === 'school-head' ? 'SCHOOL_HEAD' : 'TEACHER', loginScreen === 'school-head' ? 'head-dashboard' : 'teacher-dashboard')}
                    className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>1-Click Sign In</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Official Partner Logos Lockup */}
            <div className="flex justify-center pt-2 pb-2">
              <Image
                src="/embed/litrack/partner-logos.png"
                alt="Partner organizations: DepEd MATATAG, Bagong Pilipinas, Division of Sarangani"
                width={240}
                height={74}
                className="h-auto w-[220px] object-contain opacity-80"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     RENDER: 2. AUTHENTICATED APP (Exact RoleShell + AppSidebar + AppHeader)
     ========================================================================= */
  return (
    <div className={`min-h-screen flex font-sans ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-[#eef3fa] text-slate-900'}`}>
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle className="size-4" />
          <span>Reading diagnostic assessment recorded successfully!</span>
        </div>
      )}

      {/* =====================================================================
          SIDEBAR: Matching C:\Users\PC5\Desktop\project-litrack\src\components\app-sidebar.tsx
          ===================================================================== */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex flex-col border-r transition-all duration-200 ${
          isSidebarExpanded ? 'w-64' : 'w-20'
        } ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 min-w-0">
            <div className="size-9 relative shrink-0">
              <Image
                src="/embed/litrack/logo.png"
                alt="LITRACK Logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            {isSidebarExpanded && (
              <div className="min-w-0">
                <p className="text-xs font-extrabold tracking-tight text-slate-900 dark:text-white uppercase leading-none">
                  Project LiTrack
                </p>
                <p className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold truncate mt-0.5">
                  ARAL Recovery Engine
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle sidebar"
          >
            <Menu className="size-4" />
          </button>
        </div>

        {/* Institution Badge (when expanded) */}
        {isSidebarExpanded && (
          <div className="px-4 py-3 bg-blue-50/70 dark:bg-blue-950/30 border-b border-slate-200 dark:border-slate-800">
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate">
              Glan Central Integrated School
            </p>
            <div className="flex items-center gap-1.5 mt-1 text-[10px] text-slate-500 dark:text-slate-400">
              <span className="bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 px-1.5 py-0.2 rounded font-medium">
                Glan 1 District
              </span>
              <span>•</span>
              <span>SY 2025-2026</span>
            </div>
          </div>
        )}

        {/* Navigation Group Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* TEACHER ROLE NAV */}
          {role === 'TEACHER' && (
            <div className="space-y-1">
              {isSidebarExpanded && (
                <p className="px-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  Advisory Menu
                </p>
              )}
              <button
                onClick={() => setActivePage('teacher-dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activePage === 'teacher-dashboard'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
                title="Overview Dashboard"
              >
                <LayoutDashboard className="size-4 shrink-0" />
                {isSidebarExpanded && <span>Dashboard Overview</span>}
              </button>

              <button
                onClick={() => setActivePage('teacher-learners')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activePage === 'teacher-learners'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
                title="Learners Roster"
              >
                <Users className="size-4 shrink-0" />
                {isSidebarExpanded && (
                  <div className="flex-1 flex items-center justify-between">
                    <span>Learners Roster</span>
                    <span className="bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                      36
                    </span>
                  </div>
                )}
              </button>

              <button
                onClick={() => setActivePage('teacher-aral')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activePage === 'teacher-aral'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
                title="ARAL Diagnostic Tool"
              >
                <Sparkles className="size-4 shrink-0 text-violet-500" />
                {isSidebarExpanded && (
                  <div className="flex-1 flex items-center justify-between">
                    <span>ARAL Reading Diagnostic</span>
                    <span className="bg-violet-100 dark:bg-violet-900/60 text-violet-800 dark:text-violet-200 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                      {readingStats.aralEnrolled}
                    </span>
                  </div>
                )}
              </button>

              <button
                onClick={() => setActivePage('teacher-reports')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activePage === 'teacher-reports'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
                title="End of Terms Reports"
              >
                <FileBarChart className="size-4 shrink-0" />
                {isSidebarExpanded && <span>End of Terms Reports</span>}
              </button>
            </div>
          )}

          {/* SCHOOL HEAD ROLE NAV */}
          {role === 'SCHOOL_HEAD' && (
            <div className="space-y-1">
              {isSidebarExpanded && (
                <p className="px-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  Institutional Telemetry
                </p>
              )}
              <button
                onClick={() => setActivePage('head-dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activePage === 'head-dashboard'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <LayoutDashboard className="size-4 shrink-0" />
                {isSidebarExpanded && <span>School Overview</span>}
              </button>

              <button
                onClick={() => setActivePage('head-teachers')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activePage === 'head-teachers'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <GraduationCap className="size-4 shrink-0" />
                {isSidebarExpanded && <span>Faculty & Teachers</span>}
              </button>

              <button
                onClick={() => setActivePage('head-school-info')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activePage === 'head-school-info'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <School className="size-4 shrink-0" />
                {isSidebarExpanded && <span>School Profile</span>}
              </button>

              <button
                onClick={() => setActivePage('head-aral')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activePage === 'head-aral'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Sparkles className="size-4 shrink-0 text-violet-400" />
                {isSidebarExpanded && <span>ARAL School Compliance</span>}
              </button>
            </div>
          )}

          {/* SUPER ADMIN ROLE NAV */}
          {role === 'SUPER_ADMIN' && (
            <div className="space-y-1">
              {isSidebarExpanded && (
                <p className="px-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  Division Command
                </p>
              )}
              <button
                onClick={() => setActivePage('admin-dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activePage === 'admin-dashboard'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <LayoutDashboard className="size-4 shrink-0" />
                {isSidebarExpanded && <span>Division Matrix</span>}
              </button>

              <button
                onClick={() => setActivePage('admin-schools')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activePage === 'admin-schools'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <School className="size-4 shrink-0" />
                {isSidebarExpanded && <span>Schools Directory (48)</span>}
              </button>

              <button
                onClick={() => setActivePage('admin-audit')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activePage === 'admin-audit'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <ScrollText className="size-4 shrink-0" />
                {isSidebarExpanded && <span>Audit Trail</span>}
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Footer User Card */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-gradient-to-tr from-blue-600 to-violet-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
              {role === 'TEACHER' ? 'MS' : role === 'SCHOOL_HEAD' ? 'RH' : 'SA'}
            </div>
            {isSidebarExpanded && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate leading-none">
                  {role === 'TEACHER'
                    ? 'Maria Santos, LPT'
                    : role === 'SCHOOL_HEAD'
                    ? 'Dr. Roberto Hernandez'
                    : 'Division Admin'}
                </p>
                <p className="text-[10px] text-slate-400 uppercase font-semibold mt-0.5">
                  {role === 'TEACHER' ? 'Grade 3 Adviser' : role === 'SCHOOL_HEAD' ? 'Principal IV' : 'Super Admin'}
                </p>
              </div>
            )}
            <button
              onClick={() => setIsAuthenticated(false)}
              className="p-1.5 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
              title="Sign Out to Login"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* =====================================================================
          MAIN APP CONTENT GROUND (Offset by sidebar width)
          ===================================================================== */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ${isSidebarExpanded ? 'ml-64' : 'ml-20'}`}>
        {/* AppHeader: Matching C:\Users\PC5\Desktop\project-litrack\src\components\shell\app-header.tsx */}
        <header className="h-16 sticky top-0 z-20 px-6 border-b flex items-center justify-between gap-4 backdrop-blur bg-white/95 dark:bg-slate-900/95 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="text-slate-900 dark:text-white font-bold">LITRACK</span>
              <span>/</span>
              <span className="capitalize">{activePage.replace('-', ' ')}</span>
            </div>

            {/* Advisory Section Pill */}
            {role === 'TEACHER' && (
              <span className="hidden sm:inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                <BookOpen className="size-3" /> Grade 3 - Section Mabini
              </span>
            )}
          </div>

          {/* Quick 1-Click Role Switcher Matrix */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-semibold">
              <span className="px-2 text-[10px] uppercase tracking-wider text-slate-400 font-bold">1-Click Role:</span>
              <button
                onClick={() => handleQuickLogin('TEACHER', 'teacher-dashboard')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  role === 'TEACHER' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                Teacher
              </button>
              <button
                onClick={() => handleQuickLogin('SCHOOL_HEAD', 'head-dashboard')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  role === 'SCHOOL_HEAD' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                School Head
              </button>
              <button
                onClick={() => handleQuickLogin('SUPER_ADMIN', 'admin-dashboard')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  role === 'SUPER_ADMIN' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                Super Admin
              </button>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
                title="Notifications"
              >
                <Bell className="size-4" />
                <span className="absolute top-1.5 right-1.5 size-2 bg-blue-600 rounded-full ring-2 ring-white dark:ring-slate-900" />
              </button>

              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl p-3 z-50 text-xs space-y-2">
                  <p className="font-bold text-slate-900 dark:text-white pb-1 border-b border-slate-100 dark:border-slate-800">
                    System Announcements
                  </p>
                  <div className="space-y-2">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200">
                      <p className="font-semibold">BOSY Window Active</p>
                      <p className="text-[11px] text-blue-700 dark:text-blue-300">Complete oral reading verification for Grade 3 candidates before Friday.</p>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      <p className="font-semibold">ARAL Reading Recovery</p>
                      <p className="text-[11px] text-slate-500">8 learners enrolled in phonemic intervention sessions.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Switch */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle theme"
            >
              {isDarkMode ? <Sun className="size-4 text-amber-400" /> : <Moon className="size-4" />}
            </button>
          </div>
        </header>

        {/* ===================================================================
            BODY CONTENT VIEWS
            =================================================================== */}
        <main className="flex-1 p-6 space-y-6">
          {/* NOTICE STRIP (From C:\Users\PC5\Desktop\project-litrack\src\components\dashboard\teacher\notice-strip.tsx) */}
          <div className="bg-blue-500/10 border border-blue-500/20 dark:border-blue-400/20 rounded-xl p-4 flex items-start gap-3">
            <Info className="size-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-blue-950 dark:text-blue-100">
                School Year 2025-2026 Beginning of School Year (BOSY) Diagnostic Assessment Window is OPEN.
              </span>
              <span className="block text-blue-800/80 dark:text-blue-300/80 mt-0.5">
                All class advisers must record alphabet knowledge, phonological awareness, decoding, oral fluency, and reading comprehension scores for all enrolled learners.
              </span>
            </div>
          </div>

          {/* VIEW: TEACHER DASHBOARD */}
          {activePage === 'teacher-dashboard' && (
            <div className="space-y-6">
              {/* Greeting Header */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Good morning, Maria Santos
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Grade 3 - Section Mabini · Reading Profiling Telemetry & ARAL Diagnostics
                  </p>
                </div>
                <button
                  onClick={() => setActivePage('teacher-aral')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Sparkles className="size-3.5" /> Record Diagnostic Assessment
                </button>
              </div>

              {/* 4 STAT CARDS (Matching C:\Users\PC5\Desktop\project-litrack\src\components\dashboard\teacher\stat-cards.tsx) */}
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {/* Stat 1: Total Enrolled */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
                  <div className="flex items-center gap-3">
                    <span className="size-10 rounded-xl bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 flex items-center justify-center font-bold">
                      <Users className="size-5" />
                    </span>
                    <span className="text-xs font-semibold text-slate-500">Total Learners Enrolled</span>
                  </div>
                  <p className="mt-4 text-3xl font-extrabold tabular-nums text-slate-900 dark:text-white">
                    {readingStats.total}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">100% accounted in advisory class</p>
                  <button
                    onClick={() => setActivePage('teacher-learners')}
                    className="mt-4 text-xs font-bold text-violet-600 dark:text-violet-400 flex items-center gap-1 hover:underline"
                  >
                    View class roster <ArrowRight className="size-3" />
                  </button>
                </div>

                {/* Stat 2: Profiled Learners */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
                  <div className="flex items-center gap-3">
                    <span className="size-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold">
                      <UserRoundCheck className="size-5" />
                    </span>
                    <span className="text-xs font-semibold text-slate-500">Profiled (BOSY Cycle)</span>
                  </div>
                  <p className="mt-4 text-3xl font-extrabold tabular-nums text-slate-900 dark:text-white">
                    32 <span className="text-sm font-medium text-slate-500">/ 36</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{readingStats.profiledPercent}% diagnostic completion</p>
                  <button
                    onClick={() => setActivePage('teacher-learners')}
                    className="mt-4 text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
                  >
                    Assess remaining 4 <ArrowRight className="size-3" />
                  </button>
                </div>

                {/* Stat 3: ARAL Reading Candidates */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
                  <div className="flex items-center gap-3">
                    <span className="size-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold">
                      <Sparkles className="size-5" />
                    </span>
                    <span className="text-xs font-semibold text-slate-500">ARAL Reading Candidates</span>
                  </div>
                  <p className="mt-4 text-3xl font-extrabold tabular-nums text-amber-600 dark:text-amber-400">
                    {readingStats.aralEnrolled}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Flagged for intensive reading intervention</p>
                  <button
                    onClick={() => setActivePage('teacher-aral')}
                    className="mt-4 text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1 hover:underline"
                  >
                    ARAL diagnostic tool <ArrowRight className="size-3" />
                  </button>
                </div>

                {/* Stat 4: Interventions Logged */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
                  <div className="flex items-center gap-3">
                    <span className="size-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
                      <CheckCircle2 className="size-5" />
                    </span>
                    <span className="text-xs font-semibold text-slate-500">Interventions Logged</span>
                  </div>
                  <p className="mt-4 text-3xl font-extrabold tabular-nums text-emerald-600 dark:text-emerald-400">
                    14
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Target sessions completed this month</p>
                  <button
                    onClick={() => setActivePage('teacher-reports')}
                    className="mt-4 text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 hover:underline"
                  >
                    Generate term report <ArrowRight className="size-3" />
                  </button>
                </div>
              </div>

              {/* OVERVIEW PANELS (Matching C:\Users\PC5\Desktop\project-litrack\src\components\dashboard\teacher\overview-panels.tsx) */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Panel 1: Reading Level Distribution */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-slate-900 dark:text-white">Reading Level Distribution</h2>
                      <p className="text-xs text-slate-500">BOSY Oral Reading Verification Baseline</p>
                    </div>
                    <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full">
                      Grade 3 Class
                    </span>
                  </div>

                  {/* Segmented Visual Bar */}
                  <div className="h-4 rounded-full overflow-hidden flex w-full bg-slate-100 dark:bg-slate-800">
                    <div style={{ width: `${(readingStats.nonReader / readingStats.total) * 100}%` }} className="bg-red-500" title="Non-Reader" />
                    <div style={{ width: `${(readingStats.frustration / readingStats.total) * 100}%` }} className="bg-amber-500" title="Frustration" />
                    <div style={{ width: `${(readingStats.instructional / readingStats.total) * 100}%` }} className="bg-blue-500" title="Instructional" />
                    <div style={{ width: `${(readingStats.independent / readingStats.total) * 100}%` }} className="bg-emerald-500" title="Independent" />
                  </div>

                  {/* Dotted Legend */}
                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full bg-red-500 shrink-0" />
                      <span className="text-slate-600 dark:text-slate-400">Non-Reader:</span>
                      <span className="font-bold tabular-nums text-slate-900 dark:text-white">{readingStats.nonReader} ({((readingStats.nonReader / readingStats.total) * 100).toFixed(1)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full bg-amber-500 shrink-0" />
                      <span className="text-slate-600 dark:text-slate-400">Frustration:</span>
                      <span className="font-bold tabular-nums text-slate-900 dark:text-white">{readingStats.frustration} ({((readingStats.frustration / readingStats.total) * 100).toFixed(1)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full bg-blue-500 shrink-0" />
                      <span className="text-slate-600 dark:text-slate-400">Instructional:</span>
                      <span className="font-bold tabular-nums text-slate-900 dark:text-white">{readingStats.instructional} ({((readingStats.instructional / readingStats.total) * 100).toFixed(1)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full bg-emerald-500 shrink-0" />
                      <span className="text-slate-600 dark:text-slate-400">Independent:</span>
                      <span className="font-bold tabular-nums text-slate-900 dark:text-white">{readingStats.independent} ({((readingStats.independent / readingStats.total) * 100).toFixed(1)}%)</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-500">ARAL Priority Threshold: &le; Frustration</span>
                    <button
                      onClick={() => setActivePage('teacher-learners')}
                      className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                    >
                      Filter candidates &rarr;
                    </button>
                  </div>
                </div>

                {/* Panel 2: Attendance & Intervention Frequency */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-slate-900 dark:text-white">ARAL Intervention Attendance</h2>
                      <p className="text-xs text-slate-500">Current Term Weekly Compliance</p>
                    </div>
                    <span className="text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-2.5 py-1 rounded-full">
                      96.2% Present Rate
                    </span>
                  </div>

                  {/* Attendance Metrics */}
                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-1">
                        <span>Session 1: Phonemic Awareness Drill</span>
                        <span className="font-bold text-slate-900 dark:text-white">8 / 8 Attended (100%)</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div className="h-full bg-emerald-500 w-full" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-1">
                        <span>Session 2: Decoding & CVC Blending</span>
                        <span className="font-bold text-slate-900 dark:text-white">7 / 8 Attended (87.5%)</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[87.5%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-1">
                        <span>Session 3: Guided Fluency Reading</span>
                        <span className="font-bold text-slate-900 dark:text-white">8 / 8 Attended (100%)</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div className="h-full bg-emerald-500 w-full" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-500">Parental notification sent for 1 excused absence</span>
                    <button
                      onClick={() => setActivePage('teacher-reports')}
                      className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                    >
                      View attendance logs &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: LEARNERS ROSTER TABLE */}
          {activePage === 'teacher-learners' && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 p-5">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h1 className="text-base font-bold text-slate-900 dark:text-white">Grade 3 Learners Roster</h1>
                  <p className="text-xs text-slate-500">Advisory: Section Mabini · 36 Enrolled Learners</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search LRN or name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
                    />
                  </div>

                  <select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    className="text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ALL">All Levels</option>
                    <option value="Non-Reader">Non-Reader</option>
                    <option value="Frustration">Frustration</option>
                    <option value="Instructional">Instructional</option>
                    <option value="Independent">Independent</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">
                    <tr>
                      <th className="py-3 px-4">LRN</th>
                      <th className="py-3 px-4">Learner Name</th>
                      <th className="py-3 px-4">Sex</th>
                      <th className="py-3 px-4">Reading Level</th>
                      <th className="py-3 px-4">ARAL Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredLearners.map((l) => (
                      <tr key={l.lrn} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4 font-mono font-medium text-slate-700 dark:text-slate-300">{l.lrn}</td>
                        <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{l.name}</td>
                        <td className="py-3 px-4 text-slate-500">{l.gender}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              l.readingLevel === 'Non-Reader'
                                ? 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300'
                                : l.readingLevel === 'Frustration'
                                ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                                : l.readingLevel === 'Instructional'
                                ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                                : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                            }`}
                          >
                            {l.readingLevel}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              l.aralStatus === 'Enrolled'
                                ? 'bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                            }`}
                          >
                            {l.aralStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleSelectLearnerForDiag(l)}
                            className="bg-blue-50 dark:bg-blue-950 hover:bg-blue-100 text-blue-600 dark:text-blue-400 font-bold px-2.5 py-1 rounded transition-colors text-[11px]"
                          >
                            1-Click Diagnose &rarr;
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW: ARAL READING DIAGNOSTIC ASSESSMENT TOOL */}
          {activePage === 'teacher-aral' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                      National ARAL Program · Individual Diagnostic Protocol
                    </span>
                    <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                      Diagnostic Scoring Sheet: {selectedLearner?.name ?? 'Select a learner'}
                    </h1>
                    <p className="text-xs text-slate-500">
                      LRN: {selectedLearner?.lrn} · Grade 3 - Mabini · Assessment Period: BOSY 2025-2026
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Live Computed Category</p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          computedReadingLevel === 'Non-Reader'
                            ? 'bg-red-500 text-white'
                            : computedReadingLevel === 'Frustration'
                            ? 'bg-amber-500 text-white'
                            : computedReadingLevel === 'Instructional'
                            ? 'bg-blue-600 text-white'
                            : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {computedReadingLevel}
                      </span>
                    </div>

                    <button
                      onClick={handleSaveDiagnostic}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                    >
                      <Save className="size-3.5" /> 1-Click Save Assessment
                    </button>
                  </div>
                </div>

                {/* Rubric Sliders Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Alphabet Knowledge */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-800 dark:text-slate-200">1. Alphabet Knowledge</span>
                      <span className="font-bold text-blue-600 tabular-nums">{diagAlphabet} / 15</span>
                    </div>
                    <p className="text-[11px] text-slate-500">Letter naming, uppercase & lowercase recognition</p>
                    <input
                      type="range"
                      min="0"
                      max="15"
                      value={diagAlphabet}
                      onChange={(e) => setDiagAlphabet(parseInt(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>

                  {/* Phonological Awareness */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-800 dark:text-slate-200">2. Phonological Awareness</span>
                      <span className="font-bold text-blue-600 tabular-nums">{diagPhonology} / 15</span>
                    </div>
                    <p className="text-[11px] text-slate-500">Sound isolation, rhyming, syllable blending</p>
                    <input
                      type="range"
                      min="0"
                      max="15"
                      value={diagPhonology}
                      onChange={(e) => setDiagPhonology(parseInt(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>

                  {/* Decoding & Word Recognition */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-800 dark:text-slate-200">3. Decoding & Word Recognition</span>
                      <span className="font-bold text-blue-600 tabular-nums">{diagDecoding} / 20</span>
                    </div>
                    <p className="text-[11px] text-slate-500">CVC words, high-frequency sight words</p>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={diagDecoding}
                      onChange={(e) => setDiagDecoding(parseInt(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>

                  {/* Oral Reading Fluency */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-800 dark:text-slate-200">4. Oral Reading Fluency</span>
                      <span className="font-bold text-blue-600 tabular-nums">{diagFluency} words / min</span>
                    </div>
                    <p className="text-[11px] text-slate-500">Correct words per minute in Grade 3 benchmark text</p>
                    <input
                      type="range"
                      min="0"
                      max="90"
                      value={diagFluency}
                      onChange={(e) => setDiagFluency(parseInt(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>

                  {/* Reading Comprehension */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2 md:col-span-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-800 dark:text-slate-200">5. Reading Comprehension (Literal & Inferential)</span>
                      <span className="font-bold text-blue-600 tabular-nums">{diagComprehension} / 25</span>
                    </div>
                    <p className="text-[11px] text-slate-500">Factual recall, main idea identification, inferential deduction</p>
                    <input
                      type="range"
                      min="0"
                      max="25"
                      value={diagComprehension}
                      onChange={(e) => setDiagComprehension(parseInt(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: SCHOOL HEAD DASHBOARD */}
          {activePage === 'head-dashboard' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    School Head Institutional Overview
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Glan Central Integrated School · School ID 101294 · Division of Sarangani
                  </p>
                </div>
                <div className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold px-3 py-1.5 rounded-lg text-xs">
                  92.4% Overall Profiling Compliance
                </div>
              </div>

              {/* Faculty Summary Table */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white">Teacher Diagnostic Submission Tracking</h2>
                  <span className="text-xs text-slate-500">18 of 20 Teachers Completed</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase font-bold">
                      <tr>
                        <th className="py-2.5 px-4">Faculty Member</th>
                        <th className="py-2.5 px-4">Advisory Section</th>
                        <th className="py-2.5 px-4">Learners</th>
                        <th className="py-2.5 px-4">ARAL Flagged</th>
                        <th className="py-2.5 px-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {TEACHERS_LIST.map((t) => (
                        <tr key={t.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                          <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white">{t.name}</td>
                          <td className="py-2.5 px-4 text-slate-600 dark:text-slate-400">{t.grade}</td>
                          <td className="py-2.5 px-4 tabular-nums">{t.learners}</td>
                          <td className="py-2.5 px-4 tabular-nums font-semibold text-violet-600">{t.aralCount}</td>
                          <td className="py-2.5 px-4 text-right">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                t.status === 'Submitted'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : t.status === 'In Progress'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {t.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: SUPER ADMIN DASHBOARD */}
          {activePage === 'admin-dashboard' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Division of Sarangani ARAL Command Matrix
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    48 Participating Schools · 14,280 Total Profiled Learners · Region XII
                  </p>
                </div>
                <div className="bg-blue-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs shadow-sm">
                  Super Admin Division Authority
                </div>
              </div>

              {/* Division KPI Grid */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
                  <span className="text-xs font-semibold text-slate-500">Division Target Population</span>
                  <p className="text-2xl font-black mt-2 text-slate-900 dark:text-white">14,280</p>
                  <p className="text-xs text-slate-500 mt-1">Across 8 municipality districts</p>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
                  <span className="text-xs font-semibold text-slate-500">Identified ARAL Candidates</span>
                  <p className="text-2xl font-black mt-2 text-violet-600">2,842</p>
                  <p className="text-xs text-slate-500 mt-1">19.9% of total elementary population</p>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
                  <span className="text-xs font-semibold text-slate-500">School Heads Compliant</span>
                  <p className="text-2xl font-black mt-2 text-emerald-600">46 / 48</p>
                  <p className="text-xs text-slate-500 mt-1">95.8% division submission rate</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
