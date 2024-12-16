import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface AlertSettings {
  priceChange: number;
  volumeChange: number;
  holdersChange: number;
}

interface AlertSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: AlertSettings) => void;
}

const AlertSettingsModal = ({ isOpen, onClose, onSave }: AlertSettingsModalProps) => {
  const [settings, setSettings] = useState<AlertSettings>({
    priceChange: 10,
    volumeChange: 100,
    holdersChange: 20,
  });

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
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Price Change Alert (%)
              </label>
              <input
                type="number"
                value={settings.priceChange}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  priceChange: Number(e.target.value)
                }))}
                className="
                  w-full bg-black rounded-xl px-4 py-2
                  border border-[#333333]
                  text-white placeholder-gray-500
                  focus:outline-none focus:border-[#88D693]
                  transition-colors duration-200
                "
                placeholder="10"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Volume Change Alert (%)
              </label>
              <input
                type="number"
                value={settings.volumeChange}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  volumeChange: Number(e.target.value)
                }))}
                className="
                  w-full bg-black rounded-xl px-4 py-2
                  border border-[#333333]
                  text-white placeholder-gray-500
                  focus:outline-none focus:border-[#88D693]
                  transition-colors duration-200
                "
                placeholder="100"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Holders Change Alert (%)
              </label>
              <input
                type="number"
                value={settings.holdersChange}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  holdersChange: Number(e.target.value)
                }))}
                className="
                  w-full bg-black rounded-xl px-4 py-2
                  border border-[#333333]
                  text-white placeholder-gray-500
                  focus:outline-none focus:border-[#88D693]
                  transition-colors duration-200
                "
                placeholder="20"
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
            onClick={() => onSave(settings)}
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

export default AlertSettingsModal; 