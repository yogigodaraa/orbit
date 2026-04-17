'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

/* ── Types ── */

interface AnalysisData {
  participants: { person1: string; person2: string };
  totalMessages: number;
  totalDays: number;
  dateRange: { start: string; end: string };
  rawVolume: {
    person1: { messages: number; avgReplyMin: number; startsDay: number };
    person2: { messages: number; avgReplyMin: number; startsDay: number };
  };
  loveAffection: Array<{ label: string; person1: number; person2: number }>;
  reciprocity: {
    person1SaysLovePerson2Reciprocates: number;
    person2SaysLovePerson1Reciprocates: number;
  };
  conflict: Array<{ label: string; person1: number; person2: number }>;
  psychPatterns: Array<{ label: string; person1: number; person2: number; note: string }>;
  ratings: {
    person1: { overall: number; dimensions: Array<{ name: string; score: number; detail: string }> };
    person2: { overall: number; dimensions: Array<{ name: string; score: number; detail: string }> };
  };
  predictions: Array<{ title: string; probability: number; severity: string; timeframe: string; description: string }>;
  earlyWarnings: Array<{ level: string; title: string; detail: string; trend: string }>;
  topWords: {
    person1: Array<{ word: string; count: number }>;
    person2: Array<{ word: string; count: number }>;
  };
  healthTimeline: Array<{ period: string; messages: number; health: number }>;
  verdict: { person1Summary: string; person2Summary: string; relationshipSummary: string };
}

/* ── Constants ── */

const COLOR_P1 = '#2d6bc4';
const COLOR_P2 = '#c4406e';

/* ── Helpers ── */

function fmt(n: number): string {
  return n.toLocaleString('en-US');
}

function fontSize(count: number, max: number, minPx = 13, maxPx = 34): number {
  if (max === 0) return minPx;
  return minPx + (count / max) * (maxPx - minPx);
}

function lighten(hex: string, t: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const mix = (c: number) => Math.round(c + (255 - c) * t);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

/* ── Inline sub-components ── */

function ScoreRing({ score, color, name }: { score: number; color: string; name: string }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#2a2d37" strokeWidth="10" />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 70 70)"
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
        <text x="70" y="64" textAnchor="middle" dominantBaseline="central" fill="#e4e4e7" fontSize="28" fontWeight="700">
          {score}
        </text>
        <text x="70" y="90" textAnchor="middle" dominantBaseline="central" fill="#9ca3af" fontSize="13">
          / 100
        </text>
      </svg>
      <span className="text-lg font-semibold" style={{ color }}>
        {name}
      </span>
    </div>
  );
}

function DonutRing({
  percent,
  color,
  label,
  sublabel,
}: {
  percent: number;
  color: string;
  label: string;
  sublabel: string;
}) {
  const size = 140;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = (percent / 100) * circumference;
  const center = size / 2;

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width={size} height={size} className="drop-shadow-lg">
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#1e2130" strokeWidth={strokeWidth} />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference - filled}`}
          strokeDashoffset={circumference / 4}
          style={{ transition: 'stroke-dasharray 0.6s ease' }}
        />
        <text
          x={center}
          y={center}
          textAnchor="middle"
          dominantBaseline="central"
          fill={color}
          fontSize={28}
          fontWeight="bold"
          fontFamily="monospace"
        >
          {percent}%
        </text>
      </svg>
      <p className="max-w-[220px] text-center text-sm leading-snug text-zinc-400">{label}</p>
      <p className="max-w-[220px] text-center text-xs font-semibold leading-snug" style={{ color }}>
        {sublabel}
      </p>
    </div>
  );
}

