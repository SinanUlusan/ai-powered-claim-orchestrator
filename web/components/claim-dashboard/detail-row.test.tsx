import { render, screen } from "@testing-library/react";
import { DetailRow } from "./detail-row";

describe("DetailRow", () => {
  it("renders label and value", () => {
    render(<DetailRow label="Test label" value="Test value" />);
    expect(screen.getByText("Test label")).toBeInTheDocument();
    expect(screen.getByText("Test value")).toBeInTheDocument();
  });
});
