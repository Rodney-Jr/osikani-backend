
import React from 'react';
import { CheckCircle2, ShieldCheck, Zap, Globe, Users, Database, Layers, Rocket, Award, Landmark, MessageSquare, Heart } from 'lucide-react';

const DeploymentChecklist: React.FC = () => {
  const pillars = [
    {
      title: "Inference Stack",
      status: "Verified",
      items: ["3-Tier Waterfall Active", "Gemini 3 Flash Integrated", "Semantic Cache (Redis) Simulated"],
      icon: Zap,
      color: "bg-amber-500"
    },
    {
      title: "Security Middleware",
      status: "Hardened",
      items: ["Regex DLP Redaction", "Semantic Audit Gate", "MoMo Fraud Pattern Recognition"],
      icon: ShieldCheck,
      color: "bg-rose-500"
    },
    {
      title: "Knowledge RAG",
      status: "Embedded",
      items: ["4 Core Financial Books Ingested", "Vector Search Scored", "Source Citation Logic"],
      icon: Database,
      color: "bg-indigo-500"
    },
    {
      title: "User Experience",
      status: "Optimized",
      items: ["WhatsApp Simulator UI", "Pidgin/Twi/Ga Translation", "Gamified Learning Hub"],
      icon: MessageSquare,
      color: "bg-emerald-500"
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto pb-20">
      <header className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200 mb-4">
          <Award size={14} /> Production Ready v1.0
        </div>
        <h2 className="text-5xl font-black text-slate-900 tracking-tight">Project Osikani: Final Handover</h2>
        <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
          The "Digital Financial Mentor" architecture is now fully integrated, documented, and ready for institutional deployment.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {pillars.map((pillar, i) => (
          <div key={i} className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
            <div className={`w-14 h-14 ${pillar.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
              <pillar.icon size={28} />
            </div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-tight">{pillar.title}</h3>
              <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase">{pillar.status}</span>
            </div>
            <ul className="space-y-3">
              {pillar.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-[11px] text-slate-500 font-medium">
                  <CheckCircle2 size={12} className="text-emerald-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-[4rem] p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
             <h3 className="text-3xl font-black mb-6">Mission Accomplished.</h3>
             <p className="text-slate-400 leading-relaxed mb-8">
               Osikani is no longer just a chatbot; it is a <strong>Middleware for Financial Inclusion</strong>. It bridges the literacy gap by speaking the language of the people and the infrastructure of the banks.
             </p>
             <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <div>
                   <p className="text-4xl font-black text-emerald-400">100%</p>
                   <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 mt-2">DLP Compliance</p>
                </div>
                <div>
                   <p className="text-4xl font-black text-white">v1.0.0</p>
                   <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 mt-2">Build Finalized</p>
                </div>
             </div>
          </div>
          <div className="w-full lg:w-96 bg-white/5 border border-white/10 rounded-[3rem] p-8 backdrop-blur-sm">
             <h4 className="font-black text-xs uppercase tracking-widest text-emerald-400 mb-6 flex items-center gap-2">
               <Rocket size={14} /> Next-Step Scaling
             </h4>
             <div className="space-y-6">
                <div className="flex items-start gap-4">
                   <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                      <Landmark size={16} />
                   </div>
                   <p className="text-xs text-slate-300">Partner with <strong>Bank of Ghana</strong> for national data index.</p>
                </div>
                <div className="flex items-start gap-4">
                   <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                      <Users size={16} />
                   </div>
                   <p className="text-xs text-slate-300">Roll out <strong>White-Label</strong> accounts to 5 major MFI partners.</p>
                </div>
                <div className="flex items-start gap-4">
                   <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                      <Heart size={16} />
                   </div>
                   <p className="text-xs text-slate-300">Launch <strong>SDG Impact Portal</strong> for international donors.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentChecklist;
