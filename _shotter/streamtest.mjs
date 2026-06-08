const start = Date.now();
const res = await fetch('http://localhost:3001/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ question: 'What is his strongest project and why, in 2 sentences?' }),
});
console.log('HTTP', res.status, '| content-type:', res.headers.get('content-type'));
const reader = res.body.getReader();
const dec = new TextDecoder();
let chunks = 0, full = '';
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  chunks++;
  const piece = dec.decode(value, { stream: true });
  full += piece;
  console.log(`[+${String(Date.now() - start).padStart(4)}ms] chunk#${chunks}: ${JSON.stringify(piece)}`);
}
console.log(`\nDONE — ${chunks} separate chunks over ${Date.now() - start}ms`);
console.log('FULL:', full);
