# Cal.com → WhatsApp booking alerts — design

**Date:** 2026-07-10
**Status:** approved, ready for implementation plan

> No secrets or personal data live in this doc — the repo is public. All credentials and
> the owner's phone number live only in the droplet's gitignored `.env.local`.

## Goal

When someone books a call through the Cal.com popup on the portfolio (hariharanjoga.me), send
the site owner a WhatsApp message with the caller's name, email, the time (in IST), the join
link, and their note — using the owner's existing Meta-verified WhatsApp Business account and an
approved **utility** template.

## Why a webhook (not a client hook)

The booking is a **client-side Cal.com embed popup** (`data-cal-link="hariharan-joga/15min"` in
`src/components/Portfolio.tsx`). The booking is created entirely on Cal.com's servers; the
portfolio backend never sees it. The only robust way to be notified is a **Cal.com webhook**
(`BOOKING_CREATED`) POSTing to a new API route.

## Architecture

```
Booking on Cal.com popup
      │
      ▼
Cal.com BOOKING_CREATED webhook ──POST──► /api/cal-webhook  (new Next.js route)
                                              1. verify X-Cal-Signature-256 (HMAC-SHA256)
                                              2. filter triggerEvent === BOOKING_CREATED
                                              3. extract + sanitize fields, format time → IST
                                              4. dedupe by booking uid
                                              5. send template via Meta Cloud API
                                              ▼
                                    graph.facebook.com/{PHONE_NUMBER_ID}/messages
                                              ▼
                                    WhatsApp message → owner's number
```

New file: `src/app/api/cal-webhook/route.ts` (nodejs runtime, `force-dynamic`), following the
existing `src/app/api/contact/route.ts` + `src/lib/rateLimit.ts` patterns.

## The WhatsApp template

Already created on the WABA (template id `1045693681136583`, category **UTILITY**, language
`en_US`, name `portfolio_booking_alert`) — **PENDING** Meta approval at time of writing.

Body (5 positional variables; footer is fixed):

```
📅 New call booked on your portfolio!

👤 Name: {{1}}
✉️ Email: {{2}}
🕒 When: {{3}}
📝 Note: {{4}}
🔗 Join: {{5}}

See you on the call! 🚀
```
Footer: `Sent from hariharanjoga.me`

Variable order the route must fill: **1 name · 2 email · 3 time-in-IST · 4 note · 5 join-link.**

Approval-safety choices: UTILITY category (transactional, fast review, cheapest rate); body
neither starts nor ends with a variable; no two variables adjacent; example values supplied;
fixed footer.

## Webhook route behaviour

### Security
- **HMAC verification:** recompute `HMAC-SHA256(rawBody, CAL_WEBHOOK_SECRET)`, compare
  constant-time against `X-Cal-Signature-256`. Missing/mismatch → `401`, nothing sent. (This is
  what prevents a leaked URL from being used to spam the owner's phone / burn WhatsApp spend.)
- **Rate-limit backstop:** reuse `limit(req, 60)`.
- **Event filter:** only `BOOKING_CREATED`; anything else → `200` no-op.
- **Dedupe:** small in-memory set keyed on booking `uid` (Cal retries on slow responses).
- Token and secrets are server-side only (never `NEXT_PUBLIC_`).

### Field extraction (defensive across Cal payload versions)
- name: `attendees[0].name` → `responses.name.value` → `responses.name`
- email: `attendees[0].email` → `responses.email.value`
- start time: `payload.startTime` (UTC ISO) → formatted to `Asia/Kolkata`, e.g.
  `Sat, 11 Jul 2026, 3:30 PM IST`
- note: `responses.notes.value` → `additionalNotes` → `—`
- join link: `metadata.videoCallUrl` → `videoCallData.url` → `location` (if URL) → booking URL fallback

### Sanitization (WhatsApp param rules)
Strip newlines/tabs, collapse runs of spaces, trim, cap length (name 120, email 200, note ~300,
link left intact). Any empty value becomes `—` (Meta rejects blank template params).

### Reliability
- On send success or failure, return `200` to Cal for a validly-signed `BOOKING_CREATED` (avoid
  retry storms); log failures server-side.
- Optional (nice-to-have, not required): email fallback via the existing Resend integration if
  the WhatsApp send fails.

## Configuration (droplet `.env.local`, gitignored)

| Var | Purpose |
|---|---|
| `WHATSAPP_TOKEN` | permanent System User token (verified: never expires; scopes `whatsapp_business_messaging`, `whatsapp_business_management`) |
| `WHATSAPP_PHONE_NUMBER_ID` | sender phone-number id |
| `WHATSAPP_TEMPLATE_NAME` | `portfolio_booking_alert` |
| `WHATSAPP_TEMPLATE_LANG` | `en_US` |
| `WHATSAPP_API_VERSION` | optional, default `v20.0` |
| `OWNER_WA_NUMBER` | owner's number, international digits |
| `CAL_WEBHOOK_SECRET` | random secret, also pasted into Cal.com webhook config |
| `WHATSAPP_DRY_RUN` | optional `1` → log composed message instead of sending (for testing) |

Not needed for this feature: app secret, verify token, app id, WABA id (WABA id was only used
once to create the template), LLM deployment.

## Owner one-time steps (outside code)
1. Wait for the template to show **APPROVED** in WhatsApp Manager.
2. Cal.com → Settings → Developer → Webhooks → New: URL `https://hariharanjoga.me/api/cal-webhook`,
   event **Booking Created**, secret = `CAL_WEBHOOK_SECRET`. Save.

## Testing
- `WHATSAPP_DRY_RUN=1` logs the composed message + params instead of calling Meta → verify
  formatting before the template is approved and without spending messages.
- Local harness (same style as `security/*.mjs`): POST a correctly **signed** sample
  `BOOKING_CREATED` → expect `200` + logged message; POST with a **wrong signature** → expect
  `401`; POST a non-`BOOKING_CREATED` event → expect `200` no-op.
- One real end-to-end test booking once the template is approved and `WHATSAPP_DRY_RUN` is off.

## Out of scope (YAGNI)
- Reschedule / cancel notifications (only `BOOKING_CREATED`). Easy to add later — same route,
  extra `triggerEvent` cases + templates.
- Multiple recipients / team routing (single owner number).
- Inbound WhatsApp handling (that's the flow the app secret + verify token are for — unused here).

## Security follow-up (operational, not code)
The access token, app secret, and verify token were shared in plaintext during design. Rotate the
**app secret** (Meta → App → Settings → Basic → Reset) and, if desired, the token after rollout.
