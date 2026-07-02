// @ts-nocheck
/* eslint-disable */
'use client';
import { useEffect, useRef } from 'react';

const MARKUP = `<!-- background -->
<canvas id="particles"></canvas>
<div class="bg-grid"></div>
<div class="bg-glow"></div>
<div class="bg-scan"></div>
<div class="vignette"></div>

<!-- custom cursor -->
<div class="cursor" id="cur"></div>
<div class="cursor-dot" id="curd"></div>

<!-- boot -->
<div id="boot">
  <div class="boot-ring"></div>
  <div id="boot-log">booting command-deck…</div>
  <div class="boot-bar"><i></i></div>
</div>

<!-- HUD top bar -->
<header>
  <a href="#hero" class="brand">
    <span class="mark">H</span>
    HARIHARAN<small>// command-deck</small>
  </a>
  <nav>
    <a href="#about">whoami</a>
    <a href="#projects">projects</a>
    <a href="#experience">experience</a>
    <a href="#stack">stack</a>
    <a href="#contact">contact</a>
  </nav>
  <div class="hud-right">
    <span class="clock" id="clock">--:--:--</span>
    <span class="live"><span class="dot"></span> LIVE</span>
    <span class="kbd" id="openpal">⌘K</span>
  </div>
</header>

<main>
  <!-- HERO -->
  <section id="hero">
    <div>
      <div class="hero-tag"><span class="blink"></span> SYSTEM ONLINE · AGENTIC · GENERATIVE · VOICE AI</div>
      <h1>I build AI that<br><span class="glitch">thinks &amp; talks back.</span></h1>
      <p class="role">> <b>Hariharan Joga</b> · <span class="typed" id="typed"></span></p>
      <p class="lede">AI engineer building agentic &amp; generative AI — multi-agent architectures, voice &amp; chat agents, and LLM systems that ship to production. Currently building agentic AI at Excelerate Technologies.</p>
      <div class="cta-row">
        <a href="#projects" class="btn primary" data-hot>▸ View Work</a>
        <button type="button" class="btn talk" id="talk-cta" data-hot>🎤 Talk to my AI</button>
        <a href="#contact" class="btn ghost" data-hot>Establish Contact</a>
      </div>

      <div class="stat-row">
        <div class="stat"><div class="num">3<span>+</span></div><div class="lbl">Years building</div></div>
        <div class="stat"><div class="num">20<span>+</span></div><div class="lbl">Shipped projects</div></div>
        <div class="stat"><div class="num">40<span>%</span></div><div class="lbl">Latency cut</div></div>
      </div>
    </div>

    <div class="hero-right">
      <div class="panel monitor" data-hot>
        <div class="head"><span>SYS_MONITOR</span><span class="id" id="uptime">uptime 99.98%</span></div>
        <div class="mon-row">
          <div class="gauges">
            <div class="gauge"><div class="top"><span>NEURAL_LOAD</span><b id="g1v">—</b></div><div class="track"><i id="g1"></i></div></div>
            <div class="gauge"><div class="top"><span>THROUGHPUT</span><b id="g2v">—</b></div><div class="track"><i id="g2"></i></div></div>
            <div class="gauge"><div class="top"><span>CAFFEINE</span><b id="g3v">—</b></div><div class="track"><i id="g3"></i></div></div>
          </div>
          <div class="radar"></div>
        </div>
        <div class="wave" id="wave"></div>
        <div class="head"><span>STATUS</span><span class="id" style="color:var(--green)">● shipping</span></div>
      </div>

      <div class="panel askpanel" data-hot>
        <div class="ah"><b><i></i> Ask my AI</b><span class="on">● NEURAL_LINK ONLINE</span></div>
        <form id="askpanel-form">
          <input id="askpanel-input" placeholder="Ask anything about me…" autocomplete="off" />
          <button type="submit" class="go">ASK ↵</button>
          <button type="button" class="speak" id="askpanel-mic" title="Ask by voice">🎤 Speak</button>
        </form>
        <div class="qs" id="hero-qs">
          <button class="q" type="button" data-q="Is he a fit for an AI / agentic-engineering role?">Is he a fit for an AI / agentic role?</button>
          <button class="q" type="button" data-q="What's his strongest project?">What's his strongest project?</button>
          <button class="q" type="button" data-q="Tell me about his voice-AI work">Tell me about his voice-AI work</button>
          <button class="q" type="button" data-q="How do I reach him?">How do I reach him?</button>
        </div>
      </div>
    </div>
  </section>

  <!-- ABOUT -->
  <section id="about">
    <div class="eyebrow"><span class="idx">01</span> // whoami</div>
    <h2 class="section-title reveal">Engineer of agentic, generative & voice AI.</h2>
    <div class="about-grid">
      <div class="panel reveal">
        <div class="term-line"><span class="pmt">hari@deck:~$</span> cat about.md</div>
        <p style="color:#b9c4d4;font-size:15px">
          I'm Hariharan Joga — an AI engineer who lives at the frontier of agentic, generative, and
          real-time voice AI. I design autonomous multi-agent architectures (LangGraph, CrewAI, PraisonAI),
          generative-AI products, and sub-second voice &amp; chat agents (LiveKit, Twilio) that actually run in production — not just notebooks.
        </p>
        <p style="color:#8c98aa;font-size:14px;margin-top:14px">
          From Bhumi — a multilingual farming voice assistant answering over normal phone calls — to an
          autonomous AI marketing officer that researches rivals on the live web, I love turning frontier
          AI into products that ship. SIH'24 finalist, 500+ DSA problems solved, and always shipping the next thing.
        </p>
      </div>
      <div class="pillars">
        <div class="pillar reveal"><h4><i>◧</i> Agentic & Multi-Agent</h4><p>Multi-agent architectures with LangGraph, CrewAI & PraisonAI — planner / researcher / writer / QA crews that plan, act, and ship autonomously.</p></div>
        <div class="pillar reveal"><h4><i>◨</i> Generative & Voice AI</h4><p>Generative-AI products plus sub-second voice & WhatsApp agents (LiveKit, Twilio) — natural conversation over calls and chat.</p></div>
        <div class="pillar reveal"><h4><i>◩</i> Backend & Infra</h4><p>Polyglot backends — Python/Flask, Node, Postgres, Pinecone, Redis, Docker, AWS/GCP, async pipelines.</p></div>
      </div>
    </div>
  </section>

  <!-- PROJECTS -->
  <section id="projects">
    <div class="eyebrow"><span class="idx">02</span> // selected work</div>
    <h2 class="section-title reveal">Things I've shipped.</h2>
    <div class="proj-grid">
      <a class="card reveal" href="https://github.com/Hariharanjoga" target="_blank" rel="noopener" data-hot><div class="topline"><span class="num">PRJ_01</span><span class="arrow">↗</span></div>
        <h3>Bhumi</h3><p>Sub-800ms multilingual voice AI for farmers — crop troubleshooting & fertilizer dosage over a normal phone call, with Redis semantic caching to skip vector lookups.</p>
        <div class="tags"><span class="tag">LiveKit</span><span class="tag">WebRTC</span><span class="tag">Azure OpenAI</span><span class="tag">Redis</span></div></a>
      <a class="card reveal" href="https://github.com/Hariharanjoga" target="_blank" rel="noopener" data-hot><div class="topline"><span class="num">PRJ_02</span><span class="arrow">↗</span></div>
        <h3>Agentic AI Engine</h3><p>Low-latency, multi-turn conversational AI powering both live voice assistants and WhatsApp chatbots (Twilio) — LangGraph state management + a grounded Azure OpenAI prompt pipeline.</p>
        <div class="tags"><span class="tag">LangGraph</span><span class="tag">Twilio</span><span class="tag">WhatsApp</span><span class="tag">Azure OpenAI</span></div></a>
      <a class="card reveal" href="https://campuscortexai.software" target="_blank" rel="noopener" data-live="https://campuscortexai.software" data-title="Campus Cortex AI" data-hot><div class="topline"><span class="num">PRJ_03</span><span class="arrow">↗</span></div>
        <h3>Campus Cortex AI</h3><p>Multi-tenant edtech SaaS with Gemini multimodal grading + hallucination-free RAG tutoring; auto mock-tests and real-time handwritten-answer evaluation.</p>
        <div class="tags"><span class="tag">Gemini</span><span class="tag">RAG</span><span class="tag">React</span><span class="tag">MongoDB</span></div></a>
      <a class="card reveal" href="https://github.com/Hariharanjoga" target="_blank" rel="noopener" data-hot><div class="topline"><span class="num">PRJ_04</span><span class="arrow">↗</span></div>
        <h3>AI CMO</h3><p>Autonomous multi-agent marketing officer (Researcher · Writer · QA) that researches B2B rivals on the live web and streams its "thinking" to the UI via SSE.</p>
        <div class="tags"><span class="tag">PraisonAI</span><span class="tag">Multi-Agent</span><span class="tag">Flask</span><span class="tag">SSE</span></div></a>
      <a class="card reveal" href="https://github.com/Hariharanjoga" target="_blank" rel="noopener" data-hot><div class="topline"><span class="num">PRJ_05</span><span class="arrow">↗</span></div>
        <h3>Edu Tech AI</h3><p>Generative-AI study app (GPT-4 Turbo + Gemini) that lifted user interaction 40% — auto-generates mock tests and evaluates handwritten answers in real time.</p>
        <div class="tags"><span class="tag">GPT-4 Turbo</span><span class="tag">Gemini</span><span class="tag">React</span><span class="tag">MongoDB</span></div></a>
      <a class="card reveal" href="https://github.com/Hariharanjoga" target="_blank" rel="noopener" data-hot><div class="topline"><span class="num">PRJ_06</span><span class="arrow">↗</span></div>
        <h3>Financial Risk Analyzer</h3><p>Summarizes SEC filings & compliance docs and scores document/portfolio risk with GPT-4 Turbo + text-embedding-3 retrieval.</p>
        <div class="tags"><span class="tag">RAG</span><span class="tag">Flask</span><span class="tag">OpenAI</span></div></a>
    </div>
  </section>

  <!-- EXPERIENCE -->
  <section id="experience">
    <div class="eyebrow"><span class="idx">03</span> // career.log</div>
    <h2 class="section-title reveal">Where I've been.</h2>
    <div class="exp-grid">
      <div class="timeline">
        <div class="tl-item reveal" data-role="AI SDE Intern" data-org="Excelerate Technologies" data-when="Feb 2026 — Present" data-tech="LangGraph,LangChain,CrewAI,LiveKit"><div class="when">FEB 2026 — PRESENT</div><h4>AI SDE Intern</h4>
          <div class="org">Excelerate Technologies</div>
          <p>Building agentic AI with LangGraph, LangChain & CrewAI for autonomous task orchestration; deploying custom LLMs with real-time LiveKit voice to production.</p></div>
        <div class="tl-item reveal" data-role="Founding AI Engineer" data-org="Campus Cortex AI" data-when="Jun 2025 — Jan 2026" data-tech="PostgreSQL,Pinecone,Gemini,Twilio,WhatsApp"><div class="when">JUN 2025 — JAN 2026</div><h4>Founding AI Engineer</h4>
          <div class="org">Campus Cortex AI</div>
          <p>Architected a multi-tenant SaaS on a polyglot backend (Postgres, Pinecone, Mongo) with Gemini multimodal grading + hallucination-free RAG tutoring; built multi-turn WhatsApp conversational AI via Twilio; orchestrated async pipelines (Docker, Cloudflare R2).</p></div>
        <div class="tl-item reveal" data-role="SDE Intern · Founding Engineer" data-org="Soven Developer" data-when="Dec 2024 — Mar 2025" data-tech="OpenAI,Azure,Flask,GPT-4o"><div class="when">DEC 2024 — MAR 2025</div><h4>SDE Intern · Founding Engineer</h4>
          <div class="org">Soven Developer</div>
          <p>Built Generative AI on OpenAI & Azure OpenAI; architected a Flask backend and integrated GPT-4o Vision, cutting processing latency 35%.</p></div>
        <div class="tl-item reveal" data-role="AI & ML Intern" data-org="Infosys Springboard" data-when="Oct 2024 — Dec 2024" data-tech="Python,Random Forest,ML"><div class="when">OCT 2024 — DEC 2024</div><h4>AI & ML Intern</h4>
          <div class="org">Infosys Springboard</div>
          <p>Engineered a Random-Forest fraud-detection model at 98% accuracy with batch + single-record pipelines, improving detection efficiency 35%.</p></div>
      </div>

      <aside class="panel exp-summary">
        <div class="head"><span>CAREER // SUMMARY</span><span class="id">// 2018 →</span></div>
        <div class="exp-stats">
          <div class="stat-tile"><div class="n" data-to="20" data-suf="+">0</div><div class="l">Projects shipped</div></div>
          <div class="stat-tile"><div class="n" data-to="3" data-suf="+">0</div><div class="l">Years building</div></div>
          <div class="stat-tile"><div class="n" data-to="50" data-suf="k+">0</div><div class="l">Users reached</div></div>
          <div class="stat-tile"><div class="n" data-to="40" data-suf="%">0</div><div class="l">Latency cut</div></div>
        </div>
        <div class="now-divider"></div>
        <div class="now-block" id="now-block">
          <div class="now-h">▸ Now viewing</div>
          <div class="now-role" id="now-role">AI SDE Intern</div>
          <div class="now-org" id="now-org">Excelerate Technologies · Feb 2026 — Present</div>
          <div class="tags" id="now-tags"></div>
        </div>
      </aside>
    </div>
  </section>

  <!-- STACK -->
  <section id="stack">
    <div class="eyebrow"><span class="idx">04</span> // tech.stack</div>
    <h2 class="section-title reveal">Tools of the trade.</h2>

    <div class="skill-cats reveal">
      <div class="skill-cat spec"><div class="sc-key"><i>🤖</i> Agentic AI</div>
        <div class="sc-chips"><span class="skill-chip">LangGraph</span><span class="skill-chip">LangChain</span><span class="skill-chip">CrewAI</span><span class="skill-chip">PraisonAI</span><span class="skill-chip">LiteLLM</span><span class="skill-chip">RAG</span><span class="skill-chip">Vector DBs</span></div></div>
      <div class="skill-cat spec"><div class="sc-key"><i>🎙️</i> Voice AI</div>
        <div class="sc-chips"><span class="skill-chip">LiveKit</span><span class="skill-chip">Vapi</span><span class="skill-chip">WebRTC</span><span class="skill-chip">Streaming STT / TTS</span></div></div>
      <div class="skill-cat"><div class="sc-key"><i>🧠</i> LLMs / ML</div>
        <div class="sc-chips"><span class="skill-chip">Azure OpenAI</span><span class="skill-chip">OpenAI</span><span class="skill-chip">Gemini</span><span class="skill-chip">GPT-4o</span><span class="skill-chip">Embeddings</span><span class="skill-chip">NLP</span></div></div>
      <div class="skill-cat"><div class="sc-key"><i>⚙️</i> Backend</div>
        <div class="sc-chips"><span class="skill-chip">Python</span><span class="skill-chip">Flask</span><span class="skill-chip">Node.js</span><span class="skill-chip">Express</span></div></div>
      <div class="skill-cat"><div class="sc-key"><i>🗄️</i> Data</div>
        <div class="sc-chips"><span class="skill-chip">PostgreSQL</span><span class="skill-chip">MongoDB</span><span class="skill-chip">Pinecone</span><span class="skill-chip">Redis</span></div></div>
      <div class="skill-cat"><div class="sc-key"><i>☁️</i> Cloud & DevOps</div>
        <div class="sc-chips"><span class="skill-chip">Docker</span><span class="skill-chip">AWS</span><span class="skill-chip">GCP</span><span class="skill-chip">Cloudflare R2</span></div></div>
      <div class="skill-cat"><div class="sc-key"><i>💻</i> Languages</div>
        <div class="sc-chips"><span class="skill-chip">Python</span><span class="skill-chip">C++</span><span class="skill-chip">JavaScript</span><span class="skill-chip">SQL</span><span class="skill-chip">C</span><span class="skill-chip">R</span></div></div>
    </div>

    <div class="stack-3d reveal">
      <div class="stage" id="techStage">
        <div class="tech-ring" id="techRing"></div>
        <div class="ribbon-tilt"><div class="tech-ribbon-ring" id="ribbonRing"></div></div>
      </div>
      <div class="edge l"></div><div class="edge r"></div>
    </div>
    <div class="stack-hint">↺ drag to spin · hover a logo for its name</div>
  </section>

  <!-- FIELD REPORTS (testimonials) -->
  <!-- NOTE: names are real (provided by Hariharan); quote wording is drafted — confirm each person is happy with it. -->
  <section id="reports">
    <div class="eyebrow"><span class="idx">05</span> // field reports</div>
    <h2 class="section-title reveal">What others say.</h2>
    <div class="reports-grid">
      <figure class="panel quote-card reveal" data-hot>
        <div class="qr-head"><span class="qr-mark">&#10078;</span><span class="qr-sig">// transmission_01</span></div>
        <blockquote>As our founding AI engineer, he took Campus Cortex from concept to a multi-tenant platform in production — the RAG tutoring and Gemini grading he built are the core of the product.</blockquote>
        <figcaption><span class="qr-name">Bhavani</span><span class="qr-role">Founder · Campus Cortex AI</span></figcaption>
      </figure>
      <figure class="panel quote-card reveal" data-hot>
        <div class="qr-head"><span class="qr-mark">&#10078;</span><span class="qr-sig">// transmission_02</span></div>
        <blockquote>He ships voice agents that actually feel real-time. Sub-second latency on a live phone call is hard, and he made it look routine.</blockquote>
        <figcaption><span class="qr-name">Sanath</span><span class="qr-role">Mentor</span></figcaption>
      </figure>
      <figure class="panel quote-card reveal" data-hot>
        <div class="qr-head"><span class="qr-mark">&#10078;</span><span class="qr-sig">// transmission_03</span></div>
        <blockquote>He built our Generative-AI features end to end — integrated GPT-4o Vision and shipped a production Flask backend faster than I'd expect from anyone, let alone an intern.</blockquote>
        <figcaption><span class="qr-name">Aakarsh Sharma</span><span class="qr-role">Founder · Soven Developer</span></figcaption>
      </figure>
    </div>
  </section>

  <!-- CREDENTIALS (achievements + certifications) -->
  <section id="credentials">
    <div class="eyebrow"><span class="idx">06</span> // clearance &amp; commendations</div>
    <h2 class="section-title reveal">Proof of work.</h2>
    <div class="cred-grid">
      <div class="panel cred-col reveal">
        <div class="head"><span>ACHIEVEMENTS</span><span class="id">// commendations</span></div>
        <ul class="cred-list">
          <li><span class="cred-ic">★</span><div><b>SIH 2024 Finalist</b><span>Top 5 of 400+ teams · Smart India Hackathon</span></div></li>
          <li><span class="cred-ic">★</span><div><b>Designathon Finalist</b><span>Top 10 of 500+ teams</span></div></li>
          <li><span class="cred-ic">★</span><div><b>TS EAMCET — Top 0.4%</b><span>of all candidates statewide</span></div></li>
          <li><span class="cred-ic">⬡</span><div><b>Chairperson — Krithomedh</b><span>Technical club · VNR VJIET</span></div></li>
          <li><span class="cred-ic">⬡</span><div><b>Associate President — Street Cause</b><span>Student-run NGO · VNR VJIET</span></div></li>
        </ul>
      </div>
      <div class="panel cred-col reveal">
        <div class="head"><span>CERTIFICATIONS</span><span class="id">// verified</span></div>
        <ul class="cred-list">
          <li><span class="cred-ic">✓</span><div><b>Building Voice Agents — LiveKit</b><span>Taught by the LiveKit founders</span></div></li>
          <li><span class="cred-ic">✓</span><div><b>Generative AI / Applied LLMs</b><span>AI principles · prompt design · responsible AI</span></div></li>
          <li><span class="cred-ic">✓</span><div><b>NPTEL — C++</b><span>Programming certification</span></div></li>
        </ul>
      </div>
    </div>
  </section>

  <!-- CONTACT -->
  <section id="contact">
    <div class="eyebrow"><span class="idx">07</span> // establish contact</div>
    <h2 class="section-title reveal">Let's build something.</h2>
    <p class="lead reveal">Recruiters, founders, collaborators — if it's interesting and hard, I want to hear about it. Send a transmission, book a call, or grab my email.</p>

    <div class="contact-grid">
      <!-- transmission form (simulated here · POSTs to a Next.js API route on the droplet in the real build) -->
      <form class="panel contact-form reveal" id="contact-form" novalidate>
        <div class="cf-head"><span>▸ NEW_TRANSMISSION</span><span class="cf-id">// secure channel</span></div>
        <div class="cf-row"><label>Handle</label><input name="name" required placeholder="your name" /></div>
        <div class="cf-row"><label>Return channel</label><input name="email" type="email" required placeholder="you@company.com" /></div>
        <div class="cf-row"><label>Message</label><textarea name="message" required rows="4" placeholder="what are you building / hiring for?"></textarea></div>
        <input class="hp" type="text" name="company" tabindex="-1" autocomplete="off" aria-hidden="true" />
        <button type="submit" class="btn primary cf-send" data-hot>▸ TRANSMIT MESSAGE</button>
        <div class="cf-status" id="cf-status"></div>
      </form>

      <!-- side channels -->
      <div class="contact-side reveal">
        <div class="avail"><i></i> Open to AI / Agentic-Engineering roles · replies within 24h</div>

        <div class="panel side-card">
          <div class="sc-label">Direct</div>
          <div class="copy-mail" id="copymail" data-hot>✉ hariharanjoga445@gmail.com <span id="copyhint">[ click to copy ]</span></div>
          <button type="button" class="book-call" data-cal-link="hariharan-joga/15min" data-cal-namespace="15min" data-cal-config='{"layout":"month_view","theme":"dark"}' data-hot><span>📅 Book a 15-min call</span><span>→</span></button>
        </div>

        <div class="panel side-card">
          <div class="sc-label">Channels</div>
          <div class="socials">
            <a href="https://github.com/Hariharanjoga" target="_blank" rel="noopener" data-hot>↳ github</a>
            <a href="https://www.linkedin.com/in/joga-hariharan-6616872a3/" target="_blank" rel="noopener" data-hot>↳ linkedin</a>
            <a href="/resume.pdf" target="_blank" rel="noopener" data-hot>↳ résumé.pdf</a>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <span>© 2026 HARIHARAN JOGA · COMMAND-DECK v1.0</span>
      <span>BUILT WITH ☕ + CURIOSITY · ALL SYSTEMS NOMINAL</span>
    </footer>
  </section>
</main>

<!-- floating ASK AI dock -->
<div class="fab-dock">
  <button class="ask-fab" id="ask-fab"><span class="orb"><i></i></span><span>ASK&nbsp;AI</span></button>
</div>

<!-- app-style bottom tab bar (mobile only · shown ≤880px) -->
<nav class="mobile-tabs" id="mtabs" aria-label="Section navigation">
  <a class="mtab" href="#projects" data-sec="projects"><span class="mt-ic">▤</span><span class="mt-lbl">work</span></a>
  <a class="mtab" href="#experience" data-sec="experience"><span class="mt-ic">◲</span><span class="mt-lbl">career</span></a>
  <button type="button" class="mtab-ask" id="mtab-ask" aria-label="Ask my AI"><span class="ma-orb"><i></i></span><span class="mt-lbl">ask ai</span></button>
  <a class="mtab" href="#stack" data-sec="stack"><span class="mt-ic">⬡</span><span class="mt-lbl">stack</span></a>
  <a class="mtab" href="#contact" data-sec="contact"><span class="mt-ic">✉</span><span class="mt-lbl">contact</span></a>
</nav>

<!-- spotlight overlay: dims the page around the AI-focused section -->
<div id="spotlight"></div>

<!-- voice orb: shown while the chat is hidden during a spoken turn -->
<div id="vorb" aria-hidden="true">
  <div class="vorb-halo"></div>
  <div class="vorb-core"></div>
  <div class="vorb-ring"></div>
  <div class="vorb-stat"><i></i><span>Listening…</span></div>
</div>

<!-- chat drawer (NEURAL_LINK) -->
<div id="chat-scrim"></div>
<aside id="chat">
  <div class="chat-head">
    <div class="av">H</div>
    <div class="meta"><b>ASK HARIHARAN</b><small><i></i> NEURAL_LINK ONLINE</small></div>
    <div class="x" id="chat-close">✕</div>
  </div>
  <div class="chat-tag">// grounded on my résumé + projects · 🎤 voice enabled · <b>powered by NVIDIA</b></div>
  <div class="chat-body" id="chat-body"></div>
  <div class="chips" id="chat-chips"></div>
  <form class="chat-input" id="chat-form">
    <button type="button" class="mic" id="chat-mic" title="Ask by voice">🎤</button>
    <input id="chat-input" placeholder="Type your question…" autocomplete="off" />
    <button type="submit">➤</button>
  </form>
</aside>

<!-- live project preview -->
<div id="live-scrim"></div>
<aside id="live-modal" role="dialog" aria-modal="true" aria-label="Live project preview">
  <div class="live-head">
    <div class="live-dots"><span></span><span></span><span></span></div>
    <div class="live-url"><span class="lock">🔒</span><span id="live-host">—</span><span class="live-badge"><i></i> LIVE</span></div>
    <div class="live-actions">
      <a class="live-act" id="live-open" href="#" target="_blank" rel="noopener" title="Open in new tab">↗</a>
      <button type="button" class="live-act" id="live-close" title="Close">✕</button>
    </div>
  </div>
  <div class="live-body">
    <div class="live-loading" id="live-loading"><div class="boot-ring"></div><span>ESTABLISHING UPLINK…</span></div>
    <iframe id="live-frame" title="Live site preview" referrerpolicy="no-referrer-when-downgrade" allow="clipboard-read; clipboard-write; fullscreen"></iframe>
  </div>
</aside>

<!-- command palette -->
<div id="palette">
  <div class="pal-box">
    <div class="pal-in"><span>⌘</span><input id="palinput" placeholder="type a command or section…" autocomplete="off"/></div>
    <div class="pal-list" id="pallist"></div>
    <div class="pal-foot"><span>↑↓ navigate</span><span>↵ select</span><span>esc close</span></div>
  </div>
</div>`;

