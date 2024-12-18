import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { ToastProvider } from './components/shared/Toast/ToastProvider';
import TokenDiscovery from './pages/TokenDiscovery';
import Trends from './pages/Trends';
import Watchlist from './pages/Watchlist';
import TokenDetail from './pages/TokenDetail';
import Components from './pages/Components';

const App = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
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
            <Route path="/components" element={<Components />} />
            
            {/* Fallback for unknown routes */}
            <Route path="*" element={<Navigate to="/trends" replace />} />
          </Routes>
        </Layout>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
