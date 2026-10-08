import React from 'react';
import { Search, AlertCircle, ArrowDown, TrendingUp, TrendingDown, ArrowRight, BrainCircuit } from 'lucide-react';

const RootCauseAnalysis: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">AI Root Cause Analysis</h2>
        <p className="text-slate-400">Automated diagnostic tracking and fault isolation</p>
      </div>

      {/* Main Alert */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-500/20 rounded-full">
            <AlertCircle className="text-amber-400" size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-amber-400">Boiler Efficiency Drop Detected</h3>
            <p className="text-amber-200/70 text-sm">Initiating automated root cause isolation sequence...</p>
          </div>
        </div>
        <div className="bg-black/20 border border-brand-border/50 px-6 py-3 rounded-lg text-center flex items-center gap-4">
          <div>
            <p className="text-slate-500 text-xs">Previous</p>
            <p className="text-green-400 font-mono text-lg">91.8%</p>
          </div>
          <ArrowRight className="text-slate-600" />
          <div>
            <p className="text-slate-500 text-xs">Current</p>
            <p className="text-amber-400 font-mono text-lg">86.4%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Flow Diagram */}
        <div className="lg:col-span-2 bg-brand-panel-light/30 border border-brand-border/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-8">Root Cause Progression Path</h3>
          
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <div className="bg-amber-500/20 border border-amber-500/40 text-amber-100 px-6 py-3 rounded-lg w-64 text-center font-medium shadow-lg">
              Efficiency Drop (86.4%)
            </div>
            
            <ArrowDown className="text-slate-600" size={24} />
            
            <div className="bg-slate-700 border border-slate-600 text-white px-6 py-3 rounded-lg w-64 text-center">
              Flue Gas Temperature Increased
            </div>
            
            <ArrowDown className="text-slate-600" size={24} />
            
            <div className="bg-slate-700 border border-slate-600 text-white px-6 py-3 rounded-lg w-64 text-center">
              Heat Transfer Reduced
            </div>
            
            <ArrowDown className="text-cyan-500" size={24} />
            
            <div className="bg-cyan-900/40 border-2 border-cyan-500/50 text-cyan-300 px-6 py-4 rounded-lg w-72 text-center font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              Primary Cause: Economizer Fouling
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          {/* Ranked Causes */}
          <div className="bg-brand-panel-light/30 border border-brand-border/50 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Search size={16} className="text-slate-400" />
              Ranked Probable Causes
            </h3>
            
            <div className="space-y-4">
              {[
                { name: 'Economizer Fouling', prob: 87, color: 'bg-cyan-500' },
                { name: 'Excess Air in Combustion', prob: 62, color: 'bg-slate-500' },
                { name: 'Feedwater Temperature Drop', prob: 41, color: 'bg-slate-600' },
                { name: 'Fuel Quality Variation', prob: 28, color: 'bg-slate-700' },
              ].map((cause, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={idx === 0 ? 'text-cyan-400 font-medium' : 'text-slate-300'}>{idx + 1}. {cause.name}</span>
                    <span className={idx === 0 ? 'text-cyan-400 font-bold' : 'text-slate-400'}>{cause.prob}%</span>
                  </div>
                  <div className="w-full bg-black/20 rounded-full h-1.5">
                    <div className={`${cause.color} h-1.5 rounded-full`} style={{ width: `${cause.prob}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Affected Parameters */}
          <div className="bg-brand-panel-light/30 border border-brand-border/50 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Correlated Parameter Shifts</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/20 border border-brand-border/50 p-3 rounded-lg flex justify-between items-center">
                <span className="text-sm text-slate-300">Flue Gas Temp</span>
                <TrendingUp size={16} className="text-red-400" />
              </div>
              <div className="bg-black/20 border border-brand-border/50 p-3 rounded-lg flex justify-between items-center">
                <span className="text-sm text-slate-300">O₂ Level</span>
                <TrendingUp size={16} className="text-amber-400" />
              </div>
              <div className="bg-black/20 border border-brand-border/50 p-3 rounded-lg flex justify-between items-center">
                <span className="text-sm text-slate-300">Fuel Consump.</span>
                <TrendingUp size={16} className="text-amber-400" />
              </div>
              <div className="bg-black/20 border border-brand-border/50 p-3 rounded-lg flex justify-between items-center">
                <span className="text-sm text-slate-300">Efficiency</span>
                <TrendingDown size={16} className="text-red-400" />
              </div>
            </div>
          </div>

          {/* AI Explanation */}
          <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-800/50 rounded-xl p-5">
             <h3 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
              <BrainCircuit size={16} />
              AI Diagnostic Reasoning
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              "The AI model detected an increase in flue gas temperature while steam load remained stable. Combined with reduced heat-transfer efficiency and increased fuel consumption to maintain pressure, this data signature strongly indicates probable economizer fouling."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootCauseAnalysis;
