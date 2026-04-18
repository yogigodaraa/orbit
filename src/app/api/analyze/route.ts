import { NextRequest, NextResponse } from 'next/server';
import { allConfigs } from '@/data/relationships/registry';
import type { RelationshipTypeId } from '@/data/relationships/types';

/* ─── Types ─── */

type Provider = 'anthropic' | 'google';

interface AnalyzeRequestBody {
  chatText?: unknown;
  apiKey?: unknown;
  provider?: unknown;
  relationshipType?: unknown;
}

interface ErrorPayload {
  error: string;
  code:
    | 'invalid_body'
    | 'invalid_type'
    | 'chat_too_short'
    | 'chat_too_large'
    | 'missing_key'
    | 'invalid_provider'
    | 'rate_limited'
    | 'upstream_error'
    | 'parse_error'
    | 'unknown';
  details?: string;
}

function errorResponse(status: number, payload: ErrorPayload, headers?: HeadersInit) {
  return NextResponse.json(payload, { status, headers });
}

/* ─── Rate limiting (in-memory, per-IP) ───
 *
 * 10 requests per 10 minutes per IP. In-memory state is per-instance, so on a
 * multi-instance deploy (Vercel serverless, etc.) each lambda has its own bucket —
 * limits are weaker than they appear. For production, swap this for Upstash
 * Ratelimit (see README). This is a baseline guard for self-hosted and dev use.
 */
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

function clientIp(req: NextRequest): string {
  // Vercel / most proxies send x-forwarded-for as "client, proxy1, proxy2..."
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'anonymous';
}

