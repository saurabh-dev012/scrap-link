import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Scale, 
  Truck, 
  ShieldCheck, 
  ArrowUpRight, 
  CheckCircle2, 
  Building2, 
  ArrowRight,
  Radio,
  Cpu
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { IconPlate } from '../ui/IconPlate';
import { TiltCard3D } from '../ui/TiltCard3D';

interface MiniEvent {
  id: string;
  time: string;
  ward: string;
  material: string;
  weight: number;
  payout: number;
  hub: string;
}

const STREAM_EVENTS: MiniEvent[] = [
  { id: 'KC-2026-004821', time: 'Just now', ward: 'Ward 31 (Barakhamba)', material: 'PET Flakes (rPET)', weight: 28.5, payout: 684, hub: 'Pragati Maidan MRF' },
  { id: 'KC-2026-008314', time: '2m ago', ward: 'Ward 28 (Lutyens Delhi)', material: 'Millberry Copper Wire', weight: 14.2, payout: 9869, hub: 'Okhla Industrial Phase II' },
  { id: 'KC-2026-009142', time: '5m ago', ward: 'Ward 44 (Hauz Khas)', material: 'Corrugated Cardboard (OCC)', weight: 46.0, payout: 483, hub: 'South Delhi MRF' },
  { id: 'KC-2026-009840', time: '8m ago', ward: 'Ward 12 (Karol Bagh)', material: 'Extruded Aluminium Billet', weight: 31.8, payout: 4452, hub: 'Mayapuri Sorting Yard' },
  { id: 'KC-2026-010452', time: '11m ago', ward: 'Ward 08 (Rohini Sec 7)', material: 'HDPE Rigid Drums', weight: 52.0, payout: 1560, hub: 'North Delhi Recovery Hub' }
];

