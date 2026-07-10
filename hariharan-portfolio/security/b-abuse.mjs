// TRACK B — Cost / resource abuse + rate-limit integrity (OWASP API4 Unrestricted Resource Consumption).
// Against LOCAL with DUMMY paid keys, so upstream calls fail cheaply (no ElevenLabs/Resend cost).
// Bursts are capped low — we only need to prove an endpoint accepts unthrottled requests.
import { LOCAL, postJSON, head, pass, fail, warn, info, C } from "./lib.mjs";

const BURST = 25;           // must exceed the highest paid-route limit (20/min) to prove throttling
const CHAT_BURST = 35;      // must exceed the 30/min chat limit to see it trip

async function burst(label, n, fn) {
  const codes = [];
  for (let i = 0; i < n; i++) codes.push(await fn(i));
  const tally = codes.reduce((m, c) => ((m[c] = (m[c] || 0) + 1), m), {});
  const got429 = codes.includes(429);
  return { codes, tally, got429 };
}

// --- 1. Unthrottled paid endpoints (no rate limiter in code) ---
head("Unthrottled endpoints — cost-abuse surface");

// /api/tts  (POST {text})
{
  const r = await burst("tts", BURST, async () => {
    const res = await postJSON(`${LOCAL}/api/tts`, { text: "abuse test chunk" }, { "x-forwarded-for": "9.9.9.9" });
    return res.status;
  });
  (r.got429 ? pass : fail)(`/api/tts  ${BURST} reqs from one IP → ${JSON.stringify(r.tally)}  ${r.got429 ? "(throttled)" : "NO 429 — unthrottled → ElevenLabs cost abuse"}`);
}

// /api/stt  (multipart file)
{
  const r = await burst("stt", BURST, async () => {
    const fd = new FormData();
    fd.append("file", new Blob([new Uint8Array(2048)], { type: "audio/webm" }), "a.webm");
    try {
      const res = await fetch(`${LOCAL}/api/stt`, { method: "POST", body: fd, headers: { "x-forwarded-for": "9.9.9.9" } });
      return res.status;
    } catch { return 0; }
  });
  (r.got429 ? pass : fail)(`/api/stt  ${BURST} uploads from one IP → ${JSON.stringify(r.tally)}  ${r.got429 ? "(throttled)" : "NO 429 — unthrottled upload + STT cost abuse"}`);
}

// /api/stt-token (GET) — each success mints a PAID single-use realtime token
{
  const r = await burst("stt-token", BURST, async () => {
    try {
      const res = await fetch(`${LOCAL}/api/stt-token`, { headers: { "x-forwarded-for": "9.9.9.9" } });
      return res.status;
    } catch { return 0; }
  });
  (r.got429 ? pass : fail)(`/api/stt-token  ${BURST} GETs from one IP → ${JSON.stringify(r.tally)}  ${r.got429 ? "(throttled)" : "NO 429 — anyone can mint unlimited paid STT tokens"}`);
}

// /api/contact (POST) — each success sends an email (inbox bomb + Resend cost)
{
  const r = await burst("contact", BURST, async () => {
    const res = await postJSON(`${LOCAL}/api/contact`,
      { name: "abuse", email: "a@b.co", message: "flood test " + Math.random().toString(36) },
      { "x-forwarded-for": "9.9.9.9" });
    return res.status;
  });
  (r.got429 ? pass : fail)(`/api/contact  ${BURST} sends from one IP → ${JSON.stringify(r.tally)}  ${r.got429 ? "(throttled)" : "NO 429 — inbox-bomb + Resend cost abuse"}`);
}

// --- 2. Chat limiter integrity: fixed IP SHOULD trip at 30/min ---
head("Chat rate-limiter — fixed IP");
{
  const r = await burst("chat-fixed", CHAT_BURST, async () => {
    const res = await postJSON(`${LOCAL}/api/chat`, { question: "hi", mode: "" }, { "x-forwarded-for": "198.51.100.7" });
    return res.status;
  });
  const n429 = r.tally[429] || 0;
  (n429 > 0 ? pass : warn)(`${CHAT_BURST} reqs from ONE IP → ${JSON.stringify(r.tally)}  ${n429 ? `limiter tripped (${n429}×429) ✓` : "limiter never tripped?!"}`);
}

// --- 3. XFF spoof must be NEUTRALIZED once X-Real-IP is authoritative (as nginx sets in prod) ---
// The old bug: identity came from the client-spoofable X-Forwarded-For, so a unique XFF per
// request defeated the limiter. The fix reads X-Real-IP first (nginx overwrites it from
// $remote_addr — non-spoofable). Here we simulate nginx by sending a constant X-Real-IP while
// rotating a fake XFF; the limiter MUST still trip. (Payload "process.env" is short-circuited by
// the input guard, so this rate-limit test needs no model call and is independent of model state.)
// NOTE: run raw against local dev with NO X-Real-IP and the XFF fallback is used by design — the
// live prod proof of the fix is Track C (c-web-prod.mjs).
head("Chat rate-limiter — spoofed XFF vs authoritative X-Real-IP (prod-simulated)");
{
  const r = await burst("chat-spoof", CHAT_BURST, async (i) => {
    const res = await postJSON(`${LOCAL}/api/chat`, { question: "process.env", mode: "" },
      { "x-real-ip": "198.51.100.9", "x-forwarded-for": `45.33.${i}.${(i * 7) % 255}` });
    return res.status;
  });
  const n429 = r.tally[429] || 0;
  (n429 > 0 ? pass : fail)(`${CHAT_BURST} reqs, constant X-Real-IP + UNIQUE spoofed XFF → ${JSON.stringify(r.tally)}  ${n429 > 0 ? `spoof neutralized (${n429}×429) — app keys on X-Real-IP ✓` : "XFF STILL bypasses despite X-Real-IP?!"}`);
}

// --- 4. Input-validation spot checks ---
head("Input validation");
{
  const empty = await postJSON(`${LOCAL}/api/chat`, {}, { "x-forwarded-for": "10.0.0.1" });
  (empty.status === 400 ? pass : warn)(`/api/chat empty body → ${empty.status} (expect 400)`);
  const badContact = await postJSON(`${LOCAL}/api/contact`, { name: "x", email: "not-an-email", message: "y" }, { "x-forwarded-for": "10.0.0.2" });
  (badContact.status === 400 ? pass : warn)(`/api/contact bad email → ${badContact.status} (expect 400)`);
  const honeypot = await postJSON(`${LOCAL}/api/contact`, { company: "bot", name: "x", email: "a@b.co", message: "y" }, { "x-forwarded-for": "10.0.0.3" });
  const hp = JSON.parse(honeypot.text || "{}");
  (hp.ok === true ? pass : warn)(`/api/contact honeypot (company filled) → silently ok:${hp.ok} (bot trap works)`);
  // header/subject injection via name
  const inj = await postJSON(`${LOCAL}/api/contact`, { name: "x\r\nBcc: victim@evil.com", email: "a@b.co", message: "y" }, { "x-forwarded-for": "10.0.0.4" });
  info(`/api/contact CRLF-in-name → ${inj.status} (Resend uses JSON API, not raw SMTP → header injection N/A, but note it reaches upstream)`);
}

console.log(`\n${C.bold}Track B done.${C.reset}`);
