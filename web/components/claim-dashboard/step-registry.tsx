"use client";

import type { ReactNode } from "react";
import { Card } from "@heroui/react";
import { useTranslations } from "next-intl";
import type { ProcessDetail } from "@/lib/schemas/claim";
import { DETAIL_FIELD_KEYS } from "@/lib/detail-field-keys";
import { humanizeFieldKey } from "@/lib/humanize-field-key";
import { DetailRow } from "./detail-row";

type FieldLabel = (key: string) => string;

function GenericStepBody({ step, field }: { step: ProcessDetail; field: FieldLabel }) {
  const entries = Object.entries(step as Record<string, unknown>).filter(
    ([key]) => key !== "title" && key !== "status",
  );
  return (
    <div className="flex flex-col gap-3">
      {entries.map(([key, value]) => (
        <DetailRow
          key={key}
          label={field(key)}
          value={typeof value === "object" ? JSON.stringify(value) : String(value ?? "")}
        />
      ))}
    </div>
  );
}

type Towing = Extract<ProcessDetail, { title: "Towing Service" }>;
type ClaimNotification = Extract<ProcessDetail, { title: "Claim Notification" }>;
type Appraisal = Extract<ProcessDetail, { title: "Appraisal" }>;
type Rental = Extract<ProcessDetail, { title: "Substitute Rental Vehicle" }>;
type FileReview = Extract<ProcessDetail, { title: "File Review" }>;
type Deduction = Extract<ProcessDetail, { title: "Deduction Reason" }>;
type Payment = Extract<ProcessDetail, { title: "Payment Information" }>;
type Closed = Extract<ProcessDetail, { title: "Closed" }>;

function TowingBody({ step, field }: { step: ProcessDetail; field: FieldLabel }) {
  if (step.title !== "Towing Service") return null;
  const s = step as Towing;
  return (
    <div className="flex flex-col gap-3">
      <DetailRow label={field("pickupLocation")} value={s.pickupLocation} />
      <DetailRow label={field("towingDate")} value={s.towingDate} />
    </div>
  );
}

function ClaimNotificationBody({ step, field }: { step: ProcessDetail; field: FieldLabel }) {
  if (step.title !== "Claim Notification") return null;
  const s = step as ClaimNotification;
  return (
    <div className="flex flex-col gap-3">
      <DetailRow label={field("dateTime")} value={s.dateTime} />
      <DetailRow label={field("reportType")} value={s.reportType} />
      <DetailRow label={field("reasonForDamage")} value={s.reasonForDamage} />
      <DetailRow label={field("reportingParty")} value={s.reportingParty} />
      <DetailRow label={field("contact")} value={s.contact} />
    </div>
  );
}

function AppraisalBody({ step, field }: { step: ProcessDetail; field: FieldLabel }) {
  if (step.title !== "Appraisal") return null;
  const s = step as Appraisal;
  return (
    <div className="flex flex-col gap-3">
      <DetailRow label={field("expertAssignmentDate")} value={s.expertAssignmentDate} />
      <DetailRow label={field("expertInfo")} value={s.expertInfo} />
      <DetailRow label={field("contact")} value={s.contact} />
    </div>
  );
}

function RentalBody({ step, field }: { step: ProcessDetail; field: FieldLabel }) {
  if (step.title !== "Substitute Rental Vehicle") return null;
  const s = step as Rental;
  return (
    <div className="flex flex-col gap-3">
      <DetailRow label={field("vehicleDuration")} value={s.vehicleDuration} />
      <DetailRow label={field("vehicleModel")} value={s.vehicleModel} />
      <DetailRow label={field("extraDuration")} value={s.extraDuration} />
    </div>
  );
}

function FileReviewBody({ step, field }: { step: ProcessDetail; field: FieldLabel }) {
  if (step.title !== "File Review") return null;
  const s = step as FileReview;
  return (
    <div className="flex flex-col gap-3">
      <DetailRow label={field("reviewReferralDate")} value={s.reviewReferralDate} />
      <DetailRow label={field("reviewCompletionDate")} value={s.reviewCompletionDate} />
    </div>
  );
}

function DeductionBody({ step, field }: { step: ProcessDetail; field: FieldLabel }) {
  if (step.title !== "Deduction Reason") return null;
  const s = step as Deduction;
  return (
    <div className="flex flex-col gap-3">
      <DetailRow label={field("actionRequired")} value={s.actionRequired} />
      <DetailRow label={field("occupationalDeduction")} value={s.occupationalDeduction} />
      <DetailRow label={field("appreciationDeduction")} value={s.appreciationDeduction} />
      <DetailRow label={field("policyDeductible")} value={s.policyDeductible} />
      <DetailRow label={field("nonDamageAmount")} value={s.nonDamageAmount} />
    </div>
  );
}

function PaymentBody({ step, field }: { step: ProcessDetail; field: FieldLabel }) {
  if (step.title !== "Payment Information") return null;
  const s = step as Payment;
  return (
    <div className="flex flex-col gap-3">
      <DetailRow label={field("paidTo")} value={s.paidTo} />
      <DetailRow label={field("iban")} value={s.iban} />
      <DetailRow label={field("paymentAmount")} value={s.paymentAmount} />
      <DetailRow label={field("note")} value={s.note} />
    </div>
  );
}

function ClosedBody({ step, field }: { step: ProcessDetail; field: FieldLabel }) {
  if (step.title !== "Closed") return null;
  const s = step as Closed;
  return (
    <div className="flex flex-col gap-3">
      <DetailRow label={field("completionDate")} value={s.completionDate} />
    </div>
  );
}

const bodies: Record<string, (step: ProcessDetail, field: FieldLabel) => ReactNode> = {
  "Towing Service": (s, f) => <TowingBody field={f} step={s} />,
  "Claim Notification": (s, f) => <ClaimNotificationBody field={f} step={s} />,
  Appraisal: (s, f) => <AppraisalBody field={f} step={s} />,
  "Substitute Rental Vehicle": (s, f) => <RentalBody field={f} step={s} />,
  "File Review": (s, f) => <FileReviewBody field={f} step={s} />,
  "Deduction Reason": (s, f) => <DeductionBody field={f} step={s} />,
  "Payment Information": (s, f) => <PaymentBody field={f} step={s} />,
  Closed: (s, f) => <ClosedBody field={f} step={s} />,
};

export function StepBody({ step }: { step: ProcessDetail }) {
  const t = useTranslations("detailFields");
  const field: FieldLabel = (key) =>
    DETAIL_FIELD_KEYS.has(key) ? t(key as never) : humanizeFieldKey(key);

  const render = bodies[step.title];
  return (
    <Card.Content className="gap-3 pt-0">
      {render ? render(step, field) : <GenericStepBody field={field} step={step} />}
    </Card.Content>
  );
}
