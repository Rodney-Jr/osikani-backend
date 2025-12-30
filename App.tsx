
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

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('final');

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
      case 'landing':
        return <LandingPage onNavigate={setActiveTab} />;
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
