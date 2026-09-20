import React from 'react';
import { 
  Recycle, 
  ShieldCheck, 
  Award, 
  FileCheck, 
  ExternalLink, 
  Heart, 
  Globe2, 
  Cpu, 
  CheckCircle2 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-20 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges Bar */}
        <div className="bg-slate-800/80 rounded-2xl p-6 mb-12 border border-slate-700/60 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center border border-brand-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">CPCB EPR Compliant</h4>
              <p className="text-xs text-slate-400">Verifiable credits for plastic & e-waste</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">e-Shram Integration</h4>
              <p className="text-xs text-slate-400">Social security & insurance for collectors</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">Cryptographic Trail</h4>
              <p className="text-xs text-slate-400">SHA-256 tamper-evident waste hashes</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">Swachh Bharat 2.0</h4>
              <p className="text-xs text-slate-400">Aligned with Urban Circular Economy goals</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand story */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center text-white shadow-md">
                <Recycle className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Kabadiwala<span className="text-brand-400">Connect</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              Bringing India’s 4+ million unorganized scrap collectors into the formal recycling value chain through verifiable digital identity, transparent Mandi rates, doorstep IoT weighing, and end-to-end material traceability.
            </p>
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>All systems operational • Regional Hub: Delhi NCR</span>
            </div>
          </div>

          {/* Col 2: Platform */}
          <div>
            <h5 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setActiveTab('schedule')} className="hover:text-white transition-colors cursor-pointer">
                  Schedule Waste Pickup
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('trace')} className="hover:text-white transition-colors cursor-pointer">
                  Track Waste ID & QR
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('rates')} className="hover:text-white transition-colors cursor-pointer">
                  Today's Mandi Scrap Rates
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('impact')} className="hover:text-white transition-colors cursor-pointer">
                  Operational Telemetry Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: For Stakeholders */}
          <div>
            <h5 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Stakeholders</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setActiveTab('collector')} className="hover:text-white transition-colors cursor-pointer">
                  Kabadiwala Partner App
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('identity')} className="hover:text-white transition-colors cursor-pointer">
                  Digital Collector Identity
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('recycler')} className="hover:text-white transition-colors cursor-pointer">
                  Authorized Recycler Hub
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-white transition-colors cursor-pointer">
                  Municipal Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Compliance & Tech */}
          <div>
            <h5 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Governance</h5>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center space-x-1.5">
                <FileCheck className="w-3.5 h-3.5 text-brand-400" />
                <span>CPCB Plastic EPR Rules</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <FileCheck className="w-3.5 h-3.5 text-brand-400" />
                <span>E-Waste Management 2022</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <FileCheck className="w-3.5 h-3.5 text-brand-400" />
                <span>e-Shram Social Security</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <FileCheck className="w-3.5 h-3.5 text-brand-400" />
                <span>UPI Jan-Dhan Direct Pay</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Kabadiwala Connect. Aligned with MoHUA & CPCB Circular Economy Framework.</p>
          <div className="flex items-center space-x-1">
            <span>Engineering a Zero-Landfill India</span>
            <Heart className="w-3.5 h-3.5 text-red-500 inline fill-red-500" />
            <span>via Circular Inclusion</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

