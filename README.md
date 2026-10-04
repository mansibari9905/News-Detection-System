# Fake News Detection System
**Information Retrieval & Machine Learning Project**

A full-stack NLP and Information Retrieval system that classifies news articles as **REAL NEWS** or **FAKE NEWS**, explains feature weights via linear model coefficients, ranks top-5 similar articles using TF-IDF cosine similarity, and evaluates machine learning model performance across benchmarks.

---

## Architecture & Features

1. **Classification Verdict & Confidence Score**:
   - Classifies articles into **REAL NEWS** or **FAKE NEWS**.
   - Outputs probabilistic confidence scores based on Linear SVM decision boundaries.

2. **Influential Words (Model Explanation)**:
   - Identifies words that most heavily influenced the classification decision based on linear model coefficients (e.g., formal journalistic attribution tokens labeled `REAL`, sensational or speculative words labeled `FAKE`).

3. **Top 5 Similar Articles (Information Retrieval)**:
   - Computes TF-IDF vector representations and ranks the top 5 most similar articles in the reference collection using Cosine Similarity.
   - Displays article title, dataset label (`REAL` or `FAKE`), and similarity score.

4. **Model Performance Comparison**:
   - Benchmarks three standard text classification models evaluated on an 80/20 stratified split of 39,105 deduplicated articles (Fake: 17,908, Real: 21,197):
     - **Logistic Regression**: Accuracy: 98.63%, Precision: 0.9791, Recall: 0.9960, F1-Score: 0.9875
     - **Multinomial Naive Bayes**: Accuracy: 96.05%, Precision: 0.9667, Recall: 0.9601, F1-Score: 0.9634
     - **Linear SVM (Selected)**: Accuracy: 99.16%, Precision: 0.9876, Recall: 0.9969, F1-Score: 0.9923

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React
- **Backend**: Node.js, Express, tsx
- **NLP & IR**: TF-IDF Vectorizer, Cosine Similarity Engine, Linear Coefficient Explainer
- **Build Tool**: Vite 8

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/fake-news-detection-system.git
cd fake-news-detection-system
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## Publishing to GitHub

```bash
git add .
git commit -m "Update: Fake News Detection System matching IR & ML specification"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
git branch -M main
git push -u origin main
```

---

## License
MIT / Apache-2.0
