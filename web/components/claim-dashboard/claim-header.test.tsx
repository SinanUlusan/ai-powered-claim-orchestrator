import claimFixture from "@/lib/claim-data.json";
import { claimDashboardSchema } from "@/lib/schemas/claim";
import { screen } from "@testing-library/react";
import { renderWithIntl } from "@/test-utils/render-with-intl";
import { ClaimHeader } from "./claim-header";

describe("ClaimHeader", () => {
  it("shows file number and ETA", () => {
    const claim = claimDashboardSchema.parse(claimFixture);
    renderWithIntl(<ClaimHeader claim={claim} />);
    expect(screen.getByText("9239182380")).toBeInTheDocument();
    expect(screen.getByText("20 Days")).toBeInTheDocument();
    expect(screen.getByText("File number")).toBeInTheDocument();
  });
});
