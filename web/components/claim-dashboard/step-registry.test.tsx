import type { ProcessDetail } from "@/lib/schemas/claim";
import { screen } from "@testing-library/react";
import { renderWithIntl } from "@/test-utils/render-with-intl";
import { StepBody } from "./step-registry";

describe("StepBody", () => {
  it("renders towing fields with translated labels", () => {
    const step: ProcessDetail = {
      title: "Towing Service",
      status: "Completed",
      pickupLocation: "Istanbul",
      towingDate: "Today",
    };
    renderWithIntl(<StepBody step={step} />);
    expect(screen.getByText("Pickup location")).toBeInTheDocument();
    expect(screen.getByText("Istanbul")).toBeInTheDocument();
  });

  it("falls back to humanized keys for unknown shapes", () => {
    const step = {
      title: "Unknown",
      status: "Done",
      customField: "x",
    } as unknown as ProcessDetail;
    renderWithIntl(<StepBody step={step} />);
    expect(screen.getByText("Custom Field")).toBeInTheDocument();
  });
});
