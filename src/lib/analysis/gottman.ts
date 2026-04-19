/**
 * Gottman Positive-to-Negative Sentiment Ratio — the "5:1 magic ratio".
 *
 * From the Gottman Institute's research on married couples: healthy
 * relationships maintain at least a 5:1 positive-to-negative interaction
 * ratio during conflict, with 20:1 during non-conflict periods. We
 * compute this on each sender's outbound messages, broken down by month
 * so a decaying ratio shows up as a timeline rather than a single number.
 *
 * References:
 *   - Gottman, J. M. (1994). Why Marriages Succeed or Fail.
 *   - https://www.gottman.com/blog/the-magic-relationship-ratio-according-science/
 *
 * Classification uses lexicon-based scoring (AFINN-style) rather than
 * a full model — fast, transparent, and good enough for per-message
 * polarity on conversational text.
 */

import type { ChatMessage, GottmanRatio } from "./types";

// Curated English polarity lexicon focused on relationship language.
// Values are signed — positive = positive affect, negative = negative.
const LEX: Record<string, number> = {
  // Positive affect
  love: 3,
  "i love you": 4,
  adore: 3,
  miss: 2,
  happy: 2,
  thank: 2,
  thanks: 2,
  grateful: 2,
  appreciate: 2,
  proud: 2,
  sweet: 2,
  beautiful: 2,
  cute: 2,
  perfect: 2,
  amazing: 2,
  awesome: 2,
  smile: 1,
  laugh: 2,
  haha: 1,
  lol: 1,
  "❤️": 3,
  "😍": 3,
  "🥰": 3,
  "😘": 2,
  "😊": 1,
  "🙏": 1,
  // Negative affect
  hate: -3,
  "i hate": -4,
  angry: -2,
  mad: -2,
  furious: -3,
  sick: -1,
  tired: -1,
  exhausted: -2,
  annoyed: -2,
  frustrated: -2,
  selfish: -2,
  liar: -3,
  stupid: -2,
  idiot: -2,
  whatever: -1,
  fine: -1,
  shut: -2,
  "shut up": -3,
  "leave me alone": -3,
  done: -1,
  "i'm done": -3,
  over: -1,
  breakup: -3,
  "break up": -3,
  // Criticism / contempt (Gottman's "Four Horsemen")
  always: -1,
  never: -1,
  "you never": -2,
  "you always": -2,
  "your fault": -3,
};

const KEYS = Object.keys(LEX).sort((a, b) => b.length - a.length);

export function scoreMessage(text: string): number {
  const lower = " " + text.toLowerCase() + " ";
  let score = 0;
  for (const key of KEYS) {
    // word-boundary match for words, raw substring for multi-word phrases / emoji
    if (/\s/.test(key) || key.length <= 2) {
      const count = countOccurrences(lower, key);
      score += LEX[key] * count;
    } else {
      const re = new RegExp(`\\b${escapeRegex(key)}\\b`, "g");
      const count = (lower.match(re) || []).length;
      score += LEX[key] * count;
    }
  }
  return score;
}

export function computeGottman(messages: ChatMessage[]): GottmanRatio {
  let positive = 0;
  let negative = 0;
  const byMonth: Record<string, { pos: number; neg: number }> = {};

  for (const m of messages) {
    const score = scoreMessage(m.text);
    if (score > 0) positive += score;
    if (score < 0) negative += Math.abs(score);

    const key = `${m.timestamp.getFullYear()}-${String(m.timestamp.getMonth() + 1).padStart(2, "0")}`;
    if (!byMonth[key]) byMonth[key] = { pos: 0, neg: 0 };
    if (score > 0) byMonth[key].pos += score;
    if (score < 0) byMonth[key].neg += Math.abs(score);
  }

  const ratio = negative === 0 ? positive : positive / negative;
  const verdict: GottmanRatio["verdict"] =
    ratio >= 5 ? "healthy" : ratio >= 3 ? "borderline" : "at-risk";

  const timeline = Object.keys(byMonth)
    .sort()
    .map((month) => ({
      month,
      ratio:
        byMonth[month].neg === 0
          ? byMonth[month].pos || 1
          : byMonth[month].pos / byMonth[month].neg,
    }));

  return {
    positive,
    negative,
    ratio: Math.round(ratio * 100) / 100,
    verdict,
    timeline,
  };
}

function countOccurrences(hay: string, needle: string): number {
  if (!needle) return 0;
  let count = 0;
  let idx = 0;
  while ((idx = hay.indexOf(needle, idx)) !== -1) {
    count += 1;
    idx += needle.length;
  }
  return count;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
