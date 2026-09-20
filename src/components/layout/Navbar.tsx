import React, { useState } from 'react';
import { 
  Recycle, 
  Search, 
  Bell, 
  User, 
  Truck, 
  Building2, 
  ShieldCheck, 
  ChevronDown, 
  X,
  Play,
  RotateCcw
} from 'lucide-react';
import { useApp, AppTab } from '../../context/AppContext';
import { UserRole } from '../../types';

interface NavbarProps {
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const { 
    role, 
    setRole, 
    activeTab, 
    setActiveTab, 
    notifications, 
    viewWasteDetails,
    runNextDemoStep,
    resetDemoSimulation,
    demoStep,
    demoActive
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [quickSearchInput, setQuickSearchInput] = useState('');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearchInput.trim()) {
      viewWasteDetails(quickSearchInput.trim().toUpperCase());
      setQuickSearchInput('');
    }
  };

  const navLinks: { id: AppTab; label: string }[] = [
    { id: 'landing', label: 'Overview' },
    { id: 'schedule', label: 'Book Pickup' },
    { id: 'trace', label: 'Traceability Ledger' },
    { id: 'rates', label: 'Mandi Rates' },
    { id: 'impact', label: 'Live Telemetry' },
  ];

  const roleMeta: Record<UserRole, { label: string; icon: React.ReactNode; badgeColor: string }> = {
    household: { label: 'Household', icon: <User className="w-3.5 h-3.5" />, badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    collector: { label: 'Collector Partner', icon: <Truck className="w-3.5 h-3.5" />, badgeColor: 'bg-teal-50 text-teal-800 border-teal-200' },
    recycler: { label: 'Recycler Hub', icon: <Building2 className="w-3.5 h-3.5" />, badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
    admin: { label: 'Municipal Officer', icon: <ShieldCheck className="w-3.5 h-3.5" />, badgeColor: 'bg-slate-100 text-slate-800 border-slate-300' },
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90">
      
      {/* Top Thin Platform Tutorial Bar */}
      <div className="bg-slate-950 text-slate-300 text-[11px] py-1 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-1.5 py-0.2 rounded font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px]">
              Platform Tutorial
            </span>
            <span className="hidden sm:inline text-slate-400">
              Interactive Guide: Follow how materials move from household to verified reprocessor
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[11px]">
            <button
              onClick={runNextDemoStep}
              className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-medium transition-colors cursor-pointer"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>{demoActive ? `Tutorial Step ${demoStep}/5` : 'Start Platform Tutorial'}</span>
            </button>
            <button
              onClick={resetDemoSimulation}
              className="hidden md:inline-flex items-center space-x-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Reset tutorial"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setActiveTab('landing')}
              className="flex items-center space-x-2 text-left group cursor-pointer focus:outline-hidden"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-xs border border-emerald-400/40 group-hover:scale-105 group-hover:shadow-emerald-500/20 group-hover:shadow-md transition-all">
                <Recycle className="w-4 h-4 text-emerald-50" />
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-base font-bold tracking-tight text-slate-900">
                  Kabadiwala<span className="text-emerald-700 font-extrabold">Connect</span>
                </span>
                <span className="text-[10px] font-mono text-slate-600 uppercase font-semibold">
                  v2.6
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => setActiveTab(link.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      isActive 
                        ? 'bg-slate-100 text-slate-900' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}

              <div className="h-3.5 w-px bg-slate-200 mx-1.5" />

              <button
                onClick={() => setActiveTab('collector')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'collector' || activeTab === 'identity'
                    ? 'bg-teal-50 text-teal-800 font-semibold'
                    : 'text-slate-500 hover:text-teal-700'
                }`}
              >
                Collector App
              </button>

              <button
                onClick={() => setActiveTab('recycler')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'recycler'
                    ? 'bg-indigo-50 text-indigo-800 font-semibold'
                    : 'text-slate-500 hover:text-indigo-700'
                }`}
              >
                Recycler Portal
              </button>

              <button
                onClick={() => setActiveTab('admin')}
                className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'admin'
                    ? 'bg-purple-50 text-purple-800 font-semibold'
                    : 'text-slate-400 hover:text-purple-700'
                }`}
              >
                Municipal
              </button>
            </nav>
          </div>

          {/* Right Action Group */}
          <div className="flex items-center space-x-2.5">
            
            {/* Quick Waste ID Search */}
            <form onSubmit={handleQuickSearch} className="hidden md:flex relative items-center">
              <input
                type="text"
                placeholder="Track ID e.g. KC-2026..."
                value={quickSearchInput}
                onChange={(e) => setQuickSearchInput(e.target.value)}
                className="w-40 lg:w-44 pl-7 pr-2.5 py-1 text-xs font-mono bg-slate-100 border border-slate-200 rounded-lg focus:outline-hidden focus:bg-white focus:border-slate-400 transition-all placeholder:text-slate-400"
              />
              <Search className="w-3 h-3 text-slate-400 absolute left-2.5 pointer-events-none" />
            </form>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors relative cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                )}
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-lg border border-slate-200 py-3 z-50 animate-fadeIn">
                  <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-semibold text-[11px] uppercase tracking-wider text-slate-500">
                      System Event Ledger
                    </span>
                    <button 
                      onClick={() => setShowNotifications(false)}
                      className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-3 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5 leading-snug">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${roleMeta[role].badgeColor}`}
              >
                {roleMeta[role].icon}
                <span className="hidden sm:inline">{roleMeta[role].label}</span>
                <span className="sm:hidden capitalize">{role}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border border-slate-200 py-2 z-50">
                  <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Switch Active Role:
                  </div>
                  {(['household', 'collector', 'recycler', 'admin'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setRole(r);
                        setShowRoleDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center space-x-2 transition-colors cursor-pointer ${
                        role === r ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`p-1 rounded ${roleMeta[r].badgeColor}`}>
                        {roleMeta[r].icon}
                      </div>
                      <div className="flex-1 truncate">
                        <div className="font-semibold">{roleMeta[r].label}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth / Login Button */}
            <button
              onClick={onOpenAuth}
              className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Sign In
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
