// Speech-to-text via ElevenLabs Scribe (most accurate English STT; covers Hindi/Telugu too).
import { limit } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const KEY = process.env.ELEVEN_API_KEY || process.env.ELEVENLABS_API_KEY || "";
const STT_MODEL = process.env.ELEVEN_STT_MODEL || "scribe_v1";

export async function POST(req: Request) {
  try {
    const limited = limit(req, 20); // 20 req/min per client IP — paid ElevenLabs call
    if (limited) return limited;

    if (!KEY) return Response.json({ error: "no_key" }, { status: 503 });

    const inForm = await req.formData().catch(() => null);
    const file = inForm?.get("file");
    if (!file || typeof file === "string") {
      return Response.json({ error: "no_audio" }, { status: 400 });
    }

    const out = new FormData();
    out.append("file", file);
    out.append("model_id", STT_MODEL);
    out.append("tag_audio_events", "false"); // don't inject "(laughter)"/"(thumping)" tags into the transcript

    const r = await fetch("https://api.elevenlabs.io/v1/speech-to-text", {
      method: "POST",
      headers: { "xi-api-key": KEY },
      body: out,
    });

    if (!r.ok) {
      const detail = await r.text().catch(() => "");
      console.error("ElevenLabs STT error:", r.status, detail.slice(0, 300));
      return Response.json({ error: "stt_failed", status: r.status }, { status: 502 });
    }

    const data = (await r.json()) as { text?: string };
    return Response.json({ text: (data.text || "").trim() });
  } catch (err) {
    console.error("/api/stt error:", err instanceof Error ? err.message : err);
    return Response.json({ error: "stt_failed" }, { status: 500 });
  }
}
