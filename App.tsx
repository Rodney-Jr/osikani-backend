
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ArchitectureView from './components/ArchitectureView';
import ChatSimulator from './components/ChatSimulator';
import KnowledgeBase from './components/KnowledgeBase';
import ManagementConsole from './components/ManagementConsole';
import LearningHub from './components/LearningHub';
import BotSettings from './components/BotSettings';
import LandingPage from './components/LandingPage';
import StrategyAudit from './components/StrategyAudit';
import ImpactDonorView from './components/ImpactDonorView';
import WhiteLabelStudio from './components/WhiteLabelStudio';
import AccessManagement from './components/AccessManagement';
import DeploymentChecklist from './components/DeploymentChecklist';
import Campaigns from './components/Campaigns';
import PartnerPortal from './components/PartnerPortal/PartnerPortal';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('final');
  // Simple "routing" state
  const [isPartnerMode, setIsPartnerMode] = useState(false);

  // If in Partner Mode, show only Partner Portal
  if (isPartnerMode) {
    return <PartnerPortal onBack={() => setIsPartnerMode(false)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'final':
        return <DeploymentChecklist />;
      case 'dashboard':
        return <ArchitectureView />;
      case 'management':
        return <ManagementConsole />;
      case 'access':
        return <AccessManagement />;
      case 'whitelabel':
        return <WhiteLabelStudio />;
      case 'strategy':
        return <StrategyAudit />;
      case 'impact':
        return <ImpactDonorView />;
      case 'chat':
        return <ChatSimulator />;
      case 'learning':
        return <LearningHub />;
      case 'knowledge':
        return <KnowledgeBase />;
      case 'settings':
        return <BotSettings />;
      case 'campaigns':
        return <Campaigns />; // Admin view of campaigns
      case 'landing':
        // Pass the setter to LandingPage so "Partner Login" can switch mode
        return <LandingPage onNavigate={setActiveTab} onPartnerLogin={() => setIsPartnerMode(true)} />;
      default:
        return <DeploymentChecklist />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className={`flex-1 ml-64 overflow-auto ${activeTab === 'landing' ? 'p-0' : ''}`}>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
