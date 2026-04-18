"use client";

import { Separator } from "@heroui/react";
import { useTranslations } from "next-intl";
import type { ClaimDashboard } from "@/lib/schemas/claim";
import { useClaimUiStore } from "@/store/claim-ui-store";
import { TimelineStep } from "./timeline-step";
import { UserNodesGroup } from "./user-nodes-group";

type TimelineProps = {
  claim: ClaimDashboard;
  onAddNote: (afterStepIndex: number) => void;
  onAddAttachment: (afterStepIndex: number) => void;
};

export function Timeline({ claim, onAddNote, onAddAttachment }: Readonly<TimelineProps>) {
  const t = useTranslations("timeline");
  const userNodes = useClaimUiStore((s) => s.userNodes);

  return (
    <section aria-label={t("ariaLabel")} className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-foreground">{t("title")}</h2>
        <p className="text-sm text-muted">{t("subtitle")}</p>
      </div>

      {claim.processDetails.map((step, index) => (
        <div key={`${step.title}-${index}`} className="flex flex-col gap-4">
          <TimelineStep
            step={step}
            stepIndex={index}
            onAddAttachment={onAddAttachment}
            onAddNote={onAddNote}
          />
          <UserNodesGroup
            afterStepIndex={index}
            nodes={userNodes.filter((n) => n.afterStepIndex === index)}
          />
          {index < claim.processDetails.length - 1 ? <Separator className="my-1" /> : null}
        </div>
      ))}
    </section>
  );
}
