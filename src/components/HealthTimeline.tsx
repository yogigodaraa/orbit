'use client';

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell,
} from 'recharts';
import { healthTimeline, monthlyVolume, COLORS } from '@/data/metrics';

/* ── Best / worst period indices ── */
const bestIdx = healthTimeline.findIndex((d) => d.period === 'Late 2024 Q3');
const worstIdx = healthTimeline.findIndex((d) => d.period === '2026 (final)');

/* eslint-disable @typescript-eslint/no-explicit-any */
/* ── Custom tooltip for the composed chart ── */
function HealthTooltip(props: any) {
  const { active, payload, label } = props;
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[#1e2130] bg-[#12141c] px-4 py-3 shadow-lg">
      <p className="mb-1.5 text-sm font-medium text-zinc-300">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.dataKey} className="text-xs" style={{ color: entry.color }}>
          {entry.name}: {entry.dataKey === 'messages'
            ? Number(entry.value).toLocaleString()
            : entry.value}
        </p>
      ))}
    </div>
  );
}

/* ── Custom tooltip for the volume area chart ── */
function VolumeTooltip(props: any) {
  const { active, payload, label } = props;
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[#1e2130] bg-[#12141c] px-4 py-3 shadow-lg">
      <p className="mb-1.5 text-sm font-medium text-zinc-300">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.dataKey} className="text-xs" style={{ color: entry.color }}>
          {entry.name}: {Number(entry.value).toLocaleString()}
        </p>
      ))}
    </div>
  );
}

export default function HealthTimeline() {
  return (
    <section className="space-y-6">
      {/* ── Title ── */}
      <h2 className="text-xl font-semibold text-white">
        Relationship Health Over Time
      </h2>

      {/* ── Composed Chart: bars + health line ── */}
      <div className="rounded-2xl bg-[#12141c] p-6">
        {/* Legend */}
        <div className="mb-4 flex flex-wrap items-center gap-5 text-xs text-zinc-400">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-sm bg-zinc-600" />
            Message volume
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block h-0.5 w-4 rounded"
              style={{ backgroundColor: COLORS.positive }}
            />
            Health score
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-sm bg-amber-500/80" />
            Best period
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-sm bg-red-500/80" />
            Worst period
          </span>
        </div>

        <ResponsiveContainer width="100%" height={360}>
          <ComposedChart data={healthTimeline}>
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

            {/* Left axis: health score */}
            <YAxis
              yAxisId="health"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#1e2130' }}
              tickLine={false}
              domain={[-1.5, 3]}
              label={{
                value: 'Health Score',
                angle: -90,
                position: 'insideLeft',
                style: { fill: '#6b7280', fontSize: 11 },
              }}
            />

            {/* Right axis: message volume */}
            <YAxis
              yAxisId="volume"
              orientation="right"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#1e2130' }}
              tickLine={false}
              tickFormatter={(v: number) =>
                v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)
              }
              label={{
                value: 'Messages',
                angle: 90,
                position: 'insideRight',
                style: { fill: '#6b7280', fontSize: 11 },
              }}
            />

            <Tooltip content={<HealthTooltip />} />

            {/* Zero reference line */}
            <ReferenceLine
              yAxisId="health"
              y={0}
              stroke="#6b7280"
              strokeDasharray="4 4"
              strokeOpacity={0.6}
            />

            {/* Message volume bars */}
            <Bar
              yAxisId="volume"
              dataKey="messages"
              name="Messages"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            >
              {healthTimeline.map((_, i) => (
                <Cell
                  key={i}
                  fill={
                    i === bestIdx
                      ? 'rgba(245, 158, 11, 0.55)'
                      : i === worstIdx
                        ? 'rgba(239, 68, 68, 0.55)'
                        : 'rgba(113, 113, 122, 0.35)'
                  }
                />
              ))}
            </Bar>

            {/* Health score line */}
            <Line
              yAxisId="health"
              type="monotone"
              dataKey="health"
              name="Health Score"
              stroke={COLORS.positive}
              strokeWidth={2.5}
              dot={(props: Record<string, unknown>) => {
                const { cx, cy, index } = props as { cx: number; cy: number; index: number };
                const isBest = index === bestIdx;
                const isWorst = index === worstIdx;
                const val = healthTimeline[index as number]?.health ?? 0;
                const color = isBest
                  ? '#f59e0b'
                  : isWorst
                    ? '#ef4444'
                    : val >= 0
                      ? COLORS.positive
                      : COLORS.negative;
                const r = isBest || isWorst ? 7 : 4;

                return (
                  <circle
                    key={index}
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill={color}
                    stroke="#12141c"
                    strokeWidth={2}
                  />
                );
              }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: '#12141c' }}
            />
          </ComposedChart>
        </ResponsiveContainer>

        {/* Annotation badges */}
        <div className="mt-4 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
            <span className="text-base leading-none">&uarr;</span>
            Best: Late 2024 Q3 (+2.2)
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400">
            <span className="text-base leading-none">&darr;</span>
            Worst: 2026 (final) (-0.7)
          </span>
        </div>
      </div>

      {/* ── Monthly Volume Area Chart ── */}
      <div className="rounded-2xl bg-[#12141c] p-6">
        <h3 className="mb-4 text-sm font-medium text-zinc-400">
          Monthly Message Volume by Person
        </h3>

        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={monthlyVolume}>
            <defs>
              <linearGradient id="gradHealthYogi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS.yogi} stopOpacity={0.35} />
                <stop offset="100%" stopColor={COLORS.yogi} stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="gradHealthSaayella" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS.saayella} stopOpacity={0.35} />
                <stop offset="100%" stopColor={COLORS.saayella} stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#1e2130" />

            <XAxis
              dataKey="month"
              tick={{ fill: '#6b7280', fontSize: 11 }}
              axisLine={{ stroke: '#1e2130' }}
              tickLine={false}
              interval={4}
              angle={-30}
              textAnchor="end"
              height={50}
            />

            <YAxis
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#1e2130' }}
              tickLine={false}
              tickFormatter={(v: number) =>
                v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)
              }
            />

            <Tooltip content={<VolumeTooltip />} />

            <Area
              type="monotone"
              dataKey="yogi"
              name="Yogi"
              stroke={COLORS.yogi}
              fill="url(#gradHealthYogi)"
              fillOpacity={1}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="saayella"
              name="Saayella"
              stroke={COLORS.saayella}
              fill="url(#gradHealthSaayella)"
              fillOpacity={1}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ── Insight Card ── */}
      <div className="rounded-2xl bg-[#12141c] p-5">
        <p className="text-sm leading-relaxed text-gray-300">
          One genuinely good period:{' '}
          <span className="font-semibold text-amber-400">Jul&ndash;Sep 2024</span>.
          Since then, slow decline. Volume dropped from{' '}
          <span className="font-semibold text-white">24k</span> to{' '}
          <span className="font-semibold text-white">6k/quarter</span>.
        </p>
      </div>
    </section>
  );
}
