'use client';

import { predictions, COLORS } from '@/data/metrics';

const severityConfig: Record<string, { color: string; border: string; label: string }> = {
  critical: { color: '#ef4444', border: '#ef4444', label: 'Critical' },
  high:     { color: '#f97316', border: '#f97316', label: 'High' },
  medium:   { color: '#eab308', border: '#eab308', label: 'Medium' },
};

function ProbabilityGauge({ value }: { value: number }) {
  const radius = 36;
  const stroke = 5;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;
  const color =
    value >= 85 ? '#ef4444' : value >= 70 ? '#f97316' : '#eab308';

  return (
    <div className="relative flex items-center justify-center" style={{ width: 88, height: 88 }}>
      <svg width={88} height={88} viewBox="0 0 88 88" className="-rotate-90">
        {/* Background track */}
        <circle
          cx={44}
          cy={44}
          r={radius}
          fill="none"
          stroke="#2a2d37"
          strokeWidth={stroke}
        />
        {/* Progress arc */}
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
      <span
        className="absolute text-lg font-bold"
        style={{ color }}
      >
        {value}%
      </span>
    </div>
  );
}

function PersonTag({ person }: { person: string }) {
  if (person === 'both') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
        style={{ backgroundColor: 'rgba(136,136,136,0.15)', color: COLORS.neutral }}>
        <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.yogi }} />
        <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.saayella }} />
        Both
      </span>
    );
  }
  const isYogi = person === 'yogi';
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{
        backgroundColor: isYogi ? 'rgba(45,107,196,0.15)' : 'rgba(196,64,110,0.15)',
        color: isYogi ? COLORS.yogi : COLORS.saayella,
      }}>
      <span className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: isYogi ? COLORS.yogi : COLORS.saayella }} />
      {isYogi ? 'Yogi' : 'Saayella'}
    </span>
  );
}

export default function Predictions() {
  const sorted = [...predictions].sort((a, b) => b.probability - a.probability);

  return (
    <section className="rounded-xl p-6 space-y-6" style={{ background: '#12141c' }}>
      {/* Section header */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Predictive Analytics
        </h2>
        <p className="text-sm mt-1" style={{ color: COLORS.textMuted }}>
          What&apos;s likely to happen next based on behavioral patterns
        </p>
      </div>

      {/* Prediction cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sorted.map((pred) => {
          const sev = severityConfig[pred.severity] ?? severityConfig.medium;

          return (
            <div
              key={pred.id}
              className="rounded-lg border p-5 flex gap-4 transition-colors duration-200"
              style={{
                backgroundColor: COLORS.card,
                borderColor: COLORS.border,
                borderLeftWidth: 4,
                borderLeftColor: sev.border,
              }}
            >
              {/* Left: gauge */}
              <div className="shrink-0 flex items-start pt-1">
                <ProbabilityGauge value={pred.probability} />
              </div>

              {/* Right: content */}
              <div className="flex-1 min-w-0 space-y-2">
                {/* Severity badge + timeframe */}
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide"
                    style={{
                      backgroundColor: `${sev.color}20`,
                      color: sev.color,
                    }}
                  >
                    {pred.severity === 'critical' && (
                      <span className="relative flex h-2 w-2">
                        <span
                          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                          style={{ backgroundColor: sev.color }}
                        />
                        <span
                          className="relative inline-flex rounded-full h-2 w-2"
                          style={{ backgroundColor: sev.color }}
                        />
                      </span>
                    )}
                    {sev.label}
                  </span>
                  <span className="text-xs" style={{ color: COLORS.textMuted }}>
                    {pred.timeframe}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-white leading-snug">
                  {pred.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed" style={{ color: COLORS.textMuted }}>
                  {pred.description}
                </p>

                {/* Bottom tags */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium"
                    style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: '#d1d5db' }}
                  >
                    <svg
                      className="w-3 h-3 opacity-60"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
                    </svg>
                    {pred.indicator}
                  </span>
                  <PersonTag person={pred.person} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
