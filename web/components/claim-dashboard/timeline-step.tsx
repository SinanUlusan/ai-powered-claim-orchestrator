"use client";

import { Button, Card, Chip, Tooltip } from "@heroui/react";
import { useTranslations } from "next-intl";
import type { ProcessDetail } from "@/lib/schemas/claim";
import { statusToChipColor } from "@/lib/status-chip";
import { useClaimUiStore } from "@/store/claim-ui-store";
import { StepBody } from "./step-registry";

type TimelineStepProps = {
  step: ProcessDetail;
  stepIndex: number;
  onAddNote: (afterStepIndex: number) => void;
  onAddAttachment: (afterStepIndex: number) => void;
};

export function TimelineStep({
  step,
  stepIndex,
  onAddNote,
  onAddAttachment,
}: Readonly<TimelineStepProps>) {
  const t = useTranslations("timelineStep");
  const openExplain = useClaimUiStore((s) => s.openExplain);

  return (
    <Card className="w-full" variant="default">
      <Card.Header className="flex flex-col gap-4">
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-2">
            <Card.Title className="text-base sm:text-lg">
              {step.title}
            </Card.Title>
            <div className="flex flex-wrap gap-2">
              <Chip
                color={statusToChipColor(step.status)}
                size="sm"
                variant="soft"
              >
                {step.status}
              </Chip>
            </div>
          </div>
          <Tooltip delay={0}>
            <Button
              className="min-h-11 w-full touch-manipulation sm:w-auto"
              onPress={() => openExplain(step)}
              size="sm"
              variant="secondary"
            >
              {t("explainAI")}
            </Button>
            <Tooltip.Content>
              <p className="max-w-xs text-sm">{t("explainTooltip")}</p>
            </Tooltip.Content>
          </Tooltip>
        </div>
      </Card.Header>
      <StepBody step={step} />
      <Card.Footer className="flex flex-col gap-3 border-t border-divider">
        <span className="text-xs my-2 font-medium text-muted uppercase tracking-wide">
          {t("insertLabel")}
        </span>
        <div className="flex flex-row gap-2 sm:flex-row">
          <Button
            className="min-h-11 w-full touch-manipulation sm:flex-1"
            onPress={() => onAddNote(stepIndex)}
            variant="outline"
          >
            {t("addNote")}
          </Button>
          <Button
            className="min-h-11 w-full touch-manipulation sm:flex-1"
            onPress={() => onAddAttachment(stepIndex)}
            variant="secondary"
          >
            {t("addAttachment")}
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
}
