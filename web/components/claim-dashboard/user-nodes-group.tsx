"use client";

import { useTranslations } from "next-intl";
import type { UserTimelineNode } from "@/store/claim-ui-store";
import { UserNodeCard } from "./user-node-card";

type UserNodesGroupProps = Readonly<{
  afterStepIndex: number;
  nodes: UserTimelineNode[];
}>;

export function UserNodesGroup({ afterStepIndex, nodes }: UserNodesGroupProps) {
  const t = useTranslations("timeline");

  if (nodes.length === 0) return null;

  if (nodes.length === 1) {
    return (
      <div className="w-full">
        <UserNodeCard density="comfortable" node={nodes[0]} />
      </div>
    );
  }

  return (
    <section
      aria-label={t("userNodesGroupLabel", {
        count: nodes.length,
        step: afterStepIndex + 1,
      })}
      className="w-full"
    >
      <p className="mb-2 text-xs text-muted md:sr-only">{t("userNodesSwipeHint")}</p>
      <ul className="flex list-none flex-row gap-3 overflow-x-auto overflow-y-visible overscroll-x-contain pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:pb-0 xl:grid-cols-3 [&::-webkit-scrollbar]:hidden snap-x snap-mandatory md:snap-none">
        {nodes.map((node) => (
          <li
            key={node.id}
            className="w-[min(22rem,calc(100vw_-_2.5rem))] shrink-0 snap-start md:w-auto md:min-w-0 md:shrink"
          >
            <UserNodeCard density="compact" node={node} />
          </li>
        ))}
      </ul>
    </section>
  );
}
