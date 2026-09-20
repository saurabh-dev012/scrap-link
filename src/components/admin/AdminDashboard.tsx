import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  FileCheck, 
  Search, 
  Check, 
  X, 
  ExternalLink,
  Sparkles,
  Award,
  TrendingUp
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminDashboard: React.FC = () => {
  const { collectors, recyclers, pickups, addNotification } = useApp();

  const [pendingKYC, setPendingKYC] = useState([
    {
      id: 'KYC-2026-902',
      name: 'Santosh Kumar Bind',
      vehicle: 'Cycle Rickshaw Cart',
      ward: 'Ward 12 (West Delhi)',
      aadhaarNo: 'XXXX-XXXX-8921',
      eShramNo: 'UAN-9921-8840',
      submittedAt: 'Today, 11:20 AM',
      status: 'pending'
    },
    {
      id: 'KYC-2026-903',
      name: 'Kavita Rani',
      vehicle: 'E-Rickshaw Trike',
      ward: 'Ward 44 (South Delhi)',
      aadhaarNo: 'XXXX-XXXX-4410',
      eShramNo: 'UAN-4410-1092',
      submittedAt: 'Yesterday, 04:15 PM',
      status: 'pending'
    }
  ]);

  const handleApproveKYC = (id: string, name: string) => {
    setPendingKYC(prev => prev.filter(k => k.id !== id));
    addNotification('Collector KYC Approved', `${name} has been issued official Digital Partner ID & Green Card.`, 'success');
  };

  const handleRejectKYC = (id: string, name: string) => {
    setPendingKYC(prev => prev.filter(k => k.id !== id));
    addNotification('KYC Returned for Correction', `${name}'s documents flagged for re-upload.`, 'alert');
  };

  return (
    <div className="py-8 bg-slate-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center border-2 border-purple-200 shadow-xs">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-black text-slate-900">
                  Municipal Corporation Admin Oversight
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                  Urban Local Body (ULB) Level
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Centralized oversight for collector formalization, recycler compliance, and ward circularity quotas.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-slate-600 bg-slate-100 px-3 py-2 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>National Circular Economy Operations Center</span>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-medium text-slate-500 block">Verified Collectors</span>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {collectors.length + 319}
            </div>
            <span className="text-[11px] text-emerald-600 font-medium">100% e-Shram registered</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-medium text-slate-500 block">CPCB Recyclers</span>
            <div className="text-2xl font-black text-indigo-600 mt-1">
              {recyclers.length + 43}
            </div>
            <span className="text-[11px] text-slate-500">Zero non-compliance flags</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-medium text-slate-500 block">Pending KYC Approvals</span>
            <div className="text-2xl font-black text-amber-500 mt-1">
              {pendingKYC.length}
            </div>
            <span className="text-[11px] text-amber-700 font-medium">Aadhaar verified queue</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-medium text-slate-500 block">Citizen Disputes</span>
            <div className="text-2xl font-black text-emerald-600 mt-1">
              0 Open
            </div>
            <span className="text-[11px] text-slate-500">Zero scale weight discrepancies</span>
          </div>
        </div>

        {/* Collector KYC Verification Queue */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Collector Onboarding & Formalization Queue
              </h3>
              <p className="text-xs text-slate-500">
                Grant informal waste practitioners legal recognition, Ayushman Bharat access, and certified IoT scales.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
              {pendingKYC.length} Pending Review
            </span>
          </div>

          {pendingKYC.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="font-semibold text-slate-800">All collector verification requests resolved!</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {pendingKYC.map((item) => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {item.id}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                      <span className="text-xs text-slate-500">• {item.ward}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 pt-1">
                      <span>Vehicle: <strong>{item.vehicle}</strong></span>
                      <span>Aadhaar: <strong className="font-mono">{item.aadhaarNo}</strong></span>
                      <span>e-Shram: <strong className="font-mono">{item.eShramNo}</strong></span>
                      <span>Submitted: {item.submittedAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleApproveKYC(item.id, item.name)}
                      className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center space-x-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve & Issue ID</span>
                    </button>
                    <button
                      onClick={() => handleRejectKYC(item.id, item.name)}
                      className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-semibold cursor-pointer"
                    >
                      Flag Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recyclers Compliance Directory */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Registered Industrial Recyclers</h3>
              <p className="text-xs text-slate-500">Authorized processing facilities adhering to CPCB zero-landfill standards</p>
            </div>
            <span className="text-xs text-indigo-700 font-semibold bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
              5 Facilities Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recyclers.map((rec) => (
              <div key={rec.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2.5 text-xs">
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{rec.name}</h4>
                  <span className="text-[10px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 font-bold rounded">
                    Active ✓
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] font-mono">{rec.cpcbLicenseNo}</p>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-slate-600">
                  <span>Processed:</span>
                  <strong className="text-slate-900 font-mono">{rec.totalTonsProcessed} Tons</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>EPR Credits:</span>
                  <strong className="text-indigo-700 font-mono">{rec.eprCreditsIssued} Credits</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

