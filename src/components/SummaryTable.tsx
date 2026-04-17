'use client';

import { fullSummary, COLORS } from '@/data/metrics';

/**
 * Determine the "winner" for a given row.
 * Returns 'yogi' | 'saayella' | 'tie'.
 *
 * For numeric-ish values we extract the leading number and compare.
 * Special handling for metrics where *lower* is better (reply time, calls ignored,
 * harsh language, left waiting, silenced calls, anxious behaviours, self-blame,
 * deleted messages, starts conflicts).
 */
function winner(
  metric: string,
  yogiVal: string,
  saayellaVal: string,
): 'yogi' | 'saayella' | 'tie' {
  const numOf = (s: string): number => {
    const cleaned = s.replace(/,/g, '').replace(/%/g, '');
    const m = cleaned.match(/^[\d.]+/);
    return m ? parseFloat(m[0]) : NaN;
  };

  const y = numOf(yogiVal);
  const s = numOf(saayellaVal);

  if (isNaN(y) || isNaN(s)) return 'tie';
  if (y === s) return 'tie';

  const lowerIsBetter = [
    'Avg reply time',
    'Calls ignored',
    'Silenced calls',
    'Left waiting 6+ hrs',
    'Harsh/abusive language',
    'Anxious behaviours',
    'Self-blame language',
    'Deleted messages',
    'Starts conflicts',
  ];

  const higherWins = !lowerIsBetter.includes(metric);
  if (higherWins) return y > s ? 'yogi' : 'saayella';
  return y < s ? 'yogi' : 'saayella';
}

export default function SummaryTable() {
  return (
    <section className="space-y-6">
      {/* ── Section title ── */}
      <h2 className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
        Complete Comparison &mdash; Every Dimension
      </h2>

      {/* ── Scrollable table wrapper ── */}
      <div className="overflow-x-auto rounded-xl border border-[#1e2130] bg-[#12141c] shadow-[0_0_24px_rgba(255,255,255,0.02)]">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-[#1e2130]">
              <th className="px-5 py-4 text-left font-semibold text-zinc-400 uppercase tracking-wider text-xs">
                Metric
              </th>
              <th
                className="px-5 py-4 text-right font-semibold uppercase tracking-wider text-xs"
                style={{ color: COLORS.yogi }}
              >
                Yogi
              </th>
              <th
                className="px-5 py-4 text-right font-semibold uppercase tracking-wider text-xs"
                style={{ color: COLORS.saayella }}
              >
                Saayella
              </th>
            </tr>
          </thead>

          <tbody>
            {fullSummary.map((row, i) => {
              const w = winner(row.metric, row.yogi, row.saayella);
              const isEven = i % 2 === 0;

              return (
                <tr
                  key={row.metric}
                  className={`
                    border-b border-[#1e2130] transition-colors
                    ${isEven ? 'bg-[#12141c]' : 'bg-[#151722]'}
                    hover:bg-[#1a1d2e]
                  `}
                >
                  {/* Metric label */}
                  <td className="px-5 py-3.5 font-medium text-zinc-300">
                    {row.metric}
                  </td>

                  {/* Yogi value */}
                  <td
                    className="px-5 py-3.5 text-right font-semibold tabular-nums"
                    style={{
                      color: COLORS.yogi,
                      ...(w === 'yogi'
                        ? {
                            textShadow: `0 0 8px ${COLORS.yogi}66`,
                            background: `linear-gradient(90deg, transparent 40%, ${COLORS.yogi}0d 100%)`,
                          }
                        : {}),
                    }}
                  >
                    {row.yogi}
                    {w === 'yogi' && (
                      <span className="ml-1.5 text-[10px] opacity-60">&#9650;</span>
                    )}
                  </td>

                  {/* Saayella value */}
                  <td
                    className="px-5 py-3.5 text-right font-semibold tabular-nums"
                    style={{
                      color: COLORS.saayella,
                      ...(w === 'saayella'
                        ? {
                            textShadow: `0 0 8px ${COLORS.saayella}66`,
                            background: `linear-gradient(90deg, transparent 40%, ${COLORS.saayella}0d 100%)`,
                          }
                        : {}),
                    }}
                  >
                    {row.saayella}
                    {w === 'saayella' && (
                      <span className="ml-1.5 text-[10px] opacity-60">&#9650;</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Psychological verdict ── */}
      <div className="rounded-xl border border-[#1e2130] bg-[#12141c] p-6 sm:p-8 space-y-5 shadow-[0_0_24px_rgba(255,255,255,0.02)]">
        <h3 className="text-lg font-bold text-zinc-100 tracking-tight">
          Psychological Verdict
        </h3>

        {/* Yogi */}
        <div
          className="rounded-lg border px-5 py-4"
          style={{
            borderColor: `${COLORS.yogi}33`,
            background: `${COLORS.yogi}0a`,
          }}
        >
          <p className="text-sm font-semibold mb-1" style={{ color: COLORS.yogi }}>
            Yogi
          </p>
          <p className="text-sm leading-relaxed text-zinc-300">
            Classic anxious attachment. Over-pursues, over-apologises, never silences.
            Fear of abandonment drives everything.
          </p>
        </div>

        {/* Saayella */}
        <div
          className="rounded-lg border px-5 py-4"
          style={{
            borderColor: `${COLORS.saayella}33`,
            background: `${COLORS.saayella}0a`,
          }}
        >
          <p className="text-sm font-semibold mb-1" style={{ color: COLORS.saayella }}>
            Saayella
          </p>
          <p className="text-sm leading-relaxed text-zinc-300">
            Avoidant tendencies over genuine love. Silences calls, ghosts, but always
            returns. Overwhelmed, needs space.
          </p>
        </div>

        {/* Shared truth */}
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-5 py-4">
          <p className="text-sm leading-relaxed text-zinc-400 italic">
            The love was real. Both most-used words include each other&apos;s names and
            &ldquo;love.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
