import type { RelationshipConfig } from './types';

export const config: RelationshipConfig = {
  id: 'father',
  label: 'Father',
  emoji: '🧭',
  theme: {
    person1: '#7dd3fc',
    person2: '#475569',
    accent: '#0284c7',
    gradient: 'linear-gradient(135deg,#475569 0%,#334155 50%,#0284c7 100%)',
    glow: '#0284c7',
  },
  copy: {
    selectorTitle: 'Father',
    selectorTagline: 'Dad (bio, step, adoptive, chosen) — the signals of care',
    uploadHeadline: 'Analyze your chat with your father',
    uploadSubhead: 'Brevity, task-talk, and the quiet signals of care',
    sectionHeadings: {
      overview: 'Overview',
      affection: 'Small Signals of Care',
      reciprocity: 'Task & Advice Flow',
      conflict: 'Tension Moments',
      patterns: 'Paternal Dynamics',
      ratings: 'Bond Signals',
      predictions: 'Trajectory',
      warnings: 'Distance Flags',
      timeline: 'Warmth Over Years',
      verdict: 'The Read',
    },
    verdictLead: 'Here is the read on the father-child bond in this chat.',
  },
  systemPrompt: `You are analysing an adult-child <-> father WhatsApp chat.

Emit an AnalysisData JSON object with father-specific labels adapted as follows:

loveAffection items (label strings, scored for each person):
- "Indirect pride signals"
- "Practical-task exchanges"
- "Crisis presence"
- "Advice on career/finance"
- "Humor/banter signature"
- "Ritual check-ins (safety/weather)"

conflict items:
- "Emotion-deflection episodes"
- "Criticism of choices"
- "Silence after conflict"
- "Stoicism over repair"
- "Advice overrule"

psychPatterns items (each with a note):
- "Stoic/instrumental care"
- "Emotional reticence"
- "Pride-through-deeds"
- "Intergenerational silence"
- "Task-as-love dialect"

ratings: 8 dimensions per person:
"Crisis presence", "Consistency", "Pride/praise signal", "Humor warmth", "Practical support", "Emotional availability", "Repair capacity", "Steadiness".

Be generationally literate and non-pathologising. Brevity and task-focus are dialects of care, not deficits. Celebrate small signals (a forwarded article, "reached safely?", a practical fix). DO NOT score this relationship against romantic "I love you" reciprocity — that is the wrong yardstick for many father-child bonds. A low affection baseline can still be a healthy paternal bond.

Return ONLY the JSON object matching the AnalysisData shape. No prose, no markdown fences.`,
  demoData: {
    participants: { person1: 'Kabir', person2: 'Rajesh' },
    totalMessages: 4850,
    totalDays: 1826,
    dateRange: { start: '2020-01-05', end: '2025-01-04' },
    rawVolume: {
      person1: { messages: 2680, avgReplyMin: 95, startsDay: 58 },
      person2: { messages: 2170, avgReplyMin: 180, startsDay: 42 },
    },
    loveAffection: [
      { label: 'Indirect pride signals', person1: 28, person2: 34 },
      { label: 'Practical-task exchanges', person1: 142, person2: 168 },
      { label: 'Crisis presence', person1: 18, person2: 26 },
      { label: 'Advice on career/finance', person1: 12, person2: 88 },
      { label: 'Humor/banter signature', person1: 46, person2: 38 },
      { label: 'Ritual check-ins (safety/weather)', person1: 22, person2: 74 },
    ],
    reciprocity: {
      person1SaysLovePerson2Reciprocates: 18,
      person2SaysLovePerson1Reciprocates: 22,
    },
    conflict: [
      { label: 'Emotion-deflection episodes', person1: 9, person2: 16 },
      { label: 'Criticism of choices', person1: 4, person2: 14 },
      { label: 'Silence after conflict', person1: 7, person2: 11 },
      { label: 'Stoicism over repair', person1: 6, person2: 13 },
      { label: 'Advice overrule', person1: 3, person2: 9 },
    ],
    psychPatterns: [
      {
        label: 'Stoic/instrumental care',
        person1: 48,
        person2: 82,
        note: 'Rajesh shows up through fixes, forwards, and logistics — care delivered as utility.',
      },
      {
        label: 'Emotional reticence',
        person1: 54,
        person2: 78,
        note: 'Feelings are acknowledged briefly, then redirected to action or silence.',
      },
      {
        label: 'Pride-through-deeds',
        person1: 36,
        person2: 72,
        note: 'Praise arrives as forwarded LinkedIn posts and quiet "good" — rarely as direct celebration.',
      },
      {
        label: 'Intergenerational silence',
        person1: 40,
        person2: 68,
        note: 'Topics like grief, money stress, and health get light touches rather than deep dives.',
      },
      {
        label: 'Task-as-love dialect',
        person1: 52,
        person2: 84,
        note: '"Reached safely?", tyre pressure reminders, tax deadlines — the vocabulary of paternal love here.',
      },
    ],
    ratings: {
      person1: {
        overall: 7.6,
        dimensions: [
          { name: 'Crisis presence', score: 8.2, detail: 'Shows up when Rajesh had the hospital scare in 2023.' },
          { name: 'Consistency', score: 7.4, detail: 'Replies within a day, rarely ghosts.' },
          { name: 'Pride/praise signal', score: 7.0, detail: 'Shares wins, sometimes muted.' },
          { name: 'Humor warmth', score: 8.0, detail: 'Sends memes and old Hindi film jokes dad enjoys.' },
          { name: 'Practical support', score: 7.2, detail: 'Helps with tech, OTP, bookings.' },
          { name: 'Emotional availability', score: 6.8, detail: 'Opens up more than dad, but still measured.' },
          { name: 'Repair capacity', score: 7.0, detail: 'Usually the one to break post-argument silence.' },
          { name: 'Steadiness', score: 7.8, detail: 'Reliable rhythm across 5 years.' },
        ],
      },
      person2: {
        overall: 7.8,
        dimensions: [
          { name: 'Crisis presence', score: 9.0, detail: 'First call during the 2021 COVID scare; drove across state for Kabir.' },
          { name: 'Consistency', score: 8.6, detail: 'Daily "good morning" forward, weather check, news clip.' },
          { name: 'Pride/praise signal', score: 6.8, detail: 'Pride is real but indirect — shares Kabir\'s news with relatives, rarely to Kabir directly.' },
          { name: 'Humor warmth', score: 7.4, detail: 'Dry one-liners, occasional Sardar jokes.' },
          { name: 'Practical support', score: 9.2, detail: 'Tax help, insurance nudges, car maintenance reminders — his love language.' },
          { name: 'Emotional availability', score: 5.8, detail: 'Deflects to "everything fine na?" when feelings surface.' },
          { name: 'Repair capacity', score: 6.4, detail: 'Moves on through logistics rather than explicit repair.' },
          { name: 'Steadiness', score: 9.0, detail: 'Rock-steady baseline across 1,826 days.' },
        ],
      },
    },
    predictions: [
      {
        title: 'Deeper check-ins post-retirement',
        probability: 64,
        severity: 'positive',
        timeframe: '12-24 months',
        description: 'As Rajesh settles into retirement, forwarded-article ritual likely expands into longer voice notes.',
      },
      {
        title: 'Health-topic avoidance',
        probability: 58,
        severity: 'medium',
        timeframe: '6-12 months',
        description: 'Pattern suggests Rajesh will downplay medical issues; Kabir may learn of them via mother.',
      },
      {
        title: 'Crisis bond spike',
        probability: 72,
        severity: 'positive',
        timeframe: 'on-event',
        description: 'Any family emergency collapses the distance instantly — both show up fully.',
      },
    ],
    earlyWarnings: [
      {
        level: 'low',
        title: 'Low baseline is not a red flag',
        detail: '4,850 messages over 5 years is modest but steady — normal for a stoic paternal register.',
        trend: 'stable',
      },
      {
        level: 'medium',
        title: 'Feelings-topic deflection',
        detail: 'When Kabir raises stress or grief, Rajesh redirects to "eat well, sleep well" within 2 turns.',
        trend: 'stable',
      },
      {
        level: 'low',
        title: 'One-way advice pressure',
        detail: 'Career/finance advice flows father-to-son; light friction when Kabir diverges from it.',
        trend: 'improving',
      },
    ],
    topWords: {
      person1: [
        { word: 'reached', count: 142 },
        { word: 'papa', count: 118 },
        { word: 'ok', count: 96 },
        { word: 'flight', count: 74 },
        { word: 'call', count: 68 },
        { word: 'thanks', count: 62 },
      ],
      person2: [
        { word: 'safely', count: 186 },
        { word: 'reached', count: 174 },
        { word: 'beta', count: 152 },
        { word: 'weather', count: 88 },
        { word: 'fwd', count: 146 },
        { word: 'tax', count: 54 },
      ],
    },
    healthTimeline: [
      { period: '2020 H1', messages: 380, health: 7.0 },
      { period: '2020 H2', messages: 420, health: 7.2 },
      { period: '2021 H1', messages: 560, health: 8.1 },
      { period: '2021 H2', messages: 510, health: 7.8 },
      { period: '2022 H1', messages: 470, health: 7.4 },
      { period: '2022 H2', messages: 450, health: 7.3 },
      { period: '2023 H1', messages: 540, health: 8.0 },
      { period: '2023 H2', messages: 490, health: 7.6 },
      { period: '2024 H1', messages: 520, health: 7.8 },
      { period: '2024 H2', messages: 510, health: 7.9 },
    ],
    verdict: {
      person1Summary:
        'Kabir carries the emotional vocabulary for both of them — he translates feeling into the dialect Rajesh can meet: logistics, jokes, shared news.',
      person2Summary:
        'Rajesh loves through forwards, "reached safely?", and showing up when it counts. Praise is indirect, presence is unwavering.',
      relationshipSummary:
        'A classically stoic father-son bond rendered in low-volume, high-reliability messages. Not romantic, not effusive — and not meant to be. The care is real; it just speaks a different language.',
    },
  },
};

export default config;
