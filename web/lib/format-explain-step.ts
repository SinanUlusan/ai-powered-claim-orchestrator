import type { ProcessDetail } from "@/lib/schemas/claim";

const TITLE_TO_KEY: Record<string, string> = {
  "Towing Service": "towing",
  "Claim Notification": "claimNotification",
  Appraisal: "appraisal",
  "Substitute Rental Vehicle": "rental",
  "File Review": "fileReview",
  "Deduction Reason": "deduction",
  "Payment Information": "payment",
  Closed: "closed",
};

export type ExplainTranslateFn = (
  key: string,
  values: { status: string; title: string },
) => string;

export function formatExplainStep(step: ProcessDetail, t: ExplainTranslateFn): string {
  const key = TITLE_TO_KEY[step.title] ?? "generic";
  return t(key, { status: step.status, title: step.title });
}
