import { FactCheckReport } from '../types/factcheck';

export const PRESET_REPORTS: Record<string, FactCheckReport> = {
  'sample-garlic-cancer': {
    id: 'rep-benchmark-garlic-cancer',
    timestamp: Date.now(),
    inputTitle: 'Secret Miracle: Boiled Garlic & Lemon Elixir Completely Cures Stage 4 Cancer Overnight, Doctors Terrified',
    inputText: `SHOCKING DISCOVERY BIG PHARMA DOESN'T WANT YOU TO KNOW!

A brave holistic doctor who was recently forced into hiding has leaked the ultimate cure for Stage 4 Cancer. By boiling crushed organic garlic cloves together with raw unfiltered lemon juice and Himalayan pink salt, a secret cellular alkalizing compound is triggered that starves every single malignant cancer cell within 48 hours.

Mainstream hospitals and pharmaceutical executives are frantically paying off government regulators to delete this formula from the internet because a $3 bottle of lemons would bankrupt the multi-trillion dollar chemotherapy industry. Over 100,000 terminal patients in secret clinical trials in Switzerland have been completely cured without a single dose of radiation.

Drink 3 glasses every morning on an empty stomach. Share this immediately before social media algorithms censor it forever!`,
    sourceUrl: 'Viral WhatsApp & Facebook chain',
    credibilityScore: 2,
    verdict: 'fabricated_hoax',
    verdictLabel: 'Fabricated Medical Disinformation Hoax',
    confidence: 'high',
    executiveSummary: 'This claim is dangerous medical fabrication with zero clinical or biochemical validity. Garlic and lemon contain antioxidants but cannot cure terminal malignancies or reverse cellular oncology mutations.',
    truthIn30Seconds: [
      'No peer-reviewed medical trial has ever shown garlic or lemon juice eradicates cancer cells in living patients.',
      'Alkaline diet theories contradict human biology: blood pH is tightly homeostatically buffered between 7.35 and 7.45 by the kidneys and lungs.',
      'Delaying genuine oncological treatments for unproven herbal remedies dramatically reduces survival rates.',
      'The claim relies on classic conspiracy tropes (persecuted doctor in hiding, Big Pharma suppression).'
    ],
    claims: [
      {
        id: 'claim-1',
        statement: 'Boiled garlic and lemon juice triggers a cellular alkalizing compound that starves stage 4 cancer in 48 hours',
        verdict: 'false',
        verdictLabel: 'Demonstrably False',
        evidence: 'Oncological biology proves tumors cannot be cured by food intake changing cellular pH. Dietary acid-base changes do not alter internal intracellular tumor microenvironments.',
        originalSnippet: 'starves every single malignant cancer cell within 48 hours',
        severity: 'critical'
      },
      {
        id: 'claim-2',
        statement: '100,000 terminal patients in Switzerland were cured in secret trials',
        verdict: 'false',
        verdictLabel: 'Completely Fabricated',
        evidence: 'Swiss health regulators (Swissmedic) and WHO trial registries show no record of any such clinical trial. A trial of 100,000 terminal patients would be larger than almost any oncology study in history.',
        originalSnippet: 'Over 100,000 terminal patients in secret clinical trials in Switzerland have been completely cured',
        severity: 'critical'
      },
      {
        id: 'claim-3',
        statement: 'Hospitals and pharmaceutical regulators are suppressing the formula to protect chemotherapy profits',
        verdict: 'false',
        verdictLabel: 'Paranoid Conspiracy Tropes',
        evidence: 'Standard conspiracy rhetoric used by scam wellness peddlers to explain away why medical professionals universally condemn the advice.',
        originalSnippet: 'paying off government regulators to delete this formula from the internet',
        severity: 'moderate'
      }
    ],
    rhetoricAnalysis: {
      sensationalismScore: 98,
      clickbaitLevel: 'extreme',
      emotionalTriggers: [
        {
          phrase: "BIG PHARMA DOESN'T WANT YOU TO KNOW",
          emotion: 'outrage & conspiracy validation',
          explanation: 'Creates an in-group sense of possessing forbidden knowledge.'
        },
        {
          phrase: 'Share this immediately before social media algorithms censor it forever!',
          emotion: 'urgent panic & viral compliance',
          explanation: 'Manipulates fear of censorship to bypass critical verification before resharing.'
        }
      ],
      logicalFallacies: [
        {
          name: 'Conspiracy Fallacy & Appeal to Emotion',
          example: 'Mainstream hospitals are frantically paying off government regulators',
          explanation: 'Attributes lack of scientific evidence to malevolent coverups rather than lack of efficacy.'
        },
        {
          name: 'Naturalistic Fallacy',
          example: 'organic garlic cloves together with raw unfiltered lemon juice',
          explanation: 'Falsely assumes that because an ingredient is natural, it is a potent cure for complex cellular diseases.'
        }
      ],
      biasLean: 'unaligned',
      biasDescription: 'Anti-science alternative medicine conspiracism with commercial engagement exploitation.'
    },
    sourceProvenance: {
      domainTrustScore: 5,
      domainCategory: 'Unregulated Social Media Rumor / Copy-Paste Chain',
      attributionQuality: 'anonymous_or_unnamed',
      redFlags: [
        'Anonymous doctor "forced into hiding" without verifiable name or credentials',
        'All-caps urgency commands (SHARE BEFORE IT GETS DELETED)',
        'Zero links to PubMed, Swissmedic, or oncology journals',
        'Preys on vulnerable terminal cancer patients'
      ],
      greenFlags: []
    },
    crossReferences: [
      {
        sourceName: 'American Cancer Society',
        headline: 'Dietary Ph and Alkaline Cancer Myths',
        consensusStatus: 'debunks',
        snippet: 'There is no scientific basis to support the claim that an alkaline diet or garlic cleanses can treat cancer.'
      },
      {
        sourceName: 'Reuters Fact Check',
        headline: 'Fact Check: Garlic and lemon water concoction does not cure cancer',
        consensusStatus: 'debunks',
        snippet: 'Viral posts claiming garlic and citrus cure stage 4 cancer are entirely false and dangerous to patient care.'
      },
      {
        sourceName: 'Memorial Sloan Kettering Cancer Center',
        headline: 'Garlic: Oncology Purported Uses and Adverse Effects',
        consensusStatus: 'debunks',
        snippet: 'Garlic contains allicin which has antioxidant properties in vitro, but does not eradicate cancer in human patients.'
      }
    ],
    debunkCard: {
      headline: 'Garlic and Lemon Juice Cannot Cure Cancer',
      verdictTag: 'FABRICATED HOAX',
      keyTakeaway: 'This viral message is completely false. Garlic and lemon water cannot cure stage 4 cancer or alter cellular pH. Discontinuing medical care for viral recipes is life-threatening.',
      copyableDebunkText: `⚠️ Fact Check: Please do NOT share the message claiming boiled garlic and lemon cures stage 4 cancer. 

Cancer specialists and the American Cancer Society have repeatedly confirmed this is false. Food cannot change blood pH (the human body maintains strict pH levels naturally), and no Swiss trial of 100,000 patients ever took place. 

Delaying real oncology treatment for viral home remedies puts lives in danger. Verified fact-checks available on Reuters and Snopes.`
    },
    mediaLiteracyAdvice: [
      'Beware of claims promising "100% cures" for complex diseases that oncologists spend decades researching.',
      'Check if named doctors exist in medical licensing registries. Anonymous "doctors forced into hiding" are a 100% hoax tell.',
      'Phrases like "Share before this is deleted" are viral growth tactics, not genuine news.'
    ],
    highlightSpans: [
      {
        text: 'SHOCKING DISCOVERY BIG PHARMA DOESN\'T WANT YOU TO KNOW!',
        type: 'emotional_hyperbole',
        note: 'Classic conspiratorial clickbait hook designed to bypass critical reasoning.'
      },
      {
        text: 'starves every single malignant cancer cell within 48 hours',
        type: 'false_claim',
        note: 'Medically impossible mechanism contradicted by all peer-reviewed oncology.'
      },
      {
        text: 'Over 100,000 terminal patients in secret clinical trials in Switzerland have been completely cured',
        type: 'false_claim',
        note: 'Fabricated trial statistics. Swissmedic and WHO confirm no such study exists.'
      },
      {
        text: 'Share this immediately before social media algorithms censor it forever!',
        type: 'emotional_hyperbole',
        note: 'Manufactured urgency to spur blind forwarding.'
      }
    ]
  },

  'sample-deepfake-election': {
    id: 'rep-benchmark-deepfake-election',
    timestamp: Date.now(),
    inputTitle: 'Leaked Audio: Chief Election Commissioner Admits 450,000 Ballots Pre-Loaded in Server Warehouse',
    inputText: `BREAKING: Whistleblowers inside the Federal Election Warehouse have just smuggled out a damning 2-minute audio recording.

In the leaked recording, a voice allegedly matching the State Election Commissioner explicitly directs technical staff to "pre-seed 450,000 provisional digital ballots into partition zero before the audit team arrives at 6 AM."

According to the anonymous whistleblower handle @TruthPatriot88, military cyber units have already seized the voting machines and arrested three regional clerks under treason statutes. Mainstream broadcast networks have declared an emergency blackout on all reporting regarding the warehouse. Constitutional lawyers warn the entire election cycle has been invalidated.`,
    sourceUrl: 'Anonymous Telegram Channel / X Bot Network',
    credibilityScore: 5,
    verdict: 'fabricated_hoax',
    verdictLabel: 'Fabricated Disinformation & Audio Forgery',
    confidence: 'high',
    executiveSummary: 'This report is a completely fabricated election conspiracy narrative utilizing synthetic audio attribution. State election officials, county clerks, and law enforcement confirm no warehouse seizures or arrests occurred.',
    truthIn30Seconds: [
      'No state or federal election commission has recorded audio of pre-seeding provisional ballots.',
      'Voting tabulation systems use air-gapped paper ballot optical scanners, not remote "partition zero" injections.',
      'Military branches have no domestic statutory jurisdiction over local county election machines.',
      'Bipartisan election boards conduct public pre-election logic and accuracy tests with verifiable paper trails.'
    ],
    claims: [
      {
        id: 'claim-1',
        statement: 'Leaked recording features State Election Commissioner ordering 450,000 ballots pre-loaded into servers',
        verdict: 'false',
        verdictLabel: 'Synthesized / Counterfeit Audio',
        evidence: 'Audio forensic analysis displays voice-clone robotic frequency artifacts. The Election Commission confirmed the audio is synthetic and no such instructions were given.',
        originalSnippet: 'directs technical staff to "pre-seed 450,000 provisional digital ballots into partition zero"',
        severity: 'critical'
      },
      {
        id: 'claim-2',
        statement: 'Military cyber units seized voting machines and arrested regional clerks for treason',
        verdict: 'false',
        verdictLabel: 'Completely Fabricated',
        evidence: 'Posse Comitatus Act prohibits US military domestic law enforcement operations. County election offices and judicial dockets confirm all clerks are active and zero arrests occurred.',
        originalSnippet: 'military cyber units have already seized the voting machines and arrested three regional clerks',
        severity: 'critical'
      }
    ],
    rhetoricAnalysis: {
      sensationalismScore: 92,
      clickbaitLevel: 'extreme',
      emotionalTriggers: [
        {
          phrase: 'military cyber units have already seized the voting machines',
          emotion: 'militant excitement & institutional dread',
          explanation: 'Appeals to authoritarian fantasy of external intervention invalidating democratic processes.'
        }
      ],
      logicalFallacies: [
        {
          name: 'Unsubstantiated Whistleblower Trope',
          example: 'According to the anonymous whistleblower handle @TruthPatriot88',
          explanation: 'Treats an unverified anonymous pseudonym on social media as an infallible investigative authority.'
        }
      ],
      biasLean: 'extreme_right',
      biasDescription: 'Election denialism disinformation structured to undermine institutional trust.'
    },
    sourceProvenance: {
      domainTrustScore: 10,
      domainCategory: 'Anonymous Telegram Bot Network',
      attributionQuality: 'anonymous_or_unnamed',
      redFlags: ['Single anonymous social handle as sole source', 'Allegations of military intervention in civil governance', 'Absence of local court filings'],
      greenFlags: []
    },
    crossReferences: [
      {
        sourceName: 'Associated Press Fact Check',
        headline: 'Fabricated audio clip targets election administrators',
        consensusStatus: 'debunks',
        snippet: 'Officials confirm viral audio is an AI-generated clone; voting machines remain secured under bipartisan custody.'
      }
    ],
    debunkCard: {
      headline: 'Audio of Election Pre-Loaded Ballots is Fabricated',
      verdictTag: 'DEBUNKED HOAX',
      keyTakeaway: 'The viral audio claiming to expose 450,000 injected ballots is an AI voice clone. No military seizure or clerk arrests took place.',
      copyableDebunkText: `⚠️ Fact Check: That leaked audio claiming election officials pre-loaded 450,000 ballots is a fabricated AI voice clone. 

Election administrators and local law enforcement have confirmed no clerks were arrested, no machines were seized, and all ballot tallies are verified through paper audit records. You can verify this fact-check on AP News and Reuters.`
    },
    mediaLiteracyAdvice: [
      'Audio clips without video showing mouth movements and verifiable background context are extremely easy to synthesize with consumer AI voice tools.',
      'Check local municipal county clerk websites and local beat reporters before believing viral federal conspiracies.'
    ],
    highlightSpans: [
      {
        text: 'pre-seed 450,000 provisional digital ballots into partition zero',
        type: 'false_claim',
        note: 'Fabricated technical jargon designed to sound sophisticated.'
      },
      {
        text: 'military cyber units have already seized the voting machines',
        type: 'false_claim',
        note: 'Legally and factually untrue claim of military intervention.'
      }
    ]
  },

  'sample-musk-quantum-scam': {
    id: 'rep-benchmark-musk-scam',
    timestamp: Date.now(),
    inputTitle: 'BBC Special Report: Elon Musk Unveils Automated Quantum AI Trading Engine That Generates $4,200 Daily for Regular Citizens',
    inputText: `During a live broadcast on BBC Breakfast, tech mogul Elon Musk shocked the anchors by unveiling a state-of-the-art computational system named 'Quantum Wealth Loophole'.

"I have deposited $250 of my own money into this automated high-frequency algorithm," Musk told the stunned presenter. "Within 15 minutes, the account balance jumped to $890 using quantum quantum arbitrage across global currency discrepancies."

Musk stated that in partnership with the Bank of England, 5,000 British citizens are being given exclusive access to register today before the window closes. Readers who deposit an initial minimum capital of £250 can expect passive daily returns between £1,200 and £4,500 deposited directly into their bank accounts.`,
    sourceUrl: 'Spoofed BBC domain (bbc-breaking-financial-news.com)',
    credibilityScore: 0,
    verdict: 'fabricated_hoax',
    verdictLabel: 'Counterfeit Impersonation Financial Scam',
    confidence: 'high',
    executiveSummary: 'This is an advance-fee crypto investment scam operating through a clone site mimicking the BBC. Elon Musk never appeared on BBC Breakfast promoting this algorithm, and no Bank of England partnership exists.',
    truthIn30Seconds: [
      'The domain is a counterfeit lookalike designed to steal initial deposit funds.',
      'Neither Elon Musk nor BBC Breakfast ever broadcasted this endorsement.',
      'The Bank of England does not partner with private algorithmic retail trading apps.',
      'Guaranteed returns of £4,500 daily on a £250 stake are mathematically and economically impossible.'
    ],
    claims: [
      {
        id: 'claim-1',
        statement: 'Elon Musk demonstrated a trading system turning £250 into £890 on live BBC Breakfast television',
        verdict: 'false',
        verdictLabel: 'Completely Fabricated',
        evidence: 'BBC archives and broadcast logs show no such interview ever occurred. The BBC has issued public warnings regarding spoof domains stealing their masthead.',
        originalSnippet: 'Within 15 minutes, the account balance jumped to $890',
        severity: 'critical'
      },
      {
        id: 'claim-2',
        statement: 'Bank of England partnered with the program to give 5,000 citizens guaranteed daily passive income',
        verdict: 'false',
        verdictLabel: 'Financial Scam Boilerplate',
        evidence: 'Central banks do not sponsor unregulated private high-frequency trading schemes.',
        originalSnippet: 'in partnership with the Bank of England, 5,000 British citizens are being given exclusive access',
        severity: 'critical'
      }
    ],
    rhetoricAnalysis: {
      sensationalismScore: 95,
      clickbaitLevel: 'extreme',
      emotionalTriggers: [
        {
          phrase: 'expect passive daily returns between £1,200 and £4,500',
          emotion: 'greed & financial desperation',
          explanation: 'Hooks readers struggling with living costs with impossible financial promises.'
        },
        {
          phrase: 'register today before the window closes',
          emotion: 'artificial urgency (FOMO)',
          explanation: 'Forces victims to transfer money before conducting basic fraud checks.'
        }
      ],
      logicalFallacies: [
        {
          name: 'Counterfeit Authority Endorsement',
          example: 'partnership with the Bank of England',
          explanation: 'Fraudulent usage of central banking credibility to disarm victim suspicion.'
        }
      ],
      biasLean: 'unaligned',
      biasDescription: 'Cybercrime financial phishing operation targeting savings.'
    },
    sourceProvenance: {
      domainTrustScore: 0,
      domainCategory: 'Spoofed Phishing Domain',
      attributionQuality: 'fabricated_attribution',
      redFlags: ['Impersonates BBC masthead on unrelated URL', 'Demands immediate £250 wire deposit', 'Fake countdown timers and urgency'],
      greenFlags: []
    },
    crossReferences: [
      {
        sourceName: 'UK Financial Conduct Authority (FCA)',
        headline: 'Warning on Clone Firm Cryptocurrency and AI Trading Platforms',
        consensusStatus: 'debunks',
        snippet: 'The FCA advises the public that celebrity-endorsed automated trading platforms are fraudulent boiler-room operations.'
      }
    ],
    debunkCard: {
      headline: 'BBC Elon Musk Quantum Wealth Article is a Scam',
      verdictTag: 'FINANCIAL SCAM ALERT',
      keyTakeaway: 'This is a phishing scam on a fake website copying the BBC layout. Do not deposit any money. Elon Musk has no relationship with this platform.',
      copyableDebunkText: `🚨 SCAM WARNING: Do not click links or send money to that "Elon Musk Quantum AI" BBC article!

It is a spoofed scam website mimicking the BBC. The BBC and the Financial Conduct Authority (FCA) have repeatedly warned that these fake interviews are criminal rings designed to steal deposits. Anyone who deposits money will not get it back.`
    },
    mediaLiteracyAdvice: [
      'Always inspect the address bar URL. Authentic BBC articles always live on bbc.com or bbc.co.uk, never bbc-financial-news.com.',
      'Any platform promising guaranteed returns without risk is always fraud.'
    ],
    highlightSpans: [
      {
        text: 'expect passive daily returns between £1,200 and £4,500',
        type: 'false_claim',
        note: 'Classic investment scam hallmark.'
      },
      {
        text: 'in partnership with the Bank of England',
        type: 'false_claim',
        note: 'Fabricated institutional endorsement.'
      }
    ]
  },

  'sample-jwst-biosignature': {
    id: 'rep-benchmark-jwst-true',
    timestamp: Date.now(),
    inputTitle: 'James Webb Space Telescope Detects Carbon-Bearing Molecules in Atmosphere of Habitable-Zone Exoplanet K2-18 b',
    inputText: `A new investigation with NASA's James Webb Space Telescope into K2-18 b, an exoplanet 8.6 times as massive as Earth, has revealed the presence of carbon-bearing molecules including methane and carbon dioxide.

The discovery from Webb adds to recent studies suggesting that K2-18 b could be a Hycean exoplanet, one which has the potential to possess a hydrogen-rich atmosphere and a water ocean-covered surface. The first insight into the atmospheric properties of this habitable-zone exoplanet came from observations with NASA's Hubble Space Telescope, which prompted further study.

The abundance of methane and carbon dioxide, and shortage of ammonia, support the hypothesis that there may be an ocean underneath a hydrogen-rich atmosphere in K2-18 b. These initial Webb observations also provided a possible detection of a molecule called dimethyl sulfide (DMS). On Earth, this is solely produced by living organisms, primarily phytoplankton in marine environments. However, researchers caution that additional spectroscopic data is needed to confirm the DMS signature.`,
    sourceUrl: 'NASA Jet Propulsion Laboratory & Astrophysical Journal Letters',
    credibilityScore: 98,
    verdict: 'verified_true',
    verdictLabel: 'Verified Peer-Reviewed Scientific Discovery',
    confidence: 'high',
    executiveSummary: 'This is an authentic, highly credible astrophysical report directly published by NASA and the European Space Agency. It communicates peer-reviewed spectroscopy data with proper scientific nuance and caveats.',
    truthIn30Seconds: [
      'Webb detected clear spectral signatures of methane (CH4) and carbon dioxide (CO2) in K2-18 b atmosphere.',
      'K2-18 b orbits in the habitable zone of red dwarf star K2-18 in Leo constellation, 120 light-years away.',
      'The report responsibly notes that the DMS detection is tentative and requires further observation, avoiding premature sensationalism.'
    ],
    claims: [
      {
        id: 'claim-1',
        statement: 'JWST detected methane and carbon dioxide in the atmosphere of exoplanet K2-18 b',
        verdict: 'true',
        verdictLabel: 'Empirically Confirmed',
        evidence: 'Published in The Astrophysical Journal Letters (Madhusudhan et al., 2023) and confirmed by NASA mission archives.',
        originalSnippet: 'revealed the presence of carbon-bearing molecules including methane and carbon dioxide',
        severity: 'none'
      },
      {
        id: 'claim-2',
        statement: 'DMS detection is tentative and requires additional validation data',
        verdict: 'true',
        verdictLabel: 'Accurate Scientific Caution',
        evidence: 'NASA researchers explicitly emphasized the DMS spectral signal had lower statistical confidence (~1 sigma) and must undergo follow-up observations.',
        originalSnippet: 'researchers caution that additional spectroscopic data is needed to confirm the DMS signature',
        severity: 'none'
      }
    ],
    rhetoricAnalysis: {
      sensationalismScore: 10,
      clickbaitLevel: 'none',
      emotionalTriggers: [],
      logicalFallacies: [],
      biasLean: 'center',
      biasDescription: 'Objective scientific communication adhering to academic standards.'
    },
    sourceProvenance: {
      domainTrustScore: 98,
      domainCategory: 'Accredited Scientific Agency (NASA / ESA)',
      attributionQuality: 'high',
      redFlags: [],
      greenFlags: ['Direct peer-reviewed paper citations', 'Accurate scientific caveats included', 'Consistent with published Hubble and Webb telemetry']
    },
    crossReferences: [
      {
        sourceName: 'NASA Webb Mission Office',
        headline: 'Webb Discovers Methane, Carbon Dioxide in Atmosphere of K2-18 b',
        consensusStatus: 'confirms',
        snippet: 'Official NASA press release corroborates atmospheric molecular detection on exoplanet K2-18 b.'
      },
      {
        sourceName: 'The Astrophysical Journal Letters',
        headline: 'Carbon-bearing Molecules in a Possible Hycean Atmosphere',
        consensusStatus: 'confirms',
        snippet: 'Peer-reviewed spectroscopic paper confirming carbon dioxide and methane absorption features.'
      }
    ],
    debunkCard: {
      headline: 'Webb Telescope K2-18 b Discovery is Authentic',
      verdictTag: 'VERIFIED TRUE',
      keyTakeaway: 'This is genuine peer-reviewed astrophysics research from NASA and the Webb Telescope. Atmospheric methane and carbon dioxide have been confirmed.',
      copyableDebunkText: `✅ Verified Fact: The report on the James Webb Space Telescope detecting carbon-bearing molecules on exoplanet K2-18 b is 100% genuine and verified by NASA and the Astrophysical Journal.`
    },
    mediaLiteracyAdvice: [
      'Notice how authentic scientific reporting uses careful qualifiers like "hypothesis" and "caution that additional data is needed", rather than breathless claims of "Alien life confirmed".'
    ],
    highlightSpans: [
      {
        text: 'revealed the presence of carbon-bearing molecules including methane and carbon dioxide',
        type: 'verified_fact',
        note: 'Confirmed by primary spectroscopy data.'
      },
      {
        text: 'researchers caution that additional spectroscopic data is needed to confirm the DMS signature',
        type: 'verified_fact',
        note: 'Exemplary scientific rigor highlighting uncertainty.'
      }
    ]
  },

  'sample-onion-satire': {
    id: 'rep-benchmark-onion-satire',
    timestamp: Date.now(),
    inputTitle: 'NASA Discovers Ancient Mars Civilization Was Also Ruined by Obnoxious Billionaires Building Giant Rockets',
    inputText: `PASADENA, CA—Analyzing high-resolution geological surveys transmitted by the Perseverance rover, planetary scientists at NASA confirmed Tuesday that an ancient, highly advanced civilization on Mars was completely wiped out after a handful of insufferable Martian billionaires spent all public resources building giant dick-shaped rockets.

"Our core drill samples clearly show that approximately 3.2 billion years ago, Mars had lush oceans and a breathable atmosphere, right up until their ultra-wealthy elite convinced themselves they were visionary disruptors who needed to build redundant lunar colony capsules," said lead astrobiologist Dr. Sarah Lin, noting sedimentary layers choked with abandoned titanium booster hulls.

NASA confirmed rover sensors also uncovered fossilized tablets indicating Martian citizens spent their final decades endlessly arguing about the rockets while their planetary aquifers evaporated.`,
    sourceUrl: 'The Onion (Satire)',
    credibilityScore: 0,
    verdict: 'satire_parody',
    verdictLabel: 'Satirical Parody & Social Commentary',
    confidence: 'high',
    executiveSummary: 'This piece is satirical humor created by The Onion to lampoon contemporary tech billionaires and private aerospace ventures. It contains no factual basis and was not intended as literal reporting.',
    truthIn30Seconds: [
      'Published by The Onion, a renowned satirical entertainment organization.',
      'NASA rovers have found zero evidence of ancient Martian civilizations, fossilized tablets, or rocket debris.',
      'Mars lost its atmosphere over billions of years due to solar wind stripping after its planetary dynamo shut down.'
    ],
    claims: [
      {
        id: 'claim-1',
        statement: 'Perseverance rover found evidence of ancient Martian civilization destroyed by billionaire rocket projects',
        verdict: 'false',
        verdictLabel: 'Satirical Humor',
        evidence: 'Fictional premise written for comedic social commentary.',
        originalSnippet: 'confirmed Tuesday that an ancient, highly advanced civilization on Mars was completely wiped out',
        severity: 'minor'
      }
    ],
    rhetoricAnalysis: {
      sensationalismScore: 85,
      clickbaitLevel: 'mild',
      emotionalTriggers: [
        {
          phrase: 'visionary disruptors who needed to build redundant lunar colony capsules',
          emotion: 'humor & cynical amusement',
          explanation: 'Comedic parody of Silicon Valley venture tropes.'
        }
      ],
      logicalFallacies: [],
      biasLean: 'center_left',
      biasDescription: 'Satirical critique of extreme wealth concentration and privatized space travel.'
    },
    sourceProvenance: {
      domainTrustScore: 90,
      domainCategory: 'Renowned Satire Publication (The Onion)',
      attributionQuality: 'adequate',
      redFlags: ['Fictional astrobiologist quotes', 'Absurd premise contradicts planetary science'],
      greenFlags: ['Published by clearly labeled humor magazine']
    },
    crossReferences: [
      {
        sourceName: 'The Onion',
        headline: 'About The Onion',
        consensusStatus: 'neutral',
        snippet: 'The Onion is a satirical news organization that publishes humorous, fictitious articles.'
      }
    ],
    debunkCard: {
      headline: 'Mars Billionaire Article is Satire from The Onion',
      verdictTag: 'SATIRE / PARODY',
      keyTakeaway: 'This article is a joke from The Onion making fun of modern billionaires. It is not real news from NASA.',
      copyableDebunkText: `😄 Note: That article about NASA finding extinct Martian billionaires is satire from The Onion! It's comedy poked at modern tech billionaires, not real NASA news.`
    },
    mediaLiteracyAdvice: [
      'Always check the publisher. Reputable satire sites like The Onion, The Babylon Bee, and The Daily Mash write parodies of real news formats.'
    ],
    highlightSpans: [
      {
        text: 'ancient, highly advanced civilization on Mars was completely wiped out',
        type: 'false_claim',
        note: 'Purely satirical invention.'
      }
    ]
  },

  'sample-solar-outage-misleading': {
    id: 'rep-benchmark-solar-misleading',
    timestamp: Date.now(),
    inputTitle: 'Solar Flare To Cause Global Internet Blackout for Weeks Starting Next Tuesday, NASA Confirms',
    inputText: `Scientists have warned that the Earth is on direct collision course with an unprecedented X-class solar superstorm that could wipe out the entire worldwide web for several weeks beginning next Tuesday.

NASA researchers studying Solar Cycle 25 have reportedly warned government leaders to brace for an "Internet Apocalypse." According to the report, undersea fiber optic cables will undergo massive electromagnetic induction, burning out routing servers across all continents and leaving modern banking, GPS, and communication paralyzed indefinitely.

Experts recommend withdrawing emergency cash, stockpiling non-perishable canned food, and printing out paper maps as power grids prepare for rolling catastrophic failures across both hemispheres.`,
    sourceUrl: 'Clickbait News Aggregator',
    credibilityScore: 28,
    verdict: 'mixture_misleading',
    verdictLabel: 'Sensationalized Clickbait / Distorted Science',
    confidence: 'high',
    executiveSummary: 'This headline and article take genuine academic research on extreme space weather risks and distort them into an imminent, guaranteed "worldwide internet collapse next Tuesday". NASA has issued no such date-specific warning.',
    truthIn30Seconds: [
      'NASA and NOAA Space Weather Prediction Center (SWPC) track solar flares daily; no catastrophic global blackout is scheduled or predicted for "next Tuesday".',
      'Solar Cycle 25 is active, but modern fiber-optic cables carry light, not electrical current (though unshielded repeaters have theoretical vulnerabilities).',
      'The viral article exaggerates a 2021 academic computer science paper (by Dr. Sangeetha Abdu Jyothi) into an imminent emergency.'
    ],
    claims: [
      {
        id: 'claim-1',
        statement: 'NASA confirmed a global internet blackout will begin next Tuesday lasting several weeks',
        verdict: 'false',
        verdictLabel: 'Fabricated Date & Exaggerated Threat',
        evidence: 'NOAA SWPC and NASA confirm normal space weather conditions. Solar flares cannot be scheduled to specific weekdays in advance.',
        originalSnippet: 'could wipe out the entire worldwide web for several weeks beginning next Tuesday',
        severity: 'critical'
      },
      {
        id: 'claim-2',
        statement: 'Undersea fiber optic cables will burn out routing servers worldwide',
        verdict: 'misleading',
        verdictLabel: 'Distorted Risk Model',
        evidence: 'Fiber optic glass strands are immune to geomagnetic induced currents. While power-carrying repeaters on long undersea spans have theoretical vulnerabilities in a Carrington-level event, global internet does not simply "burn out".',
        originalSnippet: 'undersea fiber optic cables will undergo massive electromagnetic induction, burning out routing servers',
        severity: 'moderate'
      }
    ],
    rhetoricAnalysis: {
      sensationalismScore: 88,
      clickbaitLevel: 'extreme',
      emotionalTriggers: [
        {
          phrase: 'brace for an "Internet Apocalypse"',
          emotion: 'survival panic',
          explanation: 'Sensational phrase borrowed from an academic paper title and used as literal imminent catastrophe.'
        },
        {
          phrase: 'withdrawing emergency cash, stockpiling non-perishable canned food',
          emotion: 'prepper panic',
          explanation: 'Drives viral traffic by weaponizing fear of civil breakdown.'
        }
      ],
      logicalFallacies: [
        {
          name: 'Catastrophizing & False Attribution',
          example: 'NASA Confirms ... Beginning Next Tuesday',
          explanation: 'Falsely attributes a specific imminent date to an agency that never made that statement.'
        }
      ],
      biasLean: 'unaligned',
      biasDescription: 'Commercial clickbait aggregator weaponizing routine scientific studies.'
    },
    sourceProvenance: {
      domainTrustScore: 35,
      domainCategory: 'Clickbait News Aggregator',
      attributionQuality: 'anonymous_or_unnamed',
      redFlags: ['No link to NOAA SWPC official bulletin', 'Vague "experts recommend" without names', 'Catastrophic predictions with immediate deadline'],
      greenFlags: []
    },
    crossReferences: [
      {
        sourceName: 'NOAA Space Weather Prediction Center',
        headline: 'Space Weather Conditions and Solar Flare Forecast',
        consensusStatus: 'debunks',
        snippet: 'Official NOAA forecast shows no imminent global telecommunication failure or unmanageable geomagnetic disruption.'
      },
      {
        sourceName: 'Snopes Fact Check',
        headline: 'Will a Solar Storm End the Internet Next Week?',
        consensusStatus: 'debunks',
        snippet: 'Claims that a solar superstorm will cause an internet apocalypse next week are false and based on misinterpreted research.'
      }
    ],
    debunkCard: {
      headline: 'No, A Solar Flare is Not Shutting Down the Internet Next Week',
      verdictTag: 'MISLEADING CLICKBAIT',
      keyTakeaway: 'NASA and NOAA have not issued an emergency warning about an internet blackout next Tuesday. This is clickbait twisting a 2021 theoretical study.',
      copyableDebunkText: `⚠️ Fact Check: That article saying a solar flare will shut down the global internet "next Tuesday" is false clickbait. 

NOAA and NASA monitor space weather constantly and confirm no such catastrophe is happening. The story misquoted a theoretical 2021 university paper. No need to panic or hoard cash.`
    },
    mediaLiteracyAdvice: [
      'Be wary of headlines that claim an agency "confirms" a catastrophic event "next Tuesday" when no major mainstream wire has reported it.',
      'Check the official agency directly: for space weather, go straight to spaceweather.gov.'
    ],
    highlightSpans: [
      {
        text: 'could wipe out the entire worldwide web for several weeks beginning next Tuesday',
        type: 'misleading',
        note: 'Fabricated timeline exaggerating theoretical risk.'
      },
      {
        text: 'Experts recommend withdrawing emergency cash, stockpiling non-perishable canned food',
        type: 'emotional_hyperbole',
        note: 'Manufactured panic instructions.'
      }
    ]
  }
};
