export interface CorpusItem {
  id: number;
  title: string;
  label: 'REAL' | 'FAKE';
  content: string;
}

export interface TestArticle {
  id: string;
  title: string;
  label: 'REAL' | 'FAKE';
  category: string;
  confidenceScore: number;
  content: string;
}

export const TESTING_DATASET: TestArticle[] = [
  // ── REAL NEWS ARTICLES ──
  {
    id: 'real-1',
    title: 'UAE authorities label the cockpit attack on a Flydubai flight by its Omani co-pilot as a "terrorist act," prais',
    label: 'REAL',
    category: 'Politics & Budget',
    confidenceScore: 100.0,
    content: 'the Dreamers. Representative Debbie Dingell told CBS she did not favor linking that issue to other policy objectives, such as wall funding. "We need to do DACA clean," she said. On Wednesday, Trump aides will meet with congressional leaders to discuss those issues. That will be followed by a weekend of strategy sessions for Trump and Republican leaders on Jan. 6 and 7, the White House said. Trump was also scheduled to meet on Sunday with Florida Republican Governor Rick Scott, who wants more emergency aid. The House has passed an $81 billion aid package after hurricanes in Florida, Texas and Puerto Rico, and wildfires in California. The package far exceeded the $44 billion requested by the Trump administration. The Senate has not yet voted on the aid. "politicsNews" "December 31, 2017 "',
  },
  {
    id: 'real-2',
    title: 'Federal Reserve announces interest rate policy following inflation report',
    label: 'REAL',
    category: 'Economy & Finance',
    confidenceScore: 94.8,
    content: 'The Federal Reserve raised benchmark interest rates by 25 basis points following consumer price index data indicating persistent inflationary pressures across services and housing sectors, Chairman Jerome Powell announced at a press conference. Central bank officials stated that monetary tightening remains necessary to achieve the long-term two percent inflation objective, while monitoring potential spillover impacts on commercial banking credit.',
  },
  {
    id: 'real-3',
    title: 'NASA James Webb Space Telescope confirms atmospheric composition of exoplanet K2-18b',
    label: 'REAL',
    category: 'Science & Space',
    confidenceScore: 99.2,
    content: 'Astronomers using the James Webb Space Telescope detected carbon-bearing molecules including methane and carbon dioxide in the atmosphere of habitable-zone exoplanet K2-18b, according to peer-reviewed findings in Astrophysical Journal Letters. The observations provide compelling evidence of an ocean-covered world with a hydrogen-rich atmosphere 120 light-years away from Earth.',
  },
  {
    id: 'real-4',
    title: 'Senate passes stopgap funding bill to avert government shutdown',
    label: 'REAL',
    category: 'Government & Law',
    confidenceScore: 91.6,
    content: 'The Senate voted to approve a short-term spending bill to keep federal agencies open through mid-January, postponing critical decisions on defense spending, immigration protections, and federal budget caps into the new legislative session. Congressional leaders from both parties expressed optimism that bipartisan negotiations over appropriations caps would resume immediately following the recess.',
  },
  {
    id: 'real-5',
    title: 'Supreme Court agrees to hear major antitrust challenge against technology conglomerate',
    label: 'REAL',
    category: 'Legal & Tech',
    confidenceScore: 87.3,
    content: 'The Supreme Court agreed to hear oral arguments in an appeal challenging federal regulatory enforcement and anti-competitive practices in digital marketplace advertising and search distribution. The justices will review whether existing antitrust statutes apply to algorithmic auction platforms and exclusive distribution contracts across mobile ecosystems.',
  },
  {
    id: 'real-6',
    title: 'Bipartisan senators draft compromise proposal on immigration and border security',
    label: 'REAL',
    category: 'Immigration & Policy',
    confidenceScore: 82.4,
    content: 'A bipartisan group of senators unveiled a compromise proposal intended to shield Dreamers from deportation while providing billions in border security funding and changes to family-based immigration visas. Negotiators emphasized that the framework addresses national security priorities while establishing legal certainty for eligible participants.',
  },
  {
    id: 'real-7',
    title: 'European Union reaches landmark agreement on comprehensive AI regulation rules',
    label: 'REAL',
    category: 'Tech Regulation',
    confidenceScore: 89.1,
    content: 'European Union negotiators reached a political agreement on the Artificial Intelligence Act, setting global benchmarks for high-risk artificial intelligence applications, foundational model transparency, and strict biometric surveillance bans. Officials confirmed the legislation establishes fines of up to 7 percent of global annual turnover for non-compliant corporations.',
  },
  {
    id: 'real-8',
    title: 'Global renewable energy capacity surged by record 50 percent in 2023, IEA reports',
    label: 'REAL',
    category: 'Energy & Climate',
    confidenceScore: 93.5,
    content: 'The International Energy Agency reported that the world added 50 percent more renewable capacity in 2023 than in 2022, driven primarily by massive solar photovoltaic installations across Asia and Europe. The agency highlighted that solar and wind expansion represents the fastest growth rate in two decades, positioning global targets within reach.',
  },
  {
    id: 'real-9',
    title: 'World Health Organization prequalifies second malaria vaccine to protect children',
    label: 'REAL',
    category: 'Global Health',
    confidenceScore: 96.7,
    content: 'The World Health Organization officially added the R21/Matrix-M malaria vaccine to its list of prequalified vaccines. Developed by Oxford University and manufactured by the Serum Institute of India, the vaccine demonstrated 75 percent efficacy in pediatric clinical trials, providing a cost-effective tool to reduce infant mortality across Sub-Saharan Africa.',
  },
  {
    id: 'real-10',
    title: 'World Trade Organization dispute panel issues ruling on international steel import tariffs',
    label: 'REAL',
    category: 'Global Trade',
    confidenceScore: 84.2,
    content: 'A dispute settlement panel at the World Trade Organization issued a formal report determining that tariffs imposed on imported steel and aluminum violated multilateral trade accords. Member delegations reiterated their commitment to rules-based international trade dispute resolution mechanisms while evaluating appellate options.',
  },
  {
    id: 'real-11',
    title: 'Southwest water authorities declare emergency conservation tier following reservoir decline',
    label: 'REAL',
    category: 'Environment',
    confidenceScore: 76.5,
    content: 'State water resource officials declared a Tier 2 water shortage for municipal water utilities drawing from the Colorado River basin following unprecedented multi-year drought measurements. Mandatory allocation reductions will require agricultural and suburban districts to implement immediate leak repair and voluntary consumption reductions.',
  },
  {
    id: 'real-12',
    title: 'Cybersecurity agency issues binding directive to patch critical software vulnerabilities',
    label: 'REAL',
    category: 'Cybersecurity',
    confidenceScore: 88.9,
    content: 'The Cybersecurity and Infrastructure Security Agency issued a binding operational directive mandating federal civilian executive branch agencies to patch zero-day remote code execution vulnerabilities identified in enterprise edge routing equipment. Cyber incident response teams confirmed active exploitation attempts by sophisticated state-sponsored threat actors.',
  },
  {
    id: 'real-13',
    title: 'Diplomatic delegations conclude multilateral talks in Geneva on nuclear non-proliferation',
    label: 'REAL',
    category: 'Foreign Affairs',
    confidenceScore: 72.8,
    content: 'Delegates from 14 nations concluded bilateral and multilateral discussions in Geneva regarding atomic safeguards and inspection protocols. The joint communique emphasized continued support for International Atomic Energy Agency monitoring and ongoing negotiations regarding enriched uranium stockpile thresholds.',
  },

  // ── FAKE NEWS ARTICLES ──
  {
    id: 'fake-1',
    title: 'Secret Miracle: Boiled Garlic and Lemon Elixir Cures Stage 4 Cancer Overnight',
    label: 'FAKE',
    category: 'Health Hoax',
    confidenceScore: 100.0,
    content: 'SHOCKING DISCOVERY BIG PHARMA DOES NOT WANT YOU TO KNOW! A brave holistic doctor who was recently forced into hiding has leaked the ultimate cure for Stage 4 Cancer. By boiling crushed organic garlic cloves together with raw lemon juice, a secret cellular alkalizing compound starves every single malignant cancer cell within 48 hours without radiation. Over 100,000 terminal patients in secret clinical trials in Switzerland have been completely cured. Share this immediately before social media algorithms censor it forever!',
  },
  {
    id: 'fake-2',
    title: 'Leaked Audio: Election Commissioner Admits 450,000 Pre-Loaded Ballots in Warehouse',
    label: 'FAKE',
    category: 'Election Conspiracy',
    confidenceScore: 98.7,
    content: 'BOMBSHELL EVIDENCE EXPOSED: Whistleblowers inside the federal election logistics warehouse have smuggled out an audio recording where a senior commissioner directs night-shift staff to pre-seed 450,000 provisional digital ballots into server partition zero before the official morning audit. Independent analysts confirm the voice biometric match, proving widespread systemic manipulation!',
  },
  {
    id: 'fake-3',
    title: 'BBC Special Report: Elon Musk Unveils Automated Quantum AI Wealth Loophole',
    label: 'FAKE',
    category: 'Financial Scam',
    confidenceScore: 97.4,
    content: 'Tech billionaire Elon Musk shocked television anchors during a live broadcast by demonstrating a secret automated computational trading algorithm generating $4,200 daily for regular citizens. "This loophole will end poverty completely, which is why major Wall Street banks are suing us to shut the software down immediately," Musk revealed while urging viewers to deposit $250 before access is permanently revoked.',
  },
  {
    id: 'fake-4',
    title: 'Solar Flare To Cause Total Global Internet Blackout Next Tuesday, Scientists Warn',
    label: 'FAKE',
    category: 'Viral Panic',
    confidenceScore: 99.1,
    content: 'URGENT GLOBAL ALERT: An unprecedented X-class coronal mass ejection heading directly toward Earth will completely fry undersea fiber optic cables and disable all global web servers and satellite navigation beginning next Tuesday. Anonymous astrophysicists warn that civilization will be plunged into an irreversible digital dark age lasting several months.',
  },
  {
    id: 'fake-5',
    title: 'Viral video proves government microchips secretly placed inside municipal water supply',
    label: 'FAKE',
    category: 'Conspiracy Theory',
    confidenceScore: 95.6,
    content: 'Exposed secret whistleblower documents reveal a clandestine federal program deploying microscopic tracking nanotechnology inside municipal water reservoirs to monitor civilian biometric movements and sub-audible thoughts. Independent laboratory microscopy shows magnetic particles coalescing in public tap water samples across major metropolitan counties.',
  },
  {
    id: 'fake-6',
    title: 'Secret Treaty Signed by G7 Leaders to Replace All Physical Currency With Subcutaneous Brain Chips',
    label: 'FAKE',
    category: 'Conspiracy Theory',
    confidenceScore: 92.3,
    content: 'Confidential draft agreement obtained from the closed-door economic summit proves world leaders have finalized an emergency treaty obligating all member states to outlaw cash and physical debit cards by December, replacing all bank accounts with subcutaneous neural chips connected to international sovereign debt databases.',
  },
  {
    id: 'fake-7',
    title: 'Leaked NASA Memo: Secret Underground Alien Base Discovered Near Lunar South Pole',
    label: 'FAKE',
    category: 'UFO Hoax',
    confidenceScore: 88.2,
    content: 'Classified satellite imagery leaked by rogue technicians within mission telemetry reveals a cavernous artificial subterranean complex beneath the moon Shackleton crater. Whistleblowers claim ancient monolithic spires emit low-frequency magnetic oscillations that active defense contractors have concealed from public press releases for decades.',
  },
  {
    id: 'fake-8',
    title: 'Drinking Colloidal Silver Solution Grants 100% Immunity to All Viruses, Banned Doctor Claims',
    label: 'FAKE',
    category: 'Medical Hoax',
    confidenceScore: 85.4,
    content: 'BANNED FROM YOUTUBE: A renowned holistic physician reveals that drinking 4 ounces of ionized colloidal silver each morning alkalizes the blood serum to a pH level of 8.5 where no bacterium or virus can physically survive. The American Medical Association is furiously suppressing this 10-cent cure to protect multi-billion dollar vaccine revenues.',
  },
  {
    id: 'fake-9',
    title: 'Military Whistleblower Claims Antarctic Thermal Hole Connects to Ancient Civilization Under Ice',
    label: 'FAKE',
    category: 'Conspiracy Theory',
    confidenceScore: 79.6,
    content: 'A former naval flight engineer broke his non-disclosure agreement to disclose that high-altitude radar flights over Marie Byrd Land detected geothermal vents leading down to a temperate biosphere warmed by volcanic steam tunnels inhabited by remnants of a pre-deluvian civilization.',
  },
  {
    id: 'fake-10',
    title: 'UN Treaty Passed to Ban All Backyard Gardens and Criminalize Growing Tomatoes at Home',
    label: 'FAKE',
    category: 'Disinformation',
    confidenceScore: 74.2,
    content: 'Globalist delegates voted at midnight to ratify Codex Alimentarius amendment 42B declaring private cultivation of vegetables and seed saving a biosecurity violation punishable by seizure of property and heavy criminal fines to force all citizens onto synthetic corporate food rations.',
  },
  {
    id: 'fake-11',
    title: 'Secret 5G Tower Frequencies Activated to Cause Instant Mass Dizziness in Major Metros',
    label: 'FAKE',
    category: 'Conspiracy Theory',
    confidenceScore: 81.8,
    content: 'Whistleblower telecom engineers admit that newly installed millimeter-wave cell transmitters were secretly switched to 60 gigahertz resonant absorption frequencies during the weekend, producing widespread neurological disorientation and cardiac fatigue across targeted urban demographics.',
  },
  {
    id: 'fake-12',
    title: 'Emergency Decree: Government to Confiscate 85% of Personal Savings Accounts This Friday',
    label: 'FAKE',
    category: 'Financial Panic',
    confidenceScore: 83.5,
    content: 'Leaked treasury department memo shows an executive banking holiday will be declared this Friday at 5:00 PM to initiate a mandatory 85% wealth levy on all personal savings accounts over $1,000 to cover insolvent offshore derivative debt. Withdraw all your money immediately!',
  },
  {
    id: 'fake-13',
    title: 'Leaked Audio Proves Hollywood Celebrities Secretly Replaced by Synthetic Clones',
    label: 'FAKE',
    category: 'Celebrity Rumor',
    confidenceScore: 69.4,
    content: 'Underground studio sound engineers have released confidential audio recordings from deep inside an underground soundstage where voice synthesizers glitch while duplicating celebrity speech patterns. Insider documents confirm dozens of red carpet performers were replaced by bio-synthetic doubles following private contracts.',
  },
];

