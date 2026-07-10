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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractLink(p: Record<string, any>): string {
  return (
    p?.metadata?.videoCallUrl ||
    p?.videoCallData?.url ||
    (typeof p?.location === "string" && /^https?:\/\//i.test(p.location) ? p.location : "") ||
    (p?.uid && p?.bookerUrl ? `${p.bookerUrl}/booking/${p.uid}` : "")
  );
}

// Map a Cal.com BOOKING_CREATED payload to our template fields.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
