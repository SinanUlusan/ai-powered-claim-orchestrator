import type { ProcessDetail } from "@/lib/schemas/claim";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithIntl } from "@/test-utils/render-with-intl";
import { useClaimUiStore } from "@/store/claim-ui-store";
import { TimelineStep } from "./timeline-step";

describe("TimelineStep", () => {
  beforeEach(() => {
    useClaimUiStore.setState({ userNodes: [], explainForStep: null });
  });

  it("fires add note and explain actions", async () => {
    const user = userEvent.setup();
    const onAddNote = jest.fn();
    const onAddAttachment = jest.fn();
    const step: ProcessDetail = {
      title: "Towing Service",
      status: "Completed",
      pickupLocation: "X",
      towingDate: "Y",
    };

    renderWithIntl(
      <TimelineStep
        step={step}
        stepIndex={2}
        onAddAttachment={onAddAttachment}
        onAddNote={onAddNote}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Explain with AI" }));
    expect(useClaimUiStore.getState().explainForStep).toEqual(step);

    await user.click(
      screen.getByRole("button", { name: "Add information note" }),
    );
    expect(onAddNote).toHaveBeenCalledWith(2);

    await user.click(screen.getByRole("button", { name: "Add attachment" }));
    expect(onAddAttachment).toHaveBeenCalledWith(2);
  });
});
