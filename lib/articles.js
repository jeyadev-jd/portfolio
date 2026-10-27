// Technical write-ups. Every figure comes from the linked project's README.
export const articles = [
  {
    slug: 'offline-rag-on-budget-pcs',
    project: 'sret-rag',
    title: 'Offline RAG on four budget PCs: FAISS, llama.cpp and Qwen2.5 on a LAN',
    subtitle: 'A self-hosted retrieval-augmented generation system with cited answers and no cloud dependency',
    description:
      'How I built offline retrieval-augmented generation (RAG) on four Intel i3 PCs: upload PDFs, ask questions and get cited answers with FAISS, MiniLM and a llama.cpp Qwen2.5 node.',
    date: '2026-10-18',
    updated: '2026-10-27',
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
        h: 'Why these components',
        list: [
          'all-MiniLM-L6-v2: small enough to run on a CPU, and its 384-dimensional vectors keep the index compact.',
          'FAISS IVF50,PQ8 with nprobe=5: the inverted file splits vectors into 50 clusters and searches only the 5 nearest, while product quantisation compresses each vector to 8 bytes, so the index fits easily in 8 GB of RAM.',
          'llama.cpp with a Q4_K_M quantised model: 4-bit weights let a 7B model run on an i3 with integrated graphics instead of a dedicated GPU.',
          'semantic-text-splitter at 512 tokens: chunks break at sentence and paragraph boundaries, so a retrieved chunk reads as a complete thought.',
          'SQLite through aiosqlite: metadata, users and the embedding cache need no separate database server.',
        ],
        after:
          'The UI can also switch at runtime to smaller models (phi-2, Qwen2.5-1.5B, TinyLlama-1.1B) when a faster, lighter answer is enough.',
      },
      {
        h: 'Hardware you need',
        list: [
          'Four PCs with an Intel i3 (11th gen recommended), 8 GB RAM and a 200 GB HDD.',
          'Ubuntu or Linux Mint on each machine.',
          'A LAN with static IPs, here 192.168.1.10 to 192.168.1.13.',
          'No GPU and no internet connection after setup.',
        ],
      },
      {
        h: 'Setting it up, step by step',
        list: [
          'Copy the project folder, offline Python wheels and Debian packages from a USB drive to each PC.',
          'Create a Python virtual environment and install with pip --no-index --find-links=./wheels, so nothing is downloaded.',
          'Run the zram setup script on every PC to add 3 GB of compressed swap.',
          'Start the LLM server on PC4 first and wait about 45 seconds for the model to load.',
          'Start the FAISS node (PC3), the embedder (PC2) and finally the gateway (PC1). A start_cluster.sh script does this over SSH.',
          'Put PDFs in the docs folder, run the processing script to chunk them, then build the FAISS index.',
          'Open the gateway in a browser on the LAN, log in, and change the default admin password in .env.',
        ],
      },
      {
        h: 'The API',
        p: [
          'The gateway exposes a small REST API, so other tools can use the cluster without the web UI:',
        ],
        list: [
          'POST /api/v1/ingest/file and /api/v1/ingest/url: add a document, returning its id and chunk count.',
          'POST /api/v1/query: ask a question, returning the answer, its sources and the latency in milliseconds.',
          'POST /v1/chat/completions: OpenAI-compatible chat with streaming, so existing OpenAI clients work by changing the base URL.',
          'GET /api/v1/health: index status and the loaded model.',
        ],
      },
      {
        h: 'What I would tell someone building this',
        p: [
          'Start the LLM node first and give it about 45 seconds to load the model; startup order matters. Change the default admin credentials before first use, and keep the system on the LAN unless you add your own protection.',
          'Splitting roles across machines is what makes budget hardware work: no single 8 GB PC has to hold the embedder, the index and a 7B model at once.',
        ],
      },
    ],
    faq: [
      { q: 'Can RAG run without a GPU?', a: 'Yes. sret-rag runs a 7B model on Intel i3 PCs with integrated graphics, using llama.cpp with 4-bit (Q4_K_M) quantisation. Embeddings use the small all-MiniLM-L6-v2 model on the CPU.' },
      { q: 'Which LLM fits on a PC with 8 GB of RAM?', a: 'Qwen2.5 7B quantised to Q4_K_M runs on a dedicated 8 GB node with zram swap. Smaller models such as Qwen2.5-1.5B, phi-2 and TinyLlama-1.1B fit more comfortably and answer faster.' },
      { q: 'Does offline RAG need internet at all?', a: 'Only to download packages and models once. After that, wheels and Debian packages install from a USB drive and the cluster runs on the LAN with no internet connection.' },
      { q: 'Why use four PCs instead of one?', a: 'Each 8 GB machine does one job: gateway, embedder, vector index or LLM. That keeps any single machine from running out of memory and lets each service restart on its own.' },
      { q: 'Can I use it with OpenAI client libraries?', a: 'Yes. The gateway has an OpenAI-compatible /v1/chat/completions endpoint with streaming, so you point an existing client at the gateway URL.' },
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
      {
        h: 'Where the data comes from',
        list: [
          'UCI SMS Spam Collection: 4,836 UK messages after de-duplication, used for training and the UK test.',
          'Mishra and Soni SMS Phishing: 1,053 messages (the rest duplicated UCI).',
          'Indian Telecom SMS Spam Collection: 1,854 messages for the Indian test and dev sets.',
          'ScamShield dataset: 6,985 real rows, with machine-generated rows excluded and checked absent.',
          '28 published examples from news and PIB Fact Check, and 1,117 templated synthetic messages used only for training.',
        ],
        after:
          'The public Indian sources only label spam or ham, and their spam mixes marketing with fraud. A documented keyword pass splits it into promotional spam and smishing, and records how each label was set. The Indian test set has 6,061 messages: 1,017 legitimate, 3,758 promotional spam and 1,286 smishing.',
      },
      {
        h: 'How the pipeline works',
        list: [
          'Normalise: reverse six obfuscation families while protecting URLs, amounts, OTP codes, phone numbers and texting slang such as gr8 and 7pm.',
          'Features: word and character TF-IDF plus 16 engineered features, including urgency words, requests for an OTP or PIN, obfuscation count, a URL look-alike score and Indian scam terms.',
          'Classify: a calibrated linear SVM, chosen by cross-validation on training data only.',
          'Explain: remove each word in turn and measure how much the model margin changes, which gives the word-level heatmap.',
          'Check links: edit distance and substring matching against about 30 official Indian bank and brand domains, plus shorteners, suspicious top-level domains, raw IP hosts and @ tricks.',
        ],
      },
      {
        h: 'Scam types it names',
        p: [
          'Each message is classified as legitimate, promotional spam or smishing (SMS phishing). Smishing is labelled with its type: KYC, OTP or account takeover, UPI, courier, prize or lottery, job or task, digital arrest, and phishing. The case file also shows the kill chain behind the message: hook, urgency, claimed authority, then the demand.',
          'Promotions are capped at medium risk: unwanted, but not fraud. Advice is specific to the scam type and points to cybercrime.gov.in and the 1930 helpline.',
        ],
      },
      {
        h: 'Using it from a phone',
        p: [
          'ScamShield installs as a web app with a share target, so a suspicious SMS can be shared straight from the messaging app into the detector. An awareness quiz shows how the model reads each message, which helps people learn the patterns themselves.',
        ],
      },
    ],
    updated: '2026-10-27',
    faq: [
      { q: 'Why do spam filters miss Indian scam SMS?', a: 'Most are trained on UK messages from around 2012 that never mention UPI, KYC or Aadhaar. In ScamShield tests, models trained from scratch on that data lost 33–52% of their accuracy on Indian messages.' },
      { q: 'How accurate is ScamShield?', a: 'On 6,061 Indian test messages, the deployed calibrated linear SVM reached 0.984 accuracy, 0.970 F1 and 0.993 scam recall, close to DistilBERT at 0.982 accuracy.' },
      { q: 'Does ScamShield open the links in a message?', a: 'No. Links are checked lexically against about 30 Indian bank and brand domains, shorteners and suspicious domains, without ever being visited.' },
      { q: 'Why not use a transformer like DistilBERT?', a: 'On Indian messages the linear SVM matches DistilBERT, needs no GPU and answers in milliseconds, so it is cheaper and faster to deploy.' },
      { q: 'Where do I report an SMS scam in India?', a: 'Report it at cybercrime.gov.in or call the 1930 cyber fraud helpline. ScamShield shows this advice with each scam verdict.' },
    ],
  },
  {
    slug: 'chennai-air-quality-dashboard',
    project: 'pollumap-v3',
    title: 'Building an AI-powered air quality dashboard for Chennai, with forecasts and healthy routing',
    subtitle: 'Flask, MongoDB, XGBoost and an A* route planner in Pollumap V3',
    description:
      'How Pollumap V3, an AI-powered air quality project for Chennai, combines live pollution, weather and satellite fire data with XGBoost 24-hour forecasts and an A* healthy-routing engine.',
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
      {
        h: 'The full feature list',
        list: [
          'Live AQI dashboard with animated charts for PM2.5, PM10, O3, NO2, SO2 and CO.',
          'Leaflet map with a pollution overlay and sensor locations.',
          'Weather panels for temperature, humidity, UV index, wind and rainfall.',
          'NASA FIRMS satellite fire detections.',
          'XGBoost 24-hour pollutant and weather forecasts.',
          'Healthy routing with fastest, cleanest and balanced options.',
          'Source apportionment pie chart: vehicles, industry, dust and other sources.',
          'An IoT sensor grid with connectivity indicators.',
          'Dark and light themes.',
        ],
      },
      {
        h: 'Stack',
        p: [
          'The front end is React 18 with Vite, Recharts for charts, React-Leaflet for the map, Framer Motion for transitions, Lucide icons, and Axios with SWR for data fetching and caching. The back end is Flask 3 with MongoDB for time-series storage and XGBoost with scikit-learn for forecasting.',
          'The back end is split into fetchers for each data source and core logic modules for source apportionment, forecasting and routing, with all REST endpoints in one routes file.',
        ],
      },
      {
        h: 'Running it yourself',
        list: [
          'Install Python 3.12+, Node.js 18+ and MongoDB on its default port 27017.',
          'In the backend folder, create a virtual environment, install requirements, copy .env.example to .env and add your WAQI and FIRMS API keys.',
          'Initialise the database with init_db.py and start the API on port 5000.',
          'In the frontend folder, run npm install and npm run dev to open the dashboard on port 5173.',
          'Or run run_dashboard.sh from the project root to start both together.',
        ],
      },
    ],
    updated: '2026-10-27',
    faq: [
      { q: 'What data does Pollumap V3 use?', a: 'Live air quality from the WAQI API, weather from Open-Meteo, satellite fire detections from NASA FIRMS, and the OpenStreetMap road graph through the Overpass API, stored as time series in MongoDB.' },
      { q: 'How does it forecast air quality?', a: 'XGBoost models predict pollutant and weather values 24 hours ahead. The forecasts feed the forecast cards and the health advisory.' },
      { q: 'What is healthy routing?', a: 'An A* search over the road graph that finds fastest, cleanest and balanced routes for walking or cycling, so you can trade a little distance for less pollution exposure.' },
      { q: 'Which pollutants does it show?', a: 'PM2.5, PM10, ozone (O3), nitrogen dioxide (NO2), sulphur dioxide (SO2) and carbon monoxide (CO).' },
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
      {
        h: 'How it is built',
        list: [
          'A FastAPI back end with a REST API and interactive docs.',
          'A local LLM layer that works with both Ollama and LM Studio.',
          'A Discord bot with slash commands and inline approve, reject and regenerate buttons.',
          'A React dashboard with a Generate, Preview, Approve, Publish flow.',
          'SQLite tracking every post through its full lifecycle.',
          'A style examples folder: drop in your own writing and the model follows its tone.',
          'An MCP server built with FastMCP, so AI coding agents can call FRONTIER tools directly.',
        ],
      },
      {
        h: 'Routing posts to the right channel',
        p: [
          'FRONTIER routes each draft to one of 10 channels by topic: #neural for AI and machine learning, #forge for projects and code, #lab for research papers, #arena for hackathons, #bug-hunt for debugging help, #missions for challenges, #launchpad for student showcases, #signal for announcements, #frontier-guide for tutorials and #frontier-lounge for general chat.',
        ],
      },
      {
        h: 'Running it on a Windows PC',
        p: [
          'FRONTIER is designed to start with Windows: it installs as a background service or runs from the system tray. On boot it waits for the local LLM, discovers content, drafts posts and queues them for approval. Setup is a PowerShell script plus a .env file with the Discord bot token, server ID and Ollama model name.',
        ],
      },
    ],
    updated: '2026-10-27',
    faq: [
      { q: 'Can a Discord bot use a local LLM instead of the OpenAI API?', a: 'Yes. FRONTIER runs its model through Ollama or LM Studio on the same machine, so there are no API costs and no community data leaves the PC.' },
      { q: 'Does FRONTIER post automatically?', a: 'No. It only drafts. Every post needs human approval in the React dashboard or with Discord buttons before it is published.' },
      { q: 'Which model does it use?', a: 'Gemma 3 4B through Ollama for scoring and drafting. The model name is a setting, so other Ollama models work too.' },
      { q: 'How does it match the community writing style?', a: 'You add example posts to a style examples folder, and the model uses them as a guide for tone when drafting.' },
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
      {
        h: 'Why real timetables are hard',
        list: [
          'A 2-hour lab is one class the faculty marks once, but it costs the student 2 hours of attendance.',
          'An exam can take hours 1–2 while hours 3–7 run normal classes.',
          'Mentor-mentee meetings are compulsory but should not lower an academic percentage.',
          'A student who skipped hour 4 and returned for hour 5 bunked; one who never came was absent. Those are different problems.',
        ],
        after: 'The system models each of these explicitly instead of approximating them.',
      },
      {
        h: 'How bunk detection works',
        p: [
          'A bunk is a present-to-absent change within a single day: attended hour 3, missed hour 4. One missed period is flagged as a single-hour skip, and two or more in a row as a mid-class bunk. A student absent all day is simply absent.',
          'A nightly job recalculates health scores, detects bunk patterns and raises alerts at warning and critical thresholds. Admins get a daily bunkers list, a heatmap of attendance by weekday and period, a bunk leaderboard and late-arrival analytics.',
        ],
      },
      {
        h: 'How the planner predicts your attendance',
        p: [
          'Crossing dates are not extrapolated from a formula. The planner walks the actual future timetable of your section day by day, skipping holidays and non-working days, and reports the exact date your percentage first drops below the target if you keep skipping, or climbs back if you attend everything. A what-if simulator lets students test a number of absences or specific dates.',
          'Present-like statuses are present, late, very late, medical and on duty. Subjects such as mentor meetings still record attendance but are excluded from every percentage.',
        ],
      },
      {
        h: 'Keeping records trustworthy',
        list: [
          'Days can be locked so records become immutable.',
          'Every edit needs a reason, written to an append-only audit log.',
          'Five roles, from super admin to student, each see only what they should.',
          'Student CSV import validates every row and writes nothing if any row fails.',
          'Excel and CSV exports stream on request, with no file storage needed.',
        ],
      },
      {
        h: 'Engineering on Cloudflare D1',
        p: [
          'The API is Hono and the front end Next.js 15 with Tailwind, both on Cloudflare Workers, with TanStack Query for data and Zod validating every request. The schema has 20 models. It was first designed for PostgreSQL with nine native enums, but D1 is SQLite, which has none, so those became text columns exported as TypeScript string unions. D1 also has no interactive transactions, so writes use batched arrays and nested writes instead.',
        ],
      },
    ],
    updated: '2026-10-27',
    faq: [
      { q: 'How do I calculate how many classes I can miss?', a: 'Attendance ERP counts your present hours against total hours per subject and shows a safe-bunk number: how many more classes you can miss and stay at or above the minimum, such as 80%.' },
      { q: 'How many classes do I need to attend to recover?', a: 'The recovery planner shows how many classes you need to attend to get back above the target, and the exact date you would cross it based on your real timetable.' },
      { q: 'How does it detect bunking?', a: 'It flags a present-to-absent change within one day, such as attending hour 3 and missing hour 4. Two or more missed periods in a row count as a mid-class bunk.' },
      { q: 'What does it run on?', a: 'Cloudflare Workers with a D1 (SQLite) database, using Hono for the API and Next.js for the front end.' },
    ],
  },
  {
    slug: 'ai-powered-air-quality-projects',
    project: 'aerosight',
    title: 'AI-powered air quality projects: forecasting, sensor fusion and mapping',
    subtitle: 'AeroSight, Pollumap, HyperlocalAQ and PHYS-TRUST Lite',
    description:
      'An overview of four AI-powered air quality projects: Prophet and XGBoost forecasting with mortality reports, a Chennai dashboard, multi-source hyperlocal mapping and single-sensor fusion.',
    date: '2026-10-19',
    tags: ['Air quality', 'Machine learning', 'Forecasting', 'IoT', 'XGBoost', 'Chennai'],
    sections: [
      {
        h: 'Why air quality',
        p: [
          'Air quality has been a recurring theme in my work, from a machine learning internship to hackathon demos. Each project below attacks a different part of the problem with machine learning: forecasting, public-health impact, hyperlocal mapping and low-cost sensing. The AI-based air quality forecasting and reporting system won 2nd place at Research Day 2025 at Sri Ramachandra Faculty of Engineering and Technology.',
        ],
      },
      {
        h: 'AeroSight: forecasting and public-health reports',
        p: [
          'AeroSight fetches and forecasts air quality data using two models, Facebook Prophet and XGBoost. It correlates pollution levels with public health data such as mortality rates, uses Open-Meteo for weather, and automatically compiles the results into a multi-page PDF report for monitoring stations.',
        ],
      },
      {
        h: 'Pollumap: a live dashboard with forecasts and healthy routing',
        p: [
          'Pollumap V3 is a full-stack dashboard for Chennai with XGBoost 24-hour forecasts, an interactive Leaflet map and an A* healthy-routing feature that finds the least-polluted walking or cycling path. Pollumap V2 was the Smart India Hackathon 2025 demo for Delhi-NCR, and both have demo videos on my YouTube channel.',
        ],
      },
      {
        h: 'HyperlocalAQ: combining seven data sources',
        p: [
          'HyperlocalAQ is a high-resolution air quality modelling framework for Chennai. It integrates seven APIs (WAQI, NASA FIRMS, Open-Meteo, TomTom, OpenStreetMap, CAMS and OpenFDA) with hybrid inverse distance weighting, and adds fire-impact and traffic adjustments before drawing the result on an interactive Folium map.',
        ],
      },
      {
        h: 'PHYS-TRUST Lite: one low-cost sensor',
        p: [
          'PHYS-TRUST Lite estimates air quality from a single Arduino node with an MQ135 gas sensor and a DHT11 temperature and humidity sensor. A Kalman filter fuses the sensor physics, room mass-balance physics and an LSTM-ensemble prior, weighting each by a live trust score. It reports a 90% conformal uncertainty band and detects sensor faults, with a live React dashboard.',
        ],
      },
      {
        h: 'How they fit together',
        p: [
          'Forecasting tells people what is coming, mapping and routing help them avoid exposure, multi-source fusion fills gaps between monitoring stations, and sensor fusion makes cheap hardware trustworthy. All four projects are open source on GitHub.',
        ],
      },
      {
        h: 'Which project fits which question',
        list: [
          'What will the air be like tomorrow? Pollumap V3 forecasts pollutants 24 hours ahead with XGBoost; AeroSight compares Prophet and XGBoost forecasts.',
          'How does pollution affect health? AeroSight correlates pollution with mortality records and writes a PDF report per station.',
          'What is the air like between monitoring stations? HyperlocalAQ blends ground stations with the CAMS satellite model, then adjusts for weather, fires, industry and traffic.',
          'Which route exposes me to less pollution? Pollumap V3 computes fastest, cleanest and balanced routes with A*.',
          'Can a cheap sensor be trusted? PHYS-TRUST Lite fuses a low-cost MQ135 sensor with physics and an LSTM prior, and reports its own uncertainty.',
        ],
      },
      {
        h: 'Data sources across the projects',
        p: [
          'The projects share a set of open data sources: WAQI for ground station readings, Open-Meteo for weather, NASA FIRMS for satellite fire hotspots, the Copernicus CAMS model for satellite-based estimates, OpenStreetMap for roads and pollution sources such as industrial zones and landfills, and TomTom for live traffic.',
          'Combining them matters because each one covers a gap in the others: ground stations are accurate but sparse, satellite models cover everywhere but less precisely, and weather and traffic explain why readings change hour to hour.',
        ],
      },
    ],
    updated: '2026-10-27',
    faq: [
      { q: 'How is machine learning used for air quality?', a: 'In these projects: XGBoost and Prophet forecast pollutant levels, data fusion fills gaps between monitoring stations, and a Kalman filter with an LSTM prior makes low-cost sensors more reliable.' },
      { q: 'Can you predict air quality 24 hours ahead?', a: 'Yes. Pollumap V3 uses XGBoost models to forecast pollutant and weather values 24 hours ahead for Chennai.' },
      { q: 'How do you estimate air quality where there is no monitoring station?', a: 'HyperlocalAQ uses hybrid inverse distance weighting between ground stations and the CAMS satellite model, then adjusts for weather, fires, industry and traffic.' },
      { q: 'Are low-cost air quality sensors accurate?', a: 'Not on their own. PHYS-TRUST Lite fuses an MQ135 sensor with physics models and an LSTM prior, weights each by a live trust score, and reports a 90% uncertainty band.' },
    ],
  },
]

export const getArticle = (slug) => articles.find((a) => a.slug === slug)
