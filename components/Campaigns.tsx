import React, { useState, useEffect } from 'react';
import {
    Megaphone, Users, DollarSign, Send, Plus, BarChart2,
    CheckCircle, AlertCircle, Building2, MessageSquare,
    Loader2, Globe
} from 'lucide-react';

interface Campaign {
    id: string;
    title: string;
    content: string;
    status: 'DRAFT' | 'ACTIVE' | 'COMPLETED';
    budget: number;
    spent: number;
    createdAt: string;
    organization: { name: string; type: string };
    logs: any[]; // Simplified
}

interface Organization {
    id: string;
    name: string;
    type: string;
}

const Campaigns: React.FC = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [view, setView] = useState<'LIST' | 'CREATE'>('LIST');
    const [loading, setLoading] = useState(false);

    // Form Stats
    const [orgId, setOrgId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [budget, setBudget] = useState(100);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [cRes, oRes] = await Promise.all([
                fetch('/api/campaigns'),
                fetch('/api/campaigns/organizations')
            ]);
            if (cRes.ok) setCampaigns(await cRes.json());
            if (oRes.ok) setOrganizations(await oRes.json());
        } catch (e) {
            console.error("Failed to load data", e);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!orgId || !title || !content) return alert("Please fill all fields");

        try {
            const res = await fetch('/api/campaigns', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orgId, title, content, targetCriteria: {}, budget })
            });

            if (res.ok) {
                alert("Campaign Created!");
                setView('LIST');
                fetchData();
            } else {
                alert("Failed to create");
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleBroadcast = async (id: string) => {
        if (!confirm("Are you sure you want to broadcast this campaign to ALL users? This will incur costs.")) return;

        try {
            const res = await fetch(`/api/campaigns/${id}/broadcast`, { method: 'POST' });
            const data = await res.json();
            if (res.ok) {
                alert(`Broadcast Complete! Sent to ${data.result.sent} users.`);
                fetchData();
            } else {
                alert("Broadcast Error: " + data.error);
            }
        } catch (e) {
            alert("Broadcast Failed");
        }
    };

    const calculateStats = (c: Campaign) => {
        const sent = c.logs.filter(l => l.status === 'SENT' || l.status === 'DELIVERED').length;
        const engaged = c.logs.filter(l => l.status === 'ENGAGED').length;
        return { sent, engaged };
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                        <Megaphone className="text-pink-600" /> Broadcast Campaigns
                    </h2>
                    <p className="text-slate-600 mt-2">
                        Manage advertisements and announcements for financial partners.
                    </p>
                </div>
                {view === 'LIST' && (
                    <button
                        onClick={() => setView('CREATE')}
                        className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                    >
                        <Plus size={18} /> New Campaign
                    </button>
                )}
            </header>

            {view === 'CREATE' && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8 max-w-2xl">
                    <h3 className="font-bold text-lg mb-4">Draft New Campaign</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Organization</label>
                            <select
                                className="w-full border border-slate-300 rounded-lg p-2"
                                value={orgId}
                                onChange={e => setOrgId(e.target.value)}
                            >
                                <option value="">Select Partner...</option>
                                {organizations.map(o => (
                                    <option key={o.id} value={o.id}>{o.name} ({o.type})</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Campaign Title</label>
                            <input
                                className="w-full border border-slate-300 rounded-lg p-2"
                                placeholder="e.g., Student Savings Promo"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Message Content (WhatsApp)</label>
                            <textarea
                                className="w-full border border-slate-300 rounded-lg p-2 h-32"
                                placeholder="Type your broadcast message here..."
                                value={content}
                                onChange={e => setContent(e.target.value)}
                            />
                            <p className="text-xs text-slate-500 mt-1">
                                Note: Message will be prefixed with "📢 *AD: [Title]*".
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Budget Setup (USD)</label>
                            <div className="relative">
                                <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="number"
                                    className="w-full border border-slate-300 rounded-lg pl-9 p-2"
                                    value={budget}
                                    onChange={e => setBudget(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="flex gap-2 pt-4">
                            <button
                                onClick={() => setView('LIST')}
                                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreate}
                                className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-lg"
                            >
                                Save Draft
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-6">
                {campaigns.map(bg => {
                    const stats = bg.logs ? calculateStats(bg) : { sent: 0, engaged: 0 };
                    return (
                        <div key={bg.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                                        {bg.organization?.type}
                                    </span>
                                    <h3 className="font-bold text-lg text-slate-800">{bg.title}</h3>
                                    {bg.status === 'ACTIVE' && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1"><CheckCircle size={10} /> Active</span>}
                                    {bg.status === 'DRAFT' && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Draft</span>}
                                </div>
                                <p className="text-slate-600 mb-4 text-sm line-clamp-2">{bg.content}</p>
                                <div className="text-sm text-slate-500 flex items-center gap-4">
                                    <span className="flex items-center gap-1"><Building2 size={14} /> {bg.organization?.name}</span>
                                    <span className="flex items-center gap-1"><Globe size={14} /> All Users</span>
                                </div>
                            </div>

                            <div className="flex gap-8 border-l border-slate-100 pl-6 md:pl-0 md:border-l-0 lg:border-l lg:pl-6">
                                <div className="text-center">
                                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Reach</div>
                                    <div className="text-2xl font-bold text-slate-800">{stats?.sent || 0}</div>
                                    <div className="text-xs text-green-600 flex items-center justify-center gap-1"><Users size={12} /> Users</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Engagement</div>
                                    <div className="text-2xl font-bold text-indigo-600">{stats?.engaged || 0}</div>
                                    <div className="text-xs text-indigo-600 flex items-center justify-center gap-1"><MessageSquare size={12} /> Replies</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Spent</div>
                                    <div className="text-2xl font-bold text-slate-800">${bg.spent.toFixed(2)}</div>
                                    <div className="text-xs text-slate-400">of ${bg.budget}</div>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center border-l border-slate-100 pl-6">
                                {bg.status === 'DRAFT' ? (
                                    <button
                                        onClick={() => handleBroadcast(bg.id)}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                                    >
                                        <Send size={16} /> Broadcast Now
                                    </button>
                                ) : (
                                    <button disabled className="bg-slate-100 text-slate-400 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 cursor-not-allowed">
                                        <CheckCircle size={16} /> Broadcast Sent
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}

                {campaigns.length === 0 && !loading && (
                    <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                        <Megaphone className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                        <h3 className="text-lg font-medium text-slate-900">No campaigns yet</h3>
                        <p className="text-slate-500">Create your first broadcast to reach users.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Campaigns;
