// LinkedIn posts, parsed from the public profile. Links go to the original posts.
export const PROFILE_URL = 'https://www.linkedin.com/in/r-jeyadev'
export const ACTIVITY_URL = 'https://www.linkedin.com/in/r-jeyadev/recent-activity/all/'
export const postUrl = (urn) => `https://www.linkedin.com/feed/update/urn:li:activity:${urn}/`

export const posts = [
  {
    "title": "Overleaf and GitHub session for students at FRONTIER",
    "date": "2026-10-16",
    "urn": "7516702552185495552",
    "summary": "FRONTIER ran a hands-on session on Overleaf (LaTeX project reports) and GitHub (repositories and version control) for students on 10 October 2026."
  },
  {
    "title": "Poster on GANs: DCGAN, CycleGAN, StyleGAN and SRGAN",
    "date": "2026-10-13",
    "urn": "7515760898691690498",
    "summary": "A poster explaining generative adversarial networks, the DCGAN, CycleGAN, StyleGAN and SRGAN variants, their uses in synthetic medical scans and photo restoration, and failure modes such as mode collapse."
  },
  {
    "title": "FRONTIER student builders community: Overleaf, LaTeX, Git and GitHub session",
    "date": "2026-10-08",
    "urn": "7513983722472509442",
    "summary": "Announcement of the first FRONTIER session on Overleaf and LaTeX, AI-assisted report generation, Git and GitHub, held online on 10 October 2026."
  },
  {
    "title": "ScamShield: an explainable scam SMS detector for India",
    "date": "2026-09-26",
    "urn": "7509547914092818433",
    "summary": "Launch post for ScamShield: 98.4% accuracy and 99.3% scam recall on Indian test messages, de-obfuscation of tricks like 0TP, link checks without opening them, and word-level explanations. Project 40 of a road to 50."
  },
  {
    "title": "FRONTIER: a local-first AI content pipeline for Discord",
    "date": "2026-09-23",
    "urn": "7508515481994211328",
    "summary": "Shipped FRONTIER, which discovers hackathons, research and AI news from 10+ sources, scores relevance with a local LLM (Ollama and Gemma 3 4B) and publishes after human approval. Project 39 of 50."
  },
  {
    "title": "Overleaf, resume building and conference paper session for juniors",
    "date": "2026-09-19",
    "urn": "7506903472542404609",
    "summary": "Reflections on a hands-on session for juniors on Overleaf, ATS-friendly resumes and conference paper preparation, and why one seminar is not enough."
  },
  {
    "title": "AI DJ: an AI-assisted DJ system built for a college event",
    "date": "2026-09-12",
    "urn": "7504607116695879680",
    "summary": "An AI-assisted DJ system combining audio DSP, ML and a local LLM: BPM and key analysis, beat-locked transitions, stem-aware mixing and setlist planning, built for an Onam celebration at SRET."
  },
  {
    "title": "DATACON 2026: analytics and AI in healthcare",
    "date": "2026-09-02",
    "urn": "7500737606603710464",
    "summary": "Takeaways from DATACON 2026 at SRIHER, Chennai (29 to 30 August 2026), including a workshop on Six Sigma, SPC and AI-assisted data validation with MINITAB."
  },
  {
    "title": "Honoured to be inducted as a Student Council member at SRIHER",
    "date": "2026-07-03",
    "urn": "7478707208902545408",
    "summary": "Induction as a Student Council member at Sri Ramachandra Institute of Higher Education and Research."
  },
  {
    "title": "HVAC Webinar Promotion",
    "date": "2026-06-13",
    "urn": "7471585058504499200",
    "summary": "Promoted Aspiration Cleantech Academy's online webinar on \"HVAC Fundamentals & Career Opportunities\" featuring Chris Compton, CEO of HVACRedu.net (40+ years experience). Aimed at students and professionals curious about HVAC careers and AI's role in building systems."
  },
  {
    "title": "Docker & Kubernetes Masterclass",
    "date": "2026-05-12",
    "urn": "7459975497565810690",
    "summary": "Attended Scaler's beginner-friendly Docker & Kubernetes session. Appreciated visual explanations of containers, deployment workflows, and Kubernetes for large-scale systems. Recommended for anyone starting DevOps."
  },
  {
    "title": "PromptWars Rank 193",
    "date": "2026-05-11",
    "urn": "7459606496704638978",
    "summary": "Celebrated finishing in the Top 400 of the PromptWars Virtual Challenge with Rank 193 and a score of 95.81. Reflected on the challenge pushing deeper thinking around prompting and building AI under pressure."
  },
  {
    "title": "AI Prompt Wars Phase 2 — Deep Reflection",
    "date": "2026-05-03",
    "urn": "7456572160086777856",
    "summary": "Ranked 250th out of 17,165 developers in India. Argued for AI-based evaluation systems over human judging in hackathons — citing code quality, feasibility, and execution as undervalued criteria. 596 impressions — most engaged recent post."
  },
  {
    "title": "VoteIQ — Built in 8 Hours",
    "date": "2026-05-01",
    "urn": "7455919427696615424",
    "summary": "Built VoteIQ, an AI-powered civic education app for first-time Indian voters, during Google's Prompt Wars. Features myth-busting AI, guarded Q&A, and a voter readiness score. Stack: Flask + Gemini 2.0 Flash."
  },
  {
    "title": "Automation Expo South, Chennai",
    "date": "2026-04-02",
    "urn": "7445453835067887616",
    "summary": "Attended Automation Expo South on March 19. Shifted perspective — automation is now data-driven with AI/IoT making real-time decisions. Planned an industry-inspired AI project. 929 impressions — highest engagement overall."
  },
  {
    "title": "AI & The Introvert Developer",
    "date": "2026-03-01",
    "urn": "7433712359086538752",
    "summary": "Short reflective post on the evolution of software dev from scratch → frameworks → AI collaboration. \"AI doesn't replace coders. It amplifies focused ones.\""
  },
  {
    "title": "LLMs as Mirrors",
    "date": "2026-02-28",
    "urn": "7433544957933801472",
    "summary": "Explored the idea of AI as a mirror — asked an AI to describe a character arc based on months of technical conversations and brainstorming."
  },
  {
    "title": "Git & GitHub Session — Coding & Hackathon Club SRET",
    "date": "2026-02-28",
    "urn": "7433494204250738689",
    "summary": "Co-organized a hands-on Git/GitHub learning session for juniors through SRET's Coding & Hackathon Club. Covered repository creation, branching, pull requests, and collaborative workflows."
  },
  {
    "title": "AI-Based AQI Project at AGAM 9.0 Team Expo",
    "date": "2026-02-26",
    "urn": "7432684930091884546",
    "summary": "Showcased the AI-based AQI project at the Team Expo, AGAM 9.0 alongside teammates."
  },
  {
    "title": "Linux Mint Tutorial — Video Post",
    "date": "2026-01-28",
    "urn": "7422242606023303168",
    "summary": "Published a beginner's guide to Linux Mint complete installation (2026) as a LinkedIn video tutorial. For people tired of slow systems and forced updates."
  },
  {
    "title": "IBM Z Day — Coordinating 330 Students",
    "date": "2025-12-21",
    "urn": "7408471103326593024",
    "summary": "Led and coordinated 330 students for IBM Z Day 2025 at SRET. 76 unique students recognized, 94 total badges earned. Championed by dedicated student coordinators including Jeyadev."
  },
  {
    "title": "Smart India Hackathon 2025 — Round 1 Cleared",
    "date": "2025-12-06",
    "urn": "7402945826811285504",
    "summary": "Cleared SIH 2025 Round 1, competing against top ideas from across the college."
  },
  {
    "title": "Arduino Calculator — COA Project",
    "date": "2025-12-06",
    "urn": "7402930681657368576",
    "summary": "Built an Arduino-based Calculator — Matrix Edition for Computer Organization & Architecture course, integrating Von Neumann architecture with Web Serial Interface."
  },
  {
    "title": "12-Hour Hackathon — TaskFlow App",
    "date": "2025-11-17",
    "urn": "7396241761313935360",
    "summary": "Built TaskFlow (smart task management app) at a 12-hour hackathon at Most Prestigious Deemed University in Chennai on October 9th."
  },
  {
    "title": "Builders Qoneqt 2.0 — Blockchain/RomeProtocol Session",
    "date": "2025-11-17",
    "urn": "7396238290900869121",
    "summary": "Attended a session about RomeProtocol at Builders Qoneqt 2.0 on September 29, 2024. Learned about blockchain fundamentals."
  },
  {
    "title": "Research Day 2nd Place",
    "date": "2025-10-10",
    "urn": "7382391827577925632",
    "summary": "Secured 2nd Place at Research Day, March 20–21, 2025 at SRET for an AI-based Automatic Air Quality Forecasting & Reporting System paper."
  },
  {
    "title": "Samsung Solve for Tomorrow 2025",
    "date": "2025-06-30",
    "urn": "7345402039352311808",
    "summary": "Participated in Samsung Solve for Tomorrow 2025, contributing innovative Design Thinking-based ideas to solve real-world challenges."
  },
  {
    "title": "Starting Web Development Internship",
    "date": "2025-05-29",
    "urn": "7333741688558891009",
    "summary": "Grateful post on starting as a Web Development Intern at Aspiration Cleantech Ventures."
  },
  {
    "title": "Tech Expo — Sri Ramachandra Faculty of Engineering",
    "date": "2025-02-19",
    "urn": "7297890901849165824",
    "summary": "Shared the experience at the Tech Expo, showcasing the AI-based AQI project."
  },
  {
    "title": "IIT Ropar — Advance Your Career Session",
    "date": "2024-12-05",
    "urn": "7270474098932105217",
    "summary": "Attended IIT Ropar's \"Advance Your Career With IIT's Cutting-Edge Programs\" session."
  },
  {
    "title": "TCS iON — Business Etiquette Webinar",
    "date": "2024-10-29",
    "urn": "7256987708105842688",
    "summary": "Attended an insightful TCS iON webinar on business etiquette covering dressing for business engagements, communication, and professional conduct."
  }
]

