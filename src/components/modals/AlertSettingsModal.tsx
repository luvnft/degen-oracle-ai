import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { AlertSettings } from '../../types';

interface AlertSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AlertSettings;
  onSave: (settings: AlertSettings) => void;
}

const AlertSettingsModal = ({ isOpen, onClose, settings, onSave }: AlertSettingsModalProps) => {
  const [localSettings, setLocalSettings] = useState<AlertSettings>(settings);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#111111] rounded-xl border border-[#333333] w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#333333]">
          <h2 className="text-lg font-medium">Alert Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Alert Types */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm text-gray-400">
                  Price Change Alerts
                </label>
                <input
                  type="checkbox"
                  checked={localSettings.enablePriceAlerts}
                  onChange={(e) => setLocalSettings(prev => ({
                    ...prev,
                    enablePriceAlerts: e.target.checked
                  }))}
                  className="form-checkbox h-4 w-4 text-[#88D693] rounded border-[#333333] bg-black focus:ring-[#88D693]"
                />
              </div>
              {localSettings.enablePriceAlerts && (
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Price Change Threshold (%)
                  </label>
                  <input
                    type="number"
                    value={localSettings.priceChangeThreshold}
                    onChange={(e) => setLocalSettings(prev => ({
                      ...prev,
                      priceChangeThreshold: Number(e.target.value)
                    }))}
                    className="w-full bg-black rounded-xl px-4 py-2 border border-[#333333] text-white placeholder-gray-500 focus:outline-none focus:border-[#88D693] transition-colors duration-200"
                    placeholder="10"
                  />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm text-gray-400">
                  Volume Change Alerts
                </label>
                <input
                  type="checkbox"
                  checked={localSettings.enableVolumeAlerts}
                  onChange={(e) => setLocalSettings(prev => ({
                    ...prev,
                    enableVolumeAlerts: e.target.checked
                  }))}
                  className="form-checkbox h-4 w-4 text-[#88D693] rounded border-[#333333] bg-black focus:ring-[#88D693]"
                />
              </div>
              {localSettings.enableVolumeAlerts && (
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Volume Change Threshold (%)
                  </label>
                  <input
                    type="number"
                    value={localSettings.volumeChangeThreshold}
                    onChange={(e) => setLocalSettings(prev => ({
                      ...prev,
                      volumeChangeThreshold: Number(e.target.value)
                    }))}
                    className="w-full bg-black rounded-xl px-4 py-2 border border-[#333333] text-white placeholder-gray-500 focus:outline-none focus:border-[#88D693] transition-colors duration-200"
                    placeholder="100"
                  />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm text-gray-400">
                  Holders Change Alerts
                </label>
                <input
                  type="checkbox"
                  checked={localSettings.enableHoldersAlerts}
                  onChange={(e) => setLocalSettings(prev => ({
                    ...prev,
                    enableHoldersAlerts: e.target.checked
                  }))}
                  className="form-checkbox h-4 w-4 text-[#88D693] rounded border-[#333333] bg-black focus:ring-[#88D693]"
                />
              </div>
              {localSettings.enableHoldersAlerts && (
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Holders Change Threshold (%)
                  </label>
                  <input
                    type="number"
                    value={localSettings.holdersChangeThreshold}
                    onChange={(e) => setLocalSettings(prev => ({
                      ...prev,
                      holdersChangeThreshold: Number(e.target.value)
                    }))}
                    className="w-full bg-black rounded-xl px-4 py-2 border border-[#333333] text-white placeholder-gray-500 focus:outline-none focus:border-[#88D693] transition-colors duration-200"
                    placeholder="20"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Alert Limits */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Maximum Alerts Per Day
              </label>
              <input
                type="number"
                value={localSettings.maxAlertsPerDay}
                onChange={(e) => setLocalSettings(prev => ({
                  ...prev,
                  maxAlertsPerDay: Number(e.target.value)
                }))}
                className="w-full bg-black rounded-xl px-4 py-2 border border-[#333333] text-white placeholder-gray-500 focus:outline-none focus:border-[#88D693] transition-colors duration-200"
                placeholder="50"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Alert Cooldown (minutes)
              </label>
              <input
                type="number"
                value={localSettings.alertCooldownMinutes}
                onChange={(e) => setLocalSettings(prev => ({
                  ...prev,
                  alertCooldownMinutes: Number(e.target.value)
                }))}
                className="w-full bg-black rounded-xl px-4 py-2 border border-[#333333] text-white placeholder-gray-500 focus:outline-none focus:border-[#88D693] transition-colors duration-200"
                placeholder="30"
              />
            </div>
          </div>

          {/* Notification Channels */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-400">Notification Channels</h3>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-400">
                Telegram
              </label>
              <input
                type="checkbox"
                checked={localSettings.notificationChannels.telegram}
                onChange={(e) => setLocalSettings(prev => ({
                  ...prev,
                  notificationChannels: {
                    ...prev.notificationChannels,
                    telegram: e.target.checked
                  }
                }))}
                className="form-checkbox h-4 w-4 text-[#88D693] rounded border-[#333333] bg-black focus:ring-[#88D693]"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-400">
                Email
              </label>
              <input
                type="checkbox"
                checked={localSettings.notificationChannels.email}
                onChange={(e) => setLocalSettings(prev => ({
                  ...prev,
                  notificationChannels: {
                    ...prev.notificationChannels,
                    email: e.target.checked
                  }
                }))}
                className="form-checkbox h-4 w-4 text-[#88D693] rounded border-[#333333] bg-black focus:ring-[#88D693]"
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
            className="bg-[#88D693] hover:bg-[#88D693]/90 text-black font-medium px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertSettingsModal; 