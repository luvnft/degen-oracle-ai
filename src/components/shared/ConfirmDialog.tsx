import React from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }: ConfirmDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-[#111111] rounded-lg border border-[#333333] w-full max-w-md mx-4">
        <div className="p-6 border-b border-[#333333]">
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-400">{message}</p>
        </div>
        <div className="flex justify-end p-6 border-t border-[#333333] gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#111111] text-[#00FF00] px-6 py-2 rounded border border-[#333333] hover:bg-[#1A1A1A] transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog; 