import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/shared/Toast/ToastProvider';
import Layout from './components/layout/Layout';
import Trends from './pages/Trends';
import TokenDiscovery from './pages/TokenDiscovery';
import Watchlist from './pages/Watchlist';
import TokenDetail from './pages/TokenDetail';

const App = () => {
  return (
    <Router>
      <ToastProvider>
        <Layout>
          <Routes>
            {/* Redirect root to trends */}
            <Route path="/" element={<Navigate to="/trends" replace />} />
            
            {/* Main routes */}
            <Route path="/trends" element={<Trends />} />
            <Route path="/discovery" element={<TokenDiscovery />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/token/:address" element={<TokenDetail />} />
            
            {/* Fallback for unknown routes */}
            <Route path="*" element={<Navigate to="/trends" replace />} />
          </Routes>
        </Layout>
      </ToastProvider>
    </Router>
  );
};

export default App;
