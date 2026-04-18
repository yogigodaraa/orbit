# TrackFights

AI-powered relationship & chat analysis. Upload a WhatsApp or Instagram chat export and get a deep, structured breakdown — ratings across 8 dimensions, fight patterns, love tracking, early-warning signals, predictions, and a blunt verdict.

Built with Next.js 16 + React 19 + Recharts + Tailwind v4.

## Features

- **Bring your own API key.** Paste a Claude or Gemini key into the UI — it's stored in your browser's `localStorage` only and sent directly to the provider. Never touches a backend we control.
- **Free demo mode.** Click *Try Demo* to see the full dashboard populated with fictional sample data — no key required.
- **Two providers.** Claude (Anthropic) for best-quality analysis, or Gemini 2.0 Flash (Google, free tier with 1,500 requests/day) for $0 usage.
- **Full dashboard.** 12 sections covering volume, love & affection, reciprocity, conflict, psychological patterns, 0–100 ratings, predictions, early warnings, word clouds, health timeline, and a final verdict.

## Getting started

```bash
git clone <this-repo>
cd trackfights
npm install
npm run dev
```

Open <http://localhost:3000>.

### Running the analysis

You have three options:

1. **Try Demo** — no setup. Shows fictional "Alex & Sam" data so you can explore the dashboard.
2. **Paste a key in the UI** — click *Analyze* in the sidebar, pick a provider, paste your key, upload a chat export. The key stays in `localStorage`.
3. **Self-host with a server env var** — copy `.env.example` to `.env.local` and fill in `ANTHROPIC_API_KEY` and/or `GOOGLE_API_KEY`. The UI's key input becomes optional in this mode.

### Getting an API key

- **Claude (Anthropic)** — <https://console.anthropic.com/settings/keys>. Pay-as-you-go; a full analysis typically costs a few cents.
- **Gemini (Google, free tier)** — <https://aistudio.google.com/app/apikey>. Free up to 15 requests/minute and 1,500 requests/day.

### Exporting a chat

- **WhatsApp** — open a chat → `⋯` → More → Export chat → *Without media*. You'll get a `.txt` file.
- **Instagram** — Settings → Accounts Center → Your information and permissions → Download your information → select Messages.

## Privacy

Your chat text is sent directly from your browser to either Anthropic or Google, using the API key you paste. Nothing is logged or stored by TrackFights itself. The key lives only in your browser's `localStorage` and can be cleared by pressing *Hide* → clearing the input.

If you self-host with a server env var, the chat text still only ever touches your own server and the AI provider.

## Project layout

```
src/
  app/
    page.tsx       — landing page
    analyze/       — upload + BYOK flow (the tool)
    api/analyze/   — provider-agnostic analysis endpoint
    layout.tsx     — root layout (sidebar + metadata)
  components/
    DynamicDashboard.tsx  — the 12-section dashboard (used by /analyze)
    Sidebar.tsx           — nav (hidden on landing)
  data/
    demo.ts        — fictional sample used by "Try Demo"
```

## Rate limiting

The `/api/analyze` endpoint has a built-in in-memory rate limit (10 requests / 10 minutes per IP) as a baseline guard. This works for self-hosted and single-instance deploys.

**For multi-instance production** (Vercel serverless, etc.), the in-memory limit is per-lambda and effectively weaker. Swap it for [Upstash Ratelimit](https://upstash.com/docs/redis/sdks/ratelimit-ts/overview) if you expose a server env key, or simply ship BYOK-only so users pay their own bill.

## Deploying publicly

Two recommended modes:

- **BYOK-only (safest)** — don't set `ANTHROPIC_API_KEY` / `GOOGLE_API_KEY` on the server. Visitors can use *Try Demo* with no key or paste their own. You pay $0.
- **With a server fallback key** — add Upstash Ratelimit and set a strict daily budget on the provider side. Anyone hitting the endpoint otherwise runs up your bill.

## License

MIT — see [LICENSE](./LICENSE).

## Credits

Built by [Yogi](https://github.com/yogiduzit). Powered by Claude & Gemini.
