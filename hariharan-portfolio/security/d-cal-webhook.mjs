// TRACK D — Cal.com → WhatsApp webhook. Runs against LOCAL in WHATSAPP_DRY_RUN=1 mode, so no
// WhatsApp message is ever sent. Requires the local server started with a matching
// CAL_WEBHOOK_SECRET and WHATSAPP_DRY_RUN=1 (see run command in the plan/README).
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
