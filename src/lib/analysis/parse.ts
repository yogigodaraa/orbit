/**
 * Best-effort chat-export parser. Handles WhatsApp (iOS + Android) and
 * a superset of the Instagram text export format.
 *
 * Exports are unfortunately inconsistent across platforms and locales,
 * so we try multiple timestamp patterns rather than hard-coding one.
 */

import type { ChatMessage } from "./types";

const PATTERNS: { regex: RegExp; buildDate: (m: RegExpMatchArray) => Date | null }[] = [
  // WhatsApp iOS: "[6/12/24, 10:34:12 AM] Alex: hey"
  {
    regex:
      /^\[(?<d>\d{1,2})\/(?<m>\d{1,2})\/(?<y>\d{2,4}),\s(?<h>\d{1,2}):(?<min>\d{2})(?::(?<s>\d{2}))?\s?(?<ampm>AM|PM)?\]\s(?<sender>[^:]+):\s(?<text>.*)$/,
    buildDate: (m) => safeDate(m, "dmy"),
  },
  // WhatsApp Android: "6/12/24, 10:34 - Alex: hey"
  {
    regex:
      /^(?<d>\d{1,2})\/(?<m>\d{1,2})\/(?<y>\d{2,4}),\s(?<h>\d{1,2}):(?<min>\d{2})(?::(?<s>\d{2}))?\s?(?<ampm>AM|PM)?\s-\s(?<sender>[^:]+):\s(?<text>.*)$/,
    buildDate: (m) => safeDate(m, "dmy"),
  },
  // Instagram JSON-ish dump converted to text (uncommon, but graceful)
  {
    regex:
      /^(?<y>\d{4})-(?<m>\d{2})-(?<d>\d{2})\s(?<h>\d{2}):(?<min>\d{2})(?::(?<s>\d{2}))?\s+(?<sender>[^:]+):\s(?<text>.*)$/,
    buildDate: (m) => safeDate(m, "ymd"),
  },
];

export function parseChat(text: string): ChatMessage[] {
  const out: ChatMessage[] = [];
  let carry: ChatMessage | null = null;

  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/\u200e/g, "").trimEnd();
    if (!line) continue;

    let matched = false;
    for (const p of PATTERNS) {
      const m = line.match(p.regex);
      if (!m || !m.groups) continue;
      const date = p.buildDate(m);
      if (!date) continue;
      if (carry) out.push(carry);
      carry = {
        timestamp: date,
        sender: m.groups.sender.trim(),
        text: m.groups.text,
      };
      matched = true;
      break;
    }

    if (!matched && carry) {
      // Continuation line — append to the previous message
      carry.text += "\n" + line;
    }
  }
  if (carry) out.push(carry);
  return out.filter((m) => !isSystemLine(m.text));
}

function safeDate(m: RegExpMatchArray, order: "dmy" | "ymd"): Date | null {
  const g = m.groups!;
  const year = parseInt(g.y, 10);
  const month = parseInt(g.m, 10);
  const day = parseInt(g.d, 10);
  const fullYear = year < 100 ? 2000 + year : year;
  let hour = parseInt(g.h, 10);
  const minute = parseInt(g.min, 10);
  const second = g.s ? parseInt(g.s, 10) : 0;
  if (g.ampm) {
    const pm = g.ampm.toUpperCase() === "PM";
    if (pm && hour < 12) hour += 12;
    if (!pm && hour === 12) hour = 0;
  }
  const date =
    order === "dmy"
      ? new Date(fullYear, month - 1, day, hour, minute, second)
      : new Date(fullYear, month - 1, day, hour, minute, second);
  return isNaN(date.getTime()) ? null : date;
}

function isSystemLine(text: string): boolean {
  const t = text.toLowerCase();
  return (
    t.includes("end-to-end encrypted") ||
    t.includes("messages and calls are end-to-end") ||
    t.includes("missed voice call") ||
    t.includes("<media omitted>") ||
    t.startsWith("<this message was edited>")
  );
}