export const DATASET_CORPUS: CorpusItem[] = [
  ...TESTING_DATASET.map((t, idx) => ({
    id: idx + 1,
    title: t.title,
    label: t.label,
    content: t.content,
  })),
  {
    id: 101,
    title: 'U.S. tax revamp still incomplete as Republicans eye social program cuts',
    label: 'REAL',
    content: 'Congressional Republicans are turning their attention to welfare and social spending cuts after passing the largest tax overhaul in decades. Senate Majority Leader Mitch McConnell cautioned against moving quickly without bipartisan support, while House Speaker Paul Ryan urged immediate reforms to entitlement spending, medicaid, and congressional budget caps.',
  },
  {
    id: 102,
    title: 'White House, Congress prepare for talks on spending, immigration',
    label: 'REAL',
    content: 'Top congressional leaders and White House officials plan to meet to negotiate a long-term budget caps agreement and avoid a looming government shutdown. Talks will center on defense and domestic spending limits, disaster relief funding, and the legal status of hundreds of thousands of young undocumented immigrants brought to the country as children.',
  },
  {
    id: 103,
    title: "'Dreamer' issue adds to packed U.S. congressional agenda",
    label: 'REAL',
    content: 'Democrats and moderate Republicans pressed congressional leadership for a legislative fix for the Deferred Action for Childhood Arrivals (DACA) program before federal funding expires. Lawmakers face a tight deadline to address government spending caps, hurricane relief, and border security provisions.',
  },
  {
    id: 104,
    title: 'Trump warns of government shutdown threat ahead of meeting with lawmakers',
    label: 'REAL',
    content: 'President Donald Trump warned of a possible federal government shutdown as partisan disagreements flared over government funding, border wall appropriations, and immigration policy. Speaking at the White House, Trump criticized Democratic leadership for prioritizing immigration negotiations over defense spending.',
  },
];

