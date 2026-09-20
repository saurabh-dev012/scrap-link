import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Truck, 
  Search, 
  ArrowRight, 
  QrCode, 
  CheckCircle2, 
  Leaf, 
  Users,
  Building2,
  Box,
  UserCheck,
  Rotate3d
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { Hero3DScene } from '../3d/Hero3DScene';
import { TiltCard3D } from '../ui/TiltCard3D';
import { IconPlate } from '../ui/IconPlate';

export const HeroSection: React.FC = () => {
  const { setActiveTab, viewWasteDetails, impactStats } = useApp();
  const [trackInput, setTrackInput] = useState('');
  const [viewMode, setViewMode] = useState<'3d' | 'partner'>('3d');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackInput.trim()) {
      viewWasteDetails(trackInput.trim().toUpperCase());
    } else {
      viewWasteDetails('KC-2026-004821');
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Actions (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            {/* Top Tag */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>National Circular Platform</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 font-hindi font-normal">कबाड़ीवाला कनेक्ट</span>
            </div>

            {/* Editorial Title */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.08]">
                Turn Waste <br />
                <span className="text-emerald-700 font-black">Into Verifiable Value.</span>
              </h1>
            </div>

            {/* Subtitle & Story */}
            <p className="text-base sm:text-lg text-slate-700 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Connect with verified doorstep collectors equipped with calibrated IoT scales. Transparent daily Mandi pricing, instant UPI Jan-Dhan settlement, and CPCB EPR traceable certificates.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <button
                type="button"
                onClick={() => setActiveTab('schedule')}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-800/15 transition-all cursor-pointer hover:scale-[1.02]"
              >
                <Truck className="w-4 h-4" />
                <span>Schedule a Pickup</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => viewWasteDetails('KC-2026-004821')}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-sm transition-colors cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-emerald-700" />
                <span>Track Waste ID</span>
              </button>
            </div>

            {/* Quick Waste ID Tracking Bar */}
            <div className="pt-2">
              <form 
                onSubmit={handleTrackSubmit}
                className="max-w-md mx-auto lg:mx-0 flex items-center bg-slate-50 p-1.5 rounded-xl border border-slate-300 focus-within:border-emerald-700 focus-within:bg-white transition-all shadow-2xs"
              >
                <Search className="w-4 h-4 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Enter Waste ID e.g. KC-2026-004821"
                  value={trackInput}
                  onChange={(e) => setTrackInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm font-mono focus:outline-hidden bg-transparent uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer shrink-0"
                >
                  Track Trace
                </button>
              </form>

              {/* Sample Trace IDs */}
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-[11px] text-slate-500 mt-2 font-mono">
                <span className="font-sans text-slate-400">Sample Records:</span>
                <button 
                  type="button"
                  onClick={() => viewWasteDetails('KC-2026-004821')}
                  className="text-emerald-700 hover:underline font-semibold cursor-pointer"
                >
                  KC-2026-004821
                </button>
                <span>•</span>
                <button 
                  type="button"
                  onClick={() => viewWasteDetails('KC-2026-008314')}
                  className="text-emerald-700 hover:underline font-semibold cursor-pointer"
                >
                  KC-2026-008314
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs text-slate-600">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Legal Metrology Class-III Scales</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Middleman Deductions</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>CPCB Verified EPR Trail</span>
              </span>
            </div>
          </motion.div>

          {/* Right Column: 3D Interactive WebGL Scene & Switcher (6 cols) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            {/* View Mode Toggle */}
            <div className="flex items-center justify-end space-x-2 mb-3">
              <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex items-center space-x-1 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setViewMode('3d')}
                  className={`px-3 py-1 rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer ${
                    viewMode === '3d'
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Rotate3d className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Interactive 3D Matrix</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('partner')}
                  className={`px-3 py-1 rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer ${
                    viewMode === 'partner'
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Partner ID Card</span>
                </button>
              </div>
            </div>

            <div className="relative mx-auto max-w-md lg:max-w-none">
              <AnimatePresence mode="wait">
                {viewMode === '3d' ? (
                  <motion.div
                    key="3d-scene"
                    initial={{ opacity: 0, rotateY: -8 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 8 }}
                    transition={{ duration: 0.35 }}
                  >
                    <Hero3DScene />
                  </motion.div>
                ) : (
                  <motion.div
                    key="partner-card"
                    initial={{ opacity: 0, rotateY: 8 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: -8 }}
                    transition={{ duration: 0.35 }}
                  >
                    <TiltCard3D depth={12}>
                      <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 shadow-xl">
                        <img 
                          src="https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&q=80&w=900" 
                          alt="Formalized Green Waste Collector Partner in Delhi NCR" 
                          className="w-full h-[440px] sm:h-[480px] object-cover object-center opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                        {/* Partner ID Overlay */}
                        <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-700 text-white space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <img 
                                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=128" 
                                alt="Ramesh Kumar" 
                                className="w-11 h-11 rounded-xl object-cover border-2 border-emerald-400"
                              />
                              <div>
                                <div className="flex items-center space-x-1.5">
                                  <h4 className="text-sm font-bold text-white">Ramesh Kumar</h4>
                                  <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded font-semibold border border-emerald-500/30">
                                    e-Shram Verified ✓
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-300 font-mono">ID: KC-COL-004821 • Ward 31</p>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="text-sm text-emerald-400 font-black block font-mono">₹31,400/mo</span>
                              <span className="text-[10px] text-slate-400">Formal Jan-Dhan Pay</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TiltCard3D>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Floating Pill 1: Waste Recovered (Top-Left) */}
              <div className="absolute -top-3 -left-3 sm:-left-4 z-20">
                <TiltCard3D depth={8}>
                  <div className="bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200/90 shadow-lg flex items-center space-x-2.5">
                    <IconPlate 
                      icon={<Leaf className="w-4 h-4" />} 
                      variant="emerald" 
                      size="md" 
                    />
                    <div>
                      <div className="text-sm sm:text-base font-extrabold text-slate-900 font-mono">
                        <AnimatedCounter value={impactStats.totalWasteRecoveredKg} /> kg
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        Diverted from Landfill
                      </div>
                    </div>
                  </div>
                </TiltCard3D>
              </div>

              {/* Floating Pill 2: Formalized Collectors (Right-Middle) */}
              <div className="absolute top-28 -right-3 sm:-right-4 z-20">
                <TiltCard3D depth={8}>
                  <div className="bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200/90 shadow-lg flex items-center space-x-2.5">
                    <IconPlate 
                      icon={<Users className="w-4 h-4" />} 
                      variant="teal" 
                      size="md" 
                    />
                    <div>
                      <div className="text-sm sm:text-base font-extrabold text-slate-900 font-mono">
                        <AnimatedCounter value={impactStats.totalCollectorsConnected} />
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        Formalized Partners
                      </div>
                    </div>
                  </div>
                </TiltCard3D>
              </div>

              {/* Floating Pill 3: Recyclers (Bottom-Left) */}
              <div className="absolute -bottom-3 -left-3 sm:-left-4 z-20">
                <TiltCard3D depth={8}>
                  <div className="bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200/90 shadow-lg flex items-center space-x-2.5">
                    <IconPlate 
                      icon={<Building2 className="w-4 h-4" />} 
                      variant="indigo" 
                      size="md" 
                    />
                    <div>
                      <div className="text-sm sm:text-base font-extrabold text-slate-900 font-mono">
                        <AnimatedCounter value={impactStats.totalVerifiedRecyclers} /> Recyclers
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        CPCB EPR Authorized
                      </div>
                    </div>
                  </div>
                </TiltCard3D>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
