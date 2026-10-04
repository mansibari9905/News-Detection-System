import React, { useState } from 'react';
import { Search, Link as LinkIcon, FileText, Sparkles, Loader2, AlertCircle, ArrowRight, CornerDownLeft, RefreshCw, CheckCircle2 } from 'lucide-react';
import { SAMPLE_ARTICLES } from '../data/sampleArticles';
import { SampleArticle } from '../types/factcheck';

interface AnalysisFormProps {
  onAnalyze: (text: string, title?: string, sourceUrl?: string, sampleId?: string) => Promise<void>;
  isLoading: boolean;
  activeSample?: SampleArticle | null;
  onClearActiveSample?: () => void;
}

export const AnalysisForm: React.FC<AnalysisFormProps> = ({
  onAnalyze,
  isLoading,
  activeSample,
  onClearActiveSample,
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'url'>('text');
  const [inputText, setInputText] = useState('');
  const [inputTitle, setInputTitle] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [selectedSampleId, setSelectedSampleId] = useState<string | undefined>(undefined);
  const [isFetchingUrl, setIsFetchingUrl] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [fetchedMeta, setFetchedMeta] = useState<{ title: string; domain: string } | null>(null);

  // Sync if sample loaded from parent
  React.useEffect(() => {
    if (activeSample) {
      setInputTitle(activeSample.title);
      setInputText(activeSample.fullText);
      setSelectedSampleId(activeSample.id);
      setActiveTab('text');
      setUrlInput('');
      setFetchedMeta(null);
    }
  }, [activeSample]);

  const handleSelectPreset = (sample: SampleArticle) => {
    setInputTitle(sample.title);
    setInputText(sample.fullText);
    setSelectedSampleId(sample.id);
    setUrlInput('');
    setFetchedMeta(null);
    setFetchError(null);
  };

  const handleFetchUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    setIsFetchingUrl(true);
    setFetchError(null);
    try {
      const res = await fetch('/api/fetch-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to extract text from URL');
      }

      setInputTitle(data.title || '');
      setInputText(data.text || '');
      setFetchedMeta({ title: data.title, domain: data.domain });
    } catch (err: any) {
      setFetchError(err.message || 'Could not fetch web page. You can paste the text manually below.');
    } finally {
      setIsFetchingUrl(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onAnalyze(
      inputText,
      inputTitle.trim() || undefined,
      fetchedMeta?.domain || urlInput || undefined,
      selectedSampleId
    );
  };

  const handleClear = () => {
    setInputText('');
    setInputTitle('');
    setUrlInput('');
    setSelectedSampleId(undefined);
    setFetchedMeta(null);
    setFetchError(null);
    if (onClearActiveSample) onClearActiveSample();
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800 w-fit">
          <button
            type="button"
            onClick={() => setActiveTab('text')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'text'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Text / Headline / Claim</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'url'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>Article URL Link</span>
          </button>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-2 text-xs">
          {(inputText || inputTitle || urlInput) && (
            <button
              type="button"
              onClick={handleClear}
              className="text-slate-400 hover:text-rose-400 transition-colors px-2 py-1"
            >
              Clear form
            </button>
          )}
        </div>
      </div>

      {/* URL Extractor Sub-panel */}
      {activeTab === 'url' && (
        <div className="mb-5 bg-slate-950/60 border border-slate-800 rounded-xl p-4">
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Target Article Web Address (URL)
          </label>
          <form onSubmit={handleFetchUrl} className="flex gap-2">
            <div className="relative flex-1">
              <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/news/breaking-story..."
                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>
            <button
              type="submit"
              disabled={isFetchingUrl || !urlInput.trim()}
              className="px-4 py-2.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 disabled:opacity-50 transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              {isFetchingUrl ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Fetching...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  <span>Extract Content</span>
                </>
              )}
            </button>
          </form>

          {fetchError && (
            <div className="mt-3 flex items-start gap-2 p-2.5 bg-rose-950/40 border border-rose-800/50 rounded-lg text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{fetchError}</span>
            </div>
          )}

          {fetchedMeta && (
            <div className="mt-3 flex items-center justify-between p-2.5 bg-emerald-950/40 border border-emerald-800/40 rounded-lg text-xs text-emerald-300">
              <div className="flex items-center gap-2 truncate">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-slate-200">Loaded from {fetchedMeta.domain}:</span>
                <span className="truncate text-slate-400">{fetchedMeta.title}</span>
              </div>
              <span className="shrink-0 text-slate-400 text-[11px]">Ready for forensic check</span>
            </div>
          )}
        </div>
      )}

      {/* Main Analysis Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Optional Headline input */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Headline or Subject (Optional)
          </label>
          <input
            type="text"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            placeholder="e.g. Doctors discover miracle remedy that destroys viruses in 24 hours..."
            className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
          />
        </div>

        {/* Text Area */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              News Text, Article Excerpt, or Viral Claim
            </label>
            <span className="text-[11px] text-slate-500">
              {inputText.length} characters
            </span>
          </div>
          <textarea
            rows={6}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste suspicious news text, social media claims, transcribed speech, or chain message here to verify truthfulness, fallacies, emotional spin, and credible sources..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 leading-relaxed font-sans resize-y"
          />
        </div>

        {/* Quick Sample Presets */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Or try an authentic benchmark or viral hoax case:</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_ARTICLES.slice(0, 5).map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSelectPreset(sample)}
                className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all text-left truncate max-w-[260px] ${
                  inputTitle === sample.title
                    ? 'bg-cyan-950/60 border-cyan-500/60 text-cyan-200'
                    : 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
                title={sample.title}
              >
                <span className="font-semibold text-slate-300 mr-1">
                  [{sample.category}]
                </span>
                <span>{sample.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <span>Evidence-backed analysis across primary records and archives</span>
          </div>

          <button
            type="submit"
            disabled={isLoading || inputText.trim().length < 15}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 via-indigo-500 to-amber-500 text-slate-950 hover:brightness-110 active:brightness-95 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-lg shadow-indigo-950/50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Verifying Claims...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4 text-slate-950" />
                <span>Verify News & Claims</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
