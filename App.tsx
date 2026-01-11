
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
  const [activeTab, setActiveTab] = useState('landing');
  // Simple "routing" state
  const [isPartnerMode, setIsPartnerMode] = useState(false);
  const [isGuestMode, setIsGuestMode] = useState(false);

  // If in Partner Mode, show only Partner Portal
  if (isPartnerMode) {
    return <PartnerPortal onBack={() => setIsPartnerMode(false)} />;
  }

  const handleLandingNavigation = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'learning') {
      setIsGuestMode(true);
    } else {
      setIsGuestMode(false);
    }
  };

  const activeTabHandler = (tab: string) => {
    setActiveTab(tab);
    setIsGuestMode(false); // Reset guest mode when using sidebar
  };

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
        return <LearningHub isGuest={isGuestMode} onBack={() => handleLandingNavigation('landing')} />;
      case 'knowledge':
        return <KnowledgeBase />;
      case 'settings':
        return <BotSettings />;
      case 'campaigns':
        return <Campaigns />; // Admin view of campaigns
      case 'landing':
        // Pass the setter to LandingPage so "Partner Login" can switch mode
        return <LandingPage onNavigate={handleLandingNavigation} onPartnerLogin={() => setIsPartnerMode(true)} />;
      default:
        return <DeploymentChecklist />;
    }
  };

  const showSidebar = !isGuestMode && activeTab !== 'landing';

  return (
    <div className="flex min-h-screen bg-slate-50">
      {showSidebar && <Sidebar activeTab={activeTab} setActiveTab={activeTabHandler} />}
      <main className={`flex-1 overflow-auto ${showSidebar ? 'ml-64' : 'p-0 w-full'}`}>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
