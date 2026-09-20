import React from 'react';
import { Download, Leaf, MapPin, PackageCheck, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const formatNumber = (value: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 1 }).format(value);

export const ImpactDashboard: React.FC = () => {
  const { pickups, impactStats, setActiveTab } = useApp();
  const completed = pickups.filter((pickup) => ['collected', 'at_sorting', 'recycled'].includes(pickup.status));
  const recent = [...completed].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);
  const hasRecords = completed.length > 0;
  const metrics = [
    { label: 'Material recovered', value: `${formatNumber(impactStats.totalWasteRecoveredKg)} kg`, icon: Leaf },
    { label: 'Completed pickups', value: String(completed.length), icon: PackageCheck },
    { label: 'Households served', value: String(impactStats.totalHouseholdsServed), icon: Users },
    { label: 'Areas covered', value: String(impactStats.activeWardsCovered), icon: MapPin },
  ];

  return <div className="min-h-[calc(100vh-4rem)] bg-[#f7faf8] py-10"><div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">Operations</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Impact overview</h1><p className="mt-2 text-sm text-slate-600">Figures are calculated from recorded collections in this workspace.</p></div>{hasRecords && <button onClick={() => window.print()} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"><Download className="h-4 w-4" />Print summary</button>}</div>
    {hasRecords ? <><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{metrics.map(({ label, value, icon: Icon }) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><Icon className="h-5 w-5 text-emerald-700" /><p className="mt-5 text-2xl font-bold tracking-tight text-slate-950">{value}</p><p className="mt-1 text-sm text-slate-500">{label}</p></div>)}</div><section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-100 px-6 py-5"><h2 className="font-bold text-slate-900">Recent recorded collections</h2><p className="mt-1 text-sm text-slate-500">Only completed records are included in this summary.</p></div><div className="divide-y divide-slate-100">{recent.map((pickup) => <div key={pickup.id} className="flex flex-col gap-2 px-6 py-4 text-sm sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold text-slate-900">{pickup.id}</p><p className="mt-1 text-slate-500">{pickup.items.map((item) => item.categoryName).join(', ')}</p></div><div className="text-slate-600"><span className="font-semibold text-slate-900">{formatNumber(pickup.actualWeightKg || pickup.totalEstimatedKg)} kg</span> · {pickup.status.replace('_', ' ')}</div></div>)}</div></section></> : <section className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><PackageCheck className="mx-auto h-9 w-9 text-emerald-700" /><h2 className="mt-5 text-xl font-bold text-slate-900">No completed collections yet</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">Your impact overview will populate automatically once a collection has been recorded and completed.</p><button onClick={() => setActiveTab('schedule')} className="mt-6 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800">Book a pickup</button></section>}
  </div></div>;
};
