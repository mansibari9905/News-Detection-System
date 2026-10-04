import { SampleArticle } from '../types/factcheck';

export const SAMPLE_ARTICLES: SampleArticle[] = [
  {
    id: 'sample-garlic-cancer',
    title: 'Secret Miracle: Boiled Garlic & Lemon Elixir Completely Cures Stage 4 Cancer Overnight, Doctors Terrified',
    category: 'Health & Medicine',
    summary: 'A viral social media post claiming a simple household concoction cures late-stage cancer while oncologists suppress the truth.',
    source: 'Viral WhatsApp & Facebook chain',
    expectedVerdict: 'fabricated_hoax',
    fullText: `SHOCKING DISCOVERY BIG PHARMA DOESN'T WANT YOU TO KNOW!

A brave holistic doctor who was recently forced into hiding has leaked the ultimate cure for Stage 4 Cancer. By boiling crushed organic garlic cloves together with raw unfiltered lemon juice and Himalayan pink salt, a secret cellular alkalizing compound is triggered that starves every single malignant cancer cell within 48 hours.

Mainstream hospitals and pharmaceutical executives are frantically paying off government regulators to delete this formula from the internet because a $3 bottle of lemons would bankrupt the multi-trillion dollar chemotherapy industry. Over 100,000 terminal patients in secret clinical trials in Switzerland have been completely cured without a single dose of radiation.

Drink 3 glasses every morning on an empty stomach. Share this immediately before social media algorithms censor it forever!`
  },
  {
    id: 'sample-deepfake-election',
    title: 'Leaked Audio: Chief Election Commissioner Admits 450,000 Ballots Pre-Loaded in Server Warehouse',
    category: 'Geopolitics',
    summary: 'An unverified audio recording claimed to be a secret wiretap of an election supervisor discussing pre-printed digital ballots.',
    source: 'Anonymous Telegram Channel / X Bot Network',
    expectedVerdict: 'fabricated_hoax',
    fullText: `BREAKING: Whistleblowers inside the Federal Election Warehouse have just smuggled out a damning 2-minute audio recording.

In the leaked recording, a voice allegedly matching the State Election Commissioner explicitly directs technical staff to "pre-seed 450,000 provisional digital ballots into partition zero before the audit team arrives at 6 AM."

According to the anonymous whistleblower handle @TruthPatriot88, military cyber units have already seized the voting machines and arrested three regional clerks under treason statutes. Mainstream broadcast networks have declared an emergency blackout on all reporting regarding the warehouse. Constitutional lawyers warn the entire election cycle has been invalidated.`
  },
  {
    id: 'sample-musk-quantum-scam',
    title: 'BBC Special Report: Elon Musk Unveils Automated Quantum AI Trading Engine That Generates $4,200 Daily for Regular Citizens',
    category: 'Finance & Scams',
    summary: 'A counterfeit news website mimicking BBC News layout promoting an automated cryptocurrency investment scheme.',
    source: 'Spoofed BBC domain (bbc-breaking-financial-news.com)',
    expectedVerdict: 'fabricated_hoax',
    fullText: `During a live broadcast on BBC Breakfast, tech mogul Elon Musk shocked the anchors by unveiling a state-of-the-art computational system named 'Quantum Wealth Loophole'.

"I have deposited $250 of my own money into this automated high-frequency algorithm," Musk told the stunned presenter. "Within 15 minutes, the account balance jumped to $890 using quantum quantum arbitrage across global currency discrepancies."

Musk stated that in partnership with the Bank of England, 5,000 British citizens are being given exclusive access to register today before the window closes. Readers who deposit an initial minimum capital of £250 can expect passive daily returns between £1,200 and £4,500 deposited directly into their bank accounts.`
  },
  {
    id: 'sample-jwst-biosignature',
    title: 'James Webb Space Telescope Detects Carbon-Bearing Molecules in Atmosphere of Habitable-Zone Exoplanet K2-18 b',
    category: 'Verified Truth',
    summary: 'An authentic peer-reviewed astrophysical finding by NASA and the European Space Agency regarding atmospheric observations.',
    source: 'NASA Jet Propulsion Laboratory & Astrophysical Journal Letters',
    expectedVerdict: 'verified_true',
    fullText: `A new investigation with NASA's James Webb Space Telescope into K2-18 b, an exoplanet 8.6 times as massive as Earth, has revealed the presence of carbon-bearing molecules including methane and carbon dioxide.

The discovery from Webb adds to recent studies suggesting that K2-18 b could be a Hycean exoplanet, one which has the potential to possess a hydrogen-rich atmosphere and a water ocean-covered surface. The first insight into the atmospheric properties of this habitable-zone exoplanet came from observations with NASA's Hubble Space Telescope, which prompted further study.

The abundance of methane and carbon dioxide, and shortage of ammonia, support the hypothesis that there may be an ocean underneath a hydrogen-rich atmosphere in K2-18 b. These initial Webb observations also provided a possible detection of a molecule called dimethyl sulfide (DMS). On Earth, this is solely produced by living organisms, primarily phytoplankton in marine environments. However, researchers caution that additional spectroscopic data is needed to confirm the DMS signature.`
  },
  {
    id: 'sample-onion-satire',
    title: 'NASA Discovers Ancient Mars Civilization Was Also Ruined by Obnoxious Billionaires Building Giant Rockets',
    category: 'Satire',
    summary: 'A satirical article from The Onion poking fun at private space enterprises, frequently taken literally by gullible readers.',
    source: 'The Onion (Satire)',
    expectedVerdict: 'satire_parody',
    fullText: `PASADENA, CA—Analyzing high-resolution geological surveys transmitted by the Perseverance rover, planetary scientists at NASA confirmed Tuesday that an ancient, highly advanced civilization on Mars was completely wiped out after a handful of insufferable Martian billionaires spent all public resources building giant dick-shaped rockets.

"Our core drill samples clearly show that approximately 3.2 billion years ago, Mars had lush oceans and a breathable atmosphere, right up until their ultra-wealthy elite convinced themselves they were visionary disruptors who needed to build redundant lunar colony capsules," said lead astrobiologist Dr. Sarah Lin, noting sedimentary layers choked with abandoned titanium booster hulls.

NASA confirmed rover sensors also uncovered fossilized tablets indicating Martian citizens spent their final decades endlessly arguing about the rockets while their planetary aquifers evaporated.`
  },
  {
    id: 'sample-solar-outage-misleading',
    title: 'Solar Flare To Cause Global Internet Blackout for Weeks Starting Next Tuesday, NASA Confirms',
    category: 'Technology & AI',
    summary: 'Sensationalized headline misinterpreting routine solar cycle maximum research into an impending digital apocalypse.',
    source: 'Clickbait News Aggregator',
    expectedVerdict: 'mixture_misleading',
    fullText: `Scientists have warned that the Earth is on direct collision course with an unprecedented X-class solar superstorm that could wipe out the entire worldwide web for several weeks beginning next Tuesday.

NASA researchers studying Solar Cycle 25 have reportedly warned government leaders to brace for an "Internet Apocalypse." According to the report, undersea fiber optic cables will undergo massive electromagnetic induction, burning out routing servers across all continents and leaving modern banking, GPS, and communication paralyzed indefinitely.

Experts recommend withdrawing emergency cash, stockpiling non-perishable canned food, and printing out paper maps as power grids prepare for rolling catastrophic failures across both hemispheres.`
  }
];
