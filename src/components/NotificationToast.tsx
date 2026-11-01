import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface NotificationToastProps {
  message: string | null;
  onClose: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#051a11] text-white border-2 border-[#ebb340] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 max-w-sm">
        <CheckCircle2 className="w-5 h-5 text-[#ebb340] flex-shrink-0" />
        <span className="text-xs font-medium text-gray-100 flex-1">{message}</span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition p-1 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
