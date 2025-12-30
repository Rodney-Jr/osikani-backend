
# 🇬🇭 Osikani: Digital Financial Mentor

## Project Vision
Osikani is an "Inclusion Infrastructure" project designed to bridge the **68% financial illiteracy gap** in Ghana. By targeting the informal sector and youth, Osikani provides expert financial advice through a frictionless, voice-first interface on WhatsApp.

## 🚀 Key Features

### 1. MoMo "Safe Mode" (Fraud Shield)
A dedicated security layer that protects users from Mobile Money (MoMo) scams.
- **How it works:** Users forward suspicious SMS messages or describe suspicious calls to Osikani.
- **Detection Engine:** Analyzes patterns like fake Sender IDs (e.g., 'M-Money'), "wrong reversal" social engineering, and "Sika Gari" double-your-money schemes.
- **Visual Verdicts:** Provides instant `[SCAM ALERT 🔴]` or `[PROBABLY SAFE 🟢]` verdicts with a confidence trust score.

### 2. Hybrid Inference Architecture (3-Tier)
To ensure cost-efficiency and localized accuracy, Osikani uses a waterfall inference model:
- **Tier 1 (Semantic Cache):** Instantly answers frequently asked questions using Redis-based vector caching.
- **Tier 2 (RAG - Knowledge Core):** Grounded in four proprietary Ghanaian financial books.
- **Tier 3 (Gemini 3 Flash):** Advanced reasoning for complex queries and multi-dialect translation.

### 3. Security Shield (DLP & Guard)
- **PII Redaction:** Automatically masks phone numbers and account details.
- **Prompt Protection:** Scans for injection attacks.

## 🛠️ Technical Stack
- **Frontend:** React 19, Tailwind CSS, Lucide Icons.
- **AI Core:** Google Gemini 3 Flash & Gemini 2.5 Flash Native Audio.
- **Messaging:** Official WhatsApp Business Cloud API (Meta Graph v21.0).
- **Security:** Custom DLP & Prompt Guard Middleware.
- **DevOps:** Docker, GitHub Actions, Nginx.

## 🏗️ DevOps & CI/CD
Osikani uses a modern CI/CD pipeline for high-availability and security:
- **Continuous Integration**: Every push to `main` triggers a GitHub Action that scans for vulnerabilities and validates code quality.
- **Dockerization**: The app is containerized using a multi-stage `Dockerfile` and optimized via a custom `nginx.conf`.
- **Automated Deployment**: Images are automatically built and pushed to the **GitHub Container Registry (GHCR)**.
- **Health Checks**: The production container includes Nginx-level health monitoring to ensure the "Mentor" is always online.

### To Run Locally with Docker:
```bash
docker build -t osikani-app .
docker run -p 8080:80 osikani-app
```

## 📊 Impact Metrics
- **PII Redacted:** Tracks prevented data leaks.
- **Inclusion Velocity:** Measures the rate of literacy gap closure.
- **Inference Latency:** Monitors system performance.
