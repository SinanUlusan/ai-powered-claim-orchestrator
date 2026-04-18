import { createTranslator } from "next-intl";
import messages from "@/messages/en.json";
import type { ProcessDetail } from "@/lib/schemas/claim";
import { formatExplainStep } from "./format-explain-step";

function explainT() {
  return createTranslator({ locale: "en", namespace: "explain", messages });
}

describe("formatExplainStep", () => {
  const t = explainT();

  const titles = [
    "Towing Service",
    "Claim Notification",
    "Appraisal",
    "Substitute Rental Vehicle",
    "File Review",
    "Deduction Reason",
    "Payment Information",
    "Closed",
  ] as const;

  it.each(titles)("produces text for %s", (title) => {
    const step = { title, status: "Completed" } as ProcessDetail;
    const out = formatExplainStep(step, (key, values) => t(key, values));
    expect(out.length).toBeGreaterThan(20);
  });

  it("uses generic copy for unknown titles", () => {
    const step = { title: "Mystery Step", status: "Open", extra: true } as unknown as ProcessDetail;
    const out = formatExplainStep(step, (key, values) => t(key, values));
    expect(out).toContain("Mystery Step");
    expect(out).toContain("Open");
  });
});
