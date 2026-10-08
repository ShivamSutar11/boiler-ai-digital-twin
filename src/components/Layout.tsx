import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Activity, Search, Settings, Cpu, AlertTriangle, Bell, User } from 'lucide-react';

const Layout: React.FC = () => {
  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'AI Anomaly Detection', path: '/dashboard/anomaly-detection', icon: <Activity size={18} /> },
    { name: 'Root Cause Analysis', path: '/dashboard/root-cause', icon: <Search size={18} /> },
    { name: 'Prescriptive Maintenance', path: '/dashboard/maintenance', icon: <Settings size={18} /> },
    { name: 'Utility Digital Twin', path: '/dashboard/digital-twin', icon: <Cpu size={18} /> },
    { name: 'What-If Simulation', path: '/dashboard/simulation', icon: <AlertTriangle size={18} /> },
  ];

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-gradient-to-r from-[#4b6cb7] to-[#182848] flex">
      
      {/* Cinematic Glowing Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-float"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[40%] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none animate-float-delayed"></div>
      <div className="absolute top-[40%] left-[30%] w-[20%] h-[20%] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none animate-float"></div>

      {/* Main Full-Screen App Container */}
      <div className="relative w-full h-full bg-brand-panel/80 backdrop-blur-xl flex overflow-hidden flex-col md:flex-row z-10 animate-fade-in">
        
        {/* Sidebar */}
        <aside className="w-64 bg-brand-panel-light/30 border-r border-brand-border flex flex-col flex-shrink-0 z-10">
          <div className="p-6 border-b border-brand-border/50">
            <h1 className="text-lg font-bold text-slate-50 tracking-wide flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center shadow-lg">
                <Cpu size={18} className="text-white" />
              </div>
              <span className="leading-tight">
                Boiler AI
                <span className="block text-[10px] text-slate-300 font-normal uppercase tracking-widest mt-0.5">Platform</span>
              </span>
            </h1>
          </div>
          
          <nav className="flex-1 py-6">
            <ul className="space-y-1.5 px-4">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                        isActive || (item.name === 'Overview' && window.location.pathname === '/dashboard')
                          ? 'bg-brand-primary/10 text-brand-accent font-semibold shadow-[inset_2px_0_0_0_#06b6d4]'
                          : 'text-slate-300 font-medium hover:text-slate-50 hover:bg-white/5'
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-5 border-t border-brand-border/50">
             <div className="flex items-center gap-3 bg-black/20 p-3 rounded-lg border border-white/5">
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-success"></div>
                  <div className="absolute inset-0 rounded-full bg-brand-success animate-ping opacity-75"></div>
                </div>
                <span className="text-xs text-slate-200 font-medium tracking-wide">System Online</span>
             </div>
          </div>
        </aside>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative z-10">
          
          {/* Top Header */}
          <header className="h-16 flex-shrink-0 border-b border-brand-border/50 px-8 flex items-center justify-between bg-brand-panel/50 backdrop-blur-md">
            <h2 className="text-slate-50 font-semibold tracking-wide">Chemical Plant Boiler AI & Digital Twin</h2>
            
            <div className="flex items-center gap-6">
              <button className="relative text-slate-300 hover:text-white transition-colors">
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-accent rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-3 border-l border-brand-border/50 pl-6">
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-white font-medium">S. Engineer</p>
                  <p className="text-[10px] text-slate-300">Operations</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center text-brand-accent">
                  <User size={14} />
                </div>
              </div>
            </div>
          </header>

          {/* Main Scrollable Area */}
          <main className="flex-1 overflow-y-auto p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
