export interface WordInfluence {
  word: string;
  label: 'REAL' | 'FAKE';
  score?: number;
}

export interface SimilarArticle {
  id: number;
  title: string;
  datasetLabel: 'REAL' | 'FAKE';
  similarity: number; // e.g. 98.9
}

export interface ModelMetric {
  name: string;
  selected?: boolean;
  accuracy: string;
  precision: string;
  recall: string;
  f1Score: string;
}

export interface ClassificationResult {
  verdict: 'REAL' | 'FAKE';
  confidenceScore: number; // 0 to 100
  influentialWords: WordInfluence[];
  similarArticles: SimilarArticle[];
  modelComparison: ModelMetric[];
  evaluationSummary?: string;
  selectedModelNote?: string;
}
