import claimFixture from "@/lib/claim-data.json";
import { claimDashboardSchema } from "@/lib/schemas/claim";
import { screen } from "@testing-library/react";
import { renderWithIntl } from "@/test-utils/render-with-intl";
import { ActionAlert } from "./action-alert";

describe("ActionAlert", () => {
  it("renders when deduction step is pending", () => {
    const claim = claimDashboardSchema.parse(claimFixture);
    renderWithIntl(<ActionAlert claim={claim} />);
    expect(screen.getByText("Action required")).toBeInTheDocument();
    expect(screen.getByText(/Upload Occupational Certificate/)).toBeInTheDocument();
  });

  it("renders nothing when no pending deduction", () => {
    const claim = claimDashboardSchema.parse(claimFixture);
    const patched = {
      ...claim,
      processDetails: claim.processDetails.map((s) =>
        s.title === "Deduction Reason" ? { ...s, status: "Completed" } : s,
      ),
    };
    renderWithIntl(<ActionAlert claim={patched} />);
    expect(screen.queryByText("Action required")).not.toBeInTheDocument();
  });
});
