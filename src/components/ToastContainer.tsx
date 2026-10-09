import React from 'react';
import { useLibrary } from '../context/LibraryContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useLibrary();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const bgColors = {
          success: 'bg-stone-900 border-emerald-500/80 text-white',
          info: 'bg-stone-900 border-stone-700 text-white',
          warning: 'bg-amber-950 border-amber-600 text-white',
          error: 'bg-red-950 border-red-600 text-white',
        };

        const icons = {
          success: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />,
          info: <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />,
          warning: <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />,
          error: <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />,
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-md border shadow-xl flex items-start gap-3 text-xs transition-all animate-in slide-in-from-bottom-2 duration-150 ${bgColors[toast.type]}`}
          >
            {icons[toast.type]}
            <div className="flex-1 min-w-0">
              <h5 className="font-semibold text-stone-100 text-xs leading-snug">
                {toast.title}
              </h5>
              {toast.description && (
                <p className="text-stone-300 mt-0.5 leading-relaxed text-[11px]">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-white p-0.5 rounded transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
