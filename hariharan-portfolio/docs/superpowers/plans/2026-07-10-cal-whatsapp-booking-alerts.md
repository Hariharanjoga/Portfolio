# Cal.com → WhatsApp Booking Alerts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** When someone books via the Cal.com popup on hariharanjoga.me, send the owner a WhatsApp utility-template alert (name, email, time-in-IST, note, join link) via the Meta Cloud API.

**Architecture:** Cal.com fires a `BOOKING_CREATED` webhook to a new HMAC-verified Next.js route (`/api/cal-webhook`). The route parses the payload, formats/sanitizes the fields, dedupes by booking uid, and calls `graph.facebook.com` to send the pre-approved template. Logic lives in a pure helper (`src/lib/calWhatsapp.ts`) so it is testable via the existing node `security/` harness in a `WHATSAPP_DRY_RUN` mode.

**Tech Stack:** Next.js (nodejs runtime route handler), `node:crypto` (HMAC), Meta WhatsApp Cloud API, `fetch`. Testing = node `.mjs` scripts over HTTP against a local dev server (the repo has no unit-test runner; this matches `security/*.mjs`).

## Global Constraints

- Route handler pattern MUST match existing routes: `export const runtime = "nodejs"; export const dynamic = "force-dynamic"; export async function POST(req: Request)`. (See `src/app/api/contact/route.ts`.) Per `AGENTS.md`, if unsure about a Next API, check `node_modules/next/dist/docs/` before writing — but the contact route is the proven template.
- Secrets are server-side only. NEVER add `NEXT_PUBLIC_`. NEVER commit secrets or the owner's phone number (repo is public).
- Reuse `limit(req, perMinute)` from `src/lib/rateLimit.ts` for the rate-limit backstop.
- Template variable order is fixed: **{{1}} name · {{2}} email · {{3}} time-in-IST · {{4}} note · {{5}} join-link**.
- Empty template params are illegal on Meta → substitute `—` (em dash). Params must be single-line (no `\n`/`\t`).
- Template already created: name `portfolio_booking_alert`, lang `en_US`, category UTILITY, id `1045693681136583` (PENDING approval).
- Cal.com signs webhooks with HMAC-SHA256 (hex) over the raw body, header `X-Cal-Signature-256`.

---

### Task 1: Core webhook in dry-run (helper + route + harness)

Delivers a fully parsing, HMAC-verified webhook that logs/echoes the composed message instead of sending (dry-run), proven by the harness.

**Files:**
- Create: `src/lib/calWhatsapp.ts`
- Create: `src/app/api/cal-webhook/route.ts`
- Create: `security/d-cal-webhook.mjs`

**Interfaces:**
- Produces (from `src/lib/calWhatsapp.ts`):
  - `type BookingFields = { name: string; email: string; whenIST: string; note: string; link: string; uid: string }`
  - `verifyCalSignature(rawBody: string, signature: string | null, secret: string): boolean`
  - `sanitizeParam(v: unknown, maxLen?: number): string`
  - `formatIST(iso: string): string`
  - `extractBooking(payload: Record<string, any>): BookingFields`
  - `buildTemplateBody(to: string, templateName: string, lang: string, f: BookingFields): object`
  - `sendBookingAlert(f: BookingFields): Promise<{ ok: boolean; dryRun?: boolean; status?: number; body?: unknown; params?: string[] }>`
- Consumes: `limit` from `src/lib/rateLimit.ts`; `LOCAL, head, pass, fail, info` from `security/lib.mjs`.

- [ ] **Step 1: Write the helper module**

Create `src/lib/calWhatsapp.ts`:

