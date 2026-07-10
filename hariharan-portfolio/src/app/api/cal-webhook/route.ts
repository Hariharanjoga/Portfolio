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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
