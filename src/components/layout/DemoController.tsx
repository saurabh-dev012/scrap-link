import React, { useState } from 'react';
import { 
  PlayCircle, 
  RotateCcw, 
  ChevronRight, 
  Check, 
  Sparkles, 
  Minimize2, 
  Maximize2,
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DemoController: React.FC = () => {
  const { 
    demoStep, 
    demoActive, 
    runNextDemoStep, 
    resetDemoSimulation,
    role,
    setRole,
    setActiveTab
  } = useApp();

  const [minimized, setMinimized] = useState(false);

  const steps = [
    { num: 1, title: 'Household Booking', desc: 'Select materials & broadcast pickup' },
    { num: 2, title: 'Collector Acceptance', desc: 'Nearby partner accepts route' },
    { num: 3, title: 'Weigh & Pay (IoT)', desc: 'Scale verified & UPI payout' },
    { num: 4, title: 'Recycler & EPR', desc: 'Batch intake & CPCB certificate' },
    { num: 5, title: 'Impact Dashboard', desc: 'Real-time circularity counters' },
    { num: 5, title: 'Telemetry Hub', desc: 'Live operational recovery & scales' },
  ];

  return (
    <aside 
      aria-label="Interactive Platform Tutorial"
      className="fixed bottom-20 md:bottom-6 right-4 z-50 max-w-xs sm:max-w-sm transition-all duration-300"
    >
      <div className="bg-slate-900/95 text-white rounded-2xl shadow-2xl border border-slate-700/80 backdrop-blur-xl p-4 overflow-hidden">
        
        {/* Header bar */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center space-x-1">
              <span>Interactive Tutorial</span>
              <Sparkles className="w-3 h-3 text-emerald-400" />
            </h4>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setMinimized(!minimized)}
              className="p-1 text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
              title={minimized ? "Expand" : "Minimize"}
            >
              {minimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {!minimized && (
          <div className="mt-3 space-y-3">
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Explore how recyclable scrap moves through the complete 5-step circular chain:
            </p>

            {/* Stepper mini indicator */}
            <div className="space-y-1.5 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
              {steps.map((s) => {
                const isCurrent = demoStep === s.num;
                const isDone = demoStep > s.num;
                return (
                  <div 
                    key={s.num} 
                    className={`flex items-center justify-between text-xs py-1 px-2 rounded-md transition-all ${
                      isCurrent 
                        ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30' 
                        : isDone 
                          ? 'text-slate-400' 
                          : 'text-slate-600'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        isDone 
                          ? 'bg-emerald-500 text-slate-950 font-bold' 
                          : isCurrent 
                            ? 'bg-emerald-400 text-slate-950 font-bold' 
                            : 'bg-slate-800 text-slate-400'
                      }`}>
                        {isDone ? <Check className="w-2.5 h-2.5" /> : s.num}
                      </div>
                      <span className="text-[11px]">{s.title}</span>
                    </div>
                    {isCurrent && (
                      <span className="text-[9px] uppercase px-1.5 py-0.2 bg-emerald-400 text-slate-950 font-bold rounded">
                        Active
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 pt-1">
              <button
                onClick={runNextDemoStep}
                className="flex-1 inline-flex items-center justify-center space-x-2 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                <span>{demoStep === 0 ? 'Start Tutorial (1/5)' : `Next Step (${(demoStep % 5) + 1}/5)`}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={resetDemoSimulation}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                title="Reset tutorial state"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </aside>
  );
};

