"use client";

import type { ProcessDetail } from "@/lib/schemas/claim";
import { create } from "zustand";

export type UserTimelineNode =
  | { id: string; type: "note"; afterStepIndex: number; body: string }
  | {
      id: string;
      type: "attachment";
      afterStepIndex: number;
      fileName: string;
      analysis: "idle" | "checking" | "passed" | "failed";
      analysisDetail?: string;
    };

type ClaimUiState = {
  userNodes: UserTimelineNode[];
  explainForStep: ProcessDetail | null;
  addNote: (afterStepIndex: number, body: string) => void;
  addAttachment: (afterStepIndex: number, fileName: string) => void;
  removeNode: (id: string) => void;
  openExplain: (step: ProcessDetail) => void;
  closeExplain: () => void;
  runSimulatedAnalysis: (attachmentId: string) => void;
};

function newId() {
  return globalThis.crypto?.randomUUID?.() ?? `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export const useClaimUiStore = create<ClaimUiState>((set, get) => ({
  userNodes: [],
  explainForStep: null,

  addNote: (afterStepIndex, body) =>
    set((s) => ({
      userNodes: [...s.userNodes, { id: newId(), type: "note", afterStepIndex, body }],
    })),

  addAttachment: (afterStepIndex, fileName) =>
    set((s) => ({
      userNodes: [
        ...s.userNodes,
        { id: newId(), type: "attachment", afterStepIndex, fileName, analysis: "idle" },
      ],
    })),

  removeNode: (id) =>
    set((s) => ({
      userNodes: s.userNodes.filter((n) => n.id !== id),
    })),

  openExplain: (step) => set({ explainForStep: step }),
  closeExplain: () => set({ explainForStep: null }),

  runSimulatedAnalysis: (attachmentId) => {
    set((s) => ({
      userNodes: s.userNodes.map((n) =>
        n.id === attachmentId && n.type === "attachment"
          ? { ...n, analysis: "checking" as const }
          : n,
      ),
    }));

    globalThis.setTimeout(() => {
      const node = get().userNodes.find((n) => n.id === attachmentId);
      if (!node || node.type !== "attachment") return;

      const name = node.fileName.toLowerCase();
      const looksOccupational =
        name.includes("occupation") || name.includes("meslek") || name.endsWith(".pdf");

      set((s) => ({
        userNodes: s.userNodes.map((n) =>
          n.id === attachmentId && n.type === "attachment"
            ? {
                ...n,
                analysis: looksOccupational ? ("passed" as const) : ("failed" as const),
                analysisDetail: looksOccupational
                  ? "Simulated check: document appears to match an occupational certificate submission."
                  : "Simulated check: filename does not suggest an Occupational Certificate. Rename or upload the correct document.",
              }
            : n,
        ),
      }));
    }, 1400);
  },
}));
