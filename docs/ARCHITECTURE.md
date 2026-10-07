# Architecture

How Orbit turns a chat export into a dashboard, written to be read top to bottom by someone
new to the codebase.

## The big picture

```text
 Browser                                     Next.js server                       LLM provider
┌────────────────────────────┐   POST     ┌──────────────────────────────┐      ┌────────────┐
│ app/analyze/page.tsx       │ ─────────▶ │ app/api/analyze/route.ts     │ ───▶ │ Anthropic  │
│  • pick relationship type  │  chatText  │  1. rate limit (per IP)      │      │   or       │
│  • paste BYOK key          │  apiKey    │  2. validate body            │ ◀─── │ Google     │
│  • upload chat export      │  provider  │  3. lib/analysis → stats     │ JSON └────────────┘
│                            │ ◀───────── │  4. prompt = stats + config  │
│ components/                │   JSON     │  5. call provider, parse JSON│
│  DynamicDashboard.tsx      │            │  6. merge stats into result  │
└────────────────────────────┘            └──────────────────────────────┘
```

There is **no database** and no user accounts. Everything lives for one request.

## Modules

### `src/app/` (pages and the API route)

| File | Role |
|---|---|
| `page.tsx` | Marketing/landing page |
| `analyze/page.tsx` | The app: relationship picker, provider + key input (persisted to `localStorage`), file upload, "Try demo", then renders the dashboard |
| `api/analyze/route.ts` | The only server code. Validates input, computes grounding stats, picks the system prompt, calls the provider, and returns JSON |

**Concept: App Router route handlers.** In Next.js, a file at `app/api/x/route.ts` that
exports `POST` becomes an HTTP endpoint at `/api/x`. It runs on the server (a serverless
function on Vercel), so code there is never shipped to the browser.

### `src/lib/analysis/` (deterministic grounding)

LLMs are good at narrative and bad at counting. This folder computes hard numbers **without**
an LLM, so the model reads facts instead of guessing them.

| File | What it computes |
|---|---|
| `parse.ts` | Turns raw WhatsApp (iOS/Android) or Instagram text into `ChatMessage[]`. Tries several timestamp regexes, and joins multi-line messages. |
| `stats.ts` | Per-sender volume, reply latency, streaks, silences, reciprocity, activity histograms |
| `gottman.ts` | Gottman positive:negative ratio per month, using a small hand-written word lexicon |
| `attachment.ts` | Heuristic attachment-style signals (pursuit, withdrawal, latency, love bids). Explicitly *not* clinical. |
| `index.ts` | `runAnalysis()` runs the pipeline and builds `llmContext`, a text block prepended to the system prompt |

**Concept: grounding.** Putting computed facts in the prompt ("Messages: 12,403 over 210 days")
lowers hallucination. The route also returns those numbers separately (`grounding`), so the UI
can show them even if the LLM gets them wrong.

The analysis step is wrapped in `try/catch`: if parsing fails on an unusual export, the request
still goes to the LLM with the raw text.

### `src/data/relationships/` (per-type configuration)

One file per relationship type (`romantic.ts`, `mother.ts`, `professional.ts`, …), each exporting
a config with its **system prompt**, UI copy, theme and demo data. `registry.ts` maps ids to configs
and `types.ts` defines the shape. Adding a new type means one new file plus a registry entry.
No other code changes.

### `src/components/`

| File | Role |
|---|---|
| `DynamicDashboard.tsx` | Renders the 12-section dashboard from the LLM JSON (Recharts for charts), using the selected type's headings and theme |
| `RelationshipSelector.tsx` | The 9-type picker |
| `Sidebar.tsx` | Section navigation |

## Data contract

The system prompt asks the model to return **only JSON** in a fixed shape (participants, volume,
affection, conflict, psych patterns, ratings, …). See `FALLBACK_SYSTEM_PROMPT` in
`route.ts` for the canonical schema. If the provider returns text that isn't valid JSON, the
route throws `ParseError` and the UI shows an error. That's the most common failure mode.

## Limits and safety rails

| Guard | Where | Value |
|---|---|---|
| Rate limit | `route.ts` | 10 requests / 10 min / IP, in-memory (per instance) |
| Min / max size | `route.ts` | 100 chars / 2,000,000 chars |
| Truncation | `route.ts` | >200k chars → first 150k + last 50k |
| Models | `route.ts` | `claude-sonnet-4-20250514`, `gemini-2.0-flash` (hard-coded) |

## Where to start reading

1. `src/app/api/analyze/route.ts`, from the `POST` function at the bottom up.
2. `src/lib/analysis/index.ts`, then `parse.ts`.
3. `src/data/relationships/romantic.ts`, to see what a type config looks like.

See [PRIVACY.md](PRIVACY.md) for exactly what data leaves the browser.
