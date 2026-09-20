import React from 'react';
import { ArrowRight, ClipboardCheck, Scale, Truck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const steps = [
  { number: '01', title: 'Tell us what you have', text: 'Add the materials and choose a convenient time for collection.', icon: ClipboardCheck },
  { number: '02', title: 'Hand it over with confidence', text: 'Your collection is weighed and recorded at the doorstep.', icon: Scale },
  { number: '03', title: 'Keep the record', text: 'Use your collection ID to follow the material after pickup.', icon: Truck },
];

export const HowItWorks: React.FC = () => {
  const { setActiveTab } = useApp();
  return <section className="bg-[#173d35] py-16 text-[#f5f4ee] sm:py-20"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col justify-between gap-6 border-b border-white/15 pb-10 md:flex-row md:items-end"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c8d9b8]">How it works</p><h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">Recycling should feel straightforward.</h2></div><button onClick={() => setActiveTab('schedule')} className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#e9efe9] hover:text-white">Start a pickup <ArrowRight className="h-4 w-4" /></button></div>
    <div className="grid gap-8 py-10 md:grid-cols-3">{steps.map(({ number, title, text, icon: Icon }) => <article key={number}><div className="flex items-center justify-between"><span className="font-mono text-xs text-[#9eb29f]">{number}</span><Icon className="h-5 w-5 text-[#c8d9b8]" /></div><h3 className="mt-8 text-lg font-semibold">{title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-[#b7c8b8]">{text}</p></article>)}</div>
  </div></section>;
};
