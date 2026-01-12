
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ArchitectureView from './ArchitectureView';
import ChatSimulator from './ChatSimulator';
import KnowledgeBase from './KnowledgeBase';
import ManagementConsole from './ManagementConsole';
import LearningHub from './LearningHub';
import BotSettings from './BotSettings';
import StrategyAudit from './StrategyAudit';
import ImpactDonorView from './ImpactDonorView';
import WhiteLabelStudio from './WhiteLabelStudio';
import AccessManagement from './AccessManagement';
import DeploymentChecklist from './DeploymentChecklist';
import Campaigns from './Campaigns';

const DashboardLayout: React.FC = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    // Admin is never a "guest" in the internal dashboard context usually, 
    // but we keep the logic if Learning Hub needs it.
    const [isGuestMode, setIsGuestMode] = useState(false);

    const activeTabHandler = (tab: string) => {
        setActiveTab(tab);
        if (tab !== 'learning') setIsGuestMode(false);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'final': return <DeploymentChecklist />;
            case 'dashboard': return <ArchitectureView />;
            case 'management': return <ManagementConsole />;
            case 'access': return <AccessManagement />;
            case 'whitelabel': return <WhiteLabelStudio />;
            case 'strategy': return <StrategyAudit />;
            case 'impact': return <ImpactDonorView />;
            case 'chat': return <ChatSimulator />;
            case 'learning':
                return <LearningHub isGuest={isGuestMode} onBack={() => setActiveTab('dashboard')} />;
            case 'knowledge': return <KnowledgeBase />;
            case 'settings': return <BotSettings />;
            case 'campaigns': return <Campaigns />;
            default: return <ArchitectureView />;
        }
    };

    const showSidebar = !isGuestMode;

    return (
        <div className="flex min-h-screen bg-slate-50">
            {showSidebar && <Sidebar activeTab={activeTab} setActiveTab={activeTabHandler} />}
            <main className={`flex-1 overflow-auto ${showSidebar ? 'ml-64' : 'p-0 w-full'}`}>
                {renderContent()}
            </main>
        </div>
    );
};

export default DashboardLayout;
