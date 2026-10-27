// Search-result titles and descriptions, keyed by path. Google shows about 60
// title characters and 155 description characters, so these are written to fit.
// Titles are full strings (the "| Jeyadev R" template is not added).
export const seo = {
  '/about': {
    title: 'About Jeyadev R: AI Engineer & Developer in Chennai',
    description: 'Jeyadev R is an AI engineer and full-stack developer in Chennai building RAG systems, NLP models, computer vision and Next.js apps. Skills, story and work.',
  },
  '/hire': {
    title: 'Hire Jeyadev R: AI Engineer & Full-Stack Developer',
    description: 'Hire Jeyadev R, an AI engineer and full-stack developer in Chennai, for internships and roles. ML, RAG, computer vision, Next.js and MERN, with source code.',
  },
  '/projects': {
    title: 'AI, Machine Learning & Full-Stack Projects | Jeyadev R',
    description: '34 projects by Jeyadev R, AI engineer in Chennai: machine learning, computer vision, NLP, RAG, trading bots and full-stack apps, all with source code.',
  },
  '/linkedin': {
    title: 'LinkedIn Posts & Hackathons | Jeyadev R',
  },
  '/blog': {
    title: 'Blog: AI Articles, LinkedIn Posts & Videos | Jeyadev R',
    description: 'Articles on RAG, NLP and machine learning, LinkedIn updates on launches and hackathons, and YouTube project demos by AI engineer Jeyadev R in Chennai.',
  },
  '/writing': {
    title: 'Writing: AI, RAG, NLP & ML Articles | Jeyadev R',
    description: 'Technical write-ups by AI engineer Jeyadev R: offline RAG, scam SMS detection, air quality forecasting and more, with real numbers from the source code.',
  },

  '/writing/offline-rag-on-budget-pcs': {
    title: 'Offline RAG on 4 Budget PCs: FAISS, llama.cpp, Qwen2.5',
    description: 'How I built offline RAG on four Intel i3 PCs: upload PDFs and get cited answers with FAISS, MiniLM and llama.cpp running Qwen2.5. No cloud, no GPU.',
  },
  '/writing/scam-sms-detection-india': {
    title: 'Why UK Spam Filters Fail on Indian Scam SMS',
    description: 'UK-trained spam models lose 33–52% accuracy on Indian scam SMS. How ScamShield recovers it with de-obfuscation and Indian training data.',
  },
  '/writing/chennai-air-quality-dashboard': {
    title: 'AI Air Quality Dashboard for Chennai with Forecasts',
    description: 'How Pollumap V3 combines live pollution, weather and satellite fire data with XGBoost 24-hour forecasts and A* healthy routing for Chennai.',
  },
  '/writing/local-llm-discord-content-pipeline': { title: 'Local LLM Content Pipeline for a Discord Community' },
  '/writing/attendance-analytics-erp': { title: 'Attendance ERP: "How Many Classes Can I Miss?"' },
  '/writing/ai-powered-air-quality-projects': {
    title: 'AI Air Quality Projects: Forecasting, Sensors & Maps',
    description: 'Four AI air quality projects: Prophet and XGBoost forecasting with health reports, a Chennai dashboard, hyperlocal multi-source mapping and sensor fusion.',
  },

  '/projects/scamshield': {
    title: 'ScamShield: Scam SMS Detector for India',
    description: 'Explainable scam SMS detector for Indian KYC, UPI, courier and digital-arrest scams. Undoes obfuscation, highlights key words and checks links. 98.4% accuracy.',
  },
  '/projects/phys-trust-lite': { title: 'PHYS-TRUST Lite: Physics-Informed Air Quality Sensing' },
  '/projects/attendance-erp': { title: 'Attendance ERP: College Attendance System' },
  '/projects/frontier': { title: 'FRONTIER: Local AI Content Agent for Discord' },
  '/projects/aspcv-crm': { title: 'ASPCV CRM: Full-Stack CRM for a Cleantech Company' },
  '/projects/sret-rag': { title: 'sret-rag: Self-Hosted RAG on a 4-PC LAN' },
  '/projects/polybot': { title: 'PolyBot: Prediction-Market Trading Engine' },
  '/projects/absorbai': {
    title: 'AbsorbAI: Clinical Pharmacokinetics Decision Support',
    description: 'Clinical decision-support platform simulating drug behaviour for ~45 drugs: 10-layer PK/PD engine, Monte Carlo uncertainty, Bayesian updates and a Gemma LLM.',
  },
  '/projects/pollumap-v3': { title: 'Pollumap V3: Real-Time Air Quality Dashboard' },
  '/projects/market-oracle': { title: 'Market Oracle: Commodity Price Forecasting' },
  '/projects/ecosynth': { title: 'EcoSynth: Green Retrosynthesis Planner with AI' },
  '/projects/hyperlocalaq': { title: 'HyperlocalAQ: Air Quality Modeling for Chennai' },
  '/projects/aspiration-cleantech-ventures': {
    title: 'Aspiration Cleantech Ventures: MERN Solar Web App',
    description: 'Production MERN web app for a solar energy company, built in an internship: React, Node.js, MongoDB, JWT auth, Helmet and Cloudinary uploads.',
  },
  '/projects/sret-noticeboard': { title: 'sret-noticeboard: College Notice Board & Calendar' },
  '/projects/cardio-disease-detection-engine': {
    title: 'Heart Disease Prediction Engine: ML Dashboard + API',
    description: 'Heart disease prediction with machine learning: a Streamlit dashboard and Flask API on XGBoost, LightGBM and CatBoost that flags high cardiovascular risk.',
  },
  '/projects/aerosight': { title: 'AeroSight: Air Quality Forecasting & Health Reports' },
  '/projects/ai-drug-food-interactions': { title: 'AI Drug-Food Interaction Classifier (NLP)' },
  '/projects/intel-scene-classification': { title: 'Intel Scene Classification: CNN vs VGG16 vs Ensemble' },
  '/projects/glove-from-scratch': { title: 'GloVe from Scratch: Word Embeddings in PyTorch' },
  '/projects/anpr-yolov4': {
    title: 'ANPR with YOLOv4: Number Plate Recognition',
    description: 'Automatic number plate recognition with a custom-trained YOLOv4 detector for cars, bikes and autos: labelled dataset, Darknet training and OpenCV inference.',
  },
  '/projects/cardiovascular-risk-prediction': {
    title: 'Cardiovascular Risk Prediction with Machine Learning',
    description: 'Machine learning pipeline predicting cardiovascular disease risk from patient data, with BMI and blood pressure features, tree models and ROC-AUC tests.',
  },
  '/projects/t20-fantasy-impact-model': { title: 'T20 Fantasy Cricket Team Optimizer (LightGBM)' },
  '/projects/aspiration-cleantech-academy': {
    title: 'Aspiration Cleantech Academy: Training Platform',
    description: 'Job-oriented training platform for HVAC, entrepreneurship, digital marketing and sales courses, built with Next.js, Express and MongoDB.',
  },
  '/projects/voteiq': {
    title: 'VoteIQ: AI Civic Education App for Indian Voters',
    description: 'AI assistant helping first-time Indian voters understand elections, built in 8 hours at Google Prompt Wars with Gemini: voter journey, myth-busting and a quiz.',
  },
  '/projects/advanced-cli-web-scrapper': {
    title: 'CLI Web Scraper: Full-Site Archiver with Playwright',
    description: 'Python CLI that downloads full web pages with CSS, JS, images and video for offline archiving. Handles JS-heavy pages, crawl depth and URL filters.',
  },
  '/projects/instaanalyzer': { title: 'InstaAnalyzer: Instagram Follower Analysis Script' },
  '/projects/quantum-teleportation-simulation': { title: 'Quantum Teleportation Simulator in the Browser' },
  '/projects/sudoku-visualisation': { title: 'Sudoku Solver Visualiser: Backtracking vs MRV' },
  '/projects/arduino-calc-matrix-edition': { title: 'Arduino Calculator: Von Neumann CPU on Hardware' },
  '/projects/urban-farming-simulator': { title: 'Urban Farming Simulator: Java OOP Project' },
  '/projects/crorepati-quiz-game': {
    title: 'Crorepati Quiz Game: Java CLI Game Inspired by KBC',
    description: "Command-line quiz game in Java inspired by 'Kaun Banega Crorepati', with timed multiple-choice questions, a 50-50 lifeline and scoring. A team project.",
  },
  '/projects/stylegan-exploration': {
    title: 'StyleGAN in TensorFlow/Keras on CIFAR-10',
    description: 'Compact StyleGAN in TensorFlow/Keras generating CIFAR-10 images: 8-layer mapping network, AdaIN style modulation, style mixing and latent interpolation tests.',
  },
  '/projects/design-and-analysis-of-algorithms-study-guide': { title: 'DAA Study Guide: 16 Classic Algorithms in C' },
  '/projects/aspcv-wordpress-site': { title: 'ASPCV WordPress Site: Astra Child Theme & Plugins' },
}

// Merge into a page's metadata: the override title replaces the templated one.
export function withSeo(path, meta) {
  const o = seo[path]
  if (!o) return meta
  const og = { ...meta.openGraph }
  if (o.title) og.title = o.title
  if (o.description) og.description = o.description
  return {
    ...meta,
    ...(o.title && { title: { absolute: o.title } }),
    ...(o.description && { description: o.description }),
    openGraph: og,
  }
}
