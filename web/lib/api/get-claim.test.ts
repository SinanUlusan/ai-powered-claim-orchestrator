import claimFixture from "@/lib/claim-data.json";
import { FETCH_CLAIM_FAILED, fetchClaimDashboard } from "./get-claim";

describe("fetchClaimDashboard", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("returns parsed claim on success", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => claimFixture,
    }) as unknown as typeof fetch;

    const claim = await fetchClaimDashboard();
    expect(claim.fileNo).toBe("9239182380");
  });

  it("throws FETCH_CLAIM_FAILED when response not ok", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({}),
    }) as unknown as typeof fetch;

    await expect(fetchClaimDashboard()).rejects.toThrow(FETCH_CLAIM_FAILED);
  });
});
