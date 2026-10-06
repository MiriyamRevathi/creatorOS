import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useNotification();

  if (!toasts || toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-brand-lavender shrink-0" />
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="flex items-start justify-between p-4 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 animate-slideUp"
        >
          <div className="flex items-start gap-3">
            {icons[toast.type] || icons.info}
            <div>
              <h4 className="text-xs font-semibold text-slate-900 dark:text-white">{toast.title}</h4>
              {toast.message && <p className="text-xs text-slate-500 mt-0.5">{toast.message}</p>}
            </div>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
