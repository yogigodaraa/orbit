/**
 * Shared types for the statistical analysis layer.
 *
 * These types are the *structured* output of pre-LLM analysis — real
 * numbers computed from the chat, not things the LLM has to guess at.
 * The LLM gets these as grounding context, which keeps the narrative
 * half of the analysis honest.
 */

export interface ChatMessage {
  /** ISO timestamp from the export line. */
  timestamp: Date;
  /** Sender display name as it appears in the chat. */
  sender: string;
  /** Raw message text (excluding timestamp/sender prefix). */
  text: string;
}

export interface ChatStats {
  totalMessages: number;
  dateRange: { start: string; end: string };
  totalDays: number;

  perSender: Record<string, SenderStats>;

  /** Response-time distribution for each sender (minutes until reply). */
  responseTimes: Record<string, ResponseTimeProfile>;

  /** Conversation streaks — contiguous periods of messaging. */
  streaks: Streak[];

  /** Silences — gaps between messages exceeding 8 hours. */
  silences: Silence[];

  /** Reciprocity: fraction of messages that get a reply within 1 hour. */
  reciprocity: Record<string, number>;

  /** Hour-of-day message volume histogram, 0..23. */
  activityHours: number[];
  /** Day-of-week histogram, 0=Sunday..6=Saturday. */
  activityDaysOfWeek: number[];
}

export interface SenderStats {
  name: string;
  messages: number;
  charactersTotal: number;
  averageMessageLength: number;
  /** Fraction of total messages coming from this sender. */
  shareOfVolume: number;
  /** Number of distinct days this sender sent at least one message. */
  activeDays: number;
}

export interface ResponseTimeProfile {
  /** Median reply latency in minutes. */
  median: number;
  /** 90th-percentile reply latency. */
  p90: number;
  /** Mean — sensitive to outliers, reported for completeness. */
  mean: number;
  /** Sample size (number of observed reply events). */
  n: number;
}

export interface Streak {
  start: string;
  end: string;
  messages: number;
  durationMinutes: number;
}

export interface Silence {
  start: string;
  end: string;
  gapHours: number;
  brokenBy: string;
}

/**
 * Gottman's Positive-to-Negative sentiment ratio.
 * The 5:1 "magic ratio" from the Gottman Institute — couples below
 * this ratio during conflict are at elevated risk of separation.
 * See: https://www.gottman.com/blog/the-magic-relationship-ratio-according-science/
 */
export interface GottmanRatio {
  positive: number;
  negative: number;
  ratio: number;
  verdict: "healthy" | "borderline" | "at-risk";
  /** Notable positive-to-negative shifts across the conversation (by month). */
  timeline: { month: string; ratio: number }[];
}

/**
 * Four-category attachment style estimation from message patterns.
 * Not a clinical instrument — behavioural proxies, documented
 * transparently so readers can judge. Mapped to Bartholomew & Horowitz
 * (1991).
 */
export interface AttachmentEstimate {
  secure: number;
  anxious: number;
  avoidant: number;
  disorganized: number;
  /** Signals that drove the estimate — transparency matters here. */
  signals: { name: string; weight: number; description: string }[];
}

export interface AnalysisBundle {
  stats: ChatStats;
  gottman: GottmanRatio;
  attachment: Record<string, AttachmentEstimate>;
  /** Compact summary designed to slot into an LLM prompt as grounding context. */
  llmContext: string;
}
