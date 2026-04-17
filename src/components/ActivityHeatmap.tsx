'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { activityByHour, COLORS } from '@/data/metrics';

export default function ActivityHeatmap() {
  /* ---------- chart data ---------- */
  const chartData = activityByHour.labels.map((label, i) => ({
    hour: label,
    yogi: activityByHour.yogi[i],
    saayella: activityByHour.saayella[i],
  }));

  /* ---------- heatmap helpers ---------- */
  const maxYogi = Math.max(...activityByHour.yogi);
  const maxSaayella = Math.max(...activityByHour.saayella);

  function cellBg(value: number, max: number, baseColor: string) {
    const ratio = value / max;
    // opacity ranges from 0.1 (low) to 1.0 (high)
    const opacity = 0.1 + ratio * 0.9;
    return hexToRgba(baseColor, opacity);
  }

  function hexToRgba(hex: string, alpha: number) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha.toFixed(2)})`;
  }

  /* ---------- render ---------- */
  return (
    <section className="space-y-6">
      {/* --- Title --- */}
      <h2 className="text-xl font-semibold text-white">
        Activity Patterns &mdash; When They Text
      </h2>

      {/* --- Area Chart --- */}
      <div className="rounded-2xl bg-[#12141c] p-6">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="gradYogi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS.yogi} stopOpacity={0.3} />
                <stop offset="100%" stopColor={COLORS.yogi} stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="gradSaayella" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS.saayella} stopOpacity={0.3} />
                <stop offset="100%" stopColor={COLORS.saayella} stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#1e2030" />
            <XAxis
              dataKey="hour"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#1e2030' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#1e2030' }}
              tickLine={false}
              tickFormatter={(v: number) =>
                v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#12141c',
                border: '1px solid #1e2030',
                borderRadius: 8,
                color: '#fff',
              }}
              labelStyle={{ color: '#9ca3af' }}
            />

            <Area
              type="monotone"
              dataKey="yogi"
              name="Yogi"
              stroke={COLORS.yogi}
              fill="url(#gradYogi)"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="saayella"
              name="Saayella"
              stroke={COLORS.saayella}
              fill="url(#gradSaayella)"
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* --- Heatmap Grids --- */}
      <div className="space-y-4 rounded-2xl bg-[#12141c] p-6">
        {/* Yogi */}
        <div>
          <p className="mb-2 text-sm font-medium text-gray-400">Yogi</p>
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: 'repeat(24, minmax(0, 1fr))' }}
          >
            {activityByHour.yogi.map((val, i) => (
              <div
                key={i}
                title={`${activityByHour.labels[i]}: ${val.toLocaleString()} msgs`}
                className="aspect-square rounded-sm"
                style={{ backgroundColor: cellBg(val, maxYogi, COLORS.yogi) }}
              />
            ))}
          </div>
          {/* hour labels */}
          <div
            className="mt-1 grid gap-1"
            style={{ gridTemplateColumns: 'repeat(24, minmax(0, 1fr))' }}
          >
            {activityByHour.labels.map((l) => (
              <span key={l} className="text-center text-[10px] text-gray-500">
                {l}
              </span>
            ))}
          </div>
        </div>

        {/* Saayella */}
        <div>
          <p className="mb-2 text-sm font-medium text-gray-400">Saayella</p>
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: 'repeat(24, minmax(0, 1fr))' }}
          >
            {activityByHour.saayella.map((val, i) => (
              <div
                key={i}
                title={`${activityByHour.labels[i]}: ${val.toLocaleString()} msgs`}
                className="aspect-square rounded-sm"
                style={{ backgroundColor: cellBg(val, maxSaayella, COLORS.saayella) }}
              />
            ))}
          </div>
          <div
            className="mt-1 grid gap-1"
            style={{ gridTemplateColumns: 'repeat(24, minmax(0, 1fr))' }}
          >
            {activityByHour.labels.map((l) => (
              <span key={l} className="text-center text-[10px] text-gray-500">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* --- Insight Card --- */}
      <div className="rounded-2xl bg-[#12141c] p-5">
        <p className="text-sm leading-relaxed text-gray-300">
          Both peak at <span className="font-semibold text-white">10pm&ndash;midnight</span>.
          Yogi sends{' '}
          <span className="font-semibold" style={{ color: COLORS.yogi }}>
            24,750
          </span>{' '}
          late-night messages (11pm&ndash;4am) vs Saayella&apos;s{' '}
          <span className="font-semibold" style={{ color: COLORS.saayella }}>
            18,217
          </span>
          .
        </p>
      </div>
    </section>
  );
}
