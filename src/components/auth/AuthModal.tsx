import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  ShieldCheck, 
  User, 
  Truck, 
  Building2, 
  Lock, 
  ArrowRight, 
  CheckCircle2,
  KeyRound,
  FileCheck2
} from 'lucide-react';
import { useApp, AuthUser } from '../../context/AppContext';
import { UserRole } from '../../types';
import { IconPlate } from '../ui/IconPlate';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: UserRole;
}

const PRESET_ACCOUNTS: Record<UserRole, AuthUser> = {
  household: {
    id: 'HH-DEL-1092',
    name: 'Priya Sharma',
    phone: '+91 98712 30044',
    role: 'household',
    subtitle: 'Citizen Scrap Seller • Barakhamba Road',
    ward: 'NDMC Ward 31 (Central Delhi)'
  },
  collector: {
    id: 'KC-COL-004821',
    name: 'Ramesh Kumar',
    phone: '+91 98112 40912',
    role: 'collector',
    subtitle: 'Formalized e-Shram Partner • e-Loader DL 1ER 4492',
    ward: 'NDMC Ward 31 Depot',
    eShramNo: '1009 8841 9021',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=256'
  },
  admin: {
    id: 'NDMC-ADM-004',
    name: 'Dr. Rajesh Verma',
    phone: '+91 98100 99000',
    role: 'admin',
    subtitle: 'Municipal Sanitation Officer • SBM-Urban 2.0',
    ward: 'NDMC ULB Headquarters'
  },
  recycler: {
    id: 'REC-DEL-001',
    name: 'GreenTerra Polymers',
    phone: '+91 99110 02233',
    role: 'recycler',
    subtitle: 'CPCB Reg: DL-EPR-2024-001 • Okhla Industrial Phase II',
    ward: 'Okhla Sorting Sector'
  }
};

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialRole = 'household' }) => {
  const { login } = useApp();

  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [inputValue, setInputValue] = useState('9871230044');
  const [credentialCode, setCredentialCode] = useState('4821');
  const [step, setStep] = useState<'input' | 'verify'>('input');

  if (!isOpen) return null;

  const handleRoleSelect = (r: UserRole) => {
    setSelectedRole(r);
    setStep('input');
    if (r === 'household') {
      setInputValue('9871230044');
      setCredentialCode('4821');
    } else if (r === 'collector') {
      setInputValue('1009 8841 9021');
      setCredentialCode('4492');
    } else if (r === 'admin') {
      setInputValue('rajesh.verma@ndmc.gov.in');
      setCredentialCode('9000');
    } else {
      setInputValue('CPCB/PWM/EPR/2024/001');
      setCredentialCode('2233');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'input') {
      setStep('verify');
    } else {
      const user = PRESET_ACCOUNTS[selectedRole];
      login(user);
      onClose();
    }
  };

  const handleQuickLogin = (roleToLogin: UserRole) => {
    const user = PRESET_ACCOUNTS[roleToLogin];
    login(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">
            Access Verification & Role Selection
          </span>
          <h2 className="text-xl font-extrabold text-white">
            Choose Your Portal
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Log in to your specialized dashboard with real-time operational sync.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            
            {/* Tab 1: Household */}
            <button
              type="button"
              onClick={() => handleRoleSelect('household')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                selectedRole === 'household'
                  ? 'border-emerald-600 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-500'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <IconPlate 
                icon={<User className="w-4 h-4" />} 
                variant="emerald" 
                size="sm" 
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Customer</span>
                <span className="text-[10px] text-slate-500 block">Sell Scrap</span>
              </div>
            </button>

            {/* Tab 2: Collector */}
            <button
              type="button"
              onClick={() => handleRoleSelect('collector')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                selectedRole === 'collector'
                  ? 'border-teal-600 bg-teal-50/50 shadow-xs ring-1 ring-teal-500'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <IconPlate 
                icon={<Truck className="w-4 h-4" />} 
                variant="teal" 
                size="sm" 
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Collector</span>
                <span className="text-[10px] text-slate-500 block">e-Shram Field</span>
              </div>
            </button>

            {/* Tab 3: Admin */}
            <button
              type="button"
              onClick={() => handleRoleSelect('admin')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                selectedRole === 'admin'
                  ? 'border-purple-600 bg-purple-50/50 shadow-xs ring-1 ring-purple-500'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <IconPlate 
                icon={<ShieldCheck className="w-4 h-4" />} 
                variant="purple" 
                size="sm" 
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Municipal</span>
                <span className="text-[10px] text-slate-500 block">ULB Admin</span>
              </div>
            </button>

            {/* Tab 4: Recycler */}
            <button
              type="button"
              onClick={() => handleRoleSelect('recycler')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                selectedRole === 'recycler'
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-1 ring-indigo-500'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <IconPlate 
                icon={<Building2 className="w-4 h-4" />} 
                variant="indigo" 
                size="sm" 
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Recycler</span>
                <span className="text-[10px] text-slate-500 block">CPCB Mill</span>
              </div>
            </button>

          </div>

          {/* Form Content tailored to selected role */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            
            {step === 'input' ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {selectedRole === 'household' && 'Indian Mobile Number'}
                    {selectedRole === 'collector' && 'e-Shram UAN or Partner ID'}
                    {selectedRole === 'admin' && 'Official Municipal Email / Staff ID'}
                    {selectedRole === 'recycler' && 'CPCB EPR Registration Number'}
                  </label>
                  
                  <div className="relative">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      required
                      placeholder={
                        selectedRole === 'household' ? 'e.g. 9871230044' :
                        selectedRole === 'collector' ? 'e.g. 1009 8841 9021' :
                        selectedRole === 'admin' ? 'e.g. rajesh.verma@ndmc.gov.in' :
                        'e.g. CPCB/PWM/EPR/2024/001'
                      }
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-900 focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-all"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    {selectedRole === 'household' && 'We will send a 4-digit one-time code to authenticate your doorstep pickup ledger.'}
                    {selectedRole === 'collector' && 'Verified against Ministry of Labour & Employment e-Shram database.'}
                    {selectedRole === 'admin' && 'Authenticated via Municipal Corporation Government Single Sign-On (SSO).'}
                    {selectedRole === 'recycler' && 'Authenticated via CPCB Central EPR Portal authorization key.'}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono block">Authenticating Identity:</span>
                  <span className="text-xs font-mono font-bold text-slate-800 block">{inputValue}</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Enter Verification Security PIN
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={credentialCode}
                    onChange={(e) => setCredentialCode(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-center text-sm font-mono tracking-widest text-slate-900 focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-all"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block text-center">
                    Default verification code: {credentialCode || '4821'}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setStep('input')}
                    className="w-1/3 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Enter {selectedRole.toUpperCase()} Portal</span>
                  </button>
                </div>
              </div>
            )}

          </form>

          {/* 1-Click Persona Shortcuts */}
          <div className="pt-4 border-t border-slate-100">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
              Instant Persona Switcher:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('household')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-left border border-slate-200 transition-colors cursor-pointer group"
              >
                <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-800">Priya Sharma</div>
                <div className="text-[10px] text-slate-500 font-mono">Customer Portal →</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('collector')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50 text-left border border-slate-200 transition-colors cursor-pointer group"
              >
                <div className="text-xs font-bold text-slate-800 group-hover:text-teal-800">Ramesh Kumar</div>
                <div className="text-[10px] text-slate-500 font-mono">Collector Field App →</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 text-left border border-slate-200 transition-colors cursor-pointer group"
              >
                <div className="text-xs font-bold text-slate-800 group-hover:text-purple-800">Dr. Rajesh Verma</div>
                <div className="text-[10px] text-slate-500 font-mono">Municipal Admin →</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('recycler')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50 text-left border border-slate-200 transition-colors cursor-pointer group"
              >
                <div className="text-xs font-bold text-slate-800 group-hover:text-indigo-800">GreenTerra Polymers</div>
                <div className="text-[10px] text-slate-500 font-mono">Recycler Hub →</div>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
