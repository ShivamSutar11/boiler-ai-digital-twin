import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Cpu, Activity, BrainCircuit, Settings, GitBranch, ArrowRight, ShieldAlert, BarChart3, Database } from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050B16] text-[#F8FAFC] font-sans overflow-x-hidden selection:bg-[#2563EB]/30">
      
      {/* Animated Background System */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#2563EB]/10 rounded-full blur-[150px] mix-blend-screen animate-pulse duration-1000"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#22D3EE]/5 rounded-full blur-[150px] mix-blend-screen"></div>
        
        {/* Background Engineering SVG Grid & Pipelines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94A3B8" strokeWidth="0.5" strokeOpacity="0.2"/>
            </pattern>
            <linearGradient id="pipeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0" />
              <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Subtle Animated Pipes in background */}
          <path d="M -100 200 L 300 200 L 300 600 L 800 600" fill="none" stroke="#1E293B" strokeWidth="2" />
          <path d="M -100 200 L 300 200 L 300 600 L 800 600" fill="none" stroke="url(#pipeGlow)" strokeWidth="3" strokeDasharray="100 800" strokeDashoffset="0">
            <animate attributeName="stroke-dashoffset" values="900;-100" dur="15s" repeatCount="indefinite" />
          </path>

          <path d="M 800 300 L 1200 300 L 1200 800" fill="none" stroke="#1E293B" strokeWidth="2" />
          <path d="M 800 300 L 1200 300 L 1200 800" fill="none" stroke="url(#pipeGlow)" strokeWidth="3" strokeDasharray="150 1000" strokeDashoffset="0">
            <animate attributeName="stroke-dashoffset" values="1150;-150" dur="20s" repeatCount="indefinite" />
          </path>
          
          {/* Sensor Nodes */}
          <circle cx="300" cy="200" r="4" fill="#22D3EE" className="animate-ping opacity-50" style={{ animationDuration: '3s' }} />
          <circle cx="800" cy="600" r="4" fill="#2563EB" className="animate-ping opacity-50" style={{ animationDuration: '4s' }} />
          <circle cx="1200" cy="300" r="4" fill="#6366F1" className="animate-ping opacity-50" style={{ animationDuration: '5s' }} />
        </svg>
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-[#050B16]/80 backdrop-blur-md border-[#1E293B]/50 py-4' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#22D3EE] flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              <Cpu size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-wide">Boiler AI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#94A3B8]">
            <a href="#platform" className="hover:text-white transition-colors">Platform</a>
            <a href="#digital-twin" className="hover:text-white transition-colors">Digital Twin</a>
            <a href="#capabilities" className="hover:text-white transition-colors">AI Capabilities</a>
            <a href="#simulation" className="hover:text-white transition-colors">Simulation</a>
          </div>

          <button onClick={() => navigate('/dashboard')} className="bg-[#1E293B] hover:bg-[#2563EB] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors border border-[#334155] hover:border-transparent">
            Open Dashboard
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E293B]/50 border border-[#334155]/50 text-[#22D3EE] text-xs font-medium mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22D3EE] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22D3EE]"></span>
              </span>
              AI-Powered Industrial Intelligence
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              Intelligent Boiler Operations.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#6366F1] to-[#22D3EE]">Powered by AI.</span>
            </h1>
            
            <p className="text-lg text-[#94A3B8] mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Monitor, analyze, predict, and optimize chemical plant boiler performance through AI-driven insights and a live digital twin.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button onClick={() => navigate('/dashboard')} className="w-full sm:w-auto bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center justify-center gap-2">
                Enter Digital Twin <ArrowRight size={18} />
              </button>
              <a href="#capabilities" className="w-full sm:w-auto bg-[#0A1425] hover:bg-[#1E293B] border border-[#1E293B] hover:border-[#334155] text-white px-8 py-4 rounded-xl font-medium transition-all flex items-center justify-center">
                Explore AI Capabilities
              </a>
            </div>
          </motion.div>

          {/* Right Hero Visual (2.5D Animated Boiler SVG) */}
          <motion.div 
            style={{ y: y2 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex-1 relative w-full max-w-lg lg:max-w-none aspect-square lg:aspect-auto h-[500px]"
          >
            {/* Ambient Back Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#2563EB]/10 to-[#22D3EE]/10 rounded-full blur-3xl opacity-50"></div>
            
            {/* The SVG Container */}
            <div className="absolute inset-0 flex items-center justify-center">
              
              {/* Floating Labels */}
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[15%] left-[10%] bg-[#0A1425]/80 backdrop-blur-md border border-[#1E293B] px-4 py-2 rounded-lg shadow-xl z-20">
                <span className="block text-xl font-mono text-[#22D3EE] font-bold">91.8%</span>
                <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider">Efficiency</span>
              </motion.div>
              
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[30%] right-[5%] bg-[#0A1425]/80 backdrop-blur-md border border-[#1E293B] px-4 py-2 rounded-lg shadow-xl z-20">
                <span className="block text-xl font-mono text-[#F8FAFC] font-bold">42 bar</span>
                <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider">Steam Pressure</span>
              </motion.div>

              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[25%] left-[5%] bg-[#0A1425]/80 backdrop-blur-md border border-[#1E293B] px-4 py-2 rounded-lg shadow-xl z-20">
                <span className="block text-xl font-mono text-[#6366F1] font-bold">82 TPH</span>
                <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider">Steam Demand</span>
              </motion.div>

              <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute bottom-[15%] right-[15%] bg-[#0A1425]/80 backdrop-blur-md border border-[#1E293B] px-4 py-2 rounded-lg shadow-xl z-20 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border-[3px] border-[#34D399] border-t-transparent animate-spin"></div>
                <div>
                  <span className="block text-xl font-mono text-[#34D399] font-bold leading-none">92%</span>
                  <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider">Health Score</span>
                </div>
              </motion.div>

              {/* 2.5D Isometric SVG Boiler Representation */}
              <svg viewBox="0 0 400 400" className="w-[80%] h-[80%] drop-shadow-2xl opacity-90 z-10">
                <defs>
                  <linearGradient id="boilerGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#1E293B" />
                    <stop offset="100%" stopColor="#050B16" />
                  </linearGradient>
                  <linearGradient id="flame" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#F87171" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                
                {/* Base Plate */}
                <path d="M 100 300 L 200 350 L 350 270 L 250 220 Z" fill="#0A1425" stroke="#1E293B" strokeWidth="2" />
                
                {/* Furnace Section */}
                <path d="M 120 280 L 200 320 L 280 280 L 280 180 L 200 140 L 120 180 Z" fill="url(#boilerGrad)" stroke="#334155" strokeWidth="2" />
                <path d="M 120 180 L 200 220 L 280 180" fill="none" stroke="#334155" strokeWidth="2" />
                <path d="M 200 320 L 200 220" fill="none" stroke="#334155" strokeWidth="2" />
                
                {/* Inner Flame Glow (Animated) */}
                <path d="M 160 260 L 200 280 L 240 260 L 200 230 Z" fill="url(#flame)" className="animate-pulse" style={{ animationDuration: '2s' }} />
                
                {/* Steam Drum */}
                <path d="M 180 130 L 260 90 L 300 110 L 220 150 Z" fill="#0F172A" stroke="#22D3EE" strokeWidth="1.5" />
                <path d="M 180 130 L 180 150 L 220 170 L 220 150 Z" fill="#0A1425" stroke="#22D3EE" strokeWidth="1.5" />
                <path d="M 220 170 L 300 130 L 300 110 L 220 150 Z" fill="#1E293B" stroke="#22D3EE" strokeWidth="1.5" />
                
                {/* Connecting Pipes (Risers/Downcomers) */}
                <path d="M 190 145 L 190 190" fill="none" stroke="#64748B" strokeWidth="4" />
                <path d="M 210 155 L 210 210" fill="none" stroke="#64748B" strokeWidth="4" />
                <path d="M 240 140 L 240 195" fill="none" stroke="#64748B" strokeWidth="4" />

                {/* Steam Outlet Pipe */}
                <path d="M 260 90 L 260 50 L 330 20" fill="none" stroke="#38BDF8" strokeWidth="3" />
                <circle cx="330" cy="20" r="4" fill="#38BDF8" className="animate-ping" style={{ animationDuration: '3s' }} />
              </svg>
            </div>
          </motion.div>
        </div>
      </main>

      {/* AI Intelligence Section */}
      <section id="capabilities" className="py-24 bg-[#0A1425] relative border-y border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-semibold mb-4">AI Intelligence Across the Boiler Lifecycle</h2>
            <p className="text-[#94A3B8]">Comprehensive predictive analytics and automation modules designed specifically for chemical process boiler systems.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: Activity, title: 'AI Anomaly Detection', desc: 'Real-time deviation tracking from optimal baseline.' },
              { icon: BrainCircuit, title: 'Root Cause Analysis', desc: 'Automated diagnostic fault isolation.' },
              { icon: Settings, title: 'Prescriptive Maintenance', desc: 'Predictive health scoring and work orders.' },
              { icon: Cpu, title: 'Utility Digital Twin', desc: 'Live thermodynamic state mapping.' },
              { icon: GitBranch, title: 'What-If Simulation', desc: 'Predictive modeling for operational optimization.' },
            ].map((cap, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#050B16] border border-[#1E293B] hover:border-[#2563EB]/50 p-6 rounded-xl transition-all hover:-translate-y-1 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#1E293B] group-hover:bg-[#2563EB]/20 flex items-center justify-center mb-4 transition-colors">
                  <cap.icon size={20} className="text-[#22D3EE]" />
                </div>
                <h3 className="text-[#F8FAFC] font-medium mb-2">{cap.title}</h3>
                <p className="text-sm text-[#94A3B8]">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold mb-16">The Intelligence Flow</h2>
          
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 relative z-10">
            {/* Background connecting line (visible on large screens) */}
            <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-[#1E293B] -z-10"></div>

            {[
              { title: 'Plant Sensors', icon: Database },
              { title: 'AI Monitoring', icon: Activity },
              { title: 'Digital Twin', icon: Cpu },
              { title: 'Root Cause', icon: BrainCircuit },
              { title: 'Recommend Action', icon: ShieldAlert },
              { title: 'Simulation', icon: BarChart3 }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center bg-[#0A1425] px-6 py-4 rounded-xl border border-[#1E293B] shadow-xl"
              >
                <step.icon size={24} className="text-[#2563EB] mb-2" />
                <span className="text-xs font-medium uppercase tracking-wider text-[#94A3B8]">{step.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Twin Preview Section */}
      <section id="digital-twin" className="py-24 bg-[#0A1425] border-t border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              style={{ y: y1 }}
              className="flex-1 w-full bg-[#050B16] border border-[#1E293B] rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="border-b border-[#1E293B] bg-[#0A1425] px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#334155]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#334155]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#334155]"></div>
                </div>
                <div className="mx-auto bg-[#050B16] text-[#94A3B8] text-[10px] font-mono px-6 py-1 rounded border border-[#1E293B]">
                  boiler-ai.local / digital-twin
                </div>
              </div>
              <div className="p-8 aspect-video relative flex items-center justify-center bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMzMzQxNTUiLz48L3N2Zz4=')] bg-opacity-20">
                {/* Mockup nodes */}
                <div className="absolute top-[50%] left-[10%] bg-[#1E293B] p-3 rounded border border-[#334155] text-xs">Feedwater</div>
                <div className="absolute top-[40%] left-[40%] bg-[#2563EB]/20 border border-[#2563EB] p-6 rounded-xl text-center shadow-[0_0_20px_rgba(37,99,235,0.2)]">Boiler B-101</div>
                <div className="absolute top-[20%] right-[30%] bg-[#1E293B] p-3 rounded border border-[#334155] text-xs">Steam Header</div>
                <div className="absolute bottom-[20%] right-[30%] bg-[#1E293B] p-3 rounded border border-[#334155] text-xs">Economizer</div>
                
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                  <path d="M 20% 50% L 40% 50%" stroke="#22D3EE" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_5s_linear_infinite]" />
                  <path d="M 60% 40% L 70% 25%" stroke="#F8FAFC" strokeWidth="2" />
                  <path d="M 60% 60% L 70% 80%" stroke="#F59E0B" strokeWidth="2" />
                </svg>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <h2 className="text-3xl font-semibold mb-6">See the Boiler.<br/>Understand the System.</h2>
              <p className="text-[#94A3B8] mb-8 leading-relaxed">
                Gain unprecedented visibility into your plant's thermodynamic state. The interactive digital twin maps live sensor telemetry to the physical assets, instantly revealing performance bottlenecks across the feedwater, boiler, header, and downstream processes.
              </p>
              <ul className="space-y-4 mb-8">
                {['Live thermodynamic state mapping', 'End-to-end component visibility', 'Visual anomaly highlighting'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-[#F8FAFC]">
                    <div className="w-5 h-5 rounded-full bg-[#2563EB]/20 flex items-center justify-center text-[#22D3EE]">✓</div>
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate('/dashboard')} className="bg-[#1E293B] hover:bg-[#334155] text-white px-6 py-3 rounded-lg font-medium transition-colors border border-[#334155]">
                Launch Interactive Digital Twin
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Insight Example Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-[#6366F1]/5 blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-3xl font-semibold mb-6">Actionable Intelligence,<br/>Not Just Alerts.</h2>
            <p className="text-[#94A3B8] mb-8 leading-relaxed">
              Traditional SCADA systems give you alarms. Boiler AI gives you the root cause and prescriptive actions. Our neural networks analyze thousands of correlated data points to diagnose issues before they impact production.
            </p>
          </motion.div>

          <div className="flex-1 w-full max-w-md relative">
            {/* The Showcase Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-[#0A1425] border border-[#1E293B] p-8 rounded-2xl shadow-2xl relative z-10"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 text-[#2563EB]">
                  <BrainCircuit size={20} />
                  <span className="font-medium text-sm">AI Diagnostic Log</span>
                </div>
                <span className="text-xs bg-[#F59E0B]/10 text-[#F59E0B] px-2 py-1 rounded border border-[#F59E0B]/20">Warning</span>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] text-[#94A3B8] uppercase tracking-widest block mb-1">AI Detected</span>
                  <p className="text-[#F8FAFC] font-medium">Feedwater temperature deviation</p>
                </div>
                <div className="pl-4 border-l-2 border-[#1E293B] space-y-4">
                  <div>
                    <span className="text-[10px] text-[#94A3B8] uppercase tracking-widest block mb-1">Probable Cause</span>
                    <p className="text-[#F8FAFC]">Economizer fouling</p>
                  </div>
                  <div className="flex gap-8">
                    <div>
                      <span className="text-[10px] text-[#94A3B8] uppercase tracking-widest block mb-1">Confidence</span>
                      <p className="text-[#22D3EE] font-mono font-medium">87%</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#94A3B8] uppercase tracking-widest block mb-1">Impact</span>
                      <p className="text-[#F87171] font-mono font-medium">Boiler Efficiency -3.8%</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#1E293B]/50 rounded-lg p-4 border border-[#334155]/50 mt-4">
                  <span className="text-[10px] text-[#2563EB] uppercase tracking-widest block mb-2 font-bold">Recommended Action</span>
                  <p className="text-sm text-[#F8FAFC]">Inspect economizer during next planned maintenance window.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative border-t border-[#1E293B] bg-[#0A1425]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2563EB]/5 to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-semibold mb-6">Move From Monitoring to Intelligent Operations</h2>
          <p className="text-lg text-[#94A3B8] mb-10 max-w-2xl mx-auto">
            Experience the future of chemical plant management today. Enter the interactive digital twin and explore the capabilities.
          </p>
          <button onClick={() => navigate('/dashboard')} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-10 py-5 rounded-xl font-medium text-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]">
            Enter Boiler AI Platform
          </button>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to { stroke-dashoffset: -100; }
        }
      `}} />
    </div>
  );
};

export default Landing;
