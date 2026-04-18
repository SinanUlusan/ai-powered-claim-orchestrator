import { humanizeFieldKey } from "./humanize-field-key";

describe("humanizeFieldKey", () => {
  it("returns empty string for empty input", () => {
    expect(humanizeFieldKey("")).toBe("");
  });

  it("inserts spaces before capitals and capitalizes", () => {
    expect(humanizeFieldKey("pickupLocation")).toBe("Pickup Location");
    expect(humanizeFieldKey("reviewCompletionDate")).toBe("Review Completion Date");
  });
});
