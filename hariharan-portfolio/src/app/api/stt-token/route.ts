export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const KEY = process.env.ELEVEN_API_KEY || process.env.ELEVENLABS_API_KEY || "";

// Mints a short-lived single-use token so the browser can stream audio straight to the
// ElevenLabs realtime STT WebSocket without exposing the API key. Token expires in 15 min.
export async function GET() {
  if (!KEY) return Response.json({ error: "no_key" }, { status: 503 });
  try {
    const mod = await import("@elevenlabs/elevenlabs-js");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ElevenLabsClient: any = (mod as any).ElevenLabsClient || (mod as any).default;
    const el = new ElevenLabsClient({ apiKey: KEY });
    const res = await el.tokens.singleUse.create("realtime_scribe");
    const token =
      typeof res === "string" ? res : res?.token ?? res?.value ?? res?.singleUseToken ?? "";
    if (!token) {
      return Response.json(
        { error: "no_token", shape: res && typeof res === "object" ? Object.keys(res) : typeof res },
        { status: 502 },
      );
    }
    return Response.json({ token });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("/api/stt-token error:", msg);
    return Response.json({ error: "token_failed", detail: msg }, { status: 500 });
  }
}
