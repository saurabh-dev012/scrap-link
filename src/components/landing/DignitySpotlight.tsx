import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  ShieldCheck, 
  Smartphone, 
  CreditCard, 
  ArrowRight,
  HeartHandshake,
  CheckCircle2,
  Sparkles,
  Truck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TiltCard3D } from '../ui/TiltCard3D';
import { IconPlate } from '../ui/IconPlate';

export const DignitySpotlight: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: 3D Holographic Collector Identity Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm">
              <TiltCard3D depth={14} glareColor="rgba(52, 211, 153, 0.2)">
                <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-7 border border-slate-700/80 shadow-2xl space-y-4 relative overflow-hidden">
                  
                  {/* Holographic Watermark Glow */}
                  <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">🇮🇳</span>
                      <div>
                        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-100">
                          Formalized Collector Card
                        </h4>
                        <p className="text-[10px] text-emerald-400 font-mono">
                          MoHUA & SBM-Urban 2.0
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      Active Partner ✓
                    </span>
                  </div>

                  {/* Profile */}
                  <div className="flex items-center space-x-3.5">
                    <img 
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=256" 
                      alt="Ramesh Kumar" 
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-white">Ramesh Kumar</h3>
                      <p className="text-xs text-slate-300 font-mono">ID: KC-COL-004821</p>
                      <div className="flex items-center space-x-1.5 text-xs text-amber-400 mt-0.5">
                        <span>⭐ 4.88 Rating</span>
                        <span className="text-slate-400 font-sans">• 386 Pickups</span>
                      </div>
                    </div>
                  </div>

                  {/* Credentials */}
                  <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 text-xs font-mono space-y-1.5 text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">e-Shram UAN:</span>
                      <span className="text-white font-bold">1009 8841 9021</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">ABHA PM-JAY:</span>
                      <span className="text-emerald-400 font-bold">14-8921-4402-1920</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Assigned Hub:</span>
                      <span className="text-slate-200">NDMC Ward 31 Depot</span>
                    </div>
                  </div>

                  {/* Operational Metrics */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1 font-mono">
                    <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                      <span className="text-[10px] text-slate-400 font-sans block">Net Intake</span>
                      <span className="font-bold text-emerald-400 text-sm">12.4 T</span>
                    </div>
                    <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                      <span className="text-[10px] text-slate-400 font-sans block">Tare Accuracy</span>
                      <span className="font-bold text-teal-400 text-sm">99.9%</span>
                    </div>
                    <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                      <span className="text-[10px] text-slate-400 font-sans block">Direct Payout</span>
                      <span className="font-bold text-white text-sm">₹31,400</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTab('identity')}
                    className="w-full py-2.5 text-center text-xs font-semibold text-emerald-300 hover:text-emerald-200 bg-slate-800/90 hover:bg-slate-700 rounded-xl border border-slate-700 transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                  >
                    <span>View Accreditation Certificate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </TiltCard3D>
            </div>
          </div>

          {/* Right Column: Narrative & Real-world Pillars */}
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-3 py-0.5 rounded-md border border-emerald-200">
              Socio-Economic Inclusion
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Bringing Informal Heroes Into the Formal Circular Chain
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed">
              India produces over 62 million tonnes of municipal solid waste annually. Despite doing 80% of urban recycling legwork, informal waste collectors have historically operated without legal standing, transparent pricing, or social protection.
            </p>

            <div className="space-y-3 pt-1">
              <motion.div 
                whileHover={{ x: 4 }}
                className="flex items-start space-x-3.5 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs transition-all group"
              >
                <IconPlate 
                  icon={<ShieldCheck className="w-4 h-4" />} 
                  variant="emerald" 
                  size="md" 
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Legal Dignity & Social Security</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Official photo identity cards linked to the Ministry of Labour’s <strong>e-Shram</strong> portal and ₹5 Lakh Ayushman Bharat PM-JAY medical insurance.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 4 }}
                className="flex items-start space-x-3.5 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs transition-all group"
              >
                <IconPlate 
                  icon={<CreditCard className="w-4 h-4" />} 
                  variant="teal" 
                  size="md" 
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">30%+ Income Uplift via Direct Mandi Index</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Eliminating predatory scrap aggregators. Collectors receive calibrated digital scales, transparent scrap commodity pricing, and direct UPI transfers.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 4 }}
                className="flex items-start space-x-3.5 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs transition-all group"
              >
                <IconPlate 
                  icon={<Truck className="w-4 h-4" />} 
                  variant="indigo" 
                  size="md" 
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Municipal Integration & Route Optimization</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Authorized municipal wards route local E-Loaders directly to households, aggregating sorted materials at designated NDMC Material Recovery Facilities (MRFs).
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
