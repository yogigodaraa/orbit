import type { RelationshipConfig } from './types';

export const config: RelationshipConfig = {
  id: 'best-friend',
  label: 'Best Friend',
  emoji: '🤝',
  theme: {
    person1: '#2dd4bf',
    person2: '#14b8a6',
    accent: '#10b981',
    gradient: 'linear-gradient(135deg,#2dd4bf 0%,#14b8a6 50%,#0ea5e9 100%)',
    glow: '#14b8a6',
  },
  copy: {
    selectorTitle: 'Best Friend',
    selectorTagline: "Your person. Let's see the bond.",
    uploadHeadline: 'Analyze your chat with your best friend',
    uploadSubhead: 'Inside jokes, support, and the shape of your bond',
    sectionHeadings: {
      overview: 'Stats Overview',
      affection: 'Warmth & Inside Jokes',
      reciprocity: 'Support Balance',
      conflict: 'Friction Moments',
      patterns: 'Friendship Patterns',
      ratings: 'Friendship Health',
      predictions: 'Where This Bond Is Heading',
      warnings: 'Imbalance Signals',
      timeline: 'Friendship Timeline',
      verdict: 'The Read',
    },
    verdictLead: "Here's the read on your friendship.",
  },
  systemPrompt: `You are analysing a best-friend chat history. Emit ONLY valid JSON matching the AnalysisData contract.

Use these adapted labels exactly:

loveAffection items (label field):
- "Inside jokes referenced"
- "Emotional depth exchanges"
- "Celebration amplification"
- "Life-event presence (birthdays/crises)"
- "Humor density"
- "Continuity threads (remembering details)"

conflict items (label field):
- "Venting imbalance"
- "Slow-fade signals"
- "Jealousy of other friends"
- "Transactional-only contact"
- "Friction/disagreements"

psychPatterns items (label + note):
- "Emotional dumping"
- "Slow fade"
- "Ghosting episodes"
- "Chosen-family closeness"
- "Reciprocity norm"

ratings dimensions (8 per person, exactly):
- "Emotional investment"
- "Crisis reliability"
- "Support reciprocity"
- "Consistency"
- "Humor & warmth"
- "Life-event presence"
- "Respect for autonomy"
- "Depth of trust"

Tone: warm and celebratory. Never rank friendships against each other. DO NOT score love reciprocity as romantic — the reciprocity field here represents emotional-support reciprocity, not romantic love. Return ONLY the JSON object, no prose, no markdown fences.`,
  demoData: {
    participants: { person1: 'Priya', person2: 'Jade' },
    totalMessages: 38500,
    totalDays: 2192,
    dateRange: { start: '2019-03-14', end: '2025-03-14' },
    rawVolume: {
      person1: { messages: 20100, avgReplyMin: 14, startsDay: 58 },
      person2: { messages: 18400, avgReplyMin: 22, startsDay: 42 },
    },
    loveAffection: [
      { label: 'Inside jokes referenced', person1: 92, person2: 89 },
      { label: 'Emotional depth exchanges', person1: 85, person2: 78 },
      { label: 'Celebration amplification', person1: 88, person2: 82 },
      { label: 'Life-event presence (birthdays/crises)', person1: 91, person2: 86 },
      { label: 'Humor density', person1: 87, person2: 90 },
      { label: 'Continuity threads (remembering details)', person1: 84, person2: 72 },
    ],
    reciprocity: {
      person1SaysLovePerson2Reciprocates: 86,
      person2SaysLovePerson1Reciprocates: 81,
    },
    conflict: [
      { label: 'Venting imbalance', person1: 62, person2: 34 },
      { label: 'Slow-fade signals', person1: 18, person2: 28 },
      { label: 'Jealousy of other friends', person1: 12, person2: 15 },
      { label: 'Transactional-only contact', person1: 9, person2: 14 },
      { label: 'Friction/disagreements', person1: 16, person2: 18 },
    ],
    psychPatterns: [
      { label: 'Emotional dumping', person1: 58, person2: 31, note: 'Priya leans on Jade during crunch periods; Jade absorbs without always reciprocating her own stress.' },
      { label: 'Slow fade', person1: 14, person2: 26, note: 'Mild recent dip in Jade\'s reply cadence since mid-2024 — not ghosting, but softer presence.' },
      { label: 'Ghosting episodes', person1: 6, person2: 9, note: 'Rare — two short silences in 6 years, both resolved.' },
      { label: 'Chosen-family closeness', person1: 93, person2: 90, note: 'Treated as family: holidays, milestones, late-night calls all present.' },
      { label: 'Reciprocity norm', person1: 82, person2: 79, note: 'Strong mutual care norm, slightly strained in the last 8 months.' },
    ],
    ratings: {
      person1: {
        overall: 8.7,
        dimensions: [
          { name: 'Emotional investment', score: 9.2, detail: 'Shows up with depth and consistency across years.' },
          { name: 'Crisis reliability', score: 9.0, detail: 'First call during Jade\'s 2022 move and 2023 breakup.' },
          { name: 'Support reciprocity', score: 8.1, detail: 'Gives generously; occasionally over-leans when overwhelmed.' },
          { name: 'Consistency', score: 8.8, detail: 'Weekly rhythm intact for 6 years.' },
          { name: 'Humor & warmth', score: 9.1, detail: 'Carries the inside-joke archive.' },
          { name: 'Life-event presence', score: 9.3, detail: 'Birthdays, promotions, funerals — present for all.' },
          { name: 'Respect for autonomy', score: 8.4, detail: 'Gives space, occasionally wants more check-ins than Jade offers.' },
          { name: 'Depth of trust', score: 9.0, detail: 'Shares unfiltered thoughts, including the messy ones.' },
        ],
      },
      person2: {
        overall: 8.4,
        dimensions: [
          { name: 'Emotional investment', score: 8.6, detail: 'Deeply invested, expresses it more through action than words.' },
          { name: 'Crisis reliability', score: 9.1, detail: 'Flew out for Priya\'s hospital stay in 2021.' },
          { name: 'Support reciprocity', score: 8.5, detail: 'Holds space well; asks for less than she gives.' },
          { name: 'Consistency', score: 8.0, detail: 'Slight cadence drop in the last 8 months.' },
          { name: 'Humor & warmth', score: 9.0, detail: 'Dry wit that perfectly complements Priya\'s energy.' },
          { name: 'Life-event presence', score: 8.7, detail: 'Present for the big things; missed two smaller ones recently.' },
          { name: 'Respect for autonomy', score: 9.0, detail: 'Never possessive, celebrates Priya\'s other circles.' },
          { name: 'Depth of trust', score: 8.8, detail: 'Opens up selectively but fully when she does.' },
        ],
      },
    },
    predictions: [
      { title: 'Bond remains lifelong', probability: 88, severity: 'positive', timeframe: '5+ years', description: 'Foundation and history strongly suggest this friendship endures through life phases.' },
      { title: 'Cadence rebalances by summer', probability: 71, severity: 'low', timeframe: '3-6 months', description: 'Jade\'s recent quieter phase likely resolves once her current work season ends.' },
      { title: 'Support flow evens out', probability: 64, severity: 'low', timeframe: '6-12 months', description: 'Priya\'s venting load drops as her transition stabilises, restoring symmetry.' },
      { title: 'Shared milestone ahead', probability: 58, severity: 'positive', timeframe: '12 months', description: 'Language suggests a trip or co-celebration is being quietly planned.' },
    ],
    earlyWarnings: [
      { level: 'low', title: 'Mild cadence drift', detail: 'Jade\'s average reply time has grown from 12 to 22 minutes since late 2024.', trend: 'slight decline' },
      { level: 'low', title: 'Venting tilt', detail: 'Priya is doing ~65% of the emotional offloading this year.', trend: 'slight increase' },
      { level: 'info', title: 'Fewer voice notes', detail: 'Voice note frequency down ~30% year-over-year — mostly schedule, not distance.', trend: 'watch' },
    ],
    topWords: {
      person1: [
        { word: 'literally', count: 412 },
        { word: 'bestie', count: 388 },
        { word: 'omg', count: 356 },
        { word: 'tired', count: 241 },
        { word: 'love', count: 220 },
      ],
      person2: [
        { word: 'lol', count: 402 },
        { word: 'same', count: 331 },
        { word: 'okay', count: 289 },
        { word: 'proud', count: 198 },
        { word: 'call', count: 175 },
      ],
    },
    healthTimeline: [
      { period: '2019 H2', messages: 3200, health: 82 },
      { period: '2020 H1', messages: 4100, health: 88 },
      { period: '2020 H2', messages: 3800, health: 90 },
      { period: '2021 H1', messages: 3600, health: 91 },
      { period: '2021 H2', messages: 3400, health: 89 },
      { period: '2022 H1', messages: 3300, health: 88 },
      { period: '2022 H2', messages: 3100, health: 87 },
      { period: '2023 H1', messages: 3000, health: 88 },
      { period: '2023 H2', messages: 2900, health: 86 },
      { period: '2024 H1', messages: 2800, health: 84 },
      { period: '2024 H2', messages: 2700, health: 80 },
      { period: '2025 H1', messages: 2600, health: 78 },
    ],
    verdict: {
      person1Summary: 'Priya is the emotional engine of this duo — expressive, loyal, and generous with her inner world. She leans harder right now, but her love language carries the archive of everything this friendship has been.',
      person2Summary: 'Jade is the steady hand — dry-witted, fiercely reliable in crisis, and quietly devoted. Her recent quieter phase reads as life-load, not retreat.',
      relationshipSummary: 'Six years in, 38,500 messages deep — this is a chosen-family bond. Mostly healthy, with a mild recent imbalance in support flow. The foundation is rare and worth protecting. Celebrate it, and let Jade know you noticed she went quiet.',
    },
  },
};

export default config;
