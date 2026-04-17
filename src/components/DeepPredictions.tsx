'use client';

import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  AreaChart,
  ReferenceLine,
  Legend,
  Cell,
} from 'recharts';
import {
  fightLoveCycles,
  monthlyFightLove,
  fightTriggers,
  dayOfWeekPatterns,
  futureProjections,
  cycleStats,
  COLORS,
} from '@/data/metrics';

/* eslint-disable @typescript-eslint/no-explicit-any */

// ═══ SHARED STYLES ═══
const cardStyle = {
  background: '#12141c',
  borderColor: '#1e2130',
};

// ═══ CUSTOM TOOLTIPS ═══
function FightLoveTooltip(props: any) {
  const { active, payload, label } = props;
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[#1e2130] bg-[#12141c] px-4 py-3 shadow-lg">
      <p className="mb-1.5 text-sm font-medium text-zinc-300">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.dataKey} className="text-xs" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

function CycleTooltip(props: any) {
  const { active, payload, label } = props;
  if (!active || !payload?.length) return null;
  const cycle = fightLoveCycles.find((c) => c.cycleNum === label);
  return (
    <div className="rounded-lg border border-[#1e2130] bg-[#12141c] px-4 py-3 shadow-lg">
      <p className="mb-1 text-sm font-medium text-zinc-300">
        Cycle {label} {cycle ? `(${cycle.startDate})` : ''}
      </p>
      {payload.map((entry: any) => (
        <p key={entry.dataKey} className="text-xs" style={{ color: entry.color }}>
          {entry.name}: {entry.value}/10
        </p>
      ))}
      {cycle && (
        <>
          <p className="text-xs text-zinc-500 mt-1">Silence: {cycle.silenceDays} days</p>
          <p className="text-xs text-zinc-500">Initiator: {cycle.reconcileInitiator}</p>
        </>
      )}
    </div>
  );
}

function TriggerTooltip(props: any) {
  const { active, payload } = props;
  if (!active || !payload?.length) return null;
  const data = payload[0]?.payload;
  if (!data) return null;
  return (
    <div className="rounded-lg border border-[#1e2130] bg-[#12141c] px-4 py-3 shadow-lg">
      <p className="mb-1 text-sm font-medium text-zinc-300">{data.trigger}</p>
      <p className="text-xs text-zinc-400">{data.percentOfFights}% of all fights</p>
      <p className="text-xs text-zinc-400">Severity: {data.severity}/10</p>
      <p className="text-xs text-zinc-400">Escalates in: {data.avgEscalationTime}</p>
      <p className="text-xs text-zinc-400">{data.occurrences} occurrences</p>
    </div>
  );
}

function DayTooltip(props: any) {
  const { active, payload, label } = props;
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[#1e2130] bg-[#12141c] px-4 py-3 shadow-lg">
      <p className="mb-1.5 text-sm font-medium text-zinc-300">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.dataKey} className="text-xs" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

function ProjectionTooltip(props: any) {
  const { active, payload, label } = props;
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[#1e2130] bg-[#12141c] px-4 py-3 shadow-lg">
      <p className="mb-1.5 text-sm font-medium text-zinc-300">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.dataKey} className="text-xs" style={{ color: entry.color }}>
          {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
        </p>
      ))}
    </div>
  );
}

