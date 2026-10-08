import React from 'react';
import { Wrench, Calendar } from 'lucide-react';

const HealthCard = ({ name, score, risk, days }: any) => {
  const getRiskColor = (r: string) => {
    if (r === 'High') return 'text-red-400';
    if (r === 'Medium') return 'text-amber-400';
    return 'text-green-400';
  };
  
  const getScoreColor = (s: number) => {
    if (s < 70) return 'stroke-amber-500';
    if (s < 50) return 'stroke-red-500';
    return 'stroke-green-500';
  };

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-brand-panel-light/30 border border-brand-border/50 rounded-xl p-5 flex items-center justify-between hover:border-slate-600 transition-colors cursor-pointer">
      <div>
        <h4 className="text-white font-medium mb-2">{name}</h4>
        <div className="flex flex-col gap-1 text-sm">
          <span className="text-slate-400 flex items-center gap-1">
            Risk: <span className={getRiskColor(risk)}>{risk}</span>
          </span>
          {days && (
            <span className="text-slate-400 flex items-center gap-1">
              Est. Maint: <span className="text-white">{days} days</span>
            </span>
          )}
        </div>
      </div>
      
      {/* Circular Progress */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        <svg className="transform -rotate-90 w-16 h-16">
          <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-700" />
          <circle 
            cx="32" cy="32" r={radius} 
            stroke="currentColor" 
            strokeWidth="4" 
            fill="transparent" 
            strokeDasharray={circumference} 
            strokeDashoffset={strokeDashoffset} 
            className={`${getScoreColor(score)} transition-all duration-1000 ease-in-out`} 
          />
        </svg>
        <span className="absolute text-sm font-bold text-white">{score}%</span>
      </div>
    </div>
  );
};

const PrescriptiveMaintenance: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Prescriptive Maintenance</h2>
        <p className="text-slate-400">Predictive health scoring and AI-driven maintenance scheduling</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Equipment Health */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-end">
            <h3 className="text-lg font-semibold text-white">Equipment Health Overview</h3>
            <span className="text-sm text-slate-400">Sorted by Health Score</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <HealthCard name="Economizer" score={68} risk="Medium" days={12} />
            <HealthCard name="Feedwater Pump" score={72} risk="Medium" days={18} />
            <HealthCard name="ID Fan" score={84} risk="Low" days={45} />
            <HealthCard name="FD Fan" score={91} risk="Low" />
            <HealthCard name="Steam Valve" score={95} risk="Low" />
          </div>

          <div className="bg-brand-panel-light/30 border border-brand-border/50 rounded-xl overflow-hidden mt-6">
            <div className="p-4 border-b border-brand-border/50 bg-brand-panel-light/30/50">
              <h3 className="text-sm font-semibold text-white">Maintenance Priority Queue</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-black/20/50 text-slate-400">
                  <tr>
                    <th className="p-4 font-medium">Equipment</th>
                    <th className="p-4 font-medium">Issue</th>
                    <th className="p-4 font-medium">Priority</th>
                    <th className="p-4 font-medium">Due In</th>
                    <th className="p-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50 text-slate-300">
                  <tr className="hover:bg-brand-panel-light/30/50">
                    <td className="p-4">Economizer</td>
                    <td className="p-4 text-amber-400">Fouling Detected</td>
                    <td className="p-4"><span className="bg-amber-500/20 text-amber-400 px-2 py-1 rounded text-xs">High</span></td>
                    <td className="p-4">12 days</td>
                    <td className="p-4"><span className="text-slate-400">Pending</span></td>
                  </tr>
                  <tr className="hover:bg-brand-panel-light/30/50">
                    <td className="p-4">Feedwater Pump</td>
                    <td className="p-4">Bearing Vibration</td>
                    <td className="p-4"><span className="bg-amber-500/20 text-amber-400 px-2 py-1 rounded text-xs">Medium</span></td>
                    <td className="p-4">18 days</td>
                    <td className="p-4"><span className="text-cyan-400">Scheduled</span></td>
                  </tr>
                  <tr className="hover:bg-brand-panel-light/30/50">
                    <td className="p-4">ID Fan</td>
                    <td className="p-4">Routine Inspection</td>
                    <td className="p-4"><span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">Low</span></td>
                    <td className="p-4">45 days</td>
                    <td className="p-4"><span className="text-slate-400">Pending</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - AI Recommendation */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-900/50 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-amber-500/10 p-5 border-b border-amber-900/30 flex items-center gap-3">
              <Wrench className="text-amber-400" />
              <h3 className="text-lg font-bold text-amber-400">AI Recommendation</h3>
            </div>
            
            <div className="p-5 space-y-4">
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Target Equipment</span>
                <p className="text-white font-medium flex items-center gap-2">
                  Feedwater Pump <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded text-xs">Priority: Medium</span>
                </p>
              </div>

              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Detected Issue</span>
                <p className="text-slate-300 text-sm bg-brand-panel-light/30 p-3 rounded-lg border border-brand-border/50">Increasing bearing vibration (Trend +12% over 30 days)</p>
              </div>

              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">AI Prediction</span>
                <p className="text-amber-200/80 text-sm">Possible bearing degradation leading to potential failure if untreated.</p>
              </div>

              <div className="bg-cyan-900/20 border border-cyan-800/50 rounded-lg p-4 mt-2">
                <span className="text-xs text-cyan-500 uppercase tracking-wider block mb-2">Prescribed Action</span>
                <p className="text-cyan-100 text-sm font-medium mb-3">"Inspect bearing and check lubrication during next maintenance window."</p>
                <div className="flex items-center gap-2 text-sm text-cyan-300">
                  <Calendar size={16} />
                  <span>Recommended Time: <strong className="text-white">Within 14 days</strong></span>
                </div>
              </div>
              
              <button className="w-full mt-4 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg transition-colors border border-slate-600 font-medium">
                Schedule Work Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptiveMaintenance;
