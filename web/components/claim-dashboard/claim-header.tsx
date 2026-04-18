"use client";

import { Card, Chip } from "@heroui/react";
import { useTranslations } from "next-intl";
import type { ClaimDashboard } from "@/lib/schemas/claim";
import { statusToChipColor } from "@/lib/status-chip";

export function ClaimHeader({ claim }: Readonly<{ claim: ClaimDashboard }>) {
  const t = useTranslations("claimHeader");

  return (
    <Card className="w-full" variant="tertiary">
      <Card.Header>
        <Card.Title className="text-xl sm:text-2xl">{claim.title}</Card.Title>
        <Card.Description className="text-sm text-muted">{t("subtitle")}</Card.Description>
      </Card.Header>
      <Card.Content className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2 rounded-2xl bg-surface-secondary/60 p-4">
          <span className="text-xs font-medium text-muted uppercase">{t("fileNumber")}</span>
          <p className="font-mono text-lg font-semibold tracking-tight">{claim.fileNo}</p>
        </div>
        <div className="space-y-2 rounded-2xl bg-surface-secondary/60 p-4">
          <span className="text-xs font-medium text-muted uppercase">{t("estimatedRemaining")}</span>
          <p className="text-lg font-semibold">{claim.estimatedRemainingTime}</p>
        </div>
        <div className="space-y-2 rounded-2xl bg-surface-secondary/60 p-4 sm:col-span-1">
          <span className="text-xs font-medium text-muted uppercase">{t("currentStage")}</span>
          <div className="flex flex-wrap items-center gap-2">
            <Chip color={statusToChipColor(claim.currentStatus)} size="sm" variant="soft">
              {claim.currentStatus}
            </Chip>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
