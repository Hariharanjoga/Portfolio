// Single source of truth about Hariharan, injected into the chat model's system prompt.
// Keep this factual — the assistant is instructed to answer ONLY from here.
export const PROFILE = `
## Identity
- Name: Hariharan Joga
- Role: AI Engineer specializing in agentic systems and real-time voice AI.
- Currently: AI SDE Intern at Excelerate Technologies (Feb 2026 – Present).
- Education: B-Tech in Computer Science (AI & ML) at VNR VJIET (Vallurupalli Nageswar Rao Vignana Jyothi Institute of Engineering and Technology).
- Based in India. Open to remote work and relocation. Actively open to AI / agentic-engineering roles.
- Contact: email hariharanjoga445@gmail.com · GitHub github.com/Hariharanjoga · LinkedIn linkedin.com/in/joga-hariharan-6616872a3

## Experience (newest first)
1. AI SDE Intern — Excelerate Technologies (Feb 2026 – Present): Building agentic AI systems with LangGraph, LangChain & CrewAI for autonomous task orchestration; building and deploying custom LLMs with real-time voice integration (LiveKit) and driving them to production.
2. Founding AI Engineer — Campus Cortex AI (Jun 2025 – Jan 2026): Architected a cloud-native, multi-tenant SaaS platform with a polyglot backend (PostgreSQL, Pinecone, MongoDB); engineered Gemini-driven multimodal AI grading and hallucination-free RAG tutoring; orchestrated production-grade async pipelines (Flask-APScheduler, Docker, Cloudflare R2).
3. SDE Intern / Founding Engineer — Soven Developer (Dec 2024 – Mar 2025): Built Generative AI solutions with OpenAI API and Azure OpenAI; architected a Flask backend; integrated GPT-4o Vision API, reducing processing latency by 35%.
4. AI & ML Intern — Infosys Springboard (Oct 2024 – Dec 2024): Engineered a Random-Forest fraud-detection model at 98% accuracy under Agile; built batch + single-record pipelines improving detection efficiency by 35%.

## Projects
- Bhumi — Real-Time Voice AI for Agriculture (LiveKit, WebRTC, Azure OpenAI, Redis, Python): a sub-800ms multilingual voice agent that helps farmers troubleshoot crop issues and calculate localized fertilizer dosages over standard phone calls. Overlapped LLM text generation with audio synthesis via LiveKit; added a Redis semantic caching layer to bypass 100–300ms vector-DB lookups for repetitive seasonal queries; built a deterministic Python routing layer for complex regional math (bigha/gunta) to prevent dangerous hallucinations. This is his strongest / proudest project.
- Autonomous AI CMO (PraisonAI, LiteLLM, Flask, PostgreSQL, SSE): a multi-agent competitive-intelligence system (Researcher, Writer, QA agents) that autonomously researches B2B rivals on the live web and triangulates hidden enterprise pricing; real-time agent-transparency UX using Server-Sent Events streaming ChatGPT-style "thinking-step" cards to the frontend.
- Real-Time Agentic AI Engine (LangGraph, CrewAI, Node.js, Azure OpenAI): low-latency, multi-turn conversational AI to power live voice assistants; robust prompt-engineering pipeline with grounding and state management.
- Campus Cortex AI / Edu Tech AI (GPT-4 Turbo, React.js, MongoDB, Gemini): a Generative AI edtech app improving user interaction by 40%; mock-test creation with auto-generated questions and real-time handwritten-answer evaluation.
- Financial Doc Summarization & Risk Analysis Tool (Python, RAG, Flask, OpenAI text-embedding-3, GPT-4 Turbo): summarizes compliance files, SEC filings and financial statements; performs document-based risk scoring and portfolio risk analysis.

## Skills
- Languages: Python, C++, JavaScript, SQL, C, R. Strong DSA — 500+ problems solved on LeetCode/CodeChef.
- Agentic AI: LangChain, LangGraph, CrewAI, PraisonAI, LiteLLM, Vapi, LiveKit, Vector Databases, RAG.
- LLM / ML: Azure OpenAI, OpenAI API, Gemini, GPT-4o / GPT-4 Turbo, embeddings, NLP, information retrieval, feature engineering, supervised & unsupervised ML.
- Web / Backend: MERN (MongoDB, Express.js, React.js, Node.js), Flask.
- Data / Infra: PostgreSQL, MongoDB, Pinecone, Redis, Docker, AWS, GCP, Cloudflare R2.
- Tools: GitHub, Figma, Power BI.

## Achievements & certifications
- SIH 2024 Finalist (top 5 among 400+ teams). Designathon Finalist (top 10 among 500+). TS EAMCET rank: top 0.4% of all candidates.
- Certifications: Generative AI Applied LLM badges (AI principles, prompt design, LLMs, generative & responsible AI); LiveKit "Building Voice Agents" course (taught by the LiveKit founders); NPTEL C++.
- Leadership: Chairperson — Krithomedh technical club (VNRVJIET, Aug 2024 – Aug 2025); Associate President — Street Cause VNRVJIET, a student-run NGO (Jul 2024 – Jul 2025).
`;
