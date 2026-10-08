import React, { useState, useEffect } from 'react';
import { Play, TrendingUp, TrendingDown, ArrowRight, Lightbulb, AlertTriangle, CheckCircle2, AlertOctagon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const SimControl = ({ label, current, min, max, unit, step = 1, value, onChange }: any) => {
  return (
    <div className="bg-black/20 border border-brand-border/50 rounded-lg p-4 transition-colors focus-within:border-brand-primary/50">
      <div className="flex justify-between items-center mb-4">
        <span className="text-slate-300 font-medium">{label}</span>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-slate-500">Cur: {current}{unit}</span>
          <ArrowRight size={14} className="text-slate-600" />
          <span className="text-brand-accent font-bold bg-brand-accent/10 px-2 py-1 rounded shadow-[0_0_10px_rgba(6,182,212,0.15)]">
            Sim: {value}{unit}
          </span>
        </div>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step}
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand-accent h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-[10px] text-slate-500 mt-2 px-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

const ResultCard = ({ title, before, predicted, unit, goodDirection = 'up' }: any) => {
  const impact = Number((predicted - before).toFixed(1));
  const isPositive = impact > 0;
  // If impact is exactly 0, neutral
  const isNeutral = impact === 0;
  
  let isGood = goodDirection === 'up' ? isPositive : !isPositive;
  if (isNeutral) isGood = true;

  const color = isNeutral ? 'text-slate-400' : isGood ? 'text-brand-success' : 'text-brand-critical';
  const Icon = isNeutral ? TrendingUp : isPositive ? TrendingUp : TrendingDown;

  return (
    <div className="bg-brand-panel-light/30 border border-brand-border/50 rounded-lg p-4 flex flex-col transition-all hover:bg-brand-panel-light/40">
      <span className="text-slate-400 text-sm mb-2">{title}</span>
      <div className="flex items-end justify-between mb-2">
        <div className="flex items-baseline gap-1">
          <motion.span 
            key={predicted}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white"
          >
            {predicted}
          </motion.span>
          <span className="text-sm text-slate-500">{unit}</span>
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${color}`}>
          <Icon size={16} className={isNeutral ? 'opacity-0' : ''} />
          {impact > 0 ? '+' : ''}{impact}{title === 'CO₂ Emissions' || title.includes('Efficiency') ? '%' : ''}
        </div>
      </div>
      <div className="text-xs text-slate-500 flex justify-between border-t border-brand-border/50 pt-2 mt-auto">
        <span>Current: {before}{unit}</span>
      </div>
    </div>
  );
};

const WhatIfSimulation: React.FC = () => {
  const [simRunning, setSimRunning] = useState(false);
  const [showResults, setShowResults] = useState(true);

  // States for the 4 inputs
  const [load, setLoad] = useState(80);
  const [air, setAir] = useState(18);
  const [temp, setTemp] = useState(105);
  const [fuel, setFuel] = useState(18.4);

  // Base constants
  const baseLoad = 80;
  const baseAir = 18;
  const baseTemp = 105;
  const baseFuel = 18.4;
  
  const baseEff = 91.8;
  const baseSteam = 100;
  const baseCO2 = 100;

  // Calculated Prediction States
  const [predEff, setPredEff] = useState(baseEff);
  const [predFuel, setPredFuel] = useState(baseFuel);
  const [predSteam, setPredSteam] = useState(baseSteam);
  const [predCO2, setPredCO2] = useState(baseCO2);

  const [riskLevel, setRiskLevel] = useState<'Low' | 'Medium' | 'High'>('Low');
  const [riskMessages, setRiskMessages] = useState<string[]>([]);
  const [recommendation, setRecommendation] = useState('');

  // The Live Calculation Engine
  useEffect(() => {
    // Math model for Boiler Digital Twin Simulation
    const dTemp = temp - baseTemp;

    // Air optimization (12% is optimal)
    const airScoreBase = Math.abs(baseAir - 12);
    const airScoreNew = Math.abs(air - 12);
    const effAirChange = (airScoreBase - airScoreNew) * 0.35; // 0.35% eff penalty per 1% air deviation

    // Load optimization (85% is optimal)
    const loadScoreBase = Math.abs(baseLoad - 85);
    const loadScoreNew = Math.abs(load - 85);
    const effLoadChange = (loadScoreBase - loadScoreNew) * 0.15; // 0.15% eff penalty per 1% load deviation

    // Feedwater temp (0.05% eff gain per degree C)
    const effTempChange = dTemp * 0.05;

    let newEff = baseEff + effAirChange + effLoadChange + effTempChange;
    // Cap efficiency
    if (newEff > 96) newEff = 96;

    // Steam generation driven by Fuel and Efficiency
    const fuelFactor = fuel / baseFuel;
    const effFactor = newEff / baseEff;
    const newSteam = baseSteam * fuelFactor * effFactor;

    // CO2 Emissions (Indexed to 100). Higher fuel = more CO2. Better eff = less CO2.
    const newCO2 = baseCO2 * fuelFactor * (baseEff / newEff);

    setPredEff(Number(newEff.toFixed(1)));
    setPredFuel(Number(fuel.toFixed(1)));
    setPredSteam(Number(newSteam.toFixed(1)));
    setPredCO2(Number(newCO2.toFixed(1)));

    // Risk Engine
    let rLevel: 'Low' | 'Medium' | 'High' = 'Low';
    let rMsgs: string[] = [];
    
    if (load > 95) {
      rLevel = 'High';
      rMsgs.push("Boiler load is approaching critical upper threshold.");
    } else if (load > 90) {
      rLevel = 'Medium';
      rMsgs.push("High load may increase thermal stress.");
    }

    if (air < 11.5) {
      rLevel = 'High';
      rMsgs.push("Very low excess air causes incomplete combustion risk.");
    } else if (air > 21) {
      if (rLevel === 'Low') rLevel = 'Medium';
      rMsgs.push("High excess air leads to severe dry flue gas heat loss.");
    }

    if (temp < 95) {
      if (rLevel === 'Low') rLevel = 'Medium';
      rMsgs.push("Low feedwater temperature risks economizer cold-end corrosion.");
    }

    if (fuel > 23 && air < 15) {
      rLevel = 'High';
      rMsgs.push("High fuel flow with low air creates severe unburned fuel hazard.");
    } else if (fuel > 23) {
      if (rLevel === 'Low') rLevel = 'Medium';
      rMsgs.push("High fuel consumption reduces overall plant profitability.");
    }

    if (rMsgs.length === 0) {
      rMsgs.push("Operating conditions remain within optimal safe envelope.");
      if (newEff > baseEff + 0.5) {
        setRecommendation(`Excellent optimization. Operating at ${load}% load with ${air}% air yields high thermal efficiency while maintaining safe performance.`);
      } else {
        setRecommendation("Safe operating parameters. Consider reducing excess air slightly toward 12-14% to further optimize efficiency.");
      }
    } else {
      if (rLevel === 'High') {
        setRecommendation("Current simulation poses significant operational risk. Reduce load, increase air, or lower fuel flow immediately.");
      } else {
        setRecommendation("Sub-optimal parameters detected. Review air-fuel mixture and monitor thermal limits closely.");
      }
    }

    setRiskLevel(rLevel);
    setRiskMessages(rMsgs);

  }, [load, air, temp, fuel]);


  const handleRun = () => {
    setSimRunning(true);
    setShowResults(false);
    setTimeout(() => {
      setSimRunning(false);
      setShowResults(true);
    }, 1200);
  };

  const chartData = [
    { name: 'Efficiency', before: baseEff, predicted: predEff },
    { name: 'Fuel', before: baseFuel, predicted: predFuel },
    { name: 'Steam', before: baseSteam, predicted: predSteam },
    { name: 'CO₂ Index', before: baseCO2, predicted: predCO2 },
  ];

  return (
    <div className="space-y-6 h-full flex flex-col animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">What-If Simulation</h2>
        <p className="text-slate-400 text-sm">Predictive modeling and scenario optimization engine</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-[700px]">
        
        {/* Left Side - Inputs */}
        <div className="bg-brand-panel-light/30 border border-brand-border/50 rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Simulation Parameters</h3>
            <span className="text-xs font-mono bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full border border-brand-primary/30 shadow-[0_0_10px_rgba(37,99,235,0.1)]">
              AI ENGINE ACTIVE
            </span>
          </div>
          
          <div className="space-y-6 flex-1">
            <SimControl label="Boiler Load" current={baseLoad} min={50} max={100} unit="%" value={load} onChange={setLoad} />
            <SimControl label="Excess Air" current={baseAir} min={10} max={25} unit="%" value={air} onChange={setAir} />
            <SimControl label="Feedwater Temperature" current={baseTemp} min={90} max={130} unit="°C" value={temp} onChange={setTemp} />
            <SimControl label="Fuel Flow" current={baseFuel} min={10} max={25} step={0.1} unit=" TPH" value={fuel} onChange={setFuel} />
          </div>

          <button 
            onClick={handleRun}
            disabled={simRunning}
            className={`w-full mt-8 py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-lg transition-all ${
              simRunning 
                ? 'bg-brand-panel border border-brand-border text-slate-400 cursor-not-allowed' 
                : 'bg-brand-primary hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]'
            }`}
          >
            {simRunning ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-[3px] border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                Executing Matrix...
              </div>
            ) : (
              <>
                <Play fill="currentColor" size={20} />
                Run Full Simulation
              </>
            )}
          </button>
        </div>

        {/* Right Side - Results */}
        <div className="bg-brand-panel-light/30 border border-brand-border/50 rounded-xl p-6 flex flex-col relative overflow-hidden">
          
          <AnimatePresence>
            {!showResults && simRunning && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-brand-bg/80 backdrop-blur-md z-30 flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 border-4 border-brand-border border-t-brand-primary rounded-full animate-spin mb-4"></div>
                <p className="text-brand-primary font-medium font-mono animate-pulse">RECALCULATING TWIN PHYSICS...</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Predicted Impact</h3>
            
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border shadow-lg ${
              riskLevel === 'Low' ? 'bg-brand-success/10 text-brand-success border-brand-success/30' :
              riskLevel === 'Medium' ? 'bg-brand-warning/10 text-brand-warning border-brand-warning/30' :
              'bg-brand-critical/10 text-brand-critical border-brand-critical/30'
            }`}>
              {riskLevel === 'Low' && <CheckCircle2 size={14} />}
              {riskLevel === 'Medium' && <AlertTriangle size={14} />}
              {riskLevel === 'High' && <AlertOctagon size={14} />}
              {riskLevel.toUpperCase()} RISK
            </div>
          </div>
          
          <div className={`flex-1 flex flex-col transition-opacity duration-300 ${showResults ? 'opacity-100' : 'opacity-10'}`}>
            
            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <ResultCard title="Boiler Efficiency" before={baseEff} predicted={predEff} unit="%" goodDirection="up" />
              <ResultCard title="Fuel Consumption" before={baseFuel} predicted={predFuel} unit=" TPH" goodDirection="down" />
              <ResultCard title="Steam Output" before={baseSteam} predicted={predSteam} unit=" TPH" goodDirection="up" />
              <ResultCard title="CO₂ Emissions" before={baseCO2} predicted={predCO2} unit="%" goodDirection="down" />
            </div>

            {/* Dynamic Chart */}
            <div className="h-64 w-full bg-black/20 rounded-lg p-4 border border-brand-border/50 mb-6 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc', borderRadius: '8px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
                  <Bar dataKey="before" name="Current" fill="#334155" radius={[4, 4, 0, 0]} animationDuration={500} />
                  <Bar dataKey="predicted" name="Predicted" fill="#06b6d4" radius={[4, 4, 0, 0]} animationDuration={800} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Dynamic Risk & Recommendation Panel */}
            <div className="space-y-4 mt-auto">
              
              {/* Dynamic Risk Messages */}
              <div className="bg-black/30 border border-brand-border/50 rounded-lg p-3">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2 block">Safety & Risk Assessment</span>
                <ul className="space-y-1.5">
                  {riskMessages.map((msg, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <div className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        riskLevel === 'Low' ? 'bg-brand-success' : riskLevel === 'Medium' ? 'bg-brand-warning' : 'bg-brand-critical'
                      }`}></div>
                      {msg}
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI Recommendation */}
              <div className={`border rounded-lg p-4 flex gap-4 items-start shadow-lg transition-colors duration-500 ${
                riskLevel === 'High' ? 'bg-red-900/20 border-red-800/50' : 
                riskLevel === 'Medium' ? 'bg-amber-900/20 border-amber-800/50' : 
                'bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 border-brand-primary/30'
              }`}>
                <div className={`p-2 rounded-full mt-0.5 flex-shrink-0 ${
                  riskLevel === 'High' ? 'bg-red-500/20' : 
                  riskLevel === 'Medium' ? 'bg-amber-500/20' : 
                  'bg-brand-primary/20'
                }`}>
                  <Lightbulb className={
                    riskLevel === 'High' ? 'text-red-400' : 
                    riskLevel === 'Medium' ? 'text-amber-400' : 
                    'text-brand-accent'
                  } size={20} />
                </div>
                <div>
                  <h4 className={`font-semibold mb-1 text-sm ${
                    riskLevel === 'High' ? 'text-red-400' : 
                    riskLevel === 'Medium' ? 'text-amber-400' : 
                    'text-brand-accent'
                  }`}>AI Optimization Recommendation</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    "{recommendation}"
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIfSimulation;
