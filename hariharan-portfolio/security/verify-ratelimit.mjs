// Focused prod check: does the chat limiter trip from a single real client IP?
// Sequential (gentle), Connection: close, so we don't pile up sockets.
const PROD = process.env.SEC_PROD || "https://hariharanjoga.me";
const N = 35;
const codes = [];
for (let i = 0; i < N; i++) {
  try {
    const r = await fetch(`${PROD}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Connection": "close", "x-forwarded-for": `45.33.${i}.${(i * 7) % 255}` },
      body: JSON.stringify({ question: "hi", mode: "voice" }),
    });
    codes.push(r.status);
    await r.text().catch(() => {});
    process.stdout.write(`${r.status} `);
  } catch (e) {
    codes.push(0);
    process.stdout.write("0 ");
  }
}
const tally = codes.reduce((m, c) => ((m[c] = (m[c] || 0) + 1), m), {});
const n429 = tally[429] || 0;
console.log(`\n\n${N} reqs (unique spoofed XFF, one real IP) → ${JSON.stringify(tally)}`);
console.log(n429 > 0
  ? `RESULT: PASS — limiter holds in prod (${n429}×429). Spoof defeated by X-Real-IP.`
  : `RESULT: FAIL — 0×429. Limiter not tripping from one real IP; needs investigation.`);
