/**
 * Four-category attachment-style estimation from message patterns.
 *
 * Based on Bartholomew & Horowitz (1991) — Secure, Preoccupied/Anxious,
 * Dismissive/Avoidant, Fearful/Disorganized — but using behavioural
 * proxies we can observe in chat logs rather than a self-report
 * questionnaire.
 *
 * Every signal is transparent — we record which behaviours drove the
 * estimate so the UI can show "we inferred X because Y." This is a
 * heuristic, not a clinical instrument, and the output docs say so.
 *
 * References:
 *   - Bartholomew & Horowitz (1991), Attachment styles among young adults
 *   - Brennan, Clark & Shaver (1998), ECR-R: self-report instrument we're
 *     approximating behaviourally
 */

import type { AttachmentEstimate, ChatMessage, ChatStats } from "./types";

const PURSUIT_PHRASES = [
  "are you there",
  "why aren't you replying",
  "why are you ignoring",
  "please answer",
  "are you mad",
  "did i do something",
  "why are you quiet",
  "is everything okay",
  "?",
];

const WITHDRAWAL_PHRASES = [
  "i need space",
  "leave me alone",
  "don't want to talk",
  "not in the mood",
  "later",
  "busy",
  "can't right now",
];

const LOVE_BIDS = [
  "i love you",
  "miss you",
  "thinking of you",
  "missing you",
  "i miss you",
];

export function estimateAttachment(
  sender: string,
  messages: ChatMessage[],
  stats: ChatStats,
): AttachmentEstimate {
  const theirMessages = messages.filter((m) => m.sender === sender);
  if (theirMessages.length === 0) {
    return zero();
  }

  let secure = 0.4; // baseline — assume secure unless signals push otherwise
  let anxious = 0.2;
  let avoidant = 0.2;
  let disorganized = 0.1;

  const signals: AttachmentEstimate["signals"] = [];

  // 1. Pursuit pattern — anxious flag
  const pursuits = theirMessages.filter((m) =>
    PURSUIT_PHRASES.some((p) => m.text.toLowerCase().includes(p)),
  ).length;
  const pursuitRate = pursuits / theirMessages.length;
  if (pursuitRate > 0.04) {
    anxious += Math.min(pursuitRate * 4, 0.35);
    secure -= 0.15;
    signals.push({
      name: "pursuit_language",
      weight: pursuitRate,
      description: `${pursuits} messages containing 'why aren't you replying' / 'are you there' / similar pursuit phrases`,
    });
  }

  // 2. Withdrawal / short replies — avoidant flag
  const withdrawals = theirMessages.filter((m) =>
    WITHDRAWAL_PHRASES.some((p) => m.text.toLowerCase().includes(p)),
  ).length;
  const withdrawalRate = withdrawals / theirMessages.length;
  if (withdrawalRate > 0.02) {
    avoidant += Math.min(withdrawalRate * 4, 0.3);
    secure -= 0.1;
    signals.push({
      name: "withdrawal_language",
      weight: withdrawalRate,
      description: `${withdrawals} messages containing 'need space' / 'leave me alone' / similar withdrawal phrases`,
    });
  }

  // 3. Reply latency — slow replies to quick senders = avoidant
  const profile = stats.responseTimes[sender];
  if (profile && profile.n > 20) {
    if (profile.median > 120) {
      // median > 2h
      avoidant += 0.15;
      secure -= 0.05;
      signals.push({
        name: "slow_replies",
        weight: profile.median / 60,
        description: `Median reply time ${profile.median.toFixed(0)} min (2h+ tends avoidant)`,
      });
    }
    if (profile.median < 5 && profile.p90 < 30) {
      // extremely fast replies = hypervigilance
      anxious += 0.12;
      signals.push({
        name: "hyper_fast_replies",
        weight: 1 - profile.median / 30,
        description: `Median reply time ${profile.median.toFixed(1)} min — near-constant availability`,
      });
    }
  }

  // 4. Love bids — secure flag if present, anxious flag if one-sided
  const bids = theirMessages.filter((m) =>
    LOVE_BIDS.some((p) => m.text.toLowerCase().includes(p)),
  ).length;
  const bidRate = bids / theirMessages.length;
  if (bidRate > 0.01) {
    secure += 0.1;
    // If their bids vastly outpace the other sender's, tilt anxious
    const others = Object.keys(stats.perSender).filter((s) => s !== sender);
    let othersBids = 0;
    for (const other of others) {
      othersBids += messages
        .filter((m) => m.sender === other)
        .filter((m) => LOVE_BIDS.some((p) => m.text.toLowerCase().includes(p))).length;
    }
    if (bids > othersBids * 3 && bids > 10) {
      anxious += 0.2;
      secure -= 0.1;
      signals.push({
        name: "one_sided_love_bids",
        weight: bids / Math.max(othersBids, 1),
        description: `${bids} love expressions vs ${othersBids} from others — lopsided emotional investment`,
      });
    } else {
      signals.push({
        name: "reciprocated_love_bids",
        weight: bidRate,
        description: `${bids} love expressions throughout the chat`,
      });
    }
  }

  // 5. Conflict-silence-reconnect cycles — disorganized marker
  const relevantSilences = stats.silences.filter((s) => s.brokenBy === sender);
  if (relevantSilences.length > 3) {
    disorganized += Math.min(relevantSilences.length / 20, 0.25);
    secure -= 0.1;
    signals.push({
      name: "silence_then_reconnect",
      weight: relevantSilences.length / 10,
      description: `Broke ${relevantSilences.length} 8h+ silences — cycle of withdrawal then pursuit`,
    });
  }

  // Normalise to sum to 1
  const total = secure + anxious + avoidant + disorganized;
  return {
    secure: round(secure / total),
    anxious: round(anxious / total),
    avoidant: round(avoidant / total),
    disorganized: round(disorganized / total),
    signals,
  };
}

function zero(): AttachmentEstimate {
  return { secure: 1, anxious: 0, avoidant: 0, disorganized: 0, signals: [] };
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}
