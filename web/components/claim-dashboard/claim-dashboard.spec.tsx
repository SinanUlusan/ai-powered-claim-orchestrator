import claimFixture from "@/lib/claim-data.json";
import { FETCH_CLAIM_FAILED } from "@/lib/api/get-claim";
import { claimDashboardSchema } from "@/lib/schemas/claim";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithIntl } from "@/test-utils/render-with-intl";
import { ClaimDashboard } from "./claim-dashboard";

const mockUseClaimDashboard = jest.fn();

jest.mock("@/hooks/use-claim-dashboard", () => ({
  useClaimDashboard: () => mockUseClaimDashboard(),
}));

describe("ClaimDashboard (spec)", () => {
  beforeEach(() => {
    const claim = claimDashboardSchema.parse(claimFixture);
    mockUseClaimDashboard.mockReturnValue({
      data: claim,
      isPending: false,
      isError: false,
      error: null,
      dataUpdatedAt: Date.now(),
    });
  });

  it("shows timeline and opens explain modal", async () => {
    const user = userEvent.setup();
    renderWithIntl(<ClaimDashboard />);

    expect(screen.getByRole("heading", { name: "Process timeline" })).toBeInTheDocument();
    await user.click(screen.getAllByRole("button", { name: "Explain with AI" })[0]!);
    expect(screen.getAllByRole("heading", { name: "Explain with AI" }).length).toBeGreaterThan(0);
  });

  it("shows error state when query fails", () => {
    mockUseClaimDashboard.mockReturnValue({
      data: undefined,
      isPending: false,
      isError: true,
      error: new Error(FETCH_CLAIM_FAILED),
      dataUpdatedAt: undefined,
    });

    renderWithIntl(<ClaimDashboard />);
    expect(screen.getByText("Could not load claim")).toBeInTheDocument();
    expect(screen.getByText("Failed to load claim")).toBeInTheDocument();
  });
});
