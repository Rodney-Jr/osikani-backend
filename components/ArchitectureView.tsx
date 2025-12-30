
import React from 'react';
import { Database, Cloud, Zap, Brain, MessageCircle, Server, ShieldCheck, FileText, Lock, Globe, ArrowRight, ShieldAlert, Code, Layers, Activity } from 'lucide-react';

const ArchitectureView: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto pb-20">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-rose-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Enterprise v2.6</span>
          <span className="bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Middleware Enabled</span>
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">System Infrastructure</h2>
        <p className="text-slate-600 mt-2 text-lg font-medium">
          Distributed Middleware Architecture with 3-Tier Waterfall Inference.
        </p>
      </header>

      {/* SEQUENTIAL PIPELINE FLOW */}
      <div className="mb-16">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
          <Code size={14} className="text-indigo-500" /> Sequential Request Pipeline
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
          
          {[
            { label: "Ingress", sub: "WhatsApp Webhook", icon: MessageCircle, color: "bg-emerald-500" },
            { label: "Middleware", sub: "Auth & Rate Limit", icon: Activity, color: "bg-amber-500" },
            { label: "Shield", sub: "DLP & PII Redact", icon: ShieldCheck, color: "bg-rose-500" },
            { label: "Orchestrator", sub: "Tier Selection", icon: Layers, color: "bg-indigo-500" },
            { label: "Inference", sub: "Hybrid Gemini", icon: Brain, color: "bg-sky-500" },
            { label: "Egress", sub: "Meta Cloud API", icon: SendIcon, color: "bg-slate-900" }
          ].map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center">
              <div className={`w-14 h-14 ${step.color} text-white rounded-2xl flex items-center justify-center shadow-lg mb-3 border-4 border-white`}>
                <step.icon size={24} />
              </div>
              <div className="text-center">
                <p className="text-xs font-black text-slate-900 leading-none">{step.label}</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase mt-1 tracking-tighter">{step.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Main Diagram Area */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-slate-50/50" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-stretch gap-12">
              <div className="w-full md:w-48 flex flex-col gap-4">
                 <div className="bg-indigo-600 text-white p-6 rounded-[2rem] shadow-xl text-center flex flex-col items-center">
                    <MessageCircle className="mb-2" size={32} />
                    <span className="font-black text-sm">WhatsApp</span>
                    <span className="text-[9px] opacity-60 uppercase font-black tracking-widest mt-1">Direct Webhook</span>
                 </div>
                 {/* Explicit Middleware Box */}
                 <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-center shadow-sm">
                    <Activity size={20} className="mx-auto text-amber-600 mb-1" />
                    <span className="text-[9px] font-black text-amber-700 uppercase tracking-widest">Routing Middleware</span>
                    <p className="text-[8px] text-amber-500 mt-0.5">Tenant Auth | Session Sync</p>
                 </div>
                 <div className="p-4 bg-white border border-slate-200 rounded-2xl text-center shadow-sm">
                    <ShieldAlert size={20} className="mx-auto text-rose-500 mb-1" />
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">DLP Gateway</span>
                 </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="p-6 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl border-l-8 border-l-emerald-500">
                   <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Core Intelligence Node</span>
                      <Cloud size={16} className="text-slate-600" />
                   </div>
                   <div className="grid grid-cols-1 gap-3">
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer">
                         <Zap className="text-amber-400" size={20} />
                         <div>
                            <p className="text-xs font-black">1. Semantic Cache</p>
                            <p className="text-[9px] opacity-50">Instant Hits | Redis</p>
                         </div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer">
                         <Database className="text-indigo-400" size={20} />
                         <div>
                            <p className="text-xs font-black">2. Knowledge RAG</p>
                            <p className="text-[9px] opacity-50">Vector Search | Localized IP</p>
                         </div>
                      </div>
                      <div className="p-4 bg-emerald-600/20 rounded-2xl border border-emerald-500/30 flex items-center gap-4 hover:bg-emerald-600/30 transition-colors cursor-pointer">
                         <Brain className="text-emerald-400" size={20} />
                         <div>
                            <p className="text-xs font-black">3. Gemini 3 Orchestrator</p>
                            <p className="text-[9px] opacity-70">Deep Reasoning | Multi-Dialect</p>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center gap-8">
             <div className="flex-1 space-y-2">
                <h4 className="font-black text-slate-900 text-lg">Why use a separate Middleware?</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Moving security and routing to a dedicated middleware ensures that <strong>Sensitive PII</strong> is stripped before reaching the cloud, and allows for <strong>Multi-Tenant Orchestration</strong> where partner banks can use their own custom RAG namespaces dynamically.
                </p>
             </div>
             <div className="w-full md:w-56 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
                <Lock size={32} className="mx-auto text-rose-500 mb-2" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Compliance</span>
                <p className="text-xs font-bold text-slate-800 mt-1">DPC Ghana Validated</p>
             </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-indigo-600 text-white p-8 rounded-[3rem] shadow-xl relative overflow-hidden group">
              <Layers className="absolute -bottom-6 -right-6 opacity-10 group-hover:scale-110 transition-transform" size={140} />
              <h4 className="text-xs font-black uppercase tracking-widest mb-4">Middleware Metrics</h4>
              <div className="space-y-4">
                 <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-xs opacity-70">Middleware Overhead</span>
                    <span className="text-xs font-black">8ms</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-xs opacity-70">Rate Limit Drops</span>
                    <span className="text-xs font-black">0.02%</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-xs opacity-70">Tenant Isolation</span>
                    <span className="text-xs font-black">Verified</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-xs opacity-70">Session Sync</span>
                    <span className="text-xs font-black">Redis Clusters</span>
                 </div>
              </div>
              <button className="w-full mt-8 py-3 bg-white text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-slate-50 transition-colors">
                 Full System Health
              </button>
           </div>

           <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-4">
                <Globe size={24} />
              </div>
              <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight mb-2">Regional Edge Distribution</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Osikani Middleware operates at the network edge to ensure data residence and minimize latency for Ghanaian users.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                Primary Node: ACCRA-01
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// Internal icon helper
const SendIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

export default ArchitectureView;
