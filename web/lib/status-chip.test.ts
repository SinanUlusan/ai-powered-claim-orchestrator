import { statusToChipColor } from "./status-chip";

describe("statusToChipColor", () => {
  it("maps completed-like statuses to success", () => {
    expect(statusToChipColor("Completed")).toBe("success");
    expect(statusToChipColor("Report Completed")).toBe("success");
  });

  it("maps in-progress to accent", () => {
    expect(statusToChipColor("In Progress")).toBe("accent");
  });

  it("maps pending to warning", () => {
    expect(statusToChipColor("Pending")).toBe("warning");
  });

  it("defaults for unknown labels", () => {
    expect(statusToChipColor("File Review Process Continues")).toBe("default");
  });
});
