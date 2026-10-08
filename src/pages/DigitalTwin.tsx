import React, { useState } from 'react';
import { Maximize2, Wind, Flame, Gauge, Activity, Power, Play, Pause, FastForward, Droplet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DigitalTwin: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [flowMode, setFlowMode] = useState('All');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const flowTypes = ['All', 'Water', 'Steam', 'Fuel', 'Air', 'Flue Gas'];
  
  const getSpeedDur = (base: number) => isPaused ? '0s' : `${base / speed}s`;

  const isVisible = (type: string) => flowMode === 'All' || flowMode === type;

  const nodeData: Record<string, any> = {
    fwtank: { name: 'Feedwater Tank', temp: '105 °C', pressure: '3.2 bar', health: '98%', status: 'Nominal', relatedFlows: ['Water'] },
    fwpump: { name: 'Feedwater Pump', temp: '105 °C', pressure: '45 bar', health: '89%', status: 'Active', relatedFlows: ['Water'] },
    economizer: { name: 'Economizer', temp: '310 °C', pressure: '44 bar', health: '68%', status: 'Heat transfer degradation', conf: '87%', relatedFlows: ['Water', 'Flue Gas'] },
    furnace: { name: 'Furnace', temp: '890 °C', pressure: 'N/A', health: '94%', status: 'Optimal Combustion', relatedFlows: ['Fuel', 'Air', 'Flue Gas', 'Water', 'Steam'] },
    drum: { name: 'Steam Drum', temp: '485 °C', pressure: '42 bar', health: '92%', status: 'Level Stable (52%)', relatedFlows: ['Water', 'Steam'] },
    fdfan: { name: 'FD Fan', temp: 'Ambient', pressure: '240 mmWC', health: '95%', status: 'Nominal', relatedFlows: ['Air'] },
    stack: { name: 'Stack', temp: '168 °C', pressure: 'Atmospheric', health: '99%', status: 'Emissions Normal', relatedFlows: ['Flue Gas'] },
  };

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(prev => prev === nodeId ? null : nodeId);
  };

  const selectedData = selectedNode ? nodeData[selectedNode] : null;

  // Pipeline Paths for SVG
  // Grid layout roughly: Tank(10%, 85%), Pump(30%, 85%), Econ(50%, 65%), Furnace(65%, 45%), Drum(65%, 20%), FD Fan(45%, 85%), Stack(45%, 10%)
  const paths = {
    water1: "M 100 350 L 250 350", // Tank to Pump
    water2: "M 310 350 L 450 350 L 450 260 L 500 260", // Pump to Econ
    water3: "M 580 260 L 650 260 L 650 120", // Econ to Drum
    water4: "M 670 120 L 670 200", // Drum to Furnace (Downcomer)
    steam1: "M 710 200 L 710 120", // Furnace to Drum (Riser)
    steam2: "M 750 100 L 900 100", // Drum to Output
    air1: "M 350 400 L 450 400 L 450 350", // Intake to FD Fan
    air2: "M 510 350 L 600 350 L 600 280", // FD Fan to Furnace
    fuel1: "M 900 300 L 750 300 L 750 250", // Fuel to Furnace
    flue1: "M 650 220 L 580 220 L 580 250", // Furnace to Econ
    flue2: "M 500 220 L 450 220 L 450 120", // Econ to Stack
  };

  const FlowPath = ({ d, color, type, baseSpeed, relatedNodes }: any) => {
    if (!isVisible(type)) return null;
    
    // Check if we should highlight this path based on selection/hover
    const isHighlighted = (selectedNode && relatedNodes.includes(selectedNode)) || 
                          (hoveredNode && relatedNodes.includes(hoveredNode));
    const opacity = (selectedNode || hoveredNode) ? (isHighlighted ? 1 : 0.2) : 0.6;
    
    return (
      <g style={{ opacity, transition: 'opacity 0.3s ease' }}>
        <path d={d} stroke={color} strokeWidth="6" fill="none" opacity="0.2" strokeLinecap="round" strokeLinejoin="round" />
        {!isPaused && (
          <path d={d} stroke={color} strokeWidth="3" fill="none" strokeDasharray="4 12" strokeLinecap="round" strokeLinejoin="round">
            <animate attributeName="stroke-dashoffset" values="100;0" dur={getSpeedDur(baseSpeed)} repeatCount="indefinite" />
          </path>
        )}
      </g>
    );
  };

  const EquipNode = ({ id, x, y, children }: any) => {
    const isHovered = hoveredNode === id;
    const isSelected = selectedNode === id;
    const isDimmed = (selectedNode && !isSelected) || (hoveredNode && !isHovered);

    return (
      <motion.div 
        className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 ${isDimmed ? 'opacity-40' : 'opacity-100'} transition-opacity duration-300`}
        style={{ left: x, top: y }}
        onMouseEnter={() => setHoveredNode(id)}
        onMouseLeave={() => setHoveredNode(null)}
        onClick={() => handleNodeClick(id)}
        whileHover={{ scale: 1.05 }}
        animate={{ filter: isSelected ? 'drop-shadow(0 0 15px rgba(37,99,235,0.6))' : 'drop-shadow(0 0 0px rgba(0,0,0,0))' }}
      >
        {children}
        
        <AnimatePresence>
          {isHovered && !isSelected && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-brand-surface border border-brand-border px-3 py-2 rounded-lg shadow-xl min-w-[120px] text-center pointer-events-none"
            >
              <span className="block text-xs font-medium text-white mb-1">{nodeData[id].name}</span>
              <span className="block text-sm font-mono text-brand-primary">{nodeData[id].temp}</span>
              {nodeData[id].pressure !== 'N/A' && <span className="block text-[10px] text-slate-400 mt-1">{nodeData[id].pressure}</span>}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      
      {/* Header & Controls */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">Utility Digital Twin</h2>
          <p className="text-slate-400 text-sm">Live thermodynamic state mapping and process visualization</p>
        </div>
        
        <div className="flex items-center gap-6">
          
          {/* Flow Mode Toggle */}
          <div className="bg-brand-panel border border-brand-border rounded-lg p-1 flex">
            {flowTypes.map(type => (
              <button 
                key={type}
                onClick={() => setFlowMode(type)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${flowMode === type ? 'bg-brand-primary text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Speed Toggle */}
          <div className="bg-brand-panel border border-brand-border rounded-lg p-1 flex items-center gap-1">
            <FastForward size={14} className="text-slate-500 ml-2" />
            {[0.5, 1, 2].map(s => (
              <button 
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2 py-1 text-[10px] font-bold rounded transition-colors ${speed === s ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {s}x
              </button>
            ))}
          </div>

          {/* Play/Pause */}
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${isPaused ? 'bg-brand-warning/20 border-brand-warning/50 text-brand-warning' : 'bg-brand-success/20 border-brand-success/50 text-brand-success'}`}
          >
            {isPaused ? <Play size={16} /> : <Pause size={16} />}
            {isPaused ? 'Paused' : 'Live Flow'}
          </button>

          <button className="flex items-center gap-2 text-sm bg-brand-panel border border-brand-border px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-300">
            <Maximize2 size={16} /> Fullscreen
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-[600px]">
        
        {/* Main Digital Twin Area */}
        <div className="flex-1 bg-[#0b1221] border border-brand-border rounded-xl relative overflow-hidden flex items-center justify-center">
          
          {/* Ambient Grid */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMzMzQxNTUiLz48L3N2Zz4=')] opacity-20"></div>

          {/* Heat Glow for Furnace */}
          {!isPaused && <div className="absolute top-[45%] left-[68%] w-48 h-48 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }}></div>}

          {/* The SVG Pipeline Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
            <FlowPath type="Water" color="#06b6d4" baseSpeed={3} d={paths.water1} relatedNodes={['fwtank', 'fwpump']} />
            <FlowPath type="Water" color="#06b6d4" baseSpeed={4} d={paths.water2} relatedNodes={['fwpump', 'economizer']} />
            <FlowPath type="Water" color="#06b6d4" baseSpeed={3} d={paths.water3} relatedNodes={['economizer', 'drum']} />
            <FlowPath type="Water" color="#06b6d4" baseSpeed={2} d={paths.water4} relatedNodes={['drum', 'furnace']} />
            
            <FlowPath type="Steam" color="#e0f2fe" baseSpeed={2} d={paths.steam1} relatedNodes={['furnace', 'drum']} />
            <FlowPath type="Steam" color="#e0f2fe" baseSpeed={3} d={paths.steam2} relatedNodes={['drum']} />
            
            <FlowPath type="Air" color="#94a3b8" baseSpeed={2} d={paths.air1} relatedNodes={['fdfan']} />
            <FlowPath type="Air" color="#94a3b8" baseSpeed={3} d={paths.air2} relatedNodes={['fdfan', 'furnace']} />
            
            <FlowPath type="Fuel" color="#f59e0b" baseSpeed={4} d={paths.fuel1} relatedNodes={['furnace']} />
            
            <FlowPath type="Flue Gas" color="#f97316" baseSpeed={2} d={paths.flue1} relatedNodes={['furnace', 'economizer']} />
            <FlowPath type="Flue Gas" color="#f97316" baseSpeed={3} d={paths.flue2} relatedNodes={['economizer', 'stack']} />
          </svg>

          {/* HTML Overlay for Nodes to maintain exact positioning matching the SVG viewBox */}
          <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ maxWidth: '1000px', maxHeight: '600px', margin: 'auto' }}>
            
            {/* Feedwater Tank */}
            <EquipNode id="fwtank" x="10%" y="58%">
              <div className="w-16 h-20 bg-[#152136] border-2 border-slate-600 rounded-lg flex flex-col items-center justify-center shadow-lg relative pointer-events-auto">
                <div className="absolute bottom-0 w-full h-[70%] bg-cyan-900/40 rounded-b-lg"></div>
                <Droplet className="text-cyan-400 mb-1 z-10" size={18} />
                <span className="text-[10px] text-slate-300 font-bold z-10">FW TANK</span>
              </div>
            </EquipNode>

            {/* Feedwater Pump */}
            <EquipNode id="fwpump" x="28%" y="58%">
              <div className="w-14 h-14 bg-[#152136] border-2 border-slate-600 rounded-full flex items-center justify-center shadow-lg relative pointer-events-auto">
                <div className={`w-6 h-6 rounded-full border-2 border-slate-500 border-t-cyan-400 ${!isPaused ? 'animate-spin' : ''}`} style={{ animationDuration: getSpeedDur(1) }}></div>
              </div>
            </EquipNode>

            {/* FD Fan */}
            <EquipNode id="fdfan" x="48%" y="62%">
              <div className="w-14 h-14 bg-[#152136] border-2 border-slate-600 rounded-full flex flex-col items-center justify-center shadow-lg pointer-events-auto">
                <Wind className={`text-slate-400 ${!isPaused ? 'animate-spin' : ''}`} size={20} style={{ animationDuration: getSpeedDur(2) }} />
                <span className="text-[8px] text-slate-400 mt-1">FD FAN</span>
              </div>
            </EquipNode>

            {/* Economizer */}
            <EquipNode id="economizer" x="54%" y="43%">
              <div className={`w-24 h-16 bg-[#152136] border-2 ${selectedNode === 'economizer' ? 'border-amber-500' : 'border-slate-600'} rounded-lg flex flex-col items-center justify-center shadow-lg pointer-events-auto relative`}>
                <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                <Activity className="text-amber-400 mb-1" size={18} />
                <span className="text-[10px] text-slate-300 font-bold">ECONOMIZER</span>
              </div>
            </EquipNode>

            {/* Furnace */}
            <EquipNode id="furnace" x="69%" y="45%">
              <div className="w-28 h-36 bg-gradient-to-b from-[#152136] to-[#0f172a] border-2 border-orange-800 rounded-t-full rounded-b-lg flex flex-col items-center justify-end pb-4 shadow-[0_0_30px_rgba(234,88,12,0.15)] overflow-hidden pointer-events-auto relative">
                {!isPaused && <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-orange-600/40 to-transparent"></motion.div>}
                <Flame className="text-orange-500 mb-2 z-10" size={32} />
                <span className="text-xs text-orange-200 font-bold z-10">FURNACE</span>
              </div>
            </EquipNode>

            {/* Steam Drum */}
            <EquipNode id="drum" x="69%" y="20%">
              <div className="w-36 h-16 bg-[#152136] border-2 border-cyan-700 rounded-full flex flex-col items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.1)] overflow-hidden pointer-events-auto relative">
                <div className="absolute bottom-0 w-full h-[52%] bg-blue-900/40"></div>
                <span className="text-[10px] text-cyan-200 font-bold z-10 mb-0.5">STEAM DRUM</span>
                <Gauge className="text-cyan-400 z-10" size={14} />
              </div>
            </EquipNode>

            {/* Stack */}
            <EquipNode id="stack" x="45%" y="15%">
              <div className="w-16 h-28 bg-gradient-to-t from-[#152136] to-transparent border-x-2 border-t-2 border-slate-700 flex flex-col items-center justify-start pt-2 pointer-events-auto relative overflow-hidden">
                {!isPaused && <motion.div animate={{ y: [0, -20] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMTBRNSAwIDEwIDEwVDEwIDMwIiBzdHJva2U9IiM2NDc0OGIiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuMiIvPjwvc3ZnPg==')] opacity-50"></motion.div>}
                <Wind className="text-slate-500 mb-1 z-10" size={16} />
                <span className="text-[10px] text-slate-400 z-10">STACK</span>
              </div>
            </EquipNode>

            {/* External Labels */}
            <div className="absolute top-[16.6%] right-[5%] text-xs font-bold text-cyan-200 border border-cyan-800 bg-cyan-900/30 px-3 py-1 rounded backdrop-blur-sm pointer-events-auto">PROCESS</div>
            <div className="absolute top-[50%] right-[5%] text-xs font-bold text-orange-300 border border-orange-800 bg-orange-900/30 px-3 py-1 rounded backdrop-blur-sm pointer-events-auto">FUEL SUPPLY</div>
            <div className="absolute top-[66.6%] left-[28%] text-xs font-bold text-slate-400 border border-slate-700 bg-slate-800/30 px-3 py-1 rounded backdrop-blur-sm pointer-events-auto">AIR INTAKE</div>

          </div>
        </div>

        {/* Right Sidebar - Status Panel */}
        <div className="w-80 bg-brand-panel-light/30 border border-brand-border/50 rounded-xl flex flex-col overflow-hidden">
          <div className="p-5 border-b border-brand-border/50 bg-black/20">
            <h3 className="text-lg font-semibold text-white mb-1">
              {selectedNode ? selectedData.name : 'System Overview'}
            </h3>
            <p className="text-xs text-slate-400">
              {selectedNode ? 'Component Diagnostics' : 'Select a component for details'}
            </p>
          </div>
          
          <div className="p-6 flex-1 overflow-y-auto space-y-6">
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedNode || 'overview'}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {selectedNode ? (
                  <>
                    <div className="flex justify-between items-center bg-black/20 p-4 rounded-lg border border-brand-border/50">
                      <span className="text-sm text-slate-400">Health Score</span>
                      <span className={`text-2xl font-bold ${selectedData.health < '80%' ? 'text-amber-400' : 'text-green-400'}`}>{selectedData.health}</span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between border-b border-brand-border/50 pb-2">
                        <span className="text-xs text-slate-400 uppercase tracking-widest">Temperature</span>
                        <span className="text-sm text-white font-mono">{selectedData.temp}</span>
                      </div>
                      <div className="flex justify-between border-b border-brand-border/50 pb-2">
                        <span className="text-xs text-slate-400 uppercase tracking-widest">Pressure</span>
                        <span className="text-sm text-white font-mono">{selectedData.pressure}</span>
                      </div>
                      <div className="flex justify-between pb-2">
                        <span className="text-xs text-slate-400 uppercase tracking-widest">Status</span>
                        <span className={`text-sm font-medium ${selectedData.status === 'Nominal' || selectedData.status.includes('Stable') || selectedData.status.includes('Optimal') ? 'text-green-400' : 'text-amber-400'}`}>{selectedData.status}</span>
                      </div>
                    </div>

                    {selectedData.conf && (
                      <div className="bg-amber-900/20 border border-amber-800/50 p-4 rounded-lg">
                        <span className="text-xs text-amber-500 uppercase tracking-widest block mb-2 font-bold">AI Detection</span>
                        <p className="text-sm text-white mb-2">{selectedData.status}</p>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Confidence</span>
                          <span className="text-amber-400 font-mono font-bold">{selectedData.conf}</span>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
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

                    <div className="w-full h-px bg-slate-700 my-4"></div>

                    <div>
                      <span className="text-slate-400 text-sm block mb-2">AI Control Status</span>
                      <div className="bg-cyan-900/20 border border-cyan-800/50 rounded-lg p-3 flex items-center gap-3">
                        <div className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                        </div>
                        <span className="text-cyan-400 font-medium text-sm">Monitoring Active</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-400 text-sm block mb-2">Boiler Mode</span>
                      <div className="bg-black/20 border border-brand-border/50 rounded-lg p-3 flex items-center justify-between">
                        <span className="text-white font-medium text-sm">Automatic Optimization</span>
                        <Power className="text-green-500" size={16} />
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalTwin;
