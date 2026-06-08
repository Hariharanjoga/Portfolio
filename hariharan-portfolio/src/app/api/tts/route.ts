// Text-to-speech via ElevenLabs Flash v2.5 (~75ms, best-in-class English).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const KEY = process.env.ELEVEN_API_KEY || process.env.ELEVENLABS_API_KEY || "";
const MODEL = process.env.ELEVEN_MODEL || "eleven_flash_v2_5";
const VOICE = process.env.VOICE_ID || "OtEfb2LVzIE45wdYe54M";

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as { text?: unknown };
    const text = String(body.text || "").slice(0, 1500).trim();
    if (!text) return Response.json({ error: "no_text" }, { status: 400 });
    if (!KEY) return Response.json({ error: "no_key" }, { status: 503 });

    // /stream returns chunked mp3 → audio starts playing sooner.
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE}/stream?output_format=mp3_44100_128`;
    const r = await fetch(url, {
      method: "POST",
      headers: {
        "xi-api-key": KEY,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: MODEL,
        voice_settings: { stability: 0.5, similarity_boost: 0.8, use_speaker_boost: true },
      }),
    });

    if (!r.ok || !r.body) {
      const detail = await r.text().catch(() => "");
      console.error("ElevenLabs TTS error:", r.status, detail.slice(0, 300));
      return Response.json({ error: "tts_failed", status: r.status }, { status: 502 });
    }

    return new Response(r.body, {
      headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store", "X-Accel-Buffering": "no" },
    });
  } catch (err) {
    console.error("/api/tts error:", err instanceof Error ? err.message : err);
    return Response.json({ error: "tts_failed" }, { status: 500 });
  }
}