export default function Portfolio() {
  const ran = useRef(false);
  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

/* ---------- boot sequence ---------- */
(function(){
  const log=document.getElementById('boot-log');
  const lines=['mounting /command-deck …','loading neural modules …','calibrating HUD overlay …','establishing uplink …','ready.'];
  let i=0;
  const t=setInterval(()=>{log.textContent=lines[i++]; if(i>=lines.length){clearInterval(t);}},340);
  setTimeout(()=>document.getElementById('boot').classList.add('done'),1900);
})();

/* ---------- clock + uptime ---------- */
setInterval(()=>{
  const d=new Date();
  document.getElementById('clock').textContent=d.toLocaleTimeString('en-GB');
},1000);

/* ---------- typed role ---------- */
(function(){
  const el=document.getElementById('typed');
  const words=['Multi-Agent Systems','Generative AI','Voice AI','LangGraph & CrewAI','RAG Pipelines'];
  let w=0,c=0,del=false;
  (function tick(){
    const word=words[w];
    el.textContent=word.slice(0,c);
    if(!del){c++; if(c>word.length){del=true; return setTimeout(tick,1200);}}
    else{c--; if(c<0){del=false;w=(w+1)%words.length;c=0;}}
    setTimeout(tick,del?40:75);
  })();
})();

/* ---------- live gauges ---------- */
(function(){
  const set=(bar,val,id)=>{document.getElementById(bar).style.width=val+'%';document.getElementById(id).textContent=val+'%';};
  function jitter(base,spread){return Math.max(6,Math.min(99,Math.round(base+(Math.random()*spread-spread/2))));}
  function refresh(){set('g1',jitter(72,24),'g1v');set('g2',jitter(58,30),'g2v');set('g3',jitter(91,12),'g3v');}
  refresh();setInterval(refresh,1600);
  // waveform bars
  const wave=document.getElementById('wave');
  for(let i=0;i<28;i++){const b=document.createElement('i');b.style.animationDelay=(i*0.05)+'s';wave.appendChild(b);}
})();

/* ---------- custom cursor ---------- */
(function(){
  const cur=document.getElementById('cur'),dot=document.getElementById('curd');
  let x=window.innerWidth/2,y=window.innerHeight/2,cx=x,cy=y;
  window.addEventListener('mousemove',e=>{
    x=e.clientX;y=e.clientY;dot.style.left=x+'px';dot.style.top=y+'px';
    document.querySelector('.bg-glow').style.setProperty('--mx',(x/window.innerWidth*100)+'%');
    document.querySelector('.bg-glow').style.setProperty('--my',(y/window.innerHeight*100)+'%');
  });
  (function loop(){cx+=(x-cx)*0.18;cy+=(y-cy)*0.18;cur.style.left=cx+'px';cur.style.top=cy+'px';requestAnimationFrame(loop);})();
  document.querySelectorAll('[data-hot],a,nav a,.kbd,.chip,.pillar').forEach(el=>{
    el.addEventListener('mouseenter',()=>cur.classList.add('hot'));
    el.addEventListener('mouseleave',()=>cur.classList.remove('hot'));
  });
})();

/* ---------- particles ---------- */
(function(){
  const cv=document.getElementById('particles'),ctx=cv.getContext('2d');
  let w,h,parts;
  function resize(){w=cv.width=innerWidth;h=cv.height=innerHeight;
    parts=Array.from({length:Math.min(70,Math.floor(w/22))},()=>({
      x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,r:Math.random()*1.6+.4}));}
  resize();addEventListener('resize',resize);
  (function draw(){
    ctx.clearRect(0,0,w,h);
    for(const p of parts){p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,7);ctx.fillStyle='rgba(34,224,255,0.5)';ctx.fill();}
    // links
    for(let i=0;i<parts.length;i++)for(let j=i+1;j<parts.length;j++){
      const a=parts[i],b=parts[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy);
      if(d<120){ctx.strokeStyle='rgba(34,224,255,'+(0.12*(1-d/120))+')';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}
    requestAnimationFrame(draw);
  })();
})();

/* ---------- scroll reveal ---------- */
(function(){
  const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.15});
  document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%4*0.06)+'s';io.observe(el);});
})();

