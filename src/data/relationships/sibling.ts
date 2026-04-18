import type { RelationshipConfig } from './types';

export const config: RelationshipConfig = {
  id: 'sibling',
  label: 'Sibling',
  emoji: '🪢',
  theme: {
    person1: '#fb923c',
    person2: '#f97316',
    accent: '#f59e0b',
    gradient: 'linear-gradient(135deg,#fb923c 0%,#f97316 50%,#c2410c 100%)',
    glow: '#f97316',
  },
  copy: {
    selectorTitle: 'Sibling',
    selectorTagline: 'Brother or sister — the lifelong bond',
    uploadHeadline: 'Analyze your chat with your sibling',
    uploadSubhead: 'Warmth, roasts, caregiving load — the real family stuff',
    sectionHeadings: {
      overview: 'Stats Overview',
      affection: 'Warmth & Inside Lore',
      reciprocity: 'Family Logistics Load',
      conflict: 'Sibling Friction',
      patterns: 'Family Dynamics',
      ratings: 'Sibling Bond Health',
      predictions: 'Where This Is Going',
      warnings: 'Family-System Flags',
      timeline: 'Bond Over Time',
      verdict: 'The Read',
    },
    verdictLead: 'Here is the read on your sibling bond.',
  },
  systemPrompt: `You are analysing a sibling chat (brother/sister, adult siblings).

Emit AnalysisData JSON EXACTLY in this shape — no prose, no markdown, ONLY JSON.

Adapted labels for this relationship type:

loveAffection array MUST use these labels (in this order):
  - "Roasts/teases (affectionate)"
  - "Inside-family references"
  - "Crisis check-ins"
  - "Practical help exchanges"
  - "Childhood callbacks"
  - "Unprompted life updates"

conflict array MUST use these labels:
  - "Rivalry/comparison jabs"
  - "Parent-triangulation"
  - "Caregiving imbalance friction"
  - "Unresolved-childhood flashes"
  - "Boundary disputes"

psychPatterns array MUST use these labels, each with a short "note" explaining what you see in THIS chat:
  - "Parentification"
  - "Triangulation via parents"
  - "Differentiation-of-self"
  - "Scapegoat/golden-child pattern"
  - "Caregiving asymmetry"

ratings: 8 dimensions per person, in this order:
  1. "Crisis reliability"
  2. "Family-logistics share"
  3. "Boundary health"
  4. "Autonomy/differentiation"
  5. "Warmth floor"
  6. "Roast-to-support ratio"
  7. "Direct-communication (not via parents)"
  8. "Practical support"

CRITICAL GUIDANCE:
- Be culturally calibrated. In South Asian, Latin, and East/Southeast Asian family systems, siblings carry explicit, lifelong caregiving obligations (aging parents, financial pooling, shared decisions). DO NOT pathologise duty, deference, or coordinated caregiving as "enmeshment" or "poor boundaries". Read those patterns through the family's own norms.
- Tone: warm, non-judgmental, observational. This is a sibling — not a romantic partner. Avoid therapy-speak that assumes Western individuation is the only healthy endpoint.
- DO NOT score love reciprocity the way you would for a romantic chat. For the reciprocity object, use it to represent family-logistics load share (who initiates caregiving/coordination and whether the other picks it up) rather than "I love you" reciprocation.
- Roasts and teasing between siblings are typically affection, not conflict. Only count them as conflict when clearly cutting.
- Highlight strengths before friction.

Return ONLY the JSON object matching the AnalysisData interface. No preamble, no closing remarks, no code fences.`,
  demoData: {
    participants: { person1: 'Arjun', person2: 'Meera' },
    totalMessages: 28700,
    totalDays: 2557,
    dateRange: { start: '2018-03-04', end: '2025-03-02' },
    rawVolume: {
      person1: { messages: 13340, avgReplyMin: 74, startsDay: 41 },
      person2: { messages: 15360, avgReplyMin: 38, startsDay: 59 },
    },
    loveAffection: [
      { label: 'Roasts/teases (affectionate)', person1: 412, person2: 498 },
      { label: 'Inside-family references', person1: 287, person2: 331 },
      { label: 'Crisis check-ins', person1: 96, person2: 148 },
      { label: 'Practical help exchanges', person1: 213, person2: 276 },
      { label: 'Childhood callbacks', person1: 164, person2: 182 },
      { label: 'Unprompted life updates', person1: 121, person2: 209 },
    ],
    reciprocity: {
      person1SaysLovePerson2Reciprocates: 62,
      person2SaysLovePerson1Reciprocates: 81,
    },
    conflict: [
      { label: 'Rivalry/comparison jabs', person1: 28, person2: 22 },
      { label: 'Parent-triangulation', person1: 41, person2: 37 },
      { label: 'Caregiving imbalance friction', person1: 19, person2: 54 },
      { label: 'Unresolved-childhood flashes', person1: 14, person2: 11 },
      { label: 'Boundary disputes', person1: 17, person2: 23 },
    ],
    psychPatterns: [
      {
        label: 'Parentification',
        person1: 28,
        person2: 67,
        note: 'Meera consistently carries the emotional-manager role for Mum and Dad — from 2022 onward she is often the first responder to health updates.',
      },
      {
        label: 'Triangulation via parents',
        person1: 44,
        person2: 39,
        note: 'Some coordination still flows via "Mummy said…" rather than direct sibling-to-sibling. Declines noticeably after 2023.',
      },
      {
        label: 'Differentiation-of-self',
        person1: 71,
        person2: 58,
        note: 'Arjun holds his own views on career and marriage without collapsing into family opinion. Meera is catching up post-2024.',
      },
      {
        label: 'Scapegoat/golden-child pattern',
        person1: 18,
        person2: 22,
        note: 'Mild echoes of an older "responsible Meera / free-spirit Arjun" script, mostly joked about now rather than lived out.',
      },
      {
        label: 'Caregiving asymmetry',
        person1: 31,
        person2: 69,
        note: 'Meera, based in Pune near the parents, handles day-to-day caregiving; Arjun (Bangalore) contributes financially and on big decisions. Classic proximity-based split — not dysfunction, but worth rebalancing.',
      },
    ],
    ratings: {
      person1: {
        overall: 8.1,
        dimensions: [
          { name: 'Crisis reliability', score: 8.6, detail: 'Drops everything when it actually matters — Dad\'s hospitalisation in 2023, flew in same day.' },
          { name: 'Family-logistics share', score: 6.2, detail: 'Contributes money and big-picture decisions; less involved in daily coordination.' },
          { name: 'Boundary health', score: 8.4, detail: 'Says no to guilt-trips without drama.' },
          { name: 'Autonomy/differentiation', score: 8.8, detail: 'Has a settled sense of self separate from family expectations.' },
          { name: 'Warmth floor', score: 8.9, detail: 'Even in silence-streaks, re-enters warmly.' },
          { name: 'Roast-to-support ratio', score: 7.9, detail: 'Roasts generously, lands supportively.' },
          { name: 'Direct-communication (not via parents)', score: 7.6, detail: 'Mostly direct; occasional via-Mum routing on awkward topics.' },
          { name: 'Practical support', score: 8.3, detail: 'Reliable on finances, travel, big decisions.' },
        ],
      },
      person2: {
        overall: 8.4,
        dimensions: [
          { name: 'Crisis reliability', score: 9.2, detail: 'First responder for every parent-related scare since 2021.' },
          { name: 'Family-logistics share', score: 9.1, detail: 'Carries the weekly load — doctors, medicines, house repairs.' },
          { name: 'Boundary health', score: 6.8, detail: 'Sometimes over-functions; rarely asks Arjun to do more.' },
          { name: 'Autonomy/differentiation', score: 7.4, detail: 'Own life in Pune, though family needs occasionally crowd it out.' },
          { name: 'Warmth floor', score: 9.0, detail: 'Very consistent — the emotional baseline of the sibling thread.' },
          { name: 'Roast-to-support ratio', score: 8.2, detail: 'Sharper roaster, equally quick to comfort.' },
          { name: 'Direct-communication (not via parents)', score: 8.1, detail: 'Usually direct; vents sideways when tired.' },
          { name: 'Practical support', score: 9.0, detail: 'Operational backbone of the family.' },
        ],
      },
    },
    predictions: [
      { title: 'Caregiving load will keep rising', probability: 0.88, severity: 'medium', timeframe: '12–24 months', description: 'Parents are 68 and 71. Expect more coordination, hospital visits, and financial decisions. Meera will continue to carry more unless you rebalance explicitly.' },
      { title: 'Meera burnout risk', probability: 0.61, severity: 'medium', timeframe: '6–12 months', description: 'Over-functioning pattern is visible. Without a structured split (e.g. Arjun owns finances + quarterly travel, Meera owns local), resentment is likely by late 2026.' },
      { title: 'Bond deepens after a shared hard season', probability: 0.74, severity: 'positive', timeframe: '24 months', description: 'Sibling bonds of this shape typically strengthen markedly once they co-navigate a parent health event together as equal adults.' },
    ],
    earlyWarnings: [
      { level: 'yellow', title: 'Caregiving asymmetry', detail: 'Meera handles ~70% of day-to-day parent logistics. Arjun compensates with money and crisis presence, but the weekly load is uneven.', trend: 'rising' },
      { level: 'yellow', title: 'Occasional parent-triangulation', detail: 'A handful of conversations still route through Mum rather than direct. Declining, but present.', trend: 'declining' },
      { level: 'green', title: 'Strong warmth floor', detail: 'Even in three-week silences, re-entry is warm and teasing. Baseline is healthy.', trend: 'stable' },
    ],
    topWords: {
      person1: [
        { word: 'didi', count: 412 },
        { word: 'papa', count: 298 },
        { word: 'mummy', count: 276 },
        { word: 'haan', count: 241 },
        { word: 'bhej', count: 187 },
        { word: 'hospital', count: 142 },
        { word: 'flight', count: 118 },
        { word: 'money', count: 97 },
      ],
      person2: [
        { word: 'arjun', count: 388 },
        { word: 'mummy', count: 341 },
        { word: 'papa', count: 312 },
        { word: 'doctor', count: 224 },
        { word: 'medicine', count: 198 },
        { word: 'idiot', count: 164 },
        { word: 'call', count: 152 },
        { word: 'hospital', count: 131 },
      ],
    },
    healthTimeline: [
      { period: '2018 H1', messages: 1420, health: 7.2 },
      { period: '2018 H2', messages: 1680, health: 7.4 },
      { period: '2019 H1', messages: 1810, health: 7.6 },
      { period: '2019 H2', messages: 1940, health: 7.8 },
      { period: '2020 H1', messages: 2480, health: 8.1 },
      { period: '2020 H2', messages: 2310, health: 8.3 },
      { period: '2021 H1', messages: 2120, health: 8.0 },
      { period: '2021 H2', messages: 2240, health: 8.1 },
      { period: '2022 H1', messages: 2050, health: 7.9 },
      { period: '2022 H2', messages: 2180, health: 7.8 },
      { period: '2023 H1', messages: 2340, health: 8.0 },
      { period: '2023 H2', messages: 2110, health: 8.2 },
      { period: '2024 H1', messages: 2020, health: 8.3 },
      { period: '2024 H2', messages: 1900, health: 8.4 },
    ],
    verdict: {
      person1Summary: 'Arjun is a solid younger brother — autonomous, warm, reliably present in crisis, and generous with money and big-decision bandwidth. His growth edge is showing up for the ordinary weeks, not just the emergencies.',
      person2Summary: 'Meera is the operational heart of this family — deeply loving, sharply funny, and doing more than her share of the caregiving. Her growth edge is asking for help explicitly instead of absorbing.',
      relationshipSummary: 'This is a healthy, warm, culturally-grounded Indian sibling bond entering the caregiving chapter of adult life. The roasts are affection, the warmth floor is high, and direct communication is mostly working. The one thing to rebalance is the weekly caregiving load — not because Meera is being harmed, but because an explicit, equitable split now will protect the bond through the next decade.',
    },
  },
};

export default config;