// Benchmark Model Performance Metrics
export const MODEL_PERFORMANCE_METRICS = [
  {
    name: 'Logistic Regression',
    selected: false,
    accuracy: '98.63%',
    precision: '0.9791',
    recall: '0.9960',
    f1Score: '0.9875',
  },
  {
    name: 'Multinomial Naive Bayes',
    selected: false,
    accuracy: '96.05%',
    precision: '0.9667',
    recall: '0.9601',
    f1Score: '0.9634',
  },
  {
    name: 'Linear SVM',
    selected: true,
    accuracy: '99.16%',
    precision: '0.9876',
    recall: '0.9969',
    f1Score: '0.9923',
  },
];

// TF-IDF Tokenizer & Cosine Similarity Calculator
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

export function computeTop5SimilarArticles(
  queryText: string,
  corpus: CorpusItem[] = DATASET_CORPUS
): { id: number; title: string; datasetLabel: 'REAL' | 'FAKE'; similarity: number }[] {
  const queryTokens = tokenize(queryText);
  if (queryTokens.length === 0) {
    return corpus.slice(0, 5).map((item, idx) => ({
      id: item.id,
      title: item.title,
      datasetLabel: item.label,
      similarity: Number((80 - idx * 10).toFixed(1)),
    }));
  }

  // Term frequency for query
  const queryTf: Record<string, number> = {};
  for (const t of queryTokens) {
    queryTf[t] = (queryTf[t] || 0) + 1;
  }

  // Document frequencies across corpus
  const df: Record<string, number> = {};
  for (const item of corpus) {
    const tokens = new Set(tokenize(item.title + ' ' + item.content));
    for (const t of tokens) {
      df[t] = (df[t] || 0) + 1;
    }
  }

  const N = corpus.length + 1;

  // Query vector
  const queryVec: Record<string, number> = {};
  let queryNorm = 0;
  for (const [t, count] of Object.entries(queryTf)) {
    const idf = Math.log((N + 1) / ((df[t] || 0) + 1)) + 1;
    const tfidf = count * idf;
    queryVec[t] = tfidf;
    queryNorm += tfidf * tfidf;
  }
  queryNorm = Math.sqrt(queryNorm);

  // Compute cosine similarity for each document
  const scored = corpus.map((doc) => {
    const docTokens = tokenize(doc.title + ' ' + doc.content);
    const docTf: Record<string, number> = {};
    for (const t of docTokens) {
      docTf[t] = (docTf[t] || 0) + 1;
    }

    let dotProduct = 0;
    let docNorm = 0;
    for (const [t, count] of Object.entries(docTf)) {
      const idf = Math.log((N + 1) / ((df[t] || 0) + 1)) + 1;
      const tfidf = count * idf;
      docNorm += tfidf * tfidf;
      if (queryVec[t]) {
        dotProduct += queryVec[t] * tfidf;
      }
    }
    docNorm = Math.sqrt(docNorm);

    let cosine = 0;
    if (queryNorm > 0 && docNorm > 0) {
      cosine = dotProduct / (queryNorm * docNorm);
    }

    // Convert to percentage (between 10% and 99.5%)
    let similarityPct = Math.min(99.5, Math.max(12.0, Math.round(cosine * 1000) / 10));

    // If query is an exact match or substring match, boost to 98.9%
    const normQ = queryText.toLowerCase();
    const normD = doc.content.toLowerCase();
    if (normQ.length > 50 && (normD.includes(normQ.slice(0, 100)) || normQ.includes(normD.slice(0, 100)))) {
      similarityPct = 98.9;
    }

    return {
      id: doc.id,
      title: doc.title,
      datasetLabel: doc.label,
      similarity: similarityPct,
      rawScore: cosine,
    };
  });

  // Sort descending by similarity
  scored.sort((a, b) => b.similarity - a.similarity);

  return scored.slice(0, 5).map((item) => ({
    id: item.id,
    title: item.title,
    datasetLabel: item.datasetLabel,
    similarity: item.similarity,
  }));
}
