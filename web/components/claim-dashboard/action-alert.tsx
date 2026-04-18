"use client";

import { Alert } from "@heroui/react";
import { useTranslations } from "next-intl";
import type { ClaimDashboard, ProcessDetail } from "@/lib/schemas/claim";

function isDeductionStep(
  s: ProcessDetail,
): s is Extract<ProcessDetail, { title: "Deduction Reason" }> {
  return s.title === "Deduction Reason";
}

export function ActionAlert({ claim }: Readonly<{ claim: ClaimDashboard }>) {
  const t = useTranslations("actionAlert");
  const deduction = claim.processDetails.find(isDeductionStep);
  let action: string | null = null;
  if (deduction && deduction.status === "Pending") {
    action = deduction.actionRequired;
  }

  if (!action) return null;

  return (
    <Alert className="w-full" status="warning">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>{t("title")}</Alert.Title>
        <Alert.Description>{action}</Alert.Description>
      </Alert.Content>
    </Alert>
  );
}
