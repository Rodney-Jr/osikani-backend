import React from 'react';
import { BarChart3, TrendingUp, Users, ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react';


const data = [
    { name: 'Mon', engagement: 400, reach: 2400 },
    { name: 'Tue', engagement: 300, reach: 1398 },
    { name: 'Wed', engagement: 200, reach: 9800 },
    { name: 'Thu', engagement: 278, reach: 3908 },
    { name: 'Fri', engagement: 189, reach: 4800 },
    { name: 'Sat', engagement: 239, reach: 3800 },
    { name: 'Sun', engagement: 349, reach: 4300 },
];

const PartnerReports: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto">
            <header className="mb-10 flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Impact Reports</h2>
                    <p className="text-slate-500 text-sm">Real-time analytics on your financial literacy campaigns.</p>
                </div>
                <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50">
                    <Calendar size={16} /> Last 7 Days
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                            <TrendingUp size={20} />
                        </div>
                        <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                            <ArrowUpRight size={12} /> +12.5%
                        </span>
                    </div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Total Engagement</p>
                    <h3 className="text-2xl font-black text-slate-900">24,302</h3>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                            <Users size={20} />
                        </div>
                        <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                            <ArrowUpRight size={12} /> +4.2%
                        </span>
                    </div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Active Learners</p>
                    <h3 className="text-2xl font-black text-slate-900">8,102</h3>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-rose-50 rounded-lg text-rose-600">
                            <BarChart3 size={20} />
                        </div>
                        <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-1 rounded-full flex items-center gap-1">
                            <ArrowDownRight size={12} /> -1.2%
                        </span>
                    </div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Dropout Rate</p>
                    <h3 className="text-2xl font-black text-slate-900">2.4%</h3>
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mb-10">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Engagement vs Reach (Last 7 Days)</h3>
                <div className="h-64 flex items-end justify-between px-4 pb-4 border-b border-slate-100 gap-4">
                    {data.map((item, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end items-center gap-2 group">
                            <div className="relative w-full flex items-end justify-center h-full gap-1">
                                <div className="w-1/2 bg-slate-200 rounded-t-sm transition-all hover:bg-slate-300" style={{ height: `${(item.reach / 10000) * 100}%` }}></div>
                                <div className="w-1/2 bg-indigo-600 rounded-t-sm transition-all hover:bg-indigo-700" style={{ height: `${(item.engagement / 1000) * 100}%` }}></div>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-600">{item.name}</span>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                        <div className="w-3 h-3 bg-slate-200 rounded-sm"></div> Reach
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                        <div className="w-3 h-3 bg-indigo-600 rounded-sm"></div> Engagement
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerReports;
