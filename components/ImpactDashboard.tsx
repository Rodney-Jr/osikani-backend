
import React, { useEffect, useState } from 'react';
import { Users, MessageSquare, MapPin, Briefcase } from 'lucide-react';

interface Stats {
    totalUsers: number;
    totalMessages: number;
    gender: { name: string; value: number }[];
    location: { name: string; value: number }[];
    business: { name: string; value: number }[];
    age: { name: string; value: number }[];
}

const ImpactDashboard: React.FC = () => {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/impact/stats')
            .then(res => res.json())
            .then(data => {
                if (data.success) setStats(data.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load stats", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-10 text-center">Loading Impact Data...</div>;
    if (!stats) return <div className="p-10 text-center text-red-500">Failed to load data.</div>;

    const StatCard = ({ title, value, icon: Icon, color }: any) => (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className={`p-3 rounded-full ${color} text-white`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-slate-500 text-sm font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
            </div>
        </div>
    );

    const BarList = ({ title, data }: { title: string, data: { name: string, value: number }[] }) => {
        const total = data.reduce((acc, curr) => acc + curr.value, 0) || 1;
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-4">{title}</h3>
                <div className="space-y-3">
                    {data.map((item, idx) => (
                        <div key={idx} className="group">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-slate-700 capitalize">{item.name}</span>
                                <span className="text-slate-500">{item.value} ({Math.round((item.value / total) * 100)}%)</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                <div
                                    className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${(item.value / total) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                    {data.length === 0 && <p className="text-sm text-slate-400">No data collected yet.</p>}
                </div>
            </div>
        )
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Osikani Impact Dashboard 🌍</h1>
                    <p className="text-slate-500">Measuring financial literacy reach in Ghana.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard title="Total Users" value={stats.totalUsers} icon={Users} color="bg-blue-500" />
                    <StatCard title="Messages Exchanged" value={stats.totalMessages} icon={MessageSquare} color="bg-emerald-500" />
                    <StatCard title="Top Location" value={stats.location[0]?.name || "N/A"} icon={MapPin} color="bg-purple-500" />
                    <StatCard title="Top Sector" value={stats.business[0]?.name || "N/A"} icon={Briefcase} color="bg-orange-500" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <BarList title="📍 Reach by Location" data={stats.location} />
                    <BarList title="💼 Business Sectors" data={stats.business} />
                    <BarList title="👫 Gender Distribution" data={stats.gender} />
                    <BarList title="🎂 Age Groups" data={stats.age} />
                </div>
            </div>
        </div>
    );
};

export default ImpactDashboard;
