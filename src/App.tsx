import React, { useState, useEffect } from 'react';
import { ClassificationResult } from './types/newsDetector';
import { MODEL_PERFORMANCE_METRICS, TESTING_DATASET, TestArticle } from './data/datasetCorpus';
import { Loader2, ChevronDown, ChevronUp } from 'lucide-react';

export default function App() {
  const [selectedTestId, setSelectedTestId] = useState<string>('real-1');
  const [title, setTitle] = useState(TESTING_DATASET[0].title);
  const [content, setContent] = useState(TESTING_DATASET[0].content);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModelComparison, setShowModelComparison] = useState(true);

  // Automatically execute verification for initial selected article
  useEffect(() => {
    executeAnalysis(TESTING_DATASET[0].title, TESTING_DATASET[0].content, TESTING_DATASET[0].id);
  }, []);

  const executeAnalysis = async (articleTitle: string, articleText: string, testId?: string) => {
    if (!articleText.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: articleTitle, text: articleText, testId }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze article.');
      }

      setResult(data);
    } catch (err: any) {
      console.error('Classification error:', err);
      setError(err.message || 'An error occurred during verification.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTestArticle = (id: string) => {
    const item = TESTING_DATASET.find((t) => t.id === id);
    if (!item) return;

    setSelectedTestId(id);
    setTitle(item.title);
    setContent(item.content);
    setError(null);

    // Auto-run detection and display results
    executeAnalysis(item.title, item.content, item.id);
  };

  const handleClear = () => {
    setSelectedTestId('');
    setTitle('');
    setContent('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans py-10 px-4 sm:px-6 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        {/* Main Header */}
        <div className="text-center pt-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Fake News Detection System
          </h1>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Article Selector */}
          <div>
            <select
              id="article-select"
              value={selectedTestId}
              onChange={(e) => handleSelectTestArticle(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/70 border border-slate-300 rounded-md text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-2xs cursor-pointer"
            >
              <option value="" disabled>
                -- Select News Article --
              </option>
              <optgroup label="── Real News ──">
                {TESTING_DATASET.filter((t) => t.label === 'REAL').map((test) => (
                  <option key={test.id} value={test.id}>
                    [REAL] {test.title.length > 70 ? test.title.slice(0, 70) + '...' : test.title} ({test.category} • {test.confidenceScore}%)
                  </option>
                ))}
              </optgroup>
              <optgroup label="── Fake News ──">
                {TESTING_DATASET.filter((t) => t.label === 'FAKE').map((test) => (
                  <option key={test.id} value={test.id}>
                    [FAKE] {test.title.length > 70 ? test.title.slice(0, 70) + '...' : test.title} ({test.category} • {test.confidenceScore}%)
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              executeAnalysis(title, content, selectedTestId || undefined);
            }}
            className="space-y-4"
          >
            {/* Article Title */}
            <div>
              <label
                htmlFor="article-title"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Article Title
              </label>
              <input
                id="article-title"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setSelectedTestId('');
                }}
                placeholder="Enter the article headline..."
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Article Content */}
            <div>
              <label
                htmlFor="article-content"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Article Content <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="article-content"
                rows={8}
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  setSelectedTestId('');
                }}
                placeholder="Paste news text or body content here..."
                required
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors leading-relaxed"
              />
            </div>

            {/* Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
              <button
                type="submit"
                disabled={isLoading || content.trim().length < 15}
                className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 text-white font-semibold py-2.5 px-6 rounded-md transition-colors text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Check News</span>
                )}
              </button>

              <button
                type="button"
                onClick={handleClear}
                disabled={isLoading}
                className="w-full sm:flex-1 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 disabled:opacity-50 text-slate-700 font-semibold py-2.5 px-6 rounded-md transition-colors text-sm border border-slate-300 shadow-xs cursor-pointer"
              >
                Clear
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-sm">
              {error}
            </div>
          )}

          {/* Classification Results */}
          {result && !isLoading && (
            <div className="space-y-6 pt-4 border-t border-slate-200/90 animate-in fade-in duration-300">
              {/* Verdict & Confidence Score */}
              <div className="space-y-2">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-xs font-medium text-slate-500 mb-1.5">
                      Classification Verdict:
                    </div>
                    <div>
                      {result.verdict === 'REAL' ? (
                        <span className="inline-block bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] font-black text-lg sm:text-xl tracking-wider px-4 py-1.5 rounded-md shadow-2xs">
                          REAL NEWS
                        </span>
                      ) : (
                        <span className="inline-block bg-[#fff1f2] text-[#be123c] border border-[#fecdd3] font-black text-lg sm:text-xl tracking-wider px-4 py-1.5 rounded-md shadow-2xs">
                          FAKE NEWS
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-medium text-slate-500 mb-1">
                      Confidence Score:
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {result.confidenceScore.toFixed(1)}%
                    </div>
                  </div>
                </div>

                {/* Score bar */}
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      result.verdict === 'REAL' ? 'bg-[#10b981]' : 'bg-[#f43f5e]'
                    }`}
                    style={{ width: `${result.confidenceScore}%` }}
                  />
                </div>
              </div>

              {/* Influential Words (Model Explanation) */}
              <div className="space-y-2 pt-2">
                <h3 className="text-base font-bold text-slate-900">
                  Influential Words (Model Explanation)
                </h3>
                <p className="text-xs text-slate-500">
                  Words from this article that most influenced the verdict based on linear model coefficients:
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {result.influentialWords.map((item, idx) => (
                    <div
                      key={idx}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${
                        item.label === 'REAL'
                          ? 'bg-[#f0fdf4] border-[#bbf7d0] text-slate-800'
                          : 'bg-[#fff1f2] border-[#fecdd3] text-slate-800'
                      }`}
                    >
                      <span className="font-semibold text-slate-900">{item.word}</span>
                      <span
                        className={`text-[9px] uppercase font-extrabold px-1 py-0.2 rounded ${
                          item.label === 'REAL'
                            ? 'text-[#15803d] bg-[#dcfce7]'
                            : 'text-[#b91c1c] bg-[#fee2e2]'
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top 5 Similar Articles (Information Retrieval) */}
              <div className="space-y-2 pt-4">
                <h3 className="text-base font-bold text-slate-900">
                  Top 5 Similar Articles (Information Retrieval)
                </h3>
                <p className="text-xs text-slate-500">
                  Ranked using TF-IDF Cosine Similarity against the full dataset collection:
                </p>

                <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold">
                        <th className="py-2.5 px-3 w-10 text-center">#</th>
                        <th className="py-2.5 px-3">Article Title</th>
                        <th className="py-2.5 px-3 w-28 text-center">Dataset Label</th>
                        <th className="py-2.5 px-3 w-24 text-right">Similarity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {result.similarArticles.map((article, idx) => (
                        <tr
                          key={article.id}
                          className="hover:bg-slate-50/50 transition-colors"
                        >
                          <td className="py-2.5 px-3 text-center text-slate-400 font-medium">
                            {idx + 1}
                          </td>
                          <td className="py-2.5 px-3 font-medium text-slate-800">
                            {article.title}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <span
                              className={`inline-block text-[10px] font-extrabold px-2 py-0.5 rounded ${
                                article.datasetLabel === 'REAL'
                                  ? 'bg-[#dcfce7] text-[#15803d]'
                                  : 'bg-[#fee2e2] text-[#b91c1c]'
                              }`}
                            >
                              {article.datasetLabel}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                            {article.similarity.toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Model Performance Comparison Accordion */}
              <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setShowModelComparison(!showModelComparison)}
                  className="w-full px-4 py-3 bg-slate-50/50 hover:bg-slate-50 flex items-center justify-between text-left transition-colors cursor-pointer"
                >
                  <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    {showModelComparison ? (
                      <ChevronDown className="w-4 h-4 text-slate-600" />
                    ) : (
                      <ChevronUp className="w-4 h-4 text-slate-600" />
                    )}
                    <span>Model Performance Comparison</span>
                  </span>
                </button>

                {showModelComparison && (
                  <div className="p-4 sm:p-5 space-y-3 border-t border-slate-200/80 bg-white">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Evaluated on an 80/20 stratified split of 39,105 deduplicated news articles (Fake: 17908, Real: 21197). Source tags and publisher datelines were stripped to prevent data leakage.
                    </p>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-100/60 border-b border-slate-200 text-slate-600 font-semibold">
                            <th className="py-2.5 px-3">Model</th>
                            <th className="py-2.5 px-3">Accuracy</th>
                            <th className="py-2.5 px-3">Precision</th>
                            <th className="py-2.5 px-3">Recall</th>
                            <th className="py-2.5 px-3">F1-Score</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          {MODEL_PERFORMANCE_METRICS.map((metric) => (
                            <tr
                              key={metric.name}
                              className={metric.selected ? 'bg-blue-50/30' : ''}
                            >
                              <td className="py-2.5 px-3 font-semibold text-slate-900 flex items-center gap-2">
                                <span>{metric.name}</span>
                                {metric.selected && (
                                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                                    Selected
                                  </span>
                                )}
                              </td>
                              <td className="py-2.5 px-3 text-slate-600">{metric.accuracy}</td>
                              <td className="py-2.5 px-3 text-slate-600">{metric.precision}</td>
                              <td className="py-2.5 px-3 text-slate-600">{metric.recall}</td>
                              <td className="py-2.5 px-3 font-bold text-slate-900">{metric.f1Score}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <p className="text-xs text-slate-500 pt-1">
                      <strong className="text-slate-700 font-semibold">Selected Model:</strong> Linear SVM (Achieved the highest F1-Score and generalizability across classes).
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
