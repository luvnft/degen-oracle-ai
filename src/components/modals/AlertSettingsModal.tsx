import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { AlertSettings } from '../../types';
import { Input } from '../form/Input';
import Switch from '../form/Switch';

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
          <div>
            <h2 className="text-lg font-medium">Alert Settings</h2>
            <p className="text-sm text-gray-400">Configure your alert preferences</p>
          </div>
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
          <div className="space-y-6">
            {/* Price Change Alerts */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Price Change Alerts</h3>
                  <p className="text-sm text-gray-400">Get notified on significant price movements</p>
                </div>
                <Switch
                  checked={localSettings.enablePriceAlerts}
                  onChange={(checked) => setLocalSettings(prev => ({
                    ...prev,
                    enablePriceAlerts: checked
                  }))}
                />
              </div>
              {localSettings.enablePriceAlerts && (
                <Input
                  label="Price Change Threshold (%)"
                  type="number"
                  value={localSettings.priceChangeThreshold}
                  onChange={(e) => setLocalSettings(prev => ({
                    ...prev,
                    priceChangeThreshold: Number(e.target.value)
                  }))}
                  placeholder="10"
                />
              )}
            </div>

            {/* Volume Change Alerts */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Volume Change Alerts</h3>
                  <p className="text-sm text-gray-400">Get notified on volume spikes</p>
                </div>
                <Switch
                  checked={localSettings.enableVolumeAlerts}
                  onChange={(checked) => setLocalSettings(prev => ({
                    ...prev,
                    enableVolumeAlerts: checked
                  }))}
                />
              </div>
              {localSettings.enableVolumeAlerts && (
                <Input
                  label="Volume Change Threshold (%)"
                  type="number"
                  value={localSettings.volumeChangeThreshold}
                  onChange={(e) => setLocalSettings(prev => ({
                    ...prev,
                    volumeChangeThreshold: Number(e.target.value)
                  }))}
                  placeholder="100"
                />
              )}
            </div>

            {/* Holders Change Alerts */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Holders Change Alerts</h3>
                  <p className="text-sm text-gray-400">Get notified on holder count changes</p>
                </div>
                <Switch
                  checked={localSettings.enableHoldersAlerts}
                  onChange={(checked) => setLocalSettings(prev => ({
                    ...prev,
                    enableHoldersAlerts: checked
                  }))}
                />
              </div>
              {localSettings.enableHoldersAlerts && (
                <Input
                  label="Holders Change Threshold (%)"
                  type="number"
                  value={localSettings.holdersChangeThreshold}
                  onChange={(e) => setLocalSettings(prev => ({
                    ...prev,
                    holdersChangeThreshold: Number(e.target.value)
                  }))}
                  placeholder="20"
                />
              )}
            </div>
          </div>

          {/* Alert Limits */}
          <div className="space-y-6">
            <h3 className="font-medium">Alert Limits</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Max Alerts Per Day"
                type="number"
                value={localSettings.maxAlertsPerDay}
                onChange={(e) => setLocalSettings(prev => ({
                  ...prev,
                  maxAlertsPerDay: Number(e.target.value)
                }))}
                placeholder="50"
              />
              <Input
                label="Alert Cooldown (min)"
                type="number"
                value={localSettings.alertCooldownMinutes}
                onChange={(e) => setLocalSettings(prev => ({
                  ...prev,
                  alertCooldownMinutes: Number(e.target.value)
                }))}
                placeholder="30"
              />
            </div>
          </div>

          {/* Notification Channels */}
          <div className="space-y-4">
            <h3 className="font-medium">Notification Channel</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Telegram</p>
                <p className="text-sm text-gray-400">Receive alerts via Telegram</p>
              </div>
              <Switch
                checked={localSettings.notificationChannels.telegram}
                onChange={(checked) => setLocalSettings(prev => ({
                  ...prev,
                  notificationChannels: {
                    ...prev.notificationChannels,
                    telegram: checked
                  }
                }))}
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