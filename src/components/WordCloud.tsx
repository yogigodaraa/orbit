'use client';

import { topWords, arshFactor, COLORS } from '@/data/metrics';

/* ── helpers ── */

/** Map a count to a font size between min and max, scaled relative to the largest count. */
function fontSize(count: number, max: number, minPx = 13, maxPx = 36): number {
  if (max === 0) return minPx;
  return minPx + ((count / max) * (maxPx - minPx));
}

/** Blend a base colour toward white by `t` (0-1). */
function lighten(hex: string, t: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const mix = (c: number) => Math.round(c + (255 - c) * t);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

/* ── word cloud panel ── */
function CloudPanel({
  title,
  words,
  baseColor,
  lightColor,
}: {
  title: string;
  words: typeof topWords.yogi;
  baseColor: string;
  lightColor: string;
}) {
  const maxCount = Math.max(...words.map((w) => w.count));

  return (
    <div className="flex-1 min-w-[280px]">
      <h3
        className="mb-4 text-lg font-semibold tracking-tight"
        style={{ color: baseColor }}
      >
        {title}
      </h3>

      <div className="flex flex-wrap gap-2.5">
        {words.map((entry) => {
          /* Intensity 0-1 based on count */
          const intensity = entry.count / maxCount;
          const size = fontSize(entry.count, maxCount);
          /* Background fades from lightColor (biggest) to a subtler tint (smallest) */
          const bg = lighten(baseColor, 0.82 + (1 - intensity) * 0.12);
          /* Text gets darker for bigger words */
          const fg = lighten(baseColor, (1 - intensity) * 0.15);

          return (
            <span
              key={entry.word}
              className="inline-flex items-baseline gap-1 rounded-full px-3.5 py-1.5 font-medium leading-snug select-none transition-transform hover:scale-105"
              style={{
                fontSize: size,
                backgroundColor: bg,
                color: fg,
              }}
            >
              {entry.word}
              <span
                className="font-mono text-[0.7em] opacity-70"
                style={{ color: fg }}
              >
                ({entry.count.toLocaleString()})
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ── arsh factor bar ── */
function ArshBar() {
  const total = arshFactor.yogi + arshFactor.saayella;
  const yogiPct = (arshFactor.yogi / total) * 100;
  const saayellaPct = (arshFactor.saayella / total) * 100;

  return (
    <div
      className="rounded-xl border p-6 mt-8"
      style={{ background: '#12141c', borderColor: '#1e2130' }}
    >
      <h3 className="text-lg font-semibold mb-1" style={{ color: COLORS.text }}>
        The Arsh Factor
      </h3>
      <p className="text-sm mb-5" style={{ color: COLORS.textMuted }}>
        Times each person mentioned &quot;Arsh&quot; across all messages
      </p>

      {/* counts */}
      <div className="flex items-end justify-between mb-2">
        <div>
          <span className="text-sm" style={{ color: COLORS.textMuted }}>
            Yogi
          </span>
          <p
            className="text-2xl font-bold font-mono"
            style={{ color: COLORS.yogi }}
          >
            {arshFactor.yogi.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <span className="text-sm" style={{ color: COLORS.textMuted }}>
            Saayella
          </span>
          <p
            className="text-2xl font-bold font-mono"
            style={{ color: COLORS.saayella }}
          >
            {arshFactor.saayella.toLocaleString()}
          </p>
        </div>
      </div>

      {/* split bar */}
      <div className="flex h-5 w-full overflow-hidden rounded-full">
        <div
          className="flex items-center justify-center text-xs font-semibold text-white transition-all"
          style={{
            width: `${yogiPct}%`,
            backgroundColor: COLORS.yogi,
          }}
        >
          {Math.round(yogiPct)}%
        </div>
        <div
          className="flex items-center justify-center text-xs font-semibold text-white transition-all"
          style={{
            width: `${saayellaPct}%`,
            backgroundColor: COLORS.saayella,
          }}
        >
          {Math.round(saayellaPct)}%
        </div>
      </div>

      <p className="text-xs mt-3" style={{ color: COLORS.textMuted }}>
        Saayella mentioned Arsh{' '}
        <strong className="text-white">
          {Math.round((arshFactor.saayella / arshFactor.yogi) * 100 - 100)}% more
        </strong>{' '}
        than Yogi. Each mention correlated with a 3.2x conflict probability
        within 24 hours.
      </p>
    </div>
  );
}

/* ── main export ── */
export default function WordCloud() {
  return (
    <section className="space-y-6">
      {/* section title */}
      <h2
        className="text-2xl font-bold tracking-tight"
        style={{ color: COLORS.text }}
      >
        Their Words — What Lived in Their Heads
      </h2>

      {/* two side-by-side word clouds */}
      <div
        className="rounded-xl border p-6"
        style={{ background: '#12141c', borderColor: '#1e2130' }}
      >
        <div className="flex flex-col gap-8 md:flex-row md:gap-10">
          <CloudPanel
            title="Yogi's Top Words"
            words={topWords.yogi}
            baseColor={COLORS.yogi}
            lightColor={COLORS.yogiLight}
          />
          <CloudPanel
            title="Saayella's Top Words"
            words={topWords.saayella}
            baseColor={COLORS.saayella}
            lightColor={COLORS.saayellaLight}
          />
        </div>
      </div>

      {/* arsh factor card */}
      <ArshBar />
    </section>
  );
}
