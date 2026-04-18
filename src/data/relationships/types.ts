// Shared contract for all relationship-type configs.
// Each type under /relationships/<id>.ts exports a RelationshipConfig matching this.

export type RelationshipTypeId =
  | 'romantic'
  | 'ex'
  | 'situationship'
  | 'best-friend'
  | 'friend'
  | 'sibling'
  | 'mother'
  | 'father'
  | 'professional';

/**
 * Dashboard JSON contract (mirrors the existing DynamicDashboard props).
 * All relationship types emit this SAME shape so one dashboard renders them all.
 * What changes per type: label strings inside arrays, the LLM system prompt,
 * the copy, the theme, and the demo data.
 */
export interface AnalysisData {
  participants: { person1: string; person2: string };
  totalMessages: number;
  totalDays: number;
  dateRange: { start: string; end: string };
  rawVolume: {
    person1: { messages: number; avgReplyMin: number; startsDay: number };
    person2: { messages: number; avgReplyMin: number; startsDay: number };
  };
  loveAffection: Array<{ label: string; person1: number; person2: number }>;
  reciprocity: {
    person1SaysLovePerson2Reciprocates: number;
    person2SaysLovePerson1Reciprocates: number;
  };
  conflict: Array<{ label: string; person1: number; person2: number }>;
  psychPatterns: Array<{ label: string; person1: number; person2: number; note: string }>;
  ratings: {
    person1: { overall: number; dimensions: Array<{ name: string; score: number; detail: string }> };
    person2: { overall: number; dimensions: Array<{ name: string; score: number; detail: string }> };
  };
  predictions: Array<{ title: string; probability: number; severity: string; timeframe: string; description: string }>;
  earlyWarnings: Array<{ level: string; title: string; detail: string; trend: string }>;
  topWords: {
    person1: Array<{ word: string; count: number }>;
    person2: Array<{ word: string; count: number }>;
  };
  healthTimeline: Array<{ period: string; messages: number; health: number }>;
  verdict: { person1Summary: string; person2Summary: string; relationshipSummary: string };
}

export interface ThemeTokens {
  /** Person 1 colour (the user / "me" by default) */
  person1: string;
  /** Person 2 colour (the other party) */
  person2: string;
  /** CTA / accent */
  accent: string;
  /** Full CSS gradient used on hero/buttons */
  gradient: string;
  /** Hex used as the ambient page glow */
  glow: string;
}

export interface RelationshipCopy {
  selectorTitle: string;           // e.g. "Romantic Partner"
  selectorTagline: string;         // e.g. "Current or dating — find out what's really going on"
  uploadHeadline: string;          // e.g. "Analyze your chat with your partner"
  uploadSubhead: string;           // e.g. "Bids, repair, attachment — the real stuff"
  sectionHeadings: {
    overview: string;              // replaces "Stats Overview"
    affection: string;             // replaces "Love & Affection"
    reciprocity: string;           // replaces "Reciprocity"
    conflict: string;              // replaces "Conflict Analysis"
    patterns: string;              // replaces "Psychological Patterns"
    ratings: string;               // replaces "Person Ratings"
    predictions: string;           // replaces "Predictions"
    warnings: string;              // replaces "Early Warnings"
    timeline: string;              // replaces "Health Timeline"
    verdict: string;               // replaces "Verdict"
  };
  /** The single sentence the verdict modal leads with. */
  verdictLead: string;
}

export interface RelationshipConfig {
  id: RelationshipTypeId;
  label: string;          // short label used in chips/buttons ("Romantic")
  emoji: string;          // used in selector card
  theme: ThemeTokens;
  copy: RelationshipCopy;
  /** Full system prompt sent to the LLM. Must instruct the model to emit the AnalysisData JSON shape. */
  systemPrompt: string;
  /** Fictional sample data used by "Try Demo" for this relationship type. */
  demoData: AnalysisData;
}
