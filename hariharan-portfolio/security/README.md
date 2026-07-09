# Security test harness

Re-runnable security suite for this portfolio. No external dependencies — pure Node 20+ (global `fetch`).
See **[SECURITY-FINDINGS.md](./SECURITY-FINDINGS.md)** for the latest results.

## What each script does

| Script | Track | Target | Safe to run? |
|--------|-------|--------|--------------|
| `a-llm-redteam.mjs` | LLM prompt-injection, secret extraction, jailbreak, fabrication | **local** | Yes — needs real NVIDIA key so the model actually answers |
| `b-abuse.mjs` | Rate-limit integrity, cost-abuse (no-throttle) proofs, input validation | **local** | Yes — run with **dummy** paid keys so no ElevenLabs/Resend cost |
| `c-web-prod.mjs` | TLS, security headers, CORS, info disclosure, **XFF rate-limit bypass** | **prod** | Mostly read-only; sends 35 capped `hi` requests to prove the bypass |
| `lib.mjs` | shared helpers | — | — |

## How to run

### 1. Local tracks (A + B) — start a local server first
Run the app with **dummy** paid-service keys so cost-abuse tests hit nothing billable, but keep your real NVIDIA key so the model responds:

```bash
cd hariharan-portfolio
ELEVEN_API_KEY=DUMMY ELEVENLABS_API_KEY=DUMMY RESEND_API_KEY=DUMMY SARVAM_API_KEY=DUMMY \
  npx next dev -p 3100
```

Then in another terminal:
```bash
node security/a-llm-redteam.mjs     # writes a full transcript to out-a-llm.json
node security/b-abuse.mjs
```

### 2. Production tracks (C/D) — read-only + one capped burst
```bash
node security/c-web-prod.mjs
```

## Config (env vars)
- `SEC_LOCAL` — local base URL (default `http://localhost:3100`)
- `SEC_PROD` — production base URL (default `https://hariharanjoga.me`)
- `SEC_KEY_CANARY` — optional regex fragment of a real key; if set, the LLM suite flags an **exact** credential leak. **Never commit a real value.**

## Interpreting results
- `PASS` (green) — control behaved as expected / a defense held.
- `FAIL` (red) — a real weakness confirmed.
- `WARN` (yellow) — needs a human eyeball (e.g. brand-tone, off-topic compliance).

The LLM suite's regex intentionally over-flags (it matches the *words* `process.env` / `xi-api-key`); check `out-a-llm.json` — a true leak means an actual `nvapi-…` / `re_…` / `sk_…` value appears, which so far it never has.

## Run this after every deploy
These tests are your regression guard. After changing an API route, nginx config, or the system prompt, re-run all three and confirm nothing new went red.
