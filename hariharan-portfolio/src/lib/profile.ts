// Single source of truth about Hariharan, injected into the chat model's system prompt.
// Keep this factual — the assistant is instructed to answer ONLY from here.
export const PROFILE = `
## Identity
- Name: Hariharan Joga
- Role: AI Engineer specializing in agentic systems and real-time voice AI.
- Currently: AI SDE Intern at Excelerate Technologies (Feb 2026 – Present).
- Education: B-Tech in Computer Science (AI & ML) at VNR VJIET (Vallurupalli Nageswar Rao Vignana Jyothi Institute of Engineering and Technology).
- Based in India. Open to remote work and relocation. Actively open to AI / agentic-engineering roles.

## Contact — how to reach him (there are several ways, not just email)
- Book a call: the fastest way — there's a "📅 Book a 15-min call" button in the Contact section of this site (Cal.com) that opens a booking popup. Suggest this first.
- Email: hariharanjoga445@gmail.com
- LinkedIn: linkedin.com/in/joga-hariharan-6616872a3
- GitHub: github.com/Hariharanjoga
- Résumé: downloadable as a PDF from the Contact section of this site.
- Contact form: the Contact section also has a "send a transmission" message form to reach him directly.
When asked how to reach/contact/hire him, mention that he can book a quick call or email, and that LinkedIn, GitHub, his résumé, and the on-page contact form are all available too.

## Experience (newest first)
1. AI SDE Intern — Excelerate Technologies (Feb 2026 – Present): Building agentic AI systems with LangGraph, LangChain & CrewAI for autonomous task orchestration; building and deploying custom LLMs with real-time voice integration (LiveKit) and driving them to production.
2. Founding AI Engineer — Campus Cortex AI (Jun 2025 – Jan 2026): Architected a cloud-native, multi-tenant SaaS platform with a polyglot backend (PostgreSQL, Pinecone, MongoDB); engineered Gemini-driven multimodal AI grading and hallucination-free RAG tutoring; built multi-turn WhatsApp conversational AI via Twilio; orchestrated production-grade async pipelines (Flask-APScheduler, Docker, Cloudflare R2).
3. SDE Intern / Founding Engineer — Soven Developer (Dec 2024 – Mar 2025): Built Generative AI solutions with OpenAI API and Azure OpenAI; architected a Flask backend; integrated GPT-4o Vision API, reducing processing latency by 35%.
4. AI & ML Intern — Infosys Springboard (Oct 2024 – Dec 2024): Engineered a Random-Forest fraud-detection model at 98% accuracy under Agile; built batch + single-record pipelines improving detection efficiency by 35%.

## Projects (he has SIX flagship projects — always be able to name and describe ALL six; use the exact names below)
Quick list of all six: 1) Bhumi  2) Agentic AI Engine  3) Campus Cortex AI  4) AI CMO  5) Edu Tech AI  6) Financial Risk Analyzer.

1. Bhumi — Real-Time Voice AI for Agriculture.
   Stack: LiveKit, WebRTC, Azure OpenAI, Redis, Python.
   What it is: a sub-800ms multilingual voice AI that helps farmers troubleshoot crop issues and calculate localized fertilizer dosages over a normal phone call.
   How he built it: overlapped LLM text generation with audio synthesis via LiveKit; added a Redis semantic-caching layer to skip 100–300ms vector-DB lookups for repeat seasonal queries; built a deterministic Python routing layer for regional math (bigha/gunta) to prevent dangerous hallucinations.
   It is his strongest / proudest project.

2. Agentic AI Engine (also called the Real-Time Agentic AI Engine).
   Stack: LangGraph, Twilio, WhatsApp, Azure OpenAI.
   What it is: low-latency, multi-turn conversational AI that powers BOTH live voice assistants AND WhatsApp chatbots (via Twilio), using LangGraph state management and a grounded Azure OpenAI prompt pipeline. Shows his conversational-AI work spans voice and chat, not voice-only.

3. Campus Cortex AI.
   Stack: Gemini, RAG, React.js, MongoDB, PostgreSQL, Pinecone (live in production at campuscortexai.software).
   What it is: the large, PRODUCTION, multi-tenant edtech SaaS PLATFORM he built as Founding AI Engineer — Gemini multimodal grading, hallucination-free RAG tutoring, auto mock-tests, real-time handwritten-answer evaluation, and multi-turn WhatsApp conversational AI via Twilio, on a polyglot backend with production async pipelines (Docker, Cloudflare R2). DISTINCT from Edu Tech AI (#5): Campus Cortex is the deployed multi-tenant company platform.

4. AI CMO (also called the Autonomous AI CMO).
   Stack: PraisonAI, Multi-Agent, LiteLLM, Flask, PostgreSQL, SSE.
   What it is: an autonomous multi-agent marketing officer (a Researcher agent, a Writer agent, and a QA agent) that researches B2B rivals on the live web and triangulates hidden enterprise pricing, streaming its ChatGPT-style "thinking" steps to the UI in real time via Server-Sent Events.

5. Edu Tech AI.
   Stack: GPT-4 Turbo, Gemini, React.js, MongoDB.
   What it is: a SEPARATE, self-contained Generative-AI study app (NOT the Campus Cortex platform) that lifted user interaction 40% — it auto-generates mock-test questions and evaluates handwritten answers in real time. Standalone study app: no multi-tenant SaaS, no WhatsApp/Twilio, no Pinecone/Postgres.

6. Financial Risk Analyzer (also called the Financial Doc Summarization & Risk Analysis Tool).
   Stack: Python, RAG, Flask, OpenAI text-embedding-3, GPT-4 Turbo.
   What it is: summarizes SEC filings, compliance docs and financial statements, then scores document-level and portfolio-level risk using text-embedding-3 retrieval plus GPT-4 Turbo.

## Skills
- Languages: Python, C++, JavaScript, SQL, C, R. Strong DSA — 500+ problems solved on LeetCode/CodeChef.
- Agentic & Multi-Agent AI: LangChain, LangGraph, CrewAI, PraisonAI, LiteLLM, Vapi, LiveKit, Vector Databases, RAG. Designs multi-agent architectures (planner / researcher / writer / QA crews) — not just single voice agents.
- Generative AI / LLMs: Azure OpenAI, OpenAI API, Gemini, GPT-4o / GPT-4 Turbo, embeddings, NLP, information retrieval, evals, feature engineering, supervised & unsupervised ML.
- Integrations / Messaging: Twilio, WhatsApp Business API.
- Web / Backend: MERN (MongoDB, Express.js, React.js, Node.js), Flask.
- Data / Infra: PostgreSQL, MongoDB, Pinecone, Redis, Docker, AWS, GCP, Cloudflare R2.
- Tools: GitHub, Figma, Power BI.

## Achievements & certifications
- SIH 2024 Finalist (top 5 among 400+ teams). Designathon Finalist (top 10 among 500+). TS EAMCET rank: top 0.4% of all candidates.
- Certifications: Generative AI Applied LLM badges (AI principles, prompt design, LLMs, generative & responsible AI); LiveKit "Building Voice Agents" course (taught by the LiveKit founders); NPTEL C++.
- Leadership: Chairperson — Krithomedh technical club (VNRVJIET, Aug 2024 – Aug 2025); Associate President — Street Cause VNRVJIET, a student-run NGO (Jul 2024 – Jul 2025).
`;
