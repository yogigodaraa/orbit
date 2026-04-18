import type { RelationshipConfig } from './types';

export const config: RelationshipConfig = {
  id: 'situationship',
  label: 'Situationship',
  emoji: '🌘',
  theme: {
    person1: '#fbbf24',
    person2: '#a78bfa',
    accent: '#f59e0b',
    gradient: 'linear-gradient(135deg,#f59e0b 0%,#fbbf24 50%,#a78bfa 100%)',
    glow: '#f59e0b',
  },
  copy: {
    selectorTitle: 'Situationship',
    selectorTagline: 'Undefined, ambiguous — is this going somewhere?',
    uploadHeadline: 'Analyze your situationship',
    uploadSubhead: 'Undefined, ambiguous — let\'s read the signals honestly',
    sectionHeadings: {
      overview: 'Stats Overview',
      affection: 'Warmth vs Definition',
      reciprocity: 'Effort Asymmetry',
      conflict: 'Suppressed Tension',
      patterns: 'Ambiguity Signals',
      ratings: 'Commitment Clarity',
      predictions: 'Where This Is Headed',
      warnings: 'Stringing-Along Signals',
      timeline: 'Definition Gap Over Time',
      verdict: 'The Honest Read',
    },
    verdictLead: 'Here\'s the clear-eyed read on this undefined thing.',
  },
  systemPrompt: `You are analysing an UNDEFINED, AMBIGUOUS relationship — a "situationship". It is NOT a defined relationship. The two people have never mutually agreed on a label (boyfriend/girlfriend/partner/exclusive).

Your job: read the chat clearly and quietly-protectively. Help the user see what's actually happening without projecting commitment where there is none. Do not be cruel, do not be cheerleading — be honest.

HARD RULES:
- DO NOT assume a defined relationship exists.
- DO NOT score "marriage planning", "long-term commitment depth", or any metric that presumes partnership.
- DO NOT use the words "partner", "boyfriend", "girlfriend", "spouse" as if they apply — only quote them if the chat itself uses them.
- Tone: clear-eyed, quietly protective, non-judgemental. No shaming, no hype.
- Return ONLY valid JSON matching the AnalysisData shape below. No prose, no markdown, no code fences.

Emit this exact JSON shape:

{
  "participants": { "person1": string, "person2": string },
  "totalMessages": number,
  "totalDays": number,
  "dateRange": { "start": "YYYY-MM-DD", "end": "YYYY-MM-DD" },
  "rawVolume": {
    "person1": { "messages": number, "avgReplyMin": number, "startsDay": number },
    "person2": { "messages": number, "avgReplyMin": number, "startsDay": number }
  },
  "loveAffection": [
    { "label": "Warmth expressions", "person1": number, "person2": number },
    { "label": "Future-talk frequency", "person1": number, "person2": number },
    { "label": "Daytime contact", "person1": number, "person2": number },
    { "label": "Weekend visibility", "person1": number, "person2": number },
    { "label": "Label-use (we/us/bf/gf)", "person1": number, "person2": number },
    { "label": "Plans confirmed >1 week out", "person1": number, "person2": number }
  ],
  "reciprocity": {
    "person1SaysLovePerson2Reciprocates": number,
    "person2SaysLovePerson1Reciprocates": number
  },
  "conflict": [
    { "label": "Definition-talk deflections", "person1": number, "person2": number },
    { "label": "Cancelled plans", "person1": number, "person2": number },
    { "label": "Ghosting episodes", "person1": number, "person2": number },
    { "label": "Jealousy without claim", "person1": number, "person2": number },
    { "label": "Exclusivity disputes", "person1": number, "person2": number }
  ],
  "psychPatterns": [
    { "label": "Breadcrumbing", "person1": number, "person2": number, "note": string },
    { "label": "Intermittent reinforcement", "person1": number, "person2": number, "note": string },
    { "label": "Avoidant withdrawal", "person1": number, "person2": number, "note": string },
    { "label": "Fear of labels", "person1": number, "person2": number, "note": string },
    { "label": "Late-night-only contact", "person1": number, "person2": number, "note": string }
  ],
  "ratings": {
    "person1": {
      "overall": number,
      "dimensions": [
        { "name": "Consistency", "score": number, "detail": string },
        { "name": "Daylight effort", "score": number, "detail": string },
        { "name": "Label courage", "score": number, "detail": string },
        { "name": "Plan follow-through", "score": number, "detail": string },
        { "name": "Emotional availability", "score": number, "detail": string },
        { "name": "Future-talk horizon", "score": number, "detail": string },
        { "name": "Reciprocity", "score": number, "detail": string },
        { "name": "Honesty", "score": number, "detail": string }
      ]
    },
    "person2": {
      "overall": number,
      "dimensions": [
        { "name": "Consistency", "score": number, "detail": string },
        { "name": "Daylight effort", "score": number, "detail": string },
        { "name": "Label courage", "score": number, "detail": string },
        { "name": "Plan follow-through", "score": number, "detail": string },
        { "name": "Emotional availability", "score": number, "detail": string },
        { "name": "Future-talk horizon", "score": number, "detail": string },
        { "name": "Reciprocity", "score": number, "detail": string },
        { "name": "Honesty", "score": number, "detail": string }
      ]
    }
  },
  "predictions": [ { "title": string, "probability": number, "severity": string, "timeframe": string, "description": string } ],
  "earlyWarnings": [ { "level": string, "title": string, "detail": string, "trend": string } ],
  "topWords": {
    "person1": [ { "word": string, "count": number } ],
    "person2": [ { "word": string, "count": number } ]
  },
  "healthTimeline": [ { "period": string, "messages": number, "health": number } ],
  "verdict": { "person1Summary": string, "person2Summary": string, "relationshipSummary": string }
}

Return ONLY the JSON object.`,
  demoData: {
    participants: { person1: 'Casey', person2: 'Morgan' },
    totalMessages: 12400,
    totalDays: 243,
    dateRange: { start: '2025-01-05', end: '2025-08-25' },
    rawVolume: {
      person1: { messages: 7100, avgReplyMin: 18, startsDay: 168 },
      person2: { messages: 5300, avgReplyMin: 74, startsDay: 41 },
    },
    loveAffection: [
      { label: 'Warmth expressions', person1: 78, person2: 52 },
      { label: 'Future-talk frequency', person1: 34, person2: 9 },
      { label: 'Daytime contact', person1: 46, person2: 18 },
      { label: 'Weekend visibility', person1: 28, person2: 12 },
      { label: 'Label-use (we/us/bf/gf)', person1: 22, person2: 3 },
      { label: 'Plans confirmed >1 week out', person1: 14, person2: 4 },
    ],
    reciprocity: {
      person1SaysLovePerson2Reciprocates: 31,
      person2SaysLovePerson1Reciprocates: 82,
    },
    conflict: [
      { label: 'Definition-talk deflections', person1: 2, person2: 14 },
      { label: 'Cancelled plans', person1: 3, person2: 11 },
      { label: 'Ghosting episodes', person1: 1, person2: 7 },
      { label: 'Jealousy without claim', person1: 6, person2: 4 },
      { label: 'Exclusivity disputes', person1: 4, person2: 2 },
    ],
    psychPatterns: [
      { label: 'Breadcrumbing', person1: 12, person2: 68, note: 'Morgan sends just-enough warmth to keep the thread alive, rarely escalates.' },
      { label: 'Intermittent reinforcement', person1: 18, person2: 74, note: 'Long silences followed by intense bursts — classic variable reward.' },
      { label: 'Avoidant withdrawal', person1: 15, person2: 62, note: 'Morgan disengages when definition questions surface.' },
      { label: 'Fear of labels', person1: 22, person2: 81, note: 'Morgan sidesteps every attempt at naming what this is.' },
      { label: 'Late-night-only contact', person1: 41, person2: 79, note: 'Over 60% of Morgan\'s messages land after 10pm.' },
    ],
    ratings: {
      person1: {
        overall: 6.8,
        dimensions: [
          { name: 'Consistency', score: 7.5, detail: 'Casey shows up steadily day and night.' },
          { name: 'Daylight effort', score: 8.0, detail: 'Initiates morning and midday check-ins.' },
          { name: 'Label courage', score: 7.0, detail: 'Raised "what are we" twice; got deflected.' },
          { name: 'Plan follow-through', score: 7.8, detail: 'Keeps plans when made.' },
          { name: 'Emotional availability', score: 7.2, detail: 'Open about feelings, sometimes over-gives.' },
          { name: 'Future-talk horizon', score: 6.5, detail: 'Talks weeks out; gets met with vagueness.' },
          { name: 'Reciprocity', score: 5.5, detail: 'Gives more than received.' },
          { name: 'Honesty', score: 7.5, detail: 'Direct about wanting more clarity.' },
        ],
      },
      person2: {
        overall: 3.9,
        dimensions: [
          { name: 'Consistency', score: 3.5, detail: 'Bursts of warmth, long silences — unpredictable.' },
          { name: 'Daylight effort', score: 2.8, detail: 'Rarely texts before 9pm.' },
          { name: 'Label courage', score: 2.0, detail: 'Sidesteps every definition conversation.' },
          { name: 'Plan follow-through', score: 3.8, detail: 'Cancels ~1 in 4 plans, often last minute.' },
          { name: 'Emotional availability', score: 4.5, detail: 'Warm when present, gone when stressed.' },
          { name: 'Future-talk horizon', score: 2.5, detail: 'Won\'t commit beyond a few days.' },
          { name: 'Reciprocity', score: 4.2, detail: 'Receives more warmth than returned.' },
          { name: 'Honesty', score: 5.0, detail: 'Not dishonest — just not forthcoming.' },
        ],
      },
    },
    predictions: [
      { title: 'Definition conversation forced within 60 days', probability: 72, severity: 'medium', timeframe: '30–60 days', description: 'Casey\'s patience for ambiguity is visibly thinning in recent weeks.' },
      { title: 'Morgan continues to deflect when pushed', probability: 68, severity: 'medium', timeframe: '0–90 days', description: 'Pattern is stable across 8 months; unlikely to shift without external pressure.' },
      { title: 'Quiet fade rather than clean ending', probability: 55, severity: 'medium', timeframe: '60–120 days', description: 'Late-night-only contact and rising ghosting suggest slow decline.' },
      { title: 'Casey dates someone else and clarity arrives by contrast', probability: 38, severity: 'low', timeframe: '90–180 days', description: 'Exposure to a defined connection often collapses the ambiguity.' },
    ],
    earlyWarnings: [
      { level: 'high', title: 'Label-use asymmetry is severe', detail: 'Casey uses "we/us" 22× more than Morgan (22 vs 3).', trend: 'widening' },
      { level: 'high', title: 'Late-night-only pattern entrenched', detail: '79% of Morgan\'s messages arrive after 10pm.', trend: 'stable' },
      { level: 'medium', title: 'Plans-confirmed-ahead near zero from Morgan', detail: 'Only 4 confirmed plans >1 week out across 8 months.', trend: 'stable' },
      { level: 'medium', title: 'Ghosting episodes trending up', detail: '7 episodes from Morgan, clustered in the last 8 weeks.', trend: 'rising' },
      { level: 'low', title: 'Jealousy without claim', detail: 'Both show possessiveness neither has earned through commitment.', trend: 'stable' },
    ],
    topWords: {
      person1: [
        { word: 'us', count: 142 },
        { word: 'weekend', count: 118 },
        { word: 'maybe', count: 96 },
        { word: 'tomorrow', count: 88 },
        { word: 'want', count: 84 },
        { word: 'together', count: 71 },
        { word: 'plans', count: 64 },
        { word: 'talk', count: 58 },
      ],
      person2: [
        { word: 'lol', count: 201 },
        { word: 'busy', count: 112 },
        { word: 'later', count: 94 },
        { word: 'tonight', count: 87 },
        { word: 'up', count: 79 },
        { word: 'idk', count: 68 },
        { word: 'soon', count: 52 },
        { word: 'vibes', count: 44 },
      ],
    },
    healthTimeline: [
      { period: 'Jan 2025', messages: 1120, health: 7.2 },
      { period: 'Feb 2025', messages: 1540, health: 7.5 },
      { period: 'Mar 2025', messages: 1780, health: 6.8 },
      { period: 'Apr 2025', messages: 1620, health: 6.2 },
      { period: 'May 2025', messages: 1480, health: 5.6 },
      { period: 'Jun 2025', messages: 1560, health: 5.1 },
      { period: 'Jul 2025', messages: 1720, health: 4.6 },
      { period: 'Aug 2025', messages: 1580, health: 4.1 },
    ],
    verdict: {
      person1Summary: 'Casey is the one holding this together — showing up in daylight, naming the "us", asking real questions. The effort is real and largely unreciprocated.',
      person2Summary: 'Morgan is warm in bursts and absent in substance. Not malicious, but consistently unwilling to define, plan ahead, or show up outside late-night hours.',
      relationshipSummary: 'This is an 8-month asymmetric situationship. One person is dating; the other is keeping a thread warm. The gap between warmth expressed and definition offered is wide and widening. Nothing here is broken enough to force a crisis — which is exactly why it can drift for another year if nobody names it.',
    },
  },
};

export default config;
