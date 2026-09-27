import React from 'react';
import { ShieldCheck, Search, Scale, BookOpen, BarChart3, PlusCircle, CheckCircle2 } from 'lucide-react';
import { UserRole } from '../types/compliance';
import { DEFAULT_OFFICERS } from '../data/sampleProducts';

interface HeaderProps {
  activeTab: 'workbench' | 'dashboard' | 'mpe-calc' | 'rules' | 'architecture';
  setActiveTab: (tab: 'workbench' | 'dashboard' | 'mpe-calc' | 'rules' | 'architecture') => void;
  currentOfficer: UserRole;
  setCurrentOfficer: (officer: UserRole) => void;
  onNewScan: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentOfficer,
  setCurrentOfficer,
  onNewScan
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Bar Contract: 3 zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Zone 1: Single text element wordmark with official emblem icon */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-indigo-900 text-amber-400 flex items-center justify-center font-bold shadow-xs">
            <Scale className="w-5 h-5 text-amber-400" />
          </div>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setActiveTab('workbench'); }}
            className="flex items-center gap-2 group"
          >
            <span className="text-lg font-black tracking-tight text-slate-900 group-hover:text-indigo-900 transition-colors">
              FOODRIX
            </span>
            <span className="hidden sm:inline-block text-2xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
              Legal Metrology
            </span>
          </a>
        </div>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('workbench')}
            className={`whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'workbench' ? 'text-indigo-950 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Scan & Audit</span>
          </button>
          
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'dashboard' ? 'text-indigo-950 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Enforcement Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('mpe-calc')}
            className={`whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'mpe-calc' ? 'text-indigo-950 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>MPE Calculator</span>
          </button>

          <button
            onClick={() => setActiveTab('rules')}
            className={`whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'rules' ? 'text-indigo-950 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Rules & Penalties</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'architecture' ? 'text-indigo-950 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Architecture Doc</span>
          </button>
        </nav>

        {/* Zone 3: Primary actions & User Role selector */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Role selector dropdown */}
          <div className="hidden lg:flex items-center gap-2 text-xs">
            <span className="text-slate-600 font-medium">Role:</span>
            <select
              value={currentOfficer.id}
              onChange={(e) => {
                const found = DEFAULT_OFFICERS.find((o) => o.id === e.target.value);
                if (found) setCurrentOfficer(found);
              }}
              className="bg-slate-100 hover:bg-slate-200 border-none text-slate-800 font-medium rounded-md px-2.5 py-1.5 cursor-pointer text-xs focus:ring-1 focus:ring-slate-400 outline-none"
            >
              {DEFAULT_OFFICERS.map((off) => (
                <option key={off.id} value={off.id}>
                  {off.name} ({off.role === 'LEGAL_METROLOGY_INSPECTOR' ? 'Inspector' : off.role === 'ENFORCEMENT_DIRECTOR' ? 'Director' : off.role === 'MANUFACTURER_AUDITOR' ? 'Mfr. Audit' : 'E-com Audit'})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onNewScan}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-900 hover:bg-indigo-800 rounded-md transition-colors shadow-xs cursor-pointer whitespace-nowrap"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Scan</span>
          </button>
        </div>

      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-100 px-2 py-2 text-xs font-medium text-slate-600 bg-slate-50">
        <button
          onClick={() => setActiveTab('workbench')}
          className={`px-2 py-1 ${activeTab === 'workbench' ? 'text-indigo-950 font-bold' : ''}`}
        >
          Scan
        </button>
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-2 py-1 ${activeTab === 'dashboard' ? 'text-indigo-950 font-bold' : ''}`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('mpe-calc')}
          className={`px-2 py-1 ${activeTab === 'mpe-calc' ? 'text-indigo-950 font-bold' : ''}`}
        >
          MPE Calc
        </button>
        <button
          onClick={() => setActiveTab('rules')}
          className={`px-2 py-1 ${activeTab === 'rules' ? 'text-indigo-950 font-bold' : ''}`}
        >
          Rules
        </button>
        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-2 py-1 ${activeTab === 'architecture' ? 'text-indigo-950 font-bold' : ''}`}
        >
          Architecture
        </button>
      </div>
    </header>
  );
};
