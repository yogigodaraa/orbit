/**
 * Top-level analysis pipeline: parse → stats → Gottman → attachment → bundle.
 *
 * The bundle's `llmContext` field is a compact grounding string designed
 * to be prepended to the system prompt. This way the LLM generates the
 * narrative ("your dynamic is pursuer-withdrawer and it's hardening")
 * but it reads real numbers off the grounding instead of guessing.
 */

import { estimateAttachment } from "./attachment";
import { computeGottman } from "./gottman";
import { parseChat } from "./parse";
import { computeStats } from "./stats";
import type { AnalysisBundle, AttachmentEstimate } from "./types";

export function runAnalysis(chatText: string): AnalysisBundle {
  const messages = parseChat(chatText);
  const stats = computeStats(messages);
  const gottman = computeGottman(messages);

  const attachment: Record<string, AttachmentEstimate> = {};
  for (const sender of Object.keys(stats.perSender)) {
    attachment[sender] = estimateAttachment(sender, messages, stats);
  }

  return { stats, gottman, attachment, llmContext: buildLlmContext({ stats, gottman, attachment }) };
}

function buildLlmContext(b: Omit<AnalysisBundle, "llmContext">): string {
  const { stats, gottman, attachment } = b;
  const senders = Object.keys(stats.perSender);
  const lines: string[] = [];

  lines.push("=== GROUNDING METRICS (computed deterministically, not inferred) ===");
  lines.push(`Messages: ${stats.totalMessages.toLocaleString()} over ${stats.totalDays} days`);
  lines.push(`Date range: ${stats.dateRange.start.slice(0, 10)} → ${stats.dateRange.end.slice(0, 10)}`);
  lines.push("");

  lines.push("Volume by sender:");
  for (const s of senders) {
    const info = stats.perSender[s];
    lines.push(
      `  ${s}: ${info.messages} msgs (${Math.round(info.shareOfVolume * 100)}%), ${info.activeDays} active days, avg ${info.averageMessageLength.toFixed(0)} chars/msg`,
    );
  }
  lines.push("");

  lines.push("Reply latency (minutes — median / p90):");
  for (const s of senders) {
    const rt = stats.responseTimes[s];
    if (rt) lines.push(`  ${s}: median ${rt.median} min, p90 ${rt.p90} min (n=${rt.n})`);
  }
  lines.push("");

  lines.push("Reciprocity (fraction of messages that got a reply within 1h):");
  for (const s of senders) {
    lines.push(`  ${s}: ${Math.round((stats.reciprocity[s] || 0) * 100)}%`);
  }
  lines.push("");

  lines.push(`Gottman positive:negative sentiment ratio — ${gottman.ratio.toFixed(2)} (${gottman.verdict})`);
  lines.push(`  positive affect score: ${gottman.positive}`);
  lines.push(`  negative affect score: ${gottman.negative}`);
  lines.push("");

  lines.push("Attachment-style estimates (heuristic, % of profile):");
  for (const s of senders) {
    const a = attachment[s];
    if (!a) continue;
    lines.push(
      `  ${s}: secure ${pct(a.secure)} · anxious ${pct(a.anxious)} · avoidant ${pct(a.avoidant)} · disorganized ${pct(a.disorganized)}`,
    );
    if (a.signals.length) {
      for (const sig of a.signals.slice(0, 3)) {
        lines.push(`    ↪ ${sig.name}: ${sig.description}`);
      }
    }
  }
  lines.push("");

  if (stats.silences.length) {
    lines.push(
      `Silences ≥8h: ${stats.silences.length} total (${stats.silences.slice(0, 3).map((s) => `${s.gapHours.toFixed(0)}h broken by ${s.brokenBy}`).join("; ")})`,
    );
  }

  lines.push("=== END GROUNDING ===");
  lines.push("");
  lines.push(
    "Use these numbers as-is in your analysis; do not re-estimate them. Your job is narrative and interpretation.",
  );

  return lines.join("\n");
}

function pct(x: number): string {
  return `${Math.round(x * 100)}%`;
}

export * from "./types";
export { parseChat } from "./parse";
export { computeStats } from "./stats";
export { computeGottman } from "./gottman";
export { estimateAttachment } from "./attachment";
