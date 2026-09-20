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
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { setRole, addNotification } = useApp();

  const [selectedRole, setSelectedRole] = useState<UserRole>('household');
  const [phoneNumber, setPhoneNumber] = useState('9871230044');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otp, setOtp] = useState(['4', '8', '2', '1']);

  if (!isOpen) return null;

  const roleProfiles: Record<UserRole, { name: string; subtitle: string; icon: React.ReactNode; defaultPhone: string }> = {
    household: {
      name: 'Priya Sharma',
      subtitle: 'Resident • Barakhamba Road',
      icon: <User className="w-5 h-5 text-emerald-600" />,
      defaultPhone: '9871230044'
    },
    collector: {
      name: 'Ramesh Kumar',
      subtitle: 'e-Shram Partner • KC-COL-004821',
      icon: <Truck className="w-5 h-5 text-teal-600" />,
      defaultPhone: '9811240912'
    },
    recycler: {
      name: 'GreenTerra Circular Polymers',
      subtitle: 'CPCB Reg: DL-EPR-2024-001',
      icon: <Building2 className="w-5 h-5 text-indigo-600" />,
      defaultPhone: '9911002233'
    },
    admin: {
      name: 'Dr. Rajesh Verma',
      subtitle: 'NDMC Municipal Commissioner',
      icon: <ShieldCheck className="w-5 h-5 text-purple-600" />,
      defaultPhone: '9810099000'
    }
  };

  const handleRoleChange = (r: UserRole) => {
    setSelectedRole(r);
    setPhoneNumber(roleProfiles[r].defaultPhone);
  };

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);
    addNotification('Authentication Successful', `Logged in as ${roleProfiles[selectedRole].name} (${selectedRole}).`, 'success');
    onClose();
  };

  const handleQuickDemoLogin = (r: UserRole) => {
    setRole(r);
    addNotification('Active Role Changed', `Switched active role to ${roleProfiles[r].name}.`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 text-brand-400 text-xs font-mono uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Secure Citizen & Partner Portal</span>
          </div>

          <h2 className="text-xl font-extrabold text-white">
            Kabadiwala Connect Login
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Indian Mobile OTP & e-Shram Citizen Login
          </p>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Continue As Role Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Continue as:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['household', 'collector', 'recycler', 'admin'] as UserRole[]).map((r) => {
                const isSelected = selectedRole === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleRoleChange(r)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center space-x-2.5 ${
                      isSelected 
                        ? 'border-brand-500 bg-brand-50/50 shadow-xs' 
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="p-1.5 rounded-xl bg-slate-100 shrink-0">
                      {roleProfiles[r].icon}
                    </div>
                    <div className="truncate">
                      <div className="font-bold text-xs capitalize text-slate-900 truncate">
                        {r}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {roleProfiles[r].name.split(' ')[0]}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form: Step 1 (Phone) vs Step 2 (OTP) */}
          {step === 'phone' ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number / e-Shram ID
                </label>
                <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20">
                  <span className="px-3 py-2.5 bg-slate-50 text-slate-600 font-semibold text-xs border-r border-slate-300">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs font-mono tracking-wider focus:outline-hidden"
                    placeholder="Enter 10-digit number"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Get Verification OTP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="text-center space-y-1">
                <span className="text-xs text-slate-500">
                  Enter 4-digit OTP sent to <strong>+91 {phoneNumber}</strong>
                </span>
                <div className="flex justify-center space-x-2 pt-2">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const newOtp = [...otp];
                        newOtp[i] = e.target.value;
                        setOtp(newOtp);
                      }}
                      className="w-12 h-12 text-center text-lg font-bold font-mono border-2 border-brand-500 rounded-xl bg-brand-50/30 text-slate-900 focus:outline-hidden"
                    />
                  ))}
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold block pt-1">
                  Pre-filled Test OTP: 4821
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="px-3 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold cursor-pointer"
                >
                  Change No.
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                >
                  Verify & Enter Platform
                </button>
              </div>
            </form>
          )}

          {/* Quick 1-Click Role Switcher (Tutorial Mode) */}
          <div className="pt-4 border-t border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              1-Click Role Switcher (Tutorial Mode):
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('household')}
                className="p-2 rounded-lg bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 text-left font-medium transition-colors cursor-pointer"
              >
                ⚡ Household Citizen
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('collector')}
                className="p-2 rounded-lg bg-slate-50 hover:bg-teal-50 text-slate-700 hover:text-teal-800 border border-slate-200 text-left font-medium transition-colors cursor-pointer"
              >
                ⚡ Ramesh (Collector)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('recycler')}
                className="p-2 rounded-lg bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-800 border border-slate-200 text-left font-medium transition-colors cursor-pointer"
              >
                ⚡ GreenTerra (Recycler)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin')}
                className="p-2 rounded-lg bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-800 border border-slate-200 text-left font-medium transition-colors cursor-pointer"
              >
                ⚡ Municipal Admin
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

