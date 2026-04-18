import type { RelationshipConfig } from './types';

export const config: RelationshipConfig = {
  id: 'professional',
  label: 'Professional',
  emoji: '💼',
  theme: {
    person1: '#818cf8',
    person2: '#6366f1',
    accent: '#4f46e5',
    gradient: 'linear-gradient(135deg,#818cf8 0%,#6366f1 50%,#4338ca 100%)',
    glow: '#6366f1',
  },
  copy: {
    selectorTitle: 'Work / Professional',
    selectorTagline: 'Boss, report, colleague, mentor, client',
    uploadHeadline: 'Analyze your work chat',
    uploadSubhead: 'Collaboration, boundaries, credit, power flow — the real dynamics',
    sectionHeadings: {
      overview: 'Stats Overview',
      affection: 'Collaboration Signals',
      reciprocity: 'Help Flow & Credit',
      conflict: 'Tension & Escalations',
      patterns: 'Work Patterns',
      ratings: 'Working-Relationship Health',
      predictions: 'Trajectory',
      warnings: 'Boundary & Power Flags',
      timeline: 'Rapport Over Time',
      verdict: 'The Read',
    },
    verdictLead: 'Here is the read on this working relationship.',
  },
  systemPrompt: `You are analysing a work chat between two professionals (e.g., manager/report, colleagues, mentor/mentee, client/vendor). Emit ONLY a JSON object matching the AnalysisData contract.

Tone & framing:
- Be neutral, analytical, and boundary-respecting.
- DO NOT use love, affection, attachment, romantic, or jealousy framing. This is a professional relationship.
- Report observations, not diagnoses. Avoid clinical or pathologising language.
- Focus on collaboration quality, power dynamics, boundaries, credit attribution, responsiveness, and psychological safety.

Use these adapted labels in the JSON:

loveAffection (treat as "Collaboration Signals") — use exactly these item labels, each with person1/person2 counts:
  - "Acknowledgements / thanks"
  - "Credit attribution to each other"
  - "Psychological-safety signals"
  - "Help offered proactively"
  - "Recognition of work"
  - "On-scope social warmth"

conflict items — use exactly:
  - "After-hours demands"
  - "Passive-aggressive markers"
  - "Credit theft / ambiguity"
  - "Micromanagement signals"
  - "Escalation to third parties"

psychPatterns items (each with a short note field) — use exactly:
  - "Power-dynamic asymmetry"
  - "Boundary erosion"
  - "Parasocial-boss risk"
  - "Extractive help flow"
  - "Psychological-safety pattern"

ratings — each person has overall (0-10) and EXACTLY these 8 dimensions:
  1. "Responsiveness (work hours)"
  2. "Boundary integrity (after-hours)"
  3. "Task-to-social balance"
  4. "Help reciprocity"
  5. "Tone professionalism"
  6. "Credit attribution"
  7. "Conflict professionalism"
  8. "Psychological safety"

reciprocity: reuse the two numeric fields as "acknowledgement reciprocity" (when person1 thanks/credits person2, does person2 reciprocate, and vice versa) expressed as 0-100.

predictions & earlyWarnings: frame around trajectory of the working relationship, boundary risk, burnout risk, power flags — NOT romantic outcomes.

verdict: professional, candid, actionable summary for each party and the relationship.

Return ONLY the JSON. No prose, no markdown fences.`,
  demoData: {
    participants: { person1: 'Taylor', person2: 'Devon' },
    totalMessages: 6200,
    totalDays: 548,
    dateRange: { start: '2024-06-03', end: '2025-12-15' },
    rawVolume: {
      person1: { messages: 3180, avgReplyMin: 12, startsDay: 58 },
      person2: { messages: 3020, avgReplyMin: 18, startsDay: 42 },
    },
    loveAffection: [
      { label: 'Acknowledgements / thanks', person1: 412, person2: 268 },
      { label: 'Credit attribution to each other', person1: 198, person2: 121 },
      { label: 'Psychological-safety signals', person1: 156, person2: 184 },
      { label: 'Help offered proactively', person1: 142, person2: 176 },
      { label: 'Recognition of work', person1: 88, person2: 204 },
      { label: 'On-scope social warmth', person1: 231, person2: 218 },
    ],
    reciprocity: {
      person1SaysLovePerson2Reciprocates: 74,
      person2SaysLovePerson1Reciprocates: 61,
    },
    conflict: [
      { label: 'After-hours demands', person1: 14, person2: 87 },
      { label: 'Passive-aggressive markers', person1: 9, person2: 22 },
      { label: 'Credit theft / ambiguity', person1: 4, person2: 11 },
      { label: 'Micromanagement signals', person1: 2, person2: 38 },
      { label: 'Escalation to third parties', person1: 3, person2: 6 },
    ],
    psychPatterns: [
      {
        label: 'Power-dynamic asymmetry',
        person1: 32,
        person2: 68,
        note: 'Manager drives agenda, timing, and scope; report adapts. Expected given roles but trending steeper over last 6 months.',
      },
      {
        label: 'Boundary erosion',
        person1: 18,
        person2: 54,
        note: 'After-hours pings from Devon rose from ~2/month (Q3 2024) to ~11/month (Q4 2025). Taylor responds ~80% of the time.',
      },
      {
        label: 'Parasocial-boss risk',
        person1: 22,
        person2: 14,
        note: 'Taylor shows mild over-identification with manager approval. Healthy overall but worth monitoring.',
      },
      {
        label: 'Extractive help flow',
        person1: 12,
        person2: 28,
        note: 'Help requested downward more than upward; manager proactively unblocks less often than report does peer-upward.',
      },
      {
        label: 'Psychological-safety pattern',
        person1: 71,
        person2: 69,
        note: 'Disagreement is voiced openly in ~70% of observed tension moments. Generally healthy signal.',
      },
    ],
    ratings: {
      person1: {
        overall: 8.1,
        dimensions: [
          { name: 'Responsiveness (work hours)', score: 9.0, detail: 'Median reply 12 min during work hours.' },
          { name: 'Boundary integrity (after-hours)', score: 6.5, detail: 'Answers ~80% of after-hours pings; drifting.' },
          { name: 'Task-to-social balance', score: 8.2, detail: 'Healthy mix, leans task-forward.' },
          { name: 'Help reciprocity', score: 8.4, detail: 'Offers help upward and laterally often.' },
          { name: 'Tone professionalism', score: 9.1, detail: 'Consistently measured and clear.' },
          { name: 'Credit attribution', score: 8.7, detail: 'Names collaborators; credits Devon frequently.' },
          { name: 'Conflict professionalism', score: 8.0, detail: 'Raises concerns directly, rarely escalates.' },
          { name: 'Psychological safety', score: 7.6, detail: 'Voices disagreement but softens under pressure.' },
        ],
      },
      person2: {
        overall: 7.2,
        dimensions: [
          { name: 'Responsiveness (work hours)', score: 7.8, detail: 'Median reply 18 min; slower in afternoons.' },
          { name: 'Boundary integrity (after-hours)', score: 5.2, detail: 'After-hours pings rising; some weekends.' },
          { name: 'Task-to-social balance', score: 7.5, detail: 'Task-dominant, light on social warmth.' },
          { name: 'Help reciprocity', score: 6.8, detail: 'Proactive unblocks less frequent than expected.' },
          { name: 'Tone professionalism', score: 8.0, detail: 'Professional, occasionally terse under deadlines.' },
          { name: 'Credit attribution', score: 6.9, detail: 'Credits team broadly; individual shout-outs uneven.' },
          { name: 'Conflict professionalism', score: 7.4, detail: 'Direct, not reactive; sometimes blunt.' },
          { name: 'Psychological safety', score: 7.1, detail: 'Invites dissent but decisions can feel pre-made.' },
        ],
      },
    },
    predictions: [
      {
        title: 'After-hours load will cross burnout threshold',
        probability: 62,
        severity: 'medium',
        timeframe: 'Next 3 months',
        description: 'Trend of after-hours pings from Devon is compounding; Taylor response rate sustains the pattern.',
      },
      {
        title: 'Scope creep in Taylor\'s role',
        probability: 48,
        severity: 'low',
        timeframe: 'Next 6 months',
        description: 'Informal ownership of cross-team coordination is expanding without title or scope update.',
      },
      {
        title: 'Relationship remains net-productive',
        probability: 78,
        severity: 'low',
        timeframe: 'Next 12 months',
        description: 'Core collaboration signals and psychological safety scores remain healthy.',
      },
    ],
    earlyWarnings: [
      {
        level: 'medium',
        title: 'After-hours demand drift',
        detail: 'Devon\'s after-hours pings up ~5x since Q3 2024. Normalise a response-time SLA in work hours.',
        trend: 'rising',
      },
      {
        level: 'low',
        title: 'Credit attribution asymmetry',
        detail: 'Taylor credits Devon ~1.6x more often than reverse. Monitor for visibility impact at review time.',
        trend: 'stable',
      },
      {
        level: 'low',
        title: 'Micromanagement micro-signals',
        detail: 'Occasional re-asks on delivered items. Not severe but worth a 1:1 surface.',
        trend: 'stable',
      },
    ],
    topWords: {
      person1: [
        { word: 'thanks', count: 284 },
        { word: 'done', count: 211 },
        { word: 'shipped', count: 168 },
        { word: 'draft', count: 142 },
        { word: 'sounds', count: 131 },
        { word: 'review', count: 118 },
        { word: 'quick', count: 104 },
      ],
      person2: [
        { word: 'can', count: 312 },
        { word: 'need', count: 248 },
        { word: 'tonight', count: 92 },
        { word: 'priority', count: 181 },
        { word: 'deck', count: 147 },
        { word: 'eod', count: 124 },
        { word: 'call', count: 109 },
      ],
    },
    healthTimeline: [
      { period: '2024-Q3', messages: 820, health: 8.6 },
      { period: '2024-Q4', messages: 980, health: 8.5 },
      { period: '2025-Q1', messages: 1040, health: 8.2 },
      { period: '2025-Q2', messages: 1080, health: 7.9 },
      { period: '2025-Q3', messages: 1160, health: 7.6 },
      { period: '2025-Q4', messages: 1120, health: 7.3 },
    ],
    verdict: {
      person1Summary:
        'Taylor is a high-trust, high-output collaborator with strong tone and credit hygiene. Main risk: responding to after-hours demand is reinforcing the drift. Protect the boundary to protect the performance.',
      person2Summary:
        'Devon is a competent, direct manager who generates momentum but under-invests in proactive unblocking and after-hours discipline. Credit attribution and boundary modelling are the highest-leverage fixes.',
      relationshipSummary:
        'A healthy and productive working relationship trending slightly downward on boundaries and reciprocity. Collaboration signals and psychological safety remain strong. One honest conversation about after-hours norms and credit visibility likely resets the next 12 months.',
    },
  },
};

export default config;