/* ---------- copy email ---------- */
document.getElementById('copymail').addEventListener('click',function(){
  navigator.clipboard&&navigator.clipboard.writeText('hariharanjoga445@gmail.com');
  const h=document.getElementById('copyhint');h.textContent='[ copied ✓ ]';h.style.color='var(--green)';
  setTimeout(()=>{h.textContent='[ click to copy ]';h.style.color='var(--muted-2)';},1600);
});

/* ---------- contact form ----------
   Prototype: simulated submit. Real build: POST to /api/contact (Next.js route
   on the droplet) → emails Hariharan (Resend / nodemailer). Honeypot blocks bots. */
(function(){
  const f=document.getElementById('contact-form');if(!f)return;
  const st=document.getElementById('cf-status');
  f.addEventListener('submit',function(e){
    e.preventDefault();
    if(f.company&&f.company.value)return; // honeypot tripped — silently ignore bot
    if(!f.name.value.trim()||!f.email.value.trim()||!f.message.value.trim()){
      st.style.color='var(--amber)';st.textContent='⚠ fill in all fields to transmit';return;
    }
    const btn=f.querySelector('.cf-send'),orig=btn.textContent;
    btn.textContent='▸ TRANSMITTING…';btn.style.opacity='.7';st.textContent='';
    const done=(ok)=>{btn.textContent=orig;btn.style.opacity='';
      if(ok){st.style.color='var(--green)';st.textContent="✓ MESSAGE TRANSMITTED — I'll reply within 24h";f.reset();}
      else{st.style.color='var(--amber)';st.textContent="⚠ couldn't send — email me at hariharanjoga445@gmail.com";}
      setTimeout(()=>{st.textContent='';},6000);};
    // POST to the Resend-backed /api/contact; on failure, nudge them to email directly
    fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({name:f.name.value,email:f.email.value,message:f.message.value,company:f.company.value})})
      .then(r=>done(r.ok)).catch(()=>done(false));
  });
})();

