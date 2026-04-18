import type { ProcessDetail } from "@/lib/schemas/claim";
import { act, renderHook } from "@testing-library/react";
import { useClaimUiStore } from "./claim-ui-store";

const sampleStep = { title: "Towing Service", status: "Completed" } as ProcessDetail;

describe("useClaimUiStore", () => {
  beforeEach(() => {
    useClaimUiStore.setState({
      userNodes: [],
      explainForStep: null,
    });
  });

  it("adds and removes notes", () => {
    const { result } = renderHook(() => useClaimUiStore());
    act(() => {
      result.current.addNote(0, "hello");
    });
    expect(result.current.userNodes).toHaveLength(1);
    const id = result.current.userNodes[0]?.id;
    expect(id).toBeDefined();
    act(() => {
      result.current.removeNode(id!);
    });
    expect(result.current.userNodes).toHaveLength(0);
  });

  it("opens and closes explain modal state", () => {
    const { result } = renderHook(() => useClaimUiStore());
    act(() => {
      result.current.openExplain(sampleStep);
    });
    expect(result.current.explainForStep).toEqual(sampleStep);
    act(() => {
      result.current.closeExplain();
    });
    expect(result.current.explainForStep).toBeNull();
  });

  it("runs simulated analysis to passed when filename hints occupational", () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useClaimUiStore());
    act(() => {
      result.current.addAttachment(1, "occupation-cert.pdf");
    });
    const id = result.current.userNodes[0]?.id;
    act(() => {
      result.current.runSimulatedAnalysis(id!);
    });
    expect(result.current.userNodes[0]?.type === "attachment" && result.current.userNodes[0].analysis).toBe(
      "checking",
    );
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    const node = result.current.userNodes[0];
    expect(node?.type === "attachment" && node.analysis).toBe("passed");
    jest.useRealTimers();
  });

  it("marks analysis failed for unrelated filenames", () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useClaimUiStore());
    act(() => {
      result.current.addAttachment(0, "photo.jpg");
    });
    const id = result.current.userNodes[0]?.id;
    act(() => {
      result.current.runSimulatedAnalysis(id!);
    });
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    const node = result.current.userNodes[0];
    expect(node?.type === "attachment" && node.analysis).toBe("failed");
    jest.useRealTimers();
  });
});