function checkRateLimit(ip: string): { allowed: true } | { allowed: false; retryAfterSec: number } {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(ip);

  // Lazy sweep — keep the map from growing unbounded
  if (rateLimitBuckets.size > 5000) {
    for (const [key, value] of rateLimitBuckets) {
      if (value.resetAt < now) rateLimitBuckets.delete(key);
    }
  }

  if (!bucket || bucket.resetAt < now) {
    rateLimitBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }
  if (bucket.count >= RATE_LIMIT_MAX) {
    return { allowed: false, retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  bucket.count += 1;
  return { allowed: true };
}

/* ─── Config ─── */

const MIN_CHAT_CHARS = 100;
const MAX_CHAT_CHARS = 2_000_000; // ~2 MB upper bound; refused above this
const TRUNCATE_THRESHOLD = 200_000;
const TRUNCATE_HEAD = 150_000;
const TRUNCATE_TAIL = 50_000;

const FALLBACK_SYSTEM_PROMPT = `You are an expert relationship analyst. Analyze the following chat export between two people.

Return ONLY valid JSON (no markdown, no explanation) with this exact structure:
{
  "participants": { "person1": "Name1", "person2": "Name2" },
  "totalMessages": number,
  "totalDays": number,
  "dateRange": { "start": "Mon YYYY", "end": "Mon YYYY" },
  "rawVolume": {
    "person1": { "messages": number, "avgReplyMin": number, "startsDay": number },
    "person2": { "messages": number, "avgReplyMin": number, "startsDay": number }
  },
  "loveAffection": [
    { "label": "Love expressions", "person1": number, "person2": number },
    { "label": "Missing each other", "person1": number, "person2": number },
    { "label": "Good morning/night", "person1": number, "person2": number },
    { "label": "Check-ins on wellbeing", "person1": number, "person2": number },
    { "label": "Emotional support given", "person1": number, "person2": number },
    { "label": "Future planning", "person1": number, "person2": number }
  ],
  "reciprocity": {
    "person1SaysLovePerson2Reciprocates": number,
    "person2SaysLovePerson1Reciprocates": number
  },
  "conflict": [
    { "label": "Starts conflicts", "person1": number, "person2": number },
    { "label": "Escalation/ultimatums", "person1": number, "person2": number },
    { "label": "Accusations", "person1": number, "person2": number },
    { "label": "Threats to leave", "person1": number, "person2": number },
    { "label": "Breaks silence after fight", "person1": number, "person2": number }
  ],
  "psychPatterns": [
    { "label": "Harsh language", "person1": number, "person2": number, "note": "string" },
    { "label": "Guilt-tripping", "person1": number, "person2": number, "note": "string" },
    { "label": "Self-blame", "person1": number, "person2": number, "note": "string" },
    { "label": "Jealousy/possessiveness", "person1": number, "person2": number, "note": "string" },
    { "label": "Gaslighting", "person1": number, "person2": number, "note": "string" }
  ],
  "ratings": {
    "person1": {
      "overall": number,
      "dimensions": [
        { "name": "Emotional Investment", "score": number, "detail": "string" },
        { "name": "Availability", "score": number, "detail": "string" },
        { "name": "Conflict Management", "score": number, "detail": "string" },
        { "name": "Emotional Maturity", "score": number, "detail": "string" },
        { "name": "Respect for Boundaries", "score": number, "detail": "string" },
        { "name": "Consistency", "score": number, "detail": "string" },
        { "name": "Communication Quality", "score": number, "detail": "string" },
        { "name": "Self-awareness", "score": number, "detail": "string" }
      ]
    },
    "person2": { "overall": number, "dimensions": [ /* same 8 dimensions */ ] }
  },
  "predictions": [
    { "title": "string", "probability": number, "severity": "critical|high|medium", "timeframe": "string", "description": "string" }
  ],
  "earlyWarnings": [
    { "level": "critical|high|medium", "title": "string", "detail": "string", "trend": "up|down|flat" }
  ],
  "topWords": {
    "person1": [{ "word": "string", "count": number }],
    "person2": [{ "word": "string", "count": number }]
  },
  "healthTimeline": [
    { "period": "string", "messages": number, "health": number }
  ],
  "verdict": {
    "person1Summary": "string (2-3 sentences)",
    "person2Summary": "string (2-3 sentences)",
    "relationshipSummary": "string (2-3 sentences)"
  }
}

Be thorough and count carefully. Base everything on actual message content. If the chat is in a mix of languages, understand all of them. Be brutally honest in the verdict.`;

/* ─── Provider calls ─── */

async function callAnthropic(apiKey: string, chatText: string, systemPrompt: string): Promise<unknown> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8000,
      system: systemPrompt,
      messages: [{ role: 'user', content: `Analyze this chat:\n\n${chatText}` }],
    }),
  });

  if (!response.ok) {
    throw new UpstreamError(`Claude API error (${response.status})`, await response.text());
  }

  const data = await response.json();
  const text = data?.content?.[0]?.text;
  if (typeof text !== 'string') {
    throw new ParseError('Claude returned no text content', JSON.stringify(data).slice(0, 500));
  }
  return extractJson(text);
}

async function callGoogle(apiKey: string, chatText: string, systemPrompt: string): Promise<unknown> {
  // Gemini 2.0 Flash — free tier, 1M context, native JSON output.
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(
    apiKey
  )}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: 'user', parts: [{ text: `Analyze this chat:\n\n${chatText}` }] }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 8000,
        responseMimeType: 'application/json',
      },
    }),
  });

  if (!response.ok) {
    throw new UpstreamError(`Gemini API error (${response.status})`, await response.text());
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof text !== 'string') {
    throw new ParseError('Gemini returned no text content', JSON.stringify(data).slice(0, 500));
  }
  // Gemini returns pure JSON when responseMimeType is application/json,
  // so direct parse first, fall back to extraction.
  try {
    return JSON.parse(text);
  } catch {
    return extractJson(text);
  }
}

/* ─── Helpers ─── */

class UpstreamError extends Error {
  details: string;
  constructor(message: string, details: string) {
    super(message);
    this.details = details;
  }
}

class ParseError extends Error {
  details: string;
  constructor(message: string, details: string) {
    super(message);
    this.details = details;
  }
}

function extractJson(text: string): unknown {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) {
    throw new ParseError('Could not find JSON object in model output', text.slice(0, 500));
  }
  try {
    return JSON.parse(match[0]);
  } catch (err) {
    throw new ParseError(
      'Model output was not valid JSON',
      err instanceof Error ? err.message : 'unknown'
    );
  }
}

