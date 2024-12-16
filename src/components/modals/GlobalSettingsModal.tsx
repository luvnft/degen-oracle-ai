import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Input } from '../form/Input';
import Switch from '../form/Switch';

interface GlobalSettings {
  notifications: {
    telegram: {
      enabled: boolean;
      chatId: string;
      botToken: string;
    },
    maxAlertsPerDay: number;
    cooldownMinutes: number;
  },
  display: {
    theme: 'dark' | 'darker',
    defaultTimeRange: '24h' | '7d' | '30d',
    showRiskIndicators: boolean,
  },
  scanning: {
    autoRefreshInterval: number, // minutes
    defaultMinMarketCap: number,
    defaultMinLiquidity: number,
  }
}

interface GlobalSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GlobalSettings;
  onSave: (settings: GlobalSettings) => void;
}

const GlobalSettingsModal = ({ isOpen, onClose, settings, onSave }: GlobalSettingsModalProps) => {
  const [localSettings, setLocalSettings] = useState(settings);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#111111] rounded-xl border border-[#333333] w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#333333]">
          <div>
            <h2 className="text-lg font-medium">Global Settings</h2>
            <p className="text-sm text-gray-400">Configure system-wide preferences</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Telegram Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Telegram Integration</h3>
                <p className="text-sm text-gray-400">Configure your Telegram bot for notifications</p>
              </div>
              <Switch
                checked={localSettings.notifications.telegram.enabled}
                onChange={(checked) => setLocalSettings(prev => ({
                  ...prev,
                  notifications: {
                    ...prev.notifications,
                    telegram: {
                      ...prev.notifications.telegram,
                      enabled: checked
                    }
                  }
                }))}
              />
            </div>
            {localSettings.notifications.telegram.enabled && (
              <div className="space-y-4 pl-4 border-l-2 border-[#333333]">
                <Input
                  label="Bot Token"
                  type="text"
                  value={localSettings.notifications.telegram.botToken}
                  onChange={(e) => setLocalSettings(prev => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      telegram: {
                        ...prev.notifications.telegram,
                        botToken: e.target.value
                      }
                    }
                  }))}
                  placeholder="Enter your Telegram bot token"
                />
                <Input
                  label="Chat ID"
                  type="text"
                  value={localSettings.notifications.telegram.chatId}
                  onChange={(e) => setLocalSettings(prev => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      telegram: {
                        ...prev.notifications.telegram,
                        chatId: e.target.value
                      }
                    }
                  }))}
                  placeholder="Enter your Telegram chat ID"
                />
              </div>
            )}
          </div>

          {/* Notification Limits */}
          <div className="space-y-4">
            <h3 className="font-medium">Notification Limits</h3>
            <div className="grid grid-cols-2 gap-6">
              <Input
                label="Max Alerts Per Day"
                type="number"
                value={localSettings.notifications.maxAlertsPerDay}
                onChange={(e) => setLocalSettings(prev => ({
                  ...prev,
                  notifications: {
                    ...prev.notifications,
                    maxAlertsPerDay: Number(e.target.value)
                  }
                }))}
                placeholder="50"
              />
              <Input
                label="Cooldown (minutes)"
                type="number"
                value={localSettings.notifications.cooldownMinutes}
                onChange={(e) => setLocalSettings(prev => ({
                  ...prev,
                  notifications: {
                    ...prev.notifications,
                    cooldownMinutes: Number(e.target.value)
                  }
                }))}
                placeholder="30"
              />
            </div>
          </div>

          {/* Scanner Settings */}
          <div className="space-y-4">
            <h3 className="font-medium">Scanner Settings</h3>
            <div className="grid grid-cols-3 gap-6">
              <Input
                label="Auto-refresh Interval (min)"
                type="number"
                value={localSettings.scanning.autoRefreshInterval}
                onChange={(e) => setLocalSettings(prev => ({
                  ...prev,
                  scanning: {
                    ...prev.scanning,
                    autoRefreshInterval: Number(e.target.value)
                  }
                }))}
                placeholder="5"
              />
              <Input
                label="Default Min MCap (USD)"
                type="number"
                value={localSettings.scanning.defaultMinMarketCap}
                onChange={(e) => setLocalSettings(prev => ({
                  ...prev,
                  scanning: {
                    ...prev.scanning,
                    defaultMinMarketCap: Number(e.target.value)
                  }
                }))}
                placeholder="50000"
              />
              <Input
                label="Default Min Liq (USD)"
                type="number"
                value={localSettings.scanning.defaultMinLiquidity}
                onChange={(e) => setLocalSettings(prev => ({
                  ...prev,
                  scanning: {
                    ...prev.scanning,
                    defaultMinLiquidity: Number(e.target.value)
                  }
                }))}
                placeholder="30000"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t border-[#333333] space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(localSettings)}
            className="
              bg-[#88D693] hover:bg-[#88D693]/90
              text-black font-medium
              px-4 py-2 rounded-lg
              transition-colors duration-200
            "
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalSettingsModal; 