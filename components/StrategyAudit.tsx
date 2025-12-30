
import React from 'react';
import { Target, ShieldCheck, Zap, Users, TrendingUp, Award, Globe, FileCheck, Lightbulb, BookOpen, Fingerprint, Landmark, HeartPulse, CreditCard, Rocket } from 'lucide-react';

const StrategyAudit: React.FC = () => {
  const auditPoints = [
    {
      title: "Proprietary IP Ingestion",
      status: "100% Implemented",
      description: "Training dataset successfully grounded in 'Mastering Your Money' and 3 other titles.",
      icon: BookOpen,
      color: "text-amber-500"
    },
    {
      title: "68% Literacy Reach",
      status: "Priority 1",
      description: "WhatsApp distribution model bypasses app-adoption hurdles for the informal sector.",
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "Fraud Shield Module",
      status: "Active",
      description: "Dedicated real-time scanner for MoMo and Sika Gari scams based on 'Digital Financial Literacy'.",
      icon: ShieldCheck,
      color: "text-red-500"
    },
    {
      title: "Junior/SME Personas",
      status: "Adaptive",
      description: "Contextual switching between 'Money Smart Kids' and 'Osikani Pro' professional advice.",
      icon: Fingerprint,
      color: "text-emerald-500"
    }
  ];

  const roadmapItems = [
    {
      title: "Alt-Credit Scoring",
      beneficiary: "Retail Banks",
      details: "Using 'Learning Velocity' and curriculum scores as a proxy for financial responsibility in lending.",
      icon: CreditCard,
      color: "bg-blue-600"
    },
    {
      title: "Dialect Claims Triage",
      beneficiary: "Insurance Co.",
      details: "Voice-first incident reporting in Twi/Ga. Summarizing claims for faster institutional processing.",
      icon: HeartPulse,
      color: "bg-rose-600"
    },
    {
      title: "Lead Generation API",
      beneficiary: "Microfinance",
      details: "Pre-qualifying traders for loans through conversational interviews before formal bank visits.",
      icon: Rocket,
      color: "bg-indigo-600"
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto pb-20">
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <FileCheck className="text-indigo-600" />
          Project Proposal Audit
        </h2>
        <p className="text-slate-600 mt-2">Compliance report against the "Osikani Digital Inclusion" vision.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {auditPoints.map((point, idx) => {
          const Icon = point.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-slate-50 ${point.color}`}>
                  <Icon size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-slate-100 rounded text-slate-500">
                  {point.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{point.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{point.description}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden mb-12">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
        
        <div className="relative z-10">
          <h3 className="text-2xl font-black mb-8 flex items-center gap-2">
            <Rocket className="text-emerald-400" />
            Institutional Roadmap 2026
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roadmapItems.map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-all group">
                <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <item.icon size={20} />
                </div>
                <p className="text-[10px] font-black uppercase text-emerald-400 mb-1">{item.beneficiary}</p>
                <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden">
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-2 text-slate-900">
          <Lightbulb className="text-yellow-500" />
          Scaling the Legacy
        </h3>
        <div className="space-y-8 relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100"></div>
          <div className="relative pl-12">
             <div className="absolute left-2.5 top-1.5 w-3 h-3 bg-emerald-500 rounded-full border-4 border-white shadow-sm"></div>
             <h4 className="font-bold text-slate-900">B2B White-Labeling (Live)</h4>
             <p className="text-sm text-slate-500 mt-1">Banks now license the Osikani "Financial Mentor" to power their own retail banking apps.</p>
          </div>
          <div className="relative pl-12">
             <div className="absolute left-2.5 top-1.5 w-3 h-3 bg-blue-500 rounded-full border-4 border-white shadow-sm"></div>
             <h4 className="font-bold text-slate-900">National Health Checkup Index</h4>
             <p className="text-sm text-slate-500 mt-1">Aggregated, anonymized data on Ghanaian savings habits for BoG (Bank of Ghana) policy making.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyAudit;
