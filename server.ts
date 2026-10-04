import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '5mb' }));

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
    timestamp: new Date().toISOString(),
  });
});

// URL text extractor helper
app.post('/api/fetch-url', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'URL is required' });
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    const response = await fetch(parsedUrl.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 VeritasNewsBot/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      return res.status(400).json({ error: `Could not fetch article. HTTP status: ${response.status} ${response.statusText}` });
    }

    const html = await response.text();

    // Extract title
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : parsedUrl.hostname;

    // Clean html to get main text
    let cleanText = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
      .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, ' ')
      .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, ' ')
      .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, ' ')
      .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, ' ')
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/\s+/g, ' ')
      .trim();

    // Limit to reasonable length
    if (cleanText.length > 8000) {
      cleanText = cleanText.slice(0, 8000) + '...';
    }

    return res.json({
      title,
      text: cleanText,
      domain: parsedUrl.hostname,
      url: parsedUrl.toString(),
    });
  } catch (error: any) {
    console.error('URL Fetch error:', error);
    return res.status(500).json({ error: error.message || 'Failed to fetch article content from URL.' });
  }
});

import { PRESET_REPORTS } from './src/data/presetReports.js';
import { SAMPLE_ARTICLES } from './src/data/sampleArticles.js';

// Helper to find matching sample article
function findMatchingPreset(text: string, title?: string) {
  const normText = text.trim().toLowerCase();
  for (const sample of SAMPLE_ARTICLES) {
    if (
      (sample.title && title && sample.title.toLowerCase() === title.trim().toLowerCase()) ||
      normText.includes(sample.fullText.slice(0, 100).toLowerCase()) ||
      sample.fullText.toLowerCase().includes(normText.slice(0, 100))
    ) {
      if (PRESET_REPORTS[sample.id]) {
        return PRESET_REPORTS[sample.id];
      }
    }
  }
  return null;
}

