import React from 'react';
import { Home, Truck, Search, Activity, User, Sparkles } from 'lucide-react';
import { useApp, AppTab } from '../../context/AppContext';

interface BottomNavProps {
  onOpenAuth: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ onOpenAuth }) => {
  const { activeTab, setActiveTab, role } = useApp();

  const getProfileTab = (): AppTab => {
    if (role === 'collector') return 'identity';
    if (role === 'recycler') return 'recycler';
    if (role === 'admin') return 'admin';
    return 'collector';
  };

  const tabs: { id: AppTab; label: string; icon: React.ReactNode; isAction?: boolean }[] = [
    { id: 'landing', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'schedule', label: 'Pickup', icon: <Truck className="w-5 h-5" /> },
    { id: 'trace', label: 'Track', icon: <Search className="w-5 h-5" /> },
    { id: 'impact', label: 'Telemetry', icon: <Activity className="w-5 h-5" /> },
    { id: getProfileTab(), label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-lg px-2 py-1.5">
      <div className="grid grid-cols-5 gap-1 items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 rounded-lg transition-all cursor-pointer ${
                isActive 
                  ? 'text-brand-600 font-semibold scale-105' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className={`p-1 rounded-full ${isActive ? 'bg-brand-50 text-brand-600' : ''}`}>
                {tab.icon}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

