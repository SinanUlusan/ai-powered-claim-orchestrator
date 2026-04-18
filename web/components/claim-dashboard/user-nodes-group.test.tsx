import claimFixture from "@/lib/claim-data.json";
import { claimDashboardSchema } from "@/lib/schemas/claim";
import { screen } from "@testing-library/react";
import { renderWithIntl } from "@/test-utils/render-with-intl";
import { useClaimUiStore } from "@/store/claim-ui-store";
import { Timeline } from "./timeline";

describe("UserNodesGroup (via Timeline)", () => {
  beforeEach(() => {
    useClaimUiStore.setState({ userNodes: [], explainForStep: null });
  });

  it("uses a horizontal group region when multiple nodes share a step", () => {
    const claim = claimDashboardSchema.parse(claimFixture);
    useClaimUiStore.setState({
      userNodes: [
        { id: "a1", type: "attachment", afterStepIndex: 0, fileName: "a.pdf", analysis: "idle" },
        { id: "a2", type: "attachment", afterStepIndex: 0, fileName: "b.pdf", analysis: "idle" },
      ],
    });
    renderWithIntl(
      <Timeline claim={claim} onAddAttachment={jest.fn()} onAddNote={jest.fn()} />,
    );
    expect(
      screen.getByRole("region", { name: "After step 1: 2 notes or attachments" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Swipe sideways to browse all items.")).toBeInTheDocument();
  });
});