```ts
import crypto from "node:crypto";

export type BookingFields = {
  name: string;
  email: string;
  whenIST: string;
  note: string;
  link: string;
  uid: string;
};

const DASH = "—";

// Verify Cal.com's HMAC-SHA256 signature (hex) over the raw body, constant-time.
export function verifyCalSignature(rawBody: string, signature: string | null, secret: string): boolean {
  if (!signature || !secret) return false;
  const expected = crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature, "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

// Collapse to a WhatsApp-safe single-line param: no newlines/tabs, no double spaces, trimmed, capped.
// Empty becomes an em dash (Meta rejects blank template params).
export function sanitizeParam(v: unknown, maxLen = 300): string {
  let s = String(v ?? "").replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ").trim();
  if (s.length > maxLen) s = s.slice(0, maxLen - 1).trimEnd() + "…";
  return s || DASH;
}

// Format a UTC ISO timestamp to IST, e.g. "Sat, 11 Jul 2026, 3:30 PM IST".
export function formatIST(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return DASH;
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    weekday: "short", day: "2-digit", month: "short", year: "numeric",
    hour: "numeric", minute: "2-digit", hour12: true,
  }).formatToParts(d);
  const g = (t: string) => parts.find((p) => p.type === t)?.value || "";
  return `${g("weekday")}, ${g("day")} ${g("month")} ${g("year")}, ${g("hour")}:${g("minute")} ${g("dayPeriod").toUpperCase()} IST`;
}

// Pull a display link from the varied Cal.com payload shapes.
function extractLink(p: Record<string, any>): string {
  return (
    p?.metadata?.videoCallUrl ||
    p?.videoCallData?.url ||
    (typeof p?.location === "string" && /^https?:\/\//i.test(p.location) ? p.location : "") ||
    (p?.uid && p?.bookerUrl ? `${p.bookerUrl}/booking/${p.uid}` : "")
  );
}

// Map a Cal.com BOOKING_CREATED payload to our template fields.
export function extractBooking(payload: Record<string, any>): BookingFields {
  const p = payload || {};
  const att = Array.isArray(p.attendees) && p.attendees[0] ? p.attendees[0] : {};
  const r = p.responses || {};
  const rv = (k: string) => (r?.[k] && typeof r[k] === "object" ? r[k].value : r?.[k]);
  return {
    name: sanitizeParam(att.name || rv("name") || "", 120),
    email: sanitizeParam(att.email || rv("email") || "", 200),
    whenIST: formatIST(p.startTime),
    note: sanitizeParam(rv("notes") || p.additionalNotes || "", 300),
    link: sanitizeParam(extractLink(p), 400),
    uid: String(p.uid || ""),
  };
}

// Build the Meta Cloud API message body for the utility template.
export function buildTemplateBody(to: string, templateName: string, lang: string, f: BookingFields) {
  return {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template: {
      name: templateName,
      language: { code: lang },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: f.name },
            { type: "text", text: f.email },
            { type: "text", text: f.whenIST },
            { type: "text", text: f.note },
            { type: "text", text: f.link },
          ],
        },
      ],
    },
  };
}

// Send (or dry-run) the WhatsApp template. Reads config from env.
export async function sendBookingAlert(
  f: BookingFields,
): Promise<{ ok: boolean; dryRun?: boolean; status?: number; body?: unknown; params?: string[] }> {
  const token = process.env.WHATSAPP_TOKEN || "";
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID || "";
  const to = process.env.OWNER_WA_NUMBER || "";
  const tpl = process.env.WHATSAPP_TEMPLATE_NAME || "portfolio_booking_alert";
  const lang = process.env.WHATSAPP_TEMPLATE_LANG || "en_US";
  const ver = process.env.WHATSAPP_API_VERSION || "v20.0";
  const params = [f.name, f.email, f.whenIST, f.note, f.link];

  if (process.env.WHATSAPP_DRY_RUN === "1") {
    console.log("[cal-webhook DRY_RUN] →", to || "(no OWNER_WA_NUMBER)", JSON.stringify(params));
    return { ok: true, dryRun: true, params };
  }
  if (!token || !phoneId || !to) return { ok: false, status: 503, body: "missing_config", params };

  const res = await fetch(`https://graph.facebook.com/${ver}/${phoneId}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(buildTemplateBody(to, tpl, lang, f)),
  });
  const body = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, body, params };
}
```

- [ ] **Step 2: Write the route**

Create `src/app/api/cal-webhook/route.ts`:

```ts
import { limit } from "@/lib/rateLimit";
import { verifyCalSignature, extractBooking, sendBookingAlert } from "@/lib/calWhatsapp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const limited = limit(req, 60);
    if (limited) return limited;

    const secret = process.env.CAL_WEBHOOK_SECRET || "";
    const raw = await req.text();
    const sig = req.headers.get("x-cal-signature-256");
    if (!verifyCalSignature(raw, sig, secret)) {
      return Response.json({ error: "bad_signature" }, { status: 401 });
    }

    let evt: Record<string, any> = {};
    try { evt = JSON.parse(raw); } catch { return Response.json({ error: "bad_json" }, { status: 400 }); }

    if (evt.triggerEvent !== "BOOKING_CREATED") {
      return Response.json({ ok: true, ignored: evt.triggerEvent || "unknown" });
    }

    const fields = extractBooking(evt.payload || {});
    const result = await sendBookingAlert(fields);
    if (!result.ok) console.error("/api/cal-webhook whatsapp send failed:", result.status, result.body);

    // Always 200 for a valid signed BOOKING_CREATED so Cal doesn't retry-storm.
    return Response.json({ ok: true, dryRun: result.dryRun || false, params: result.params });
  } catch (err) {
    console.error("/api/cal-webhook error:", err instanceof Error ? err.message : err);
    return Response.json({ error: "webhook_failed" }, { status: 500 });
  }
}
```

- [ ] **Step 3: Write the harness**

Create `security/d-cal-webhook.mjs`:

```js
// TRACK D — Cal.com → WhatsApp webhook. Runs against LOCAL in WHATSAPP_DRY_RUN=1 mode, so no
// WhatsApp message is ever sent. Requires the local server started with a matching
// CAL_WEBHOOK_SECRET and WHATSAPP_DRY_RUN=1 (see run command in the plan).
import crypto from "node:crypto";
import { LOCAL, head, pass, fail, info } from "./lib.mjs";

