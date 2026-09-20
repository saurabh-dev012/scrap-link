import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MandiTicker: React.FC = () => {
  const { mandiRates, setActiveTab } = useApp();
  const [isPaused, setIsPaused] = useState(false);

  const marqueeItems = [...mandiRates, ...mandiRates];

  return (
    <div className="bg-slate-900 text-white border-y border-slate-800 py-2 overflow-hidden relative text-xs">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        
        {/* Label Badge */}
        <div className="flex items-center space-x-2 shrink-0 pr-4 border-r border-slate-800 z-10 bg-slate-900">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
            Daily Mandi Scrap Index
          </span>
        </div>

        {/* Marquee Strip */}
        <div 
          className="flex-1 overflow-hidden mx-4 relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className={`flex items-center space-x-6 whitespace-nowrap ${isPaused ? '' : 'animate-marquee'}`}
            style={{ width: 'max-content' }}
          >
            {marqueeItems.map((item, idx) => (
              <div 
                key={`${item.id}-${idx}`}
                className="inline-flex items-center space-x-2 bg-slate-800/90 px-3 py-1 rounded-lg border border-slate-700/60 font-mono text-xs cursor-pointer hover:border-slate-500 transition-colors"
                onClick={() => setActiveTab('rates')}
              >
                <span className="text-slate-300 font-sans font-medium text-[11px]">
                  {item.material.split('(')[0]}
                </span>
                <span className="text-white font-bold">
                  ₹{item.rate.toFixed(1)}/kg
                </span>
                
                {item.trend === 'up' && (
                  <span className="flex items-center text-[10px] text-emerald-400 font-sans font-semibold">
                    <TrendingUp className="w-3 h-3 mr-0.5" />
                    +{item.changePercent}%
                  </span>
                )}
                {item.trend === 'down' && (
                  <span className="flex items-center text-[10px] text-rose-400 font-sans font-semibold">
                    <TrendingDown className="w-3 h-3 mr-0.5" />
                    {item.changePercent}%
                  </span>
                )}
                {item.trend === 'stable' && (
                  <span className="flex items-center text-[10px] text-slate-400 font-sans">
                    <Minus className="w-3 h-3 mr-0.5" />
                    0%
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Live Calculator Link */}
        <button
          onClick={() => setActiveTab('rates')}
          className="hidden sm:inline-flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 font-semibold pl-4 border-l border-slate-800 shrink-0 z-10 bg-slate-900 cursor-pointer"
        >
          <span>Calculate</span>
          <ArrowRight className="w-3 h-3" />
        </button>

      </div>
    </div>
  );
};
