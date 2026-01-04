import React, { useEffect, useState } from 'react';
import {
  Activity, Users, Lock, ShieldCheck,
  ShieldAlert, Fingerprint, EyeOff, Zap,
  History, ShieldX, TrendingUp, BarChart4,
  Layers, Database, PieChart, CheckCircle2,
  FileText, Globe, ClipboardCheck, Clock
} from 'lucide-react';
import { SystemMetrics, getMetrics, subscribeToMetrics } from '../services/metrics';
import SecurityPulse from './SecurityPulse';

const INTENT_CLUSTERS = [
  "Money Foundations", "Budgeting & Flow", "Savings & Discipline",
  "Loans & Debt", "Fraud Defense", "Investing Basics",
  "SME Finance", "Life Planning", "Youth Literacy", "Tax & Levies"
];

const ManagementConsole: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemMetrics>(getMetrics());
  const [partners, setPartners] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToMetrics(setMetrics);

    // Fetch Partners
    fetch('/api/partner/admin/list')
      .then(res => res.json())
      .then(data => setPartners(Array.isArray(data) ? data : []))
      .catch(console.error);

    return () => { unsubscribe(); };
  }, []);

  const handleApprove = async (id: string) => {
    await fetch('/api/partner/admin/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: 'APPROVED' })
    });
    alert("Partner Approved");
    setPartners(prev => prev.map(p => p.id === id ? { ...p, status: 'APPROVED' } : p));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto pb-20">
      <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
            <Layers className="text-emerald-600" />
            Impact & Governance
          </h2>
          <p className="text-slate-500 font-medium">Institutional Dashboard for Osikani Core Curriculum Performance.</p>
        </div>
        <button
          onClick={() => {
            fetch('/api/partner/admin/list')
              .then(res => res.json())
              .then(data => setPartners(Array.isArray(data) ? data : []));
          }}
          className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm hover:bg-slate-50"
        >
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
          <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Master Pipeline: Active</span>
        </button>
      </header>

      {/* Partner Approvals Section */}
      {partners.some(p => p.status === 'PENDING') && (
        <div className="mb-10 bg-white p-6 rounded-[2.5rem] border border-amber-200 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <h3 className="flex items-center gap-2 font-black text-slate-800 uppercase text-xs tracking-widest mb-6">
            <ShieldCheck className="text-amber-500" size={16} /> Pending Partner Approvals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.filter(p => p.status === 'PENDING').map(p => (
              <div key={p.id} className="border border-slate-200 rounded-2xl p-4 bg-amber-50/50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold text-slate-900">{p.name}</p>
                    <p className="text-xs text-slate-500 uppercase font-bold">{p.type}</p>
                  </div>
                  <span className="bg-amber-100 text-amber-700 text-[9px] font-black px-2 py-0.5 rounded-full">PENDING</span>
                </div>
                <p className="text-xs text-slate-500 mb-4">{p.email}</p>
                <button
                  onClick={() => handleApprove(p.id)}
                  className="w-full bg-slate-900 text-white py-2 rounded-xl text-xs font-bold hover:bg-emerald-600 transition-colors"
                >
                  Approve Access
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-slate-900 text-white p-6 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
          <Users className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-110 transition-transform" size={120} />
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">Total Outreach</h3>
          <p className="text-4xl font-black tracking-tighter">12,842</p>
          <div className="flex items-center gap-1 mt-4 text-[10px] font-bold text-emerald-400">
            <TrendingUp size={12} /> +8.4% this week
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm border-t-4 border-t-rose-500">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">DLP Mitigations</h3>
          <p className="text-4xl font-black text-slate-900 tracking-tighter">1,402</p>
          <div className="flex items-center gap-1.5 mt-4 text-rose-600 font-bold text-xs uppercase tracking-tighter">
            <EyeOff size={14} /> Leakage Prevented
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm border-t-4 border-t-amber-500">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Fraud Hits</h3>
          <p className="text-4xl font-black text-slate-900 tracking-tighter">42</p>
          <div className="flex items-center gap-1.5 mt-4 text-amber-600 font-bold text-xs uppercase tracking-tighter">
            <ShieldAlert size={14} /> Scam Verdicts
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm border-t-4 border-t-emerald-500">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Middleware Latency</h3>
          <p className="text-4xl font-black text-slate-900 tracking-tighter">8ms</p>
          <div className="flex items-center gap-1.5 mt-4 text-emerald-600 font-bold text-xs uppercase tracking-tighter">
            <Clock size={14} /> Security Overhead
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Analytics Area */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-black flex items-center gap-3 uppercase text-[10px] tracking-[0.3em] text-slate-400">
                <ShieldX size={16} className="text-indigo-600" /> Intent Cluster Velocity
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400">Past 24H</span>
                <PieChart size={14} className="text-slate-300" />
              </div>
            </div>

            <div className="grid grid-cols-10 gap-2 h-48 items-end">
              {[45, 82, 30, 95, 100, 60, 40, 75, 55, 35].map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-3 group relative h-full justify-end">
                  <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[9px] px-2 py-1 rounded font-bold whitespace-nowrap pointer-events-none">
                    {INTENT_CLUSTERS[i]}
                  </div>
                  <div
                    className="w-full bg-slate-100 rounded-t-xl relative overflow-hidden group-hover:bg-slate-200 transition-all cursor-help"
                    style={{ height: `${h}%` }}
                  >
                    <div className="absolute inset-x-0 bottom-0 bg-emerald-500 opacity-60 group-hover:opacity-100 transition-all" style={{ height: '30%' }}></div>
                  </div>
                  <span className="text-[7px] font-black text-slate-400 uppercase tracking-tighter rotate-[-45deg] origin-top-left translate-y-4">
                    C{i + 1}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-16 pt-6 border-t border-slate-50 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Top Cluster</p>
                <p className="text-sm font-black text-slate-900">Fraud Defense (C5)</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Latency / Cluster</p>
                <p className="text-sm font-black text-slate-900">12ms - 84ms</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Persona Match</p>
                <p className="text-sm font-black text-slate-900">96.8% Accuracy</p>
              </div>
            </div>
          </div>

          {/* Implementation Status Report Section */}
          <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-200 shadow-inner">
            <h3 className="font-black flex items-center gap-3 uppercase text-[10px] tracking-[0.3em] text-slate-500 mb-6">
              <ClipboardCheck size={16} className="text-slate-600" /> Implementation Readiness Report
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Distributed Middleware Layer", status: "Operational", icon: Activity, color: "text-amber-500" },
                { name: "3-Tier Inference Stack", status: "Operational", icon: Zap, color: "text-emerald-500" },
                { name: "10-Cluster Curriculum", status: "Live", icon: Database, color: "text-indigo-500" },
                { name: "Dialect Persona Engine", status: "96% Complete", icon: Globe, color: "text-blue-500" },
                { name: "Security DLP Gateway", status: "Hardened", icon: ShieldCheck, color: "text-rose-500" },
                { name: "Enterprise White-Label", status: "Available", icon: Layers, color: "text-purple-500" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-slate-50 ${item.color}`}>
                      <item.icon size={16} />
                    </div>
                    <span className="text-xs font-bold text-slate-800">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-black uppercase text-slate-400">{item.status}</span>
                    <CheckCircle2 size={12} className="text-emerald-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[3rem] border border-slate-200 p-8 shadow-sm">
            <SecurityPulse />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm">
            <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 uppercase text-[10px] tracking-widest">
              <History className="text-rose-500" size={16} /> Forensic Audit Feed
            </h3>
            <div className="space-y-4">
              {[
                { action: "PII Scrubbed", type: "Cluster 1", status: "Auto", time: "2m ago" },
                { action: "Scam Verdict", type: "Cluster 5", status: "Critical", time: "14m ago" },
                { action: "Retirement Logic", type: "Cluster 8", status: "Success", time: "1h ago" },
                { action: "Prompt Injection", type: "Gateway", status: "Blocked", time: "3h ago" }
              ].map((t, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col gap-2 hover:bg-slate-100 transition-colors group">
                  <div className="flex justify-between items-center">
                    <p className="text-[11px] font-black text-slate-800 leading-none">{t.action}</p>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${t.status === 'Critical' || t.status === 'Blocked' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>{t.status}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{t.type}</p>
                    <p className="text-[9px] text-slate-300 font-medium italic">{t.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2">
              <FileText size={16} />
              Export Full Report
            </button>
          </div>

          <div className="bg-emerald-600 text-white p-8 rounded-[3rem] shadow-xl relative overflow-hidden">
            <Zap className="absolute top-4 right-4 text-emerald-200 animate-pulse" size={24} />
            <h3 className="font-black text-sm uppercase tracking-widest mb-4">Core Orchestrator</h3>
            <p className="text-xs text-white/90 leading-relaxed mb-6">
              Inference engine successfully mapped to <strong>10 Intent Clusters</strong>. Hybrid RAG is currently prioritizing "Digital Fraud Defense".
            </p>
            <div className="flex items-center gap-2 text-[10px] font-black text-emerald-100 bg-white/10 w-fit px-3 py-1 rounded-full border border-white/20">
              <ShieldCheck size={12} />
              INSTITUTIONAL SAFE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementConsole;
