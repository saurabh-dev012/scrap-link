import React, { useState } from 'react';
import { 
  Home, 
  Truck, 
  Warehouse, 
  Factory, 
  QrCode, 
  Scale, 
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { IconPlate, IconVariant } from '../ui/IconPlate';

export const HowItWorks: React.FC = () => {
  const { setActiveTab } = useApp();
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps: {
    stepNumber: string;
    title: string;
    tagline: string;
    icon: React.ReactNode;
    variant: IconVariant;
    badge: string;
    features: string[];
    actor: string;
  }[] = [
    {
      stepNumber: '01',
      title: 'Request Pickup',
      tagline: 'Households submit recyclable scrap details.',
      icon: <Home className="w-5 h-5" />,
      variant: 'emerald',
      badge: 'Household Origin',
      features: [
        'Multi-category scrap picker (Paper, Plastics, Metals, E-Waste)',
        'Real-time valuation calculated from wholesale Mandi scrap indices',
        'Preferred pickup date & convenient 2-hour doorstep arrival slot',
        'Address geo-tagging with local municipal ward identification'
      ],
      actor: 'Household / Commercial Generator'
    },
    {
      stepNumber: '02',
      title: 'Collector Matched',
      tagline: 'The system finds a nearby verified collector.',
      icon: <Truck className="w-5 h-5" />,
      variant: 'teal',
      badge: 'Micro-Logistics',
      features: [
        'Matches nearest verified partner within 1.5 - 3 km',
        'Aadhaar & Ministry of Labour e-Shram credentials authenticated',
        'Route allocation directly to partner eliminating local middlemen',
        'Collector partner arrives with electric hydraulic loader (e-Loader)'
      ],
      actor: 'Formalized Kabadiwala Partner'
    },
    {
      stepNumber: '03',
      title: 'Waste Tracked',
      tagline: 'Every pickup receives a unique Waste ID / QR code.',
      icon: <QrCode className="w-5 h-5" />,
      variant: 'indigo',
      badge: 'Cryptographic Origin',
      features: [
        'Legal Metrology certified Class-III digital scale input',
        'Instant digital UPI Jan-Dhan payout to citizen without deductions',
        'Unique Waste ID (e.g. KC-2026-004821) and dynamic QR generated',
        'Digital receipt recorded on immutable chain-of-custody ledger'
      ],
      actor: 'Calibrated Scale & Ledger'
    },
    {
      stepNumber: '04',
      title: 'Verified Recycling',
      tagline: 'The recycling journey is recorded until the material reaches a verified recycler.',
      icon: <Factory className="w-5 h-5" />,
      variant: 'amber',
      badge: 'Industrial Circularity',
      features: [
        'Intake at Municipal Material Recovery Facility (MRF) sorting hub',
        'Secondary density grading & contaminant removal verification',
        'Baled & dispatched to State Pollution Control Board licensed mills',
        'CPCB Extended Producer Responsibility (EPR) Certificate issued'
      ],
      actor: 'Authorized Reprocessors'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-3 py-0.5 rounded-md border border-emerald-200">
            System Architecture
          </span>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            How Kabadiwala Connect Works
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed">
            A 4-step formalization pipeline connecting citizen scrap generators to verified industrial reprocessors.
          </p>

          {/* Simple Linear Flow Strip */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-700">
            <span className="px-3 py-1 bg-white rounded-lg border border-slate-200 shadow-2xs">
              Household
            </span>
            <span className="text-slate-400">→</span>
            <span className="px-3 py-1 bg-white rounded-lg border border-slate-200 shadow-2xs">
              Kabadiwala Partner
            </span>
            <span className="text-slate-400">→</span>
            <span className="px-3 py-1 bg-white rounded-lg border border-slate-200 shadow-2xs">
              Sorting Facility (MRF)
            </span>
            <span className="text-slate-400">→</span>
            <span className="px-3 py-1 bg-white rounded-lg border border-slate-200 shadow-2xs">
              Industrial Recycler
            </span>
          </div>
        </div>

        {/* 4 Process Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {steps.map((s, index) => {
            const isSelected = activeStep === index + 1;
            return (
              <motion.div
                key={s.stepNumber}
                onClick={() => setActiveStep(index + 1)}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className={`group rounded-2xl p-5 transition-all cursor-pointer border relative ${
                  isSelected 
                    ? 'border-emerald-600 bg-white shadow-md ring-2 ring-emerald-500/20' 
                    : 'border-slate-200/90 bg-white hover:border-slate-300 shadow-2xs hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-slate-300 font-mono group-hover:text-slate-400 transition-colors">
                    {s.stepNumber}
                  </span>
                  <IconPlate 
                    icon={s.icon} 
                    variant={s.variant} 
                    size="md" 
                  />
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1 tracking-tight">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed min-h-[34px]">
                  {s.tagline}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-medium font-mono text-[10px] uppercase tracking-wider">{s.badge}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-colors ${
                    isSelected 
                      ? 'bg-emerald-700 text-white shadow-xs' 
                      : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                  }`}>
                    {isSelected ? 'Active Phase' : 'Inspect'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Clean Inspection Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <div className="text-xs font-mono font-semibold text-emerald-800 uppercase tracking-wider">
                Phase {steps[activeStep - 1].stepNumber}: {steps[activeStep - 1].badge}
              </div>
              
              <h3 className="text-xl font-extrabold text-slate-900">
                {steps[activeStep - 1].title} — Protocols & Standards
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {steps[activeStep - 1].tagline} Operations and civic verifications enforced at this stage:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {steps[activeStep - 1].features.map((f, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-50 p-5 rounded-xl border border-slate-200 text-center space-y-3">
              <span className="text-xs font-bold text-slate-800 block">Try This Step Live</span>
              <p className="text-xs text-slate-500">
                Experience each stage of this workflow interactively on the platform.
              </p>
              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={() => setActiveTab('schedule')}
                  className="w-full py-2 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors cursor-pointer"
                >
                  Schedule Household Pickup
                </button>
                <button
                  onClick={() => setActiveTab('trace')}
                  className="w-full py-2 px-3 rounded-lg bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs border border-slate-300 transition-colors cursor-pointer"
                >
                  View Waste Ledger
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
