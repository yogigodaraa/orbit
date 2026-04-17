'use client';

import { rawVolume, COLORS } from '@/data/metrics';

function fmt(n: number): string {
  return n.toLocaleString('en-US');
}

export default function StatsOverview() {
  const dailyAvg = Math.round(rawVolume.totalMessages / rawVolume.totalDays);

  return (
    <section className="space-y-8">
      {/* ── Top-level stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Messages" value={fmt(rawVolume.totalMessages)} sub={`over ${fmt(rawVolume.totalDays)} days`} />
        <StatCard label="Daily Average" value={`~${fmt(dailyAvg)}`} sub="msgs / day" />
        <StatCard label="Total Sessions" value={fmt(rawVolume.totalSessions)} sub="conversations" />
        <StatCard label="Timespan" value="Nov 2023" sub="to Apr 2026" />
      </div>

      {/* ── Per-person comparison ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <PersonCard
          name="Yogi"
          color={COLORS.yogi}
          messages={rawVolume.yogi.messages}
          avgReply={rawVolume.yogi.avgReplyMin}
          startsDay={rawVolume.yogi.startsDay}
        />
        <PersonCard
          name="Saayella"
          color={COLORS.saayella}
          messages={rawVolume.saayella.messages}
          avgReply={rawVolume.saayella.avgReplyMin}
          startsDay={rawVolume.saayella.startsDay}
        />
      </div>
    </section>
  );
}

/* ── Generic stat card ── */
function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#12141c] p-6 shadow-[0_0_24px_rgba(255,255,255,0.02)] transition-colors hover:border-white/[0.1]">
      <p className="text-sm font-medium text-zinc-400">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-100">
        {value}
      </p>
      <p className="mt-1 text-xs text-zinc-500">{sub}</p>
    </div>
  );
}

/* ── Person comparison card ── */
function PersonCard({
  name,
  color,
  messages,
  avgReply,
  startsDay,
}: {
  name: string;
  color: string;
  messages: number;
  avgReply: number;
  startsDay: number;
}) {
  return (
    <div
      className="rounded-xl border border-white/[0.06] bg-[#12141c] p-6 shadow-[0_0_24px_rgba(255,255,255,0.02)] transition-colors hover:border-white/[0.1]"
      style={{ borderTopColor: color, borderTopWidth: 2 }}
    >
      <h3 className="text-lg font-semibold" style={{ color }}>
        {name}
      </h3>

      <div className="mt-4 space-y-3">
        <div>
          <p className="text-2xl font-bold text-zinc-100" style={{ color }}>
            {fmt(messages)}
          </p>
          <p className="text-xs text-zinc-500">messages sent</p>
        </div>

        <div>
          <p className="text-2xl font-bold text-zinc-100" style={{ color }}>
            {avgReply} min
          </p>
          <p className="text-xs text-zinc-500">avg reply time</p>
        </div>

        <div>
          <p className="text-2xl font-bold text-zinc-100" style={{ color }}>
            {fmt(startsDay)}
          </p>
          <p className="text-xs text-zinc-500">times started the day first</p>
        </div>
      </div>
    </div>
  );
}
