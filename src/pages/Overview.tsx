import React, { useState } from 'react';
import { Activity, Gauge, ShieldCheck, AlertCircle, Lightbulb, ChevronRight, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const efficiencyData = [
  { time: '00:00', value: 90.1 }, { time: '04:00', value: 90.5 },
  { time: '08:00', value: 91.2 }, { time: '12:00', value: 92.0 },
  { time: '16:00', value: 91.8 }, { time: '20:00', value: 91.5 },
  { time: '24:00', value: 91.8 },
];

const KPICard = ({ title, value, unit, delta, icon: Icon, color = "text-brand-accent", delay = 0 }: any) => (
  <div 
    className="bg-brand-panel-light/40 border border-brand-border/60 rounded-xl p-5 hover:border-brand-border transition-colors animate-fade-in-up opacity-0"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex justify-between items-start mb-2">
      <span className="text-sm text-slate-300 font-semibold">{title}</span>
      <Icon size={16} className={`${color} opacity-80`} />
    </div>
    <div className="flex items-baseline gap-1 mt-2">
      <span className="text-3xl font-bold text-slate-50 tracking-tight">{value}</span>
      <span className="text-sm text-slate-400 font-medium">{unit}</span>
    </div>
    <div className="mt-2 text-[12px] text-brand-success flex items-center gap-1 font-medium">
      <TrendingUpIcon size={14} />
      <span>{delta}</span>
    </div>
  </div>
);

const TrendingUpIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
);