/* ---------- command palette ---------- */
(function(){
  const pal=document.getElementById('palette'),inp=document.getElementById('palinput'),list=document.getElementById('pallist');
  const cmds=[
    {n:'Ask my AI anything',k:'✦',h:'chat'},
    {n:'Go to whoami',k:'01',h:'#about'},{n:'Go to projects',k:'02',h:'#projects'},
    {n:'Go to experience',k:'03',h:'#experience'},{n:'Go to stack',k:'04',h:'#stack'},
    {n:'Go to field reports',k:'05',h:'#reports'},{n:'Go to credentials',k:'06',h:'#credentials'},
    {n:'Go to contact',k:'07',h:'#contact'},{n:'Copy email',k:'✉',h:'copy'},
    {n:'Open GitHub',k:'↗',h:'#'},{n:'Open LinkedIn',k:'↗',h:'#'},{n:'Download résumé',k:'⤓',h:'#'},
  ];
  let active=0,filtered=cmds;
  function render(){
    list.innerHTML='';
    filtered.forEach((c,i)=>{
      const d=document.createElement('div');d.className='pal-item'+(i===active?' active':'');
      d.innerHTML=`<span>${c.n}</span><span class="k">${c.k}</span>`;
      d.onclick=()=>run(c);list.appendChild(d);
    });
  }
  function run(c){close();if(c.h==='chat'){window.__openChat&&window.__openChat();return;}if(c.h==='copy'){document.getElementById('copymail').click();return;}if(c.h.startsWith('#')&&c.h.length>1){location.hash=c.h;}}
  function open(){pal.classList.add('open');inp.value='';filtered=cmds;active=0;render();setTimeout(()=>inp.focus(),30);}
  function close(){pal.classList.remove('open');}
  inp&&inp.addEventListener('input',()=>{const q=inp.value.toLowerCase();filtered=cmds.filter(c=>c.n.toLowerCase().includes(q));active=0;render();});
  document.addEventListener('keydown',e=>{
    if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();pal.classList.contains('open')?close():open();}
    if(e.key==='Escape')close();
    if(pal.classList.contains('open')){
      if(e.key==='ArrowDown'){e.preventDefault();active=(active+1)%filtered.length;render();}
      if(e.key==='ArrowUp'){e.preventDefault();active=(active-1+filtered.length)%filtered.length;render();}
      if(e.key==='Enter'&&filtered[active]){run(filtered[active]);}
    }
  });
  document.getElementById('openpal').addEventListener('click',open);
  pal.addEventListener('click',e=>{if(e.target===pal)close();});
  window.__openChat=null; // wired below
})();

/* ---------- ASK AI chat (NEURAL_LINK) ----------
   Live: every answer streams from the /api/chat route → NVIDIA NIM (OpenAI-compatible),
   grounded on src/lib/profile.ts injected into the system prompt. No canned answers.
   Keys (NVIDIA_NIM_API_KEY_1/2) stay server-side; the server round-robins + fails over. */
