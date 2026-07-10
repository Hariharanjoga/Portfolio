// TRACK C/D — Web/API + infra against PRODUCTION (gentle, mostly read-only).
// One capped 35-req chat batch to confirm whether the XFF bypass survives nginx; everything
// else is single GET/OPTIONS probes.
import tls from "node:tls";
import { PROD, postJSON, head, pass, fail, warn, info, C } from "./lib.mjs";

const host = new URL(PROD).hostname;

// --- TLS / cert / protocol ---
head(`TLS — ${host}`);
await new Promise((resolve) => {
  const s = tls.connect({ host, port: 443, servername: host, minVersion: "TLSv1" }, () => {
    const cert = s.getPeerCertificate();
    const proto = s.getProtocol();
    info(`negotiated protocol: ${proto}`);
    info(`cert issuer: ${cert.issuer?.O || "?"} | CN=${cert.subject?.CN}`);
    info(`valid: ${cert.valid_from}  →  ${cert.valid_to}`);
    const keyType = cert.pubkey ? `${cert.pubkey.length * 8}-bit` : (cert.bits ? cert.bits + "-bit" : "?");
    info(`key: ${cert.asn1Curve || keyType}`);
    (proto === "TLSv1.3" || proto === "TLSv1.2" ? pass : warn)(`TLS version ${proto}`);
    s.end();
    resolve();
  });
  s.on("error", (e) => { fail(`TLS connect failed: ${e.message}`); resolve(); });
  s.setTimeout(8000, () => { warn("TLS timeout"); s.destroy(); resolve(); });
});

// --- Security headers on the homepage ---
head("Security headers (GET /)");
{
  const r = await fetch(PROD, { redirect: "manual" });
  const h = r.headers;
  const want = {
    "strict-transport-security": "HSTS (force HTTPS)",
    "content-security-policy": "CSP (XSS/clickjacking defense)",
    "x-frame-options": "clickjacking (frame embedding)",
    "x-content-type-options": "MIME-sniff (nosniff)",
    "referrer-policy": "referrer leakage",
    "permissions-policy": "feature policy (camera/mic)",
  };
  for (const [k, why] of Object.entries(want)) {
    const v = h.get(k);
    if (k === "content-security-policy") {
      // CSP is deployed in Report-Only mode (monitoring, not enforcing) so a bad policy can't
      // break GTM/ElevenLabs/Cal.com. Treat report-only as present-but-not-enforcing (WARN),
      // only FAIL if NEITHER header exists.
      const ro = h.get("content-security-policy-report-only");
      if (v) pass(`${k}: ${v}`);
      else if (ro) warn(`${k}: not enforcing — deployed as Report-Only (monitoring): ${ro.slice(0, 60)}…`);
      else fail(`${k}: MISSING — ${why}`);
      continue;
    }
    (v ? pass : fail)(`${k}: ${v || `MISSING — ${why}`}`);
  }
  // leaky headers
  for (const k of ["server", "x-powered-by"]) {
    const v = h.get(k);
    if (v) warn(`discloses ${k}: ${v}`);
    else pass(`${k}: not disclosed`);
  }
}

// --- HTTP -> HTTPS redirect ---
head("HTTP → HTTPS redirect");
{
  try {
    const r = await fetch(`http://${host}`, { redirect: "manual" });
    const loc = r.headers.get("location") || "";
    (r.status >= 300 && r.status < 400 && loc.startsWith("https://") ? pass : warn)(`http:// → ${r.status} ${loc || "(no redirect)"}`);
  } catch (e) { info(`http probe: ${e.message}`); }
}

// --- Info disclosure / sensitive paths ---
head("Sensitive path probes");
for (const p of ["/.env", "/.env.local", "/.git/config", "/api/chat", "/api/stt-token"]) {
  try {
    const method = p.startsWith("/api") ? "GET" : "GET";
    const r = await fetch(`${PROD}${p}`, { method, redirect: "manual" });
    const body = (await r.text().catch(() => "")).slice(0, 80).replace(/\s+/g, " ");
    const bad = (p.includes("env") || p.includes("git")) && r.status === 200;
    (bad ? fail : pass)(`${method} ${p} → ${r.status} ${bad ? "EXPOSED!" : ""} ${body ? `:: ${body}` : ""}`);
  } catch (e) { info(`${p}: ${e.message}`); }
}

// --- Wrong HTTP method on chat ---
head("HTTP method handling");
{
  const r = await fetch(`${PROD}/api/chat`, { method: "GET" });
  info(`GET /api/chat → ${r.status} (POST-only route; 405/404/500 all acceptable)`);
}

// --- CORS: can any origin call your paid endpoints? ---
head("CORS");
{
  const r = await fetch(`${PROD}/api/chat`, { method: "OPTIONS", headers: { Origin: "https://evil.example", "Access-Control-Request-Method": "POST" } });
  const acao = r.headers.get("access-control-allow-origin");
  if (acao === "*" || acao === "https://evil.example") fail(`CORS wide open: Access-Control-Allow-Origin: ${acao}`);
  else pass(`No permissive CORS header (ACAO: ${acao || "none"}) — cross-site browser abuse limited`);
}

// --- THE KEY PROD TEST: does the XFF rate-limit bypass survive nginx? ---
// The app checks the rate limiter BEFORE it runs the model, so a payload that the input guard
// short-circuits (e.g. "process.env") exercises the exact same limiter path at ZERO model cost.
// Default stays "hi" for an honest end-to-end probe; set SEC_BYPASS_Q=process.env to spare a
// metered model key when re-running after a deploy.
const BYPASS_Q = process.env.SEC_BYPASS_Q || "hi";
head(`XFF rate-limit bypass on PRODUCTION (35 spoofed IPs, capped; q="${BYPASS_Q}")`);
{
  const codes = [];
  for (let i = 0; i < 35; i++) {
    const res = await postJSON(`${PROD}/api/chat`, { question: BYPASS_Q, mode: "" }, { "x-forwarded-for": `45.33.${i}.${(i * 7) % 255}` });
    codes.push(res.status);
  }
  const tally = codes.reduce((m, c) => ((m[c] = (m[c] || 0) + 1), m), {});
  const n429 = tally[429] || 0;
  if (n429 === 0) fail(`35 spoofed-IP reqs → ${JSON.stringify(tally)}  BYPASS SURVIVES nginx — 0×429 (nginx appends XFF; limiter defeated in prod)`);
  else pass(`35 spoofed-IP reqs → ${JSON.stringify(tally)}  nginx neutralizes spoof (${n429}×429) — limiter holds in prod`);
}

console.log(`\n${C.bold}Track C/D done.${C.reset}`);
