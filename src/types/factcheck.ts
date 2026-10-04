export type VerdictType = 
  | 'verified_true' 
  | 'mostly_true' 
  | 'mixture_misleading' 
  | 'mostly_false' 
  | 'fabricated_hoax' 
  | 'satire_parody';

export type ClaimVerdict = 'true' | 'mostly_true' | 'unsubstantiated' | 'misleading' | 'false';

export interface ClaimAnalysis {
  id: string;
  statement: string;
  verdict: ClaimVerdict;
  verdictLabel: string;
  evidence: string;
  originalSnippet?: string;
  severity: 'critical' | 'moderate' | 'minor' | 'none';
}

export interface EmotionalTrigger {
  phrase: string;
  emotion: string;
  explanation: string;
}

export interface LogicalFallacy {
  name: string;
  example: string;
  explanation: string;
}

export interface HighlightSpan {
  start?: number;
  end?: number;
  text: string;
  type: 'false_claim' | 'misleading' | 'unverified' | 'emotional_hyperbole' | 'verified_fact';
  note: string;
}

export interface SourceProvenance {
  domainTrustScore: number; // 0 - 100
  domainCategory: string;
  attributionQuality: 'high' | 'adequate' | 'anonymous_or_unnamed' | 'fabricated_attribution';
  redFlags: string[];
  greenFlags: string[];
}

export interface CrossReference {
  sourceName: string;
  url?: string;
  headline: string;
  consensusStatus: 'confirms' | 'debunks' | 'neutral' | 'no_mention';
  snippet: string;
}

export interface DebunkCard {
  headline: string;
  verdictTag: string;
  keyTakeaway: string;
  copyableDebunkText: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface FactCheckReport {
  id: string;
  timestamp: number;
  inputTitle?: string;
  inputText: string;
  sourceUrl?: string;
  credibilityScore: number; // 0 - 100
  verdict: VerdictType;
  verdictLabel: string;
  confidence: 'high' | 'medium' | 'low';
  executiveSummary: string;
  truthIn30Seconds: string[];
  claims: ClaimAnalysis[];
  rhetoricAnalysis: {
    sensationalismScore: number; // 0 - 100
    clickbaitLevel: 'none' | 'mild' | 'moderate' | 'extreme';
    emotionalTriggers: EmotionalTrigger[];
    logicalFallacies: LogicalFallacy[];
    biasLean: 'extreme_left' | 'center_left' | 'center' | 'center_right' | 'extreme_right' | 'unaligned';
    biasDescription: string;
  };
  sourceProvenance: SourceProvenance;
  crossReferences: CrossReference[];
  debunkCard: DebunkCard;
  mediaLiteracyAdvice: string[];
  highlightSpans: HighlightSpan[];
  groundingSources?: GroundingSource[];
}

export interface SampleArticle {
  id: string;
  title: string;
  category: 'Health & Medicine' | 'Geopolitics' | 'Technology & AI' | 'Finance & Scams' | 'Satire' | 'Verified Truth';
  summary: string;
  source: string;
  expectedVerdict: VerdictType;
  fullText: string;
  url?: string;
}
