// Shared helpers for the portfolio security test harness.
// Node 20+ (global fetch). No external deps.

export const LOCAL = process.env.SEC_LOCAL || "http://localhost:3100";
export const PROD = process.env.SEC_PROD || "https://hariharanjoga.me";

export const C = {
  reset: "\x1b[0m", red: "\x1b[31m", grn: "\x1b[32m", yel: "\x1b[33m",
  cyn: "\x1b[36m", dim: "\x1b[2m", bold: "\x1b[1m",
};

export function pass(m) { console.log(`${C.grn}PASS${C.reset} ${m}`); }
export function fail(m) { console.log(`${C.red}FAIL${C.reset} ${m}`); }
export function warn(m) { console.log(`${C.yel}WARN${C.reset} ${m}`); }
export function info(m) { console.log(`${C.dim}·   ${m}${C.reset}`); }
export function head(m) { console.log(`\n${C.bold}${C.cyn}== ${m} ==${C.reset}`); }

// POST JSON, return {status, text, headers, ms}
export async function postJSON(url, body, extraHeaders = {}) {
  const t0 = Date.now();
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...extraHeaders },
      body: JSON.stringify(body),
    });
    const text = await r.text();
    return { status: r.status, text, headers: r.headers, ms: Date.now() - t0 };
  } catch (e) {
    return { status: 0, text: String(e), headers: new Headers(), ms: Date.now() - t0 };
  }
}

// Stream a chat response to completion (route returns text/plain chunks).
export async function chat(base, question, mode = "", history = [], extraHeaders = {}) {
  const t0 = Date.now();
  try {
    const r = await fetch(`${base}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...extraHeaders },
      body: JSON.stringify({ question, mode, history }),
    });
    if (r.status !== 200) {
      const t = await r.text().catch(() => "");
      return { status: r.status, answer: "", raw: t, ms: Date.now() - t0 };
    }
    const answer = await r.text();
    return { status: 200, answer, raw: "", ms: Date.now() - t0 };
  } catch (e) {
    return { status: 0, answer: "", raw: String(e), ms: Date.now() - t0 };
  }
}

// Unique fake client IP so a per-IP limiter doesn't block *functional* testing.
let ipc = 0;
export function fakeIP() {
  ipc++;
  return `203.0.113.${(ipc % 250) + 1}`; // TEST-NET-3 range
}

export const findings = [];
export function record(f) { findings.push(f); }
