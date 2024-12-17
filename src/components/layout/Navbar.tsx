import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BellIcon } from '@heroicons/react/24/outline';
import AlertSettingsModal from '../modals/AlertSettingsModal';
import { AlertSettings } from '../../types';

const initialAlertSettings: AlertSettings = {
  priceChangeThreshold: 10,
  volumeChangeThreshold: 100,
  holdersChangeThreshold: 20,
  maxAlertsPerDay: 50,
  alertCooldownMinutes: 30,
  enablePriceAlerts: true,
  enableVolumeAlerts: true,
  enableHoldersAlerts: true,
  notificationChannels: {
    telegram: true,
    email: false
  }
};

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertSettings, setAlertSettings] = useState<AlertSettings>(initialAlertSettings);

  const handleSaveAlertSettings = (newSettings: AlertSettings) => {
    setAlertSettings(newSettings);
    setIsAlertModalOpen(false);
  };

  const navItems = [
    { path: '/', label: 'Trends' },
    { path: '/discovery', label: 'Discovery' },
    { path: '/watchlist', label: 'Watchlist' }
  ];

  return (
    <nav className="bg-[#111111] border-b border-[#333333]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-[#00FF00] font-bold text-xl">
              DEGEN ORACLE
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === path
                    ? 'text-[#00FF00] bg-[#1A1A1A]'
                    : 'text-gray-300 hover:text-[#00FF00] hover:bg-[#1A1A1A]'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Alert Settings */}
          <div className="flex items-center">
            <button
              onClick={() => setIsAlertModalOpen(true)}
              className="p-2 rounded-md text-gray-300 hover:text-[#00FF00] hover:bg-[#1A1A1A]"
            >
              <BellIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Alert Settings Modal */}
      <AlertSettingsModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        settings={alertSettings}
        onSave={handleSaveAlertSettings}
      />
    </nav>
  );
};

export default Navbar;
