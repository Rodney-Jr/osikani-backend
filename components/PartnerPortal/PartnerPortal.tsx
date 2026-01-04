import React, { useState } from 'react';
import PartnerLogin from './PartnerLogin';
import PartnerDashboard from './PartnerDashboard';
import WhiteLabelStudio from '../WhiteLabelStudio';
import Campaigns from '../Campaigns'; // Reusing for now, ideally refactor props to filter by Org
import { BarChart3, Download, Users, DollarSign, Activity } from 'lucide-react';

import PartnerReports from './PartnerReports';
import PartnerSettings from './PartnerSettings';
import PartnerBilling from './PartnerBilling';

interface PartnerPortalProps {
    onBack: () => void;
}

const PartnerPortal: React.FC<PartnerPortalProps> = ({ onBack }) => {
    const [user, setUser] = useState<any>(null);
    // Default view logic: Donors start at Reports, others at Overview
    const [view, setView] = useState('overview');

    // Effect to switch view when user logs in
    React.useEffect(() => {
        if (user && (user.type === 'DONOR' || user.type === 'NGO')) {
            setView('reports');
        }
    }, [user]);

    if (!user) {
        return <PartnerLogin onLogin={setUser} onBack={onBack} />;
    }

    const handleBrandingSave = async (config: any) => {
        try {
            await fetch('/api/partner/branding', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: user.id, config })
            });
            alert(`Branding Saved Successfully for ${config.partnerName}`);
            // Update local user state if needed to reflect changes immediately
            setUser({ ...user, brandingConfig: config });
        } catch (e) {
            console.error(e);
            alert("Failed to save branding");
        }
    };

    const renderContent = () => {
        switch (view) {
            case 'campaigns':
                // In a real implementation, pass 'orgId={user.id}' to filter campaigns
                return <Campaigns />;
            case 'overview':
                return <Overview org={user} />;
            case 'branding':
                return <WhiteLabelStudio initialConfig={user.brandingConfig} onSave={handleBrandingSave} />;
            case 'reports':
                return <PartnerReports />;
            case 'billing':
                return <PartnerBilling />;
            case 'settings':
                return <PartnerSettings org={user} />;
            default:
                return <Overview org={user} />;
        }
    }

    return (
        <PartnerDashboard org={user} onLogout={() => setUser(null)} currentView={view} setView={setView}>
            {renderContent()}
        </PartnerDashboard>
    );
};

const Overview = ({ org }: { org: any }) => (
    <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Welcome back, {org.name} 👋</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Reach</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-900">0</span>
                    <span className="text-emerald-600 text-xs font-bold flex items-center">
                        <Activity size={12} /> Live
                    </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-2">Unique users reached via broadcasts.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Engagement Rate</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-900">0%</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-2">Average response rate to campaigns.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Budget Spent</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-900">$0.00</span>
                </div>
            </div>
        </div>

        <div className="bg-indigo-900 text-white rounded-2xl p-8 relative overflow-hidden">
            <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Start your first Campaign</h3>
                <p className="text-indigo-200 mb-6 max-w-xl">Reach thousands of financially active Ghanaians today via WhatsApp.</p>
                <button className="bg-white text-indigo-900 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
                    Create New Broadcast
                </button>
            </div>
        </div>
    </div>
);

export default PartnerPortal;
