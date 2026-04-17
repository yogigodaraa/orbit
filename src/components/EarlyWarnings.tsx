'use client';

import { earlyWarnings, COLORS } from '@/data/metrics';

const levelConfig: Record<string, { color: string; label: string; pulse: boolean }> = {
  critical: { color: '#ef4444', label: 'CRITICAL', pulse: true },
  high:     { color: '#f97316', label: 'HIGH',     pulse: false },
  medium:   { color: '#eab308', label: 'MEDIUM',   pulse: false },
};

function TrendIcon({ trend }: { trend: string }) {
  if (trend === 'down') {
    return (
      <svg
        className="w-5 h-5 shrink-0"
        viewBox="0 0 20 20"
        fill="#ef4444"
        aria-label="Trending down"
      >
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
      <svg
        className="w-5 h-5 shrink-0"
        viewBox="0 0 20 20"
        fill="#f97316"
        aria-label="Trending up"
      >
        <path
          fillRule="evenodd"
          d="M10 3a.75.75 0 01.75.75v10.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3.75A.75.75 0 0110 3z"
          transform="rotate(180 10 10)"
        />
      </svg>
    );
  }
  // flat
  return (
    <svg
      className="w-5 h-5 shrink-0"
      viewBox="0 0 20 20"
      fill="#6b7280"
      aria-label="Flat trend"
    >
      <rect x="4" y="9" width="12" height="2" rx="1" />
    </svg>
  );
}

export default function EarlyWarnings() {
  const counts: Record<string, number> = {};
  earlyWarnings.forEach((w) => {
    counts[w.level] = (counts[w.level] || 0) + 1;
  });

  return (
    <section className="rounded-xl p-6 space-y-6" style={{ background: '#12141c' }}>
      {/* ── Section title with pulsing red indicator ── */}
      <div className="flex items-center gap-3">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
        </span>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Early Warning System
        </h2>
      </div>

      {/* ── Warning cards ── */}
      <div className="space-y-4">
        {earlyWarnings.map((warning) => {
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
                <div className="flex items-center gap-3 min-w-0">
                  {/* Level badge */}
                  <span
                    className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                      cfg.pulse ? 'animate-pulse' : ''
                    }`}
                    style={{
                      backgroundColor: `${cfg.color}1A`,
                      color: cfg.color,
                      border: `1px solid ${cfg.color}44`,
                    }}
                  >
                    {cfg.pulse && (
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: cfg.color }}
                      />
                    )}
                    {cfg.label}
                  </span>

                  {/* Title */}
                  <h3 className="text-white font-semibold text-sm leading-snug truncate">
                    {warning.title}
                  </h3>
                </div>

                {/* Trend arrow */}
                <TrendIcon trend={warning.trend} />
              </div>

              {/* Detail text */}
              <p className="mt-2 text-sm leading-relaxed" style={{ color: COLORS.textMuted }}>
                {warning.detail}
              </p>

              {/* Current vs Peak comparison */}
              <div
                className="mt-3 flex items-center gap-4 rounded-md px-3 py-2 text-xs"
                style={{ backgroundColor: '#12141c', border: '1px solid #1e2130' }}
              >
                <div className="flex flex-col">
                  <span style={{ color: COLORS.textMuted }}>Current</span>
                  <span className="font-semibold" style={{ color: cfg.color }}>
                    {warning.currentValue}
                  </span>
                </div>

                {warning.peakValue !== 'N/A' && (
                  <>
                    <div style={{ color: '#4b5563' }}>
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M3 10a.75.75 0 01.75-.75h10.69l-3.22-3.22a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H3.75A.75.75 0 013 10z"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span style={{ color: COLORS.textMuted }}>Peak</span>
                      <span className="font-semibold text-gray-300">
                        {warning.peakValue}
                      </span>
                    </div>
                  </>
                )}

                {warning.peakValue === 'N/A' && (
                  <div className="flex flex-col">
                    <span style={{ color: COLORS.textMuted }}>Peak</span>
                    <span className="text-gray-500 font-medium">N/A</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Summary bar ── */}
      <div
        className="flex items-center justify-center gap-3 rounded-lg px-4 py-3 text-sm font-medium"
        style={{ backgroundColor: '#1a1d27', border: '1px solid #1e2130' }}
      >
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
          <span style={{ color: '#ef4444' }}>{counts.critical || 0} Critical</span>
        </span>
        <span style={{ color: '#374151' }}>·</span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#f97316' }} />
          <span style={{ color: '#f97316' }}>{counts.high || 0} High</span>
        </span>
        <span style={{ color: '#374151' }}>·</span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#eab308' }} />
          <span style={{ color: '#eab308' }}>{counts.medium || 0} Medium</span>
        </span>
      </div>
    </section>
  );
}
