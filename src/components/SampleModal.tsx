import React from 'react';
import { X, BookOpen, ArrowRight, ShieldCheck, XCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { SAMPLE_ARTICLES } from '../data/sampleArticles';
import { SampleArticle } from '../types/factcheck';

interface SampleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSample: (sample: SampleArticle) => void;
}

export const SampleModal: React.FC<SampleModalProps> = ({
  isOpen,
  onClose,
  onSelectSample,
}) => {
  if (!isOpen) return null;

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'Health & Medicine':
        return 'text-rose-400 bg-rose-950/40 border-rose-800/40';
      case 'Geopolitics':
        return 'text-amber-400 bg-amber-950/40 border-amber-800/40';
      case 'Finance & Scams':
        return 'text-red-400 bg-red-950/40 border-red-800/40';
      case 'Verified Truth':
        return 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40';
      case 'Satire':
        return 'text-purple-400 bg-purple-950/40 border-purple-800/40';
      default:
        return 'text-cyan-400 bg-cyan-950/40 border-cyan-800/40';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-4 pr-8">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-lg text-white">
                Forensic Misinformation Archive
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Select a benchmark case study to test how Veritas AI isolates claims, checks sources, and identifies deception.
            </p>
          </div>

          <div className="grid gap-3.5">
            {SAMPLE_ARTICLES.map((sample) => (
              <div
                key={sample.id}
                className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 sm:p-5 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getCategoryBadge(sample.category)}`}>
                      {sample.category}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Channel: {sample.source}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200">
                    {sample.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {sample.summary}
                  </p>
                </div>

                <button
                  onClick={() => {
                    onSelectSample(sample);
                    onClose();
                  }}
                  className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 border border-slate-700/80 hover:border-cyan-400 transition-all shrink-0 flex items-center gap-1.5 self-start sm:self-center"
                >
                  <span>Load Case</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
