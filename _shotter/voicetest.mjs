import fs from 'fs';
const BASE = 'http://localhost:3000';
const PHRASE = "Hello, I am Hariharan's AI assistant. This is a voice pipeline test.";

// 1) TTS — ElevenLabs Flash v2.5
const t0 = Date.now();
const tts = await fetch(BASE + '/api/tts', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: PHRASE }),
});
console.log('TTS  ->', tts.status, '|', tts.headers.get('content-type'), '| first-byte', Date.now() - t0, 'ms');
if (!tts.ok) { console.log('TTS body:', (await tts.text()).slice(0, 400)); process.exit(0); }
const buf = Buffer.from(await tts.arrayBuffer());
fs.writeFileSync('tts_out.mp3', buf);
console.log('TTS audio bytes:', buf.length, '(saved tts_out.mp3)');

// 2) STT — feed that audio back into ElevenLabs Scribe; should transcribe ~the phrase
const fd = new FormData();
fd.append('file', new Blob([buf], { type: 'audio/mpeg' }), 'tts_out.mp3');
const stt = await fetch(BASE + '/api/stt', { method: 'POST', body: fd });
console.log('STT  ->', stt.status);
console.log('STT transcript:', JSON.stringify(await stt.json()));
