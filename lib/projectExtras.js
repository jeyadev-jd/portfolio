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
  "aspcv-crm": {
    problem: "Aspiration Cleantech Ventures ran its leads, deals, installations, HR and invoicing across separate tools.",
    approach: "One full-stack CRM covering the customer lifecycle from lead to deal, project, installation and support, plus HR, payroll, attendance, inventory, material requests and invoicing. React and Vite on the front end, Node.js, Express, Prisma and PostgreSQL on the back end, with JWT auth and dynamic role-based access control.",
    results: "Built during my internship and deployed on a VPS. The system is in daily use, and I'm continuing to develop it.",
  },
  "polybot": {
    problem: "Prediction markets like Polymarket price events in ways that can drift from their true odds, and reacting by hand is slow.",
    approach: "An autonomous trading engine: REST and WebSocket ingestion of live order book and price data, strategy scoring for mispricing, momentum and news reactions, a risk management core, and on-chain order execution through Web3 on Polygon. A FastAPI service and a control-panel dashboard show positions, markets and the trade log, with strategy toggles and a kill switch. Redis and Postgres run through Docker Compose.",
    results: "A working engine with live ingestion, strategy scoring, risk controls and a monitoring dashboard. I have not published profitability figures, and I won't.",
  },
  "absorbai": {
    problem: "Patients on several medicines can have drug interactions that change how each one is absorbed, metabolised or cleared.",
    approach: "A clinical decision-support platform with a 10-layer pharmacokinetic and pharmacodynamic engine. It personalises parameters to age, weight, renal and hepatic function, and CYP enzyme activity, then simulates drug concentration with a two-compartment model and Monte Carlo uncertainty. Bayesian updates and a pharmacological knowledge graph (NetworkX) sit alongside a Gemma LLM integration, built on Django.",
    results: "Covers about 45 drugs, with separate doctor and patient roles. It is decision support for healthcare professionals, not medical advice, and I have not validated it clinically.",
  },
  "market-oracle": {
    problem: "Commodity prices are noisy and shift between regimes, so one forecasting model is fragile.",
    approach: "Built for the Mitsui Commodity Prediction Challenge. Nine models feed a Bayesian meta-ensemble: Chronos (a foundation time-series model), NeuralProphet, a retrieval-augmented diffusion model, neural CDEs, mixture-of-experts, temporal graph attention, Granger causality and regime detection. A random forest baseline with technical indicators (SMA, EMA, RSI, MACD, Bollinger Bands) is included for comparison.",
    results: "The pipeline outputs predictions with confidence intervals. Competition scores are not summarised in the repository, so I don't quote one here.",
  },
  "ecosynth": {
    problem: "Planning how to synthesise a molecule is slow, and language models can invent reactions that cannot work.",
    approach: "A retrosynthesis planner that combines AiZynthFinder route search, symbolic chemistry rules, and RAG over reaction literature in a Chroma store. A green-chemistry scorer ranks routes by solvents and reagents, and a validity firewall checks each proposed reaction against known failure modes before showing it. FastAPI serves the planner and a React UI shows the reasoning trace.",
    results: "Routes are proposed, validated and ranked with a visible reasoning trace. The repository reports no benchmark numbers.",
  },
  "sret-noticeboard": {
    problem: "College announcements were scattered across channels, with no calendar and no clear admin control.",
    approach: "A Node.js and Express app on MongoDB with JWT login for student, faculty and admin roles. Admins are created by a seed script, not by self-signup. Notices carry a department, priority and optional event date, and a FullCalendar view shows dated events. An admin panel handles users, with image upload for notices.",
    results: "Working login, notices, calendar and admin management for college use.",
  },
  "cardio-disease-detection-engine": {
    problem: "Clinicians and students need a quick, explainable estimate of cardiovascular disease risk from routine patient data.",
    approach: "A training pipeline with feature engineering (BMI, pulse pressure and a lifestyle risk index) and a model zoo covering logistic regression, random forest, gradient boosting, XGBoost, LightGBM, CatBoost and voting and stacking ensembles. A Streamlit dashboard and a Flask API both serve predictions.",
    results: "Tuned stacking ensemble: accuracy 0.887 and ROC-AUC 0.962 on the held-out test set. Tuned XGBoost reached 0.885 accuracy and 0.960 ROC-AUC.",
  },
  "cardiovascular-risk-prediction": {
    problem: "Cardiovascular disease is common, and early risk flags depend on combining blood pressure, labs and lifestyle.",
    approach: "A pipeline on a patient dataset: cleaning, then feature engineering for BMI, mean arterial pressure, pulse pressure, a hypertension flag and a heuristic risk score. Logistic regression, random forest, gradient boosting, XGBoost, LightGBM and CatBoost are compared on accuracy, precision, recall, F1 and ROC-AUC.",
    results: "Each model is evaluated on the same metrics. This is the exploratory notebook for the larger Cardio Disease Detection Engine project.",
  },
  "ai-drug-food-interactions": {
    problem: "Patients rarely learn which foods interact with their medicines, and the information is scattered across sources.",
    approach: "An NLP and machine learning web app. TF-IDF features with bigrams feed ensemble models that classify each interaction into six categories, from contraindicated to safe. A knowledge graph stores drug, interaction type and food triplets, with semantic search and CSV export, built on Streamlit.",
    results: "Gradient boosting reached accuracy 0.992 and F1 0.992. Random forest reached 0.986.",
  },
  "intel-scene-classification": {
    problem: "Scene recognition from photos is a standard deep learning task, and it's useful to compare training from scratch with transfer learning.",
    approach: "On the Intel Image Classification dataset with six scene classes. I compared a baseline CNN trained from scratch, a fine-tuned VGG16 with its last block unfrozen, and an ensemble of bagged dense heads on VGG16 features. Grad-CAM heatmaps and a misclassification analysis explain the mistakes.",
    results: "The ensemble reached about 0.93 test accuracy. The model comparison chart is in the repository.",
  },
  "glove-from-scratch": {
    problem: "Word embeddings are usually taken off the shelf. Building GloVe from first principles shows what the model actually optimises.",
    approach: "GloVe implemented by hand on WikiText-2: the co-occurrence matrix, the weighted least-squares objective, explicit gradients and AdaGrad. PyTorch is used only as a tensor and CUDA library, with no autograd and no pretrained vectors during training.",
    results: "Final training loss 0.0115 over 30 epochs in 26 seconds. The co-occurrence matrix is 99.72% sparse and 120 times smaller in memory. The GPU ran 4.93 times faster than CPU. On 16 word analogies, the custom model scored 18.75%, against 81.25% for the official glove.6B.100d vectors. I report that gap as measured.",
  },
  "anpr-yolov4": {
    problem: "Automatic number plate recognition needs a detector that can find both vehicles and their plates in street images.",
    approach: "A custom one-class YOLOv4 detector trained with Darknet on labelled images of cars and bikes. Notebooks build the train and test splits and run training and inference. The trained weights and dataset archive are kept outside the repository.",
    results: "The repository contains the training setup and configuration. It does not report detection metrics.",
  },
  "t20-fantasy-impact-model": {
    problem: "Fantasy cricket teams are built on guesswork. A model can estimate each player's likely contribution and fit a team within the budget.",
    approach: "LightGBM models trained on ball-by-ball T20 data predict batting runs and bowling impact. A second engine scores a match squad, adjusts for reliability and selection, and optimises an 11-player team under a 100-credit budget and role minimums. It also picks the captain and vice-captain.",
    results: "A complete pipeline from training to team selection. The repository does not report backtested returns.",
  },
  "advanced-cli-web-scrapper": {
    problem: "Archiving a modern JavaScript-heavy site or building an offline copy needs more than a plain HTTP fetch.",
    approach: "A command-line tool using Playwright to render pages, and BeautifulSoup to parse them. It downloads CSS, JavaScript, images, audio and video, with configurable crawl depth, include and exclude keyword filters, domain locking, and a concurrent thread pool. Each session writes a JSON report.",
    results: "A working CLI for archiving and offline copies. The repository reports no benchmark numbers.",
  },
  "instaanalyzer": {
    problem: "It's hard to see who follows you back on Instagram without manually comparing lists.",
    approach: "A Python script built on Instaloader that finds mutual followers and accounts you follow that don't follow you back. The Rich library formats the results in the terminal.",
    results: "A command-line report of mutual and non-following accounts.",
  },
  "sudoku-visualisation": {
    problem: "Sudoku solvers are often shown as a finished grid, so the search process stays hidden.",
    approach: "A C++ and SFML visualiser that generates puzzles at easy, medium and hard levels, flags conflicts as you type, and animates two solvers side by side: backtracking and the minimum remaining values (MRV) heuristic. CMake fetches SFML automatically at build time.",
    results: "Shows both algorithms solving the same puzzle, with timing for each.",
  },
  "urban-farming-simulator": {
    problem: "Urban agriculture balances crop biology, weather, markets and money, which is a good test of object-oriented design.",
    approach: "A text-based Java simulation built on encapsulation and polymorphism, following SOLID principles. Crop classes such as lettuce and strawberries hold their own growth and water needs. The player balances daily resources against seasonal weather and market prices.",
    results: "A playable simulation, built by a three-person team.",
  },
  "crorepati-quiz-game": {
    problem: "A quiz game in the terminal needs timed answers, scoring and a lifeline mechanic.",
    approach: "A Java command-line game inspired by Kaun Banega Crorepati. Questions and options are stored as structured data. The game scores answers, times each one, and offers a 50-50 lifeline that removes two wrong options once.",
    results: "A playable quiz with scoring, timing and the 50-50 lifeline. Built by a three-person team.",
  },
  "stylegan-exploration": {
    problem: "StyleGAN is hard to learn from its papers alone, so a small, readable implementation helps show how the parts fit.",
    approach: "A compact StyleGAN in TensorFlow and Keras, trained on 20,000 CIFAR-10 images for 10 epochs. It has an 8-layer mapping network, AdaIN style modulation and a discriminator with softplus loss. After training, it runs style-mixing and latent-interpolation experiments.",
    results: "An educational implementation. It does not reproduce StyleGAN2 or StyleGAN3, and the repository says so.",
  },
  "design-and-analysis-of-algorithms-study-guide": {
    problem: "Students need a clear, worked reference for the core algorithms in a standard textbook course.",
    approach: "A PDF study guide with step-by-step explanations, formulas and examples for 16 algorithms, from searching and sorting to N-Queens, knapsack, Kruskal, Dijkstra, Graham scan, Miller-Rabin and LCS. The matching C programs are sorted into basic, moderate and high difficulty folders.",
    results: "A free study resource with C implementations. Contributions are open.",
  },
  "aspcv-wordpress-site": {
    problem: "The corporate site needed a custom brand, navigation and page layouts that a stock WordPress theme could not give without heavy page-builder code.",
    approach: "The custom code only: an Astra child theme with page templates for the home page, about, services, ESCO model, technologies and contact, plus must-use plugins for the navigation system and draft redirects. No build step is needed. Caching runs through LiteSpeed.",
    results: "The live site at aspcv.com runs on this code.",
  },
  "voteiq": {
    problem: "First-time voters in India often find election information dense and hard to act on.",
    approach: "A Flask app with vanilla JavaScript and Google Gemini (gemini-2.0-flash). It walks voters through the election process step by step, debunks common myths with AI, answers questions with a guarded assistant that avoids bias and predictions, and gives a readiness score. Google OAuth handles sign-in, and the app is deployed on Vercel.",
    results: "Built in 8 hours at Google's Prompt Wars challenge. Live demo on Vercel.",
  },
  "quantum-teleportation-simulation": {
    problem: "Quantum teleportation is hard to picture from equations, so a visual tool makes the steps clear.",
    approach: "A self-contained browser simulator in HTML, Tailwind CSS and vanilla JavaScript with no dependencies. It has step-by-step and auto-run modes, an animated SVG circuit with Alice and Bob, and three noise models: ideal, depolarising and realistic. It shows fidelity in real time.",
    results: "Runs on GitHub Pages with no setup.",
  },
  "arduino-calc-matrix-edition": {
    problem: "A computer architecture course should show how a CPU works, not only describe it.",
    approach: "A calculator on an Arduino Uno that maps the Von Neumann parts (control unit, ALU, registers and I/O) onto the hardware. A browser UI talks to it over the Web Serial API, so no Serial Monitor is needed. It supports addition, subtraction, multiplication and division with divide-by-zero protection.",
    results: "Works on Windows, Linux and Android over USB OTG. The firmware uses about 8% of flash and 9% of RAM.",
  },
  "aspiration-cleantech-academy": {
    problem: "A training business for HVAC and cleantech careers needed an online platform for courses, registrations and leads.",
    approach: "A Next.js front end statically exported, with a Cloudflare Worker serving the API and a D1 (SQLite) database. The Worker handles auth, course listings, registrations and contact leads, so no separate backend host is needed. The platform covers HVAC, entrepreneurship, digital marketing and sales programmes.",
    results: "Live at aspcvacademy.com, built and deployed by me during my internship.",
  },
  "aspiration-cleantech-ventures": {
    problem: "A solar and cleantech company needed a web platform for its solutions and enquiries.",
    approach: "A MERN application: React, Vite, TypeScript and Bootstrap on the front end, with Node.js, Express and MongoDB behind it. It uses JWT authentication, Helmet, rate limiting, Cloudinary image uploads and input sanitisation.",
    results: "Built during my internship and kept as a public demo.",
  },
  "phys-trust-lite": {
    articles: ["ai-powered-air-quality-projects"],
    problem: "Low-cost air quality sensors drift and fail, so a single node's readings cannot be trusted as they are.",
    approach: "One Arduino node with an MQ135 gas sensor and a DHT11 temperature and humidity sensor. A Kalman filter fuses sensor physics, room mass-balance physics and an LSTM-ensemble prior, weighting each by a live trust score. A 90% conformal band gives the uncertainty, and fault detection flags bad sensors.",
    results: "A live React dashboard with local Gemma 3 explanations. The uncertainty band is part of every reading.",
  },
  "aerosight": {
    articles: ["ai-powered-air-quality-projects"],
    problem: "Air quality forecasts are rarely connected to what they mean for public health.",
    approach: "A Prophet and XGBoost dual-model forecaster for AQI, correlated with mortality data, using Open-Meteo weather. It generates multi-page PDF reports for monitoring stations.",
    results: "Placed 2nd at Research Day 2025 at Sri Ramachandra Faculty of Engineering and Technology.",
  },
  "hyperlocalaq": {
    articles: ["ai-powered-air-quality-projects"],
    problem: "Monitoring stations are sparse, so city-wide air quality is poorly known between them.",
    approach: "Seven data sources (WAQI, NASA FIRMS, Open-Meteo, TomTom, OpenStreetMap, CAMS and OpenFDA) combined with hybrid inverse distance weighting, then fire-impact and traffic adjustments, drawn on an interactive Folium map.",
    results: "A Chennai map that fills gaps between stations.",
  },
}
