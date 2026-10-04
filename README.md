# Veritas · News Verification & Fact-Checking Platform

Veritas is a full-stack, open-source news verification and investigative journalism engine. It evaluates news articles, viral social headlines, and suspicious statements against primary source records, peer-reviewed science, and major journalistic wire archives.

---

## Key Features

- **Multi-Input Verification**:
  - **Text & Claims**: Verify raw text, breaking news snippets, transcribed speech, or viral messaging chains.
  - **Article URL Scraper**: Directly fetches and extracts clean text and bylines from any online news article.
  - **Benchmark Case Studies**: Includes pre-compiled verification dossiers (health hoaxes, deepfake audio leaks, celebrity financial scams, peer-reviewed science breakthroughs, and satire).
- **Comprehensive Forensic Analysis**:
  - **Truth Score (0–100%)**: Clear verdict ratings (*Verified True*, *Mostly True*, *Mixture / Misleading*, *Mostly False*, *Fabricated Hoax*, or *Satire / Parody*).
  - **Claim-by-Claim Breakdown**: Isolates individual testable assertions with evidence citations, original excerpt quotes, and severity levels.
  - **Original Text Annotation**: Visual inspection marking false claims, misleading context, emotional hyperbole, and verified facts.
  - **Rhetoric & Logic Lab**: Measures sensationalism, identifies cognitive/logical fallacies (e.g. Straw Man, False Dilemma, Ad Hominem), and analyzes ideological slant.
  - **Source Provenance & Wire Consensus**: Verifies domain reputation, author attribution, journalistic green flags, and cross-references against AP, Reuters, and Snopes.
  - **Shareable Debunk Card**: One-click formatted summary ready to copy into WhatsApp, Reddit, X, or family groups to halt misinformation spread.
- **News Literacy Quiz ("Spot the Fake")**:
  - Interactive 5-scenario critical thinking challenge testing readers' ability to spot fake news, parody, and manufactured outrage.
- **Persistent History**:
  - Automatically saves past verifications in local storage for quick review and comparison.

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React, Motion
- **Backend**: Node.js, Express, tsx
- **Verification Engine**: Google Gemini API (`@google/genai`) with Google Search Grounding and multi-tier failover
- **Build Tool**: Vite 8

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/veritas-news-verification.git
cd veritas-news-verification
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your Gemini API key:
```env
GEMINI_API_KEY="your-google-gemini-api-key"
PORT=3000
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production
```bash
npm run build
npm run start
```

---

## Publishing to GitHub

To push this codebase to your own GitHub account:

```bash
# 1. Initialize git (if not already initialized)
git init
git add .
git commit -m "Initial commit: Veritas News Verification Engine"

# 2. Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# 3. Rename branch to main and push
git branch -M main
git push -u origin main
```

---

## License

Apache-2.0
