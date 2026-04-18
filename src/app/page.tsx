import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orbit — Decode Any Chat, Any Relationship",
  description:
    "Upload any WhatsApp or Instagram chat. Orbit tunes the analysis to who the other person is — partner, ex, situationship, best friend, sibling, mom, dad, or boss. Brutally honest, every time.",
};

/* ──────────────────────────── icons (inline SVG) ──────────────────────────── */

function IconRatings() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
      <path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" />
    </svg>
  );
}

function IconFight() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-rose-400">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconLove() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function IconPredict() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function IconWarning() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function IconPsych() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
      <path d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/* ──────────────────────────────── data ─────────────────────────────────── */

const features = [
  {
    icon: <IconLove />,
    title: "Romantic & Ex",
    desc: "Affection balance, fight dynamics, and honest verdicts on whether it's love, habit, or something you should have walked away from.",
  },
  {
    icon: <span className="text-2xl">💫</span>,
    title: "Situationships",
    desc: "Decode the mixed signals. Who's actually invested, who's keeping a backup, and where this is really headed.",
  },
  {
    icon: <IconRatings />,
    title: "Best Friend & Friends",
    desc: "Who reaches out first, who holds space, and whether the friendship is mutual or quietly one-sided.",
  },
  {
    icon: <IconPsych />,
    title: "Mother & Father",
    desc: "Attachment patterns, guilt trips, and unspoken expectations surfaced from years of messages with a parent.",
  },
  {
    icon: <IconWarning />,
    title: "Siblings",
    desc: "Rivalry, loyalty, and the family dynamics hiding in plain sight — from childhood patterns to adult tension.",
  },
  {
    icon: <IconPredict />,
    title: "Work & Professional",
    desc: "Tone, power dynamics, and boundary violations with a boss, coworker, or client — with receipts.",
  },
];

const steps = [
  {
    num: "01",
    title: "Pick the relationship",
    desc: "Pick who it's with — partner, ex, friend, mom, boss. That tunes every metric.",
  },
  {
    num: "02",
    title: "Paste your API key",
    desc: "Free Gemini key or a Claude key. Stored only in your browser\u2019s localStorage, sent directly to the provider.",
  },
  {
    num: "03",
    title: "Get your analysis",
    desc: "Full deep analysis in under 60 seconds. Ratings, dynamics, predictions, and more.",
  },
];

