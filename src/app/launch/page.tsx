import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TrackFights — AI Relationship & Chat Analysis",
  description:
    "Upload any WhatsApp or Instagram chat export. Our AI reads every message and gives you a brutally honest relationship analysis — ratings, fight patterns, love tracking, predictions, and more.",
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
    icon: <IconRatings />,
    title: "Person Ratings",
    desc: "Each person scored 0\u2013100 across 8 dimensions like effort, emotional intelligence, and consistency.",
  },
  {
    icon: <IconFight />,
    title: "Fight Analysis",
    desc: "Who starts fights, who escalates, who breaks the silence\u200A\u2014\u200Aall backed by message-level evidence.",
  },
  {
    icon: <IconLove />,
    title: "Love Tracker",
    desc: "Who says it more, who means it more, and how affection ebbs and flows over time.",
  },
  {
    icon: <IconPredict />,
    title: "Predictive AI",
    desc: "What\u2019s likely to happen next in your relationship based on historical patterns and trajectory.",
  },
  {
    icon: <IconWarning />,
    title: "Early Warnings",
    desc: "Red flags you\u2019re too close to see\u200A\u2014\u200Adetected by AI before they become problems.",
  },
  {
    icon: <IconPsych />,
    title: "Psychological Profile",
    desc: "Attachment styles, manipulation patterns, trauma bonds, and communication archetypes.",
  },
];

const steps = [
  {
    num: "01",
    title: "Export your chat",
    desc: "WhatsApp: Settings \u2192 Chats \u2192 Export Chat. Instagram: Settings \u2192 Your Activity \u2192 Download Your Information.",
  },
  {
    num: "02",
    title: "Upload the file",
    desc: "Drag and drop the .txt or .zip file. We support WhatsApp and Instagram exports out of the box.",
  },
  {
    num: "03",
    title: "Get your analysis",
    desc: "Full deep analysis in under 60 seconds. Ratings, fight breakdowns, predictions, and more.",
  },
];

/* ──────────────────────────────── page ─────────────────────────────────── */

export default function LaunchPage() {
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
            Know Your Relationship.
          </span>
          <br />
          <span className="text-white">For Real.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#9ca3af]">
          Upload any WhatsApp or Instagram chat. Our AI reads every message and
          gives you the brutally honest analysis no one else will.
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
            Analyze Your Chat Free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        <p className="mt-6 text-xs font-medium text-[#6b7280] tracking-wide">
          Bring your own Claude or Gemini key · Free demo included
        </p>
      </section>

      {/* ── What You Get ─────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-5xl px-6 py-24">
        <div className="mb-14 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            What You Get
          </h2>
          <p className="mt-3 text-[#9ca3af] text-base max-w-lg mx-auto">
            Six layers of analysis that go far deeper than message counts.
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
            Your data is never stored. We process it, show you results, and
            delete everything. No accounts. No tracking. No bullshit.
          </p>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <div className="mb-14 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Simple Pricing
          </h2>
          <p className="mt-3 text-[#9ca3af] text-base">
            Start free. Go deep when you&apos;re ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free */}
          <div
            className="rounded-xl border border-[#1e2130] p-8 flex flex-col"
            style={{ backgroundColor: "#12141c" }}
          >
            <h3 className="text-lg font-semibold text-white">Free</h3>
            <p className="mt-1 text-3xl font-extrabold text-white">
              $0
              <span className="text-sm font-medium text-[#6b7280]">
                {" "}/ forever
              </span>
            </p>
            <ul className="mt-6 space-y-3 text-sm text-[#9ca3af] flex-1">
              {[
                "Total message counts",
                "Activity patterns & heatmaps",
                "Word clouds",
                "Basic response time stats",
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
              Get Started
            </Link>
          </div>

          {/* Pro */}
          <div
            className="relative rounded-xl border border-blue-500/30 p-8 flex flex-col overflow-hidden"
            style={{ backgroundColor: "#12141c" }}
          >
            {/* Subtle gradient border glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-10 blur-[80px]"
              style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)" }}
            />

            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-white">Pro</h3>
              <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-300 border border-blue-500/30" style={{ backgroundColor: "rgba(59,130,246,0.1)" }}>
                Popular
              </span>
            </div>
            <p className="mt-1 text-3xl font-extrabold text-white">
              $4.99
              <span className="text-sm font-medium text-[#6b7280]">
                {" "}/ analysis
              </span>
            </p>
            <p className="mt-1 text-xs font-medium text-amber-400/80">
              Launch price — going up soon
            </p>
            <ul className="mt-6 space-y-3 text-sm text-[#9ca3af] flex-1">
              {[
                "Everything in Free",
                "Person ratings (0\u2013100, 8 dimensions)",
                "Fight analysis & escalation tracking",
                "Love & affection deep-dive",
                "Predictive relationship trajectory",
                "Early warning detection",
                "Full psychological profiling",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-blue-400">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/analyze"
              className="mt-8 inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-blue-500/20 active:scale-[0.98]"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              }}
            >
              Unlock Full Analysis
            </Link>
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
            Analyze Your Chat Free
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
              href="https://github.com/yogiduzit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9ca3af] underline-offset-4 hover:underline hover:text-white transition-colors"
            >
              Yogi
            </a>
          </p>
          <p>
            Powered by{" "}
            <span className="text-[#9ca3af]">Claude AI</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
