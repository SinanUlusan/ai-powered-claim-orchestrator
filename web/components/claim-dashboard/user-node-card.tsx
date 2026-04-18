"use client";

import { Button, Card, Chip, Spinner } from "@heroui/react";
import { useTranslations } from "next-intl";
import type { UserTimelineNode } from "@/store/claim-ui-store";
import { useClaimUiStore } from "@/store/claim-ui-store";

function AnalysisStatusChip({ node }: Readonly<{ node: UserTimelineNode & { type: "attachment" } }>) {
  const t = useTranslations("userNode");
  if (node.analysis === "idle") {
    return (
      <Chip size="sm" variant="soft">
        {t("analysisIdle")}
      </Chip>
    );
  }
  if (node.analysis === "checking") {
    return (
      <Chip color="accent" size="sm" variant="soft">
        {t("analysisChecking")}
      </Chip>
    );
  }
  if (node.analysis === "passed") {
    return (
      <Chip color="success" size="sm" variant="soft">
        {t("analysisPassed")}
      </Chip>
    );
  }
  return (
    <Chip color="danger" size="sm" variant="soft">
      {t("analysisFailed")}
    </Chip>
  );
}

export type UserNodeDensity = "comfortable" | "compact";

type UserNodeCardProps = Readonly<{
  node: UserTimelineNode;
  density?: UserNodeDensity;
}>;

export function UserNodeCard({ node, density = "comfortable" }: UserNodeCardProps) {
  const t = useTranslations("userNode");
  const tCommon = useTranslations("common");
  const removeNode = useClaimUiStore((s) => s.removeNode);
  const runSimulatedAnalysis = useClaimUiStore((s) => s.runSimulatedAnalysis);
  const compact = density === "compact";

  if (node.type === "note") {
    return (
      <Card
        className={`w-full border border-dashed border-accent/40 ${compact ? "h-full" : ""}`}
        variant="secondary"
      >
        <Card.Header className={compact ? "pb-1 pt-3" : "pb-2"}>
          <Card.Title className={compact ? "text-xs font-semibold" : "text-sm"}>{t("yourNote")}</Card.Title>
          <Card.Description
            className={`text-muted ${compact ? "line-clamp-1 text-[11px]" : "text-xs"}`}
          >
            {t("noteHint")}
          </Card.Description>
        </Card.Header>
        <Card.Content className={compact ? "py-1" : undefined}>
          <p
            className={`text-sm text-foreground whitespace-pre-wrap ${compact ? "line-clamp-4" : ""}`}
          >
            {node.body}
          </p>
        </Card.Content>
        <Card.Footer className={compact ? "flex flex-row flex-wrap gap-2 pt-2" : undefined}>
          <Button size="sm" variant="danger-soft" onPress={() => removeNode(node.id)}>
            {tCommon("remove")}
          </Button>
        </Card.Footer>
      </Card>
    );
  }

  return (
    <Card
      className={`w-full border border-dashed border-warning/50 ${compact ? "h-full" : ""}`}
      variant="secondary"
    >
      <Card.Header
        className={
          compact
            ? "flex flex-row flex-wrap items-start justify-between gap-2 pb-1 pt-3"
            : "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
        }
      >
        <div className="min-w-0 flex-1">
          <Card.Title className={compact ? "text-xs font-semibold" : "text-sm"}>{t("attachment")}</Card.Title>
          <Card.Description
            className={`font-mono text-muted ${compact ? "truncate text-[11px]" : "text-xs"}`}
          >
            {node.fileName}
          </Card.Description>
        </div>
        <AnalysisStatusChip node={node} />
      </Card.Header>
      <Card.Content className={`flex flex-col ${compact ? "gap-1 py-1" : "gap-3"}`}>
        {node.analysis === "checking" ? (
          <div className={`flex items-center gap-2 text-muted ${compact ? "text-xs" : "text-sm"}`}>
            <Spinner size="sm" />
            {t("analyzingHint")}
          </div>
        ) : null}
        {node.analysisDetail ? (
          <p className={`text-foreground ${compact ? "line-clamp-2 text-xs leading-snug" : "text-sm"}`}>
            {node.analysisDetail}
          </p>
        ) : null}
      </Card.Content>
      <Card.Footer
        className={
          compact
            ? "flex flex-row flex-wrap gap-2 pt-2"
            : "flex flex-col gap-2 sm:flex-row"
        }
      >
        <Button
          isDisabled={node.analysis === "checking"}
          size="sm"
          variant="secondary"
          onPress={() => runSimulatedAnalysis(node.id)}
        >
          {t("runAnalysis")}
        </Button>
        <Button size="sm" variant="danger-soft" onPress={() => removeNode(node.id)}>
          {tCommon("remove")}
        </Button>
      </Card.Footer>
    </Card>
  );
}
