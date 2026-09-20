import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Activity, 
  Scale, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  Search, 
  Play, 
  Pause, 
  ArrowUpRight, 
  CheckCircle2, 
  RefreshCw,
  Cpu,
  Building2,
  FileCheck2,
  Radio
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { IconPlate } from '../ui/IconPlate';

interface LiveWeighingEvent {
  id: string;
  time: string;
  ward: string;
  material: string;
  weightKg: number;
  tareKg: number;
  payoutRupees: number;
  paymentMode: 'UPI' | 'Jan-Dhan';
  destinationHub: string;
  scaleId: string;
  hash: string;
}

const INITIAL_EVENTS: LiveWeighingEvent[] = [
  {
    id: 'KC-2026-004821',
    time: '23:48:12',
    ward: 'Ward 31 (Barakhamba)',
    material: 'PET Flakes (rPET)',
    weightKg: 28.5,
    tareKg: 0.4,
    payoutRupees: 684,
    paymentMode: 'UPI',
    destinationHub: 'Pragati Maidan MRF',
    scaleId: 'IND-334-01',
    hash: '0x8f2b3e41...c8d7',
  },
  {
    id: 'KC-2026-008314',
    time: '23:46:40',
    ward: 'Ward 28 (Lutyens Delhi)',
    material: 'Millberry Copper Wire',
    weightKg: 14.2,
    tareKg: 0.2,
    payoutRupees: 9869,
    paymentMode: 'Jan-Dhan',
    destinationHub: 'Okhla Industrial Phase II',
    scaleId: 'IND-334-09',
    hash: '0x4c99a102...3b1e',
  },
  {
    id: 'KC-2026-009142',
    time: '23:44:18',
    ward: 'Ward 44 (Hauz Khas)',
    material: 'Corrugated Cardboard (OCC)',
    weightKg: 46.0,
    tareKg: 0.8,
    payoutRupees: 483,
    paymentMode: 'UPI',
    destinationHub: 'South Delhi Aggregation Hub',
    scaleId: 'IND-334-14',
    hash: '0x7e11f098...d992',
  },
  {
    id: 'KC-2026-009840',
    time: '23:41:55',
    ward: 'Ward 12 (Rajouri Garden)',
    material: 'Extruded Aluminium 6063',
    weightKg: 19.5,
    tareKg: 0.3,
    payoutRupees: 2769,
    paymentMode: 'UPI',
    destinationHub: 'Mayapuri Metal Yard',
    scaleId: 'IND-334-04',
    hash: '0x99a2cd44...11f8',
  },
  {
    id: 'KC-2026-004109',
    time: '23:38:04',
    ward: 'Ward 31 (Connaught Place)',
    material: 'Old Newspapers (ONP)',
    weightKg: 32.0,
    tareKg: 0.5,
    payoutRupees: 496,
    paymentMode: 'UPI',
    destinationHub: 'NDMC Recovery Center',
    scaleId: 'IND-334-19',
    hash: '0x10b98124...f002',
  }
];