// ═══ MAIN COMPONENT ═══
export default function DeepPredictions() {
  // Prepare data for projections chart — split by scenario
  const baselineData = futureProjections.filter((d) => d.scenario === 'baseline');
  const reconciliationData = futureProjections.filter((d) => d.scenario === 'reconciliation');

  // Merge projection data by month for overlay chart
  const projectionMonths = [...new Set(futureProjections.map((d) => d.month))];
  const mergedProjections = projectionMonths.map((month) => {
    const base = baselineData.find((d) => d.month === month);
    const recon = reconciliationData.find((d) => d.month === month);
    return {
      month,
      baselineMessages: base?.predictedMessages ?? null,
      baselineConfidence: base?.confidence ?? null,
      reconMessages: recon?.predictedMessages ?? null,
      reconConfidence: recon?.confidence ?? null,
    };
  });

  // Sort fight triggers by severity
  const sortedTriggers = [...fightTriggers].sort((a, b) => b.severity - a.severity);

  // Reconciliation rate stages
  const reconStages = [
    { label: 'Early', sublabel: 'Cycles 1-5', rate: cycleStats.reconciliationRate.early },
    { label: 'Mid', sublabel: 'Cycles 6-10', rate: cycleStats.reconciliationRate.mid },
    { label: 'Late', sublabel: 'Cycles 11-16', rate: cycleStats.reconciliationRate.late },
    { label: 'Final', sublabel: 'Cycles 17-20', rate: cycleStats.reconciliationRate.final },
  ];

  return (
    <div className="space-y-6">
      {/* ═══ SECTION 1: CYCLE STATS OVERVIEW ═══ */}
      <section
        className="rounded-2xl border p-6"
        style={cardStyle}
      >
        <h2 className="text-2xl font-bold text-white tracking-tight mb-6">
          Cycle Stats Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Avg cycle length */}
          <div className="rounded-xl border border-[#1e2130] bg-[#0f1117] p-5">
            <p className="text-sm text-zinc-400 mb-1">Avg Cycle Length</p>
            <p className="text-3xl font-bold text-white">{cycleStats.avgCycleLength}<span className="text-base font-normal text-zinc-500 ml-1">days</span></p>
            <p className="text-xs mt-2 text-[#e07000]">
              Accelerating: {cycleStats.earlyStCycleLengthDays}d &rarr; {cycleStats.lateStCycleLengthDays}d
            </p>
          </div>

          {/* Avg silence */}
          <div className="rounded-xl border border-[#1e2130] bg-[#0f1117] p-5">
            <p className="text-sm text-zinc-400 mb-1">Avg Silence Duration</p>
            <p className="text-3xl font-bold text-white">{cycleStats.avgSilenceDuration}<span className="text-base font-normal text-zinc-500 ml-1">days</span></p>
            <p className="text-xs mt-2 text-zinc-500">
              Time between fight and first contact
            </p>
          </div>

          {/* Cycles per month */}
          <div className="rounded-xl border border-[#1e2130] bg-[#0f1117] p-5">
            <p className="text-sm text-zinc-400 mb-1">Cycles Per Month</p>
            <p className="text-3xl font-bold text-white">{cycleStats.cyclesPerMonth}</p>
            <p className="text-xs mt-2 text-zinc-500">
              Fight &rarr; silence &rarr; reconcile &rarr; love surge
            </p>
          </div>

          {/* Reconciliation rate */}
          <div className="rounded-xl border border-[#1e2130] bg-[#0f1117] p-5">
            <p className="text-sm text-zinc-400 mb-1">Reconciliation Rate</p>
            <p className="text-3xl font-bold text-[#ef4444]">Dropping</p>
            <p className="text-xs mt-2 text-[#ef4444]">
              {cycleStats.reconciliationRate.early}% &rarr; {cycleStats.reconciliationRate.final}%
            </p>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: FIGHT VS LOVE OVER TIME ═══ */}
      <section
        className="rounded-2xl border p-6"
        style={cardStyle}
      >
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            The Crossover &mdash; When Fighting Overtook Love
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Fight intensity vs love intensity over time (0-10 scale). The crossover point where fights permanently exceed love is visible around Feb 2025.
          </p>
        </div>
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={monthlyFightLove} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
              <defs>
                <linearGradient id="fightGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="loveGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2130" />
              <XAxis
                dataKey="month"
                tick={{ fill: '#9ca3af', fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: '#1e2130' }}
                interval={2}
                angle={-35}
                textAnchor="end"
                height={60}
              />
              <YAxis
                domain={[0, 10]}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#1e2130' }}
                label={{ value: 'Intensity (0-10)', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 12 }}
              />
              <Tooltip content={<FightLoveTooltip />} />
              <Area
                type="monotone"
                dataKey="fightIntensity"
                name="Fight Intensity"
                stroke="#ef4444"
                fill="url(#fightGrad)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="loveIntensity"
                name="Love Intensity"
                stroke="#22c55e"
                fill="url(#loveGrad)"
                strokeWidth={2}
              />
              {/* Crossover reference line at Feb 2025 */}
              <ReferenceLine
                x="Feb 2025"
                stroke="#e07000"
                strokeDasharray="6 3"
                strokeWidth={2}
                label={{
                  value: 'Crossover',
                  position: 'top',
                  fill: '#e07000',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: '10px' }}
                formatter={(value: string) => (
                  <span style={{ color: '#d1d5db', fontSize: 12 }}>{value}</span>
                )}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* ═══ SECTION 3: THE CYCLE PATTERN ═══ */}
      <section
        className="rounded-2xl border p-6"
        style={cardStyle}
      >
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            The Cycle &mdash; Each Round Worse Than the Last
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Fight intensity trending up, peak love intensity trending down. The lines converge and cross.
          </p>
        </div>
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={fightLoveCycles} margin={{ top: 20, right: 30, bottom: 10, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2130" />
              <XAxis
                dataKey="cycleNum"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#1e2130' }}
                label={{ value: 'Cycle Number', position: 'insideBottom', offset: -5, fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis
                domain={[0, 10]}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#1e2130' }}
                label={{ value: 'Intensity (0-10)', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 12 }}
              />
              <Tooltip content={<CycleTooltip />} />
              <Line
                type="monotone"
                dataKey="fightIntensity"
                name="Fight Intensity"
                stroke="#ef4444"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#ef4444' }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="peakLoveIntensity"
                name="Peak Love Intensity"
                stroke="#22c55e"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#22c55e' }}
                activeDot={{ r: 5 }}
              />
              {/* Annotate cycle 8 — golden period */}
              <ReferenceLine
                x={8}
                stroke="#22c55e"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                label={{
                  value: 'Golden Period (Jul 2024)',
                  position: 'top',
                  fill: '#22c55e',
                  fontSize: 11,
                  fontWeight: 600,
                }}
              />
              {/* Annotate cycle 20 — breaking point */}
              <ReferenceLine
                x={20}
                stroke="#ef4444"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                label={{
                  value: 'Breaking Point',
                  position: 'top',
                  fill: '#ef4444',
                  fontSize: 11,
                  fontWeight: 600,
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: '10px' }}
                formatter={(value: string) => (
                  <span style={{ color: '#d1d5db', fontSize: 12 }}>{value}</span>
                )}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* ═══ SECTION 4: FIGHT TRIGGERS ═══ */}
      <section
        className="rounded-2xl border p-6"
        style={cardStyle}
      >
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            What Triggers the Fights
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Sorted by severity. Bar width shows percentage of all fights. Color intensity reflects severity.
          </p>
        </div>
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedTriggers}
              layout="vertical"
              margin={{ top: 10, right: 40, bottom: 10, left: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2130" horizontal={false} />
              <XAxis
                type="number"
                domain={[0, 40]}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#1e2130' }}
                label={{ value: '% of All Fights', position: 'insideBottom', offset: -5, fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis
                type="category"
                dataKey="trigger"
                width={180}
                tick={{ fill: '#d1d5db', fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#1e2130' }}
              />
              <Tooltip content={<TriggerTooltip />} />
              <Bar dataKey="percentOfFights" name="% of Fights" radius={[0, 6, 6, 0]} label={{ position: 'right', fill: '#9ca3af', fontSize: 11, formatter: (val: any) => `${val}%` }}>
                {sortedTriggers.map((entry, index) => {
                  // Color intensity based on severity (0-10)
                  const opacity = 0.4 + (entry.severity / 10) * 0.6;
                  return (
                    <Cell
                      key={`trigger-${index}`}
                      fill={`rgba(239, 68, 68, ${opacity})`}
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Escalation time labels */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {sortedTriggers.slice(0, 4).map((t) => (
            <div key={t.trigger} className="rounded-lg border border-[#1e2130] bg-[#0f1117] p-3">
              <p className="text-xs text-zinc-400 truncate">{t.trigger}</p>
              <p className="text-sm font-semibold text-white mt-1">
                Escalates in <span className="text-[#ef4444]">{t.avgEscalationTime}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SECTION 5: DAY OF WEEK PATTERNS ═══ */}
      <section
        className="rounded-2xl border p-6"
        style={cardStyle}
      >
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Weekly Volatility &mdash; When Do Fights and Love Peak?
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Grouped bars: fights (red) vs love (green) by day of week. Weekends are the most volatile.
          </p>
        </div>
        <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dayOfWeekPatterns} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2130" />
              <XAxis
                dataKey="day"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#1e2130' }}
              />
              <YAxis
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#1e2130' }}
              />
              <Tooltip content={<DayTooltip />} />
              <Bar dataKey="fights" name="Fights" fill="#ef4444" radius={[4, 4, 0, 0]} opacity={0.85}>
                {dayOfWeekPatterns.map((entry, index) => {
                  const isWeekend = entry.day === 'Saturday' || entry.day === 'Sunday';
                  return (
                    <Cell
                      key={`fight-${index}`}
                      fill={isWeekend ? '#ef4444' : '#ef444499'}
                      stroke={isWeekend ? '#fca5a5' : 'none'}
                      strokeWidth={isWeekend ? 2 : 0}
                    />
                  );
                })}
              </Bar>
              <Bar dataKey="love" name="Love" fill="#22c55e" radius={[4, 4, 0, 0]} opacity={0.85}>
                {dayOfWeekPatterns.map((entry, index) => {
                  const isWeekend = entry.day === 'Saturday' || entry.day === 'Sunday';
                  return (
                    <Cell
                      key={`love-${index}`}
                      fill={isWeekend ? '#22c55e' : '#22c55e99'}
                      stroke={isWeekend ? '#86efac' : 'none'}
                      strokeWidth={isWeekend ? 2 : 0}
                    />
                  );
                })}
              </Bar>
              <Legend
                wrapperStyle={{ paddingTop: '10px' }}
                formatter={(value: string) => (
                  <span style={{ color: '#d1d5db', fontSize: 12 }}>{value}</span>
                )}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Weekend highlight */}
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-[#e0700033] bg-[#e0700010] px-4 py-2.5">
          <span className="text-[#e07000] text-sm font-semibold">Weekend Alert:</span>
          <span className="text-sm text-zinc-300">
            Saturday and Sunday show the highest volatility for both fights and love. Emotions run hotter when there is more free time.
          </span>
        </div>
      </section>

      {/* ═══ SECTION 6: FUTURE PROJECTIONS ═══ */}
      <section
        className="rounded-2xl border p-6"
        style={cardStyle}
      >
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            What Happens Next &mdash; Two Scenarios
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Model projections based on current trajectory. Dashed lines show decreasing confidence.
          </p>
        </div>

        {/* Scenario labels */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 rounded-xl border border-[#1e2130] bg-[#0f1117] p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block w-3 h-3 rounded-full bg-[#ef4444]" />
              <span className="text-sm font-semibold text-white">Baseline (82% likely)</span>
            </div>
            <p className="text-xs text-zinc-400">
              Conversation dies by Sep 2026. Messages approach zero, fights stop because contact stops.
            </p>
          </div>
          <div className="flex-1 rounded-xl border border-[#1e2130] bg-[#0f1117] p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block w-3 h-3 rounded-full bg-[#3b82f6]" />
              <span className="text-sm font-semibold text-white">Reconciliation (18% likely)</span>
            </div>
            <p className="text-xs text-zinc-400">
              Temporary surge in messages and love, but the same destructive patterns repeat. Ends the same way, just later.
            </p>
          </div>
        </div>

        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mergedProjections} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
              <defs>
                <linearGradient id="baselineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="reconGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2130" />
              <XAxis
                dataKey="month"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#1e2130' }}
              />
              <YAxis
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#1e2130' }}
                label={{ value: 'Predicted Messages', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 12 }}
              />
              <Tooltip content={<ProjectionTooltip />} />
              <Area
                type="monotone"
                dataKey="baselineMessages"
                name="Baseline Messages"
                stroke="#ef4444"
                strokeWidth={2}
                strokeDasharray="8 4"
                fill="url(#baselineGrad)"
                connectNulls
              />
              <Area
                type="monotone"
                dataKey="reconMessages"
                name="Reconciliation Messages"
                stroke="#3b82f6"
                strokeWidth={2}
                strokeDasharray="8 4"
                fill="url(#reconGrad)"
                connectNulls
              />
              <Legend
                wrapperStyle={{ paddingTop: '10px' }}
                formatter={(value: string) => (
                  <span style={{ color: '#d1d5db', fontSize: 12 }}>{value}</span>
                )}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Confidence indicator */}
        <div className="mt-4 flex items-center gap-3">
          <span className="text-xs text-zinc-500">Confidence:</span>
          <div className="flex-1 flex gap-1">
            {mergedProjections.map((d, i) => (
              <div
                key={`conf-${i}`}
                className="flex-1 h-2 rounded-full"
                style={{
                  backgroundColor: `rgba(239, 68, 68, ${(d.baselineConfidence ?? 50) / 100})`,
                }}
                title={`${d.month}: ${d.baselineConfidence}% confidence`}
              />
            ))}
          </div>
          <span className="text-xs text-zinc-500">Fading &rarr;</span>
        </div>
      </section>

      {/* ═══ SECTION 7: RECONCILIATION RATE DECLINE ═══ */}
      <section
        className="rounded-2xl border p-6"
        style={cardStyle}
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Can They Come Back? The Recovery Rate is Falling
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Percentage of fight cycles that led to successful reconciliation, by era.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {reconStages.map((stage) => {
            // Color from green to red based on rate
            const hue = (stage.rate / 100) * 120; // 120=green, 0=red
            const color = `hsl(${hue}, 70%, 50%)`;
            const bgColor = `hsl(${hue}, 70%, 12%)`;
            const borderColor = `hsl(${hue}, 70%, 25%)`;

            return (
              <div
                key={stage.label}
                className="rounded-xl border p-5 text-center"
                style={{ backgroundColor: bgColor, borderColor }}
              >
                <p className="text-sm text-zinc-400 mb-1">{stage.label}</p>
                <p className="text-xs text-zinc-500 mb-3">{stage.sublabel}</p>

                {/* Circular progress ring */}
                <div className="relative flex items-center justify-center mx-auto" style={{ width: 80, height: 80 }}>
                  <svg width={80} height={80} viewBox="0 0 80 80" className="-rotate-90">
                    <circle
                      cx={40}
                      cy={40}
                      r={32}
                      fill="none"
                      stroke="#1e2130"
                      strokeWidth={6}
                    />
                    <circle
                      cx={40}
                      cy={40}
                      r={32}
                      fill="none"
                      stroke={color}
                      strokeWidth={6}
                      strokeDasharray={`${(stage.rate / 100) * (2 * Math.PI * 32)} ${(1 - stage.rate / 100) * (2 * Math.PI * 32)}`}
                      strokeLinecap="round"
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                  <span
                    className="absolute text-xl font-bold"
                    style={{ color }}
                  >
                    {stage.rate}%
                  </span>
                </div>

                {/* Progress bar below */}
                <div className="mt-3 w-full h-2 rounded-full bg-[#1e2130] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${stage.rate}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Decline arrows between stages */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {reconStages.map((stage, i) => (
            <div key={stage.label} className="flex items-center gap-2">
              <span className="text-lg font-bold" style={{
                color: `hsl(${(stage.rate / 100) * 120}, 70%, 50%)`,
              }}>
                {stage.rate}%
              </span>
              {i < reconStages.length - 1 && (
                <span className="text-zinc-500 text-lg">&rarr;</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SECTION 8: KEY INSIGHT BOX ═══ */}
      <section
        className="rounded-2xl border-2 border-[#ef444440] p-6"
        style={{ background: 'linear-gradient(135deg, #1a0a0a 0%, #12141c 50%, #0a1a0a 100%)' }}
      >
        <div className="flex items-start gap-4">
          <div className="shrink-0 mt-1">
            <div className="w-10 h-10 rounded-full bg-[#ef444420] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#ef4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-3">
              Key Insight
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              The data tells one story: fights are getting worse, love surges are getting shorter, and silences are getting longer. The cycle that once took 24 days now completes in 14. Recovery used to happen 95% of the time &mdash; now it&apos;s 50/50. The crossover point where fighting permanently exceeded love happened around Feb 2025, and nothing has reversed it.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
