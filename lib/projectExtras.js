// Extra detail for flagship projects, from their READMEs and posts, plus
// cross-links to related articles and videos. Keyed by project slug.
export const extras = {
  scamshield: {
    problem:
      'Most SMS spam research trains on UK data from around 2012. Indian scams (fake KYC, UPI refunds, courier fees, digital arrest) use different words, and scammers hide them with tricks like 0TP and spaced letters.',
    approach:
      'A normaliser reverses six obfuscation families, then a calibrated linear SVM on word and character TF-IDF plus 16 engineered features classifies the message. Each verdict ships as a case file: word-level heatmap, scam type, link checks that never open the link, and advice.',
    results:
      'On a 6,061-message Indian test set the deployed SVM reaches 0.984 accuracy, 0.970 F1 and 0.993 scam recall, matching DistilBERT. UK-trained models lost 33–52% accuracy on Indian messages.',
    articles: ['scam-sms-detection-india'],
  },
  'sret-rag': {
    problem: 'A college needed an AI document assistant with no cloud dependency and no GPU budget.',
    approach:
      'Four budget PCs each take one role: FastAPI gateway and UI, MiniLM embedder, FAISS index with SQLite metadata, and a llama.cpp node running Qwen2.5 7B (Q4_K_M).',
    results:
      'Upload PDF, DOCX or text files and get cited answers fully offline on Intel i3 machines with 8 GB RAM. The gateway exposes an OpenAI-compatible chat endpoint with streaming.',
    articles: ['offline-rag-on-budget-pcs'],
  },
  'pollumap-v3': {
    problem: 'People in Chennai had no single place showing live pollution, forecasts and which route exposes them least.',
    approach:
      'A worker pulls WAQI, Open-Meteo, NASA FIRMS and OpenStreetMap data into MongoDB. XGBoost models forecast 24 hours ahead, and an A* search over the road graph finds fastest, cleanest and balanced routes.',
    results:
      'A live dashboard with pollutant charts, an interactive map, forecasts, source breakdowns, an IoT sensor grid and healthy routing, with a demo on YouTube.',
    articles: ['chennai-air-quality-dashboard', 'ai-powered-air-quality-projects'],
    videos: ['j_K9_pfKVas'],
  },
  frontier: {
    problem: 'A student Discord community lacked good daily content, and manual curation did not scale.',
    approach:
      'FRONTIER discovers hackathons, research and AI news from 10+ sources, scores relevance with a local LLM (Ollama and Gemma 3 4B), drafts posts in the community voice and waits for human approval before publishing.',
    results: 'Runs daily with no cloud API calls, a React approval dashboard and a full SQLite audit trail.',
    articles: ['local-llm-discord-content-pipeline'],
  },
  'attendance-erp': {
    problem: 'The college portal did not show attendance percentages or what taking leave would do to them.',
    approach:
      'Built around real timetables (multi-hour labs, partial exam days, period swaps) on Cloudflare Workers and D1 with Next.js, Hono and Prisma. It predicts attendance after future absences and plans recovery.',
    results: 'Safe-bunk calculator, recovery planner, mid-class bunk detection and admin analytics, taken from problem to working MVP in under a day.',
    articles: ['attendance-analytics-erp'],
  },
  'phys-trust-lite': { articles: ['ai-powered-air-quality-projects'] },
  aerosight: { articles: ['ai-powered-air-quality-projects'] },
  hyperlocalaq: { articles: ['ai-powered-air-quality-projects'] },
}
