import React from 'react';
import {
    Building2, LayoutDashboard, Megaphone, BarChart3, Settings,
    LogOut, LifeBuoy, CreditCard, Palette
} from 'lucide-react';

interface PartnerDashboardProps {
    org: any;
    onLogout: () => void;
    currentView: string;
    setView: (view: string) => void;
    children: React.ReactNode;
}

const PartnerDashboard: React.FC<PartnerDashboardProps> = ({ org, onLogout, currentView, setView, children }) => {

    const menu = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
        { id: 'reports', label: 'Reports', icon: BarChart3 },
        { id: 'branding', label: 'Whitelabel Studio', icon: Palette, hideFor: ['DONOR', 'NGO'] },
        { id: 'billing', label: 'Billing', icon: CreditCard, hideFor: ['DONOR', 'NGO'] },
        { id: 'settings', label: 'Settings', icon: Settings },
    ].filter(item => !item.hideFor?.includes(org.type));

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar */}
            <div className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-50">
                <div className="p-6 border-b border-slate-800">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-8 h-8 rounded bg-emerald-500 flex items-center justify-center font-bold text-slate-900">
                            {org.name[0]}
                        </div>
                        <h1 className="font-bold truncate">{org.name}</h1>
                    </div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">{org.type} Partner</p>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {menu.map(item => {
                        const Icon = item.icon;
                        const active = currentView === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setView(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${active ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                <Icon size={18} />
                                <span className="font-medium text-sm">{item.label}</span>
                            </button>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800 space-y-2">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-sm">
                        <LifeBuoy size={16} /> Support
                    </button>
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg text-sm"
                    >
                        <LogOut size={16} /> Sign Out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 overflow-auto">
                {children}
            </main>
        </div>
    );
};

export default PartnerDashboard;
