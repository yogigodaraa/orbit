'use client';

import { psychPatterns, attachmentStyle, COLORS } from '@/data/metrics';

function ComparisonBar({ yogi, saayella }: { yogi: number; saayella: number }) {
  const total = yogi + saayella;
  const yogiPct = total > 0 ? (yogi / total) * 100 : 50;
  return (
    <div className="flex h-2 w-full overflow-hidden rounded-full bg-[#1e2130]">
      <div
        className="h-full transition-all"
        style={{ width: `${yogiPct}%`, backgroundColor: COLORS.yogi }}
      />
      <div
        className="h-full transition-all"
        style={{ width: `${100 - yogiPct}%`, backgroundColor: COLORS.saayella }}
      />
    </div>
  );
}

function AttachmentBar({
  label,
  yogi,
  saayella,
}: {
  label: string;
  yogi: number;
  saayella: number;
}) {
  const total = yogi + saayella;
  const yogiPct = (yogi / total) * 100;
  const saayellaPct = (saayella / total) * 100;

  return (
    <div className="rounded-xl border border-[#1e2130] bg-[#12141c] p-6">
      <h4 className="mb-4 text-lg font-semibold text-[#e4e4e7] capitalize">
        {label} Attachment
      </h4>

      <div className="mb-3 flex items-end justify-between">
        <div className="flex flex-col items-start">
          <span className="text-xs font-medium uppercase tracking-wider text-[#9ca3af]">
            Yogi
          </span>
          <span
            className="text-3xl font-bold tabular-nums"
            style={{ color: COLORS.yogi }}
          >
            {yogi.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-medium uppercase tracking-wider text-[#9ca3af]">
            Saayella
          </span>
          <span
            className="text-3xl font-bold tabular-nums"
            style={{ color: COLORS.saayella }}
          >
            {saayella.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex h-4 w-full overflow-hidden rounded-full bg-[#1e2130]">
        <div
          className="flex h-full items-center justify-center text-[10px] font-bold text-white transition-all"
          style={{ width: `${yogiPct}%`, backgroundColor: COLORS.yogi }}
        >
          {yogiPct.toFixed(0)}%
        </div>
        <div
          className="flex h-full items-center justify-center text-[10px] font-bold text-white transition-all"
          style={{ width: `${saayellaPct}%`, backgroundColor: COLORS.saayella }}
        >
          {saayellaPct.toFixed(0)}%
        </div>
      </div>

      {label === 'anxious' && (
        <p className="mt-3 text-sm text-[#9ca3af]">
          Yogi shows <strong className="text-[#e4e4e7]">8.7x</strong> more
          anxious attachment signals
        </p>
      )}
      {label === 'avoidant' && (
        <p className="mt-3 text-sm text-[#9ca3af]">
          Yogi <strong className="text-[#e4e4e7]">1.4x</strong> more avoidant
          &mdash; but both are high
        </p>
      )}
    </div>
  );
}

export default function PsychPatterns() {
  return (
    <section className="w-full space-y-10">
      {/* ── Psych Patterns Grid ── */}
      <div>
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-[#e4e4e7]">
          Psychological &amp; Behavioural Patterns
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {psychPatterns.map((p) => {
            const total = p.yogi + p.saayella;
            return (
              <div
                key={p.label}
                className="rounded-xl border border-[#1e2130] bg-[#12141c] p-4 transition-colors hover:border-[#2a2d37]"
              >
                <h3 className="mb-3 text-sm font-semibold leading-tight text-[#e4e4e7]">
                  {p.label}
                </h3>

                <div className="mb-2 flex items-baseline justify-between gap-2">
                  <span
                    className="text-xl font-bold tabular-nums"
                    style={{ color: COLORS.yogi }}
                  >
                    {p.yogi.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#9ca3af]">vs</span>
                  <span
                    className="text-xl font-bold tabular-nums"
                    style={{ color: COLORS.saayella }}
                  >
                    {p.saayella.toLocaleString()}
                  </span>
                </div>

                <ComparisonBar yogi={p.yogi} saayella={p.saayella} />

                <div className="mt-2 flex justify-between text-[10px] text-[#9ca3af]">
                  <span>
                    {total > 0 ? ((p.yogi / total) * 100).toFixed(0) : 50}%
                  </span>
                  <span>
                    {total > 0
                      ? ((p.saayella / total) * 100).toFixed(0)
                      : 50}
                    %
                  </span>
                </div>

                <p className="mt-2 text-xs leading-snug text-[#9ca3af]">
                  {p.note}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Attachment Style ── */}
      <div>
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-[#e4e4e7]">
          Attachment Style
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <AttachmentBar
            label="anxious"
            yogi={attachmentStyle.anxious.yogi}
            saayella={attachmentStyle.anxious.saayella}
          />
          <AttachmentBar
            label="avoidant"
            yogi={attachmentStyle.avoidant.yogi}
            saayella={attachmentStyle.avoidant.saayella}
          />
        </div>
      </div>

      {/* ── Warning Callout ── */}
      <div
        className="rounded-xl border px-5 py-4"
        style={{
          borderColor: `${COLORS.warning}44`,
          backgroundColor: `${COLORS.warning}0d`,
        }}
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-lg" style={{ color: COLORS.warning }}>
            &#9888;
          </span>
          <p className="text-sm leading-relaxed text-[#e4e4e7]">
            <strong style={{ color: COLORS.warning }}>154 days</strong> had both
            high affection and high conflict the same day &mdash; emotional
            whiplash on{' '}
            <strong style={{ color: COLORS.warning }}>17%</strong> of all days.
          </p>
        </div>
      </div>
    </section>
  );
}
