import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, HelpCircle, Trophy, ArrowRight, RotateCcw, ShieldCheck, Flame } from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/quizData';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIndex];
  const options = ['Fake / Fabricated', 'Real / Authentic', 'Misleading / Half-Truth', 'Satire / Parody'] as const;

  const handleSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    if (option === currentQ.correctVerdict) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isFinished ? (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 pr-8">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-rose-400" />
                <h3 className="font-bold text-base sm:text-lg text-white">
                  Spot the Fake: News Literacy Arena
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}
              </span>
            </div>

            {/* Question card */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
              <span className="text-[11px] uppercase tracking-wider font-bold text-cyan-400">
                Context & Distribution Channel
              </span>
              <p className="text-xs text-slate-400">
                {currentQ.context}
              </p>
              <div className="text-sm sm:text-base font-bold text-slate-100 italic pt-1">
                {currentQ.headline}
              </div>
              <div className="text-[11px] text-slate-500 pt-1">
                Source marker: {currentQ.sourcePreview}
              </div>
            </div>

            {/* Answer Choices */}
            <div className="space-y-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                What is your editorial judgment?
              </span>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {options.map((opt) => {
                  let buttonStyle = 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60';
                  if (isAnswered) {
                    if (opt === currentQ.correctVerdict) {
                      buttonStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500';
                    } else if (selectedOption === opt) {
                      buttonStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                    } else {
                      buttonStyle = 'bg-slate-950/30 border-slate-900 text-slate-600 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelect(opt)}
                      disabled={isAnswered}
                      className={`p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all text-left flex items-center justify-between ${buttonStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && opt === currentQ.correctVerdict && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Answer Feedback / Explanation */}
            {isAnswered && (
              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-2">
                  {selectedOption === currentQ.correctVerdict ? (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Correct Assessment!
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" /> Deception detected — Correct verdict: {currentQ.correctVerdict}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentQ.explanation}
                </p>

                {currentQ.redFlagsList.length > 0 && (
                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                      Key Forensic Red Flags:
                    </span>
                    <ul className="text-xs text-slate-400 space-y-1">
                      {currentQ.redFlagsList.map((rf, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-cyan-400 font-bold">•</span>
                          <span>{rf}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors flex items-center gap-1.5"
                  >
                    <span>{currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Final Score'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Finished Score Screen */
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">Quiz Completed</h3>
              <p className="text-sm text-slate-400">
                You correctly evaluated <strong className="text-cyan-400">{score}</strong> of {QUIZ_QUESTIONS.length} news scenarios.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 text-left space-y-2 max-w-md mx-auto text-xs text-slate-300">
              <span className="font-bold text-amber-400 block uppercase tracking-wider text-[11px]">
                {score >= 4 ? 'Elite Fact-Checking Instincts' : score >= 2 ? 'Solid Critical Eye' : 'Vulnerable to Viral Scams'}
              </span>
              <p className="leading-relaxed text-slate-400">
                {score >= 4
                  ? 'Excellent detection skills! You spotted subtle red flags like satirical origins, emotional hyperbole, and lack of official registry citations.'
                  : 'Always check primary sources, inspect emotional urgency triggers, and verify if a shocking claim appears on official wire registries before sharing.'}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
