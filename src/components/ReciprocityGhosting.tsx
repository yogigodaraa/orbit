'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { reciprocity, ghosting, COLORS } from '@/data/metrics';

/* ── SVG donut ring ── */
function DonutRing({
  percent,
  color,
  size = 140,
  strokeWidth = 12,
  label,
  sublabel,
}: {
  percent: number;
  color: string;
  size?: number;
  strokeWidth?: number;
  label: string;
  sublabel: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = (percent / 100) * circumference;
  const center = size / 2;

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width={size} height={size} className="drop-shadow-lg">
        {/* background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={COLORS.border}
          strokeWidth={strokeWidth}
        />
        {/* filled arc */}
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
        {/* center text */}
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
      <p
        className="max-w-[220px] text-center text-sm leading-snug"
        style={{ color: COLORS.textMuted }}
      >
        {label}
      </p>
      <p
        className="max-w-[220px] text-center text-xs leading-snug font-semibold"
        style={{ color }}
      >
        {sublabel}
      </p>
    </div>
  );
}

/* ── custom tooltip ── */
function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className="rounded-lg border px-4 py-3 text-sm shadow-lg"
      style={{
        background: COLORS.card,
        borderColor: COLORS.border,
        color: COLORS.text,
      }}
    >
      <p className="mb-1 font-semibold">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}:{' '}
          <span className="font-mono font-bold">{entry.value.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
}

/* ── chart data ── */
const ghostingData = [
  {
    label: 'Calls ignored',
    yogi: ghosting.callsIgnored.yogi,
    saayella: ghosting.callsIgnored.saayella,
  },
  {
    label: 'Silenced calls',
    yogi: ghosting.silencedCalls.yogi,
    saayella: ghosting.silencedCalls.saayella,
  },
  {
    label: 'Left waiting 6+ hrs',
    yogi: ghosting.leftWaiting6hrs.yogi,
    saayella: ghosting.leftWaiting6hrs.saayella,
  },
  {
    label: 'Breaks silence',
    yogi: ghosting.breaksSilence.yogi,
    saayella: ghosting.breaksSilence.saayella,
  },
];

/* ── main component ── */
export default function ReciprocityGhosting() {
  return (
    <section className="space-y-6">
      {/* section title */}
      <h2 className="text-2xl font-bold tracking-tight" style={{ color: COLORS.text }}>
        Reciprocity &amp; Availability
      </h2>

      {/* ── reciprocity donuts ── */}
      <div
        className="rounded-xl border p-6"
        style={{ background: '#12141c', borderColor: '#1e2130' }}
      >
        <h3 className="mb-6 text-lg font-semibold" style={{ color: COLORS.text }}>
          &ldquo;I love you&rdquo; Reciprocation
        </h3>

        <div className="flex flex-wrap justify-center gap-12">
          <DonutRing
            percent={reciprocity.yogiSaysLoveSaayReciprocates}
            color={COLORS.saayella}
            label={'When Yogi says "I love you" \u2192 Saayella reciprocates'}
            sublabel={`${reciprocity.yogiSaysLoveSaayReciprocates}% of the time`}
          />
          <DonutRing
            percent={reciprocity.saayellaSaysLoveYogiReciprocates}
            color={COLORS.yogi}
            label={'When Saayella says "I love you" \u2192 Yogi reciprocates'}
            sublabel={`${reciprocity.saayellaSaysLoveYogiReciprocates}% of the time`}
          />
        </div>

        <p
          className="mt-6 text-center text-sm italic"
          style={{ color: COLORS.textMuted }}
        >
          {100 - reciprocity.yogiSaysLoveSaayReciprocates}% of Yogi&apos;s love expressions land
          in silence.
        </p>
      </div>

      {/* ── ghosting bar chart ── */}
      <div
        className="rounded-xl border p-6"
        style={{ background: '#12141c', borderColor: '#1e2130' }}
      >
        <h3 className="mb-4 text-lg font-semibold" style={{ color: COLORS.text }}>
          Ghosting &amp; Availability
        </h3>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={ghostingData}
            layout="vertical"
            margin={{ top: 4, right: 30, bottom: 4, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} horizontal={false} />
            <XAxis
              type="number"
              tick={{ fill: COLORS.textMuted, fontSize: 12 }}
              axisLine={{ stroke: COLORS.border }}
              tickLine={{ stroke: COLORS.border }}
            />
            <YAxis
              type="category"
              dataKey="label"
              width={150}
              tick={{ fill: COLORS.textMuted, fontSize: 13 }}
              axisLine={{ stroke: COLORS.border }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
            <Legend
              wrapperStyle={{ color: COLORS.textMuted, paddingTop: 12 }}
              formatter={(value: string) => (
                <span style={{ color: COLORS.textMuted, fontSize: 13 }}>{value}</span>
              )}
            />
            <Bar
              dataKey="yogi"
              name="Yogi"
              fill={COLORS.yogi}
              radius={[0, 4, 4, 0]}
              barSize={14}
            />
            <Bar
              dataKey="saayella"
              name="Saayella"
              fill={COLORS.saayella}
              radius={[0, 4, 4, 0]}
              barSize={14}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── callout card ── */}
      <div
        className="rounded-xl border px-6 py-5 flex items-start gap-4"
        style={{ background: '#12141c', borderColor: '#1e2130' }}
      >
        <span className="text-3xl leading-none select-none" aria-hidden="true">
          !
        </span>
        <div>
          <p className="text-lg font-semibold" style={{ color: COLORS.text }}>
            Yogi never silenced her calls. Not once.
          </p>
          <p className="mt-1 text-sm" style={{ color: COLORS.textMuted }}>
            She silenced his{' '}
            <strong className="text-white">{ghosting.silencedCalls.saayella} times</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
