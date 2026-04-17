// Fictional sample data used by the "Try Demo" flow on /analyze.
// Participants "Alex" and "Sam" are not real people; the patterns are hand-tuned
// to demonstrate every section of the dashboard (love, conflict, warnings, predictions).
export const demoData = {
  participants: { person1: 'Alex', person2: 'Sam' },
  totalMessages: 45230,
  totalDays: 687,
  dateRange: { start: 'Feb 2024', end: 'Dec 2025' },

  rawVolume: {
    person1: { messages: 26840, avgReplyMin: 4, startsDay: 412 },
    person2: { messages: 18390, avgReplyMin: 23, startsDay: 189 },
  },

  loveAffection: [
    { label: 'Love expressions', person1: 1340, person2: 842 },
    { label: 'Missing each other', person1: 892, person2: 501 },
    { label: 'Good morning/night', person1: 1205, person2: 738 },
    { label: 'Check-ins on wellbeing', person1: 982, person2: 418 },
    { label: 'Emotional support given', person1: 1150, person2: 623 },
    { label: 'Future planning', person1: 534, person2: 287 },
  ],

  reciprocity: {
    person1SaysLovePerson2Reciprocates: 68,
    person2SaysLovePerson1Reciprocates: 94,
  },

  conflict: [
    { label: 'Starts conflicts', person1: 142, person2: 87 },
    { label: 'Escalation / ultimatums', person1: 31, person2: 68 },
    { label: 'Accusations', person1: 78, person2: 52 },
    { label: 'Threats to leave', person1: 12, person2: 41 },
    { label: 'Breaks silence after fight', person1: 189, person2: 42 },
  ],

  psychPatterns: [
    {
      label: 'Harsh language',
      person1: 54,
      person2: 118,
      note: 'Sam uses cutting phrasing during arguments at roughly 2x the rate.',
    },
    {
      label: 'Guilt-tripping',
      person1: 89,
      person2: 34,
      note: 'Alex leans on guilt framing when feeling unheard.',
    },
    {
      label: 'Self-blame',
      person1: 167,
      person2: 28,
      note: 'Alex absorbs fault ~6x more often than Sam.',
    },
    {
      label: 'Jealousy / possessiveness',
      person1: 23,
      person2: 61,
      note: "Sam shows protective jealousy around Alex's outside friendships.",
    },
  ],

  ratings: {
    person1: {
      overall: 78,
      dimensions: [
        { name: 'Emotional Investment', score: 92, detail: 'Consistently initiates and sustains emotional dialogue.' },
        { name: 'Availability', score: 88, detail: 'Replies within ~4 min on average, even late at night.' },
        { name: 'Conflict Management', score: 58, detail: 'Tends to pursue during conflict; over-apologizes.' },
        { name: 'Emotional Maturity', score: 71, detail: 'Strong self-awareness but reactive to distance.' },
        { name: 'Respect for Boundaries', score: 76, detail: 'Generally respectful; occasional over-communication.' },
        { name: 'Consistency', score: 84, detail: 'Steady effort across months; rarely goes silent.' },
        { name: 'Communication Quality', score: 81, detail: 'Clear and descriptive; verbose under stress.' },
        { name: 'Self-awareness', score: 79, detail: 'Names own emotions and patterns frequently.' },
      ],
    },
    person2: {
      overall: 62,
      dimensions: [
        { name: 'Emotional Investment', score: 58, detail: 'Engages deeply but inconsistently; emotional ebbs.' },
        { name: 'Availability', score: 47, detail: 'Avg reply 23 min; long gaps during stress.' },
        { name: 'Conflict Management', score: 51, detail: 'Withdraws or escalates; rarely initiates repair.' },
        { name: 'Emotional Maturity', score: 64, detail: 'Reflective moments interrupted by defensiveness.' },
        { name: 'Respect for Boundaries', score: 69, detail: 'Some possessiveness around outside friendships.' },
        { name: 'Consistency', score: 56, detail: 'Affection varies week to week.' },
        { name: 'Communication Quality', score: 72, detail: 'Articulate when engaged; terse under stress.' },
        { name: 'Self-awareness', score: 74, detail: 'Recognizes patterns but slow to act on them.' },
      ],
    },
  },

  predictions: [
    {
      title: 'Silent-treatment cycle continues',
      probability: 86,
      severity: 'high',
      timeframe: '2–4 weeks',
      description:
        "Sam's pattern of going silent 2–3 days after conflict has accelerated over the last 6 months. Highly likely to recur.",
    },
    {
      title: 'Escalating arguments about availability',
      probability: 74,
      severity: 'high',
      timeframe: '1–2 months',
      description:
        "Alex's frustration with response times is rising in frequency and intensity. Trigger for the next major fight.",
    },
    {
      title: 'Reconnection after a breakup threat',
      probability: 68,
      severity: 'medium',
      timeframe: '1 month',
      description:
        "Historical pattern: Sam's leave-threats are followed by ~10 days of unusually high affection before regressing.",
    },
    {
      title: 'Major compatibility rupture',
      probability: 41,
      severity: 'critical',
      timeframe: '6 months',
      description:
        'Attachment-style mismatch (pursuer / withdrawer) is trending toward a breakpoint if the underlying dynamic stays unaddressed.',
    },
  ],

  earlyWarnings: [
    {
      level: 'critical',
      title: 'Threats to leave are rising',
      detail: '41 explicit "I\'m done" messages from Sam in the last 90 days, up from 8 in the prior 90.',
      trend: 'up',
    },
    {
      level: 'high',
      title: 'Alex is carrying the emotional labor',
      detail: 'Alex initiates repair 4.5x more often than Sam. Elevated burnout risk.',
      trend: 'up',
    },
    {
      level: 'high',
      title: 'Silent-treatment duration lengthening',
      detail: 'Average silence after fights: 18hr → 34hr over 12 months.',
      trend: 'up',
    },
    {
      level: 'medium',
      title: 'Future-planning messages declining',
      detail: 'Mentions of shared future (trips, moving in, etc.) dropped 38% year-over-year.',
      trend: 'down',
    },
  ],

  topWords: {
    person1: [
      { word: 'love', count: 1340 },
      { word: 'miss', count: 892 },
      { word: 'sorry', count: 812 },
      { word: 'okay', count: 698 },
      { word: 'please', count: 542 },
      { word: 'tired', count: 431 },
      { word: 'happy', count: 397 },
      { word: 'together', count: 378 },
      { word: 'home', count: 341 },
      { word: 'tomorrow', count: 298 },
    ],
    person2: [
      { word: 'fine', count: 892 },
      { word: 'busy', count: 534 },
      { word: 'later', count: 498 },
      { word: 'love', count: 421 },
      { word: 'whatever', count: 312 },
      { word: 'done', count: 287 },
      { word: 'maybe', count: 256 },
      { word: 'work', count: 241 },
      { word: 'stop', count: 198 },
      { word: 'babe', count: 176 },
    ],
  },

  healthTimeline: [
    { period: 'Feb 2024', messages: 1420, health: 8.4 },
    { period: 'Mar 2024', messages: 2180, health: 8.1 },
    { period: 'Apr 2024', messages: 2540, health: 7.8 },
    { period: 'May 2024', messages: 2890, health: 7.2 },
    { period: 'Jun 2024', messages: 3120, health: 6.4 },
    { period: 'Jul 2024', messages: 2870, health: 5.8 },
    { period: 'Aug 2024', messages: 2410, health: 4.9 },
    { period: 'Sep 2024', messages: 2680, health: 5.3 },
    { period: 'Oct 2024', messages: 2920, health: 5.8 },
    { period: 'Nov 2024', messages: 2540, health: 4.7 },
    { period: 'Dec 2024', messages: 1890, health: 3.8 },
    { period: 'Jan 2025', messages: 2140, health: 4.2 },
    { period: 'Feb 2025', messages: 2380, health: 3.6 },
    { period: 'Mar 2025', messages: 2012, health: 2.9 },
    { period: 'Apr 2025', messages: 1870, health: 2.4 },
    { period: 'May 2025', messages: 1650, health: 1.8 },
    { period: 'Jun 2025', messages: 1780, health: 2.1 },
    { period: 'Jul 2025', messages: 1620, health: 1.4 },
    { period: 'Aug 2025', messages: 1440, health: 0.8 },
    { period: 'Sep 2025', messages: 1290, health: 0.2 },
    { period: 'Oct 2025', messages: 1180, health: -0.6 },
    { period: 'Nov 2025', messages: 998, health: -1.2 },
    { period: 'Dec 2025', messages: 854, health: -1.8 },
  ],

  verdict: {
    person1Summary:
      'Alex is the emotional backbone of this relationship — present, invested, and willing to repair. That strength has become a burden: over-pursuit during conflict and over-apologizing have made healthy limits hard to enforce.',
    person2Summary:
      'Sam shows real depth but engages inconsistently. Withdrawal under stress and threats-to-leave have escalated from rare to routine — which corrodes trust faster than any single argument.',
    relationshipSummary:
      'A once-vibrant connection trending downward. The pursuer / withdrawer dynamic has calcified into a cycle where Alex carries most of the emotional labor. Without deliberate change, the trajectory points toward rupture within 6–9 months.',
  },
};