(function(){
  const chat=document.getElementById('chat'),scrim=document.getElementById('chat-scrim'),
        body=document.getElementById('chat-body'),chips=document.getElementById('chat-chips'),
        form=document.getElementById('chat-form'),input=document.getElementById('chat-input');
  let greeted=false,busy=false,voiceOn=false,history=[],genId=0,currentAbort=null,pendingFit=false,awaitingFitRole=false;

  const suggestions=[
    "What's his strongest project?",
    "Is he a fit for an AI / agentic-engineering role?",
    "Tell me about his voice-AI work",
    "How do I reach him?",
  ];

  // Welcome line shown when the chat first opens. This is a UI greeting only —
  // it makes NO factual claims. Every actual answer comes solely from /api/chat (NVIDIA + profile.ts).
  const GREETING="Hi! I'm Hariharan's AI assistant. Ask me anything about his projects, experience, agentic & voice-AI work, or whether he's a fit for your role.";

  function addMsg(who,text){
    const m=document.createElement('div');m.className='msg '+(who==='me'?'me':'bot');
    m.innerHTML=`<div class="ic">${who==='me'?'›':'H'}</div><div class="b"></div>`;
    body.appendChild(m);body.scrollTop=body.scrollHeight;return m.querySelector('.b');
  }
  function typingBubble(){
    const m=document.createElement('div');m.className='msg bot';
    m.innerHTML=`<div class="ic">H</div><div class="b" style="padding:0"><div class="typing"><i></i><i></i><i></i></div></div>`;
    body.appendChild(m);body.scrollTop=body.scrollHeight;return m;
  }
  function stream(el,text,done){
    const words=text.split(' ');let i=0;
    (function tick(){
      el.textContent=(el.textContent?el.textContent+' ':'')+words[i++];
      body.scrollTop=body.scrollHeight;
      if(i<words.length)setTimeout(tick,22+Math.random()*30);else if(done)done();
    })();
  }
  function renderChips(){
    chips.innerHTML='';
    const tog=document.createElement('button');tog.type='button';tog.className='chips-toggle';
    tog.innerHTML='<span>✦ Suggested questions</span><span class="chev">⌄</span>';
    const wrap=document.createElement('div');wrap.className='chips-wrap';
    const fc=document.createElement('button');fc.type='button';fc.className='chip-q';fc.textContent='📋 Am I a fit for your role?';
    fc.onclick=startFitCheck;wrap.appendChild(fc);                                   // JD fit-check entry point
    suggestions.forEach(s=>{const c=document.createElement('button');c.type='button';c.className='chip-q';c.textContent=s;
      c.onclick=()=>send(s);wrap.appendChild(c);});
    tog.onclick=()=>{ const open=wrap.classList.toggle('open'); tog.classList.toggle('open',open); if(open)setTimeout(()=>{body.scrollTop=body.scrollHeight;},130); };
    chips.appendChild(tog);chips.appendChild(wrap);                                  // collapsed by default; click pill to expand, auto-collapses on next reply
  }
  // recruiter pastes a job title/description → the chat returns an honest fit read (see /api/chat mode:'fit')
  function looksLikeJD(t){ t=(t||''); return t.length>180 || /responsibilit|requirement|qualificat|we['’]?re looking for|we are looking for|job descript|about the role|nice to have|must[- ]have/i.test(t); }
  function startFitCheck(){
    pendingFit=true;
    addMsg('bot','').textContent="Sure — paste the role's title or job description and I'll give you an honest fit read.";
    if(input){ input.placeholder='Paste the job title or description…'; input.focus(); }
    body.scrollTop=body.scrollHeight;
  }
  // turn the model's fit text (verdict + ✓/~ items) into a clean, scannable card — even if it ran them inline
  function formatFit(t){
    const esc=s=>(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const clean=s=>esc((s||'').replace(/\s+/g,' ').trim());
    t=(t||'').replace(/\r/g,'');
    const firstM=t.search(/[✓~]/);
    let head=firstM>=0?t.slice(0,firstM):t, rest=firstM>=0?t.slice(firstM):'';
    let footer='';
    const rm=rest.search(/reach him/i); if(rm>=0){ footer=rest.slice(rm); rest=rest.slice(0,rm); }
    const items=[]; const re=/([✓~])\s*([^✓~]+)/g; let m;
    while((m=re.exec(rest))) items.push([m[1]==='✓', m[2]]);
    const lvl=/strong fit/i.test(head)?'strong':/partial/i.test(head)?'partial':/not a/i.test(head)?'no':'';
    let html='';
    if(head.trim()) html+='<div class="fit-verdict '+lvl+'">'+clean(head)+'</div>';
    if(items.length){ html+='<div class="fit-list">';
      for(const it of items){ const d=it[1].match(/^(.*?)\s+[—–-]\s+([\s\S]*)$/); const req=d?d[1]:it[1], desc=d?d[2]:'';  // split only on a spaced dash, so "Multi-agent" stays intact
        html+='<div class="fit-row '+(it[0]?'ok':'gap')+'"><span class="fit-ic">'+(it[0]?'✓':'~')+'</span><span><b>'+clean(req)+'</b>'+(desc.trim()?' — '+clean(desc):'')+'</span></div>'; }
      html+='</div>'; }
    if(items.length) html+='<div class="fit-foot">Reach him → hariharanjoga445@gmail.com</div>';  // always show the contact CTA
    return html||clean(t);
  }
  // ---------- spotlight engine: gently dim the page, keep a bright hole over the focused element ----------
  const DESKTOP=()=>window.matchMedia('(min-width:1024px)').matches;
  const REDUCED=()=>window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  const sp=document.getElementById('spotlight');
  let spotEl=null,spotRaf=0;
  // desktop: add a class that narrows <main> via CSS calc so the page reflows beside the chat (auto-adapts on resize)
  function pushPage(on){ document.body.classList.toggle('chat-push', !!on && DESKTOP()); }
  function placeSpot(){
    if(!spotEl||!sp)return;
    const r=spotEl.getBoundingClientRect();
    const cx=r.left+r.width/2, cy=r.top+r.height/2;
    const rad=Math.min(Math.max(r.width,r.height)/2+75, Math.max(window.innerWidth,window.innerHeight)*0.6);
    sp.style.setProperty('--sx',cx+'px'); sp.style.setProperty('--sy',cy+'px'); sp.style.setProperty('--sr',rad+'px');
  }
  function spotlightOn(el){
    if(!el||!sp)return;
    if(spotEl&&spotEl!==el)spotEl.classList.remove('spot-target');
    spotEl=el; el.classList.add('spot-target');
    placeSpot(); sp.classList.add('on');
  }
  function spotlightOff(){ if(sp)sp.classList.remove('on'); if(spotEl){spotEl.classList.remove('spot-target');spotEl=null;} }
  function trackSpot(){ // follow the target + orb through the scroll / shrink / reopen animations
    let n=0; const step=REDUCED()?60:16, max=REDUCED()?6:40;
    const iv=setInterval(()=>{ placeSpot(); placeOrb(); if(++n>max)clearInterval(iv); }, step);
  }
  window.addEventListener('scroll',()=>{ if(spotEl){ if(spotRaf)cancelAnimationFrame(spotRaf); spotRaf=requestAnimationFrame(()=>{placeSpot();placeOrb();});} },{passive:true});
  window.addEventListener('resize',()=>{ if(!DESKTOP())document.body.classList.remove('chat-push'); if(spotEl)placeSpot(); placeOrb(); },{passive:true});

  // ---------- voice auto-shrink: during a SPOKEN turn, slide the chat away, reveal the orb + spotlight,
  //            let the bot speak, then slide the chat back once the bot is done AND the user is silent ----------
  const vorb=document.getElementById('vorb');
  const vstatEl=vorb&&vorb.querySelector('.vorb-stat span');
  let vActive=false, turnDone=false, ttsPending=0, reopenTimer=0;
  const REOPEN_MS=800;
  // glide the orb into the dim area just below the focused element (or above if there's no room) — never over it
  function placeOrb(){
    if(!vorb)return;
    const vw=window.innerWidth, vh=window.innerHeight, R=(vorb.offsetWidth||150)/2, pad=22, lbl=30;
    const barH=window.matchMedia('(max-width:880px)').matches?78:0;  // keep the orb above the mobile bottom bar
    const floor=vh-barH;
    let ox=vw/2, oy=floor-R-pad-lbl;                               // default: bottom-centre (above the bar on mobile)
    if(spotEl){
      const r=spotEl.getBoundingClientRect();
      if(r.bottom+pad+R*2+lbl < floor) oy=r.bottom+pad+R;         // room below the element → sit under it
      else if(r.top-pad-R > pad) oy=r.top-pad-R;                  // else tuck above it
      else oy=floor-R-pad-lbl;                                    // else fall back to the bottom
      ox=Math.min(Math.max(r.left+r.width/2, R+pad), vw-R-pad);   // centre on the element, clamped on-screen
    }
    vorb.style.setProperty('--ox',ox+'px'); vorb.style.setProperty('--oy',oy+'px');
  }
  function orbState(s){ if(!vorb)return;                                                       // 'listen' | 'think' | 'speak'
    vorb.classList.toggle('speaking',s==='speak'); vorb.classList.toggle('thinking',s==='think');
    if(vstatEl)vstatEl.textContent = s==='speak'?'Speaking…' : s==='think'?'Thinking…' : 'Listening…'; }
  function showOrb(s){ if(vorb)vorb.classList.add('on'); placeOrb(); orbState(s||'listen'); }
  function hideOrb(){ if(vorb)vorb.classList.remove('on'); }
  function chatVisible(v){ chat.classList.toggle('open',v); pushPage(v); if(!DESKTOP()&&!v)scrim.classList.remove('open'); }
  function enterVoiceAnswer(){ clearTimeout(reopenTimer); vActive=true; turnDone=false; chatVisible(false); showOrb('think'); }  // user just spoke → processing
  function voiceSpeaking(){ if(vActive){showOrb('speak');placeOrb();} }                                                          // bot audio started
  function maybeBotDone(){ if(vActive&&turnDone&&ttsPending<=0){ orbState('listen'); clearTimeout(reopenTimer); reopenTimer=setTimeout(reopenChat,REOPEN_MS); } }
  function reopenChat(){ if(!vActive)return; vActive=false; hideOrb(); chatVisible(true); if(spotEl)trackSpot(); body.scrollTop=body.scrollHeight; }
  function userSpeakingNow(){ if(reopenTimer){clearTimeout(reopenTimer);reopenTimer=0;} if(vActive)orbState('listen'); }          // user talks again before reopen → stay closed

  // audio-reactive: route TTS playback through an analyser → drive the orb's --amp in real time
  let ttsCtx=null,ttsAnalyser=null,ampData=null,ampRaf=0;
  function ensureTTSCtx(){ if(ttsCtx)return ttsCtx;
    try{ const AC=window.AudioContext||window.webkitAudioContext; ttsCtx=new AC();
      ttsAnalyser=ttsCtx.createAnalyser(); ttsAnalyser.fftSize=256; ttsAnalyser.smoothingTimeConstant=0.75;
      ttsAnalyser.connect(ttsCtx.destination); ampData=new Uint8Array(ttsAnalyser.frequencyBinCount);
    }catch(_){ ttsCtx=null; } return ttsCtx; }
  function attachAudio(a){ // tap the element into the analyser graph; only reroute if the ctx is genuinely running (else play natively)
    if(!ensureTTSCtx())return false;
    if(ttsCtx.state!=='running'){ try{ttsCtx.resume();}catch(_){} return false; }
    try{ ttsCtx.createMediaElementSource(a).connect(ttsAnalyser); return true; }catch(_){ return false; }
  }
  function ampLoop(){ if(!ttsAnalyser||!vorb){ampRaf=0;return;}
    ttsAnalyser.getByteFrequencyData(ampData);
    let s=0; for(let i=0;i<ampData.length;i++)s+=ampData[i];
    const avg=s/ampData.length/255, amp=1+Math.min(avg*1.7,0.42);
    vorb.style.setProperty('--amp',amp.toFixed(3)); ampRaf=requestAnimationFrame(ampLoop); }
  function startAmp(){ if(!ampRaf&&ttsAnalyser)ampRaf=requestAnimationFrame(ampLoop); }
  function stopAmp(){ if(ampRaf){cancelAnimationFrame(ampRaf);ampRaf=0;} if(vorb)vorb.style.setProperty('--amp','1'); }

  // AI-guided navigation: scroll to + spotlight the section/project the answer is about
  function doFocus(id){
    if(!id||id==='none')return;
    const sec={about:'#about',projects:'#projects',experience:'#experience',skills:'.skill-cats',reports:'#reports',credentials:'#credentials',contact:'#contact'};
    const proj={bhumi:'Bhumi','agentic-engine':'Agentic AI Engine','campus-cortex':'Campus Cortex AI','ai-cmo':'AI CMO','edu-tech':'Edu Tech AI',financial:'Financial Risk Analyzer'};
    let el=null,block='start';
    if(id==='skills')block='center';   // spotlight the categorized skills grid (the photo), not the animation
    if(sec[id])el=document.querySelector(sec[id]);
    else if(proj[id]){ el=[].slice.call(document.querySelectorAll('#projects .card')).find(c=>{const h=c.querySelector('h3');return h&&h.textContent.trim()===proj[id];}); block='center'; }
    if(!el)return;
    try{el.scrollIntoView({behavior:REDUCED()?'auto':'smooth',block:block});}catch(_){el.scrollIntoView();}
    spotlightOn(el); trackSpot();
    el.classList.remove('ai-focus'); void el.offsetWidth; el.classList.add('ai-focus');
    setTimeout(()=>el.classList.remove('ai-focus'),2700);
  }
  function focusFromText(q){
    q=(q||'').toLowerCase();
    if(/bhumi|\bvoice\b|strongest|best project|proudest|favou?rite|phone call|farmer/.test(q))return'bhumi';
    if(/\bcmo\b|marketing|multi-?agent|researcher|agent crew/.test(q))return'ai-cmo';
    if(/whatsapp|twilio|chatbot|conversational/.test(q))return'agentic-engine';
    if(/campus|cortex|edtech|tutor|grading/.test(q))return'campus-cortex';
    if(/edu ?tech|study app|mock test|handwritten/.test(q))return'edu-tech';
    if(/financ|\bsec\b|risk|compliance|filing|\bdocument/.test(q))return'financial';
    if(/testimonial|recommend|reference|review|what.*(say|said)|vouch|feedback/.test(q))return'reports';
    if(/achiev|award|certif|cert\b|finalist|hackathon|\bsih\b|eamcet|leadership|chairperson|accolade|recogni/.test(q))return'credentials';
    if(/contact|email|reach|reach out|get in touch|\btouch\b|\bhire\b|connect|availab|book|booking|schedule|appointment|meeting|\bcall\b|r[ée]sum[ée]|resume|linkedin|github/.test(q))return'contact';
    if(/experience|\brole\b|career|intern|\bjob\b|worked|excelerate|soven|infosys/.test(q))return'experience';
    if(/skill|stack|\btech\b|language|tool|framework|proficien/.test(q))return'skills';
    if(/project|built|portfolio|shipped|\bwork\b/.test(q))return'projects';
    if(/\bwho\b|about (him|himself|hariharan|you)|tell me about|introduce|overview|summary|\bbio\b|background|strength|strong suit|good at|what does he do|why (should i )?hire|stand ?out|elevator pitch/.test(q))return'about';   // general "who is he / strengths / overview" → whoami section
    return null;
  }
  // FIT detectors — voice quick-read + proactive recruiter signals.
  function looksLikeFitIntent(t){ t=(t||'').toLowerCase();
    return /\b(is|would|will|could|can|are)\b[\s\w']{0,18}\b(a |an |good |strong )?fit\b/.test(t)
        || /\bfit for\b|\bgood (fit|match)\b|\bright (fit|person|candidate) for\b|\bsuit(ed|able)? (for|to)\b|\bcan he (do|handle|work as|be a)\b|\bis he right for\b/.test(t); }
  function looksLikeRecruiter(t){ t=(t||'').toLowerCase();
    return /\bwe(?:'re| are)?\s*(hiring|looking for)\b|\b(i'?m|i am)\s*(a\s*)?(recruiter|hiring manager|hiring)\b/.test(t)
        || /\b(hiring|open) (role|position)\b|\bfor (my|our) (team|company|startup|role|position)\b|\bjoin (us|our team)\b|\b(we|i) (need|want) (a|an|someone)\b|\blooking for (a|an|someone)\b/.test(t); }
  function hasRoleWord(t){ t=(t||'').toLowerCase();
    return /\b(engineer|developer|\bdev\b|scientist|manager|\blead\b|intern|analyst|designer|architect|consultant|researcher|sde|swe|backend|frontend|full ?stack|devops|founding|cto|\brole\b|\bposition\b|\bjob\b)\b/.test(t); }
  function hasSkillWord(t){ t=(t||'').toLowerCase();
    return /\b(agentic|multi-?agent|lang ?graph|lang ?chain|crew ?ai|praison|\brag\b|\bllm\b|\bnlp\b|voice|real-?time|generative|gen ?ai|python|node|react|flask|postgres|mongo|pinecone|redis|docker|aws|gcp|azure|\bml\b|machine learning|pipeline|chatbot|automation|kubernetes|ci\/?cd|typescript|\bjava\b|\bgo\b|rust)\b/.test(t); }
  function fitDetailEnough(t){ return looksLikeJD(t) || (hasRoleWord(t)&&hasSkillWord(t)) || (t||'').trim().split(/\s+/).length>=12; }
  // trivial "are you there?" check-in — only meaningful while a turn is already in flight
  function looksLikeAreYouThere(t){ t=(t||'').toLowerCase().trim();
    return /^(hello|hi|hey|yo|hola)\??$/.test(t)
        || /\b(are you (there|here|listening|awake|working|ok)|you (there|here|listening)|still (there|here|with me)|can you hear me|u there)\b/.test(t); }
  function send(text,opts){
    if(!text.trim())return;
    opts=opts||{};
    // Check-in ("you there?") while an answer is still generating → reassure WITHOUT aborting the pending turn
    if(busy && !opts.fit && !pendingFit && looksLikeAreYouThere(text)){
      addMsg('me',text).textContent=text;
      const ln="Still here — just putting that together.";
      addMsg('bot','').textContent=ln;
      if(voiceOn||(opts&&opts.spoken)){ try{ speakChunk(ln,genId); }catch(_){} }
      return;
    }
    let fit=!!(opts.fit||pendingFit||looksLikeJD(text)); pendingFit=false;   // JD fit-check: chip-triggered, flagged, or auto-detected paste
    if(fit&&input&&!convo)input.placeholder='Type your question…';
    bargeIn();                                  // cancel any in-flight turn + stop all audio (no overlap, ever)
    const myGen=genId; busy=true; chips.innerHTML='';
    addMsg('me',text).textContent=text;
    const spoken=!!(voiceOn||(opts&&opts.spoken));
    // ---- FIT-CHECK: ask for role + must-haves first, then a persuasive read (voice + proactive) ----
    if(awaitingFitRole){                                  // we already asked → this reply is their role/requirements
      awaitingFitRole=false;
      if(looksLikeJD(text)) fit=true;
      else if(hasRoleWord(text)||hasSkillWord(text)||!focusFromText(text)) opts=Object.assign({},opts,{fitVoice:true});
      // else (clearly a different-topic question) → fall through to a normal answer
    } else if(!fit && (looksLikeFitIntent(text)||looksLikeRecruiter(text))){
      if(fitDetailEnough(text)){ if(looksLikeJD(text)) fit=true; else opts=Object.assign({},opts,{fitVoice:true}); }  // role + a requirement (or full JD) → read now
      else {                                              // not enough → ask 1–2 questions + offer the JD
        const ask="Sure — what's the role, and one or two must-have skills? Or if you've got the full job description, paste it here and I'll give a detailed point-by-point breakdown.";
        addMsg('bot','').textContent=ask;
        if(spoken){ try{ speakChunk(ask,myGen); }catch(_){} }
        awaitingFitRole=true; busy=false; renderChips(); turnDone=true; maybeBotDone();
        return;
      }
    }
    const fitVoice=!!opts.fitVoice;
    try{ const f=(fit||fitVoice)?'skills':focusFromText(text); if(f)doFocus(f); }catch(_){}   // fit/fit-voice → show his stack; else scroll to the relevant section
    const prior=history.slice();history.push({role:'user',content:text});
    const willSpeak=!!(voiceOn||(opts&&opts.spoken));
    if((fit||fitVoice)&&willSpeak){ const fills=["Good question — let me pull that together.","One sec, weighing that up.","Let me think on that for a moment.","Alright, sizing that up now."]; try{ speakChunk(fills[Math.floor(Math.random()*fills.length)],myGen); }catch(_){} }   // filler so there's no dead air while the slower fit model thinks
    const ctrl=new AbortController(); currentAbort=ctrl;
    const t=typingBubble();
    let bubble=null,acc='',spokenUpto=0,firstSpoken=true;
    const ensure=()=>{ if(!bubble){t.remove();bubble=addMsg('bot','');} return bubble; };
    const sayClean=s=>s
      .replace(/\[(.*?)\]\([^)]*\)/g,'$1')                          // markdown links → label text
      .replace(/\bhttps?:\/\/\S+/gi,'the link on screen')          // only FULL urls are unreadable aloud
      .replace(/([A-Za-z0-9._%+-]+)@([A-Za-z0-9.-]+)/g,'$1 at $2') // email: speak "@" as "at" ('.com' stays in-chunk → reads "dot com")
      .replace(/((?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z.]*\s*)?(\d{4})\s*[–—-]\s*(present|current|now|(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z.]*\s*\d{4})/gi,'$1$2 to $3') // date ranges: "Feb 2026 – Present" → "Feb 2026 to Present"
      .replace(/\s*→\s*/g,' onward ')                              // "2018 →" → "2018 onward"
      .replace(/[*_`#>]/g,'').replace(/^\s*[-•]\s+/gm,'')          // strip markdown marks / bullets
      .replace(/\s{2,}/g,' ').trim();
    // speak as it streams; the FIRST chunk fires on the first clause (comma) for a fast start, then full sentences
    function flushSpeech(final){
      if(!willSpeak||myGen!==genId)return;
      if(fitVoice&&!final)return;   // fit verdict is short → speak the WHOLE thing once at the end (no chunk gaps / cutoff)
      // '.', '!' or '?' ends a sentence only when followed by whitespace/end — so domains & emails
      // like "gmail.com" / "cal.com" stay in ONE chunk (fixes the detached "com").
      const isEnd=(j)=>{ const c=acc[j]; if(c==='\n')return true;
        if(c==='.'||c==='!'||c==='?'){ const n=acc[j+1]; return n===undefined?!!final:/\s/.test(n); }
        return false; };
      let lastB=-1;
      for(let j=spokenUpto;j<acc.length;j++){
        if(isEnd(j)){ lastB=j; if(firstSpoken)break; }
        else if(firstSpoken&&acc[j]===','&&(j-spokenUpto)>=12){ lastB=j; break; }   // first audio: break on the first clause for a fast start
      }
      if(lastB>=spokenUpto){ const chunk=sayClean(acc.slice(spokenUpto,lastB+1)); if(chunk.length>1){speakChunk(chunk,myGen);firstSpoken=false;} spokenUpto=lastB+1; }
      if(final){ const tail=sayClean(acc.slice(spokenUpto)); if(tail.length>1)speakChunk(tail,myGen); spokenUpto=acc.length; }
    }
    // No canned answers — if the model can't be reached, show an honest error (never fake facts).
    const fallback=()=>{ if(myGen!==genId)return; const b=ensure();
      b.innerHTML="⚠ I couldn't reach my AI just now — please try again in a moment, or email <b>hariharanjoga445@gmail.com</b>.";
      busy=false;renderChips(); turnDone=true; maybeBotDone(); };                   // error → reopen the chat so the message is read
    const finishLive=()=>{ if(myGen!==genId)return; busy=false;renderChips();const said=acc.trim();
      if(fit)ensure().innerHTML=formatFit(acc);                                      // final formatted fit card
      history.push({role:'assistant',content:said}); turnDone=true; flushSpeech(true); maybeBotDone(); };  // turn fully streamed → arm reopen once audio drains
    // stream the live answer from the NVIDIA-backed /api/chat, word-by-word as it's generated
    fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({question:text,history:prior,mode:fitVoice?'fit_voice':(fit?'fit':(spoken?'voice':undefined))}),signal:ctrl.signal})
      .then(r=>{
        if(!r.ok||!r.body) throw 0;
        const reader=r.body.getReader(),dec=new TextDecoder();
        (function pump(){ reader.read().then(function(res){
          if(myGen!==genId)return;                 // superseded by a newer question → stop silently
          if(res.done){ acc.trim()?finishLive():fallback(); return; }
          acc+=dec.decode(res.value,{stream:true});
          if(fit)ensure().innerHTML=formatFit(acc);else ensure().textContent=acc;   // fit → formatted card, else plain streaming
          body.scrollTop=body.scrollHeight; flushSpeech(false);
          pump();
        }).catch(function(){ if(myGen!==genId)return; acc.trim()?finishLive():fallback(); }); })();
      })
      .catch(()=>{ if(myGen!==genId)return; fallback(); });
  }
  function openChat(prefill,opts){
    opts=opts||{};
    chat.classList.add('open');
    document.body.classList.add('chat-open');                      // hides the mobile bottom bar while chatting
    if(DESKTOP())pushPage(true); else scrim.classList.add('open'); // desktop shrinks the page to fit; mobile dims it
    if(prefill){greeted=true;setTimeout(()=>send(prefill),420);return;}
    if(!greeted){greeted=true;
      speakGreeting(opts.afterGreet);                 // speak instantly (static file) — no 480ms wait
      const t=typingBubble();
      setTimeout(()=>{t.remove();const b=addMsg('bot','');stream(b,GREETING,renderChips);},480);
    }else{setTimeout(()=>input.focus(),420);if(opts.afterGreet)opts.afterGreet();}
  }
  function closeChat(){chat.classList.remove('open');document.body.classList.remove('chat-open');scrim.classList.remove('open');pushPage(false);spotlightOff();stopConvo();}
  window.__openChat=openChat;

  document.getElementById('ask-fab').addEventListener('click',()=>openChat());
  const mAsk=document.getElementById('mtab-ask'); if(mAsk)mAsk.addEventListener('click',()=>openChat());   // mobile bottom-bar centre orb
  document.getElementById('chat-close').addEventListener('click',closeChat);
  scrim.addEventListener('click',closeChat);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeChat();});
  form.addEventListener('submit',e=>{e.preventDefault();const v=input.value;input.value='';send(v);});

  /* ---------- voice I/O — ElevenLabs Scribe (STT) + Flash v2.5 (TTS), browser fallback ----------
     STT: mic → MediaRecorder → /api/stt. TTS: /api/tts → <audio>. Falls back to Web Speech if keyless. */
  const micBtn=document.getElementById('chat-mic');
  let voices=[];
  function loadVoices(){if('speechSynthesis'in window)voices=speechSynthesis.getVoices();}
  if('speechSynthesis'in window){loadVoices();speechSynthesis.onvoiceschanged=loadVoices;}
  function pickVoice(){
    return voices.find(v=>/(Natural|Neural|Online)/i.test(v.name)&&/^en/i.test(v.lang))
        || voices.find(v=>/Google (US|UK) English/i.test(v.name))
        || voices.find(v=>/(Samantha|Ava|Allison|Aria|Jenny|Libby|Sonia|Guy)/i.test(v.name))
        || voices.find(v=>v.lang==='en-US')
        || voices.find(v=>/^en/i.test(v.lang)) || null;
  }
  let curAudio=null;
  function stopSpeak(){ if(curAudio){try{curAudio.pause();}catch(_){}curAudio=null;} if('speechSynthesis'in window)speechSynthesis.cancel(); }
  function browserSpeak(text){ if(!('speechSynthesis'in window))return; const u=new SpeechSynthesisUtterance(text);u.rate=1;u.pitch=1;const v=pickVoice();if(v)u.voice=v;speechSynthesis.speak(u); }
  // premium TTS via ElevenLabs Flash v2.5; browser speech is the keyless fallback.
  // Sentences are FETCHED in parallel but PLAYED in order, so audio starts ~1 sentence in.
  let ttsChain=Promise.resolve();
  // barge-in: cancel any in-flight chat fetch, stop all audio, and bump the generation so
  // stale streamed text / queued TTS from the old turn can never play over a new one.
  function bargeIn(){ if(currentAbort){try{currentAbort.abort();}catch(_){}currentAbort=null;} genId++; stopSpeak(); ttsChain=Promise.resolve(); busy=false; ttsPending=0; stopAmp(); }
  function speakChunk(text,gen){
    if(!text||!text.trim()||gen!==genId)return;
    ttsPending++;                                        // track in-flight audio so we know when the bot is fully done
    const p=fetch('/api/tts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:text})})
      .then(r=>r.ok?r.blob():null).catch(()=>null);
    ttsChain=ttsChain.then(()=>p).then(blob=>new Promise(res=>{
      if(gen!==genId||!blob){ ttsPending--; maybeBotDone(); res(); return; }   // a newer turn started → skip this audio
      const url=URL.createObjectURL(blob);const a=new Audio(url);curAudio=a;
      if(vActive){ attachAudio(a); voiceSpeaking(); startAmp(); }              // voice mode → orb reacts to the live audio
      const fin=()=>{ URL.revokeObjectURL(url); if(curAudio===a)curAudio=null; ttsPending--; if(ttsPending<=0)stopAmp(); maybeBotDone(); res(); };
      a.onended=fin; a.onerror=fin;
      a.play().catch(fin);
    }));
  }
  // greeting voice is a pre-baked static file (public/greeting.mp3) → preloaded on page load,
  // so it plays instantly with no API call or cold-start.
  let greetEl=null;
  try{ greetEl=new Audio('/greeting.mp3'); greetEl.preload='auto'; greetEl.load(); }catch(_){}
  function speakGreeting(onDone){
    stopSpeak();
    const done=()=>{ if(onDone)onDone(); };
    if(greetEl){ const a=greetEl; curAudio=a; try{a.currentTime=0;}catch(_){}
      a.onended=()=>{ if(curAudio===a)curAudio=null; done(); };
      a.onerror=()=>{ if(curAudio===a)curAudio=null; browserSpeak(GREETING); done(); };
      a.play().catch(()=>{ browserSpeak(GREETING); done(); });
    } else { browserSpeak(GREETING); done(); }
  }

  // continuous voice conversation via ElevenLabs realtime streaming STT (WebSocket).
  // Audio streams to ElevenLabs as you speak, so the transcript is ready the instant you stop —
  // no batch-upload wait. Server-side VAD commits each utterance; talk over the bot to interrupt.
  const canRecord=!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&(window.AudioContext||window.webkitAudioContext)&&window.WebSocket);
  let convo=false,convoStream=null,convoCtx=null,convoProc=null,convoMute=null,convoWS=null,convoSR=16000,wsTries=0;
  function setMic(state){ // 'off' | 'listen' | 'busy'
    if(micBtn)micBtn.classList.toggle('listening',state==='listen');
    if(input)input.placeholder = state==='busy'?'Thinking…' : state==='listen'?'Listening… just talk (tap mic to stop)':'Type your question…';
  }
  const PCM_FMT={8000:'pcm_8000',16000:'pcm_16000',22050:'pcm_22050',24000:'pcm_24000',44100:'pcm_44100',48000:'pcm_48000'};
  function toB64(bytes){ let s='',CH=0x8000; for(let i=0;i<bytes.length;i+=CH)s+=String.fromCharCode.apply(null,bytes.subarray(i,i+CH)); return btoa(s); }
  // The STT socket idle-closes during every bot reply / silent pause. A reconnect that re-mints a
  // single-use token + re-handshakes is slow (~2-6s) — a dead window where the next question is LOST.
  // Fix: keep a "warm" pre-minted token ready, so reconnects are near-instant and no question is dropped.
  let warmTokenP=null;
  function freshTokenP(){ return fetch('/api/stt-token').then(r=>r.ok?r.json():null).then(j=>(j&&j.token)||null).catch(()=>null); }
  function prefetchToken(){ if(!warmTokenP)warmTokenP=freshTokenP(); }
  function openSTTSocket(){
    const tp=warmTokenP||freshTokenP(); warmTokenP=null;            // consume the pre-minted token if we have one
    tp.then(token=>{
      if(!convo)return;
      if(!token){ if(wsTries++<4){ setTimeout(openSTTSocket,200); } else if(input){ input.placeholder='Voice unavailable — tap mic to retry'; } return; }
      const fmt=PCM_FMT[convoSR]||'pcm_16000';
      const url='wss://api.elevenlabs.io/v1/speech-to-text/realtime?model_id=scribe_v2_realtime&audio_format='+fmt
        +'&commit_strategy=vad&vad_silence_threshold_secs=1.3&vad_threshold=0.5&min_speech_duration_ms=250&token='+encodeURIComponent(token);   // (A) 1.3s silence before committing → you can pause mid-sentence without being cut off (was 0.6s)
      const ws=new WebSocket(url); convoWS=ws;
      ws.onopen=()=>{ wsTries=0; prefetchToken(); console.log('[voice] STT socket open ('+fmt+')'); };   // pre-mint the next token now
      ws.onmessage=(ev)=>{ let m; try{m=JSON.parse(ev.data);}catch(_){return;}
        if(m.message_type==='committed_transcript'||m.message_type==='committed_transcript_with_timestamps'){
          const q=(m.text||'').trim(); console.log('[voice] transcript:',q);
          if(q&&convo&&q.replace(/[\s\p{P}\p{S}]/gu,'').length>=2){ enterVoiceAnswer(); send(q,{spoken:true}); prefetchToken(); } // slide chat away + orb, then answer aloud
        } };
      ws.onerror=()=>{ console.warn('[voice] STT socket error'); };
      ws.onclose=(e)=>{ console.log('[voice] STT socket closed',e&&e.code); if(ws!==convoWS)return; convoWS=null;
        if(convo){ if(wsTries++<4){ setTimeout(openSTTSocket,150); } else { if(input)input.placeholder='Voice dropped — tap mic to retry'; stopConvo(); } } };
    });
  }
  async function startConvo(){
    if(convo||!canRecord)return false;
    ensureTTSCtx(); try{ttsCtx&&ttsCtx.resume();}catch(_){}   // warm the playback ctx on this gesture so orb audio-reactivity is unlocked
    try{ convoStream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true}}); }
    catch(_){ if(input){input.placeholder='Mic blocked — allow access';setTimeout(()=>setMic('off'),2600);} return false; }
    const AC=window.AudioContext||window.webkitAudioContext;
    try{ convoCtx=new AC({sampleRate:16000}); }catch(_){ try{convoCtx=new AC();}catch(__){ if(input)input.placeholder='Audio unavailable'; return false; } }
    try{ await convoCtx.resume(); }catch(_){}
    if(convoCtx.state!=='running'){ const rsm=()=>{ try{convoCtx&&convoCtx.resume();}catch(_){}}; document.addEventListener('pointerdown',rsm,{once:true}); } // safety: resume on next tap if still suspended
    convoSR=convoCtx.sampleRate;
    console.log('[voice] convo start · ctx',convoCtx.state,'· sr',convoSR);
    convo=true; wsTries=0; setMic('listen');
    const srcN=convoCtx.createMediaStreamSource(convoStream);
    convoProc=convoCtx.createScriptProcessor(2048,1,1);
    convoMute=convoCtx.createGain(); convoMute.gain.value=0;
    srcN.connect(convoProc); convoProc.connect(convoMute); convoMute.connect(convoCtx.destination);
    const BARGE=0.065, BARGE_MS=140, GATE=0.025, HANG=1000;  // barge level · sustain · speech-gate level · hangover. (B) 1000ms hangover keeps your audio streaming through mid-sentence pauses so no fake silence is sent (gate still only OPENS on real speech, so noise stays blocked)
    let gateOpen=false,lastLoud=0,bargeStart=0;
    convoProc.onaudioprocess=(e)=>{
      if(!convo||!convoWS||convoWS.readyState!==1)return;
      const f32=e.inputBuffer.getChannelData(0);
      let s=0; for(let i=0;i<f32.length;i++)s+=f32[i]*f32[i];
      const rms=Math.sqrt(s/f32.length), now=performance.now();
      let botTalking=!!curAudio;
      if(botTalking){ // only a clearly-loud voice SUSTAINED past BARGE_MS interrupts the bot — stops echo/noise cutting it off
        if(rms>BARGE){ if(!bargeStart)bargeStart=now; else if(now-bargeStart>BARGE_MS){ bargeIn(); setMic('listen'); botTalking=false; bargeStart=0; } }
        else bargeStart=0;
      } else bargeStart=0;
      // loudness gate: stream real audio only once your voice clears the gate (hangover bridges word gaps).
      // Low background noise stays below the gate → we send silence → it's never transcribed.
      let sendReal=false;
      if(!botTalking){
        if(rms>GATE){ if(!gateOpen)userSpeakingNow(); gateOpen=true; lastLoud=now; }  // rising edge → user is talking again, hold the chat closed
        else if(gateOpen&&now-lastLoud>HANG){ gateOpen=false; }
        sendReal=gateOpen;
      }
      const pcm=new Int16Array(f32.length);
      if(sendReal){ for(let i=0;i<f32.length;i++){ let v=f32[i]; v=v<-1?-1:v>1?1:v; pcm[i]=v<0?v*0x8000:v*0x7FFF; } }
      convoWS.send(JSON.stringify({message_type:'input_audio_chunk',audio_base_64:toB64(new Uint8Array(pcm.buffer)),sample_rate:convoSR}));
    };
    openSTTSocket();
    return true;
  }
  function stopConvo(){
    convo=false; wsTries=99;
    vActive=false; clearTimeout(reopenTimer); reopenTimer=0; hideOrb(); stopAmp();   // tear down the voice-shrink UI
    if(convoProc){try{convoProc.onaudioprocess=null;convoProc.disconnect();}catch(_){}convoProc=null;}
    if(convoMute){try{convoMute.disconnect();}catch(_){}convoMute=null;}
    if(convoCtx){try{convoCtx.close();}catch(_){}convoCtx=null;}
    if(convoWS){try{convoWS.onclose=null;convoWS.close();}catch(_){}convoWS=null;}
    if(convoStream){convoStream.getTracks().forEach(t=>t.stop());convoStream=null;}
    bargeIn(); setMic('off');
  }
  if(canRecord&&micBtn){ micBtn.addEventListener('click',()=>{ convo?stopConvo():startConvo(); }); }
  else if(micBtn){ micBtn.style.display='none'; } // no streaming support → hide mic, keep typing

  // hero ask panel: input + clickable starter questions (asked & answered in the drawer)
  const apf=document.getElementById('askpanel-form'),api=document.getElementById('askpanel-input');
  if(apf)apf.addEventListener('submit',e=>{e.preventDefault();const v=api.value.trim();api.value='';openChat(v||null);});
  const cur=document.getElementById('cur');
  document.querySelectorAll('#hero-qs .q').forEach(b=>{
    b.addEventListener('click',()=>openChat(b.dataset.q));
    b.addEventListener('mouseenter',()=>cur&&cur.classList.add('hot'));
    b.addEventListener('mouseleave',()=>cur&&cur.classList.remove('hot'));
  });

  // voice entry points — talk straight from the landing page.
  // ORDER MATTERS: greet on the CLICK gesture (synchronously) so the audio is unlocked instantly
  // and stays unlocked for the whole session (this "media engagement" is what lets later reply TTS
  // play without a fresh click). The mic permission is requested in PARALLEL — when granted it
  // listens; while the greeting plays we stream keepalive silence so it's neither cut nor transcribed.
  function voiceStart(){ openChat(); if(canRecord)startConvo(); }
  const heroMic=document.getElementById('askpanel-mic'),talkCta=document.getElementById('talk-cta');
  if(heroMic){ if(canRecord)heroMic.addEventListener('click',voiceStart); else heroMic.style.display='none'; }
  if(talkCta)talkCta.addEventListener('click',voiceStart);
})();

/* ---------- nav scroll-spy (lights the active item's style) ---------- */
(function(){
  const links=[...document.querySelectorAll('header nav a[href^="#"]')];
  const map={};links.forEach(a=>map[a.getAttribute('href').slice(1)]=a);
  const mtabs=[...document.querySelectorAll('.mtab[href^="#"]')];          // mobile bottom-bar tabs
  const mmap={};mtabs.forEach(a=>mmap[a.getAttribute('href').slice(1)]=a);
  const io=new IntersectionObserver(es=>{
    es.forEach(e=>{if(e.isIntersecting){
      links.forEach(l=>l.classList.remove('active'));
      const a=map[e.target.id];if(a)a.classList.add('active');
      mtabs.forEach(l=>l.classList.remove('active'));
      const b=mmap[e.target.id];if(b)b.classList.add('active');            // light the matching bottom tab in sync
    }});
  },{rootMargin:'-45% 0px -50% 0px'});
  ['about','projects','experience','stack','contact'].forEach(id=>{const s=document.getElementById(id);if(s)io.observe(s);});
})();

/* ---------- experience: count-up stats + scroll-synced 'now viewing' ---------- */
(function(){
  const sec=document.getElementById('experience');if(!sec)return;
  // animate the stat counters once the section scrolls into view
  const nums=[...sec.querySelectorAll('.stat-tile .n')];let counted=false;
  new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting&&!counted){counted=true;
    nums.forEach(n=>{const to=+n.dataset.to,suf=n.dataset.suf||'';let c=0;const step=Math.max(1,Math.ceil(to/28));
      const t=setInterval(()=>{c+=step;if(c>=to){c=to;clearInterval(t);}n.innerHTML=c+(suf?'<span>'+suf+'</span>':'');},30);});
  }});},{threshold:.3}).observe(sec);

  // update the 'now viewing' block to the role currently in view
  const items=[...sec.querySelectorAll('.tl-item')];
  const role=document.getElementById('now-role'),org=document.getElementById('now-org'),
        tags=document.getElementById('now-tags'),block=document.getElementById('now-block');
  function set(it){
    items.forEach(i=>i.classList.toggle('active',i===it));
    role.textContent=it.dataset.role;org.textContent=it.dataset.org+' · '+it.dataset.when;
    tags.innerHTML='';(it.dataset.tech||'').split(',').forEach(t=>{t=t.trim();if(!t)return;
      const s=document.createElement('span');s.className='tag';s.textContent=t;tags.appendChild(s);});
    block.classList.remove('flash');void block.offsetWidth;block.classList.add('flash');
  }
  const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)set(e.target);});},
    {rootMargin:'-40% 0px -50% 0px'});
  items.forEach(i=>io.observe(i));
  if(items[0])set(items[0]);
})();

/* ---------- stack: tilted 3D logo ring · real logos · drag-spin · hover one to freeze+name ---------- */
(function(){
  const ring=document.getElementById('techRing');if(!ring)return;
  const root=ring.closest('.stack-3d');
  const DI='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/';   // real brand logos (CDN)
  // [name, fallback-monogram, logo URL]
  const techs=[
    ['Python','Py',DI+'python/python-original.svg'],
    ['JavaScript','JS',DI+'javascript/javascript-original.svg'],
    ['React','Re',DI+'react/react-original.svg'],
    ['Node.js','No',DI+'nodejs/nodejs-original.svg'],
    ['Flask','Fl',DI+'flask/flask-original.svg'],
    ['LangChain','LC','https://cdn.simpleicons.org/langchain'],
    ['LangGraph','LG','https://cdn.simpleicons.org/langgraph'],
    ['CrewAI','Cr','https://cdn.simpleicons.org/crewai'],
    ['LiveKit','LK','https://cdn.simpleicons.org/livekit'],
    ['OpenAI','AI','https://cdn.simpleicons.org/openai'],
    ['Azure','Az',DI+'azure/azure-original.svg'],
    ['MongoDB','Mo',DI+'mongodb/mongodb-original.svg'],
    ['PostgreSQL','PG',DI+'postgresql/postgresql-original.svg'],
    ['Pinecone','Pc','https://cdn.simpleicons.org/pinecone'],
    ['Redis','Rd',DI+'redis/redis-original.svg'],
    ['Docker','Dk',DI+'docker/docker-original.svg'],
    ['AWS','AWS',DI+'amazonwebservices/amazonwebservices-original-wordmark.svg'],
    ['GCP','GC',DI+'googlecloud/googlecloud-original.svg']];
  const grads=['linear-gradient(135deg,#22e0ff,#1aa9ff)','linear-gradient(135deg,#b06bff,#7c4dff)',
    'linear-gradient(135deg,#39e6a0,#10b981)','linear-gradient(135deg,#ffc24b,#ff8a3d)','linear-gradient(135deg,#ff5cc8,#ff4d6d)'];
  const N=techs.length, step=360/N, R0=250;
  const rnd=(a,b)=>a+Math.random()*(b-a);
  const stage=document.getElementById('techStage');
  let spin=0, auto=0.14, vel=0, dragging=false, lastX=0, tRX=0, tRY=0, cRX=0, cRY=0, hotCount=0;
  const cards=techs.map((t,i)=>{
    const el=document.createElement('div');el.className='tech-card';
    const ic=document.createElement('div');ic.className='ic';
    const img=document.createElement('img');img.src=t[2];img.alt=t[0];img.loading='lazy';
    img.onerror=function(){ic.innerHTML='';ic.classList.add('mono');ic.style.background=grads[i%grads.length];ic.textContent=t[1];};
    ic.appendChild(img);
    const nm=document.createElement('div');nm.className='nm';nm.textContent=t[0];
    el.appendChild(ic);el.appendChild(nm);ring.appendChild(el);
    const o={el, offset:i*step, R:R0+rnd(-28,28), y:rnd(-16,16), scl:rnd(0.86,1.14), hot:false, frozen:0, cur:0};
    o.cur=o.scl;
    el.addEventListener('mouseenter',()=>{o.hot=true;hotCount++;el.classList.add('hot');});
    el.addEventListener('mouseleave',()=>{o.hot=false;hotCount=Math.max(0,hotCount-1);el.classList.remove('hot');});
    return o;
  });
  if(root){
    root.addEventListener('pointerdown',e=>{dragging=true;lastX=e.clientX;vel=0;});
    window.addEventListener('pointermove',e=>{if(!dragging)return;const dx=e.clientX-lastX;lastX=e.clientX;spin+=dx*0.32;vel=dx*0.32;});
    window.addEventListener('pointerup',()=>{dragging=false;});
  }
  // cursor parallax — whole carousel tilts toward the pointer (free, all directions)
  window.addEventListener('mousemove',e=>{
    // measure from the CAROUSEL's centre (not the screen centre) → flat when the cursor is level with it
    const r=root?root.getBoundingClientRect():{top:0,left:0,width:innerWidth,height:innerHeight};
    let ny=(e.clientY-(r.top+r.height/2))/(innerHeight*0.5);
    let nx=(e.clientX-(r.left+r.width/2))/(innerWidth*0.5);
    ny=Math.max(-1.2,Math.min(1.2,ny)); nx=Math.max(-1.2,Math.min(1.2,nx));
    tRX=-ny*7;    // up/down movement — noticeable but not wild
    tRY=nx*18;    // cursor left/right → tilt left/right
  });
  let onScreen=true;                                                    // skip the expensive style writes while the stack is off-screen (saves battery/CPU on mobile)
  if(root&&'IntersectionObserver'in window){
    new IntersectionObserver(es=>{ if(es[0])onScreen=es[0].isIntersecting; },{threshold:0}).observe(root);
  }
  (function frame(){
    requestAnimationFrame(frame);                                       // always alive; the work below is gated so restart is never needed
    if(!onScreen)return;                                                // offscreen → skip the 18 transform writes + layout (the costly part)
    if(!dragging){vel*=0.94; spin+=(hotCount>0?auto*0.12:auto)+vel;}   // outer ring slows while a logo is hovered
    cRX+=(tRX-cRX)*0.08; cRY+=(tRY-cRY)*0.08;                            // smooth-follow the pointer
    if(stage)stage.style.transform='scale(1.28) rotateX('+cRX+'deg) rotateY('+cRY+'deg)';  // zoomed up
    for(const o of cards){
      const a=o.offset+spin;
      const target=o.hot?o.scl*1.22:o.scl;
      o.cur+=(target-o.cur)*0.16;
      o.el.style.transform='rotateY('+a+'deg) translateZ('+o.R+'px) translateY('+o.y+'px) scale('+o.cur+')';
    }
  })();

  // inner ribbon: ONE smooth white cylinder band — a tile per character, edge-to-edge (no chunky word-cards)
  const rr=document.getElementById('ribbonRing');
  if(rr){
    const text='HARIHARAN   ✦   TECH STACK   ✦   HARIHARAN   ✦   TECH STACK   ✦   ';
    const chars=Array.from(text), M=chars.length, rStep=360/M, rR=170, w=(2*Math.PI*rR/M)+2;
    chars.forEach((ch,i)=>{
      const s=document.createElement('div');
      s.className='rib-seg'+(ch==='✦'?' sp':'');
      s.textContent=(ch===' '?' ':ch);
      s.style.width=w+'px';s.style.left=(-w/2)+'px';
      s.style.transform='rotateY('+(i*rStep)+'deg) translateZ('+rR+'px)';
      rr.appendChild(s);
    });
  }
})();

/* ---------- live project preview (in-page iframe of the deployed site) ---------- */
(function(){
  const scrim=document.getElementById('live-scrim'),modal=document.getElementById('live-modal'),
        frame=document.getElementById('live-frame'),host=document.getElementById('live-host'),
        openBtn=document.getElementById('live-open'),closeBtn=document.getElementById('live-close'),
        loading=document.getElementById('live-loading');
  if(!modal)return;
  let open=false,fallbackT=null;
  function show(url){
    let h=url; try{h=new URL(url).host;}catch(_){}
    host.textContent=h; openBtn.href=url;
    loading.classList.remove('hide'); frame.classList.remove('ready');
    frame.src=url;
    scrim.classList.add('open'); modal.classList.add('open'); open=true; document.body.style.overflow='hidden';
    clearTimeout(fallbackT); fallbackT=setTimeout(()=>{frame.classList.add('ready');loading.classList.add('hide');},9000);
  }
  function hide(){
    open=false; clearTimeout(fallbackT);
    scrim.classList.remove('open'); modal.classList.remove('open'); document.body.style.overflow='';
    setTimeout(()=>{ if(!open)frame.src='about:blank'; },420);
  }
  frame.addEventListener('load',()=>{ if(frame.src&&frame.src.indexOf('about:blank')===-1){ frame.classList.add('ready'); loading.classList.add('hide'); } });
  closeBtn.addEventListener('click',hide);
  scrim.addEventListener('click',hide);
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&open)hide(); });
  document.querySelectorAll('.card[data-live]').forEach(card=>{
    card.addEventListener('click',e=>{ e.preventDefault(); show(card.getAttribute('data-live')); });
  });
})();

/* ---------- Cal.com embed — in-page booking popup (no redirect) ---------- */
(function (C, A, L) {
  let p = function (a, ar) { a.q.push(ar); };
  let d = C.document;
  C.Cal = C.Cal || function () {
    let cal = C.Cal, ar = arguments;
    if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; }
    if (ar[0] === L) {
      const api = function () { p(api, arguments); };
      const namespace = ar[1];
      api.q = api.q || [];
      if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); }
      else p(cal, ar);
      return;
    }
    p(cal, ar);
  };
})(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", "15min", { origin: "https://cal.com" });
Cal.ns["15min"]("ui", {
  theme: "dark",
  hideEventTypeDetails: false,
  layout: "month_view",
  cssVarsPerTheme: {
    dark: {
      "cal-brand": "#22e0ff",
      "cal-bg": "#05070b",
      "cal-bg-emphasis": "#0c121c",
      "cal-bg-subtle": "#0a0f17",
      "cal-bg-muted": "#0a0f17",
      "cal-border": "rgba(0,229,255,0.18)",
      "cal-border-emphasis": "rgba(0,229,255,0.28)",
      "cal-border-subtle": "rgba(0,229,255,0.10)",
      "cal-text": "#e8f3ff",
      "cal-text-emphasis": "#ffffff",
      "cal-text-muted": "#7d8da4"
    }
  }
});

  }, []);
  return <div dangerouslySetInnerHTML={{ __html: MARKUP }} />;
}
