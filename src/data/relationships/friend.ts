import type { RelationshipConfig } from './types';

export const config: RelationshipConfig = {
  id: 'friend',
  label: 'Friend',
  emoji: '🧃',
  theme: {
    person1: '#38bdf8',
    person2: '#0ea5e9',
    accent: '#22d3ee',
    gradient: 'linear-gradient(135deg,#38bdf8 0%,#0ea5e9 50%,#06b6d4 100%)',
    glow: '#0ea5e9',
  },
  copy: {
    selectorTitle: 'Friend / School Friend',
    selectorTagline: 'Casual, school, or drifting — still in orbit?',
    uploadHeadline: 'Analyze your chat with a friend',
    uploadSubhead: 'Cadence, drift, and the shape of a casual friendship',
    sectionHeadings: {
      overview: 'Stats Overview',
      affection: 'Warmth & Banter',
      reciprocity: 'Who Reaches Out',
      conflict: 'Friction',
      patterns: 'Drift Signals',
      ratings: 'Friendship Signals',
      predictions: 'Trajectory',
      warnings: 'Drift Flags',
      timeline: 'Cadence Over Time',
      verdict: 'The Read',
    },
    verdictLead: 'Here is the honest read on this friendship.',
  },
  systemPrompt: `You are analysing a casual or school-friend chat log between two people. Your tone is casual, observational, and non-judgmental. Drift is a normal part of casual friendships — do NOT score conflict heavily or treat low cadence as a crisis. Read the conversation and emit a single JSON object matching the AnalysisData contract.

The JSON must include:
- participants { person1, person2 }, totalMessages, totalDays, dateRange { start, end }
- rawVolume per person (messages, avgReplyMin, startsDay)
- loveAffection array with EXACTLY these labels (each with person1 and person2 counts):
  ["Nostalgia callbacks","Shared-memory references","Meetup plans proposed","Banter / humor","Birthday/milestone acknowledgments","Substantive conversations"]
- reciprocity { person1SaysLovePerson2Reciprocates, person2SaysLovePerson1Reciprocates }
- conflict array with EXACTLY these labels:
  ["Cancelled plans","Ghosting episodes","Event-driven-only contact","One-sided initiation","Performative reach-outs"]
- psychPatterns array with EXACTLY these labels, each with a short observational "note":
  ["Slow fade","Event-driven contact","Nostalgia bonding","Dunbar drift","Weak-tie pattern"]
- ratings for person1 and person2, each with an overall score and dimensions array of EXACTLY these 8 names:
  ["Cadence","Initiation balance","Depth vs small-talk","Plan follow-through","Shared-past density","Reachable availability","Warmth floor","Organic vs event-driven"]
- predictions (trajectory-style, not doom), earlyWarnings (soft drift flags), topWords per person, healthTimeline (cadence over time), verdict { person1Summary, person2Summary, relationshipSummary }

Rules:
- Casual, observational, non-judgmental voice.
- Drift is normal. DO NOT score conflict heavily.
- Return ONLY the JSON object. No prose, no markdown, no code fences.`,
  demoData: {
    participants: { person1: 'Sam', person2: 'Dev' },
    totalMessages: 4200,
    totalDays: 2922,
    dateRange: { start: '2017-01-05', end: '2025-03-28' },
    rawVolume: {
      person1: { messages: 2180, avgReplyMin: 240, startsDay: 58 },
      person2: { messages: 2020, avgReplyMin: 310, startsDay: 44 },
    },
    loveAffection: [
      { label: 'Nostalgia callbacks', person1: 62, person2: 58 },
      { label: 'Shared-memory references', person1: 74, person2: 69 },
      { label: 'Meetup plans proposed', person1: 28, person2: 19 },
      { label: 'Banter / humor', person1: 140, person2: 132 },
      { label: 'Birthday/milestone acknowledgments', person1: 9, person2: 8 },
      { label: 'Substantive conversations', person1: 22, person2: 18 },
    ],
    reciprocity: {
      person1SaysLovePerson2Reciprocates: 54,
      person2SaysLovePerson1Reciprocates: 49,
    },
    conflict: [
      { label: 'Cancelled plans', person1: 11, person2: 14 },
      { label: 'Ghosting episodes', person1: 6, person2: 9 },
      { label: 'Event-driven-only contact', person1: 18, person2: 20 },
      { label: 'One-sided initiation', person1: 24, person2: 12 },
      { label: 'Performative reach-outs', person1: 5, person2: 7 },
    ],
    psychPatterns: [
      { label: 'Slow fade', person1: 62, person2: 68, note: 'Cadence has decayed steadily since 2020 — natural slow fade, not a rupture.' },
      { label: 'Event-driven contact', person1: 55, person2: 60, note: 'Most recent pings cluster around birthdays and shared-era milestones.' },
      { label: 'Nostalgia bonding', person1: 70, person2: 66, note: 'Conversations reliably reignite around school memories and old group references.' },
      { label: 'Dunbar drift', person1: 58, person2: 61, note: 'Classic outer-ring drift — both are warm but out of each other\'s daily orbit.' },
      { label: 'Weak-tie pattern', person1: 64, person2: 62, note: 'Low-frequency, low-stakes contact. Valuable socially even if thin.' },
    ],
    ratings: {
      person1: {
        overall: 6.4,
        dimensions: [
          { name: 'Cadence', score: 5.2, detail: 'Pings every few weeks, less than before.' },
          { name: 'Initiation balance', score: 7.0, detail: 'Slightly more likely to reach out first.' },
          { name: 'Depth vs small-talk', score: 5.8, detail: 'Mostly surface; occasional real talk.' },
          { name: 'Plan follow-through', score: 5.5, detail: 'Proposes plans; execution is hit or miss.' },
          { name: 'Shared-past density', score: 8.2, detail: 'Rich shared-era vocabulary.' },
          { name: 'Reachable availability', score: 6.8, detail: 'Responsive within a day or two.' },
          { name: 'Warmth floor', score: 7.4, detail: 'Consistently warm, never cold.' },
          { name: 'Organic vs event-driven', score: 5.0, detail: 'Leans event-driven now.' },
        ],
      },
      person2: {
        overall: 6.1,
        dimensions: [
          { name: 'Cadence', score: 4.9, detail: 'Quieter; replies arrive slowly.' },
          { name: 'Initiation balance', score: 5.5, detail: 'Initiates less, but does respond.' },
          { name: 'Depth vs small-talk', score: 5.5, detail: 'Keeps it light most of the time.' },
          { name: 'Plan follow-through', score: 5.2, detail: 'Agrees to plans, cancels some.' },
          { name: 'Shared-past density', score: 8.0, detail: 'Matches on nostalgia references.' },
          { name: 'Reachable availability', score: 6.2, detail: 'Slower replies since 2022.' },
          { name: 'Warmth floor', score: 7.2, detail: 'Warm tone persists despite drift.' },
          { name: 'Organic vs event-driven', score: 4.8, detail: 'Pings mostly around events.' },
        ],
      },
    },
    predictions: [
      { title: 'Continued slow fade', probability: 0.7, severity: 'low', timeframe: '12 months', description: 'Cadence likely keeps drifting unless one of you actively schedules a meetup.' },
      { title: 'Nostalgia revival spike', probability: 0.45, severity: 'low', timeframe: '6 months', description: 'A shared milestone or reunion would briefly reignite the thread.' },
      { title: 'Stable weak tie', probability: 0.6, severity: 'low', timeframe: 'long-term', description: 'Settles into a low-frequency, high-warmth weak tie — still valuable.' },
    ],
    earlyWarnings: [
      { level: 'low', title: 'Event-only contact', detail: 'Most recent messages cluster around birthdays and holidays.', trend: 'increasing' },
      { level: 'low', title: 'Initiation imbalance', detail: 'Sam has started the last several threads.', trend: 'steady' },
      { level: 'low', title: 'Plan cancellation pattern', detail: 'A few proposed meetups in 2024 didn\'t land.', trend: 'steady' },
    ],
    topWords: {
      person1: [
        { word: 'haha', count: 210 },
        { word: 'school', count: 88 },
        { word: 'remember', count: 76 },
        { word: 'soon', count: 64 },
        { word: 'meet', count: 52 },
      ],
      person2: [
        { word: 'lol', count: 198 },
        { word: 'bro', count: 120 },
        { word: 'miss', count: 58 },
        { word: 'weekend', count: 47 },
        { word: 'classic', count: 39 },
      ],
    },
    healthTimeline: [
      { period: '2017', messages: 980, health: 8.4 },
      { period: '2018', messages: 860, health: 8.1 },
      { period: '2019', messages: 640, health: 7.6 },
      { period: '2020', messages: 520, health: 7.2 },
      { period: '2021', messages: 410, health: 6.8 },
      { period: '2022', messages: 330, health: 6.4 },
      { period: '2023', messages: 250, health: 6.1 },
      { period: '2024', messages: 170, health: 5.9 },
      { period: '2025', messages: 40, health: 5.8 },
    ],
    verdict: {
      person1Summary: 'Sam holds the thread — initiates more, keeps warmth high, but is drifting into event-driven pings.',
      person2Summary: 'Dev is warm when reached but rarely initiates anymore; classic outer-orbit friend behaviour.',
      relationshipSummary: 'A genuine school friendship in a slow, natural fade. Nothing broken — just Dunbar doing its thing. If either of you books something concrete, it flares right back up.',
    },
  },
};

export default config;
