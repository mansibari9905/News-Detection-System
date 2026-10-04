import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AnalysisForm } from './components/AnalysisForm';
import { ReportDashboard } from './components/ReportDashboard';
import { QuizModal } from './components/QuizModal';
import { SampleModal } from './components/SampleModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { FactCheckReport, SampleArticle } from './types/factcheck';
import { 
  ShieldCheck, 
  Search, 
  Scale, 
  Share2, 
  AlertTriangle, 
  Sparkles, 
  Flame, 
  ArrowUpRight, 
  CheckCircle2, 
  Loader2,
  FileText
} from 'lucide-react';
import { SAMPLE_ARTICLES } from './data/sampleArticles';

const STORAGE_KEY = 'veritas_verification_history_v1';

export default function App() {
  const [currentReport, setCurrentReport] = useState<FactCheckReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [activeSample, setActiveSample] = useState<SampleArticle | null>(null);
  const [history, setHistory] = useState<FactCheckReport[]>([]);

  // Modals state
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSamplesOpen, setIsSamplesOpen] = useState(false);

  // Load history on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse history from localStorage', e);
    }
  }, []);

  const [isRateLimited, setIsRateLimited] = useState(false);
  const [isHighDemand, setIsHighDemand] = useState(false);
  const [lastParams, setLastParams] = useState<{ text: string; title?: string; sourceUrl?: string; sampleId?: string } | null>(null);

  // Save history helper
  const saveToHistory = (newReport: FactCheckReport) => {
    setHistory((prev) => {
      const updated = [newReport, ...prev.filter((item) => item.id !== newReport.id)].slice(0, 20);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save history', err);
      }
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Failed to clear history', err);
    }
  };

  // Run analysis pipeline
  const handleAnalyze = async (text: string, title?: string, sourceUrl?: string, sampleId?: string) => {
    setIsLoading(true);
    setError(null);
    setIsRateLimited(false);
    setIsHighDemand(false);
    setLastParams({ text, title, sourceUrl, sampleId });
    setLoadingStep(1);

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 1200);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, title, sourceUrl, sampleId }),
      });

      const data = await response.json();
      if (!response.ok) {
        if (response.status === 429 || data.errorCode === 'RATE_LIMIT_EXCEEDED' || data.error?.includes('quota') || data.error?.includes('429')) {
          setIsRateLimited(true);
          throw new Error('Gemini API free-tier quota exceeded. The per-minute rate limit resets shortly.');
        }
        if (response.status === 503 || data.errorCode === 'SERVICE_HIGH_DEMAND' || data.error?.includes('high demand') || data.error?.includes('503')) {
          setIsHighDemand(true);
          throw new Error('The AI model is temporarily experiencing high demand across Google network servers. Spikes are temporary.');
        }
        throw new Error(data.error || 'Failed to complete analysis.');
      }

      setCurrentReport(data);
      saveToHistory(data);
      // Smooth scroll to report
      setTimeout(() => {
        const reportEl = document.getElementById('report-section');
        if (reportEl) {
          reportEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err: any) {
      console.error('Fact check failure:', err);
      const isQuotaErr = err.message?.includes('quota') || err.message?.includes('429') || err.message?.includes('RESOURCE_EXHAUSTED');
      const is503Err = err.message?.includes('503') || err.message?.includes('high demand') || err.message?.includes('UNAVAILABLE');

      if (isQuotaErr) {
        setIsRateLimited(true);
        setError('Gemini API free-tier quota reached. Google GenAI limits free requests per minute.');
      } else if (is503Err) {
        setIsHighDemand(true);
        setError('This model is temporarily experiencing high traffic demand. Spikes are temporary.');
      } else {
        setError(err.message || 'An unexpected error occurred during verification.');
      }
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
      setLoadingStep(0);
    }
  };

  const handleRetryLast = () => {
    if (lastParams) {
      handleAnalyze(lastParams.text, lastParams.title, lastParams.sourceUrl, lastParams.sampleId);
    }
  };

  const handleSelectSample = (sample: SampleArticle) => {
    setActiveSample(sample);
  };

  const handleLoadInstantBenchmark = (sampleKey: string = 'sample-garlic-cancer') => {
    const sample = SAMPLE_ARTICLES.find((s) => s.id === sampleKey) || SAMPLE_ARTICLES[0];
    handleAnalyze(sample.fullText, sample.title, sample.source, sample.id);
  };

  const loadingSteps = [
    'Isolating key statements and claims...',
    'Cross-referencing verified news archives and records...',
    'Evaluating rhetorical tone and logical consistency...',
    'Compiling evidence and truth assessment...',
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Navigation Header */}
      <Header
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenSamples={() => setIsSamplesOpen(true)}
        historyCount={history.length}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Hero Section if no report yet */}
        {!currentReport && (
          <div className="text-center max-w-3xl mx-auto space-y-4 pt-4 sm:pt-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-xs font-semibold text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>News Verification & Fact-Checking</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Verify The Story.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-amber-400">
                Uncover The Facts.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Analyze viral headlines, suspicious statements, and breaking news articles against reputable wire reporting, official archives, and primary source evidence.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-left">
              <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-1">
                <Search className="w-4 h-4 text-cyan-400" />
                <div className="text-xs font-bold text-slate-200">Claim Verification</div>
                <div className="text-[11px] text-slate-500">Examines each factual assertion independently</div>
              </div>

              <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-1">
                <Scale className="w-4 h-4 text-amber-400" />
                <div className="text-xs font-bold text-slate-200">Rhetoric & Logic</div>
                <div className="text-[11px] text-slate-500">Identifies misleading spin and emotional manipulation</div>
              </div>

              <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <div className="text-xs font-bold text-slate-200">Wire Records</div>
                <div className="text-[11px] text-slate-500">Cross-checks AP, Reuters, and official registries</div>
              </div>

              <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-1">
                <Share2 className="w-4 h-4 text-rose-400" />
                <div className="text-xs font-bold text-slate-200">Shareable Summary</div>
                <div className="text-[11px] text-slate-500">Clear debunk cards ready to share in messaging chats</div>
              </div>
            </div>
          </div>
        )}

        {/* Input & Analysis Form */}
        <section id="input-section" className="scroll-mt-24">
          <AnalysisForm
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            activeSample={activeSample}
            onClearActiveSample={() => setActiveSample(null)}
          />
        </section>

        {/* Active Processing State */}
        {isLoading && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 text-center space-y-5 shadow-xl max-w-xl mx-auto animate-in fade-in">
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin" />
              <ShieldCheck className="w-6 h-6 text-cyan-400 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">
                Verifying Claims Against Source Records...
              </h3>
              <p className="text-xs text-slate-400 h-6 transition-all duration-300">
                {loadingSteps[loadingStep - 1] || 'Analyzing factual context...'}
              </p>
            </div>

            {/* Progress indicators */}
            <div className="flex justify-center gap-1.5 pt-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    step <= loadingStep
                      ? 'w-8 bg-cyan-400'
                      : 'w-2 bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Error Alert / Rate Limit Card */}
        {error && (
          <div className="max-w-2xl mx-auto">
            {isRateLimited ? (
              <div className="bg-amber-950/40 border border-amber-500/50 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-amber-200">
                      Gemini API Rate Limit Reached (429 Quota Exceeded)
                    </h4>
                    <p className="text-xs text-amber-300/90 leading-relaxed">
                      Your Gemini API key has temporarily exceeded its free-tier requests per minute. Free-tier quotas automatically reset every 60 seconds.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
                  <div className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Instant Workarounds & Next Steps:</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-400 pl-4 list-disc">
                    <li>Wait 30-60 seconds for the free-tier quota window to reset.</li>
                    <li>
                      Or load our pre-analyzed forensic dossier below (runs 100% locally with zero API quota consumed):
                    </li>
                    <li>
                      To enable high throughput, attach a billing-enabled key in the AI Studio <strong>Settings &gt; Secrets</strong> panel.
                    </li>
                  </ul>
                </div>

                {/* Instant fallback buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    onClick={() => handleLoadInstantBenchmark('sample-garlic-cancer')}
                    className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 transition-colors"
                  >
                    Test Garlic Cancer Hoax Dossier
                  </button>
                  <button
                    onClick={() => handleLoadInstantBenchmark('sample-jwst-biosignature')}
                    className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-colors"
                  >
                    Test Authentic NASA Discovery Dossier
                  </button>
                  <button
                    onClick={() => setIsSamplesOpen(true)}
                    className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition-colors"
                  >
                    Browse All Case Studies
                  </button>
                </div>
              </div>
            ) : isHighDemand ? (
              <div className="bg-amber-950/40 border border-amber-500/50 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-amber-200">
                      Model High Demand (503 Temporary Spike)
                    </h4>
                    <p className="text-xs text-amber-300/90 leading-relaxed">
                      The primary model is currently experiencing peak traffic across Google network nodes. These spikes are usually very brief (a few seconds).
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  {lastParams && (
                    <button
                      onClick={handleRetryLast}
                      className="px-4 py-2 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex items-center gap-1.5 shadow"
                    >
                      <span>Retry Verification Now</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleLoadInstantBenchmark('sample-garlic-cancer')}
                    className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition-colors"
                  >
                    View Benchmark Dossier Instead
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-rose-950/40 border border-rose-800/50 rounded-xl p-4 sm:p-5 flex items-start gap-3 text-rose-300">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-rose-200">Analysis Encountered an Issue</h4>
                  <p className="text-xs leading-relaxed">{error}</p>
                  {lastParams && (
                    <button
                      onClick={handleRetryLast}
                      className="mt-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/40 transition-colors"
                    >
                      Retry Analysis
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Results Section */}
        {currentReport && !isLoading && (
          <section id="report-section" className="space-y-6 scroll-mt-20">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                  Forensic Verification Dossier
                </h2>
              </div>
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Analyze Another Article ↑
              </button>
            </div>

            <ReportDashboard report={currentReport} />
          </section>
        )}
      </main>

      {/* Educational Modals & Drawers */}
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />

      <SampleModal
        isOpen={isSamplesOpen}
        onClose={() => setIsSamplesOpen(false)}
        onSelectSample={handleSelectSample}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectReport={(rep) => setCurrentReport(rep)}
        onClearHistory={handleClearHistory}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 mt-16 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="text-slate-400 font-medium">
            Veritas · News Verification & Source Reliability Platform
          </p>
          <p className="text-[11px] text-slate-500 max-w-xl mx-auto">
            An open journalistic verification project evaluating news reports, viral claims, and attributed statements against verified records, peer-reviewed science, and major news wire archives.
          </p>
        </div>
      </footer>
    </div>
  );
}
