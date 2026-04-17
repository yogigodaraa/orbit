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
import { loveAffection, COLORS } from '@/data/metrics';

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
          {entry.name}: <span className="font-mono font-bold">{entry.value.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
}

/* ── main component ── */
export default function LoveAffection() {
  return (
    <section className="space-y-6">
      {/* section title */}
      <h2 className="text-2xl font-bold tracking-tight" style={{ color: COLORS.text }}>
        Love, Affection &amp; Care
      </h2>

      {/* horizontal grouped bar chart */}
      <div
        className="rounded-xl border p-6"
        style={{ background: '#12141c', borderColor: '#1e2130' }}
      >
        <ResponsiveContainer width="100%" height={420}>
          <BarChart
            data={loveAffection}
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
              width={170}
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

      {/* callout card */}
      <div
        className="rounded-xl border px-6 py-5 flex items-start gap-4"
        style={{ background: '#12141c', borderColor: '#1e2130' }}
      >
        <span className="text-3xl leading-none select-none" aria-hidden="true">
          !
        </span>
        <div>
          <p className="text-lg font-semibold" style={{ color: COLORS.text }}>
            Emotional support:{' '}
            <span style={{ color: COLORS.yogi }}>557</span> vs{' '}
            <span style={{ color: COLORS.saayella }}>20</span>
          </p>
          <p className="mt-1 text-sm" style={{ color: COLORS.textMuted }}>
            Yogi offered support <strong className="text-white">28x</strong> more than Saayella
            across the entire relationship.
          </p>
        </div>
      </div>
    </section>
  );
}