export const LiveTelemetryPreview: React.FC = () => {
  const { setActiveTab } = useApp();
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % STREAM_EVENTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const currentEvent = STREAM_EVENTS[activeIdx];

  return (
    <section className="py-16 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE MUNICIPAL INTAKE TELEMETRY</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">DELHI NCR REGION</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Real-Time Verification & Weigh-In Feed
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Eliminating guesswork with transparent digital logs. Every doorstep transaction transmits verifiable scale weight, GPS ward coordinates, and immediate direct settlement.
            </p>
          </div>

          <div>
            <button
              onClick={() => setActiveTab('impact')}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-semibold transition-all cursor-pointer hover:border-emerald-500/40"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Open Operational Hub</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* 2-Column HUD Layout: Left Live Stream, Right Calibrated Telemetry Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left: Live Doorstep Weigh-in Broadcast Card */}
          <div className="lg:col-span-7">
            <TiltCard3D depth={8} glareColor="rgba(16, 185, 129, 0.1)">
              <div className="bg-slate-950/90 rounded-3xl p-6 border border-slate-800/90 shadow-2xl h-full flex flex-col justify-between space-y-6">
                
                {/* HUD Top Bar */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                  <div className="flex items-center space-x-3">
                    <IconPlate 
                      icon={<Radio className="w-4 h-4 text-emerald-400 animate-pulse" />} 
                      variant="dark" 
                      size="md" 
                    />
                    <div>
                      <div className="text-xs font-mono font-bold text-white flex items-center space-x-2">
                        <span>DOORSTEP WEIGH-IN EVENT</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
                          BROADCAST
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        Hardware Node ID: IOT-SCALE-DEL-334
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-emerald-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                    {currentEvent.time}
                  </span>
                </div>

                {/* Main Dynamic Intake Highlight */}
                <motion.div 
                  key={currentEvent.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                        Material Grade & Classification
                      </span>
                      <h4 className="text-lg font-bold text-white mt-0.5">
                        {currentEvent.material}
                      </h4>
                      <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono mt-1">
                        <span>{currentEvent.ward}</span>
                        <span>•</span>
                        <span className="text-emerald-400">{currentEvent.hub}</span>
                      </div>
                    </div>

                    <div className="text-left sm:text-right bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">Certified Weight</span>
                      <div className="text-2xl font-black text-white font-mono">
                        {currentEvent.weight.toFixed(1)} <span className="text-xs font-normal text-slate-400">kg</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono">Net Tare Auto-Deducted</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Waste ID</span>
                      <span className="text-slate-300 font-semibold">{currentEvent.id}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Instant Payout</span>
                      <span className="text-teal-300 font-bold">₹{currentEvent.payout.toLocaleString('en-IN')} (UPI)</span>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <span className="text-[10px] text-slate-500 block">Ledger Verification</span>
                      <span className="text-emerald-400 flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>SHA-256 Synced</span>
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Cycle indicator dots */}
                <div className="flex items-center justify-between text-xs text-slate-500 font-mono pt-1">
                  <span>Stream Buffer: 5 verified transactions</span>
                  <div className="flex items-center space-x-1.5">
                    {STREAM_EVENTS.map((ev, i) => (
                      <button
                        key={ev.id}
                        onClick={() => setActiveIdx(i)}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          i === activeIdx ? 'w-6 bg-emerald-400' : 'w-2 bg-slate-700 hover:bg-slate-600'
                        }`}
                        title={ev.id}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </TiltCard3D>
          </div>

          {/* Right: 4 Practical Engineering Metrics */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Metric 1: Verified Intake */}
            <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <IconPlate 
                  icon={<Scale className="w-4 h-4 text-emerald-400" />} 
                  variant="dark" 
                  size="md" 
                />
                <span className="text-[10px] font-mono text-emerald-400 uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Daily Intake
                </span>
              </div>
              <div>
                <div className="text-2xl font-black text-white font-mono">
                  4,892.4 <span className="text-xs font-normal text-slate-400 font-sans">kg</span>
                </div>
                <div className="text-xs font-semibold text-slate-300 mt-0.5">
                  Landfill Diverted Today
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-1">
                  Across 324 calibrated digital scales
                </div>
              </div>
            </div>

            {/* Metric 2: Legal Metrology Accuracy */}
            <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <IconPlate 
                  icon={<ShieldCheck className="w-4 h-4 text-teal-400" />} 
                  variant="dark" 
                  size="md" 
                />
                <span className="text-[10px] font-mono text-teal-400 uppercase bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                  Accuracy
                </span>
              </div>
              <div>
                <div className="text-2xl font-black text-white font-mono">
                  99.95%
                </div>
                <div className="text-xs font-semibold text-slate-300 mt-0.5">
                  Class-III Precision
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-1">
                  Govt Certificate: IND/09/21/334
                </div>
              </div>
            </div>

            {/* Metric 3: Middleman Margin Removed */}
            <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <IconPlate 
                  icon={<Cpu className="w-4 h-4 text-amber-400" />} 
                  variant="dark" 
                  size="md" 
                />
                <span className="text-[10px] font-mono text-amber-400 uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Zero Deductions
                </span>
              </div>
              <div>
                <div className="text-2xl font-black text-white font-mono">
                  100%
                </div>
                <div className="text-xs font-semibold text-slate-300 mt-0.5">
                  Direct Jan-Dhan Payout
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-1">
                  0% platform cuts on doorstep scrap
                </div>
              </div>
            </div>

            {/* Metric 4: Reprocessor Consignments */}
            <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <IconPlate 
                  icon={<Building2 className="w-4 h-4 text-indigo-400" />} 
                  variant="dark" 
                  size="md" 
                />
                <span className="text-[10px] font-mono text-indigo-400 uppercase bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  Industrial
                </span>
              </div>
              <div>
                <div className="text-2xl font-black text-white font-mono">
                  14 Bales
                </div>
                <div className="text-xs font-semibold text-slate-300 mt-0.5">
                  CPCB Recycler Dispatches
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-1">
                  Secondary polymer & metal feedstock
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
