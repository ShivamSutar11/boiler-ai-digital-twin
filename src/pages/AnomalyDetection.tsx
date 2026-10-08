import React from 'react';
import { AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';

const timeSeriesData = [
  { time: '10:00', value: 875 },
  { time: '10:10', value: 880 },
  { time: '10:20', value: 890 },
  { time: '10:30', value: 920 }, // Anomaly starts
  { time: '10:35', value: 945 },
  { time: '10:40', value: 940 },
  { time: '10:50', value: 910 },
  { time: '11:00', value: 885 },
];

const SensorCard = ({ title, value, unit, status = 'normal' }: any) => {
  const isAnomaly = status === 'critical';
  return (
    <div className={`p-4 rounded-xl border ${isAnomaly ? 'bg-red-500/10 border-red-500/30' : 'bg-brand-panel-light/30 border-brand-border/50'}`}>
      <p className="text-slate-400 text-sm mb-1">{title}</p>
      <div className="flex items-baseline gap-1">
        <span className={`text-2xl font-bold ${isAnomaly ? 'text-red-400' : 'text-white'}`}>{value}</span>
        <span className="text-sm text-slate-400">{unit}</span>
      </div>
    </div>
  );
};

const AnomalyDetection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">AI Anomaly Detection</h2>
        <p className="text-slate-400">Continuous pattern recognition and deviation tracking</p>
      </div>

      {/* Sensor Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <SensorCard title="Furnace Temperature" value="945" unit="°C" status="critical" />
        <SensorCard title="Steam Pressure" value="42" unit="bar" />
        <SensorCard title="Feedwater Temp" value="105" unit="°C" />
        <SensorCard title="Drum Level" value="52" unit="%" />
        <SensorCard title="O₂ Level" value="3.2" unit="%" />
        <SensorCard title="Fuel Flow" value="18.4" unit="TPH" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 bg-brand-panel-light/30 border border-brand-border/50 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Furnace Temperature History</h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-slate-400">Normal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-slate-400">Anomaly</span>
              </div>
            </div>
          </div>
          
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis domain={[800, 1000]} stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569' }} />
                <ReferenceArea x1="10:30" x2="10:50" strokeOpacity={0.3} fill="#ef4444" fillOpacity={0.1} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  dot={(props: any) => {
                    const { cx, cy, payload } = props;
                    const isAnomalous = payload.value > 900;
                    return (
                      <circle cx={cx} cy={cy} r={4} fill="#0f172a" stroke={isAnomalous ? '#ef4444' : '#22c55e'} strokeWidth={2} />
                    );
                  }}
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Anomaly Details */}
        <div className="space-y-6">
          {/* Alert Box */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5 relative overflow-hidden">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="text-red-400 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-bold text-red-400">Furnace Temperature Anomaly</h3>
                <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">Active Alert</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-red-500/20 pb-2">
                <span className="text-slate-400 text-sm">Current</span>
                <span className="text-red-400 font-bold">945 °C</span>
              </div>
              <div className="flex justify-between items-center border-b border-red-500/20 pb-2">
                <span className="text-slate-400 text-sm">Expected Range</span>
                <span className="text-green-400">850–900 °C</span>
              </div>
              <div className="flex justify-between items-center border-b border-red-500/20 pb-2">
                <span className="text-slate-400 text-sm">Deviation</span>
                <span className="text-red-400 font-medium flex items-center gap-1"><TrendingUp size={14}/> +6.8%</span>
              </div>
              <div className="flex justify-between items-center border-b border-red-500/20 pb-2">
                <span className="text-slate-400 text-sm">AI Confidence</span>
                <span className="text-cyan-400 font-bold">94%</span>
              </div>
              <div className="pt-2">
                <span className="text-slate-400 text-sm block mb-1">Possible Impact:</span>
                <p className="text-slate-300 text-sm">Reduced combustion efficiency and increased fuel consumption.</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-brand-panel-light/30 border border-brand-border/50 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Clock size={16} className="text-slate-400" />
              Anomaly Timeline
            </h3>
            
            <div className="space-y-4">
              {[
                { time: '10:20 AM', text: 'Normal operation', status: 'normal' },
                { time: '10:32 AM', text: 'Temperature deviation started', status: 'warning' },
                { time: '10:35 AM', text: 'AI anomaly detected', status: 'critical' },
                { time: '10:37 AM', text: 'Operator alerted', status: 'info' },
              ].map((event, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-2.5 h-2.5 rounded-full ${
                      event.status === 'normal' ? 'bg-green-500' :
                      event.status === 'warning' ? 'bg-amber-500' :
                      event.status === 'critical' ? 'bg-red-500' : 'bg-blue-500'
                    }`}></div>
                    {idx !== 3 && <div className="w-px h-full bg-slate-700 my-1"></div>}
                  </div>
                  <div className="-mt-1.5 pb-2">
                    <span className="text-xs text-slate-500 block">{event.time}</span>
                    <span className="text-sm text-slate-300">{event.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnomalyDetection;
