# Privacy model

Orbit analyses **private conversations**, so this page spells out exactly where your data goes.
It describes the code in this repository. If you use someone else's deployment, they could
have changed it.

## TL;DR

| Data | Where it goes | Stored? |
|---|---|---|
| Your chat export | Browser → Orbit's `/api/analyze` route → Anthropic **or** Google | Not stored or logged by Orbit. The LLM provider's own retention policy applies. |
| Your API key (BYOK) | Saved in your browser's `localStorage`; sent with each analysis request → `/api/analyze` → the provider | Only in your browser. The server uses it for one request and keeps nothing. |
| Analysis result | Provider → `/api/analyze` → your browser | Only in the page's memory. Gone when you close the tab. |
| Page views | Vercel Web Analytics (`@vercel/analytics`) | Anonymous page-view counts. No chat content. |

## Step by step

1. **You pick a file.** The browser reads it locally (`src/app/analyze/page.tsx`).
2. **One POST request** to `/api/analyze` carries `chatText`, `apiKey`, `provider` and
   `relationshipType` as JSON over HTTPS.
3. **The server route** (`src/app/api/analyze/route.ts`):
   - rate-limits by IP (in memory),
   - runs a deterministic stats pass locally (`src/lib/analysis/`). Nothing leaves the server for this step,
   - if the chat is longer than 200,000 characters, keeps the first 150,000 and last 50,000,
   - sends the (possibly truncated) chat plus a system prompt to **one** provider:
     - Anthropic: `https://api.anthropic.com/v1/messages` (key in the `x-api-key` header)
     - Google: `https://generativelanguage.googleapis.com/...:generateContent` (key in the URL query string)
   - returns the provider's JSON plus the computed stats.
4. **Nothing is written to disk, a database, or logs.** The route has no `console.log` calls.
   Your hosting platform (e.g. Vercel) may still keep standard request logs, such as
   URL, status and timing, but not request bodies.

## Why does the key go through the server at all?

Browsers block direct calls to most LLM APIs (CORS), and proxying keeps one
provider-agnostic code path. The trade-off: **you have to trust whoever runs the
deployment** not to log request bodies. If that isn't acceptable, self-host:
`npm install && npm run dev` runs everything on your machine.

## Server-side keys (`.env.local`)

If `ANTHROPIC_API_KEY` / `GOOGLE_API_KEY` are set on the server, they are used **whenever a
request doesn't include its own key**. On a public deployment, that means anyone can run
analyses on your bill, limited only by the in-memory rate limit. Only set them on a private
or self-hosted instance.

## What's in this repository

- No real chat exports are committed. The git history was checked on 2026-10-07, and
  `.gitignore` excludes `/chat_export/` and `*.zip`.
- `src/data/demo.ts` contains a **fictional** "Alex & Sam" sample.

## Reporting a problem

See [SECURITY.md](https://github.com/yogigodaraa/.github/blob/main/SECURITY.md). Please report
privately via **Security → Report a vulnerability**.
