import claimFixture from "@/lib/claim-data.json";
import { claimDashboardSchema } from "@/lib/schemas/claim";
import { screen } from "@testing-library/react";
import { renderWithIntl } from "@/test-utils/render-with-intl";
import { useClaimUiStore } from "@/store/claim-ui-store";
import { Timeline } from "./timeline";

describe("Timeline", () => {
  beforeEach(() => {
    useClaimUiStore.setState({ userNodes: [], explainForStep: null });
  });

  it("renders section title", () => {
    const claim = claimDashboardSchema.parse(claimFixture);
    renderWithIntl(
      <Timeline claim={claim} onAddAttachment={jest.fn()} onAddNote={jest.fn()} />,
    );
    expect(screen.getByRole("region", { name: "Claim process timeline" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Process timeline" })).toBeInTheDocument();
  });
});
