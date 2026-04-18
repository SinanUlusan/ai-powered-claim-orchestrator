import claimFixture from "@/lib/claim-data.json";
import { claimDashboardSchema, processDetailSchema } from "./claim";

describe("claimDashboardSchema", () => {
  it("parses fixture JSON", () => {
    const parsed = claimDashboardSchema.parse(claimFixture);
    expect(parsed.fileNo).toBe("9239182380");
    expect(parsed.processDetails).toHaveLength(8);
  });

  it("rejects invalid payloads", () => {
    expect(() => claimDashboardSchema.parse({})).toThrow();
  });
});

describe("processDetailSchema", () => {
  it("accepts towing shape", () => {
    const row = {
      title: "Towing Service",
      status: "Completed",
      pickupLocation: "X",
      towingDate: "Y",
    };
    expect(processDetailSchema.parse(row)).toEqual(row);
  });
});
