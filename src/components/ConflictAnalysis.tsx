'use client';

import { conflict, COLORS } from '@/data/metrics';
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

export default function ConflictAnalysis() {
  return (
    <section className="rounded-xl p-6 space-y-8" style={{ background: '#12141c' }}>
      {/* ── Section title ── */}
      <h2 className="text-2xl font-bold text-white tracking-tight">
        Conflict Deep Dive
      </h2>

      {/* ── Tug-of-war percentage bars ── */}
      <div className="space-y-4">
        {conflict.map((item) => {
          const total = item.yogi + item.saayella;
          const yogiPct = Math.round((item.yogi / total) * 100);
          const saayellaPct = 100 - yogiPct;

          return (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-between text-sm text-gray-300">
                <span>{item.label}</span>
                <span className="text-gray-500 text-xs">
                  {item.yogi} vs {item.saayella}
                </span>
              </div>

              <div className="flex w-full h-7 rounded-md overflow-hidden">
                {/* Yogi side */}
                <div
                  className="flex items-center justify-center text-xs font-semibold text-white transition-all duration-500"
                  style={{
                    width: `${yogiPct}%`,
                    backgroundColor: COLORS.yogi,
                  }}
                >
                  {yogiPct}%
                </div>

                {/* Saayella side */}
                <div
                  className="flex items-center justify-center text-xs font-semibold text-white transition-all duration-500"
                  style={{
                    width: `${saayellaPct}%`,
                    backgroundColor: COLORS.saayella,
                  }}
                >
                  {saayellaPct}%
                </div>
              </div>
            </div>
          );
        })}

        {/* Legend for the bars */}
        <div className="flex items-center gap-6 pt-2 text-sm text-gray-400">
          <span className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ backgroundColor: COLORS.yogi }}
            />
            Yogi
          </span>
          <span className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ backgroundColor: COLORS.saayella }}
            />
            Saayella
          </span>
        </div>
      </div>

      {/* ── Grouped bar chart (absolute numbers) ── */}
      <div>
        <h3 className="text-lg font-semibold text-gray-200 mb-4">
          Absolute Counts
        </h3>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart
            data={conflict}
            margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2d37" />
            <XAxis
              dataKey="label"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#2a2d37' }}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={70}
            />
            <YAxis
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#2a2d37' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1d27',
                border: '1px solid #2a2d37',
                borderRadius: '8px',
                color: '#e4e4e7',
              }}
              cursor={{ fill: 'rgba(255,255,255,0.04)' }}
            />
            <Legend
              wrapperStyle={{ color: '#9ca3af', fontSize: 13 }}
            />
            <Bar
              dataKey="yogi"
              name="Yogi"
              fill={COLORS.yogi}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="saayella"
              name="Saayella"
              fill={COLORS.saayella}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Insight card ── */}
      <div
        className="rounded-lg border p-4 text-sm leading-relaxed text-gray-300"
        style={{
          backgroundColor: '#1a1d27',
          borderColor: '#2a2d37',
        }}
      >
        <p className="font-semibold text-white mb-1">Key Insight</p>
        <p>
          Breaking silence after fights is almost perfectly equal. Escalation is
          dead equal. Yogi starts fights more but both escalate equally.
        </p>
      </div>
    </section>
  );
}
