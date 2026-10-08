import React, { useState } from 'react';
import { Play, TrendingUp, TrendingDown, ArrowRight, Lightbulb } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Efficiency (%)', before: 91.8, predicted: 93.9 },
  { name: 'Fuel (TPH)', before: 18.4, predicted: 17.8 },
  { name: 'Steam (TPH)', before: 100, predicted: 108 },
  { name: 'CO₂ (%)', before: 100, predicted: 97.3 },
];

const SimControl = ({ label, current, min, max, unit, step = 1 }: any) => {
  const [val, setVal] = useState(current + step);
  return (
    <div className="bg-black/20 border border-brand-border/50 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <span className="text-slate-300 font-medium">{label}</span>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-slate-500">Cur: {current}{unit}</span>
          <ArrowRight size={14} className="text-slate-600" />
          <span className="text-cyan-400 font-bold bg-cyan-900/20 px-2 py-1 rounded">Sim: {val}{unit}</span>
        </div>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step}
        value={val} 
        onChange={(e) => setVal(Number(e.target.value))}
        className="w-full accent-cyan-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};

const ResultCard = ({ title, before, predicted, impact, unit, goodDirection = 'up' }: any) => {
  const isPositive = impact > 0;
  const isGood = goodDirection === 'up' ? isPositive : !isPositive;
  const color = isGood ? 'text-green-400' : 'text-red-400';
  const Icon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className="bg-brand-panel-light/30 border border-brand-border/50 rounded-lg p-4 flex flex-col">
      <span className="text-slate-400 text-sm mb-2">{title}</span>
      <div className="flex items-end justify-between mb-2">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-white">{predicted}</span>
          <span className="text-sm text-slate-500">{unit}</span>
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${color}`}>
          <Icon size={16} />
          {impact > 0 ? '+' : ''}{impact}{title === 'CO₂ Emissions' || title.includes('Efficiency') ? '%' : ''}
        </div>
      </div>
      <div className="text-xs text-slate-500 flex justify-between border-t border-brand-border/50 pt-2 mt-auto">
        <span>Before: {before}{unit}</span>
      </div>
    </div>
  );
};

const WhatIfSimulation: React.FC = () => {
  const [simRunning, setSimRunning] = useState(false);
  const [showResults, setShowResults] = useState(true);

  const handleRun = () => {
    setSimRunning(true);
    setShowResults(false);
    setTimeout(() => {
      setSimRunning(false);
      setShowResults(true);
    }, 1500);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">What-If Simulation</h2>
        <p className="text-slate-400">Predictive modeling for operational optimization</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        
        {/* Left Side - Inputs */}
        <div className="bg-brand-panel-light/30 border border-brand-border/50 rounded-xl p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6">Simulation Parameters</h3>
          
          <div className="space-y-5 flex-1">
            <SimControl label="Boiler Load" current={80} min={50} max={100} unit="%" />
            <SimControl label="Excess Air" current={18} min={10} max={25} unit="%" />
            <SimControl label="Feedwater Temperature" current={105} min={90} max={130} unit="°C" />
            <SimControl label="Fuel Flow" current={18.4} min={10} max={25} step={0.1} unit=" TPH" />
          </div>

          <button 
            onClick={handleRun}
            disabled={simRunning}
            className={`w-full mt-6 py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-lg transition-all ${
              simRunning 
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]'
            }`}
          >
            {simRunning ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                Running Models...
              </div>
            ) : (
              <>
                <Play fill="currentColor" size={20} />
                Run Simulation
              </>
            )}
          </button>
        </div>

        {/* Right Side - Results */}
        <div className="bg-brand-panel-light/30 border border-brand-border/50 rounded-xl p-6 flex flex-col relative overflow-hidden">
          {!showResults && !simRunning && (
            <div className="absolute inset-0 bg-black/20/80 backdrop-blur-sm z-10 flex items-center justify-center">
              <p className="text-slate-400 font-medium">Adjust parameters and run simulation to view predicted impact.</p>
            </div>
          )}

          <h3 className="text-lg font-semibold text-white mb-6">Predicted Impact</h3>
          
          <div className={`transition-opacity duration-500 ${showResults ? 'opacity-100' : 'opacity-30'}`}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <ResultCard title="Boiler Efficiency" before={91.8} predicted={93.9} impact={+2.1} unit="%" goodDirection="up" />
              <ResultCard title="Fuel Consumption" before={18.4} predicted={17.8} impact={-3.4} unit=" TPH" goodDirection="down" />
              <ResultCard title="Steam Output" before={100} predicted={108} impact={+8} unit=" TPH" goodDirection="up" />
              <ResultCard title="CO₂ Emissions" before={100} predicted={97.3} impact={-2.7} unit="%" goodDirection="down" />
            </div>

            <div className="h-64 w-full bg-black/20 rounded-lg p-4 border border-brand-border/50 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: '#1e293b' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
                  <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
                  <Bar dataKey="before" name="Current" fill="#475569" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="predicted" name="Predicted" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-800/50 rounded-lg p-4 flex gap-4 items-start">
              <div className="p-2 bg-cyan-500/20 rounded-full mt-0.5">
                <Lightbulb className="text-cyan-400" size={20} />
              </div>
              <div>
                <h4 className="text-cyan-400 font-semibold mb-1 text-sm">AI Optimization Recommendation</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  "Operating at 88–90% load with reduced excess air may improve efficiency by 2.1% while maintaining safe operating limits and reducing specific fuel consumption."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIfSimulation;
