import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

    // Honeypot — bots fill hidden fields; humans don't.
    if (body.company) return Response.json({ ok: true });

    const name = String(body.name || "").slice(0, 120).trim();
    const email = String(body.email || "").slice(0, 200).trim();
    const message = String(body.message || "").slice(0, 5000).trim();

    if (!name || !email || !message) {
      return Response.json({ error: "missing_fields" }, { status: 400 });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return Response.json({ error: "bad_email" }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return Response.json({ error: "no_key" }, { status: 503 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const to = process.env.CONTACT_TO || "hariharanjoga445@gmail.com";
    const from = process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `New message from your portfolio site\n\nName:  ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("resend error:", error);
      return Response.json({ error: "send_failed" }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("/api/contact error:", err instanceof Error ? err.message : err);
    return Response.json({ error: "contact_failed" }, { status: 500 });
  }
}
