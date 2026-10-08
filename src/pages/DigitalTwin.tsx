import React from 'react';
import { Activity, Power, Settings, Cpu, Droplet, Flame, Wind, Gauge, ArrowRight } from 'lucide-react';

const PipeFlow = ({ color = 'text-cyan-500' }: any) => {
  return (
    <div className={`flex items-center justify-center overflow-hidden w-full ${color}`}>
      <div className="flex animate-pulse gap-1">
        <ArrowRight size={16} className="opacity-40" />
        <ArrowRight size={16} className="opacity-70" />
        <ArrowRight size={16} />
      </div>
    </div>
  );
};

const ValueBadge = ({ value, label, color = 'bg-brand-panel-light/30' }: any) => (
  <div className={`absolute px-2 py-1 rounded text-xs border border-slate-600 z-10 shadow-lg ${color} whitespace-nowrap`}>
    <span className="font-bold text-white block">{value}</span>
    <span className="text-slate-400 text-[10px] uppercase leading-none">{label}</span>
  </div>
);

const DigitalTwin: React.FC = () => {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
          <Cpu className="text-cyan-400" />
          Utility Digital Twin
        </h2>
        <p className="text-slate-400">Live operational topology and thermodynamic state mapping</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
        {/* Main Twin View */}
        <div className="lg:col-span-3 bg-[#0f172a] border border-brand-border/50 rounded-xl p-8 relative overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]">
          {/* Background grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
            
            {/* The Schematic Container */}
            <div className="relative w-full max-w-4xl h-[400px]">
              
              {/* === Components === */}
              
              {/* Feedwater Tank */}
              <div className="absolute top-[300px] left-[5%] w-24 h-20 bg-brand-panel-light/30 border-2 border-blue-800 rounded-lg flex flex-col items-center justify-center z-10 shadow-lg">
                <Droplet className="text-blue-500 mb-1" size={20} />
                <span className="text-[10px] text-slate-300 font-medium">FW TANK</span>
                <ValueBadge value="105 °C" label="Temp" color="bg-black/20 border-blue-900 -top-6 -right-12" />
              </div>

              {/* Feedwater Pump */}
              <div className="absolute top-[310px] left-[25%] w-16 h-16 bg-brand-panel-light/30 border-2 border-slate-600 rounded-full flex flex-col items-center justify-center z-10">
                <Settings className="text-slate-400 animate-[spin_3s_linear_infinite]" size={24} />
                <ValueBadge value="32 bar" label="Press" color="bg-black/20 -bottom-8 -right-4" />
              </div>

              {/* Economizer */}
              <div className="absolute top-[150px] left-[45%] w-20 h-32 bg-brand-panel-light/30 border-2 border-slate-600 rounded-lg flex flex-col items-center justify-center z-10 shadow-lg">
                <div className="w-12 h-24 border border-slate-600 rounded flex items-center justify-center bg-gradient-to-t from-blue-900/20 to-red-900/20">
                  <span className="text-[10px] text-slate-300 transform -rotate-90">ECONOMIZER</span>
                </div>
              </div>

              {/* FD Fan */}
              <div className="absolute top-[310px] left-[45%] w-16 h-16 bg-brand-panel-light/30 border-2 border-slate-600 rounded-full flex flex-col items-center justify-center z-10">
                <Wind className="text-slate-400 animate-[spin_2s_linear_infinite]" size={24} />
                <span className="text-[10px] text-slate-400 mt-1">FD FAN</span>
              </div>

              {/* Furnace / Boiler */}
              <div className="absolute top-[180px] left-[65%] w-32 h-40 bg-brand-panel-light/30 border-2 border-orange-800 rounded-t-full rounded-b-lg flex flex-col items-center justify-end pb-4 z-10 shadow-[0_0_30px_rgba(234,88,12,0.15)] overflow-hidden">
                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-orange-600/30 to-transparent"></div>
                <Flame className="text-orange-500 mb-2 relative z-10" size={32} />
                <span className="text-xs text-orange-200 font-bold relative z-10">FURNACE</span>
                <ValueBadge value="890 °C" label="Temp" color="bg-black/20 border-orange-900 top-1/2 -left-16" />
              </div>

              {/* Steam Drum */}
              <div className="absolute top-[80px] left-[65%] w-40 h-20 bg-brand-panel-light/30 border-2 border-cyan-800 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_20px_rgba(6,182,212,0.1)] overflow-hidden">
                <div className="absolute bottom-0 w-full h-1/2 bg-blue-900/30"></div>
                <span className="text-[10px] text-cyan-200 font-bold z-10 mb-1">STEAM DRUM</span>
                <Gauge className="text-cyan-400 z-10" size={16} />
                <ValueBadge value="52%" label="Level" color="bg-black/20 border-cyan-900 -top-8 left-1/4" />
              </div>

              {/* Stack */}
              <div className="absolute top-[20px] left-[46%] w-16 h-24 bg-brand-panel-light/30 border-x-2 border-t-2 border-slate-600 flex flex-col items-center justify-start pt-2 z-10">
                <Wind className="text-slate-500 mb-1" size={16} />
                <span className="text-[10px] text-slate-400">STACK</span>
                <ValueBadge value="168 °C" label="Flue Gas" color="bg-black/20 border-slate-600 -top-8 -right-16" />
              </div>

              {/* === Connecting Pipes & Flows === */}

              {/* FW Tank to Pump */}
              <div className="absolute top-[340px] left-[15%] w-[10%] h-2 bg-blue-900/50 flex items-center">
                <PipeFlow color="text-blue-500" />
              </div>

              {/* Pump to Economizer */}
              <div className="absolute top-[340px] left-[35%] w-[10%] h-2 bg-blue-900/50 flex items-center"></div>
              <div className="absolute top-[260px] left-[45%] w-2 h-[80px] bg-blue-900/50"></div>
              <div className="absolute top-[260px] left-[40%] w-[5%] h-2 bg-blue-900/50">
                <PipeFlow color="text-blue-500" />
              </div>

              {/* Economizer to Steam Drum */}
              <div className="absolute top-[160px] left-[55%] w-[10%] h-2 bg-cyan-900/50 flex items-center">
                <PipeFlow color="text-cyan-500" />
              </div>

              {/* Drum to Furnace (Downcomer) */}
              <div className="absolute top-[280px] left-[68%] w-2 h-[20px] bg-blue-900/50"></div>

              {/* Furnace to Drum (Riser) */}
              <div className="absolute top-[280px] left-[78%] w-2 h-[20px] bg-cyan-900/50"></div>

              {/* Steam Output */}
              <div className="absolute top-[120px] left-[90%] w-[10%] h-2 bg-cyan-500/30 flex items-center">
                <PipeFlow color="text-cyan-400" />
                <ValueBadge value="485 °C" label="42 bar" color="bg-cyan-900 border-cyan-500 -top-10 -right-4" />
              </div>

              {/* Fuel Supply */}
              <div className="absolute top-[240px] left-[85%] w-[15%] h-2 bg-orange-900/50 flex items-center transform -rotate-180">
                <PipeFlow color="text-orange-500" />
                <div className="absolute -left-12 text-[10px] text-orange-300 font-bold">FUEL</div>
              </div>

              {/* Air Supply to FD Fan */}
              <div className="absolute top-[340px] left-[55%] w-[10%] h-2 bg-slate-700 flex items-center transform -rotate-180">
                <PipeFlow color="text-slate-400" />
              </div>

              {/* FD Fan to Furnace */}
              <div className="absolute top-[340px] left-[61%] w-[4%] h-2 bg-slate-700 flex items-center"></div>

              {/* Furnace to Economizer (Flue Gas) */}
              <div className="absolute top-[220px] left-[55%] w-[10%] h-12 border-t-4 border-l-4 border-brand-border/50 rounded-tl-lg opacity-50"></div>
              
              {/* Economizer to Stack */}
              <div className="absolute top-[144px] left-[50%] w-4 h-[6px] bg-slate-700"></div>

            </div>
          </div>
        </div>

        {/* Right Sidebar - Status Panel */}
        <div className="bg-brand-panel-light/30 border border-brand-border/50 rounded-xl flex flex-col">
          <div className="p-5 border-b border-brand-border/50">
            <h3 className="text-lg font-semibold text-white mb-1">Digital Twin Health</h3>
            <p className="text-xs text-slate-400">System State Summary</p>
          </div>
          
          <div className="p-5 space-y-6 flex-1">
            
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Overall Health</span>
              <div className="flex items-center gap-2">
                <span className="text-green-400 font-bold text-xl">92%</span>
                <Activity className="text-green-400" size={18} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Current Load</span>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-xl">82%</span>
                <span className="text-xs text-slate-500">MCR</span>
              </div>
            </div>

            <div className="w-full h-px bg-slate-700 my-2"></div>

            <div>
              <span className="text-slate-400 text-sm block mb-2">AI Control Status</span>
              <div className="bg-cyan-900/20 border border-cyan-800/50 rounded-lg p-3 flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                </div>
                <span className="text-cyan-400 font-medium">Monitoring Active</span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 text-sm block mb-2">Boiler Operating Mode</span>
              <div className="bg-black/20 border border-brand-border/50 rounded-lg p-3 flex items-center justify-between">
                <span className="text-white font-medium">Automatic</span>
                <Power className="text-green-500" size={16} />
              </div>
            </div>

            <div className="mt-auto pt-6">
              <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                <span className="text-xs text-slate-400 block mb-1">Plant Efficiency</span>
                <span className="text-2xl font-bold text-white">91.8<span className="text-sm text-slate-400">%</span></span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalTwin;