function ComparisonBar({ v1, v2 }: { v1: number; v2: number }) {
  const total = v1 + v2;
  const pct1 = total > 0 ? Math.round((v1 / total) * 100) : 50;
  const pct2 = 100 - pct1;

  return (
    <div className="flex h-7 w-full overflow-hidden rounded-md">
      <div
        className="flex items-center justify-center text-xs font-semibold text-white transition-all duration-500"
        style={{ width: `${pct1}%`, backgroundColor: COLOR_P1 }}
      >
        {pct1}%
      </div>
      <div
        className="flex items-center justify-center text-xs font-semibold text-white transition-all duration-500"
        style={{ width: `${pct2}%`, backgroundColor: COLOR_P2 }}
      >
        {pct2}%
      </div>
    </div>
  );
}

function ProbabilityGauge({ value }: { value: number }) {
  const radius = 36;
  const stroke = 5;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;
  const color = value >= 85 ? '#ef4444' : value >= 70 ? '#f97316' : '#eab308';

  return (
    <div className="relative flex items-center justify-center" style={{ width: 88, height: 88 }}>
      <svg width={88} height={88} viewBox="0 0 88 88" className="-rotate-90">
        <circle cx={44} cy={44} r={radius} fill="none" stroke="#2a2d37" strokeWidth={stroke} />
        <circle
          cx={44}
          cy={44}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={`${progress} ${circumference - progress}`}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <span className="absolute text-lg font-bold" style={{ color }}>
        {value}%
      </span>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function TimelineTooltip(props: any) {
  const { active, payload, label } = props;
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[#1e2130] bg-[#12141c] px-4 py-3 shadow-lg">
      <p className="mb-1.5 text-sm font-medium text-zinc-300">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.dataKey} className="text-xs" style={{ color: entry.color }}>
          {entry.name}: {entry.dataKey === 'messages' ? Number(entry.value).toLocaleString() : entry.value}
        </p>
      ))}
    </div>
  );
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/* ── Severity / Level configs ── */

const severityConfig: Record<string, { color: string; label: string }> = {
  critical: { color: '#ef4444', label: 'Critical' },
  high: { color: '#f97316', label: 'High' },
  medium: { color: '#eab308', label: 'Medium' },
  low: { color: '#22c55e', label: 'Low' },
};

const levelConfig: Record<string, { color: string; label: string; pulse: boolean }> = {
  critical: { color: '#ef4444', label: 'CRITICAL', pulse: true },
  high: { color: '#f97316', label: 'HIGH', pulse: false },
  medium: { color: '#eab308', label: 'MEDIUM', pulse: false },
  low: { color: '#22c55e', label: 'LOW', pulse: false },
};

function TrendIcon({ trend }: { trend: string }) {
  if (trend === 'down') {
    return (
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="#ef4444" aria-label="Trending down">
        <path
          fillRule="evenodd"
          d="M10 17a.75.75 0 01-.75-.75V5.56l-3.22 3.22a.75.75 0 11-1.06-1.06l4.5-4.5a.75.75 0 011.06 0l4.5 4.5a.75.75 0 11-1.06 1.06L10.75 5.56v10.69A.75.75 0 0110 17z"
          transform="rotate(180 10 10)"
        />
      </svg>
    );
  }
  if (trend === 'up') {
    return (
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="#f97316" aria-label="Trending up">
        <path
          fillRule="evenodd"
          d="M10 3a.75.75 0 01.75.75v10.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3.75A.75.75 0 0110 3z"
          transform="rotate(180 10 10)"
        />
      </svg>
    );
  }
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="#6b7280" aria-label="Flat trend">
      <rect x="4" y="9" width="12" height="2" rx="1" />
    </svg>
  );
}

/* ══════════════════════════════════════════════
   Main Component
   ══════════════════════════════════════════════ */