// Fact-checking analysis endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const { text, title, sourceUrl, sampleId } = req.body;
    if (!text || typeof text !== 'string' || text.trim().length < 15) {
      return res.status(400).json({ error: 'Text must be at least 15 characters long.' });
    }

    // Check if sampleId or text matches a curated benchmark preset
    if (sampleId && PRESET_REPORTS[sampleId]) {
      return res.json({
        ...PRESET_REPORTS[sampleId],
        timestamp: Date.now(),
      });
    }

    const matchedPreset = findMatchingPreset(text, title);
    if (matchedPreset) {
      // Return instant benchmark if it's one of the official sample cases
      return res.json({
        ...matchedPreset,
        timestamp: Date.now(),
      });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'MY_GEMINI_API_KEY') {
      return res.status(500).json({
        error: 'Gemini API key is not configured. Please check your AI Studio Secrets panel.',
      });
    }

    const prompt = `You are Veritas AI, the world's most rigorous, objective fact-checking and forensic news analysis engine.
Analyze the following text, headline, or claim with extreme forensic precision. Evaluate whether this is verified fact, misleading spin, fabricated disinformation, satirical fiction, or unproven rumor.

TEXT TO ANALYZE:
"""
Title: ${title || 'Not provided'}
Source/URL: ${sourceUrl || 'Not provided'}
Content:
${text}
"""

Return your entire analysis strictly as a single JSON object (no markdown wrapping, no trailing prose) with the exact structure below:
{
  "credibilityScore": <integer between 0 and 100, where 0 is completely fabricated hoax and 100 is indisputably true consensus fact>,
  "verdict": "<one of: 'verified_true' | 'mostly_true' | 'mixture_misleading' | 'mostly_false' | 'fabricated_hoax' | 'satire_parody'>",
  "verdictLabel": "<concise title e.g. 'Fabricated Disinformation Hoax' or 'Verified Consensus Science' or 'Deceptive Half-Truth'>",
  "confidence": "<'high' | 'medium' | 'low'>",
  "executiveSummary": "<2-3 clear, authoritative sentences summarizing whether the content is true, fake, or distorted, and why>",
  "truthIn30Seconds": [
    "<3 to 4 clear, punchy bullet points of verified reality that directly contrast or clarify the claims>"
  ],
  "claims": [
    {
      "id": "claim-1",
      "statement": "<extracted distinct factual claim from the text>",
      "verdict": "<'true' | 'mostly_true' | 'unsubstantiated' | 'misleading' | 'false'>",
      "verdictLabel": "<short label e.g. 'Demonstrably False' or 'Confirmed by Data'>",
      "evidence": "<precise factual refutation or confirmation with citations/consensus>",
      "originalSnippet": "<the excerpt from the text making this claim>",
      "severity": "<'critical' | 'moderate' | 'minor' | 'none'>"
    }
  ],
  "rhetoricAnalysis": {
    "sensationalismScore": <integer 0-100 indicating sensationalism and emotional manipulation>,
    "clickbaitLevel": "<'none' | 'mild' | 'moderate' | 'extreme'>",
    "emotionalTriggers": [
      {
        "phrase": "<quote from text>",
        "emotion": "<fear | outrage | greed | urgent panic | tribalism>",
        "explanation": "<why this manipulation is used>"
      }
    ],
    "logicalFallacies": [
      {
        "name": "<e.g. Straw Man, False Dilemma, Appeal to Fear, Post Hoc Fallacy, Cherry Picking, Slippery Slope, Non Sequitur>",
        "example": "<quote from text>",
        "explanation": "<how the reasoning fails>"
      }
    ],
    "biasLean": "<'extreme_left' | 'center_left' | 'center' | 'center_right' | 'extreme_right' | 'unaligned'>",
    "biasDescription": "<objective description of ideological or institutional bias, or lack thereof>"
  },
  "sourceProvenance": {
    "domainTrustScore": <integer 0-100 evaluating the source or typical origin of such claims>,
    "domainCategory": "<e.g. 'Reputable Wire Agency' | 'Known Satirical Publication' | 'Unregulated Social Media Rumor' | 'State-Affiliated Outlet' | 'Fabricated Spoof Domain'>",
    "attributionQuality": "<'high' | 'adequate' | 'anonymous_or_unnamed' | 'fabricated_attribution'>",
    "redFlags": [
      "<specific red flags found in author byline, domain, lack of links, anonymous whistleblowers, all-caps, etc.>"
    ],
    "greenFlags": [
      "<positive markers of journalistic rigor, peer review, named accountable reporters, transparent corrections>"
    ]
  },
  "crossReferences": [
    {
      "sourceName": "<e.g. 'Reuters Fact Check' | 'Associated Press' | 'Snopes' | 'NASA JPL' | 'World Health Organization' | 'Academic Consensus'>",
      "url": "<relevant web search query or real reference url>",
      "headline": "<what reputable reporting says on this topic>",
      "consensusStatus": "<'confirms' | 'debunks' | 'neutral' | 'no_mention'>",
      "snippet": "<concise summary of verified reporting>"
    }
  ],
  "debunkCard": {
    "headline": "<catchy, clear headline for stopping the rumor in social chats>",
    "verdictTag": "<e.g. 'DEBUNKED' | 'CONFIRMED TRUE' | 'MISLEADING CONTEXT'>",
    "keyTakeaway": "<1-2 sentence shareable summary of the truth>",
    "copyableDebunkText": "<ready-to-paste friendly message that a user can copy to a family group chat or social media comment explaining why this claim is false/true with the facts>"
  },
  "mediaLiteracyAdvice": [
    "<practical tips on how readers can verify this specific genre of claim themselves in the future>"
  ],
  "highlightSpans": [
    {
      "text": "<exact short phrase or sentence from the input text>",
      "type": "<'false_claim' | 'misleading' | 'unverified' | 'emotional_hyperbole' | 'verified_fact'>",
      "note": "<brief explanation of why this phrase is highlighted>"
    }
  ]
}`;

    // Invoke Gemini 3.8 Flash with retry logic
    let rawOutput = '';
    const groundingSources: { title: string; uri: string }[] = [];

    // Attempt 1: Try with Google Search tool on gemini-3.8-flash
    let callSucceeded = false;
    let lastError: any = null;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          temperature: 0.2,
        },
      });

      rawOutput = response.text || '';
      callSucceeded = true;

      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (Array.isArray(chunks)) {
        for (const chunk of chunks) {
          if (chunk.web?.uri) {
            groundingSources.push({
              title: chunk.web.title || new URL(chunk.web.uri).hostname,
              uri: chunk.web.uri,
            });
          }
        }
      }
    } catch (err: any) {
      console.warn('Attempt 1 (gemini-3.8-flash with search) failed:', err?.message || err);
      lastError = err;
    }

    // Attempt 2: If attempt 1 failed (e.g. 503 high demand or 429 search quota), try standard gemini-3.8-flash
    if (!callSucceeded) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            temperature: 0.2,
          },
        });
        rawOutput = response.text || '';
        callSucceeded = true;
      } catch (err: any) {
        console.warn('Attempt 2 (gemini-3.8-flash standard) failed:', err?.message || err);
        lastError = err;
      }
    }

    // Attempt 3: If still failing (e.g. gemini-3.8-flash experiencing 503 high demand), failover to gemini-3.1-flash-lite
    if (!callSucceeded) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: prompt,
          config: {
            temperature: 0.2,
          },
        });
        rawOutput = response.text || '';
        callSucceeded = true;
      } catch (err: any) {
        console.error('Attempt 3 (gemini-3.1-flash-lite failover) failed:', err?.message || err);
        lastError = err;
      }
    }

    // If all attempts failed
    if (!callSucceeded || !rawOutput) {
      const errMsg = lastError?.message || JSON.stringify(lastError || '');
      const is429 = errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('quota');
      const is503 = errMsg.includes('503') || errMsg.includes('UNAVAILABLE') || errMsg.includes('high demand');

      return res.status(is429 ? 429 : is503 ? 503 : 500).json({
        errorCode: is429 ? 'RATE_LIMIT_EXCEEDED' : is503 ? 'SERVICE_HIGH_DEMAND' : 'GENAI_ERROR',
        error: is429
          ? 'You exceeded your current Gemini API quota. Please wait a minute and try again, or connect a billing-enabled API key in the AI Studio Settings > Secrets panel.'
          : is503
          ? 'The AI model is temporarily experiencing high demand across Google network servers. Spikes are temporary—please retry in a few moments or test an instant benchmark.'
          : (lastError?.message || 'Fact-checking analysis engine failed.'),
        details: lastError?.details || undefined,
      });
    }

    // Parse JSON
    let parsedData: any;
    try {
      // Clean possible markdown code fences
      let cleaned = rawOutput.trim();
      if (cleaned.startsWith('```json')) {
        cleaned = cleaned.slice(7);
      } else if (cleaned.startsWith('```')) {
        cleaned = cleaned.slice(3);
      }
      if (cleaned.endsWith('```')) {
        cleaned = cleaned.slice(0, -3);
      }
      cleaned = cleaned.trim();

      // Find first { and last }
      const firstBrace = cleaned.indexOf('{');
      const lastBrace = cleaned.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        cleaned = cleaned.slice(firstBrace, lastBrace + 1);
      }

      parsedData = JSON.parse(cleaned);
    } catch (parseError) {
      console.error('Failed to parse Gemini JSON output:', parseError, rawOutput);
      return res.status(500).json({
        error: 'Analysis engine generated non-standard response. Please retry.',
        raw: rawOutput.slice(0, 500),
      });
    }

    // Attach metadata
    const report = {
      ...parsedData,
      id: 'rep-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      timestamp: Date.now(),
      inputText: text,
      inputTitle: title || undefined,
      sourceUrl: sourceUrl || undefined,
      groundingSources: groundingSources.length > 0 ? groundingSources : undefined,
    };

    return res.json(report);
  } catch (error: any) {
    console.error('Analysis error:', error);
    return res.status(500).json({
      error: error.message || 'An error occurred during analysis.',
    });
  }
});

// Vite Middleware integration
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Veritas AI] Server listening on port ${PORT}`);
});
