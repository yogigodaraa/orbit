'use client';

import { extremes, COLORS } from '@/data/metrics';

function fmt(n: number): string {
  return n.toLocaleString('en-US');
}

/* ── Burst / explosion indicator ── */
function BurstIndicator({ intensity, color }: { intensity: number; color: string }) {
  // intensity 0-1 controls how many rings
  const rings = Math.round(intensity * 5);
  return (
    <div className="absolute -right-2 -top-2 h-16 w-16 opacity-60">
      {Array.from({ length: rings }).map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-full animate-ping"
          style={{
            border: `1.5px solid ${color}`,
            opacity: 0.3 - i * 0.05,
            animationDelay: `${i * 0.3}s`,
            animationDuration: '2.5s',
            transform: `scale(${0.3 + i * 0.2})`,
          }}
        />
      ))}
      <div
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 12px ${color}` }}
      />
    </div>
  );
}

/* ── Silence gap indicator ── */
function SilenceIndicator() {
  return (
    <div className="absolute -right-1 -top-1 flex h-14 w-14 items-center justify-center opacity-70">
      <div className="flex gap-[3px]">
        {[0.3, 0.6, 1, 0.6, 0.3].map((h, i) => (
          <div
            key={i}
            className="w-[3px] rounded-full bg-zinc-600"
            style={{ height: `${h * 28}px`, opacity: 0.3 + i * 0.1 }}
          />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-px w-10 bg-zinc-500 opacity-60" />
      </div>
    </div>
  );
}

/* ── Stat card ── */
function ExtremeCard({
  value,
  unit,
  label,
  sub,
  color,
  glowColor,
  indicator,
}: {
  value: string;
  unit?: string;
  label: string;
  sub: string;
  color: string;
  glowColor?: string;
  indicator?: React.ReactNode;
}) {
  const glow = glowColor ?? color;
  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-[#12141c] p-6 shadow-[0_0_24px_rgba(255,255,255,0.02)] transition-all duration-300 hover:border-white/[0.12]"
      style={{
        boxShadow: `0 0 40px ${glow}18, inset 0 1px 0 ${glow}10`,
        borderTopColor: color,
        borderTopWidth: 2,
      }}
    >
      {indicator}

      {/* Large number */}
      <p
        className="text-4xl font-extrabold tracking-tight transition-transform duration-300 group-hover:scale-105"
        style={{ color }}
      >
        {value}
        {unit && (
          <span className="ml-1 text-lg font-semibold opacity-70">{unit}</span>
        )}
      </p>

      {/* Label */}
      <p className="mt-2 text-sm font-semibold text-zinc-300">{label}</p>

      {/* Contextual subtitle */}
      <p className="mt-1 text-xs text-zinc-500">{sub}</p>

      {/* Subtle gradient wash at bottom */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-1 w-full opacity-40"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
      />
    </div>
  );
}

export default function Extremes() {
  return (
    <section className="space-y-8">
      {/* ── Section title ── */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100">
          Intensity &amp; Extremes
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          The most extreme data points in the conversation history
        </p>
      </div>

      {/* ── Card grid ── */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Yogi burst */}
        <ExtremeCard
          value={fmt(extremes.maxBurstYogi.msgs)}
          unit="msgs"
          label={`in ${extremes.maxBurstYogi.timeframe}`}
          sub={`Yogi \u00b7 ${extremes.maxBurstYogi.when} \u2014 peak message burst`}
          color={COLORS.yogi}
          indicator={<BurstIndicator intensity={1} color={COLORS.yogi} />}
        />

        {/* Saayella burst */}
        <ExtremeCard
          value={fmt(extremes.maxBurstSaayella.msgs)}
          unit="msgs"
          label={`in ${extremes.maxBurstSaayella.timeframe}`}
          sub={`Saayella \u00b7 ${extremes.maxBurstSaayella.when} \u2014 peak message burst`}
          color={COLORS.saayella}
          indicator={<BurstIndicator intensity={0.7} color={COLORS.saayella} />}
        />

        {/* Longest silence */}
        <ExtremeCard
          value={String(extremes.longestSilence.days)}
          unit="days"
          label="longest silence"
          sub={`${extremes.longestSilence.when} \u2014 broken by ${extremes.longestSilence.brokenBy}`}
          color={COLORS.warning}
          indicator={<SilenceIndicator />}
        />

        {/* Emotional swing days */}
        <ExtremeCard
          value={fmt(extremes.emotionalSwingDays)}
          unit="days"
          label="love AND fight same day"
          sub="days where both love expressions and conflict occurred"
          color={COLORS.warning}
          glowColor={COLORS.warning}
        />

        {/* Saayella longest message */}
        <ExtremeCard
          value={fmt(extremes.longestMsgSaayella.chars)}
          unit="chars"
          label="Saayella\u2019s longest message"
          sub={extremes.longestMsgSaayella.when}
          color={COLORS.saayella}
        />

        {/* Yogi longest message */}
        <ExtremeCard
          value={fmt(extremes.longestMsgYogi.chars)}
          unit="chars"
          label="Yogi\u2019s longest message"
          sub={extremes.longestMsgYogi.when}
          color={COLORS.yogi}
        />
      </div>

      {/* ── Bottom insight callout ── */}
      <div
        className="rounded-xl border px-6 py-5"
        style={{
          borderColor: `${COLORS.warning}30`,
          backgroundColor: `${COLORS.warning}08`,
        }}
      >
        <p className="text-sm leading-relaxed text-zinc-300">
          <span
            className="font-bold"
            style={{ color: COLORS.warning }}
          >
            {fmt(extremes.maxBurstYogi.msgs)} messages in {extremes.maxBurstYogi.timeframe}
          </span>{' '}
          is extreme anxiety.{' '}
          <span
            className="font-bold"
            style={{ color: COLORS.warning }}
          >
            {fmt(extremes.emotionalSwingDays)} love-and-fight days
          </span>{' '}
          = trauma-bonded push-pull dynamic.
        </p>
      </div>
    </section>
  );
}