/* ──────────────────────────────── page ─────────────────────────────────── */

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative isolate flex flex-col items-center justify-center px-6 pt-32 pb-24 text-center overflow-hidden">
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{
            background:
              "radial-gradient(ellipse at center, #3b82f6 0%, #ec4899 50%, transparent 80%)",
          }}
        />

        <p className="mb-5 text-sm font-medium tracking-widest uppercase text-[#9ca3af]">
          AI-Powered Chat Analysis
        </p>

        <h1 className="relative max-w-3xl text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #60a5fa 0%, #c084fc 40%, #f472b6 100%)",
            }}
          >
            Decode Any Chat.
          </span>
          <br />
          <span className="text-white">Any Relationship.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#9ca3af]">
          Upload any WhatsApp or Instagram chat. We tune the analysis to who
          the other person is — partner, ex, best friend, mom, boss. Brutally
          honest, every time.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/analyze"
            className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.03] hover:shadow-blue-500/25 active:scale-[0.98]"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
            }}
          >
            Analyze Your Chat
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <Link
            href="/analyze"
            className="inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold text-[#e4e4e7] border border-[#1e2130] hover:border-[#2d3150] hover:bg-[#12141c] transition-colors"
          >
            Try Demo
          </Link>
        </div>

        <p className="mt-6 text-xs font-medium text-[#6b7280] tracking-wide">
          Bring your own Claude or Gemini key · Free demo included · Open source
        </p>
      </section>

      {/* ── What You Get ─────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-5xl px-6 py-24">
        <div className="mb-14 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Tuned To The Relationship
          </h2>
          <p className="mt-3 text-[#9ca3af] text-base max-w-lg mx-auto">
            Six contexts. Each one reads the chat through a different lens.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-[#1e2130] p-6 transition-colors duration-200 hover:border-[#2d3150]"
              style={{ backgroundColor: "#12141c" }}
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-base font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#9ca3af]">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <div className="mb-14 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            How It Works
          </h2>
          <p className="mt-3 text-[#9ca3af] text-base">
            Three steps. Under a minute.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.num} className="relative flex flex-col">
              <span
                className="text-5xl font-black bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, #1e2130 0%, #12141c 100%)",
                }}
              >
                {s.num}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#9ca3af]">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Privacy ───────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 py-24">
        <div
          className="rounded-2xl border border-[#1e2130] px-8 py-10 text-center"
          style={{ backgroundColor: "#12141c" }}
        >
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#1e2130]" style={{ backgroundColor: "#0a0b0f" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Your privacy is non-negotiable
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#9ca3af] max-w-xl mx-auto">
            Your chat goes directly from your browser to Anthropic or Google
            using the API key you paste. Your key lives in your browser&apos;s
            localStorage only. Nothing is stored or logged on our side. Open source,
            self-hostable, no accounts, no tracking.
          </p>
        </div>
      </section>

      {/* ── Ways to Use ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <div className="mb-14 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Three Ways to Use It
          </h2>
          <p className="mt-3 text-[#9ca3af] text-base">
            All free. No accounts. No catch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Demo */}
          <div
            className="rounded-xl border border-[#1e2130] p-8 flex flex-col"
            style={{ backgroundColor: "#12141c" }}
          >
            <h3 className="text-lg font-semibold text-white">Demo</h3>
            <p className="mt-1 text-2xl font-extrabold text-white">
              $0
              <span className="text-sm font-medium text-[#6b7280]">
                {" "}/ no key needed
              </span>
            </p>
            <ul className="mt-6 space-y-3 text-sm text-[#9ca3af] flex-1">
              {[
                "Full dashboard with fictional sample data",
                "See every feature instantly",
                "No signup, no uploads",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-[#6b7280]">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/analyze"
              className="mt-8 inline-flex items-center justify-center rounded-lg border border-[#1e2130] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1a1d27] hover:border-[#2d3150]"
            >
              Try Demo
            </Link>
          </div>

          {/* Gemini free tier */}
          <div
            className="relative rounded-xl border border-blue-500/30 p-8 flex flex-col overflow-hidden"
            style={{ backgroundColor: "#12141c" }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-10 blur-[80px]"
              style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)" }}
            />

            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-white">Gemini</h3>
              <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-300 border border-blue-500/30" style={{ backgroundColor: "rgba(59,130,246,0.1)" }}>
                Free Tier
              </span>
            </div>
            <p className="mt-1 text-2xl font-extrabold text-white">
              $0
              <span className="text-sm font-medium text-[#6b7280]">
                {" "}/ up to 1500/day
              </span>
            </p>
            <ul className="mt-6 space-y-3 text-sm text-[#9ca3af] flex-1">
              {[
                "Google AI Studio free key",
                "1M context window (huge chats)",
                "Real analysis of your chat",
                "15 requests/min, 1500/day",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-blue-400">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-blue-500/20 active:scale-[0.98]"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              }}
            >
              Get a Free Key
            </a>
          </div>

          {/* Claude */}
          <div
            className="rounded-xl border border-[#1e2130] p-8 flex flex-col"
            style={{ backgroundColor: "#12141c" }}
          >
            <h3 className="text-lg font-semibold text-white">Claude</h3>
            <p className="mt-1 text-2xl font-extrabold text-white">
              Pay-as-you-go
              <span className="block text-xs font-medium text-[#6b7280]">
                usually a few cents per analysis
              </span>
            </p>
            <ul className="mt-6 space-y-3 text-sm text-[#9ca3af] flex-1">
              {[
                "Anthropic console key",
                "Highest-quality analysis",
                "Best for nuanced verdicts",
                "You pay Anthropic directly",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-[#6b7280]">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="https://console.anthropic.com/settings/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-lg border border-[#1e2130] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1a1d27] hover:border-[#2d3150]"
            >
              Get a Claude Key
            </a>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section className="px-6 py-24 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Ready to see the truth?
        </h2>
        <p className="mt-4 text-[#9ca3af] text-base max-w-md mx-auto">
          It takes 30 seconds to upload and 60 seconds to get answers you&apos;ve
          never had.
        </p>
        <div className="mt-8">
          <Link
            href="/analyze"
            className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.03] hover:shadow-blue-500/25 active:scale-[0.98]"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
            }}
          >
            Analyze Your Chat
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="border-t border-[#1e2130] px-6 py-10">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6b7280]">
          <p>
            Built by{" "}
            <a
              href="https://github.com/yogigodaraa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9ca3af] underline-offset-4 hover:underline hover:text-white transition-colors"
            >
              Yogi
            </a>
          </p>
          <p>
            Powered by{" "}
            <span className="text-[#9ca3af]">Claude &amp; Gemini</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
