import { DETAIL_FIELD_KEYS } from "./detail-field-keys";

describe("DETAIL_FIELD_KEYS", () => {
  it("includes core API field keys", () => {
    expect(DETAIL_FIELD_KEYS.has("pickupLocation")).toBe(true);
    expect(DETAIL_FIELD_KEYS.has("iban")).toBe(true);
    expect(DETAIL_FIELD_KEYS.has("nonDamageAmount")).toBe(true);
  });
});
