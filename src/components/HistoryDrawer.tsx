import React from 'react';
import { X, History, Trash2, ArrowRight, ShieldCheck, XCircle, AlertTriangle } from 'lucide-react';
import { FactCheckReport } from '../types/factcheck';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: FactCheckReport[];
  onSelectReport: (report: FactCheckReport) => void;
  onClearHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectReport,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  const getVerdictMiniBadge = (verdict: string) => {
    switch (verdict) {
      case 'verified_true':
        return 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40';
      case 'mostly_true':
        return 'text-teal-400 bg-teal-950/40 border-teal-800/40';
      case 'mixture_misleading':
        return 'text-amber-400 bg-amber-950/40 border-amber-800/40';
      case 'satire_parody':
        return 'text-purple-400 bg-purple-950/40 border-purple-800/40';
      case 'mostly_false':
      case 'fabricated_hoax':
      default:
        return 'text-rose-400 bg-rose-950/40 border-rose-800/40';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between">
        <div className="space-y-6 overflow-hidden flex flex-col flex-1">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-base text-white">Verification History</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="space-y-3 overflow-y-auto flex-1 pr-1">
            {history.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No past verifications recorded yet. Run an analysis to store results here.
              </div>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectReport(item);
                    onClose();
                  }}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getVerdictMiniBadge(item.verdict)}`}>
                      {item.verdict.replace('_', ' ')}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Score: <strong className="text-slate-200">{item.credibilityScore}%</strong>
                    </span>
                  </div>

                  <h4 className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {item.inputTitle || item.inputText.slice(0, 80) + '...'}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-900">
                    <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                    <span className="text-cyan-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      View Report <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer actions */}
        {history.length > 0 && (
          <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
            <span className="text-xs text-slate-500">{history.length} saved checks</span>
            <button
              onClick={onClearHistory}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-rose-950/30 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
