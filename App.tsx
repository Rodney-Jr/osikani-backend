
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './components/LandingPage';
import AdminLogin from './components/AdminLogin';
import DashboardLayout from './components/DashboardLayout';
import PartnerPortal from './components/PartnerPortal/PartnerPortal';
import ImpactDonorView from './components/ImpactDonorView';
import PricingPage from './components/PricingPage';
import Marketplace from './components/Marketplace';
import LearningHub from './components/LearningHub';

// Protected Route Wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) return <Navigate to="/admin" replace />;
  if (!isAdmin) return <Navigate to="/" replace />; // Or some unauthorized page

  return <>{children}</>;
};

// Partner Portal Wrapper to handle its internal "onBack" logic
const PartnerWrapper: React.FC = () => {
  // In a router context, "onBack" usually means navigate home
  const navigate = (path: string) => window.location.href = path; // or UseNavigate if we want SPA
  return <PartnerPortal onBack={() => window.location.href = '/'} />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage
            onNavigate={(tab) => {
              // Handle legacy prop calls if LandingPage tries to nav internally
              if (tab === 'learning') window.location.href = '/learning'; // If public learning exists
            }}
            onPartnerLogin={() => window.location.href = '/partner'}
          />} />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/partner" element={<PartnerWrapper />} />
          <Route path="/impact" element={<ImpactDonorView />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/store" element={<Marketplace />} />
          <Route path="/learning" element={<div className="p-8 bg-slate-50 min-h-screen">
            {/* Wrap in simple container for now since LearningHub expects strict props? 
                Let's check LearningHub definition first to be safe, but tentatively: */}
            <LearningHub />
          </div>} />

          <Route path="/dashboard/*" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