export default function DynamicDashboard({ data }: { data: AnalysisData }) {
  const { person1, person2 } = data.participants;
  const dailyAvg = data.totalDays > 0 ? Math.round(data.totalMessages / data.totalDays) : 0;

  return (
    <div className="space-y-12">
      {/* ═══════════ 1. Header ═══════════ */}
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          <span style={{ color: COLOR_P1 }}>{person1}</span>
          {' & '}
          <span style={{ color: COLOR_P2 }}>{person2}</span>
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          {fmt(data.totalMessages)} messages &middot; {data.dateRange.start} to {data.dateRange.end}
        </p>
      </header>

      {/* ═══════════ 2. Stats Grid ═══════════ */}
      <section className="space-y-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {/* Total Messages */}
          <div className="rounded-xl border border-white/[0.06] bg-[#12141c] p-6 shadow-[0_0_24px_rgba(255,255,255,0.02)] transition-colors hover:border-white/[0.1]">
            <p className="text-sm font-medium text-zinc-400">Total Messages</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-100">{fmt(data.totalMessages)}</p>
            <p className="mt-1 text-xs text-zinc-500">over {fmt(data.totalDays)} days</p>
          </div>

          {/* Daily Average */}
          <div className="rounded-xl border border-white/[0.06] bg-[#12141c] p-6 shadow-[0_0_24px_rgba(255,255,255,0.02)] transition-colors hover:border-white/[0.1]">
            <p className="text-sm font-medium text-zinc-400">Daily Average</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-100">~{fmt(dailyAvg)}</p>
            <p className="mt-1 text-xs text-zinc-500">msgs / day</p>
          </div>

          {/* Date Range */}
          <div className="rounded-xl border border-white/[0.06] bg-[#12141c] p-6 shadow-[0_0_24px_rgba(255,255,255,0.02)] transition-colors hover:border-white/[0.1]">
            <p className="text-sm font-medium text-zinc-400">Date Range</p>
            <p className="mt-2 text-lg font-bold tracking-tight text-zinc-100">{data.dateRange.start}</p>
            <p className="mt-1 text-xs text-zinc-500">to {data.dateRange.end}</p>
          </div>

          {/* Messages Per Person */}
          <div className="rounded-xl border border-white/[0.06] bg-[#12141c] p-6 shadow-[0_0_24px_rgba(255,255,255,0.02)] transition-colors hover:border-white/[0.1]">
            <p className="text-sm font-medium text-zinc-400">Messages Per Person</p>
            <p className="mt-2 text-lg font-bold tracking-tight" style={{ color: COLOR_P1 }}>
              {fmt(data.rawVolume.person1.messages)}
            </p>
            <p className="mt-0.5 text-lg font-bold tracking-tight" style={{ color: COLOR_P2 }}>
              {fmt(data.rawVolume.person2.messages)}
            </p>
          </div>
        </div>

        {/* Per-person detail cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Person 1 */}
          <div
            className="rounded-xl border border-white/[0.06] bg-[#12141c] p-6 shadow-[0_0_24px_rgba(255,255,255,0.02)] transition-colors hover:border-white/[0.1]"
            style={{ borderTopColor: COLOR_P1, borderTopWidth: 2 }}
          >
            <h3 className="text-lg font-semibold" style={{ color: COLOR_P1 }}>{person1}</h3>
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-2xl font-bold" style={{ color: COLOR_P1 }}>{fmt(data.rawVolume.person1.messages)}</p>
                <p className="text-xs text-zinc-500">messages sent</p>
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ color: COLOR_P1 }}>{data.rawVolume.person1.avgReplyMin} min</p>
                <p className="text-xs text-zinc-500">avg reply time</p>
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ color: COLOR_P1 }}>{fmt(data.rawVolume.person1.startsDay)}</p>
                <p className="text-xs text-zinc-500">times started the day first</p>
              </div>
            </div>
          </div>

          {/* Person 2 */}
          <div
            className="rounded-xl border border-white/[0.06] bg-[#12141c] p-6 shadow-[0_0_24px_rgba(255,255,255,0.02)] transition-colors hover:border-white/[0.1]"
            style={{ borderTopColor: COLOR_P2, borderTopWidth: 2 }}
          >
            <h3 className="text-lg font-semibold" style={{ color: COLOR_P2 }}>{person2}</h3>
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-2xl font-bold" style={{ color: COLOR_P2 }}>{fmt(data.rawVolume.person2.messages)}</p>
                <p className="text-xs text-zinc-500">messages sent</p>
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ color: COLOR_P2 }}>{data.rawVolume.person2.avgReplyMin} min</p>
                <p className="text-xs text-zinc-500">avg reply time</p>
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ color: COLOR_P2 }}>{fmt(data.rawVolume.person2.startsDay)}</p>
                <p className="text-xs text-zinc-500">times started the day first</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 3. Ratings ═══════════ */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#e4e4e7]">Person Ratings</h2>
          <p className="mt-1 text-sm text-[#9ca3af]">
            Composite scores across relationship dimensions, derived from {fmt(data.totalMessages)} messages over {fmt(data.totalDays)} days.
          </p>
        </div>

        {/* Overall score rings */}
        <div className="flex items-center justify-center gap-16 rounded-xl bg-[#12141c] py-8">
          <ScoreRing score={data.ratings.person1.overall} color={COLOR_P1} name={person1} />
          <ScoreRing score={data.ratings.person2.overall} color={COLOR_P2} name={person2} />
        </div>

        {/* Dimension progress bars */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.ratings.person1.dimensions.map((dim, i) => {
            const dim2 = data.ratings.person2.dimensions[i];
            return (
              <div key={dim.name} className="rounded-xl bg-[#12141c] p-4">
                <h4 className="mb-3 text-sm font-semibold text-[#e4e4e7]">{dim.name}</h4>

                {/* Person 1 bar */}
                <div className="mb-2">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs font-medium" style={{ color: COLOR_P1 }}>{person1}</span>
                    <span className="text-xs text-[#9ca3af]">{dim.score}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#2a2d37]">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${dim.score}%`, backgroundColor: COLOR_P1, transition: 'width 0.6s ease' }}
                    />
                  </div>
                  <p className="mt-1 text-[11px] leading-tight text-[#9ca3af]">{dim.detail}</p>
                </div>

                {/* Person 2 bar */}
                {dim2 && (
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs font-medium" style={{ color: COLOR_P2 }}>{person2}</span>
                      <span className="text-xs text-[#9ca3af]">{dim2.score}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[#2a2d37]">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${dim2.score}%`, backgroundColor: COLOR_P2, transition: 'width 0.6s ease' }}
                      />
                    </div>
                    <p className="mt-1 text-[11px] leading-tight text-[#9ca3af]">{dim2.detail}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════ 4. Love & Affection ═══════════ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-[#e4e4e7]">Love, Affection &amp; Care</h2>

        <div className="rounded-xl border border-[#1e2130] bg-[#12141c] p-6">
          <div className="space-y-4">
            {data.loveAffection.map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-sm text-gray-300">
                  <span>{item.label}</span>
                  <span className="text-xs text-gray-500">
                    {item.person1} vs {item.person2}
                  </span>
                </div>
                <ComparisonBar v1={item.person1} v2={item.person2} />
              </div>
            ))}

            {/* Legend */}
            <div className="flex items-center gap-6 pt-2 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: COLOR_P1 }} />
                {person1}
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: COLOR_P2 }} />
                {person2}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 5. Reciprocity ═══════════ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-[#e4e4e7]">Reciprocity</h2>

        <div className="rounded-xl border border-[#1e2130] bg-[#12141c] p-6">
          <h3 className="mb-6 text-lg font-semibold text-[#e4e4e7]">
            &ldquo;I love you&rdquo; Reciprocation
          </h3>

          <div className="flex flex-wrap justify-center gap-12">
            <DonutRing
              percent={data.reciprocity.person1SaysLovePerson2Reciprocates}
              color={COLOR_P2}
              label={`When ${person1} says "I love you" \u2192 ${person2} reciprocates`}
              sublabel={`${data.reciprocity.person1SaysLovePerson2Reciprocates}% of the time`}
            />
            <DonutRing
              percent={data.reciprocity.person2SaysLovePerson1Reciprocates}
              color={COLOR_P1}
              label={`When ${person2} says "I love you" \u2192 ${person1} reciprocates`}
              sublabel={`${data.reciprocity.person2SaysLovePerson1Reciprocates}% of the time`}
            />
          </div>
        </div>
      </section>

      {/* ═══════════ 6. Conflict ═══════════ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-white">Conflict Deep Dive</h2>

        <div className="rounded-xl border border-[#1e2130] bg-[#12141c] p-6">
          <div className="space-y-4">
            {data.conflict.map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-sm text-gray-300">
                  <span>{item.label}</span>
                  <span className="text-xs text-gray-500">
                    {item.person1} vs {item.person2}
                  </span>
                </div>
                <ComparisonBar v1={item.person1} v2={item.person2} />
              </div>
            ))}

            {/* Legend */}
            <div className="flex items-center gap-6 pt-2 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: COLOR_P1 }} />
                {person1}
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: COLOR_P2 }} />
                {person2}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 7. Psychological Patterns ═══════════ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-[#e4e4e7]">
          Psychological &amp; Behavioural Patterns
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.psychPatterns.map((p) => {
            const total = p.person1 + p.person2;
            const pct1 = total > 0 ? (p.person1 / total) * 100 : 50;
            return (
              <div
                key={p.label}
                className="rounded-xl border border-[#1e2130] bg-[#12141c] p-4 transition-colors hover:border-[#2a2d37]"
              >
                <h3 className="mb-3 text-sm font-semibold leading-tight text-[#e4e4e7]">{p.label}</h3>

                <div className="mb-2 flex items-baseline justify-between gap-2">
                  <span className="text-xl font-bold tabular-nums" style={{ color: COLOR_P1 }}>
                    {p.person1.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#9ca3af]">vs</span>
                  <span className="text-xl font-bold tabular-nums" style={{ color: COLOR_P2 }}>
                    {p.person2.toLocaleString()}
                  </span>
                </div>

                {/* Comparison bar */}
                <div className="flex h-2 w-full overflow-hidden rounded-full bg-[#1e2130]">
                  <div className="h-full transition-all" style={{ width: `${pct1}%`, backgroundColor: COLOR_P1 }} />
                  <div className="h-full transition-all" style={{ width: `${100 - pct1}%`, backgroundColor: COLOR_P2 }} />
                </div>

                <div className="mt-2 flex justify-between text-[10px] text-[#9ca3af]">
                  <span>{total > 0 ? pct1.toFixed(0) : '50'}%</span>
                  <span>{total > 0 ? (100 - pct1).toFixed(0) : '50'}%</span>
                </div>

                <p className="mt-2 text-xs leading-snug text-[#9ca3af]">{p.note}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════ 8. Predictions ═══════════ */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Predictive Analytics</h2>
          <p className="mt-1 text-sm text-[#9ca3af]">
            What&apos;s likely to happen next based on behavioral patterns
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[...data.predictions]
            .sort((a, b) => b.probability - a.probability)
            .map((pred) => {
              const sev = severityConfig[pred.severity] ?? severityConfig.medium;

              return (
                <div
                  key={pred.title}
                  className="flex gap-4 rounded-lg border p-5 transition-colors duration-200"
                  style={{
                    backgroundColor: '#1a1d27',
                    borderColor: '#1e2130',
                    borderLeftWidth: 4,
                    borderLeftColor: sev.color,
                  }}
                >
                  {/* Gauge */}
                  <div className="shrink-0 pt-1">
                    <ProbabilityGauge value={pred.probability} />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1 space-y-2">
                    {/* Severity + timeframe */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide"
                        style={{ backgroundColor: `${sev.color}20`, color: sev.color }}
                      >
                        {pred.severity === 'critical' && (
                          <span className="relative flex h-2 w-2">
                            <span
                              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                              style={{ backgroundColor: sev.color }}
                            />
                            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: sev.color }} />
                          </span>
                        )}
                        {sev.label}
                      </span>
                      <span className="text-xs text-[#9ca3af]">{pred.timeframe}</span>
                    </div>

                    <h3 className="text-base font-semibold leading-snug text-white">{pred.title}</h3>
                    <p className="text-sm leading-relaxed text-[#9ca3af]">{pred.description}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* ═══════════ 9. Early Warnings ═══════════ */}
      <section className="space-y-6">
        {/* Title with pulsing indicator */}
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-white">Early Warning System</h2>
        </div>

        <div className="space-y-4">
          {data.earlyWarnings.map((warning) => {
            const cfg = levelConfig[warning.level] ?? levelConfig.medium;
            const isCritical = warning.level === 'critical';

            return (
              <div
                key={warning.title}
                className="rounded-lg border p-4 transition-all duration-300"
                style={{
                  backgroundColor: '#1a1d27',
                  borderColor: isCritical ? '#ef444466' : '#1e2130',
                  boxShadow: isCritical
                    ? '0 0 18px 2px rgba(239, 68, 68, 0.12), inset 0 0 12px rgba(239, 68, 68, 0.04)'
                    : 'none',
                }}
              >
                {/* Top row: badge + title + trend */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${cfg.pulse ? 'animate-pulse' : ''}`}
                      style={{
                        backgroundColor: `${cfg.color}1A`,
                        color: cfg.color,
                        border: `1px solid ${cfg.color}44`,
                      }}
                    >
                      {cfg.pulse && (
                        <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
                      )}
                      {cfg.label}
                    </span>
                    <h3 className="truncate text-sm font-semibold text-white">{warning.title}</h3>
                  </div>
                  <TrendIcon trend={warning.trend} />
                </div>

                <p className="mt-2 text-sm leading-relaxed text-[#9ca3af]">{warning.detail}</p>
              </div>
            );
          })}
        </div>

        {/* Summary bar */}
        {(() => {
          const counts: Record<string, number> = {};
          data.earlyWarnings.forEach((w) => {
            counts[w.level] = (counts[w.level] || 0) + 1;
          });
          return (
            <div
              className="flex items-center justify-center gap-3 rounded-lg px-4 py-3 text-sm font-medium"
              style={{ backgroundColor: '#1a1d27', border: '1px solid #1e2130' }}
            >
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
                <span style={{ color: '#ef4444' }}>{counts.critical || 0} Critical</span>
              </span>
              <span style={{ color: '#374151' }}>&middot;</span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: '#f97316' }} />
                <span style={{ color: '#f97316' }}>{counts.high || 0} High</span>
              </span>
              <span style={{ color: '#374151' }}>&middot;</span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: '#eab308' }} />
                <span style={{ color: '#eab308' }}>{counts.medium || 0} Medium</span>
              </span>
            </div>
          );
        })()}
      </section>

      {/* ═══════════ 10. Top Words ═══════════ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-[#e4e4e7]">Top Words</h2>

        <div className="rounded-xl border border-[#1e2130] bg-[#12141c] p-6">
          <div className="flex flex-col gap-8 md:flex-row md:gap-10">
            {/* Person 1 cloud */}
            <div className="min-w-[280px] flex-1">
              <h3 className="mb-4 text-lg font-semibold tracking-tight" style={{ color: COLOR_P1 }}>
                {person1}&apos;s Top Words
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {(() => {
                  const maxCount = Math.max(...data.topWords.person1.map((w) => w.count), 1);
                  return data.topWords.person1.map((entry) => {
                    const intensity = entry.count / maxCount;
                    const size = fontSize(entry.count, maxCount);
                    const bg = lighten(COLOR_P1, 0.82 + (1 - intensity) * 0.12);
                    const fg = lighten(COLOR_P1, (1 - intensity) * 0.15);
                    return (
                      <span
                        key={entry.word}
                        className="inline-flex items-baseline gap-1 rounded-full px-3.5 py-1.5 font-medium leading-snug select-none transition-transform hover:scale-105"
                        style={{ fontSize: size, backgroundColor: bg, color: fg }}
                      >
                        {entry.word}
                        <span className="font-mono text-[0.7em] opacity-70" style={{ color: fg }}>
                          ({entry.count.toLocaleString()})
                        </span>
                      </span>
                    );
                  });
                })()}
              </div>
            </div>

            {/* Person 2 cloud */}
            <div className="min-w-[280px] flex-1">
              <h3 className="mb-4 text-lg font-semibold tracking-tight" style={{ color: COLOR_P2 }}>
                {person2}&apos;s Top Words
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {(() => {
                  const maxCount = Math.max(...data.topWords.person2.map((w) => w.count), 1);
                  return data.topWords.person2.map((entry) => {
                    const intensity = entry.count / maxCount;
                    const size = fontSize(entry.count, maxCount);
                    const bg = lighten(COLOR_P2, 0.82 + (1 - intensity) * 0.12);
                    const fg = lighten(COLOR_P2, (1 - intensity) * 0.15);
                    return (
                      <span
                        key={entry.word}
                        className="inline-flex items-baseline gap-1 rounded-full px-3.5 py-1.5 font-medium leading-snug select-none transition-transform hover:scale-105"
                        style={{ fontSize: size, backgroundColor: bg, color: fg }}
                      >
                        {entry.word}
                        <span className="font-mono text-[0.7em] opacity-70" style={{ color: fg }}>
                          ({entry.count.toLocaleString()})
                        </span>
                      </span>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 11. Health Timeline ═══════════ */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-white">Relationship Health Over Time</h2>

        <div className="rounded-2xl bg-[#12141c] p-6">
          <div className="mb-4 flex flex-wrap items-center gap-5 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-0.5 w-4 rounded" style={{ backgroundColor: '#22c55e' }} />
              Health score
            </span>
          </div>

          <ResponsiveContainer width="100%" height={360}>
            <LineChart data={data.healthTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2130" />
              <XAxis
                dataKey="period"
                tick={{ fill: '#6b7280', fontSize: 11 }}
                axisLine={{ stroke: '#1e2130' }}
                tickLine={false}
                interval={0}
                angle={-30}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#1e2130' }}
                tickLine={false}
                domain={['auto', 'auto']}
                label={{
                  value: 'Health Score',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fill: '#6b7280', fontSize: 11 },
                }}
              />
              <Tooltip content={<TimelineTooltip />} />
              <Line
                type="monotone"
                dataKey="health"
                name="Health Score"
                stroke="#22c55e"
                strokeWidth={2.5}
                dot={{ fill: '#22c55e', stroke: '#12141c', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2, stroke: '#12141c' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* ═══════════ 12. Verdict ═══════════ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-white">Verdict</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Person 1 summary */}
          <div
            className="rounded-xl border border-[#1e2130] bg-[#12141c] p-6"
            style={{ borderTopWidth: 3, borderTopColor: COLOR_P1 }}
          >
            <h3 className="mb-3 text-lg font-semibold" style={{ color: COLOR_P1 }}>{person1}</h3>
            <p className="text-sm leading-relaxed text-zinc-300">{data.verdict.person1Summary}</p>
          </div>

          {/* Person 2 summary */}
          <div
            className="rounded-xl border border-[#1e2130] bg-[#12141c] p-6"
            style={{ borderTopWidth: 3, borderTopColor: COLOR_P2 }}
          >
            <h3 className="mb-3 text-lg font-semibold" style={{ color: COLOR_P2 }}>{person2}</h3>
            <p className="text-sm leading-relaxed text-zinc-300">{data.verdict.person2Summary}</p>
          </div>

          {/* Relationship summary */}
          <div
            className="rounded-xl border border-[#1e2130] bg-[#12141c] p-6"
            style={{ borderTopWidth: 3, borderTopColor: '#6b7280' }}
          >
            <h3 className="mb-3 text-lg font-semibold text-zinc-300">Relationship</h3>
            <p className="text-sm leading-relaxed text-zinc-300">{data.verdict.relationshipSummary}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
