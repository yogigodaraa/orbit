// ═══ PLACEHOLDER METRICS ═══
// Real dataset is private and lives in the gitignored `/yogi saayella/` folder.
// This file preserves the export shape so the app compiles and renders empty states.

export const COLORS = {
  yogi: '#2d6bc4',
  yogiLight: '#ddeafb',
  saayella: '#c4406e',
  saayellaLight: '#fcdcea',
  neutral: '#888',
  warning: '#e07000',
  positive: '#4a9e6f',
  negative: '#c4406e',
  bg: '#0f1117',
  card: '#1a1d27',
  cardHover: '#22252f',
  border: '#2a2d37',
  text: '#e4e4e7',
  textMuted: '#9ca3af',
};

export const rawVolume = {
  totalMessages: 0,
  totalDays: 0,
  totalSessions: 0,
  yogi: { messages: 0, chars: 0, avgWords: 0, avgReplyMin: 0, startsDay: 0, closesConversation: 0 },
  saayella: { messages: 0, chars: 0, avgWords: 0, avgReplyMin: 0, startsDay: 0, closesConversation: 0 },
};

export const activityByHour = {
  yogi: Array(24).fill(0),
  saayella: Array(24).fill(0),
  labels: ['12a','1a','2a','3a','4a','5a','6a','7a','8a','9a','10a','11a','12p','1p','2p','3p','4p','5p','6p','7p','8p','9p','10p','11p'],
};

export const loveAffection: { label: string; yogi: number; saayella: number }[] = [];

export const reciprocity = {
  yogiSaysLoveSaayReciprocates: 0,
  saayellaSaysLoveYogiReciprocates: 0,
};

export const conflict: { label: string; yogi: number; saayella: number }[] = [];

export const psychPatterns: { label: string; yogi: number; saayella: number; note: string }[] = [];

export const attachmentStyle = {
  anxious: { yogi: 0, saayella: 0 },
  avoidant: { yogi: 0, saayella: 0 },
};

export const ghosting = {
  callsIgnored: { yogi: 0, saayella: 0 },
  silencedCalls: { yogi: 0, saayella: 0 },
  leftWaiting6hrs: { yogi: 0, saayella: 0 },
  breaksSilence: { yogi: 0, saayella: 0 },
};

export const healthTimeline: { period: string; messages: number; positive: number; negative: number; health: number }[] = [];

export const emotionalLanguage: { label: string; yogi: number; saayella: number }[] = [];

export const arshFactor = { yogi: 0, saayella: 0 };

export const topWords = {
  yogi: [] as { word: string; count: number }[],
  saayella: [] as { word: string; count: number }[],
};

export const extremes = {
  maxBurstYogi: { msgs: 0, timeframe: '', when: '' },
  maxBurstSaayella: { msgs: 0, timeframe: '', when: '' },
  longestSilence: { days: 0, when: '', brokenBy: '' },
  emotionalSwingDays: 0,
  longestMsgSaayella: { chars: 0, when: '' },
  longestMsgYogi: { chars: 0, when: '' },
};

export const fullSummary: { metric: string; yogi: string; saayella: string }[] = [];

export const ratings = {
  yogi: { overall: 0, dimensions: [] as { name: string; score: number; detail: string }[] },
  saayella: { overall: 0, dimensions: [] as { name: string; score: number; detail: string }[] },
};

export const predictions: {
  id: string; title: string; probability: number; severity: string;
  timeframe: string; description: string; indicator: string; person: string;
}[] = [];

export const earlyWarnings: {
  level: string; title: string; detail: string; trend: string;
  currentValue: string; peakValue: string;
}[] = [];

export const monthlyVolume: { month: string; yogi: number; saayella: number }[] = [];

export const fightLoveCycles: {
  cycleNum: number; startDate: string; fightIntensity: number; silenceDays: number;
  reconcileInitiator: string; loveSurgeDays: number; peakLoveIntensity: number;
}[] = [];

export const monthlyFightLove: {
  month: string; fights: number; loveScore: number; fightIntensity: number; loveIntensity: number;
}[] = [];

export const fightTriggers: {
  trigger: string; occurrences: number; avgEscalationTime: string; severity: number; percentOfFights: number;
}[] = [];

export const dayOfWeekPatterns: {
  day: string; fights: number; love: number; avgFightIntensity: number; avgLoveIntensity: number;
}[] = [];

export const futureProjections: {
  month: string; predictedMessages: number; predictedFights: number;
  predictedLove: number; confidence: number; scenario: string;
}[] = [];

export const cycleStats = {
  avgCycleLength: 0,
  avgSilenceDuration: 0,
  avgReconciliationTime: 0,
  avgLoveSurgeDuration: 0,
  cyclesPerMonth: 0,
  cycleAccelerating: false,
  lateStCycleLengthDays: 0,
  earlyStCycleLengthDays: 0,
  reconciliationRate: { early: 0, mid: 0, late: 0, final: 0 },
};
