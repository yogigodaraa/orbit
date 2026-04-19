/**
 * Pure-TypeScript statistical pass over parsed chat messages.
 *
 * Every metric here is computed deterministically from the messages
 * without an LLM. These are the hard numbers we ground the LLM with,
 * so the narrative half of the analysis can't hallucinate basic facts
 * like "who texts more" or "what's the average reply time."
 */

import type {
  ChatMessage,
  ChatStats,
  ResponseTimeProfile,
  SenderStats,
  Silence,
  Streak,
} from "./types";

const REPLY_WINDOW_MINUTES = 60;
const STREAK_GAP_MINUTES = 30;
const SILENCE_THRESHOLD_HOURS = 8;

export function computeStats(messages: ChatMessage[]): ChatStats {
  if (!messages.length) {
    return emptyStats();
  }

  const sorted = [...messages].sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
  );

  const start = sorted[0].timestamp;
  const end = sorted[sorted.length - 1].timestamp;
  const totalDays =
    Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

  // Per-sender volume + length
  const perSender: Record<string, SenderStats> = {};
  const activeDays: Record<string, Set<string>> = {};
  for (const m of sorted) {
    if (!perSender[m.sender]) {
      perSender[m.sender] = {
        name: m.sender,
        messages: 0,
        charactersTotal: 0,
        averageMessageLength: 0,
        shareOfVolume: 0,
        activeDays: 0,
      };
      activeDays[m.sender] = new Set();
    }
    const s = perSender[m.sender];
    s.messages += 1;
    s.charactersTotal += m.text.length;
    activeDays[m.sender].add(m.timestamp.toISOString().slice(0, 10));
  }
  for (const s of Object.values(perSender)) {
    s.averageMessageLength = s.charactersTotal / Math.max(s.messages, 1);
    s.shareOfVolume = s.messages / sorted.length;
    s.activeDays = activeDays[s.name].size;
  }

  // Response times: for each sender, collect gap-to-reply from the OTHER sender.
  const replyGapsMinutes: Record<string, number[]> = {};
  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1];
    const cur = sorted[i];
    if (prev.sender === cur.sender) continue;
    const gapMin = (cur.timestamp.getTime() - prev.timestamp.getTime()) / 60000;
    if (gapMin <= 0) continue;
    if (!replyGapsMinutes[cur.sender]) replyGapsMinutes[cur.sender] = [];
    replyGapsMinutes[cur.sender].push(gapMin);
  }
  const responseTimes: Record<string, ResponseTimeProfile> = {};
  for (const [sender, gaps] of Object.entries(replyGapsMinutes)) {
    responseTimes[sender] = profile(gaps);
  }

  // Streaks + silences
  const streaks: Streak[] = [];
  const silences: Silence[] = [];
  let streakStart = sorted[0].timestamp;
  let streakCount = 1;
  for (let i = 1; i < sorted.length; i++) {
    const gapMin = (sorted[i].timestamp.getTime() - sorted[i - 1].timestamp.getTime()) / 60000;
    if (gapMin <= STREAK_GAP_MINUTES) {
      streakCount += 1;
      continue;
    }
    // Close current streak
    if (streakCount >= 3) {
      streaks.push({
        start: streakStart.toISOString(),
        end: sorted[i - 1].timestamp.toISOString(),
        messages: streakCount,
        durationMinutes: (sorted[i - 1].timestamp.getTime() - streakStart.getTime()) / 60000,
      });
    }
    // Silence?
    const gapH = gapMin / 60;
    if (gapH >= SILENCE_THRESHOLD_HOURS) {
      silences.push({
        start: sorted[i - 1].timestamp.toISOString(),
        end: sorted[i].timestamp.toISOString(),
        gapHours: gapH,
        brokenBy: sorted[i].sender,
      });
    }
    streakStart = sorted[i].timestamp;
    streakCount = 1;
  }
  if (streakCount >= 3) {
    streaks.push({
      start: streakStart.toISOString(),
      end: sorted[sorted.length - 1].timestamp.toISOString(),
      messages: streakCount,
      durationMinutes:
        (sorted[sorted.length - 1].timestamp.getTime() - streakStart.getTime()) / 60000,
    });
  }

  // Reciprocity: fraction of each sender's outbound messages that get a reply
  // from the OTHER sender within REPLY_WINDOW_MINUTES.
  const reciprocity: Record<string, number> = {};
  const outboundByMe: Record<string, number> = {};
  const repliedBackByThem: Record<string, number> = {};
  for (const sender of Object.keys(perSender)) {
    outboundByMe[sender] = 0;
    repliedBackByThem[sender] = 0;
  }
  for (let i = 0; i < sorted.length - 1; i++) {
    const m = sorted[i];
    outboundByMe[m.sender] += 1;
    for (let j = i + 1; j < sorted.length; j++) {
      const gapMin = (sorted[j].timestamp.getTime() - m.timestamp.getTime()) / 60000;
      if (gapMin > REPLY_WINDOW_MINUTES) break;
      if (sorted[j].sender !== m.sender) {
        repliedBackByThem[m.sender] += 1;
        break;
      }
    }
  }
  for (const s of Object.keys(perSender)) {
    reciprocity[s] = outboundByMe[s] ? repliedBackByThem[s] / outboundByMe[s] : 0;
  }

  // Activity histograms
  const activityHours = new Array(24).fill(0);
  const activityDaysOfWeek = new Array(7).fill(0);
  for (const m of sorted) {
    activityHours[m.timestamp.getHours()] += 1;
    activityDaysOfWeek[m.timestamp.getDay()] += 1;
  }

  return {
    totalMessages: sorted.length,
    dateRange: { start: start.toISOString(), end: end.toISOString() },
    totalDays,
    perSender,
    responseTimes,
    streaks,
    silences,
    reciprocity,
    activityHours,
    activityDaysOfWeek,
  };
}

function profile(nums: number[]): ResponseTimeProfile {
  if (!nums.length) return { median: 0, p90: 0, mean: 0, n: 0 };
  const sorted = [...nums].sort((a, b) => a - b);
  const median = percentile(sorted, 0.5);
  const p90 = percentile(sorted, 0.9);
  const mean = sorted.reduce((a, b) => a + b, 0) / sorted.length;
  return {
    median: Math.round(median * 100) / 100,
    p90: Math.round(p90 * 100) / 100,
    mean: Math.round(mean * 100) / 100,
    n: sorted.length,
  };
}

function percentile(sorted: number[], p: number): number {
  if (!sorted.length) return 0;
  const idx = p * (sorted.length - 1);
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sorted[lo];
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo);
}

function emptyStats(): ChatStats {
  return {
    totalMessages: 0,
    dateRange: { start: "", end: "" },
    totalDays: 0,
    perSender: {},
    responseTimes: {},
    streaks: [],
    silences: [],
    reciprocity: {},
    activityHours: new Array(24).fill(0),
    activityDaysOfWeek: new Array(7).fill(0),
  };
}