export const certifications = [
  {
    "name": "Train and Evaluate Regression Models",
    "issuer": "Microsoft Learn",
    "date": "2026-03-10",
    "urn": "7437045766709198848"
  },
  {
    "name": "Explore and Analyze Data with Python",
    "issuer": "Microsoft Learn",
    "date": "2026-03-10",
    "urn": "7437044237197783041"
  },
  {
    "name": "Introduction to Machine Learning Concepts",
    "issuer": "Microsoft Learn",
    "date": "2026-03-10",
    "urn": "7437041101934579712"
  },
  {
    "name": "Data Science Tools",
    "issuer": "Cognitive Class / IBM",
    "date": "2026-01-24",
    "urn": "7420840939373408256"
  },
  {
    "name": "IBM Z Day 2025 — Security",
    "issuer": "IBM",
    "date": "2026-01-21",
    "urn": "7419562174722940928"
  },
  {
    "name": "IBM Z Day 2025 — AI & Data",
    "issuer": "IBM",
    "date": "2025-12-08",
    "urn": "7403809265037287425"
  },
  {
    "name": "IBM Z Day 2025 — Modernization",
    "issuer": "IBM",
    "date": "2025-12-08",
    "urn": "7403808127558864896"
  },
  {
    "name": "IBM Z Day 2025 — IBM Z Skills",
    "issuer": "IBM",
    "date": "2025-12-08",
    "urn": "7403806541528719360"
  },
  {
    "name": "AWS Node Runners for BNB Chain",
    "issuer": "Binance Academy",
    "date": "2025-09-10",
    "urn": "7371363533244190720"
  },
  {
    "name": "Certificate of Excellence — Engineering Daily Quiz",
    "issuer": "Unstop",
    "date": "2025-10-07",
    "urn": "7381198462337441792"
  },
  {
    "name": "Weekly Coding Challenge 15",
    "issuer": "Unstop",
    "date": "2025-02-19",
    "urn": "7297889696251031553"
  },
  {
    "name": "HackerRank Python Certification",
    "issuer": "HackerRank",
    "date": "2024-11-21",
    "urn": "7265391788792700928"
  },
  {
    "name": "Build Infrastructure with Terraform",
    "issuer": "Google Cloud",
    "date": "2024-11-13",
    "urn": "7262311074706673664"
  },
  {
    "name": "Develop Your Google Cloud Network",
    "issuer": "Google Cloud",
    "date": "2024-11-12",
    "urn": "7262145898665652225"
  },
  {
    "name": "Implement Cloud Security Fundamentals",
    "issuer": "Google Cloud",
    "date": "2024-11-12",
    "urn": "7262126008793747456"
  },
  {
    "name": "Set Up an App Dev Environment on Google Cloud",
    "issuer": "Google Cloud",
    "date": "2024-11-09",
    "urn": "7261073266432225280"
  },
  {
    "name": "Build a Secure Google Cloud Network",
    "issuer": "Google Cloud",
    "date": "2024-11-09",
    "urn": "7261064730419617792"
  },
  {
    "name": "Implement Load Balancing on Compute Engine",
    "issuer": "Google Cloud",
    "date": "2024-11-09",
    "urn": "7261063615812644864"
  },
  {
    "name": "Use Apache Spark in Microsoft Fabric",
    "issuer": "Microsoft",
    "date": "2024-12-05",
    "urn": "7270362606064852992"
  },
  {
    "name": "Get Started with Data Warehouses in Microsoft Fabric",
    "issuer": "Microsoft",
    "date": "2024-12-05",
    "urn": "7270472870256865280"
  },
  {
    "name": "Ingest Data with Dataflows Gen2 in Microsoft Fabric",
    "issuer": "Microsoft",
    "date": "2024-12-05",
    "urn": "7270468683334852610"
  },
  {
    "name": "Introduction to End-to-End Analytics using Microsoft Fabric",
    "issuer": "Microsoft",
    "date": "2024-12-05",
    "urn": "7270467102380032000"
  },
  {
    "name": "Use Data Factory Pipelines in Microsoft Fabric",
    "issuer": "Microsoft",
    "date": "2024-12-05",
    "urn": "7270368896577073152"
  },
  {
    "name": "Computational Chemistry Webinar — ISCB-SC",
    "issuer": "ISCB-SC RSG Tamil Nadu",
    "date": "2025-03-30",
    "urn": "7311976877059911682"
  }
]
