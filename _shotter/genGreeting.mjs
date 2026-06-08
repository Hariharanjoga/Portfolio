import fs from 'fs';
const text = "Hi! I'm Hariharan's AI assistant. Ask me anything about his projects, experience, agentic and voice-AI work, or whether he's a fit for your role.";
const r = await fetch('http://localhost:3000/api/tts', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text }),
});
if (!r.ok) { console.log('TTS failed', r.status, (await r.text()).slice(0, 200)); process.exit(1); }
const buf = Buffer.from(await r.arrayBuffer());
const out = 'c:/Users/Hariharan/Desktop/Portfolio/hariharan-portfolio/public/greeting.mp3';
fs.writeFileSync(out, buf);
console.log('wrote', out, buf.length, 'bytes');
