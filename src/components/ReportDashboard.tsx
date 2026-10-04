import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Copy, 
  Check, 
  ExternalLink, 
  FileSearch, 
  Scale, 
  Sparkles, 
  Share2, 
  MessageSquare, 
  Compass, 
  Flame, 
  Eye, 
  Layers, 
  Globe 
} from 'lucide-react';
import { FactCheckReport, ClaimAnalysis, HighlightSpan } from '../types/factcheck';

interface ReportDashboardProps {
  report: FactCheckReport;
}

export const ReportDashboard: React.FC<ReportDashboardProps> = ({ report }) => {
  const [activeTab, setActiveTab] = useState<'claims' | 'inspector' | 'rhetoric' | 'sources' | 'debunk'>('claims');
  const [copiedDebunk, setCopiedDebunk] = useState(false);
  const [selectedHighlight, setSelectedHighlight] = useState<HighlightSpan | null>(
    report.highlightSpans && report.highlightSpans.length > 0 ? report.highlightSpans[0] : null
  );

  const handleCopyDebunk = () => {
    if (!report.debunkCard?.copyableDebunkText) return;
    navigator.clipboard.writeText(report.debunkCard.copyableDebunkText);
    setCopiedDebunk(true);
    setTimeout(() => setCopiedDebunk(false), 2500);
  };

  // Helper for verdict styling
  const getVerdictTheme = (verdict: string) => {
    switch (verdict) {
      case 'verified_true':
        return {
          bg: 'bg-emerald-950/40',
          border: 'border-emerald-500/40',
          text: 'text-emerald-300',
          badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          gaugeColor: '#10b981',
          icon: ShieldCheck,
        };
      case 'mostly_true':
        return {
          bg: 'bg-teal-950/40',
          border: 'border-teal-500/40',
          text: 'text-teal-300',
          badgeBg: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
          gaugeColor: '#14b8a6',
          icon: ShieldCheck,
        };
      case 'mixture_misleading':
        return {
          bg: 'bg-amber-950/40',
          border: 'border-amber-500/40',
          text: 'text-amber-300',
          badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          gaugeColor: '#f59e0b',
          icon: AlertTriangle,
        };
      case 'mostly_false':
        return {
          bg: 'bg-orange-950/40',
          border: 'border-orange-500/40',
          text: 'text-orange-300',
          badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
          gaugeColor: '#f97316',
          icon: ShieldAlert,
        };
      case 'satire_parody':
        return {
          bg: 'bg-purple-950/40',
          border: 'border-purple-500/40',
          text: 'text-purple-300',
          badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
          gaugeColor: '#a855f7',
          icon: Sparkles,
        };
      case 'fabricated_hoax':
      default:
        return {
          bg: 'bg-rose-950/40',
          border: 'border-rose-500/40',
          text: 'text-rose-300',
          badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
          gaugeColor: '#f43f5e',
          icon: XCircle,
        };
    }
  };

  const getClaimVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case 'true':
        return { label: 'Verified True', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
      case 'mostly_true':
        return { label: 'Mostly True', color: 'bg-teal-500/20 text-teal-300 border-teal-500/30' };
      case 'misleading':
        return { label: 'Misleading Context', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
      case 'unsubstantiated':
        return { label: 'Unsubstantiated', color: 'bg-slate-700 text-slate-300 border-slate-600' };
      case 'false':
      default:
        return { label: 'Demonstrably False', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' };
    }
  };

  const theme = getVerdictTheme(report.verdict);
  const VerdictIcon = theme.icon;

  return (
    <div className="space-y-6">
      {/* Top Verdict & Score Banner */}
      <div className={`rounded-2xl p-5 sm:p-7 border ${theme.border} ${theme.bg} backdrop-blur-md relative overflow-hidden shadow-2xl`}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Main Verdict Info */}
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${theme.badgeBg}`}>
                {report.verdict.replace('_', ' ')}
              </span>
              <span className="text-xs text-slate-400">
                Confidence: <strong className="text-slate-200 uppercase">{report.confidence}</strong>
              </span>
              {report.sourceUrl && (
                <>
                  <span className="text-slate-600">·</span>
                  <span className="text-xs text-slate-400 truncate max-w-[200px]">
                    Source: {report.sourceUrl}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              <VerdictIcon className={`w-8 h-8 ${theme.text} shrink-0`} />
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {report.verdictLabel}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
              {report.executiveSummary}
            </p>
          </div>

          {/* Credibility Gauge Score Card */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 sm:p-5 flex items-center gap-4 shrink-0 shadow-lg min-w-[220px]">
            <div className="relative w-20 h-20 flex items-center justify-center">
              {/* Circular Gauge */}
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  strokeDasharray={`${report.credibilityScore}, 100`}
                  stroke={theme.gaugeColor}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-xl font-black text-white">{report.credibilityScore}</span>
                <span className="text-[10px] uppercase font-semibold text-slate-400">/ 100</span>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Truth Score
              </div>
              <div className="text-xs text-slate-300 mt-1">
                {report.credibilityScore >= 75 && 'Strongly Supported'}
                {report.credibilityScore >= 45 && report.credibilityScore < 75 && 'Contested / Mixed'}
                {report.credibilityScore < 45 && 'Heavily Compromised'}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {report.claims.length} claims extracted
              </div>
            </div>
          </div>
        </div>

        {/* The Truth In 30 Seconds Section */}
        {report.truthIn30Seconds && report.truthIn30Seconds.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-800/80 bg-slate-950/40 -mx-5 -mb-5 sm:-mx-7 sm:-mb-7 p-5 sm:p-7">
            <div className="flex items-center gap-2 mb-2.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Key Facts in 30 Seconds
              </h3>
            </div>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {report.truthIn30Seconds.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                  <span className="text-cyan-400 font-bold shrink-0 mt-0.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Forensic Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('claims')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'claims'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileSearch className="w-3.5 h-3.5 text-cyan-400" />
          <span>Claim-by-Claim Breakdown</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-700 text-slate-200">
            {report.claims.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('inspector')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'inspector'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Eye className="w-3.5 h-3.5 text-purple-400" />
          <span>Annotated Article Inspector</span>
        </button>

        <button
          onClick={() => setActiveTab('rhetoric')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'rhetoric'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Scale className="w-3.5 h-3.5 text-amber-400" />
          <span>Rhetoric & Fallacies</span>
        </button>

        <button
          onClick={() => setActiveTab('sources')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'sources'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Globe className="w-3.5 h-3.5 text-emerald-400" />
          <span>Source & Consensus</span>
        </button>

        <button
          onClick={() => setActiveTab('debunk')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'debunk'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Share2 className="w-3.5 h-3.5 text-rose-400" />
          <span>Shareable Debunk Card</span>
        </button>
      </div>

      {/* TAB 1: CLAIM-BY-CLAIM BREAKDOWN */}
      {activeTab === 'claims' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Discrete factual assertions isolated and cross-examined:</span>
            <span>{report.claims.length} claims identified</span>
          </div>

          <div className="grid gap-3.5">
            {report.claims.map((claim, index) => {
              const badge = getClaimVerdictBadge(claim.verdict);
              return (
                <div
                  key={claim.id || index}
                  className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 hover:border-slate-700/80 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">
                        {index + 1}
                      </span>
                      <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                        Claim Assessment
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {claim.severity === 'critical' && (
                        <span className="text-[11px] font-bold text-rose-400 bg-rose-950/60 border border-rose-800/40 px-2 py-0.5 rounded">
                          High Impact Claim
                        </span>
                      )}
                      <span className={`text-xs px-2.5 py-0.5 rounded border font-semibold ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>
                  </div>

                  {/* The statement */}
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-slate-100">
                      "{claim.statement}"
                    </h4>
                    {claim.originalSnippet && (
                      <p className="text-xs text-slate-500 italic mt-1 pl-2 border-l-2 border-slate-700">
                        Original text: "{claim.originalSnippet}"
                      </p>
                    )}
                  </div>

                  {/* Evidence & Refutation */}
                  <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3 text-xs sm:text-sm text-slate-300 space-y-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Factual Analysis & Evidence:</span>
                    </div>
                    <p className="leading-relaxed pl-5 text-slate-300">
                      {claim.evidence}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: ANNOTATED ARTICLE INSPECTOR */}
      {activeTab === 'inspector' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Text View with Highlights */}
          <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Eye className="w-4 h-4 text-purple-400" />
                <span>Article Deconstruction</span>
              </h3>
              <span className="text-xs text-slate-500">
                Click any highlighted passage to inspect
              </span>
            </div>

            {/* Original Article Content */}
            <div className="text-sm leading-relaxed text-slate-300 font-sans space-y-4 max-h-[500px] overflow-y-auto pr-2">
              <p className="whitespace-pre-line">
                {report.inputText}
              </p>
            </div>

            {/* Highlight Legend */}
            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-rose-500/30 border border-rose-500" />
                <span>False Claim</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500" />
                <span>Misleading / Distorted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-purple-500/30 border border-purple-500" />
                <span>Emotional Hook / Clickbait</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500" />
                <span>Verified Fact</span>
              </div>
            </div>
          </div>

          {/* Highlight Inspector Sidebar */}
          <div className="space-y-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Annotated Findings ({report.highlightSpans?.length || 0})
              </h4>

              {report.highlightSpans && report.highlightSpans.length > 0 ? (
                <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
                  {report.highlightSpans.map((span, idx) => {
                    const isSelected = selectedHighlight?.text === span.text;
                    let badgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
                    if (span.type === 'misleading') badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
                    if (span.type === 'emotional_hyperbole') badgeColor = 'bg-purple-500/20 text-purple-300 border-purple-500/40';
                    if (span.type === 'verified_fact') badgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedHighlight(span)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all text-xs space-y-1.5 ${
                          isSelected
                            ? 'bg-slate-800 border-cyan-500/60 ring-1 ring-cyan-500/30'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${badgeColor}`}>
                            {span.type.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="font-medium text-slate-200 italic">
                          "{span.text}"
                        </p>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          {span.note}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-xs text-slate-500 py-4 text-center">
                  No highlighted anomalies detected in this excerpt.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RHETORIC & FALLACIES */}
      {activeTab === 'rhetoric' && (
        <div className="space-y-6">
          {/* Top Rhetoric Meters */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Sensationalism Meter */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  Sensationalism Index
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                  {report.rhetoricAnalysis.clickbaitLevel.toUpperCase()} CLICKBAIT
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-200">Hyperbole Score</span>
                  <span className="font-bold text-rose-400">{report.rhetoricAnalysis.sensationalismScore}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500"
                    style={{ width: `${report.rhetoricAnalysis.sensationalismScore}%` }}
                  />
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Measures aggressive emotional framing, hyperbolic adjectives, and urgency markers.
              </p>
            </div>

            {/* Bias Lean Spectrum */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  Ideological Slant
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {report.rhetoricAnalysis.biasLean.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-slate-500 uppercase font-semibold">
                  <span>Left</span>
                  <span>Center</span>
                  <span>Right</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full relative border border-slate-800">
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-cyan-400 rounded-full border-2 border-slate-900 shadow"
                    style={{
                      left:
                        report.rhetoricAnalysis.biasLean === 'extreme_left'
                          ? '10%'
                          : report.rhetoricAnalysis.biasLean === 'center_left'
                          ? '30%'
                          : report.rhetoricAnalysis.biasLean === 'center'
                          ? '50%'
                          : report.rhetoricAnalysis.biasLean === 'center_right'
                          ? '70%'
                          : report.rhetoricAnalysis.biasLean === 'extreme_right'
                          ? '90%'
                          : '50%',
                    }}
                  />
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {report.rhetoricAnalysis.biasDescription || 'Balanced neutral reporting tone.'}
              </p>
            </div>

            {/* Fallacy Counter */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  Logical Fallacies
                </span>
                <span className="text-xs font-bold text-amber-400">
                  {report.rhetoricAnalysis.logicalFallacies?.length || 0} Detected
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Structural reasoning errors or cognitive distortions engineered to manipulate audience opinion.
              </p>
            </div>
          </div>

          {/* Fallacies List */}
          {report.rhetoricAnalysis.logicalFallacies && report.rhetoricAnalysis.logicalFallacies.length > 0 && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Detected Logical Fallacies in Reasoning</span>
              </h3>

              <div className="grid md:grid-cols-2 gap-3.5">
                {report.rhetoricAnalysis.logicalFallacies.map((fallacy, idx) => (
                  <div key={idx} className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-300">
                        {fallacy.name}
                      </span>
                    </div>
                    {fallacy.example && (
                      <p className="text-xs text-slate-400 italic border-l-2 border-amber-500/40 pl-2">
                        "{fallacy.example}"
                      </p>
                    )}
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {fallacy.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Emotional Manipulation Triggers */}
          {report.rhetoricAnalysis.emotionalTriggers && report.rhetoricAnalysis.emotionalTriggers.length > 0 && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                <Flame className="w-4 h-4" />
                <span>Emotional Exploitation Markers</span>
              </h3>

              <div className="grid sm:grid-cols-3 gap-3">
                {report.rhetoricAnalysis.emotionalTriggers.map((trig, idx) => (
                  <div key={idx} className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-rose-300 uppercase">
                        Target Emotion: {trig.emotion}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-200">
                      "{trig.phrase}"
                    </p>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {trig.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: SOURCE & CONSENSUS */}
      {activeTab === 'sources' && (
        <div className="space-y-6">
          {/* Source Provenance Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Domain & Attribution Health
                </span>
                <h3 className="text-lg font-bold text-slate-100 mt-1">
                  {report.sourceProvenance?.domainCategory || 'Unclassified Source'}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Origin Trust</div>
                  <div className="text-lg font-black text-cyan-400">
                    {report.sourceProvenance?.domainTrustScore || 50}/100
                  </div>
                </div>
                <div className="px-3 py-1 rounded bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-700">
                  Attribution: {report.sourceProvenance?.attributionQuality?.replace('_', ' ')}
                </div>
              </div>
            </div>

            {/* Red & Green Flags */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-rose-950/20 border border-rose-800/40 rounded-lg p-4 space-y-2">
                <div className="text-xs font-bold text-rose-400 uppercase flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Red Flags & Anomalies ({report.sourceProvenance?.redFlags?.length || 0})</span>
                </div>
                <ul className="space-y-1.5 text-xs text-rose-200">
                  {report.sourceProvenance?.redFlags?.map((flag, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-lg p-4 space-y-2">
                <div className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Journalistic Green Flags ({report.sourceProvenance?.greenFlags?.length || 0})</span>
                </div>
                <ul className="space-y-1.5 text-xs text-emerald-200">
                  {report.sourceProvenance?.greenFlags?.map((flag, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Cross References & Database Consensus */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>Fact-Checking Consensus & Corroborating Outlets</span>
              </h3>
              <span className="text-xs text-slate-500">Cross-referenced against verified records</span>
            </div>

            <div className="grid md:grid-cols-2 gap-3.5">
              {report.crossReferences?.map((ref, idx) => (
                <div key={idx} className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">{ref.sourceName}</span>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                        ref.consensusStatus === 'debunks'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : ref.consensusStatus === 'confirms'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {ref.consensusStatus}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-300">{ref.headline}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{ref.snippet}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Live Grounding Web Citations */}
          {report.groundingSources && report.groundingSources.length > 0 && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <Globe className="w-3.5 h-3.5" />
                <span>Primary Sources & Verified References ({report.groundingSources.length})</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {report.groundingSources.map((source, idx) => (
                  <a
                    key={idx}
                    href={source.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-cyan-300 transition-colors"
                  >
                    <span className="truncate max-w-[280px]">{source.title}</span>
                    <ExternalLink className="w-3 h-3 shrink-0 text-slate-500" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: SHAREABLE DEBUNK CARD */}
      {activeTab === 'debunk' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Fact-Check Summary</span>
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Shareable Debunk Card
                </h3>
              </div>

              <button
                onClick={handleCopyDebunk}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-lg shadow-cyan-950/30"
              >
                {copiedDebunk ? (
                  <>
                    <Check className="w-4 h-4 text-slate-950" />
                    <span>Copied Debunk Text!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-950" />
                    <span>Copy Shareable Summary</span>
                  </>
                )}
              </button>
            </div>

            {/* Debunk preview card */}
            <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-5 space-y-4 font-sans">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {report.debunkCard.verdictTag}
                </span>
                <span className="text-[11px] text-slate-500">Verified via Veritas</span>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-slate-100">
                {report.debunkCard.headline}
              </h4>

              <p className="text-sm text-slate-300 leading-relaxed">
                {report.debunkCard.keyTakeaway}
              </p>

              <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-4 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed select-all">
                {report.debunkCard.copyableDebunkText}
              </div>
            </div>

            {/* Media Literacy Advice */}
            {report.mediaLiteracyAdvice && report.mediaLiteracyAdvice.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                  <span>How to Spot this Deception Pattern in the Future:</span>
                </h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {report.mediaLiteracyAdvice.map((tip, idx) => (
                    <div key={idx} className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3 text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-cyan-400 font-bold shrink-0">✓</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
