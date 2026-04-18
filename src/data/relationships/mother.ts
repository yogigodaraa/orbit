import type { RelationshipConfig } from './types';

export const config: RelationshipConfig = {
  id: 'mother',
  label: 'Mother',
  emoji: '🌼',
  theme: {
    person1: '#fda4af',
    person2: '#f472b6',
    accent: '#fb7185',
    gradient: 'linear-gradient(135deg,#fda4af 0%,#fb7185 50%,#f59e0b 100%)',
    glow: '#fb7185',
  },
  copy: {
    selectorTitle: 'Mother',
    selectorTagline: 'Mom (bio, step, adoptive, chosen) — how does your bond read?',
    uploadHeadline: 'Analyze your chat with your mother',
    uploadSubhead: 'Warmth, worry, autonomy — the real stuff',
    sectionHeadings: {
      overview: 'Stats Overview',
      affection: 'Maternal Warmth',
      reciprocity: 'Worry & Care Exchange',
      conflict: 'Tension Moments',
      patterns: 'Mother-Child Dynamics',
      ratings: 'Bond Signals',
      predictions: 'Where This Is Heading',
      warnings: 'Pattern Flags',
      timeline: 'Connection Over Time',
      verdict: 'The Read',
    },
    verdictLead: 'Here is how this mother-child bond reads.',
  },
  systemPrompt: `You are analysing a chat between an adult child and their mother. Unless the context makes it obvious otherwise, treat the perspective as the child's (person1 = child / "me", person2 = mother).

Emit ONLY valid JSON matching the AnalysisData shape. Use these adapted labels:

loveAffection items (in this order):
  - "Blessings / pet names"
  - "Mundane-care ('did you eat')"
  - "Religious/cultural references"
  - "Photos/media shared"
  - "Check-ins on safety"
  - "Unconditional affirmations"

conflict items:
  - "Guilt-tripping episodes"
  - "Unsolicited advice clashes"
  - "Autonomy-assertion tension"
  - "Criticism of life choices"
  - "Enmeshment friction"

psychPatterns items (each with a "note"):
  - "Enmeshment"
  - "Individuation struggle"
  - "Reverse-parentification"
  - "Collectivist guilt"
  - "Secure-base return"

ratings: 8 dimensions per person, in this order:
  1. "Warmth floor"
  2. "Autonomy respect"
  3. "Worry responsiveness"
  4. "Criticism-to-praise ratio"
  5. "Cultural/religious care"
  6. "Boundary respect"
  7. "Differentiation"
  8. "Unconditional love"

Tone instructions:
- Be warm and culturally humble.
- South Asian, Mediterranean, Latin, and East Asian mothers often score "enmeshed" on Western clinical scales but are perfectly healthy in cultural context — DO NOT pathologise.
- Frame guilt-tripping and worry as love-dialects, not defects, while still naming real harm when it exists.
- Respect that "did you eat", blessings, and daily check-ins are affection.

Return ONLY the JSON object. No prose, no markdown fences.`,
  demoData: {
    participants: { person1: 'Zayn', person2: 'Ayesha' },
    totalMessages: 15800,
    totalDays: 1461,
    dateRange: { start: '2021-04-01', end: '2025-03-31' },
    rawVolume: {
      person1: { messages: 5900, avgReplyMin: 92, startsDay: 28 },
      person2: { messages: 9900, avgReplyMin: 14, startsDay: 72 },
    },
    loveAffection: [
      { label: 'Blessings / pet names', person1: 38, person2: 612 },
      { label: "Mundane-care ('did you eat')", person1: 44, person2: 1180 },
      { label: 'Religious/cultural references', person1: 22, person2: 340 },
      { label: 'Photos/media shared', person1: 210, person2: 420 },
      { label: 'Check-ins on safety', person1: 56, person2: 890 },
      { label: 'Unconditional affirmations', person1: 74, person2: 520 },
    ],
    reciprocity: {
      person1SaysLovePerson2Reciprocates: 96,
      person2SaysLovePerson1Reciprocates: 61,
    },
    conflict: [
      { label: 'Guilt-tripping episodes', person1: 12, person2: 78 },
      { label: 'Unsolicited advice clashes', person1: 34, person2: 142 },
      { label: 'Autonomy-assertion tension', person1: 98, person2: 40 },
      { label: 'Criticism of life choices', person1: 9, person2: 66 },
      { label: 'Enmeshment friction', person1: 52, person2: 88 },
    ],
    psychPatterns: [
      {
        label: 'Enmeshment',
        person1: 48,
        person2: 74,
        note: 'High daily contact and emotional overlap — culturally normal in South Asian families, not a red flag on its own.',
      },
      {
        label: 'Individuation struggle',
        person1: 66,
        person2: 32,
        note: 'Zayn is actively negotiating adult autonomy (career, marriage timing) against Ayesha\'s protective pull.',
      },
      {
        label: 'Reverse-parentification',
        person1: 28,
        person2: 18,
        note: 'Occasional flips where Zayn emotionally reassures Ayesha about her health and loneliness.',
      },
      {
        label: 'Collectivist guilt',
        person1: 40,
        person2: 58,
        note: 'Guilt is used as connective tissue ("you never call") — read as longing, not manipulation.',
      },
      {
        label: 'Secure-base return',
        person1: 72,
        person2: 80,
        note: 'Zayn reliably returns to Ma after hard days; she stays a dependable emotional home.',
      },
    ],
    ratings: {
      person1: {
        overall: 7.8,
        dimensions: [
          { name: 'Warmth floor', score: 7.4, detail: 'Affection is present but often delivered in fewer words.' },
          { name: 'Autonomy respect', score: 8.2, detail: 'Holds his own on big choices without weaponising distance.' },
          { name: 'Worry responsiveness', score: 6.9, detail: 'Sometimes leaves "khana khaya?" on read for hours.' },
          { name: 'Criticism-to-praise ratio', score: 8.0, detail: 'Rarely critical of Ma; frustration shows up as silence instead.' },
          { name: 'Cultural/religious care', score: 7.1, detail: 'Honours Eid, birthdays, and milestones consistently.' },
          { name: 'Boundary respect', score: 7.6, detail: 'Names limits kindly, usually without blowing up.' },
          { name: 'Differentiation', score: 8.3, detail: 'Clear sense of self while staying connected.' },
          { name: 'Unconditional love', score: 8.8, detail: 'The love underneath the friction is never in question.' },
        ],
      },
      person2: {
        overall: 8.4,
        dimensions: [
          { name: 'Warmth floor', score: 9.4, detail: 'Blessings, duas, and pet names are near-daily.' },
          { name: 'Autonomy respect', score: 6.2, detail: 'Struggles when Zayn\'s decisions diverge from her hopes.' },
          { name: 'Worry responsiveness', score: 9.6, detail: 'Checks weather, food, sleep — every day, without fail.' },
          { name: 'Criticism-to-praise ratio', score: 7.0, detail: 'Praise is abundant; critique lands around marriage/career.' },
          { name: 'Cultural/religious care', score: 9.2, detail: 'Anchors family rituals, prayers, and festivals.' },
          { name: 'Boundary respect', score: 6.4, detail: 'Reads silence as illness; can over-call when anxious.' },
          { name: 'Differentiation', score: 6.0, detail: 'Her mood tracks his mood closely.' },
          { name: 'Unconditional love', score: 9.7, detail: 'Ride-or-die. Full stop.' },
        ],
      },
    },
    predictions: [
      {
        title: 'Marriage-timing pressure intensifies',
        probability: 78,
        severity: 'medium',
        timeframe: 'next 6–12 months',
        description: 'Expect more rishta conversations; Ayesha will lean in as Zayn turns 29.',
      },
      {
        title: 'Health-worry role reversal grows',
        probability: 64,
        severity: 'low',
        timeframe: '1–2 years',
        description: 'Zayn will increasingly check on Ayesha\'s BP and knees — a healthy, gentle flip.',
      },
      {
        title: 'Autonomy truce on career',
        probability: 71,
        severity: 'low',
        timeframe: '3–6 months',
        description: 'Ayesha is softening on his job move; the tone is already warming.',
      },
    ],
    earlyWarnings: [
      {
        level: 'info',
        title: 'Guilt-as-love dialect',
        detail: '"Tum bhool gaye humein" reads as longing, not manipulation — but worth naming out loud.',
        trend: 'steady',
      },
      {
        level: 'watch',
        title: 'Read-receipt gaps',
        detail: 'Zayn\'s 6–10 hour silences spike Ayesha\'s anxiety; a 1-line "busy, love you" closes the loop.',
        trend: 'rising',
      },
      {
        level: 'info',
        title: 'Marriage-topic friction',
        detail: 'Recurring flashpoint; both back off within a day, which is a good sign.',
        trend: 'cyclical',
      },
    ],
    topWords: {
      person1: [
        { word: 'ma', count: 812 },
        { word: 'busy', count: 268 },
        { word: 'later', count: 204 },
        { word: 'khana', count: 188 },
        { word: 'call', count: 176 },
        { word: 'sorry', count: 142 },
        { word: 'work', count: 138 },
        { word: 'love', count: 124 },
      ],
      person2: [
        { word: 'beta', count: 1620 },
        { word: 'khana', count: 980 },
        { word: 'khaya', count: 940 },
        { word: 'dua', count: 612 },
        { word: 'allah', count: 544 },
        { word: 'rest', count: 388 },
        { word: 'shaadi', count: 214 },
        { word: 'jaan', count: 508 },
      ],
    },
    healthTimeline: [
      { period: '2021 Q2', messages: 720, health: 7.2 },
      { period: '2021 Q4', messages: 880, health: 7.4 },
      { period: '2022 Q2', messages: 940, health: 7.1 },
      { period: '2022 Q4', messages: 1020, health: 6.8 },
      { period: '2023 Q2', messages: 1080, health: 7.0 },
      { period: '2023 Q4', messages: 1140, health: 7.6 },
      { period: '2024 Q2', messages: 1240, health: 7.9 },
      { period: '2024 Q4', messages: 1320, health: 8.1 },
      { period: '2025 Q1', messages: 1060, health: 8.3 },
    ],
    verdict: {
      person1Summary:
        'Zayn is a thoughtful 28-year-old son negotiating individuation without breaking the tether. He replies slow but shows up for the big stuff.',
      person2Summary:
        'Ayesha loves in the daily dialect of khana, duas, and weather checks. Her worry is her love language — not a flaw to fix.',
      relationshipSummary:
        'A warm, culturally rooted mother-son bond in a healthy individuation phase. Friction clusters around marriage and autonomy, but the secure base underneath is rock solid.',
    },
  },
};

export default config;
