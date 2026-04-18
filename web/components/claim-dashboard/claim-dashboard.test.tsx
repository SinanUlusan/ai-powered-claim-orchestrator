import { screen } from "@testing-library/react";
import { renderWithIntl } from "@/test-utils/render-with-intl";
import { ClaimDashboard } from "./claim-dashboard";

const mockUseClaimDashboard = jest.fn();

jest.mock("@/hooks/use-claim-dashboard", () => ({
  useClaimDashboard: () => mockUseClaimDashboard(),
}));

describe("ClaimDashboard loading", () => {
  it("shows spinner while pending", () => {
    mockUseClaimDashboard.mockReturnValue({
      data: undefined,
      isPending: true,
      isError: false,
      error: null,
      dataUpdatedAt: undefined,
    });
    renderWithIntl(<ClaimDashboard />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(screen.getByText("Loading claim…")).toBeInTheDocument();
  });
});