export const ImpactDashboard: React.FC = () => {
  const { viewWasteDetails, setActiveTab } = useApp();
  const [events, setEvents] = useState<LiveWeighingEvent[]>(INITIAL_EVENTS);
  const [isLiveStream, setIsLiveStream] = useState(true);
  const [filterMaterial, setFilterMaterial] = useState('all');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-IN'));

  // Live ticking clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-IN'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Periodic simulated live stream event
  useEffect(() => {
    if (!isLiveStream) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-IN');
      const randomWeight = parseFloat((10 + Math.random() * 35).toFixed(1));
      const materials = [
        { name: 'PET Flakes (rPET)', rate: 24.0, hub: 'Pragati Maidan MRF' },
        { name: 'Corrugated Cardboard (OCC)', rate: 10.5, hub: 'South Delhi Hub' },
        { name: 'Old Newspapers (ONP)', rate: 15.5, hub: 'NDMC Center' },
        { name: 'Extruded Aluminium 6063', rate: 142.0, hub: 'Mayapuri Yard' },
      ];
      const mat = materials[Math.floor(Math.random() * materials.length)];
      const wards = ['Ward 31 (Central)', 'Ward 28 (Lutyens)', 'Ward 44 (South)', 'Ward 12 (West)'];

      const newEvt: LiveWeighingEvent = {
        id: `KC-2026-${Math.floor(100000 + Math.random() * 900000)}`,
        time: timeStr,
        ward: wards[Math.floor(Math.random() * wards.length)],
        material: mat.name,
        weightKg: randomWeight,
        tareKg: 0.3,
        payoutRupees: Math.round(randomWeight * mat.rate),
        paymentMode: Math.random() > 0.3 ? 'UPI' : 'Jan-Dhan',
        destinationHub: mat.hub,
        scaleId: `IND-334-${Math.floor(10 + Math.random() * 20)}`,
        hash: `0x${Math.floor(Math.random() * 16777215).toString(16)}...${Math.floor(Math.random() * 16777215).toString(16).slice(0, 4)}`,
      };

      setEvents(prev => [newEvt, ...prev.slice(0, 9)]);
    }, 4500);

    return () => clearInterval(interval);
  }, [isLiveStream]);

  // Hourly Inflow Data across Delhi NCR
  const hourlyData = [
    { hour: '07:00', intakeKg: 180, payouts: 4200 },
    { hour: '09:00', intakeKg: 420, payouts: 9800 },
    { hour: '11:00', intakeKg: 890, payouts: 22400 },
    { hour: '13:00', intakeKg: 740, payouts: 18200 },
    { hour: '15:00', intakeKg: 610, payouts: 14900 },
    { hour: '17:00', intakeKg: 950, payouts: 26800 },
    { hour: '19:00', intakeKg: 680, payouts: 19100 },
    { hour: '21:00', intakeKg: 340, payouts: 8400 },
  ];

  // Material Yield & Purity Distribution
  const purityData = [
    { name: 'rPET Polymer Flakes', purity: 98.6, share: 32, color: '#10b981' },
    { name: 'OCC Cardboard Fiber', purity: 96.4, share: 28, color: '#f59e0b' },
    { name: 'Millberry Copper Wire', purity: 99.8, share: 18, color: '#d97706' },
    { name: 'Aluminium Scrap 6063', purity: 97.2, share: 14, color: '#06b6d4' },
    { name: 'Sorted E-Waste PCBs', purity: 94.8, share: 8, color: '#8b5cf6' },
  ];

  // Ward Municipal Recovery Quotas
  const wardPerformance = [
    { ward: 'Ward 31 (New Delhi Central)', targetKg: 1200, actualKg: 1340, diversion: '94.2%', scalesActive: 42 },
    { ward: 'Ward 28 (Lutyens Municipal)', targetKg: 900, actualKg: 980, diversion: '97.8%', scalesActive: 38 },
    { ward: 'Ward 44 (South Delhi Green)', targetKg: 1400, actualKg: 1480, diversion: '91.5%', scalesActive: 54 },
    { ward: 'Ward 12 (West Industrial)', targetKg: 1100, actualKg: 1092, diversion: '88.4%', scalesActive: 46 },
  ];

  const filteredEvents = filterMaterial === 'all' 
    ? events 
    : events.filter(e => e.material.toLowerCase().includes(filterMaterial.toLowerCase()));

  return (
    <div className="py-8 bg-slate-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Industry-Grade HUD Header */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>TELEMETRY STREAM: LIVE</span>
              </span>
              <span className="text-xs font-mono text-slate-400">
                GATEWAY: DEL-CENTRAL-01 • LATENCY 22ms
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Operational Recovery & Telemetry Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Live doorstep weigh-in streams, verified Legal Metrology weights, and municipal landfill diversion metrics.
            </p>
          </div>

          {/* Real-time telemetry badges */}
          <div className="flex items-center space-x-3 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 text-xs font-mono">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">System Time</span>
              <span className="text-sm font-bold text-white">{currentTime}</span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">Active Scales</span>
              <span className="text-sm font-bold text-emerald-400">324 Online</span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">Settlement</span>
              <span className="text-sm font-bold text-teal-300">T+0 Instant</span>
            </div>
          </div>
        </div>

        {/* 5 Practical Engineering KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2 hover:border-slate-300 transition-all">
            <IconPlate 
              icon={<Scale className="w-5 h-5" />} 
              variant="emerald" 
              size="lg" 
            />
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                4,892.4 <span className="text-xs font-sans text-slate-500 font-normal">kg</span>
              </div>
              <span className="text-xs font-bold text-emerald-700">Today's Verified Intake</span>
            </div>
            <span className="text-[10px] text-slate-400 block font-mono">Tare auto-compensated</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2 hover:border-slate-300 transition-all">
            <IconPlate 
              icon={<ShieldCheck className="w-5 h-5" />} 
              variant="teal" 
              size="lg" 
            />
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                99.95%
              </div>
              <span className="text-xs font-bold text-teal-700">Scale Calibration Accuracy</span>
            </div>
            <span className="text-[10px] text-slate-400 block font-mono">Class-III IND/09/21/334</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2 hover:border-slate-300 transition-all">
            <IconPlate 
              icon={<CreditCard className="w-5 h-5" />} 
              variant="amber" 
              size="lg" 
            />
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                ₹1,42,850
              </div>
              <span className="text-xs font-bold text-amber-700">Direct Citizen Payouts</span>
            </div>
            <span className="text-[10px] text-slate-400 block font-mono">100% via UPI Jan-Dhan</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2 hover:border-slate-300 transition-all">
            <IconPlate 
              icon={<Building2 className="w-5 h-5" />} 
              variant="indigo" 
              size="lg" 
            />
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                93.2%
              </div>
              <span className="text-xs font-bold text-indigo-700">Landfill Diversion Ratio</span>
            </div>
            <span className="text-[10px] text-slate-400 block font-mono">Diverted from Bhalswa</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2 col-span-2 lg:col-span-1 hover:border-slate-300 transition-all">
            <IconPlate 
              icon={<Activity className="w-5 h-5" />} 
              variant="slate" 
              size="lg" 
            />
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                1.6%
              </div>
              <span className="text-xs font-bold text-slate-700">Contamination Rejection</span>
            </div>
            <span className="text-[10px] text-slate-400 block font-mono">Optimal batch purity</span>
          </div>

        </div>

        {/* Live Ingestion Stream Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
          
          {/* Stream Controls */}
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <h3 className="text-lg font-bold text-slate-900">
                  Live Doorstep Weighing & Ingestion Stream
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Incoming telemetry packets from calibrated Class-III IoT scales across Delhi wards.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => setIsLiveStream(!isLiveStream)}
                className={`px-3 py-1.5 rounded-xl border flex items-center space-x-1.5 transition-colors cursor-pointer ${
                  isLiveStream 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold' 
                    : 'bg-slate-100 border-slate-200 text-slate-600'
                }`}
              >
                {isLiveStream ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isLiveStream ? 'Streaming Active' : 'Stream Paused'}</span>
              </button>

              <select
                value={filterMaterial}
                onChange={(e) => setFilterMaterial(e.target.value)}
                className="bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 focus:outline-hidden"
              >
                <option value="all">All Material Streams</option>
                <option value="pet">PET Polymers</option>
                <option value="copper">Millberry Copper</option>
                <option value="cardboard">OCC Cardboard</option>
                <option value="newspaper">Old Newspapers</option>
                <option value="aluminium">Aluminium</option>
              </select>
            </div>
          </div>

          {/* Telemetry Stream Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-6">Timestamp & Waste ID</th>
                  <th className="py-3.5 px-4">Municipal Ward</th>
                  <th className="py-3.5 px-4">Material Category</th>
                  <th className="py-3.5 px-4">Net Weight (kg)</th>
                  <th className="py-3.5 px-4">Citizen Payout</th>
                  <th className="py-3.5 px-4">Scale Hardware</th>
                  <th className="py-3.5 px-4">Intake Hub</th>
                  <th className="py-3.5 px-6 text-right">Ledger Verify</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {filteredEvents.map((evt) => (
                  <tr key={evt.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6">
                      <span className="text-slate-400 text-[10px] block">{evt.time}</span>
                      <button
                        type="button"
                        onClick={() => viewWasteDetails(evt.id)}
                        className="font-bold text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer text-xs"
                      >
                        {evt.id}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 font-sans text-slate-700">
                      {evt.ward}
                    </td>

                    <td className="py-3.5 px-4 font-sans font-semibold text-slate-800">
                      {evt.material}
                    </td>

                    <td className="py-3.5 px-4 font-extrabold text-slate-900">
                      {evt.weightKg.toFixed(1)} <span className="text-[10px] font-normal text-slate-400">kg</span>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-emerald-700">
                      ₹{evt.payoutRupees.toLocaleString('en-IN')}
                      <span className="text-[10px] text-slate-400 block font-normal capitalize">
                        via {evt.paymentMode}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      {evt.scaleId}
                    </td>

                    <td className="py-3.5 px-4 font-sans text-slate-600 text-xs truncate max-w-[160px]">
                      {evt.destinationHub}
                    </td>

                    <td className="py-3.5 px-6 text-right font-sans">
                      <button
                        type="button"
                        onClick={() => viewWasteDetails(evt.id)}
                        className="inline-flex items-center space-x-1 text-xs text-emerald-700 hover:text-emerald-800 font-semibold cursor-pointer"
                      >
                        <span>Audit</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* Charts: Hourly Intake Throughput & Material Purity Index */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Hourly Inflow Chart (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Hourly Doorstep Intake Throughput (kg/hr)
                </h3>
                <p className="text-xs text-slate-500">Real-time load curve across active E-Loader fleet</p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                Peak: 950 kg/hr
              </span>
            </div>

            <div className="h-64 w-full pt-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="intakeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.35}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} unit=" kg" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                    formatter={(v) => [`${v} kg`, 'Intake Volume']}
                  />
                  <Area type="monotone" dataKey="intakeKg" stroke="#059669" strokeWidth={2.5} fill="url(#intakeGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Secondary Purity Index (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Secondary Smelter Purity Index
              </h3>
              <p className="text-xs text-slate-500">Measured contamination compliance before baling</p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {purityData.map((p) => (
                <div key={p.name} className="space-y-1">
                  <div className="flex justify-between items-center text-slate-700">
                    <span className="font-sans font-medium">{p.name}</span>
                    <span className="font-bold text-slate-900">{p.purity}% Purity</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500" 
                      style={{ width: `${p.purity}%`, backgroundColor: p.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Standard: ISCC PLUS Compliant</span>
              <span className="text-emerald-700 font-semibold font-mono">Average 97.4%</span>
            </div>
          </div>

        </div>

        {/* Municipal Ward Recovery Performance Grid */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Municipal Ward Recovery Targets vs. Actuals
              </h3>
              <p className="text-xs text-slate-500">Real-time audit performance against Swachh Survekshan standards</p>
            </div>
            <span className="text-xs font-mono text-slate-400">Urban Local Bodies: NDMC & MCD</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {wardPerformance.map((w) => (
              <div key={w.ward} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/90 space-y-2 text-xs">
                <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{w.ward}</h4>
                <div className="space-y-1 font-mono text-slate-600">
                  <div className="flex justify-between">
                    <span>Target Quota:</span>
                    <span>{w.targetKg} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Actual Collected:</span>
                    <strong className="text-slate-900 font-bold">{w.actualKg} kg</strong>
                  </div>
                  <div className="flex justify-between text-emerald-700">
                    <span>Landfill Diversion:</span>
                    <strong className="font-bold">{w.diversion}</strong>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[11px] pt-1 border-t border-slate-200">
                    <span>Active E-Loaders:</span>
                    <span>{w.scalesActive} online</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