const Overview: React.FC = () => {
  const [activeTab, setActiveTab] = useState('24H');

  return (
    <div className="space-y-6 flex flex-col h-full">
      
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Boiler Efficiency" value="91.8" unit="%" delta="+0.4% vs last shift" icon={Activity} delay={100} />
        <KPICard title="Steam Pressure" value="42.0" unit="bar" delta="Stable in optimal range" icon={Gauge} color="text-brand-primary" delay={200} />
        <KPICard title="Steam Demand" value="82.0" unit="TPH" delta="+2.1 TPH (Process A)" icon={Zap} color="text-brand-warning" delay={300} />
        <KPICard title="Overall Health" value="92" unit="/100" delta="All systems nominal" icon={ShieldCheck} color="text-brand-success" delay={400} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[400px]">
        
        {/* Main Digital Twin Schematic */}
        <div 
          className="lg:col-span-2 bg-brand-panel-light/30 border border-brand-border/50 rounded-xl p-6 relative overflow-hidden flex flex-col animate-fade-in-up opacity-0"
          style={{ animationDelay: '500ms' }}
        >
          <div className="flex justify-between items-center mb-6 z-10">
            <h3 className="text-slate-50 font-semibold tracking-wide">Boiler System – Live Digital Twin</h3>
            <div className="flex items-center gap-2 bg-brand-success/10 border border-brand-success/20 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse"></span>
              <span className="text-[10px] text-brand-success uppercase font-bold tracking-wider">Live Data</span>
            </div>
          </div>

          <div className="flex-1 relative w-full flex items-center justify-center min-h-[300px]">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMzMzQxNTUiLz48L3N2Zz4=')] opacity-20"></div>

            <div className="relative w-full max-w-2xl h-[280px] z-10">
              
              {/* Components */}
              
              {/* FW Tank */}
              <div className="absolute top-[50%] left-[5%] transform -translate-y-1/2 w-16 h-20 bg-[#152136] border border-brand-border rounded-md flex flex-col items-center justify-center shadow-lg">
                <span className="text-[10px] text-slate-300 font-semibold uppercase tracking-wider mb-1">FW Tank</span>
                <span className="text-xs text-brand-accent font-bold font-mono">105°C</span>
              </div>

              {/* Pump */}
              <div className="absolute top-[50%] left-[25%] transform -translate-y-1/2 w-10 h-10 bg-[#152136] border border-brand-border rounded-full flex items-center justify-center shadow-lg">
                <div className="w-4 h-4 rounded-full border-2 border-slate-500 animate-[spin_4s_linear_infinite] border-t-brand-accent"></div>
              </div>

              {/* Boiler B-101 */}
              <div className="absolute top-[35%] left-[45%] transform -translate-y-1/2 w-28 h-32 bg-gradient-to-b from-[#152136] to-[#0f172a] border border-brand-border rounded-lg flex flex-col items-center justify-center shadow-2xl relative overflow-hidden">
                <div className="absolute bottom-0 w-full h-[40%] bg-orange-500/5 border-t border-orange-500/10"></div>
                <span className="text-[11px] text-slate-50 font-bold uppercase tracking-wider mb-2 relative z-10">Boiler B-101</span>
                <div className="bg-black/30 px-2 py-1 rounded text-xs text-orange-200 font-mono font-bold relative z-10 border border-white/5">890°C</div>
              </div>

              {/* Steam Header */}
              <div className="absolute top-[20%] left-[70%] transform -translate-y-1/2 w-20 h-10 bg-[#152136] border border-cyan-800/50 rounded-full flex flex-col items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                <span className="text-[9px] text-cyan-200 font-semibold uppercase tracking-wider">Header</span>
                <span className="text-[11px] text-cyan-400 font-bold font-mono">42 bar</span>
              </div>

              {/* End Process */}
              <div className="absolute top-[20%] right-[0%] transform -translate-y-1/2 flex flex-col gap-2">
                <div className="text-[11px] text-slate-300 font-semibold bg-[#152136] px-2 py-1 rounded border border-brand-border">Reactor Unit</div>
              </div>

              {/* Economizer */}
              <div className="absolute top-[75%] left-[60%] transform -translate-y-1/2 w-20 h-16 bg-[#152136] border border-brand-border rounded-md flex flex-col items-center justify-center shadow-lg">
                <span className="text-[10px] text-slate-300 font-semibold uppercase tracking-wider mb-1">Economizer</span>
                <span className="text-[11px] text-amber-400 font-bold font-mono">310°C</span>
              </div>

              {/* Stack */}
              <div className="absolute top-[75%] right-[10%] transform -translate-y-1/2 w-10 h-24 bg-gradient-to-t from-[#152136] to-transparent border-x border-t border-brand-border rounded-t flex flex-col items-center justify-end pb-2">
                <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Stack</span>
              </div>


              {/* Flow Lines (SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <defs>
                  <linearGradient id="glowLine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
                  </linearGradient>
                  
                  <linearGradient id="glowLineSteam" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
                  </linearGradient>

                  <linearGradient id="glowLineFlue" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                {/* Tank to Pump */}
                <path d="M 60 140 L 160 140" stroke="url(#glowLine)" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" fill="none" />
                
                {/* Pump to Boiler */}
                <path d="M 195 140 L 250 140 L 250 120 L 290 120" stroke="url(#glowLine)" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" fill="none" />
                
                {/* Boiler to Steam Header */}
                <path d="M 330 55 L 435 55" stroke="url(#glowLineSteam)" strokeWidth="3" fill="none" />
                
                {/* Steam Header to Process */}
                <path d="M 515 55 L 600 55" stroke="url(#glowLineSteam)" strokeWidth="2" strokeDasharray="6 4" className="animate-[dash_15s_linear_infinite]" fill="none" />

                {/* Boiler to Economizer (Flue Gas) */}
                <path d="M 360 140 L 360 210 L 390 210" stroke="url(#glowLineFlue)" strokeWidth="4" fill="none" />
                
                {/* Economizer to Stack */}
                <path d="M 470 210 L 585 210" stroke="url(#glowLineFlue)" strokeWidth="4" fill="none" />
                
              </svg>

            </div>
          </div>
        </div>

        {/* Right AI Insights Panel */}
        <div 
          className="bg-brand-panel-light/30 border border-brand-border/50 rounded-xl p-6 flex flex-col relative overflow-hidden group animate-fade-in-up opacity-0"
          style={{ animationDelay: '600ms' }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
          
          <div className="flex items-center gap-2 mb-6 relative z-10">
            <div className="p-1.5 bg-brand-primary/20 rounded-md">
              <Lightbulb size={16} className="text-brand-accent" />
            </div>
            <h3 className="text-slate-50 font-bold">AI Insights</h3>
          </div>

          <div className="flex-1 relative z-10">
            <div className="bg-[#192135] border border-amber-500/20 rounded-lg p-4 mb-4 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500/80"></div>
              <div className="flex items-start gap-3 mb-3">
                <AlertCircle size={16} className="text-amber-500 mt-0.5" />
                <h4 className="text-slate-50 text-sm font-bold">Feedwater temperature deviation detected</h4>
              </div>
              <div className="pl-7 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300">Probable Cause</span>
                  <span className="text-slate-50 font-semibold">Economizer fouling</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300">AI Confidence</span>
                  <span className="text-brand-accent font-bold bg-brand-accent/10 px-1.5 py-0.5 rounded">87%</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6 font-medium">
              The neural network detected an anomalous drop in economizer heat transfer coefficient over the last 12 hours, correlating with increased flue gas exit temperatures.
            </p>
          </div>

          <button className="relative z-10 w-full bg-white/5 hover:bg-brand-primary/20 border border-white/10 hover:border-brand-primary/50 text-slate-50 text-sm font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.15)]">
            View Recommended Actions
            <ChevronRight size={16} className="text-slate-300 group-hover:text-brand-accent transition-colors" />
          </button>
        </div>
      </div>

      {/* Bottom Chart Section */}
      <div 
        className="bg-brand-panel-light/30 border border-brand-border/50 rounded-xl p-6 animate-fade-in-up opacity-0"
        style={{ animationDelay: '700ms' }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-slate-50 font-semibold mb-1">Key Trend – Boiler Performance</h3>
            <p className="text-sm text-slate-400">Efficiency tracking over time</p>
          </div>
          
          {/* Tabs */}
          <div className="flex items-center bg-black/20 p-1 rounded-lg border border-white/5">
            {['1H', '6H', '24H', '7D'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === tab 
                    ? 'bg-brand-panel border border-brand-border/80 text-slate-50 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={efficiencyData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2c4a" vertical={false} />
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0e1628', borderColor: '#1e2c4a', borderRadius: '8px', color: '#f8fafc', fontSize: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                itemStyle={{ color: '#06b6d4' }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#06b6d4" 
                strokeWidth={2} 
                fillOpacity={1} 
                fill="url(#colorValue)" 
                activeDot={{ r: 5, fill: '#0e1628', stroke: '#06b6d4', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
      `}} />
    </div>
  );
};

export default Overview;
