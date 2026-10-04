export interface QuizQuestion {
  id: string;
  headline: string;
  context: string;
  sourcePreview: string;
  redFlagsList: string[];
  correctVerdict: 'Fake / Fabricated' | 'Real / Authentic' | 'Misleading / Half-Truth' | 'Satire / Parody';
  explanation: string;
  forensicClues: string[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'quiz-1',
    headline: '"Japan Bans Microwave Ovens Nationwide by End of Year, Citizens Face 10-Year Prison Sentences for Refusal"',
    context: 'A viral graphic circulating with a photo of the Japanese parliament and a microwave struck through with a red circle.',
    sourcePreview: 'Shared across WhatsApp groups & Facebook meme pages',
    correctVerdict: 'Fake / Fabricated',
    redFlagsList: [
      'Absurd draconian punishment (10 years prison for a kitchen appliance)',
      'No Japanese ministry or major news outlet reported any such legislation',
      'Originated on a Russian satirical website (Panorama.pub) and was translated as fact'
    ],
    explanation: 'Completely fabricated hoax. Started on Russian satirical site Panorama.pub in 2019, then translated and circulated worldwide. No government has ever banned microwave ovens for radio frequency toxicity.',
    forensicClues: [
      'Extreme claim without official Gazette or Cabinet citation',
      'Emotional fear trigger around everyday household item'
    ]
  },
  {
    id: 'quiz-2',
    headline: '"Federal Reserve Issues Emergency Directive Replacing All Paper Currency with Digital FedNow Dollars Starting Next Month"',
    context: 'A TikTok video featuring an ominous robotic voiceover claiming physical paper cash will be seized and deactivated on the 1st.',
    sourcePreview: 'Anonymous short-form video with 3.4M views and urgent warning captions',
    correctVerdict: 'Fake / Fabricated',
    redFlagsList: [
      'Confuses FedNow (an interbank payment settlement infrastructure) with a Central Bank Digital Currency (CBDC)',
      'Congress alone has authority over legal tender currency, not an overnight Fed directive',
      'Designed to panic viewers into purchasing gold/crypto from affiliate sponsors'
    ],
    explanation: 'FedNow is a backend payment system for commercial banks to clear transfers in real time, not a replacement for cash. Physical US currency remains legal tender by law.',
    forensicClues: [
      'Commercial urgency driving users to unregulated alternative investments',
      'Artificial robotic narration with no accountable journalist byline'
    ]
  },
  {
    id: 'quiz-3',
    headline: '"Study Finds People Who Swear More Often Have Higher Verbal Intelligence and Honesty"',
    context: 'Lifestyle magazine article citing a peer-reviewed paper from the Language Sciences academic journal.',
    sourcePreview: 'Psychology & Behavioral Science column citing Marist College research',
    correctVerdict: 'Misleading / Half-Truth',
    redFlagsList: [
      'Oversimplified headline turns a nuanced fluency study into a sweeping causal claim',
      'The study tested taboo word fluency as a subset of overall general vocabulary size, not as a moral indicator of honesty',
      'Social media clickbait exaggerated the original academic caveats'
    ],
    explanation: 'Misleading half-truth. Researchers found that people who can generate more curse words in one minute also possess larger overall vocabularies (fluency correlation), not that vulgarity makes someone smarter or inherently truthful.',
    forensicClues: [
      'Clickbait headline turns correlation into dramatic causation',
      'Flattering conclusion engineered to be shared compulsively'
    ]
  },
  {
    id: 'quiz-4',
    headline: '"Archeologists in Egypt Uncover 4,500-Year-Old Tomb Containing Intact Jars of Honey That Are Still Edible"',
    context: 'Archaeological report published by Smithsonian Magazine and National Geographic on tomb excavations.',
    sourcePreview: 'Smithsonian Magazine archaeology dispatch with museum curator quotes',
    correctVerdict: 'Real / Authentic',
    redFlagsList: [
      'Sound too bizarre to be true, yet backed by biochemical science',
      'Attributed to recognized institutions (UC Davis, Smithsonian) with named biological curators',
      'Clear scientific mechanism explained: high acidity, low moisture, and natural hydrogen peroxide inhibit bacterial spoilage'
    ],
    explanation: 'Authentic! Honey has virtually zero moisture and high acidity, creating an inhospitable environment for bacteria and microorganisms. Intact honey found in ancient Egyptian tombs remains chemically preserved.',
    forensicClues: [
      'Documented peer-reviewed chemistry backing up surprising claim',
      'Named curators and verified historical excavation journals'
    ]
  },
  {
    id: 'quiz-5',
    headline: '"Local Man Destroys Neighborhood Microclimate by Turning Thermostat Down to 68 Degrees"',
    context: 'Online community news blog reporting on a suburban homeowner whose air conditioner allegedly caused snow to fall on neighbor lawns.',
    sourcePreview: 'Satirical publication headline with quote from bewildered neighborhood association president',
    correctVerdict: 'Satire / Parody',
    redFlagsList: [
      'Hyperbolic absurdity (home AC unit altering regional meteorological climate)',
      'Presents domestic mundane squabbles with exaggerated apocalyptic seriousness',
      'Typical satirical hallmark: humor based on relatable suburban tropes'
    ],
    explanation: 'Parody. An HVAC unit cannot alter outdoor microclimates or generate localized blizzard conditions. Published for entertainment purposes.',
    forensicClues: [
      'Comic escalation of a trivial household disagreement',
      'No physical plausibility under basic thermodynamics'
    ]
  }
];
