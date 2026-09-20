import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Cpu, 
  Scale, 
  CreditCard, 
  Award, 
  ArrowRight,
  Lock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TiltCard3D } from '../ui/TiltCard3D';
import { IconPlate } from '../ui/IconPlate';

export const ModernBentoFeatures: React.FC = () => {
  const { setActiveTab } = useApp();
  const [liveHash, setLiveHash] = useState('0x8f2b3e41a998c772e0d49f61b0c8d76211e4a307');

  useEffect(() => {
    const interval = setInterval(() => {
      const hex = Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setLiveHash(`0x${hex}a998c772e0d49f61...${hex.slice(0, 4)}`);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-3 py-0.5 rounded-md border border-slate-200">
            Technical Architecture
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Institutionalizing Informal Recycling
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed">
            Eliminating leakages, scale tampering, and verification fraud with reliable civic technologies.
          </p>
        </div>

        {/* 3D Tilt Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6">
          
          {/* Card 1: Cryptographic Traceability Ledger (Col 7) */}
          <div className="lg:col-span-7">
            <TiltCard3D depth={10} glareColor="rgba(16, 185, 129, 0.15)">
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl flex flex-col justify-between h-full space-y-5">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <IconPlate 
                      icon={<Lock className="w-5 h-5 text-emerald-400" />} 
                      variant="dark" 
                      size="lg" 
                    />
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-800 text-emerald-300 border border-slate-700 flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>SHA-256 Immutable Proof</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Cryptographic Chain-of-Custody Ledger
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Every pickup logs an immutable hash digest tying citizen origin, collector GPS tag, sorting weight, and recycling certificate together.
                    </p>
                  </div>

                  {/* Terminal Simulation */}
                  <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-xs space-y-2 text-slate-300">
                    <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-slate-800 pb-2">
                      <span>LAST LEDGER COMMIT</span>
                      <span className="text-emerald-400 font-semibold">STATE: VERIFIED</span>
                    </div>
                    <div className="flex items-center space-x-2 text-emerald-300 font-semibold truncate pt-0.5">
                      <Cpu className="w-4 h-4 shrink-0 text-emerald-400" />
                      <span className="truncate">{liveHash}</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 pt-1">
                      <span>Standard: CPCB Parivesh EPR Schema</span>
                      <span>Gas: Zero-Fee Civic Layer</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActiveTab('trace')}
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center space-x-1.5 cursor-pointer"
                  >
                    <span>Inspect Active Waste Ledger</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </TiltCard3D>
          </div>

          {/* Card 2: Legal Metrology IoT Scale (Col 5) */}
          <div className="lg:col-span-5">
            <TiltCard3D depth={10} glareColor="rgba(6, 182, 212, 0.12)">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between h-full space-y-5">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <IconPlate 
                      icon={<Scale className="w-5 h-5" />} 
                      variant="teal" 
                      size="lg" 
                    />
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                      Approval: IND/09/21/334
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Legal Metrology Scale Verification
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Eliminates arbitrary weigh-in cuts. Calibrated Class-III digital scales transmit exact weight with automated tare compensation.
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-center space-y-0.5">
                    <span className="text-[10px] uppercase font-mono text-slate-500">Doorstep Scale Precision</span>
                    <div className="text-3xl font-extrabold text-slate-900 font-mono">
                      28.65 <span className="text-sm font-sans text-slate-500 font-normal">kg</span>
                    </div>
                    <span className="text-[11px] text-slate-500 block">
                      Tolerance: ±0.05% • Automatic Tare Compensated
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setActiveTab('collector')}
                    className="text-xs font-semibold text-teal-700 hover:text-teal-800 inline-flex items-center space-x-1.5 cursor-pointer"
                  >
                    <span>Open Collector Partner App</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </TiltCard3D>
          </div>

          {/* Card 3: 100% Direct Payouts (Col 4) */}
          <div className="lg:col-span-4">
            <TiltCard3D depth={10}>
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-2.5">
                  <IconPlate 
                    icon={<CreditCard className="w-5 h-5" />} 
                    variant="emerald" 
                    size="lg" 
                  />
                  <h3 className="text-base font-bold text-slate-900">
                    100% Direct Citizen Payout
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Zero middleman commissions. Payments disburse immediately via NPCI UPI / Jan-Dhan directly to generator and collector.
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1 font-mono">
                  <div className="flex justify-between text-slate-500">
                    <span>Platform Commission:</span>
                    <span className="text-emerald-700 font-bold">0% (Direct)</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Settlement Speed:</span>
                    <span className="text-slate-800 font-bold">Instant (T+0)</span>
                  </div>
                </div>
              </div>
            </TiltCard3D>
          </div>

          {/* Card 4: CPCB EPR Compliance (Col 4) */}
          <div className="lg:col-span-4">
            <TiltCard3D depth={10} glareColor="rgba(99, 102, 241, 0.12)">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-2.5">
                  <IconPlate 
                    icon={<Award className="w-5 h-5" />} 
                    variant="indigo" 
                    size="lg" 
                  />
                  <h3 className="text-base font-bold text-slate-900">
                    CPCB EPR Compliance Vault
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Authorized recyclers issue verified Extended Producer Responsibility credits conforming to Plastic Waste Management Rules 2022.
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1 font-mono">
                  <div className="flex justify-between text-slate-500">
                    <span>EPR Credits Minted:</span>
                    <span className="text-indigo-700 font-bold">5,140 Tons</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Audit Status:</span>
                    <span className="text-emerald-700 font-bold">CPCB Verified</span>
                  </div>
                </div>
              </div>
            </TiltCard3D>
          </div>

          {/* Card 5: Social Security & e-Shram (Col 4) */}
          <div className="lg:col-span-4">
            <TiltCard3D depth={10} glareColor="rgba(20, 184, 166, 0.12)">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-2.5">
                  <IconPlate 
                    icon={<ShieldCheck className="w-5 h-5" />} 
                    variant="teal" 
                    size="lg" 
                  />
                  <h3 className="text-base font-bold text-slate-900">
                    Social Security & Healthcare
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Formal onboarding links collectors with Ministry of Labour’s e-Shram UAN and Ayushman Bharat PM-JAY health insurance.
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1 font-mono">
                  <div className="flex justify-between text-slate-500">
                    <span>PM-JAY Coverage:</span>
                    <span className="text-emerald-700 font-bold">₹5 Lakh/family</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Accreditation:</span>
                    <span className="text-slate-800 font-bold">SBM-Urban 2.0</span>
                  </div>
                </div>
              </div>
            </TiltCard3D>
          </div>

        </div>

      </div>
    </section>
  );
};
