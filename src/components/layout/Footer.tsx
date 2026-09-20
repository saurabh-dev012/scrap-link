import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ScrapLinkLogo } from '../ui/ScrapLinkLogo';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();
  return <footer className="mt-auto bg-[#173d35] pb-20 pt-12 text-[#d9e3d8] md:pb-10"><div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
    <div><ScrapLinkLogo dark /><p className="mt-4 max-w-sm text-sm leading-6 text-[#b7c8b8]">Simple, accountable recycling for households, collectors, and processors.</p></div>
    <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c8d9b8]">Explore</p><div className="mt-4 space-y-3 text-sm"><button onClick={() => setActiveTab('schedule')} className="block hover:text-white">Request a pickup</button><button onClick={() => setActiveTab('trace')} className="block hover:text-white">Track a collection</button><button onClick={() => setActiveTab('impact')} className="block hover:text-white">Impact overview</button></div></div>
    <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c8d9b8]">Built for clarity</p><p className="mt-4 text-sm leading-6 text-[#b7c8b8]">No invented activity, placeholder rates, or inflated impact claims. Records appear when work is actually completed.</p><button onClick={() => setActiveTab('landing')} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-white hover:text-[#c8d9b8]">About ScrapLink <ArrowUpRight className="h-4 w-4" /></button></div>
  </div><div className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-4 pt-5 text-xs text-[#9eb29f] sm:px-6 lg:px-8">© {new Date().getFullYear()} ScrapLink</div></footer>;
};
