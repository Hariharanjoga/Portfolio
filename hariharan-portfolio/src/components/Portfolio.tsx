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
      <div class="hero-tag"><span class="blink"></span> SYSTEM ONLINE · AGENTIC + VOICE AI</div>
      <h1>I build AI that<br><span class="glitch">talks back</span>.</h1>
      <p class="role">> <b>Hariharan Joga</b> · <span class="typed" id="typed"></span></p>
      <p class="lede">AI engineer building agentic systems and real-time voice AI — multi-agent pipelines and sub-second voice agents that ship to production. Currently building agentic AI at Excelerate Technologies.</p>
      <div class="cta-row">
        <a href="#projects" class="btn primary" data-hot>▸ View Work</a>
        <button type="button" class="btn talk" id="talk-cta" data-hot>🎤 Talk to my AI</button>
        <a href="#contact" class="btn ghost" data-hot>Establish Contact</a>
      </div>

      <div class="stat-row">
        <div class="stat"><div class="num">5<span>+</span></div><div class="lbl">Years building</div></div>
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
    <h2 class="section-title reveal">Engineer of agents & voice AI.</h2>
    <div class="about-grid">
      <div class="panel reveal">
        <div class="term-line"><span class="pmt">hari@deck:~$</span> cat about.md</div>
        <p style="color:#b9c4d4;font-size:15px">
          I'm Hariharan Joga — an AI engineer who lives at the frontier of agentic systems and
          real-time voice AI. I build autonomous multi-agent pipelines (LangGraph, CrewAI, LangChain)
          and sub-second voice agents (LiveKit, WebRTC) that actually run in production — not just notebooks.
        </p>
        <p style="color:#8c98aa;font-size:14px;margin-top:14px">
          From Bhumi — a multilingual farming voice assistant answering over normal phone calls — to an
          autonomous AI marketing officer that researches rivals on the live web, I love turning frontier
          AI into products that ship. SIH'24 finalist, 500+ DSA problems solved, and always shipping the next thing.
        </p>
      </div>
      <div class="pillars">
        <div class="pillar reveal"><h4><i>◧</i> Agentic AI</h4><p>Multi-agent orchestration with LangGraph, CrewAI & LangChain — systems that plan, act, and ship autonomously.</p></div>
        <div class="pillar reveal"><h4><i>◨</i> Real-Time Voice AI</h4><p>Sub-second voice agents (LiveKit, WebRTC) with semantic caching — natural conversation over real phone calls.</p></div>
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
        <h3>AI CMO</h3><p>Autonomous multi-agent marketing officer (Researcher · Writer · QA) that researches B2B rivals on the live web and streams its "thinking" to the UI via SSE.</p>
        <div class="tags"><span class="tag">PraisonAI</span><span class="tag">Multi-Agent</span><span class="tag">Flask</span><span class="tag">SSE</span></div></a>
      <a class="card reveal" href="https://github.com/Hariharanjoga" target="_blank" rel="noopener" data-hot><div class="topline"><span class="num">PRJ_03</span><span class="arrow">↗</span></div>
        <h3>Agentic AI Engine</h3><p>Low-latency, multi-turn conversational AI for live voice assistants — LangGraph state management + a grounded Azure OpenAI prompt pipeline.</p>
        <div class="tags"><span class="tag">LangGraph</span><span class="tag">CrewAI</span><span class="tag">Node.js</span></div></a>
      <a class="card reveal" href="https://campuscortexai.software" target="_blank" rel="noopener" data-live="https://campuscortexai.software" data-title="Campus Cortex AI" data-hot><div class="topline"><span class="num">PRJ_04</span><span class="arrow">↗</span></div>
        <h3>Campus Cortex AI</h3><p>Multi-tenant edtech SaaS with Gemini multimodal grading + hallucination-free RAG tutoring; auto mock-tests and real-time handwritten-answer evaluation.</p>
        <div class="tags"><span class="tag">Gemini</span><span class="tag">RAG</span><span class="tag">React</span><span class="tag">MongoDB</span></div></a>
      <a class="card reveal" href="https://github.com/Hariharanjoga" target="_blank" rel="noopener" data-hot><div class="topline"><span class="num">PRJ_05</span><span class="arrow">↗</span></div>
        <h3>Financial Risk Analyzer</h3><p>Summarizes SEC filings & compliance docs and scores document/portfolio risk with GPT-4 Turbo + text-embedding-3 retrieval.</p>
        <div class="tags"><span class="tag">RAG</span><span class="tag">Flask</span><span class="tag">OpenAI</span></div></a>
      <a class="card reveal" href="https://github.com/Hariharanjoga" target="_blank" rel="noopener" data-hot><div class="topline"><span class="num">PRJ_06</span><span class="arrow">↗</span></div>
        <h3>Fraud Detection Engine</h3><p>Random-Forest fraud detector at 98% accuracy with batch + single-record pipelines, boosting detection efficiency 35%.</p>
        <div class="tags"><span class="tag">ML</span><span class="tag">Random Forest</span><span class="tag">Python</span></div></a>
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
        <div class="tl-item reveal" data-role="Founding AI Engineer" data-org="Campus Cortex AI" data-when="Jun 2025 — Jan 2026" data-tech="PostgreSQL,Pinecone,Gemini,Docker"><div class="when">JUN 2025 — JAN 2026</div><h4>Founding AI Engineer</h4>
          <div class="org">Campus Cortex AI</div>
          <p>Architected a multi-tenant SaaS on a polyglot backend (Postgres, Pinecone, Mongo) with Gemini multimodal grading + hallucination-free RAG tutoring and async pipelines (Docker, Cloudflare R2).</p></div>
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
          <div class="stat-tile"><div class="n" data-to="5" data-suf="+">0</div><div class="l">Years building</div></div>
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
    <div class="stack-3d reveal">
      <div class="stage" id="techStage">
        <div class="tech-ring" id="techRing"></div>
        <div class="ribbon-tilt"><div class="tech-ribbon-ring" id="ribbonRing"></div></div>
      </div>
      <div class="edge l"></div><div class="edge r"></div>
    </div>
    <div class="stack-hint">↺ drag to spin · hover a logo for its name</div>

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
  </section>

  <!-- CONTACT -->
  <section id="contact">
    <div class="eyebrow"><span class="idx">05</span> // establish contact</div>
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
  const words=['Agentic AI','Voice AI','LangGraph & CrewAI','RAG Systems','LLM Engineering'];
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
    {n:'Go to contact',k:'05',h:'#contact'},{n:'Copy email',k:'✉',h:'copy'},
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
  let greeted=false,busy=false,voiceOn=false,history=[],genId=0,currentAbort=null;

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
    suggestions.forEach(s=>{const c=document.createElement('button');c.type='button';c.className='chip-q';c.textContent=s;
      c.onclick=()=>send(s);chips.appendChild(c);});
  }
  function send(text,opts){
    if(!text.trim())return;
    bargeIn();                                  // cancel any in-flight turn + stop all audio (no overlap, ever)
    const myGen=genId; busy=true; chips.innerHTML='';
    addMsg('me',text).textContent=text;
    const prior=history.slice();history.push({role:'user',content:text});
    const willSpeak=!!(voiceOn||(opts&&opts.spoken));
    const ctrl=new AbortController(); currentAbort=ctrl;
    const t=typingBubble();
    let bubble=null,acc='',spokenUpto=0;
    const ensure=()=>{ if(!bubble){t.remove();bubble=addMsg('bot','');} return bubble; };
    // speak complete sentences as they stream → voice starts on sentence 1, not the whole answer
    function flushSpeech(final){
      if(!willSpeak||myGen!==genId)return;
      let lastB=-1;
      for(let j=spokenUpto;j<acc.length;j++){const c=acc[j];if(c==='.'||c==='!'||c==='?'||c==='\n')lastB=j;}
      if(lastB>=spokenUpto){ const chunk=acc.slice(spokenUpto,lastB+1).trim(); if(chunk.length>1)speakChunk(chunk,myGen); spokenUpto=lastB+1; }
      if(final){ const tail=acc.slice(spokenUpto).trim(); if(tail.length>1)speakChunk(tail,myGen); spokenUpto=acc.length; }
    }
    // No canned answers — if the model can't be reached, show an honest error (never fake facts).
    const fallback=()=>{ if(myGen!==genId)return; const b=ensure();
      b.innerHTML="⚠ I couldn't reach my AI just now — please try again in a moment, or email <b>hariharanjoga445@gmail.com</b>.";
      busy=false;renderChips(); };
    const finishLive=()=>{ if(myGen!==genId)return; busy=false;renderChips();const said=acc.trim();
      history.push({role:'assistant',content:said}); flushSpeech(true); };
    // stream the live answer from the NVIDIA-backed /api/chat, word-by-word as it's generated
    fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({question:text,history:prior}),signal:ctrl.signal})
      .then(r=>{
        if(!r.ok||!r.body) throw 0;
        const reader=r.body.getReader(),dec=new TextDecoder();
        (function pump(){ reader.read().then(function(res){
          if(myGen!==genId)return;                 // superseded by a newer question → stop silently
          if(res.done){ acc.trim()?finishLive():fallback(); return; }
          acc+=dec.decode(res.value,{stream:true});
          ensure().textContent=acc; body.scrollTop=body.scrollHeight;
          flushSpeech(false);
          pump();
        }).catch(function(){ if(myGen!==genId)return; acc.trim()?finishLive():fallback(); }); })();
      })
      .catch(()=>{ if(myGen!==genId)return; fallback(); });
  }
  function openChat(prefill,opts){
    opts=opts||{};
    chat.classList.add('open');scrim.classList.add('open');
    if(prefill){greeted=true;setTimeout(()=>send(prefill),420);return;}
    if(!greeted){greeted=true;
      speakGreeting(opts.afterGreet);                 // speak instantly (static file) — no 480ms wait
      const t=typingBubble();
      setTimeout(()=>{t.remove();const b=addMsg('bot','');stream(b,GREETING,renderChips);},480);
    }else{setTimeout(()=>input.focus(),420);if(opts.afterGreet)opts.afterGreet();}
  }
  function closeChat(){chat.classList.remove('open');scrim.classList.remove('open');stopConvo();}
  window.__openChat=openChat;

  document.getElementById('ask-fab').addEventListener('click',()=>openChat());
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
  function bargeIn(){ if(currentAbort){try{currentAbort.abort();}catch(_){}currentAbort=null;} genId++; stopSpeak(); ttsChain=Promise.resolve(); busy=false; }
  function speakChunk(text,gen){
    if(!text||!text.trim()||gen!==genId)return;
    const p=fetch('/api/tts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:text})})
      .then(r=>r.ok?r.blob():null).catch(()=>null);
    ttsChain=ttsChain.then(()=>p).then(blob=>new Promise(res=>{
      if(gen!==genId||!blob){res();return;}              // a newer turn started → skip this audio
      const url=URL.createObjectURL(blob);const a=new Audio(url);curAudio=a;
      a.onended=()=>{URL.revokeObjectURL(url);if(curAudio===a)curAudio=null;res();};
      a.onerror=()=>{URL.revokeObjectURL(url);if(curAudio===a)curAudio=null;res();};
      a.play().catch(()=>res());
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
  function openSTTSocket(){
    fetch('/api/stt-token').then(r=>r.ok?r.json():null).then(j=>{
      const token=j&&j.token;
      if(!convo)return;
      if(!token){ console.warn('[voice] no STT token'); if(input)input.placeholder='Voice unavailable — tap mic to retry'; return; }
      const fmt=PCM_FMT[convoSR]||'pcm_16000';
      const url='wss://api.elevenlabs.io/v1/speech-to-text/realtime?model_id=scribe_v2_realtime&audio_format='+fmt
        +'&commit_strategy=vad&vad_silence_threshold_secs=0.6&vad_threshold=0.5&min_speech_duration_ms=250&token='+encodeURIComponent(token);
      const ws=new WebSocket(url); convoWS=ws;
      ws.onopen=()=>{ wsTries=0; console.log('[voice] STT socket open ('+fmt+')'); };
      ws.onmessage=(ev)=>{ let m; try{m=JSON.parse(ev.data);}catch(_){return;}
        if(m.message_type==='committed_transcript'||m.message_type==='committed_transcript_with_timestamps'){
          const q=(m.text||'').trim(); console.log('[voice] transcript:',q);
          if(q&&convo&&q.replace(/[^a-zA-Z0-9]/g,'').length>=2){ send(q,{spoken:true}); }
        } };
      ws.onerror=()=>{ console.warn('[voice] STT socket error'); };
      ws.onclose=(e)=>{ console.log('[voice] STT socket closed',e&&e.code); if(ws!==convoWS)return; convoWS=null;
        if(convo){ if(wsTries++<4){ setTimeout(openSTTSocket,500); } else { if(input)input.placeholder='Voice dropped — tap mic to retry'; stopConvo(); } } };
    }).catch((err)=>{ console.warn('[voice] token fetch failed',err); if(convo&&wsTries++<4)setTimeout(openSTTSocket,700); });
  }
  async function startConvo(){
    if(convo||!canRecord)return;
    try{ convoStream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true}}); }
    catch(_){ if(input){input.placeholder='Mic blocked — allow access';setTimeout(()=>setMic('off'),2600);} return; }
    const AC=window.AudioContext||window.webkitAudioContext;
    convoCtx=new AC({sampleRate:16000});
    try{ if(convoCtx.state==='suspended')await convoCtx.resume(); }catch(_){}
    convoSR=convoCtx.sampleRate;
    console.log('[voice] convo start · ctx',convoCtx.state,'· sr',convoSR);
    convo=true; wsTries=0; setMic('listen');
    const srcN=convoCtx.createMediaStreamSource(convoStream);
    convoProc=convoCtx.createScriptProcessor(2048,1,1);
    convoMute=convoCtx.createGain(); convoMute.gain.value=0;
    srcN.connect(convoProc); convoProc.connect(convoMute); convoMute.connect(convoCtx.destination);
    const BARGE=0.10, BARGE_MS=200, GATE=0.025, HANG=500;  // barge level · sustain · speech-gate level · hangover
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
        if(rms>GATE){ gateOpen=true; lastLoud=now; }
        else if(gateOpen&&now-lastLoud>HANG){ gateOpen=false; }
        sendReal=gateOpen;
      }
      const pcm=new Int16Array(f32.length);
      if(sendReal){ for(let i=0;i<f32.length;i++){ let v=f32[i]; v=v<-1?-1:v>1?1:v; pcm[i]=v<0?v*0x8000:v*0x7FFF; } }
      convoWS.send(JSON.stringify({message_type:'input_audio_chunk',audio_base_64:toB64(new Uint8Array(pcm.buffer)),sample_rate:convoSR}));
    };
    openSTTSocket();
  }
  function stopConvo(){
    convo=false; wsTries=99;
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

  // voice entry points — talk straight from the landing page (open chat, then start recording)
  // open chat (greeting plays) AND start listening immediately — the conversation does not
  // depend on the greeting's 'ended' event (that was unreliable). While the greeting plays we
  // send keepalive silence, so it's neither transcribed nor cut off.
  function voiceStart(){ openChat(); if(canRecord)startConvo(); }
  const heroMic=document.getElementById('askpanel-mic'),talkCta=document.getElementById('talk-cta');
  if(heroMic){ if(canRecord)heroMic.addEventListener('click',voiceStart); else heroMic.style.display='none'; }
  if(talkCta)talkCta.addEventListener('click',voiceStart);
})();

