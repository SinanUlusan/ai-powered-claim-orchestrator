import claimFixture from "@/lib/claim-data.json";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { useClaimDashboard } from "./use-claim-dashboard";

describe("useClaimDashboard", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  function wrapper({ children }: { children: ReactNode }) {
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  }

  it("loads claim data", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => claimFixture,
    }) as unknown as typeof fetch;

    const { result } = renderHook(() => useClaimDashboard(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.fileNo).toBe("9239182380");
  });
});
