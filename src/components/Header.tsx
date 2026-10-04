import React from 'react';
import { ShieldCheck, Sparkles, BookOpen, History, Flame, Globe2 } from 'lucide-react';

interface HeaderProps {
  onOpenQuiz: () => void;
  onOpenHistory: () => void;
  onOpenSamples: () => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenQuiz,
  onOpenHistory,
  onOpenSamples,
  historyCount,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-amber-500 p-0.5 shadow-lg shadow-indigo-900/30 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-lg text-white">VERITAS</span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              News Verification & Fact-Checking Platform
            </p>
          </div>
        </div>

        {/* Feature Triggers */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSamples}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 transition-colors"
            title="Browse verified case studies"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Case Studies</span>
          </button>

          <button
            onClick={onOpenQuiz}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 transition-colors"
            title="Test your fake news detection instincts"
          >
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>News Literacy Quiz</span>
          </button>

          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 transition-colors relative"
            title="View recent checks"
          >
            <History className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                {historyCount}
              </span>
            )}
          </button>

          <div className="h-4 w-px bg-slate-800 mx-1 hidden lg:block" />

          <div className="hidden lg:flex items-center gap-1.5 text-xs text-emerald-400/90 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-full">
            <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Wire Cross-Check Active</span>
          </div>
        </div>
      </div>
    </header>
  );
};