/* ---------- nav scroll-spy (lights the active item's style) ---------- */
(function(){
  const links=[...document.querySelectorAll('nav a[href^="#"]')];
  const map={};links.forEach(a=>map[a.getAttribute('href').slice(1)]=a);
  const io=new IntersectionObserver(es=>{
    es.forEach(e=>{if(e.isIntersecting){
      links.forEach(l=>l.classList.remove('active'));
      const a=map[e.target.id];if(a)a.classList.add('active');
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
  (function frame(){
    if(!dragging){vel*=0.94; spin+=(hotCount>0?auto*0.12:auto)+vel;}   // outer ring slows while a logo is hovered
    cRX+=(tRX-cRX)*0.08; cRY+=(tRY-cRY)*0.08;                            // smooth-follow the pointer
    if(stage)stage.style.transform='scale(1.28) rotateX('+cRX+'deg) rotateY('+cRY+'deg)';  // zoomed up
    for(const o of cards){
      const a=o.offset+spin;
      const target=o.hot?o.scl*1.22:o.scl;
      o.cur+=(target-o.cur)*0.16;
      o.el.style.transform='rotateY('+a+'deg) translateZ('+o.R+'px) translateY('+o.y+'px) scale('+o.cur+')';
    }
    requestAnimationFrame(frame);
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