function truncate(chatText: string): string {
  if (chatText.length <= TRUNCATE_THRESHOLD) return chatText;
  return (
    chatText.slice(0, TRUNCATE_HEAD) +
    '\n\n[...middle truncated...]\n\n' +
    chatText.slice(-TRUNCATE_TAIL)
  );
}

/* ─── Route ─── */

export async function POST(req: NextRequest) {
  // Rate limit first — cheaper than parsing a large body under abuse
  const ip = clientIp(req);
  const rl = checkRateLimit(ip);
  if (!rl.allowed) {
    return errorResponse(
      429,
      {
        error: `Rate limit exceeded. Try again in ${rl.retryAfterSec} seconds.`,
        code: 'rate_limited',
      },
      { 'Retry-After': String(rl.retryAfterSec) }
    );
  }

  let body: AnalyzeRequestBody;
  try {
    body = (await req.json()) as AnalyzeRequestBody;
  } catch {
    return errorResponse(400, { error: 'Invalid JSON body', code: 'invalid_body' });
  }

  // Validate chatText
  if (typeof body.chatText !== 'string') {
    return errorResponse(400, { error: 'chatText must be a string', code: 'invalid_body' });
  }
  if (body.chatText.length < MIN_CHAT_CHARS) {
    return errorResponse(400, {
      error: `Chat text too short (need at least ${MIN_CHAT_CHARS} characters)`,
      code: 'chat_too_short',
    });
  }
  if (body.chatText.length > MAX_CHAT_CHARS) {
    return errorResponse(413, {
      error: `Chat text too large (max ${MAX_CHAT_CHARS.toLocaleString()} characters)`,
      code: 'chat_too_large',
    });
  }

  // Resolve relationship type -> system prompt
  let systemPrompt: string;
  if (typeof body.relationshipType === 'string') {
    if (Object.prototype.hasOwnProperty.call(allConfigs, body.relationshipType)) {
      const cfg = allConfigs[body.relationshipType as RelationshipTypeId];
      systemPrompt = cfg.systemPrompt;
    } else {
      return errorResponse(400, {
        error: `Unknown relationshipType: ${body.relationshipType}`,
        code: 'invalid_type',
      });
    }
  } else if (body.relationshipType === undefined) {
    const romantic = allConfigs['romantic' as RelationshipTypeId];
    systemPrompt = romantic?.systemPrompt ?? FALLBACK_SYSTEM_PROMPT;
  } else {
    return errorResponse(400, {
      error: 'relationshipType must be a string',
      code: 'invalid_type',
    });
  }

  // Resolve provider + key. Fall back to server env when BYOK is not provided
  // so self-hosted users with a .env.local still work without touching the UI.
  const provider: Provider = body.provider === 'google' ? 'google' : 'anthropic';

  const serverKey =
    provider === 'google' ? process.env.GOOGLE_API_KEY : process.env.ANTHROPIC_API_KEY;

  const userKey = typeof body.apiKey === 'string' && body.apiKey.trim().length > 0
    ? body.apiKey.trim()
    : null;

  const apiKey = userKey ?? serverKey ?? null;

  if (!apiKey) {
    return errorResponse(401, {
      error:
        provider === 'google'
          ? 'No Gemini API key provided. Paste your key in the UI or set GOOGLE_API_KEY in the server env.'
          : 'No Anthropic API key provided. Paste your key in the UI or set ANTHROPIC_API_KEY in the server env.',
      code: 'missing_key',
    });
  }

  const chatText = truncate(body.chatText);

  try {
    const analysis =
      provider === 'google'
        ? await callGoogle(apiKey, chatText, systemPrompt)
        : await callAnthropic(apiKey, chatText, systemPrompt);
    return NextResponse.json(analysis);
  } catch (err) {
    if (err instanceof UpstreamError) {
      return errorResponse(502, {
        error: err.message,
        code: 'upstream_error',
        details: err.details.slice(0, 500),
      });
    }
    if (err instanceof ParseError) {
      return errorResponse(500, {
        error: err.message,
        code: 'parse_error',
        details: err.details,
      });
    }
    return errorResponse(500, {
      error: 'Analysis failed',
      code: 'unknown',
      details: err instanceof Error ? err.message : 'unknown',
    });
  }
}
