'use client';

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { ratings, COLORS } from '@/data/metrics';

// Merge both people's dimension scores into a single array for the radar chart
const radarData = ratings.yogi.dimensions.map((dim, i) => ({
  dimension: dim.name,
  yogi: dim.score,
  saayella: ratings.saayella.dimensions[i].score,
}));

function ScoreRing({
  score,
  color,
  name,
}: {
  score: number;
  color: string;
  name: string;
}) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width="140" height="140" viewBox="0 0 140 140">
        {/* Background ring */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#2a2d37"
          strokeWidth="10"
        />
        {/* Progress ring */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 70 70)"
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
        {/* Score text */}
        <text
          x="70"
          y="64"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#e4e4e7"
          fontSize="28"
          fontWeight="700"
        >
          {score}
        </text>
        <text
          x="70"
          y="90"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#9ca3af"
          fontSize="13"
        >
          / 100
        </text>
      </svg>
      <span className="text-lg font-semibold" style={{ color }}>
        {name}
      </span>
    </div>
  );
}

function DimensionCard({
  name,
  yogiScore,
  saayellaScore,
  yogiDetail,
  saayellaDetail,
}: {
  name: string;
  yogiScore: number;
  saayellaScore: number;
  yogiDetail: string;
  saayellaDetail: string;
}) {
  return (
    <div className="rounded-xl p-4" style={{ backgroundColor: '#12141c' }}>
      <h4 className="mb-3 text-sm font-semibold" style={{ color: '#e4e4e7' }}>
        {name}
      </h4>

      {/* Yogi bar */}
      <div className="mb-2">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs font-medium" style={{ color: COLORS.yogi }}>
            Yogi
          </span>
          <span className="text-xs" style={{ color: '#9ca3af' }}>
            {yogiScore}
          </span>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-full"
          style={{ backgroundColor: '#2a2d37' }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${yogiScore}%`,
              backgroundColor: COLORS.yogi,
              transition: 'width 0.6s ease',
            }}
          />
        </div>
        <p className="mt-1 text-[11px] leading-tight" style={{ color: '#9ca3af' }}>
          {yogiDetail}
        </p>
      </div>

      {/* Saayella bar */}
      <div>
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs font-medium" style={{ color: COLORS.saayella }}>
            Saayella
          </span>
          <span className="text-xs" style={{ color: '#9ca3af' }}>
            {saayellaScore}
          </span>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-full"
          style={{ backgroundColor: '#2a2d37' }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${saayellaScore}%`,
              backgroundColor: COLORS.saayella,
              transition: 'width 0.6s ease',
            }}
          />
        </div>
        <p className="mt-1 text-[11px] leading-tight" style={{ color: '#9ca3af' }}>
          {saayellaDetail}
        </p>
      </div>
    </div>
  );
}

export default function PersonRatings() {
  return (
    <section className="w-full">
      {/* Section title */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold" style={{ color: '#e4e4e7' }}>
          Person Ratings
        </h2>
        <p className="mt-1 text-sm" style={{ color: '#9ca3af' }}>
          Composite scores across 8 relationship dimensions, derived from 141,594
          messages over 876 days.
        </p>
      </div>

      {/* Overall score rings */}
      <div
        className="mb-8 flex items-center justify-center gap-16 rounded-xl py-8"
        style={{ backgroundColor: '#12141c' }}
      >
        <ScoreRing
          score={ratings.yogi.overall}
          color={COLORS.yogi}
          name="Yogi"
        />
        <ScoreRing
          score={ratings.saayella.overall}
          color={COLORS.saayella}
          name="Saayella"
        />
      </div>

      {/* Radar chart */}
      <div
        className="mb-8 rounded-xl p-4"
        style={{ backgroundColor: '#12141c' }}
      >
        <h3
          className="mb-4 text-center text-base font-semibold"
          style={{ color: '#e4e4e7' }}
        >
          Dimension Comparison
        </h3>
        <ResponsiveContainer width="100%" height={420}>
          <RadarChart cx="50%" cy="50%" outerRadius="72%" data={radarData}>
            <PolarGrid stroke="#2a2d37" />
            <PolarAngleAxis
              dataKey="dimension"
              tick={{ fill: '#9ca3af', fontSize: 11 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: '#9ca3af', fontSize: 10 }}
              axisLine={false}
            />
            <Radar
              name="Yogi"
              dataKey="yogi"
              stroke={COLORS.yogi}
              fill={COLORS.yogi}
              fillOpacity={0.3}
            />
            <Radar
              name="Saayella"
              dataKey="saayella"
              stroke={COLORS.saayella}
              fill={COLORS.saayella}
              fillOpacity={0.3}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1d27',
                border: '1px solid #2a2d37',
                borderRadius: '8px',
                color: '#e4e4e7',
                fontSize: '13px',
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Dimension detail cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ratings.yogi.dimensions.map((dim, i) => (
          <DimensionCard
            key={dim.name}
            name={dim.name}
            yogiScore={dim.score}
            saayellaScore={ratings.saayella.dimensions[i].score}
            yogiDetail={dim.detail}
            saayellaDetail={ratings.saayella.dimensions[i].detail}
          />
        ))}
      </div>
    </section>
  );
}
