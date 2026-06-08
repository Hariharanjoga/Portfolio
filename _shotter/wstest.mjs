import WebSocket from 'ws';

const r = await fetch('http://localhost:3000/api/stt-token');
const { token, error } = await r.json();
if (!token) { console.log('NO TOKEN:', error); process.exit(1); }
console.log('got token (len ' + token.length + ')');

const url = 'wss://api.elevenlabs.io/v1/speech-to-text/realtime'
  + '?model_id=scribe_v2_realtime&audio_format=pcm_16000&commit_strategy=vad'
  + '&vad_silence_threshold_secs=0.6&token=' + encodeURIComponent(token);

const ws = new WebSocket(url);
let got = [];
ws.on('open', () => {
  console.log('WS OPEN ✓');
  // stream ~0.6s of silence as PCM16 16k base64 in 3 chunks
  const chunk = Buffer.alloc(2048 * 2); // 2048 samples silence
  let n = 0;
  const iv = setInterval(() => {
    ws.send(JSON.stringify({ message_type: 'input_audio_chunk', audio_base_64: chunk.toString('base64'), sample_rate: 16000 }));
    if (++n >= 6) clearInterval(iv);
  }, 130);
});
ws.on('message', (d) => { const s = d.toString(); got.push(s.slice(0, 120)); console.log('MSG:', s.slice(0, 160)); });
ws.on('error', (e) => console.log('WS ERROR:', e.message));
ws.on('close', (c, reason) => { console.log('WS CLOSE', c, reason.toString().slice(0, 160)); process.exit(0); });
setTimeout(() => { console.log('--- summary: messages =', got.length); ws.close(); }, 5000);