const SECRET = process.env.CAL_WEBHOOK_SECRET || "test_secret";
const sign = (body) => crypto.createHmac("sha256", SECRET).update(body, "utf8").digest("hex");

async function post(bodyObj, opts = {}) {
  const body = JSON.stringify(bodyObj);
  const signature = "sig" in opts ? opts.sig : sign(body);
  const r = await fetch(`${LOCAL}/api/cal-webhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(signature != null ? { "x-cal-signature-256": signature } : {}) },
    body,
  });
  let json = {}; const text = await r.text(); try { json = JSON.parse(text); } catch {}
  return { status: r.status, json };
}

const sample = (uid = "bk_123", over = {}) => ({
  triggerEvent: "BOOKING_CREATED",
  payload: {
    uid,
    type: "15 Min Meeting",
    startTime: "2026-07-11T10:00:00Z",
    attendees: [{ name: "John Doe", email: "john@example.com", timeZone: "Asia/Kolkata" }],
    responses: { notes: { value: "Wants to discuss\na backend role" } },
    metadata: { videoCallUrl: "https://app.cal.com/video/abc123" },
    bookerUrl: "https://cal.com",
    ...over,
  },
});

head("TRACK D — Cal.com → WhatsApp webhook (DRY_RUN)");

// 1. valid signature + BOOKING_CREATED → 200 with correctly parsed/sanitized params
{
  const r = await post(sample());
  const p = r.json.params || [];
  const ok = r.status === 200 && p[0] === "John Doe" && p[1] === "john@example.com"
    && /IST$/.test(p[2] || "") && p[3] === "Wants to discuss a backend role"
    && p[4] === "https://app.cal.com/video/abc123";
  (ok ? pass : fail)(`signed BOOKING_CREATED → ${r.status} params=${JSON.stringify(p)}`);
}

// 2. wrong signature → 401
{
  const r = await post(sample("bk_wrongsig"), { sig: "deadbeef" });
  (r.status === 401 ? pass : fail)(`bad signature → ${r.status} (expect 401)`);
}

// 3. non-BOOKING_CREATED → 200 ignored
{
  const r = await post({ triggerEvent: "BOOKING_CANCELLED", payload: {} });
  (r.status === 200 && r.json.ignored ? pass : fail)(`BOOKING_CANCELLED → ${r.status} ignored=${r.json.ignored}`);
}

// 4. missing note → em dash
{
  const s = sample("bk_nonote"); delete s.payload.responses;
  const r = await post(s);
  ((r.json.params || [])[3] === "—" ? pass : fail)(`missing note → "${(r.json.params||[])[3]}" (expect —)`);
}

info("dedupe test lives in Task 2");
```

- [ ] **Step 4: Start the local dev server (dry-run) and run the harness — verify it fails first, then passes**

Start server (own terminal / background), then run harness:

```bash
cd hariharan-portfolio
CAL_WEBHOOK_SECRET=test_secret WHATSAPP_DRY_RUN=1 npx next dev -p 3100   # background
CAL_WEBHOOK_SECRET=test_secret node security/d-cal-webhook.mjs
```
Expected once implemented: tests 1–4 all `PASS`. (If you write the harness before the route, test 1 shows the route 404 as a FAIL first — that is the intended red state.)

- [ ] **Step 5: Commit**

```bash
git add src/lib/calWhatsapp.ts src/app/api/cal-webhook/route.ts security/d-cal-webhook.mjs
git commit -m "feat(cal-webhook): HMAC-verified Cal.com booking webhook → WhatsApp (dry-run)"
```

---

### Task 2: Dedupe by booking uid

Cal.com retries the webhook if the response is slow; without dedupe the owner gets two WhatsApps. Add an in-memory TTL set keyed on `uid`.

**Files:**
- Modify: `src/app/api/cal-webhook/route.ts`
- Modify: `security/d-cal-webhook.mjs`

**Interfaces:**
- Consumes: `extractBooking().uid` from Task 1.
- Produces: route returns `{ ok: true, deduped: true }` when a uid is seen twice within the TTL.

- [ ] **Step 1: Add the dedupe test to the harness**

Append to `security/d-cal-webhook.mjs` (replace the final `info(...)` line):

```js
// 5. dedupe: same uid twice → second is deduped
{
  const a = await post(sample("bk_dupe"));
  const b = await post(sample("bk_dupe"));
  (a.status === 200 && b.json.deduped === true ? pass : fail)(`same uid twice → first ${a.status}, second deduped=${b.json.deduped}`);
}
```

- [ ] **Step 2: Run the harness — verify the new test fails**

```bash
CAL_WEBHOOK_SECRET=test_secret node security/d-cal-webhook.mjs
```
Expected: test 5 FAILs (`deduped=undefined`) because dedupe isn't implemented yet.

- [ ] **Step 3: Implement dedupe in the route**

In `src/app/api/cal-webhook/route.ts`, add above `export async function POST` (after the imports):

```ts
// In-memory dedupe of recently-seen booking uids (Cal retries on slow responses).
const seenUids = new Map<string, number>();
const DEDUPE_TTL_MS = 10 * 60_000;
function alreadyHandled(uid: string): boolean {
  if (!uid) return false;
  const now = Date.now();
  for (const [k, t] of seenUids) if (now - t > DEDUPE_TTL_MS) seenUids.delete(k);
  if (seenUids.has(uid)) return true;
  seenUids.set(uid, now);
  return false;
}
```

Then, in `POST`, insert immediately after `const fields = extractBooking(evt.payload || {});`:

```ts
    if (alreadyHandled(fields.uid)) return Response.json({ ok: true, deduped: true });
```

- [ ] **Step 4: Run the harness — verify all tests pass**

```bash
CAL_WEBHOOK_SECRET=test_secret node security/d-cal-webhook.mjs
```
Expected: tests 1–5 all `PASS`.

- [ ] **Step 5: Commit**

```bash
git add src/app/api/cal-webhook/route.ts security/d-cal-webhook.mjs
git commit -m "feat(cal-webhook): dedupe duplicate Cal retries by booking uid"
```

---

### Task 3: Go live — config, deploy, Cal.com wiring, end-to-end

Non-code operational task. Requires the template to be **APPROVED** first.

**Files:**
- Modify (on droplet only, NOT git): `/var/www/portfolio/hariharan-portfolio/.env.local`

**Interfaces:**
- Consumes: the deployed route from Tasks 1–2; env vars read by `sendBookingAlert`.

- [ ] **Step 1: Confirm the template is APPROVED**

```bash
TOKEN=<permanent-token>; WABA=1315980114068592
curl -s "https://graph.facebook.com/v20.0/$WABA/message_templates?name=portfolio_booking_alert" \
  -H "Authorization: Bearer $TOKEN" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const d=JSON.parse(s).data||[];d.forEach(t=>console.log(t.name,t.language,t.status,t.category))})'
```
Expected: `portfolio_booking_alert en_US APPROVED UTILITY`. Do not proceed to Step 5 until APPROVED.

- [ ] **Step 2: Generate the Cal webhook secret**

```bash
node -e "console.log(require('node:crypto').randomBytes(24).toString('hex'))"
```
Keep this value; it goes into BOTH the droplet env (Step 3) and the Cal.com webhook config (Step 4).

- [ ] **Step 3: Add config to the droplet `.env.local` and restart**

Append the block below to `/var/www/portfolio/hariharan-portfolio/.env.local` over SSH (values never printed; feed via stdin like the NVIDIA-key step). Then restart:

```
WHATSAPP_TOKEN=<permanent-system-user-token>
WHATSAPP_PHONE_NUMBER_ID=1164090386788502
WHATSAPP_TEMPLATE_NAME=portfolio_booking_alert
WHATSAPP_TEMPLATE_LANG=en_US
WHATSAPP_API_VERSION=v20.0
OWNER_WA_NUMBER=918978012926
CAL_WEBHOOK_SECRET=<secret-from-step-2>
```
```bash
ssh root@139.59.26.12 'systemctl restart portfolio && sleep 3 && systemctl is-active portfolio'
```
Expected: `active`. (Note: `OWNER_WA_NUMBER` has no `+`; Cloud API accepts digits-only.)

- [ ] **Step 4: Create the Cal.com webhook**

Cal.com → Settings → Developer → **Webhooks** → New:
- Subscriber URL: `https://hariharanjoga.me/api/cal-webhook`
- Event triggers: **Booking Created** only
- Secret: the value from Step 2
- Save. Use Cal.com's **Ping/Test** button → expect a 200.

- [ ] **Step 5: Live end-to-end test**

Book a real 15-min slot on hariharanjoga.me (or use a throwaway). Expected: a WhatsApp message arrives on `+918978012926` with the name, email, IST time, note, and join link. If nothing arrives, check `journalctl -u portfolio --since "5 min ago"` on the droplet for `/api/cal-webhook` logs (signature/config errors).

- [ ] **Step 6: Push the code (single push → single deploy)**

```bash
git push origin main
```
Confirm the GitHub Actions "Deploy portfolio" run succeeds (`gh run list --limit 1`).

- [ ] **Step 7: Security follow-up**

Rotate the WhatsApp **app secret** (Meta → App → Settings → Basic → Reset), since it was shared in plaintext during design. The runtime doesn't use it, so rotation won't affect this feature.

---

## Notes for the implementer
- Run order: Task 1 → 2 (code, on a feature branch) → 3 (ops). Push (Task 3 Step 6) can happen before the live test since the route is inert until Cal.com is wired and env is set — but keep it a single push.
- The dry-run harness needs the dev server launched with the SAME `CAL_WEBHOOK_SECRET` the harness uses (`test_secret` by default) and `WHATSAPP_DRY_RUN=1`, else every request 401s or tries a real send.
- Do not add `WHATSAPP_DRY_RUN` to the droplet `.env.local` (production must actually send).
