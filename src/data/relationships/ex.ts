import type { RelationshipConfig } from './types';

export const config: RelationshipConfig = {
  id: 'ex',
  label: 'Ex',
  emoji: '🕯️',
  theme: {
    person1: '#94a3b8',
    person2: '#64748b',
    accent: '#818cf8',
    gradient: 'linear-gradient(135deg,#334155 0%,#64748b 50%,#818cf8 100%)',
    glow: '#475569',
  },
  copy: {
    selectorTitle: 'Ex / Former Partner',
    selectorTagline: 'Are you both actually moving on?',
    uploadHeadline: 'Analyze your chat with your ex',
    uploadSubhead: 'Breadcrumbs, hoovering, closure — the post-breakup truth',
    sectionHeadings: {
      overview: 'Stats Overview',
      affection: 'Emotional Regression',
      reciprocity: "Who's Still Reaching",
      conflict: 'Unresolved Loops',
      patterns: 'Hot-Cold & Breadcrumbing',
      ratings: 'Moving-On Health',
      predictions: 'What Comes Next',
      warnings: 'Red Flags',
      timeline: 'Contact Decay',
      verdict: 'The Honest Read',
    },
    verdictLead: "Here's the honest read on whether you're both actually moving on.",
  },
  systemPrompt: `You are analysing a post-breakup chat between two exes (former romantic partners who have already ended the relationship).

Your job is to assess how well each person is MOVING ON — not whether they still love each other, not whether they should reconcile. This is about detachment, closure, and healthy separation.

Emit EXACTLY the AnalysisData JSON shape. Return ONLY JSON, no markdown, no code fences, no commentary.

Repurpose the fields as follows:

- loveAffection[].label must be exactly these 6 items, in order:
  ["Emotional regressions","Late-night messages","Closure attempts","Nostalgia callbacks","Logistics-only exchanges","Breadcrumb affection"]
  (These measure regressive/entangling behaviours, NOT healthy affection.)

- conflict[].label must be exactly these 5 items, in order:
  ["Re-litigates the breakup","Jealousy probes","Drunk-hour outbursts","Hoovering attempts","Blame loops"]

- psychPatterns[].label must be exactly these 5 items, in order, each with a short diagnostic note:
  ["Breadcrumbing","Hoovering","Trauma-bond cycle","Ambiguous-loss language","Intermittent reinforcement"]

- ratings.person1.dimensions and ratings.person2.dimensions must each contain these 8 dimensions, in order:
  "Detachment", "Boundary clarity", "Closure orientation", "Emotional regulation", "No-contact discipline", "New-life investment", "Respect for the split", "Self-awareness"
  Higher = healthier moving-on behaviour.

- healthTimeline.health tracks "detachment" on a 0–10 scale where 0 = still fully enmeshed / entangled, 10 = fully moved on and cleanly detached.

CRITICAL RULES:
- DO NOT score based on love reciprocity. This analysis is about moving on, NOT rebuilding the relationship. High affection is a RED FLAG here, not a green one.
- Reciprocity fields should reflect who is chasing vs. who is pulling away, not mutual love.
- Tone: supportive, warm, non-shaming, non-judgemental. Treat both people as human beings processing loss.
- Populate every field in AnalysisData. No nulls. No omissions.
- Return ONLY the JSON object.`,
  demoData: {
    participants: { person1: 'Jordan', person2: 'Riley' },
    totalMessages: 8230,
    totalDays: 275,
    dateRange: { start: '2024-08-15', end: '2025-05-17' },
    rawVolume: {
      person1: { messages: 4780, avgReplyMin: 22, startsDay: 182 },
      person2: { messages: 3450, avgReplyMin: 74, startsDay: 93 },
    },
    loveAffection: [
      { label: 'Emotional regressions', person1: 68, person2: 41 },
      { label: 'Late-night messages', person1: 74, person2: 38 },
      { label: 'Closure attempts', person1: 52, person2: 29 },
      { label: 'Nostalgia callbacks', person1: 81, person2: 44 },
      { label: 'Logistics-only exchanges', person1: 22, person2: 58 },
      { label: 'Breadcrumb affection', person1: 47, person2: 63 },
    ],
    reciprocity: {
      person1SaysLovePerson2Reciprocates: 34,
      person2SaysLovePerson1Reciprocates: 71,
    },
    conflict: [
      { label: 'Re-litigates the breakup', person1: 62, person2: 35 },
      { label: 'Jealousy probes', person1: 58, person2: 24 },
      { label: 'Drunk-hour outbursts', person1: 49, person2: 18 },
      { label: 'Hoovering attempts', person1: 31, person2: 55 },
      { label: 'Blame loops', person1: 44, person2: 39 },
    ],
    psychPatterns: [
      { label: 'Breadcrumbing', person1: 38, person2: 67, note: 'Riley sends warm pings every 2–3 weeks that reset the attachment clock.' },
      { label: 'Hoovering', person1: 29, person2: 61, note: 'Riley reappears after silence with intense nostalgia, often coinciding with weekends.' },
      { label: 'Trauma-bond cycle', person1: 64, person2: 58, note: 'Both swing between high-intimacy recalls and sharp withdrawal within 48-hour windows.' },
      { label: 'Ambiguous-loss language', person1: 72, person2: 41, note: 'Jordan frequently uses "we" and present tense — loss is not yet integrated.' },
      { label: 'Intermittent reinforcement', person1: 33, person2: 69, note: 'Unpredictable affection from Riley keeps Jordan in a hopeful-anxious loop.' },
    ],
    ratings: {
      person1: {
        overall: 4.1,
        dimensions: [
          { name: 'Detachment', score: 3, detail: 'Still initiates contact most days; checks Riley\'s socials in-thread.' },
          { name: 'Boundary clarity', score: 4, detail: 'Sets limits but rescinds them within a week when Riley reaches out.' },
          { name: 'Closure orientation', score: 5, detail: 'Seeks explicit conversations about "what happened" repeatedly.' },
          { name: 'Emotional regulation', score: 4, detail: 'Late-night spikes after alcohol; otherwise composed.' },
          { name: 'No-contact discipline', score: 2, detail: '275 days of near-daily contact. No sustained pause longer than 6 days.' },
          { name: 'New-life investment', score: 5, detail: 'Mentions new gym, new friends — but routes updates back to Riley.' },
          { name: 'Respect for the split', score: 6, detail: 'Rarely crosses into harassment; respects stated wishes when clearly given.' },
          { name: 'Self-awareness', score: 6, detail: 'Names the pattern ("I know I shouldn\'t text") but acts anyway.' },
        ],
      },
      person2: {
        overall: 4.4,
        dimensions: [
          { name: 'Detachment', score: 6, detail: 'Longer silences and slower replies — but breaks them with warmth.' },
          { name: 'Boundary clarity', score: 3, detail: 'Mixed signals: asks for space, then sends "thinking of you" messages.' },
          { name: 'Closure orientation', score: 3, detail: 'Avoids the breakup conversation; deflects with humour or logistics.' },
          { name: 'Emotional regulation', score: 6, detail: 'Even-toned in most exchanges; rare outbursts.' },
          { name: 'No-contact discipline', score: 4, detail: 'Initiates hot spikes after weeks of quiet — the classic hoover pattern.' },
          { name: 'New-life investment', score: 6, detail: 'References new hobbies and a trip; doesn\'t always share them with Jordan.' },
          { name: 'Respect for the split', score: 5, detail: 'Honours the breakup in words but undermines it through breadcrumbs.' },
          { name: 'Self-awareness', score: 4, detail: 'Rarely names their own role in the push-pull dynamic.' },
        ],
      },
    },
    predictions: [
      { title: 'Another hot spike within 3 weeks', probability: 78, severity: 'medium', timeframe: '2–3 weeks', description: 'Riley\'s pattern points to another warm re-engagement cycle before month-end.' },
      { title: 'Jordan attempts a "final" closure talk', probability: 64, severity: 'medium', timeframe: '4–6 weeks', description: 'Escalating nostalgia callbacks suggest Jordan will push for a defining conversation.' },
      { title: 'A no-contact attempt — broken within 10 days', probability: 71, severity: 'low', timeframe: '1–2 months', description: 'Based on prior cycles, a unilateral pause is likely and likely to fail without support.' },
      { title: 'One of them mentions a new partner', probability: 42, severity: 'high', timeframe: '2–3 months', description: 'Would likely trigger a sharp rupture or a genuine detachment milestone.' },
    ],
    earlyWarnings: [
      { level: 'high', title: 'Intermittent reinforcement loop', detail: 'Riley\'s unpredictable warmth is the single biggest blocker to Jordan moving on.', trend: 'worsening' },
      { level: 'high', title: 'Zero sustained no-contact', detail: 'No silence longer than 6 days in 9 months — the wound never gets to close.', trend: 'stable' },
      { level: 'medium', title: 'Drunk-hour messaging', detail: '23% of Jordan\'s messages land between 11pm and 3am; regret patterns follow.', trend: 'stable' },
      { level: 'medium', title: 'Ambiguous-loss language', detail: 'Persistent use of "we" and present tense suggests the loss isn\'t integrated.', trend: 'improving' },
      { level: 'low', title: 'Jealousy probes', detail: 'Occasional fishing about the other\'s social life — non-aggressive but telling.', trend: 'stable' },
    ],
    topWords: {
      person1: [
        { word: 'remember', count: 142 },
        { word: 'miss', count: 118 },
        { word: 'we', count: 401 },
        { word: 'sorry', count: 96 },
        { word: 'closure', count: 47 },
        { word: 'tonight', count: 63 },
        { word: 'us', count: 188 },
        { word: 'still', count: 134 },
      ],
      person2: [
        { word: 'okay', count: 221 },
        { word: 'busy', count: 108 },
        { word: 'maybe', count: 97 },
        { word: 'thinking', count: 74 },
        { word: 'later', count: 89 },
        { word: 'space', count: 41 },
        { word: 'new', count: 66 },
        { word: 'good', count: 152 },
      ],
    },
    healthTimeline: [
      { period: 'Aug 2024', messages: 1840, health: 1 },
      { period: 'Sep 2024', messages: 1520, health: 2 },
      { period: 'Oct 2024', messages: 1180, health: 3 },
      { period: 'Nov 2024', messages: 740, health: 4 },
      { period: 'Dec 2024', messages: 980, health: 2 },
      { period: 'Jan 2025', messages: 610, health: 5 },
      { period: 'Feb 2025', messages: 820, health: 3 },
      { period: 'Mar 2025', messages: 340, health: 6 },
      { period: 'Apr 2025', messages: 140, health: 7 },
      { period: 'May 2025', messages: 60, health: 8 },
    ],
    verdict: {
      person1Summary: 'Jordan is doing the harder emotional work — naming the pattern, building a new life — but still chases contact at night and treats every Riley message as a sign. The grief is real; the no-contact muscle isn\'t built yet.',
      person2Summary: 'Riley looks more "moved on" from the outside, but the breadcrumbs and hoovering keep the door propped open. Warmth without commitment is its own kind of not-letting-go.',
      relationshipSummary: 'You broke up 9 months ago and you\'re still in daily contact. The shape is classic: one person seeks closure, the other offers intermittent warmth, and the cycle resets. The trend line IS bending toward detachment — May looks healthier than August — but a clean 30-day pause would do more for both of you than any more conversations about what went wrong.',
    },
  },
};

export default config;
