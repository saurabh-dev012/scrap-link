import React from 'react';
import { 
  ShieldCheck, 
  QrCode, 
  FileCheck, 
  Clock, 
  CheckCircle2, 
  Building2, 
  Cpu, 
  Lock, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { IconPlate, IconVariant } from '../ui/IconPlate';

export const TrustSection: React.FC = () => {
  const { setActiveTab } = useApp();

  const trustFeatures: {
    title: string;
    desc: string;
    icon: React.ReactNode;
    variant: IconVariant;
  }[] = [
    {
      title: 'Verified Collectors',
      desc: '100% background-verified through Aadhaar & e-Shram credentials. Equipped with calibrated digital scales.',
      icon: <ShieldCheck className="w-5 h-5" />,
      variant: 'emerald'
    },
    {
      title: 'Verified Recyclers',
      desc: 'Only authorized industrial recycling plants holding valid State Pollution Control Board & CPCB permits.',
      icon: <Building2 className="w-5 h-5" />,
      variant: 'teal'
    },
    {
      title: 'QR-Based Waste IDs',
      desc: 'Every pickup gets a unique tamper-evident cryptographic QR code tracking waste from doorstep to pellet.',
      icon: <QrCode className="w-5 h-5" />,
      variant: 'indigo'
    },
    {
      title: 'Digital Collection Records',
      desc: 'Instant immutable weight receipts and UPI Jan-Dhan payout records saved to both citizen and partner ledgers.',
      icon: <FileCheck className="w-5 h-5" />,
      variant: 'amber'
    },
    {
      title: 'Transparent Pickup History',
      desc: 'Full visibility on time, weight, price breakdown, and GPS-tagged collection routes with zero hidden fees.',
      icon: <Clock className="w-5 h-5" />,
      variant: 'cyan'
    },
    {
      title: 'Recycling Verification',
      desc: 'Final proof-of-recycling certificate issued with SHA-256 hash eligible for corporate EPR compliance credits.',
      icon: <CheckCircle2 className="w-5 h-5" />,
      variant: 'emerald'
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5 text-emerald-700" />
            <span>Guaranteed Integrity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Built on Trust & Traceability
          </h2>
          <p className="text-base text-slate-600">
            A reliable digital backbone guaranteeing that every single kilogram collected is ethically handled, fairly compensated, and legitimately recycled.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {trustFeatures.map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/90 hover:bg-white hover:border-emerald-500/30 hover:shadow-md transition-all group"
            >
              <div className="flex items-center space-x-3.5 mb-3">
                <IconPlate 
                  icon={f.icon} 
                  variant={f.variant} 
                  size="md" 
                />
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  {f.title}
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Digital Public Infrastructure Highlight Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 text-brand-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>National Digital Public Infrastructure (DPI)</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Experience the Cryptographic Waste Tracking Ledger
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Inspect an active waste journey from doorstep booking to certified polymer pellet re-granulation.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => setActiveTab('trace')}
              className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer flex items-center space-x-2 shadow-lg shadow-brand-500/20"
            >
              <span>Explore Live Traceability</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

