
import React from 'react';
import { LayoutDashboard, MessageSquare, Database, Server, Settings, Activity, Trophy, Globe, BarChart4, HeartHandshake, Layers, ShieldCheck, Rocket } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'final', label: 'Production Ready', icon: Rocket }, // New v1.0 Final Tab
    { id: 'dashboard', label: 'Architecture', icon: LayoutDashboard },
    { id: 'management', label: 'Impact Console', icon: Activity },
    { id: 'access', label: 'Access Control', icon: ShieldCheck },
    { id: 'whitelabel', label: 'White-Label Studio', icon: Layers },
    { id: 'strategy', label: 'Business Audit', icon: BarChart4 },
    { id: 'impact', label: 'Donors & SDGs', icon: HeartHandshake },
    { id: 'chat', label: 'Simulator', icon: MessageSquare },
    { id: 'learning', label: 'Learning Hub', icon: Trophy },
    { id: 'knowledge', label: 'Knowledge Base', icon: Database },
    { id: 'settings', label: 'Configuration', icon: Settings },
    { id: 'landing', label: 'Public Website', icon: Globe },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col fixed left-0 top-0 border-r border-slate-800 z-50">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Server className="text-emerald-400" />
          Osikani Core
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-black tracking-widest border border-emerald-500/30">V1.0 FINAL</span>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Stable Build</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={18} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-lg p-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-slate-900 text-xs">
              A
            </div>
            <div>
              <p className="text-sm font-medium text-white">Admin</p>
              <p className="text-[10px] text-slate-400">Enterprise Verified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
