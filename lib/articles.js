// Technical write-ups. Every figure comes from the linked project's README.
export const articles = [
  {
    slug: 'offline-rag-on-budget-pcs',
    project: 'sret-rag',
    title: 'Self-hosted offline RAG on four budget PCs',
    subtitle: 'FAISS, llama.cpp and Qwen2.5 on a college LAN with no cloud',
    description:
      'How sret-rag turns four Intel i3 PCs into a private, offline document-chat system: FastAPI gateway, MiniLM embedder, FAISS index and a llama.cpp LLM node.',
    date: '2026-10-18',
    tags: ['RAG', 'FAISS', 'llama.cpp', 'Qwen2.5', 'FastAPI', 'Offline AI'],
    sections: [
      {
        h: 'The problem',
        p: [
          'Retrieval-augmented generation (RAG) is usually shown with a cloud LLM and a hosted vector database. I wanted the opposite for college use: a private document assistant that works with zero internet dependency after setup, on hardware that was already lying around.',
          'The result is sret-rag. You upload PDF, DOCX or text files, ask questions, and get cited answers, all on the local network.',
        ],
      },
      {
        h: 'Architecture: one job per machine',
        p: [
          'The system is spread across four plain Linux PCs (Intel i3, 8 GB RAM, 200 GB HDD), each with a single responsibility:',
        ],
        list: [
          'PC1: FastAPI gateway and a ChatGPT-style web UI.',
          'PC2: a dedicated embedder running all-MiniLM-L6-v2 (384-dimensional vectors).',
          'PC3: the FAISS index (IVF50,PQ8) with SQLite for metadata.',
          'PC4: the LLM server, llama.cpp with Qwen2.5 7B quantised to Q4_K_M.',
        ],
        after:
          'No GPU is required. llama.cpp uses the Intel Iris Xe integrated GPU through SYCL. Splitting the roles keeps each 8 GB machine from running out of memory, and a 3 GB lz4 zram swap on every node stretches the RAM further.',
      },
      {
        h: 'The RAG pipeline',
        p: [
          'Documents are parsed with PyMuPDF, split into 512-token chunks at semantic boundaries, embedded with MiniLM and stored in FAISS. At query time the gateway embeds the question, retrieves the nearest chunks, builds a prompt and sends it to the llama.cpp node. The answer comes back with its sources.',
          'Two small caches avoid repeated work: a SHA-256-keyed SQLite embedding cache means duplicate chunks are never re-embedded, and hashing each file skips documents that are already indexed.',
        ],
      },
      {
        h: 'Practical details',
        p: [
          'Everything is async (FastAPI, aiosqlite, asyncio), with the C-extension calls pushed to a thread pool so the gateway stays responsive. The gateway exposes an OpenAI-compatible /v1/chat/completions endpoint with streaming, so existing clients can point at it. Auth is session-based with an admin panel for user management. Setup is done from offline wheel and package folders copied from a USB drive.',
        ],
      },
      {
        h: 'What I would tell someone building this',
        p: [
          'Start the LLM node first and give it about 45 seconds to load the model; startup order matters. Change the default admin credentials before first use, and keep the system on the LAN unless you add your own protection.',
        ],
      },
    ],
  },
  {
    slug: 'scam-sms-detection-india',
    project: 'scamshield',
    title: 'Why UK-trained spam filters fail on Indian scam SMS',
    subtitle: 'Domain shift, obfuscation and explainability in ScamShield',
    description:
      'ScamShield measures how models trained on UK spam data lose 33–52% accuracy on Indian scam SMS, and how a de-obfuscation step and Indian training data recover it.',
    date: '2026-10-18',
    tags: ['NLP', 'Text classification', 'Domain shift', 'scikit-learn', 'DistilBERT', 'Explainable AI'],
    sections: [
      {
        h: 'The gap in SMS spam research',
        p: [
          'Most SMS spam research still trains on the UCI SMS Spam Collection: English messages collected in the UK around 2012. Indian phones get a different kind of fraud: fake KYC expiry notices, UPI collect requests dressed up as refunds, courier customs fees, and "digital arrest" calls from fake police.',
          'ScamShield is a detector built for that context, and it measures three separate problems instead of assuming them away.',
        ],
      },
      {
        h: 'Problem 1: domain shift',
        p: [
          'A model that has never seen words like UPI, KYC or Aadhaar misses Indian scams. When I tested UK-trained models on Indian messages, every model trained from scratch lost 33–52% of its accuracy. Pretrained DistilBERT lost only 4%.',
        ],
      },
      {
        h: 'Problem 2: obfuscation',
        p: [
          'Scammers write 0TP, b@nk or "v e r i f y" precisely because word-based filters stop recognising the word. ScamShield runs a normaliser that reverses six obfuscation families (leet, look-alike Cyrillic and Greek letters, spaced and dotted letters, invisible characters) before classifying, and shows every rewrite to the user.',
          'The effect is measurable. Under a letter-spacing attack, scam recall for a simple RNN fell to 0.798, and the normaliser brought it back to 0.988. A words-only TF-IDF model went from 0.937 under attack back to 0.987.',
        ],
      },
      {
        h: 'Problem 3: opacity',
        p: [
          'A bare "spam" label gives no reason to trust it. ScamShield opens a case file for each message: the verdict with calibrated confidence, a word-level heatmap showing how much each word pushed the verdict, the scam type, a lexical check of any link (links are never opened), and advice on what to do and where to report it.',
          'Messages with a confidence between 0.35 and 0.65 are marked as needing human review rather than forced into a verdict.',
        ],
      },
      {
        h: 'Results on Indian messages',
        p: [
          'I compared eight models: Naive Bayes, logistic regression, a linear SVM, RNN and BiLSTM variants with and without attention, and DistilBERT. On an Indian test set of 6,061 messages, scoring legitimate versus scam, the deployed calibrated linear SVM reached 0.984 accuracy, 0.970 F1 and 0.993 scam recall. DistilBERT reached 0.982 accuracy and 0.968 F1.',
          'I deployed the linear SVM because it matches DistilBERT here, needs no GPU and answers in milliseconds.',
        ],
      },
      {
        h: 'Keeping the evaluation honest',
        p: [
          'Sources were de-duplicated against each other before splitting (5,656 duplicates removed), so no test message also appears in training. Model choice used cross-validation on training data, never the test set. Personal data such as phone numbers, Aadhaar, PAN and account numbers is masked automatically.',
        ],
      },
    ],
  },
  {
    slug: 'chennai-air-quality-dashboard',
    project: 'pollumap-v3',
    title: 'Building a Chennai air quality dashboard with 24-hour forecasts and healthy routing',
    subtitle: 'Flask, MongoDB, XGBoost and an A* route planner in Pollumap V3',
    description:
      'How Pollumap V3 combines live AQI, weather and satellite fire data with XGBoost 24-hour forecasts and an A* healthy-routing engine for Chennai.',
    date: '2026-10-18',
    tags: ['Air quality', 'XGBoost', 'Flask', 'React', 'A* algorithm', 'Chennai'],
    sections: [
      {
        h: 'What it does',
        p: [
          'Pollumap V3 is a full-stack web app that pulls real-time air quality, weather, fire and IoT sensor data into one interactive dashboard for Chennai. It shows pollutant levels (PM2.5, PM10, O3, NO2, SO2 and CO), a map with sensor locations, weather and UV charts, satellite fire detections, and a source breakdown by category such as vehicles, industry and dust.',
        ],
      },
      {
        h: 'Data pipeline',
        p: [
          'A background worker fetches from the WAQI air quality API, Open-Meteo for weather, NASA FIRMS for satellite fire data and Overpass for the OpenStreetMap road graph, and stores time-series data in MongoDB. A Flask REST API serves the React front end, which uses SWR for fetching and caching and Recharts and Leaflet for charts and maps.',
        ],
      },
      {
        h: '24-hour forecasting with XGBoost',
        p: [
          'The forecasting module uses XGBoost models to predict pollutant and weather values 24 hours ahead. These feed the forecast cards and the health advisory shown to users.',
        ],
      },
      {
        h: 'Healthy routing with A*',
        p: [
          'The Healthy Routing feature searches the OpenStreetMap road graph with an A* algorithm and computes fastest, cleanest and balanced routes for walking or cycling. The point is to minimise pollution exposure on the way, not just distance.',
        ],
      },
      {
        h: 'Related work',
        p: [
          'The same air quality theme runs through my other projects: HyperlocalAQ combines seven data sources with hybrid IDW interpolation, and PHYS-TRUST Lite estimates air quality on a single low-cost Arduino sensor node.',
        ],
      },
    ],
  },
  {
    slug: 'local-llm-discord-content-pipeline',
    project: 'frontier',
    title: 'A local-first AI content pipeline for a Discord community',
    subtitle: 'FRONTIER: Ollama, Gemma 3 and human approval, with no cloud API calls',
    description:
      'How FRONTIER discovers hackathons, research and AI news from 10+ sources, scores them with a local LLM and publishes to Discord only after human approval.',
    date: '2026-10-19',
    tags: ['Local LLM', 'Ollama', 'Discord bot', 'FastAPI', 'React', 'AI agent'],
    sections: [
      {
        h: 'The problem',
        p: [
          'The Discord server for our student tech community was missing good content, because manually discovering, filtering, writing and publishing it every day does not scale. I built FRONTIER to do that work, with one rule: nothing leaves my machine and nothing goes live without approval.',
        ],
      },
      {
        h: 'What the pipeline does',
        list: [
          'Discovers hackathons, research papers and AI news automatically from 10+ sources.',
          'Scores relevance with a local LLM (Ollama running Gemma 3 4B).',
          'Drafts posts in the community voice, following the server style guide.',
          'Lets a human approve or reject each draft in a React dashboard or with Discord buttons before anything is published.',
          'Publishes to the right Discord channel on a schedule and keeps a full audit trail in SQLite.',
        ],
        p: [],
      },
      {
        h: 'Why local-first',
        p: [
          'The LLM inference, the writing-style profile and the community configuration all stay on the machine. There are no GPT API calls, so there is no per-request cost and no community data sent to a third party. A small local model is enough here because the tasks are narrow: score a link for relevance, then rewrite it in a known style.',
        ],
      },
      {
        h: 'Human in the loop',
        p: [
          'An automated bot posting unreviewed AI text into a community is a risk, so FRONTIER only drafts. The approval step, available in the dashboard or as Discord buttons, is the part that makes it safe to run daily. The stack is Python and FastAPI on the back end with a React dashboard.',
        ],
      },
    ],
  },
  {
    slug: 'attendance-analytics-erp',
    project: 'attendance-erp',
    title: 'Building an attendance ERP that answers "how many classes can I miss?"',
    subtitle: 'Attendance ERP: analytics, bunk detection and recovery planning on Cloudflare Workers',
    description:
      'How Attendance ERP goes beyond tracking: it predicts attendance after future absences, calculates safe bunks, plans recovery and detects mid-class bunking.',
    date: '2026-10-19',
    tags: ['Next.js', 'Cloudflare Workers', 'Hono', 'Prisma', 'Analytics', 'ERP'],
    sections: [
      {
        h: 'A problem from my own classroom',
        p: [
          'Our college attendance portal does not show an attendance percentage or help students understand the effect of taking leave. After talking it through with my Class Representative, I built an attendance system around the questions students actually ask:',
        ],
        list: [
          'If I take leave tomorrow, what will my attendance become?',
          'How many more classes can I safely miss before dropping below 80%?',
          'If I am below the required percentage, how many classes do I need to attend to recover?',
          'Who is consistently bunking in between classes?',
        ],
      },
      {
        h: 'Features',
        p: [
          'The first version has multi-department and multi-section support, student and staff management, and a multi-semester design with semester archiving. On the analytics side it predicts attendance after future absences, includes a safe-bunk calculator and recovery planner, detects mid-class bunking and tracks late arrivals. Subject-wise and overall analytics feed an admin dashboard with filters and reports, an academic calendar covers holidays, exams and events, and attendance audit logs plus role-based access control keep records accountable.',
        ],
      },
      {
        h: 'Built around real timetables',
        p: [
          'The data model handles multi-hour labs that are marked once, partial exam days and one-off period swaps, because real timetables are messier than one class per hour. Marking is mobile-first, and a timetable builder checks for conflicts.',
        ],
      },
      {
        h: 'Stack and delivery',
        p: [
          'The app runs on Cloudflare Workers with a D1 database, using Next.js, Hono, Prisma and TypeScript. From identifying the problem to a working MVP took less than a day. It is a first version, and I am improving it from user feedback.',
        ],
      },
    ],
  },
]

export const getArticle = (slug) => articles.find((a) => a.slug === slug)
