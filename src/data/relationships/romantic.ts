import type { RelationshipConfig } from './types';

export const config: RelationshipConfig = {
  id: 'romantic',
  label: 'Romantic',
  emoji: '💗',
  theme: {
    person1: '#60a5fa',
    person2: '#f472b6',
    accent: '#ec4899',
    gradient: 'linear-gradient(135deg,#60a5fa 0%,#c084fc 40%,#f472b6 100%)',
    glow: '#ec4899',
  },
  copy: {
    selectorTitle: 'Romantic Partner',
    selectorTagline: "Current partner, dating, married — what's really going on?",
    uploadHeadline: 'Analyze your chat with your partner',
    uploadSubhead: 'Bids, repair, attachment — the real stuff',
    sectionHeadings: {
      overview: 'Relationship Overview',
      affection: 'Love & Affection',
      reciprocity: 'Reciprocity',
      conflict: 'Conflict',
      patterns: 'Patterns',
      ratings: 'Ratings',
      predictions: 'Predictions',
      warnings: 'Early Warnings',
      timeline: 'Health Timeline',
      verdict: 'Verdict',
    },
    verdictLead: "Here's what your chat actually says about the two of you.",
  },
  systemPrompt: `You are a ruthlessly honest relationship analyst trained in Gottman Method research and attachment theory. You will be given the full text of a chat between two romantic partners (current partner, dating, or married). Your job is to analyse the dynamic and emit a single JSON object that EXACTLY matches the AnalysisData TypeScript interface below. No markdown. No prose. No code fences. Only valid JSON.

AnalysisData shape:
{
  "participants": { "person1": string, "person2": string },
  "totalMessages": number,
  "totalDays": number,
  "dateRange": { "start": "YYYY-MM-DD", "end": "YYYY-MM-DD" },
  "rawVolume": {
    "person1": { "messages": number, "avgReplyMin": number, "startsDay": number },
    "person2": { "messages": number, "avgReplyMin": number, "startsDay": number }
  },
  "loveAffection": [ { "label": string, "person1": number, "person2": number } ],
  "reciprocity": { "person1SaysLovePerson2Reciprocates": number, "person2SaysLovePerson1Reciprocates": number },
  "conflict": [ { "label": string, "person1": number, "person2": number } ],
  "psychPatterns": [ { "label": string, "person1": number, "person2": number, "note": string } ],
  "ratings": {
    "person1": { "overall": number, "dimensions": [ { "name": string, "score": number, "detail": string } ] },
    "person2": { "overall": number, "dimensions": [ { "name": string, "score": number, "detail": string } ] }
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

REQUIRED content rules:
- loveAffection MUST use these six labels, in order: "Love expressions", "Missing each other", "Good morning/night", "Check-ins on wellbeing", "Emotional support given", "Future planning".
- conflict MUST use these five labels, in order: "Starts conflicts", "Escalation/ultimatums", "Accusations", "Threats to leave", "Breaks silence after fight".
- psychPatterns MUST include the Gottman Four Horsemen plus jealousy, in this order: "Criticism", "Contempt", "Defensiveness", "Stonewalling", "Jealousy/Possessiveness". Each item needs a concise "note" field quoting the behavioural signal you saw.
- ratings dimensions (EXACTLY these 8, in this order, for BOTH persons): "Emotional Investment", "Availability", "Conflict Management", "Emotional Maturity", "Respect for Boundaries", "Consistency", "Communication Quality", "Self-awareness". Scores 0–100. Overall is a weighted average.
- Provide 3–5 predictions and 3–5 earlyWarnings. Severity: "low" | "moderate" | "high" | "critical". Level for warnings: "info" | "watch" | "warning" | "critical". Trend: "improving" | "stable" | "worsening".
- Provide ~10 topWords per person (lowercased, excluding stopwords) and ~10 healthTimeline points spaced evenly across the date range. Health is 0–100.
- The verdict contains THREE sentences for each of person1Summary, person2Summary, and relationshipSummary. Be brutally honest — no sugar-coating, no therapy-speak hedging. Name the dynamic.
- Handle mixed-language chats (e.g. Hinglish, Spanglish, emoji-heavy): normalise affection terms across languages when counting.
- Return ONLY valid JSON. No markdown fences, no commentary, no trailing text.`,
  demoData: {
    participants: { person1: 'Alex', person2: 'Sam' },
    totalMessages: 45000,
    totalDays: 687,
    dateRange: { start: '2024-02-03', end: '2025-12-21' },
    rawVolume: {
      person1: { messages: 26400, avgReplyMin: 4, startsDay: 512 },
      person2: { messages: 18600, avgReplyMin: 38, startsDay: 175 },
    },
    loveAffection: [
      { label: 'Love expressions', person1: 1842, person2: 612 },
      { label: 'Missing each other', person1: 934, person2: 201 },
      { label: 'Good morning/night', person1: 612, person2: 388 },
      { label: 'Check-ins on wellbeing', person1: 1120, person2: 244 },
      { label: 'Emotional support given', person1: 876, person2: 190 },
      { label: 'Future planning', person1: 410, person2: 88 },
    ],
    reciprocity: {
      person1SaysLovePerson2Reciprocates: 34,
      person2SaysLovePerson1Reciprocates: 92,
    },
    conflict: [
      { label: 'Starts conflicts', person1: 312, person2: 84 },
      { label: 'Escalation/ultimatums', person1: 141, person2: 22 },
      { label: 'Accusations', person1: 229, person2: 61 },
      { label: 'Threats to leave', person1: 47, person2: 6 },
      { label: 'Breaks silence after fight', person1: 188, person2: 31 },
    ],
    psychPatterns: [
      { label: 'Criticism', person1: 58, person2: 24, note: 'Alex frames complaints as character flaws ("you never", "you always").' },
      { label: 'Contempt', person1: 22, person2: 11, note: 'Occasional sarcasm and mocking from Alex after unanswered messages.' },
      { label: 'Defensiveness', person1: 33, person2: 71, note: 'Sam deflects with "I was busy" instead of acknowledging impact.' },
      { label: 'Stonewalling', person1: 14, person2: 64, note: 'Sam goes silent for 6–18 hours when conflict escalates.' },
      { label: 'Jealousy/Possessiveness', person1: 46, person2: 5, note: 'Alex repeatedly asks who Sam is with and checks timestamps.' },
    ],
    ratings: {
      person1: {
        overall: 62,
        dimensions: [
          { name: 'Emotional Investment', score: 92, detail: 'Over-invested — tracks the relationship more than their own life.' },
          { name: 'Availability', score: 88, detail: 'Replies within minutes, often drops plans to respond.' },
          { name: 'Conflict Management', score: 38, detail: 'Escalates fast; uses ultimatums when feeling unseen.' },
          { name: 'Emotional Maturity', score: 52, detail: 'Self-aware between episodes but floods during triggers.' },
          { name: 'Respect for Boundaries', score: 44, detail: 'Pushes for reassurance past Sam\u2019s stated limits.' },
          { name: 'Consistency', score: 61, detail: 'Warm one day, cold the next after perceived slights.' },
          { name: 'Communication Quality', score: 57, detail: 'Long, emotional messages; sometimes overwhelming.' },
          { name: 'Self-awareness', score: 66, detail: 'Names the anxious pattern but rarely interrupts it in the moment.' },
        ],
      },
      person2: {
        overall: 49,
        dimensions: [
          { name: 'Emotional Investment', score: 41, detail: 'Shows up when convenient; low volunteered affection.' },
          { name: 'Availability', score: 32, detail: 'Average reply ~38 min, silent stretches overnight.' },
          { name: 'Conflict Management', score: 44, detail: 'Withdraws rather than repairs.' },
          { name: 'Emotional Maturity', score: 58, detail: 'Calm but avoidant; rarely names feelings.' },
          { name: 'Respect for Boundaries', score: 71, detail: 'Holds own limits firmly, sometimes rigidly.' },
          { name: 'Consistency', score: 63, detail: 'Predictably distant — at least not volatile.' },
          { name: 'Communication Quality', score: 46, detail: 'Short replies; dismisses bids for deeper talk.' },
          { name: 'Self-awareness', score: 39, detail: 'Frames distance as personality, not pattern.' },
        ],
      },
    },
    predictions: [
      { title: 'Major blow-up within 60 days', probability: 78, severity: 'high', timeframe: '4–8 weeks', description: 'Alex\u2019s protest behaviour is intensifying while Sam\u2019s stonewalling lengthens. Expect an ultimatum triggered by a missed response.' },
      { title: 'Temporary breakup', probability: 54, severity: 'high', timeframe: '2–4 months', description: 'Pattern of threats-to-leave followed by reconciliation is tightening; next cycle likely ends in a short split.' },
      { title: 'Reconciliation after break', probability: 67, severity: 'moderate', timeframe: '1–3 weeks after split', description: 'Both show strong reunion behaviour — breakup will likely not stick without external support.' },
      { title: 'Long-term erosion of trust', probability: 71, severity: 'high', timeframe: '6–12 months', description: 'If patterns continue, Sam will disengage further and Alex\u2019s jealousy checks will become surveillance.' },
      { title: 'Therapy-driven turnaround', probability: 28, severity: 'low', timeframe: '3–6 months', description: 'Possible if both commit to couples work; current chat shows no mention of it.' },
    ],
    earlyWarnings: [
      { level: 'critical', title: 'Escalating threats to leave', detail: '47 instances from Alex, trending up quarter over quarter.', trend: 'worsening' },
      { level: 'warning', title: 'Stonewalling windows lengthening', detail: 'Sam\u2019s average silence after conflict grew from 2h to 14h.', trend: 'worsening' },
      { level: 'warning', title: 'Jealousy surveillance', detail: 'Alex\u2019s location/timestamp checks up 3x since mid-2025.', trend: 'worsening' },
      { level: 'watch', title: 'Reciprocity gap widening', detail: 'Alex says "I love you" 3x more often than Sam.', trend: 'stable' },
      { level: 'info', title: 'Future-planning decline', detail: 'Mentions of trips/plans dropped 40% in last 90 days.', trend: 'worsening' },
    ],
    topWords: {
      person1: [
        { word: 'love', count: 1842 },
        { word: 'miss', count: 934 },
        { word: 'please', count: 812 },
        { word: 'sorry', count: 704 },
        { word: 'why', count: 689 },
        { word: 'always', count: 521 },
        { word: 'never', count: 498 },
        { word: 'babe', count: 476 },
        { word: 'us', count: 442 },
        { word: 'promise', count: 318 },
      ],
      person2: [
        { word: 'busy', count: 612 },
        { word: 'later', count: 488 },
        { word: 'ok', count: 471 },
        { word: 'work', count: 402 },
        { word: 'tired', count: 366 },
        { word: 'fine', count: 341 },
        { word: 'tomorrow', count: 298 },
        { word: 'love', count: 244 },
        { word: 'sure', count: 221 },
        { word: 'whatever', count: 154 },
      ],
    },
    healthTimeline: [
      { period: '2024-02', messages: 1820, health: 82 },
      { period: '2024-05', messages: 2410, health: 78 },
      { period: '2024-08', messages: 2980, health: 74 },
      { period: '2024-11', messages: 2660, health: 68 },
      { period: '2025-02', messages: 2880, health: 64 },
      { period: '2025-05', messages: 3120, health: 58 },
      { period: '2025-07', messages: 2740, health: 52 },
      { period: '2025-09', messages: 2510, health: 46 },
      { period: '2025-11', messages: 2280, health: 41 },
      { period: '2025-12', messages: 1980, health: 38 },
    ],
    verdict: {
      person1Summary: 'Alex is the anxious engine of this relationship — affectionate, available, and exhausted. Their love is real, but it\u2019s delivered through protest: ultimatums, jealousy checks, and reassurance-seeking that corrode the thing they\u2019re trying to protect. Without regulating the anxious response, Alex will keep burning the bridge they\u2019re standing on.',
      person2Summary: 'Sam is emotionally economical to the point of neglect. They meet bids when it costs nothing and disappear the moment intimacy asks for effort, calling that disappearance "being busy". They\u2019re not cruel — they\u2019re absent, and absence from a partner feels identical to rejection.',
      relationshipSummary: 'This is a textbook anxious-avoidant loop: Alex chases, Sam withdraws, and both confuse the chase-withdraw choreography for chemistry. The trajectory is clearly downward — reciprocity is collapsing, silences are lengthening, and threats are escalating. It survives on reunion highs, not on daily functioning, and without structured intervention it will end in a breakup that neither of them actually wants.',
    },
  },
};

export default config;
