import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Sparkles, 
  ArrowRight, 
  Plus, 
  Trash2, 
  Info, 
  Coins, 
  CheckCircle2,
  Truck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WASTE_CATEGORIES } from '../../data/mockData';
import { MaterialInspector3D } from '../3d/MaterialInspector3D';

export const ScrapRateCalculator: React.FC = () => {
  const { mandiRates, setActiveTab } = useApp();

  // Multi-item calculator state
  const [calcItems, setCalcItems] = useState<Array<{ id: string; categoryId: string; qtyKg: number }>>([
    { id: 'item-1', categoryId: 'paper', qtyKg: 15 },
    { id: 'item-2', categoryId: 'pet_plastic', qtyKg: 6 },
    { id: 'item-3', categoryId: 'metal_iron', qtyKg: 8 },
  ]);

  const handleAddCalcRow = () => {
    setCalcItems(prev => [
      ...prev,
      { id: `item-${Date.now()}`, categoryId: 'cardboard', qtyKg: 10 }
    ]);
  };

  const handleRemoveCalcRow = (id: string) => {
    setCalcItems(prev => prev.filter(i => i.id !== id));
  };

  const handleUpdateItem = (id: string, field: 'categoryId' | 'qtyKg', value: any) => {
    setCalcItems(prev => prev.map(i => {
      if (i.id !== id) return i;
      return { ...i, [field]: value };
    }));
  };

  // Compute calculated values
  const detailedItems = calcItems.map(item => {
    const cat = WASTE_CATEGORIES.find(c => c.id === item.categoryId) || WASTE_CATEGORIES[0];
    const rate = cat.ratePerKg;
    const value = Math.round(item.qtyKg * rate);
    return {
      ...item,
      categoryName: cat.name,
      rate,
      value
    };
  });

  const totalCalculatedKg = detailedItems.reduce((acc, curr) => acc + (Number(curr.qtyKg) || 0), 0);
  const totalCalculatedRupees = detailedItems.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="py-10 bg-slate-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold">
            <Coins className="w-3.5 h-3.5 text-amber-600" />
            <span>Transparent Daily Scrap Mandi Index</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Today's Recycling Rates & Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Real-time material rates preventing informal price exploitation. Transparent benchmarks updated from wholesale regional mandis.
          </p>
        </div>

        {/* Interactive Estimator Calculator Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Multi-item Estimator Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-brand-600" />
                <h3 className="font-bold text-slate-900 text-base">Estimated Value Calculator</h3>
              </div>
              <button
                onClick={handleAddCalcRow}
                className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center space-x-1 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-200 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Material</span>
              </button>
            </div>

            {/* Rows list */}
            <div className="space-y-3">
              {detailedItems.map((item) => (
                <div key={item.id} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
                  {/* Material selector */}
                  <div className="flex-1">
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-0.5">Material</label>
                    <select
                      value={item.categoryId}
                      onChange={(e) => handleUpdateItem(item.id, 'categoryId', e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium text-slate-900 focus:outline-hidden focus:border-brand-500"
                    >
                      {WASTE_CATEGORIES.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name} (₹{c.ratePerKg}/kg)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity Input */}
                  <div className="w-24">
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-0.5">Quantity (kg)</label>
                    <input
                      type="number"
                      min="1"
                      value={item.qtyKg}
                      onChange={(e) => handleUpdateItem(item.id, 'qtyKg', Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-bold font-mono text-slate-900 text-center focus:outline-hidden focus:border-brand-500"
                    />
                  </div>

                  {/* Subtotal */}
                  <div className="w-24 text-right">
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold mb-0.5">Subtotal</span>
                    <span className="font-extrabold text-slate-900 font-mono text-sm">₹{item.value}</span>
                  </div>

                  {/* Delete row */}
                  {detailedItems.length > 1 && (
                    <button
                      onClick={() => handleRemoveCalcRow(item.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors cursor-pointer mt-3"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-400 flex items-center space-x-1 pt-1">
              <Info className="w-3.5 h-3.5" />
              <span>Prices automatically multiply by certified doorstep scale measurements.</span>
            </p>
          </div>

          {/* Right Column: Computed Total Box (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-700/80 space-y-5">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 block">
                Instant Mandi Valuation
              </span>
              <h3 className="text-xl font-bold text-white mt-1">Calculated Scrap Payout</h3>
            </div>

            {/* Total value display */}
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-xs text-slate-400">Total Estimated Value:</span>
              <div className="text-4xl sm:text-5xl font-black text-brand-400 font-mono">
                ₹{totalCalculatedRupees}
              </div>
              <span className="text-xs text-slate-400 font-medium">for {totalCalculatedKg} kg scrap</span>
            </div>

            {/* Environmental offset equivalent */}
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span>Estimated CO₂ Offset:</span>
                <strong className="text-emerald-400">~{Math.round(totalCalculatedKg * 1.35)} kg CO₂e</strong>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span>Water Saved:</span>
                <strong className="text-teal-400">~{totalCalculatedKg * 28} Liters</strong>
              </div>
              <div className="flex justify-between pb-1">
                <span>Direct UPI Jan-Dhan:</span>
                <strong className="text-white">100% Payout (0% Cut)</strong>
              </div>
            </div>

            {/* Action: Book Pickup using this estimate */}
            <button
              onClick={() => setActiveTab('schedule')}
              className="w-full py-3.5 px-4 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-black text-xs shadow-lg shadow-brand-500/20 transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <Truck className="w-4 h-4" />
              <span>Book Pickup for this Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* 3D Secondary Commodity Inspector */}
        <MaterialInspector3D />

        {/* Daily Rates Table */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Today's Mandi Recycling Rates Board</h3>
              <p className="text-xs text-slate-500">Updated twice daily based on secondary industrial smelting & paper mill indices.</p>
            </div>
            <span className="text-xs text-slate-400 font-mono">Benchmark: Delhi NCR Mandi</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-6">Material Category</th>
                  <th className="py-3.5 px-4">Subcategory</th>
                  <th className="py-3.5 px-4">Current Rate (₹/kg)</th>
                  <th className="py-3.5 px-4">Daily Change</th>
                  <th className="py-3.5 px-4">Demand Index</th>
                  <th className="py-3.5 px-6">Primary Industrial Buyer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {mandiRates.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {r.material}
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      {r.subcategory}
                    </td>
                    <td className="py-4 px-4 font-mono font-extrabold text-slate-900 text-sm">
                      ₹{r.rate.toFixed(1)} <span className="text-xs font-sans text-slate-400 font-normal">/kg</span>
                    </td>
                    <td className="py-4 px-4 font-medium">
                      {r.trend === 'up' && (
                        <span className="inline-flex items-center text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-semibold">
                          <TrendingUp className="w-3.5 h-3.5 mr-1" />
                          +{r.changePercent}%
                        </span>
                      )}
                      {r.trend === 'down' && (
                        <span className="inline-flex items-center text-rose-600 bg-rose-50 px-2 py-0.5 rounded text-[11px] font-semibold">
                          <TrendingDown className="w-3.5 h-3.5 mr-1" />
                          {r.changePercent}%
                        </span>
                      )}
                      {r.trend === 'stable' && (
                        <span className="inline-flex items-center text-slate-500 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                          <Minus className="w-3.5 h-3.5 mr-1" />
                          0.0%
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.demandLevel === 'Surging' 
                          ? 'bg-purple-100 text-purple-800' 
                          : r.demandLevel === 'High' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-slate-100 text-slate-700'
                      }`}>
                        {r.demandLevel} Demand
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 text-xs">
                      {r.industrialBuyer}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Market Pricing Notice */}
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-800 flex items-start space-x-3">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong>Daily Mandi Pricing Notice:</strong> Material prices reflect wholesale secondary smelting and paper mill procurement benchmarks in Delhi NCR. Final doorstep valuation is determined by calibrated Class-III electronic scale weights at the time of pickup.
          </p>
        </div>

      </div>
    </div>
  );
};

