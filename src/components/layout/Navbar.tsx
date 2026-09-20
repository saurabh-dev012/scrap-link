import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  Truck, 
  Building2, 
  ShieldCheck, 
  ChevronDown, 
  X,
  LogOut,
} from 'lucide-react';
import { useApp, AppTab } from '../../context/AppContext';
import { UserRole } from '../../types';
import { ScrapLinkLogo } from '../ui/ScrapLinkLogo';

interface NavbarProps {
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const { 
    role, 
    setRole, 
    currentUser,
    logout,
    activeTab, 
    setActiveTab, 
    notifications, 
    viewWasteDetails,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [quickSearchInput, setQuickSearchInput] = useState('');

  const handleQuickSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (quickSearchInput.trim()) {
      viewWasteDetails(quickSearchInput.trim().toUpperCase());
      setQuickSearchInput('');
    }
  };

  // Dynamically compute navigation links based on active role
  const getNavLinks = (): { id: AppTab; label: string }[] => {
    if (role === 'household') {
      return [
        { id: 'customer', label: 'My Dashboard' },
        { id: 'schedule', label: 'Book Pickup' },
        { id: 'rates', label: 'Rates' },
        { id: 'trace', label: 'Track' },
        { id: 'landing', label: 'Home' }
      ];
    }
    if (role === 'collector') {
      return [
        { id: 'collector', label: 'Pickup Queue' },
        { id: 'identity', label: 'Identity' },
        { id: 'rates', label: 'Rates' },
        { id: 'trace', label: 'Track' },
        { id: 'landing', label: 'Home' }
      ];
    }
    if (role === 'admin') {
      return [
        { id: 'admin', label: 'Overview' },
        { id: 'impact', label: 'Impact' },
        { id: 'trace', label: 'Track' },
        { id: 'landing', label: 'Home' }
      ];
    }
    if (role === 'recycler') {
      return [
        { id: 'recycler', label: 'Batches' },
        { id: 'trace', label: 'Track' },
        { id: 'landing', label: 'Home' }
      ];
    }
    return [
      { id: 'landing', label: 'Overview' },
      { id: 'schedule', label: 'Book Pickup' },
      { id: 'rates', label: 'Rates' },
      { id: 'impact', label: 'Impact' },
      { id: 'trace', label: 'Track' }
    ];
  };

  const navLinks = getNavLinks();

  const roleMeta: Record<UserRole, { label: string; icon: React.ReactNode; badgeColor: string }> = {
    household: {
      label: 'Customer / Seller',
      icon: <User className="w-3.5 h-3.5" />,
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    collector: {
      label: 'Collector Partner',
      icon: <Truck className="w-3.5 h-3.5" />,
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
    },
    recycler: {
      label: 'Recycler Hub',
      icon: <Building2 className="w-3.5 h-3.5" />,
      badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    },
    admin: {
      label: 'Municipal Admin',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
    },
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#dfe5dc] bg-[#f7f7f2]/95 backdrop-blur-md">
      {/* Main Navbar */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo & Primary Nav */}
          <div className="flex items-center space-x-6">
            <button
              type="button"
              onClick={() => setActiveTab(currentUser ? (currentUser.role === 'household' ? 'customer' : currentUser.role) : 'landing')}
              className="group flex cursor-pointer items-center space-x-2 text-left focus:outline-hidden"
            >
              <ScrapLinkLogo />
            </button>

            {/* Role-Specific Navigation Links */}
            <nav className="hidden items-center space-x-1 lg:flex">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => setActiveTab(link.id)}
                    className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-slate-100 text-slate-900'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action Group */}
          <div className="flex items-center space-x-2.5">
            
            {/* Quick Waste ID Search */}
            <form onSubmit={handleQuickSearch} className="relative hidden items-center md:flex">
              <input
                type="text"
                placeholder="Collection ID"
                value={quickSearchInput}
                onChange={(e) => setQuickSearchInput(e.target.value)}
                className="w-36 lg:w-44 rounded-lg border border-[#dfe5dc] bg-white py-2 pl-7 pr-2.5 text-xs font-mono transition-all placeholder:text-slate-400 focus:border-[#5b7c67] focus:outline-hidden"
              />
              <Search className="pointer-events-none absolute left-2.5 h-3 w-3 text-slate-400" />
            </form>

            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative cursor-pointer rounded-xl p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 z-50 mt-2 w-80 rounded-2xl border border-slate-200 bg-white py-3 shadow-lg">
                  <div className="flex items-center justify-between border-b border-slate-100 px-4 pb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Live Operational Events
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowNotifications(false)}
                      className="cursor-pointer text-slate-400 hover:text-slate-600"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-6 text-xs text-slate-500">No events logged yet.</div>
                    ) : (
                      notifications.map((notification) => (
                        <div key={notification.id} className="px-4 py-3">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="text-xs font-semibold text-slate-900">{notification.title}</div>
                              <div className="mt-1 text-[11px] text-slate-600">{notification.message}</div>
                            </div>
                            <span className="text-[10px] text-slate-400">{notification.time}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Active Portal Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowRoleDropdown((current) => !current)}
                className={`inline-flex cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors ${roleMeta[role].badgeColor}`}
              >
                {roleMeta[role].icon}
                <span className="hidden sm:inline">
                  {currentUser ? currentUser.name.split(' ')[0] : roleMeta[role].label}
                </span>
                <ChevronDown className="h-3 w-3 opacity-60" />
              </button>

              {showRoleDropdown && (
                <div className="absolute right-0 z-50 mt-2 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                  <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Switch Active Portal:
                  </div>
                  {(['household', 'collector', 'admin', 'recycler'] as UserRole[]).map((roleOption) => (
                    <button
                      key={roleOption}
                      type="button"
                      onClick={() => {
                        setRole(roleOption);
                        setShowRoleDropdown(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition-colors cursor-pointer ${
                        role === roleOption ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {roleMeta[roleOption].icon}
                        <span>{roleMeta[roleOption].label}</span>
                      </span>
                      {role === roleOption && (
                        <span className="text-[10px] text-emerald-700 font-mono">Active</span>
                      )}
                    </button>
                  ))}

                  {currentUser && (
                    <div className="mt-2 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setShowRoleDropdown(false);
                        }}
                        className="flex w-full items-center space-x-2 rounded-xl px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer font-medium"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out of Portal</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Portal Login / Switch Button */}
            {currentUser ? (
              <button
                type="button"
                onClick={logout}
                className="hidden sm:inline-flex items-center space-x-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 cursor-pointer"
                title="Sign out"
              >
                <LogOut className="w-3 h-3 text-slate-500" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenAuth}
                className="rounded-lg bg-[#173d35] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#285247] cursor-pointer"
              >
                Sign in
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
