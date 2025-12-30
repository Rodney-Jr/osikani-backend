
import React from 'react';
import { Activity, ShieldCheck, Cpu, Database, Network } from 'lucide-react';

const SecurityPulse: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
          <Activity size={14} className="text-emerald-500" />
          Security Middleware Pulse
        </h3>
        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          Uptime: 99.9%
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-800">
            <Cpu size={16} className="text-indigo-500" />
            <span className="text-xs font-black uppercase tracking-tight">Latency</span>
          </div>
          <div className="text-2xl font-black text-slate-900">42ms</div>
          <p className="text-[10px] text-slate-500 font-medium">Average Processing Time</p>
          <div className="h-1 w-full bg-slate-100 rounded-full">
            <div className="h-full bg-indigo-500 w-[15%]"></div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-800">
            <Database size={16} className="text-emerald-500" />
            <span className="text-xs font-black uppercase tracking-tight">DLP Accuracy</span>
          </div>
          <div className="text-2xl font-black text-slate-900">99.2%</div>
          <p className="text-[10px] text-slate-500 font-medium">True Positive Rate</p>
          <div className="h-1 w-full bg-slate-100 rounded-full">
            <div className="h-full bg-emerald-500 w-[99%]"></div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-800">
            <Network size={16} className="text-blue-500" />
            <span className="text-xs font-black uppercase tracking-tight">Throughput</span>
          </div>
          <div className="text-2xl font-black text-slate-900">1.2k</div>
          <p className="text-[10px] text-slate-500 font-medium">Requests per minute</p>
          <div className="h-1 w-full bg-slate-100 rounded-full">
            <div className="h-full bg-blue-500 w-[45%]"></div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100">
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
              <ShieldCheck size={16} />
            </div>
            <div>
              <p className="text-xs font-black text-slate-900">Auto-Update Enabled</p>
              <p className="text-[10px] text-slate-500">Syncing latest threat patterns from Google Cloud Security.</p>
            </div>
          </div>
          <button className="text-[10px] font-black text-indigo-600 uppercase hover:underline">
            Config
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityPulse;
