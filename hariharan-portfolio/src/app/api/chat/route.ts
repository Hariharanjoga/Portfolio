import OpenAI from "openai";
import { PROFILE } from "@/lib/profile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BASE_URL = "https://integrate.api.nvidia.com/v1";

const SYSTEM = `You are the AI assistant embedded on Hariharan Joga's portfolio website. Visitors — often recruiters and founders — ask about Hariharan.

Rules:
- Answer ONLY from the profile below. Speak about him in the third person ("he", "his").
- Default to concise: 2–3 sentences of plain, conversational prose. This is often read ALOUD by a voice agent, so NEVER use markdown, asterisks, headers, bullet points, or numbered lists — just natural spoken sentences. Warm, confident, recruiter-friendly.
- LENGTH EXCEPTION: if asked broadly ("what has he built", "his projects", "overview"), briefly mention ALL of his projects — one short clause each — so none are skipped. If asked about ONE specific project, give its full detail (what it does, the stack, the outcome).
- PROJECT ACCURACY: answer about the EXACT project the user named — never substitute a different, similar-sounding one. "Edu Tech AI" and "Campus Cortex AI" are DIFFERENT projects: Campus Cortex is the production multi-tenant SaaS platform (WhatsApp/Twilio, Postgres+Pinecone); Edu Tech AI is a separate standalone study app (GPT-4 Turbo + Gemini, +40% interaction). Keep them distinct.
- CONTACT: if asked how to reach/contact/hire him, lead with "he can book a quick 15-minute call or email him", then note that LinkedIn, GitHub, his résumé, and the on-page contact form are all available too. Don't reduce it to only email.
- If asked something the profile does not cover (e.g. salary, exact availability), say you don't have that detail and point them to booking a call or his email, hariharanjoga445@gmail.com.
- Never invent facts, employers, dates, numbers, or projects. Don't claim he knows tools not listed.
- If asked "is he a fit for <role>", give an honest, specific read based on the profile.

=== HARIHARAN PROFILE ===
${PROFILE}`;

// Fit-check mode: the user pastes a job title or description; map it to his real evidence.
const FIT_SYSTEM = `You assess whether Hariharan Joga fits a role. The user's message is a job title or job description.

Reply in plain text, tight and scannable (newlines ARE allowed here; no markdown bold or headers):
- Line 1: a verdict — exactly one of "Strong fit", "Good fit", "Partial fit", or "Not a strong fit" — then " — " and one short sentence on why.
- Then one line per KEY requirement of the role (3 to 5 lines, no repeats). START each line with its marker: "✓ " when the profile clearly shows that skill/experience, or "~ " when it is missing, partial, or not mentioned. NEVER put ✓ on something absent, and never mark a clear strength with ~. Format each as: "✓ <requirement> — <his specific project/skill/role>"  OR  "~ <requirement> — not in his profile". Example: "✓ Real-time voice — Bhumi, his sub-800ms voice agent on LiveKit".
- NEVER invent skills, tools, employers, or experience. (His core strengths ARE: agentic/multi-agent AI with LangGraph/CrewAI/PraisonAI, real-time voice AI, RAG, and Generative AI/LLMs — mark those ✓ when the role asks for them.)
- Final line: "Reach him → hariharanjoga445@gmail.com".

Use ONLY the profile below. No preamble before the verdict line.

=== HARIHARAN PROFILE ===
${PROFILE}`;

// Rotate across multiple NVIDIA keys (each free key is ~40 req/min). Round-robin
// spreads load; on a rate-limit (429) we immediately fail over to the next key.
const KEYS = [
  process.env.NVIDIA_NIM_API_KEY_1,
  process.env.NVIDIA_NIM_API_KEY_2,
  process.env.NVIDIA_NIM_API_KEY_3,
  process.env.NVIDIA_API_KEY, // legacy single-key fallback
].filter((k): k is string => !!k && k.trim().length > 0);

let cursor = 0; // round-robin position across KEYS

// Lightweight per-IP rate limit to protect the public endpoint.
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 30; // 30 req/min/IP
}

type Msg = { role: "system" | "user" | "assistant"; content: string };

// Try keys in rotation; on 429 / 5xx, immediately move to the next key.
async function openStream(messages: Msg[], modelOverride?: string) {
  const model = modelOverride || process.env.CHAT_MODEL || "meta/llama-3.1-8b-instruct";
  const n = KEYS.length;
  let lastErr: unknown;
  for (let i = 0; i < n; i++) {
    const key = KEYS[(cursor + i) % n];
    try {
      const client = new OpenAI({ apiKey: key, baseURL: BASE_URL });
      const stream = await client.chat.completions.create({
        model,
        temperature: 0.4,
        max_tokens: 600,
        stream: true,
        messages,
      });
      cursor = (cursor + i + 1) % n; // advance so the next request starts on a fresh key
      return stream;
    } catch (err) {
      lastErr = err;
      const status = (err as { status?: number })?.status;
      if (status === 429 || status === 500 || status === 502 || status === 503) continue;
      throw err;
    }
  }
  throw lastErr;
}

// Fit-checks use a stronger model for better reasoning; fall back to the default if it is unavailable.
async function getStream(messages: Msg[], mode: string) {
  if (mode === "fit") {
    const fitModel = process.env.FIT_MODEL || "meta/llama-3.3-70b-instruct";
    try {
      return await openStream(messages, fitModel);
    } catch {
      return await openStream(messages);
    }
  }
  return openStream(messages);
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    if (rateLimited(ip)) return Response.json({ error: "rate_limited" }, { status: 429 });

    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const mode = String(body.mode || "").trim();
    const question = String(body.question || "").slice(0, mode === "fit" ? 4000 : 600).trim();
    if (!question) return Response.json({ error: "no_question" }, { status: 400 });

    const rawHistory = Array.isArray(body.history) ? (body.history as unknown[]) : [];
    const history: Msg[] = rawHistory
      .slice(-6)
      .map((m) => {
        const mm = m as { role?: unknown; content?: unknown };
        return {
          role: mm.role === "user" ? "user" : "assistant",
          content: String(mm.content || "").slice(0, 1200),
        } as Msg;
      })
      .filter((m) => m.content);

    if (!KEYS.length) return Response.json({ error: "no_key" }, { status: 503 });

    const messages: Msg[] =
      mode === "fit"
        ? [{ role: "system", content: FIT_SYSTEM }, { role: "user", content: question }]
        : [{ role: "system", content: SYSTEM }, ...history, { role: "user", content: question }];
    const stream = await getStream(messages, mode);

    // Pipe model deltas straight to the client as plain-text chunks → instant first token.
    const encoder = new TextEncoder();
    const rs = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const piece = chunk.choices?.[0]?.delta?.content || "";
            if (piece) controller.enqueue(encoder.encode(piece));
          }
        } catch (err) {
          console.error("/api/chat stream error:", err instanceof Error ? err.message : err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(rs, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err) {
    console.error("/api/chat error:", err instanceof Error ? err.message : err);
    return Response.json({ error: "chat_failed" }, { status: 500 });
  }
}
