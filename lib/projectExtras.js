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
    problem: "Quantum teleportation is hard to picture from equations alone. Students read about Bell pairs and classical bits but rarely see how one qubit's state moves from Alice to Bob, or how noise breaks it.",
    approach: "A self-contained browser simulator in HTML, Tailwind CSS and vanilla JavaScript, with no dependencies. You pick the state Alice sends from six options (|0⟩, |1⟩, |+⟩, |-⟩, |i+⟩ and |i-⟩), then step through the protocol: prepare the state, create the entangled Bell pair, measure Alice's qubits, send two classical bits, and let Bob apply corrections. An animated SVG circuit follows each step, with live probabilities for both qubits. Five noise models change the outcome: ideal, depolarising, amplitude damping, phase damping, and a realistic mix of Bell, entanglement, gate and channel errors.",
    results: "Shows teleportation fidelity in real time against the 66.7% classical limit, along with the Bell outcome, the classical bits sent and the error sources. The expected fidelity ranges from about 99% with no noise to 75–88% under realistic noise. It runs on GitHub Pages with no setup.",
  },
  "arduino-calc-matrix-edition": {
    problem: "A computer architecture course should show how a CPU works, not only describe it.",
    approach: "A calculator on an Arduino Uno that maps the Von Neumann parts (control unit, ALU, registers and I/O) onto the hardware. A browser UI talks to it over the Web Serial API, so no Serial Monitor is needed. It supports addition, subtraction, multiplication and division with divide-by-zero protection.",
    results: "Works on Windows, Linux and Android over USB OTG. The firmware uses about 8% of flash and 9% of RAM.",
  },
  "aspiration-cleantech-academy": {
    problem: "A training business for HVAC and cleantech careers needed an online platform where students, fresh graduates, diploma holders and ITI learners across India could find courses, register and get in touch.",
    approach: "A Next.js front end, statically exported, with a Cloudflare Worker serving the API and a D1 (SQLite) database. The Worker handles auth, course listings, registrations and contact leads, so no separate backend host is needed. Pages cover the course catalogue, registration, about and contact, built around job-oriented programmes in HVAC, cleantech, digital marketing, sales and entrepreneurship.",
    results: "Live at aspcvacademy.com, built and deployed by me during my internship. The site presents the academy's industry-grade HVAC training, delivered in partnership with HVACRedu Inc., and takes applications from across India.",
  },
  "aspiration-cleantech-ventures": {
    problem: "A solar and cleantech company needed a web platform to present its solutions and take customer enquiries, with an admin side that could safely accept content and image uploads.",
    approach: "A MERN application: React, Vite, TypeScript and Bootstrap on the front end, with Node.js, Express and MongoDB behind it. Security was a core part of the build: JWT authentication for protected routes, Helmet for secure HTTP headers, rate limiting against abuse, and input sanitisation on every form. Images upload to Cloudinary rather than the app server, which keeps the backend small and serves media from a CDN.",
    results: "A production-style full-stack app built during my full-stack internship, kept online as a public demo at aspcv.vercel.app. The same company's CRM and WordPress site are also on this portfolio.",
  },
  "phys-trust-lite": {
    articles: ["ai-powered-air-quality-projects"],
    problem: "Low-cost air quality sensors drift and fail, so a single node's readings cannot be trusted as they are.",
    approach: "One Arduino node with an MQ135 gas sensor and a DHT11 temperature and humidity sensor. A Kalman filter fuses sensor physics, room mass-balance physics and an LSTM-ensemble prior, weighting each by a live trust score. A 90% conformal band gives the uncertainty, and fault detection flags bad sensors.",
    results: "A live React dashboard with local Gemma 3 explanations. The uncertainty band is part of every reading.",
  },
  "aerosight": {
    articles: ["ai-powered-air-quality-projects"],
    problem: "Air quality forecasts are rarely connected to what they mean for public health, and turning raw pollutant data into a report people can read takes hours of manual work.",
    approach: "AeroSight fetches pollutant and weather data (temperature, humidity, wind speed from Open-Meteo), then forecasts each pollutant with two models side by side: Facebook Prophet for time-series trend and seasonality, and XGBoost gradient boosting for weather-driven swings. It correlates historical pollution with mortality records to estimate health risk. A modular, class-based design makes it easy to add stations, models or report sections.",
    results: "For every monitoring station it generates a multi-page PDF report with an executive summary, forecast charts, model performance metrics and mortality analysis. It placed 2nd at Research Day 2025 at Sri Ramachandra Faculty of Engineering and Technology.",
  },
  "hyperlocalaq": {
    articles: ["ai-powered-air-quality-projects"],
    problem: "Official air quality stations are accurate but expensive, so most cities have only a handful. Large areas between them go unmonitored, and people in those neighbourhoods have no reliable reading.",
    approach: "A four-stage data fusion pipeline. First, a hybrid inverse distance weighting (IDW) baseline blends sparse, accurate WAQI ground stations with the spatially complete CAMS satellite model as a virtual station. Second, live Open-Meteo wind, temperature and humidity adjust the estimate. Third, NASA FIRMS fire hotspots add a downwind smoke impact. Fourth, OpenStreetMap industrial zones, power plants, landfills and highways, plus live TomTom traffic congestion, refine NO2 and CO near roads.",
    results: "An interactive Folium map of Chennai showing neighbourhood-level variation in air pollution between stations. The output is an indicative estimate, not a calibrated measurement, useful to researchers, urban planners and residents.",
  },
  "sudoku-visualisation": {
    problem: "Sudoku solvers are usually taught as code on a page. It is hard to see why a smarter search beats brute-force backtracking without watching both work.",
    approach: "A native C++ desktop app built with SFML. It generates puzzles at Easy, Medium and Hard difficulty, lets you enter numbers by hand with conflict warnings, and animates the solver state as it runs. Two algorithms run on the same puzzle: plain backtracking, and backtracking guided by the MRV (minimum remaining values) heuristic, which always fills the cell with the fewest legal options first. A timing loop measures both. CMake FetchContent downloads SFML at build time, and font loading falls back across Windows and Linux paths so the app starts on either.",
    results: "A cross-platform visualiser that shows, step by step and with timings, how the MRV heuristic prunes the search compared with plain backtracking. It builds the same way on Linux and Windows.",
  },
  "urban-farming-simulator": {
    problem: "Running a rooftop farm in a city means balancing crop biology, weather, water and money at once. It makes a good test of object-oriented design.",
    approach: "A text-based Java simulation built by a team of four. Crop classes encapsulate growth time and water needs for species such as lettuce and strawberries, and polymorphism lets each crop respond to conditions in its own way. A weather system simulates seasonal and daily changes, a market system makes prices and demand fluctuate, and a resource system tracks water reservoirs and cash, ending the game on bankruptcy. The design follows SOLID principles so new crops or farming techniques can be added without changing existing classes.",
    results: "A playable management sim where each day forces a trade-off between spending, watering and selling, built as a team exercise in encapsulation, polymorphism and SOLID design.",
  },
  "instaanalyzer": {
    problem: "Instagram shows who follows you and who you follow, but not who doesn't follow you back.",
    approach: "A Python script built on the Instaloader library. It signs in to your account, fetches your followers and the accounts you follow, and compares the two lists to find mutual followers and accounts that don't follow back. The Rich library prints the results as clear, organised tables in the terminal.",
    results: "Two lists in seconds: mutual followers and non-followbacks. Install with pip install instaloader rich, then run one script.",
  },
  "crorepati-quiz-game": {
    problem: "A team project to practise Java fundamentals with something more fun than a console calculator.",
    approach: "A command-line quiz in Java, inspired by Who Wants to Be a Millionaire (Kaun Banega Crorepati in India), built with a team of three. Players answer multiple-choice questions against a timer, can use a 50-50 lifeline once to remove two wrong answers, and get immediate feedback and a running score.",
    results: "A complete CLI game with timed questions, a 50-50 lifeline and scoring that runs anywhere Java is installed.",
  },
  "advanced-cli-web-scrapper": {
    problem: "Simple scrapers that download raw HTML miss content built by JavaScript, so saved pages come out blank or broken.",
    approach: "A Python command-line tool that renders each page in headless Chromium through Playwright, then parses it with BeautifulSoup to find every linked asset: CSS, JavaScript, images, audio and video. You set the crawl depth, include or exclude URLs by keyword, and lock the crawl to the starting domain. Assets download in parallel through a thread pool.",
    results: "Complete offline copies of JavaScript-heavy pages and site sections. Each run writes a final_report.json with session statistics and any failed URLs.",
  },
}
