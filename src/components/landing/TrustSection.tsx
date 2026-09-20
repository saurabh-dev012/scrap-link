import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, CheckCircle2, Clock, FileCheck, Lock, QrCode, ShieldCheck, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { IconPlate, IconVariant } from '../ui/IconPlate';

interface TrustFeature {
  title: string;
  desc: string;
  icon: React.ReactNode;
  variant: IconVariant;
}

export const TrustSection: React.FC = () => {
  const { setActiveTab } = useApp();

  const trustFeatures: TrustFeature[] = [
    {
      title: 'Verified Collectors',
      desc: '100% background-verified through Aadhaar and e-Shram credentials, with calibrated digital scales and performance checks.',
      icon: <ShieldCheck className="w-5 h-5" />,
      variant: 'emerald',
    },
    {
      title: 'Verified Recyclers',
      desc: 'Only authorized industrial processors with valid environmental licenses and compliance credentials are connected.',
      icon: <Building2 className="w-5 h-5" />,
      variant: 'teal',
    },
    {
      title: 'QR-Based Waste IDs',
      desc: 'Every pickup receives a unique digital waste identity and QR for traceability from doorstep to recycler.',
      icon: <QrCode className="w-5 h-5" />,
      variant: 'indigo',
    },
    {
      title: 'Digital Collection Records',
      desc: 'Immutable weight receipts and UPI or Jan-Dhan payouts create transparent, auditable records for all parties.',
      icon: <FileCheck className="w-5 h-5" />,
      variant: 'amber',
    },
    {
      title: 'Transparent Pickup History',
      desc: 'Each collection shows time, route, weight, price, and processing status with zero hidden deductions.',
      icon: <Clock className="w-5 h-5" />,
      variant: 'cyan',
    },
    {
      title: 'Recycling Verification',
      desc: 'The final certificate captures material processing proof and can support formal EPR reporting requirements.',
      icon: <CheckCircle2 className="w-5 h-5" />,
      variant: 'emerald',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5 text-emerald-700" />
            <span>Guaranteed Integrity</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Built on Trust & Traceability
          </h2>

          <p className="text-base text-slate-600">
            A reliable digital backbone that makes waste recovery transparent, fair, and compliant across the full chain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {trustFeatures.map((feature) => (
            <motion.div
              key={feature.title}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/90 hover:bg-white hover:border-emerald-500/30 hover:shadow-md transition-all group"
            >
              <div className="flex items-center space-x-3.5 mb-3">
                <IconPlate icon={feature.icon} variant={feature.variant} size="md" />
                <h3 className="text-base font-bold text-slate-900 tracking-tight">{feature.title}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>National Digital Public Infrastructure</span>
            </div>
            <h3 className="text-xl font-bold text-white">Experience the traceability ledger in action</h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Inspect a complete waste journey from household booking to verified material recovery and certification.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('trace')}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer flex items-center space-x-2 shadow-lg shadow-emerald-500/20"
            >
              <span>Explore live traceability</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

