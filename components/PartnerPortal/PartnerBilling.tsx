import React from 'react';
import { CreditCard, CheckCircle2, Download, AlertCircle } from 'lucide-react';

const PartnerBilling: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto">
            <header className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Billing & Plans</h2>
                <p className="text-slate-500 text-sm">Manage your subscription and view usage history.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                {/* Current Plan Card */}
                <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden col-span-2">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                    <div className="flex justify-between items-start mb-8 relative z-10">
                        <div>
                            <p className="text-emerald-400 font-bold uppercase text-xs tracking-widest mb-2">Current Plan</p>
                            <h3 className="text-3xl font-black">Growth Tier</h3>
                            <p className="text-slate-400 mt-1">Billed Annually</p>
                        </div>
                        <div className="text-right">
                            <h3 className="text-3xl font-black">$499</h3>
                            <p className="text-slate-400 text-sm">/ month</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <p className="text-xs text-slate-400 uppercase font-bold mb-1">Messages Sent</p>
                            <p className="text-xl font-bold">12,402 / 50k</p>
                            <div className="w-full bg-white/10 h-1 rounded-full mt-3 overflow-hidden">
                                <div className="bg-emerald-500 h-full w-[25%]"></div>
                            </div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <p className="text-xs text-slate-400 uppercase font-bold mb-1">Users Reached</p>
                            <p className="text-xl font-bold">4,200 / 10k</p>
                            <div className="w-full bg-white/10 h-1 rounded-full mt-3 overflow-hidden">
                                <div className="bg-emerald-500 h-full w-[42%]"></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 relative z-10">
                        <button className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-colors border border-transparent">
                            Upgrade Plan
                        </button>
                        <button className="bg-transparent border border-slate-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/5 transition-colors">
                            Manage Payment Method
                        </button>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                            <CreditCard size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900">Visa ending in 4242</h4>
                            <p className="text-xs text-slate-500">Expires 12/28</p>
                        </div>
                    </div>
                    <div className="p-4 bg-orange-50 text-orange-700 rounded-xl text-xs font-medium flex gap-3 items-start leading-relaxed border border-orange-100">
                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                        Next invoice of $5,988 will be charged on Jan 14, 2026.
                    </div>
                </div>
            </div>

            {/* Invoice History */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900">Invoice History</h3>
                    <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800">View All</button>
                </div>
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-slate-50 text-slate-500">
                            <th className="px-8 py-4 font-bold uppercase text-xs tracking-widest">Invoice ID</th>
                            <th className="px-8 py-4 font-bold uppercase text-xs tracking-widest">Date</th>
                            <th className="px-8 py-4 font-bold uppercase text-xs tracking-widest">Amount</th>
                            <th className="px-8 py-4 font-bold uppercase text-xs tracking-widest">Status</th>
                            <th className="px-8 py-4 font-bold uppercase text-xs tracking-widest text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {[
                            { id: 'INV-2025-001', date: 'Dec 14, 2025', amount: '$499.00', status: 'Paid' },
                            { id: 'INV-2025-002', date: 'Nov 14, 2025', amount: '$499.00', status: 'Paid' },
                            { id: 'INV-2025-003', date: 'Oct 14, 2025', amount: '$499.00', status: 'Paid' },
                        ].map((inv) => (
                            <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-8 py-4 font-medium text-slate-900">{inv.id}</td>
                                <td className="px-8 py-4 text-slate-500">{inv.date}</td>
                                <td className="px-8 py-4 font-bold text-slate-900">{inv.amount}</td>
                                <td className="px-8 py-4">
                                    <span className="bg-emerald-100 text-emerald-700 font-bold px-2 py-1 rounded text-xs flex items-center gap-1 w-fit">
                                        <CheckCircle2 size={12} /> Paid
                                    </span>
                                </td>
                                <td className="px-8 py-4 text-right">
                                    <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                                        <Download size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PartnerBilling;
